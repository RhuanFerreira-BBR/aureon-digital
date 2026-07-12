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
