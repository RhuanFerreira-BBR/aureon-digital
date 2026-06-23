interface BrandLogoProps {
  markSize?: number;
}

export function BrandLogo({ markSize = 40 }: BrandLogoProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <svg width={markSize} height={markSize} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hexGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE580" />
            <stop offset="50%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#8B6200" />
          </linearGradient>
          <linearGradient id="aGrad" x1="20" y1="9" x2="20" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE580" />
            <stop offset="60%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#A07800" />
          </linearGradient>
          <filter id="aGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <radialGradient id="hexFill" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0.03" />
          </radialGradient>
        </defs>
        <path d="M20 3.5L33.5 11V29L20 36.5L6.5 29V11L20 3.5Z" fill="url(#hexFill)" />
        <path d="M20 3.5L33.5 11V29L20 36.5L6.5 29V11L20 3.5Z" stroke="url(#hexGrad)" strokeWidth="1.1" fill="none" />
        <path d="M20 7.5L30.5 13.5V26.5L20 32.5L9.5 26.5V13.5L20 7.5Z" stroke="#D4A017" strokeWidth="0.4" strokeOpacity="0.25" fill="none" />
        <path d="M20 11L28.5 28H11.5L20 11Z" fill="url(#aGrad)" opacity="0.12" />
        <path d="M20 11L28.5 28H11.5L20 11Z" stroke="url(#aGrad)" strokeWidth="1.6" strokeLinejoin="round" fill="none" filter="url(#aGlow)" />
        <line x1="14.8" y1="22.5" x2="25.2" y2="22.5" stroke="url(#aGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="20" cy="11" r="1.2" fill="#FFE580" opacity="0.95" />
      </svg>

      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1, gap: 1 }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: 16,
          letterSpacing: "0.18em",
          color: "var(--text)",
          textTransform: "uppercase",
        }}>
          AUREON
        </span>
        <span style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: 8,
          letterSpacing: "0.22em",
          color: "var(--gold)",
          textTransform: "uppercase",
          opacity: 0.8,
        }}>
          Digital Agency
        </span>
      </div>
    </div>
  );
}
