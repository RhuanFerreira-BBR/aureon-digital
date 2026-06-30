import { useEffect, useRef } from "react";

interface ProcessProps { lang: "en" | "pt"; }

const t = {
  en: {
    label: "Process",
    title: "How we\nwork.",
    sub: "No surprises. No endless meetings. Just a clear path from brief to results.",
    timeline: "Timeline",
    duration: "4–8 weeks",
    durationNote: "From brief to live, typically",
    steps: [
      { num: "01", title: "Discovery", desc: "We learn your business, market position, audience, and competitive landscape before proposing anything.", time: "Week 1" },
      { num: "02", title: "Strategy", desc: "A precise roadmap: what we build, why each element matters, and how it connects to your growth targets.", time: "Week 1–2" },
      { num: "03", title: "Execution", desc: "We deliver with full transparency. Regular updates, no scope creep, no surprises.", time: "Week 2–6" },
      { num: "04", title: "Growth", desc: "We monitor, optimize, and scale what works. Your benchmark is our benchmark.", time: "Ongoing" },
    ],
  },
  pt: {
    label: "Processo",
    title: "Como\ntrabalhamos.",
    sub: "Sem surpresas. Sem reuniões intermináveis. Apenas um caminho claro do briefing aos resultados.",
    timeline: "Cronograma",
    duration: "4–8 semanas",
    durationNote: "Do briefing à publicação, normalmente",
    steps: [
      { num: "01", title: "Descoberta", desc: "Aprendemos seu negócio, posicionamento de mercado, público e cenário competitivo antes de propor qualquer coisa.", time: "Semana 1" },
      { num: "02", title: "Estratégia", desc: "Um roteiro preciso: o que construímos, por que cada elemento importa e como se conecta às suas metas de crescimento.", time: "Sem. 1–2" },
      { num: "03", title: "Execução", desc: "Entregamos com total transparência. Atualizações regulares, sem aumento silencioso de escopo e sem surpresas.", time: "Sem. 2–6" },
      { num: "04", title: "Crescimento", desc: "Monitoramos, otimizamos e escalamos o que funciona. Seu benchmark é o nosso benchmark.", time: "Contínuo" },
    ],
  },
};

export function Process({ lang }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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
    <section id="process" ref={sectionRef} style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px 60px", alignItems: "start" }}>
          {/* Left: sticky header */}
          <div style={{ position: "sticky", top: 120 }}>
            <div className="section-label reveal">{t[lang].label}</div>
            <h2 className="reveal" style={{ fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 1.0, marginBottom: 20, whiteSpace: "pre-line" }}>
              {t[lang].title.split("\n").map((l, i) => (
                <span key={i} style={{ display: "block", ...(i === 1 ? { color: "var(--gold)" } : {}) }}>{l}</span>
              ))}
            </h2>
            <p className="reveal" style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 400 }}>{t[lang].sub}</p>

            {/* Decorative */}
            <div className="reveal" style={{ marginTop: 48, padding: "24px 28px", background: "var(--surface)", border: "1px solid var(--border-dim)", borderRadius: 8, maxWidth: 340 }}>
              <div style={{ fontSize: 12, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>{t[lang].timeline}</div>
              <div style={{ fontSize: 28, fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text)" }}>{t[lang].duration}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{t[lang].durationNote}</div>
            </div>
          </div>

          {/* Right: steps */}
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute", left: 20, top: 0, width: 1,
              background: "var(--border-dim)", height: "100%",
            }}>
              <div ref={lineRef} style={{
                width: "100%", height: "0%",
                background: "linear-gradient(to bottom, var(--gold), rgba(212,160,23,0.2))",
                transition: "height 1.5s cubic-bezier(0.16,1,0.3,1)",
              }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {t[lang].steps.map((step, i) => (
                <div key={i} className="reveal" style={{
                  display: "flex", gap: 32, paddingBottom: i < t[lang].steps.length - 1 ? 48 : 0,
                  transitionDelay: `${i * 120}ms`,
                }}>
                  {/* Node */}
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "var(--surface)",
                      border: "2px solid var(--gold)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12,
                      color: "var(--gold)", zIndex: 1,
                      boxShadow: "0 0 20px rgba(212,160,23,0.2)",
                    }}>
                      {step.num}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ paddingTop: 8, flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(20px, 2.2vw, 26px)" }}>
                        {step.title}
                      </h3>
                      <span style={{ fontSize: 11, color: "var(--text-dim)", background: "var(--surface)", border: "1px solid var(--border-dim)", borderRadius: 4, padding: "3px 10px", letterSpacing: "0.06em" }}>
                        {step.time}
                      </span>
                    </div>
                    <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.65 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #process > div > div > div:first-child { position: static !important; }
          #process > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
