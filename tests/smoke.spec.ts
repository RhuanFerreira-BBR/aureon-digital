import { expect, test } from '@playwright/test';

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

test('serves favicon', async ({ request }) => {
  const response = await request.get('/favicon.ico');

  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('image');
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
