import { posts } from './data';

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

function normalizePathname(pathname: string) {
  return `/${pathname.replace(/^\/+/, '')}`.replace(/\/+$/, '') || '/';
}

function completeMeta(
  copy: MetaCopy,
  pathname: string,
  lang: SiteLang,
  robots: PageMeta['robots'],
  type: PageMeta['type'],
): PageMeta {
  return {
    ...copy,
    canonical: `${siteUrl}${pathname}`,
    locale: lang === 'pt' ? 'pt_BR' : 'en_US',
    robots,
    type,
  };
}

export function resolvePageMeta(pathname: string, lang: SiteLang): PageMeta {
  const normalizedPathname = normalizePathname(pathname);
  const postSlug = normalizedPathname.match(/^\/blog\/([^/]+)$/i)?.[1];
  if (postSlug) {
    const post = posts.find((item) => item.id === postSlug);
    if (post) {
      return completeMeta(
        { title: `${post.title} | AUREON`, description: post.excerpt },
        `/blog/${postSlug}`,
        lang,
        'index,follow',
        'article',
      );
    }
  }

  const caseSlug = normalizedPathname.match(/^\/cases\/([^/]+)$/i)?.[1];
  if (caseSlug) {
    return completeMeta(
      {
        title: lang === 'pt' ? 'Case em preparação | AUREON' : 'Case in progress | AUREON',
        description: lang === 'pt'
          ? 'Este case será substituído por um projeto real da AUREON.'
          : 'This case will be replaced with a real AUREON project.',
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
