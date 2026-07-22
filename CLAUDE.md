# CLAUDE.md

Personal dev portfolio built with Next.js. Showcases work experience, projects, and freelance clients with 3D graphics and smooth animations.

## Architecture

- **App Router** with Server Components by default; Client Components only where interactivity is needed
- **Route groups**: `(public)` for the site, `(sanity)` for the embedded Studio at `/studio`
- **Static generation** with revalidation; one on-demand revalidation API route (`api/revalidateContent`) plus an `llms.txt` route handler
- **3D rendering**: Band component uses Three.js + Rapier physics + GLSL shaders (`.glsl` files loaded via raw-loader in Turbopack config)
- **Animations**: scroll-triggered via Motion library; static variants live in `*-animations.ts` constants per section, with stateful animation logic in custom hooks (e.g. preloader)
- **Environment**: validated at runtime via Zod schemas in `src/env/client.ts` and `src/env/server.ts`

## Sanity CMS

Content is managed via an embedded Sanity Studio at `/studio`. Data is fetched server-side with GROQ and cached with 1h revalidation.

### Type generation

Run `npm run generate:types` after changing schemas. This runs two steps:

1. `sanity schema extract --path=src/sanity/generated/schema.json` — extracts the schema to JSON
2. `sanity typegen generate` — generates TypeScript types to `src/sanity/generated/sanity.types.ts`

The typegen config lives in `sanity.cli.ts` under the `typegen` key. Never edit files in `src/sanity/generated/` manually.

### Singletons

Some document types are singletons (only one instance allowed). Configured in `src/sanity/lib/constants.ts` via the Structure Builder. Current singletons: `aboutSection`, `landingSection`, `privacyNoticeSection`.

### Adding a new content type

1. Define the schema in `src/sanity/schemaTypes/index.ts` and add it to the `types` array
2. **MANDATORY**: Run `npm run generate:types` immediately after defining/changing a schema — the API and query files depend on the generated types and will fail without this step
3. If singleton, add the name to the `SINGLETONS` set and add a `S.listItem()` entry in `src/sanity/lib/constants.ts`
4. Create a GROQ query file in `src/sanity/queries/<name>.groq.ts` exporting a GROQ string constant (see existing files for examples)
5. Create a data fetching file in `src/sanity/api/get-<name>.ts` that:
   - Exports a query result type named `<SchemaName>DTO` (e.g. `LandingSectionDTO`, `AboutSectionDTO`) derived from the generated Sanity types
   - **NEVER use raw types** (e.g. `title: string`) in query result types — always reference the generated types (e.g. `title: MySection['title']`). The only exception is `PortableTextBlock[]` from `@portabletext/react` for rich text fields, and `_key` mapped to `id` which stays as `string`
   - Exports an async function that calls `sanityClientFetch<T>()` wrapped in `tryCatch()`, returning `data ?? null`
   - See `get-about-section.ts` or `get-landing-section.ts` as reference

### Rich text

Paragraph fields use Portable Text (`type: 'array', of: [{ type: 'block' }]`). Render with `<PortableText value={...} />` from `@portabletext/react`.

## Code Quality Tools

This project uses automated code quality tools to maintain consistency:

- **Vite-plus**: Unified toolchain — oxlint for linting, oxfmt for formatting, Vitest for testing
- **Knip**: Detects unused files, exports, and dependencies
- **TypeScript**: Provides type safety
- **Husky**: Runs pre-commit hooks automatically

The pre-commit hook (`.husky/pre-commit`) runs in order: `generate:types` → `fmt` → `check` (lint + typecheck + test) → `knip`. All steps must pass for a commit to succeed.

## Code Style

- Consistent type imports (`import type { ... }`)
- **Always use `@/` path alias** for imports — never use relative paths (`../`, `../../`). Example: `@/features/landing/hooks/use-landing-section-delay` instead of `../hooks/use-landing-section-delay`

Run `pnpm fmt` after making changes, or ensure your editor auto-formats on save.

## Testing

Tests live in `__tests__` directories co-located with the code they test. Run `pnpm test` (Vitest via vite-plus with jsdom). Use `@testing-library/react` for component tests.