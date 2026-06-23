# AUREON

React + TypeScript website rebuilt from the Runable design in `workspace-files/`.

## Stack

- Vite + React + TypeScript
- Sass/SCSS
- React Router
- Hardcoded cases, blog posts, legal pages, and marketing content
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

`npm run test` runs lint, build, and Playwright checks.

## Routes

- `/`
- `/services`
- `/cases`
- `/cases/:id`
- `/blog`
- `/blog/:id`
- `/about`
- `/faq`
- `/privacy`
- `/terms`

## Deploy

Pushes to `main` run `.github/workflows/pages.yml`, build with the GitHub Pages base path, and deploy `dist/`.

## Design Source

`workspace-files/` is kept as local Runable reference material and is ignored by Git.
