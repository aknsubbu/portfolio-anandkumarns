# Portfolio Content CRM — Design

**Date:** 2026-06-13
**Status:** Approved

## Problem

Portfolio content (projects, social links) lives in TypeScript modules
(`config/projects.ts`, `config/site.ts`) that must be hand-edited. The goal is a
local CRM-style web interface, served by a separate runnable server, for adding
and editing this content without touching code.

## Scope

In scope:
- **Projects** — add / edit / delete / reorder the entries currently in
  `config/projects.ts` (title, description, image, rank, technologies, github,
  link).
- **Site** — edit `name`, `description`, and social `links` in
  `config/site.ts`.
- **Image upload** — upload a project image; it is written to `public/` and the
  path is set automatically.

Out of scope:
- `navItems` / `navMenuItems` (structural routing — editing risks breaking nav).
- `config/themeConfig.ts` (rarely changed, higher risk).
- Authentication (local-only dev tool).
- Live deploy / git automation (user commits + deploys as usual).

## Architecture

Two decoupled halves sharing JSON files on disk as the single source of truth:

```
crm/ (Express + static UI)  ──writes──►  config/*.json  ◄──imports──  Next.js site
```

The CRM never imports site code; the site never imports CRM code.

### Data migration (one-time)

- Extract current data into:
  - `config/projects.json` — array of project objects.
  - `config/site.json` — `{ name, description, navItems, navMenuItems, links }`
    (full object preserved; CRM only edits a subset).
- Replace the `.ts` modules with thin typed wrappers:
  ```ts
  // config/projects.ts
  import data from "./projects.json";
  export const projectConfig = data;
  export type ProjectConfig = typeof projectConfig;
  ```
  ```ts
  // config/site.ts
  import data from "./site.json";
  export const siteConfig = data;
  export type SiteConfig = typeof siteConfig;
  ```
- No page or component changes required — the exported names and shapes are
  unchanged. Relies on TypeScript `resolveJsonModule` (default-on in Next.js).

### CRM server (`crm/`)

- `crm/server.js` — Express app, run via `npm run crm`, bound to
  `127.0.0.1:4321` (localhost only, no auth).
- Resolves the project root relative to its own location so file paths are
  stable regardless of cwd.
- Endpoints:
  - `GET  /api/projects` → read `config/projects.json`
  - `PUT  /api/projects` → validate, normalize ranks, write
  - `GET  /api/site` → read `config/site.json`
  - `PUT  /api/site` → validate, write (preserves out-of-scope keys)
  - `POST /api/upload` → multipart image → `public/`, returns `{ path }`
  - `GET  /` → serve the UI
- Dependencies (added as `devDependencies`): `express`, `multer`.

### CRM UI (`crm/ui/`)

- Single static `index.html` loading React + ReactDOM + htm via esm.sh CDN — no
  build step.
- **Projects tab:** list sorted by rank; add / edit / delete; up-down reorder;
  per-project form with title, description, technologies (tag input), github,
  link, and image (upload + live preview).
- **Site tab:** form for name, description, and social links (edit values,
  add/remove links).
- Saving calls the relevant `PUT`; a toast confirms success or shows validation
  errors.

## Data flow & safety

- On `PUT`, the server:
  1. **Validates** required fields and types; rejects malformed payloads with a
     descriptive 400.
  2. **Re-sequences** project `rank` to 1…N by list order.
  3. Writes **atomically** (write temp file, then rename over the target).
  4. Keeps a `.bak` copy of the previous file for recovery.
- The Next dev server hot-reloads on JSON change. Production picks up changes on
  the next build/deploy. The CRM edits local files only.

## Error handling

- Validation failures → HTTP 400 with a message; UI surfaces it in a toast and
  does not clear the form.
- File read/write errors → HTTP 500 with a message; the `.bak` allows manual
  recovery.
- Image upload restricted to image MIME types and a size cap.

## Testing

No test framework exists in the repo; none will be introduced. Verification:
- An API smoke check: start the server against a temp copy of the JSON, run
  read → write → read and assert round-trip integrity and rank normalization.
- Manual UI verification: load the UI, add/edit/reorder a project, upload an
  image, edit site links, confirm the JSON files and the running site update.

## Build sequence

1. Migrate data to JSON + thin `.ts` wrappers; verify `tsc --noEmit` and the
   site still reads content.
2. Express server with JSON read/write/validate endpoints (no UI yet).
3. Image upload endpoint.
4. Static UI: projects CRUD + reorder.
5. Static UI: site/links editing.
6. `npm run crm` script; smoke check; manual verification.
