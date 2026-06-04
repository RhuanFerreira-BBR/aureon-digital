import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { usePageEffects } from '../hooks/usePageEffects';
import type { Locale } from '../types';

export function Layout({ locale }: { locale: Locale }) {
  const location = useLocation();
  usePageEffects();

  return (
    <>
      <Header locale={locale} />
      <main key={location.pathname}>
        <Outlet />
      </main>
      <Footer locale={locale} />
    </>
  );
}
