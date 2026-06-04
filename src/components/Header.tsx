import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { navLabels, ui } from '../data/site';
import type { Locale, RouteKey } from '../types';
import { alternateLocalePath, routePath } from '../utils';
import { Logo } from './Logo';

const navItems: RouteKey[] = ['home', 'services', 'work', 'about', 'insights', 'contact'];

export function Header({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const labels = navLabels[locale];
  const copy = ui[locale];

  const close = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggle = () => {
    setMenuOpen((open) => {
      document.body.style.overflow = open ? '' : 'hidden';
      return !open;
    });
  };

  return (
    <>
      <header className="site-header">
        <div className="wrap nav">
          <Logo locale={locale} />

          <nav className="nav-links" aria-label={locale === 'pt' ? 'Principal' : 'Primary'}>
            {navItems.map((key) => (
              <NavLink
                key={key}
                to={routePath(locale, key)}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end={key === 'home'}
              >
                {labels[key]}
              </NavLink>
            ))}
          </nav>

          <div className="nav-right">
            <Link to={alternateLocalePath(location.pathname)} className="lang-link" aria-label="Toggle language">
              {copy.languageLabel}
            </Link>
            <Link to={routePath(locale, 'contact')} className="btn btn--primary">
              {copy.startProject} <span className="arr">→</span>
            </Link>
            <button className="menu-toggle" aria-label="Abrir menu" aria-expanded={menuOpen} onClick={toggle}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobileMenu">
        {navItems.map((key) => (
          <Link key={key} to={routePath(locale, key)} onClick={close}>
            {labels[key]}
          </Link>
        ))}
        <Link to={alternateLocalePath(location.pathname)} onClick={close} className="mobile-lang">
          {copy.languageLabel}
        </Link>
      </div>
    </>
  );
}
