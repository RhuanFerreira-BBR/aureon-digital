import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";

import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { CaseProof } from "./components/CaseProof";
import { Contact } from "./components/Contact";
import { CasesPage } from "./components/CasesPage";
import { CaseDetailPage } from "./components/CaseDetailPage";
import { BlogPage } from "./components/BlogPage";
import { PostDetailPage } from "./components/PostDetailPage";
import { FaqPage } from "./pages/FaqPage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { readPreferredLanguage, savePreferredLanguage } from "./lib/language";
import { applyPageMeta, type SiteLang } from "./lib/seo";

type Lang = SiteLang;

function HomePage({ lang }: { lang: Lang }) {
  return (
    <main>
      <Hero key={lang} lang={lang} />
      <Marquee lang={lang} />
      <Services lang={lang} />
      <Process lang={lang} />
      <CaseProof lang={lang} />
      <Contact lang={lang} />
    </main>
  );
}

function CaseDetailRoute({ lang }: { lang: Lang }) {
  const { id = "" } = useParams();
  return <CaseDetailPage lang={lang} id={id} />;
}

function PostDetailRoute({ lang }: { lang: Lang }) {
  const { id = "" } = useParams();
  return <PostDetailPage lang={lang} slug={id} />;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="progress-bar" style={{ width: `${progress}%` }} />;
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="cursor-glow" style={{ left: pos.x, top: pos.y }} />;
}

export default function App() {
  const [lang, setLang] = useState<Lang>(readPreferredLanguage);
  const { pathname, hash } = useLocation();
  const blogLang: Lang | null = /^\/en\/blog(?:\/|$)/i.test(pathname)
    ? "en"
    : /^\/blog(?:\/|$)/i.test(pathname)
      ? "pt"
      : null;
  const activeLang = blogLang ?? lang;

  function changePreferredLanguage(nextLang: Lang) {
    setLang(nextLang);
    savePreferredLanguage(nextLang);
  }

  useEffect(() => {
    applyPageMeta(pathname, activeLang);
  }, [pathname, activeLang]);

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--void)" }}>
      <ScrollProgress />
      <CursorGlow />
      <Nav lang={activeLang} onLanguageChange={changePreferredLanguage} />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage lang={activeLang} />} />
          <Route path="/cases" element={<CasesPage lang={activeLang} />} />
          <Route path="/cases/:id" element={<CaseDetailRoute lang={activeLang} />} />
          <Route path="/blog" element={<BlogPage lang="pt" />} />
          <Route path="/blog/:id" element={<PostDetailRoute lang="pt" />} />
          <Route path="/en/blog" element={<BlogPage lang="en" />} />
          <Route path="/en/blog/:id" element={<PostDetailRoute lang="en" />} />
          <Route path="/faq" element={<FaqPage lang={activeLang} />} />
          <Route path="/about" element={<AboutPage lang={activeLang} />} />
          <Route path="/services" element={<ServicesPage lang={activeLang} />} />
          <Route path="/privacy" element={<PrivacyPage lang={activeLang} />} />
          <Route path="/terms" element={<TermsPage lang={activeLang} />} />
          <Route
            path="*"
            element={
              <main style={{ paddingTop: 200, textAlign: "center", minHeight: "60vh" }}>
                <h1 style={{ fontFamily: "var(--font-display)", fontSize: 80, color: "var(--gold)", marginBottom: 16 }}>404</h1>
                <p style={{ color: "var(--text-muted)", fontSize: 18 }}>Page not found.</p>
              </main>
            }
          />
        </Routes>
      </div>

      <Footer lang={activeLang} />
    </div>
  );
}
