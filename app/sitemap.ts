import { MetadataRoute } from "next";

const baseUrl = "https://www.anandkumarns.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, priority: 1 },
    { url: `${baseUrl}/projects`, lastModified, priority: 0.8 },
    { url: `${baseUrl}/about-me`, lastModified, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, priority: 0.5 },
  ];
}
