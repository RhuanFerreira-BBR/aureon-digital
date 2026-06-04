import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { ui } from '../data/site';
import { fetchPosts } from '../services/wordpress';
import type { BlogPost, Locale } from '../types';
import { assetPath, formatDate, postPath } from '../utils';

export function InsightsPage({ locale }: { locale: Locale }) {
  const [items, setItems] = useState<BlogPost[]>([]);
  const featured = items.find((post) => post.featured) ?? items[0];
  const regular = items.filter((post) => post.id !== featured?.id);

  useEffect(() => {
    fetchPosts(locale).then(setItems).catch(() => setItems([]));
  }, [locale]);

  return (
    <>
      <Seo
        locale={locale}
        title="Insights"
        description={
          locale === 'pt'
            ? 'Ideias sobre web, SEO, GEO e crescimento orgânico para pequenos negócios.'
            : 'Ideas about web, SEO, GEO and organic growth for small businesses.'
        }
      />
      <section className="section page-hero insights-hero">
        <div className="aurora" aria-hidden="true" style={{ opacity: 0.45 }} data-parallax="14">
          <i />
          <i />
          <i />
        </div>
        <div className="wrap">
          <span className="eyebrow" data-reveal>Insights</span>
          <h1 className="h1 page-title short-title" data-reveal data-reveal-delay="1">
            {locale === 'pt' ? (
              <>
                Do nosso <em className="serif-i warm-grad">radar</em> para o seu negócio.
              </>
            ) : (
              <>
                From our <em className="serif-i warm-grad">radar</em> to your business.
              </>
            )}
          </h1>
          <p className="lead page-lead" data-reveal data-reveal-delay="2">
            {locale === 'pt' ? 'Ideias práticas sobre web, SEO, GEO e crescimento orgânico, sem enrolação.' : 'Practical ideas about web, SEO, GEO and organic growth, without filler.'}
          </p>
        </div>
      </section>

      {featured && (
        <section className="section--tight no-top">
          <div className="wrap">
            <Link to={postPath(locale, featured.slug)} className="card feat-post" data-reveal>
              <div className="ph media-frame">
                <img src={assetPath('images/horizon-hero.png')} alt="" className="media-img" loading="lazy" />
              </div>
              <div className="feat-post-copy">
                <span className="pill pill--accent">
                  {ui[locale].featured} · {featured.category}
                </span>
                <h2 className="h2 feat-post-title">{featured.title[locale]}</h2>
                <p className="muted feat-post-excerpt">{featured.excerpt[locale]}</p>
                <div className="row feat-post-date">
                  <span className="post-date">{formatDate(featured.date, locale)} · {featured.readingTime[locale]}</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="section--tight no-top">
        <div className="wrap">
          <div className="row category-row" data-reveal>
            {['Todos', 'SEO', 'GEO', 'Web Design', 'Performance', 'Negócios'].map((category, index) => (
              <span className={`pill ${index === 0 ? 'pill--accent' : ''}`} key={category}>
                {locale === 'en' && category === 'Todos' ? 'All' : category}
              </span>
            ))}
          </div>

          <div className="post-grid">
            {regular.map((post, index) => (
              <Link to={postPath(locale, post.slug)} className="card post-card" data-reveal data-reveal-delay={index % 3} key={post.slug}>
                <span className="pill">{post.category}</span>
                <h3 className="h3 post-title">{post.title[locale]}</h3>
                <p className="muted post-excerpt">{post.excerpt[locale]}</p>
                <div className="post-date">{formatDate(post.date, locale)} · {post.readingTime[locale]}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="card newsletter-card" data-reveal>
            <div className="max-60">
              <span className="eyebrow">Newsletter</span>
              <h2 className="h2 heading-offset">{locale === 'pt' ? 'Um e-mail por mês. Só o que importa.' : 'One email per month. Only what matters.'}</h2>
              <p className="muted newsletter-copy">
                {locale === 'pt'
                  ? 'Estratégias de web, SEO e crescimento orgânico direto na sua caixa. Sem spam.'
                  : 'Web, SEO and organic growth strategy in your inbox. No spam.'}
              </p>
            </div>
            <form className="news" onSubmit={(event) => event.preventDefault()}>
              <input type="email" required placeholder={locale === 'pt' ? 'seu@email.com' : 'you@email.com'} aria-label="Email" />
              <button type="submit" className="btn btn--primary">
                {locale === 'pt' ? 'Assinar' : 'Subscribe'} <span className="arr">→</span>
              </button>
              <p className="success-note">{ui[locale].newsletterSuccess}</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
