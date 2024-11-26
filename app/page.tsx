import React from "react";
import clsx from "clsx";
import { fontMono } from "@/config/fonts";
import { motion } from "framer-motion";
import { Link } from "@nextui-org/link";

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
    <div className="py-12">
      <h2 className="text-4xl font-mono text-orange-400 mb-12">Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="bg-black/20 p-6 rounded-lg backdrop-blur-sm"
          >
            <h3 className="text-xl font-mono text-orange-400 mb-4">
              {category}
            </h3>
            <ul className="space-y-2">
              {items.map((skill) => (
                <li key={skill} className="text-gray-400 font-mono">
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
    <div className="py-24">
      <h2 className="text-4xl font-mono text-orange-400 mb-12">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href="/project" key={project.title}>
            <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm hover:bg-black/30 transition-all">
              <h3 className="text-xl font-mono text-orange-400 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-400 font-mono mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-1 bg-orange-400/10 text-orange-400 rounded"
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
    <div className="py-2">
      <div className="bg-black/20 p-12 rounded-lg backdrop-blur-sm text-center">
        <h2 className="text-4xl font-mono text-orange-400 mb-6">
          Let&apos;s Work Together
        </h2>
        <p className="text-gray-400 font-mono mb-8 max-w-2xl mx-auto">
          Whether you&apos;re looking to collaborate on an AI project, need a
          full-stack developer, or want to discuss trading strategies, I&apos;m
          always open to new opportunities.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-orange-400 text-black font-mono  px-8 rounded-lg 
                   hover:bg-orange-500 transition-colors"
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
      {/* Hero Section */}
      <div className="container mx-auto px-2 py-24">
        <div className="relative mb-48">
          <h1 className="text-8xl text-orange-400 ml-24 font-extrabold font-mono">
            Anandkumar NS
          </h1>
        </div>

        <div className="relative mb-48">
          <div className="max-w-3xl ml-auto mr-20">
            <h2 className="text-4xl font-light text-orange-400 leading-tight font-mono text-end">
              An Applied AI Engineer <br /> x Full Stack Developer x Trader
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-between items-start ">
            <div className="w-1/3">
              <h3 className="text-orange-400 text-xl tracking-wider font-mono">
                STUDENT & RESEARCHER
              </h3>
            </div>
            <div className="w-1/2">
              <p className="text-gray-400 text-lg font-mono">
                Developing at the intersection of AI, Full Stack Development and
                Finance
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Additional Sections */}
      <div className="container mx-auto px-2">
        <SkillsSection />
        <FeaturedProjects />
        <CallToAction />
      </div>
    </div>
  );
};

export default HomePage;
