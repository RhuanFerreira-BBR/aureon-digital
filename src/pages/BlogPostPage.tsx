import { Link, Navigate, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { posts } from '../data/site';
import type { Locale } from '../types';
import { formatDate, routePath } from '../utils';

export function BlogPostPage({ locale }: { locale: Locale }) {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);
  if (!post) return <Navigate to={routePath(locale, 'insights')} replace />;

  return (
    <>
      <Seo locale={locale} title={post.title[locale]} description={post.excerpt[locale]} />
      <section className="section case-hero">
        <div className="wrap">
          <Link to={routePath(locale, 'insights')} className="pill" data-reveal>
            {locale === 'pt' ? '← Voltar aos insights' : '← Back to insights'}
          </Link>
          <span className="pill pill--accent post-detail-pill" data-reveal data-reveal-delay="1">
            {post.category}
          </span>
          <h1 className="display blog-title" data-reveal data-reveal-delay="2">
            {post.title[locale]}
          </h1>
          <p className="lead blog-excerpt" data-reveal data-reveal-delay="3">
            {post.excerpt[locale]}
          </p>
          <p className="post-date blog-date">{formatDate(post.date, locale)} · {post.readingTime[locale]}</p>
        </div>
      </section>

      <section className="section--tight no-top">
        <div className="wrap blog-body">
          {post.body[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  );
}
