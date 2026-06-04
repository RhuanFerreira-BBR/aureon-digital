import type { BlogPost, CaseStudy, Locale, RouteKey } from '../types';

export const CONTACT_EMAIL = 'rhuankb@gmail.com';
export const SITE_NAME = 'Horizon Collective';
export const SITE_URL = 'https://rhuanferreira-bbr.github.io/horizon-collective/';

export const routeSlugs: Record<RouteKey, string> = {
  home: '',
  services: 'services',
  work: 'work',
  about: 'about',
  insights: 'insights',
  contact: 'contact',
};

export const navLabels: Record<Locale, Record<RouteKey, string>> = {
  pt: {
    home: 'Início',
    services: 'Serviços',
    work: 'Cases',
    about: 'Sobre',
    insights: 'Insights',
    contact: 'Contato',
  },
  en: {
    home: 'Home',
    services: 'Services',
    work: 'Work',
    about: 'About',
    insights: 'Insights',
    contact: 'Contact',
  },
};

export const ui = {
  pt: {
    startProject: 'Começar projeto',
    startProjectLong: 'Iniciar um projeto',
    viewCases: 'Ver nossos cases',
    allServices: 'Todos os serviços',
    viewPortfolio: 'Ver portfólio',
    allInsights: 'Todos os insights',
    requestDiagnostic: 'Solicitar diagnóstico',
    footerCta: 'Marcas pequenas, presença gigante.',
    footerMade: 'Feito para quem cresce.',
    studioLocation: 'Estúdio digital. São Paulo · Remoto.',
    servicesTitle: 'Serviços',
    studioTitle: 'Estúdio',
    contactTitle: 'Contato',
    languageLabel: 'EN',
    backToCases: '← Voltar aos cases',
    nextCase: 'PRÓXIMO CASE',
    readCase: 'Ver case',
    featured: 'Em destaque',
    newsletterSuccess: 'Pronto! Você está na lista.',
    formSuccess: 'Sua mensagem foi preparada no e-mail. Enviaremos resposta em até 48h.',
  },
  en: {
    startProject: 'Start project',
    startProjectLong: 'Start a project',
    viewCases: 'View our work',
    allServices: 'All services',
    viewPortfolio: 'View portfolio',
    allInsights: 'All insights',
    requestDiagnostic: 'Request diagnosis',
    footerCta: 'Small brands, giant presence.',
    footerMade: 'Built for people who grow.',
    studioLocation: 'Digital studio. São Paulo · Remote.',
    servicesTitle: 'Services',
    studioTitle: 'Studio',
    contactTitle: 'Contact',
    languageLabel: 'PT',
    backToCases: '← Back to work',
    nextCase: 'NEXT CASE',
    readCase: 'View case',
    featured: 'Featured',
    newsletterSuccess: 'Done. You are on the list.',
    formSuccess: 'Your message was prepared in your email app. We will reply within 48h.',
  },
} as const;

export const services = [
  {
    number: '01',
    key: 'WEB DESIGN',
    title: { pt: 'Design que constrói confiança', en: 'Design that builds trust' },
    homeTitle: { pt: 'Web Design', en: 'Web Design' },
    summary: {
      pt: 'Identidade visual e interfaces que fazem um negócio pequeno transmitir credibilidade de marca grande, sem perder a personalidade.',
      en: 'Visual identity and interfaces that help a small business feel credible and established without losing personality.',
    },
    bullets: {
      pt: ['Identidade visual e direção de arte', 'UI/UX de sites e landing pages', 'Design system e biblioteca de componentes', 'Protótipos navegáveis antes de codar'],
      en: ['Visual identity and art direction', 'UI/UX for websites and landing pages', 'Design systems and component libraries', 'Clickable prototypes before code'],
    },
  },
  {
    number: '02',
    key: 'DESENVOLVIMENTO',
    title: { pt: 'Sites rápidos e sólidos', en: 'Fast, solid websites' },
    homeTitle: { pt: 'Desenvolvimento Web', en: 'Web Development' },
    summary: {
      pt: 'Código limpo, performático e fácil de gerenciar. Performance que o Google premia e que o seu cliente sente na ponta dos dedos.',
      en: 'Clean, fast and maintainable code. Performance that search engines reward and customers feel immediately.',
    },
    bullets: {
      pt: ['Sites institucionais e landing pages', 'E-commerce e catálogos', 'CMS sob medida, você no controle', 'Otimização de Core Web Vitals'],
      en: ['Institutional websites and landing pages', 'Ecommerce and catalogs', 'Custom CMS workflows you control', 'Core Web Vitals optimization'],
    },
  },
  {
    number: '03',
    key: 'SEO',
    title: { pt: 'No topo de quem procura', en: 'On top when people search' },
    homeTitle: { pt: 'SEO', en: 'SEO' },
    summary: {
      pt: 'Da estrutura técnica ao conteúdo estratégico: arquitetura para subir nas buscas e autoridade para permanecer lá.',
      en: 'From technical structure to strategic content: architecture to climb search results and authority to stay there.',
    },
    bullets: {
      pt: ['SEO técnico e auditoria completa', 'SEO local e Google Business Profile', 'Pesquisa de palavras-chave e intenção', 'Link building e autoridade de domínio'],
      en: ['Technical SEO and complete audits', 'Local SEO and Google Business Profile', 'Keyword and intent research', 'Link building and domain authority'],
    },
  },
  {
    number: '04',
    key: 'TRÁFEGO ORGÂNICO & GEO',
    title: { pt: 'Visibilidade que não depende de anúncio', en: 'Visibility that does not depend on ads' },
    homeTitle: { pt: 'Tráfego Orgânico', en: 'Organic Growth' },
    summary: {
      pt: 'Conteúdo, autoridade e otimização para mecanismos generativos. Apareça nas buscas tradicionais e nas respostas de IA.',
      en: 'Content, authority and generative search optimization. Show up in traditional search and AI-powered answers.',
    },
    bullets: {
      pt: ['Estratégia de conteúdo e blog', 'GEO, otimização para IA generativa', 'Analytics, CRO e testes A/B', 'Relatórios claros e mensais'],
      en: ['Content and blog strategy', 'GEO for generative AI search', 'Analytics, CRO and A/B tests', 'Clear monthly reports'],
    },
  },
];

export const extraServices = [
  {
    number: '05',
    title: { pt: 'GEO · IA Search', en: 'GEO · AI Search' },
    summary: {
      pt: 'Otimização para mecanismos generativos. Faça sua marca ser citada pelo ChatGPT, Gemini e afins.',
      en: 'Optimization for generative engines. Help your brand become the answer inside AI search experiences.',
    },
  },
  {
    number: '06',
    title: { pt: 'Analytics & CRO', en: 'Analytics & CRO' },
    summary: {
      pt: 'Medição honesta e testes contínuos para transformar tráfego em receita, mês após mês.',
      en: 'Honest measurement and continuous tests that turn qualified traffic into revenue.',
    },
  },
];

export const cases: CaseStudy[] = [
  {
    slug: 'norte-clinica',
    title: {
      pt: 'Norte Clínica: +312% de agendamentos via busca.',
      en: 'Norte Clinic: +312% appointments from search.',
    },
    shortTitle: { pt: 'Norte Clínica', en: 'Norte Clinic' },
    client: 'Norte Clínica',
    sector: { pt: 'Saúde · Clínica', en: 'Healthcare · Clinic' },
    year: '2025',
    duration: { pt: '6 meses', en: '6 months' },
    categories: ['SEO', 'Web Design', 'Tráfego Orgânico'],
    result: { pt: '+312% de agendamentos via busca', en: '+312% appointments from search' },
    summary: {
      pt: 'Reposicionamento completo e SEO local que dobrou a captação em 6 meses.',
      en: 'Complete repositioning and local SEO that changed how the clinic attracts patients.',
    },
    challenge: {
      pt: [
        'A Norte Clínica tinha reputação impecável no boca a boca, mas quase não aparecia para pacientes buscando especialistas na região.',
        'O site antigo era lento, pouco claro e dependia de indicação para gerar demanda.',
      ],
      en: [
        'Norte Clinic had a strong offline reputation but was nearly invisible when patients searched for specialists nearby.',
        'The old website was slow, unclear and too dependent on referrals to create demand.',
      ],
    },
    solution: {
      pt: [
        'Reconstruímos marca e site com foco em velocidade, conversão e intenção de busca local.',
        'Também estruturamos o Google Business Profile, conteúdo de autoridade e SEO técnico completo.',
      ],
      en: [
        'We rebuilt the brand and site around speed, conversion and local search intent.',
        'We also structured Google Business Profile, authority content and full technical SEO.',
      ],
    },
    bullets: {
      pt: ['Novo site 4x mais rápido', '28 páginas otimizadas para busca local', 'Agendamento online integrado'],
      en: ['New site 4x faster', '28 pages optimized for local search', 'Integrated online appointments'],
    },
    stats: [
      { value: '312%', label: { pt: 'Mais agendamentos via busca orgânica', en: 'More appointments from organic search' } },
      { value: '1º', label: { pt: 'Posição no Google para 14 termos-chave', en: 'Google position for 14 target terms' } },
      { value: '4x', label: { pt: 'Site mais rápido que o anterior', en: 'Faster than the previous site' } },
    ],
    image: 'images/cases/norte-clinica.png',
  },
  {
    slug: 'pao-brasa',
    title: {
      pt: 'Pão & Brasa: loja que fatura 24/7.',
      en: 'Pão & Brasa: a store that sells 24/7.',
    },
    shortTitle: { pt: 'Pão & Brasa', en: 'Pão & Brasa' },
    client: 'Pão & Brasa',
    sector: { pt: 'Alimentação · E-commerce', en: 'Food · Ecommerce' },
    year: '2025',
    duration: { pt: '10 semanas', en: '10 weeks' },
    categories: ['E-commerce', 'Dev'],
    result: { pt: 'Loja que fatura 24/7', en: 'A store that sells 24/7' },
    summary: {
      pt: 'Catálogo, checkout e operação online para transformar uma padaria local em canal digital recorrente.',
      en: 'Catalog, checkout and online operations that turned a local bakery into a recurring digital channel.',
    },
    challenge: {
      pt: ['A demanda existia, mas pedidos se perdiam em mensagens e planilhas.', 'A marca precisava vender online sem perder o calor artesanal.'],
      en: ['Demand existed, but orders were lost across messages and spreadsheets.', 'The brand needed to sell online without losing its artisanal warmth.'],
    },
    solution: {
      pt: ['Criamos storefront responsivo, fluxo de compra simples e páginas por categoria.', 'A experiência foi desenhada para compra rápida, retirada e recorrência.'],
      en: ['We created a responsive storefront, simple purchase flow and category pages.', 'The experience was designed for quick orders, pickup and repeat buying.'],
    },
    bullets: {
      pt: ['Catálogo responsivo', 'Checkout simplificado', 'Páginas otimizadas por categoria'],
      en: ['Responsive catalog', 'Simplified checkout', 'Category pages optimized for search'],
    },
    stats: [
      { value: '24/7', label: { pt: 'Canal de vendas ativo', en: 'Always-on sales channel' } },
      { value: '+40%', label: { pt: 'Aumento no ticket médio', en: 'Higher average order value' } },
      { value: '3s', label: { pt: 'Carregamento inicial', en: 'Initial load target' } },
    ],
    image: 'images/cases/pao-brasa.png',
  },
  {
    slug: 'studio-lume',
    title: {
      pt: 'Studio Lume: citada por IAs em 90 dias.',
      en: 'Studio Lume: cited by AI answers in 90 days.',
    },
    shortTitle: { pt: 'Studio Lume', en: 'Studio Lume' },
    client: 'Studio Lume',
    sector: { pt: 'Criativo · Branding', en: 'Creative · Branding' },
    year: '2026',
    duration: { pt: '90 dias', en: '90 days' },
    categories: ['Branding', 'GEO'],
    result: { pt: 'Citada por IAs em 90 dias', en: 'Cited by AI answers in 90 days' },
    summary: {
      pt: 'Arquitetura de conteúdo e prova de autoridade para mecanismos generativos.',
      en: 'Content architecture and authority proof for generative search engines.',
    },
    challenge: {
      pt: ['O estúdio tinha um portfólio forte, mas conteúdo disperso e baixa clareza de especialização.', 'As respostas de IA não reconheciam a marca como referência.'],
      en: ['The studio had a strong portfolio but fragmented content and unclear positioning.', 'AI answers did not recognize the brand as a credible reference.'],
    },
    solution: {
      pt: ['Reposicionamos a narrativa, estruturamos páginas de autoridade e conectamos cases, serviços e guias.', 'O conteúdo passou a ser legível para pessoas, buscadores e mecanismos generativos.'],
      en: ['We repositioned the narrative, structured authority pages and connected cases, services and guides.', 'The content became legible for people, search engines and generative systems.'],
    },
    bullets: {
      pt: ['Páginas de autoridade por serviço', 'Schema e entidades estruturadas', 'Calendário editorial GEO'],
      en: ['Authority pages by service', 'Schema and structured entities', 'GEO editorial calendar'],
    },
    stats: [
      { value: '90d', label: { pt: 'Para primeiras citações em IA', en: 'To first AI answer citations' } },
      { value: '3.4x', label: { pt: 'Mais visitas orgânicas', en: 'More organic visits' } },
      { value: '+18', label: { pt: 'Consultas qualificadas', en: 'Qualified inquiries' } },
    ],
    image: 'images/cases/studio-lume.png',
  },
];

export const secondaryCases: CaseStudy[] = [
  {
    ...cases[0],
    slug: 'vito-advocacia',
    shortTitle: { pt: 'Vito Advocacia', en: 'Vito Law' },
    title: { pt: 'Vito Advocacia: 1º lugar em 8 termos da área.', en: 'Vito Law: first place for 8 legal search terms.' },
    client: 'Vito Advocacia',
    sector: { pt: 'Jurídico · SEO Local', en: 'Legal · Local SEO' },
    result: { pt: '1º lugar em 8 termos da área', en: 'First place for 8 search terms' },
    image: 'images/cases/norte-clinica.png',
  },
  {
    ...cases[1],
    slug: 'verde-cafe',
    shortTitle: { pt: 'Verde Café', en: 'Verde Café' },
    title: { pt: 'Verde Café: nova marca, +40% no ticket médio.', en: 'Verde Café: new brand, +40% average ticket.' },
    client: 'Verde Café',
    sector: { pt: 'Cafeteria · Web Design', en: 'Coffee · Web Design' },
    result: { pt: 'Nova marca, +40% no ticket médio', en: 'New brand, +40% average ticket' },
    image: 'images/cases/pao-brasa.png',
  },
  {
    ...cases[2],
    slug: 'atelier-mara',
    shortTitle: { pt: 'Atelier Mara', en: 'Atelier Mara' },
    title: { pt: 'Atelier Mara: 3,4x mais visitas orgânicas.', en: 'Atelier Mara: 3.4x more organic visits.' },
    client: 'Atelier Mara',
    sector: { pt: 'Moda · SEO e GEO', en: 'Fashion · SEO and GEO' },
    result: { pt: '3,4x mais visitas orgânicas', en: '3.4x more organic visits' },
    image: 'images/cases/studio-lume.png',
  },
];

export const allCases = [...cases, ...secondaryCases];

export const posts: BlogPost[] = [
  {
    id: 1,
    slug: 'o-que-e-geo',
    category: 'GEO',
    featured: true,
    title: {
      pt: 'O que é GEO e por que sua marca precisa aparecer nas respostas de IA',
      en: 'What GEO is and why your brand needs to show up in AI answers',
    },
    excerpt: {
      pt: 'Os mecanismos generativos estão mudando como as pessoas buscam. Veja como se preparar para ser a resposta.',
      en: 'Generative engines are changing how people search. Here is how to prepare to become the answer.',
    },
    body: {
      pt: [
        'GEO, ou Generative Engine Optimization, organiza sua presença digital para ser compreendida e citada por sistemas de resposta baseados em IA.',
        'A base continua sendo clareza: páginas de serviço bem estruturadas, autoridade verificável, entidades consistentes e conteúdo útil.',
        'O objetivo não é escrever para robôs. É deixar evidente para pessoas e máquinas quem você ajuda, como ajuda e por que sua marca é confiável.',
      ],
      en: [
        'GEO, or Generative Engine Optimization, organizes your digital presence so AI answer engines can understand and cite your brand.',
        'The foundation is still clarity: structured service pages, verifiable authority, consistent entities and useful content.',
        'The goal is not to write for machines. It is to make it obvious to people and systems who you help, how you help and why your brand is credible.',
      ],
    },
    date: '2026-05-28',
    readingTime: { pt: '6 min de leitura', en: '6 min read' },
  },
  {
    id: 2,
    slug: 'seo-local-negocios-de-bairro',
    category: 'SEO Local',
    title: {
      pt: 'Guia prático de SEO local para negócios de bairro',
      en: 'A practical local SEO guide for neighborhood businesses',
    },
    excerpt: {
      pt: 'Como aparecer no mapa e nas buscas “perto de mim”.',
      en: 'How to show up on maps and near-me searches.',
    },
    body: {
      pt: ['SEO local começa com consistência: nome, endereço, telefone, categorias e páginas de serviço alinhadas.', 'Depois vêm avaliações, conteúdo por região e páginas que respondem a dúvidas reais de quem compra perto.'],
      en: ['Local SEO starts with consistency: name, address, phone, categories and aligned service pages.', 'Then come reviews, regional content and pages that answer real questions from nearby buyers.'],
    },
    date: '2026-05-14',
    readingTime: { pt: '9 min', en: '9 min' },
  },
  {
    id: 3,
    slug: 'core-web-vitals-vendas',
    category: 'Performance',
    title: {
      pt: 'Core Web Vitals: por que velocidade virou estratégia de vendas',
      en: 'Core Web Vitals: why speed became a sales strategy',
    },
    excerpt: {
      pt: 'Cada segundo de carregamento custa conversões. Veja os números.',
      en: 'Every loading second costs conversions. See what to measure.',
    },
    body: {
      pt: ['Performance não é detalhe técnico isolado. Ela afeta confiança, ranking e conversão.', 'Comece por imagens, JavaScript crítico, cache e estabilidade visual.'],
      en: ['Performance is not an isolated technical detail. It affects trust, rankings and conversion.', 'Start with images, critical JavaScript, caching and visual stability.'],
    },
    date: '2026-05-02',
    readingTime: { pt: '5 min', en: '5 min' },
  },
  {
    id: 4,
    slug: 'landing-page-que-converte',
    category: 'Web Design',
    title: {
      pt: 'Anatomia de uma landing page que converte',
      en: 'The anatomy of a landing page that converts',
    },
    excerpt: {
      pt: 'Os elementos essenciais e os erros que afastam o cliente.',
      en: 'The essential elements and the mistakes that push customers away.',
    },
    body: {
      pt: ['Uma landing page boa reduz incerteza. Ela deixa promessa, prova, oferta e ação muito fáceis de entender.', 'Design é ritmo: hierarquia, contraste, prova social e chamada clara no momento certo.'],
      en: ['A good landing page reduces uncertainty. It makes promise, proof, offer and action easy to understand.', 'Design is rhythm: hierarchy, contrast, social proof and a clear call to action at the right moment.'],
    },
    date: '2026-04-21',
    readingTime: { pt: '7 min', en: '7 min' },
  },
  {
    id: 5,
    slug: 'investimento-presenca-digital',
    category: 'Negócios',
    title: {
      pt: 'Quanto um pequeno negócio deve investir em presença digital?',
      en: 'How much should a small business invest in digital presence?',
    },
    excerpt: {
      pt: 'Um guia honesto sobre orçamento e retorno.',
      en: 'An honest guide to budget and return.',
    },
    body: {
      pt: ['O investimento certo depende de maturidade, margem, ciclo de venda e concorrência.', 'Comece pelo que destrava receita: site confiável, busca local, prova social e mensuração.'],
      en: ['The right investment depends on maturity, margin, sales cycle and competition.', 'Start with what unlocks revenue: a credible website, local search, social proof and measurement.'],
    },
    date: '2026-04-08',
    readingTime: { pt: '6 min', en: '6 min' },
  },
  {
    id: 6,
    slug: 'conteudo-que-rankeia',
    category: 'SEO',
    title: {
      pt: 'Conteúdo que rankeia: como escrever para humanos e algoritmos',
      en: 'Content that ranks: writing for humans and algorithms',
    },
    excerpt: {
      pt: 'Equilíbrio entre intenção de busca e leitura de verdade.',
      en: 'Balancing search intent with real readability.',
    },
    body: {
      pt: ['Conteúdo bom resolve uma intenção de busca com precisão e ainda soa humano.', 'Use estrutura clara, exemplos concretos e respostas completas sem enchimento.'],
      en: ['Good content solves a search intent precisely while still sounding human.', 'Use clear structure, concrete examples and complete answers without filler.'],
    },
    date: '2026-03-25',
    readingTime: { pt: '8 min', en: '8 min' },
  },
];

export const team = [
  { name: 'Rafael Horizonte', role: { pt: 'FUNDADOR · ESTRATÉGIA', en: 'FOUNDER · STRATEGY' } },
  { name: 'Júlia Sato', role: { pt: 'DIREÇÃO DE DESIGN', en: 'DESIGN DIRECTION' } },
  { name: 'Bruno Lima', role: { pt: 'TECH LEAD', en: 'TECH LEAD' } },
  { name: 'Carol Dias', role: { pt: 'HEAD DE SEO', en: 'HEAD OF SEO' } },
];
