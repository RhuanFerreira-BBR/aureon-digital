export type BlogLang = 'pt' | 'en';

export type BlogInlineLink = { label: string; caseId: string };

export type BlogBlock =
  | { kind: 'heading'; id: string; text: string }
  | { kind: 'paragraph'; text: string; links?: BlogInlineLink[] }
  | { kind: 'callout'; label: string; text: string }
  | { kind: 'checklist'; label: string; items: string[] }
  | { kind: 'cta'; label: string; title: string; text: string; button: string }
  | { kind: 'case'; caseId: string }
  | { kind: 'sources'; label: string };

export interface BlogLocale {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
  blocks: BlogBlock[];
}

export interface BlogPost {
  id: string;
  featured: boolean;
  accent: string;
  image: string;
  published: string;
  modified: string;
  author: string;
  relatedCaseId: string;
  serviceHref: string;
  sources: Array<{ label: string; url: string }>;
  locales: Record<BlogLang, BlogLocale>;
}

const peopleFirstSource = {
  label: 'Google Search Central — People-first content',
  url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content',
};

const webVitalsSource = {
  label: 'web.dev — Web Vitals',
  url: 'https://web.dev/articles/vitals?hl=en',
};

export const posts: BlogPost[] = [
  {
    id: 'website-conversion',
    featured: true,
    accent: '#D4AF37',
    image: '/blog/site-conversion.svg',
    published: '2026-07-05',
    modified: '2026-07-05',
    author: 'AUREON',
    relatedCaseId: 'mini-finance-matcher-react',
    serviceHref: '/#contact',
    sources: [peopleFirstSource],
    locales: {
      pt: {
        slug: 'site-que-converte',
        category: 'Conversão',
        title: 'Seu site recebe visitas, mas não gera oportunidades?',
        excerpt:
          'Um diagnóstico prático para transformar tráfego em decisões claras, reduzir fricção e criar caminhos de conversão que respeitam a jornada do cliente.',
        readTime: '8 min de leitura',
        seoTitle: 'Como transformar tráfego em oportunidades qualificadas | AUREON',
        seoDescription:
          'Descubra por que um site com tráfego pode não gerar oportunidades e como alinhar proposta de valor, confiança, experiência e medição para melhorar a conversão.',
        imageAlt: 'Fluxo visual entre atenção, confiança e conversão em um website',
        blocks: [
          {
            kind: 'callout',
            label: 'Resumo executivo',
            text: 'Conversão não começa no botão. Ela começa quando a página ajuda a pessoa certa a reconhecer um problema, entender a proposta, confiar na empresa e avançar sem esforço desnecessário.',
          },
          { kind: 'heading', id: 'decisao-da-pagina', text: '1. Defina a decisão que a página precisa facilitar' },
          {
            kind: 'paragraph',
            text: 'Uma página não precisa convencer todo visitante a comprar imediatamente. Ela precisa facilitar a próxima decisão coerente com o momento da jornada: pedir um diagnóstico, comparar uma solução, calcular uma condição ou falar com alguém. Quando várias ações competem pela mesma atenção, o visitante precisa interpretar a estratégia da empresa antes de entender o que fazer.',
          },
          {
            kind: 'paragraph',
            text: 'Comece pela intenção da página, não pelo layout. Defina quem deve chegar, qual dúvida essa pessoa traz, qual ação comprova interesse qualificado e o que precisa estar claro antes dessa ação. Esse recorte orienta conteúdo, hierarquia e medição.',
          },
          { kind: 'heading', id: 'clareza-de-valor', text: '2. Troque slogans vagos por clareza de valor' },
          {
            kind: 'paragraph',
            text: 'A primeira dobra deve responder rapidamente o que a empresa resolve, para quem e por que a oferta merece consideração. Frases amplas como “soluções que transformam” soam positivas, mas transferem ao visitante o trabalho de descobrir o significado. Uma proposta clara combina resultado desejado, contexto e diferença relevante sem prometer o que não pode comprovar.',
          },
          { kind: 'heading', id: 'atencao-confianca-acao', text: '3. Organize atenção, confiança e ação' },
          {
            kind: 'paragraph',
            text: 'A sequência importa. Primeiro, a página confirma que o visitante está no lugar certo. Depois, explica a solução com linguagem concreta e reduz risco com evidências adequadas. Só então pede uma ação. Depoimentos, processos, demonstrações e casos funcionam melhor perto da objeção que ajudam a resolver do que reunidos em um bloco genérico no fim da página.',
          },
          { kind: 'heading', id: 'reducao-de-friccao', text: '4. Reduza a fricção que não protege o negócio' },
          {
            kind: 'paragraph',
            text: 'Formulários longos, CTAs ambíguos, navegação inconsistente e páginas lentas criam custo antes que a relação comece. Nem toda etapa deve ser removida: perguntas de qualificação podem proteger tempo comercial. A diferença é intencionalidade. Cada campo, clique e espera precisa ter uma razão percebida pelo usuário ou uma razão operacional clara para a empresa.',
          },
          {
            kind: 'checklist',
            label: 'Checklist da jornada de conversão',
            items: [
              'A página tem uma ação principal adequada à intenção de quem chega?',
              'A proposta de valor é compreensível sem contexto interno da empresa?',
              'As objeções aparecem perto das evidências que respondem a elas?',
              'O formulário pede apenas o necessário para a próxima conversa?',
              'A experiência permanece clara e utilizável no celular?',
            ],
          },
          { kind: 'heading', id: 'prova-contextual', text: '5. Use prova para responder risco, não para decorar' },
          {
            kind: 'paragraph',
            text: 'Prova útil conecta um problema a uma capacidade real. Um caso deve explicar o contexto, as escolhas e a contribuição do trabalho; um depoimento deve ser específico; uma demonstração deve mostrar como a solução funciona. Logos isolados podem reforçar familiaridade, mas raramente explicam por que a empresa é a escolha adequada para aquele visitante.',
          },
          { kind: 'case', caseId: 'mini-finance-matcher-react' },
          {
            kind: 'paragraph',
            text: 'O MINI Finance Matcher é um exemplo de experiência orientada à decisão: em vez de apenas apresentar condições financeiras, a ferramenta em React organiza informações para ajudar cada usuário a identificar um caminho mais adequado ao seu contexto.',
          },
          { kind: 'heading', id: 'medicao-qualificada', text: '6. Meça oportunidades qualificadas, não apenas cliques' },
          {
            kind: 'paragraph',
            text: 'Uma taxa isolada não explica qualidade. Combine ações do site com sinais posteriores: origem, aderência do contato, avanço comercial e motivos de perda. Antes de mudar a página, registre uma linha de base e uma hipótese. Depois, compare segmentos e observe se a melhoria trouxe conversas melhores, não apenas mais eventos no analytics.',
          },
          {
            kind: 'cta',
            label: 'Diagnóstico de conversão',
            title: 'Descubra onde sua jornada perde oportunidades',
            text: 'A AUREON analisa mensagem, hierarquia, fricção, prova e medição para priorizar mudanças com impacto comercial plausível.',
            button: 'Solicitar diagnóstico do site',
          },
          { kind: 'sources', label: 'Fonte e leitura complementar' },
        ],
      },
      en: {
        slug: 'website-conversion-strategy',
        category: 'Conversion',
        title: 'Your website gets traffic but no qualified leads. What is missing?',
        excerpt:
          'A practical diagnosis for turning traffic into clear decisions, reducing friction, and building conversion paths that respect the customer journey.',
        readTime: '8 min read',
        seoTitle: 'How to turn website traffic into qualified leads | AUREON',
        seoDescription:
          'Learn why a website with traffic may fail to generate qualified leads and how value, trust, experience, and measurement work together to improve conversion.',
        imageAlt: 'Visual flow connecting attention, trust, and website conversion',
        blocks: [
          {
            kind: 'callout',
            label: 'Executive summary',
            text: 'Conversion does not begin at the button. It begins when a page helps the right person recognize a problem, understand the offer, trust the business, and move forward without unnecessary effort.',
          },
          { kind: 'heading', id: 'page-decision', text: '1. Define the decision the page must support' },
          {
            kind: 'paragraph',
            text: 'A page does not need to persuade every visitor to buy immediately. It needs to support the next decision that fits their journey: request a diagnosis, compare an option, calculate a condition, or speak to someone. When several actions compete for attention, visitors must decode the company strategy before they can decide what to do.',
          },
          {
            kind: 'paragraph',
            text: 'Start with page intent rather than layout. Define who should arrive, what question they bring, which action signals qualified interest, and what must be clear before that action. This focus should guide content, hierarchy, and measurement.',
          },
          { kind: 'heading', id: 'value-clarity', text: '2. Replace vague slogans with a clear value proposition' },
          {
            kind: 'paragraph',
            text: 'The opening view should quickly explain what the company solves, for whom, and why the offer deserves consideration. Broad claims such as “solutions that transform” may sound positive, but they make the visitor discover the meaning. A clear proposition combines a desired outcome, relevant context, and a defensible difference without promising what the company cannot prove.',
          },
          { kind: 'heading', id: 'attention-trust-action', text: '3. Sequence attention, trust, and action' },
          {
            kind: 'paragraph',
            text: 'Sequence matters. First, the page confirms that the visitor is in the right place. Next, it explains the solution in concrete language and lowers risk with appropriate evidence. Only then does it ask for action. Testimonials, process detail, demonstrations, and cases work best near the objection they answer, not collected in a generic block at the bottom.',
          },
          { kind: 'heading', id: 'reduce-friction', text: '4. Remove friction that does not protect the business' },
          {
            kind: 'paragraph',
            text: 'Long forms, ambiguous calls to action, inconsistent navigation, and slow pages create cost before a relationship begins. Not every step should disappear: qualification questions may protect commercial time. The standard is intent. Every field, click, and wait should have a reason the user can understand or a clear operational reason for the business.',
          },
          {
            kind: 'checklist',
            label: 'Conversion journey checklist',
            items: [
              'Does the page have one primary action suited to visitor intent?',
              'Is the value proposition clear without internal company context?',
              'Do objections appear near the evidence that answers them?',
              'Does the form ask only what the next conversation requires?',
              'Does the experience remain clear and usable on mobile?',
            ],
          },
          { kind: 'heading', id: 'contextual-proof', text: '5. Use proof to answer risk, not to decorate the page' },
          {
            kind: 'paragraph',
            text: 'Useful proof connects a problem to a real capability. A case should explain context, decisions, and the contribution of the work; a testimonial should be specific; a demonstration should show how the solution operates. Client logos can add familiarity, but they rarely explain why the business is the right choice for this visitor.',
          },
          { kind: 'case', caseId: 'mini-finance-matcher-react' },
          {
            kind: 'paragraph',
            text: 'The MINI Finance Matcher is an example of a decision-led experience. Instead of only displaying finance conditions, the React tool organizes information to help each user identify a path that better fits their context.',
          },
          { kind: 'heading', id: 'qualified-measurement', text: '6. Measure qualified opportunities, not clicks alone' },
          {
            kind: 'paragraph',
            text: 'An isolated conversion rate says little about quality. Connect site actions with later signals: source, lead fit, sales progression, and reasons for loss. Record a baseline and a hypothesis before changing the page. Then compare segments and check whether the improvement creates better conversations, not merely more analytics events.',
          },
          {
            kind: 'cta',
            label: 'Conversion diagnosis',
            title: 'Find where your journey loses qualified opportunities',
            text: 'AUREON reviews message, hierarchy, friction, proof, and measurement to prioritize changes with a plausible commercial impact.',
            button: 'Request a website diagnosis',
          },
          { kind: 'sources', label: 'Source and further reading' },
        ],
      },
    },
  },
  {
    id: 'seo-geo',
    featured: false,
    accent: '#7C8CFF',
    image: '/blog/seo-geo.svg',
    published: '2026-07-05',
    modified: '2026-07-05',
    author: 'AUREON',
    relatedCaseId: 'dove-global-aem',
    serviceHref: '/#contact',
    sources: [
      {
        label: 'Google Search Central — AI features and your website',
        url: 'https://developers.google.com/search/docs/appearance/ai-features?hl=pt-br',
      },
      peopleFirstSource,
      {
        label: 'Google Search Central — Structured data',
        url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data',
      },
    ],
    locales: {
      pt: {
        slug: 'seo-geo-busca-ia',
        category: 'SEO + GEO',
        title: 'SEO e GEO: como tornar sua marca encontrável no Google e nas respostas de IA',
        excerpt:
          'Um framework sem atalhos para fortalecer descoberta, compreensão e autoridade da marca em mecanismos de busca e experiências assistidas por IA.',
        readTime: '9 min de leitura',
        seoTitle: 'SEO e GEO para busca e respostas de IA | AUREON',
        seoDescription:
          'Entenda como fundamentos de SEO, conteúdo útil, entidades e dados estruturados ajudam sua marca a ser descoberta no Google e em experiências de busca com IA.',
        imageAlt: 'Rede de conteúdo conectando mecanismos de busca, entidades e respostas de IA',
        blocks: [
          {
            kind: 'callout',
            label: 'Resumo executivo',
            text: 'GEO não substitui SEO e não oferece garantia de citação. A estratégia mais defensável é tornar a marca tecnicamente acessível, semanticamente clara, útil para pessoas e reconhecível por fontes confiáveis.',
          },
          { kind: 'heading', id: 'descoberta-em-mudanca', text: '1. A descoberta está distribuída em mais experiências' },
          {
            kind: 'paragraph',
            text: 'A jornada de pesquisa pode começar em resultados tradicionais, recursos de IA, vídeos, marketplaces ou comunidades. Isso muda a forma como a marca é encontrada, mas não elimina a necessidade de páginas próprias que expliquem produtos, serviços e expertise com precisão. O site continua sendo o lugar onde a empresa controla contexto, evidência e caminho de conversão.',
          },
          { kind: 'heading', id: 'fundamentos-permanecem', text: '2. Os fundamentos de SEO continuam válidos' },
          {
            kind: 'paragraph',
            text: 'A documentação do Google afirma que as práticas fundamentais de SEO também se aplicam aos recursos de IA na Pesquisa e que não é necessário um arquivo ou marcação especial para aparecer neles. Conteúdo acessível, indexável e útil permanece mais importante do que adotar uma camada “GEO” isolada sem resolver a base.',
          },
          { kind: 'heading', id: 'rastreamento-indexacao', text: '3. Garanta rastreamento, indexação e arquitetura compreensível' },
          {
            kind: 'paragraph',
            text: 'Uma página bloqueada, duplicada ou órfã não ganha visibilidade por ter bom texto. Revise respostas do servidor, robots, canonicals, sitemap, links internos, renderização e versões por idioma. Organize a arquitetura conforme perguntas e decisões do público, para que pessoas e sistemas encontrem relações claras entre temas, ofertas e evidências.',
          },
          { kind: 'heading', id: 'autoridade-util', text: '4. Construa autoridade útil, não volume editorial' },
          {
            kind: 'paragraph',
            text: 'Publicar muito não compensa conteúdo genérico. Priorize assuntos ligados à experiência real da empresa e responda com profundidade suficiente para ajudar uma decisão. Mostre autoria, método, limites e fontes. A orientação people-first do Google enfatiza utilidade, originalidade e confiança, não um tamanho de texto ou frequência artificial.',
          },
          {
            kind: 'checklist',
            label: 'Auditoria de encontrabilidade',
            items: [
              'As páginas estratégicas podem ser rastreadas, renderizadas e indexadas?',
              'Cada página responde uma intenção clara sem competir com outra URL?',
              'A autoria, a experiência e as fontes são verificáveis?',
              'Produtos, serviços, organização e conteúdos usam nomes consistentes?',
              'Links internos conectam explicação, prova, serviço e próxima ação?',
            ],
          },
          { kind: 'heading', id: 'entidades-dados-estruturados', text: '5. Explicite entidades e use schema para descrever o que existe' },
          {
            kind: 'paragraph',
            text: 'Consistência ajuda sistemas a interpretar quem é a organização, o que ela oferece e como seus conteúdos se relacionam. Dados estruturados podem descrever elementos visíveis em formatos conhecidos, mas não devem inventar fatos nem ser tratados como atalho de ranking. O markup precisa corresponder ao conteúdo que a pessoa encontra na página.',
          },
          { kind: 'case', caseId: 'dove-global-aem' },
          {
            kind: 'paragraph',
            text: 'Em uma operação global como Dove, arquitetura, governança e consistência entre mercados são parte do trabalho de descoberta. A implementação em AEM combina conteúdo local com padrões compartilhados, permitindo evoluir SEO, performance e suporte sem fragmentar a marca.',
          },
          { kind: 'heading', id: 'links-e-medicao', text: '6. Conecte páginas e meça com limites claros' },
          {
            kind: 'paragraph',
            text: 'Links internos distribuem contexto e conduzem o leitor da pergunta inicial à prova e à ação. Na medição, acompanhe indexação, consultas, páginas de entrada, tráfego qualificado e conversões assistidas. Citações em respostas de IA podem variar e nem sempre oferecem dados completos; trate visibilidade generativa como observação complementar, nunca como promessa de posicionamento.',
          },
          {
            kind: 'cta',
            label: 'Diagnóstico de visibilidade',
            title: 'Descubra onde sua marca deixa de ser compreendida',
            text: 'A AUREON conecta auditoria técnica, arquitetura editorial, entidades, conteúdo e mensuração em um plano de SEO e GEO executável.',
            button: 'Solicitar diagnóstico de visibilidade',
          },
          { kind: 'sources', label: 'Fontes primárias' },
        ],
      },
      en: {
        slug: 'seo-geo-ai-search',
        category: 'SEO + GEO',
        title: 'SEO and GEO: how to make your brand discoverable in search and AI answers',
        excerpt:
          'A shortcut-free framework for strengthening brand discovery, understanding, and authority across search engines and AI-assisted experiences.',
        readTime: '9 min read',
        seoTitle: 'SEO and GEO for search and AI answers | AUREON',
        seoDescription:
          'Learn how SEO foundations, useful content, entities, and structured data can help your brand become discoverable in Google and AI-assisted search experiences.',
        imageAlt: 'Content network connecting search engines, entities, and AI answers',
        blocks: [
          {
            kind: 'callout',
            label: 'Executive summary',
            text: 'GEO does not replace SEO and cannot guarantee a citation. The defensible strategy is to make the brand technically accessible, semantically clear, useful to people, and recognizable through trustworthy sources.',
          },
          { kind: 'heading', id: 'changing-discovery', text: '1. Discovery now spans more experiences' },
          {
            kind: 'paragraph',
            text: 'A research journey may begin in traditional results, AI features, video, marketplaces, or communities. That changes how a brand is discovered, but it does not remove the need for owned pages that accurately explain products, services, and expertise. The website remains the place where the company controls context, evidence, and the conversion path.',
          },
          { kind: 'heading', id: 'seo-foundations', text: '2. SEO foundations still apply' },
          {
            kind: 'paragraph',
            text: 'Google documentation says its foundational SEO practices also apply to AI features in Search and that no special file or markup is required to appear in them. Accessible, indexable, useful content is more valuable than adding an isolated “GEO” layer while leaving the foundation unresolved.',
          },
          { kind: 'heading', id: 'crawl-and-index', text: '3. Secure crawlability, indexing, and understandable architecture' },
          {
            kind: 'paragraph',
            text: 'A blocked, duplicated, or orphaned page will not become visible because its copy is good. Review server responses, robots directives, canonicals, sitemaps, internal links, rendering, and language versions. Organize architecture around audience questions and decisions so people and systems can follow clear relationships between topics, offers, and evidence.',
          },
          { kind: 'heading', id: 'useful-authority', text: '4. Build useful authority instead of editorial volume' },
          {
            kind: 'paragraph',
            text: 'Publishing more cannot compensate for generic content. Prioritize topics connected to first-hand company experience and answer them deeply enough to support a decision. Show authorship, method, limitations, and sources. Google’s people-first guidance emphasizes usefulness, originality, and trust rather than an artificial word count or publishing frequency.',
          },
          {
            kind: 'checklist',
            label: 'Discoverability audit',
            items: [
              'Can strategic pages be crawled, rendered, and indexed?',
              'Does each page answer a clear intent without competing with another URL?',
              'Are authorship, experience, and sources verifiable?',
              'Do products, services, organization, and content use consistent names?',
              'Do internal links connect explanation, proof, service, and next action?',
            ],
          },
          { kind: 'heading', id: 'entities-and-schema', text: '5. Clarify entities and use schema to describe visible content' },
          {
            kind: 'paragraph',
            text: 'Consistency helps systems interpret who the organization is, what it offers, and how its content relates. Structured data can describe visible elements in established formats, but it should not invent facts or be treated as a ranking shortcut. Markup must match what a person can find on the page.',
          },
          { kind: 'case', caseId: 'dove-global-aem' },
          {
            kind: 'paragraph',
            text: 'For a global operation such as Dove, architecture, governance, and market consistency are part of discoverability. The AEM implementation combines local content with shared standards so SEO, performance, and support can evolve without fragmenting the brand.',
          },
          { kind: 'heading', id: 'links-and-measurement', text: '6. Connect pages and measure with clear limitations' },
          {
            kind: 'paragraph',
            text: 'Internal links carry context and move a reader from the first question to proof and action. Measure indexing, queries, landing pages, qualified traffic, and assisted conversion. Citations in AI answers can vary and do not always provide complete reporting; treat generative visibility as a complementary observation, never a promise of placement.',
          },
          {
            kind: 'cta',
            label: 'Visibility diagnosis',
            title: 'Find where your brand stops being understood',
            text: 'AUREON connects technical auditing, editorial architecture, entities, content, and measurement in an executable SEO and GEO plan.',
            button: 'Request a visibility diagnosis',
          },
          { kind: 'sources', label: 'Primary sources' },
        ],
      },
    },
  },
  {
    id: 'performance',
    featured: false,
    accent: '#42D6A4',
    image: '/blog/performance.svg',
    published: '2026-07-05',
    modified: '2026-07-05',
    author: 'AUREON',
    relatedCaseId: 'arctic-fox-headless-commerce',
    serviceHref: '/#contact',
    sources: [
      webVitalsSource,
      {
        label: 'Google Search Central — Page experience',
        url: 'https://developers.google.com/search/docs/appearance/page-experience',
      },
    ],
    locales: {
      pt: {
        slug: 'performance-core-web-vitals',
        category: 'Performance',
        title: 'Performance que converte: velocidade, mobile e Core Web Vitals',
        excerpt:
          'Como traduzir velocidade e estabilidade em prioridades de negócio, equilibrando experiência percebida, dados reais e decisões técnicas de alto impacto.',
        readTime: '8 min de leitura',
        seoTitle: 'Performance, mobile e Core Web Vitals para negócios | AUREON',
        seoDescription:
          'Entenda velocidade percebida, experiência mobile e Core Web Vitals para priorizar melhorias técnicas, reduzir risco comercial e medir resultados após o lançamento.',
        imageAlt: 'Painel abstrato de velocidade, estabilidade visual e interação de página',
        blocks: [
          {
            kind: 'callout',
            label: 'Resumo executivo',
            text: 'Performance não é uma nota isolada. É a capacidade de entregar conteúdo útil rapidamente, responder às interações e manter a interface estável nas condições reais em que o público acessa o site.',
          },
          { kind: 'heading', id: 'velocidade-percebida-medida', text: '1. Diferencie velocidade percebida de velocidade medida' },
          {
            kind: 'paragraph',
            text: 'Uma página pode concluir o carregamento técnico e ainda parecer lenta se o conteúdo principal demora a surgir. Também pode parecer pronta e travar na primeira interação. Métricas ajudam a localizar esses momentos, enquanto a percepção mostra a ordem correta de entrega: mensagem principal, navegação e ação relevante devem chegar antes dos recursos secundários.',
          },
          { kind: 'heading', id: 'realidade-mobile', text: '2. Trate o mobile como condição real, não como tela menor' },
          {
            kind: 'paragraph',
            text: 'Celulares combinam processadores, redes, tamanhos e contextos muito diferentes. Uma experiência validada em Wi-Fi e aparelho recente pode falhar para parte do público. Imagens pesadas, JavaScript excessivo, fontes e scripts de terceiros competem por recursos. Priorizar mobile exige testar dispositivos e conexões representativos, além de proteger leitura, toque e continuidade.',
          },
          { kind: 'heading', id: 'sentido-dos-vitals', text: '3. Leia LCP, INP e CLS como riscos de experiência' },
          {
            kind: 'paragraph',
            text: 'LCP observa quando o maior conteúdo visível é apresentado e ajuda a investigar demora na entrega principal. INP avalia a responsividade das interações ao longo da visita. CLS observa mudanças inesperadas de layout. Em linguagem comercial: o usuário espera para entender, espera para agir ou perde confiança porque a interface se move. As métricas orientam o diagnóstico; não substituem a observação da jornada.',
          },
          { kind: 'heading', id: 'campo-e-laboratorio', text: '4. Combine dados de campo e laboratório' },
          {
            kind: 'paragraph',
            text: 'Dados de campo registram experiências reais agregadas, com a variedade de dispositivos e redes do público. Testes de laboratório reproduzem condições controladas e facilitam depuração antes de publicar. Use o campo para entender alcance e tendência; use o laboratório para investigar causas, comparar mudanças e impedir regressões.',
          },
          {
            kind: 'checklist',
            label: 'Matriz de prioridade de performance',
            items: [
              'A falha afeta uma página ou jornada com valor comercial alto?',
              'Ela aparece em dados reais ou apenas em uma simulação extrema?',
              'Existe uma causa compartilhada que corrige várias páginas?',
              'A mudança melhora experiência sem remover informação necessária?',
              'Há medição antes e depois para confirmar efeito e regressões?',
            ],
          },
          { kind: 'heading', id: 'prioridades-de-impacto', text: '5. Corrija primeiro o que bloqueia conteúdo e interação' },
          {
            kind: 'paragraph',
            text: 'As melhores prioridades costumam estar no caminho crítico: servidor e cache, imagens do conteúdo principal, CSS e fontes essenciais, JavaScript que bloqueia ou ocupa a thread principal e componentes que reservam espaço incorretamente. Comece por causas compartilhadas e templates importantes. Otimizações pequenas em recursos invisíveis não devem adiar correções que afetam a decisão do usuário.',
          },
          { kind: 'case', caseId: 'arctic-fox-headless-commerce' },
          {
            kind: 'paragraph',
            text: 'No Arctic Fox, a arquitetura Shopify headless com Vue Storefront exige que experiência de marca, catálogo e compra funcionem como uma jornada única. Performance precisa ser governada entre plataforma, frontend, mídia e integrações, não tratada como ajuste final.',
          },
          { kind: 'heading', id: 'medicao-pos-lancamento', text: '6. Continue medindo depois do lançamento' },
          {
            kind: 'paragraph',
            text: 'Novos banners, tags, campanhas, produtos e integrações alteram a página depois da entrega. Defina responsáveis, páginas críticas, orçamento de performance e uma cadência de revisão. Relacione sinais técnicos com abandono, conclusão de etapas e qualidade do tráfego, evitando atribuir causalidade sem evidência suficiente.',
          },
          {
            kind: 'cta',
            label: 'Revisão de performance',
            title: 'Priorize o que realmente afeta a jornada',
            text: 'A AUREON combina análise técnica, experiência mobile e contexto comercial para transformar problemas de performance em um backlog objetivo.',
            button: 'Solicitar revisão de performance',
          },
          { kind: 'sources', label: 'Fontes primárias' },
        ],
      },
      en: {
        slug: 'performance-core-web-vitals',
        category: 'Performance',
        title: 'Performance that converts: speed, mobile UX, and Core Web Vitals',
        excerpt:
          'How to translate speed and stability into business priorities by balancing perceived experience, real-world data, and high-impact technical decisions.',
        readTime: '8 min read',
        seoTitle: 'Performance, mobile UX, and Core Web Vitals | AUREON',
        seoDescription:
          'Understand perceived speed, mobile experience, and Core Web Vitals to prioritize technical improvements, reduce commercial risk, and measure post-launch outcomes.',
        imageAlt: 'Abstract dashboard for page speed, visual stability, and interaction',
        blocks: [
          {
            kind: 'callout',
            label: 'Executive summary',
            text: 'Performance is not a single score. It is the ability to deliver useful content quickly, respond to interactions, and keep the interface stable under the real conditions in which an audience uses the site.',
          },
          { kind: 'heading', id: 'perceived-measured-speed', text: '1. Separate perceived speed from measured speed' },
          {
            kind: 'paragraph',
            text: 'A page can complete its technical load and still feel slow when the main content appears late. It can also look ready but stall at the first interaction. Metrics help locate those moments, while perception reveals the right delivery order: the core message, navigation, and relevant action should arrive before secondary resources.',
          },
          { kind: 'heading', id: 'mobile-reality', text: '2. Treat mobile as a real constraint, not a smaller screen' },
          {
            kind: 'paragraph',
            text: 'Phones combine widely different processors, networks, sizes, and usage contexts. An experience checked on recent hardware and Wi-Fi can fail part of the audience. Heavy images, excessive JavaScript, fonts, and third-party scripts compete for resources. Mobile prioritization requires representative devices and connections while protecting reading, touch, and continuity.',
          },
          { kind: 'heading', id: 'vitals-business-meaning', text: '3. Read LCP, INP, and CLS as experience risks' },
          {
            kind: 'paragraph',
            text: 'LCP observes when the largest visible content is presented and helps investigate delay in the main delivery. INP evaluates interaction responsiveness throughout a visit. CLS observes unexpected layout shifts. In business terms, the user waits to understand, waits to act, or loses confidence because the interface moves. Metrics guide diagnosis; they do not replace journey observation.',
          },
          { kind: 'heading', id: 'field-and-lab', text: '4. Combine field and laboratory data' },
          {
            kind: 'paragraph',
            text: 'Field data aggregates real experiences across the audience’s devices and networks. Laboratory tests reproduce controlled conditions and make pre-release debugging easier. Use field data to understand reach and trends; use lab tests to investigate causes, compare changes, and prevent regressions.',
          },
          {
            kind: 'checklist',
            label: 'Performance priority matrix',
            items: [
              'Does the issue affect a page or journey with high commercial value?',
              'Does it appear in real-world data or only an extreme simulation?',
              'Is there a shared cause that can improve several pages?',
              'Will the change improve experience without removing necessary information?',
              'Is there before-and-after measurement for impact and regressions?',
            ],
          },
          { kind: 'heading', id: 'impact-priorities', text: '5. Fix what blocks content and interaction first' },
          {
            kind: 'paragraph',
            text: 'The strongest priorities are usually on the critical path: server and caching, main-content images, essential CSS and fonts, JavaScript that blocks or occupies the main thread, and components that reserve space incorrectly. Begin with shared causes and important templates. Small optimizations to invisible resources should not postpone fixes that affect user decisions.',
          },
          { kind: 'case', caseId: 'arctic-fox-headless-commerce' },
          {
            kind: 'paragraph',
            text: 'For Arctic Fox, a headless Shopify architecture with Vue Storefront must make brand experience, catalog, and purchase behave as one journey. Performance has to be governed across platform, frontend, media, and integrations rather than treated as a final adjustment.',
          },
          { kind: 'heading', id: 'post-launch-measurement', text: '6. Keep measuring after launch' },
          {
            kind: 'paragraph',
            text: 'New banners, tags, campaigns, products, and integrations change the page after delivery. Define ownership, critical pages, a performance budget, and a review cadence. Connect technical signals with abandonment, step completion, and traffic quality while avoiding causal claims that the evidence cannot support.',
          },
          {
            kind: 'cta',
            label: 'Performance review',
            title: 'Prioritize what genuinely affects the journey',
            text: 'AUREON combines technical analysis, mobile experience, and commercial context to turn performance issues into an objective backlog.',
            button: 'Request a performance review',
          },
          { kind: 'sources', label: 'Primary sources' },
        ],
      },
    },
  },
  {
    id: 'strategic-redesign',
    featured: false,
    accent: '#FF7A6B',
    image: '/blog/redesign.svg',
    published: '2026-07-05',
    modified: '2026-07-05',
    author: 'AUREON',
    relatedCaseId: 'dove-global-aem',
    serviceHref: '/#contact',
    sources: [peopleFirstSource, webVitalsSource],
    locales: {
      pt: {
        slug: 'quando-redesenhar-site',
        category: 'Estratégia',
        title: 'Quando redesenhar um site: sinais, prioridades e como medir retorno',
        excerpt:
          'Um scorecard para decidir entre otimizar, reconstruir ou trocar de plataforma sem transformar preferência visual em justificativa de investimento.',
        readTime: '9 min de leitura',
        seoTitle: 'Quando redesenhar um site e como medir retorno | AUREON',
        seoDescription:
          'Avalie sinais comerciais e técnicos para decidir se seu site precisa de otimização, reconstrução ou nova plataforma, com escopo e medição orientados ao negócio.',
        imageAlt: 'Camadas de estratégia, conteúdo e tecnologia reorganizadas em um redesign de site',
        blocks: [
          {
            kind: 'callout',
            label: 'Resumo executivo',
            text: 'Um redesign é justificável quando problemas de negócio e experiência não podem ser resolvidos de forma segura e sustentável no sistema atual. Aparência desatualizada pode ser um sinal, mas não é um caso de investimento por si só.',
          },
          { kind: 'heading', id: 'sintoma-e-causa', text: '1. Separe o sintoma da causa' },
          {
            kind: 'paragraph',
            text: 'Baixa conversão pode vir de mensagem imprecisa, tráfego desalinhado, fricção, performance ou processo comercial — não necessariamente do visual. Quedas orgânicas podem envolver conteúdo, indexação ou concorrência. Antes de encomendar telas novas, registre os sintomas, as páginas afetadas e as hipóteses. Um redesign sem diagnóstico costuma preservar a causa com outra aparência.',
          },
          { kind: 'heading', id: 'sinais-de-negocio', text: '2. Observe sinais de negócio recorrentes' },
          {
            kind: 'paragraph',
            text: 'O site merece uma revisão estrutural quando a proposta mudou, novos públicos não encontram caminhos adequados, o time comercial precisa explicar o básico fora do site ou campanhas exigem páginas improvisadas. Outro sinal é a dificuldade de publicar provas, ofertas e conteúdo na velocidade da operação. Esses problemas mostram desalinhamento entre presença digital e estratégia atual.',
          },
          { kind: 'heading', id: 'sinais-tecnicos', text: '3. Identifique limites técnicos e operacionais' },
          {
            kind: 'paragraph',
            text: 'Templates inflexíveis, dependências sem manutenção, experiência mobile frágil, acessibilidade inconsistente, lentidão recorrente e risco na publicação aumentam o custo de cada melhoria. O problema não é usar uma plataforma específica. É não conseguir evoluir conteúdo, experiência e integrações com previsibilidade, segurança e governança.',
          },
          { kind: 'heading', id: 'escolha-do-caminho', text: '4. Decida entre otimizar, reconstruir ou trocar de plataforma' },
          {
            kind: 'paragraph',
            text: 'Otimize quando arquitetura e plataforma suportam a estratégia e os principais problemas são localizados. Reconstrua o frontend ou os templates quando a base de conteúdo continua adequada, mas a experiência limita evolução. Considere replatform quando o sistema impede governança, comércio, integrações ou escala. A escolha deve reduzir restrições reais, não seguir uma tendência tecnológica.',
          },
          {
            kind: 'paragraph',
            text: 'Projetos como Avary Drone em Shopify e Celine Medspas em WordPress mostram que plataformas diferentes podem sustentar experiências orientadas a negócio. O critério é adequação entre operação, conteúdo, jornada e capacidade de manutenção — não o rótulo da tecnologia.',
            links: [
              { label: 'Avary Drone', caseId: 'avary-drone-shopify' },
              { label: 'Celine Medspas', caseId: 'celine-medspas-wordpress' },
            ],
          },
          {
            kind: 'checklist',
            label: 'Scorecard de decisão do redesign',
            items: [
              'O problema afeta uma meta de negócio ou uma jornada prioritária?',
              'Há evidência de que a causa está no site, e não apenas no tráfego?',
              'A plataforma atual bloqueia mudanças necessárias ou só exige configuração?',
              'Conteúdo, SEO, analytics e redirects fazem parte do escopo?',
              'Existe uma linha de base para avaliar o resultado após o lançamento?',
            ],
          },
          { kind: 'heading', id: 'escopo-priorizado', text: '5. Defina o escopo pela jornada, não pela lista de páginas' },
          {
            kind: 'paragraph',
            text: 'Mapeie públicos, tarefas, fontes de entrada e conteúdos críticos. Preserve URLs e ativos que já geram valor; planeje redirects e migração antes da publicação. Priorize templates e componentes reutilizados nas jornadas mais importantes. Um inventário extenso sem hierarquia aumenta prazo, enquanto um escopo orientado a decisões deixa claro o que precisa ser validado primeiro.',
          },
          { kind: 'case', caseId: 'dove-global-aem' },
          {
            kind: 'paragraph',
            text: 'O redesign global de Dove exigiu mais do que novas telas: arquitetura de conteúdo, SEO, performance, analytics, implementação em AEM e suporte posterior precisaram funcionar entre marcas, mercados e equipes. Esse tipo de programa depende de padrões compartilhados com espaço para contexto local.',
          },
          { kind: 'heading', id: 'retorno-do-redesign', text: '6. Meça retorno a partir da linha de base' },
          {
            kind: 'paragraph',
            text: 'Defina antes do projeto quais sinais indicam progresso: qualidade das oportunidades, conclusão de jornadas, descoberta orgânica, tempo operacional, estabilidade e custo de mudança. Compare períodos equivalentes e segmente as fontes. O retorno pode combinar receita, eficiência e redução de risco, mas deve ser apresentado como evidência observada, não como consequência automática do novo design.',
          },
          {
            kind: 'cta',
            label: 'Escopo estratégico',
            title: 'Descubra qual mudança seu site realmente precisa',
            text: 'A AUREON transforma sinais comerciais e técnicos em um escopo priorizado de otimização, rebuild ou replatform.',
            button: 'Planejar um redesign com a AUREON',
          },
          { kind: 'sources', label: 'Fontes primárias' },
        ],
      },
      en: {
        slug: 'when-to-redesign-website',
        category: 'Strategy',
        title: 'When to redesign a website: warning signs, priorities, and ROI',
        excerpt:
          'A scorecard for choosing whether to optimize, rebuild, or replatform without turning visual preference into an investment case.',
        readTime: '9 min read',
        seoTitle: 'When to redesign a website and how to measure ROI | AUREON',
        seoDescription:
          'Assess business and technical signals to decide whether your website needs optimization, a rebuild, or a new platform, with outcome-led scope and measurement.',
        imageAlt: 'Strategy, content, and technology layers reorganized in a website redesign',
        blocks: [
          {
            kind: 'callout',
            label: 'Executive summary',
            text: 'A redesign is justified when business and experience problems cannot be solved safely and sustainably within the current system. An outdated appearance can be a signal, but it is not an investment case by itself.',
          },
          { kind: 'heading', id: 'symptom-and-cause', text: '1. Separate the symptom from the cause' },
          {
            kind: 'paragraph',
            text: 'Low conversion may come from an imprecise message, misaligned traffic, friction, performance, or the sales process — not necessarily the visual design. Organic decline may involve content, indexing, or competition. Before commissioning new screens, record symptoms, affected pages, and hypotheses. A redesign without diagnosis often preserves the cause behind a new appearance.',
          },
          { kind: 'heading', id: 'business-signals', text: '2. Look for recurring business signals' },
          {
            kind: 'paragraph',
            text: 'A site deserves structural review when the proposition has changed, new audiences cannot find suitable paths, sales teams must explain the basics outside the site, or campaigns require improvised pages. Difficulty publishing proof, offers, and content at operating speed is another signal. These problems reveal a gap between the digital presence and current strategy.',
          },
          { kind: 'heading', id: 'technical-signals', text: '3. Identify technical and operational constraints' },
          {
            kind: 'paragraph',
            text: 'Inflexible templates, unmaintained dependencies, fragile mobile UX, inconsistent accessibility, recurring slowness, and risky publishing increase the cost of every improvement. The issue is not the use of a particular platform. It is an inability to evolve content, experience, and integrations with predictable governance and safety.',
          },
          { kind: 'heading', id: 'choose-the-path', text: '4. Choose whether to optimize, rebuild, or replatform' },
          {
            kind: 'paragraph',
            text: 'Optimize when architecture and platform support the strategy and the main problems are local. Rebuild the frontend or templates when the content foundation remains suitable but the experience limits change. Consider replatforming when the system blocks governance, commerce, integrations, or scale. The choice should remove real constraints rather than follow a technology trend.',
          },
          {
            kind: 'paragraph',
            text: 'Projects such as Avary Drone on Shopify and Celine Medspas on WordPress show that different platforms can support business-led experiences. The criterion is fit between operations, content, journey, and maintenance capacity — not the technology label.',
            links: [
              { label: 'Avary Drone', caseId: 'avary-drone-shopify' },
              { label: 'Celine Medspas', caseId: 'celine-medspas-wordpress' },
            ],
          },
          {
            kind: 'checklist',
            label: 'Redesign decision scorecard',
            items: [
              'Does the issue affect a business goal or priority journey?',
              'Is there evidence that the cause is the site rather than traffic alone?',
              'Does the current platform block necessary change or only need configuration?',
              'Are content, SEO, analytics, and redirects part of the scope?',
              'Is there a baseline for evaluating outcomes after launch?',
            ],
          },
          { kind: 'heading', id: 'prioritized-scope', text: '5. Define scope by journey, not by page count' },
          {
            kind: 'paragraph',
            text: 'Map audiences, tasks, entry sources, and critical content. Preserve URLs and assets that already create value; plan redirects and migration before release. Prioritize templates and components reused across important journeys. A long inventory without hierarchy extends timelines, while decision-led scope makes clear what must be validated first.',
          },
          { kind: 'case', caseId: 'dove-global-aem' },
          {
            kind: 'paragraph',
            text: 'The global Dove redesign required more than new screens. Content architecture, SEO, performance, analytics, AEM implementation, and ongoing support had to work across brands, markets, and teams. This kind of program depends on shared standards with room for local context.',
          },
          { kind: 'heading', id: 'redesign-return', text: '6. Measure return from a recorded baseline' },
          {
            kind: 'paragraph',
            text: 'Define signals of progress before the project: opportunity quality, journey completion, organic discovery, operational time, stability, and cost of change. Compare equivalent periods and segment sources. Return can combine revenue, efficiency, and lower risk, but it should be reported as observed evidence rather than an automatic consequence of new design.',
          },
          {
            kind: 'cta',
            label: 'Strategic scope',
            title: 'Find the change your website actually needs',
            text: 'AUREON turns commercial and technical signals into a prioritized optimization, rebuild, or replatform scope.',
            button: 'Plan a redesign with AUREON',
          },
          { kind: 'sources', label: 'Primary sources' },
        ],
      },
    },
  },
];

export const legacyBlogRedirects: Record<string, string> = {
  '/blog/geo-vs-seo-2025': '/blog/seo-geo-busca-ia',
  '/blog/web-design-conversion-2025': '/blog/site-que-converte',
  '/blog/seo-technical-fundamentals': '/blog/performance-core-web-vitals',
  '/blog/smb-digital-strategy-brazil': '/blog/quando-redesenhar-site',
};

export const blogPath = (post: BlogPost, lang: BlogLang) =>
  `${lang === 'en' ? '/en' : ''}/blog/${post.locales[lang].slug}`;

export const blogIndexPath = (lang: BlogLang) => (lang === 'en' ? '/en/blog' : '/blog');

export const findBlogPost = (slug: string, lang: BlogLang) =>
  posts.find((post) => post.locales[lang].slug.toLowerCase() === slug.toLowerCase());

export function pairedBlogPath(pathname: string, targetLang: BlogLang) {
  const match = pathname.match(/^\/(en\/)?blog(?:\/([^/]+))?\/?$/i);
  if (!match) return null;
  if (!match[2]) return blogIndexPath(targetLang);
  const currentLang: BlogLang = match[1] ? 'en' : 'pt';
  const post = findBlogPost(match[2], currentLang);
  return post ? blogPath(post, targetLang) : blogIndexPath(targetLang);
}
