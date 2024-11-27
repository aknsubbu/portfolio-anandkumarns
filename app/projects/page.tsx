"use client";
import ProjectCard from "@/components/ProjectCard";
import { projectConfig } from "@/config/projects";

export default function ProjectsGrid() {
  return (
    <div className="mx-auto px-4 py-20">
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
