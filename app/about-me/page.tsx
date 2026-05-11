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
  const { ref: skillsRef, isVisible: skillsVisible } =
    useCinematicReveal<HTMLDivElement>();

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
