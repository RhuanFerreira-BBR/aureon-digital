# Conversion Blog Redesign

Date: 2026-07-05
Status: approved in conversation; pending written-spec review

## Goal

Replace the four current English-only placeholder posts with four original bilingual articles that help marketing decision-makers and business owners understand, evaluate, and buy AUREON's Web Design, SEO, GEO, performance, and conversion services.

The blog must become a coherent acquisition hub rather than a collection of isolated articles. It must preserve the AUREON dark, gold, grid-based identity, improve reading and conversion paths, and make every article independently indexable in Portuguese and English.

## Scope

This phase includes:

- four new topics with complete PT-BR and EN editorial versions;
- localized index and detail routes;
- redesigned blog index and article layouts;
- local article artwork;
- internal links to relevant services, cases, and contact;
- article metadata, static route heads, JSON-LD, sitemap entries, and language alternates;
- redirects from the four removed slugs;
- responsive, accessibility, data-integrity, SEO, and build coverage.

This phase does not include WordPress, another CMS, analytics infrastructure, a newsletter backend, user comments, search, pagination, or a redesign outside the blog surfaces. Blog facts and performance claims will not be invented. The fictional case-impact disclosure policy remains unchanged and is outside this scope.

## Audience and editorial position

The primary audience is marketing decision-makers and business owners. The writing should explain technical subjects through business decisions, risks, and outcomes without turning the posts into developer documentation.

Each article must:

- answer a real decision-stage question;
- use clear examples and practical frameworks;
- distinguish evidence from AUREON recommendations;
- cite primary sources for changing technical claims;
- avoid unsupported conversion statistics or guarantees;
- connect naturally to one service, one or more relevant cases, and one primary CTA;
- provide equivalent substance in both languages rather than a visibly mechanical translation.

Google's people-first guidance explicitly rejects padding content to a supposed preferred word count. Articles therefore have no fixed word quota. Each version should be complete enough to satisfy its intent, normally through an executive summary, four to six substantive sections, a practical checklist or framework, source notes, and a conclusion.

## Editorial matrix

### 1. Website conversion

- PT route: `/blog/site-que-converte`
- EN route: `/en/blog/website-conversion-strategy`
- PT title: `Seu site recebe visitas, mas não gera oportunidades?`
- EN title: `Your website gets traffic but no qualified leads. What is missing?`
- Intent: diagnose why traffic does not become qualified action.
- Core sections: define the page decision; clarify the value proposition; sequence attention, trust, and action; reduce friction; use proof contextually; measure qualified outcomes.
- Practical element: conversion-journey checklist.
- Related service: Web Design and conversion strategy.
- Related case: MINI Finance Matcher.
- CTA: request a website diagnosis.

### 2. SEO and GEO

- PT route: `/blog/seo-geo-busca-ia`
- EN route: `/en/blog/seo-geo-ai-search`
- PT title: `SEO e GEO: como tornar sua marca encontrável no Google e nas respostas de IA`
- EN title: `SEO and GEO: how to make your brand discoverable in search and AI answers`
- Intent: explain how classical search foundations support discovery in AI-assisted search.
- Core sections: what changed in discovery; what did not change; crawlability and indexability; people-first topical authority; entities, citations, and structured data; internal linking; measurement limitations.
- Practical element: discoverability audit.
- Related service: SEO and GEO.
- Related case: Dove Global AEM.
- CTA: request a visibility diagnosis.
- Accuracy rule: do not present GEO as a guaranteed ranking system, special schema, AI text file, or replacement for SEO. Google states that standard SEO foundations remain applicable to its AI features and no special markup is required.

### 3. Performance and page experience

- PT route: `/blog/performance-core-web-vitals`
- EN route: `/en/blog/performance-core-web-vitals`
- PT title: `Performance que converte: velocidade, mobile e Core Web Vitals`
- EN title: `Performance that converts: speed, mobile UX, and Core Web Vitals`
- Intent: translate technical page-experience metrics into commercial risk and prioritization.
- Core sections: perceived versus measured speed; mobile constraints; LCP, INP, and CLS in plain language; field data versus lab data; high-impact remediation priorities; measurement after launch.
- Practical element: performance priority matrix.
- Related service: Web Design and technical performance.
- Related case: Arctic Fox Headless Commerce.
- CTA: request a performance review.
- Accuracy rule: current Core Web Vitals thresholds may be cited only with an official source and review date.

### 4. Strategic redesign

- PT route: `/blog/quando-redesenhar-site`
- EN route: `/en/blog/when-to-redesign-website`
- PT title: `Quando redesenhar um site: sinais, prioridades e como medir retorno`
- EN title: `When to redesign a website: warning signs, priorities, and ROI`
- Intent: help a high-intent buyer decide whether to optimize, rebuild, replatform, or wait.
- Core sections: symptoms versus root causes; business and technical warning signs; optimize versus rebuild; platform implications; scope priorities; baseline and post-launch measurement; decision checklist.
- Practical element: redesign decision scorecard.
- Related service: Web Design and full strategy.
- Related case: Dove Global AEM.
- Contextual platform links: Avary Drone for Shopify and Celine Medspas for WordPress.
- CTA: scope a redesign with AUREON.

## Source baseline

Editorial claims will be checked at implementation time against current primary sources. The initial baseline reviewed on 2026-07-05 is:

- Google Search Central, people-first content: `https://developers.google.com/search/docs/fundamentals/creating-helpful-content`
- Google Search Central, AI features and websites: `https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br`
- Google Search Central, structured data introduction: `https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data`
- web.dev, Core Web Vitals: `https://web.dev/articles/vitals?hl=en`

Sources appear in a concise article footer and are not copied at length. Every time-sensitive claim carries enough surrounding language to remain accurate if a platform changes behavior; publication and modification dates remain honest.

## Information architecture and language routes

Portuguese is the default locale:

- `/blog`
- `/blog/<pt-slug>`

English uses explicit, indexable URLs:

- `/en/blog`
- `/en/blog/<en-slug>`

Each data item stores its paired PT and EN slugs. The existing language selector navigates between the paired routes while the user is on a blog surface. On all other routes, its existing behavior remains unchanged in this phase.

Every index and detail page has a self-referencing canonical, `hreflang="pt-BR"`, `hreflang="en"`, and `hreflang="x-default"` pointing to the Portuguese route. Both languages are present in the sitemap. A request with a valid article under the wrong language prefix resolves to its paired canonical route rather than exposing duplicate content.

## Legacy route handling

The removed content must not remain accessible as duplicate articles. Preserve existing links with permanent redirects:

- `/blog/geo-vs-seo-2025` -> `/blog/seo-geo-busca-ia`
- `/blog/web-design-conversion-2025` -> `/blog/site-que-converte`
- `/blog/seo-technical-fundamentals` -> `/blog/performance-core-web-vitals`
- `/blog/smb-digital-strategy-brazil` -> `/blog/quando-redesenhar-site`

Hostinger receives Apache redirect rules before the SPA fallback. GitHub Pages receives generated legacy HTML redirect documents because it cannot emit server-side 301 responses. The old URLs are removed from the sitemap and never render old content.

## Local data model

Keep blog content local and typed. No runtime fetch, CMS adapter, or markdown dependency is added.

Each article contains:

- stable internal ID;
- category and accent;
- featured order;
- publication and modification dates;
- local image and localized alt text;
- localized slug, title, excerpt, read time, SEO title, and SEO description;
- author identity;
- structured content blocks;
- related case IDs and service link;
- CTA copy and target;
- source labels and URLs.

Content blocks are a small discriminated union for the shapes the approved design actually needs: paragraph, heading, checklist, callout, contextual CTA, related case, and sources. The renderer outputs React elements directly. It does not use `dangerouslySetInnerHTML`, parse arbitrary markdown, or accept remote HTML.

The four old objects are deleted. A data-integrity test guarantees unique IDs/slugs, complete locale pairs, valid internal links, local media, at least one source per factual article, and exactly one featured article.

## Blog index design

The approved direction is the AUREON acquisition hub:

1. restrained AUREON hero with the promise `Conteúdo para ser encontrado — e escolhido.` and localized English equivalent;
2. one wide featured article focused on website conversion;
3. three equally weighted supporting pillars for SEO/GEO, performance, and redesign;
4. a final diagnostic CTA tied to the visitor's broader digital presence.

The current category filter is removed. With four deliberately connected articles, filtering adds interaction without helping discovery. Category labels remain visible on cards.

The layout keeps the existing void, gold, surface, grid, display typography, and motion language. Cards use real article artwork and consistent metadata. Hover motion remains subtle and has a reduced-motion fallback. The content order remains logical without CSS.

## Article detail design

The approved article page contains:

1. editorial hero with category, title, lead, author, reading time, and honest update date;
2. executive-summary callout;
3. focused reading column with semantic headings and structured blocks;
4. sticky table of contents on desktop, inline placement on smaller screens;
5. one contextual CTA after the article has established value;
6. one related-case proof block where it supports the argument;
7. author identity and source notes;
8. next-article navigation and a final CTA.

Conversion components must remain contextual. The page must read as useful editorial content, not a landing page interrupted by repeated sales banners. There is one primary CTA target per article even if the same action is surfaced contextually and at the end.

## Local artwork

Replace external Unsplash URLs with four local, lightweight SVG illustrations under `public/blog/`. The art uses AUREON's existing palette, grid geometry, gradients, and topic-specific abstract motifs. SVG keeps the images sharp, small, and editable without adding an image dependency.

Every image has localized, descriptive alt text where the visual conveys topic meaning. Decorative background treatment is hidden from assistive technology. UI paths respect Vite's base URL so root and GitHub Pages builds resolve the same files.

## SEO and static output

Extend the existing SEO resolver and Vite `closeBundle` plugin instead of adding SSR or another generator.

For each of the ten index/detail language routes, generate static HTML with:

- localized title and description;
- self-referencing canonical;
- language alternates;
- `index,follow`;
- localized Open Graph and Twitter metadata;
- local article image and alt text;
- `website` type for the two indexes and `article` type for eight details;
- valid `Article` JSON-LD on detail routes;
- correct root or GitHub Pages asset base.

Article JSON-LD includes only visible, truthful properties: headline, description, image, publication and modification dates, in-language, canonical main entity, and AUREON author/publisher identity. Structured data must match visible content.

The sitemap contains both blog indexes and all eight localized article URLs, plus the existing site and case URLs. Unknown blog IDs remain `noindex,follow`. Static article documents are generated before `404.html`, preserving the existing Pages fallback behavior.

## Accessibility and responsive behavior

- Use one `h1` per page and a sequential heading structure.
- Render articles with `article`, `header`, `nav`, `aside`, and footer/source semantics.
- Give the table of contents a localized accessible label and real anchor links.
- Preserve visible keyboard focus for cards, language controls, TOC links, and CTAs.
- Keep text and interactive controls at WCAG AA contrast.
- Keep touch targets at least 44 CSS pixels where applicable.
- Disable nonessential reveal/hover motion under `prefers-reduced-motion`.
- At widths below 992px, stack article and sidebar; on mobile, keep all metadata, artwork, CTAs, and long localized titles inside the viewport.
- Missing media must not collapse the surrounding layout or hide text.

## Error handling

- Unknown article IDs show a localized not-found message, link back to the corresponding blog index, and use `noindex,follow`.
- A missing optional related case omits the proof block instead of failing the article.
- A missing or failed image preserves a branded frame and hides only the broken image.
- Invalid content data fails the integrity test and TypeScript build before deployment.

## Verification and acceptance criteria

Implementation is complete when:

- the four old article bodies are absent;
- all four new articles render complete PT-BR and EN versions;
- the approved index and detail layouts match the AUREON visual system on desktop and mobile;
- the language selector navigates between paired URLs without losing the current article;
- every index/detail route has correct canonical, alternates, localized metadata, local image, and robots directive;
- each detail route emits valid, visible-content-aligned `Article` JSON-LD;
- Hostinger and GitHub Pages builds contain static HTML for all ten localized blog routes;
- legacy Hostinger rules and Pages documents redirect the four removed URLs;
- the sitemap contains exactly the approved current blog routes and no legacy slugs;
- all artwork is local and works under both Vite base paths;
- keyboard, contrast, heading, touch-target, reduced-motion, and mobile-overflow checks pass;
- `git diff --check`, lint, TypeScript/Vite root build, GitHub Pages build, focused tests, and the full serial Playwright suite pass;
- desktop and mobile browser QA covers both indexes and at least one article from each topic family in both languages.

## Implementation constraints

- Continue on `codex/site-foundation-fixes` and its existing worktree.
- Do not push, merge, deploy, or create a PR without separate user authorization.
- Add no runtime or development dependency.
- Reuse the existing routing, language selector, SEO resolver, Vite static generation, case catalog, base-URL helper pattern, and Playwright setup.
- Keep changes limited to blog data, blog components/styles, localized routing, SEO/static output, sitemap/redirects, local blog artwork, and proportional tests.
