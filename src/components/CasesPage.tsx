import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cases as portfolioCases, caseText, disciplineLabels } from "../lib/cases";

interface CasesPageProps { lang: "en" | "pt"; }

const t = {
  en: {
    breadcrumb: "Home",
    label: "Case Studies",
    title: "Selected digital\nwork.",
    sub: "Real-world work across platforms, markets, and disciplines, presented without unverified outcome claims.",
    all: "All",
    platforms: "Platforms",
    disciplines: "Disciplines",
    empty: "No projects match these filters.",
    clear: "Clear filters",
    project: "project",
    projects: "projects",
    readCase: "Read case study",
    ctaLabel: "Ready to see results?",
    ctaSub: "Tell us about your business. We'll show you what's possible.",
    ctaBtn: "Get in touch",
  },
  pt: {
    breadcrumb: "Início",
    label: "Cases",
    title: "Trabalho digital\nselecionado.",
    sub: "Trabalho real em diferentes plataformas, mercados e disciplinas, com foco no que foi entregue.",
    all: "Todos",
    platforms: "Plataformas",
    disciplines: "Disciplinas",
    empty: "Nenhum projeto combina com esses filtros.",
    clear: "Limpar filtros",
    project: "projeto",
    projects: "projetos",
    readCase: "Ler case",
    ctaLabel: "Pronto para ver resultados?",
    ctaSub: "Conte sobre o seu negócio. Vamos mostrar o que é possível.",
    ctaBtn: "Fale conosco",
  },
};

const platforms = ["AEM", "React", "Shopify", "WordPress", "Headless Commerce"];
const disciplines = ["Web Design", "Frontend", "SEO", "GEO", "Performance", "Commerce", "Support"];

export function CasesPage({ lang }: CasesPageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [platform, setPlatform] = useState("All");
  const [discipline, setDiscipline] = useState("All");
  const filtered = portfolioCases.filter(item =>
    (platform === "All" || item.platform === platform) &&
    (discipline === "All" || item.disciplines.includes(discipline))
  );

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
                  { n: "14", l: lang === "pt" ? "Projetos" : "Projects" },
                  { n: "5", l: lang === "pt" ? "Plataformas" : "Platforms" },
                  { n: "Global + local", l: lang === "pt" ? "Alcance" : "Reach" },
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

          <div className="reveal case-filter-groups" style={{ marginBottom: 48 }}>
            <div className="case-filter-row" role="group" aria-label={t[lang].platforms}>
              <span className="case-filter-label">{t[lang].platforms}</span>
              {["All", ...platforms].map(value => (
                <button key={value} type="button" className="tag" aria-pressed={platform === value} onClick={() => setPlatform(value)}>
                  {value === "All" ? t[lang].all : value}
                </button>
              ))}
            </div>
            <div className="case-filter-row" role="group" aria-label={t[lang].disciplines}>
              <span className="case-filter-label">{t[lang].disciplines}</span>
              {["All", ...disciplines].map(value => (
                <button key={value} type="button" className="tag" aria-pressed={discipline === value} onClick={() => setDiscipline(value)}>
                  {value === "All" ? t[lang].all : caseText(disciplineLabels[value], lang)}
                </button>
              ))}
            </div>
            <span aria-live="polite" style={{ fontSize: 12, color: "var(--text-dim)" }}>
              {filtered.length} {filtered.length === 1 ? t[lang].project : t[lang].projects}
            </span>
          </div>

          {/* Cases list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {filtered.map((c, i) => (
              <Link key={c.id} to={`/cases/${c.id}`} data-case-card style={{ textDecoration: "none" }}>
                <div
                  className="case-list-item"
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
                    <img src={c.heroImage.src} alt={caseText(c.heroImage.alt, lang)} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${c.accent}30 0%, transparent 60%)` }} />
                    {/* Tag overlay */}
                    <div className="tag" style={{ position: "absolute", top: 10, left: 10 }}>{c.platform}</div>
                  </div>

                  {/* Content */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 8, letterSpacing: "0.05em" }}>{c.client} · {caseText(c.market, lang)}</div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px, 2.2vw, 26px)", lineHeight: 1.2, marginBottom: 10, color: "var(--text)" }}>
                      {caseText(c.title, lang)}
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 16 }}>{caseText(c.summary, lang)}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {c.disciplines.map((s, j) => (
                        <span key={j} style={{ fontSize: 10, color: "var(--text-dim)", border: "1px solid rgba(212,160,23,0.1)", padding: "3px 8px", borderRadius: 4 }}>{caseText(disciplineLabels[s], lang)}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-end", flexShrink: 0, minWidth: 120 }}>
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
            {filtered.length === 0 && (
              <div className="case-empty">
                <p>{t[lang].empty}</p>
                <button type="button" className="btn-outline" onClick={() => { setPlatform("All"); setDiscipline("All"); }}>
                  {t[lang].clear}
                </button>
              </div>
            )}
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
