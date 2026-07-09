import type { CSSProperties, ReactEventHandler } from "react";
import { Link } from "react-router-dom";

import { cases, caseMediaUrl, caseText, disciplineLabels, type PortfolioCase } from "../lib/cases";

type Lang = "pt" | "en";

const copy = {
  pt: {
    back: "← Voltar para Cases",
    visit: "Visitar website",
    platform: "Plataforma",
    scope: "Escopo",
    market: "Mercado",
    support: "Modelo de suporte",
    challenge: "O desafio",
    strategy: "A estratégia",
    execution: "A execução",
    highlights: "Destaques da entrega",
    disclosure: "Impacto indicativo — estimativas não auditadas",
    services: "Disciplinas",
    related: "Projeto relacionado",
    ctaTitle: "Precisa de uma experiência pronta para converter e escalar?",
    ctaButton: "Iniciar projeto",
    next: "Próximo case",
    notFound: "Case não encontrado.",
  },
  en: {
    back: "← Back to Cases",
    visit: "Visit website",
    platform: "Platform",
    scope: "Scope",
    market: "Market",
    support: "Support model",
    challenge: "The challenge",
    strategy: "The strategy",
    execution: "The execution",
    highlights: "Delivery highlights",
    disclosure: "Indicative impact — unaudited estimates",
    services: "Disciplines",
    related: "Related project",
    ctaTitle: "Need an experience built to convert and scale?",
    ctaButton: "Start a project",
    next: "Next case",
    notFound: "Case not found.",
  },
};

const moduleCopy: Record<PortfolioCase["module"], Record<Lang, { title: string; body: string }>> = {
  globalProgram: {
    pt: { title: "Programa global", body: "Uma base compartilhada com execução sensível a cada mercado." },
    en: { title: "Global program", body: "A shared foundation with market-aware execution." },
  },
  decisionTool: {
    pt: { title: "Fluxo de decisão", body: "Preferências → contexto → recomendação de produto financeiro." },
    en: { title: "Decision flow", body: "Preferences → context → finance product recommendation." },
  },
  commerce: {
    pt: { title: "Jornada de commerce", body: "Descoberta → confiança → produto → compra ou orçamento." },
    en: { title: "Commerce journey", body: "Discovery → trust → product → purchase or quote." },
  },
  multiLocation: {
    pt: { title: "Conversão local", body: "Necessidade → tratamento → localização → agendamento." },
    en: { title: "Local conversion", body: "Need → treatment → location → booking." },
  },
  gatedExperience: {
    pt: { title: "Acesso autenticado", body: "Entrada → validação → acesso ao ambiente privado." },
    en: { title: "Authenticated access", body: "Entry → validation → private environment access." },
  },
  headlessCommerce: {
    pt: { title: "Arquitetura headless", body: "Vue Storefront → APIs de catálogo → checkout Shopify." },
    en: { title: "Headless architecture", body: "Vue Storefront → catalog APIs → Shopify checkout." },
  },
};

const hideBrokenImage: ReactEventHandler<HTMLImageElement> = event => {
  event.currentTarget.hidden = true;
};

export function CaseDetailPage({ lang, id }: { lang: Lang; id: string }) {
  const item = cases.find(portfolioCase => portfolioCase.id.toLowerCase() === id.toLowerCase());

  if (!item) {
    return (
      <main className="portfolio-case-not-found">
        <p>{copy[lang].notFound}</p>
        <Link to="/cases" className="btn-outline">{copy[lang].back}</Link>
      </main>
    );
  }

  const currentIndex = cases.findIndex(portfolioCase => portfolioCase.id === item.id);
  const nextCase = cases[(currentIndex + 1) % cases.length];
  const relatedCases = item.relatedCaseIds
    .map(relatedId => cases.find(portfolioCase => portfolioCase.id === relatedId))
    .filter((related): related is PortfolioCase => Boolean(related));
  const hasEstimatedImpact = item.metrics.some(metric => metric.evidence === "estimated");
  const module = moduleCopy[item.module][lang];

  return (
    <main>
      <article className="portfolio-case" style={{ "--case-accent": item.accent } as CSSProperties}>
        <header className="portfolio-case-hero">
          <div className="portfolio-case-container">
            <Link to="/cases" className="portfolio-case-back">{copy[lang].back}</Link>
            <p className="portfolio-case-kicker"><span>{item.client}</span> · {item.platform} · {caseText(item.market, lang)}</p>
            <h1>{caseText(item.title, lang)}</h1>
            <p className="portfolio-case-summary">{caseText(item.summary, lang)}</p>
            {item.attribution && <p className="portfolio-case-attribution">{caseText(item.attribution, lang)}</p>}
          </div>
        </header>

        <dl className="portfolio-case-meta">
          {[
            [copy[lang].platform, item.platform],
            [copy[lang].scope, caseText(item.scope, lang)],
            [copy[lang].market, caseText(item.market, lang)],
            [copy[lang].support, caseText(item.supportModel, lang)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="portfolio-case-image-frame portfolio-case-hero-image">
          <img key={item.heroImage.src} src={caseMediaUrl(item.heroImage.src, import.meta.env.BASE_URL)} alt={caseText(item.heroImage.alt, lang)} onError={hideBrokenImage} />
        </div>

        <div className="portfolio-case-body portfolio-case-container">
          <div className="portfolio-case-narrative">
            {[
              { id: "challenge", title: copy[lang].challenge, body: item.challenge },
              { id: "strategy", title: copy[lang].strategy, body: item.strategy },
              { id: "execution", title: copy[lang].execution, body: item.execution },
            ].map(section => (
              <section key={section.id} data-case-section={section.id}>
                <h2>{section.title}</h2>
                <p>{caseText(section.body, lang)}</p>
              </section>
            ))}

            <section className="portfolio-case-highlights">
              <h2>{copy[lang].highlights}</h2>
              <ul>
                {item.highlights.map(highlight => <li key={caseText(highlight, lang)}>{caseText(highlight, lang)}</li>)}
              </ul>
            </section>

            <div className="portfolio-case-gallery">
              {item.gallery.map(image => (
                <div className="portfolio-case-image-frame" key={image.src}>
                  <img src={caseMediaUrl(image.src, import.meta.env.BASE_URL)} alt={caseText(image.alt, lang)} onError={hideBrokenImage} />
                </div>
              ))}
            </div>

            {hasEstimatedImpact && (
              <section className="portfolio-case-impact">
                <h2>{copy[lang].disclosure}</h2>
                <div className="portfolio-case-impact-grid">
                  {item.metrics.map(metric => (
                    <div key={caseText(metric.label, lang)}>
                      <strong>{metric.value}</strong>
                      <span>{caseText(metric.label, lang)}</span>
                      <small>{caseText(metric.note, lang)}</small>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="portfolio-case-disciplines">
              <h2>{copy[lang].services}</h2>
              <ul>
                {item.disciplines.map(discipline => (
                  <li key={discipline}>{caseText(disciplineLabels[discipline], lang)}</li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="portfolio-case-module" data-case-module={item.module}>
            <h2>{module.title}</h2>
            <p>{module.body}</p>
          </aside>
        </div>

        {relatedCases.length > 0 && (
          <section className="portfolio-case-related portfolio-case-container">
            <h2>{copy[lang].related}</h2>
            {relatedCases.map(related => (
              <Link to={`/cases/${related.id}`} key={related.id}>
                <strong>{related.client}</strong> {caseText(related.market, lang)}
              </Link>
            ))}
          </section>
        )}

        <section className="portfolio-case-cta">
          <div className="portfolio-case-container">
            <h2>{copy[lang].ctaTitle}</h2>
            <Link to="/#contact" className="btn-gold">{copy[lang].ctaButton}</Link>
          </div>
        </section>

        <Link className="portfolio-case-next" to={`/cases/${nextCase.id}`}>
          <span>{copy[lang].next}</span>
          <strong>{caseText(nextCase.title, lang)}</strong>
          <small>{nextCase.client} · {nextCase.platform}</small>
        </Link>
      </article>
    </main>
  );
}
