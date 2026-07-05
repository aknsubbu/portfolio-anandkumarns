# Experience Section — Design Spec
**Date:** 2026-07-05  
**Status:** Approved

---

## Context

The portfolio currently has no work experience section. Recruiters and collaborators expect to see a chronological record of where the developer has worked. The section needs to appear in two places: a compact teaser on the home page and a full detailed view on the About page. All data must be editable interactively via the local CRM server without touching code.

---

## Data Schema

New file: `config/experience.json` — array of experience entries, ordered by display rank (most recent first).

```json
[
  {
    "role": "AI Research Intern",
    "company": "National Remote Sensing Centre, ISRO",
    "url": "https://nrsc.gov.in",
    "type": "research",
    "start": "Jan 2025",
    "end": "Present",
    "description": "Developing an enhanced version of Deep Image Prior customised for cloud removal from satellite imagery. This work is being converted into research papers for publication alongside NRSC scientists.",
    "technologies": ["Python", "PyTorch", "Deep Image Prior", "Satellite Imagery"]
  }
]
```

**Fields:**
| Field | Type | Required | Notes |
|---|---|---|---|
| `role` | string | yes | Job title |
| `company` | string | yes | Organisation name |
| `url` | string | no | Company website — makes name a link on About page |
| `type` | `"research"` \| `"internship"` \| `"freelance"` \| `"fulltime"` | yes | Shown as a colour-coded badge |
| `start` | string | yes | Human-readable, e.g. `"Jun 2024"` |
| `end` | string | yes | Human-readable or `"Present"` |
| `description` | string | yes | 1–3 sentence description of work done |
| `technologies` | string[] | yes | Tech stack tags shown on About page |

New file: `config/experience.ts` — thin typed wrapper (same pattern as `config/projects.ts`):

```ts
import data from "./experience.json";
export const experienceConfig = data;
export type ExperienceEntry = (typeof data)[number];
```

---

## Home Page — Compact Teaser

**Placement:** New `ExperienceSection` component inserted in `app/page.tsx` between `SkillsSection` and `HorizontalShowcase`.

**Layout:** Vertical list of rows. Each row contains:
- Ghost green two-digit index number (e.g. `01`, `02`)
- Role name (bold, white) + company name (muted, smaller)
- Right side: date range + colour-coded type badge

**Footer:** A right-aligned `"View full experience on About →"` link pointing to `/about-me#experience`. Implemented as a Next.js `<Link>` component.

**Animation:** Wrapped in the existing `Reveal` component (`direction="up"`, staggered per row via `delay` prop).

**Badge colours (Tailwind classes):**
| Type | Text colour | Background | Border |
|---|---|---|---|
| `research` | `violet-400` | `violet-500/10` | `violet-500/25` |
| `internship` | `emerald-400` | `emerald-500/10` | `emerald-500/25` |
| `freelance` | `amber-400` | `amber-500/10` | `amber-500/20` |
| `fulltime` | `blue-400` | `blue-500/10` | `blue-500/25` |

These badge classes are defined as a static lookup map in the component — no dynamic Tailwind construction.

---

## About Page — Full Timeline

**Placement:** New `ExperienceTimeline` section appended after the existing skills section in `app/about-me/page.tsx`.

**Anchor:** The wrapping `<section>` has `id="experience"` so `/about-me#experience` scroll-targeting works.

**Layout:** Vertical timeline with a gradient green left spine and dot markers:
- Entries where `end === "Present"` get a pulsing animated dot (`animate-pulse` or a CSS keyframe) using `emerald-400` — visually distinguishes the current role.
- Past entries get a static `green-600` dot.
- Company name renders as a `<a href={url} target="_blank">` link with an `↗` glyph when `url` is present; plain text otherwise.
- Description renders in a left-border `blockquote`-style block (2px `border-l` in `green-600/20`, light background, padded).
- Tech tags render as small pill badges below the description.

**Animation:** Each timeline entry is individually wrapped in `<Reveal delay={index * 0.1}>`.

---

## CRM Additions

### Server (`crm/server.js`)

New constant:
```js
const EXPERIENCE_FILE = path.join(CONFIG_DIR, "experience.json");
```

New validation function `normalizeExperience(payload)`:
- Payload must be an array.
- Each entry must have non-empty `role`, `company`, `type`, `start`, `end`, `description`.
- `type` must be one of `research | internship | freelance | fulltime`.
- `technologies` must be a non-empty string array.
- `url` is optional — if present, must be a non-empty string.
- Array order is preserved as-is (CRM controls order via drag/reorder, not a `rank` field).

New API endpoints:
- `GET /api/experience` — returns `readJson(EXPERIENCE_FILE)`
- `PUT /api/experience` — validates via `normalizeExperience`, writes atomically, returns saved data

### UI (`crm/ui/index.html`)

New **Experience** tab (third tab, after Projects and Site & Links).

**ExperiencePanel** component:
- Loads entries from `GET /api/experience` on mount.
- Lists entries with role, company, date range, type badge, and ↑ ↓ Edit Delete controls — identical UX pattern to `ProjectsPanel`.
- "Save to disk" button (disabled until there are unsaved changes).

**ExperienceForm** component (shown when adding or editing an entry):
- Fields: Role (text), Company (text), URL (text, optional), Type (dropdown: research / internship / freelance / fulltime), Start (text), End (text, placeholder `"Present"`), Description (textarea), Technologies (reuses existing `Tags` component).
- Done / Cancel buttons.

---

## File Change Summary

| File | Action |
|---|---|
| `config/experience.json` | **Create** — seed with real experience data |
| `config/experience.ts` | **Create** — typed wrapper |
| `app/page.tsx` | **Edit** — add `ExperienceSection` component and insert between Skills and HorizontalShowcase |
| `app/about-me/page.tsx` | **Edit** — add `ExperienceTimeline` section with `id="experience"` |
| `crm/server.js` | **Edit** — add `EXPERIENCE_FILE`, `normalizeExperience`, and two API endpoints |
| `crm/ui/index.html` | **Edit** — add Experience tab, `ExperiencePanel`, `ExperienceForm` |

---

## Verification

1. `npm run lint` — zero errors
2. `npm run build` — clean build, no TypeScript errors
3. Home page: experience rows render, badge colours are correct, "View full →" link scrolls to `#experience` on the About page
4. About page: timeline renders, current role has pulsing dot, company link opens in new tab, tech tags display
5. `npm run crm` → open `http://127.0.0.1:4321` → Experience tab loads, add/edit/delete/reorder entries, Save to disk updates `config/experience.json`, refresh home/about pages to confirm live data
6. Entry with no `url` renders company as plain text (no broken link)
