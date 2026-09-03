# Terapino Agent Notes

## Commands

- Use npm: `package-lock.json` is committed and `.npmrc` enforces the package manager's engine checks.
- `npm run check` first runs `svelte-kit sync`, then type-checks Svelte and TypeScript.
- `npm run lint` runs Prettier verification before ESLint; use `npm run format` to apply formatting.
- Run `npm run build` for a production-build check. No test runner or CI workflow is configured.

## Application Boundaries

- This is one SvelteKit application, built by Vite and deployed with `@sveltejs/adapter-vercel`; routes live in `src/routes` and shared code in `src/lib`.
- Route `load` functions compose the page data. Site settings and logos are loaded for every route by `src/routes/+layout.ts`.
- `src/lib/sanity/client.ts` reads the production Sanity project directly. Keep Sanity GROQ queries and their application-facing mapping/types in `src/lib/sanity/api` rather than in route components.
- TMDB credentials must remain server-only: `src/routes/api/movie/[tmdb_id]/+server.ts` reads `TMDB_BEARER` from `$env/static/private`. Client and universal page loads fetch movie metadata through `/api/movie/:tmdb_id`.

## Conventions

- Svelte 5, strict TypeScript, and JavaScript checking are enabled. Keep `.svelte.ts` modules compatible with the Svelte type checker.
- `.opencode/opencode.json` enables the `@sveltejs/opencode` plugin; use its Svelte tooling when changing Svelte files.
- Tailwind v4 is loaded through the Vite plugin; `src/app.css` is the Tailwind stylesheet and Prettier's Tailwind plugin sorts utility classes automatically.
- Shared shadcn-svelte-style primitives are under `src/lib/components/ui`; their configured aliases are in `components.json`.
