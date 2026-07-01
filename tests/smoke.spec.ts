import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { expect, test } from '@playwright/test';

import { contactHref } from '../src/lib/contact';
import { cases, caseText, disciplineLabels } from '../src/lib/cases';
import { resolvePageMeta } from '../src/lib/seo';

const routes = [
  '/',
  '/services',
  '/cases',
  '/cases/techbrasil-seo',
  '/blog',
  '/blog/geo-vs-seo-2025',
  '/about',
  '/faq',
  '/privacy',
  '/terms',
];

for (const route of routes) {
  test(`renders ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBeTruthy();
    const screenshot = await page.screenshot({ fullPage: (page.viewportSize()?.width ?? 0) >= 768 });
    expect(screenshot.length).toBeGreaterThan(10_000);
  });
}

const seoCases = [
  { route: '/', title: 'AUREON | Web Design, SEO e GEO', canonical: 'https://aureondigital.co/' },
  { route: '/services', title: 'Serviços de Web Design, SEO e GEO | AUREON', canonical: 'https://aureondigital.co/services' },
  {
    route: '/blog/geo-vs-seo-2025',
    title: 'GEO vs SEO: Why the next decade belongs to AI search | AUREON',
    canonical: 'https://aureondigital.co/blog/geo-vs-seo-2025',
  },
];

test('portfolio case catalog is complete and internally valid', () => {
  expect(cases).toHaveLength(14);
  expect(new Set(cases.map(({ id }) => id)).size).toBe(14);
  expect(new Set(cases.map(({ sourceUrl }) => sourceUrl)).size).toBe(14);
  expect(cases.filter(({ featured }) => featured).map(({ client }) => client)).toEqual([
    'Dove',
    'MINI Finance Matcher',
    'Arctic Fox Hair Color',
  ]);

  const ids = new Set(cases.map(({ id }) => id));
  for (const portfolioCase of cases) {
    for (const lang of ['pt', 'en'] as const) {
      expect(caseText(portfolioCase.title, lang).length).toBeGreaterThan(20);
      expect(caseText(portfolioCase.summary, lang).length).toBeGreaterThan(40);
      expect(caseText(portfolioCase.summary, lang).length).toBeLessThanOrEqual(200);
    }

    expect(portfolioCase.highlights).toHaveLength(3);
    expect(portfolioCase.metrics).toHaveLength(3);
    expect(portfolioCase.metrics.every(({ evidence }) => ['scope', 'estimated'].includes(evidence))).toBeTruthy();
    expect(portfolioCase.disciplines.every((discipline) => disciplineLabels[discipline])).toBeTruthy();
    expect(portfolioCase.relatedCaseIds.every((relatedCaseId) => ids.has(relatedCaseId))).toBeTruthy();
  }
});

test('portfolio case media is stored locally', async ({ page }) => {
  const images = cases.flatMap(({ heroImage, gallery }) => [heroImage, ...gallery]);
  const hashes = new Set<string>();

  expect(images).toHaveLength(28);
  await page.goto('/');

  for (const image of images) {
    expect(image.src).toMatch(/^\/cases\/.+\.(jpg|png|webp|svg)$/);
    const path = join(process.cwd(), 'public', image.src.slice(1));
    expect(existsSync(path)).toBeTruthy();

    const contents = await readFile(path);
    expect(contents.byteLength).toBeGreaterThan(10_000);
    hashes.add(createHash('sha256').update(contents).digest('hex'));

    const dimensions = await page.evaluate(async (src) => {
      const image = new Image();
      image.src = src;
      await image.decode();
      return { width: image.naturalWidth, height: image.naturalHeight };
    }, image.src);
    expect(image.src.endsWith('/hero.jpg') ? [[1440, 900], [1425, 891]] : [[390, 844], [375, 812]]).toContainEqual([
      dimensions.width,
      dimensions.height,
    ]);
  }

  expect(hashes.size).toBe(28);
});

for (const seoCase of seoCases) {
  test(`sets SEO metadata for ${seoCase.route}`, async ({ page }) => {
    await page.goto(seoCase.route);
    await expect(page).toHaveTitle(seoCase.title);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.length).toBeGreaterThanOrEqual(40);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', seoCase.canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', seoCase.canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://aureondigital.co/aureon-logo.png');
  });
}

for (const route of ['/services/', '/Services']) {
  test(`normalizes SEO metadata for ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveTitle('Serviços de Web Design, SEO e GEO | AUREON');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://aureondigital.co/services');
  });
}

test('normalizes SEO metadata canonical without leaving the site origin', () => {
  const malicious = resolvePageMeta('//evil.example/path', 'pt');
  expect(malicious.canonical).toBe('https://aureondigital.co/evil.example/path');
  expect(malicious.robots).toBe('noindex,follow');

  expect(() => resolvePageMeta('//', 'pt')).not.toThrow();
  expect(new URL(resolvePageMeta('//', 'pt').canonical).origin).toBe('https://aureondigital.co');
});

test('normalizes trailing slashes for dynamic SEO metadata', () => {
  const post = resolvePageMeta('/blog/geo-vs-seo-2025/', 'pt');
  expect(post.type).toBe('article');
  expect(post.robots).toBe('index,follow');
  expect(post.canonical).toBe('https://aureondigital.co/blog/geo-vs-seo-2025');

  const caseMeta = resolvePageMeta('/cases/techbrasil-seo/', 'pt');
  expect(caseMeta.robots).toBe('noindex,follow');
  expect(caseMeta.canonical).toBe('https://aureondigital.co/cases/techbrasil-seo');
});

test('normalizes mixed-case blog prefix in SEO metadata', () => {
  const meta = resolvePageMeta('/Blog/geo-vs-seo-2025', 'pt');
  expect(meta.title).toBe('GEO vs SEO: Why the next decade belongs to AI search | AUREON');
  expect(meta.robots).toBe('index,follow');
  expect(meta.type).toBe('article');
  expect(meta.canonical).toBe('https://aureondigital.co/blog/geo-vs-seo-2025');
});

test('normalizes mixed-case case prefix in SEO metadata', () => {
  const meta = resolvePageMeta('/Cases/techbrasil-seo', 'pt');
  expect(meta.title).toBe('Case em preparação | AUREON');
  expect(meta.robots).toBe('noindex,follow');
  expect(meta.canonical).toBe('https://aureondigital.co/cases/techbrasil-seo');
});

test('keeps SEO metadata idempotent after changing language', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page).toHaveTitle('AUREON | Web Design, SEO and GEO');

  for (const selector of [
    'meta[name="description"]',
    'meta[name="robots"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[property="og:type"]',
    'meta[property="og:url"]',
    'meta[property="og:site_name"]',
    'meta[property="og:locale"]',
    'meta[property="og:image"]',
    'meta[property="og:image:alt"]',
    'link[rel="canonical"]',
  ]) {
    await expect(page.locator(selector)).toHaveCount(1);
  }
});

test('keeps fictional case details out of the index', async ({ page }) => {
  await page.goto('/cases/techbrasil-seo');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
});

test('marks unknown routes as noindex', async ({ page }) => {
  await page.goto('/missing-page');
  await expect(page).toHaveTitle('Página não encontrada | AUREON');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
});

test('contact form describes the mailto handoff and has accessible labels', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByLabel('Seu nome')).toBeVisible();
  await expect(page.getByLabel('E-mail')).toBeVisible();
  await expect(page.getByLabel('Seu nome')).toHaveAttribute('autocomplete', 'name');
  await expect(page.getByLabel('E-mail')).toHaveAttribute('autocomplete', 'email');
  await expect(page.getByLabel('Serviço')).toBeVisible();
  await expect(page.getByLabel('Mensagem')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Abrir e-mail' })).toBeVisible();
  await expect(page.getByText('Localização', { exact: true })).toBeVisible();
  await expect(page.getByText('Tempo de resposta', { exact: true })).toBeVisible();
});

test('contact href serializes RFC 6068 spaces and CRLF exactly', () => {
  expect(contactHref('en', 'Project inquiry', 'Line one\nLine two')).toBe(
    'mailto:contact@aureondigital.co?subject=Project%20inquiry&body=Line%20one%0D%0ALine%20two',
  );
});

test('contact service selection uses the corresponding localized label after a language change', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Serviço').selectOption({ label: 'Estratégia Completa' });
  await page.getByRole('button', { name: 'EN', exact: true }).click();

  const service = page.getByLabel('Service');
  await expect(service).toHaveValue('3');
  await expect(service.locator('option:checked')).toHaveText('Full Strategy');
});

test('Portuguese process chrome contains no English placeholders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Cronograma', { exact: true })).toBeAttached();
  await expect(page.getByText('4–8 semanas', { exact: true })).toBeAttached();
  await expect(page.getByText('Do briefing à publicação, normalmente', { exact: true })).toBeAttached();
  await expect(page.getByText('Timeline', { exact: true })).toHaveCount(0);
});

test('serves favicon', async ({ request }) => {
  const response = await request.get('/favicon.ico');

  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('image');
});

test('Hostinger build includes the SPA fallback', async () => {
  const fallback = await readFile(resolve(process.cwd(), 'dist', '.htaccess'), 'utf8');

  expect(fallback).toContain('RewriteEngine On');
  expect(fallback).toContain('RewriteCond %{REQUEST_FILENAME} !-f');
  expect(fallback).toContain('RewriteCond %{REQUEST_FILENAME} !-d');
  expect(fallback).toContain('RewriteRule . /index.html [L]');
});

test('mobile menu opens and exposes navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /abrir menu/i }).click();
  const nav = page.locator('nav');
  await expect(nav.getByRole('link', { name: 'Cases' }).last()).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Blog' }).last()).toBeVisible();

  const cta = nav.getByRole('link', { name: /iniciar projeto/i });
  await expect(cta).toBeVisible();
  const ctaBox = await cta.boundingBox();
  expect(ctaBox?.height).toBeGreaterThanOrEqual(44);
});

test('mobile contact fields stack and the hero cue does not overlap metrics', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const cue = page.locator('.hero-scroll-cue');
  await expect(cue).toHaveCount(1);
  await expect(cue).toBeHidden();

  const nameBox = await page.getByLabel('Seu nome').boundingBox();
  const emailBox = await page.getByLabel('E-mail').boundingBox();
  expect(nameBox?.width).toBeGreaterThan(240);
  expect(emailBox?.width).toBeGreaterThan(240);
  expect(emailBox?.y).toBeGreaterThan((nameBox?.y ?? 0) + (nameBox?.height ?? 0));
});

test('hero cue stays hidden below the desktop breakpoint', async ({ page }) => {
  for (const width of [521, 768, 991]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');
    await expect(page.locator('.hero-scroll-cue')).toBeHidden();
  }
});

test('mobile case summary and metadata fit the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cases');

  const periodBox = await page.getByText('2025–26', { exact: true }).boundingBox();
  expect((periodBox?.x ?? 390) + (periodBox?.width ?? 0)).toBeLessThanOrEqual(366);

  await page.goto('/cases/techbrasil-seo');
  const metadata = page.locator('.case-meta-list');
  await expect(metadata).toHaveCount(1);
  expect(await metadata.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBeTruthy();
});

for (const width of [390, 768, 991, 992]) {
  test(`top navigation controls fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/');

    if (width < 992) {
      await expect(page.getByRole('button', { name: /abrir menu/i })).toBeVisible();
      await expect(page.locator('.nav-cta')).toBeHidden();
    } else {
      await expect(page.getByRole('button', { name: /abrir menu/i })).toBeHidden();
      await expect(page.locator('.nav-cta')).toBeVisible();
    }

    const offscreen = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const topBar = document.querySelector('nav > div:first-child > div');
      if (!topBar) return ['top bar not found'];

      return [...topBar.querySelectorAll('a, button')]
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            text: (el.textContent || el.getAttribute('aria-label') || '').trim(),
            left: rect.left,
            right: rect.right,
            width: rect.width,
          };
        })
        .filter((item) => item.width > 0 && (item.left < -1 || item.right > viewportWidth + 1))
        .map((item) => `${item.text}: ${Math.round(item.left)}-${Math.round(item.right)} / ${viewportWidth}`);
    });

    expect(offscreen).toEqual([]);
  });
}
