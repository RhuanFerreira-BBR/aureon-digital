import { useState } from "react";

interface FaqPageProps {
  lang: "en" | "pt";
}

const t = {
  en: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know before starting a project with Aureon.",
    categories: ["All", "Web Design", "SEO", "GEO", "Pricing", "Process"],
    faqs: [
      {
        cat: "Process",
        q: "How does the process work from start to finish?",
        a: "We start with a discovery call to understand your goals, audience, and competition. Then we build a strategy, design, develop, and launch. Most projects go live in 4–8 weeks depending on scope.",
      },
      {
        cat: "Pricing",
        q: "What is the minimum investment for a project?",
        a: "Our projects start at R$3,000 for a landing page and scale based on complexity, number of pages, and integrations. We provide a detailed proposal after the discovery call — no hidden fees.",
      },
      {
        cat: "Web Design",
        q: "Do you build custom websites or use templates?",
        a: "100% custom. Every site is designed and coded from scratch based on your brand, audience, and conversion goals. We don't use page builders or generic themes.",
      },
      {
        cat: "Web Design",
        q: "Will my website work on mobile?",
        a: "Always. Every site we build is fully responsive and tested across all major devices and browsers. Mobile performance is treated as a first priority, not an afterthought.",
      },
      {
        cat: "SEO",
        q: "How long does SEO take to show results?",
        a: "Organic SEO is a long-term investment. Most clients start seeing measurable results in 3–6 months. That said, technical SEO improvements can impact rankings within weeks.",
      },
      {
        cat: "SEO",
        q: "What does your SEO service include?",
        a: "Technical audit and fixes, keyword research, on-page optimization, content strategy, link building, and monthly reporting. We track rankings, traffic, and conversions — not vanity metrics.",
      },
      {
        cat: "GEO",
        q: "What is GEO and why does it matter now?",
        a: "GEO (Generative Engine Optimization) is the practice of optimizing your brand to appear in AI-generated answers — like ChatGPT, Perplexity, and Google's AI Overviews. As search shifts, being visible to AI is as important as ranking on Google.",
      },
      {
        cat: "GEO",
        q: "Do I need SEO if I'm already doing GEO?",
        a: "Yes. GEO builds on top of SEO. Technical credibility, structured content, and authority signals power both. We treat them as a unified strategy.",
      },
      {
        cat: "Pricing",
        q: "Do you offer monthly retainer plans?",
        a: "Yes. After launch, we offer ongoing retainers for SEO, GEO, content, and site maintenance. These are tailored per client and reviewed quarterly.",
      },
      {
        cat: "Process",
        q: "Can I see examples of your previous work?",
        a: "Yes — check our Cases page for detailed breakdowns of recent projects, results achieved, and the strategies behind them.",
      },
      {
        cat: "Process",
        q: "Do I own the website after it's delivered?",
        a: "Completely. You own 100% of the code, design files, and hosting credentials. We deliver everything and hand it over clean.",
      },
      {
        cat: "Web Design",
        q: "Can you redesign my existing website?",
        a: "Yes. Redesigns are one of our most common projects. We audit your current site, identify conversion bottlenecks, and rebuild with a clear strategy — not just a visual refresh.",
      },
    ],
  },
  pt: {
    badge: "FAQ",
    title: "Perguntas Frequentes",
    subtitle: "Tudo que você precisa saber antes de iniciar um projeto com a Aureon.",
    categories: ["Todos", "Web Design", "SEO", "GEO", "Preços", "Processo"],
    faqs: [
      {
        cat: "Processo",
        q: "Como funciona o processo do início ao fim?",
        a: "Começamos com uma call de descoberta para entender seus objetivos, público e concorrência. Depois construímos a estratégia, design, desenvolvimento e lançamos. A maioria dos projetos vai ao ar em 4–8 semanas dependendo do escopo.",
      },
      {
        cat: "Preços",
        q: "Qual é o investimento mínimo para um projeto?",
        a: "Nossos projetos começam a partir de R$3.000 para uma landing page e escalam conforme a complexidade, número de páginas e integrações. Enviamos uma proposta detalhada após a call de descoberta — sem taxas ocultas.",
      },
      {
        cat: "Web Design",
        q: "Vocês criam sites personalizados ou usam templates?",
        a: "100% personalizado. Cada site é projetado e desenvolvido do zero com base na sua marca, público e objetivos de conversão. Não usamos construtores de página ou temas genéricos.",
      },
      {
        cat: "Web Design",
        q: "Meu site vai funcionar no celular?",
        a: "Sempre. Todo site que construímos é totalmente responsivo e testado em todos os principais dispositivos e navegadores. Performance mobile é prioridade, não um afterthought.",
      },
      {
        cat: "SEO",
        q: "Quanto tempo o SEO leva para mostrar resultados?",
        a: "SEO orgânico é um investimento de longo prazo. A maioria dos clientes começa a ver resultados mensuráveis em 3–6 meses. Dito isso, melhorias de SEO técnico podem impactar rankings em semanas.",
      },
      {
        cat: "SEO",
        q: "O que está incluído no serviço de SEO?",
        a: "Auditoria e correções técnicas, pesquisa de palavras-chave, otimização on-page, estratégia de conteúdo, link building e relatórios mensais. Rastreamos rankings, tráfego e conversões — não métricas de vaidade.",
      },
      {
        cat: "GEO",
        q: "O que é GEO e por que importa agora?",
        a: "GEO (Generative Engine Optimization) é a prática de otimizar sua marca para aparecer em respostas geradas por IA — como ChatGPT, Perplexity e Google AI Overviews. À medida que a busca evolui, ser visível para IA é tão importante quanto ranquear no Google.",
      },
      {
        cat: "GEO",
        q: "Preciso de SEO se já estou fazendo GEO?",
        a: "Sim. GEO é construído em cima do SEO. Credibilidade técnica, conteúdo estruturado e sinais de autoridade alimentam ambos. Tratamos como uma estratégia unificada.",
      },
      {
        cat: "Preços",
        q: "Vocês oferecem planos de retainer mensais?",
        a: "Sim. Após o lançamento, oferecemos retainers contínuos para SEO, GEO, conteúdo e manutenção do site. São personalizados por cliente e revisados trimestralmente.",
      },
      {
        cat: "Processo",
        q: "Posso ver exemplos de trabalhos anteriores?",
        a: "Sim — confira nossa página de Cases para análises detalhadas de projetos recentes, resultados alcançados e as estratégias por trás deles.",
      },
      {
        cat: "Processo",
        q: "Sou dono do site após a entrega?",
        a: "Completamente. Você possui 100% do código, arquivos de design e credenciais de hospedagem. Entregamos tudo e passamos de forma limpa.",
      },
      {
        cat: "Web Design",
        q: "Vocês podem reformular meu site existente?",
        a: "Sim. Redesigns são um dos nossos projetos mais comuns. Auditamos seu site atual, identificamos gargalos de conversão e reconstruímos com uma estratégia clara — não apenas um refresh visual.",
      },
    ],
  },
};

export function FaqPage({ lang }: FaqPageProps) {
  const tx = t[lang];
  const [activeCategory, setActiveCategory] = useState(lang === "en" ? "All" : "Todos");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Map EN cats to PT and vice versa for filtering
  const catMap: Record<string, string> = {
    "Web Design": "Web Design",
    "SEO": "SEO",
    "GEO": "GEO",
    "Pricing": "Preços",
    "Process": "Processo",
    "Preços": "Pricing",
    "Processo": "Process",
  };

  const filteredFaqs = activeCategory === (lang === "en" ? "All" : "Todos")
    ? tx.faqs
    : tx.faqs.filter((f) => f.cat === activeCategory || f.cat === catMap[activeCategory]);

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
          fontSize: "clamp(36px, 6vw, 72px)",
          color: "var(--text)",
          margin: "0 0 20px",
          lineHeight: 1.05,
        }}>
          {tx.title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 18, maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
          {tx.subtitle}
        </p>
      </section>

      {/* Category Filter */}
      <section style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 56 }}>
          {tx.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              style={{
                padding: "8px 20px",
                borderRadius: 100,
                border: activeCategory === cat ? "1px solid var(--gold)" : "1px solid rgba(255,255,255,0.1)",
                background: activeCategory === cat ? "rgba(212,160,23,0.12)" : "transparent",
                color: activeCategory === cat ? "var(--gold)" : "var(--text-muted)",
                fontSize: 13,
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredFaqs.map((faq, i) => (
            <div
              key={i}
              style={{
                border: "1px solid",
                borderColor: openIndex === i ? "rgba(212,160,23,0.3)" : "rgba(255,255,255,0.06)",
                borderRadius: 10,
                overflow: "hidden",
                background: openIndex === i ? "rgba(212,160,23,0.04)" : "rgba(255,255,255,0.02)",
                transition: "all 0.2s",
                marginBottom: 4,
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1 }}>
                  <span style={{
                    display: "inline-block",
                    background: "rgba(212,160,23,0.1)",
                    color: "var(--gold)",
                    fontSize: 10,
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 4,
                    whiteSpace: "nowrap",
                    marginTop: 2,
                    flexShrink: 0,
                  }}>
                    {faq.cat}
                  </span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>
                    {faq.q}
                  </span>
                </div>
                <span style={{
                  color: "var(--gold)",
                  fontSize: 20,
                  fontWeight: 300,
                  flexShrink: 0,
                  transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.25s",
                  lineHeight: 1,
                }}>
                  +
                </span>
              </button>
              {openIndex === i && (
                <div style={{ padding: "0 24px 20px 24px", paddingLeft: 60 }}>
                  <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", padding: "60px 24px 0" }}>
        <div style={{
          maxWidth: 540,
          margin: "0 auto",
          padding: "48px 40px",
          background: "rgba(212,160,23,0.05)",
          border: "1px solid rgba(212,160,23,0.15)",
          borderRadius: 16,
        }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "var(--text)", marginBottom: 12 }}>
            {lang === "en" ? "Still have questions?" : "Ainda tem dúvidas?"}
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
            {lang === "en"
              ? "Talk to us directly. No sales pressure, just straight answers."
              : "Fale com a gente diretamente. Sem pressão de venda, só respostas diretas."}
          </p>
          <a
            href="mailto:rhuankb@gmail.com"
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
              transition: "opacity 0.2s",
            }}
          >
            {lang === "en" ? "Send us a message" : "Enviar mensagem"}
          </a>
        </div>
      </section>
    </main>
  );
}
