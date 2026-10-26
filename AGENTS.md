# Repository Guidelines

## Project Structure

This repository is a React single-page storefront built with Vite. Application entry points are `src/main.jsx` and `src/App.jsx`. Reusable UI lives in `src/components/` (for example, `Products.jsx`, `ProductCard.jsx`, and `ProductViewModal.jsx`); global styles are in `src/index.css` and `src/App.css`. Static public files belong in `public/`, while imported images and other source assets belong in `src/assets/`. There is currently no test directory or test script.

## Development Commands

- `npm install` installs the dependencies recorded in `package-lock.json`.
- `npm run dev` starts the Vite development server; use the local URL it prints to preview changes.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the production build locally (run after building).
- `npm run lint` runs Oxlint across the project.

## Coding Style & Naming

Use JavaScript with React function components and JSX. Indent with two spaces, keep imports at the top, and use semicolons consistently with the surrounding source. Name component files and component functions in PascalCase (`ProductCard.jsx`); use camelCase for variables, props, and handlers (`productName`, `handleProductView`). Keep components focused and pass data through explicit props. Style UI with the existing Tailwind utility classes; place shared/global rules in the existing CSS files.

## Testing Guidelines

No test framework or test script is configured yet. Before submitting a change, run `npm run lint` and `npm run build`. If tests are added later, document the framework and command here, and keep test filenames next to the behavior they cover or in a clearly named `src/__tests__/` directory.

## Commits & Pull Requests

The available Git history is small, so no established commit convention can be inferred. Use short, action-oriented subjects, such as `Add product detail modal`. Pull requests should summarize user-visible changes, mention validation commands run, link related issues when applicable, and include screenshots for visual changes.

## Configuration

Do not commit secrets or local environment files. Keep dependency changes reflected in both `package.json` and `package-lock.json`.
