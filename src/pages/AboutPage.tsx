interface AboutPageProps {
  lang: "en" | "pt";
}

const t = {
  en: {
    badge: "About",
    title: "We build brands that get found.",
    subtitle: "Aureon is a digital agency built for the AI era. We combine web design, SEO, and GEO to make businesses easy to find — on search engines and inside AI.",
    missionTitle: "Our Mission",
    missionText: "Most agencies sell deliverables. We sell outcomes. Our mission is simple: make your business the most visible, credible, and clickable option in your market — whether that's a Google result, an AI recommendation, or a first impression on your homepage.",
    valuesTitle: "What drives us",
    values: [
      { icon: "◈", title: "Strategy first", desc: "We don't design without understanding. Every decision — color, copy, code — is rooted in your audience and goals." },
      { icon: "◎", title: "Obsessive quality", desc: "We'd rather launch one perfect project than three mediocre ones. Standards aren't negotiable." },
      { icon: "◐", title: "Radical transparency", desc: "You always know what we're working on, why, and what it's producing. No fog, no fluff." },
      { icon: "◈", title: "Long-term thinking", desc: "We build assets that compound. A great website + great SEO creates a machine that works while you sleep." },
    ],
    teamTitle: "The team",
    teamText: "Aureon was founded in 2026 by a team of designers, developers, and growth strategists who got tired of watching great businesses be invisible online. We're based in Brazil, work globally, and move fast.",
    statsTitle: "In numbers",
    stats: [
      { number: "40+", label: "Projects delivered" },
      { number: "3×", label: "Average organic growth" },
      { number: "4–8wk", label: "Average delivery time" },
      { number: "100%", label: "Client code ownership" },
    ],
    ctaTitle: "Ready to work together?",
    ctaText: "Tell us about your project. We'll tell you exactly how we'd approach it.",
    ctaBtn: "Start a conversation",
  },
  pt: {
    badge: "Sobre",
    title: "Construímos marcas que são encontradas.",
    subtitle: "Aureon é uma agência digital construída para a era da IA. Combinamos web design, SEO e GEO para tornar negócios fáceis de encontrar — em mecanismos de busca e dentro da IA.",
    missionTitle: "Nossa Missão",
    missionText: "A maioria das agências vende entregáveis. Nós vendemos resultados. Nossa missão é simples: tornar seu negócio a opção mais visível, confiável e clicável no seu mercado — seja um resultado no Google, uma recomendação de IA, ou uma primeira impressão na sua homepage.",
    valuesTitle: "O que nos move",
    values: [
      { icon: "◈", title: "Estratégia primeiro", desc: "Não desenhamos sem entender. Cada decisão — cor, copy, código — é enraizada no seu público e objetivos." },
      { icon: "◎", title: "Qualidade obsessiva", desc: "Prefirimos lançar um projeto perfeito a três mediocres. Padrões não são negociáveis." },
      { icon: "◐", title: "Transparência radical", desc: "Você sempre sabe no que estamos trabalhando, por quê, e o que está produzindo. Sem névoa, sem enrolação." },
      { icon: "◈", title: "Pensamento de longo prazo", desc: "Construímos ativos que se acumulam. Um site excelente + SEO excelente cria uma máquina que trabalha enquanto você dorme." },
    ],
    teamTitle: "O time",
    teamText: "A Aureon foi fundada em 2026 por um time de designers, desenvolvedores e estrategistas de crescimento que se cansaram de ver ótimos negócios serem invisíveis online. Somos baseados no Brasil, atuamos globalmente e nos movemos rápido.",
    statsTitle: "Em números",
    stats: [
      { number: "40+", label: "Projetos entregues" },
      { number: "3×", label: "Crescimento orgânico médio" },
      { number: "4–8sem", label: "Tempo médio de entrega" },
      { number: "100%", label: "Código pertence ao cliente" },
    ],
    ctaTitle: "Pronto para trabalhar juntos?",
    ctaText: "Conte sobre seu projeto. Te diremos exatamente como abordaríamos.",
    ctaBtn: "Iniciar conversa",
  },
};

export function AboutPage({ lang }: AboutPageProps) {
  const tx = t[lang];

  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 80px", textAlign: "center" }}>
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
          margin: "0 0 24px",
          lineHeight: 1.05,
        }}>
          {tx.title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 20, maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
          {tx.subtitle}
        </p>
      </section>

      {/* Mission */}
      <section style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{
          background: "rgba(212,160,23,0.04)",
          border: "1px solid rgba(212,160,23,0.12)",
          borderRadius: 16,
          padding: "48px 48px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: 13,
            color: "var(--gold)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 20,
          }}>
            {tx.missionTitle}
          </h2>
          <p style={{ color: "var(--text)", fontSize: 20, lineHeight: 1.7, margin: 0, maxWidth: 640 }}>
            {tx.missionText}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 13,
          color: "var(--gold)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 32,
          textAlign: "center",
        }}>
          {tx.statsTitle}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {tx.stats.map((s, i) => (
            <div key={i} style={{
              padding: "32px 24px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              textAlign: "center",
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                color: "var(--gold)",
                lineHeight: 1,
                marginBottom: 8,
              }}>
                {s.number}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 13,
          color: "var(--gold)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 32,
          textAlign: "center",
        }}>
          {tx.valuesTitle}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
          {tx.values.map((v, i) => (
            <div key={i} style={{
              padding: "28px 28px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
              display: "flex",
              gap: 16,
              alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 22, color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>{v.icon}</span>
              <div>
                <h3 style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
                  {v.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ maxWidth: 840, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: 13,
          color: "var(--gold)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 20,
          textAlign: "center",
        }}>
          {tx.teamTitle}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.7, textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
          {tx.teamText}
        </p>
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
            }}
          >
            {tx.ctaBtn}
          </a>
        </div>
      </section>
    </main>
  );
}
