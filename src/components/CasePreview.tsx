import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { cases } from "../lib/data";

interface CasePreviewProps { lang: "en" | "pt"; }

const t = {
  en: { label: "Selected Work", title: "Results we're\nproud of.", sub: "A curated look at work that moved the needle.", viewAll: "View all cases", readCase: "Read case" },
  pt: { label: "Trabalho Selecionado", title: "Resultados dos\nquais nos orgulhamos.", sub: "Uma seleção de trabalhos que fizeram diferença.", viewAll: "Ver todos os cases", readCase: "Ler case" },
};

export function CasePreview({ lang }: CasePreviewProps) {
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

  const preview = cases.slice(0, 3);

  return (
    <section ref={sectionRef} style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "var(--void2)" }} />
      <div className="glow-dot" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(212,160,23,0.05) 0%, transparent 70%)", top: "20%", right: "-5%" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="section-label reveal">{t[lang].label}</div>
            <h2 className="reveal" style={{ fontSize: "clamp(40px, 5vw, 68px)", whiteSpace: "pre-line", lineHeight: 1.0 }}>
              {t[lang].title.split("\n").map((l, i) => (
                <span key={i} style={{ display: "block", ...(i === 1 ? { color: "var(--gold)" } : {}) }}>{l}</span>
              ))}
            </h2>
          </div>
          <Link to="/cases" className="btn-outline reveal" style={{ textDecoration: "none", flexShrink: 0 }}>{t[lang].viewAll}</Link>
        </div>

        {/* Cases */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 2 }}>
          {preview.map((c, i) => (
            <Link key={c.id} to={`/cases/${c.id}`} style={{ textDecoration: "none" }}>
              <div
                className="reveal card-hover"
                style={{
                  position: "relative",
                  background: "var(--surface)",
                  border: "1px solid var(--border-dim)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transitionDelay: `${i * 80}ms`,
                  height: i === 0 ? 460 : 300,
                }}
              >
                <img src={c.image} alt={c.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3, transition: "opacity 0.4s, transform 0.6s cubic-bezier(0.16,1,0.3,1)" }} className="case-preview-img" />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(8,9,15,0.95) 0%, ${c.color}11 100%)` }} />

                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 28 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
                    <div className="tag">{c.tag}</div>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{c.year}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>{c.client}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: i === 0 ? "clamp(18px, 2.2vw, 24px)" : 17, lineHeight: 1.25, color: "var(--text)", marginBottom: 12 }}>
                    {c.title}
                  </h3>
                  {i === 0 && (
                    <div style={{ display: "flex", gap: 20 }}>
                      {c.metrics.slice(0, 2).map((m, j) => (
                        <div key={j}>
                          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--gold)" }}>{m.value}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .card-hover:hover .case-preview-img { opacity: 0.45 !important; transform: scale(1.04); }
        @media (max-width: 900px) {
          section > div > div:last-child { grid-template-columns: 1fr !important; }
          section > div > div:last-child > a > div { height: 280px !important; }
        }
      `}</style>
    </section>
  );
}
