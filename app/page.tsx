"use client";
import React from "react";
import clsx from "clsx";
import { fontMono } from "@/config/fonts";
import { motion } from "framer-motion";
import { Link } from "@nextui-org/link";
import { themeConfig } from "@/config/themeConfig";

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
      <h2
        className={`text-3xl md:text-4xl font-mono text-green-600 mb-8 md:mb-12 px-4 md:px-0`}
      >
        Expertise
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="bg-black/20 p-4 md:p-6 rounded-lg backdrop-blur-sm"
          >
            <h3
              className={`text-lg md:text-xl font-mono text-${themeConfig.accentColor} mb-3 md:mb-4`}
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
        ))}
      </div>
    </div>
  );
};

// Featured Projects Component
const FeaturedProjects = () => {
  const projects = [
    {
      title: "XploraML",
      description:
        "XAI Technique Suggestion Tool using locally hosted LLMs with Ollama, implementing RAG for framework recommendations.",
      tags: ["LLMs", "Ollama", "RAG", "XAI"],
    },
    {
      title: "PSG Connect",
      description:
        "Mobile app improving college ECampus accessibility with offline support and enhanced UI using Expo, React Native, and FastAPI.",
      tags: ["React Native", "FastAPI", "Expo"],
    },
    {
      title: "WalletWise",
      description:
        "Cross-platform finance tracker with expense tracking, XLS import, bill scanning, and transaction analytics.",
      tags: ["React Native", "Expo", "Supabase"],
    },
  ];

  return (
    <div className="py-12 md:py-24 px-4 md:px-0">
      <h2
        className={`text-3xl md:text-4xl font-mono text-${themeConfig.accentColor} mb-8 md:mb-12`}
      >
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project) => (
          <Link href="/projects" key={project.title}>
            <div className="bg-black/20 p-4 md:p-6 rounded-lg backdrop-blur-sm hover:bg-black/30 transition-all h-full">
              <h3
                className={`text-lg md:text-xl font-mono text-${themeConfig.accentColor} mb-2 md:mb-3`}
              >
                {project.title}
              </h3>
              <p className="text-gray-400 font-mono text-sm md:text-base mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-mono px-2 py-1 bg-${themeConfig.accentColor}/10 text-${themeConfig.accentColor} rounded`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Call to Action Component
const CallToAction = () => {
  return (
    <div className="py-2 px-4 md:px-0">
      <div className="bg-black/20 p-6 md:p-12 rounded-lg backdrop-blur-sm text-center">
        <h2
          className={`text-3xl md:text-4xl font-mono text-${themeConfig.accentColor} mb-4 md:mb-6`}
        >
          Let&apos;s Work Together
        </h2>
        <p className="text-gray-400 font-mono text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
          Whether you&apos;re looking to collaborate on an AI project, need a
          full-stack developer, or want to discuss trading strategies, I&apos;m
          always open to new opportunities.
        </p>
        <Link
          href="/contact"
          className={`inline-block bg-${themeConfig.accentColor} text-black font-mono px-6 md:px-8 py-2 md:py-3 rounded-lg 
                   hover:bg-${themeConfig.accentColor} transition-colors text-sm md:text-base`}
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
};

// Updated HomePage Component
const HomePage = () => {
  return (
    <div
      className={clsx(
        "relative min-h-screen bg-transparent text-white overflow-hidden",
        fontMono.variable
      )}
    >
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="relative mb-24 md:mb-48">
          <h1
            className={`text-4xl sm:text-6xl md:text-8xl text-${themeConfig.accentColor} ml-0 md:ml-24 font-extrabold font-mono text-center md:text-left`}
          >
            Anandkumar NS
          </h1>
        </div>

        <div className="relative mb-24 md:mb-48">
          <div className="max-w-3xl mx-auto md:ml-auto md:mr-20">
            <h2
              className={`text-2xl md:text-4xl font-light text-${themeConfig.accentColor} leading-tight font-mono text-center md:text-end`}
            >
              An Applied AI Engineer <br /> x Full Stack Developer x Trader
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3
                className={`text-${themeConfig.accentColor} text-lg md:text-xl tracking-wider font-mono`}
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
        </div>
      </div>

      <div className="container mx-auto">
        <SkillsSection />
        <FeaturedProjects />
        <CallToAction />
      </div>
    </div>
  );
};

export default HomePage;
