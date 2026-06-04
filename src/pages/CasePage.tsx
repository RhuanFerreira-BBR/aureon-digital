import { Link, Navigate, useParams } from 'react-router-dom';
import { MediaImage } from '../components/MediaImage';
import { Seo } from '../components/Seo';
import { Testimonial } from './HomePage';
import { allCases, ui } from '../data/site';
import type { Locale } from '../types';
import { casePath, routePath } from '../utils';

export function CasePage({ locale }: { locale: Locale }) {
  const { slug } = useParams();
  const item = allCases.find((caseStudy) => caseStudy.slug === slug);
  if (!item) return <Navigate to={routePath(locale, 'work')} replace />;

  const index = allCases.findIndex((caseStudy) => caseStudy.slug === item.slug);
  const next = allCases[(index + 1) % allCases.length];
  const copy = ui[locale];

  return (
    <>
      <Seo locale={locale} title={item.title[locale]} description={item.summary[locale]} image={item.image} />

      <section className="section case-hero">
        <div className="wrap">
          <Link to={routePath(locale, 'work')} className="pill" data-reveal>
            {copy.backToCases}
          </Link>
          <div className="row pill-row case-tags" data-reveal data-reveal-delay="1">
            {item.categories.map((category) => (
              <span className="pill pill--accent" key={category}>
                {category}
              </span>
            ))}
          </div>
          <h1 className="display case-title" data-reveal data-reveal-delay="2">
            {item.title[locale].includes(':') ? (
              <>
                {item.title[locale].split(':')[0]}: <em className="serif-i warm-grad">{item.title[locale].split(':').slice(1).join(':').trim()}</em>
              </>
            ) : (
              item.title[locale]
            )}
          </h1>
          <div className="case-hero-meta" data-reveal data-reveal-delay="3">
            <Meta label={locale === 'pt' ? 'Cliente' : 'Client'} value={item.client} />
            <Meta label={locale === 'pt' ? 'Setor' : 'Sector'} value={item.sector[locale]} />
            <Meta label={locale === 'pt' ? 'Ano' : 'Year'} value={item.year} />
            <Meta label={locale === 'pt' ? 'Duração' : 'Duration'} value={item.duration[locale]} />
          </div>
        </div>
      </section>

      <section className="case-image-section">
        <div className="wrap">
          <MediaImage src={item.image} alt={item.title[locale]} ratio="16 / 8" />
        </div>
      </section>

      <CaseTextBlock eyebrow={locale === 'pt' ? 'O desafio' : 'The challenge'} title={locale === 'pt' ? 'Um negócio excelente, invisível na busca.' : 'An excellent business, invisible in search.'} paragraphs={item.challenge[locale]} />
      <hr className="rule constrained-rule" />
      <CaseTextBlock eyebrow={locale === 'pt' ? 'A solução' : 'The solution'} title={locale === 'pt' ? 'Reposicionamento + estratégia de busca de ponta a ponta.' : 'Repositioning plus end-to-end search strategy.'} paragraphs={item.solution[locale]} bullets={item.bullets[locale]} />

      <section className="section band">
        <div className="wrap">
          <span className="eyebrow results-eyebrow" data-reveal>{locale === 'pt' ? 'Os resultados' : 'The results'}</span>
          <div className="big-stats">
            {item.stats.map((stat, statIndex) => (
              <div data-reveal data-reveal-delay={statIndex} key={stat.label[locale]}>
                <div className="stat-n warm-grad big-stat-value">{stat.value}</div>
                <div className="stat-l">{stat.label[locale]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap gallery">
          <MediaImage src={item.image} alt={item.title[locale]} ratio="4 / 3" />
          <div className="grid gallery-side">
            <MediaImage src="images/horizon-hero.png" alt="Horizon interface detail" ratio="1 / 1" />
          </div>
        </div>
      </section>

      <Testimonial locale={locale} />

      <section className="section no-top">
        <div className="wrap">
          <Link to={casePath(locale, next.slug)} className="card next-case" data-reveal>
            <div>
              <span className="faint next-label">{copy.nextCase}</span>
              <h3 className="h2 next-title">{next.title[locale]}</h3>
            </div>
            <span className="btn btn--ghost btn--lg">
              {copy.readCase} <span className="arr">→</span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <h4>{label}</h4>
      <div>{value}</div>
    </div>
  );
}

function CaseTextBlock({ eyebrow, title, paragraphs, bullets }: { eyebrow: string; title: string; paragraphs: string[]; bullets?: string[] }) {
  return (
    <section className="section--tight case-copy-section">
      <div className="wrap case-body">
        <div>
          <span className="eyebrow" data-reveal>{eyebrow}</span>
        </div>
        <div data-reveal data-reveal-delay="1">
          <h2 className="h2">{title}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {bullets && (
            <ul className="svc-list case-bullets">
              {bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
