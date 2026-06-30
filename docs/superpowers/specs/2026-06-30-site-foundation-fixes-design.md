# Site Foundation Fixes Design

## Goal

Fix direct-route failures, route-level SEO, misleading contact behavior, mixed interface language, accessibility basics, and mobile clipping before replacing the case studies.

## Scope

Keep the current visual identity, metrics, testimonials, and case content unchanged. Do not add a backend, form provider, prerenderer, SSR framework, i18n library, or runtime dependency.

## Architecture

The existing React/Vite SPA remains unchanged structurally. Hostinger receives an Apache rewrite rule that serves `index.html` for application routes while preserving real files and directories. A small route metadata helper updates the document title, description, canonical URL, Open Graph fields, language, and robots directive after client-side navigation.

Known static pages and blog posts receive specific metadata. `/cases` remains indexable, while fictional case-detail routes receive `noindex,follow` until real cases replace them. Unknown routes also receive `noindex,follow`.

## Components and Behavior

### Hosting

- Add `public/.htaccess` with a standard SPA fallback.
- Keep the existing GitHub Pages `404.html` fallback.
- Verify the Hostinger build copies `.htaccess` into `dist`.

### SEO

- Correct accents and complete baseline Open Graph fields in `index.html`.
- Resolve metadata from the current pathname and language without a new dependency.
- Supply unique metadata for the homepage, services, cases index, blog index/posts, about, FAQ, privacy, and terms.
- Add one canonical URL per route and keep it synchronized after navigation.
- Mark fictional case details and unknown routes as `noindex,follow`.
- Defer structured case data and case-specific SEO until real cases exist.

### Contact

- Keep the current `mailto:` flow.
- Rename the submit action to make clear that it opens the visitor's email client.
- Remove the false “message sent” state because delivery cannot be confirmed.
- Localize location and response-time labels and the generated email subject/body.
- Associate every label with its control using `id` and `htmlFor`.

### Responsive Layout

- Stack name and email fields on screens up to 520px and reduce form-card padding.
- Hide the hero scroll cue on small screens so it cannot overlap the metrics.
- Allow case index and case-detail metadata to wrap or stack instead of clipping.
- Preserve the existing tablet and desktop layouts.

### Language Cleanup

- Translate remaining interface chrome on the homepage and contact/process sections.
- Do not translate fictional case-study body content in this pass.

## Error Handling

Apache rewrites only requests that are not existing files or directories. React retains its current not-found view for unknown client routes, and the metadata layer marks those routes as non-indexable. The contact action makes no delivery claim; the visitor's email client owns the final send step.

## Testing

- Add Playwright checks for route-specific metadata, canonical URLs, robots directives, and accessible form labels.
- Add mobile checks at 390px proving contact fields stack, the scroll cue is hidden, and case metadata remains within the viewport.
- Add a build assertion that `dist/.htaccess` exists and contains the SPA fallback.
- Run lint, Hostinger build, GitHub Pages build, and the complete Playwright suite.

## Acceptance Criteria

- Direct Hostinger routes return the SPA instead of the provider 404 after deployment.
- Non-case pages expose correct route-level metadata after navigation.
- Fictional case details are not indexable.
- The contact form never claims an email was sent.
- The audited 390x844 clipping and overlap issues are absent.
- Existing metrics, testimonials, cases, styling, and navigation remain present.

