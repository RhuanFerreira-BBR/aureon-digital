import { existsSync, readFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { cases } from '../src/lib/cases';
import { blogIndexPath, blogPath, findBlogPost, legacyBlogRedirects, pairedBlogPath, posts } from '../src/lib/blog';
import { languageStorageKey } from '../src/lib/language';
import { resolvePageMeta } from '../src/lib/seo';
import { splitParagraphLinks } from '../src/components/PostDetailPage';

const expectLocalSvgReferences = (svg: string) => {
  for (const reference of svg.matchAll(/\b(?:href|src)\s*=\s*(["'])(.*?)\1/gi)) {
    expect(reference[2].trim()).toMatch(/^#/);
  }

  expect(svg).not.toMatch(/@import/i);

  for (const reference of svg.matchAll(/url\(\s*(["']?)(.*?)\1\s*\)/gi)) {
    expect(reference[2].trim()).toMatch(/^#/);
  }
};

const blogLanguages = ['pt', 'en'] as const;
const staticBlogPages = blogLanguages.flatMap(lang => [
  { route: blogIndexPath(lang), lang, article: false },
  ...posts.map(post => ({ route: blogPath(post, lang), lang, article: true })),
]);
const approvedBlogPermalinks = [
  '/blog/site-que-converte',
  '/blog/seo-geo-busca-ia',
  '/blog/performance-core-web-vitals',
  '/blog/quando-redesenhar-site',
  '/en/blog/website-conversion-strategy',
  '/en/blog/seo-geo-ai-search',
  '/en/blog/performance-core-web-vitals',
  '/en/blog/when-to-redesign-website',
] as const;

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
  expect(staticBlogPages.filter(({ article }) => article).map(({ route }) => route)).toEqual(approvedBlogPermalinks);
  const conversion = findBlogPost('site-que-converte', 'pt');
  expect(conversion && blogPath(conversion, 'en')).toBe('/en/blog/website-conversion-strategy');
  expect(pairedBlogPath('/en/blog/seo-geo-ai-search', 'pt')).toBe('/blog/seo-geo-busca-ia');
  expect(pairedBlogPath('/about', 'en')).toBeNull();
});

test('localized article metadata has alternates and schema', () => {
  const meta = resolvePageMeta('/en/blog/seo-geo-ai-search', 'en');
  expect(meta.canonical).toBe('https://aureondigital.co/en/blog/seo-geo-ai-search');
  expect(meta.alternates).toEqual({
    pt: 'https://aureondigital.co/blog/seo-geo-busca-ia',
    en: 'https://aureondigital.co/en/blog/seo-geo-ai-search',
    xDefault: 'https://aureondigital.co/blog/seo-geo-busca-ia',
  });
  expect(meta.schema).toMatchObject({ '@context': 'https://schema.org', '@type': 'Article', inLanguage: 'en' });
});

test('opposite-locale slugs resolve canonical article metadata', () => {
  const portuguese = resolvePageMeta('/blog/website-conversion-strategy', 'pt');
  expect(portuguese.canonical).toBe('https://aureondigital.co/blog/site-que-converte');
  expect(portuguese.robots).toBe('index,follow');
  expect(portuguese.schema).toMatchObject({ '@type': 'Article', inLanguage: 'pt-BR' });
  expect(portuguese.alternates?.en).toBe('https://aureondigital.co/en/blog/website-conversion-strategy');

  const english = resolvePageMeta('/en/blog/site-que-converte', 'en');
  expect(english.canonical).toBe('https://aureondigital.co/en/blog/website-conversion-strategy');
  expect(english.robots).toBe('index,follow');
  expect(english.schema).toMatchObject({ '@type': 'Article', inLanguage: 'en' });
  expect(english.alternates?.pt).toBe('https://aureondigital.co/blog/site-que-converte');
});

test('unknown blog metadata is localized and excluded from the index', () => {
  const meta = resolvePageMeta('/en/blog/unknown/', 'pt');
  expect(meta.title).toBe('Article not found | AUREON');
  expect(meta.canonical).toBe('https://aureondigital.co/en/blog/unknown');
  expect(meta.robots).toBe('noindex,follow');
  expect(meta.schema).toBeUndefined();
});

test('localized blog indexes have paired canonicals', () => {
  const meta = resolvePageMeta('/EN/BLOG/', 'pt');
  expect(meta.title).toBe('Web Design, SEO and GEO Blog | AUREON');
  expect(meta.canonical).toBe('https://aureondigital.co/en/blog');
  expect(meta.alternates).toEqual({
    pt: 'https://aureondigital.co/blog',
    en: 'https://aureondigital.co/en/blog',
    xDefault: 'https://aureondigital.co/blog',
  });
  expect(meta.type).toBe('website');
});

test('sitemap matches both localized blog catalogs', async () => {
  const xml = await readFile(join(process.cwd(), 'public/sitemap.xml'), 'utf8');
  const urls = [...xml.matchAll(/<loc>(https:\/\/aureondigital\.co\/(?:en\/)?blog[^<]*)<\/loc>/g)]
    .map(([, url]) => url);

  expect(urls).toEqual([
    'https://aureondigital.co/blog',
    'https://aureondigital.co/en/blog',
    ...posts.flatMap(post => [
      `https://aureondigital.co${blogPath(post, 'pt')}`,
      `https://aureondigital.co${blogPath(post, 'en')}`,
    ]),
  ]);
  expect(xml).not.toContain('geo-vs-seo-2025');
});

test('root build emits complete localized static blog heads', async () => {
  for (const { route, lang, article } of staticBlogPages) {
    const path = join(process.cwd(), 'dist', route.slice(1), 'index.html');
    const meta = resolvePageMeta(route, lang);
    expect(existsSync(path), path).toBeTruthy();

    const html = await readFile(path, 'utf8');
    expect(html).toContain(`<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}">`);
    expect(html).toContain(`<link rel="canonical" href="${meta.canonical}" />`);
    expect(html.match(/data-aureon-hreflang/g)).toHaveLength(3);
    expect(html.includes('id="article-jsonld"')).toBe(article);
  }
});

test('build emits every legacy redirect before the SPA fallback', async () => {
  for (const htaccessPath of [
    join(process.cwd(), 'public/.htaccess'),
    join(process.cwd(), 'dist/.htaccess'),
  ]) {
    const value = await readFile(htaccessPath, 'utf8');
    const fallbackIndex = value.indexOf('RewriteRule . /index.html [L]');
    expect(fallbackIndex, htaccessPath).toBeGreaterThanOrEqual(0);

    for (const [route, target] of Object.entries(legacyBlogRedirects)) {
      const redirectIndex = value.indexOf(`Redirect 301 ${route} ${target}`);
      expect(redirectIndex, `${htaccessPath}: ${route}`).toBeGreaterThanOrEqual(0);
      expect(redirectIndex, `${htaccessPath}: ${route}`).toBeLessThan(fallbackIndex);
    }
  }

  const builtIndex = await readFile(join(process.cwd(), 'dist/index.html'), 'utf8');
  const assetPrefix = builtIndex.match(/(?:href|src)="(\/(?:aureon-digital\/)?assets\/)[^"]+"/)?.[1];
  expect(['/assets/', '/aureon-digital/assets/']).toContain(assetPrefix);
  const outputBase = assetPrefix === '/aureon-digital/assets/' ? '/aureon-digital' : '';
  for (const [route, target] of Object.entries(legacyBlogRedirects)) {
    const html = await readFile(join(process.cwd(), 'dist', route.slice(1), 'index.html'), 'utf8');
    expect(html).toContain('<meta name="robots" content="noindex,follow" />');
    expect(html).toContain(`<meta http-equiv="refresh" content="0;url=${outputBase}${target}" />`);
    expect(html).toContain(`<link rel="canonical" href="https://aureondigital.co${target}" />`);
  }
});

test('Pages subpath blog media resolves', async ({ page }) => {
  test.skip(process.env.GITHUB_PAGES !== 'true', 'requires the GitHub Pages build');

  await page.goto('/aureon-digital/en/blog/seo-geo-ai-search');
  const image = page.locator('.blog-article-hero img');
  await expect(image).toHaveAttribute('src', '/aureon-digital/blog/seo-geo.svg');
  expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);

  for (const [route, target] of Object.entries(legacyBlogRedirects)) {
    const redirect = await readFile(join(process.cwd(), 'dist', route.slice(1), 'index.html'), 'utf8');
    expect(redirect).toContain(`content="0;url=/aureon-digital${target}"`);
  }
});

test('inline links follow text order and preserve the source paragraph', () => {
  const text = 'Avary Drone vem antes de Celine Medspas.';
  const segments = splitParagraphLinks(text, [
    { label: 'Celine Medspas', caseId: 'celine' },
    { label: 'Avary Drone', caseId: 'avary' },
  ]);

  expect(segments.map(segment => segment.text).join('')).toBe(text);
  expect(segments.filter(segment => segment.kind === 'link').map(segment => segment.text)).toEqual([
    'Avary Drone',
    'Celine Medspas',
  ]);
});

test('inline links ignore absent labels without changing text', () => {
  const text = 'Texto sem o case solicitado.';
  const segments = splitParagraphLinks(text, [{ label: 'Ausente', caseId: 'missing' }]);

  expect(segments.map(segment => segment.text).join('')).toBe(text);
  expect(segments.filter(segment => segment.kind === 'link')).toHaveLength(0);
});

test('repeated inline labels consume successive occurrences', () => {
  const text = 'A A';
  const segments = splitParagraphLinks(text, [
    { label: 'A', caseId: 'first' },
    { label: 'A', caseId: 'second' },
  ]);
  const linked = segments.filter(segment => segment.kind === 'link');

  expect(segments.map(segment => segment.text).join('')).toBe(text);
  expect(linked.map(segment => segment.caseId)).toEqual(['first', 'second']);
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

test('both indexes render the acquisition hub', async ({ page }) => {
  for (const [route, title] of [
    ['/blog', 'Conteúdo para ser encontrado — e escolhido.'],
    ['/en/blog', 'Content built to be found — and chosen.'],
  ] as const) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    await expect(page.locator('[data-blog-card]')).toHaveCount(4);
    await expect(page.locator('[data-blog-index-cta]')).toBeVisible();
  }
});

for (const route of approvedBlogPermalinks) {
  test(`blog route ${route} renders complete local content`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('article h2')).toHaveCount(6);
    await expect(page.locator('[data-blog-sources] li')).not.toHaveCount(0);
    await expect(page.locator('[data-blog-sources] a')).toHaveCount(0);
    const image = page.locator('.blog-article-hero img');
    await expect(image).toHaveJSProperty('complete', true);
    expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  });
}

for (const route of ['/blog', '/en/blog', '/blog/site-que-converte', '/en/blog/seo-geo-ai-search']) {
  test(`mobile blog route ${route} fits`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    expect(await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    )).toBeTruthy();
    const ctas = page.locator('a[data-blog-cta]');
    await expect(ctas).toHaveCount(1);
    for (const cta of await ctas.all()) {
      const box = await cta.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });
}

test('article renders semantic conversion and trust blocks', async ({ page }) => {
  await page.goto('/blog/site-que-converte');
  await expect(page.locator('article')).toHaveCount(1);
  await expect(page.locator('[data-blog-summary]')).toBeVisible();
  await expect(page.locator('nav[aria-label="Neste artigo"] a')).toHaveCount(6);
  await expect(page.locator('[data-blog-case="mini-finance-matcher-react"]')).toBeVisible();
  await expect(page.locator('[data-blog-sources]')).toBeVisible();
  await expect(page.locator('[data-blog-sources] a')).toHaveCount(0);
  const sourceBox = await page.locator('[data-blog-sources] li:visible').first().boundingBox();
  expect(sourceBox).not.toBeNull();
  expect(sourceBox?.height).toBeGreaterThan(0);
});

test('mobile table of contents precedes the article body and stays sticky on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/blog/site-que-converte');
  const sidebar = page.locator('.blog-article-sidebar');
  const body = page.locator('.blog-article-body');
  await expect(sidebar).toBeVisible();
  const mobileSidebarBox = await sidebar.boundingBox();
  const mobileBodyBox = await body.boundingBox();
  expect(mobileSidebarBox?.y).toBeLessThan(mobileBodyBox?.y ?? 0);
  expect(await page.evaluate(() => Boolean(
    document.querySelector('.blog-article-sidebar')?.compareDocumentPosition(document.querySelector('.blog-article-body')!)
      & Node.DOCUMENT_POSITION_FOLLOWING,
  ))).toBeTruthy();

  await page.setViewportSize({ width: 1440, height: 1200 });
  expect(await sidebar.evaluate(element => getComputedStyle(element).position)).toBe('sticky');
});

test('blog artwork uses contain and keeps frames after image failures', async ({ page }) => {
  await page.route('**/blog/site-conversion.svg', route => route.abort());
  await page.goto('/blog');
  const featuredFrame = page.locator('.blog-featured-card .blog-card-art');
  const featuredImage = featuredFrame.locator('img');
  await expect(featuredImage).toHaveJSProperty('hidden', true);
  await expect(featuredImage).toBeHidden();
  await expect(featuredFrame).toBeVisible();
  expect((await featuredFrame.boundingBox())?.height).toBeGreaterThanOrEqual(200);
  expect(await featuredImage.evaluate(element => getComputedStyle(element).objectFit)).toBe('contain');

  await page.goto('/blog/site-que-converte');
  const heroFrame = page.locator('.blog-article-art');
  await expect(heroFrame.locator('img')).toHaveJSProperty('hidden', true);
  await expect(heroFrame.locator('img')).toBeHidden();
  await expect(heroFrame).toBeVisible();
  expect((await heroFrame.boundingBox())?.height).toBeGreaterThanOrEqual(200);

  await page.locator('.blog-next-article').click();
  await expect(page.locator('.blog-article-art img')).toBeVisible();
});

test('related case frame survives failures and resets across article navigation', async ({ page }) => {
  const dove = cases.find(item => item.id === 'dove-global-aem');
  const mini = cases.find(item => item.id === 'mini-finance-matcher-react');
  expect(dove).toBeDefined();
  expect(mini).toBeDefined();
  if (!dove || !mini) throw new Error('Expected Dove and MINI cases');

  await page.route(`**/${dove.heroImage.src.replace(/^\/+/, '')}`, route => route.abort());
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/blog/quando-redesenhar-site');
  await expect(page.locator('[data-blog-case="dove-global-aem"]')).toHaveCount(1);
  const frame = page.locator('.blog-related-case-art');
  await expect(frame.locator('img')).toHaveJSProperty('hidden', true);
  await expect(frame.locator('img')).toBeHidden();
  await expect(frame).toBeVisible();
  expect((await frame.boundingBox())?.height).toBeGreaterThanOrEqual(200);

  await page.locator('.blog-next-article').click();
  await expect(page).toHaveURL(/\/blog\/site-que-converte$/);
  await expect(page.locator('[data-blog-case="mini-finance-matcher-react"]')).toHaveCount(1);
  const miniImage = page.locator('.blog-related-case-art img');
  await expect(miniImage).toHaveAttribute('src', mini.heroImage.src);
  await expect(miniImage).toHaveJSProperty('hidden', false);
  await expect(miniImage).toBeVisible();
  expect(await miniImage.evaluate(element => getComputedStyle(element).display)).toBe('block');
  expect(await miniImage.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
});

test('article hero shows author and localized update date', async ({ page }) => {
  const post = findBlogPost('site-que-converte', 'pt');
  expect(post).toBeDefined();
  if (!post) throw new Error('Expected the conversion article');

  for (const [route, lang, updated] of [
    ['/blog/site-que-converte', 'pt', 'Atualizado em'],
    ['/en/blog/website-conversion-strategy', 'en', 'Updated on'],
  ] as const) {
    await page.goto(route);
    const meta = page.locator('.blog-article-meta');
    const modifiedDate = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', {
      dateStyle: 'long',
      timeZone: 'UTC',
    }).format(new Date(`${post.modified}T00:00:00Z`));
    await expect(meta).toContainText(post.author);
    await expect(meta).toContainText(post.locales[lang].readTime);
    await expect(meta).toContainText(`${updated} ${modifiedDate}`);
  }
});

test('unknown articles use a localized heading', async ({ page }) => {
  for (const [route, heading] of [
    ['/blog/desconhecido', 'Artigo não encontrado.'],
    ['/en/blog/unknown', 'Article not found.'],
  ] as const) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
  }
});

test('reduced motion keeps every blog card visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/blog');
  const cards = page.locator('[data-blog-card]');
  await expect(cards).toHaveCount(4);
  for (const card of await cards.all()) await expect(card).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('language selector preserves the article', async ({ page }) => {
  const post = findBlogPost('seo-geo-busca-ia', 'pt');
  expect(post).toBeDefined();
  await page.goto('/blog/seo-geo-busca-ia');
  await expect(page.getByRole('heading', { level: 1, name: post?.locales.pt.title })).toBeVisible();
  const englishButton = page.getByRole('button', { name: 'EN', exact: true });
  const englishBox = await englishButton.boundingBox();
  expect(englishBox).not.toBeNull();
  expect(englishBox?.width).toBeGreaterThanOrEqual(44);
  expect(englishBox?.height).toBeGreaterThanOrEqual(44);
  await englishButton.click();
  await expect(page).toHaveURL(/\/en\/blog\/seo-geo-ai-search$/);
  await expect(page.getByRole('heading', { level: 1, name: post?.locales.en.title })).toBeVisible();
  const portugueseButton = page.getByRole('button', { name: 'PT', exact: true });
  const portugueseBox = await portugueseButton.boundingBox();
  expect(portugueseBox).not.toBeNull();
  expect(portugueseBox?.width).toBeGreaterThanOrEqual(44);
  expect(portugueseBox?.height).toBeGreaterThanOrEqual(44);
  await portugueseButton.click();
  await expect(page).toHaveURL(/\/blog\/seo-geo-busca-ia$/);
  await expect(page.getByRole('heading', { level: 1, name: post?.locales.pt.title })).toBeVisible();

  await page.goto('/en/blog/seo-geo-ai-search');
  await expect(page.getByRole('heading', { level: 1, name: post?.locales.en.title })).toBeVisible();
});

test('explicit blog locale does not overwrite the saved general preference', async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, 'pt'), languageStorageKey);

  await page.goto('/en/blog');
  await expect(page.getByRole('heading', { level: 1, name: 'Content built to be found — and chosen.' })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), languageStorageKey)).toBe('pt');

  await page.getByRole('contentinfo').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Construímos marcas que são encontradas.' })).toBeVisible();
});

test('mixed-case blog routes keep the URL locale and paired navigation', async ({ page }) => {
  const post = findBlogPost('seo-geo-ai-search', 'en');
  await page.goto('/EN/BLOG/');
  await expect(page.getByRole('heading', { level: 1, name: 'Content built to be found — and chosen.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'PT', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'PT', exact: true }).click();
  await expect(page).toHaveURL(/\/blog$/);

  await page.goto('/EN/BLOG/seo-geo-ai-search');
  await expect(page.getByRole('heading', { level: 1, name: post?.locales.en.title })).toBeVisible();
  await page.getByRole('button', { name: 'PT', exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/seo-geo-busca-ia$/);
});

test('opposite-locale slugs redirect to the canonical article route', async ({ page }) => {
  const post = findBlogPost('site-que-converte', 'pt');
  expect(post).toBeDefined();

  for (const [route, canonical, title] of [
    ['/blog/website-conversion-strategy', '/blog/site-que-converte', post?.locales.pt.title],
    ['/en/blog/site-que-converte', '/en/blog/website-conversion-strategy', post?.locales.en.title],
  ] as const) {
    await page.goto(route);
    await expect(page).toHaveURL(new RegExp(`${canonical}$`));
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
  }
});

test('article head stays idempotent after language navigation', async ({ page }) => {
  await page.goto('/blog/site-que-converte');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[data-aureon-hreflang]')).toHaveCount(3);
  await expect(page.locator('script#article-jsonld')).toHaveCount(1);
});

test('article metadata is removed after leaving the blog', async ({ page }) => {
  await page.goto('/blog/site-que-converte');
  await expect(page.locator('link[data-aureon-hreflang]')).toHaveCount(3);
  await expect(page.locator('script#article-jsonld')).toHaveCount(1);
  await page.getByRole('contentinfo').getByRole('link', { name: 'Sobre', exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator('link[data-aureon-hreflang]')).toHaveCount(0);
  await expect(page.locator('script#article-jsonld')).toHaveCount(0);
});
