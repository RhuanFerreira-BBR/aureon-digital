import { Link } from "react-router-dom";
import { cases, caseMediaUrl, caseText, type PortfolioCase } from "../lib/cases";

interface CaseProofProps { lang: "en" | "pt"; }

const copy = {
  en: {
    label: "Proof in practice",
    title: "Work you can explore.",
    intro: "Real experiences across markets, platforms, and business models — presented through the work itself.",
    feature: "Featured case",
    explore: "Explore Dove case",
    supporting: "More proof",
    all: "View all cases",
    facts: ["Experiences", "Platforms", "Reach"],
    global: "Global",
  },
  pt: {
    label: "Prova na prática",
    title: "Trabalho que você pode explorar.",
    intro: "Experiências reais em diferentes mercados, plataformas e modelos de negócio — apresentadas pelo próprio trabalho.",
    feature: "Case em destaque",
    explore: "Explorar case Dove",
    supporting: "Mais provas",
    all: "Ver todos os cases",
    facts: ["Experiências", "Plataformas", "Atuação"],
    global: "Global",
  },
} as const;

const byId = (id: string) => cases.find(item => item.id === id) as PortfolioCase;

export function CaseProof({ lang }: CaseProofProps) {
  const primary = byId("dove-global-aem");
  const supporting = [
    byId("mini-finance-matcher-react"),
    byId("arctic-fox-headless-commerce"),
  ];
  const facts = [String(cases.length), String(new Set(cases.map(item => item.platform)).size), copy[lang].global];

  return (
    <section className="case-proof" data-case-proof aria-labelledby="case-proof-title">
      <div className="case-proof-shell">
        <header className="case-proof-header">
          <p className="section-label">{copy[lang].label}</p>
          <h2 id="case-proof-title">{copy[lang].title}</h2>
          <p>{copy[lang].intro}</p>
        </header>

        <Link className="case-proof-feature" data-case-proof-feature to={`/cases/${primary.id}`}>
          <img src={caseMediaUrl(primary.heroImage.src, import.meta.env.BASE_URL)} alt={caseText(primary.heroImage.alt, lang)} />
          <span className="case-proof-feature-wash" aria-hidden="true" />
          <span className="case-proof-feature-content">
            <small>{copy[lang].feature} · {primary.client} · {primary.platform}</small>
            <strong>{caseText(primary.title, lang)}</strong>
            {primary.attribution && <em>{caseText(primary.attribution, lang)}</em>}
            <dl>
              {facts.map((value, index) => <div key={copy[lang].facts[index]}><dt>{copy[lang].facts[index]}</dt><dd>{value}</dd></div>)}
            </dl>
            <span className="case-proof-link-label">{copy[lang].explore} →</span>
          </span>
        </Link>

        <div className="case-proof-supporting" aria-label={copy[lang].supporting}>
          {supporting.map(item => (
            <Link key={item.id} data-case-proof-supporting to={`/cases/${item.id}`}>
              <img src={caseMediaUrl(item.heroImage.src, import.meta.env.BASE_URL)} alt={caseText(item.heroImage.alt, lang)} />
              <span><small>{item.platform} · {caseText(item.market, lang)}</small><strong>{item.client}</strong><em>{caseText(item.title, lang)}</em></span>
            </Link>
          ))}
        </div>

        <Link className="btn-outline case-proof-all" to="/cases">{copy[lang].all}</Link>
      </div>
    </section>
  );
}
