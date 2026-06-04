# Contributing

## Workflow

1. Create a branch from `main`.
2. Keep changes scoped to the feature or fix.
3. Run `npm run lint`, `npm run build` and `npm run test:visual`.
4. Open a pull request with screenshots for UI changes.

## Conventions

- Use TypeScript for application code.
- Keep Sass in `src/styles/main.scss` unless a component needs a clearly separate partial later.
- Keep institutional page content hardcoded until the content model changes.
- Keep blog integration behind `src/services/wordpress.ts`.
- Use conventional commit messages, for example `feat: add contact form mailto`.
