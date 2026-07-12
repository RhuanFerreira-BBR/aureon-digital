# Conversion Proof and Cases Route Design

**Date:** 2026-07-12

## Goal

Fix the published `/cases` 403 and consolidate the homepage's selected work, unsupported statistics, and testimonials into one exceptional case-led proof section while preserving the approved hero proposition.

## Approved scope

- Preserve the hero proposition, headline, typewriter behavior, supporting copy, and CTAs; remove only its unsupported metrics row.
- Make direct requests to `/cases` and `/cases/` return the generated cases index instead of HTTP 403.
- Keep the honest localized `mailto:` contact flow.
- Use `contato@aureondigital.co` for Portuguese and `contact@aureondigital.co` for English.
- Replace the homepage `CasePreview`, `Stats`, and `Testimonials` sections plus the hero metrics row with one cinematic case-proof section.
- Remove the About aggregate-numbers block because it repeats unsupported claims; preserve the About narrative and CTA unchanged.
- Do not add a backend, scheduling service, carousel, dependency, analytics, or unrelated refactor.
- Keep implementation local until the user separately authorizes push or deployment.

## Published-route fix

The physical `public/cases/` media directory causes Apache to satisfy `RewriteCond %{REQUEST_FILENAME} !-d`, so the SPA fallback does not serve `/cases`. The production build already creates `dist/cases/<case-id>/index.html`; it will also create `dist/cases/index.html` from the common HTML shell using `resolvePageMeta('/cases', 'pt')`.

This is the smallest fix because it preserves the media directory, the safe `!-d` rule, existing case-detail prerendering, and current URLs. The generated index document must contain the cases-page title, canonical URL, description, and application assets.

## Homepage proof direction

### Structure

`CasePreview`, `Stats`, and `Testimonials` will be removed from the homepage and replaced by a single `CaseProof` component between `Process` and `Contact`. This prevents Dove, MINI, and Arctic Fox from appearing in two consecutive sections and shortens the journey to contact.

The section uses approved direction A, **Case cinematográfico**:

1. A full-width Dove Global feature uses the existing local hero image, a restrained dark overlay, editorial typography, and a direct link to `/cases/dove-global-aem`.
2. Three portfolio facts replace unsupported performance claims: `14 experiências`, `5 plataformas`, and `atuação global`, with localized English equivalents.
3. MINI Finance Matcher and Arctic Fox Hair Color appear as secondary case links with their real local images, platform, market, and one concise case-specific statement.
4. A final link leads to `/cases`.

### Trust and attribution

- Remove the fictional testimonials and the unsupported `3×`, `98%`, and `14× ROI` aggregate claims.
- Use only facts present in the typed case catalog or directly derived from it.
- Show the existing transparent agency/employer attribution for Dove in compact visible copy, without implying a direct AUREON client relationship.
- Keep estimated case-detail metrics out of the homepage proof section.

### Visual behavior

- Preserve AUREON's black, grid, and gold visual system.
- Give the Dove image and statement the dominant visual weight; supporting cases remain visibly secondary.
- Use native CSS grid and links, not a carousel or interaction library.
- Keep motion limited to the existing reveal language and subtle image treatment; respect reduced-motion preferences.
- At mobile widths, stack the feature, facts, supporting cases, and CTA without horizontal overflow or clipped copy.
- Use semantic headings, catalog-derived image alternatives, visible focus styles, and at least 44px interactive targets.

## Contact behavior

The current implementation already maps Portuguese to `contato@aureondigital.co` and English to `contact@aureondigital.co`. No production behavior change is required. Regression coverage will explicitly protect both localized destinations and the prefilled subject/body serialization used by the form.

## Components and files

- Modify `vite.config.ts` to emit `dist/cases/index.html`.
- Modify `src/App.tsx` to render `CaseProof` instead of `CasePreview`, `Stats`, and `Testimonials`.
- Modify `src/components/Hero.tsx` to remove only the metrics row and its localized metric strings.
- Create `src/components/CaseProof.tsx` for the bilingual case-led proof composition.
- Modify `src/styles/main.scss` for responsive cinematic styling and reduced-motion behavior.
- Delete `src/components/CasePreview.tsx`, `src/components/Stats.tsx`, and `src/components/Testimonials.tsx` after replacement.
- Modify `tests/smoke.spec.ts` for static-route, contact, semantic, link, content-removal, and responsive regressions.

No new data file is needed; `CaseProof` consumes the existing catalog and helpers from `src/lib/cases.ts`.

## Testing and acceptance

Implementation follows test-first development.

1. A failing build-artifact test proves `dist/cases/index.html` is initially missing, then verifies its cases metadata and assets after the fix.
2. Existing contact coverage is extended to explicitly protect the Portuguese and English destinations; this is regression coverage for unchanged behavior, not a new TDD production cycle.
3. A failing homepage test requires the new case-proof landmark, links to Dove/MINI/Arctic Fox, the three factual scope signals, and absence of the old selected-work preview, testimonials, hero metrics, and unsupported aggregate claims.
4. A failing mobile test verifies no horizontal overflow and visible case-proof links at 390px.
5. Final verification runs focused Playwright tests, lint, root build, GitHub Pages build, `git diff --check`, and the full relevant browser suite.
6. After deployment is separately authorized, an HTTP check must confirm both `/cases` and `/cases/` return 200; local tests alone cannot prove the server result.

## Out of scope

- Changes to the hero proposition, headline, typewriter behavior, supporting copy, or CTAs.
- Rewriting the contact offer or adding scheduling.
- Form backend or database storage.
- Analytics and conversion tracking.
- New testimonials, invented results, or client logos beyond existing case media.
- Push, pull request, or deployment.
