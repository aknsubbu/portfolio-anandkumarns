# Portfolio UI Redesign — Design Spec

**Date:** 2026-05-11  
**Branch:** `ui-redesign`  
**Direction:** Space Gray × Teenage Engineering — Apple-clean layout, TE orange accent, cinematic reveal animations

---

## 1. Design System

### Palette
| Token | Value | Usage |
|---|---|---|
| Background | `#141414` | Page background |
| Surface | `#1a1a1a` | Cards, inputs |
| Border | `#222222` | Card borders, dividers |
| Accent | `#F08135` | TE orange — CTAs, active states, highlights |
| Text primary | `#ffffff` | Headings, body |
| Text secondary | `#555555` | Subtitles, labels |
| Text muted | `#333333` | Decorative numbers, quiet labels |

### Typography
- **Body / headings:** `system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif` — NOT monospace everywhere
- **Mono accents:** `'Courier New', monospace` — used only for tech labels, version strings, section index numbers
- **Scale:** `text-5xl`/`text-6xl` for hero, `text-3xl`/`text-4xl` for section headers, `text-base` for body
- Remove `fontMono.variable` as the default wrapper on all pages

### Background
Replace the green radial gradients in `app/layout.tsx` `GradientBackground` with:
- One `#F08135` radial glow, bottom-left corner, `opacity: 0.06`, `blur: 120px`, `600px × 600px`
- Fine SVG noise texture overlay at `opacity: 0.04`
- Pure `#141414` base — no stripes

### themeConfig.ts
Update `config/themeConfig.ts`:
- `accentColor`: `"[#F08135]"` (arbitrary Tailwind value)
- `gradientColor.primary`: `rgba(240, 129, 53, 0.08)`
- `gradientColor.secondary`: `rgba(240, 129, 53, 0.04)`
- `buttonColor`: `{ base: "[#F08135]", hover: "[#e0722a]" }`
- `linkColor`: `{ base: "[#F08135]", hover: "[#e0722a]" }`
- `focusBorderColor`: `"[#F08135]"`

---

## 2. Global Components

### Navbar (`components/navbar.tsx`)
- Left: initials `ANKS` in `font-semibold text-sm tracking-wider text-white`
- Right: nav links in `text-sm text-[#555]`, hover/active → `text-[#F08135]`
- No background on mount; `backdrop-blur-md bg-[#141414]/80` appears after 20px scroll
- A `1px` orange bottom border fades in on scroll
- Mobile: hamburger icon → slide-down menu with same link styles
- Replace `@nextui-org/navbar` with a plain `<nav>` element — other NextUI components (Link, Image, etc.) remain unchanged throughout the app

### Footer (`components/footer.tsx`)
- Two-line minimal: name + year left, social icon links right
- `border-t border-[#1e1e1e]`, `py-6`, `text-[#333] text-xs`
- Social links: GitHub, LinkedIn, Medium as small icons

### Scroll Progress Bar
- New component `components/scroll-progress.tsx`
- Fixed `top-0 left-0 right-0 h-[2px] bg-[#F08135] z-50`
- Width driven by `window.scrollY / (document.body.scrollHeight - window.innerHeight)`
- Added to `app/layout.tsx`

### Animation Hook (`lib/use-cinematic-reveal.ts`)
- Uses `IntersectionObserver` (threshold `0.15`)
- On entry: triggers Framer Motion animation — `y: 40 → 0`, `opacity: 0 → 1`
- Easing: `[0.16, 1, 0.3, 1]` (Apple's scroll easing)
- Duration: `0.75s`
- Returns `{ ref, isVisible }` — consumer applies Framer `motion.div` with variants

### Cinematic Variants (`lib/animation-variants.ts`)
```ts
// Usage: <motion.div variants={cinematicReveal} custom={index} initial="hidden" animate="visible">
// The `custom` prop passes the stagger index; use 0 for standalone elements
export const cinematicReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }
  })
}

export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
```

---

## 3. Homepage (`app/page.tsx`)

### Hero Section
- Full `min-h-screen` with `flex items-end pb-24 md:pb-32`
- Cinematic word reveal sequence on mount (no scroll trigger — plays immediately):
  1. `BUILDING` slides up (delay 0ms)
  2. `THE` slides up (delay 180ms)
  3. `FUTURE` slides up in `text-[#F08135]` (delay 360ms)
  4. `1px` orange horizontal line draws left→right across full width (delay 560ms, `scaleX` animation)
  5. Subtitle `Applied AI Engineer · Full Stack Developer · Researcher` fades up (delay 800ms)
  6. Name `Anandkumar NS` fades up smaller (delay 950ms)
  7. CTA pill `View my work ↓` fades in (delay 1100ms)
- Font: `text-6xl md:text-8xl font-bold tracking-tight leading-none`
- Section index `01` in top-right of hero, `text-[#1e1e1e] text-8xl font-bold` (decorative)

### Expertise Section
- Section header: `EXPERTISE` in `text-xs tracking-[4px] text-[#F08135] uppercase` + section index `02`
- Three cards in `grid grid-cols-1 md:grid-cols-3 gap-4`
- Card: `bg-[#1a1a1a] border border-[#222] rounded-2xl p-6`
- Category title in orange caps, skills as `text-[#555] text-sm` list
- Entrance: `staggerContainer` + `cinematicReveal` per card

### Featured Projects Section
- Section header + index `03`
- Two cards (`rank === 1` and `rank === 2` from `projectConfig`)
- Card layout: image top (`aspect-video`, `object-cover`, `rounded-xl`), then title, tech chips, GitHub link
- Hover: `translateY(-4px)`, orange border `border-[#F08135]`
- Entrance: staggered `cinematicReveal`

### CTA Section
- Centered, `py-32`
- Large headline: `Let's build something.`
- Subtitle in `text-[#555]`
- Orange pill button → `/contact`

---

## 4. Projects Page (`app/projects/page.tsx`)

- Page header: Large `PROJECTS` title with section count badge
- Grid: `grid grid-cols-1 md:grid-cols-2 gap-5`
- Each card has rank `01`–`13` displayed as large `text-[#1e1e1e] text-5xl font-bold` in top-right corner (decorative, like TE spec numbering)
- Card: `bg-[#1a1a1a] border border-[#222] rounded-2xl overflow-hidden`
- Image: `aspect-video object-cover w-full` (fallback to dark placeholder if no image)
- Body: title, description (2-line clamp), tech chips as pills, GitHub icon link
- Entrance: cards stagger in with `cinematicReveal`, delay proportional to index (capped at 5th item to avoid long wait)

---

## 5. About Page (`app/about-me/page.tsx`)

- Remove `fontMono.variable` wrapper
- Two-column layout on desktop: photo left (`w-72 h-72`, square, `rounded-2xl`), content right
- Photo: `object-cover`, `border border-[#222]`, subtle `box-shadow`
- Quote block: `border-l-2 border-[#F08135] pl-5` — italic, `text-lg text-[#888]`, attribution below in `text-sm text-[#444]`
- Bio paragraphs in `system-ui text-[#888] leading-relaxed`
- Skills: replace `<ul>` list with grouped pill grid — same category structure as homepage SkillsSection, reuse or extract to shared component
- Entrance: each block reveals with `cinematicReveal` on scroll

---

## 6. Contact Page (`app/contact/page.tsx`)

- Keep web3forms `action` and `access_key` — form functionality unchanged
- Header: `GET IN TOUCH` in small orange caps, then large `Let's Collaborate.` headline
- Form inputs: `bg-[#1a1a1a] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-[#333] focus:border-[#F08135] focus:outline-none`
- Submit button: orange pill `bg-[#F08135] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#e0722a] transition`
- Social links: each link as a row `flex justify-between items-center py-3 border-b border-[#1e1e1e]`, platform name left, `→` right, hover turns orange
- Entrance: form and social column reveal with `cinematicReveal`

---

## 7. Implementation Order

1. `config/themeConfig.ts` — update palette tokens
2. `lib/animation-variants.ts` — create shared Framer variants
3. `lib/use-cinematic-reveal.ts` — create IntersectionObserver hook
4. `components/scroll-progress.tsx` — new scroll progress bar
5. `app/layout.tsx` — replace `GradientBackground`, add `ScrollProgress`, update body classes
6. `components/navbar.tsx` — full rewrite with new styles
7. `components/footer.tsx` — minimal rewrite
8. `app/page.tsx` — hero + all sections with new animations
9. `components/ProjectCard.tsx` — redesigned card component
10. `app/projects/page.tsx` — numbered bento grid
11. `app/about-me/page.tsx` — two-column redesign
12. `app/contact/page.tsx` — form + social links redesign

---

## 8. Dependencies

No new packages required. All animation via Framer Motion (already installed). `IntersectionObserver` is native browser API.
