import React from "react";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { fontMono } from "@/config/fonts";

const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about-me", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: siteConfig.links.instagram, label: "Instagram" },
  { href: siteConfig.links.github, label: "GitHub" },
  { href: siteConfig.links.linkedin, label: "LinkedIn" },
  { href: siteConfig.links.medium, label: "Medium" },
  { href: siteConfig.links.leetcode, label: "LeetCode" },
];

export default function Footer() {
  return (
    <footer className={clsx("w-full bg-inherit py-8", fontMono.variable)}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm text-gray-200">
          {/* Credits Section */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-500 mb-4 font-mono">
              Credits
            </h3>
            <p className="font-mono">©AnandkumarNS</p>
          </div>

          {/* Menu Section */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-500 mb-4 font-mono">Menu</h3>
            <ul className="space-y-2">
              {MENU_LINKS.map(({ href, label }) => (
                <li key={href} className="font-mono">
                  <Link
                    href={href}
                    className="hover:text-gray-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials Section */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-500 mb-4 font-mono">
              Socials
            </h3>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <li key={label} className="font-mono">
                  <Link
                    href={href}
                    className="hover:text-gray-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright Section */}
          <div className="flex flex-col items-start lg:items-end font-mono">
            <h3 className="font-semibold text-gray-500 mb-4 font-mono">
              Copyright
            </h3>
            <p>©{new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
