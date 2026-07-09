import { contactHref } from "../lib/contact";

interface ServicesPageProps {
  lang: "en" | "pt";
}

const t = {
  en: {
    badge: "Services",
    title: "What we do.",
    subtitle: "Three services. One goal: make your business the easiest to find in your market.",
    services: [
      {
        id: "web-design",
        tag: "01",
        title: "Web Design",
        tagline: "Your website is your best salesperson.",
        description: "We design and develop custom websites built to convert. Not templates. Not page builders. Real strategy, real code, real results.",
        features: [
          "Strategy & UX wireframing",
          "Custom visual design",
          "Performance-optimized development",
          "Mobile-first responsive layout",
          "CMS integration (Webflow, WordPress, custom)",
          "Conversion rate optimization (CRO)",
          "Analytics & tracking setup",
          "Post-launch support",
        ],
        ideal: "Startups, local businesses, and established companies that want to stop losing customers to a mediocre online presence.",
        price: "From R$5,000",
      },
      {
        id: "seo",
        tag: "02",
        title: "SEO",
        tagline: "Rank higher. Get found. Own your market.",
        description: "We build organic search presence that compounds over time. Technical, on-page, and off-page — fully integrated strategy.",
        features: [
          "Full technical SEO audit",
          "Keyword research & mapping",
          "On-page optimization",
          "Content strategy & creation",
          "Link building & authority growth",
          "Core Web Vitals optimization",
          "Monthly ranking & traffic reports",
          "Competitor gap analysis",
        ],
        ideal: "Businesses tired of paying for ads and ready to build a traffic source they actually own.",
        price: "From R$3,000/month",
      },
      {
        id: "geo",
        tag: "03",
        title: "GEO",
        tagline: "Be the answer AI gives.",
        description: "Generative Engine Optimization (GEO) ensures your brand appears when ChatGPT, Perplexity, or Google AI answers questions in your category.",
        features: [
          "AI visibility audit",
          "Structured data & schema markup",
          "Entity building & brand citations",
          "E-E-A-T content framework",
          "AI-first content architecture",
          "Perplexity & ChatGPT appearance tracking",
          "Knowledge graph optimization",
          "Monthly GEO performance report",
        ],
        ideal: "Forward-thinking businesses who understand that the future of search is AI-mediated and want to be ahead of competitors.",
        price: "From R$3,500/month",
      },
    ],
    processTitle: "How it works",
    processSteps: [
      { n: "01", title: "Discovery", desc: "We start by learning everything about your business, market, and goals." },
      { n: "02", title: "Strategy", desc: "We build a tailored plan with clear KPIs and a realistic timeline." },
      { n: "03", title: "Execution", desc: "We build, optimize, and publish — with you updated at every step." },
      { n: "04", title: "Growth", desc: "We track results, iterate, and scale what works." },
    ],
    ctaTitle: "Not sure which service you need?",
    ctaText: "Tell us where you are. We'll tell you exactly what to do.",
    ctaBtn: "Talk to us",
  },
  pt: {
    badge: "Serviços",
    title: "O que fazemos.",
    subtitle: "Três serviços. Um objetivo: tornar seu negócio o mais fácil de encontrar no seu mercado.",
    services: [
      {
        id: "web-design",
        tag: "01",
        title: "Web Design",
        tagline: "Seu site é seu melhor vendedor.",
        description: "Projetamos e desenvolvemos sites personalizados feitos para converter. Não templates. Não construtores de página. Estratégia real, código real, resultados reais.",
        features: [
          "Estratégia & wireframing de UX",
          "Design visual personalizado",
          "Desenvolvimento otimizado para performance",
          "Layout responsivo mobile-first",
          "Integração com CMS (Webflow, WordPress, personalizado)",
          "Otimização de taxa de conversão (CRO)",
          "Configuração de analytics & tracking",
          "Suporte pós-lançamento",
        ],
        ideal: "Startups, negócios locais e empresas estabelecidas que querem parar de perder clientes para uma presença online medíocre.",
        price: "A partir de R$5.000",
      },
      {
        id: "seo",
        tag: "02",
        title: "SEO",
        tagline: "Ranqueie mais alto. Seja encontrado. Domine seu mercado.",
        description: "Construímos presença orgânica que se acumula ao longo do tempo. Técnico, on-page e off-page — estratégia totalmente integrada.",
        features: [
          "Auditoria técnica completa de SEO",
          "Pesquisa & mapeamento de palavras-chave",
          "Otimização on-page",
          "Estratégia & criação de conteúdo",
          "Link building & crescimento de autoridade",
          "Otimização de Core Web Vitals",
          "Relatórios mensais de ranking & tráfego",
          "Análise de gaps de concorrentes",
        ],
        ideal: "Negócios cansados de pagar por anúncios e prontos para construir uma fonte de tráfego que realmente possuem.",
        price: "A partir de R$3.000/mês",
      },
      {
        id: "geo",
        tag: "03",
        title: "GEO",
        tagline: "Seja a resposta que a IA dá.",
        description: "Generative Engine Optimization (GEO) garante que sua marca apareça quando ChatGPT, Perplexity ou Google AI responde perguntas na sua categoria.",
        features: [
          "Auditoria de visibilidade em IA",
          "Dados estruturados & schema markup",
          "Construção de entidade & citações de marca",
          "Framework de conteúdo E-E-A-T",
          "Arquitetura de conteúdo AI-first",
          "Rastreamento de aparições no Perplexity & ChatGPT",
          "Otimização de knowledge graph",
          "Relatório mensal de performance GEO",
        ],
        ideal: "Negócios visionários que entendem que o futuro da busca é mediado por IA e querem estar à frente dos concorrentes.",
        price: "A partir de R$3.500/mês",
      },
    ],
    processTitle: "Como funciona",
    processSteps: [
      { n: "01", title: "Descoberta", desc: "Começamos aprendendo tudo sobre seu negócio, mercado e objetivos." },
      { n: "02", title: "Estratégia", desc: "Construímos um plano personalizado com KPIs claros e prazo realista." },
      { n: "03", title: "Execução", desc: "Construímos, otimizamos e publicamos — com você atualizado em cada etapa." },
      { n: "04", title: "Crescimento", desc: "Rastreamos resultados, iteramos e escalamos o que funciona." },
    ],
    ctaTitle: "Não sabe qual serviço você precisa?",
    ctaText: "Nos conte onde você está. Te diremos exatamente o que fazer.",
    ctaBtn: "Falar conosco",
  },
};

export function ServicesPage({ lang }: ServicesPageProps) {
  const tx = t[lang];

  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      {/* Hero */}
      <section style={{ textAlign: "center", padding: "60px 24px 80px" }}>
        <span style={{
          display: "inline-block",
          background: "rgba(212,160,23,0.1)",
          border: "1px solid rgba(212,160,23,0.3)",
          color: "var(--gold)",
          fontSize: 11,
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          padding: "6px 16px",
          borderRadius: 100,
          marginBottom: 24,
        }}>
          {tx.badge}
        </span>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 7vw, 80px)",
          color: "var(--text)",
          margin: "0 0 20px",
          lineHeight: 1.05,
        }}>
          {tx.title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
          {tx.subtitle}
        </p>
      </section>

      {/* Services */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {tx.services.map((service) => (
            <div
              className="service-card"
              key={service.id}
              id={service.id}
              style={{
                padding: "48px 48px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Number */}
              <div className="service-card-number" style={{
                position: "absolute",
                top: 32,
                right: 40,
                fontFamily: "var(--font-display)",
                fontSize: 72,
                color: "rgba(212,160,23,0.06)",
                lineHeight: 1,
                userSelect: "none",
              }}>
                {service.tag}
              </div>

              <div className="service-card-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
                {/* Left */}
                <div>
                  <span style={{
                    display: "inline-block",
                    color: "var(--gold)",
                    fontSize: 11,
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}>
                    {service.tag} — {service.title}
                  </span>
                  <h2 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    color: "var(--text)",
                    margin: "0 0 16px",
                    lineHeight: 1.15,
                  }}>
                    {service.tagline}
                  </h2>
                  <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                    {service.description}
                  </p>
                  <div style={{
                    padding: "16px 20px",
                    background: "rgba(212,160,23,0.06)",
                    border: "1px solid rgba(212,160,23,0.15)",
                    borderRadius: 8,
                    marginBottom: 20,
                  }}>
                    <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                      {lang === "en" ? "Ideal for" : "Ideal para"}
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                      {service.ideal}
                    </p>
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--gold)" }}>
                    {service.price}
                  </div>
                </div>

                {/* Right — Features */}
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
                    {lang === "en" ? "What's included" : "O que está incluído"}
                  </div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {service.features.map((feat, fi) => (
                      <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ color: "var(--gold)", fontSize: 14, marginTop: 2, flexShrink: 0 }}>✓</span>
                        <span style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.5 }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 13,
          color: "var(--gold)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: 40,
        }}>
          {tx.processTitle}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {tx.processSteps.map((step, i) => (
            <div key={i} style={{
              padding: "28px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 32,
                color: "var(--gold)",
                opacity: 0.4,
                marginBottom: 12,
                lineHeight: 1,
              }}>
                {step.n}
              </div>
              <h3 style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                {step.title}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "0 24px" }}>
        <div style={{
          maxWidth: 540,
          margin: "0 auto",
          padding: "48px 40px",
          background: "rgba(212,160,23,0.05)",
          border: "1px solid rgba(212,160,23,0.15)",
          borderRadius: 16,
        }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--text)", marginBottom: 12 }}>
            {tx.ctaTitle}
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
            {tx.ctaText}
          </p>
          <a
            href={contactHref(lang)}
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "var(--gold)",
              color: "#08090F",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.05em",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            {tx.ctaBtn}
          </a>
        </div>
      </section>
    </main>
  );
}
