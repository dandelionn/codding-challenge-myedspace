# Livestream Demo

A React demo app that combines **hybrid session authentication** with a **YouTube livestream viewer**. It uses an OpenAPI-generated API client, MSW for local API mocking, and TanStack Query for async server state.

## Features

- **Authentication** — Login with cookie-based sessions and CSRF protection (mocked via MSW in development)
- **Livestream** — Embedded YouTube player with play/pause/seek interaction tracking (in-memory event log + console output)
- **Access control** — Video playback is available only to authenticated users
- **i18n** — English and Romanian UI strings
- **Welcome modal** — First-visit overview of routes and tech stack

## Tech stack

- React 18 + TypeScript
- Vite
- Mantine (UI)
- React Router
- TanStack React Query
- [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) (generated API client)
- MSW (API mocking in development)
- Vitest + Testing Library

## Routes

### Active routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Redirects to `/watch` |
| `/watch` | Public | Livestream page. Shows a login prompt when signed out; authenticated users can watch and track playback events |
| `/login` | Public | Sign in. Supports `?redirect=` to return to a protected page after login |
| `/dashboard` | Protected | User dashboard with session details, livestream panel, and logout |
| `*` | Public | Unknown paths redirect to `/watch` |

### Defined but not wired in the router

These paths exist in `src/routes.ts` for auth-related UI that is not mounted in `App.tsx` yet:

- `/register`
- `/request-password-reset`
- `/request-confirmation-email`
- `/reset-password/:token`
- `/verify-account/:token`
- `/two-step`
- `/account`

## Development

### Prerequisites

- Node.js 18+

### Install and run

```bash
npm install
npm run dev
```

The app runs at [http://localhost:5173](http://localhost:5173) by default.

### MSW demo user

When MSW is enabled (toggle in the bottom-right in dev), use:

- **Email:** `admin@example.com`
- **Password:** `password123`

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck and production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run coverage` | Run tests with coverage report |
| `npm run lint` | ESLint |
| `npm run codegen` | Regenerate API client from OpenAPI spec |

### API codegen

The OpenAPI spec lives in `api-spec/`. Regenerate the client after spec changes:

```bash
npm run codegen
```

Output is written to `src/api/generated/`.

## Project structure (high level)

```
src/
  api/              OpenAPI client, fetcher, generated types
  components/       UI (livestream, auth, welcome modal, …)
  containers/       Page-level logic (login, livestream panel)
  views/            Route entry pages
  mocks/            MSW handlers and demo session state
  i18n/             Locale provider and messages (en, ro)
```
