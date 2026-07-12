# Browser Language Detection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Start AUREON in Portuguese for Portuguese browser preferences and English otherwise, while preserving explicit manual choices without allowing localized blog URLs to overwrite them.

**Architecture:** A small `src/lib/language.ts` module owns the pure resolution rule and guarded `localStorage` access. `App` reads it once through lazy React state initialization and exposes a distinct persisted manual-change callback to `Nav`; existing blog-route synchronization remains non-persistent.

**Tech Stack:** React 19, TypeScript 5, React Router 7, browser `navigator`/`localStorage`, Playwright 1.54; no new dependency, cookie, API, IP lookup, or server behavior.

## Global Constraints

- Use browser language preferences, not IP geolocation.
- A valid saved manual choice always wins.
- Browser languages beginning with `pt` select Portuguese; all other browser languages select English.
- If browser language information is unavailable, default to English.
- Save only explicit manual PT/EN changes.
- Keep `/blog` in Portuguese and `/en/blog` in English regardless of the general preference.
- Visiting a localized blog URL must not overwrite the saved preference.
- Add no cookie, API request, package, IP lookup, consent surface, translated-content change, selector redesign, push, merge, PR, or deployment.

---

## File Map

- Create `src/lib/language.ts`: pure language resolution and safe browser storage access.
- Modify `src/App.tsx`: lazy preference initialization plus persisted manual-change callback.
- Modify `src/components/Nav.tsx`: invoke the manual callback before any paired blog navigation.
- Modify `playwright.config.ts`: declare `pt-BR` as the suite's existing baseline browser locale.
- Modify `tests/smoke.spec.ts`: pure resolver tests plus browser detection, saved override, and reload persistence.
- Modify `tests/blog.spec.ts`: prove explicit blog routes do not overwrite the saved general preference.

### Task 1: Language Preference Module

**Files:**
- Create: `src/lib/language.ts`
- Modify: `tests/smoke.spec.ts`

**Interfaces:**
- Consumes: `SiteLang` from `src/lib/seo.ts`.
- Produces: `languageStorageKey`, `resolvePreferredLanguage(saved, languages)`, `readPreferredLanguage()`, and `savePreferredLanguage(lang)`.

- [ ] **Step 1: Write the failing resolver test**

Add the import beside the existing library imports in `tests/smoke.spec.ts`:

```ts
import { resolvePreferredLanguage } from '../src/lib/language';
```

Add this focused table test before the route-rendering tests:

```ts
test('language preference resolver honors saved choices and Portuguese browser variants', () => {
  expect(resolvePreferredLanguage('pt', ['en-US'])).toBe('pt');
  expect(resolvePreferredLanguage('en', ['pt-BR'])).toBe('en');
  expect(resolvePreferredLanguage(null, ['fr-FR', 'pt-PT'])).toBe('pt');
  expect(resolvePreferredLanguage(null, ['PT-br'])).toBe('pt');
  expect(resolvePreferredLanguage('invalid', ['en-GB'])).toBe('en');
  expect(resolvePreferredLanguage(null, [])).toBe('en');
});
```

- [ ] **Step 2: Run the resolver test to verify RED**

Run:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "language preference resolver" --project=chromium-desktop --workers=1
```

Expected: FAIL because `../src/lib/language` does not exist.

- [ ] **Step 3: Implement the minimal native preference module**

Create `src/lib/language.ts` with exactly these responsibilities:

```ts
import type { SiteLang } from './seo';

export const languageStorageKey = 'aureon-language';

export function resolvePreferredLanguage(saved: string | null, languages: readonly string[]): SiteLang {
  if (saved === 'pt' || saved === 'en') return saved;
  return languages.some((language) => language.toLowerCase().startsWith('pt')) ? 'pt' : 'en';
}

export function readPreferredLanguage(): SiteLang {
  let saved: string | null = null;

  try {
    saved = window.localStorage.getItem(languageStorageKey);
  } catch {
    // Storage can be unavailable in privacy-restricted browsers.
  }

  const languages = typeof navigator === 'undefined'
    ? []
    : navigator.languages?.length
      ? navigator.languages
      : navigator.language
        ? [navigator.language]
        : [];

  return resolvePreferredLanguage(saved, languages);
}

export function savePreferredLanguage(lang: SiteLang): void {
  try {
    window.localStorage.setItem(languageStorageKey, lang);
  } catch {
    // The in-memory React state still applies the visitor's choice.
  }
}
```

- [ ] **Step 4: Run the resolver test and static checks to verify GREEN**

Run:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "language preference resolver" --project=chromium-desktop --workers=1
npm.cmd run lint
npm.cmd run build
```

Expected: resolver test PASS; lint and build exit 0.

- [ ] **Step 5: Commit the self-contained module**

```powershell
git add src/lib/language.ts tests/smoke.spec.ts
git commit -m "feat: resolve browser language preference"
```

### Task 2: Persisted Manual Selection and Route Sovereignty

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Nav.tsx`
- Modify: `playwright.config.ts`
- Modify: `tests/smoke.spec.ts`
- Modify: `tests/blog.spec.ts`

**Interfaces:**
- Consumes: `readPreferredLanguage(): SiteLang`, `savePreferredLanguage(lang: SiteLang): void`, and `languageStorageKey` from Task 1.
- Produces: `NavProps.onLanguageChange(lang: SiteLang): void`; explicit blog routes retain their existing `blogLang` authority.

- [ ] **Step 1: Make the suite's current Portuguese browser assumption explicit**

Add `locale: 'pt-BR'` to the shared `use` block in `playwright.config.ts`:

```ts
  use: {
    baseURL: 'http://127.0.0.1:4173',
    locale: 'pt-BR',
    trace: 'on-first-retry',
  },
```

This preserves the pre-feature expectation that unconfigured tests open the site in Portuguese while allowing focused tests to override the browser language.

- [ ] **Step 2: Write failing browser detection and persistence tests**

Expand the Task 1 import in `tests/smoke.spec.ts`:

```ts
import { languageStorageKey, resolvePreferredLanguage } from '../src/lib/language';
```

Add these tests after the pure resolver test:

```ts
test('English browser preferences start the general site in English', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'languages', { configurable: true, get: () => ['en-US'] });
    Object.defineProperty(navigator, 'language', { configurable: true, get: () => 'en-US' });
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: /We make you/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'PT', exact: true })).toBeVisible();
});

test('saved manual language overrides the browser preference', async ({ page }) => {
  await page.addInitScript((key) => {
    localStorage.setItem(key, 'pt');
    Object.defineProperty(navigator, 'languages', { configurable: true, get: () => ['en-US'] });
  }, languageStorageKey);

  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Fazemos você/ })).toBeVisible();
});

test('manual language choice survives reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.getByRole('heading', { name: /We make you/ })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), languageStorageKey)).toBe('en');

  await page.reload();
  await expect(page.getByRole('heading', { name: /We make you/ })).toBeVisible();
});
```

- [ ] **Step 3: Write the failing blog non-persistence regression**

Add this import in `tests/blog.spec.ts`:

```ts
import { languageStorageKey } from '../src/lib/language';
```

Add this test after `language selector preserves the article`:

```ts
test('explicit blog locale does not overwrite the saved general preference', async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, 'pt'), languageStorageKey);

  await page.goto('/en/blog');
  await expect(page.getByRole('heading', { level: 1, name: 'Content built to be found — and chosen.' })).toBeVisible();
  expect(await page.evaluate((key) => localStorage.getItem(key), languageStorageKey)).toBe('pt');

  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Fazemos você/ })).toBeVisible();
});
```

- [ ] **Step 4: Run focused browser tests to verify RED**

Run:

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts tests/blog.spec.ts -g "English browser preferences|saved manual language|manual language choice|explicit blog locale" --project=chromium-desktop --workers=1
```

Expected: FAIL because `App` still initializes to Portuguese and `Nav` does not save manual choices.

- [ ] **Step 5: Initialize App from the preference and persist only manual changes**

In `src/App.tsx`, add the language helpers beside the SEO import:

```ts
import { readPreferredLanguage, savePreferredLanguage } from './lib/language';
```

Replace the fixed initialization:

```ts
const [lang, setLang] = useState<Lang>(readPreferredLanguage);
```

Add the manual callback after `activeLang`:

```ts
  function changePreferredLanguage(nextLang: Lang) {
    setLang(nextLang);
    savePreferredLanguage(nextLang);
  }
```

Pass it to `Nav`:

```tsx
<Nav lang={activeLang} onLanguageChange={changePreferredLanguage} />
```

Leave the existing `blogLang` effect using `setLang(blogLang)` unchanged, because route synchronization must not write storage.

- [ ] **Step 6: Make Nav identify manual selection explicitly**

In `src/components/Nav.tsx`, replace `setLang` in the prop contract and component signature:

```ts
interface NavProps {
  lang: 'en' | 'pt';
  onLanguageChange: (lang: 'en' | 'pt') => void;
}

export function Nav({ lang, onLanguageChange }: NavProps) {
```

Replace `changeLanguage` so every selector click saves the choice and paired blog navigation remains intact:

```ts
  function changeLanguage() {
    const target = lang === 'en' ? 'pt' : 'en';
    const paired = pairedBlogPath(location, target);
    onLanguageChange(target);
    if (paired) navigate(paired);
  }
```

- [ ] **Step 7: Run focused and existing language regressions to verify GREEN**

Run:

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts tests/blog.spec.ts -g "language preference resolver|English browser preferences|saved manual language|manual language choice|explicit blog locale|language selector preserves|follows the language selector|changing language" --project=chromium-desktop --workers=1
npm.cmd run lint
```

Expected: all selected tests PASS; build and lint exit 0.

- [ ] **Step 8: Commit the browser behavior**

```powershell
git add src/App.tsx src/components/Nav.tsx playwright.config.ts tests/smoke.spec.ts tests/blog.spec.ts
git commit -m "feat: detect and remember site language"
```

## Final Verification

- [ ] Run the complete project verification:

```powershell
npm.cmd test
npm.cmd run build:pages
git diff --check
git status --short --branch
```

Expected: lint, root build, the full Playwright suite, and GitHub Pages build pass; `git diff --check` is silent; the branch has no uncommitted implementation changes.

- [ ] Manually inspect one root-language transition and one explicit blog route in both desktop and mobile projects if the full suite exposes a visual or WebKit-specific regression. Do not add screenshots or visual redesign work unless a regression is observed.
