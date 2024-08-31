import React from "react";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="w-full bg-inherit py-8">
      <div className="container mx-auto flex justify-between text-sm text-gray-200">
        <div>
          <h3 className="font-semibold text-gray-500">Credits</h3>
          <p>©AnandkumarNS</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-500">Menu</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/projects">Projects</Link>
            </li>
            <li>
              <Link href="/about-me">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-500">Contact</h3>
          <p>aknsubbu@gmail.com</p>
          <p>+91 9384870740</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-500">Socials</h3>
          <ul>
            <li>
              <Link href={siteConfig.links.instagram}>Instagram</Link>
            </li>
            <li>
              <Link href={siteConfig.links.github}>GitHub</Link>
            </li>
            <li>
              <Link href={siteConfig.links.linkedin}>LinkedIn</Link>
            </li>
            <li>
              <Link href={siteConfig.links.medium}>Medium</Link>
            </li>
            <li>
              <Link href={siteConfig.links.leetcode}>LeetCode</Link>
            </li>
          </ul>
        </div>
        <div>
          <p>©2024</p>
        </div>
      </div>
    </footer>
  );
}
