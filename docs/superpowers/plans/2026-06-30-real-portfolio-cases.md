# Real Portfolio Cases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four fictional cases with fourteen bilingual, conversion-focused, indexable portfolio pages backed by real website screenshots and transparent project attribution.

**Architecture:** Keep the existing React Router route shape and build one shared cases index plus one shared case-detail template. Move case content into a focused typed data file, store all screenshots locally, derive route metadata from that same data, and use optional module flags rather than client-specific components.

**Tech Stack:** React 19, TypeScript 6, React Router 7, Sass, Vite 8, Playwright 1.60.

---

## File Map

- Create `src/lib/cases.ts`: `PortfolioCase` type, localization helper, and all fourteen case records.
- Create `scripts/capture-case-assets.mjs`: repeatable screenshot capture using the installed Playwright dependency.
- Create `src/components/CaseDetailPage.tsx`: the shared detail template and optional case modules.
- Create `public/cases/<slug>/hero.jpg` and `public/cases/<slug>/mobile.jpg`: local public-site evidence.
- Modify `src/lib/data.ts`: remove only the fictional `cases` export after both case UIs use the new catalog; preserve blog posts.
- Modify `src/components/CasePreview.tsx`: render the three `featured` cases with localized fields.
- Modify `src/components/CasesPage.tsx`: keep the index, add two accessible filter groups, and remove the old detail component.
- Modify `src/lib/seo.ts`: index known cases and derive metadata/images from case data.
- Modify `src/App.tsx`: import the extracted detail component.
- Modify `src/styles/main.scss`: shared case index/detail responsive styling and image fallbacks.
- Modify `public/sitemap.xml`: replace four fictional case URLs with fourteen real URLs.
- Modify `package.json`: add only the `capture:cases` development script.
- Modify `tests/smoke.spec.ts`: data, index, detail, SEO, asset, and mobile regression coverage.

## Editorial Matrix

Use the following exact content direction when populating `src/lib/cases.ts`. Each case gets three localized highlights derived from the execution sentence and the listed disciplines. Metric values are explicitly non-audited when `estimated`.

### 1. Dove

- PT title: `Uma presença digital global para uma marca que representa beleza real.`
- EN title: `A global digital presence for a brand built around real beauty.`
- PT summary: `Redesign, engenharia AEM, SEO técnico, performance e suporte contínuo para uma experiência de conteúdo e produtos preparada para múltiplos mercados.`
- EN summary: `Redesign, AEM engineering, technical SEO, performance, and ongoing support for a product and content experience built to serve multiple markets.`
- PT challenge: `Uma taxonomia extensa de produtos, iniciativas de propósito e campanhas locais precisava funcionar sobre uma base global consistente, acessível e fácil de evoluir.`
- EN challenge: `A broad taxonomy of products, purpose initiatives, and local campaigns had to work on a global foundation that stayed consistent, accessible, and easy to evolve.`
- PT strategy: `Estruturamos componentes reutilizáveis, hierarquia de conteúdo orientada à descoberta e uma fundação técnica capaz de preservar relevância local sem fragmentar a plataforma.`
- EN strategy: `We structured reusable components, discovery-led content hierarchy, and a technical foundation that preserved local relevance without fragmenting the platform.`
- PT execution: `O trabalho conectou redesign, desenvolvimento AEM, SEO, GEO, Core Web Vitals, analytics e suporte global pós-lançamento.`
- EN execution: `The work connected redesign, AEM development, SEO, GEO, Core Web Vitals, analytics, and post-launch global support.`
- Highlights: `Sistema global de componentes / Global component system`; `Taxonomia orientada à descoberta / Discovery-led taxonomy`; `Operação e evolução contínuas / Ongoing operations and evolution`.
- Metrics: `+28% Visibilidade orgânica estimada / Estimated organic visibility`; `−34% Esforço de manutenção estimado / Estimated maintenance effort`; `Global Alcance do programa / Program reach`.
- Disciplines: Web Design, Frontend, SEO, GEO, Performance, Support.

### 2. Seda

- PT title: `Conteúdo e produtos para acompanhar cada jornada capilar no Brasil.`
- EN title: `Content and products built around every hair journey in Brazil.`
- PT summary: `Uma experiência AEM localizada para descoberta de linhas, necessidades capilares e campanhas, com foco em mobile, busca e velocidade.`
- EN summary: `A localized AEM experience for discovering ranges, hair needs, and campaigns, focused on mobile, search, and speed.`
- PT challenge: `A marca precisava organizar um portfólio amplo e campanhas frequentes em uma navegação simples para consumidores mobile-first.`
- EN challenge: `The brand needed to organize a broad portfolio and frequent campaigns in a simple journey for mobile-first consumers.`
- PT strategy: `Priorizamos arquitetura por necessidade, componentes editoriais flexíveis e conteúdo local que aproximasse descoberta, educação e produto.`
- EN strategy: `We prioritized need-based architecture, flexible editorial components, and local content that connected discovery, education, and product.`
- PT execution: `Entregamos redesign responsivo, implementação AEM, otimização técnica de SEO, performance e suporte de campanha.`
- EN execution: `We delivered responsive redesign, AEM implementation, technical SEO, performance optimization, and campaign support.`
- Highlights: `Navegação por necessidade / Need-based navigation`; `Módulos flexíveis de campanha / Flexible campaign modules`; `Experiência mobile-first / Mobile-first experience`.
- Metrics: `+24% Engajamento mobile estimado / Estimated mobile engagement`; `+19% Descoberta orgânica estimada / Estimated organic discovery`; `Brasil Mercado principal / Primary market`.
- Disciplines: Web Design, Frontend, SEO, Performance, Support.

### 3. Degree

- PT title: `Performance digital para uma marca feita para quem continua em movimento.`
- EN title: `Digital performance for a brand made to keep people moving.`
- PT summary: `Redesign AEM da experiência Degree nos Estados Unidos, conectando descoberta de produtos, tecnologia de proteção e conteúdo de marca.`
- EN summary: `An AEM redesign for Degree in the United States, connecting product discovery, protection technology, and brand content.`
- PT challenge: `Produtos, benefícios e formatos diferentes precisavam ser compreendidos rapidamente sem perder a energia da plataforma global.`
- EN challenge: `Different products, benefits, and formats had to be understood quickly without losing the energy of the global platform.`
- PT strategy: `Simplificamos a hierarquia, destacamos necessidades e benefícios e criamos caminhos diretos entre campanha, educação e produto.`
- EN strategy: `We simplified hierarchy, elevated needs and benefits, and created direct paths between campaign, education, and product.`
- PT execution: `A implementação combinou componentes AEM, SEO técnico, performance, métricas e suporte contínuo para o mercado norte-americano.`
- EN execution: `Implementation combined AEM components, technical SEO, performance, analytics, and ongoing support for the US market.`
- Highlights: `Benefícios fáceis de comparar / Easy-to-compare benefits`; `Jornadas curtas de produto / Short product journeys`; `Base global localizada / Localized global foundation`.
- Metrics: `+21% Conclusão da jornada estimada / Estimated journey completion`; `−18% Tempo de carregamento estimado / Estimated load time`; `Estados Unidos Mercado / Market`.
- Disciplines: Web Design, Frontend, SEO, Performance, Support.

### 4. Rexona

- PT title: `A plataforma global de movimento adaptada para o consumidor brasileiro.`
- EN title: `A global movement platform adapted for Brazilian consumers.`
- PT summary: `A expressão brasileira da plataforma Degree/Rexona, com conteúdo local, arquitetura de produtos, SEO regional e suporte contínuo em AEM.`
- EN summary: `The Brazilian expression of the Degree/Rexona platform, with local content, product architecture, regional SEO, and ongoing AEM support.`
- PT challenge: `Era necessário compartilhar a fundação global sem tratar tradução como localização e sem perder buscas, hábitos e linguagem do mercado brasileiro.`
- EN challenge: `The global foundation had to be shared without treating translation as localization or losing Brazilian search behavior, habits, and language.`
- PT strategy: `Mantivemos padrões de componentes e governança, adaptando taxonomia, narrativa, termos de busca e prioridades comerciais ao Brasil.`
- EN strategy: `We kept component and governance standards while adapting taxonomy, narrative, search terms, and commercial priorities for Brazil.`
- PT execution: `O rollout reuniu redesign, AEM, SEO, GEO, performance, analytics e suporte regional conectado à operação global.`
- EN execution: `The rollout combined redesign, AEM, SEO, GEO, performance, analytics, and regional support connected to global operations.`
- Highlights: `Localização além da tradução / Localization beyond translation`; `SEO orientado ao Brasil / Brazil-focused SEO`; `Componentes compartilhados / Shared components`.
- Metrics: `+26% Entradas orgânicas estimadas / Estimated organic entrances`; `+17% Engajamento estimado / Estimated engagement`; `Brasil Mercado / Market`.
- Disciplines: Web Design, Frontend, SEO, GEO, Performance, Support.

### 5. TRESemmé

- PT title: `Descoberta de produtos organizada pelo resultado que cada pessoa quer alcançar.`
- EN title: `Product discovery organized around the result each person wants to achieve.`
- PT summary: `Uma experiência AEM editorial e comercial para navegar por tipo de cabelo, resultado desejado, coleções e conteúdo profissional.`
- EN summary: `An editorial and commercial AEM experience for browsing by hair type, desired result, collections, and professional content.`
- PT challenge: `A amplitude de produtos e tutoriais criava múltiplas entradas que precisavam convergir para escolhas claras e páginas rápidas.`
- EN challenge: `The breadth of products and tutorials created multiple entry points that needed to converge into clear choices and fast pages.`
- PT strategy: `Desenhamos uma arquitetura de descoberta por necessidade e look final, apoiada por coleções, tutoriais e contexto profissional.`
- EN strategy: `We designed discovery around hair needs and end looks, supported by collections, tutorials, and professional context.`
- PT execution: `O trabalho cobriu redesign, componentes AEM, SEO, performance, analytics, acessibilidade e suporte de campanhas globais.`
- EN execution: `The work covered redesign, AEM components, SEO, performance, analytics, accessibility, and support for global campaigns.`
- Highlights: `Descoberta por tipo e resultado / Discovery by type and result`; `Conteúdo conectado ao catálogo / Content connected to catalog`; `Campanhas modulares / Modular campaigns`.
- Metrics: `+23% Descoberta de coleções estimada / Estimated collection discovery`; `+16% Cliques em produtos estimados / Estimated product clicks`; `Estados Unidos Mercado / Market`.
- Disciplines: Web Design, Frontend, SEO, Performance, Support.

### 6. The Magnum Ice Cream Company

- PT title: `Uma nova casa digital para um portfólio global de marcas icônicas.`
- EN title: `A new digital home for a global portfolio of iconic brands.`
- PT summary: `Plataforma corporativa AEM para apresentar companhia, liderança, sustentabilidade, investidores, notícias e marcas em uma narrativa coesa.`
- EN summary: `A corporate AEM platform bringing company, leadership, sustainability, investors, news, and brands into one cohesive narrative.`
- PT challenge: `Públicos institucionais diferentes precisavam encontrar informação com rapidez sem reduzir a força visual e emocional do portfólio.`
- EN challenge: `Different corporate audiences needed to find information quickly without reducing the visual and emotional strength of the portfolio.`
- PT strategy: `Organizamos a experiência por intenção, equilibrando narrativa corporativa, governança editorial, acessibilidade e caminhos diretos para conteúdo crítico.`
- EN strategy: `We organized the experience by intent, balancing corporate storytelling, editorial governance, accessibility, and direct paths to critical content.`
- PT execution: `A entrega incluiu design system, desenvolvimento AEM, SEO, performance, analytics, acessibilidade e suporte global.`
- EN execution: `Delivery included design system work, AEM development, SEO, performance, analytics, accessibility, and global support.`
- Highlights: `Arquitetura para múltiplos públicos / Multi-audience architecture`; `Governança editorial global / Global editorial governance`; `Portfólio de marcas integrado / Integrated brand portfolio`.
- Metrics: `+31% Encontrabilidade estimada / Estimated findability`; `+22% Engajamento institucional estimado / Estimated corporate engagement`; `Global Alcance / Reach`.
- Disciplines: Web Design, Frontend, SEO, Performance, Support.

### 7. AXE

- PT title: `Produto, fragrância e cultura em uma experiência feita para descoberta.`
- EN title: `Product, fragrance, and culture in an experience built for discovery.`
- PT summary: `Redesign AEM que aproxima catálogo, quizzes, educação sobre fragrâncias e conteúdo cultural em jornadas rápidas e responsivas.`
- EN summary: `An AEM redesign connecting catalog, quizzes, fragrance education, and culture content through fast responsive journeys.`
- PT challenge: `A personalidade forte da marca precisava conviver com navegação clara, variedade de formatos e caminhos de conversão para varejistas.`
- EN challenge: `The brand's strong personality had to coexist with clear navigation, varied formats, and conversion paths to retailers.`
- PT strategy: `Transformamos quizzes e conteúdo em portas de entrada para o produto, com componentes flexíveis e hierarquia preparada para campanhas.`
- EN strategy: `We turned quizzes and content into product entry points, supported by flexible components and campaign-ready hierarchy.`
- PT execution: `Implementamos componentes AEM, SEO técnico, performance, analytics, acessibilidade e suporte contínuo de campanhas.`
- EN execution: `We implemented AEM components, technical SEO, performance, analytics, accessibility, and ongoing campaign support.`
- Highlights: `Quizzes conectados ao produto / Quizzes connected to products`; `Conteúdo cultural navegável / Navigable culture content`; `Handoff de compra claro / Clear purchase handoff`.
- Metrics: `+27% Inícios de quiz estimados / Estimated quiz starts`; `+20% Cliques para produto estimados / Estimated product clicks`; `Estados Unidos Mercado / Market`.
- Disciplines: Web Design, Frontend, SEO, Performance, Support.

### 8. MINI Finance Matcher

- PT title: `Uma decisão financeira complexa transformada em uma jornada simples.`
- EN title: `A complex finance decision turned into a simple journey.`
- PT summary: `Ferramenta React que orienta usuários entre produtos financeiros MINI a partir de preferências, circunstâncias e objetivos de propriedade.`
- EN summary: `A React tool guiding users through MINI finance products based on preferences, circumstances, and ownership goals.`
- PT challenge: `PCP, Hire Purchase e Contract Hire possuem diferenças importantes, linguagem regulada e consequências que não cabem em uma comparação superficial.`
- EN challenge: `PCP, Hire Purchase, and Contract Hire have meaningful differences, regulated language, and consequences that do not fit a superficial comparison.`
- PT strategy: `Criamos uma árvore de decisão curta, progressiva e reversível, explicando apenas o necessário em cada etapa e preservando os disclaimers.`
- EN strategy: `We created a short, progressive, reversible decision tree that explains only what matters at each step while preserving disclaimers.`
- PT execution: `A aplicação React reuniu estado previsível, validação, resultados claros, navegação por teclado, responsividade e integração com a jornada MINI.`
- EN execution: `The React application combined predictable state, validation, clear outcomes, keyboard navigation, responsiveness, and integration with the MINI journey.`
- Highlights: `Fluxo progressivo e reversível / Progressive reversible flow`; `Clareza regulatória / Regulatory clarity`; `Resultado conectado à próxima ação / Outcome connected to next action`.
- Metrics: `+36% Conclusão estimada / Estimated completion`; `−42% Tempo de decisão estimado / Estimated decision time`; `3 Caminhos financeiros / Finance paths`.
- Disciplines: Web Design, Frontend, Performance.

### 9. Avary Drone

- PT title: `E-commerce de alto valor que vende confiança antes de vender equipamento.`
- EN title: `High-value commerce that sells confidence before equipment.`
- PT summary: `Shopify para drones agrícolas e enterprise, combinando catálogo complexo, educação regulatória, prova técnica e geração de orçamento.`
- EN summary: `A Shopify experience for agricultural and enterprise drones combining complex catalog, regulatory education, technical proof, and quote generation.`
- PT challenge: `Produtos de alto ticket e múltiplas aplicações exigiam mais contexto, suporte e confiança do que um catálogo convencional oferece.`
- EN challenge: `High-ticket products and multiple applications required more context, support, and trust than a conventional catalog provides.`
- PT strategy: `Organizamos produtos por setor e missão, aproximando especificações, certificações, treinamento, prova social e contato comercial.`
- EN strategy: `We organized products by industry and mission, bringing specifications, certification, training, social proof, and sales contact together.`
- PT execution: `A implementação Shopify integrou merchandising, navegação técnica, páginas de produto, conteúdo, cotação e otimização de performance.`
- EN execution: `The Shopify implementation integrated merchandising, technical navigation, product pages, content, quoting, and performance optimization.`
- Highlights: `Catálogo por setor e missão / Catalog by industry and mission`; `Confiança para alto ticket / High-ticket trust`; `Compra e orçamento no mesmo fluxo / Purchase and quote in one flow`.
- Metrics: `+32% Intenção de orçamento estimada / Estimated quote intent`; `+21% Engajamento em produto estimado / Estimated product engagement`; `High-ticket Modelo comercial / Commerce model`.
- Disciplines: Web Design, Frontend, SEO, Performance, Commerce.

### 10. Resilient Construction

- PT title: `Produtos técnicos organizados como soluções para quem constrói.`
- EN title: `Technical products organized as solutions for the people who build.`
- PT summary: `Shopify B2B que aproxima soundproofing, roofing e materiais de construção de uma jornada clara por problema e aplicação.`
- EN summary: `A B2B Shopify experience connecting soundproofing, roofing, and construction materials to a clear journey by problem and application.`
- PT challenge: `Compradores profissionais precisavam compreender aplicação e compatibilidade antes de comparar preço ou adicionar produtos ao carrinho.`
- EN challenge: `Professional buyers needed to understand application and compatibility before comparing price or adding products to cart.`
- PT strategy: `Priorizamos soluções e uso no mundo real, mantendo especificações, variantes e compra acessíveis sem sobrecarregar a navegação.`
- EN strategy: `We prioritized solutions and real-world use while keeping specifications, variants, and purchasing accessible without overloading navigation.`
- PT execution: `O Shopify recebeu arquitetura B2B, templates de solução e produto, conteúdo técnico, SEO e otimização mobile.`
- EN execution: `Shopify received B2B architecture, solution and product templates, technical content, SEO, and mobile optimization.`
- Highlights: `Arquitetura por solução / Solution-led architecture`; `Especificação antes da compra / Specification before purchase`; `Jornada B2B responsiva / Responsive B2B journey`.
- Metrics: `+25% Descoberta de soluções estimada / Estimated solution discovery`; `+18% Engajamento técnico estimado / Estimated technical engagement`; `B2B Modelo comercial / Commerce model`.
- Disciplines: Web Design, Frontend, SEO, Performance, Commerce.

### 11. Lowkey Stock

- PT title: `A energia dos drops transformada em uma loja rápida para colecionadores.`
- EN title: `The energy of drops turned into a fast storefront for collectors.`
- PT summary: `Shopify para trading cards com descoberta rápida de estoque, categorias de coleção, lançamentos limitados e experiência mobile.`
- EN summary: `A Shopify storefront for trading cards with fast stock discovery, collector categories, limited drops, and a mobile-first experience.`
- PT challenge: `Estoque volátil, múltiplos universos e compras por impulso pediam uma navegação veloz sem perder identidade de comunidade.`
- EN challenge: `Volatile inventory, multiple universes, and impulse purchases demanded fast navigation without losing community identity.`
- PT strategy: `Construímos a experiência em torno de novidades, categorias, drops e sinais de escassez, mantendo acesso rápido ao catálogo.`
- EN strategy: `We built the experience around new stock, categories, drops, and scarcity signals while keeping catalog access immediate.`
- PT execution: `A entrega Shopify combinou direção visual, merchandising, filtros, quick add, otimização mobile e performance.`
- EN execution: `The Shopify delivery combined visual direction, merchandising, filters, quick add, mobile optimization, and performance.`
- Highlights: `Drops como narrativa / Drops as narrative`; `Descoberta por coleção / Discovery by collection`; `Compra mobile rápida / Fast mobile purchase`.
- Metrics: `+29% Descoberta mobile estimada / Estimated mobile discovery`; `+17% Cliques em drops estimados / Estimated drop clicks`; `Semanal Cadência de drops / Drop cadence`.
- Disciplines: Web Design, Frontend, Performance, Commerce.

### 12. Celine Medspas

- PT title: `Uma jornada premium que transforma interesse em consulta.`
- EN title: `A premium journey that turns interest into consultation.`
- PT summary: `WordPress bilíngue para descoberta de tratamentos, duas localizações, autoridade médica, prova de resultados e agendamento.`
- EN summary: `A bilingual WordPress experience for treatment discovery, two locations, medical authority, result proof, and booking.`
- PT challenge: `Serviços complexos e sensíveis precisavam ser explicados com clareza, confiança e um caminho curto até a consulta.`
- EN challenge: `Complex, sensitive services had to be explained with clarity, trust, and a short path to consultation.`
- PT strategy: `Organizamos tratamentos por necessidade, conectamos autoridade clínica e before/after e criamos um finder para reduzir indecisão.`
- EN strategy: `We organized treatments by need, connected clinical authority and before/after proof, and created a finder to reduce uncertainty.`
- PT execution: `O WordPress reuniu templates de tratamento, conteúdo EN/ES, multi-location, booking, performance, SEO local e responsividade.`
- EN execution: `WordPress brought together treatment templates, EN/ES content, multi-location booking, performance, local SEO, and responsiveness.`
- Highlights: `Finder de tratamentos / Treatment finder`; `Autoridade e prova clínica / Clinical authority and proof`; `Conversão multi-location / Multi-location conversion`.
- Metrics: `+34% Intenção de agendamento estimada / Estimated booking intent`; `+27% Conclusão do finder estimada / Estimated finder completion`; `2 Localizações / Locations`.
- Disciplines: Web Design, Frontend, SEO, Performance.

### 13. Nuro Club

- PT title: `Acesso direto e discreto para uma experiência digital exclusiva.`
- EN title: `Direct, discreet access for an exclusive digital experience.`
- PT summary: `Experiência WordPress de entrada autenticada, reduzida ao essencial para orientar membros com clareza e segurança.`
- EN summary: `A WordPress authenticated entry experience reduced to the essentials to guide members with clarity and confidence.`
- PT challenge: `Uma interface de acesso precisa comunicar exclusividade e confiança sem adicionar fricção ao momento de login.`
- EN challenge: `An access interface must communicate exclusivity and trust without adding friction to the login moment.`
- PT strategy: `Reduzimos a jornada pública ao objetivo principal, priorizando hierarquia, legibilidade, feedback e comportamento responsivo.`
- EN strategy: `We reduced the public journey to its primary purpose, prioritizing hierarchy, readability, feedback, and responsive behavior.`
- PT execution: `A implementação WordPress concentrou autenticação, estados de formulário, segurança percebida, acessibilidade e performance de entrada.`
- EN execution: `The WordPress implementation focused on authentication, form states, perceived security, accessibility, and entry performance.`
- Highlights: `Entrada sem distrações / Distraction-free entry`; `Estados claros de autenticação / Clear authentication states`; `Experiência gated responsiva / Responsive gated experience`.
- Metrics: `+22% Conclusão de acesso estimada / Estimated access completion`; `−31% Fricção de entrada estimada / Estimated entry friction`; `Gated Modelo de acesso / Access model`.
- Disciplines: Web Design, Frontend, Performance.

### 14. Arctic Fox

- PT title: `Comércio headless para uma marca que vive de cor, conteúdo e velocidade.`
- EN title: `Headless commerce for a brand powered by color, content, and speed.`
- PT summary: `Storefront Vue conectado ao Shopify para merchandising visual, localização, conteúdo editorial e jornadas rápidas de produto.`
- EN summary: `A Vue storefront connected to Shopify for visual merchandising, localization, editorial content, and fast product journeys.`
- PT challenge: `Uma identidade visual intensa e campanhas frequentes precisavam conviver com catálogo, localização e performance frontend.`
- EN challenge: `A bold visual identity and frequent campaigns had to coexist with catalog, localization, and frontend performance.`
- PT strategy: `Separamos experiência e commerce para dar liberdade editorial ao frontend sem perder operações, catálogo e checkout do Shopify.`
- EN strategy: `We separated experience from commerce to give the frontend editorial freedom without losing Shopify operations, catalog, and checkout.`
- PT execution: `O Vue Storefront recebeu componentes de campanha, integração de catálogo, rotas localizadas, conteúdo e otimização de carregamento.`
- EN execution: `Vue Storefront received campaign components, catalog integration, localized routes, content, and load optimization.`
- Highlights: `Frontend e commerce desacoplados / Decoupled frontend and commerce`; `Merchandising visual modular / Modular visual merchandising`; `Localização com performance / Localization with performance`.
- Metrics: `+26% Conversão localizada estimada / Estimated localized conversion`; `−24% Tempo de interação estimado / Estimated interaction time`; `Headless Arquitetura / Architecture`.
- Disciplines: Web Design, Frontend, SEO, Performance, Commerce.

---

### Task 1: Add the typed bilingual case catalog

**Files:**
- Create: `src/lib/cases.ts`
- Test: `tests/smoke.spec.ts`

- [ ] **Step 1: Write the failing catalog integrity test**

Add the import and test:

```ts
import { cases, caseText, disciplineLabels } from '../src/lib/cases';

test('portfolio case catalog is complete and internally valid', () => {
  expect(cases).toHaveLength(14);
  expect(new Set(cases.map(item => item.id)).size).toBe(14);
  expect(new Set(cases.map(item => item.sourceUrl)).size).toBe(14);
  expect(cases.filter(item => item.featured).map(item => item.client)).toEqual([
    'Dove',
    'MINI Finance Matcher',
    'Arctic Fox Hair Color',
  ]);

  const ids = new Set(cases.map(item => item.id));
  for (const item of cases) {
    expect(caseText(item.title, 'pt').length).toBeGreaterThan(20);
    expect(caseText(item.title, 'en').length).toBeGreaterThan(20);
    expect(caseText(item.summary, 'pt').length).toBeGreaterThan(40);
    expect(caseText(item.summary, 'en').length).toBeGreaterThan(40);
    expect(caseText(item.summary, 'pt').length).toBeLessThanOrEqual(200);
    expect(caseText(item.summary, 'en').length).toBeLessThanOrEqual(200);
    expect(item.highlights).toHaveLength(3);
    expect(item.metrics).toHaveLength(3);
    expect(item.metrics.every(metric => ['scope', 'estimated'].includes(metric.evidence))).toBe(true);
    expect(item.disciplines.every(discipline => disciplineLabels[discipline])).toBe(true);
    expect(item.relatedCaseIds.every(id => ids.has(id))).toBe(true);
  }
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "portfolio case catalog" --project=chromium-desktop --workers=1
```

Expected: build fails because `src/lib/cases.ts` does not exist.

- [ ] **Step 3: Create the model and localization helper**

Start `src/lib/cases.ts` with:

```ts
export type CaseLang = 'pt' | 'en';
export type LocalizedText = Record<CaseLang, string>;
export type CasePlatform = 'AEM' | 'React' | 'Shopify' | 'WordPress' | 'Headless Commerce';
export type CaseModule = 'globalProgram' | 'decisionTool' | 'commerce' | 'multiLocation' | 'gatedExperience' | 'headlessCommerce';

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
```

- [ ] **Step 4: Populate all fourteen entries**

Use the editorial matrix exactly. Apply these shared field rules:

```ts
const unileverAttribution = text(
  'Trabalho realizado em equipe via agência parceira para a Unilever.',
  'Work delivered as part of an agency partner team for Unilever.',
);

const estimatedNote = text(
  'Estimativa indicativa baseada no escopo e na experiência entregue.',
  'Indicative estimate based on project scope and the delivered experience.',
);

const scopeNote = text(
  'Característica verificável do projeto.',
  'Verifiable project attribute.',
);

const media = (id: string, client: string) => ({
  heroImage: {
    src: `/cases/${id}/hero.jpg`,
    alt: text(`Página inicial do projeto ${client}`, `${client} project homepage`),
  },
  gallery: [{
    src: `/cases/${id}/mobile.jpg`,
    alt: text(`Experiência mobile do projeto ${client}`, `${client} project mobile experience`),
  }],
});

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
      { value: '+28%', label: text('Visibilidade orgânica estimada', 'Estimated organic visibility'), note: text('Potencial de crescimento após a nova fundação técnica.', 'Potential growth after the new technical foundation.'), evidence: 'estimated' },
      { value: '−34%', label: text('Esforço de manutenção estimado', 'Estimated maintenance effort'), note: text('Redução indicativa com componentes compartilhados.', 'Indicative reduction from shared components.'), evidence: 'estimated' },
      { value: 'Global', label: text('Alcance do programa', 'Program reach'), note: text('Fundação preparada para múltiplos mercados.', 'Foundation prepared for multiple markets.'), evidence: 'scope' },
    ],
    ...media('dove-global-aem', 'Dove'),
    relatedCaseIds: [],
    attribution: unileverAttribution,
  },
];
```

The Dove record above is the exact object shape. Add the remaining thirteen records in inventory order using every exact localized string, highlight, metric, discipline, URL, accent, and module from the editorial matrix. Do not shorten or reuse another brand's body copy. Use these exact structural fields:

| Case | `group` | `featured` | `market` PT / EN | `scope` PT / EN | `supportModel` PT / EN |
| --- | --- | --- | --- | --- | --- |
| Seda | `unilever` | `false` | Brasil / Brazil | Entrega end-to-end / End-to-end delivery | Suporte contínuo / Ongoing support |
| Degree | `unilever` | `false` | Estados Unidos / United States | Entrega end-to-end / End-to-end delivery | Suporte contínuo / Ongoing support |
| Rexona | `unilever` | `false` | Brasil / Brazil | Entrega end-to-end / End-to-end delivery | Suporte contínuo / Ongoing support |
| TRESemmé | `unilever` | `false` | Estados Unidos / United States | Entrega end-to-end / End-to-end delivery | Suporte contínuo / Ongoing support |
| Magnum | `unilever` | `false` | Global / Global | Plataforma corporativa / Corporate platform | Suporte contínuo / Ongoing support |
| AXE | `unilever` | `false` | Estados Unidos / United States | Entrega end-to-end / End-to-end delivery | Suporte contínuo / Ongoing support |
| MINI | `independent` | `true` | Reino Unido / United Kingdom | Ferramenta de decisão / Decision tool | Entrega de produto / Product delivery |
| Avary | `independent` | `false` | América do Norte / North America | E-commerce high-ticket / High-ticket commerce | Evolução de loja / Store evolution |
| Resilient | `independent` | `false` | Estados Unidos / United States | E-commerce B2B / B2B commerce | Entrega e evolução / Delivery and evolution |
| Lowkey | `independent` | `false` | Estados Unidos / United States | E-commerce de colecionáveis / Collectibles commerce | Entrega e evolução / Delivery and evolution |
| Celine | `independent` | `false` | Califórnia / California | Geração de leads / Lead generation | Duas localizações / Two locations |
| Nuro | `independent` | `false` | Global / Global | Experiência gated / Gated experience | Acesso autenticado / Authenticated access |
| Arctic Fox | `independent` | `true` | Brasil / Brazil | Commerce headless / Headless commerce | Storefront localizado / Localized storefront |

For every remaining metric, use `estimatedNote` on the first two and `scopeNote` on the third. Use `scope` only for the third metric and `estimated` for the first two. Set `relatedCaseIds: ['rexona-brasil-aem']` on Degree, `relatedCaseIds: ['degree-us-aem']` on Rexona, and `relatedCaseIds: []` everywhere else. Add `attribution: unileverAttribution` to each of the seven `unilever` records and omit it from independent records.

Use these accents and module values directly in each record; do not keep a separate runtime lookup:

```ts
const catalogDefaults = {
  'dove-global-aem': ['#79C6FF', 'globalProgram'],
  'seda-brasil-aem': ['#F2C94C', 'globalProgram'],
  'degree-us-aem': ['#63B3ED', 'globalProgram'],
  'rexona-brasil-aem': ['#00AEEF', 'globalProgram'],
  'tresemme-us-aem': ['#C9A96E', 'globalProgram'],
  'magnum-corporate-aem': ['#E4312B', 'globalProgram'],
  'axe-us-aem': ['#7CE0D3', 'globalProgram'],
  'mini-finance-matcher-react': ['#E94B35', 'decisionTool'],
  'avary-drone-shopify': ['#E8792E', 'commerce'],
  'resilient-construction-shopify': ['#7EB36A', 'commerce'],
  'lowkey-stock-shopify': ['#D946EF', 'commerce'],
  'celine-medspas-wordpress': ['#D4B8A6', 'multiLocation'],
  'nuro-club-wordpress': ['#A78BFA', 'gatedExperience'],
  'arctic-fox-headless-commerce': ['#FF4DA6', 'headlessCommerce'],
} as const;
```

- [ ] **Step 5: Run the catalog test and build**

Run:

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "portfolio case catalog" --project=chromium-desktop --workers=1
git diff --check
```

Expected: build passes, the catalog test passes once, and diff check is clean.

- [ ] **Step 6: Commit**

```powershell
git add src/lib/cases.ts tests/smoke.spec.ts
git commit -m "feat: add real portfolio case data"
```

### Task 2: Capture and validate local case media

**Files:**
- Create: `scripts/capture-case-assets.mjs`
- Create: `public/cases/*/hero.jpg`
- Create: `public/cases/*/mobile.jpg`
- Modify: `package.json`
- Test: `tests/smoke.spec.ts`

- [ ] **Step 1: Add the failing local-media test**

Add `existsSync` as a new `node:fs` import and merge `join` into the existing `node:path` import:

```ts
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

test('portfolio case media is stored locally', () => {
  for (const item of cases) {
    for (const image of [item.heroImage, ...item.gallery]) {
      expect(image.src).toMatch(/^\/cases\/.+\.(jpg|png|webp|svg)$/);
      expect(existsSync(join(process.cwd(), 'public', image.src.slice(1)))).toBe(true);
    }
  }
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "portfolio case media" --project=chromium-desktop --workers=1
```

Expected: FAIL because the new JPEG files do not exist.

- [ ] **Step 3: Add the repeatable capture script**

Create `scripts/capture-case-assets.mjs`:

```js
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const sites = [
  ['dove-global-aem', 'https://www.dove.com/us/en/home.html'],
  ['seda-brasil-aem', 'https://www.seda.com.br/'],
  ['degree-us-aem', 'https://www.degreedeodorant.com/us/en/home.html'],
  ['rexona-brasil-aem', 'https://www.rexona.com/br/home.html'],
  ['tresemme-us-aem', 'https://www.tresemme.com/us/en/home.html'],
  ['magnum-corporate-aem', 'https://corporate.magnumicecream.com/en/home.html'],
  ['axe-us-aem', 'https://www.axe.com/us/en/home.html'],
  ['mini-finance-matcher-react', 'https://financecalculator.mini.co.uk/tool/'],
  ['avary-drone-shopify', 'https://avarydrone.com/'],
  ['resilient-construction-shopify', 'https://useresilient.com/'],
  ['lowkey-stock-shopify', 'https://lowkeystock.com/'],
  ['celine-medspas-wordpress', 'https://www.celinemedspas.com/'],
  ['nuro-club-wordpress', 'https://nuroclub.com/'],
  ['arctic-fox-headless-commerce', 'https://www.arcticfoxhaircolor.com/en-br'],
];

const consentLabels = ['Accept all', 'Accept All Cookies', 'Aceitar todos', 'Allow all', 'I agree'];
const browser = await chromium.launch();

try {
  for (const [id, url] of sites) {
    const directory = `public/cases/${id}`;
    await mkdir(directory, { recursive: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });

    for (const label of consentLabels) {
      const button = page.getByRole('button', { name: label, exact: false });
      if (await button.count()) {
        await button.first().click({ timeout: 2_000 }).catch(() => undefined);
        break;
      }
    }

    await page.waitForTimeout(2_000);
    await page.screenshot({ path: `${directory}/hero.jpg`, type: 'jpeg', quality: 82 });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload({ waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForTimeout(1_500);
    await page.screenshot({ path: `${directory}/mobile.jpg`, type: 'jpeg', quality: 82 });
    await page.close();
  }
} finally {
  await browser.close();
}
```

Add to `package.json`:

```json
"capture:cases": "node scripts/capture-case-assets.mjs"
```

- [ ] **Step 4: Capture and inspect all media**

Run:

```powershell
npm.cmd run capture:cases
Get-ChildItem public/cases -Recurse -File | Measure-Object
```

Expected: 28 JPEG files. Inspect all hero files and the five representative mobile files (Dove, MINI, Avary, Celine, Arctic Fox). If a consent overlay remains, add only that site's visible consent label to `consentLabels` and rerun the script.

- [ ] **Step 5: Run the media test**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "portfolio case media" --project=chromium-desktop --workers=1
git diff --check
```

Expected: PASS once; clean diff check.

- [ ] **Step 6: Commit**

```powershell
git add package.json scripts/capture-case-assets.mjs public/cases tests/smoke.spec.ts
git commit -m "chore: add real case screenshots"
```

### Task 3: Rebuild the cases index and homepage preview

**Files:**
- Modify: `src/components/CasePreview.tsx`
- Modify: `src/components/CasesPage.tsx:1-285`
- Modify: `src/styles/main.scss`
- Test: `tests/smoke.spec.ts`

- [ ] **Step 1: Add failing index and preview tests**

```ts
test('homepage shows the three configured portfolio features', async ({ page }) => {
  await page.goto('/');
  const preview = page.locator('[data-case-preview]');
  await expect(preview).toHaveCount(3);
  await expect(preview.getByText('Dove', { exact: true })).toBeVisible();
  await expect(preview.getByText('MINI Finance Matcher', { exact: true })).toBeVisible();
  await expect(preview.getByText('Arctic Fox Hair Color', { exact: true })).toBeVisible();
});

test('cases index filters by platform and discipline and recovers from empty results', async ({ page }) => {
  await page.goto('/cases');
  await expect(page.locator('[data-case-card]')).toHaveCount(14);

  await page.getByRole('button', { name: 'Shopify', exact: true }).click();
  await expect(page.locator('[data-case-card]')).toHaveCount(3);

  await page.getByRole('button', { name: 'Commerce', exact: true }).click();
  await expect(page.locator('[data-case-card]')).toHaveCount(3);

  await page.getByRole('button', { name: 'React', exact: true }).click();
  await expect(page.getByText('Nenhum projeto combina com esses filtros.')).toBeVisible();
  await page.getByRole('button', { name: 'Limpar filtros' }).click();
  await expect(page.locator('[data-case-card]')).toHaveCount(14);
});
```

- [ ] **Step 2: Run targeted tests and verify RED**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "portfolio features|filters by platform" --workers=1
```

Expected: four failures across the two browser projects because hooks and filters do not exist.

- [ ] **Step 3: Localize and render featured previews**

In `CasePreview.tsx`, switch the import to `../lib/cases` and replace `cases.slice(0, 3)` with:

```ts
const preview = cases.filter(item => item.featured);
```

Add `data-case-preview` to each preview link. Replace legacy fields:

```tsx
<img src={item.heroImage.src} alt={caseText(item.heroImage.alt, lang)} />
<div className="tag">{item.platform}</div>
<span>{caseText(item.market, lang)}</span>
<div>{item.client}</div>
<h3>{caseText(item.title, lang)}</h3>
```

Do not show estimated metrics on homepage/index cards because the disclosure would be separated from the claim. Keep metrics on detail pages only.

Update the preview intro copy to describe selected real work rather than audited results.

- [ ] **Step 4: Implement two filter groups on the index**

Keep the old detail compiling for one task by using explicit aliases at the top of `CasesPage.tsx`:

```ts
import { cases as legacyCases } from '../lib/data';
import { cases as portfolioCases, caseText } from '../lib/cases';
```

Use `portfolioCases` throughout `CasesPage` and rename only the old `CaseDetailPage` references to `legacyCases`. Task 4 removes this temporary alias and the fictional data.

Delete the old single-group `FilterBar`, `tagColors`, `activeFilter`, and `allTags`; their behavior is replaced completely by the two filter groups below.

Use these state values and AND filter:

```ts
const platforms = ['AEM', 'React', 'Shopify', 'WordPress', 'Headless Commerce'] as const;
const disciplines = ['Web Design', 'Frontend', 'SEO', 'GEO', 'Performance', 'Commerce', 'Support'] as const;
const [platform, setPlatform] = useState<string>('All');
const [discipline, setDiscipline] = useState<string>('All');

const filtered = portfolioCases.filter(item =>
  (platform === 'All' || item.platform === platform) &&
  (discipline === 'All' || item.disciplines.includes(discipline)),
);
```

Each filter button uses:

```tsx
<button
  type="button"
  aria-pressed={active === value}
  onClick={() => onChange(value)}
>
  {localizedLabel}
</button>
```

Render `data-case-card` on case links. Use `caseText` for all localized case fields. Replace the hero metrics with `14`, `5`, and `Global + local`. When `filtered.length === 0`, render the exact Portuguese/English empty message plus a button that resets both filters.

Update the existing mobile index assertion from `2025–26` to `Global + local`; retain the viewport-right-edge assertion.

- [ ] **Step 5: Add shared index CSS**

Add named classes instead of new selector-by-inline-style rules:

```scss
.case-filter-groups { display: grid; gap: 20px; }
.case-filter-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.case-filter-label { min-width: 84px; color: var(--text-dim); font-size: 11px; text-transform: uppercase; letter-spacing: .1em; }
.case-empty { padding: 64px 24px; text-align: center; border: 1px solid var(--border-dim); }

@media (max-width: 520px) {
  .case-filter-row { align-items: flex-start; }
  .case-filter-label { width: 100%; }
}
```

- [ ] **Step 6: Run targeted tests and checks**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "portfolio features|filters by platform" --workers=1
npm.cmd run lint
git diff --check
```

Expected: four passes, lint clean, diff clean.

- [ ] **Step 7: Commit**

```powershell
git add src/components/CasePreview.tsx src/components/CasesPage.tsx src/styles/main.scss tests/smoke.spec.ts
git commit -m "feat: rebuild portfolio case index"
```

### Task 4: Build the shared conversion-focused case detail

**Files:**
- Create: `src/components/CaseDetailPage.tsx`
- Modify: `src/components/CasesPage.tsx:286-468`
- Modify: `src/lib/data.ts:1-92`
- Modify: `src/App.tsx:14,33-36`
- Modify: `src/styles/main.scss`
- Test: `tests/smoke.spec.ts`

- [ ] **Step 1: Add failing detail behavior tests**

```ts
test('AEM case discloses attribution and estimated impact', async ({ page }) => {
  await page.goto('/cases/dove-global-aem');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('beleza real');
  await expect(page.getByText('Trabalho realizado em equipe via agência parceira para a Unilever.')).toBeVisible();
  await expect(page.getByText('Impacto indicativo — estimativas não auditadas')).toBeVisible();
  const external = page.getByRole('link', { name: 'Visitar website' });
  await expect(external).toHaveAttribute('href', 'https://www.dove.com/us/en/home.html');
  await expect(external).toHaveAttribute('target', '_blank');
  await expect(external).toHaveAttribute('rel', 'noopener noreferrer');
});

test('regional brand cases cross-link Degree and Rexona', async ({ page }) => {
  await page.goto('/cases/degree-us-aem');
  await expect(page.getByRole('link', { name: /Rexona Brasil/ })).toHaveAttribute('href', '/cases/rexona-brasil-aem');
});

test('case modules expose project-specific proof', async ({ page }) => {
  await page.goto('/cases/mini-finance-matcher-react');
  await expect(page.locator('[data-case-module="decisionTool"]')).toBeVisible();
  await page.goto('/cases/nuro-club-wordpress');
  await expect(page.locator('[data-case-module="gatedExperience"]')).toBeVisible();
});

test('case detail follows the language selector', async ({ page }) => {
  await page.goto('/cases/arctic-fox-headless-commerce');
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Headless commerce');
  await expect(page.getByText('Indicative impact — unaudited estimates')).toBeVisible();
});
```

- [ ] **Step 2: Run targeted tests and verify RED**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "AEM case|regional brand|project-specific proof|language selector" --workers=1
```

Expected: eight failures across both projects because the old detail has no new content or hooks.

- [ ] **Step 3: Extract the detail component**

Move `CaseDetailPage` out of `CasesPage.tsx`. Update `App.tsx`:

```ts
import { CasesPage } from './components/CasesPage';
import { CaseDetailPage } from './components/CaseDetailPage';
```

In the new file, resolve the case and related cases once:

```ts
import { cases, caseText, disciplineLabels, type PortfolioCase } from '../lib/cases';

const item = cases.find(candidate => candidate.id === id);
const currentIndex = cases.findIndex(candidate => candidate.id === id);
const nextCase = cases[(currentIndex + 1) % cases.length];
const related = item?.relatedCaseIds
  .map(relatedId => cases.find(candidate => candidate.id === relatedId))
  .filter((candidate): candidate is PortfolioCase => Boolean(candidate));
```

Keep the existing not-found view for `!item`.

Localize the not-found sentence and back link from `lang` instead of retaining the old English-only strings.

Delete the old fictional `cases` export from `src/lib/data.ts`, remove the `legacyCases` import from `CasesPage.tsx`, and keep the blog `posts` export unchanged.

Update the existing smoke route from `/cases/techbrasil-seo` to `/cases/dove-global-aem`. Update the existing mobile detail overflow check to visit Dove and target `.portfolio-case-meta` instead of `.case-meta-list`.

- [ ] **Step 4: Render the shared narrative structure**

Render semantic sections in the approved order using `caseText`. Use these stable classes/hooks:

```tsx
const hideBrokenImage: React.ReactEventHandler<HTMLImageElement> = event => {
  event.currentTarget.hidden = true;
};

<article className="portfolio-case" style={{ '--case-accent': item.accent } as React.CSSProperties}>
  <header className="portfolio-case-hero">
    <Link to="/cases">{ui.back}</Link>
    <p>{item.platform} · {caseText(item.market, lang)}</p>
    <h1>{caseText(item.title, lang)}</h1>
    <p>{caseText(item.summary, lang)}</p>
    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">{ui.visit}</a>
    {item.attribution && <p>{caseText(item.attribution, lang)}</p>}
  </header>

  <dl className="portfolio-case-meta">
    {[
      [ui.platform, item.platform],
      [ui.scope, caseText(item.scope, lang)],
      [ui.market, caseText(item.market, lang)],
      [ui.support, caseText(item.supportModel, lang)],
    ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
  </dl>

  <div className="portfolio-case-image-frame portfolio-case-hero-image">
    <img src={item.heroImage.src} alt={caseText(item.heroImage.alt, lang)} onError={hideBrokenImage} />
  </div>

  <div className="portfolio-case-body">
    <section data-case-section="challenge"><h2>{ui.challenge}</h2><p>{caseText(item.challenge, lang)}</p></section>
    <section data-case-section="strategy"><h2>{ui.strategy}</h2><p>{caseText(item.strategy, lang)}</p></section>
    <section data-case-section="execution"><h2>{ui.execution}</h2><p>{caseText(item.execution, lang)}</p></section>

    <section className="portfolio-case-highlights">
      <h2>{ui.highlights}</h2>
      <ul>{item.highlights.map(value => <li key={caseText(value, lang)}>{caseText(value, lang)}</li>)}</ul>
    </section>

    <section className="portfolio-case-gallery">
      {item.gallery.map(image => (
        <div key={image.src} className="portfolio-case-image-frame">
          <img src={image.src} alt={caseText(image.alt, lang)} onError={hideBrokenImage} />
        </div>
      ))}
    </section>

    <section>
      <p>{ui.impactDisclosure}</p>
      <div className="portfolio-case-impact">
        {item.metrics.map(metric => (
          <div key={caseText(metric.label, lang)}><strong>{metric.value}</strong><h3>{caseText(metric.label, lang)}</h3><p>{caseText(metric.note, lang)}</p></div>
        ))}
      </div>
    </section>

    <section><h2>{ui.services}</h2><ul>{item.disciplines.map(value => <li key={value}>{caseText(disciplineLabels[value], lang)}</li>)}</ul></section>
    <aside data-case-module={item.module}><h2>{moduleCopy[item.module][lang][0]}</h2><p>{moduleCopy[item.module][lang][1]}</p></aside>

    {related.length > 0 && <section className="portfolio-case-related"><h2>{ui.related}</h2>{related.map(value => <Link key={value.id} to={`/cases/${value.id}`}>{value.client}</Link>)}</section>}
    <section className="portfolio-case-cta"><h2>{ui.ctaTitle}</h2><Link to="/#contact" className="btn-gold">{ui.ctaButton}</Link></section>
  </div>

  <Link to={`/cases/${nextCase.id}`} className="portfolio-case-next">{ui.next}: {nextCase.client}</Link>
</article>
```

Define the exact localized labels before rendering:

```ts
const ui = {
  pt: {
    back: '← Voltar para Cases',
    visit: 'Visitar website',
    platform: 'Plataforma',
    scope: 'Escopo',
    market: 'Mercado',
    support: 'Modelo de suporte',
    challenge: 'O desafio',
    strategy: 'A estratégia',
    execution: 'A execução',
    highlights: 'Destaques da entrega',
    impactDisclosure: 'Impacto indicativo — estimativas não auditadas',
    services: 'Disciplinas',
    related: 'Projeto relacionado',
    ctaTitle: 'Precisa de uma experiência pronta para converter e escalar?',
    ctaButton: 'Iniciar projeto',
    next: 'Próximo case',
  },
  en: {
    back: '← Back to Cases',
    visit: 'Visit website',
    platform: 'Platform',
    scope: 'Scope',
    market: 'Market',
    support: 'Support model',
    challenge: 'The challenge',
    strategy: 'The strategy',
    execution: 'The execution',
    highlights: 'Delivery highlights',
    impactDisclosure: 'Indicative impact — unaudited estimates',
    services: 'Disciplines',
    related: 'Related project',
    ctaTitle: 'Need an experience built to convert and scale?',
    ctaButton: 'Start a project',
    next: 'Next case',
  },
}[lang];
```

Wrap every screenshot in a `.portfolio-case-image-frame` and hide only the failed image so the frame's accent gradient remains visible, as shown in the full markup above. The handler must only set `event.currentTarget.hidden = true`; it must not mutate case data or fetch a remote fallback.

```tsx
<div className="portfolio-case-image-frame">
  <img
    src={image.src}
    alt={caseText(image.alt, lang)}
    onError={hideBrokenImage}
  />
</div>
```

The external link is:

```tsx
<a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
  {lang === 'pt' ? 'Visitar website' : 'Visit website'}
</a>
```

Show the estimate disclosure if `item.metrics.some(metric => metric.evidence === 'estimated')`. Render attribution only when present. Render related links only when `related.length > 0`.

Render the service list from `item.disciplines` through `disciplineLabels[discipline]` and `caseText`; do not duplicate localized service strings in case records.

- [ ] **Step 5: Render a specific optional module without custom components**

Use one localized copy map keyed by `CaseModule`:

```ts
const moduleCopy = {
  globalProgram: { pt: ['Programa global', 'Uma base compartilhada com execução sensível a cada mercado.'], en: ['Global program', 'A shared foundation with market-aware execution.'] },
  decisionTool: { pt: ['Fluxo de decisão', 'Preferências → contexto → recomendação de produto financeiro.'], en: ['Decision flow', 'Preferences → context → finance product recommendation.'] },
  commerce: { pt: ['Jornada de commerce', 'Descoberta → confiança → produto → compra ou orçamento.'], en: ['Commerce journey', 'Discovery → trust → product → purchase or quote.'] },
  multiLocation: { pt: ['Conversão local', 'Necessidade → tratamento → localização → agendamento.'], en: ['Local conversion', 'Need → treatment → location → booking.'] },
  gatedExperience: { pt: ['Acesso autenticado', 'Entrada → validação → acesso ao ambiente privado.'], en: ['Authenticated access', 'Entry → validation → private environment access.'] },
  headlessCommerce: { pt: ['Arquitetura headless', 'Vue Storefront → APIs de catálogo → checkout Shopify.'], en: ['Headless architecture', 'Vue Storefront → catalog APIs → Shopify checkout.'] },
} as const;
```

Do not invent screenshots of Nuro's private area; its gallery contains only the public entry screen.

- [ ] **Step 6: Add responsive AUREON styling**

Add shared classes with the current visual tokens:

```scss
.portfolio-case { --case-accent: var(--gold); }
.portfolio-case-hero { position: relative; overflow: hidden; padding: 96px 32px 64px; background: var(--void); }
.portfolio-case-hero::after { content: ''; position: absolute; width: 420px; height: 420px; right: -120px; top: -160px; border-radius: 50%; background: var(--case-accent); filter: blur(100px); opacity: .16; pointer-events: none; }
.portfolio-case-meta { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-block: 1px solid var(--border-dim); }
.portfolio-case-meta > div { min-width: 0; padding: 20px 24px; border-right: 1px solid var(--border-dim); }
.portfolio-case-hero-image { width: min(1280px, calc(100% - 48px)); margin: 56px auto; aspect-ratio: 16 / 10; }
.portfolio-case-image-frame { min-height: 240px; background: linear-gradient(135deg, var(--surface), var(--case-accent)); border: 1px solid var(--border-dim); overflow: hidden; }
.portfolio-case-image-frame img { display: block; width: 100%; height: 100%; object-fit: cover; }
.portfolio-case-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.portfolio-case-gallery img { width: 100%; height: 100%; object-fit: cover; border: 1px solid var(--border-dim); }
.portfolio-case-impact { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2px; }
.portfolio-case [data-case-module] { border: 1px solid var(--border-dim); background: var(--surface); }

@media (max-width: 767px) {
  .portfolio-case-meta,
  .portfolio-case-gallery,
  .portfolio-case-impact { grid-template-columns: 1fr; }
  .portfolio-case-meta > div { border-right: 0; border-bottom: 1px solid var(--border-dim); }
  .portfolio-case-hero-image { width: calc(100% - 32px); margin-block: 32px; }
}
```

- [ ] **Step 7: Run targeted tests and checks**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "AEM case|regional brand|project-specific proof|language selector" --workers=1
npm.cmd run lint
git diff --check
```

Expected: eight passes, lint clean, diff clean.

- [ ] **Step 8: Commit**

```powershell
git add src/components/CaseDetailPage.tsx src/components/CasesPage.tsx src/lib/data.ts src/App.tsx src/styles/main.scss tests/smoke.spec.ts
git commit -m "feat: add conversion-focused case details"
```

### Task 5: Make real cases indexable and update the sitemap

**Files:**
- Modify: `src/lib/seo.ts`
- Modify: `public/sitemap.xml`
- Test: `tests/smoke.spec.ts`

- [ ] **Step 1: Add failing SEO tests**

```ts
test('real case metadata is indexable and uses local social media', () => {
  const meta = resolvePageMeta('/cases/dove-global-aem', 'pt');
  expect(meta.title).toContain('Dove');
  expect(meta.description).toContain('AEM');
  expect(meta.canonical).toBe('https://aureondigital.co/cases/dove-global-aem');
  expect(meta.robots).toBe('index,follow');
  expect(meta.image).toBe('https://aureondigital.co/cases/dove-global-aem/hero.jpg');
});

test('every real case resolves unique indexable metadata', () => {
  const titles = cases.map(item => resolvePageMeta(`/cases/${item.id}`, 'en').title);
  expect(new Set(titles).size).toBe(14);
  for (const item of cases) {
    const meta = resolvePageMeta(`/cases/${item.id}`, 'en');
    expect(meta.robots).toBe('index,follow');
    expect(meta.canonical).toBe(`https://aureondigital.co/cases/${item.id}`);
  }
});
```

- [ ] **Step 2: Run tests and verify RED**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "real case metadata|every real case" --project=chromium-desktop --workers=1
```

Expected: build or tests fail because `PageMeta.image` is absent and known cases are still `noindex,follow`.

- [ ] **Step 3: Derive case metadata from the catalog**

Import `cases` and `caseText`. Extend `PageMeta`:

```ts
export interface PageMeta extends MetaCopy {
  canonical: string;
  locale: 'pt_BR' | 'en_US';
  robots: 'index,follow' | 'noindex,follow';
  type: 'website' | 'article';
  image: string;
  imageAlt: string;
}
```

Give `completeMeta` optional media parameters with the current logo defaults. Replace the case branch with:

```ts
const caseSlug = normalizedPathname.match(/^\/cases\/([^/]+)$/i)?.[1];
if (caseSlug) {
  const item = cases.find(candidate => candidate.id.toLowerCase() === caseSlug.toLowerCase());
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
      `${siteUrl}${item.heroImage.src}`,
      `${item.client} — AUREON portfolio case`,
    );
  }

  return completeMeta(
    {
      title: lang === 'pt' ? 'Case não encontrado | AUREON' : 'Case not found | AUREON',
      description: lang === 'pt' ? 'O case solicitado não foi encontrado.' : 'The requested case could not be found.',
    },
    `/cases/${caseSlug}`,
    lang,
    'noindex,follow',
    'website',
  );
}
```

Use `meta.image` and `meta.imageAlt` in `applyPageMeta`. Update `/cases` copy to describe real projects and transparent indicative impact.

Update the existing mixed-case unknown-case assertion to expect `Case não encontrado | AUREON`; retain `noindex,follow` and canonical normalization for the legacy `techbrasil-seo` slug.

- [ ] **Step 4: Replace sitemap case URLs**

Remove the four fictional `<url>` entries and add the fourteen inventory slugs in inventory order:

```xml
  <url><loc>https://aureondigital.co/cases/dove-global-aem</loc></url>
  <url><loc>https://aureondigital.co/cases/seda-brasil-aem</loc></url>
  <url><loc>https://aureondigital.co/cases/degree-us-aem</loc></url>
  <url><loc>https://aureondigital.co/cases/rexona-brasil-aem</loc></url>
  <url><loc>https://aureondigital.co/cases/tresemme-us-aem</loc></url>
  <url><loc>https://aureondigital.co/cases/magnum-corporate-aem</loc></url>
  <url><loc>https://aureondigital.co/cases/axe-us-aem</loc></url>
  <url><loc>https://aureondigital.co/cases/mini-finance-matcher-react</loc></url>
  <url><loc>https://aureondigital.co/cases/avary-drone-shopify</loc></url>
  <url><loc>https://aureondigital.co/cases/resilient-construction-shopify</loc></url>
  <url><loc>https://aureondigital.co/cases/lowkey-stock-shopify</loc></url>
  <url><loc>https://aureondigital.co/cases/celine-medspas-wordpress</loc></url>
  <url><loc>https://aureondigital.co/cases/nuro-club-wordpress</loc></url>
  <url><loc>https://aureondigital.co/cases/arctic-fox-headless-commerce</loc></url>
```

- [ ] **Step 5: Run SEO tests and builds**

```powershell
npm.cmd run build
npx.cmd playwright test tests/smoke.spec.ts -g "real case metadata|every real case|unknown routes" --project=chromium-desktop --workers=1
npm.cmd run build:pages
git diff --check
```

Expected: SEO tests pass; both builds pass; unknown routes remain non-indexable.

- [ ] **Step 6: Commit**

```powershell
git add src/lib/seo.ts public/sitemap.xml tests/smoke.spec.ts
git commit -m "feat: index real portfolio cases"
```

### Task 6: Add shared route and responsive regression coverage

**Files:**
- Modify: `tests/smoke.spec.ts`

- [ ] **Step 1: Add one route test per case**

```ts
for (const item of cases) {
  test(`renders real case ${item.id}`, async ({ page }) => {
    await page.goto(`/cases/${item.id}`);
    await expect(page.getByText(item.client, { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(caseText(item.title, 'pt'));
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index,follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://aureondigital.co/cases/${item.id}`);
  });
}
```

- [ ] **Step 2: Add responsive samples by platform family**

```ts
for (const slug of [
  'dove-global-aem',
  'mini-finance-matcher-react',
  'avary-drone-shopify',
  'celine-medspas-wordpress',
  'arctic-fox-headless-commerce',
]) {
  test(`mobile real case ${slug} fits the viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/cases/${slug}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBeTruthy();
    await expect(page.locator('.portfolio-case-meta')).toBeVisible();
    await expect(page.locator('.portfolio-case-gallery')).toBeVisible();
    await expect(page.locator('.portfolio-case-impact')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Visitar website' })).toBeVisible();
  });
}
```

- [ ] **Step 3: Run the complete suite**

```powershell
npm.cmd run test:visual
```

Expected: all route and responsive tests pass in Chromium desktop and WebKit mobile. Only the existing `NO_COLOR` warnings may appear.

- [ ] **Step 4: Run static checks and commit**

```powershell
npm.cmd run lint
git diff --check
git add tests/smoke.spec.ts
git commit -m "test: cover real portfolio case routes"
```

### Task 7: Final verification, rendered QA, and handoff

**Files:**
- Modify: `.agent/CONTINUITY.md` (ignored workspace state)
- Verify: all case source, assets, metadata, and tests

- [ ] **Step 1: Run fresh static verification**

```powershell
git diff --check
npm.cmd run lint
npm.cmd run build
if (-not (Test-Path 'dist/.htaccess')) { throw 'Hostinger build is missing .htaccess' }
npm.cmd run build:pages
if (-not (Test-Path 'dist/404.html')) { throw 'Pages build is missing 404.html' }
```

Expected: every command exits 0 and both deployment-specific files exist.

- [ ] **Step 2: Run the full Playwright suite**

```powershell
npm.cmd run test:visual
```

Expected: zero failures in both configured browser projects.

- [ ] **Step 3: Inspect representative rendered pages**

Start the local preview and use the in-app browser:

- `/` at 1440x1200 and 390x844;
- `/cases` at 1440x1200 and 390x844;
- `/cases/dove-global-aem` at desktop/mobile;
- `/cases/mini-finance-matcher-react` at desktop/mobile;
- `/cases/avary-drone-shopify` at mobile;
- `/cases/celine-medspas-wordpress` at mobile;
- `/cases/arctic-fox-headless-commerce` at desktop/mobile.

Confirm real screenshots, AUREON visual dominance, localized copy, attribution, estimate disclosure, filters, external links, metadata, gallery layout, CTA visibility, and absence of horizontal overflow.

- [ ] **Step 4: Verify source claims and media one final time**

Compare the fourteen source URLs and project stacks against the approved design spec. Confirm Nuro shows only the public gated entry, Degree/Rexona cross-link, and all Unilever pages use the agency-partner disclosure.

- [ ] **Step 5: Update continuity**

Record final commit SHAs, test count, build results, rendered QA, any source site that could not be captured, and the explicit fact that no push/deploy occurred.

- [ ] **Step 6: Review branch without remote writes**

```powershell
git status --short
git log -10 --oneline
```

Expected: clean worktree. Do not push or deploy without a new explicit user instruction.
