import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CasePage } from './pages/CasePage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { InsightsPage } from './pages/InsightsPage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout locale="pt" />}>
        <Route index element={<HomePage locale="pt" />} />
        <Route path="services" element={<ServicesPage locale="pt" />} />
        <Route path="work" element={<WorkPage locale="pt" />} />
        <Route path="work/:slug" element={<CasePage locale="pt" />} />
        <Route path="about" element={<AboutPage locale="pt" />} />
        <Route path="insights" element={<InsightsPage locale="pt" />} />
        <Route path="insights/:slug" element={<BlogPostPage locale="pt" />} />
        <Route path="contact" element={<ContactPage locale="pt" />} />
      </Route>

      <Route path="en" element={<Layout locale="en" />}>
        <Route index element={<HomePage locale="en" />} />
        <Route path="services" element={<ServicesPage locale="en" />} />
        <Route path="work" element={<WorkPage locale="en" />} />
        <Route path="work/:slug" element={<CasePage locale="en" />} />
        <Route path="about" element={<AboutPage locale="en" />} />
        <Route path="insights" element={<InsightsPage locale="en" />} />
        <Route path="insights/:slug" element={<BlogPostPage locale="en" />} />
        <Route path="contact" element={<ContactPage locale="en" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
