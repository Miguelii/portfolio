# CLAUDE.md

Personal dev portfolio built with Next.js. Showcases work experience, projects, and freelance clients with 3D graphics and smooth animations.

## Commands

```bash
npm run dev              # Start dev server (Turbopack)
npm run build            # Production build (Turbopack)
npm run start            # Start production server
npm run lint             # Run ESLint
npm run prettier         # Format all files with Prettier
npm run typecheck        # TypeScript type checking (no emit)
npm run test             # Run tests with Vitest
npm run check            # lint + typecheck + test
npm run generate:types   # Generate Sanity TypeScript types (schema.json + sanity.types.ts)
```

## Tech Stack

- **Framework**: Next.js 16 with App Router, React 19, TypeScript 5
- **Styling**: Tailwind CSS 4, `tailwind-merge`, `class-variance-authority`, `clsx`
- **Animation**: Motion (Framer Motion successor), React Lenis (smooth scroll)
- **3D**: Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
- **CMS**: Sanity (embedded Studio), GROQ queries, Portable Text, `@portabletext/react`
- **Validation**: Zod, `@t3-oss/env-nextjs` for env vars
- **Testing**: Vitest, `@testing-library/react`, jsdom
- **Analytics**: Vercel Analytics, Vercel Speed Insights

## Project Structure

```
src/
  app/
    layout.tsx            # Root layout (html, body, fonts, meta, analytics)
    not-found.tsx         # Global 404 page
    sitemap.ts            # Sitemap generation
    (public)/             # Route group: public-facing pages
      layout.tsx          # Public layout (Header, Footer, Lenis, Providers)
      page.tsx            # Home (force-static, 24h revalidation)
      clients/page.tsx    # Client projects page
      privacy-notice/     # Privacy policy
    (sanity)/             # Route group: Sanity Studio
      studio/[[...tool]]/ # Embedded Sanity Studio at /studio
  components/             # Shared UI components (Badge, Button, Header, Footer, etc.)
  features/               # Feature modules
    landing/              # Hero section with 3D band
    experience/           # Work history timeline
    projects/             # Project cards
  hooks/                  # Custom React hooks (animations, preloader, etc.)
  providers/              # Context providers (History, Preloader)
  types/                  # TypeScript type definitions
  lib/                    # Utility functions
  env/                    # Environment variable validation (client.ts, server.ts)
  actions/                # Server actions
  styles/                 # Global CSS
  sanity/
    schemaTypes/index.ts  # Document type definitions (aboutSection, landingSection)
    querys/               # GROQ query strings (*.groq.ts)
    api/                  # Data fetching functions (getAboutSection, getLandingSection)
    generated/            # Auto-generated files (do NOT edit manually)
      schema.json         # Extracted schema (from `sanity schema extract`)
      sanity.types.ts     # TypeScript types (from `sanity typegen generate`)
    lib/
      client.ts           # Sanity client + sanityClientFetch<T>() wrapper
      image.ts            # Image URL builder
      live.ts             # Live content API
    constants.ts          # API version, Structure Builder (singletons config)
public/
  models/card.glb         # 3D model used by Band component
```

## Architecture

- **App Router** with Server Components by default; Client Components only where interactivity is needed
- **Route groups**: `(public)` for the site, `(sanity)` for the embedded Studio at `/studio`
- **Static generation** with revalidation (no API routes — content from Sanity + static data files)
- **3D rendering**: Band component uses Three.js + Rapier physics + GLSL shaders (`.glsl` files loaded via raw-loader in Turbopack config)
- **Animations**: scroll-triggered via Motion library; custom hooks encapsulate animation logic per section
- **Environment**: validated at runtime via Zod schemas in `src/env/client.ts` and `src/env/server.ts`

## Sanity CMS

Content is managed via an embedded Sanity Studio at `/studio`. Data is fetched server-side with GROQ and cached with 1h revalidation.

### Type generation

Run `npm run generate:types` after changing schemas. This runs two steps:

1. `sanity schema extract --path=src/sanity/generated/schema.json` — extracts the schema to JSON
2. `sanity typegen generate` — generates TypeScript types to `src/sanity/generated/sanity.types.ts`

The typegen config lives in `sanity.cli.ts` under the `typegen` key. Never edit files in `src/sanity/generated/` manually.

### Singletons

Some document types are singletons (only one instance allowed). Configured in `src/sanity/constants.ts` via the Structure Builder. Current singletons: `aboutSection`, `landingSection`, `privacyNoticeSection`.

### Adding a new content type

1. Define the schema in `src/sanity/schemaTypes/index.ts` and add it to the `types` array
2. **MANDATORY**: Run `npm run generate:types` immediately after defining/changing a schema — the API and query files depend on the generated types and will fail without this step
3. If singleton, add the name to the `SINGLETONS` set and add a `S.listItem()` entry in `src/sanity/constants.ts`
4. Create a GROQ query file in `src/sanity/querys/<name>.groq.ts` exporting a GROQ string constant (see existing files for examples)
5. Create a data fetching file in `src/sanity/api/get-<name>.ts` that:
   - Exports a query result type named `<SchemaName>DTO` (e.g. `LandingSectionDTO`, `AboutSectionDTO`) derived from the generated Sanity types
   - **NEVER use raw types** (e.g. `title: string`) in query result types — always reference the generated types (e.g. `title: MySection['title']`). The only exception is `PortableTextBlock[]` from `@portabletext/react` for rich text fields, and `_key` mapped to `id` which stays as `string`
   - Exports an async function that calls `sanityClientFetch<T>()` wrapped in `tryCatch()`, returning `data ?? null`
   - See `get-about-section.ts` or `get-landing-section.ts` as reference

### Rich text

Paragraph fields use Portable Text (`type: 'array', of: [{ type: 'block' }]`). Render with `<PortableText value={...} />` from `@portabletext/react`.

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
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | client | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | client | Sanity dataset name (e.g. `production`) |

Add new env vars to `src/env/client.ts` or `src/env/server.ts` with a Zod schema. Never access `process.env` directly.

## CSS Theme Tokens

Defined in global CSS; use these variables rather than hardcoded colors:

```
--background:    #fbfbfd
--primary:       #262626
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
