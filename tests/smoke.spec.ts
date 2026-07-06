import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { expect, test } from '@playwright/test';

import { contactHref } from '../src/lib/contact';
import { cases, caseMediaUrl, caseText, disciplineLabels } from '../src/lib/cases';
import { resolvePageMeta } from '../src/lib/seo';

const routes = [
  '/',
  '/services',
  '/cases',
  '/cases/dove-global-aem',
  '/blog',
  '/blog/site-que-converte',
  '/about',
  '/faq',
  '/privacy',
  '/terms',
];

for (const route of routes) {
  test(`renders ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('#root > div > nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBeTruthy();
    const screenshot = await page.screenshot({ fullPage: (page.viewportSize()?.width ?? 0) >= 768 });
    expect(screenshot.length).toBeGreaterThan(10_000);
  });
}

const seoCases = [
  { route: '/', title: 'AUREON | Web Design, SEO e GEO', canonical: 'https://aureondigital.co/' },
  { route: '/services', title: 'Serviços de Web Design, SEO e GEO | AUREON', canonical: 'https://aureondigital.co/services' },
  {
    route: '/blog/site-que-converte',
    title: 'Como transformar tráfego em oportunidades qualificadas | AUREON',
    canonical: 'https://aureondigital.co/blog/site-que-converte',
    image: 'https://aureondigital.co/blog/site-conversion.svg',
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

test('case media URLs support root and GitHub Pages bases', () => {
  expect(caseMediaUrl('/cases/dove-global-aem/hero.jpg', '/')).toBe('/cases/dove-global-aem/hero.jpg');
  expect(caseMediaUrl('/cases/dove-global-aem/hero.jpg', '/horizon-collective/')).toBe(
    '/horizon-collective/cases/dove-global-aem/hero.jpg',
  );
});

test('Pages subpath case media', async ({ page }) => {
  test.skip(process.env.GITHUB_PAGES !== 'true', 'requires the GitHub Pages build');

  await page.goto('/horizon-collective/cases/dove-global-aem');
  const hero = page.locator('.portfolio-case-hero-image img');
  await expect(hero).toHaveAttribute('src', '/horizon-collective/cases/dove-global-aem/hero.jpg');
  expect(await hero.evaluate(image => image.naturalWidth)).toBeGreaterThan(0);

  const heroResponse = await page.request.get(await hero.getAttribute('src') as string);
  expect(heroResponse.status()).toBe(200);

  const gallery = page.locator('.portfolio-case-gallery img');
  await expect(gallery).toHaveAttribute('src', '/horizon-collective/cases/dove-global-aem/mobile.jpg');
  expect(await gallery.evaluate(image => image.naturalWidth)).toBeGreaterThan(0);

  const galleryResponse = await page.request.get(await gallery.getAttribute('src') as string);
  expect(galleryResponse.status()).toBe(200);

  await page.goto('/horizon-collective/');
  const preview = page.locator('[data-case-preview]').filter({ hasText: 'Dove' }).locator('img');
  await expect(preview).toHaveAttribute('src', '/horizon-collective/cases/dove-global-aem/hero.jpg');
  expect(await preview.evaluate(image => image.naturalWidth)).toBeGreaterThan(0);

  await page.goto('/horizon-collective/cases');
  const card = page.locator('[data-case-card]').filter({ hasText: 'Dove' }).locator('img');
  await expect(card).toHaveAttribute('src', '/horizon-collective/cases/dove-global-aem/hero.jpg');
  expect(await card.evaluate(image => image.naturalWidth)).toBeGreaterThan(0);
});

test('Pages workflow tests subpath media after building its dist', async () => {
  const workflow = await readFile(resolve(process.cwd(), '.github', 'workflows', 'pages.yml'), 'utf8');
  const build = workflow.indexOf('- name: Build for GitHub Pages');
  const pagesTest = workflow.indexOf('- name: Test GitHub Pages subpath');

  expect(build).toBeGreaterThan(-1);
  expect(pagesTest).toBeGreaterThan(build);
  expect(workflow.indexOf('npx playwright test tests/smoke.spec.ts tests/blog.spec.ts -g "Pages subpath" --project=chromium-desktop --workers=1')).toBeGreaterThan(pagesTest);
});

test('real case metadata is indexable and uses local social media', async ({ page }) => {
  const meta = resolvePageMeta('/cases/dove-global-aem', 'pt');

  expect(meta.title).toContain('Dove');
  expect(meta.description).toContain('AEM');
  expect(meta.canonical).toBe('https://aureondigital.co/cases/dove-global-aem');
  expect(meta.robots).toBe('index,follow');
  expect(meta.image).toBe('https://aureondigital.co/cases/dove-global-aem/hero.jpg');
  expect(meta.imageAlt).toBe('Página inicial do projeto Dove');

  await page.goto('/cases/dove-global-aem');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', meta.image);
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', meta.imageAlt);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', meta.image);
  await expect(page.locator('meta[name="twitter:image:alt"]')).toHaveAttribute('content', meta.imageAlt);
});

test('localizes case social image alt text', () => {
  expect(resolvePageMeta('/cases/dove-global-aem', 'pt').imageAlt).toBe('Página inicial do projeto Dove');
  expect(resolvePageMeta('/cases/dove-global-aem', 'en').imageAlt).toBe('Dove project homepage');
});

test('every real case resolves unique indexable metadata', () => {
  const metadata = cases.map(({ id }) => resolvePageMeta(`/cases/${id.toUpperCase()}`, 'en'));

  expect(new Set(metadata.map(({ title }) => title)).size).toBe(14);
  for (const [index, meta] of metadata.entries()) {
    expect(meta.robots).toBe('index,follow');
    expect(meta.canonical).toBe(`https://aureondigital.co/cases/${cases[index].id}`);
  }
});

for (const item of cases) {
  test(`renders real case ${item.id}`, async ({ page }) => {
    await page.goto(`/cases/${item.id}`);

    await expect(page.getByText(item.client, { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(caseText(item.title, 'pt'));
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://aureondigital.co/cases/${item.id}`,
    );
  });
}

test('uppercase real case route renders the canonical Dove case', async ({ page }) => {
  await page.goto('/cases/DOVE-GLOBAL-AEM');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('beleza real');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://aureondigital.co/cases/dove-global-aem',
  );
});

test('build emits static Portuguese social metadata for every real case', async () => {
  const rootHtml = await readFile(resolve(process.cwd(), 'dist', 'index.html'), 'utf8');
  const rootAssets = [...rootHtml.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+)"/g)].map(([, asset]) => asset);

  expect(rootAssets).toHaveLength(2);
  for (const item of cases) {
    const meta = resolvePageMeta(`/cases/${item.id}`, 'pt');
    const html = await readFile(resolve(process.cwd(), 'dist', 'cases', item.id, 'index.html'), 'utf8');

    expect(html).toContain('<html lang="pt-BR">');
    expect(html).toContain(`<title>${meta.title}</title>`);
    expect(html).toContain(`<meta name="description" content="${meta.description}"`);
    expect(html).toContain(`<meta name="robots" content="${meta.robots}"`);
    expect(html).toContain(`<link rel="canonical" href="${meta.canonical}"`);
    expect(html).toContain(`<meta property="og:title" content="${meta.title}"`);
    expect(html).toContain(`<meta property="og:description" content="${meta.description}"`);
    expect(html).toContain(`<meta property="og:type" content="${meta.type}"`);
    expect(html).toContain(`<meta property="og:url" content="${meta.canonical}"`);
    expect(html).toContain(`<meta property="og:locale" content="${meta.locale}"`);
    expect(html).toContain(`<meta property="og:image" content="${meta.image}"`);
    expect(html).toContain(`<meta property="og:image:alt" content="${meta.imageAlt}"`);
    expect(html).toContain('<meta name="twitter:card" content="summary_large_image"');
    expect(html).toContain(`<meta name="twitter:title" content="${meta.title}"`);
    expect(html).toContain(`<meta name="twitter:description" content="${meta.description}"`);
    expect(html).toContain(`<meta name="twitter:image" content="${meta.image}"`);
    expect(html).toContain(`<meta name="twitter:image:alt" content="${meta.imageAlt}"`);
    for (const asset of rootAssets) expect(html).toContain(asset);
  }
});

test('root build ships default Twitter metadata without JavaScript', async () => {
  const html = await readFile(resolve(process.cwd(), 'dist', 'index.html'), 'utf8');

  expect(html).toContain('<meta name="twitter:card" content="summary_large_image"');
  expect(html).toContain('<meta name="twitter:title" content="AUREON | Web Design, SEO e GEO"');
  expect(html).toContain('<meta name="twitter:description" content="Agência digital de Web Design, SEO e GEO');
  expect(html).toContain('<meta name="twitter:image" content="https://aureondigital.co/aureon-logo.png"');
  expect(html).toContain('<meta name="twitter:image:alt" content="AUREON Digital Agency"');
});

test('sitemap case slugs exactly match the portfolio catalog', async () => {
  const sitemap = await readFile(resolve(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
  const slugs = [...sitemap.matchAll(/<loc>https:\/\/aureondigital\.co\/cases\/([^<]+)<\/loc>/g)]
    .map(([, slug]) => slug);

  expect(slugs).toHaveLength(14);
  expect(slugs).toEqual(cases.map(({ id }) => id));
});

test('homepage shows the three configured portfolio features', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[data-case-preview]')).toHaveCount(3);
  await expect(page.getByText('Dove', { exact: true })).toBeVisible();
  await expect(page.getByText('MINI Finance Matcher', { exact: true })).toBeVisible();
  await expect(page.getByText('Arctic Fox Hair Color', { exact: true })).toBeVisible();
});

test('cases index filters by platform and discipline and recovers from empty results', async ({ page }) => {
  await page.goto('/cases');

  await expect(page.locator('[data-case-card]')).toHaveCount(14);
  await page.getByRole('button', { name: 'Shopify', exact: true }).click();
  await expect(page.locator('[data-case-card]')).toHaveCount(3);
  await page.getByRole('button', { name: 'Commerce', exact: true }).click();
  await expect(page.locator('[data-case-card]')).toHaveCount(3);
  await page.getByRole('button', { name: 'React', exact: true }).click();
  await expect(page.getByText('Nenhum projeto combina com esses filtros.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Limpar filtros', exact: true }).click();
  await expect(page.locator('[data-case-card]')).toHaveCount(14);
  const doveCard = page.locator('[data-case-card]').filter({ hasText: 'Dove' });
  await expect(doveCard).toHaveCount(1);
  await expect(doveCard.locator('.case-list-item')).toHaveCSS('opacity', '1');

  const resultCount = page.locator('[aria-live="polite"]');
  await expect(resultCount).toHaveText('14 projetos');
  await page.getByRole('button', { name: 'Headless Commerce', exact: true }).click();
  await expect(page.locator('[data-case-card]')).toHaveCount(1);
  await expect(resultCount).toHaveText('1 projeto');
});

test('AEM case discloses attribution and estimated impact', async ({ page }) => {
  await page.goto('/cases/dove-global-aem');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('beleza real');
  await expect(page.getByText('Trabalho realizado em equipe via agência parceira para a Unilever.', { exact: true })).toBeVisible();
  await expect(page.getByText('Impacto indicativo — estimativas não auditadas', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Visitar website' })).toHaveAttribute('href', 'https://www.dove.com/us/en/home.html');
  await expect(page.getByRole('link', { name: 'Visitar website' })).toHaveAttribute('target', '_blank');
  await expect(page.getByRole('link', { name: 'Visitar website' })).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(page.locator('.portfolio-case-attribution')).toHaveCSS('color', 'rgb(138, 145, 184)');
  await expect(page.locator('.portfolio-case-impact-grid small').first()).toHaveCSS('color', 'rgb(138, 145, 184)');
});

test('regional brand cases cross-link Degree and Rexona', async ({ page }) => {
  await page.goto('/cases/degree-us-aem');

  await expect(page.getByRole('link', { name: /Rexona Brasil/ })).toHaveAttribute('href', '/cases/rexona-brasil-aem');
});

test('case modules expose project-specific proof', async ({ page }) => {
  await page.goto('/cases/mini-finance-matcher-react');
  await expect(page.locator('[data-case-module="decisionTool"]')).toBeVisible();

  await page.goto('/cases/nuro-club-wordpress');
  await expect(page.locator('[data-case-module="gatedExperience"]')).toBeVisible();
});

test('case detail follows the language selector', async ({ page }) => {
  await page.goto('/cases/arctic-fox-headless-commerce');
  await page.getByRole('button', { name: 'EN', exact: true }).click();

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Headless commerce');
  await expect(page.getByText('Indicative impact — unaudited estimates', { exact: true })).toBeVisible();
});

test('case detail hides a broken hero image while preserving its frame', async ({ page }) => {
  await page.route('**/cases/dove-global-aem/hero.jpg', route => route.abort());
  await page.goto('/cases/dove-global-aem');

  const frame = page.locator('.portfolio-case-hero-image');
  const image = frame.locator('img');
  await expect(image).toHaveJSProperty('hidden', true);
  await expect(image).toHaveCSS('display', 'none');
  await expect(frame).toBeVisible();
  expect((await frame.boundingBox())?.height).toBeGreaterThanOrEqual(240);

  await page.locator('.portfolio-case-next').click();
  await expect(page).toHaveURL(/\/cases\/seda-brasil-aem$/);
  await expect(image).toHaveAttribute('src', '/cases/seda-brasil-aem/hero.jpg');
  await expect(image).toHaveJSProperty('hidden', false);
  await expect(image).toHaveCSS('display', 'block');
  expect(await image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
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
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      seoCase.image ?? 'https://aureondigital.co/aureon-logo.png',
    );
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
  const post = resolvePageMeta('/blog/site-que-converte/', 'pt');
  expect(post.type).toBe('article');
  expect(post.robots).toBe('index,follow');
  expect(post.canonical).toBe('https://aureondigital.co/blog/site-que-converte');

  const caseMeta = resolvePageMeta('/cases/techbrasil-seo/', 'pt');
  expect(caseMeta.robots).toBe('noindex,follow');
  expect(caseMeta.canonical).toBe('https://aureondigital.co/cases/techbrasil-seo');
});

test('normalizes mixed-case blog prefix in SEO metadata', () => {
  const meta = resolvePageMeta('/Blog/site-que-converte', 'pt');
  expect(meta.title).toBe('Como transformar tráfego em oportunidades qualificadas | AUREON');
  expect(meta.robots).toBe('index,follow');
  expect(meta.type).toBe('article');
  expect(meta.canonical).toBe('https://aureondigital.co/blog/site-que-converte');
});

test('normalizes mixed-case unknown routes in SEO metadata', () => {
  const meta = resolvePageMeta('/Cases/techbrasil-seo', 'pt');
  expect(meta.title).toBe('Case não encontrado | AUREON');
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
    'meta[name="twitter:card"]',
    'meta[name="twitter:title"]',
    'meta[name="twitter:description"]',
    'meta[name="twitter:image"]',
    'meta[name="twitter:image:alt"]',
    'link[rel="canonical"]',
  ]) {
    await expect(page.locator(selector)).toHaveCount(1);
  }

  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', 'AUREON | Web Design, SEO and GEO');
  await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
    'content',
    'A digital agency for businesses that want to be found, earn trust, and convert more through Web Design, SEO, and GEO.',
  );
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

  const heroGrid = page.locator('.case-page-hero-grid');
  await expect(heroGrid).toHaveCount(1);
  expect(await heroGrid.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1);

  const metrics = page.locator('.case-page-metrics');
  const reachMetric = metrics.getByText('Global + local', { exact: true });
  await expect(metrics).toHaveCSS('display', 'grid');
  expect(await reachMetric.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBeTruthy();
  const metricsBox = await metrics.boundingBox();
  const reachBox = await reachMetric.boundingBox();
  expect((reachBox?.x ?? 390) + (reachBox?.width ?? 0)).toBeLessThanOrEqual(
    (metricsBox?.x ?? 0) + (metricsBox?.width ?? 0) + 1,
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBeTruthy();

  await page.goto('/cases/dove-global-aem');
  const metadata = page.locator('.portfolio-case-meta');
  await expect(metadata).toHaveCount(1);
  expect(await metadata.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBeTruthy();
});

for (const slug of [
  'dove-global-aem',
  'mini-finance-matcher-react',
  'avary-drone-shopify',
  'celine-medspas-wordpress',
  'arctic-fox-headless-commerce',
]) {
  test(`mobile real case ${slug} fits the viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/cases/${slug}`);

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBeTruthy();
    await expect(page.locator('.portfolio-case-meta')).toBeVisible();
    await expect(page.locator('.portfolio-case-gallery')).toBeVisible();
    await expect(page.locator('.portfolio-case-impact')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Visitar website' })).toBeVisible();
  });
}

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
