import { Link } from 'react-router-dom';
import { CtaPanel } from '../components/CtaPanel';
import { MediaImage } from '../components/MediaImage';
import { Seo } from '../components/Seo';
import { cases, extraServices, posts, services, ui } from '../data/site';
import type { Locale } from '../types';
import { casePath, postPath, routePath } from '../utils';

export function HomePage({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  const featuredPosts = posts.slice(0, 3);
  const marquee = ['Verde Café', 'Atelier Mara', 'Norte Clínica', 'Pão & Brasa', 'Studio Lume', 'Vito Advocacia'];
  const displayServices = [
    ...services.map((service) => ({
      number: service.number,
      title: service.homeTitle[locale],
      summary: service.summary[locale],
    })),
    ...extraServices.map((service) => ({
      number: service.number,
      title: service.title[locale],
      summary: service.summary[locale],
    })),
  ];

  return (
    <>
      <Seo
        locale={locale}
        title={locale === 'pt' ? 'Horizon Collective - Estúdio de web, design e SEO' : 'Horizon Collective - Web, design and SEO studio'}
        description={
          locale === 'pt'
            ? 'Estúdio digital de web design, desenvolvimento e SEO para pequenos negócios que querem ser encontrados.'
            : 'Digital studio for web design, development and SEO for small businesses that want to be found.'
        }
      />

      <section className="section hero-section">
        <div className="aurora" aria-hidden="true" data-parallax="18">
          <i />
          <i />
          <i />
        </div>
        <div className="wrap">
          <div data-reveal>
            <span className="eyebrow">{locale === 'pt' ? 'Agência digital · Desde 2019' : 'Digital studio · Since 2019'}</span>
          </div>
          <h1 className="display hero-title" data-reveal data-reveal-delay="1">
            {locale === 'pt' ? (
              <>
                Sua marca no <em className="serif-i warm-grad">horizonte</em> de quem procura por você.
              </>
            ) : (
              <>
                Your brand on the <em className="serif-i warm-grad">horizon</em> of people looking for you.
              </>
            )}
          </h1>
          <p className="lead hero-lead" data-reveal data-reveal-delay="2">
            {locale === 'pt'
              ? 'Horizon Collective é o estúdio de web design, desenvolvimento e SEO que transforma pequenos negócios em referências digitais, encontráveis, rápidos e impossíveis de ignorar.'
              : 'Horizon Collective is the web design, development and SEO studio that turns small businesses into visible, fast and hard-to-ignore digital references.'}
          </p>
          <div className="row hero-actions" data-reveal data-reveal-delay="3">
            <Link to={routePath(locale, 'contact')} className="btn btn--primary btn--lg">
              {copy.startProjectLong} <span className="arr">→</span>
            </Link>
            <Link to={routePath(locale, 'work')} className="btn btn--ghost btn--lg">
              {copy.viewCases}
            </Link>
          </div>

          <div className="grid hero-stats" data-reveal data-reveal-delay="4">
            <Stat count="180" suffix="+" label={locale === 'pt' ? 'Projetos entregues' : 'Projects delivered'} />
            <Stat count="3" suffix={locale === 'pt' ? ',4×' : '.4x'} label={locale === 'pt' ? 'Tráfego orgânico médio' : 'Average organic traffic'} />
            <Stat count="98" suffix="%" label={locale === 'pt' ? 'Clientes que renovam' : 'Clients who renew'} />
            <Stat count="12" label={locale === 'pt' ? 'Pessoas no time' : 'People on the team'} />
          </div>
        </div>
      </section>

      <section className="section--tight marquee-section">
        <div className="wrap marquee-wrap">
          <span className="eyebrow">{locale === 'pt' ? 'Confiança de quem cresce com a gente' : 'Trusted by businesses growing with us'}</span>
          <div className="marquee">
            <div className="marquee-track">
              {[...marquee, ...marquee].map((name, index) => (
                <span className="logo-word muted-logo" key={`${name}-${index}`}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="between">
            <h2 className="h2 max-18" data-reveal>
              {locale === 'pt' ? (
                <>
                  Não fazemos só sites bonitos. Construímos máquinas de serem <em className="serif-i warm-grad">encontrados</em>.
                </>
              ) : (
                <>
                  We do not just make beautiful sites. We build machines for being <em className="serif-i warm-grad">found</em>.
                </>
              )}
            </h2>
            <p className="lead max-38" data-reveal data-reveal-delay="1">
              {locale === 'pt'
                ? 'Cada decisão de design e código é pensada para o que importa a um pequeno negócio: aparecer na busca, carregar rápido e converter visitas em clientes.'
                : 'Every design and code decision is shaped around what matters for a small business: showing up in search, loading fast and converting visits into customers.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section no-top">
        <div className="wrap">
          <div className="between section-heading">
            <div>
              <span className="eyebrow" data-reveal>{locale === 'pt' ? 'O que fazemos' : 'What we do'}</span>
              <h2 className="h2 heading-offset" data-reveal data-reveal-delay="1">
                {locale === 'pt' ? 'Serviços de ponta a ponta' : 'End-to-end services'}
              </h2>
            </div>
            <Link to={routePath(locale, 'services')} className="btn btn--ghost" data-reveal data-reveal-delay="2">
              {copy.allServices} <span className="arr">→</span>
            </Link>
          </div>
          <div className="grid service-card-grid">
            {displayServices.map((service, index) => (
              <article className="card" data-reveal data-reveal-delay={index % 3} key={service.number}>
                <div className="pill pill--accent">{service.number}</div>
                <h3 className="h3 card-title">{service.title}</h3>
                <p className="muted card-copy">{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="between section-heading">
            <div>
              <span className="eyebrow" data-reveal>{locale === 'pt' ? 'Cases selecionados' : 'Selected work'}</span>
              <h2 className="h2 heading-offset" data-reveal data-reveal-delay="1">
                {locale === 'pt' ? 'Trabalho que move ponteiros' : 'Work that moves the numbers'}
              </h2>
            </div>
            <Link to={routePath(locale, 'work')} className="btn btn--ghost" data-reveal data-reveal-delay="2">
              {copy.viewPortfolio} <span className="arr">→</span>
            </Link>
          </div>

          <div className="grid featured-work">
            <Link to={casePath(locale, cases[0].slug)} className="card image-card featured-card" data-reveal>
              <MediaImage src={cases[0].image} alt={cases[0].shortTitle[locale]} />
              <div className="case-meta">
                <Pills labels={cases[0].categories.slice(0, 2)} />
                <h3 className="h3 card-title">{cases[0].title[locale]}</h3>
                <p className="muted card-copy">{cases[0].summary[locale]}</p>
              </div>
            </Link>
            <div className="grid stacked-work">
              {cases.slice(1, 3).map((item, index) => (
                <Link to={casePath(locale, item.slug)} className="card image-card" data-reveal data-reveal-delay={index + 1} key={item.slug}>
                  <MediaImage src={item.image} alt={item.shortTitle[locale]} ratio="16 / 8" />
                  <div className="case-meta compact">
                    <Pills labels={item.categories.slice(0, 2)} />
                    <h3 className="h3 small-card-title">{item.title[locale]}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="max-52">
            <span className="eyebrow" data-reveal>{locale === 'pt' ? 'Como trabalhamos' : 'How we work'}</span>
            <h2 className="h2 heading-offset" data-reveal data-reveal-delay="1">
              {locale === 'pt' ? 'Um processo claro, do diagnóstico ao crescimento.' : 'A clear process, from diagnosis to growth.'}
            </h2>
          </div>
          <div className="grid process-grid">
            {[
              ['01', locale === 'pt' ? 'Diagnóstico' : 'Diagnosis', locale === 'pt' ? 'Auditoria de marca, site e presença na busca.' : 'Audit of brand, site and search presence.'],
              ['02', locale === 'pt' ? 'Estratégia' : 'Strategy', locale === 'pt' ? 'Posicionamento, palavras-chave e roteiro com metas reais.' : 'Positioning, keywords and a roadmap with real goals.'],
              ['03', locale === 'pt' ? 'Construção' : 'Build', locale === 'pt' ? 'Design e desenvolvimento otimizados para velocidade e conversão.' : 'Design and development optimized for speed and conversion.'],
              ['04', locale === 'pt' ? 'Crescimento' : 'Growth', locale === 'pt' ? 'SEO, conteúdo e testes para o ponteiro seguir subindo.' : 'SEO, content and testing to keep the curve moving up.'],
            ].map(([number, title, text], index) => (
              <div data-reveal data-reveal-delay={index} className="process-item" key={number}>
                <div className="stat-n warm-grad process-number">{number}</div>
                <h3 className="h3 process-title">{title}</h3>
                <p className="muted process-copy">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonial locale={locale} />

      <section className="section no-top">
        <div className="wrap">
          <div className="between insights-heading">
            <h2 className="h2" data-reveal>{locale === 'pt' ? 'Do nosso radar' : 'From our radar'}</h2>
            <Link to={routePath(locale, 'insights')} className="btn btn--ghost" data-reveal data-reveal-delay="1">
              {copy.allInsights} <span className="arr">→</span>
            </Link>
          </div>
          <div className="grid insight-card-grid">
            {featuredPosts.map((post, index) => (
              <Link to={postPath(locale, post.slug)} className="card" data-reveal data-reveal-delay={index} key={post.slug}>
                <span className="pill pill--accent">{post.category}</span>
                <h3 className="h3 insight-title">{post.title[locale]}</h3>
                <p className="faint insight-date">{post.readingTime[locale]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        locale={locale}
        eyebrow={locale === 'pt' ? 'Vamos conversar' : 'Let’s talk'}
        title={locale === 'pt' ? 'Pronto para ser encontrado?' : 'Ready to be found?'}
        text={
          locale === 'pt'
            ? 'Conte seu objetivo. Em até 48h enviamos um diagnóstico gratuito do seu site e da sua presença na busca.'
            : 'Tell us your goal. Within 48h we send a free diagnosis of your site and search presence.'
        }
        button={copy.requestDiagnostic}
      />
    </>
  );
}

function Stat({ count, suffix = '', label }: { count: string; suffix?: string; label: string }) {
  return (
    <div>
      <div className="stat-n">
        <span data-count={count} data-suffix={suffix}>
          0
        </span>
      </div>
      <div className="stat-l">{label}</div>
    </div>
  );
}

function Pills({ labels }: { labels: string[] }) {
  return (
    <div className="row pill-row">
      {labels.map((label) => (
        <span className="pill" key={label}>
          {label}
        </span>
      ))}
    </div>
  );
}

export function Testimonial({ locale }: { locale: Locale }) {
  return (
    <section className="section no-top">
      <div className="wrap">
        <figure className="card testimonial-card" data-reveal>
          <span className="eyebrow testimonial-eyebrow">{locale === 'pt' ? 'Depoimento' : 'Testimonial'}</span>
          <blockquote className="h2 testimonial-quote">
            {locale === 'pt'
              ? '“Em quatro meses saímos da terceira página do Google para o primeiro resultado. A Horizon entende de negócio, não só de site.”'
              : '“In four months we went from Google’s third page to the first result. Horizon understands business, not just websites.”'}
          </blockquote>
          <figcaption className="row testimonial-person">
            <span className="ph avatar" />
            <span className="stack-sm">
              <strong>Marina Alves</strong>
              <span className="faint person-role">{locale === 'pt' ? 'Fundadora · Norte Clínica' : 'Founder · Norte Clinic'}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
