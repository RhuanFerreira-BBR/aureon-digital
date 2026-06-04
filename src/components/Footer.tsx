import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, navLabels, services, ui } from '../data/site';
import type { Locale } from '../types';
import { routePath } from '../utils';
import { Logo } from './Logo';

export function Footer({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  const labels = navLabels[locale];

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ marginBottom: 22 }}>
              <Logo locale={locale} compact />
            </div>
            <p className="footer-cta">{copy.footerCta}</p>
          </div>
          <div className="footer-col">
            <h4>{copy.servicesTitle}</h4>
            <ul>
              {services.map((service) => (
                <li key={service.number}>
                  <Link to={routePath(locale, 'services')}>{service.homeTitle[locale]}</Link>
                </li>
              ))}
              <li>
                <Link to={routePath(locale, 'services')}>GEO · AI Search</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{copy.studioTitle}</h4>
            <ul>
              <li>
                <Link to={routePath(locale, 'about')}>{labels.about}</Link>
              </li>
              <li>
                <Link to={routePath(locale, 'work')}>{labels.work}</Link>
              </li>
              <li>
                <Link to={routePath(locale, 'insights')}>{labels.insights}</Link>
              </li>
              <li>
                <Link to={routePath(locale, 'contact')}>{labels.contact}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{copy.contactTitle}</h4>
            <ul>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
              <li>
                <span className="faint">Instagram</span>
              </li>
              <li>
                <span className="faint">LinkedIn</span>
              </li>
              <li>
                <span className="faint">Behance</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Horizon Collective - {copy.studioLocation}</span>
          <span>{copy.footerMade}</span>
        </div>
      </div>
    </footer>
  );
}
