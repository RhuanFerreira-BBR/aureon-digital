import { useState, useEffect, useRef } from "react";
import { contactEmail, contactHref } from "../lib/contact";

interface ContactProps { lang: "en" | "pt"; }

const t = {
  en: {
    label: "Contact",
    title: "Start your\nproject.",
    sub: "Tell us where you are and where you want to go. We'll handle the rest.",
    name: "Your name", namePh: "Carlos Silva",
    email: "Email", emailPh: "carlos@empresa.com",
    service: "Service", servicePh: "Select a service",
    services: ["Web Design", "SEO", "GEO", "Full Strategy"],
    message: "Message", messagePh: "Tell us about your project...",
    send: "Send message",
    sending: "Sending...",
    sent: "Message sent! We'll reply within 12 hours.",
    or: "Or reach us directly",
  },
  pt: {
    label: "Contato",
    title: "Inicie seu\nprojeto.",
    sub: "Diga onde você está e onde quer chegar. Cuidamos do resto.",
    name: "Seu nome", namePh: "Carlos Silva",
    email: "E-mail", emailPh: "carlos@empresa.com.br",
    service: "Serviço", servicePh: "Selecione um serviço",
    services: ["Web Design", "SEO", "GEO", "Estratégia Completa"],
    message: "Mensagem", messagePh: "Fale sobre o seu projeto...",
    send: "Enviar mensagem",
    sending: "Enviando...",
    sent: "Mensagem enviada! Responderemos em até 12 horas.",
    or: "Ou fale conosco diretamente",
  },
};

export function Contact({ lang }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const email = contactEmail[lang];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${form.service || "Not selected"}`,
      "",
      form.message,
    ].join("\n");

    window.location.href = contactHref(lang, "AUREON project inquiry", body);
    setStatus("sent");
  };

  const inputStyle = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border-dim)",
    borderRadius: 4,
    padding: "14px 16px",
    color: "var(--text)",
    fontSize: 15,
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={sectionRef} style={{ padding: "120px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--void), var(--void2))" }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      <div className="glow-dot" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(212,160,23,0.07) 0%, transparent 70%)", bottom: "-10%", left: "50%", transform: "translateX(-50%)" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px 60px", alignItems: "start" }}>
          {/* Left */}
          <div>
            <div className="section-label reveal">{t[lang].label}</div>
            <h2 className="reveal" style={{ fontSize: "clamp(40px, 5vw, 68px)", whiteSpace: "pre-line", lineHeight: 1.0, marginBottom: 20 }}>
              {t[lang].title.split("\n").map((l, i) => (
                <span key={i} style={{ display: "block", ...(i === 1 ? { color: "var(--gold)" } : {}) }}>{l}</span>
              ))}
            </h2>
            <p className="reveal" style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 48 }}>{t[lang].sub}</p>

            {/* Info blocks */}
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 2, letterSpacing: "0.06em", textTransform: "uppercase" }}>Email</div>
                  <a href={contactHref(lang)} style={{ fontSize: 15, color: "var(--text)", textDecoration: "none" }}>{email}</a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 2, letterSpacing: "0.06em", textTransform: "uppercase" }}>Location</div>
                  <span style={{ fontSize: 15, color: "var(--text)" }}>Brasil 🇧🇷</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: "var(--surface)", border: "1px solid var(--border-dim)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 2, letterSpacing: "0.06em", textTransform: "uppercase" }}>Response time</div>
                  <span style={{ fontSize: 15, color: "var(--text)" }}>≤ 12 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal">
            <div style={{ background: "var(--surface)", border: "1px solid var(--border-dim)", padding: "40px", borderRadius: 2 }}>
              {status === "sent" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(212,160,23,0.1)", border: "1px solid var(--border-bright)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p style={{ fontSize: 18, color: "var(--text)", fontFamily: "var(--font-display)", fontWeight: 600 }}>{t[lang].sent}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t[lang].name}</label>
                      <input
                        style={inputStyle}
                        placeholder={t[lang].namePh}
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={e => (e.target.style.borderColor = "var(--border-bright)")}
                        onBlur={e => (e.target.style.borderColor = "var(--border-dim)")}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t[lang].email}</label>
                      <input
                        type="email"
                        style={inputStyle}
                        placeholder={t[lang].emailPh}
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={e => (e.target.style.borderColor = "var(--border-bright)")}
                        onBlur={e => (e.target.style.borderColor = "var(--border-dim)")}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t[lang].service}</label>
                    <select
                      style={{ ...inputStyle, cursor: "pointer" }}
                      value={form.service}
                      onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                      onFocus={e => (e.target.style.borderColor = "var(--border-bright)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border-dim)")}
                    >
                      <option value="">{t[lang].servicePh}</option>
                      {t[lang].services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t[lang].message}</label>
                    <textarea
                      style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
                      placeholder={t[lang].messagePh}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={e => (e.target.style.borderColor = "var(--border-bright)")}
                      onBlur={e => (e.target.style.borderColor = "var(--border-dim)")}
                    />
                  </div>

                  <button type="submit" className="btn-gold" style={{ width: "100%", justifyContent: "center", opacity: status === "sending" ? 0.7 : 1 }} disabled={status === "sending"}>
                    {status === "sending" ? t[lang].sending : t[lang].send}
                    {status !== "sending" && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        input::placeholder, textarea::placeholder, select option[value=""] { color: var(--text-dim); }
        select option { background: var(--surface2); color: var(--text); }
      `}</style>
    </section>
  );
}
