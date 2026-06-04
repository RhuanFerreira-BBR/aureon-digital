import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME } from '../data/site';
import type { Locale } from '../types';
import { canonicalUrl } from '../utils';

type SeoProps = {
  locale: Locale;
  title: string;
  description: string;
  image?: string;
  jsonLd?: Record<string, unknown>;
};

export function Seo({ locale, title, description, image, jsonLd }: SeoProps) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} - ${SITE_NAME}`;
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
    document.title = fullTitle;
    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', canonicalUrl(location.pathname), 'property');
    setMeta('og:image', image ? canonicalUrl(image) : canonicalUrl('images/horizon-hero.png'), 'property');
    setMeta('twitter:card', 'summary_large_image');
    setLink('canonical', canonicalUrl(location.pathname));

    let script = document.getElementById('json-ld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'json-ld';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify(
      jsonLd ?? {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: canonicalUrl('/'),
      },
    );
  }, [description, image, jsonLd, locale, location.pathname, title]);

  return null;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, name);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function setLink(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
}
