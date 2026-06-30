# Site Foundation Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every deployed route load correctly, add route-level SEO, make the mailto contact flow honest and accessible, and remove the audited mobile clipping without changing the fictional metrics, testimonials, or case content.

**Architecture:** Keep the React/Vite SPA and existing deployment workflow. Add one Apache fallback file, one small route-metadata module, and targeted class names/media queries; reuse Playwright for red-green regression coverage and add no runtime dependency.

**Tech Stack:** React 19, TypeScript 6, React Router 7, Vite 8, Sass, Apache `.htaccess`, Playwright 1.60.

---

## File Map

- Create `public/.htaccess`: Hostinger SPA fallback for non-file routes.
- Create `src/lib/seo.ts`: route metadata resolution and DOM tag synchronization.
- Modify `index.html`: correct baseline metadata for first load.
- Modify `src/App.tsx`: apply metadata on route/language changes.
- Modify `src/components/Contact.tsx`: honest mailto copy, localized details, accessible labels, and responsive hooks.
- Modify `src/components/Process.tsx`: remove remaining mixed-language interface strings.
- Modify `src/components/Hero.tsx`: expose the scroll cue to responsive CSS.
- Modify `src/components/CasesPage.tsx`: expose case metrics/meta rows to responsive CSS.
- Modify `src/styles/main.scss`: minimal mobile layout rules.
- Modify `tests/smoke.spec.ts`: build, SEO, accessibility, translation, and mobile regression checks.

### Task 1: Hostinger SPA fallback

**Files:**
- Create: `public/.htaccess`
- Modify: `tests/smoke.spec.ts`
- Test: `tests/smoke.spec.ts`

- [ ] **Step 1: Write the failing build-artifact test**

Add the Node imports and test to `tests/smoke.spec.ts`:

```ts
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';

test('Hostinger build includes the SPA fallback', async () => {
  const fallback = await readFile(resolve(process.cwd(), 'dist', '.htaccess'), 'utf8');

  expect(fallback).toContain('RewriteEngine On');
  expect(fallback).toContain('RewriteCond %{REQUEST_FILENAME} !-f');
  expect(fallback).toContain('RewriteRule . /index.html [L]');
});
```

- [ ] **Step 2: Run the targeted test and verify RED**

Run:

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "Hostinger build includes" --workers=1
```

Expected: FAIL with `ENOENT` for `dist/.htaccess`, proving the deployed artifact lacks the Hostinger fallback.

- [ ] **Step 3: Add the minimal Apache rule**

Create `public/.htaccess`:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

Vite 8 copies every entry from `public/`, including dotfiles, and the existing SSH command archives `dist/.`; no workflow change is required.

- [ ] **Step 4: Run the targeted test and verify GREEN**

Run:

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "Hostinger build includes" --workers=1
```

Expected: PASS and `dist/.htaccess` contains the rewrite rule.

- [ ] **Step 5: Commit**

```powershell
git add public/.htaccess tests/smoke.spec.ts
git commit -m "fix: add hostinger spa fallback"
```

### Task 2: Route-level SEO metadata

**Files:**
- Create: `src/lib/seo.ts`
- Modify: `src/App.tsx:1-105`
- Modify: `index.html:3-15`
- Modify: `tests/smoke.spec.ts`
- Test: `tests/smoke.spec.ts`

- [ ] **Step 1: Write failing SEO behavior tests**

Append to `tests/smoke.spec.ts`:

```ts
const seoCases = [
  {
    route: '/',
    title: 'AUREON | Web Design, SEO e GEO',
    canonical: 'https://aureondigital.co/',
  },
  {
    route: '/services',
    title: 'Serviços de Web Design, SEO e GEO | AUREON',
    canonical: 'https://aureondigital.co/services',
  },
  {
    route: '/blog/geo-vs-seo-2025',
    title: 'GEO vs SEO in 2025: what every business needs to know | AUREON',
    canonical: 'https://aureondigital.co/blog/geo-vs-seo-2025',
  },
];

for (const seoCase of seoCases) {
  test(`sets SEO metadata for ${seoCase.route}`, async ({ page }) => {
    await page.goto(seoCase.route);

    await expect(page).toHaveTitle(seoCase.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /\S{40,}/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', seoCase.canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', seoCase.canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://aureondigital.co/aureon-logo.png');
  });
}

test('keeps fictional case details out of the index', async ({ page }) => {
  await page.goto('/cases/techbrasil-seo');

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
});

test('marks unknown routes as noindex', async ({ page }) => {
  await page.goto('/missing-page');

  await expect(page).toHaveTitle('Página não encontrada | AUREON');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,follow');
});
```

- [ ] **Step 2: Run the SEO tests and verify RED**

Run:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "SEO metadata|fictional case|unknown routes" --workers=1
```

Expected: FAIL because every route still has the homepage title and canonical/robots/`og:url` tags are missing.

- [ ] **Step 3: Implement the metadata resolver and DOM synchronization**

Create `src/lib/seo.ts`:

```ts
import { posts } from './data';

export type SiteLang = 'en' | 'pt';

interface MetaCopy {
  title: string;
  description: string;
}

export interface PageMeta extends MetaCopy {
  canonical: string;
  locale: 'en_US' | 'pt_BR';
  robots: 'index,follow' | 'noindex,follow';
  type: 'article' | 'website';
}

const siteUrl = 'https://aureondigital.co';

const pages: Record<SiteLang, Record<string, MetaCopy>> = {
  pt: {
    '/': {
      title: 'AUREON | Web Design, SEO e GEO',
      description: 'Agência digital de Web Design, SEO e GEO para empresas que querem ser encontradas, gerar confiança e converter mais.',
    },
    '/services': {
      title: 'Serviços de Web Design, SEO e GEO | AUREON',
      description: 'Web Design, SEO e otimização para buscas por inteligência artificial, com estratégia focada em visibilidade e conversão.',
    },
    '/cases': {
      title: 'Cases de Marketing Digital | AUREON',
      description: 'Conheça projetos de Web Design, SEO e GEO apresentados pela AUREON e os resultados associados a cada estratégia.',
    },
    '/blog': {
      title: 'Blog de Web Design, SEO e GEO | AUREON',
      description: 'Artigos sobre Web Design, SEO, GEO, conversão e estratégia digital para empresas que querem crescer com consistência.',
    },
    '/about': {
      title: 'Sobre a AUREON | Agência Digital',
      description: 'Conheça a AUREON, agência digital brasileira especializada em Web Design, SEO, GEO e crescimento orientado por estratégia.',
    },
    '/faq': {
      title: 'Perguntas Frequentes | AUREON',
      description: 'Respostas sobre projetos, prazos, Web Design, SEO, GEO e a forma de trabalho da AUREON.',
    },
    '/privacy': {
      title: 'Política de Privacidade | AUREON',
      description: 'Consulte como a AUREON trata dados pessoais, comunicações e informações enviadas pelo site.',
    },
    '/terms': {
      title: 'Termos de Uso | AUREON',
      description: 'Consulte os termos e condições aplicáveis ao uso do site e dos conteúdos da AUREON.',
    },
  },
  en: {
    '/': {
      title: 'AUREON | Web Design, SEO and GEO',
      description: 'A digital agency for businesses that want to be found, earn trust, and convert more through Web Design, SEO, and GEO.',
    },
    '/services': {
      title: 'Web Design, SEO and GEO Services | AUREON',
      description: 'Web Design, SEO, and AI search optimization built around visibility, authority, and conversion.',
    },
    '/cases': {
      title: 'Digital Marketing Cases | AUREON',
      description: 'Explore Web Design, SEO, and GEO projects presented by AUREON and the results associated with each strategy.',
    },
    '/blog': {
      title: 'Web Design, SEO and GEO Blog | AUREON',
      description: 'Articles about Web Design, SEO, GEO, conversion, and digital strategy for businesses ready to grow.',
    },
    '/about': {
      title: 'About AUREON | Digital Agency',
      description: 'Meet AUREON, a Brazilian digital agency focused on Web Design, SEO, GEO, and strategy-led growth.',
    },
    '/faq': {
      title: 'Frequently Asked Questions | AUREON',
      description: 'Answers about projects, timelines, Web Design, SEO, GEO, and how AUREON works.',
    },
    '/privacy': {
      title: 'Privacy Policy | AUREON',
      description: 'Learn how AUREON handles personal data, communications, and information submitted through the website.',
    },
    '/terms': {
      title: 'Terms of Use | AUREON',
      description: 'Read the terms and conditions that apply to the AUREON website and its content.',
    },
  },
};

function completeMeta(copy: MetaCopy, pathname: string, lang: SiteLang, robots: PageMeta['robots'], type: PageMeta['type']): PageMeta {
  return {
    ...copy,
    canonical: new URL(pathname, siteUrl).href,
    locale: lang === 'pt' ? 'pt_BR' : 'en_US',
    robots,
    type,
  };
}

export function resolvePageMeta(pathname: string, lang: SiteLang): PageMeta {
  const postSlug = pathname.match(/^\/blog\/([^/]+)$/)?.[1];
  if (postSlug) {
    const post = posts.find((item) => item.id === postSlug);
    if (post) {
      return completeMeta(
        { title: `${post.title} | AUREON`, description: post.excerpt },
        pathname,
        lang,
        'index,follow',
        'article',
      );
    }
  }

  if (/^\/cases\/[^/]+$/.test(pathname)) {
    return completeMeta(
      {
        title: lang === 'pt' ? 'Case em preparação | AUREON' : 'Case in progress | AUREON',
        description: lang === 'pt'
          ? 'Este case será substituído por um projeto real da AUREON.'
          : 'This case will be replaced with a real AUREON project.',
      },
      pathname,
      lang,
      'noindex,follow',
      'website',
    );
  }

  const copy = pages[lang][pathname];
  if (copy) return completeMeta(copy, pathname, lang, 'index,follow', 'website');

  return completeMeta(
    {
      title: lang === 'pt' ? 'Página não encontrada | AUREON' : 'Page not found | AUREON',
      description: lang === 'pt'
        ? 'A página solicitada não foi encontrada.'
        : 'The requested page could not be found.',
    },
    pathname,
    lang,
    'noindex,follow',
    'website',
  );
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.append(element);
  }
  element.href = href;
}

export function applyPageMeta(pathname: string, lang: SiteLang) {
  const meta = resolvePageMeta(pathname, lang);

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.title = meta.title;
  setMeta('name', 'description', meta.description);
  setMeta('name', 'robots', meta.robots);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:type', meta.type);
  setMeta('property', 'og:url', meta.canonical);
  setMeta('property', 'og:site_name', 'AUREON');
  setMeta('property', 'og:locale', meta.locale);
  setMeta('property', 'og:image', `${siteUrl}/aureon-logo.png`);
  setMeta('property', 'og:image:alt', 'AUREON Digital Agency');
  setCanonical(meta.canonical);
}
```

- [ ] **Step 4: Wire metadata to route and language changes**

In `src/App.tsx`, import the helper and replace the local language type:

```ts
import { applyPageMeta, type SiteLang } from './lib/seo';

type Lang = SiteLang;
```

Inside `App`, after `useLocation()`, add:

```ts
  useEffect(() => {
    applyPageMeta(pathname, lang);
  }, [pathname, lang]);
```

- [ ] **Step 5: Correct first-load metadata**

Replace the metadata block in `index.html` with:

```html
    <title>AUREON | Web Design, SEO e GEO</title>
    <meta name="description" content="Agência digital de Web Design, SEO e GEO para empresas que querem ser encontradas, gerar confiança e converter mais." />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="https://aureondigital.co/" />
    <meta property="og:title" content="AUREON | Web Design, SEO e GEO" />
    <meta property="og:description" content="Agência digital de Web Design, SEO e GEO para empresas que querem ser encontradas, gerar confiança e converter mais." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://aureondigital.co/" />
    <meta property="og:site_name" content="AUREON" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:image" content="https://aureondigital.co/aureon-logo.png" />
    <meta property="og:image:alt" content="AUREON Digital Agency" />
```

- [ ] **Step 6: Run the SEO tests and verify GREEN**

Run:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "SEO metadata|fictional case|unknown routes" --workers=1
```

Expected: all SEO tests PASS.

- [ ] **Step 7: Commit**

```powershell
git add index.html src/App.tsx src/lib/seo.ts tests/smoke.spec.ts
git commit -m "feat: add route-level seo metadata"
```

### Task 3: Honest and accessible contact flow

**Files:**
- Modify: `src/components/Contact.tsx:1-231`
- Modify: `src/components/Process.tsx:6-68`
- Modify: `tests/smoke.spec.ts`
- Test: `tests/smoke.spec.ts`

- [ ] **Step 1: Write failing contact and translation tests**

Append to `tests/smoke.spec.ts`:

```ts
test('contact form describes the mailto handoff and has accessible labels', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByLabel('Seu nome')).toBeVisible();
  await expect(page.getByLabel('E-mail')).toBeVisible();
  await expect(page.getByLabel('Serviço')).toBeVisible();
  await expect(page.getByLabel('Mensagem')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Abrir e-mail' })).toBeVisible();
  await expect(page.getByText('Localização', { exact: true })).toBeVisible();
  await expect(page.getByText('Tempo de resposta', { exact: true })).toBeVisible();
});

test('Portuguese process chrome contains no English placeholders', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Cronograma', { exact: true })).toBeAttached();
  await expect(page.getByText('4–8 semanas', { exact: true })).toBeAttached();
  await expect(page.getByText('Do briefing à publicação, normalmente', { exact: true })).toBeAttached();
  await expect(page.getByText('Timeline', { exact: true })).toHaveCount(0);
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "contact form describes|Portuguese process" --workers=1
```

Expected: FAIL because labels are not associated, the action still says “Enviar mensagem,” and English process/contact labels remain.

- [ ] **Step 3: Simplify and localize the contact state**

In `src/components/Contact.tsx`:

1. Keep `useState` for form values, remove the `status` state.
2. Replace `send`, `sending`, `sent`, and `or` with these fields in each language:

```ts
    submit: 'Open email app',
    location: 'Location',
    responseTime: 'Response time',
    responseValue: 'Within 12 hours',
    subject: 'AUREON project inquiry',
    notSelected: 'Not selected',
```

```ts
    submit: 'Abrir e-mail',
    location: 'Localização',
    responseTime: 'Tempo de resposta',
    responseValue: 'Em até 12 horas',
    subject: 'Novo projeto AUREON',
    notSelected: 'Não selecionado',
```

Replace `handleSubmit` with:

```ts
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const body = [
      `${t[lang].name}: ${form.name}`,
      `${t[lang].email}: ${form.email}`,
      `${t[lang].service}: ${form.service || t[lang].notSelected}`,
      '',
      `${t[lang].message}:`,
      form.message,
    ].join('\n');

    window.location.href = contactHref(lang, t[lang].subject, body);
  };
```

Replace literal information labels/values with:

```tsx
<div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t[lang].location}</div>
<span style={{ fontSize: 15, color: 'var(--text)' }}>Brasil 🇧🇷</span>

<div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{t[lang].responseTime}</div>
<span style={{ fontSize: 15, color: 'var(--text)' }}>{t[lang].responseValue}</span>
```

- [ ] **Step 4: Make native labels authoritative and remove false confirmation UI**

Define the shared label style beside `inputStyle`:

```ts
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 12,
    color: 'var(--text-muted)',
    marginBottom: 8,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  };
```

Render the form unconditionally with these exact associations and handlers:

```tsx
<div className="contact-form-card" style={{ background: 'var(--surface)', border: '1px solid var(--border-dim)', padding: '40px', borderRadius: 2 }}>
  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <div className="contact-identity-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div>
        <label htmlFor="contact-name" style={labelStyle}>{t[lang].name}</label>
        <input
          id="contact-name"
          style={inputStyle}
          placeholder={t[lang].namePh}
          value={form.name}
          onChange={event => setForm(current => ({ ...current, name: event.target.value }))}
          onFocus={event => (event.target.style.borderColor = 'var(--border-bright)')}
          onBlur={event => (event.target.style.borderColor = 'var(--border-dim)')}
          required
        />
      </div>
      <div>
        <label htmlFor="contact-email" style={labelStyle}>{t[lang].email}</label>
        <input
          id="contact-email"
          type="email"
          style={inputStyle}
          placeholder={t[lang].emailPh}
          value={form.email}
          onChange={event => setForm(current => ({ ...current, email: event.target.value }))}
          onFocus={event => (event.target.style.borderColor = 'var(--border-bright)')}
          onBlur={event => (event.target.style.borderColor = 'var(--border-dim)')}
          required
        />
      </div>
    </div>

    <div>
      <label htmlFor="contact-service" style={labelStyle}>{t[lang].service}</label>
      <select
        id="contact-service"
        style={{ ...inputStyle, cursor: 'pointer' }}
        value={form.service}
        onChange={event => setForm(current => ({ ...current, service: event.target.value }))}
        onFocus={event => (event.target.style.borderColor = 'var(--border-bright)')}
        onBlur={event => (event.target.style.borderColor = 'var(--border-dim)')}
      >
        <option value="">{t[lang].servicePh}</option>
        {t[lang].services.map(service => <option key={service} value={service}>{service}</option>)}
      </select>
    </div>

    <div>
      <label htmlFor="contact-message" style={labelStyle}>{t[lang].message}</label>
      <textarea
        id="contact-message"
        style={{ ...inputStyle, resize: 'vertical', minHeight: 140 }}
        placeholder={t[lang].messagePh}
        value={form.message}
        onChange={event => setForm(current => ({ ...current, message: event.target.value }))}
        onFocus={event => (event.target.style.borderColor = 'var(--border-bright)')}
        onBlur={event => (event.target.style.borderColor = 'var(--border-dim)')}
      />
    </div>

    <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
      {t[lang].submit}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    </button>
  </form>
</div>
```

- [ ] **Step 5: Localize the process summary**

Add to both `Process.tsx` language objects:

```ts
timeline: 'Timeline',
duration: '4–8 weeks',
durationNote: 'From brief to live, typically',
```

```ts
timeline: 'Cronograma',
duration: '4–8 semanas',
durationNote: 'Do briefing à publicação, normalmente',
```

Change the Portuguese execution text to:

```ts
{ num: '03', title: 'Execução', desc: 'Entregamos com total transparência. Atualizações regulares, sem aumento silencioso de escopo e sem surpresas.', time: 'Sem. 2–6' }
```

Replace the three literal timeline strings in JSX with `t[lang].timeline`, `t[lang].duration`, and `t[lang].durationNote`.

- [ ] **Step 6: Run the targeted tests and verify GREEN**

Run:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "contact form describes|Portuguese process" --workers=1
```

Expected: both tests PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/components/Contact.tsx src/components/Process.tsx tests/smoke.spec.ts
git commit -m "fix: make contact handoff honest and accessible"
```

### Task 4: Mobile clipping and overlap regressions

**Files:**
- Modify: `src/components/Contact.tsx:145-184`
- Modify: `src/components/Hero.tsx:249-257`
- Modify: `src/components/CasesPage.tsx:143-154,350-364`
- Modify: `src/styles/main.scss:433-461`
- Modify: `tests/smoke.spec.ts`
- Test: `tests/smoke.spec.ts`

- [ ] **Step 1: Write the failing mobile regression tests**

Append to `tests/smoke.spec.ts`:

```ts
test('mobile contact fields stack and the hero cue does not overlap metrics', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const scrollCue = page.locator('.hero-scroll-cue');
  await expect(scrollCue).toHaveCount(1);
  await expect(scrollCue).toBeHidden();

  const name = page.getByLabel('Seu nome');
  const email = page.getByLabel('E-mail');
  await name.scrollIntoViewIfNeeded();
  const nameBox = await name.boundingBox();
  const emailBox = await email.boundingBox();

  expect(nameBox).not.toBeNull();
  expect(emailBox).not.toBeNull();
  expect(nameBox!.width).toBeGreaterThan(240);
  expect(emailBox!.width).toBeGreaterThan(240);
  expect(emailBox!.y).toBeGreaterThan(nameBox!.y + nameBox!.height);
});

test('mobile case summary and metadata fit the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/cases');

  const period = page.getByText('2025–26', { exact: true });
  await expect(period).toBeVisible();
  const periodBox = await period.boundingBox();
  expect(periodBox).not.toBeNull();
  expect(periodBox!.x + periodBox!.width).toBeLessThanOrEqual(366);

  await page.goto('/cases/techbrasil-seo');
  const metaList = page.locator('.case-meta-list');
  await expect(metaList).toHaveCount(1);
  expect(await metaList.evaluate(element => element.scrollWidth <= element.clientWidth + 1)).toBeTruthy();
});
```

- [ ] **Step 2: Run the mobile tests and verify RED**

Run:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "mobile contact fields|mobile case summary" --workers=1
```

Expected: FAIL because the new hooks do not exist, name/email remain in two narrow columns, and case metadata still overflows.

- [ ] **Step 3: Add stable responsive hooks**

Apply these exact opening-tag replacements; all other JSX remains unchanged:

```tsx
// Hero.tsx
<div className="hero-scroll-cue" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeIn 1s ease 1.2s both" }}>
```

```tsx
// Contact.tsx
<div className="contact-form-card" style={{ background: "var(--surface)", border: "1px solid var(--border-dim)", padding: "40px", borderRadius: 2 }}>
<div className="contact-identity-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
```

```tsx
// CasesPage.tsx summary
<div className="teaser-metrics case-page-metrics" style={{ display: "flex", gap: 32 }}>
```

```tsx
// CasesPage.tsx detail metadata
<div className="case-meta-list" style={{ display: "flex", gap: 0, overflowX: "auto" }}>
<div key={i} className="case-meta-item" style={{ padding: "20px 32px", borderRight: i < 2 ? "1px solid var(--border-dim)" : "none", flexShrink: 0 }}>
```

- [ ] **Step 4: Add the minimal mobile CSS**

Inside the existing `@media (max-width: 520px)` block in `src/styles/main.scss`, add:

```scss
  .hero-scroll-cue {
    display: none !important;
  }

  .contact-form-card {
    padding: 24px !important;
  }

  .contact-identity-fields {
    grid-template-columns: 1fr !important;
  }

  .case-page-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }

  .case-page-metrics .teaser-metric:last-child {
    grid-column: 1 / -1;
  }

  .case-meta-list {
    display: grid !important;
    grid-template-columns: 1fr !important;
    overflow-x: visible !important;
  }

  .case-meta-item {
    padding: 16px 0 !important;
    border-right: 0 !important;
    border-bottom: 1px solid var(--border-dim);
    min-width: 0;
    white-space: normal;
  }

  .case-meta-item:last-child {
    border-bottom: 0;
  }
```

- [ ] **Step 5: Run the mobile tests and verify GREEN**

Run:

```powershell
npx.cmd playwright test tests/smoke.spec.ts -g "mobile contact fields|mobile case summary" --workers=1
```

Expected: both tests PASS at 390x844.

- [ ] **Step 6: Commit**

```powershell
git add src/components/Contact.tsx src/components/Hero.tsx src/components/CasesPage.tsx src/styles/main.scss tests/smoke.spec.ts
git commit -m "fix: prevent mobile content clipping"
```

### Task 5: Full verification and handoff

**Files:**
- Modify: `.agent/CONTINUITY.md` (ignored local state)
- Verify: all changed source and test files

- [ ] **Step 1: Run static checks**

```powershell
git diff --check
npm.cmd run lint
```

Expected: exit code 0 with no lint errors or whitespace errors.

- [ ] **Step 2: Run both deployment builds**

```powershell
npm.cmd run build
npm.cmd run build:pages
```

Expected: both commands exit 0; the Hostinger build contains `dist/.htaccess`, and the GitHub Pages build still contains `dist/404.html`.

- [ ] **Step 3: Run the complete test suite**

```powershell
npm.cmd run test:visual
```

Expected: all Playwright tests pass with zero failures.

- [ ] **Step 4: Inspect the rendered application**

Use the in-app browser against the local preview and inspect:

- `/` at 1280x720 and 390x844.
- `/cases` at 390x844.
- `/cases/techbrasil-seo` at 390x844.
- `/services` by direct URL.

Confirm the contact fields stack, the hero cue is hidden on mobile, case metadata fits, route metadata changes, and no existing metrics/testimonials/cases disappeared.

- [ ] **Step 5: Update continuity**

Record the implementation decisions, test counts, build results, and any remaining live-deploy verification in `.agent/CONTINUITY.md` with the current ISO timestamp and correct provenance tags.

- [ ] **Step 6: Review commits without pushing**

```powershell
git status --short
git log -5 --oneline
```

Expected: working tree clean except ignored continuity state; do not push because the user has not explicitly authorized a remote write/deploy.
