# Real Portfolio Cases Design

## Goal

Replace the four fictional case studies with fourteen real website experiences that demonstrate AUREON's capabilities across enterprise content platforms, custom React tools, commerce, WordPress, and headless storefronts. Each case must support conversion, route-level SEO, Portuguese and English copy, responsive layouts, and transparent attribution.

## Scope

This phase changes the cases index, case details, case preview cards, case metadata, sitemap entries, and case media. It does not redesign the rest of the AUREON website, add a CMS, add a runtime dependency, introduce server rendering, create separately indexable English routes, or change the existing global metrics and testimonials.

The current `/cases/:id` route remains the only detail route shape. The existing language selector controls Portuguese and English case content and metadata on the same route. Portuguese remains the default language and canonical route; no `hreflang` is emitted because localized URLs do not exist.

## Portfolio Inventory

| Slug | Client / experience | Platform | Source URL | Relationship |
| --- | --- | --- | --- | --- |
| `dove-global-aem` | Dove US | Adobe Experience Manager | `https://www.dove.com/us/en/home.html` | Unilever global program |
| `seda-brasil-aem` | Seda Brasil | Adobe Experience Manager | `https://www.seda.com.br/` | Unilever global program |
| `degree-us-aem` | Degree US | Adobe Experience Manager | `https://www.degreedeodorant.com/us/en/home.html` | Unilever global program; related to Rexona |
| `rexona-brasil-aem` | Rexona Brasil | Adobe Experience Manager | `https://www.rexona.com/br/home.html` | Unilever global program; related to Degree |
| `tresemme-us-aem` | TRESemmé US | Adobe Experience Manager | `https://www.tresemme.com/us/en/home.html` | Unilever global program |
| `magnum-corporate-aem` | The Magnum Ice Cream Company | Adobe Experience Manager | `https://corporate.magnumicecream.com/en/home.html` | Unilever global program |
| `axe-us-aem` | AXE US | Adobe Experience Manager | `https://www.axe.com/us/en/home.html` | Unilever global program |
| `mini-finance-matcher-react` | MINI Finance Matcher | React | `https://financecalculator.mini.co.uk/tool/` | Custom finance decision tool |
| `avary-drone-shopify` | Avary Drone | Shopify | `https://avarydrone.com/` | Commerce experience |
| `resilient-construction-shopify` | Resilient Construction | Shopify | `https://useresilient.com/` | Commerce experience |
| `lowkey-stock-shopify` | Lowkey Stock | Shopify | `https://lowkeystock.com/` | Commerce experience |
| `celine-medspas-wordpress` | Celine Medspas | WordPress | `https://www.celinemedspas.com` | Lead-generation experience |
| `nuro-club-wordpress` | Nuro Club | WordPress | `https://nuroclub.com/` | Gated/member access experience |
| `arctic-fox-headless-commerce` | Arctic Fox Hair Color | Headless Shopify + Vue Storefront | `https://www.arcticfoxhaircolor.com/en-br` | Headless commerce experience |

Degree and Rexona have separate pages because their URLs, markets, content, and visible brand names differ. Both pages explain that they are regional expressions of the same global brand platform and link to one another.

## Attribution and Claims

The seven AEM projects use this attribution in both languages:

- PT: `Trabalho realizado em equipe via agência parceira para a Unilever.`
- EN: `Work delivered as part of an agency partner team for Unilever.`

The copy must not imply that Unilever contracted AUREON directly. The remaining cases describe the user's contribution and technology without inventing a contractual relationship that was not supplied.

Project narratives may fill gaps with plausible, brand-specific challenges, decisions, deliverables, and impact. Numeric outcomes are never presented as audited facts unless the user later supplies evidence. Every metric carries one of two evidence states:

- `scope`: a verifiable project attribute such as platform, global/local reach, commerce model, or ongoing support.
- `estimated`: a plausible, non-audited impact estimate.

If any displayed metric is estimated, the section label is:

- PT: `Impacto indicativo — estimativas não auditadas`
- EN: `Indicative impact — unaudited estimates`

This disclosure appears adjacent to the metrics, not hidden in a footer.

## Visual Direction

The existing AUREON design remains dominant:

- dark surfaces, subtle grid, restrained gold highlights, current display/body typography, existing button styles, and current reveal motion;
- the same spacing rhythm, navigation, footer, and conversion CTA used by the rest of the website;
- one controlled secondary accent per case, derived from the client brand and used only for glows, thin borders, tags, or image framing;
- real public-site screenshots as the main proof, with brand color never replacing the AUREON shell.

The implementation is a hybrid system: one data-driven index and one data-driven detail template, with optional modules selected by case data. It does not create fourteen independent React page components or reproduce each client's website design.

## Information Architecture

### Cases index

The index replaces fictional claims with portfolio facts and contains:

1. Existing AUREON hero treatment.
2. Factual summary metrics: `14 projects`, `5 platform families`, and `global + local delivery`.
3. Two compact filter groups:
   - platform: AEM, React, Shopify, WordPress, Headless Commerce;
   - discipline: Web Design, Frontend, SEO, GEO, Performance, Commerce, Support.
4. Fourteen cards using a real screenshot, client, platform, concise outcome-led title, and relevant disciplines.
5. A closing project CTA.

Filters combine with AND semantics. `All` clears its group. Empty results show a short localized message and a clear-filters action.

### Homepage case preview

The homepage continues to show three cards, selected through a `featured` field rather than array position. The initial featured set demonstrates range:

- Dove: global AEM and enterprise delivery;
- MINI Finance Matcher: custom React product/tool;
- Arctic Fox: headless commerce.

### Case detail

Every detail page follows this order:

1. Breadcrumb and platform/program label.
2. Conversion-focused localized title and summary.
3. External `Visit website` action and transparent attribution badge.
4. Metadata strip: platform, scope, reach/market, and support or commerce model.
5. Main screenshot.
6. Challenge.
7. Strategy and execution.
8. Three to five implementation highlights.
9. Supporting screenshot gallery.
10. Three impact metrics with evidence disclosure.
11. Service/discipline list.
12. Related-project context when relevant.
13. AUREON contact CTA.
14. Next case.

Optional modules are data-driven:

- `globalProgram`: shared Unilever/AEM context and related-brand links;
- `decisionTool`: user-flow steps and decision logic for MINI;
- `commerce`: merchandising, discovery, and conversion details;
- `multiLocation`: location and booking structure for Celine Medspas;
- `gatedExperience`: public-access/login context for Nuro Club;
- `headlessCommerce`: storefront/API separation for Arctic Fox.

## Content Model

Move case data from the mixed blog data file into a focused `src/lib/cases.ts`. Define the `PortfolioCase` type in the same file; no separate type module is needed.

Each entry contains:

- stable identifiers: `id`, `client`, `sourceUrl`, `platform`, `group`, `featured`;
- presentation: `accent`, `heroImage`, `gallery`, `relatedCaseIds`;
- classification: `disciplines`, `market`, `scope`, `supportModel`;
- localized content: `title`, `summary`, `challenge`, `strategy`, `execution`, `highlights`, `services`, CTA labels where required;
- metrics: localized label/value/supporting text plus `evidence`;
- optional module flags from the information architecture above.

Localized fields use `{ pt, en }` objects in the case data. Components select a language once through a small local helper instead of duplicating markup.

## Case-Specific Editorial Focus

- Dove: large product/content taxonomy, brand-purpose storytelling, multi-market AEM consistency, SEO, and ongoing support.
- Seda: Brazilian hair-care discovery, localized content, mobile-first browsing, campaign flexibility, and search visibility.
- Degree: US deodorant navigation and motion-led product storytelling on the shared global platform.
- Rexona: Brazilian localization of the shared Degree/Rexona platform, market naming, content adaptation, and regional SEO.
- TRESemmé: product discovery by hair type/end look, editorial tutorials, collection merchandising, and performance.
- The Magnum Ice Cream Company: corporate storytelling, global brand portfolio, news/investor information architecture, accessibility, and governance.
- AXE: fragrance/product discovery, quizzes, youth-oriented content, campaign modules, and commerce handoff.
- MINI Finance Matcher: React decision flow that simplifies finance-product choice while preserving legal clarity and responsive accessibility.
- Avary Drone: high-ticket commerce, product/industry discovery, quote capture, trust, support, and complex catalog navigation.
- Resilient Construction: B2B solution-led Shopify architecture, technical product discovery, catalog clarity, and lead generation.
- Lowkey Stock: collectible drop culture, fast inventory discovery, category navigation, scarcity, and mobile commerce.
- Celine Medspas: treatment discovery, bilingual content, multi-location booking, physician authority, before/after proof, and lead conversion.
- Nuro Club: WordPress gated access/member entry; only publicly visible functionality is claimed or shown.
- Arctic Fox: headless Shopify/Vue Storefront architecture, localized commerce, bold merchandising, content/product integration, and frontend performance.

## Media Assets

Store case media under `public/cases/<slug>/` and reference only local assets at runtime. Do not hotlink client images.

For each public site, capture:

- one desktop hero screenshot used by cards, case hero, and Open Graph;
- up to two supporting desktop or mobile screenshots when they demonstrate a distinct interaction or content structure.

Use optimized JPEG output from the already-installed Playwright tooling; do not add an image dependency solely for format conversion. Screenshots are presentational evidence and receive concise localized alt text. If a public page is unavailable or gated, use an AUREON brand-gradient frame with the verified public entry screen rather than fabricating a private interface.

## SEO

Real case detail routes change from `noindex,follow` to `index,follow`. Metadata is resolved from the case data:

- unique localized title and description;
- canonical `https://aureondigital.co/cases/<slug>`;
- Open Graph title, description, URL, type, and local hero image;
- document language synchronized with the selector.

Unknown case IDs remain `noindex,follow`. The sitemap gains all fourteen canonical case URLs. The cases index metadata is updated to describe real portfolio work and the index copy no longer claims audited results.

Structured data is deferred. The SPA has no server-rendered case markup, and adding client-only `CreativeWork` JSON-LD does not justify the added surface until prerendering or SSR exists.

## External Links and Error Handling

- External website links open in a new tab with `rel="noopener noreferrer"`.
- A missing local screenshot falls back to a case-specific CSS gradient without breaking layout.
- Invalid or unknown case IDs render the current not-found view and non-indexable metadata.
- Empty filter results remain recoverable through the clear-filters action.
- Related case IDs are validated by tests; invalid references are not silently rendered.
- Tests never fetch client websites, so external availability cannot break the portfolio build.

## Accessibility and Responsive Behavior

- Maintain semantic heading order, visible focus styles, descriptive link text, and meaningful screenshot alt text.
- Filter buttons expose pressed state.
- The gallery is a normal responsive grid, not a custom carousel.
- Desktop detail content may use two columns; tablet and mobile collapse to one column.
- Metadata and metrics use wrapping grids with no horizontal scroll at 390px.
- Motion respects the existing reveal system and does not introduce autoplay video or new continuous animation.

## Testing

Add the smallest checks that cover the shared system:

1. Data integrity test:
   - exactly fourteen unique slugs and source URLs;
   - all required localized fields exist;
   - all metrics declare `scope` or `estimated`;
   - related IDs resolve;
   - referenced local media exists.
2. Cases index test:
   - renders fourteen projects;
   - filters by platform and discipline;
   - clears empty results;
   - shows the three configured featured cases on the homepage.
3. Route/SEO loop:
   - every case route renders its client and localized title;
   - every real case is `index,follow` with the expected canonical and Open Graph image;
   - an unknown case remains `noindex,follow`.
4. Responsive samples at 390x844:
   - one AEM case, MINI, one Shopify case, one WordPress case, and Arctic Fox;
   - no horizontal overflow; metadata, gallery, metrics, external CTA, and attribution remain visible.
5. Run `git diff --check`, lint, Hostinger build, GitHub Pages build, and the complete Playwright suite.

## Acceptance Criteria

- The cases index and homepage previews contain only the fourteen supplied real projects.
- All fourteen detail routes render complete Portuguese and English content through the existing language selector.
- AUREON remains the dominant visual identity; client branding is supporting evidence.
- AEM projects disclose agency-partner delivery for Unilever.
- Degree and Rexona have separate, cross-linked pages.
- Estimated impact is explicitly disclosed adjacent to metrics.
- Public screenshots are local, optimized, accessible, and resilient to source-site availability.
- All real case routes are indexable with unique metadata and sitemap entries; unknown routes remain non-indexable.
- The 390px layouts contain no horizontal clipping.
- No new runtime or image-processing dependency is added.
- No push or deployment occurs without explicit user authorization.
