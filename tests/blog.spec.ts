import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { cases } from '../src/lib/cases';
import { blogPath, findBlogPost, legacyBlogRedirects, pairedBlogPath, posts } from '../src/lib/blog';

const expectLocalSvgReferences = (svg: string) => {
  for (const reference of svg.matchAll(/\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi)) {
    expect(reference[2].trim()).toMatch(/^#/);
  }

  expect(svg).not.toMatch(/@import/i);

  for (const reference of svg.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
    expect(reference[2].trim()).toMatch(/^#/);
  }
};

test('blog catalog contains four complete bilingual acquisition articles', () => {
  expect(posts).toHaveLength(4);
  const postIds = posts.map(({ id }) => id);
  expect(new Set(postIds).size).toBe(posts.length);
  expect(postIds).toEqual(['website-conversion', 'seo-geo', 'performance', 'strategic-redesign']);
  expect(posts.filter(({ featured }) => featured)).toHaveLength(1);
  const caseIds = new Set(cases.map(({ id }) => id));
  const slugs = { pt: new Set<string>(), en: new Set<string>() };

  for (const post of posts) {
    expect(post.image).toMatch(/^\/blog\/.+\.svg$/);
    expect(post.sources.length).toBeGreaterThan(0);
    expect(caseIds.has(post.relatedCaseId)).toBeTruthy();

    for (const lang of ['pt', 'en'] as const) {
      const locale = post.locales[lang];
      const headings = locale.blocks.filter(({ kind }) => kind === 'heading');
      const headingIds = headings.map(({ id }) => id.toLowerCase());
      const caseBlocks = locale.blocks.filter(({ kind }) => kind === 'case');

      expect(locale.title.length).toBeGreaterThan(30);
      expect(locale.excerpt.length).toBeGreaterThan(80);
      expect(locale.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(headings).toHaveLength(6);
      expect(new Set(headingIds).size).toBe(headingIds.length);
      expect(locale.blocks.filter(({ kind }) => kind === 'callout')).toHaveLength(1);
      expect(locale.blocks.filter(({ kind }) => kind === 'checklist')).toHaveLength(1);
      expect(locale.blocks.filter(({ kind }) => kind === 'cta')).toHaveLength(1);
      expect(caseBlocks).toHaveLength(1);
      expect(locale.blocks.filter(({ kind }) => kind === 'sources')).toHaveLength(1);
      expect(caseBlocks[0].caseId).toBe(post.relatedCaseId);

      for (const block of locale.blocks) {
        if (block.kind === 'case') expect(caseIds.has(block.caseId)).toBeTruthy();
        if (block.kind === 'paragraph') {
          for (const link of block.links ?? []) expect(caseIds.has(link.caseId)).toBeTruthy();
        }
      }

      const slug = locale.slug.toLowerCase();
      expect(slugs[lang].has(slug)).toBeFalsy();
      slugs[lang].add(slug);
    }
  }
});

test('blog redirects and redesign case links match the approved destinations', () => {
  expect(legacyBlogRedirects).toEqual({
    '/blog/geo-vs-seo-2025': '/blog/seo-geo-busca-ia',
    '/blog/web-design-conversion-2025': '/blog/site-que-converte',
    '/blog/seo-technical-fundamentals': '/blog/performance-core-web-vitals',
    '/blog/smb-digital-strategy-brazil': '/blog/quando-redesenhar-site',
  });

  const redesign = posts.find(({ id }) => id === 'strategic-redesign');
  expect(redesign).toBeDefined();
  for (const lang of ['pt', 'en'] as const) {
    const links = redesign?.locales[lang].blocks.flatMap((block) =>
      block.kind === 'paragraph' ? (block.links ?? []) : [],
    );
    expect(links).toEqual([
      { label: 'Avary Drone', caseId: 'avary-drone-shopify' },
      { label: 'Celine Medspas', caseId: 'celine-medspas-wordpress' },
    ]);
  }
});

test('blog route helpers preserve paired articles', () => {
  const conversion = findBlogPost('site-que-converte', 'pt');
  expect(conversion && blogPath(conversion, 'en')).toBe('/en/blog/website-conversion-strategy');
  expect(pairedBlogPath('/en/blog/seo-geo-ai-search', 'pt')).toBe('/blog/seo-geo-busca-ia');
  expect(pairedBlogPath('/about', 'en')).toBeNull();
});

test('blog artwork is local lightweight SVG', () => {
  for (const { image } of posts) {
    const path = resolve(process.cwd(), 'public', image.slice(1));
    expect(existsSync(path)).toBeTruthy();
    const svg = readFileSync(path, 'utf8');
    expect(svg).toContain('<svg');
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('viewBox="0 0 1600 900"');
    expect(Buffer.byteLength(svg)).toBeLessThan(40_000);
    expectLocalSvgReferences(svg);
  }
});

test('blog artwork reference policy rejects non-local resources', () => {
  for (const unsafeSvg of [
    '<image href="asset.png"/>',
    '<image href="h&#116;tps://evil.test/a"/>',
    '<style>@import "theme.css"</style>',
  ]) {
    expect(() => expectLocalSvgReferences(unsafeSvg)).toThrow();
  }
});
