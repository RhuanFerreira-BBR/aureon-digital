interface MarqueeProps { lang: "en" | "pt"; }

const items = [
  "Web Design", "SEO", "GEO", "Digital Strategy", "Conversion Optimization",
  "AI Search", "Brand Identity", "Performance", "Web Design", "SEO", "GEO",
  "Digital Strategy", "Conversion Optimization", "AI Search", "Brand Identity", "Performance",
];

export function Marquee({ lang }: MarqueeProps) {
  void lang;

  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--border-dim)", borderBottom: "1px solid var(--border-dim)", padding: "18px 0", background: "var(--void2)" }}>
      <div className="marquee-track" style={{ gap: 0 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 0, flexShrink: 0 }}>
            <span style={{ padding: "0 32px", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
              {item}
            </span>
            <span style={{ color: "var(--gold)", fontSize: 10, flexShrink: 0 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
