import { expect, test } from '@playwright/test';

const routes = ['/', '/services', '/work', '/work/norte-clinica', '/about', '/insights', '/contact', '/en'];

for (const route of routes) {
  test(`renders ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('.site-header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('.site-footer')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBeTruthy();
    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot.length).toBeGreaterThan(10_000);
  });
}

test('mobile menu opens and exposes navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: /abrir menu/i }).click();
  await expect(page.locator('.mobile-menu.open')).toBeVisible();
  await expect(page.locator('.mobile-menu.open').getByRole('link', { name: 'Serviços' })).toBeVisible();
});
