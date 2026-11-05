import { siteConfig } from "@/config/site";
import projects from "@/config/projects.json";

const baseUrl = "https://www.anandkumarns.com";

const links = Object.entries(siteConfig.links)
  .map(([name, url]) => `- [${name}](${url})`)
  .join("\n");

const projectList = [...projects]
  .sort((a, b) => a.rank - b.rank)
  .map((p) => {
    const gh = p.github ? `\n  - Source: ${p.github}` : "";

    return `### ${p.title}\n\n${p.description}\n\n- Technologies: ${p.technologies.join(", ")}${gh}`;
  })
  .join("\n\n");

const pages: Record<string, string> = {
  "": `# ${siteConfig.name}\n\n${siteConfig.description}\n\nComputer science student building web, mobile and applied-AI projects.\n\n## Pages\n\n- [Projects](${baseUrl}/projects)\n- [About](${baseUrl}/about-me)\n- [Contact](${baseUrl}/contact)\n\n## Links\n\n${links}\n`,
  projects: `# Projects\n\n${projectList}\n`,
  "about-me": `# About Me\n\nI'm a computer science student with a passion for learning and creating. My journey in tech has led me to explore various areas of software development, from web applications to machine learning projects.\n\nWhen I'm not coding, you can find me reading about the latest tech trends, contributing to open-source projects, or experimenting with new programming languages and frameworks.\n\n## Skills\n\n- JavaScript (React, React Native, Expo, Node.js, ExpressJS, NextJS)\n- TypeScript (NextJS)\n- C (Algorithms, Data Structures and Networking Sockets)\n- Python (FastAPI, Flask)\n- Database Design (SQL, MongoDB, PostgresSQL)\n- Cloud Services (Azure, Google Cloud)\n- Applied AI (Ollama, LangChain, LlamaIndex)\n`,
  contact: `# Contact\n\nUse the contact form at ${baseUrl}/contact, or reach out through:\n\n${links}\n`,
};

export function GET(
  _req: Request,
  { params }: { params: { path?: string[] } }
) {
  const key = (params.path ?? []).join("/");
  const body = pages[key];

  if (body === undefined) {
    return new Response("# Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
