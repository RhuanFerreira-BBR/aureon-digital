import { Link } from "react-router-dom";

import { blogPath, posts, type BlogLang, type BlogPost } from "../lib/blog";
import { caseMediaUrl } from "../lib/cases";

const copy = {
  pt: {
    label: "Estratégia digital",
    title: "Conteúdo para ser encontrado — e escolhido.",
    intro: "Guias para líderes que precisam conectar SEO, experiência, performance e conversão a decisões de negócio mais claras.",
    featured: "Leitura essencial",
    pillars: "Pilares de aquisição",
    read: "Ler artigo",
    ctaLabel: "Diagnóstico digital",
    ctaTitle: "Seu site está preparado para transformar atenção em oportunidades?",
    ctaText: "Mapeamos mensagem, descoberta, performance e fricção para indicar as prioridades com maior potencial comercial.",
    ctaButton: "Solicitar diagnóstico",
  },
  en: {
    label: "Digital strategy",
    title: "Content built to be found — and chosen.",
    intro: "Guides for leaders who need to connect SEO, experience, performance, and conversion to clearer business decisions.",
    featured: "Essential reading",
    pillars: "Acquisition pillars",
    read: "Read article",
    ctaLabel: "Digital diagnosis",
    ctaTitle: "Is your website ready to turn attention into qualified opportunities?",
    ctaText: "We map messaging, discovery, performance, and friction to identify the priorities with the strongest commercial potential.",
    ctaButton: "Request a diagnosis",
  },
} satisfies Record<BlogLang, Record<string, string>>;

function ArticleCard({ post, lang, featured = false }: { post: BlogPost; lang: BlogLang; featured?: boolean }) {
  const article = post.locales[lang];

  return (
    <Link
      className={featured ? "blog-featured-card" : "blog-pillar-card"}
      data-blog-card
      to={blogPath(post, lang)}
      style={{ "--blog-accent": post.accent } as React.CSSProperties}
    >
      <div className="blog-card-art">
        <img
          src={caseMediaUrl(post.image, import.meta.env.BASE_URL)}
          alt={article.imageAlt}
          onError={event => { event.currentTarget.hidden = true; }}
        />
      </div>
      <div className="blog-card-copy">
        <div className="blog-card-meta">
          <span>{article.category}</span>
          <span>{article.readTime}</span>
        </div>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <span className="blog-card-action">{copy[lang].read} <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}

export function BlogPage({ lang }: { lang: BlogLang }) {
  const featured = posts.find(post => post.featured) ?? posts[0];
  const pillars = posts.filter(post => post.id !== featured.id);

  return (
    <main className="blog-index">
      <header className="blog-index-hero grid-bg">
        <div className="blog-shell">
          <p className="section-label">{copy[lang].label}</p>
          <h1>{copy[lang].title}</h1>
          <p>{copy[lang].intro}</p>
        </div>
      </header>

      <section className="blog-index-section blog-shell" aria-labelledby="blog-featured-title">
        <p className="section-label" id="blog-featured-title">{copy[lang].featured}</p>
        <ArticleCard post={featured} lang={lang} featured />
      </section>

      <section className="blog-index-section blog-shell" aria-labelledby="blog-pillars-title">
        <p className="section-label" id="blog-pillars-title">{copy[lang].pillars}</p>
        <div className="blog-pillar-grid">
          {pillars.map(post => <ArticleCard key={post.id} post={post} lang={lang} />)}
        </div>
      </section>

      <section className="blog-index-cta blog-shell" data-blog-index-cta>
        <p className="section-label">{copy[lang].ctaLabel}</p>
        <h2>{copy[lang].ctaTitle}</h2>
        <p>{copy[lang].ctaText}</p>
        <Link className="btn-gold" data-blog-cta to="/#contact">{copy[lang].ctaButton}</Link>
      </section>
    </main>
  );
}
