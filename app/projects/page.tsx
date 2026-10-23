"use client";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projectConfig } from "@/config/projects";

export default function ProjectsGrid() {
  return (
    <div className="container mx-auto px-4 py-20">
      <Reveal>
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-sm tracking-[0.3em] text-green-600">
            ARCHIVE
          </p>
          <h1 className="mt-3 font-mono text-4xl font-extrabold text-white md:text-6xl">
            All Projects
          </h1>
          <p className="mt-4 max-w-2xl font-mono text-gray-400">
            A complete catalogue of research, applications and experiments
            across AI, full-stack development and finance.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
        {projectConfig.map((project, index) => (
          <ProjectCard
            key={index}
            description={project.description}
            image={project.image} // Assuming we use the first image
            rank={project.rank}
            title={project.title}
            technologies={project.technologies}
            github={project.github}
          />
        ))}
      </div>
    </div>
  );
}
