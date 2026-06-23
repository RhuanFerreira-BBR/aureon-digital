import { useEffect, useRef, useState } from "react";

interface TestimonialsProps { lang: "en" | "pt"; }

const t = {
  en: {
    label: "Clients",
    title: "They found\ntheir era.",
    items: [
      { q: "AUREON transformed our online presence. In 3 months we tripled organic traffic and our lead quality improved dramatically.", name: "Carlos M.", role: "CEO, TechBrasil", initials: "CM", color: "#4A90E2" },
      { q: "The GEO strategy put us inside AI answers for health queries in São Paulo. 30% of our new patients now cite AI as how they found us.", name: "Dra. Ana F.", role: "Founder, Clínica Saúde Prime", initials: "AF", color: "#4AE2A0" },
      { q: "The web redesign doubled our conversion rate. We didn't increase our ad budget — we just stopped wasting the traffic we already had.", name: "Renata L.", role: "CMO, ModaVida", initials: "RL", color: "#E24A7A" },
      { q: "From zero digital presence to market leader in 8 months. AUREON built everything — brand, website, SEO, GEO — and delivered beyond expectations.", name: "Pedro C.", role: "Director, Construtora Forma", initials: "PC", color: "#E2A44A" },
    ],
  },
  pt: {
    label: "Clientes",
    title: "Eles encontraram\nsua era.",
    items: [
      { q: "A AUREON transformou nossa presença online. Em 3 meses triplicamos o tráfego orgânico e a qualidade dos leads melhorou dramaticamente.", name: "Carlos M.", role: "CEO, TechBrasil", initials: "CM", color: "#4A90E2" },
      { q: "A estratégia de GEO nos colocou nas respostas de IA para consultas de saúde em São Paulo. 30% dos nossos novos pacientes citam a IA como forma de nos encontrar.", name: "Dra. Ana F.", role: "Fundadora, Clínica Saúde Prime", initials: "AF", color: "#4AE2A0" },
      { q: "O redesign do site dobrou nossa taxa de conversão. Não aumentamos o orçamento de anúncios — apenas paramos de desperdiçar o tráfego que já tínhamos.", name: "Renata L.", role: "CMO, ModaVida", initials: "RL", color: "#E24A7A" },
      { q: "De zero presença digital a líder de mercado em 8 meses. A AUREON construiu tudo — marca, site, SEO, GEO — e entregou além das expectativas.", name: "Pedro C.", role: "Diretor, Construtora Forma", initials: "PC", color: "#E2A44A" },
    ],
  },
};

export function Testimonials({ lang }: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

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

  const items = t[lang].items;

  return (
    <section ref={sectionRef} style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <div className="glow-dot" style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(212,160,23,0.05) 0%, transparent 70%)", bottom: 0, right: "10%" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <div>
            <div className="section-label reveal">{t[lang].label}</div>
            <h2 className="reveal" style={{ fontSize: "clamp(36px, 4vw, 60px)", whiteSpace: "pre-line", lineHeight: 1.05 }}>
              {t[lang].title.split("\n").map((l, i) => (
                <span key={i} style={{ display: "block", ...(i === 1 ? { color: "var(--gold)" } : {}) }}>{l}</span>
              ))}
            </h2>

            {/* Selector tabs */}
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 36 }}>
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px",
                    background: active === i ? "var(--surface)" : "transparent",
                    border: `1px solid ${active === i ? "var(--border-bright)" : "transparent"}`,
                    borderRadius: 6, cursor: "pointer", transition: "all 0.2s", textAlign: "left",
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: item.color + "22",
                    border: `1px solid ${item.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: item.color, flexShrink: 0,
                    fontFamily: "var(--font-display)",
                  }}>{item.initials}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: active === i ? "var(--text)" : "var(--text-muted)" }}>{item.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{item.role}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: quote */}
          <div className="reveal">
            <div style={{
              position: "relative",
              background: "var(--surface)", border: "1px solid var(--border-dim)",
              padding: "48px 48px 40px",
              borderRadius: 2,
            }}>
              {/* Quote mark */}
              <div style={{
                position: "absolute", top: 32, right: 40,
                fontFamily: "Georgia, serif", fontSize: 120, lineHeight: 1,
                color: "rgba(212,160,23,0.08)", pointerEvents: "none",
                fontWeight: 700, userSelect: "none",
              }}>"</div>

              {/* Stars */}
              <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="var(--gold)">
                    <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 2 .7-4.1-3-2.9 4.2-.8z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.55,
                color: "var(--text)", fontStyle: "italic", fontWeight: 300,
                marginBottom: 36,
                transition: "opacity 0.3s",
              }}>
                "{items[active].q}"
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: "1px solid var(--border-dim)", paddingTop: 24 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: items[active].color + "22",
                  border: `2px solid ${items[active].color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: items[active].color,
                  fontFamily: "var(--font-display)",
                }}>{items[active].initials}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{items[active].name}</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{items[active].role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div > div { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
