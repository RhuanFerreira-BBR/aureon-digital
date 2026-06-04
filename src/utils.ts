import { SITE_URL, routeSlugs } from './data/site';
import type { Locale, RouteKey } from './types';

export function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

export function routePath(locale: Locale, key: RouteKey, suffix = '') {
  const base = locale === 'en' ? '/en' : '';
  const slug = routeSlugs[key];
  const path = [base, slug, suffix].filter(Boolean).join('/');
  return path ? `/${path}`.replace(/\/+/g, '/') : '/';
}

export function casePath(locale: Locale, slug: string) {
  return `${routePath(locale, 'work')}/${slug}`;
}

export function postPath(locale: Locale, slug: string) {
  return `${routePath(locale, 'insights')}/${slug}`;
}

export function alternateLocalePath(pathname: string) {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.replace(/^\/en/, '') || '/';
  return pathname === '/' ? '/en' : `/en${pathname}`;
}

export function canonicalUrl(pathname: string) {
  const clean = pathname.replace(/^\//, '');
  return new URL(clean, SITE_URL).toString();
}

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
    .format(new Date(date))
    .replace('.', '')
    .toUpperCase();
}
