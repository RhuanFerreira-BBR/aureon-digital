import { useEffect, useRef, useState } from "react";

interface StatsProps { lang: "en" | "pt"; }

const t = {
  en: {
    label: "Results",
    title: "Numbers that speak.",
    sub: "Across 40+ projects in Brazil, the pattern is consistent: businesses that invest in digital presence compound their returns.",
    stats: [
      { value: 3, suffix: "×", label: "Average organic traffic increase", desc: "Across SEO clients in the first 90 days" },
      { value: 40, suffix: "+", label: "Projects delivered", desc: "Web design, SEO, and GEO across sectors" },
      { value: 98, suffix: "%", label: "Client satisfaction", desc: "Based on post-project surveys" },
      { value: 14, suffix: "×", label: "Average ROI", desc: "Digital investment vs. revenue generated" },
    ],
  },
  pt: {
    label: "Resultados",
    title: "Números que falam.",
    sub: "Em mais de 40 projetos no Brasil, o padrão é consistente: empresas que investem em presença digital multiplicam seus retornos.",
    stats: [
      { value: 3, suffix: "×", label: "Crescimento médio de tráfego orgânico", desc: "Em clientes SEO nos primeiros 90 dias" },
      { value: 40, suffix: "+", label: "Projetos entregues", desc: "Web design, SEO e GEO em vários setores" },
      { value: 98, suffix: "%", label: "Satisfação de clientes", desc: "Com base em pesquisas pós-projeto" },
      { value: 14, suffix: "×", label: "ROI médio", desc: "Investimento digital vs. receita gerada" },
    ],
  },
};

function useCounter(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return val;
}

function StatItem({ s, active, i }: { s: { value: number; suffix: string; label: string; desc: string }; active: boolean; i: number }) {
  const count = useCounter(s.value, active);
  return (
    <div
      className="counter-item"
      style={{
        padding: "48px 40px",
        borderRight: "1px solid var(--border-dim)",
        borderBottom: "1px solid var(--border-dim)",
        position: "relative",
        animationDelay: `${i * 120}ms`,
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1, color: "var(--gold)", marginBottom: 12 }}>
        {count}{s.suffix}
      </div>
      <div style={{ fontSize: 15, color: "var(--text)", fontWeight: 600, marginBottom: 6 }}>{s.label}</div>
      <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>{s.desc}</div>
    </div>
  );
}

export function Stats({ lang }: StatsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll(".reveal") ?? [];
    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObs.unobserve(e.target);
        }
      }),
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    reveals.forEach(el => revealObs.observe(el));

    // Counter trigger
    const counterObs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          setActive(true);
          // Also trigger counter-items
          e.target.querySelectorAll(".counter-item").forEach(el => el.classList.add("visible"));
          counterObs.disconnect();
        }
      }),
      { threshold: 0.2 }
    );
    if (sectionRef.current) counterObs.observe(sectionRef.current);

    return () => {
      revealObs.disconnect();
      counterObs.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "120px 0", position: "relative" }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, background: "var(--void2)" }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.6 }} />
      <div className="glow-dot" style={{ width: 800, height: 400, background: "radial-gradient(ellipse, rgba(212,160,23,0.05) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 80px" }}>
          <div className="section-label reveal" style={{ justifyContent: "center" }}>{t[lang].label}</div>
          <h2 className="reveal" style={{ fontSize: "clamp(40px, 5vw, 64px)", marginBottom: 16 }}>{t[lang].title}</h2>
          <p className="reveal" style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.65 }}>{t[lang].sub}</p>
        </div>

        {/* Stats grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          border: "1px solid var(--border-dim)",
          background: "var(--surface)",
        }}>
          {t[lang].stats.map((s, i) => (
            <StatItem key={i} s={s} active={active} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
