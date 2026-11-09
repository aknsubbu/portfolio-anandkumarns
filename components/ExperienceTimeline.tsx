"use client";
import Reveal from "@/components/Reveal";
import {
  EXPERIENCE_BADGE_CLASSES,
  EXPERIENCE_TYPE_LABELS,
  experienceConfig,
} from "@/config/experience";

// Full vertical timeline for the About page.
const ExperienceTimeline = () => {
  return (
    <section className="mt-16 md:mt-24 scroll-mt-24" id="experience">
      <Reveal>
        <h2 className="text-2xl md:text-4xl font-bold font-mono mb-8 md:mb-12">
          Experience
        </h2>
      </Reveal>
      <div className="relative pl-8 md:pl-10">
        <div
          aria-hidden="true"
          className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-gradient-to-b from-green-500/70 via-green-600/30 to-transparent"
        />
        <div className="space-y-10 md:space-y-12">
          {experienceConfig.map((entry, index) => {
            const isCurrent = entry.end === "Present";

            return (
              <Reveal
                key={`${entry.company}-${entry.role}`}
                delay={Math.min(index * 0.1, 0.4)}
              >
                <article className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-8 md:-left-10 top-1.5 h-4 w-4 md:h-5 md:w-5 rounded-full border-2 border-black/60 ${
                      isCurrent
                        ? "bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.6)]"
                        : "bg-green-600"
                    }`}
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                    <h3 className="font-mono font-bold text-lg md:text-xl text-white">
                      {entry.role}
                    </h3>
                    <span
                      className={`font-mono text-xs px-2 py-0.5 rounded-full ${EXPERIENCE_BADGE_CLASSES[entry.type]}`}
                    >
                      {EXPERIENCE_TYPE_LABELS[entry.type]}
                    </span>
                  </div>
                  <p className="font-mono text-sm md:text-base text-gray-300">
                    {entry.url ? (
                      <a
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        href={entry.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {entry.company} ↗
                      </a>
                    ) : (
                      entry.company
                    )}
                  </p>
                  <p className="font-mono text-xs md:text-sm text-gray-500 mb-3">
                    {entry.start} – {entry.end}
                    {entry.location ? ` · ${entry.location}` : ""}
                  </p>
                  <blockquote className="border-l-2 border-green-600/20 bg-black/20 backdrop-blur-sm rounded-r-lg px-4 py-3 font-mono text-sm md:text-base text-gray-300 leading-relaxed">
                    {entry.description}
                  </blockquote>
                  <ul className="flex flex-wrap gap-2 mt-3">
                    {entry.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
