// Data lives in experience.json so it can be edited by the CRM (see crm/).
// This module is a thin typed wrapper plus the badge style lookup.
import data from "./experience.json";

export const experienceConfig = data;

export type ExperienceEntry = (typeof data)[number];

// Static class strings — full names required so Tailwind's scanner includes them.
export const EXPERIENCE_BADGE_CLASSES: Record<string, string> = {
  research: "bg-violet-500/10 text-violet-400 border border-violet-500/25",
  internship: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25",
  freelance: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  fulltime: "bg-blue-500/10 text-blue-400 border border-blue-500/25",
  leadership: "bg-sky-500/10 text-sky-400 border border-sky-500/25",
};

export const EXPERIENCE_TYPE_LABELS: Record<string, string> = {
  research: "Research",
  internship: "Internship",
  freelance: "Freelance",
  fulltime: "Full-time",
  leadership: "Leadership",
};
