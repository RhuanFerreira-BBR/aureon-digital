import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavProps {
  lang: "en" | "pt";
  setLang: (l: "en" | "pt") => void;
}

const t = {
  en: {
    services: "Services",
    about: "About",
    cases: "Cases",
    blog: "Blog",
    faq: "FAQ",
    cta: "Start a Project",
    servicesItems: [
      { label: "Web Design", desc: "High-conversion websites", href: "/services#web-design" },
      { label: "SEO", desc: "Dominate organic search", href: "/services#seo" },
      { label: "GEO", desc: "AI-powered visibility", href: "/services#geo" },
    ],
    process: "How we work",
    allCases: "All case studies",
    allPosts: "All articles",
  },
  pt: {
    services: "Serviços",
    about: "Sobre",
    cases: "Cases",
    blog: "Blog",
    faq: "FAQ",
    cta: "Iniciar Projeto",
    servicesItems: [
      { label: "Web Design", desc: "Sites de alta conversão", href: "/services#web-design" },
      { label: "SEO", desc: "Domine o search orgânico", href: "/services#seo" },
      { label: "GEO", desc: "Visibilidade com IA", href: "/services#geo" },
    ],
    process: "Como trabalhamos",
    allCases: "Todos os cases",
    allPosts: "Todos os artigos",
  },
};

function ServicesDropdown({ lang, onClose }: { lang: "en" | "pt"; onClose: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 8px)",
        left: "50%",
        transform: "translateX(-50%)",
        width: 320,
        background: "rgba(12,14,26,0.98)",
        border: "1px solid rgba(212,160,23,0.2)",
        backdropFilter: "blur(24px)",
        borderRadius: 8,
        padding: 8,
        boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,160,23,0.05)",
        zIndex: 1100,
      }}
    >
      {/* Arrow */}
      <div style={{
        position: "absolute", top: -5, left: "50%",
        width: 10, height: 10, background: "rgba(12,14,26,0.98)",
        border: "1px solid rgba(212,160,23,0.2)", borderBottom: "none", borderRight: "none",
        transform: "translateX(-50%) rotate(45deg)",
      }} />
      {t[lang].servicesItems.map((item, i) => (
        <Link
          key={i}
          to={item.href}
          onClick={onClose}
          style={{ textDecoration: "none", display: "block", padding: "12px 16px", borderRadius: 6, transition: "background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,160,23,0.07)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 6,
              background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              {i === 0 && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="5" height="5" rx="1" stroke="var(--gold)" strokeWidth="1.2" />
                  <rect x="8" y="1" width="5" height="5" rx="1" stroke="var(--gold)" strokeWidth="1.2" />
                  <rect x="1" y="8" width="5" height="5" rx="1" stroke="var(--gold)" strokeWidth="1.2" />
                  <rect x="8" y="8" width="5" height="5" rx="1" stroke="var(--gold)" strokeWidth="1.2" />
                </svg>
              )}
              {i === 1 && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="var(--gold)" strokeWidth="1.2" />
                  <path d="M4 7h6M7 4v6" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              )}
              {i === 2 && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 10l3-5 3 3 2-4 2 2" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{item.desc}</div>
            </div>
          </div>
        </Link>
      ))}
      <div style={{ margin: "8px 0", height: 1, background: "rgba(212,160,23,0.1)" }} />
      <Link
        to="/#process"
        onClick={onClose}
        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 6, color: "var(--text-muted)", fontSize: 12, transition: "all 0.2s" }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "rgba(212,160,23,0.05)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.background = "transparent"; }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4 6h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M6 4l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t[lang].process}
      </Link>
    </div>
  );
}

export function Nav({ lang, setLang }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { pathname: location } = useLocation();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMenuOpen(false);
      setServicesOpen(false);
    }, 0);

    return () => window.clearTimeout(id);
  }, [location]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isHome = location === "/";
  const isCases = location.startsWith("/cases");
  const isBlog = location.startsWith("/blog");

  return (
    <nav
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(8,9,15,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,160,23,0.12)" : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              {/* Mark */}
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  {/* Hex border gradient: bright top-left → deep gold bottom-right */}
                  <linearGradient id="hexGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFE580"/>
                    <stop offset="50%" stopColor="#D4A017"/>
                    <stop offset="100%" stopColor="#8B6200"/>
                  </linearGradient>
                  {/* A letterform gradient: bright top → mid gold */}
                  <linearGradient id="aGrad" x1="20" y1="9" x2="20" y2="30" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFE580"/>
                    <stop offset="60%" stopColor="#D4A017"/>
                    <stop offset="100%" stopColor="#A07800"/>
                  </linearGradient>
                  {/* Soft gold glow for A */}
                  <filter id="aGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="1.2" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                  </filter>
                  {/* Hex fill gradient */}
                  <radialGradient id="hexFill" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#D4A017" stopOpacity="0.14"/>
                    <stop offset="100%" stopColor="#D4A017" stopOpacity="0.03"/>
                  </radialGradient>
                </defs>

                {/* Hex fill */}
                <path
                  d="M20 3.5L33.5 11V29L20 36.5L6.5 29V11L20 3.5Z"
                  fill="url(#hexFill)"
                />
                {/* Hex outer border */}
                <path
                  d="M20 3.5L33.5 11V29L20 36.5L6.5 29V11L20 3.5Z"
                  stroke="url(#hexGrad)"
                  strokeWidth="1.1"
                  fill="none"
                />
                {/* Inner hex ring — subtle depth */}
                <path
                  d="M20 7.5L30.5 13.5V26.5L20 32.5L9.5 26.5V13.5L20 7.5Z"
                  stroke="#D4A017"
                  strokeWidth="0.4"
                  strokeOpacity="0.25"
                  fill="none"
                />

                {/* A letterform — filled with gradient, clean geometry */}
                <path
                  d="M20 11L28.5 28H11.5L20 11Z"
                  fill="url(#aGrad)"
                  opacity="0.12"
                />
                <path
                  d="M20 11L28.5 28H11.5L20 11Z"
                  stroke="url(#aGrad)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  fill="none"
                  filter="url(#aGlow)"
                />
                {/* Crossbar */}
                <line
                  x1="14.8" y1="22.5" x2="25.2" y2="22.5"
                  stroke="url(#aGrad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                {/* Apex accent dot */}
                <circle cx="20" cy="11" r="1.2" fill="#FFE580" opacity="0.95"/>
              </svg>

              {/* Wordmark */}
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: 1 }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 16,
                  letterSpacing: "0.18em",
                  color: "var(--text)",
                  textTransform: "uppercase",
                }}>
                  AUREON
                </span>
                <span style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  fontSize: 8,
                  letterSpacing: "0.22em",
                  color: "var(--gold)",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}>
                  Digital Agency
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>

            {/* Services dropdown */}
            <div ref={servicesRef} style={{ position: "relative" }}>
              <button
                onClick={() => setServicesOpen(v => !v)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "6px 12px", borderRadius: 4,
                  color: (servicesOpen || isHome) ? "var(--text)" : "var(--text-muted)",
                  fontSize: 13, fontWeight: 500, letterSpacing: "0.05em",
                  textTransform: "uppercase", fontFamily: "var(--font-body)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => { if (!servicesOpen) e.currentTarget.style.color = isHome ? "var(--text)" : "var(--text-muted)"; }}
              >
                {t[lang].services}
                <svg
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{ transition: "transform 0.2s", transform: servicesOpen ? "rotate(180deg)" : "none" }}
                >
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {servicesOpen && <ServicesDropdown lang={lang} onClose={() => setServicesOpen(false)} />}
            </div>

            <Link
              to="/cases"
              className={`nav-link ${isCases ? "active" : ""}`}
              style={{ padding: "6px 12px", borderRadius: 4 }}
            >
              {t[lang].cases}
            </Link>

            <Link
              to="/blog"
              className={`nav-link ${isBlog ? "active" : ""}`}
              style={{ padding: "6px 12px", borderRadius: 4 }}
            >
              {t[lang].blog}
            </Link>

            <Link
              to="/about"
              className="nav-link"
              style={{ padding: "6px 12px", borderRadius: 4 }}
            >
              {t[lang].about}
            </Link>

            <Link
              to="/faq"
              className="nav-link"
              style={{ padding: "6px 12px", borderRadius: 4 }}
            >
              {t[lang].faq}
            </Link>
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Lang */}
            <button
              onClick={() => setLang(lang === "en" ? "pt" : "en")}
              style={{
                background: "none", border: "1px solid rgba(212,160,23,0.2)",
                borderRadius: 4, padding: "5px 11px",
                color: "var(--text-muted)", fontSize: 11, fontWeight: 700,
                letterSpacing: "0.1em", cursor: "pointer",
                transition: "all 0.2s", fontFamily: "var(--font-display)",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = "var(--gold)"; (e.target as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = "rgba(212,160,23,0.2)"; (e.target as HTMLElement).style.color = "var(--text-muted)"; }}
            >
              {lang === "en" ? "PT" : "EN"}
            </button>

            {/* CTA */}
            <Link
              to={isHome ? "#contact" : "/#contact"}
              className="btn-gold nav-cta"
              style={{ padding: "9px 20px", fontSize: 12, textDecoration: "none", letterSpacing: "0.06em" }}
            >
              {t[lang].cta}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Mobile burger */}
            <button
              className="mobile-menu-btn"
              aria-label={menuOpen ? (lang === "pt" ? "Fechar menu" : "Close menu") : (lang === "pt" ? "Abrir menu" : "Open menu")}
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "var(--text)", display: "none" }}
              id="mobile-menu-btn"
            >
              <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ display: "block", height: 1.5, background: "currentColor", transition: "all 0.3s", transformOrigin: "center", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
                <span style={{ display: "block", height: 1.5, background: "currentColor", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: "block", height: 1.5, background: "currentColor", transition: "all 0.3s", transformOrigin: "center", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{
        overflow: "hidden",
        maxHeight: menuOpen ? "500px" : "0",
        transition: "max-height 0.4s ease",
        background: "rgba(8,9,15,0.99)",
        borderTop: menuOpen ? "1px solid rgba(212,160,23,0.1)" : "none",
      }}>
        <div style={{ padding: "28px 24px 36px", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, paddingLeft: 12 }}>
            {t[lang].services}
          </div>
          {t[lang].servicesItems.map((item, i) => (
            <Link key={i} to={item.href} onClick={() => setMenuOpen(false)}
              style={{ textDecoration: "none", padding: "10px 12px", borderRadius: 6, display: "flex", alignItems: "center", gap: 10, color: "var(--text-muted)", fontSize: 15 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(212,160,23,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", opacity: 0.5, flexShrink: 0 }} />
              {item.label}
            </Link>
          ))}
          <div style={{ height: 1, background: "rgba(212,160,23,0.1)", margin: "12px 0" }} />
          <Link to="/cases" style={{ textDecoration: "none", padding: "12px 12px", borderRadius: 6, color: isCases ? "var(--text)" : "var(--text-muted)", fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 600, display: "block" }}
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].cases}
          </Link>
          <Link to="/blog" style={{ textDecoration: "none", padding: "12px 12px", borderRadius: 6, color: isBlog ? "var(--text)" : "var(--text-muted)", fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 600, display: "block" }}
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].blog}
          </Link>
          <Link to="/about" style={{ textDecoration: "none", padding: "12px 12px", borderRadius: 6, color: "var(--text-muted)", fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 600, display: "block" }}
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].about}
          </Link>
          <Link to="/faq" style={{ textDecoration: "none", padding: "12px 12px", borderRadius: 6, color: "var(--text-muted)", fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 600, display: "block" }}
            onClick={() => setMenuOpen(false)}
          >
            {t[lang].faq}
          </Link>
          <div style={{ marginTop: 16 }}>
            <Link to={isHome ? "#contact" : "/#contact"} className="btn-gold" style={{ textDecoration: "none", width: "100%", justifyContent: "center" }} onClick={() => setMenuOpen(false)}>
              {t[lang].cta}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .nav-cta { display: inline-flex !important; }
          #mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .nav-cta { display: none !important; }
          #mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
