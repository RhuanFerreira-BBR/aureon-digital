import { Link } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

interface FooterProps {
  lang: "en" | "pt";
}

const t = {
  en: {
    tagline: "We make you easy to find.",
    services: "Services",
    servicesLinks: [
      { label: "Web Design", href: "/services#web-design" },
      { label: "SEO", href: "/services#seo" },
      { label: "GEO", href: "/services#geo" },
      { label: "All Services", href: "/services" },
    ],
    company: "Company",
    companyLinks: [
      { label: "About", href: "/about" },
      { label: "Cases", href: "/cases" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/#contact" },
    ],
    resources: "Resources",
    resourcesLinks: [
      { label: "FAQ", href: "/faq" },
    ],
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  pt: {
    tagline: "Fazemos você fácil de encontrar.",
    services: "Serviços",
    servicesLinks: [
      { label: "Web Design", href: "/services#web-design" },
      { label: "SEO", href: "/services#seo" },
      { label: "GEO", href: "/services#geo" },
      { label: "Todos os Serviços", href: "/services" },
    ],
    company: "Empresa",
    companyLinks: [
      { label: "Sobre", href: "/about" },
      { label: "Cases", href: "/cases" },
      { label: "Blog", href: "/blog" },
      { label: "Contato", href: "/#contact" },
    ],
    resources: "Recursos",
    resourcesLinks: [
      { label: "FAQ", href: "/faq" },
    ],
    rights: "Todos os direitos reservados.",
    privacy: "Política de Privacidade",
    terms: "Termos de Uso",
  },
};

export function Footer({ lang }: FooterProps) {
  const tx = t[lang];

  const linkStyle = {
    color: "var(--text-muted)",
    fontSize: 14,
    textDecoration: "none" as const,
    transition: "color 0.2s",
  };

  return (
    <footer style={{ borderTop: "1px solid var(--border-dim)", background: "var(--void2)", padding: "60px 0 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ marginBottom: 16 }}>
              <BrandLogo />
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, maxWidth: 220, marginBottom: 20 }}>
              {tx.tagline}
            </p>
            <a href="mailto:contact@aureondigital.co"
              style={{ color: "var(--gold)", fontSize: 13, textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={e => (e.target as HTMLElement).style.opacity = "0.7"}
              onMouseLeave={e => (e.target as HTMLElement).style.opacity = "1"}
            >
              contact@aureondigital.co
            </a>
            <p style={{ color: "var(--text-dim)", fontSize: 12, marginTop: 6 }}>Brasil</p>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
              {tx.services}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tx.servicesLinks.map((s, i) => (
                <Link key={i} to={s.href}
                  style={linkStyle}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text)"}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}
                >{s.label}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
              {tx.company}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tx.companyLinks.map((c, i) => (
                <Link key={i} to={c.href}
                  style={linkStyle}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text)"}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}
                >{c.label}</Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
              {tx.resources}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tx.resourcesLinks.map((r, i) => (
                <Link key={i} to={r.href}
                  style={linkStyle}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text)"}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}
                >{r.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid var(--border-dim)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "var(--text-dim)", fontSize: 12 }}>
            © {new Date().getFullYear()} AUREON. {tx.rights}
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            <Link to="/privacy" style={{ color: "var(--text-dim)", fontSize: 12, textDecoration: "none" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-dim)"}
            >{tx.privacy}</Link>
            <Link to="/terms" style={{ color: "var(--text-dim)", fontSize: 12, textDecoration: "none" }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "var(--text-muted)"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "var(--text-dim)"}
            >{tx.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
