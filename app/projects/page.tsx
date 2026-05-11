"use client";
import { motion } from "framer-motion";

import { projectConfig } from "@/config/projects";
import ProjectCard from "@/components/ProjectCard";
import { cinematicReveal, staggerContainer } from "@/lib/animation-variants";
import { useCinematicReveal } from "@/lib/use-cinematic-reveal";

export default function ProjectsPage() {
  const { ref, isVisible } = useCinematicReveal<HTMLDivElement>(0.05);

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
