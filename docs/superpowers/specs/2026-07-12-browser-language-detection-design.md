# Browser Language Detection Design

**Date:** 2026-07-12

## Goal

Start the AUREON experience in Portuguese or English from the visitor's browser preferences while allowing a manual choice to persist across future visits.

## Approved behavior

- Use browser language preferences, not IP geolocation.
- A valid saved manual choice always wins.
- Browser languages beginning with `pt` select Portuguese.
- All other browser languages select English.
- If browser language information is unavailable, default to English.
- Save only explicit manual PT/EN changes.
- Keep `/blog` in Portuguese and `/en/blog` in English regardless of the general preference.
- Visiting a localized blog URL must not overwrite the saved preference.
- Add no cookie, API request, package, IP lookup, or consent surface.

## Architecture

Create `src/lib/language.ts` as the single owner of language preference rules. It exposes pure detection plus safe browser-storage helpers around the key `aureon-language`.

```ts
export const languageStorageKey = 'aureon-language';
export function resolvePreferredLanguage(saved: string | null, languages: readonly string[]): SiteLang;
export function readPreferredLanguage(): SiteLang;
export function savePreferredLanguage(lang: SiteLang): void;
```

`resolvePreferredLanguage` validates `saved` as exactly `pt` or `en`. Without a valid saved value, it returns `pt` when any browser preference starts with `pt` case-insensitively; otherwise it returns `en`.

`readPreferredLanguage` obtains `localStorage` safely and uses `navigator.languages`, falling back to `[navigator.language]`. Storage access failures are ignored. `savePreferredLanguage` also catches storage failures so a manual change still updates the current session.

## Application flow

`App` initializes language lazily with `useState(readPreferredLanguage)`, avoiding a Portuguese-first flash before detection.

Two state paths remain distinct:

1. `setLang` synchronizes internal state with explicit blog routes and does not persist.
2. `changePreferredLanguage` updates state and calls `savePreferredLanguage`; it is passed to `Nav` for manual selector clicks.

`Nav.changeLanguage` always calls the manual preference callback. When a paired blog route exists, it then navigates to that localized route. The existing `blogLang` path override remains the source of truth while the visitor is on `/blog` or `/en/blog`.

## Error handling

- Invalid stored values are ignored.
- Missing `navigator.languages` falls back to `navigator.language`.
- Missing browser language data resolves to English.
- `localStorage` read/write exceptions never prevent rendering or manual session changes.

## Testing

Implementation follows test-first development.

- Pure tests: valid saved PT/EN, invalid saved value, PT variants/case, non-PT languages, empty-language fallback.
- Browser tests: Portuguese browser starts PT, English browser starts EN, saved choice overrides browser, manual choice survives reload.
- Blog regression: `/blog` renders PT and `/en/blog` renders EN without changing a previously saved general preference.
- Existing language-selector, metadata, case, contact, and responsive tests remain green.

## Files

- Create `src/lib/language.ts`.
- Modify `src/App.tsx` for lazy initialization and the persisted manual callback.
- Modify `src/components/Nav.tsx` to consume the manual-language callback.
- Modify `tests/smoke.spec.ts` for detection/persistence coverage.
- Modify `tests/blog.spec.ts` only if needed to protect non-persistent route synchronization.

## Out of scope

- IP geolocation.
- Full-site `/en/...` route duplication.
- Server-side redirects or edge middleware.
- Changes to translated content, SEO copy, or the visual language selector.
- Push, merge, PR, or deployment.
