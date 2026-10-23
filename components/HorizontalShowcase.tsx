"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { projectConfig } from "@/config/projects";

const featured = projectConfig
  .filter((project) => project.rank <= 5)
  .sort((a, b) => a.rank - b.rank);

/**
 * Signature scroll effect: on desktop the section pins to the viewport and
 * vertical scroll is mapped to horizontal travel through the featured work.
 * On mobile and for prefers-reduced-motion users it degrades to a normal
 * vertically-stacked column (no pin, no scrub).
 */
const HorizontalShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const section = sectionRef.current;

          if (!track || !section) return;

          const getScrollAmount = () => track.scrollWidth - window.innerWidth;

          const tween = gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
          });

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true,
          });
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden md:h-screen motion-reduce:md:h-auto"
    >
      <div
        ref={trackRef}
        className="flex flex-col gap-8 px-4 py-12 md:h-full md:flex-row md:items-center md:gap-8 md:px-[8vw] md:py-0 motion-reduce:md:flex-col motion-reduce:md:py-12"
      >
        {/* Intro panel */}
        <div className="flex shrink-0 flex-col justify-center md:w-[38vw] md:pr-8 motion-reduce:md:w-full">
          <p className="mb-4 font-mono text-sm tracking-[0.3em] text-green-600">
            SELECTED WORK
          </p>
          <h2 className="mb-6 font-mono text-4xl font-extrabold text-white md:text-6xl">
            Things I&apos;ve
            <br />
            built &amp; researched
          </h2>
          <p className="hidden items-center gap-2 font-mono text-gray-400 md:flex">
            Scroll to explore
            <ArrowRight className="h-4 w-4 animate-pulse" />
          </p>
        </div>

        {/* Project panels */}
        {featured.map((project) => (
          <article
            key={project.rank}
            className="group relative h-[58vh] w-full shrink-0 overflow-hidden rounded-2xl border border-green-600/15 bg-black/30 md:h-[72vh] md:w-[68vw] md:max-w-[960px] motion-reduce:md:w-full"
          >
            <Image
              alt={project.title}
              src={project.image}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 68vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <span className="mb-3 font-mono text-lg text-green-600/70">
                {project.rank.toString().padStart(2, "0")}
              </span>
              <h3 className="mb-4 max-w-3xl font-mono text-2xl font-light leading-snug text-white md:text-4xl">
                {project.title}
              </h3>
              <p className="mb-5 hidden max-w-2xl font-mono text-sm leading-relaxed text-gray-300 md:line-clamp-3 md:text-base">
                {project.description}
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs text-green-600/70 md:text-sm"
                  >
                    {tech.trim()} &bull;
                  </span>
                ))}
              </div>
              {project.github && (
                <a
                  className="inline-flex w-fit items-center gap-2 font-mono text-sm text-white transition-colors hover:text-green-500"
                  href={project.github}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View on GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HorizontalShowcase;
