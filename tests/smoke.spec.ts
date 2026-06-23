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

test('mobile menu opens and exposes navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /abrir menu/i }).click();
  const nav = page.locator('nav');
  await expect(nav.getByRole('link', { name: 'Cases' }).last()).toBeVisible();
  await expect(nav.getByRole('link', { name: 'Blog' }).last()).toBeVisible();
});
