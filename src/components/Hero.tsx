import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface HeroProps {
  lang: "en" | "pt";
}

const t = {
  en: {
    badge: "Digital Marketing Agency",
    h1a: "We make you",
    h1b: "easy to find.",
    sub: "Web Design · SEO · GEO — precision-built for businesses ready to lead their market.",
    cta1: "Start your project",
    cta2: "See our work",
    scroll: "Scroll to explore",
    stat1n: "3×", stat1l: "Avg. traffic growth",
    stat2n: "40+", stat2l: "Projects delivered",
    stat3n: "98%", stat3l: "Client satisfaction",
  },
  pt: {
    badge: "Agência de Marketing Digital",
    h1a: "Fazemos você",
    h1b: "fácil de encontrar.",
    sub: "Web Design · SEO · GEO — construído com precisão para negócios prontos para liderar.",
    cta1: "Iniciar projeto",
    cta2: "Ver nosso trabalho",
    scroll: "Scroll para explorar",
    stat1n: "3×", stat1l: "Crescimento médio",
    stat2n: "40+", stat2l: "Projetos entregues",
    stat3n: "98%", stat3l: "Satisfação de clientes",
  },
};

export function Hero({ lang }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstWord = lang === "en" ? "easy to find." : "fácil de encontrar.";
  const [typed, setTyped] = useState(firstWord);
  const wordIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; alphaDir: number; color: string;
    }

    const colors = ["rgba(212,160,23,", "rgba(240,200,74,", "rgba(255,220,100,"];
    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * W(), y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.4 + 0.05,
      alphaDir: (Math.random() - 0.5) * 0.003,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        p.alpha += p.alphaDir;
        if (p.alpha <= 0.02 || p.alpha >= 0.5) p.alphaDir *= -1;
        if (p.x < 0) p.x = W(); if (p.x > W()) p.x = 0;
        if (p.y < 0) p.y = H(); if (p.y > H()) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212,160,23,${(1 - dist / 120) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Typewriter
  useEffect(() => {
    const words = lang === "en" ? ["easy to find.", "ahead of rivals.", "built for growth."] : ["fácil de encontrar.", "à frente da concorrência.", "pronto para crescer."];
    wordIdxRef.current = 0;
    charIdxRef.current = words[0].length;
    deletingRef.current = true;

    const type = () => {
      const word = words[wordIdxRef.current];
      if (!deletingRef.current) {
        charIdxRef.current++;
        setTyped(word.slice(0, charIdxRef.current));
        if (charIdxRef.current === word.length) {
          deletingRef.current = true;
          timerRef.current = setTimeout(type, 2200);
        } else {
          timerRef.current = setTimeout(type, 70);
        }
      } else {
        charIdxRef.current--;
        setTyped(word.slice(0, charIdxRef.current));
        if (charIdxRef.current === 0) {
          deletingRef.current = false;
          wordIdxRef.current = (wordIdxRef.current + 1) % words.length;
          timerRef.current = setTimeout(type, 300);
        } else {
          timerRef.current = setTimeout(type, 40);
        }
      }
    };
    timerRef.current = setTimeout(type, 2200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [lang]);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Canvas bg */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }} />

      {/* Gradient orbs */}
      <div className="glow-dot" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 70%)", top: "10%", right: "-5%", zIndex: 1 }} />
      <div className="glow-dot" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(74,100,226,0.08) 0%, transparent 70%)", bottom: "20%", left: "-5%", zIndex: 1 }} />

      {/* Grid */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, zIndex: 1 }} />

      {/* Radial vignette */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(8,9,15,0.7) 100%)", zIndex: 2 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 24px", paddingTop: 120, paddingBottom: 80 }}>
        <div style={{ maxWidth: 800 }}>
          {/* Badge */}
          <div className="tag reveal visible" style={{ marginBottom: 28, animationDelay: "0ms" }}>
            <svg width="6" height="6" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill="var(--gold)" /></svg>
            {t[lang].badge}
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.0, marginBottom: 8, fontFamily: "var(--font-display)" }}>
            <span style={{
              display: "block",
              color: "var(--text)",
              animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both",
            }}>
              {t[lang].h1a}
            </span>
            <span style={{
              display: "block",
              background: "linear-gradient(135deg, #D4A017 0%, #F0C84A 50%, #D4A017 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both",
              minHeight: "1.1em",
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}>
              {typed}
              <span style={{ borderRight: "3px solid var(--gold)", marginLeft: 2, animation: "fadeIn 0.5s ease infinite alternate", WebkitTextFillColor: "var(--gold)" }} />
            </span>
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            color: "var(--text-muted)",
            maxWidth: 560,
            lineHeight: 1.65,
            marginTop: 24,
            marginBottom: 44,
            animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both",
          }}>
            {t[lang].sub}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both" }}>
            <a href="#contact" className="btn-gold" style={{ textDecoration: "none" }}>
              {t[lang].cta1}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link to="/cases" className="btn-outline" style={{ textDecoration: "none" }}>{t[lang].cta2}</Link>
          </div>
        </div>

        {/* Stats row */}
        <div className="hero-metrics" style={{
          display: "flex", gap: 0, marginTop: 80, flexWrap: "wrap",
          animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both",
        }}>
          {[
            { n: t[lang].stat1n, l: t[lang].stat1l },
            { n: t[lang].stat2n, l: t[lang].stat2l },
            { n: t[lang].stat3n, l: t[lang].stat3l },
          ].map((s, i) => (
            <div key={i} className="hero-metric" style={{
              padding: "28px 40px",
              borderLeft: i === 0 ? "none" : "1px solid var(--border-dim)",
              ...(i === 0 ? { paddingLeft: 0 } : {}),
            }}>
              <div className="metric-number" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 44px)", color: "var(--gold)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, letterSpacing: "0.02em" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-cue" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeIn 1s ease 1.2s both" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-dim)" }}>{t[lang].scroll}</span>
          <div style={{
            width: 1, height: 40,
            background: "linear-gradient(to bottom, var(--gold), transparent)",
            animation: "fadeIn 1s ease infinite alternate",
          }} />
        </div>
      </div>
    </section>
  );
}
