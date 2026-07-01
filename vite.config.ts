import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { cases } from './src/lib/cases';
import { resolvePageMeta, type PageMeta } from './src/lib/seo';

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character]!);

function replaceRequired(html: string, pattern: RegExp, replacement: string, label: string) {
  if (!pattern.test(html)) throw new Error(`Missing required ${label} in index.html`);
  return html.replace(pattern, replacement);
}

function withPageMeta(html: string, meta: PageMeta) {
  const replace = (pattern: RegExp, value: string, label: string) => {
    html = replaceRequired(html, pattern, value, label);
  };
  const tag = (attribute: 'name' | 'property', key: string, value: string) =>
    replace(
      new RegExp(`<meta ${attribute}="${key}" content="[^"]*" \\/>`),
      `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`,
      `${attribute}="${key}" meta tag`,
    );

  replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`, 'title tag');
  replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`, 'canonical link');
  tag('name', 'description', meta.description);
  tag('name', 'robots', meta.robots);
  tag('property', 'og:title', meta.title);
  tag('property', 'og:description', meta.description);
  tag('property', 'og:type', meta.type);
  tag('property', 'og:url', meta.canonical);
  tag('property', 'og:locale', meta.locale);
  tag('property', 'og:image', meta.image);
  tag('property', 'og:image:alt', meta.imageAlt);
  tag('name', 'twitter:title', meta.title);
  tag('name', 'twitter:description', meta.description);
  tag('name', 'twitter:image', meta.image);
  tag('name', 'twitter:image:alt', meta.imageAlt);
  return html;
}

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/horizon-collective/' : '/',
  plugins: [
    react(),
    {
      name: 'spa-404-fallback',
      closeBundle() {
        const index = resolve(__dirname, 'dist/index.html');
        const fallback = resolve(__dirname, 'dist/404.html');
        if (!existsSync(index)) return;

        const html = readFileSync(index, 'utf8');
        for (const item of cases) {
          const directory = resolve(__dirname, 'dist/cases', item.id);
          mkdirSync(directory, { recursive: true });
          writeFileSync(resolve(directory, 'index.html'), withPageMeta(html, resolvePageMeta(`/cases/${item.id}`, 'pt')));
        }
        copyFileSync(index, fallback);
      },
    },
  ],
});
