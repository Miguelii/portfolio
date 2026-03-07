# CLAUDE.md

Personal dev portfolio built with Next.js. Showcases work experience, projects, and freelance clients with 3D graphics and smooth animations.

## Commands

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build (Turbopack)
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prettier     # Format all files with Prettier
npm run typecheck    # TypeScript type checking (no emit)
npm run test         # Run tests with Vitest
npm run check        # lint + typecheck + test
```

## Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, `tailwind-merge`, `class-variance-authority`, `clsx`
- **Animation**: Motion (Framer Motion successor), React Lenis (smooth scroll)
- **3D**: Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
- **Validation**: Zod, `@t3-oss/env-nextjs` for env vars
- **Testing**: Vitest, `@testing-library/react`, jsdom
- **Analytics**: Vercel Analytics, Vercel Speed Insights

## Project Structure

```
src/
  app/                  # Next.js App Router pages
    page.tsx            # Home (force-static, 24h revalidation)
    clients/page.tsx    # Client projects page
    privacy-notice/     # Privacy policy
  components/           # Shared UI components (Badge, Button, Header, Footer, etc.)
  features/             # Feature modules
    landing/            # Hero section with 3D band
    experience/         # Work history timeline
    projects/           # Project cards
  hooks/                # Custom React hooks (animations, preloader, etc.)
  providers/            # Context providers (History, Preloader)
  services/             # Data logic (ProjectService, ExperienceService)
  data/                 # Static data files (projects, experience)
  types/                # TypeScript type definitions
  lib/                  # Utility functions
  env/                  # Environment variable validation (client.ts, server.ts)
  actions/              # Server actions
  styles/               # Global CSS
public/
  models/card.glb       # 3D model used by Band component
```

## Architecture

- **App Router** with Server Components by default; Client Components only where interactivity is needed
- **Static generation** with revalidation (no API routes — all content is static data files)
- **Service layer**: `ProjectService` and `ExperienceService` read from `src/data/`
- **3D rendering**: Band component uses Three.js + Rapier physics + GLSL shaders (`.glsl` files loaded via raw-loader in Turbopack config)
- **Animations**: scroll-triggered via Motion library; custom hooks encapsulate animation logic per section
- **Environment**: validated at runtime via Zod schemas in `src/env/client.ts` and `src/env/server.ts`

## Code Style

Enforced by Prettier and ESLint (Next.js Core Web Vitals + TypeScript):

- 4-space indentation
- No semicolons
- Single quotes
- Trailing commas (ES5)
- Max line width: 100 chars
- Consistent type imports (`import type { ... }`)

Run `npm run prettier` after making changes, or ensure your editor auto-formats on save.

## Environment Variables

| Variable | Where | Description |
|---|---|---|
| `NEXT_PUBLIC_VERCEL_URL` | client | Vercel deployment URL (not set on localhost) |
| `NEXT_PUBLIC_WEBSITE_URL` | client | Full site URL (normalized: https://, no trailing slash) |
| `NEXT_PUBLIC_BUILD_TIMESTAMP` | auto | Injected by `next.config.ts` at build time |

Add new env vars to `src/env/client.ts` or `src/env/server.ts` with a Zod schema. Never access `process.env` directly.

## CSS Theme Tokens

Defined in global CSS; use these variables rather than hardcoded colors:

```
--background:    #fbfbfd
--primary:       #262626
--red:           #ff7070
--neutral:       #737373
--divider:       #e5e5e7
--neutral-dark:  #1d1d1d
--neutral-light: #fafafa
```

## Testing

Tests live in `__tests__` directories co-located with the code they test. Run `npm run test` (Vitest with jsdom). Use `@testing-library/react` for component tests.

## Path Alias

`@/*` maps to `src/*` — always use this alias for imports within the project.

## Skills & Guidelines

The following skills are located in `.claude/skills/` and `.agents/skills/` and **must be followed** when working on this project:

- **`vercel-composition-patterns`** — Apply when writing or refactoring components. Avoid boolean prop proliferation; use compound components, context providers, and React 19 APIs.
- **`vercel-react-best-practices`** — Apply when writing any React/Next.js code. Follow the 57 performance rules covering waterfall elimination, bundle optimization, server-side performance, re-render optimization, and more.
- **`web-design-guidelines`** — Apply when reviewing or writing UI code. Fetch latest guidelines from the source URL defined in the skill and audit files for compliance.
