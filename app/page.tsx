"use client";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@nextui-org/link";

import { fontMono } from "@/config/fonts";
import Reveal from "@/components/Reveal";
import HorizontalShowcase from "@/components/HorizontalShowcase";

// Skills Section Component
const SkillsSection = () => {
  const skills = {
    "Artificial Intelligence": [
      "Agentic Applications",
      "Applied AI Services",
      "Langchain",
      "LlamaIndex",
      "OpenAI API",
      "Ollama",
    ],
    FrontEnd: [
      "React",
      "TypeScript",
      "Next.js",
      "React Native",
      "Expo",
      "TailwindCSS",
    ],
    "Backend & Database Services": [
      "MongoDB",
      "Supabase",
      "FastAPI",
      "Node.js",
      "Express.js",
      "PostgreSQL",
    ],
  };

  return (
    <div className="py-8 md:py-12">
      <Reveal>
        <h2
          className="text-3xl md:text-4xl font-mono text-green-600 mb-8 md:mb-12 px-4 md:px-0"
        >
          Expertise
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
        {Object.entries(skills).map(([category, items], index) => (
          <Reveal key={category} delay={index * 0.12}>
            <div className="h-full bg-black/20 p-4 md:p-6 rounded-lg backdrop-blur-sm border border-transparent transition-colors duration-300 hover:border-green-600/30 hover:bg-black/30">
              <h3
                className={`text-lg md:text-xl font-mono text-white mb-3 md:mb-4`}
              >
                {category}
              </h3>
              <ul className="space-y-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="text-gray-400 font-mono text-sm md:text-base"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

// Call to Action Component
const CallToAction = () => {
  return (
    <div className="py-2 px-4 md:px-0">
      <Reveal>
        <div className="bg-black/20 p-6 md:p-12 rounded-lg backdrop-blur-sm text-center border border-green-600/10">
          <h2
            className="text-3xl md:text-4xl font-mono text-white mb-4 md:mb-6"
          >
            Let&apos;s Work Together
          </h2>
          <p className="text-gray-400 font-mono text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
            Whether you&apos;re looking to collaborate on an AI project, need a
            full-stack developer, or want to discuss trading strategies,
            I&apos;m always open to new opportunities.
          </p>
          <Link
            className="inline-block bg-emerald-500 text-black font-medium font-mono px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-emerald-400 hover:scale-105 transition-all duration-300 text-sm md:text-base"
            href="/contact"
          >
            Get in Touch
          </Link>
        </div>
      </Reveal>
    </div>
  );
};

// Updated HomePage Component
const HomePage = () => {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const item = shouldReduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 32 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <div
      className={clsx(
        "relative min-h-screen bg-transparent text-white overflow-hidden",
        fontMono.variable
      )}
    >
      <motion.div
        animate="show"
        className="container mx-auto px-4 py-12 md:py-24"
        initial="hidden"
        variants={container}
      >
        <motion.div className="relative mb-24 md:mb-48" variants={item}>
          <h1
            className="text-4xl sm:text-6xl md:text-8xl text-white ml-0 md:ml-24 font-extrabold font-mono text-center md:text-left"
          >
            Anandkumar NS
          </h1>
        </motion.div>

        <motion.div className="relative mb-24 md:mb-48" variants={item}>
          <div className="max-w-3xl mx-auto md:ml-auto md:mr-20">
            <h2
              className="text-2xl md:text-4xl font-light text-white leading-tight font-mono text-center md:text-end"
            >
              An Applied AI Engineer <br /> x Full Stack Developer x Trader
            </h2>
          </div>
        </motion.div>

        <motion.div className="relative" variants={item}>
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3
                className="text-white text-lg md:text-xl tracking-wider font-mono"
              >
                STUDENT & RESEARCHER
              </h3>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <p className="text-gray-400 text-base md:text-lg font-mono">
                Developing at the intersection of AI, Full Stack Development and
                Finance
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto">
        <SkillsSection />
      </div>

      <HorizontalShowcase />

      <div className="container mx-auto">
        <CallToAction />
      </div>
    </div>
  );
};

export default HomePage;
