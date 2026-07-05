/// <reference lib="dom" />

import { blogIndexPath, blogPath, findBlogPost, posts, type BlogLang } from './blog';
import { cases, caseText } from './cases';

export type SiteLang = 'en' | 'pt';

interface MetaCopy {
  title: string;
  description: string;
}

export interface PageMeta extends MetaCopy {
  canonical: string;
  locale: 'pt_BR' | 'en_US';
  robots: 'index,follow' | 'noindex,follow';
  type: 'website' | 'article';
  image: string;
  imageAlt: string;
  alternates?: { pt: string; en: string; xDefault: string };
  schema?: Record<string, unknown>;
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
      description: 'Conheça projetos reais de Web Design, SEO e GEO da AUREON, com escopo e impacto indicativo apresentados com transparência.',
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
      description: 'Explore real AUREON Web Design, SEO, and GEO projects, with scope and indicative impact presented transparently.',
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

function normalizePathname(pathname: string) {
  return `/${pathname.replace(/^\/+/, '')}`.replace(/\/+$/, '') || '/';
}

function completeMeta(
  copy: MetaCopy,
  pathname: string,
  lang: SiteLang,
  robots: PageMeta['robots'],
  type: PageMeta['type'],
  media: Pick<PageMeta, 'image' | 'imageAlt'> = {
    image: `${siteUrl}/aureon-logo.png`,
    imageAlt: 'AUREON Digital Agency',
  },
): PageMeta {
  return {
    ...copy,
    canonical: `${siteUrl}${pathname}`,
    locale: lang === 'pt' ? 'pt_BR' : 'en_US',
    robots,
    type,
    ...media,
  };
}

function blogAlternates(post?: (typeof posts)[number]) {
  const pt = `${siteUrl}${post ? blogPath(post, 'pt') : blogIndexPath('pt')}`;
  const en = `${siteUrl}${post ? blogPath(post, 'en') : blogIndexPath('en')}`;
  return { pt, en, xDefault: pt };
}

export function resolvePageMeta(pathname: string, lang: SiteLang): PageMeta {
  const normalizedPathname = normalizePathname(pathname);
  const blogMatch = normalizedPathname.match(/^\/(en\/)?blog(?:\/([^/]+))?$/i);
  if (blogMatch) {
    const blogLang: BlogLang = blogMatch[1] ? 'en' : 'pt';
    const postSlug = blogMatch[2];

    if (!postSlug) {
      return {
        ...completeMeta(
          pages[blogLang]['/blog'],
          blogIndexPath(blogLang),
          blogLang,
          'index,follow',
          'website',
        ),
        alternates: blogAlternates(),
      };
    }

    const post = findBlogPost(postSlug, blogLang)
      ?? findBlogPost(postSlug, blogLang === 'pt' ? 'en' : 'pt');
    if (post) {
      const locale = post.locales[blogLang];
      const canonicalPath = blogPath(post, blogLang);
      const canonical = `${siteUrl}${canonicalPath}`;
      return {
        ...completeMeta(
          { title: locale.seoTitle, description: locale.seoDescription },
          canonicalPath,
          blogLang,
          'index,follow',
          'article',
          { image: `${siteUrl}${post.image}`, imageAlt: locale.imageAlt },
        ),
        alternates: blogAlternates(post),
        schema: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: locale.title,
          description: locale.seoDescription,
          image: `${siteUrl}${post.image}`,
          datePublished: post.published,
          dateModified: post.modified,
          inLanguage: blogLang === 'pt' ? 'pt-BR' : 'en',
          mainEntityOfPage: canonical,
          author: { '@type': 'Organization', name: post.author, url: siteUrl },
          publisher: { '@type': 'Organization', name: 'AUREON', url: siteUrl },
        },
      };
    }

    return completeMeta(
      {
        title: blogLang === 'pt' ? 'Artigo não encontrado | AUREON' : 'Article not found | AUREON',
        description: blogLang === 'pt'
          ? 'O artigo solicitado não foi encontrado.'
          : 'The requested article could not be found.',
      },
      `${blogIndexPath(blogLang)}/${postSlug}`,
      blogLang,
      'noindex,follow',
      'website',
    );
  }

  const caseSlug = normalizedPathname.match(/^\/cases\/([^/]+)$/i)?.[1];
  if (caseSlug) {
    const item = cases.find(({ id }) => id.toLowerCase() === caseSlug.toLowerCase());
    if (item) {
      return completeMeta(
        {
          title: lang === 'pt'
            ? `Case ${item.client}: ${item.platform} | AUREON`
            : `${item.client} Case: ${item.platform} | AUREON`,
          description: caseText(item.summary, lang),
        },
        `/cases/${item.id}`,
        lang,
        'index,follow',
        'article',
        {
          image: `${siteUrl}${item.heroImage.src}`,
          imageAlt: caseText(item.heroImage.alt, lang),
        },
      );
    }

    return completeMeta(
      {
        title: lang === 'pt' ? 'Case não encontrado | AUREON' : 'Case not found | AUREON',
        description: lang === 'pt'
          ? 'O case solicitado não foi encontrado.'
          : 'The requested case could not be found.',
      },
      `/cases/${caseSlug}`,
      lang,
      'noindex,follow',
      'website',
    );
  }

  const canonicalPathname = Object.keys(pages[lang]).find(
    (pagePathname) => pagePathname.toLowerCase() === normalizedPathname.toLowerCase(),
  );
  if (canonicalPathname) {
    return completeMeta(pages[lang][canonicalPathname], canonicalPathname, lang, 'index,follow', 'website');
  }

  return completeMeta(
    {
      title: lang === 'pt' ? 'Página não encontrada | AUREON' : 'Page not found | AUREON',
      description: lang === 'pt'
        ? 'A página solicitada não foi encontrada.'
        : 'The requested page could not be found.',
    },
    normalizedPathname,
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

function setAlternates(alternates?: PageMeta['alternates']) {
  document.head.querySelectorAll('link[data-aureon-hreflang]').forEach(element => element.remove());
  if (!alternates) return;

  for (const [hreflang, href] of [
    ['pt-BR', alternates.pt],
    ['en', alternates.en],
    ['x-default', alternates.xDefault],
  ]) {
    const element = document.createElement('link');
    element.rel = 'alternate';
    element.hreflang = hreflang;
    element.href = href;
    element.setAttribute('data-aureon-hreflang', '');
    document.head.append(element);
  }
}

function setSchema(schema?: PageMeta['schema']) {
  document.head.querySelectorAll('#article-jsonld').forEach(element => element.remove());
  if (!schema) return;

  const element = document.createElement('script');
  element.id = 'article-jsonld';
  element.type = 'application/ld+json';
  element.textContent = JSON.stringify(schema).replace(/</g, '\\u003c');
  document.head.append(element);
}

export function applyPageMeta(pathname: string, lang: SiteLang) {
  const meta = resolvePageMeta(pathname, lang);

  document.documentElement.lang = meta.locale === 'pt_BR' ? 'pt-BR' : 'en';
  document.title = meta.title;
  setMeta('name', 'description', meta.description);
  setMeta('name', 'robots', meta.robots);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:type', meta.type);
  setMeta('property', 'og:url', meta.canonical);
  setMeta('property', 'og:site_name', 'AUREON');
  setMeta('property', 'og:locale', meta.locale);
  setMeta('property', 'og:image', meta.image);
  setMeta('property', 'og:image:alt', meta.imageAlt);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', meta.description);
  setMeta('name', 'twitter:image', meta.image);
  setMeta('name', 'twitter:image:alt', meta.imageAlt);
  setCanonical(meta.canonical);
  setAlternates(meta.alternates);
  setSchema(meta.schema);
}
