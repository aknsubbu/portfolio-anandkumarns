# Experience Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a config-driven experience section that shows a compact numbered list on the home page and a full timeline on the About page, both editable via the local CRM server.

**Architecture:** Data lives in `config/experience.json` (array ordered most-recent-first). A typed wrapper `config/experience.ts` exports `experienceConfig` and `EXPERIENCE_BADGE_CLASSES`. Both pages import from this single source. The CRM gains a new `/api/experience` REST endpoint and an Experience tab in the UI. No new dependencies required.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS v3, Framer Motion (`Reveal` component), Node.js built-ins (CRM server), React + htm (CRM UI).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `config/experience.json` | **Create** | Seed data — array of experience entries |
| `config/experience.ts` | **Create** | Typed wrapper + badge class lookup map |
| `app/page.tsx` | **Edit** | Add `ExperienceSection` component; insert between SkillsSection and HorizontalShowcase |
| `app/about-me/page.tsx` | **Edit** | Add `ExperienceTimeline` section with `id="experience"` after the grid |
| `crm/server.js` | **Edit** | Add `EXPERIENCE_FILE` constant, `normalizeExperience` validator, `GET`/`PUT /api/experience` |
| `crm/ui/index.html` | **Edit** | Add `ExperienceForm`, `ExperiencePanel` components; wire third tab |

---

## Task 1: Create the data layer

**Files:**
- Create: `config/experience.json`
- Create: `config/experience.ts`

- [ ] **Step 1: Create `config/experience.json` with seed data**

```json
[
  {
    "role": "AI Research Intern",
    "company": "National Remote Sensing Centre, ISRO",
    "url": "https://www.nrsc.gov.in",
    "type": "research",
    "start": "Jan 2025",
    "end": "Present",
    "description": "Developing an enhanced version of Deep Image Prior customised for cloud removal from satellite imagery. This work is being converted into research papers for publication alongside NRSC scientists.",
    "technologies": ["Python", "PyTorch", "Deep Image Prior", "Satellite Imagery"]
  },
  {
    "role": "AI/ML Engineer Intern",
    "company": "Hewlett Packard Enterprise",
    "url": "https://www.hpe.com",
    "type": "internship",
    "start": "Jun 2024",
    "end": "Aug 2024",
    "description": "Built Agentic-Suite — proof-of-concept AI applications for sales demonstrations. Developed Financial Research Dashboard, TalkToCSV, and TalkToDB using Python, Streamlit, FastAPI, and LangChain.",
    "technologies": ["Python", "LangChain", "FastAPI", "AutoGen", "Streamlit"]
  },
  {
    "role": "Full Stack Developer Intern",
    "company": "Startup (Remote)",
    "url": "",
    "type": "internship",
    "start": "Sep 2023",
    "end": "Dec 2023",
    "description": "Built PSG Connect — a secure Expo React Native mobile application for students to access academic profiles. Features a 15-attempt login limit, auto-lockout, and dark mode support.",
    "technologies": ["React Native", "Expo", "TypeScript", "FastAPI"]
  }
]
```

- [ ] **Step 2: Create `config/experience.ts`**

```ts
import data from "./experience.json";

export const experienceConfig = data;
export type ExperienceEntry = (typeof data)[number];

// Static class strings — full names required so Tailwind's scanner includes them.
export const EXPERIENCE_BADGE_CLASSES: Record<string, string> = {
  research:
    "bg-violet-500/10 text-violet-400 border border-violet-500/25",
  internship:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  freelance:
    "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  fulltime:
    "bg-blue-500/10 text-blue-400 border border-blue-500/25",
};
```

- [ ] **Step 3: Verify TypeScript resolves the import**

```bash
npm run build 2>&1 | head -20
```

Expected: no errors referencing `experience.json` or `experience.ts`.

- [ ] **Step 4: Commit**

```bash
git add config/experience.json config/experience.ts
git commit -m "feat: add experience data layer (json + typed wrapper)"
```

---

## Task 2: CRM server — experience endpoints

**Files:**
- Modify: `crm/server.js`

- [ ] **Step 1: Add the `EXPERIENCE_FILE` constant**

Find this line in `crm/server.js`:

```js
const SITE_FILE = path.join(CONFIG_DIR, "site.json");
```

Add immediately after it:

```js
const EXPERIENCE_FILE = path.join(CONFIG_DIR, "experience.json");
```

- [ ] **Step 2: Add the `normalizeExperience` validation function**

Find the `mergeSite` function and add `normalizeExperience` after it (before the image upload section):

```js
const VALID_EXPERIENCE_TYPES = new Set([
  "research",
  "internship",
  "freelance",
  "fulltime",
]);

function normalizeExperience(payload) {
  if (!Array.isArray(payload)) {
    throw new Error("Experience payload must be an array.");
  }

  return payload.map((e, i) => {
    const label = `Entry #${i + 1}`;

    if (!isNonEmptyString(e.role)) {
      throw new Error(`${label}: role is required.`);
    }
    if (!isNonEmptyString(e.company)) {
      throw new Error(`${label}: company is required.`);
    }
    if (!isNonEmptyString(e.type) || !VALID_EXPERIENCE_TYPES.has(e.type)) {
      throw new Error(
        `${label}: type must be one of: research, internship, freelance, fulltime.`
      );
    }
    if (!isNonEmptyString(e.start)) {
      throw new Error(`${label}: start is required.`);
    }
    if (!isNonEmptyString(e.end)) {
      throw new Error(`${label}: end is required.`);
    }
    if (!isNonEmptyString(e.description)) {
      throw new Error(`${label}: description is required.`);
    }
    if (
      !Array.isArray(e.technologies) ||
      e.technologies.length === 0 ||
      !e.technologies.every((t) => typeof t === "string")
    ) {
      throw new Error(`${label}: technologies must be a non-empty list.`);
    }

    return {
      role: e.role.trim(),
      company: e.company.trim(),
      url: isNonEmptyString(e.url) ? e.url.trim() : "",
      type: e.type,
      start: e.start.trim(),
      end: e.end.trim(),
      description: e.description.trim(),
      technologies: e.technologies.map((t) => String(t).trim()),
    };
  });
}
```

- [ ] **Step 3: Add the GET and PUT endpoints**

In `handleApi`, find the block that starts with `if (url === "/api/upload" ...` and add the two experience endpoints **before** it:

```js
  if (url === "/api/experience" && req.method === "GET") {
    return sendJson(res, 200, readJson(EXPERIENCE_FILE));
  }

  if (url === "/api/experience" && req.method === "PUT") {
    const body = await readBody(req);
    let normalized;

    try {
      normalized = normalizeExperience(body);
    } catch (err) {
      return sendJson(res, 400, { error: err.message });
    }
    writeJsonSafe(EXPERIENCE_FILE, normalized);

    return sendJson(res, 200, normalized);
  }
```

- [ ] **Step 4: Verify server syntax**

```bash
node --check crm/server.js && echo "OK"
```

Expected: `OK`

- [ ] **Step 5: Smoke-test the endpoint**

```bash
node crm/server.js &
sleep 1
curl -s http://127.0.0.1:4321/api/experience | head -c 200
kill %1
```

Expected: JSON array starting with `[{"role":"AI Research Intern"...`

- [ ] **Step 6: Commit**

```bash
git add crm/server.js
git commit -m "feat: add /api/experience GET and PUT endpoints to CRM server"
```

---

## Task 3: CRM UI — Experience tab

**Files:**
- Modify: `crm/ui/index.html`

- [ ] **Step 1: Add `ExperienceForm` component**

Find the comment `// --- Images panel` in the `<script>` block and insert the following **before** it:

```js
      // --- Experience form --------------------------------------------------
      function ExperienceForm({ initial, onSave, onCancel }) {
        const [e, setE] = useState(initial);
        const set = (k, v) => setE((prev) => ({ ...prev, [k]: v }));
        const selectStyle = {
          width: "100%", background: "#050505", border: "1px solid var(--border)",
          color: "var(--text)", fontFamily: "var(--mono)", fontSize: "13px",
          padding: "8px 10px", borderRadius: "6px",
        };

        return html`
          <div class="card">
            <label>Role *</label>
            <input type="text" value=${e.role || ""} onInput=${(ev) => set("role", ev.target.value)} />

            <label>Company *</label>
            <input type="text" value=${e.company || ""} onInput=${(ev) => set("company", ev.target.value)} />

            <label>Company URL (optional)</label>
            <input type="text" value=${e.url || ""} placeholder="https://…" onInput=${(ev) => set("url", ev.target.value)} />

            <label>Type *</label>
            <select style=${selectStyle} value=${e.type || "internship"} onChange=${(ev) => set("type", ev.target.value)}>
              <option value="internship">Internship</option>
              <option value="research">Research</option>
              <option value="freelance">Freelance</option>
              <option value="fulltime">Full-time</option>
            </select>

            <label>Start *</label>
            <input type="text" value=${e.start || ""} placeholder="e.g. Jun 2024" onInput=${(ev) => set("start", ev.target.value)} />

            <label>End *</label>
            <input type="text" value=${e.end || ""} placeholder="e.g. Aug 2024 or Present" onInput=${(ev) => set("end", ev.target.value)} />

            <label>Description *</label>
            <textarea value=${e.description || ""} onInput=${(ev) => set("description", ev.target.value)}></textarea>

            <label>Technologies *</label>
            <${Tags} value=${e.technologies || []} onChange=${(v) => set("technologies", v)} />

            <div class="inline-edit" style=${{ marginTop: "16px" }}>
              <button class="btn primary" onClick=${() => onSave(e)} type="button">Done</button>
              <button class="btn ghost" onClick=${onCancel} type="button">Cancel</button>
            </div>
          </div>
        `;
      }

      // --- Experience panel -------------------------------------------------
      function ExperiencePanel({ notify }) {
        const [entries, setEntries] = useState(null);
        const [dirty, setDirty] = useState(false);
        const [editing, setEditing] = useState(null);
        const [saving, setSaving] = useState(false);

        useEffect(() => {
          api("GET", "/api/experience")
            .then(setEntries)
            .catch((err) => notify(err.message, "err"));
        }, []);

        const mutate = (next) => { setEntries(next); setDirty(true); };

        const move = (i, dir) => {
          const j = i + dir;
          if (j < 0 || j >= entries.length) return;
          const next = entries.slice();
          [next[i], next[j]] = [next[j], next[i]];
          mutate(next);
        };

        const del = (i) => {
          if (!confirm(`Delete "${entries[i].role}" at ${entries[i].company}?`)) return;
          mutate(entries.filter((_, j) => j !== i));
        };

        const saveForm = (entry) => {
          if (editing === "new") mutate([...entries, entry]);
          else mutate(entries.map((old, j) => (j === editing ? entry : old)));
          setEditing(null);
        };

        const persist = async () => {
          setSaving(true);
          try {
            const saved = await api("PUT", "/api/experience", entries);
            setEntries(saved);
            setDirty(false);
            notify("Experience saved to disk", "ok");
          } catch (err) {
            notify(err.message, "err");
          } finally {
            setSaving(false);
          }
        };

        if (entries === null) return html`<p class="muted">Loading…</p>`;

        if (editing !== null) {
          const initial =
            editing === "new"
              ? { role: "", company: "", url: "", type: "internship", start: "", end: "", description: "", technologies: [] }
              : { ...entries[editing] };
          return html`<${ExperienceForm} initial=${initial} onSave=${saveForm} onCancel=${() => setEditing(null)} />`;
        }

        return html`
          <div>
            <div class="toolbar">
              <div>
                <button class="btn" onClick=${() => setEditing("new")}>+ Add experience</button>
                ${dirty && html`<span class="dirty"> ● unsaved changes</span>`}
              </div>
              <button class="btn primary" disabled=${!dirty || saving} onClick=${persist}>
                ${saving ? "Saving…" : "Save to disk"}
              </button>
            </div>
            ${entries.map(
              (entry, i) => html`
                <div class="card" key=${i}>
                  <div class="row">
                    <div class="grow">
                      <div class="ptitle">${entry.role}</div>
                      <div class="ptech">${entry.company} · ${entry.start} — ${entry.end} · ${entry.type}</div>
                    </div>
                    <div class="actions">
                      <button class="btn sm" disabled=${i === 0} onClick=${() => move(i, -1)} title="Move up">↑</button>
                      <button class="btn sm" disabled=${i === entries.length - 1} onClick=${() => move(i, 1)} title="Move down">↓</button>
                      <button class="btn sm" onClick=${() => setEditing(i)}>Edit</button>
                      <button class="btn sm danger" onClick=${() => del(i)}>Delete</button>
                    </div>
                  </div>
                </div>
              `
            )}
          </div>
        `;
      }
```

- [ ] **Step 2: Add the Experience tab button**

Find this in `crm/ui/index.html`:

```js
              <button class=${"tab" + (tab === "images" ? " active" : "")} onClick=${() => setTab("images")}>Images</button>
```

Add immediately after it:

```js
              <button class=${"tab" + (tab === "experience" ? " active" : "")} onClick=${() => setTab("experience")}>Experience</button>
```

- [ ] **Step 3: Wire the Experience tab render**

Find this line:

```js
            ${tab === "images" && html`<${ImagesPanel} notify=${notify} />`}
```

Add immediately after it:

```js
            ${tab === "experience" && html`<${ExperiencePanel} notify=${notify} />`}
```

- [ ] **Step 4: Verify CRM UI in browser**

```bash
node crm/server.js &
```

Open `http://127.0.0.1:4321`. Click the **Experience** tab. Confirm:
- List of 3 seed entries appears
- "+ Add experience" opens the form with all fields
- Dropdown shows 4 type options
- Save to disk button activates after edits

```bash
kill %1
```

- [ ] **Step 5: Commit**

```bash
git add crm/ui/index.html
git commit -m "feat: add Experience tab to CRM UI (form, panel, reorder, save)"
```

---

## Task 4: Home page — ExperienceSection component

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add the import for experience config**

In `app/page.tsx`, find:

```ts
import { fontMono } from "@/config/fonts";
import Reveal from "@/components/Reveal";
```

Replace with:

```ts
import { fontMono } from "@/config/fonts";
import {
  EXPERIENCE_BADGE_CLASSES,
  experienceConfig,
} from "@/config/experience";
import Reveal from "@/components/Reveal";
```

- [ ] **Step 2: Add the `ExperienceSection` component**

Find the comment `// Call to Action Component` and insert the following **before** it:

```tsx
// Experience Section Component
const ExperienceSection = () => (
  <div className="py-8 md:py-12">
    <Reveal>
      <h2 className="mb-8 px-4 font-mono text-3xl text-green-600 md:mb-12 md:px-0 md:text-4xl">
        Experience
      </h2>
    </Reveal>
    <div className="flex flex-col gap-3 px-4 md:px-0">
      {experienceConfig.map((entry, index) => (
        <Reveal delay={index * 0.08} key={index}>
          <div className="flex items-center gap-4 rounded-lg border border-white/5 bg-black/20 px-4 py-3 backdrop-blur-sm transition-colors duration-300 hover:border-green-600/30 hover:bg-black/30">
            <span className="min-w-[2rem] font-mono text-xl font-black text-green-600/20 md:text-2xl">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate font-mono text-sm font-semibold text-white md:text-base">
                {entry.role}
              </div>
              <div className="truncate font-mono text-xs text-gray-400">
                {entry.company}
              </div>
            </div>
            <div className="flex flex-shrink-0 flex-col items-end gap-1">
              <span className="whitespace-nowrap font-mono text-xs text-green-600">
                {entry.start} — {entry.end}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  EXPERIENCE_BADGE_CLASSES[entry.type] ??
                  EXPERIENCE_BADGE_CLASSES["internship"]
                }`}
              >
                {entry.type}
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
    <Reveal delay={experienceConfig.length * 0.08 + 0.08}>
      <div className="mt-4 px-4 text-right md:px-0">
        <a
          className="font-mono text-sm text-green-600 transition-colors hover:text-emerald-400"
          href="/about-me#experience"
        >
          View full experience on About →
        </a>
      </div>
    </Reveal>
  </div>
);
```

- [ ] **Step 3: Insert `<ExperienceSection />` into the page**

In the `HomePage` component, find:

```tsx
      <div className="container mx-auto">
        <SkillsSection />
      </div>

      <HorizontalShowcase />
```

Replace with:

```tsx
      <div className="container mx-auto">
        <SkillsSection />
        <ExperienceSection />
      </div>

      <HorizontalShowcase />
```

- [ ] **Step 4: Run lint (auto-fixes import order)**

```bash
npm run lint 2>&1
```

Expected: exit 0, no errors.

- [ ] **Step 5: Run build**

```bash
npm run build 2>&1 | tail -20
```

Expected: `Route (app)` table printed, no TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add ExperienceSection to home page"
```

---

## Task 5: About page — ExperienceTimeline section

**Files:**
- Modify: `app/about-me/page.tsx`

- [ ] **Step 1: Add imports**

In `app/about-me/page.tsx`, find:

```ts
import { fontMono } from "@/config/fonts";
import Reveal from "@/components/Reveal";
```

Replace with:

```ts
import { fontMono } from "@/config/fonts";
import {
  EXPERIENCE_BADGE_CLASSES,
  experienceConfig,
} from "@/config/experience";
import Reveal from "@/components/Reveal";
```

- [ ] **Step 2: Append the experience section inside the outer container**

Find the closing `</div>` that corresponds to the outer container (line 82, right before `);`):

```tsx
    </div>
  );
}
```

Replace with:

```tsx
      <section className="mt-16 md:mt-24" id="experience">
        <Reveal>
          <h2 className="mb-10 font-mono text-2xl font-bold md:text-4xl">
            Experience
          </h2>
        </Reveal>
        <div className="relative">
          <div className="absolute bottom-2 left-3 top-2 w-px bg-gradient-to-b from-green-600 to-transparent" />
          {experienceConfig.map((entry, index) => (
            <Reveal delay={index * 0.1} key={index}>
              <div className="relative mb-10 pl-10 last:mb-0">
                <div
                  className={`absolute left-3 top-2 h-3 w-3 -translate-x-1/2 rounded-full ${
                    entry.end === "Present"
                      ? "animate-pulse bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]"
                      : "bg-green-600 shadow-[0_0_6px_rgba(22,163,74,0.5)]"
                  }`}
                />
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-mono text-xs tracking-wide text-green-600">
                    {entry.start} — {entry.end}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      EXPERIENCE_BADGE_CLASSES[entry.type] ??
                      EXPERIENCE_BADGE_CLASSES["internship"]
                    }`}
                  >
                    {entry.type}
                  </span>
                </div>
                <h3 className="mb-0.5 font-mono text-base font-bold text-white md:text-lg">
                  {entry.role}
                </h3>
                <div className="mb-3 font-mono text-sm text-gray-400">
                  {entry.url ? (
                    <a
                      className="text-emerald-400 hover:underline"
                      href={entry.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {entry.company} ↗
                    </a>
                  ) : (
                    entry.company
                  )}
                </div>
                <div className="mb-3 rounded-r-md border-l-2 border-green-600/20 bg-white/[0.02] py-2 pl-4 font-mono text-xs leading-relaxed text-gray-500 md:text-sm">
                  {entry.description}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {entry.technologies.map((tech) => (
                    <span
                      className="rounded-full border border-green-600/20 bg-green-600/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400"
                      key={tech}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Run lint**

```bash
npm run lint 2>&1
```

Expected: exit 0, no errors.

- [ ] **Step 4: Run build**

```bash
npm run build 2>&1 | tail -20
```

Expected: clean build, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add app/about-me/page.tsx
git commit -m "feat: add ExperienceTimeline section to About page"
```

---

## Task 6: End-to-end verification

- [ ] **Step 1: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and add this line if not already present:

```
.superpowers/
```

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm session files"
```

- [ ] **Step 2: Start the dev server and verify home page**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll past the Skills section. Confirm:
- Numbered rows (`01`, `02`, `03`) appear with role, company, date, and type badge
- Badge colours: Research = violet, Internship = emerald
- "View full experience on About →" link is visible bottom-right of the section

- [ ] **Step 3: Verify the scroll link**

Click "View full experience on About →". Confirm:
- Browser navigates to `/about-me`
- Page scrolls to the Experience heading (the `id="experience"` anchor)

- [ ] **Step 4: Verify the About page timeline**

On `/about-me`, scroll to the Experience section. Confirm:
- Green gradient spine line is visible
- "AI Research Intern" entry has a pulsing emerald dot (end = "Present")
- Past entries have a static green dot
- "National Remote Sensing Centre, ISRO" and "Hewlett Packard Enterprise" render as clickable `↗` links
- "Startup (Remote)" renders as plain text (no url)
- Descriptions appear in a left-bordered block
- Tech tags appear as pill badges below each description

- [ ] **Step 5: Verify CRM round-trip**

```bash
node crm/server.js &
```

Open `http://127.0.0.1:4321` → **Experience** tab.

1. Edit "Full Stack Developer Intern" → change company to "TechCorp (Remote)" → Done → Save to disk
2. Confirm toast "Experience saved to disk"
3. Open `config/experience.json` — confirm change is written
4. Refresh `http://localhost:3000` — confirm home page shows "TechCorp (Remote)"
5. Revert: edit back to "Startup (Remote)" → Done → Save to disk

```bash
kill %1
```
