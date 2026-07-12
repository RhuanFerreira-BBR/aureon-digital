# Conversion Proof and Cases Route Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/cases` directly deployable and replace three repetitive/unsupported homepage sections plus the unsupported hero metrics row with one cinematic, factual, case-linked proof section.

**Architecture:** Extend the existing Vite close-bundle prerenderer to emit the cases index beside the already-generated case detail documents. Build one data-driven React `CaseProof` component from the existing case catalog, replace `CasePreview`/`Stats`/`Testimonials`, remove only the hero metrics row, and keep all visual behavior in the existing Sass file.

**Tech Stack:** React 19, TypeScript 6, React Router 7, Sass, Vite 8, Playwright 1.60.

## Global Constraints

- Keep the hero proposition, headline, typewriter, supporting copy, and CTAs unchanged; remove only its unsupported metrics row.
- Keep `mailto:` contact behavior: PT `contato@aureondigital.co`, EN `contact@aureondigital.co`.
- Use only existing local case media and verifiable catalog facts.
- Show Dove's existing agency-partner attribution; do not imply a direct AUREON client relationship.
- Remove unsupported testimonials and aggregate traffic, satisfaction, and ROI claims.
- Add no backend, analytics, scheduler, carousel, package, or unrelated refactor.
- Do not push or deploy without separate user authorization.

---

### Task 1: Generate the static `/cases` index

**Files:**
- Modify: `tests/smoke.spec.ts:176`
- Modify: `vite.config.ts:96-105`

**Interfaces:**
- Consumes: `withPageMeta(html: string, meta: PageMeta)` and `resolvePageMeta('/cases', 'pt')`.
- Produces: `dist/cases/index.html` with the same application assets and cases-index metadata as the runtime route.

- [ ] **Step 1: Write the failing build-artifact test**

Add immediately before `build emits static Portuguese social metadata for every real case`:

```ts
test('build emits a static cases index for direct Hostinger requests', async () => {
  const html = await readFile(resolve(process.cwd(), 'dist', 'cases', 'index.html'), 'utf8');
  const meta = resolvePageMeta('/cases', 'pt');

  expect(html).toContain('<html lang="pt-BR">');
  expect(html).toContain(`<title>${meta.title}</title>`);
  expect(html).toContain(`<meta name="description" content="${meta.description}"`);
  expect(html).toContain(`<link rel="canonical" href="${meta.canonical}"`);
  expect(html).toContain('/assets/');
});
```

- [ ] **Step 2: Run RED and confirm the missing artifact**

Run:

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "static cases index" --project=chromium-desktop --workers=1
```

Expected: FAIL with `ENOENT` for `dist/cases/index.html`. The build itself still succeeds.

- [ ] **Step 3: Emit the index with the existing prerenderer**

In `vite.config.ts`, replace the start of the case loop with:

```ts
        const html = readFileSync(index, 'utf8');
        const casesDirectory = resolve(__dirname, 'dist/cases');
        mkdirSync(casesDirectory, { recursive: true });
        writeFileSync(
          resolve(casesDirectory, 'index.html'),
          withPageMeta(html, resolvePageMeta('/cases', 'pt')),
        );
        for (const item of cases) {
          const directory = resolve(casesDirectory, item.id);
```

Keep the existing `mkdirSync` and case-detail `writeFileSync` lines inside the loop.

- [ ] **Step 4: Run GREEN**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "static cases index|static Portuguese social metadata" --project=chromium-desktop --workers=1
```

Expected: 2 passed.

- [ ] **Step 5: Protect the already-approved localized contact destinations**

Add after the RFC 6068 contact test:

```ts
test('contact href uses the approved localized inboxes', () => {
  expect(contactHref('pt')).toBe('mailto:contato@aureondigital.co');
  expect(contactHref('en')).toBe('mailto:contact@aureondigital.co');
});
```

This is regression coverage for unchanged behavior, so it should pass immediately:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "approved localized inboxes" --project=chromium-desktop --workers=1
```

Expected: 1 passed; make no production contact change.

- [ ] **Step 6: Commit Task 1**

```powershell
git add vite.config.ts tests/smoke.spec.ts
git commit -m "fix: prerender cases index"
```

---

### Task 2: Replace repeated homepage proof with real cases

**Files:**
- Create: `src/components/CaseProof.tsx`
- Modify: `src/App.tsx:9-37`
- Modify: `src/components/Hero.tsx:7-31,228-248`
- Modify: `tests/smoke.spec.ts:98-100,225-233,458-465`
- Delete: `src/components/CasePreview.tsx`
- Delete: `src/components/Stats.tsx`
- Delete: `src/components/Testimonials.tsx`

**Interfaces:**
- Consumes: `cases`, `caseText`, `caseMediaUrl`, `PortfolioCase` from `src/lib/cases.ts`; React Router `Link`; `lang: 'pt' | 'en'`.
- Produces: `<CaseProof lang={lang} />`, `[data-case-proof]`, `[data-case-proof-feature]`, and two `[data-case-proof-supporting]` links.

- [ ] **Step 1: Replace the old homepage feature test with a failing proof test**

Replace `homepage shows the three configured portfolio features` with:

```ts
test('homepage consolidates proof around real linked cases', async ({ page }) => {
  await page.goto('/');

  const proof = page.locator('[data-case-proof]');
  await expect(proof).toHaveCount(1);
  await expect(proof.locator('[data-case-proof-feature]')).toHaveAttribute('href', '/cases/dove-global-aem');
  await expect(proof.locator('[data-case-proof-supporting]')).toHaveCount(2);
  await expect(proof.getByRole('link', { name: /MINI Finance Matcher/ })).toHaveAttribute('href', '/cases/mini-finance-matcher-react');
  await expect(proof.getByRole('link', { name: /Arctic Fox Hair Color/ })).toHaveAttribute('href', '/cases/arctic-fox-headless-commerce');
  await expect(proof.locator('dd')).toHaveText(['14', '5', 'Global']);
  await expect(proof.getByText('Trabalho realizado em equipe via agência parceira para a Unilever.', { exact: true })).toBeVisible();
  await expect(page.locator('[data-case-preview]')).toHaveCount(0);
  await expect(page.locator('.hero-metrics')).toHaveCount(0);
  await expect(page.getByText('Carlos M.', { exact: true })).toHaveCount(0);
  await expect(page.getByText('ROI médio', { exact: true })).toHaveCount(0);
  await expect(page.getByText('98%', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: /Fazemos você/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Iniciar projeto' }).first()).toBeVisible();
});
```

- [ ] **Step 2: Run RED**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "consolidates proof" --project=chromium-desktop --workers=1
```

Expected: FAIL because `[data-case-proof]` does not exist.

- [ ] **Step 3: Create the minimal bilingual case-proof component**

Create `src/components/CaseProof.tsx`:

```tsx
import { Link } from "react-router-dom";
import { cases, caseMediaUrl, caseText, type PortfolioCase } from "../lib/cases";

interface CaseProofProps { lang: "en" | "pt"; }

const copy = {
  en: {
    label: "Proof in practice",
    title: "Work you can explore.",
    intro: "Real experiences across markets, platforms, and business models — presented through the work itself.",
    feature: "Featured case",
    explore: "Explore Dove case",
    supporting: "More proof",
    all: "View all cases",
    facts: ["Experiences", "Platforms", "Reach"],
    global: "Global",
  },
  pt: {
    label: "Prova na prática",
    title: "Trabalho que você pode explorar.",
    intro: "Experiências reais em diferentes mercados, plataformas e modelos de negócio — apresentadas pelo próprio trabalho.",
    feature: "Case em destaque",
    explore: "Explorar case Dove",
    supporting: "Mais provas",
    all: "Ver todos os cases",
    facts: ["Experiências", "Plataformas", "Atuação"],
    global: "Global",
  },
} as const;

const byId = (id: string) => cases.find(item => item.id === id) as PortfolioCase;

export function CaseProof({ lang }: CaseProofProps) {
  const primary = byId("dove-global-aem");
  const supporting = [
    byId("mini-finance-matcher-react"),
    byId("arctic-fox-headless-commerce"),
  ];
  const facts = [String(cases.length), String(new Set(cases.map(item => item.platform)).size), copy[lang].global];

  return (
    <section className="case-proof" data-case-proof aria-labelledby="case-proof-title">
      <div className="case-proof-shell">
        <header className="case-proof-header">
          <p className="section-label">{copy[lang].label}</p>
          <h2 id="case-proof-title">{copy[lang].title}</h2>
          <p>{copy[lang].intro}</p>
        </header>

        <Link className="case-proof-feature" data-case-proof-feature to={`/cases/${primary.id}`}>
          <img src={caseMediaUrl(primary.heroImage.src, import.meta.env.BASE_URL)} alt={caseText(primary.heroImage.alt, lang)} />
          <span className="case-proof-feature-wash" aria-hidden="true" />
          <span className="case-proof-feature-content">
            <small>{copy[lang].feature} · {primary.client} · {primary.platform}</small>
            <strong>{caseText(primary.title, lang)}</strong>
            {primary.attribution && <em>{caseText(primary.attribution, lang)}</em>}
            <dl>
              {facts.map((value, index) => <div key={copy[lang].facts[index]}><dt>{copy[lang].facts[index]}</dt><dd>{value}</dd></div>)}
            </dl>
            <span className="case-proof-link-label">{copy[lang].explore} →</span>
          </span>
        </Link>

        <div className="case-proof-supporting" aria-label={copy[lang].supporting}>
          {supporting.map(item => (
            <Link key={item.id} data-case-proof-supporting to={`/cases/${item.id}`}>
              <img src={caseMediaUrl(item.heroImage.src, import.meta.env.BASE_URL)} alt={caseText(item.heroImage.alt, lang)} />
              <span><small>{item.platform} · {caseText(item.market, lang)}</small><strong>{item.client}</strong><em>{caseText(item.title, lang)}</em></span>
            </Link>
          ))}
        </div>

        <Link className="btn-outline case-proof-all" to="/cases">{copy[lang].all}</Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Route the homepage through `CaseProof` once**

In `src/App.tsx`, replace the three imports with:

```ts
import { CaseProof } from "./components/CaseProof";
```

Replace the three components after `Process` with:

```tsx
      <CaseProof lang={lang} />
```

In `src/components/Hero.tsx`, delete `stat1n` through `stat3l` from both locale objects and delete only the complete `{/* Stats row */}` element with class `hero-metrics`. Leave the badge, headline, typewriter words/timers, supporting paragraph, both CTA links, canvas, and scroll cue byte-for-byte unchanged.

Update the existing GitHub Pages homepage-media assertion near line 99 from:

```ts
const preview = page.locator('[data-case-preview]').filter({ hasText: 'Dove' }).locator('img');
```

to:

```ts
const preview = page.locator('[data-case-proof-feature] img');
```

- [ ] **Step 5: Run GREEN for semantic/content behavior**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "consolidates proof" --project=chromium-desktop --workers=1
```

Expected: 1 passed.

- [ ] **Step 6: Add and run the bilingual proof regression**

Add after the consolidation test:

```ts
test('case proof follows the language selector', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'EN', exact: true }).click();

  const proof = page.locator('[data-case-proof]');
  await expect(proof.getByRole('heading', { name: 'Work you can explore.' })).toBeVisible();
  await expect(proof.getByText('Work delivered as part of an agency partner team for Unilever.', { exact: true })).toBeVisible();
  await expect(proof.getByRole('link', { name: /Explore Dove case/ })).toBeVisible();
});
```

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "case proof" --project=chromium-desktop --workers=1
```

Expected: 2 passed.

- [ ] **Step 7: Delete superseded components and confirm no callers remain**

Delete:

```text
src/components/CasePreview.tsx
src/components/Stats.tsx
src/components/Testimonials.tsx
```

Run:

```powershell
rg -n "CasePreview|Stats|Testimonials" src tests
npm.cmd run lint
```

Expected: `rg` has no matches; lint passes.

- [ ] **Step 8: Commit Task 2**

```powershell
git add src/App.tsx src/components/Hero.tsx src/components/CaseProof.tsx src/components/CasePreview.tsx src/components/Stats.tsx src/components/Testimonials.tsx tests/smoke.spec.ts
git commit -m "feat: replace homepage claims with case proof"
```

---

### Task 3: Apply the cinematic direction and responsive guarantees

**Files:**
- Modify: `tests/smoke.spec.ts`
- Modify: `src/styles/main.scss`

**Interfaces:**
- Consumes: the class names produced by `CaseProof` in Task 2.
- Produces: dominant Dove composition on desktop, stacked layout at `<= 900px`, 44px interactive targets, focus styling, and reduced-motion-safe image behavior.

- [ ] **Step 1: Write the failing visual-structure test**

Add after the case-proof language test:

```ts
test('case proof gives the featured case cinematic visual priority', async ({ page }) => {
  await page.goto('/');
  const proof = page.locator('[data-case-proof]');
  await proof.scrollIntoViewIfNeeded();

  const featureBox = await proof.locator('[data-case-proof-feature]').boundingBox();
  const supportingGrid = proof.locator('.case-proof-supporting');
  const columns = await supportingGrid.evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length);

  expect(featureBox?.height).toBeGreaterThanOrEqual(560);
  expect(columns).toBe(2);
  await expect(proof.locator('[data-case-proof-feature]')).toHaveCSS('overflow', 'hidden');
});
```

- [ ] **Step 2: Run RED**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "cinematic visual priority" --project=chromium-desktop --workers=1
```

Expected: FAIL because the new component has no cinematic layout styles.

- [ ] **Step 3: Add the case-proof Sass block**

Add before the `/* BLOG */` section in `src/styles/main.scss`:

```scss
/* CASE PROOF */
.case-proof {
  position: relative;
  overflow: hidden;
  padding: 128px 0;
  background:
    radial-gradient(circle at 78% 24%, rgba(212, 160, 23, 0.08), transparent 34%),
    var(--void2);
}

.case-proof-shell { width: min(1240px, calc(100% - 48px)); margin-inline: auto; }
.case-proof-header { max-width: 760px; margin-bottom: 56px; }
.case-proof-header h2 { margin: 14px 0 18px; font-size: clamp(42px, 5.5vw, 76px); letter-spacing: -0.045em; }
.case-proof-header > p:last-child { max-width: 660px; color: var(--text-muted); font-size: 17px; }

.case-proof-feature {
  position: relative;
  display: flex;
  min-height: 620px;
  overflow: hidden;
  border: 1px solid var(--border-dim);
  color: var(--text);
  text-decoration: none;
  isolation: isolate;
}
.case-proof-feature > img { position: absolute; inset: 0; z-index: -2; width: 100%; height: 100%; object-fit: cover; filter: saturate(0.72) brightness(0.72); transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1), filter 400ms ease; }
.case-proof-feature-wash { position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(8, 9, 15, 0.98) 0%, rgba(8, 9, 15, 0.78) 48%, rgba(8, 9, 15, 0.18) 100%), linear-gradient(0deg, rgba(8, 9, 15, 0.86), transparent 48%); }
.case-proof-feature-content { align-self: flex-end; width: min(720px, 100%); padding: clamp(28px, 5vw, 64px); }
.case-proof-feature-content > small { display: block; color: var(--gold-light); font-size: 11px; font-style: normal; font-weight: 700; letter-spacing: 0.13em; text-transform: uppercase; }
.case-proof-feature-content > strong { display: block; margin: 16px 0; font-family: var(--font-display); font-size: clamp(34px, 4.5vw, 62px); line-height: 1.03; letter-spacing: -0.04em; }
.case-proof-feature-content > em { display: block; max-width: 560px; color: var(--text-muted); font-size: 12px; font-style: normal; }
.case-proof-feature dl { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; margin: 30px 0; background: rgba(255, 255, 255, 0.12); }
.case-proof-feature dl > div { padding: 18px; background: rgba(8, 9, 15, 0.86); }
.case-proof-feature dd { color: var(--text); font-family: var(--font-display); font-size: clamp(24px, 3vw, 38px); font-weight: 700; }
.case-proof-feature dt { color: var(--text-muted); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; }
.case-proof-link-label { display: inline-flex; min-height: 44px; align-items: center; color: var(--gold-light); font-size: 13px; font-weight: 700; }
.case-proof-feature:hover > img { transform: scale(1.025); filter: saturate(0.88) brightness(0.78); }

.case-proof-supporting { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2px; margin-top: 2px; }
.case-proof-supporting > a { display: grid; grid-template-columns: minmax(150px, 0.8fr) minmax(0, 1.2fr); min-height: 240px; overflow: hidden; border: 1px solid var(--border-dim); background: var(--surface); color: var(--text); text-decoration: none; }
.case-proof-supporting img { width: 100%; height: 100%; object-fit: cover; opacity: 0.58; transition: opacity 300ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1); }
.case-proof-supporting a > span { display: flex; min-width: 0; padding: 28px; flex-direction: column; justify-content: flex-end; }
.case-proof-supporting small { color: var(--gold); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; }
.case-proof-supporting strong { margin: 10px 0 8px; font-family: var(--font-display); font-size: clamp(22px, 2.5vw, 34px); }
.case-proof-supporting em { color: var(--text-muted); font-size: 13px; font-style: normal; line-height: 1.55; }
.case-proof-supporting a:hover img { opacity: 0.8; transform: scale(1.035); }
.case-proof-all { display: inline-flex; margin-top: 32px; text-decoration: none; }
.case-proof a:focus-visible { outline: 3px solid var(--gold-light); outline-offset: 4px; }

@media (max-width: 900px) {
  .case-proof { padding: 88px 0; }
  .case-proof-feature { min-height: 680px; }
  .case-proof-feature-wash { background: linear-gradient(0deg, rgba(8, 9, 15, 0.98) 0%, rgba(8, 9, 15, 0.72) 62%, rgba(8, 9, 15, 0.18) 100%); }
  .case-proof-supporting { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .case-proof-shell { width: calc(100% - 32px); }
  .case-proof-header { margin-bottom: 36px; }
  .case-proof-feature { min-height: 720px; }
  .case-proof-feature dl { grid-template-columns: 1fr; }
  .case-proof-feature dl > div { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding: 13px 16px; }
  .case-proof-supporting > a { grid-template-columns: 1fr; }
  .case-proof-supporting img { height: 210px; }
}
```

- [ ] **Step 4: Extend the existing reduced-motion block**

Inside `@media (prefers-reduced-motion: reduce)`, add:

```scss
  .case-proof-feature > img,
  .case-proof-supporting img {
    transform: none !important;
    transition: none;
  }
```

Delete the now-unused `.counter-item` block and its mobile padding override from `src/styles/main.scss`. Change:

```scss
.metric-number,
.teaser-metric-number {
  font-variant-numeric: tabular-nums;
}
```

to:

```scss
.teaser-metric-number {
  font-variant-numeric: tabular-nums;
}
```

`CasesPage` still uses `.teaser-metric-number`; the removed hero was the only `.metric-number` caller. Confirm cleanup with:

```powershell
rg -n "counter-item" src tests
```

Expected: no matches.

- [ ] **Step 5: Run GREEN for desktop visual priority**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "cinematic visual priority" --project=chromium-desktop --workers=1
```

Expected: 1 passed.

- [ ] **Step 6: Add the mobile conversion-layout regression**

Add:

```ts
test('mobile case proof stacks without clipping conversion paths', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const proof = page.locator('[data-case-proof]');
  await proof.scrollIntoViewIfNeeded();
  await expect(proof.locator('[data-case-proof-feature]')).toBeVisible();
  await expect(proof.locator('[data-case-proof-supporting]')).toHaveCount(2);
  await expect(proof.getByRole('link', { name: 'Ver todos os cases' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBeTruthy();
  expect(await proof.locator('.case-proof-supporting').evaluate(element => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1);
});
```

Run both browser engines:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "mobile case proof" --workers=1
```

Expected: 2 passed.

- [ ] **Step 7: Inspect fresh desktop and mobile renders**

Run the focused proof tests with tracing disabled noise-free:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "case proof|cinematic visual priority" --workers=1
```

Capture fresh desktop and mobile pages:

```powershell
New-Item -ItemType Directory -Force .agent\case-proof-qa | Out-Null
$preview = Start-Process -FilePath npm.cmd -ArgumentList 'run','preview','--','--host','127.0.0.1' -WindowStyle Hidden -PassThru
try {
  $ready = $false
  1..50 | ForEach-Object { if (-not $ready) { try { Invoke-WebRequest http://127.0.0.1:4173/ -UseBasicParsing | Out-Null; $ready = $true } catch { Start-Sleep -Milliseconds 100 } } }
  if (-not $ready) { throw 'Vite preview did not become ready' }
  npx.cmd playwright screenshot --full-page --viewport-size="1440,1200" http://127.0.0.1:4173/ .agent\case-proof-qa\desktop.png
  npx.cmd playwright screenshot --full-page --device="iPhone 13" http://127.0.0.1:4173/ .agent\case-proof-qa\mobile.png
} finally {
  Stop-Process -Id $preview.Id -Force -ErrorAction SilentlyContinue
}
```

Inspect both images with the local image viewer for hierarchy, image crop, attribution legibility, focus treatment, and contact adjacency. Adjust only the Sass values above if inspection exposes a concrete issue, rerunning the focused tests after each adjustment.

- [ ] **Step 8: Commit Task 3**

```powershell
git add src/styles/main.scss tests/smoke.spec.ts
git commit -m "style: add cinematic case proof"
```

---

### Task 4: Full verification and handoff

**Files:**
- Verify only; modify owned files only if a check exposes a regression.

**Interfaces:**
- Consumes: all Task 1-3 outputs.
- Produces: clean local branch with evidence for root build, Pages build, lint, static artifacts, contact routing, and responsive browser behavior.

- [ ] **Step 1: Run static and source checks**

```powershell
git diff --check
npm.cmd run lint
npm.cmd run build
```

Expected: all exit 0; `dist/cases/index.html` exists.

- [ ] **Step 2: Verify the GitHub Pages variant**

```powershell
npm.cmd run build:pages
if (-not (Select-String -Path dist\cases\index.html -Pattern '/aureon-digital/assets/' -Quiet)) { throw 'Pages assets missing from cases index' }
npm.cmd run build
```

Expected: both exit 0. Inspect the Pages output before the second command to confirm generated documents reference `/aureon-digital/assets/`; the second command restores the root build required by the browser tests.

- [ ] **Step 3: Run focused conversion coverage**

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "static cases index|approved localized inboxes|consolidates proof|case proof|cinematic visual priority" --workers=1
```

Expected: all matching tests pass in both configured projects where applicable.

- [ ] **Step 4: Run the full suite serially**

```powershell
npx.cmd playwright test --workers=1
```

Expected: all tests pass, with only pre-existing environment-conditional skips. If Windows WebKit prints all results and hangs as previously documented, record the completed result count and rerun any reported failure individually; do not claim a pass without completed output.

- [ ] **Step 5: Confirm scope and history**

```powershell
git status --short
git log -5 --oneline
```

Expected: only planned files changed/committed; no dependency, hero proposition/typewriter/CTA, backend, push, or deployment changes.

- [ ] **Step 6: Update continuity and report the local result**

Record factual test/build outcomes in `.agent/CONTINUITY.md`. Report that live `/cases` remains 403 until deployment is explicitly authorized; do not perform remote writes.
