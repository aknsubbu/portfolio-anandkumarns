# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js with Turbopack)
npm run build    # Production build
npm run lint     # ESLint with auto-fix (covers .ts and .tsx)
```

No test suite is configured. There is no separate type-check script — TypeScript errors surface via `npm run build`.

## Architecture

**Next.js 14 App Router** portfolio site. Pages live under `app/` with route segments matching the navbar: `/`, `/projects`, `/about-me`, `/contact`. Each route folder has its own `layout.tsx` and `page.tsx`.

### Config-driven data

All content that changes frequently lives in `config/`:

- `config/projects.ts` — the canonical list of project cards. Adding/removing/reordering a project means editing only this file. Both the homepage (`FeaturedProjects` shows rank 1–2) and `/projects` page (`ProjectsGrid` shows all) read from `projectConfig`.
- `config/site.ts` — site name, navbar items, and external social links.
- `config/themeConfig.ts` — design token object (`accentColor`, gradient RGBA values, button/link colors). Tailwind classes are dynamically assembled from these values throughout the codebase (e.g., `` `text-${themeConfig.accentColor}` ``), so changes here propagate sitewide.
- `config/fonts.ts` — font variable exports consumed by `app/layout.tsx`.

### Providers and global layout

`app/layout.tsx` wraps everything in `NextUIProvider` + `NextThemesProvider` (via `app/providers.tsx`) with `defaultTheme: "dark"`. The `GradientBackground` component in the layout renders the fixed green radial gradients and noise texture — it reads directly from `themeConfig`.

### Components

`components/` contains shared UI: `Navbar`, `Footer`, `ProjectCard`, `ThemeSwitch`, `LottieWelcome`, and `primitives.ts` (tailwind-variants `title`/`subtitle` helpers). `ProjectCard` is the main reusable display unit; its props mirror the shape of entries in `projectConfig`.

### Animation libraries

The site uses both **Framer Motion** (page-level transitions, section reveals) and **GSAP** (scroll effects). Lottie animations are served from `public/desktop-animation.json` and `public/mobile-animation.json`. Most page components are `"use client"` because of these animation dependencies.

## ESLint rules to know

The config enforces several non-default rules that will cause lint warnings:

- **`import/order`**: imports must be grouped (types → builtin → external → internal → parent → sibling → index) with a blank line between groups.
- **`react/jsx-sort-props`**: JSX props must be sorted alphabetically, callbacks last, shorthand first.
- **`unused-imports/no-unused-imports`**: unused imports are warned.
- **`padding-line-between-statements`**: blank line required before `return` and after variable declarations (except consecutive declarations).

Run `npm run lint` before committing — it auto-fixes most of these.
