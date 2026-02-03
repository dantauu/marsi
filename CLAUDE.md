# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn install              # Install dependencies (Yarn 3.2.3, requires corepack)
yarn dev                  # Dev server at http://localhost:8000
yarn build                # TypeScript check + Vite production build
yarn test                 # Run Vitest tests
yarn lint                 # ESLint
yarn prettier:fix         # Format with Prettier
yarn icons:build          # Regenerate SVG icon components from src/assets/icons-source/
yarn storybook            # Storybook dev server on port 6006
docker compose up -d      # Docker dev environment
```

## Architecture

Telegram Web App (TWA) for dating. React 19 + TypeScript + Vite frontend that runs inside Telegram's WebView.

### Layered structure (src/)

- **app/routes/** — TanStack Router file-based routes. Route tree auto-generated into `routeTree.gen.ts` (do not edit manually).
- **pages/** — Page components mapped 1:1 to routes.
- **features/** — Feature-specific business logic and UI, organized by domain (search, likes, profile, settings, etc.).
- **entities/** — Domain entity definitions and related logic.
- **widgets/** — Composite components (nav-bar, card, modals, overlay).
- **ui/** — Reusable presentational components.
- **shared/api/** — RTK Query endpoint definitions (user, likes, locations).
- **shared/lib/** and **lib/** — Custom hooks and utilities.
- **redux/** — Store config, slices (auth, filters, modal, volume, theme_switch, etc.), and RTK Query base API setup.
- **assets/** — Icons (generated), source SVGs, images, sounds.

Path alias: `@/*` maps to `src/*`.

### Key patterns

- **Auth**: Telegram WebApp SDK provides user identity → `useInitUser` calls backend → receives JWT → stored in localStorage (`"jwt"`) and Redux `auth` slice. `baseApi` attaches bearer token to all requests via `prepareHeaders`.
- **Data fetching**: RTK Query with `fetchBaseQuery`. Tag-based cache invalidation. Optimistic updates for like/unlike operations.
- **Real-time**: Socket.io client connects to backend with userId. Listens for `new_like`, `like_remove`, `incomingUnlike` events. Plays audio notification (respects mute state from `volume` slice) and shows toast via Sonner.
- **Forms**: React Hook Form + Zod schemas (in `lib/schemes/`).
- **Styling**: Tailwind CSS v4 with `cn()` helper (`clsx` + `tailwind-merge`).
- **Drag & drop**: `@dnd-kit` for photo reordering in profile edit.

## Code Style

- No semicolons, double quotes, 2-space indent, trailing comma ES5 (Prettier)
- ESLint with TypeScript and React hooks plugins
- Yarn 3.2.3 package manager (corepack-managed)

## Environment Variables

Vite-prefixed (`VITE_*`) env vars in `.env`:
- `VITE_BASE_URL` — Backend API base URL
- `VITE_MINIO_BUCKET_NAME` — MinIO bucket for user photos
