"use client";
import { motion } from "framer-motion";
import { projectConfig } from "@/config/projects";
import ProjectCard from "@/components/ProjectCard";
import {
  cinematicReveal,
  staggerContainer,
} from "@/lib/animation-variants";
import { useCinematicReveal } from "@/lib/use-cinematic-reveal";
import { SKILLS } from "@/config/skills";

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
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0 }}
          >
            Portfolio · {new Date().getFullYear()}
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
  const featured = projectConfig.filter(
    (p) => p.rank !== undefined && p.rank <= 2
  );
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
            <motion.div
              key={project.title}
              variants={cinematicReveal}
              custom={i + 2}
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
