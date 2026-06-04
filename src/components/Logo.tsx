import { Link } from 'react-router-dom';
import type { Locale } from '../types';
import { routePath } from '../utils';

type LogoProps = {
  locale: Locale;
  compact?: boolean;
};

export function Logo({ locale, compact = false }: LogoProps) {
  return (
    <Link to={routePath(locale, 'home')} className="logo" aria-label="Horizon Collective - home">
      <svg className="logo-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="hcMark" x1="6" y1="8" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F4C76B" />
            <stop offset="0.55" stopColor="#E89A4C" />
            <stop offset="1" stopColor="#C75B36" />
          </linearGradient>
        </defs>
        <path d="M7 23.5a13 13 0 0 1 26 0z" fill="url(#hcMark)" />
        <line x1="4" y1="28.6" x2="36" y2="28.6" stroke="url(#hcMark)" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="13" y1="33.6" x2="27" y2="33.6" stroke="url(#hcMark)" strokeWidth="2.6" strokeLinecap="round" opacity="0.5" />
      </svg>
      <span className="stack-sm" style={{ gap: 1 }}>
        <span className="logo-word">
          <b>Horizon</b> Collective
        </span>
        {!compact && <span className="logo-sub">Studio · Web · SEO</span>}
      </span>
    </Link>
  );
}
