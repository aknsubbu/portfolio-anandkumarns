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
