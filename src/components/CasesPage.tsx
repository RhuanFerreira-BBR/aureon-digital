import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cases } from "../lib/data";

interface CasesPageProps { lang: "en" | "pt"; }

const t = {
  en: {
    breadcrumb: "Home",
    label: "Case Studies",
    title: "Work that\nmoves numbers.",
    sub: "Real results, real clients. Every case here is built on data, not vanity metrics.",
    all: "All",
    back: "← Back to Cases",
    services: "Services",
    industry: "Industry",
    year: "Year",
    metrics: "Key Results",
    challenge: "The Challenge",
    solution: "The Solution",
    result: "The Result",
    readCase: "Read case study",
    allCases: "All Cases",
    nextCase: "Next Case",
    startProject: "Start your project",
    ctaLabel: "Ready to see results?",
    ctaSub: "Tell us about your business. We'll show you what's possible.",
    ctaBtn: "Get in touch",
  },
  pt: {
    breadcrumb: "Início",
    label: "Cases",
    title: "Trabalho que\nmove números.",
    sub: "Resultados reais, clientes reais. Cada case aqui é construído com dados, não métricas de vaidade.",
    all: "Todos",
    back: "← Voltar para Cases",
    services: "Serviços",
    industry: "Setor",
    year: "Ano",
    metrics: "Principais Resultados",
    challenge: "O Desafio",
    solution: "A Solução",
    result: "O Resultado",
    readCase: "Ler case",
    allCases: "Todos os Cases",
    nextCase: "Próximo Case",
    startProject: "Iniciar projeto",
    ctaLabel: "Pronto para ver resultados?",
    ctaSub: "Conte sobre o seu negócio. Vamos mostrar o que é possível.",
    ctaBtn: "Fale conosco",
  },
};

const tagColors: Record<string, string> = {
  SEO: "#4A90E2",
  "Web Design": "#E24A7A",
  GEO: "#4AE2A0",
  "Full Stack": "#E2A44A",
};

function FilterBar({ tags, active, setActive, all }: { tags: string[]; active: string; setActive: (t: string) => void; all: string }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {[all, ...tags].map(tag => (
        <button
          key={tag}
          onClick={() => setActive(tag)}
          style={{
            padding: "6px 16px", borderRadius: 100,
            border: active === tag ? "1px solid var(--gold)" : "1px solid rgba(212,160,23,0.18)",
            background: active === tag ? "rgba(212,160,23,0.12)" : "transparent",
            color: active === tag ? "var(--gold)" : "var(--text-muted)",
            fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.2s", fontFamily: "var(--font-display)",
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export function CasesPage({ lang }: CasesPageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState(t[lang].all);
  const allTags = [...new Set(cases.map(c => c.tag))];
  const filtered = activeFilter === t[lang].all ? cases : cases.filter(c => c.tag === activeFilter);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      const reveals = sectionRef.current?.querySelectorAll(".reveal") ?? [];
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        }),
        { threshold: 0, rootMargin: "0px 0px -40px 0px" }
      );
      reveals.forEach(el => obs.observe(el));
      return () => obs.disconnect();
    }, 50);
  }, []);

  return (
    <main ref={sectionRef} style={{ paddingTop: 72, minHeight: "100vh" }}>

      {/* Page Hero */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px 0 72px" }}>
        {/* BG */}
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 700, height: 500, background: "radial-gradient(ellipse at top right, rgba(212,160,23,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.2), transparent)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          {/* Breadcrumb */}
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
            <Link to="/" style={{ textDecoration: "none", color: "var(--text-dim)", fontSize: 12, transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-muted)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              {t[lang].breadcrumb}
            </Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 3L7.5 6l-3 3" stroke="var(--text-dim)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 12, color: "var(--gold)", fontWeight: 600 }}>{t[lang].label}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <div className="section-label reveal">{t[lang].label}</div>
              <h1 className="reveal" style={{ fontSize: "clamp(48px, 6vw, 80px)", lineHeight: 1.0, marginBottom: 0 }}>
                {t[lang].title.split("\n").map((line, i) => (
                  <span key={i} style={{ display: "block", ...(i === 1 ? { color: "var(--gold)" } : {}) }}>{line}</span>
                ))}
              </h1>
            </div>
            <div className="reveal" style={{ paddingBottom: 8 }}>
              <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 32 }}>{t[lang].sub}</p>
              {/* Stats */}
              <div className="teaser-metrics case-page-metrics" style={{ display: "flex", gap: 32 }}>
                {[
                  { n: cases.length + "+", l: lang === "pt" ? "Cases publicados" : "Cases published" },
                  { n: "4", l: lang === "pt" ? "Setores" : "Industries" },
                  { n: "2025–26", l: lang === "pt" ? "Período" : "Period" },
                ].map((stat, i) => (
                  <div key={i} className="teaser-metric">
                    <div className="teaser-metric-number" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--text)", lineHeight: 1 }}>{stat.n}</div>
                    <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4, letterSpacing: "0.05em" }}>{stat.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Cases */}
      <section style={{ padding: "60px 0 100px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

          {/* Filter */}
          <div className="reveal" style={{ marginBottom: 48, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <FilterBar tags={allTags} active={activeFilter} setActive={setActiveFilter} all={t[lang].all} />
            <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{filtered.length} {lang === "pt" ? "resultado(s)" : "result(s)"}</span>
          </div>

          {/* Cases list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {filtered.map((c, i) => (
              <Link key={c.id} to={`/cases/${c.id}`} style={{ textDecoration: "none" }}>
                <div
                  className="reveal case-list-item"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "280px 1fr auto",
                    gap: 40,
                    alignItems: "center",
                    padding: "32px 36px",
                    background: "var(--surface)",
                    border: "1px solid var(--border-dim)",
                    transition: "all 0.3s ease",
                    transitionDelay: `${i * 50}ms`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(212,160,23,0.35)";
                    e.currentTarget.style.background = "var(--surface2)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border-dim)";
                    e.currentTarget.style.background = "var(--surface)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {/* Image */}
                  <div style={{ height: 180, borderRadius: 4, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                    <img src={c.image} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${c.color}30 0%, transparent 60%)` }} />
                    {/* Tag overlay */}
                    <div style={{
                      position: "absolute", top: 10, left: 10,
                      padding: "3px 10px", borderRadius: 100,
                      background: `${tagColors[c.tag] || "var(--gold)"}22`,
                      border: `1px solid ${tagColors[c.tag] || "var(--gold)"}44`,
                      color: tagColors[c.tag] || "var(--gold)",
                      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                    }}>
                      {c.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 8, letterSpacing: "0.05em" }}>{c.client} · {c.industry} · {c.year}</div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px, 2.2vw, 26px)", lineHeight: 1.2, marginBottom: 10, color: "var(--text)" }}>
                      {c.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 16 }}>{c.desc}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {c.services.map((s, j) => (
                        <span key={j} style={{ fontSize: 10, color: "var(--text-dim)", border: "1px solid rgba(212,160,23,0.1)", padding: "3px 8px", borderRadius: 4 }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-end", flexShrink: 0, minWidth: 120 }}>
                    {c.metrics.slice(0, 2).map((m, j) => (
                      <div key={j} style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px, 2.5vw, 32px)", color: "var(--gold)", lineHeight: 1 }}>{m.value}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{m.label}</div>
                      </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--gold)", fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {t[lang].readCase}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border-dim)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <div className="section-label reveal" style={{ justifyContent: "center" }}>{t[lang].label}</div>
          <h2 className="reveal" style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1, marginBottom: 16 }}>{t[lang].ctaLabel}</h2>
          <p className="reveal" style={{ fontSize: 17, color: "var(--text-muted)", marginBottom: 36 }}>{t[lang].ctaSub}</p>
          <div className="reveal">
            <Link to="/#contact" className="btn-gold" style={{ textDecoration: "none" }}>
              {t[lang].ctaBtn}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 960px) {
          .case-list-item { grid-template-columns: 1fr !important; }
          .case-list-item > div:first-child { height: 220px !important; width: 100% !important; }
          .case-list-item > div:last-child { flex-direction: row !important; align-items: center !important; justify-content: flex-start !important; gap: 24px !important; }
        }
        @media (max-width: 991px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

export function CaseDetailPage({ lang, id }: { lang: "en" | "pt"; id: string }) {
  const c = cases.find(c => c.id === id);
  const sectionRef = useRef<HTMLElement>(null);
  const currentIdx = cases.findIndex(c => c.id === id);
  const nextCase = cases[(currentIdx + 1) % cases.length];

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      sectionRef.current?.querySelectorAll(".reveal").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 80);
      });
    }, 50);
  }, [id]);

  if (!c) return (
    <div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <p style={{ fontSize: 18, color: "var(--text-muted)", marginBottom: 24 }}>Case not found.</p>
        <Link to="/cases" className="btn-outline">← Back to Cases</Link>
      </div>
    </div>
  );

  return (
    <main ref={sectionRef} style={{ paddingTop: 72, minHeight: "100vh" }}>

      {/* Case Hero */}
      <div style={{ position: "relative", height: "55vh", minHeight: 420, overflow: "hidden" }}>
        <img src={c.image} alt={c.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(8,9,15,0.95) 0%, ${c.color}18 100%)` }} />
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: "linear-gradient(to bottom, transparent, var(--void))" }} />

        {/* Content */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 1280, margin: "0 auto", padding: "0 32px 48px", left: 0, right: 0 }}>
          {/* Breadcrumb */}
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <Link to="/" style={{ textDecoration: "none", color: "var(--text-dim)", fontSize: 12 }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-muted)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              {t[lang].breadcrumb}
            </Link>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2.5L6.5 5l-3 2.5" stroke="var(--text-dim)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <Link to="/cases" style={{ textDecoration: "none", color: "var(--text-dim)", fontSize: 12 }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-muted)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              {t[lang].allCases}
            </Link>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2.5L6.5 5l-3 2.5" stroke="var(--text-dim)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ fontSize: 12, color: "var(--gold)", fontWeight: 600 }}>{c.client}</span>
          </div>

          <div className="tag reveal" style={{ width: "fit-content", marginBottom: 14, background: `${tagColors[c.tag] || "var(--gold)"}15`, borderColor: `${tagColors[c.tag] || "var(--gold)"}40`, color: tagColors[c.tag] || "var(--gold)" }}>
            {c.tag}
          </div>
          <div className="reveal" style={{ fontSize: 13, color: "var(--text-dim)", marginBottom: 10, letterSpacing: "0.04em" }}>{c.client}</div>
          <h1 className="reveal" style={{ fontSize: "clamp(28px, 5vw, 60px)", lineHeight: 1.1, maxWidth: 820 }}>{c.title}</h1>
        </div>
      </div>

      {/* Meta bar */}
      <div style={{ background: "var(--surface2)", borderBottom: "1px solid var(--border-dim)", borderTop: "1px solid var(--border-dim)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div className="case-meta-list" style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {[
              { l: t[lang].industry, v: c.industry },
              { l: t[lang].year, v: c.year },
              { l: t[lang].services, v: c.services.join(" · ") },
            ].map((item, i) => (
              <div key={i} className="case-meta-item" style={{ padding: "20px 32px", borderRight: i < 2 ? "1px solid var(--border-dim)" : "none", flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontWeight: 700 }}>{item.l}</div>
                <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section style={{ padding: "72px 0 100px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div className="case-detail-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 80, alignItems: "start" }}>

            {/* Main */}
            <div>
              {/* Metrics row */}
              <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border-dim)", marginBottom: 64, borderRadius: 4, overflow: "hidden" }}>
                {c.metrics.map((m, i) => (
                  <div key={i} style={{ background: "var(--surface)", padding: "24px 20px", textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px, 3vw, 40px)", color: "var(--gold)", lineHeight: 1, marginBottom: 6 }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.4 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Body sections */}
              {[
                { label: t[lang].challenge, content: c.challenge, icon: "⚠" },
                { label: t[lang].solution, content: c.solution, icon: "⚡" },
                { label: t[lang].result, content: c.result, icon: "✓" },
              ].map((sec, i) => (
                <div key={i} className="reveal" style={{ marginBottom: 52, paddingBottom: 52, borderBottom: i < 2 ? "1px solid var(--border-dim)" : "none" }}>
                  <div className="section-label" style={{ marginBottom: 20 }}>{sec.label}</div>
                  <p style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.8 }}>{sec.content}</p>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div style={{ position: "sticky", top: 104 }}>
              {/* Services card */}
              <div className="reveal" style={{ background: "var(--surface)", border: "1px solid var(--border-dim)", borderRadius: 4, padding: "28px 24px", marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>{t[lang].services}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {c.services.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="reveal">
                <Link to="/#contact" className="btn-gold" style={{ textDecoration: "none", width: "100%", justifyContent: "center", display: "flex", boxSizing: "border-box", marginBottom: 12 }}>
                  {t[lang].startProject}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/cases" className="btn-outline" style={{ textDecoration: "none", width: "100%", justifyContent: "center", display: "flex", boxSizing: "border-box" }}>
                  {t[lang].allCases}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next case */}
      {nextCase && (
        <section style={{ borderTop: "1px solid var(--border-dim)" }}>
          <Link to={`/cases/${nextCase.id}`} style={{ textDecoration: "none", display: "block" }}>
            <div
              style={{ position: "relative", overflow: "hidden", padding: "60px 0", transition: "background 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{t[lang].nextCase}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(20px, 3vw, 32px)", color: "var(--text)" }}>{nextCase.title}</h3>
                  <div style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 6 }}>{nextCase.client} · {nextCase.tag}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--gold)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {t[lang].readCase}
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      <style>{`
        @media (max-width: 960px) {
          .case-detail-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .case-detail-grid > div:last-child { position: static !important; }
        }
        @media (max-width: 600px) {
          .case-detail-grid > div > div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  );
}
