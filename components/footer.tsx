import Link from "next/link";

import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-[#333]">
          © {new Date().getFullYear()} Anandkumar NS
        </p>
        <div className="flex items-center gap-6">
          {Object.entries(siteConfig.links).map(([key, href]) => (
            <Link
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#333] hover:text-[#F08135] transition-colors capitalize"
            >
              {key}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
