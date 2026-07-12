import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { blogIndexPath, blogPath, legacyBlogRedirects, posts } from './src/lib/blog';
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

  replace(/<html lang="[^"]*">/, `<html lang="${meta.locale === 'pt_BR' ? 'pt-BR' : 'en'}">`, 'html lang');
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
  const additions = [
    ...(meta.alternates ? [
      ['pt-BR', meta.alternates.pt],
      ['en', meta.alternates.en],
      ['x-default', meta.alternates.xDefault],
    ].map(([hreflang, href]) =>
      `<link data-aureon-hreflang rel="alternate" hreflang="${hreflang}" href="${escapeHtml(href)}" />`,
    ) : []),
    ...(meta.schema ? [
      `<script id="article-jsonld" type="application/ld+json">${JSON.stringify(meta.schema).replace(/</g, '\\u003c')}</script>`,
    ] : []),
  ];
  if (additions.length) replace(/<\/head>/, `  ${additions.join('\n  ')}\n</head>`, 'closing head tag');
  return html;
}

function redirectHtml(target: string, base: string) {
  const path = `${base.replace(/\/$/, '')}${target}`;
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex,follow" />
    <meta http-equiv="refresh" content="0;url=${escapeHtml(path)}" />
    <link rel="canonical" href="${escapeHtml(`https://aureondigital.co${target}`)}" />
    <title>Redirecionando | AUREON</title>
  </head>
  <body><p>Conteúdo movido. <a href="${escapeHtml(path)}">Continuar para o artigo</a>.</p></body>
</html>
`;
}

let outputBase = '/';

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/aureon-digital/' : '/',
  plugins: [
    react(),
    {
      name: 'spa-404-fallback',
      configResolved(config) {
        outputBase = config.base;
      },
      closeBundle() {
        const index = resolve(__dirname, 'dist/index.html');
        const fallback = resolve(__dirname, 'dist/404.html');
        if (!existsSync(index)) return;

        const html = readFileSync(index, 'utf8');
        const casesDirectory = resolve(__dirname, 'dist/cases');
        mkdirSync(casesDirectory, { recursive: true });
        writeFileSync(
          resolve(casesDirectory, 'index.html'),
          withPageMeta(html, resolvePageMeta('/cases', 'pt')),
        );
        for (const item of cases) {
          const directory = resolve(casesDirectory, item.id);
          mkdirSync(directory, { recursive: true });
          writeFileSync(resolve(directory, 'index.html'), withPageMeta(html, resolvePageMeta(`/cases/${item.id}`, 'pt')));
        }
        const blogRoutes = [
          blogIndexPath('pt'),
          blogIndexPath('en'),
          ...posts.flatMap(post => [blogPath(post, 'pt'), blogPath(post, 'en')]),
        ];
        for (const route of blogRoutes) {
          const directory = resolve(__dirname, 'dist', route.replace(/^\//, ''));
          const lang = route.startsWith('/en/') ? 'en' : 'pt';
          mkdirSync(directory, { recursive: true });
          writeFileSync(resolve(directory, 'index.html'), withPageMeta(html, resolvePageMeta(route, lang)));
        }
        for (const [route, target] of Object.entries(legacyBlogRedirects)) {
          const directory = resolve(__dirname, 'dist', route.replace(/^\//, ''));
          mkdirSync(directory, { recursive: true });
          writeFileSync(resolve(directory, 'index.html'), redirectHtml(target, outputBase));
        }
        copyFileSync(index, fallback);
      },
    },
  ],
});
