import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CtaPanel } from '../components/CtaPanel';
import { MediaImage } from '../components/MediaImage';
import { Seo } from '../components/Seo';
import { allCases, ui } from '../data/site';
import type { Locale } from '../types';
import { casePath } from '../utils';

const filters = ['all', 'SEO', 'Web Design', 'Dev', 'GEO'];

export function WorkPage({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState('all');
  const visibleCases = allCases.filter((item) => filter === 'all' || item.categories.some((category) => category.toLowerCase().includes(filter.toLowerCase())));

  return (
    <>
      <Seo
        locale={locale}
        title={locale === 'pt' ? 'Cases' : 'Work'}
        description={
          locale === 'pt'
            ? 'Projetos de web design, desenvolvimento e SEO que moveram ponteiros para pequenos negócios.'
            : 'Web design, development and SEO projects that moved the numbers for small businesses.'
        }
      />
      <section className="section page-hero work-hero">
        <div className="aurora" aria-hidden="true" style={{ opacity: 0.5 }} data-parallax="14">
          <i />
          <i />
          <i />
        </div>
        <div className="wrap">
          <span className="eyebrow" data-reveal>{locale === 'pt' ? 'Cases selecionados' : 'Selected work'}</span>
          <h1 className="h1 page-title short-title" data-reveal data-reveal-delay="1">
            {locale === 'pt' ? (
              <>
                Resultado é a nossa <em className="serif-i warm-grad">assinatura</em>.
              </>
            ) : (
              <>
                Results are our <em className="serif-i warm-grad">signature</em>.
              </>
            )}
          </h1>
          <p className="lead page-lead" data-reveal data-reveal-delay="2">
            {locale === 'pt' ? 'Pequenos negócios que decidiram ser encontrados, e o que aconteceu depois.' : 'Small businesses that decided to be found, and what happened next.'}
          </p>
        </div>
      </section>

      <section className="section--tight no-top">
        <div className="wrap">
          <div className="filters" data-reveal>
            {filters.map((item) => (
              <button className={`filter ${filter === item ? 'on' : ''}`} onClick={() => setFilter(item)} key={item}>
                {item === 'all' ? (locale === 'pt' ? 'Todos' : 'All') : item}
              </button>
            ))}
          </div>

          <div className="work-grid">
            {visibleCases.map((item, index) => (
              <Link to={casePath(locale, item.slug)} className="card case-card" data-reveal data-reveal-delay={index % 2} key={item.slug}>
                <MediaImage src={item.image} alt={item.shortTitle[locale]} />
                <div className="case-meta">
                  <div className="row pill-row">
                    {item.categories.slice(0, 2).map((category) => (
                      <span className="pill" key={category}>
                        {category}
                      </span>
                    ))}
                  </div>
                  <h3 className="h3 card-title">{item.shortTitle[locale]}</h3>
                  <div className="case-result">{item.result[locale]}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="grid stat-grid">
            <Stat count="180" suffix="+" label={locale === 'pt' ? 'Projetos entregues' : 'Projects delivered'} />
            <Stat count="3" suffix={locale === 'pt' ? ',4×' : '.4x'} label={locale === 'pt' ? 'Tráfego orgânico médio' : 'Average organic traffic'} />
            <Stat count="92" suffix="%" label={locale === 'pt' ? 'Sites no top 3 do Google' : 'Sites in Google top 3'} />
            <Stat count="98" suffix="%" label={locale === 'pt' ? 'Clientes que renovam' : 'Clients who renew'} />
          </div>
        </div>
      </section>

      <CtaPanel
        locale={locale}
        title={locale === 'pt' ? 'Seu negócio pode ser o próximo case.' : 'Your business can be the next case.'}
        button={ui[locale].startProject}
      />
    </>
  );
}

function Stat({ count, suffix = '', label }: { count: string; suffix?: string; label: string }) {
  return (
    <div data-reveal>
      <div className="stat-n warm-grad">
        <span data-count={count} data-suffix={suffix}>
          0
        </span>
      </div>
      <div className="stat-l">{label}</div>
    </div>
  );
}
