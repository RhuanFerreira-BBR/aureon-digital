import { Fragment, type CSSProperties, type ReactNode } from "react";
import { Link, Navigate } from "react-router-dom";

import { blogIndexPath, blogPath, findBlogPost, posts, type BlogBlock, type BlogInlineLink, type BlogLang } from "../lib/blog";
import { cases, caseMediaUrl, caseText } from "../lib/cases";

const copy = {
  pt: {
    back: "← Todos os artigos",
    contents: "Neste artigo",
    related: "Case relacionado",
    viewCase: "Ver case",
    author: "Escrito por",
    published: "Publicado em",
    next: "Próximo artigo",
    notFound: "Artigo não encontrado.",
    sourceLink: "Abrir fonte",
    sidebarCta: "Precisa priorizar seu próximo passo digital?",
    sidebarButton: "Falar com a AUREON",
  },
  en: {
    back: "← All articles",
    contents: "In this article",
    related: "Related case",
    viewCase: "View case",
    author: "Written by",
    published: "Published on",
    next: "Next article",
    notFound: "Article not found.",
    sourceLink: "Open source",
    sidebarCta: "Need to prioritize your next digital move?",
    sidebarButton: "Talk to AUREON",
  },
} satisfies Record<BlogLang, Record<string, string>>;

export type ParagraphSegment =
  | { kind: "text"; text: string; start: number }
  | { kind: "link"; text: string; caseId: string; start: number };

// Exported for direct coverage of the text-preservation contract.
// eslint-disable-next-line react-refresh/only-export-components
export function splitParagraphLinks(text: string, links: BlogInlineLink[] = []): ParagraphSegment[] {
  const segments: ParagraphSegment[] = [];
  const used = new Set<number>();
  let cursor = 0;
  let textStart = 0;

  while (cursor < text.length) {
    const match = links
      .map((link, index) => ({ link, index }))
      .filter(({ link, index }) => link.label.length > 0 && !used.has(index) && text.startsWith(link.label, cursor))
      .sort((a, b) => b.link.label.length - a.link.label.length || a.index - b.index)[0];

    if (!match) {
      cursor += 1;
      continue;
    }

    if (textStart < cursor) segments.push({ kind: "text", text: text.slice(textStart, cursor), start: textStart });
    segments.push({ kind: "link", text: match.link.label, caseId: match.link.caseId, start: cursor });
    used.add(match.index);
    cursor += match.link.label.length;
    textStart = cursor;
  }

  if (textStart < text.length) segments.push({ kind: "text", text: text.slice(textStart), start: textStart });
  return segments;
}

function paragraphContent(text: string, links: BlogInlineLink[] | undefined): ReactNode {
  return splitParagraphLinks(text, links).map(segment => segment.kind === "link"
    ? <Link key={`link-${segment.start}-${segment.caseId}`} to={`/cases/${segment.caseId}`}>{segment.text}</Link>
    : <Fragment key={`text-${segment.start}`}>{segment.text}</Fragment>);
}

export function PostDetailPage({ lang, slug }: { lang: BlogLang; slug: string }) {
  const post = findBlogPost(slug, lang);

  if (!post) {
    const pairedPost = findBlogPost(slug, lang === "pt" ? "en" : "pt");
    if (pairedPost) return <Navigate replace to={blogPath(pairedPost, lang)} />;

    return (
      <main className="blog-not-found">
        <h1>{copy[lang].notFound}</h1>
        <Link className="btn-outline" to={blogIndexPath(lang)}>{copy[lang].back}</Link>
      </main>
    );
  }

  const article = post.locales[lang];
  const headings = article.blocks.filter((block): block is Extract<BlogBlock, { kind: "heading" }> => block.kind === "heading");
  const nextPost = posts[(posts.findIndex(item => item.id === post.id) + 1) % posts.length];
  const date = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${post.published}T00:00:00Z`));

  const renderBlock = (block: BlogBlock, index: number) => {
    switch (block.kind) {
      case "heading":
        return <h2 id={block.id} key={block.id}>{block.text}</h2>;
      case "paragraph":
        return <p key={index}>{paragraphContent(block.text, block.links)}</p>;
      case "callout":
        return (
          <section className="blog-callout" data-blog-summary key={index}>
            <strong>{block.label}</strong>
            <p>{block.text}</p>
          </section>
        );
      case "checklist":
        return (
          <section className="blog-checklist" key={index}>
            <h3>{block.label}</h3>
            <ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul>
          </section>
        );
      case "cta":
        return (
          <section className="blog-context-cta" key={index}>
            <span>{block.label}</span>
            <h3>{block.title}</h3>
            <p>{block.text}</p>
            <Link className="btn-gold" data-blog-cta to={post.serviceHref}>{block.button}</Link>
          </section>
        );
      case "case": {
        const item = cases.find(candidate => candidate.id === block.caseId);
        if (!item) return null;
        return (
          <Link className="blog-related-case" data-blog-case={item.id} key={index} to={`/cases/${item.id}`}>
            <img src={caseMediaUrl(item.heroImage.src, import.meta.env.BASE_URL)} alt={caseText(item.heroImage.alt, lang)} />
            <span>{copy[lang].related}</span>
            <h3>{item.client}</h3>
            <p>{caseText(item.summary, lang)}</p>
            <strong>{copy[lang].viewCase} →</strong>
          </Link>
        );
      }
      case "sources":
        return (
          <footer className="blog-sources" data-blog-sources key={index}>
            <div>
              <span>{copy[lang].author}</span>
              <strong>{post.author}</strong>
              <small>{copy[lang].published} {date}</small>
            </div>
            <div>
              <h3>{block.label}</h3>
              <ul>
                {post.sources.map(source => (
                  <li key={source.url}>
                    <a aria-label={`${source.label} — ${copy[lang].sourceLink}`} href={source.url} rel="noopener noreferrer" target="_blank">{source.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        );
      default: {
        const exhaustive: never = block;
        return exhaustive;
      }
    }
  };

  return (
    <main className="blog-article-page">
      <article style={{ "--blog-accent": post.accent } as CSSProperties}>
        <header className="blog-article-hero grid-bg">
          <div className="blog-shell">
            <Link className="blog-article-back" to={blogIndexPath(lang)}>{copy[lang].back}</Link>
            <div className="blog-article-hero-grid">
              <div>
                <p className="section-label">{article.category}</p>
                <h1>{article.title}</h1>
                <p>{article.excerpt}</p>
                <div className="blog-article-meta"><span>{date}</span><span>{article.readTime}</span></div>
              </div>
              <img src={caseMediaUrl(post.image, import.meta.env.BASE_URL)} alt={article.imageAlt} />
            </div>
          </div>
        </header>

        <div className="blog-article-layout blog-shell">
          <div className="blog-article-body">{article.blocks.map(renderBlock)}</div>
          <aside className="blog-article-sidebar">
            <nav aria-label={copy[lang].contents}>
              <strong>{copy[lang].contents}</strong>
              {headings.map(heading => <a href={`#${heading.id}`} key={heading.id}>{heading.text}</a>)}
            </nav>
            <div>
              <p>{copy[lang].sidebarCta}</p>
              <Link data-blog-cta to={post.serviceHref}>{copy[lang].sidebarButton} →</Link>
            </div>
          </aside>
        </div>

        <Link className="blog-next-article" to={blogPath(nextPost, lang)}>
          <span>{copy[lang].next}</span>
          <strong>{nextPost.locales[lang].title}</strong>
          <small>{nextPost.locales[lang].category} · {nextPost.locales[lang].readTime}</small>
        </Link>
      </article>
    </main>
  );
}
