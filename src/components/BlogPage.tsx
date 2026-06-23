import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { posts } from "../lib/data";

interface BlogPageProps { lang: "en" | "pt"; }

const t = {
  en: {
    breadcrumb: "Home",
    label: "Blog",
    title: "Insights.\nNo fluff.",
    sub: "Practical knowledge on web design, SEO, and GEO — written for businesses that want results.",
    readTime: "read",
    all: "All",
    backToBlog: "← All Articles",
    allPosts: "All Articles",
    readArticle: "Read article",
    featured: "Featured",
    moreArticles: "More Articles",
    ctaLabel: "Ready to grow?",
    ctaSub: "Let's build your digital presence together.",
    ctaBtn: "Start now",
  },
  pt: {
    breadcrumb: "Início",
    label: "Blog",
    title: "Insights.\nSem papo.",
    sub: "Conhecimento prático sobre web design, SEO e GEO — escrito para negócios que querem resultados.",
    readTime: "leitura",
    all: "Todos",
    backToBlog: "← Todos os artigos",
    allPosts: "Todos os artigos",
    readArticle: "Ler artigo",
    featured: "Destaque",
    moreArticles: "Mais Artigos",
    ctaLabel: "Pronto para crescer?",
    ctaSub: "Vamos construir sua presença digital juntos.",
    ctaBtn: "Começar agora",
  },
};

const tagColors: Record<string, string> = {
  GEO: "#4AE2A0",
  "Web Design": "#E24A7A",
  SEO: "#4A90E2",
  Strategy: "#E2A44A",
};

export function BlogPage({ lang }: BlogPageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTag, setActiveTag] = useState(t[lang].all);
  const allTags = [...new Set(posts.map(p => p.tag))];
  const [featured, ...rest] = posts;
  const filteredRest = activeTag === t[lang].all ? rest : rest.filter(p => p.tag === activeTag);
  const showFeatured = activeTag === t[lang].all || featured.tag === activeTag;

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
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />
        <div style={{ position: "absolute", top: 0, left: "20%", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(212,160,23,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(212,160,23,0.2), transparent)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          {/* Breadcrumb */}
          <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
            <Link to="/" style={{ textDecoration: "none", color: "var(--text-dim)", fontSize: 12 }}
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
              <div style={{ display: "flex", gap: 32 }}>
                {[
                  { n: posts.length + "", l: lang === "pt" ? "Artigos" : "Articles" },
                  { n: allTags.length + "", l: lang === "pt" ? "Categorias" : "Categories" },
                  { n: "2026", l: lang === "pt" ? "Desde" : "Since" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--text)", lineHeight: 1 }}>{stat.n}</div>
                    <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>{stat.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div style={{ borderTop: "1px solid var(--border-dim)", borderBottom: "1px solid var(--border-dim)", background: "var(--surface)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div style={{ display: "flex", gap: 0, overflowX: "auto" }}>
            {[t[lang].all, ...allTags].map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: "18px 24px", background: "none",
                  border: "none", borderBottom: `2px solid ${activeTag === tag ? "var(--gold)" : "transparent"}`,
                  color: activeTag === tag ? "var(--gold)" : "var(--text-muted)",
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", cursor: "pointer",
                  transition: "all 0.2s", fontFamily: "var(--font-display)",
                  flexShrink: 0,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured */}
      {showFeatured && (
        <section style={{ padding: "64px 0 0" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div className="section-label" style={{ margin: 0 }}>{t[lang].featured}</div>
              <div style={{ padding: "3px 10px", borderRadius: 100, background: "rgba(212,160,23,0.1)", border: "1px solid rgba(212,160,23,0.2)", fontSize: 10, color: "var(--gold)", fontWeight: 700, letterSpacing: "0.1em" }}>
                {featured.tag}
              </div>
            </div>
            <Link to={`/blog/${featured.id}`} style={{ textDecoration: "none" }}>
              <div
                className="reveal featured-blog"
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--surface)", border: "1px solid var(--border-dim)", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,160,23,0.35)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dim)"; }}
              >
                <div style={{ height: 380, overflow: "hidden", position: "relative" }}>
                  <img src={featured.image} alt={featured.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(16,18,30,0.7))" }} />
                </div>
                <div style={{ padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{featured.date}</span>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>·</span>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{featured.readTime} {t[lang].readTime}</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px, 2.8vw, 34px)", lineHeight: 1.2, marginBottom: 16, color: "var(--text)" }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 32 }}>{featured.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--gold)", fontSize: 12, fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {t[lang].readArticle}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Articles grid */}
      <section style={{ padding: "56px 0 100px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          {filteredRest.length > 0 && (
            <div className="section-label reveal" style={{ marginBottom: 32 }}>
              {activeTag === t[lang].all ? t[lang].moreArticles : activeTag}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 2 }}>
            {filteredRest.map((post, i) => (
              <Link key={post.id} to={`/blog/${post.id}`} style={{ textDecoration: "none" }}>
                <div
                  className="reveal blog-card"
                  style={{
                    background: "var(--surface)", border: "1px solid var(--border-dim)",
                    overflow: "hidden", height: "100%",
                    display: "flex", flexDirection: "column",
                    transitionDelay: `${i * 60}ms`,
                    transition: "border-color 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,160,23,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dim)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {/* Image */}
                  <div style={{ height: 200, overflow: "hidden", position: "relative", flexShrink: 0 }}>
                    <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <div style={{
                      position: "absolute", top: 12, left: 12,
                      padding: "3px 10px", borderRadius: 100,
                      background: `${tagColors[post.tag] || "var(--gold)"}20`,
                      border: `1px solid ${tagColors[post.tag] || "var(--gold)"}40`,
                      color: tagColors[post.tag] || "var(--gold)",
                      fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>
                      {post.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{post.date}</span>
                      <span style={{ fontSize: 11, color: "var(--text-dim)" }}>·</span>
                      <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{post.readTime} {t[lang].readTime}</span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(16px, 1.8vw, 20px)", lineHeight: 1.25, marginBottom: 10, color: "var(--text)", flex: 0 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65, marginBottom: 20, flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-dim)", paddingTop: 16 }}>
                      <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{post.author}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--gold)", fontSize: 11, fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {t[lang].readArticle}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M2 5.5h7M5.5 2L9 5.5 5.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredRest.length === 0 && !showFeatured && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
              <p style={{ fontSize: 16 }}>{lang === "pt" ? "Nenhum artigo nesta categoria ainda." : "No articles in this category yet."}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border-dim)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
          <div className="section-label reveal" style={{ justifyContent: "center" }}>{t[lang].label}</div>
          <h2 className="reveal" style={{ fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, marginBottom: 14 }}>{t[lang].ctaLabel}</h2>
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
        @media (max-width: 767px) {
          .featured-blog { grid-template-columns: 1fr !important; }
          .featured-blog > div:first-child { height: 260px !important; }
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

export function PostDetailPage({ lang, id }: { lang: "en" | "pt"; id: string }) {
  const post = posts.find(p => p.id === id);
  const otherPosts = posts.filter(p => p.id !== id).slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const currentIdx = posts.findIndex(p => p.id === id);
  const nextPost = posts[(currentIdx + 1) % posts.length];

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      sectionRef.current?.querySelectorAll(".reveal").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 80);
      });
    }, 50);
  }, [id]);

  if (!post) return (
    <div style={{ paddingTop: 120, textAlign: "center", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div>
        <p style={{ fontSize: 18, color: "var(--text-muted)", marginBottom: 24 }}>Post not found.</p>
        <Link to="/blog" className="btn-outline">← Back to Blog</Link>
      </div>
    </div>
  );

  const renderBody = (body: string) => {
    return body.split("\n\n").map((block, i) => {
      if (block.startsWith("**") && block.endsWith("**") && !block.slice(2, -2).includes("**")) {
        return (
          <h3 key={i} style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, marginTop: 48, marginBottom: 16, color: "var(--text)", borderLeft: "2px solid var(--gold)", paddingLeft: 16 }}>
            {block.replace(/\*\*/g, "")}
          </h3>
        );
      }
      const html = block
        .replace(/\*\*(.*?)\*\*/g, "<strong style='color:var(--text);font-weight:600'>$1</strong>")
        .replace(/^(\d+\. )/gm, "");
      return (
        <p key={i} style={{ fontSize: 17, color: "var(--text-muted)", lineHeight: 1.85, marginBottom: 22 }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    });
  };

  return (
    <main ref={sectionRef} style={{ paddingTop: 72, minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ position: "relative", height: "48vh", minHeight: 340, overflow: "hidden" }}>
        <img src={post.image} alt={post.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,9,15,0.5) 0%, var(--void) 100%)" }} />
        <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />
      </div>

      {/* Article + Sidebar */}
      <section style={{ padding: "0 0 100px", marginTop: -60 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <div className="post-detail-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 80, alignItems: "start" }}>

            {/* Article */}
            <article>
              {/* Back + meta */}
              <div className="reveal" style={{ marginBottom: 16 }}>
                <Link to="/blog" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, color: "var(--text-muted)", fontSize: 12, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {t[lang].backToBlog}
                </Link>
              </div>

              {/* Tag + meta row */}
              <div className="reveal" style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
                <div style={{
                  padding: "3px 12px", borderRadius: 100,
                  background: `${tagColors[post.tag] || "var(--gold)"}15`,
                  border: `1px solid ${tagColors[post.tag] || "var(--gold)"}35`,
                  color: tagColors[post.tag] || "var(--gold)",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                }}>
                  {post.tag}
                </div>
                <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{post.date}</span>
                <span style={{ fontSize: 12, color: "var(--text-dim)" }}>·</span>
                <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{post.readTime} {t[lang].readTime}</span>
                <span style={{ fontSize: 12, color: "var(--text-dim)" }}>·</span>
                <span style={{ fontSize: 12, color: "var(--text-dim)" }}>{post.author}</span>
              </div>

              {/* Title */}
              <h1 className="reveal" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", lineHeight: 1.1, marginBottom: 24, color: "var(--text)" }}>
                {post.title}
              </h1>

              {/* Lead */}
              <p className="reveal" style={{ fontSize: 19, color: "var(--text-muted)", lineHeight: 1.7, fontStyle: "italic", borderLeft: "3px solid var(--gold)", paddingLeft: 24, marginBottom: 52, paddingTop: 4, paddingBottom: 4 }}>
                {post.excerpt}
              </p>

              {/* Body */}
              <div className="reveal">
                {renderBody(post.body)}
              </div>

              {/* Author footer */}
              <div className="reveal" style={{ marginTop: 60, padding: "24px", background: "var(--surface)", border: "1px solid var(--border-dim)", borderRadius: 4, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), rgba(212,160,23,0.4))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "var(--void)" }}>A</span>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{post.author}</div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)" }}>aureon.io</div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ position: "sticky", top: 104 }}>
              {/* Table of contents (simple) */}
              <div className="reveal" style={{ background: "var(--surface)", border: "1px solid var(--border-dim)", padding: "24px", marginBottom: 16, borderRadius: 4 }}>
                <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>
                  {lang === "pt" ? "Neste artigo" : "In this article"}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {post.body.split("\n\n").filter(b => b.startsWith("**") && b.endsWith("**") && !b.slice(2, -2).includes("**")).map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(212,160,23,0.4)", marginTop: 6, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.4 }}>{h.replace(/\*\*/g, "")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="reveal" style={{ background: "rgba(212,160,23,0.05)", border: "1px solid rgba(212,160,23,0.2)", padding: "24px", borderRadius: 4, marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text)", marginBottom: 10, lineHeight: 1.3 }}>
                  {lang === "pt" ? "Precisa de ajuda com isso?" : "Need help with this?"}
                </div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 16 }}>
                  {lang === "pt" ? "Trabalhamos com businesses como o seu." : "We work with businesses like yours."}
                </p>
                <Link to="/#contact" className="btn-gold" style={{ textDecoration: "none", width: "100%", justifyContent: "center", display: "flex", boxSizing: "border-box", padding: "10px 16px", fontSize: 11 }}>
                  {lang === "pt" ? "Falar com a equipe" : "Talk to the team"}
                </Link>
              </div>

              {/* Next article */}
              {nextPost && (
                <div className="reveal">
                  <div style={{ fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                    {lang === "pt" ? "Próximo artigo" : "Next article"}
                  </div>
                  <Link to={`/blog/${nextPost.id}`} style={{ textDecoration: "none" }}>
                    <div style={{ background: "var(--surface)", border: "1px solid var(--border-dim)", overflow: "hidden", borderRadius: 4, transition: "border-color 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(212,160,23,0.3)")}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-dim)")}
                    >
                      <div style={{ height: 100, overflow: "hidden" }}>
                        <img src={nextPost.image} alt={nextPost.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                      </div>
                      <div style={{ padding: "12px 14px" }}>
                        <div style={{ fontSize: 10, color: "var(--gold)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>{nextPost.tag}</div>
                        <div style={{ fontSize: 13, fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{nextPost.title}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {otherPosts.length > 0 && (
        <section style={{ padding: "60px 0 80px", borderTop: "1px solid var(--border-dim)", background: "var(--surface)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
            <div className="section-label" style={{ marginBottom: 36 }}>{t[lang].moreArticles}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
              {otherPosts.map(p => (
                <Link key={p.id} to={`/blog/${p.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "var(--surface2)", border: "1px solid var(--border-dim)", overflow: "hidden", transition: "border-color 0.25s, transform 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,160,23,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-dim)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ height: 160, overflow: "hidden" }}>
                      <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8, transition: "transform 0.4s" }}
                        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </div>
                    <div style={{ padding: "18px 18px" }}>
                      <div style={{ fontSize: 10, color: tagColors[p.tag] || "var(--gold)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{p.tag}</div>
                      <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, lineHeight: 1.3, color: "var(--text)", marginBottom: 8 }}>{p.title}</h4>
                      <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{p.date} · {p.readTime} {t[lang].readTime}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 960px) {
          .post-detail-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .post-detail-grid > aside { position: static !important; }
          section > div > div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          section > div > div[style*="grid-template-columns: repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
