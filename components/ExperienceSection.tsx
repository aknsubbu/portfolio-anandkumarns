"use client";
import { Link } from "@nextui-org/link";

import Reveal from "@/components/Reveal";
import {
  EXPERIENCE_BADGE_CLASSES,
  EXPERIENCE_TYPE_LABELS,
  experienceConfig,
} from "@/config/experience";

const HOME_ROW_LIMIT = 5;

// Compact numbered list for the home page.
const ExperienceSection = () => {
  const rows = experienceConfig.slice(0, HOME_ROW_LIMIT);

  return (
    <div className="py-8 md:py-12 px-4 md:px-0">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-mono text-green-600 mb-8 md:mb-12">
          Experience
        </h2>
      </Reveal>
      <div className="divide-y divide-white/5 border-y border-white/5">
        {rows.map((entry, index) => (
          <Reveal key={`${entry.company}-${entry.role}`} delay={index * 0.08}>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-4 md:py-5">
              <span className="font-mono text-2xl md:text-3xl text-green-600/30 md:w-14 shrink-0">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-mono font-bold text-white text-base md:text-lg">
                  {entry.role}
                </p>
                <p className="font-mono text-gray-400 text-sm">{entry.company}</p>
              </div>
              <div className="flex items-center gap-3 md:justify-end">
                <span className="font-mono text-xs md:text-sm text-gray-500 whitespace-nowrap">
                  {entry.start} – {entry.end}
                </span>
                <span
                  className={`font-mono text-xs px-2 py-0.5 rounded-full ${EXPERIENCE_BADGE_CLASSES[entry.type]}`}
                >
                  {EXPERIENCE_TYPE_LABELS[entry.type]}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div className="mt-6 text-right">
          <Link
            className="font-mono text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            href="/about-me#experience"
          >
            View full experience on About →
          </Link>
        </div>
      </Reveal>
    </div>
  );
};

export default ExperienceSection;
