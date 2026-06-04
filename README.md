# Horizon Collective

React + TypeScript website for Horizon Collective, migrated from the static design in `Lumiris/`.

## Stack

- Vite + React + TypeScript
- Sass/SCSS
- React Router with PT-BR at `/` and EN at `/en`
- Mocked blog data with a WordPress REST-ready service layer
- GitHub Pages deployment via GitHub Actions
- Playwright smoke/visual checks

## Local Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run build
npm run test:visual
```

`npm run test` runs lint, build and Playwright checks.

## WordPress Headless

Blog content is currently mocked in `src/data/site.ts`. To connect WordPress REST later, set:

```bash
VITE_WORDPRESS_API_URL=https://your-wordpress-site.com
```

The adapter lives in `src/services/wordpress.ts`.

## Deploy

Pushes to `main` run `.github/workflows/pages.yml`, build with the GitHub Pages base path and deploy `dist/`.

## Design Source

`Lumiris/` is kept as the original static HTML/CSS/JS design reference and screenshot source.
