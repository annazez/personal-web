# Repository Guidelines

## Project Structure & Module Organization

This is a static personal site built with Astro, TypeScript, and Tailwind CSS. Main source lives in `src/`: routes in `src/pages/`, UI in `src/components/`, layouts in `src/layouts/`, shared logic in `src/lib/`, i18n in `src/i18n/`, browser scripts in `src/scripts/`, and global styles in `src/styles/`. Structured data and templates are in `src/data/`. Static assets belong in `public/`. Tests are in `tests/unit/` and `tests/e2e/`; docs live in `docs/`.

## Build, Test, and Development Commands

Use Node `>=22.12.0`; install dependencies with `npm ci`.

- `npm run dev`: start the Astro development server.
- `npm run build`: generate metadata/CSP files and build to `dist/`.
- `npm run preview`: preview the production build locally.
- `npm run typecheck`: run generated-file steps and `astro check`.
- `npm run lint` / `npm run lint:fix`: check or fix ESLint issues.
- `npm run format:check` / `npm run format`: check or apply Prettier formatting.
- `npm run test:unit`: run Node test-runner unit tests.
- `npm run test:e2e`: run Playwright tests.
- `npm run check`: run the main quality gate: format, lint, typecheck, and accessibility.

## Coding Style & Naming Conventions

Use TypeScript modules and Astro components. Prettier enforces 2-space indentation, semicolons, single quotes, `printWidth: 100`, and sorted Tailwind classes. ESLint uses recommended TypeScript and Astro rules; unused variables are errors unless arguments are prefixed with `_`, and `console` warns outside scripts. Name Astro components in PascalCase and tests as `*.test.ts` or `*.spec.ts`.

## Testing Guidelines

Place unit tests under `tests/unit/` and browser workflow tests under `tests/e2e/`. Unit tests use Node's built-in test runner with `scripts/test-setup.mjs`; e2e tests use Playwright. Run `npm run test:e2e:install` before first local browser testing. Accessibility targets WCAG 2.1 AA and is checked through `npm run test:a11y`.

## Commit & Pull Request Guidelines

Recent history uses short conventional-style subjects such as `fix: webkit issues` and `chore: update Lumi domain to lumi.zezulka.me`. Keep commits scoped and imperative, with prefixes like `fix:`, `chore:`, `feat:`, or `docs:`. Before opening a PR, run `npm run check` plus relevant unit or e2e tests. PRs should describe the change, link issues when applicable, call out test coverage, and include screenshots for visible UI changes.

## Security & Configuration Tips

Do not hand-edit generated output in `dist/`. CSP, headers, humans.txt, and last-modified metadata are generated from `scripts/` and `src/data/`. Keep public security material in `public/pgp/` and review `docs/SECURITY.md` before changing security headers or external-link behavior.
