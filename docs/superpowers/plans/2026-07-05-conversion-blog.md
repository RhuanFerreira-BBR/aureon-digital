# Conversion Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four existing posts with a bilingual AUREON acquisition hub whose eight localized article pages are accessible, indexable, statically emitted, and connected to relevant services and cases.

**Architecture:** Store the four articles in one typed local catalog with separate PT-BR and EN slugs and content blocks. Render explicit `/blog` and `/en/blog` routes with React and existing Sass, then extend the current SEO resolver and Vite `closeBundle` plugin for canonical metadata, hreflang, JSON-LD, static route heads, legacy redirects, and both deployment bases.

**Tech Stack:** React 19, React Router 7, TypeScript 6, Sass, Vite 8, Playwright 1.60, Apache `.htaccess`; no new dependencies.

---

## File map

- Create `src/lib/blog.ts`: typed bilingual catalog, route helpers, legacy redirects.
- Create `src/components/PostDetailPage.tsx`: structured article renderer and approved detail layout.
- Create `tests/blog.spec.ts`: focused catalog, route, SEO, static, redirect, and responsive coverage.
- Create four local SVGs under `public/blog/`.
- Modify `src/components/BlogPage.tsx`: approved acquisition-hub index only.
- Modify `src/App.tsx` and `src/components/Nav.tsx`: localized routes and route-aware language selection.
- Modify `src/lib/seo.ts`: localized metadata, alternates, schema, and idempotent head updates.
- Modify `src/styles/main.scss`: approved blog layouts, focus, reduced motion, responsive rules.
- Modify `vite.config.ts`, `public/.htaccess`, `public/sitemap.xml`, and `.github/workflows/pages.yml`: static output, redirects, route inventory, Pages smoke.
- Modify `tests/smoke.spec.ts`: replace old-slug assumptions while preserving shared regressions.
- Delete `src/lib/data.ts` only after all consumers move to `src/lib/blog.ts`.

## Route matrix

| Topic | PT-BR | EN |
|---|---|---|
| Index | `/blog` | `/en/blog` |
| Conversion | `/blog/site-que-converte` | `/en/blog/website-conversion-strategy` |
| SEO + GEO | `/blog/seo-geo-busca-ia` | `/en/blog/seo-geo-ai-search` |
| Performance | `/blog/performance-core-web-vitals` | `/en/blog/performance-core-web-vitals` |
| Redesign | `/blog/quando-redesenhar-site` | `/en/blog/when-to-redesign-website` |

---

### Task 1: Add the typed bilingual editorial catalog

**Files:** Create `src/lib/blog.ts`; create `tests/blog.spec.ts`.

- [ ] **Step 1: Write the failing catalog tests**

```ts
import { expect, test } from '@playwright/test';
import { blogPath, findBlogPost, pairedBlogPath, posts } from '../src/lib/blog';

test('blog catalog contains four complete bilingual acquisition articles', () => {
  expect(posts).toHaveLength(4);
  expect(posts.filter(({ featured }) => featured)).toHaveLength(1);
  const slugs = new Set<string>();
  for (const post of posts) {
    expect(post.image).toMatch(/^\/blog\/.+\.svg$/);
    expect(post.sources.length).toBeGreaterThan(0);
    for (const lang of ['pt', 'en'] as const) {
      const locale = post.locales[lang];
      expect(locale.title.length).toBeGreaterThan(30);
      expect(locale.excerpt.length).toBeGreaterThan(80);
      expect(locale.seoDescription.length).toBeGreaterThanOrEqual(120);
      expect(locale.blocks.filter(({ kind }) => kind === 'heading')).toHaveLength(6);
      expect(locale.blocks.some(({ kind }) => kind === 'checklist')).toBeTruthy();
      expect(locale.blocks.some(({ kind }) => kind === 'cta')).toBeTruthy();
      expect(locale.blocks.some(({ kind }) => kind === 'case')).toBeTruthy();
      expect(slugs.has(locale.slug)).toBeFalsy();
      slugs.add(locale.slug);
    }
  }
});

test('blog route helpers preserve paired articles', () => {
  const conversion = findBlogPost('site-que-converte', 'pt');
  expect(conversion && blogPath(conversion, 'en')).toBe('/en/blog/website-conversion-strategy');
  expect(pairedBlogPath('/en/blog/seo-geo-ai-search', 'pt')).toBe('/blog/seo-geo-busca-ia');
  expect(pairedBlogPath('/about', 'en')).toBeNull();
});
```

- [ ] **Step 2: Run RED**

```powershell
npx.cmd playwright test tests/blog.spec.ts -g "catalog|route helpers" --project=chromium-desktop --workers=1
```

Expected: FAIL because `src/lib/blog.ts` does not exist.

- [ ] **Step 3: Implement the exact public model and helpers**

```ts
export type BlogLang = 'pt' | 'en';
export type BlogBlock =
  | { kind: 'heading'; id: string; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'callout'; label: string; text: string }
  | { kind: 'checklist'; label: string; items: string[] }
  | { kind: 'cta'; label: string; title: string; text: string; button: string }
  | { kind: 'case'; caseId: string }
  | { kind: 'sources'; label: string };

export interface BlogLocale {
  slug: string; category: string; title: string; excerpt: string; readTime: string;
  seoTitle: string; seoDescription: string; imageAlt: string; blocks: BlogBlock[];
}

export interface BlogPost {
  id: string; featured: boolean; accent: string; image: string;
  published: string; modified: string; author: string; relatedCaseId: string;
  serviceHref: string; sources: Array<{ label: string; url: string }>;
  locales: Record<BlogLang, BlogLocale>;
}

export const blogPath = (post: BlogPost, lang: BlogLang) =>
  `${lang === 'en' ? '/en' : ''}/blog/${post.locales[lang].slug}`;
export const blogIndexPath = (lang: BlogLang) => lang === 'en' ? '/en/blog' : '/blog';
export const findBlogPost = (slug: string, lang: BlogLang) =>
  posts.find(post => post.locales[lang].slug.toLowerCase() === slug.toLowerCase());

export function pairedBlogPath(pathname: string, targetLang: BlogLang) {
  const match = pathname.match(/^\/(en\/)?blog(?:\/([^/]+))?\/?$/i);
  if (!match) return null;
  if (!match[2]) return blogIndexPath(targetLang);
  const currentLang: BlogLang = match[1] ? 'en' : 'pt';
  const post = findBlogPost(match[2], currentLang);
  return post ? blogPath(post, targetLang) : blogIndexPath(targetLang);
}
```

Add `legacyBlogRedirects` with the four mappings from the design spec. Encode all eight locale bodies with six stable heading IDs, paragraph blocks, one executive callout, one checklist, one contextual CTA, the exact approved related case, and one sources block.

Use this approved content matrix; write original full PT-BR and EN prose and carry over no unsupported statistics from `src/lib/data.ts`:

- `website-conversion`: MINI Finance Matcher; sections on page decision, clarity, attention/trust/action, friction, proof, measurement; CTA `/#contact`; people-first source.
- `seo-geo`: Dove Global AEM; sections on discovery changes, unchanged SEO foundations, crawl/index, useful authority, entities/schema, links/measurement; CTA `/#contact`; Google AI-features, people-first, and structured-data sources.
- `performance`: Arctic Fox Headless Commerce; sections on perceived/measured speed, mobile, business meaning of LCP/INP/CLS, field/lab data, priorities, post-launch measurement; CTA `/#contact`; web.dev Web Vitals and Google page-experience sources.
- `strategic-redesign`: Dove Global AEM; sections on symptom/cause, business signs, technical signs, optimize/rebuild/replatform, scope, return; inline links to Avary Drone and Celine Medspas; CTA `/#contact`; people-first and Web Vitals sources.

- [ ] **Step 4: Run GREEN and commit**

```powershell
npx.cmd playwright test tests/blog.spec.ts -g "catalog|route helpers" --project=chromium-desktop --workers=1
npm.cmd run build
git diff --check
git add src/lib/blog.ts tests/blog.spec.ts
git commit -m "feat: add bilingual blog catalog"
```

Expected: 2 focused tests and build pass.

---

### Task 2: Add local AUREON article artwork

**Files:** Create four SVGs under `public/blog/`; modify `tests/blog.spec.ts`.

- [ ] **Step 1: Add the failing media check**

```ts
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('blog artwork is local lightweight SVG', () => {
  for (const { image } of posts) {
    const path = resolve(process.cwd(), 'public', image.slice(1));
    expect(existsSync(path)).toBeTruthy();
    const svg = readFileSync(path, 'utf8');
    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox="0 0 1600 900"');
    expect(Buffer.byteLength(svg)).toBeLessThan(40_000);
    expect(svg).not.toMatch(/https?:\/\//);
  }
});
```

- [ ] **Step 2: Run RED**

```powershell
npx.cmd playwright test tests/blog.spec.ts -g "artwork" --project=chromium-desktop --workers=1
```

Expected: FAIL because the SVGs are absent.

- [ ] **Step 3: Create four native SVGs**

All use `viewBox="0 0 1600 900"`, `#08090f`, gold `#d4a017`, an 80px grid, no raster, and no external URL:

- `site-conversion.svg`, accent `#E24A7A`: three connected journey stages ending in one action node.
- `seo-geo.svg`, accent `#4AE2A0`: search rings connected to a structured answer graph.
- `performance.svg`, accent `#4A90E2`: three metric arcs labeled LCP, INP, CLS.
- `redesign.svg`, accent `#E2A44A`: old/new frames joined by a decision path.

- [ ] **Step 4: Run GREEN and commit**

```powershell
npx.cmd playwright test tests/blog.spec.ts -g "artwork" --project=chromium-desktop --workers=1
npm.cmd run build
git diff --check
git add public/blog tests/blog.spec.ts
git commit -m "chore: add local blog artwork"
```

---

### Task 3: Build localized routes and the approved UI

**Files:** Modify `BlogPage.tsx`, `App.tsx`, `Nav.tsx`, `main.scss`, `tests/blog.spec.ts`; create `PostDetailPage.tsx`.

- [ ] **Step 1: Add failing UI and route tests**

```ts
test('both indexes render the acquisition hub', async ({ page }) => {
  for (const route of ['/blog', '/en/blog']) {
    await page.goto(route);
    await expect(page.locator('[data-blog-card]')).toHaveCount(4);
    await expect(page.locator('[data-blog-index-cta]')).toBeVisible();
  }
});

test('article renders semantic conversion and trust blocks', async ({ page }) => {
  await page.goto('/blog/site-que-converte');
  await expect(page.locator('article')).toHaveCount(1);
  await expect(page.locator('[data-blog-summary]')).toBeVisible();
  await expect(page.locator('nav[aria-label="Neste artigo"] a')).toHaveCount(6);
  await expect(page.locator('[data-blog-case="mini-finance-matcher-react"]')).toBeVisible();
  await expect(page.locator('[data-blog-sources]')).toBeVisible();
});

test('language selector preserves the article', async ({ page }) => {
  await page.goto('/blog/seo-geo-busca-ia');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en\/blog\/seo-geo-ai-search$/);
  await page.getByRole('button', { name: 'PT', exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/seo-geo-busca-ia$/);
});
```

- [ ] **Step 2: Build and run RED**

```powershell
npm.cmd run build
npx.cmd playwright test tests/blog.spec.ts -g "indexes|semantic conversion|language selector" --project=chromium-desktop --workers=1
```

Expected: FAIL on missing localized routes and data attributes.

- [ ] **Step 3: Replace the index**

Make `BlogPage.tsx` export only `BlogPage({ lang }: { lang: BlogLang })`. Render hero, one wide featured conversion card, three pillar cards, and one diagnostic CTA. Use `data-blog-card`, `data-blog-index-cta`, localized catalog fields, `blogPath`, and `caseMediaUrl(image, import.meta.env.BASE_URL)`. Remove filters and component-local CSS.

- [ ] **Step 4: Create the structured detail renderer**

Create `PostDetailPage({ lang, slug })`. Resolve with `findBlogPost`, render an exhaustive switch for all seven `BlogBlock` kinds, resolve case blocks from the existing case catalog, and return a localized not-found state for an invalid slug. Use semantic `header`, `article`, labeled TOC `nav`, sidebar `aside`, source footer, related-case link, contextual CTA, and next-article navigation. Never use `dangerouslySetInnerHTML`.

- [ ] **Step 5: Add routes and route-aware language selection**

In `App.tsx`, add fixed-locale routes for `/blog`, `/blog/:id`, `/en/blog`, `/en/blog/:id`; derive blog metadata language from the pathname; sync direct `/en/blog` loads to EN and `/blog` loads to PT.

In `Nav.tsx`, use:

```ts
const isBlog = /^\/(?:en\/)?blog(?:\/|$)/.test(location);
const blogHref = lang === 'en' ? '/en/blog' : '/blog';
function changeLanguage() {
  const target = lang === 'en' ? 'pt' : 'en';
  const paired = pairedBlogPath(location, target);
  if (paired) navigate(paired); else setLang(target);
}
```

Use `blogHref` on desktop/mobile and `changeLanguage` on the selector.

- [ ] **Step 6: Add approved Sass**

Create focused classes for `.blog-index-hero`, `.blog-featured-card`, `.blog-pillar-grid`, `.blog-index-cta`, `.blog-article-hero`, `.blog-article-layout`, `.blog-article-body`, `.blog-article-sidebar`, `.blog-callout`, `.blog-context-cta`, `.blog-related-case`, `.blog-sources`, and `.blog-next-article`.

At `<=991px`, stack featured/detail grids and unstick the sidebar. At `<=767px`, use one pillar column and 24px page gutters. Add visible `:focus-visible`, 44px actions, AA colors, safe title wrapping, and `prefers-reduced-motion` overrides.

- [ ] **Step 7: Run GREEN and commit**

```powershell
npm.cmd run build
npx.cmd playwright test tests/blog.spec.ts -g "indexes|semantic conversion|language selector" --project=chromium-desktop --workers=1
git diff --check
git add src/App.tsx src/components/BlogPage.tsx src/components/PostDetailPage.tsx src/components/Nav.tsx src/styles/main.scss tests/blog.spec.ts
git commit -m "feat: rebuild bilingual blog experience"
```

Expected: 3 focused tests and build pass.

---

### Task 4: Add localized metadata, hreflang, and Article JSON-LD

**Files:** Modify `src/lib/seo.ts`, `tests/blog.spec.ts`, `tests/smoke.spec.ts`; delete `src/lib/data.ts`.

- [ ] **Step 1: Add failing SEO tests**

```ts
import { resolvePageMeta } from '../src/lib/seo';

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

test('article head stays idempotent after language navigation', async ({ page }) => {
  await page.goto('/blog/site-que-converte');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[data-aureon-hreflang]')).toHaveCount(3);
  await expect(page.locator('script#article-jsonld')).toHaveCount(1);
});
```

- [ ] **Step 2: Run RED**

```powershell
npm.cmd run build
npx.cmd playwright test tests/blog.spec.ts -g "metadata has|head stays" --project=chromium-desktop --workers=1
```

Expected: FAIL because `PageMeta` has no alternates/schema.

- [ ] **Step 3: Extend SEO minimally**

Import from `blog.ts`. Extend `PageMeta` with optional `alternates` and `schema`. Resolve localized indexes/details before generic pages. Valid articles use localized SEO copy, local image, paired alternates, and truthful `Article` JSON-LD with headline, description, image, dates, language, canonical main entity, and AUREON Organization author/publisher. Unknown blog slugs use localized not-found copy and `noindex,follow`.

Add idempotent `setAlternates()` using `link[data-aureon-hreflang]` and `setSchema()` using `script#article-jsonld`; remove stale elements when leaving an article. Escape `<` in serialized JSON as `\\u003c`.

Update old slug checks in `smoke.spec.ts` to `/blog/site-que-converte`. Delete `data.ts` after `rg "./data|../lib/data" src tests` returns no consumers.

- [ ] **Step 4: Run GREEN and commit**

```powershell
npm.cmd run build
npx.cmd playwright test tests/blog.spec.ts -g "metadata has|head stays" --project=chromium-desktop --workers=1
npx.cmd playwright test tests/smoke.spec.ts -g "SEO metadata|trailing slashes|mixed-case blog|idempotent" --project=chromium-desktop --workers=1
git diff --check
git add src/lib/seo.ts src/lib/data.ts tests/blog.spec.ts tests/smoke.spec.ts
git commit -m "feat: add bilingual article metadata"
```

---

### Task 5: Emit static heads, redirects, sitemap routes, and Pages smoke

**Files:** Modify `vite.config.ts`, `.htaccess`, sitemap, workflow, and tests.

- [ ] **Step 1: Add failing static and redirect tests**

```ts
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

test('sitemap matches both localized blog catalogs', async () => {
  const xml = await readFile(join(process.cwd(), 'public/sitemap.xml'), 'utf8');
  const urls = [...xml.matchAll(/<loc>(https:\/\/aureondigital\.co\/(?:en\/)?blog[^<]*)<\/loc>/g)].map(([, url]) => url);
  expect(urls).toEqual([
    'https://aureondigital.co/blog', 'https://aureondigital.co/en/blog',
    ...posts.flatMap(post => [`https://aureondigital.co${blogPath(post, 'pt')}`, `https://aureondigital.co${blogPath(post, 'en')}`]),
  ]);
  expect(xml).not.toContain('geo-vs-seo-2025');
});

test('root build emits article heads and legacy redirect documents', async () => {
  const html = await readFile(join(process.cwd(), 'dist/en/blog/seo-geo-ai-search/index.html'), 'utf8');
  expect(html).toContain('hreflang="pt-BR"');
  expect(html).toContain('id="article-jsonld"');
  const redirect = await readFile(join(process.cwd(), 'dist/blog/geo-vs-seo-2025/index.html'), 'utf8');
  expect(redirect).toContain('url=/blog/seo-geo-busca-ia');
});

test('Hostinger permanent redirects precede the SPA fallback', async () => {
  const value = await readFile(join(process.cwd(), 'public/.htaccess'), 'utf8');
  const redirect = 'Redirect 301 /blog/geo-vs-seo-2025 /blog/seo-geo-busca-ia';
  expect(value.indexOf(redirect)).toBeLessThan(value.indexOf('RewriteRule . /index.html [L]'));
});
```

- [ ] **Step 2: Run RED**

```powershell
npm.cmd run build
npx.cmd playwright test tests/blog.spec.ts -g "sitemap|root build emits|Hostinger permanent" --project=chromium-desktop --workers=1
```

- [ ] **Step 3: Extend the existing Vite plugin**

Build a route array with two indexes and each post's PT/EN pair. Extend `withPageMeta` to set `<html lang>`, inject escaped hreflang links and `script#article-jsonld`, then write `dist/<route>/index.html` exactly like cases. Generate the four legacy documents with `noindex,follow`, canonical target, base-aware meta refresh, and visible continue link. Do this before copying `404.html`.

- [ ] **Step 4: Update Hostinger and sitemap**

Add four `Redirect 301` lines before `RewriteEngine On`, mapping the old slugs exactly as specified. Replace the four legacy sitemap entries with PT index, EN index, then PT/EN pair for each catalog item.

- [ ] **Step 5: Extend Pages subpath smoke**

```ts
test('Pages subpath blog media resolves', async ({ page }) => {
  test.skip(process.env.GITHUB_PAGES !== 'true');
  await page.goto('/horizon-collective/en/blog/seo-geo-ai-search');
  const image = page.locator('.blog-article-hero img');
  await expect(image).toHaveAttribute('src', '/horizon-collective/blog/seo-geo.svg');
  expect(await image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
});
```

Update the workflow command to run both test files with `-g "Pages subpath"` after `build:pages` and before upload.

- [ ] **Step 6: Run root/Pages GREEN and commit**

```powershell
npm.cmd run build
npx.cmd playwright test tests/blog.spec.ts -g "sitemap|root build emits|Hostinger permanent" --project=chromium-desktop --workers=1
npm.cmd run build:pages
$env:GITHUB_PAGES='true'; npx.cmd playwright test tests/smoke.spec.ts tests/blog.spec.ts -g "Pages subpath" --project=chromium-desktop --workers=1; Remove-Item Env:GITHUB_PAGES
git diff --check
git add vite.config.ts public/.htaccess public/sitemap.xml .github/workflows/pages.yml tests/blog.spec.ts tests/smoke.spec.ts
git commit -m "feat: index bilingual blog routes"
```

Expected: localized static heads, redirect docs, `.htaccess`, sitemap, and Pages media pass.

---

### Task 6: Close route, mobile, accessibility, and regression coverage

**Files:** Modify `tests/blog.spec.ts`; modify production files only for failures demonstrated here.

- [ ] **Step 1: Add eight-route and mobile coverage**

```ts
for (const route of [
  '/blog/site-que-converte', '/blog/seo-geo-busca-ia', '/blog/performance-core-web-vitals', '/blog/quando-redesenhar-site',
  '/en/blog/website-conversion-strategy', '/en/blog/seo-geo-ai-search', '/en/blog/performance-core-web-vitals', '/en/blog/when-to-redesign-website',
]) {
  test(`blog route ${route} renders complete local content`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('article h2')).toHaveCount(6);
    await expect(page.locator('[data-blog-sources] a')).not.toHaveCount(0);
    await expect(page.locator('.blog-article-hero img')).toHaveJSProperty('complete', true);
  });
}

for (const route of ['/blog', '/en/blog', '/blog/site-que-converte', '/en/blog/seo-geo-ai-search']) {
  test(`mobile blog route ${route} fits`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBeTruthy();
    for (const cta of await page.locator('a[data-blog-cta]').all()) {
      const box = await cta.boundingBox();
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });
}

test('reduced motion keeps every blog card visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/blog');
  for (const card of await page.locator('[data-blog-card]').all()) await expect(card).toBeVisible();
});
```

- [ ] **Step 2: Run complete focused coverage**

```powershell
npm.cmd run build
npx.cmd playwright test tests/blog.spec.ts --project=chromium-desktop --workers=1
npx.cmd playwright test tests/blog.spec.ts --project=webkit-mobile --workers=1
```

Expected: all blog tests pass. Apply only corrections proven by failures.

- [ ] **Step 3: Run final project verification**

```powershell
git diff --check
npm.cmd run lint
npm.cmd run build
Test-Path dist/.htaccess
npm.cmd run build:pages
Test-Path dist/404.html
npx.cmd playwright test --workers=1
git status --short --branch
```

Expected: clean diff check, lint/build success, required artifacts present, full serial suite passing with only declared skips.

- [ ] **Step 4: Perform browser QA**

Run `npm.cmd run dev -- --host 127.0.0.1 --port 52790 --strictPort`. Inspect both indexes and all four PT routes at 1440px; inspect both indexes plus conversion PT, SEO/GEO EN, performance PT, and redesign EN at 390x844. Confirm local artwork, readable line length, desktop-only sticky sidebar, inline mobile sidebar, visible focus, restrained CTAs, case proof, sources, language pairing, no clipping, no broken media, and no console errors.

- [ ] **Step 5: Commit final coverage**

```powershell
git add tests/blog.spec.ts src/components/BlogPage.tsx src/components/PostDetailPage.tsx src/styles/main.scss src/lib/blog.ts
git commit -m "test: cover bilingual blog experience"
git status --short --branch
```

Expected: clean worktree. Do not push, merge, deploy, or create a PR without explicit user authorization.

---

## Final acceptance checklist

- [ ] Four old bodies removed; four topics complete in PT-BR and EN.
- [ ] Both indexes and all eight details match the approved AUREON layouts.
- [ ] Language selection preserves paired article routes.
- [ ] All artwork is local SVG and base-path safe.
- [ ] Canonical, hreflang, social metadata, robots, and Article JSON-LD are correct and idempotent.
- [ ] Root and Pages builds emit ten localized blog documents and four legacy redirect documents.
- [ ] Hostinger redirects precede SPA fallback; sitemap contains only current blog routes.
- [ ] Unknown routes are localized and `noindex,follow`.
- [ ] Accessibility, reduced motion, mobile overflow, lint, builds, and full serial regression pass.
- [ ] No dependency or remote write was introduced.
