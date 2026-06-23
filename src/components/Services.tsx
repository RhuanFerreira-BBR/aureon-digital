import { useEffect, useRef } from "react";

interface ServicesProps { lang: "en" | "pt"; }

const t = {
  en: {
    label: "What we do",
    title: "Three pillars.\nOne goal.",
    sub: "Everything your brand needs to be discovered, trusted, and chosen.",
    items: [
      {
        num: "01", tag: "Web Design",
        title: "Websites that convert,\nnot just impress.",
        desc: "Premium digital experiences built on conversion science. Fast, accessible, and crafted to reflect your brand at its peak.",
        points: ["UI/UX Design", "Frontend Development", "Performance Optimization", "CRO"],
        icon: "M3 3h18v14H3z M7 21h10 M12 17v4",
      },
      {
        num: "02", tag: "SEO",
        title: "Organic visibility that\ncompounds over time.",
        desc: "We position you in front of the right people at the right moment. No tricks — just systematic, durable authority building.",
        points: ["Technical SEO Audit", "Content Architecture", "Link Building", "Performance Tracking"],
        icon: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
      },
      {
        num: "03", tag: "GEO",
        title: "Appear in AI answers.\nBefore competitors do.",
        desc: "The next frontier of search. We position your brand inside ChatGPT, Perplexity, and Google AI Overviews — where your future clients are already looking.",
        points: ["AI Search Optimization", "Entity SEO", "LLM Citation Building", "Generative Visibility"],
        icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
      },
    ],
  },
  pt: {
    label: "O que fazemos",
    title: "Três pilares.\nUm objetivo.",
    sub: "Tudo que sua marca precisa para ser descoberta, confiada e escolhida.",
    items: [
      {
        num: "01", tag: "Web Design",
        title: "Sites que convertem,\nnão só impressionam.",
        desc: "Experiências digitais premium construídas com ciência de conversão. Rápido, acessível e crafted para refletir sua marca no auge.",
        points: ["UI/UX Design", "Desenvolvimento Frontend", "Otimização de Performance", "CRO"],
        icon: "M3 3h18v14H3z M7 21h10 M12 17v4",
      },
      {
        num: "02", tag: "SEO",
        title: "Visibilidade orgânica que\nse multiplica ao longo do tempo.",
        desc: "Posicionamos você na frente das pessoas certas, no momento certo. Sem truques — apenas construção sistemática de autoridade.",
        points: ["Auditoria SEO Técnica", "Arquitetura de Conteúdo", "Link Building", "Rastreamento de Performance"],
        icon: "M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
      },
      {
        num: "03", tag: "GEO",
        title: "Apareça em respostas de IA.\nAntes dos concorrentes.",
        desc: "A próxima fronteira da busca. Posicionamos sua marca dentro do ChatGPT, Perplexity e Google AI Overviews — onde seus futuros clientes já estão procurando.",
        points: ["Otimização para Busca por IA", "Entity SEO", "Citações em LLM", "Visibilidade Generativa"],
        icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
      },
    ],
  },
};

export function Services({ lang }: ServicesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--void), var(--void2), var(--void))" }} />
      <div className="glow-dot" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 80 }}>
          <div className="section-label reveal">{t[lang].label}</div>
          <h2 className="reveal" style={{ fontSize: "clamp(40px, 5vw, 72px)", whiteSpace: "pre-line", lineHeight: 1.05, marginBottom: 20 }}>
            {t[lang].title.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block", ...(i === 1 ? { color: "var(--gold)" } : {}) }}>{line}</span>
            ))}
          </h2>
          <p className="reveal" style={{ fontSize: 18, color: "var(--text-muted)", lineHeight: 1.6 }}>{t[lang].sub}</p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 1 }}>
          {t[lang].items.map((item, i) => (
            <div
              key={i}
              className="reveal card-hover"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-dim)",
                padding: "48px 40px",
                position: "relative",
                cursor: "default",
                transition: "all 0.3s ease",
                transitionDelay: `${i * 100}ms`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border-bright)";
                el.style.background = "var(--surface2)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border-dim)";
                el.style.background = "var(--surface)";
              }}
            >
              {/* Number */}
              <div style={{
                position: "absolute", top: 32, right: 32,
                fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 72,
                color: "rgba(212,160,23,0.04)", lineHeight: 1, pointerEvents: "none",
              }}>{item.num}</div>

              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 8,
                background: "rgba(212,160,23,0.08)",
                border: "1px solid var(--border-bright)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 28,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon} />
                </svg>
              </div>

              {/* Tag */}
              <div className="tag" style={{ marginBottom: 16, fontSize: 10 }}>{item.tag}</div>

              {/* Title */}
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 700,
                fontSize: "clamp(20px, 2.2vw, 26px)",
                lineHeight: 1.2, marginBottom: 16,
                whiteSpace: "pre-line",
              }}>{item.title}</h3>

              {/* Desc */}
              <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.65, marginBottom: 32 }}>{item.desc}</p>

              {/* Points */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {item.points.map((p, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{p}</span>
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, var(--gold), var(--gold-light))",
                transform: "scaleX(0)", transformOrigin: "left",
                transition: "transform 0.4s ease",
              }} className="service-bar" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .card-hover:hover .service-bar { transform: scaleX(1) !important; }
      `}</style>
    </section>
  );
}
