# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See also `AGENTS.md` for coding style, naming, and commit conventions.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — production bundle to `dist/`
- `npm run preview` — serve the built bundle
- `npm run lint` — Oxlint (config in `.oxlintrc.json`: `react` + `oxc` plugins, `rules-of-hooks` is an error)

There is no test framework. Validate changes with `npm run lint` and `npm run build`.

## Architecture

React 19 + Vite SPA storefront (plain JavaScript/JSX, no TypeScript, no router yet) that talks to a separate backend REST API.

**Data flow:** component → dispatches thunk from `src/store/actions/index.js` → thunk calls the shared axios instance in `src/api/api.js` → dispatches a plain action → reducer in `src/store/reducers/` → component reads via `useSelector`.

- **API client:** `src/api/api.js` creates one axios instance with `baseURL = ${VITE_BACK_END_URL}/api`. `VITE_BACK_END_URL` comes from `.env` (gitignored). Public endpoints live under `/public/...` (e.g. `/public/products`).
- **Backend response shape:** list endpoints are paginated Spring-style pages — `{ content, pageNumber, pageSize, totalElements, totalPages, lastPages }`. The `FETCH_PRODUCTS` action flattens these onto the action object; `productReducer` stores `content` as `products` and the rest under `pagination`.
- **Redux store:** `src/store/reducers/store.js` uses RTK's `configureStore` but reducers are hand-written switch reducers with string action types (not `createSlice`). Thunks are hand-written `(dispatch) => async` functions. The product reducer is mounted at `state.products`, so product data is `state.products.products`. Follow this pattern unless deliberately migrating.
- **Entry:** `src/main.jsx` wraps `<App />` in the Redux `<Provider>`; `App.jsx` currently renders only `<Products />`.
- **Components:** `Products` fetches and renders a grid of `ProductCard`s; each card owns its own `ProductViewModal` open state. Loading/error state in `Products` is currently hardcoded placeholders (not wired to the store). `Filter.jsx` and `Pagination.jsx` exist but are empty stubs.

## UI stack

Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config.js`; configure in CSS). Tailwind utilities are the primary styling method. Headless UI is used for dialogs, MUI (`@mui/material` with Emotion) for a few widgets like `Divider`, `react-icons` for icons, and `react-hot-toast` is installed for notifications.
