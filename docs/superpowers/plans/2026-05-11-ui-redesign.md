# Portfolio UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the entire portfolio with a Space Gray × Teenage Engineering aesthetic — `#141414` background, `#F08135` TE orange accent, Inter as primary typeface, and cinematic scroll-reveal animations throughout.

**Architecture:** New utility files (`lib/animation-variants.ts`, `lib/use-cinematic-reveal.ts`) provide a shared animation system. All page components are rewritten to use the new design tokens directly as hardcoded Tailwind arbitrary values. The `GradientBackground` in `layout.tsx` uses inline styles and reads from the updated `themeConfig.ts`.

**Tech Stack:** Next.js 14 App Router, Framer Motion (already installed), Inter + Fira Code (Google Fonts, already installed), Tailwind CSS, IntersectionObserver (browser native)

**Working directory for all commands:** `/Volumes/DevDrive/portfolio-anandkumarns/.worktrees/ui-redesign`

**Note on tests:** This project has no test suite. Each task ends with `npm run build` to catch TypeScript/compile errors, then a visual check via `npm run dev` at the end of the plan.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Modify | `config/themeConfig.ts` | Orange color tokens for GradientBackground inline styles |
| Create | `lib/animation-variants.ts` | Shared Framer Motion variants |
| Create | `lib/use-cinematic-reveal.ts` | IntersectionObserver scroll-reveal hook |
| Create | `components/scroll-progress.tsx` | Fixed orange progress bar |
| Modify | `app/layout.tsx` | Replace GradientBackground, add ScrollProgress, fix body font |
| Modify | `components/navbar.tsx` | Minimal fixed nav, orange active state, scroll blur |
| Modify | `components/footer.tsx` | Minimal 2-line footer, social links |
| Modify | `app/page.tsx` | Full homepage: hero + expertise + featured projects + CTA |
| Modify | `components/ProjectCard.tsx` | Redesigned image-forward card |
| Modify | `app/projects/page.tsx` | Numbered bento grid |
| Modify | `app/about-me/page.tsx` | Two-column: photo + quote + bio + skill pills |
| Modify | `app/contact/page.tsx` | Redesigned form + social link rows |

---

## Task 1: Update themeConfig

**Files:**
- Modify: `config/themeConfig.ts`

- [ ] **Replace file contents:**

```ts
export type ThemeConfig = typeof themeConfig;

export const themeConfig = {
  accentColor: "white",
  gradientColor: {
    primary: "rgba(240, 129, 53, 0.07)",
    secondary: "rgba(240, 129, 53, 0.04)",
    tertiary: "rgba(240, 129, 53, 0.02)",
    transparent: "rgba(240, 129, 53, 0)",
  },
  stripeColor: "rgba(255, 255, 255, 0.02)",
  borderColor: "gray-800",
  buttonColor: { base: "orange-500", hover: "orange-600" },
  linkColor: { base: "orange-500", hover: "orange-600" },
  focusBorderColor: "orange-500",
};
```

- [ ] **Verify build passes:**
```bash
cd /Volumes/DevDrive/portfolio-anandkumarns/.worktrees/ui-redesign && npm run build 2>&1 | tail -20
```
Expected: no TypeScript errors.

- [ ] **Commit:**
```bash
git add config/themeConfig.ts
git commit -m "feat: update themeConfig to TE orange palette"
```

---

## Task 2: Create animation variants

**Files:**
- Create: `lib/animation-variants.ts`

- [ ] **Create the file:**

```ts
import { Variants } from "framer-motion";

// Usage: <motion.div variants={cinematicReveal} custom={index} initial="hidden" animate="visible">
// Pass custom={0} for standalone elements, custom={i} for staggered lists
export const cinematicReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.1,
    },
  }),
};

export const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -10
```

- [ ] **Commit:**
```bash
git add lib/animation-variants.ts
git commit -m "feat: add shared Framer Motion cinematic variants"
```

---

## Task 3: Create useCinematicReveal hook

**Files:**
- Create: `lib/use-cinematic-reveal.ts`

- [ ] **Create the file:**

```ts
"use client";
import { useEffect, useRef, useState } from "react";

export function useCinematicReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -10
```

- [ ] **Commit:**
```bash
git add lib/use-cinematic-reveal.ts
git commit -m "feat: add useCinematicReveal IntersectionObserver hook"
```

---

## Task 4: Create ScrollProgress component

**Files:**
- Create: `components/scroll-progress.tsx`

- [ ] **Create the file:**

```tsx
"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-50 h-[2px] bg-[#F08135] transition-none pointer-events-none"
      style={{ width: `${progress}%` }}
    />
  );
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -10
```

- [ ] **Commit:**
```bash
git add components/scroll-progress.tsx
git commit -m "feat: add orange scroll progress bar"
```

---

## Task 5: Update app/layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Replace file contents:**

```tsx
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/scroll-progress";

import { siteConfig } from "@/config/site";
import { fontSans, fontMono } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#141414" },
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
  ],
};

const GradientBackground = () => (
  <>
    <div
      className="fixed bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at center, rgba(240,129,53,0.07) 0%, transparent 70%)",
        transform: "translate(-20%, 20%)",
        filter: "blur(100px)",
        zIndex: 0,
      }}
    />
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.04,
        zIndex: 0,
      }}
    />
  </>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-[#141414] antialiased relative",
          fontSans.variable,
          fontMono.variable,
          "font-sans"
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ScrollProgress />
          <GradientBackground />
          <div className="relative z-10 min-h-screen flex flex-col">
            <header>
              <Navbar />
            </header>
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -20
```

- [ ] **Commit:**
```bash
git add app/layout.tsx
git commit -m "feat: replace gradient background with TE orange glow, add scroll progress"
```

---

## Task 6: Rewrite navbar

**Files:**
- Modify: `components/navbar.tsx`

- [ ] **Replace file contents:**

```tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { siteConfig } from "@/config/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-[2px] left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-[#141414]/80 border-b border-[#1e1e1e]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.15em] text-white hover:text-[#F08135] transition-colors"
        >
          ANKS
        </Link>
        <div className="flex items-center gap-6 md:gap-8">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "text-sm transition-colors",
                pathname === item.href
                  ? "text-[#F08135]"
                  : "text-[#555] hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -20
```

- [ ] **Commit:**
```bash
git add components/navbar.tsx
git commit -m "feat: rewrite navbar — minimal, scroll-blur, orange active state"
```

---

## Task 7: Rewrite footer

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Replace file contents:**

```tsx
import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#333]">
          © {new Date().getFullYear()} Anandkumar NS
        </p>
        <div className="flex items-center gap-6">
          {Object.entries(siteConfig.links).map(([key, href]) => (
            <Link
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#333] hover:text-[#F08135] transition-colors capitalize"
            >
              {key}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -10
```

- [ ] **Commit:**
```bash
git add components/footer.tsx
git commit -m "feat: minimal footer with social links"
```

---

## Task 8: Redesign ProjectCard

**Files:**
- Modify: `components/ProjectCard.tsx`

- [ ] **Replace file contents:**

```tsx
"use client";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  rank?: number;
  technologies: string[];
  github?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  rank,
  technologies,
  github,
}: ProjectCardProps) {
  return (
    <div className="group bg-[#1a1a1a] border border-[#222] rounded-2xl overflow-hidden hover:border-[#F08135]/40 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      {image && (
        <div className="relative w-full aspect-video overflow-hidden bg-[#111] flex-shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
          {rank !== undefined && (
            <div className="absolute bottom-3 right-3 text-5xl font-bold text-white/[0.06] leading-none select-none pointer-events-none font-mono">
              {String(rank).padStart(2, "0")}
            </div>
          )}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-sm md:text-base leading-snug mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-[#555] text-xs md:text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[10px] text-[#444] border border-[#2a2a2a] rounded-md px-2 py-1 font-mono"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#F08135] hover:text-[#e0722a] transition-colors font-medium mt-auto"
          >
            View on GitHub →
          </a>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -10
```

- [ ] **Commit:**
```bash
git add components/ProjectCard.tsx
git commit -m "feat: redesign ProjectCard — image-forward, orange hover, rank watermark"
```

---

## Task 9: Rewrite homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Replace file contents:**

```tsx
"use client";
import { motion } from "framer-motion";
import { projectConfig } from "@/config/projects";
import ProjectCard from "@/components/ProjectCard";
import {
  cinematicReveal,
  lineReveal,
  staggerContainer,
} from "@/lib/animation-variants";
import { useCinematicReveal } from "@/lib/use-cinematic-reveal";

const SKILLS: Record<string, string[]> = {
  "Artificial Intelligence": [
    "Agentic Applications",
    "Applied AI Services",
    "LangChain",
    "LlamaIndex",
    "OpenAI API",
    "Ollama",
  ],
  "Front End": [
    "React",
    "TypeScript",
    "Next.js",
    "React Native",
    "Expo",
    "TailwindCSS",
  ],
  "Backend & Database": [
    "MongoDB",
    "Supabase",
    "FastAPI",
    "Node.js",
    "Express.js",
    "PostgreSQL",
  ],
};

function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 relative overflow-hidden">
      <span className="absolute top-24 right-4 md:right-12 text-[10rem] md:text-[18rem] font-bold text-[#1a1a1a] leading-none select-none pointer-events-none font-mono">
        01
      </span>
      <div className="max-w-6xl mx-auto w-full">
        <div className="overflow-hidden mb-2">
          <motion.p
            className="text-xs tracking-[4px] text-[#F08135] uppercase font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          >
            Portfolio · 2025
          </motion.p>
        </div>

        <div className="mb-4">
          {["BUILDING", "THE"].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                className="text-6xl sm:text-7xl md:text-[10rem] font-bold tracking-tight leading-none text-white"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1 + i * 0.18,
                }}
              >
                {word}
              </motion.h1>
            </div>
          ))}
          <div className="overflow-hidden">
            <motion.h1
              className="text-6xl sm:text-7xl md:text-[10rem] font-bold tracking-tight leading-none text-[#F08135]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.46 }}
            >
              FUTURE
            </motion.h1>
          </div>
        </div>

        <motion.div
          className="h-[1px] bg-[#F08135] origin-left mb-6 max-w-6xl"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
        />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <motion.p
              className="text-[#555] text-sm md:text-base tracking-wide mb-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.82 }}
            >
              Applied AI Engineer · Full Stack Developer · Researcher
            </motion.p>
            <motion.p
              className="text-white text-lg md:text-xl font-semibold"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
            >
              Anandkumar NS
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 bg-[#F08135] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#e0722a] transition-colors"
            >
              View my work ↓
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExpertiseSection() {
  const { ref, isVisible } = useCinematicReveal();
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 relative overflow-hidden">
      <span className="absolute top-16 right-4 md:right-12 text-[10rem] md:text-[18rem] font-bold text-[#1a1a1a] leading-none select-none pointer-events-none font-mono">
        02
      </span>
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[4px] text-[#F08135] uppercase font-medium mb-3"
          variants={cinematicReveal}
          custom={0}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          Expertise
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight"
          variants={cinematicReveal}
          custom={1}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          What I build with
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {Object.entries(SKILLS).map(([category, items], i) => (
            <motion.div
              key={category}
              className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-6 hover:border-[#2a2a2a] transition-colors"
              variants={cinematicReveal}
              custom={i + 2}
            >
              <p className="text-xs tracking-[3px] text-[#F08135] uppercase font-semibold mb-4">
                {category}
              </p>
              <ul className="space-y-2">
                {items.map((skill) => (
                  <li key={skill} className="text-[#555] text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedProjectsSection() {
  const { ref, isVisible } = useCinematicReveal();
  const featured = projectConfig.filter((p) => p.rank !== undefined && p.rank <= 2);
  return (
    <section ref={ref} className="py-24 px-6 md:px-12 relative overflow-hidden">
      <span className="absolute top-16 right-4 md:right-12 text-[10rem] md:text-[18rem] font-bold text-[#1a1a1a] leading-none select-none pointer-events-none font-mono">
        03
      </span>
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[4px] text-[#F08135] uppercase font-medium mb-3"
          variants={cinematicReveal}
          custom={0}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          Featured Work
        </motion.p>
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight"
          variants={cinematicReveal}
          custom={1}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          Selected projects
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {featured.map((project, i) => (
            <motion.div key={project.title} variants={cinematicReveal} custom={i + 2}>
              <ProjectCard
                description={project.description}
                image={project.image}
                rank={project.rank}
                title={project.title}
                technologies={project.technologies}
                github={project.github}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  const { ref, isVisible } = useCinematicReveal();
  return (
    <section ref={ref} className="py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-6"
          variants={cinematicReveal}
          custom={0}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          Let&apos;s build
          <br />
          <span className="text-[#F08135]">something.</span>
        </motion.h2>
        <motion.p
          className="text-[#555] text-base md:text-lg mb-10 max-w-lg mx-auto"
          variants={cinematicReveal}
          custom={1}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          Whether you&apos;re looking to collaborate on an AI project, need a
          full-stack developer, or want to discuss ideas — I&apos;m open to it.
        </motion.p>
        <motion.div
          variants={cinematicReveal}
          custom={2}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#F08135] text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#e0722a] transition-colors"
          >
            Get in touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white">
      <HeroSection />
      <ExpertiseSection />
      <FeaturedProjectsSection />
      <CTASection />
    </div>
  );
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -20
```

- [ ] **Commit:**
```bash
git add app/page.tsx
git commit -m "feat: rewrite homepage with cinematic hero and scroll reveals"
```

---

## Task 10: Redesign projects page

**Files:**
- Modify: `app/projects/page.tsx`

- [ ] **Replace file contents:**

```tsx
"use client";
import { motion } from "framer-motion";

import { projectConfig } from "@/config/projects";
import ProjectCard from "@/components/ProjectCard";
import { cinematicReveal, staggerContainer } from "@/lib/animation-variants";
import { useCinematicReveal } from "@/lib/use-cinematic-reveal";

export default function ProjectsPage() {
  const { ref, isVisible } = useCinematicReveal(0.05);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[4px] text-[#F08135] uppercase font-medium mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Work
        </motion.p>
        <div className="overflow-hidden mb-16">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white tracking-tight flex items-baseline gap-4"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            All Projects
            <span className="text-[#1e1e1e] text-2xl font-mono">
              {String(projectConfig.length).padStart(2, "0")}
            </span>
          </motion.h1>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {projectConfig.map((project, i) => (
            <motion.div
              key={project.title}
              variants={cinematicReveal}
              custom={Math.min(i, 5)}
            >
              <ProjectCard
                description={project.description}
                image={project.image}
                rank={project.rank}
                title={project.title}
                technologies={project.technologies}
                github={project.github}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -10
```

- [ ] **Commit:**
```bash
git add app/projects/page.tsx
git commit -m "feat: redesign projects page with numbered bento grid"
```

---

## Task 11: Redesign about page

**Files:**
- Modify: `app/about-me/page.tsx`

- [ ] **Replace file contents:**

```tsx
"use client";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";

import { cinematicReveal, staggerContainer } from "@/lib/animation-variants";
import { useCinematicReveal } from "@/lib/use-cinematic-reveal";

const SKILLS: Record<string, string[]> = {
  "Artificial Intelligence": [
    "Agentic Applications",
    "Applied AI Services",
    "LangChain",
    "LlamaIndex",
    "OpenAI API",
    "Ollama",
  ],
  "Front End": [
    "React",
    "TypeScript",
    "Next.js",
    "React Native",
    "Expo",
    "TailwindCSS",
  ],
  "Backend & Database": [
    "MongoDB",
    "Supabase",
    "FastAPI",
    "Node.js",
    "Express.js",
    "PostgreSQL",
  ],
};

export default function About() {
  const { ref: skillsRef, isVisible: skillsVisible } = useCinematicReveal();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[4px] text-[#F08135] uppercase font-medium mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          About
        </motion.p>
        <div className="overflow-hidden mb-16">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            About Me
          </motion.h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#222]">
              <Image
                alt="Anandkumar NS"
                src="/anand.png"
                classNames={{ img: "w-full h-full object-cover" }}
                radius="none"
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-8 justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          >
            <blockquote className="border-l-2 border-[#F08135] pl-5">
              <p className="text-[#888] text-base md:text-lg italic leading-relaxed mb-3">
                &quot;The surest way to corrupt a youth is to instruct him to
                hold in higher esteem those who think alike than those who think
                differently...&quot;
              </p>
              <cite className="text-[#444] text-sm not-italic">
                — Friedrich Nietzsche
              </cite>
            </blockquote>

            <div className="space-y-4">
              <p className="text-[#888] text-sm md:text-base leading-relaxed">
                I&apos;m a computer science student with a passion for learning
                and creating. My journey in tech has led me to explore various
                areas of software development, from web applications to machine
                learning projects.
              </p>
              <p className="text-[#888] text-sm md:text-base leading-relaxed">
                When I&apos;m not coding, you can find me reading about the
                latest tech trends, contributing to open-source projects, or
                experimenting with new programming languages and frameworks.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={skillsRef}
          variants={staggerContainer}
          initial="hidden"
          animate={skillsVisible ? "visible" : "hidden"}
        >
          <motion.p
            className="text-xs tracking-[4px] text-[#F08135] uppercase font-medium mb-3"
            variants={cinematicReveal}
            custom={0}
          >
            Skills
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight"
            variants={cinematicReveal}
            custom={1}
          >
            Technical expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(SKILLS).map(([category, items], i) => (
              <motion.div
                key={category}
                className="bg-[#1a1a1a] border border-[#222] rounded-2xl p-6"
                variants={cinematicReveal}
                custom={i + 2}
              >
                <p className="text-xs tracking-[3px] text-[#F08135] uppercase font-semibold mb-4">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs text-[#555] border border-[#2a2a2a] rounded-md px-2 py-1 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -10
```

- [ ] **Commit:**
```bash
git add app/about-me/page.tsx
git commit -m "feat: redesign about page with photo, quote, and skill pills"
```

---

## Task 12: Redesign contact page

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Replace file contents:**

```tsx
"use client";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { cinematicReveal, staggerContainer } from "@/lib/animation-variants";
import { useCinematicReveal } from "@/lib/use-cinematic-reveal";

export default function Contact() {
  const { ref, isVisible } = useCinematicReveal();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[4px] text-[#F08135] uppercase font-medium mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Contact
        </motion.p>
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Get in Touch
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-16">
          <motion.h2
            className="text-2xl md:text-3xl font-light text-[#555]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          >
            Let&apos;s{" "}
            <span className="text-white font-medium">collaborate</span>
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 gap-12"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={cinematicReveal} custom={0}>
            <p className="text-[#888] text-sm leading-relaxed mb-8">
              I&apos;m always open to new opportunities and collaborations.
              Whether you have a project in mind or just want to connect, feel
              free to reach out!
            </p>
            <p className="text-xs tracking-[3px] text-[#333] uppercase font-semibold mb-4">
              Find me on
            </p>
            <div>
              {Object.entries(siteConfig.links).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-[#1e1e1e] group"
                >
                  <span className="text-sm text-[#555] group-hover:text-white transition-colors capitalize font-medium">
                    {key}
                  </span>
                  <span className="text-[#333] group-hover:text-[#F08135] transition-colors text-sm">
                    →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={cinematicReveal} custom={1}>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-4"
            >
              <input
                type="hidden"
                name="access_key"
                value="bfc689bb-11be-43ff-9764-e8ecf0b6a523"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs text-[#444] font-medium mb-2 tracking-wide"
                    htmlFor="full-name"
                  >
                    Name <span className="text-[#F08135]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="full-name"
                    name="name"
                    placeholder="Your name"
                    className="w-full bg-[#1a1a1a] border border-[#222] rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:border-[#F08135] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs text-[#444] font-medium mb-2 tracking-wide"
                    htmlFor="email"
                  >
                    Email <span className="text-[#F08135]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    className="w-full bg-[#1a1a1a] border border-[#222] rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:border-[#F08135] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-xs text-[#444] font-medium mb-2 tracking-wide"
                  htmlFor="message"
                >
                  Message <span className="text-[#F08135]">*</span>
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or just say hello..."
                  className="w-full h-36 bg-[#1a1a1a] border border-[#222] rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:border-[#F08135] focus:outline-none transition-colors resize-none"
                />
              </div>
              <div className="h-captcha" data-captcha="true" />
              <button
                type="submit"
                className="w-full bg-[#F08135] text-white text-sm font-semibold py-3 px-8 rounded-full hover:bg-[#e0722a] transition-colors"
              >
                Send Message
              </button>
            </form>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script async defer src="https://web3forms.com/client/script.js" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
```

- [ ] **Verify build:**
```bash
npm run build 2>&1 | tail -10
```

- [ ] **Commit:**
```bash
git add app/contact/page.tsx
git commit -m "feat: redesign contact page with clean form and social rows"
```

---

## Task 13: Final visual verification

- [ ] **Start dev server in the worktree:**
```bash
cd /Volumes/DevDrive/portfolio-anandkumarns/.worktrees/ui-redesign && npm run dev
```

- [ ] **Check each route visually:**
  - `http://localhost:3000` — hero cinematic reveal plays on load, scroll down to see expertise + projects + CTA
  - `http://localhost:3000/projects` — numbered grid, cards stagger in
  - `http://localhost:3000/about-me` — two-column layout, skills pills scroll in
  - `http://localhost:3000/contact` — social rows hover → orange arrow, form inputs focus → orange border

- [ ] **Fix any visual regressions** found above before proceeding.

- [ ] **Final build check:**
```bash
npm run build 2>&1 | tail -20
```

- [ ] **Final commit if any fixes were applied:**
```bash
git add -p
git commit -m "fix: address visual regressions from final review"
```
