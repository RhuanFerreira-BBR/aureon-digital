import { Link } from 'react-router-dom';
import type { Locale } from '../types';
import { routePath } from '../utils';

type CtaPanelProps = {
  locale: Locale;
  eyebrow?: string;
  title: string;
  text?: string;
  button: string;
};

export function CtaPanel({ locale, eyebrow, title, text, button }: CtaPanelProps) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="card cta-card" data-reveal>
          <div className="aurora" aria-hidden="true" style={{ opacity: 0.6 }}>
            <i />
            <i />
            <i />
          </div>
          <div className="relative">
            {eyebrow && <span className="eyebrow eyebrow--center">{eyebrow}</span>}
            <h2 className="h1 cta-title">{title}</h2>
            {text && <p className="lead mx-auto cta-text">{text}</p>}
            <div className="row centered cta-actions">
              <Link to={routePath(locale, 'contact')} className="btn btn--primary btn--lg">
                {button} <span className="arr">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
