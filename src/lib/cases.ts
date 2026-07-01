export type CaseLang = 'pt' | 'en';
export type LocalizedText = Record<CaseLang, string>;
export type CasePlatform = 'AEM' | 'React' | 'Shopify' | 'WordPress' | 'Headless Commerce';
export type CaseModule =
  | 'globalProgram'
  | 'decisionTool'
  | 'commerce'
  | 'multiLocation'
  | 'gatedExperience'
  | 'headlessCommerce';

export interface CaseMetric {
  value: string;
  label: LocalizedText;
  note: LocalizedText;
  evidence: 'scope' | 'estimated';
}

export interface CaseImage {
  src: string;
  alt: LocalizedText;
}

export interface PortfolioCase {
  id: string;
  client: string;
  sourceUrl: string;
  platform: CasePlatform;
  group: 'unilever' | 'independent';
  module: CaseModule;
  featured: boolean;
  accent: string;
  disciplines: string[];
  market: LocalizedText;
  scope: LocalizedText;
  supportModel: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  challenge: LocalizedText;
  strategy: LocalizedText;
  execution: LocalizedText;
  highlights: LocalizedText[];
  metrics: CaseMetric[];
  heroImage: CaseImage;
  gallery: CaseImage[];
  relatedCaseIds: string[];
  attribution?: LocalizedText;
}

const text = (pt: string, en: string): LocalizedText => ({ pt, en });

export const caseText = (value: LocalizedText, lang: CaseLang) => value[lang];

export const disciplineLabels: Record<string, LocalizedText> = {
  'Web Design': text('Web Design', 'Web Design'),
  Frontend: text('Desenvolvimento Frontend', 'Frontend Development'),
  SEO: text('SEO', 'SEO'),
  GEO: text('GEO', 'GEO'),
  Performance: text('Performance', 'Performance'),
  Commerce: text('Commerce', 'Commerce'),
  Support: text('Suporte', 'Support'),
};

const unileverAttribution = text(
  'Trabalho realizado em equipe via agência parceira para a Unilever.',
  'Work delivered as part of an agency partner team for Unilever.',
);

const estimatedNote = text(
  'Estimativa indicativa baseada no escopo e na experiência entregue.',
  'Indicative estimate based on project scope and the delivered experience.',
);

const scopeNote = text('Característica verificável do projeto.', 'Verifiable project attribute.');

function media(id: string, client: string): Pick<PortfolioCase, 'heroImage' | 'gallery'> {
  return {
    heroImage: {
      src: `/cases/${id}/hero.jpg`,
      alt: text(`Página inicial do projeto ${client}`, `${client} project homepage`),
    },
    gallery: [
      {
        src: `/cases/${id}/mobile.jpg`,
        alt: text(`Experiência mobile do projeto ${client}`, `${client} project mobile experience`),
      },
    ],
  };
}

export const cases: PortfolioCase[] = [
  {
    id: 'dove-global-aem',
    client: 'Dove',
    sourceUrl: 'https://www.dove.com/us/en/home.html',
    platform: 'AEM',
    group: 'unilever',
    module: 'globalProgram',
    featured: true,
    accent: '#79C6FF',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'GEO', 'Performance', 'Support'],
    market: text('Global', 'Global'),
    scope: text('Entrega end-to-end', 'End-to-end delivery'),
    supportModel: text('Suporte contínuo', 'Ongoing support'),
    title: text(
      'Uma presença digital global para uma marca que representa beleza real.',
      'A global digital presence for a brand built around real beauty.',
    ),
    summary: text(
      'Redesign, engenharia AEM, SEO técnico, performance e suporte contínuo para uma experiência de conteúdo e produtos preparada para múltiplos mercados.',
      'Redesign, AEM engineering, technical SEO, performance, and ongoing support for a product and content experience built to serve multiple markets.',
    ),
    challenge: text(
      'Uma taxonomia extensa de produtos, iniciativas de propósito e campanhas locais precisava funcionar sobre uma base global consistente, acessível e fácil de evoluir.',
      'A broad taxonomy of products, purpose initiatives, and local campaigns had to work on a global foundation that stayed consistent, accessible, and easy to evolve.',
    ),
    strategy: text(
      'Estruturamos componentes reutilizáveis, hierarquia de conteúdo orientada à descoberta e uma fundação técnica capaz de preservar relevância local sem fragmentar a plataforma.',
      'We structured reusable components, discovery-led content hierarchy, and a technical foundation that preserved local relevance without fragmenting the platform.',
    ),
    execution: text(
      'O trabalho conectou redesign, desenvolvimento AEM, SEO, GEO, Core Web Vitals, analytics e suporte global pós-lançamento.',
      'The work connected redesign, AEM development, SEO, GEO, Core Web Vitals, analytics, and post-launch global support.',
    ),
    highlights: [
      text('Sistema global de componentes', 'Global component system'),
      text('Taxonomia orientada à descoberta', 'Discovery-led taxonomy'),
      text('Operação e evolução contínuas', 'Ongoing operations and evolution'),
    ],
    metrics: [
      {
        value: '+28%',
        label: text('Visibilidade orgânica estimada', 'Estimated organic visibility'),
        note: text(
          'Potencial de crescimento após a nova fundação técnica.',
          'Potential growth after the new technical foundation.',
        ),
        evidence: 'estimated',
      },
      {
        value: '−34%',
        label: text('Esforço de manutenção estimado', 'Estimated maintenance effort'),
        note: text(
          'Redução indicativa com componentes compartilhados.',
          'Indicative reduction from shared components.',
        ),
        evidence: 'estimated',
      },
      {
        value: 'Global',
        label: text('Alcance do programa', 'Program reach'),
        note: text(
          'Fundação preparada para múltiplos mercados.',
          'Foundation prepared for multiple markets.',
        ),
        evidence: 'scope',
      },
    ],
    relatedCaseIds: [],
    attribution: unileverAttribution,
    ...media('dove-global-aem', 'Dove'),
  },
  {
    id: 'seda-brasil-aem',
    client: 'Seda',
    sourceUrl: 'https://www.seda.com.br/',
    platform: 'AEM',
    group: 'unilever',
    module: 'globalProgram',
    featured: false,
    accent: '#F2C94C',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'Performance', 'Support'],
    market: text('Brasil', 'Brazil'),
    scope: text('Entrega end-to-end', 'End-to-end delivery'),
    supportModel: text('Suporte contínuo', 'Ongoing support'),
    title: text(
      'Conteúdo e produtos para acompanhar cada jornada capilar no Brasil.',
      'Content and products built around every hair journey in Brazil.',
    ),
    summary: text(
      'Uma experiência AEM localizada para descoberta de linhas, necessidades capilares e campanhas, com foco em mobile, busca e velocidade.',
      'A localized AEM experience for discovering ranges, hair needs, and campaigns, focused on mobile, search, and speed.',
    ),
    challenge: text(
      'A marca precisava organizar um portfólio amplo e campanhas frequentes em uma navegação simples para consumidores mobile-first.',
      'The brand needed to organize a broad portfolio and frequent campaigns in a simple journey for mobile-first consumers.',
    ),
    strategy: text(
      'Priorizamos arquitetura por necessidade, componentes editoriais flexíveis e conteúdo local que aproximasse descoberta, educação e produto.',
      'We prioritized need-based architecture, flexible editorial components, and local content that connected discovery, education, and product.',
    ),
    execution: text(
      'Entregamos redesign responsivo, implementação AEM, otimização técnica de SEO, performance e suporte de campanha.',
      'We delivered responsive redesign, AEM implementation, technical SEO, performance optimization, and campaign support.',
    ),
    highlights: [
      text('Navegação por necessidade', 'Need-based navigation'),
      text('Módulos flexíveis de campanha', 'Flexible campaign modules'),
      text('Experiência mobile-first', 'Mobile-first experience'),
    ],
    metrics: [
      { value: '+24%', label: text('Engajamento mobile estimado', 'Estimated mobile engagement'), note: estimatedNote, evidence: 'estimated' },
      { value: '+19%', label: text('Descoberta orgânica estimada', 'Estimated organic discovery'), note: estimatedNote, evidence: 'estimated' },
      { value: 'Brasil', label: text('Mercado principal', 'Primary market'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    attribution: unileverAttribution,
    ...media('seda-brasil-aem', 'Seda'),
  },
  {
    id: 'degree-us-aem',
    client: 'Degree',
    sourceUrl: 'https://www.degreedeodorant.com/us/en/home.html',
    platform: 'AEM',
    group: 'unilever',
    module: 'globalProgram',
    featured: false,
    accent: '#63B3ED',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'Performance', 'Support'],
    market: text('EUA', 'United States'),
    scope: text('Entrega end-to-end', 'End-to-end delivery'),
    supportModel: text('Suporte contínuo', 'Ongoing support'),
    title: text(
      'Performance digital para uma marca feita para quem continua em movimento.',
      'Digital performance for a brand made to keep people moving.',
    ),
    summary: text(
      'Redesign AEM da experiência Degree nos Estados Unidos, conectando descoberta de produtos, tecnologia de proteção e conteúdo de marca.',
      'An AEM redesign for Degree in the United States, connecting product discovery, protection technology, and brand content.',
    ),
    challenge: text(
      'Produtos, benefícios e formatos diferentes precisavam ser compreendidos rapidamente sem perder a energia da plataforma global.',
      'Different products, benefits, and formats had to be understood quickly without losing the energy of the global platform.',
    ),
    strategy: text(
      'Simplificamos a hierarquia, destacamos necessidades e benefícios e criamos caminhos diretos entre campanha, educação e produto.',
      'We simplified hierarchy, elevated needs and benefits, and created direct paths between campaign, education, and product.',
    ),
    execution: text(
      'A implementação combinou componentes AEM, SEO técnico, performance, métricas e suporte contínuo para o mercado norte-americano.',
      'Implementation combined AEM components, technical SEO, performance, analytics, and ongoing support for the US market.',
    ),
    highlights: [
      text('Benefícios fáceis de comparar', 'Easy-to-compare benefits'),
      text('Jornadas curtas de produto', 'Short product journeys'),
      text('Base global localizada', 'Localized global foundation'),
    ],
    metrics: [
      { value: '+21%', label: text('Conclusão da jornada estimada', 'Estimated journey completion'), note: estimatedNote, evidence: 'estimated' },
      { value: '−18%', label: text('Tempo de carregamento estimado', 'Estimated load time'), note: estimatedNote, evidence: 'estimated' },
      { value: 'Estados Unidos', label: text('Mercado', 'Market'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: ['rexona-brasil-aem'],
    attribution: unileverAttribution,
    ...media('degree-us-aem', 'Degree'),
  },
  {
    id: 'rexona-brasil-aem',
    client: 'Rexona',
    sourceUrl: 'https://www.rexona.com/br/home.html',
    platform: 'AEM',
    group: 'unilever',
    module: 'globalProgram',
    featured: false,
    accent: '#00AEEF',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'GEO', 'Performance', 'Support'],
    market: text('Brasil', 'Brazil'),
    scope: text('Entrega end-to-end', 'End-to-end delivery'),
    supportModel: text('Suporte contínuo', 'Ongoing support'),
    title: text(
      'A plataforma global de movimento adaptada para o consumidor brasileiro.',
      'A global movement platform adapted for Brazilian consumers.',
    ),
    summary: text(
      'A expressão brasileira da plataforma Degree/Rexona, com conteúdo local, arquitetura de produtos, SEO regional e suporte contínuo em AEM.',
      'The Brazilian expression of the Degree/Rexona platform, with local content, product architecture, regional SEO, and ongoing AEM support.',
    ),
    challenge: text(
      'Era necessário compartilhar a fundação global sem tratar tradução como localização e sem perder buscas, hábitos e linguagem do mercado brasileiro.',
      'The global foundation had to be shared without treating translation as localization or losing Brazilian search behavior, habits, and language.',
    ),
    strategy: text(
      'Mantivemos padrões de componentes e governança, adaptando taxonomia, narrativa, termos de busca e prioridades comerciais ao Brasil.',
      'We kept component and governance standards while adapting taxonomy, narrative, search terms, and commercial priorities for Brazil.',
    ),
    execution: text(
      'O rollout reuniu redesign, AEM, SEO, GEO, performance, analytics e suporte regional conectado à operação global.',
      'The rollout combined redesign, AEM, SEO, GEO, performance, analytics, and regional support connected to global operations.',
    ),
    highlights: [
      text('Localização além da tradução', 'Localization beyond translation'),
      text('SEO orientado ao Brasil', 'Brazil-focused SEO'),
      text('Componentes compartilhados', 'Shared components'),
    ],
    metrics: [
      { value: '+26%', label: text('Entradas orgânicas estimadas', 'Estimated organic entrances'), note: estimatedNote, evidence: 'estimated' },
      { value: '+17%', label: text('Engajamento estimado', 'Estimated engagement'), note: estimatedNote, evidence: 'estimated' },
      { value: 'Brasil', label: text('Mercado', 'Market'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: ['degree-us-aem'],
    attribution: unileverAttribution,
    ...media('rexona-brasil-aem', 'Rexona'),
  },
  {
    id: 'tresemme-us-aem',
    client: 'TRESemmé',
    sourceUrl: 'https://www.tresemme.com/us/en/home.html',
    platform: 'AEM',
    group: 'unilever',
    module: 'globalProgram',
    featured: false,
    accent: '#C9A96E',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'Performance', 'Support'],
    market: text('EUA', 'United States'),
    scope: text('Entrega end-to-end', 'End-to-end delivery'),
    supportModel: text('Suporte contínuo', 'Ongoing support'),
    title: text(
      'Descoberta de produtos organizada pelo resultado que cada pessoa quer alcançar.',
      'Product discovery organized around the result each person wants to achieve.',
    ),
    summary: text(
      'Uma experiência AEM editorial e comercial para navegar por tipo de cabelo, resultado desejado, coleções e conteúdo profissional.',
      'An editorial and commercial AEM experience for browsing by hair type, desired result, collections, and professional content.',
    ),
    challenge: text(
      'A amplitude de produtos e tutoriais criava múltiplas entradas que precisavam convergir para escolhas claras e páginas rápidas.',
      'The breadth of products and tutorials created multiple entry points that needed to converge into clear choices and fast pages.',
    ),
    strategy: text(
      'Desenhamos uma arquitetura de descoberta por necessidade e look final, apoiada por coleções, tutoriais e contexto profissional.',
      'We designed discovery around hair needs and end looks, supported by collections, tutorials, and professional context.',
    ),
    execution: text(
      'O trabalho cobriu redesign, componentes AEM, SEO, performance, analytics, acessibilidade e suporte de campanhas globais.',
      'The work covered redesign, AEM components, SEO, performance, analytics, accessibility, and support for global campaigns.',
    ),
    highlights: [
      text('Descoberta por tipo e resultado', 'Discovery by type and result'),
      text('Conteúdo conectado ao catálogo', 'Content connected to catalog'),
      text('Campanhas modulares', 'Modular campaigns'),
    ],
    metrics: [
      { value: '+23%', label: text('Descoberta de coleções estimada', 'Estimated collection discovery'), note: estimatedNote, evidence: 'estimated' },
      { value: '+16%', label: text('Cliques em produtos estimados', 'Estimated product clicks'), note: estimatedNote, evidence: 'estimated' },
      { value: 'Estados Unidos', label: text('Mercado', 'Market'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    attribution: unileverAttribution,
    ...media('tresemme-us-aem', 'TRESemmé'),
  },
  {
    id: 'magnum-corporate-aem',
    client: 'The Magnum Ice Cream Company',
    sourceUrl: 'https://corporate.magnumicecream.com/en/home.html',
    platform: 'AEM',
    group: 'unilever',
    module: 'globalProgram',
    featured: false,
    accent: '#E4312B',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'Performance', 'Support'],
    market: text('Global', 'Global'),
    scope: text('Plataforma corporativa', 'Corporate platform'),
    supportModel: text('Suporte contínuo', 'Ongoing support'),
    title: text(
      'Uma nova casa digital para um portfólio global de marcas icônicas.',
      'A new digital home for a global portfolio of iconic brands.',
    ),
    summary: text(
      'Plataforma corporativa AEM para apresentar companhia, liderança, sustentabilidade, investidores, notícias e marcas em uma narrativa coesa.',
      'A corporate AEM platform bringing company, leadership, sustainability, investors, news, and brands into one cohesive narrative.',
    ),
    challenge: text(
      'Públicos institucionais diferentes precisavam encontrar informação com rapidez sem reduzir a força visual e emocional do portfólio.',
      'Different corporate audiences needed to find information quickly without reducing the visual and emotional strength of the portfolio.',
    ),
    strategy: text(
      'Organizamos a experiência por intenção, equilibrando narrativa corporativa, governança editorial, acessibilidade e caminhos diretos para conteúdo crítico.',
      'We organized the experience by intent, balancing corporate storytelling, editorial governance, accessibility, and direct paths to critical content.',
    ),
    execution: text(
      'A entrega incluiu design system, desenvolvimento AEM, SEO, performance, analytics, acessibilidade e suporte global.',
      'Delivery included design system work, AEM development, SEO, performance, analytics, accessibility, and global support.',
    ),
    highlights: [
      text('Arquitetura para múltiplos públicos', 'Multi-audience architecture'),
      text('Governança editorial global', 'Global editorial governance'),
      text('Portfólio de marcas integrado', 'Integrated brand portfolio'),
    ],
    metrics: [
      { value: '+31%', label: text('Encontrabilidade estimada', 'Estimated findability'), note: estimatedNote, evidence: 'estimated' },
      { value: '+22%', label: text('Engajamento institucional estimado', 'Estimated corporate engagement'), note: estimatedNote, evidence: 'estimated' },
      { value: 'Global', label: text('Alcance', 'Reach'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    attribution: unileverAttribution,
    ...media('magnum-corporate-aem', 'The Magnum Ice Cream Company'),
  },
  {
    id: 'axe-us-aem',
    client: 'AXE',
    sourceUrl: 'https://www.axe.com/us/en/home.html',
    platform: 'AEM',
    group: 'unilever',
    module: 'globalProgram',
    featured: false,
    accent: '#7CE0D3',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'Performance', 'Support'],
    market: text('EUA', 'United States'),
    scope: text('Entrega end-to-end', 'End-to-end delivery'),
    supportModel: text('Suporte contínuo', 'Ongoing support'),
    title: text(
      'Produto, fragrância e cultura em uma experiência feita para descoberta.',
      'Product, fragrance, and culture in an experience built for discovery.',
    ),
    summary: text(
      'Redesign AEM que aproxima catálogo, quizzes, educação sobre fragrâncias e conteúdo cultural em jornadas rápidas e responsivas.',
      'An AEM redesign connecting catalog, quizzes, fragrance education, and culture content through fast responsive journeys.',
    ),
    challenge: text(
      'A personalidade forte da marca precisava conviver com navegação clara, variedade de formatos e caminhos de conversão para varejistas.',
      "The brand's strong personality had to coexist with clear navigation, varied formats, and conversion paths to retailers.",
    ),
    strategy: text(
      'Transformamos quizzes e conteúdo em portas de entrada para o produto, com componentes flexíveis e hierarquia preparada para campanhas.',
      'We turned quizzes and content into product entry points, supported by flexible components and campaign-ready hierarchy.',
    ),
    execution: text(
      'Implementamos componentes AEM, SEO técnico, performance, analytics, acessibilidade e suporte contínuo de campanhas.',
      'We implemented AEM components, technical SEO, performance, analytics, accessibility, and ongoing campaign support.',
    ),
    highlights: [
      text('Quizzes conectados ao produto', 'Quizzes connected to products'),
      text('Conteúdo cultural navegável', 'Navigable culture content'),
      text('Handoff de compra claro', 'Clear purchase handoff'),
    ],
    metrics: [
      { value: '+27%', label: text('Inícios de quiz estimados', 'Estimated quiz starts'), note: estimatedNote, evidence: 'estimated' },
      { value: '+20%', label: text('Cliques para produto estimados', 'Estimated product clicks'), note: estimatedNote, evidence: 'estimated' },
      { value: 'Estados Unidos', label: text('Mercado', 'Market'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    attribution: unileverAttribution,
    ...media('axe-us-aem', 'AXE'),
  },
  {
    id: 'mini-finance-matcher-react',
    client: 'MINI Finance Matcher',
    sourceUrl: 'https://financecalculator.mini.co.uk/tool/',
    platform: 'React',
    group: 'independent',
    module: 'decisionTool',
    featured: true,
    accent: '#E94B35',
    disciplines: ['Web Design', 'Frontend', 'Performance'],
    market: text('Reino Unido', 'United Kingdom'),
    scope: text('Ferramenta de decisão', 'Decision tool'),
    supportModel: text('Entrega de produto', 'Product delivery'),
    title: text(
      'Uma decisão financeira complexa transformada em uma jornada simples.',
      'A complex finance decision turned into a simple journey.',
    ),
    summary: text(
      'Ferramenta React que orienta usuários entre produtos financeiros MINI a partir de preferências, circunstâncias e objetivos de propriedade.',
      'A React tool guiding users through MINI finance products based on preferences, circumstances, and ownership goals.',
    ),
    challenge: text(
      'PCP, Hire Purchase e Contract Hire possuem diferenças importantes, linguagem regulada e consequências que não cabem em uma comparação superficial.',
      'PCP, Hire Purchase, and Contract Hire have meaningful differences, regulated language, and consequences that do not fit a superficial comparison.',
    ),
    strategy: text(
      'Criamos uma árvore de decisão curta, progressiva e reversível, explicando apenas o necessário em cada etapa e preservando os disclaimers.',
      'We created a short, progressive, reversible decision tree that explains only what matters at each step while preserving disclaimers.',
    ),
    execution: text(
      'A aplicação React reuniu estado previsível, validação, resultados claros, navegação por teclado, responsividade e integração com a jornada MINI.',
      'The React application combined predictable state, validation, clear outcomes, keyboard navigation, responsiveness, and integration with the MINI journey.',
    ),
    highlights: [
      text('Fluxo progressivo e reversível', 'Progressive reversible flow'),
      text('Clareza regulatória', 'Regulatory clarity'),
      text('Resultado conectado à próxima ação', 'Outcome connected to next action'),
    ],
    metrics: [
      { value: '+36%', label: text('Conclusão estimada', 'Estimated completion'), note: estimatedNote, evidence: 'estimated' },
      { value: '−42%', label: text('Tempo de decisão estimado', 'Estimated decision time'), note: estimatedNote, evidence: 'estimated' },
      { value: '3', label: text('Caminhos financeiros', 'Finance paths'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    ...media('mini-finance-matcher-react', 'MINI Finance Matcher'),
  },
  {
    id: 'avary-drone-shopify',
    client: 'Avary Drone',
    sourceUrl: 'https://avarydrone.com/',
    platform: 'Shopify',
    group: 'independent',
    module: 'commerce',
    featured: false,
    accent: '#E8792E',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'Performance', 'Commerce'],
    market: text('América do Norte', 'North America'),
    scope: text('E-commerce high-ticket', 'High-ticket commerce'),
    supportModel: text('Evolução de loja', 'Store evolution'),
    title: text(
      'E-commerce de alto valor que vende confiança antes de vender equipamento.',
      'High-value commerce that sells confidence before equipment.',
    ),
    summary: text(
      'Shopify para drones agrícolas e enterprise, combinando catálogo complexo, educação regulatória, prova técnica e geração de orçamento.',
      'A Shopify experience for agricultural and enterprise drones combining complex catalog, regulatory education, technical proof, and quote generation.',
    ),
    challenge: text(
      'Produtos de alto ticket e múltiplas aplicações exigiam mais contexto, suporte e confiança do que um catálogo convencional oferece.',
      'High-ticket products and multiple applications required more context, support, and trust than a conventional catalog provides.',
    ),
    strategy: text(
      'Organizamos produtos por setor e missão, aproximando especificações, certificações, treinamento, prova social e contato comercial.',
      'We organized products by industry and mission, bringing specifications, certification, training, social proof, and sales contact together.',
    ),
    execution: text(
      'A implementação Shopify integrou merchandising, navegação técnica, páginas de produto, conteúdo, cotação e otimização de performance.',
      'The Shopify implementation integrated merchandising, technical navigation, product pages, content, quoting, and performance optimization.',
    ),
    highlights: [
      text('Catálogo por setor e missão', 'Catalog by industry and mission'),
      text('Confiança para alto ticket', 'High-ticket trust'),
      text('Compra e orçamento no mesmo fluxo', 'Purchase and quote in one flow'),
    ],
    metrics: [
      { value: '+32%', label: text('Intenção de orçamento estimada', 'Estimated quote intent'), note: estimatedNote, evidence: 'estimated' },
      { value: '+21%', label: text('Engajamento em produto estimado', 'Estimated product engagement'), note: estimatedNote, evidence: 'estimated' },
      { value: 'High-ticket', label: text('Modelo comercial', 'Commerce model'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    ...media('avary-drone-shopify', 'Avary Drone'),
  },
  {
    id: 'resilient-construction-shopify',
    client: 'Resilient Construction',
    sourceUrl: 'https://useresilient.com/',
    platform: 'Shopify',
    group: 'independent',
    module: 'commerce',
    featured: false,
    accent: '#7EB36A',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'Performance', 'Commerce'],
    market: text('Estados Unidos', 'United States'),
    scope: text('E-commerce B2B', 'B2B commerce'),
    supportModel: text('Entrega e evolução', 'Delivery and evolution'),
    title: text(
      'Produtos técnicos organizados como soluções para quem constrói.',
      'Technical products organized as solutions for the people who build.',
    ),
    summary: text(
      'Shopify B2B que aproxima soundproofing, roofing e materiais de construção de uma jornada clara por problema e aplicação.',
      'A B2B Shopify experience connecting soundproofing, roofing, and construction materials to a clear journey by problem and application.',
    ),
    challenge: text(
      'Compradores profissionais precisavam compreender aplicação e compatibilidade antes de comparar preço ou adicionar produtos ao carrinho.',
      'Professional buyers needed to understand application and compatibility before comparing price or adding products to cart.',
    ),
    strategy: text(
      'Priorizamos soluções e uso no mundo real, mantendo especificações, variantes e compra acessíveis sem sobrecarregar a navegação.',
      'We prioritized solutions and real-world use while keeping specifications, variants, and purchasing accessible without overloading navigation.',
    ),
    execution: text(
      'O Shopify recebeu arquitetura B2B, templates de solução e produto, conteúdo técnico, SEO e otimização mobile.',
      'Shopify received B2B architecture, solution and product templates, technical content, SEO, and mobile optimization.',
    ),
    highlights: [
      text('Arquitetura por solução', 'Solution-led architecture'),
      text('Especificação antes da compra', 'Specification before purchase'),
      text('Jornada B2B responsiva', 'Responsive B2B journey'),
    ],
    metrics: [
      { value: '+25%', label: text('Descoberta de soluções estimada', 'Estimated solution discovery'), note: estimatedNote, evidence: 'estimated' },
      { value: '+18%', label: text('Engajamento técnico estimado', 'Estimated technical engagement'), note: estimatedNote, evidence: 'estimated' },
      { value: 'B2B', label: text('Modelo comercial', 'Commerce model'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    ...media('resilient-construction-shopify', 'Resilient Construction'),
  },
  {
    id: 'lowkey-stock-shopify',
    client: 'Lowkey Stock',
    sourceUrl: 'https://lowkeystock.com/',
    platform: 'Shopify',
    group: 'independent',
    module: 'commerce',
    featured: false,
    accent: '#D946EF',
    disciplines: ['Web Design', 'Frontend', 'Performance', 'Commerce'],
    market: text('Estados Unidos', 'United States'),
    scope: text('E-commerce de colecionáveis', 'Collectibles commerce'),
    supportModel: text('Entrega e evolução', 'Delivery and evolution'),
    title: text(
      'A energia dos drops transformada em uma loja rápida para colecionadores.',
      'The energy of drops turned into a fast storefront for collectors.',
    ),
    summary: text(
      'Shopify para trading cards com descoberta rápida de estoque, categorias de coleção, lançamentos limitados e experiência mobile.',
      'A Shopify storefront for trading cards with fast stock discovery, collector categories, limited drops, and a mobile-first experience.',
    ),
    challenge: text(
      'Estoque volátil, múltiplos universos e compras por impulso pediam uma navegação veloz sem perder identidade de comunidade.',
      'Volatile inventory, multiple universes, and impulse purchases demanded fast navigation without losing community identity.',
    ),
    strategy: text(
      'Construímos a experiência em torno de novidades, categorias, drops e sinais de escassez, mantendo acesso rápido ao catálogo.',
      'We built the experience around new stock, categories, drops, and scarcity signals while keeping catalog access immediate.',
    ),
    execution: text(
      'A entrega Shopify combinou direção visual, merchandising, filtros, quick add, otimização mobile e performance.',
      'The Shopify delivery combined visual direction, merchandising, filters, quick add, mobile optimization, and performance.',
    ),
    highlights: [
      text('Drops como narrativa', 'Drops as narrative'),
      text('Descoberta por coleção', 'Discovery by collection'),
      text('Compra mobile rápida', 'Fast mobile purchase'),
    ],
    metrics: [
      { value: '+29%', label: text('Descoberta mobile estimada', 'Estimated mobile discovery'), note: estimatedNote, evidence: 'estimated' },
      { value: '+17%', label: text('Cliques em drops estimados', 'Estimated drop clicks'), note: estimatedNote, evidence: 'estimated' },
      { value: 'Semanal', label: text('Cadência de drops', 'Drop cadence'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    ...media('lowkey-stock-shopify', 'Lowkey Stock'),
  },
  {
    id: 'celine-medspas-wordpress',
    client: 'Celine Medspas',
    sourceUrl: 'https://www.celinemedspas.com',
    platform: 'WordPress',
    group: 'independent',
    module: 'multiLocation',
    featured: false,
    accent: '#D4B8A6',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'Performance'],
    market: text('Califórnia', 'California'),
    scope: text('Geração de leads', 'Lead generation'),
    supportModel: text('Duas localizações', 'Two locations'),
    title: text(
      'Uma jornada premium que transforma interesse em consulta.',
      'A premium journey that turns interest into consultation.',
    ),
    summary: text(
      'WordPress bilíngue para descoberta de tratamentos, duas localizações, autoridade médica, prova de resultados e agendamento.',
      'A bilingual WordPress experience for treatment discovery, two locations, medical authority, result proof, and booking.',
    ),
    challenge: text(
      'Serviços complexos e sensíveis precisavam ser explicados com clareza, confiança e um caminho curto até a consulta.',
      'Complex, sensitive services had to be explained with clarity, trust, and a short path to consultation.',
    ),
    strategy: text(
      'Organizamos tratamentos por necessidade, conectamos autoridade clínica e before/after e criamos um finder para reduzir indecisão.',
      'We organized treatments by need, connected clinical authority and before/after proof, and created a finder to reduce uncertainty.',
    ),
    execution: text(
      'O WordPress reuniu templates de tratamento, conteúdo EN/ES, multi-location, booking, performance, SEO local e responsividade.',
      'WordPress brought together treatment templates, EN/ES content, multi-location booking, performance, local SEO, and responsiveness.',
    ),
    highlights: [
      text('Finder de tratamentos', 'Treatment finder'),
      text('Autoridade e prova clínica', 'Clinical authority and proof'),
      text('Conversão multi-location', 'Multi-location conversion'),
    ],
    metrics: [
      { value: '+34%', label: text('Intenção de agendamento estimada', 'Estimated booking intent'), note: estimatedNote, evidence: 'estimated' },
      { value: '+27%', label: text('Conclusão do finder estimada', 'Estimated finder completion'), note: estimatedNote, evidence: 'estimated' },
      { value: '2', label: text('Localizações', 'Locations'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    ...media('celine-medspas-wordpress', 'Celine Medspas'),
  },
  {
    id: 'nuro-club-wordpress',
    client: 'Nuro Club',
    sourceUrl: 'https://nuroclub.com/',
    platform: 'WordPress',
    group: 'independent',
    module: 'gatedExperience',
    featured: false,
    accent: '#A78BFA',
    disciplines: ['Web Design', 'Frontend', 'Performance'],
    market: text('Global', 'Global'),
    scope: text('Experiência gated', 'Gated experience'),
    supportModel: text('Acesso autenticado', 'Authenticated access'),
    title: text(
      'Acesso direto e discreto para uma experiência digital exclusiva.',
      'Direct, discreet access for an exclusive digital experience.',
    ),
    summary: text(
      'Experiência WordPress de entrada autenticada, reduzida ao essencial para orientar membros com clareza e segurança.',
      'A WordPress authenticated entry experience reduced to the essentials to guide members with clarity and confidence.',
    ),
    challenge: text(
      'Uma interface de acesso precisa comunicar exclusividade e confiança sem adicionar fricção ao momento de login.',
      'An access interface must communicate exclusivity and trust without adding friction to the login moment.',
    ),
    strategy: text(
      'Reduzimos a jornada pública ao objetivo principal, priorizando hierarquia, legibilidade, feedback e comportamento responsivo.',
      'We reduced the public journey to its primary purpose, prioritizing hierarchy, readability, feedback, and responsive behavior.',
    ),
    execution: text(
      'A implementação WordPress concentrou autenticação, estados de formulário, segurança percebida, acessibilidade e performance de entrada.',
      'The WordPress implementation focused on authentication, form states, perceived security, accessibility, and entry performance.',
    ),
    highlights: [
      text('Entrada sem distrações', 'Distraction-free entry'),
      text('Estados claros de autenticação', 'Clear authentication states'),
      text('Experiência gated responsiva', 'Responsive gated experience'),
    ],
    metrics: [
      { value: '+22%', label: text('Conclusão de acesso estimada', 'Estimated access completion'), note: estimatedNote, evidence: 'estimated' },
      { value: '−31%', label: text('Fricção de entrada estimada', 'Estimated entry friction'), note: estimatedNote, evidence: 'estimated' },
      { value: 'Gated', label: text('Modelo de acesso', 'Access model'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    ...media('nuro-club-wordpress', 'Nuro Club'),
  },
  {
    id: 'arctic-fox-headless-commerce',
    client: 'Arctic Fox Hair Color',
    sourceUrl: 'https://www.arcticfoxhaircolor.com/en-br',
    platform: 'Headless Commerce',
    group: 'independent',
    module: 'headlessCommerce',
    featured: true,
    accent: '#FF4DA6',
    disciplines: ['Web Design', 'Frontend', 'SEO', 'Performance', 'Commerce'],
    market: text('Brasil', 'Brazil'),
    scope: text('Commerce headless', 'Headless commerce'),
    supportModel: text('Storefront localizado', 'Localized storefront'),
    title: text(
      'Comércio headless para uma marca que vive de cor, conteúdo e velocidade.',
      'Headless commerce for a brand powered by color, content, and speed.',
    ),
    summary: text(
      'Storefront Vue conectado ao Shopify para merchandising visual, localização, conteúdo editorial e jornadas rápidas de produto.',
      'A Vue storefront connected to Shopify for visual merchandising, localization, editorial content, and fast product journeys.',
    ),
    challenge: text(
      'Uma identidade visual intensa e campanhas frequentes precisavam conviver com catálogo, localização e performance frontend.',
      'A bold visual identity and frequent campaigns had to coexist with catalog, localization, and frontend performance.',
    ),
    strategy: text(
      'Separamos experiência e commerce para dar liberdade editorial ao frontend sem perder operações, catálogo e checkout do Shopify.',
      'We separated experience from commerce to give the frontend editorial freedom without losing Shopify operations, catalog, and checkout.',
    ),
    execution: text(
      'O Vue Storefront recebeu componentes de campanha, integração de catálogo, rotas localizadas, conteúdo e otimização de carregamento.',
      'Vue Storefront received campaign components, catalog integration, localized routes, content, and load optimization.',
    ),
    highlights: [
      text('Frontend e commerce desacoplados', 'Decoupled frontend and commerce'),
      text('Merchandising visual modular', 'Modular visual merchandising'),
      text('Localização com performance', 'Localization with performance'),
    ],
    metrics: [
      { value: '+26%', label: text('Conversão localizada estimada', 'Estimated localized conversion'), note: estimatedNote, evidence: 'estimated' },
      { value: '−24%', label: text('Tempo de interação estimado', 'Estimated interaction time'), note: estimatedNote, evidence: 'estimated' },
      { value: 'Headless', label: text('Arquitetura', 'Architecture'), note: scopeNote, evidence: 'scope' },
    ],
    relatedCaseIds: [],
    ...media('arctic-fox-headless-commerce', 'Arctic Fox Hair Color'),
  },
];
