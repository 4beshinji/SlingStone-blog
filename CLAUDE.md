# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SlingStoneLOG is a blog built with Astro 5 (based on the AstroPaper theme). It deploys to Cloudflare Pages at https://slingstonelog.pages.dev/. The blog contains Japanese-language content.

## Commands

```bash
pnpm dev              # Dev server at localhost:4321
pnpm build            # Type-check, build, generate Pagefind search index, copy to public/
pnpm preview          # Preview production build
pnpm lint             # ESLint
pnpm format:check     # Prettier check
pnpm format           # Prettier auto-fix
pnpm sync             # Regenerate Astro TypeScript types
```

The build command chain: `astro check && astro build && pagefind --site dist && cp -r dist/pagefind public/`

## Architecture

### Content System
- Blog posts are Markdown files in `src/data/blog/` (supports subdirectories for organization)
- Content collection schema defined in `src/content.config.ts` with Zod validation
- Posts use glob loader: any `*.md` file under `src/data/blog/` (excluding `_`-prefixed files) is collected
- Required frontmatter: `pubDatetime`, `title`, `description`
- Optional frontmatter: `featured`, `draft`, `tags`, `ogImage`, `modDatetime`, `canonicalURL`, `timezone`
- Draft posts are filtered out in production via `src/utils/postFilter.ts`

### Site Configuration
- `src/config.ts` — site metadata (title, author, URL, posts-per-page, feature flags)
- `src/constants.ts` — social links and share button definitions
- `astro.config.ts` — Astro plugins, remark/shiki config, Tailwind via Vite plugin

### Routing (file-based in `src/pages/`)
- `/` — home page showing recent posts
- `/posts/[page]` — paginated post listing
- `/posts/[slug]` — individual post (also generates per-post OG images via `index.png.ts`)
- `/tags/` and `/tags/[tag]/[page]` — tag listing and filtered views
- `/archives/` — all posts archive
- Dynamic generation: `og.png.ts`, `robots.txt.ts`, `rss.xml.ts`

### Styling
- Tailwind CSS 4 integrated via `@tailwindcss/vite`
- Theme colors defined as CSS custom properties in `src/styles/global.css`
- Light/dark mode toggle via `public/toggle-theme.js` (client-side script)

### OG Image Generation
- Uses Satori (JSX to SVG) + @resvg/resvg-js (SVG to PNG)
- Templates in `src/utils/og-templates/` (post.js, site.js)
- Controlled by `SITE.dynamicOgImage` flag

### Code Block Features (Shiki)
- Diff notation, line highlighting, word highlighting via `@shikijs/transformers`
- Custom file name transformer in `src/utils/transformers/fileName.js`
- Dual themes: `min-light` (light) / `night-owl` (dark)

### Search
- Pagefind generates a static search index at build time
- The index is built from `dist/` then copied to `public/pagefind/`

## Deployment
- **Cloudflare Pages** via `wrangler.jsonc` (serves static `dist/` directory)
- **CI**: GitHub Actions runs lint, format check, and build on push (Node 20, pnpm 10)
- **Docker**: Multi-stage Dockerfile available (Node build + nginx serve)

## Conventions
- Conventional commits (commitizen configured in `cz.yaml`)
- No `console.*` statements (ESLint rule)
- Path alias: `@/` maps to `src/`
