import { mkdir, rename, rm } from 'node:fs/promises';
import { chromium } from 'playwright';

const sites = [
  ['dove-global-aem', 'https://www.dove.com/us/en/home.html'],
  ['seda-brasil-aem', 'https://www.seda.com.br/'],
  ['degree-us-aem', 'https://www.degreedeodorant.com/us/en/home.html'],
  ['rexona-brasil-aem', 'https://www.rexona.com/br/home.html'],
  ['tresemme-us-aem', 'https://www.tresemme.com/us/en/home.html'],
  ['magnum-corporate-aem', 'https://corporate.magnumicecream.com/en/home.html'],
  ['axe-us-aem', 'https://www.axe.com/us/en/home.html'],
  ['mini-finance-matcher-react', 'https://financecalculator.mini.co.uk/tool/'],
  ['avary-drone-shopify', 'https://avarydrone.com/'],
  ['resilient-construction-shopify', 'https://useresilient.com/'],
  ['lowkey-stock-shopify', 'https://lowkeystock.com/'],
  ['celine-medspas-wordpress', 'https://www.celinemedspas.com/'],
  ['nuro-club-wordpress', 'https://nuroclub.com/'],
  ['arctic-fox-headless-commerce', 'https://www.arcticfoxhaircolor.com/en-br'],
];

const consentLabels = ['Accept all', 'Accept All Cookies', 'Aceitar todos', 'Allow all', 'I agree'];

async function acceptConsent(page) {
  for (const label of consentLabels) {
    const button = page.getByRole('button', { name: label, exact: true });
    if (!(await button.count())) continue;

    try {
      await button.first().click({ timeout: 2_000 });
      return;
    } catch {
      // Try the next consent label.
    }
  }
}

async function assertValidPage(page, response) {
  if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? 'no response'}`);
  if (/Access Denied|Akamai/i.test(await page.locator('body').innerText())) throw new Error('blocked page');
}

const browser = await chromium.launch();
const failures = [];

try {
  for (const [id, url] of sites) {
    const directory = `public/cases/${id}`;
    const hero = `${directory}/hero.jpg`;
    const mobile = `${directory}/mobile.jpg`;
    const temporaryHero = `${directory}/hero.tmp.jpg`;
    const temporaryMobile = `${directory}/mobile.tmp.jpg`;
    let page;

    try {
      await mkdir(directory, { recursive: true });
      page = await browser.newPage({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
      });

      const desktopResponse = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
      await assertValidPage(page, desktopResponse);
      await acceptConsent(page);
      await page.getByRole('button', { name: 'Close popup', exact: true }).click({ timeout: 2_000 }).catch(() => undefined);
      await page
        .frameLocator('iframe[title="Sign Up via Text for Offers"]')
        .getByRole('button', { name: 'Dismiss this popup', exact: true })
        .click({ timeout: 2_000 })
        .catch(() => undefined);
      await page.waitForTimeout(2_000);
      await page.screenshot({ path: temporaryHero, type: 'jpeg', quality: 82 });

      await page.setViewportSize({ width: 390, height: 844 });
      const mobileResponse = await page.reload({ waitUntil: 'domcontentloaded', timeout: 60_000 });
      await assertValidPage(page, mobileResponse);
      await acceptConsent(page);
      await page.getByRole('button', { name: 'Close popup', exact: true }).click({ timeout: 2_000 }).catch(() => undefined);
      await page
        .frameLocator('iframe[title="Sign Up via Text for Offers"]')
        .getByRole('button', { name: 'Dismiss this popup', exact: true })
        .click({ timeout: 2_000 })
        .catch(() => undefined);
      await page.waitForTimeout(1_500);
      await page.screenshot({ path: temporaryMobile, type: 'jpeg', quality: 82 });

      await rename(temporaryHero, hero);
      await rename(temporaryMobile, mobile);
    } catch (error) {
      failures.push(`${id}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      if (page) await page.close().catch((error) => failures.push(`${id}: ${error.message}`));
      await Promise.all([rm(temporaryHero, { force: true }), rm(temporaryMobile, { force: true })]).catch((error) =>
        failures.push(`${id}: ${error.message}`),
      );
    }
  }

  if (failures.length) throw new Error(`Case capture failed:\n${failures.join('\n')}`);
} finally {
  await browser.close();
}
