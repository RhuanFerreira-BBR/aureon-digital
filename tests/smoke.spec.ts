import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';

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
