"use client";
import { Image } from "@nextui-org/react";
import clsx from "clsx";

import { fontMono } from "@/config/fonts";
import Reveal from "@/components/Reveal";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function About() {
  return (
    <div className={clsx("max-w-6xl mx-auto px-4 py-12", fontMono.variable)}>
      <Reveal>
        <div className="mb-8 md:mb-16">
          <h1 className="text-2xl md:text-6xl font-bold mb-4 font-mono">
            About Me
          </h1>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <Reveal className="flex justify-center md:justify-center" direction="right">
          <div className="w-75 h-75 md:w-75 md:h-75 rounded-full overflow-hidden">
            <Image
              alt="Anandkumar NS"
              src="/anand-centered.jpeg"
              classNames={{
                img: "w-full h-full object-cover",
              }}
              radius="none"
            />
          </div>
        </Reveal>
        <div className="flex flex-col justify-start space-y-8">
          <Reveal direction="left">
            <div className="w-full">
              <div className="max-w-sm md:ml-0 space-y-4 mt-10">
                <p className="text-lg md:text-xl font-light italic font-mono text-right">
                  &quot;The surest way to corrupt a youth is to instruct him to
                  hold in higher esteem those who think alike than those who
                  think differently...&quot;
                </p>
                <p className="text-lg md:text-xl font-extralight text-right font-mono mb-5 pb-5">
                  -Friedrich Nietzsche
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <p className="text-lg md:text-xl font-mono">
                I build agentic AI systems and research how to make them safer.
                I&apos;m an MS CS student at NYU Courant. At Schneider Electric
                I built an agentic QA pipeline (Playwright + Jira) that cut
                manual regression testing by 55% and helped ship an Agentforce
                email-to-case bot. At ISRO&apos;s NRSC I developed EMSP-DIP, a
                training-free method for removing clouds from satellite images,
                now published in IEEE Geoscience and Remote Sensing Letters.
              </p>
              <p className="text-lg md:text-xl font-mono">
                My research interests are agentic misalignment, multi-agent
                systems, causal ML and reinforcement learning. That includes a
                causal safety layer for LLM-guided RL agents that recovers about
                75% of performance under adversarial advice in NetHack. I also
                have a published Indian patent application on multi-agent AI for
                agriculture and a Springer conference paper on low-cost
                autonomous logistics robots. I&apos;m looking for Summer 2027
                SWE and ML internships.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-light font-mono">
                Skills
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 font-mono">
                <li>
                  AI / ML (LLMs, RAG, Reinforcement Learning, Agentic AI,
                  Multi-Agent Frameworks, Deep Image Prior)
                </li>
                <li>LLM Orchestration (CrewAI, LangChain, LlamaIndex, Ollama)</li>
                <li>Salesforce (Agentforce, Apex, Email-to-Case Automation)</li>
                <li>Testing &amp; Tooling (Playwright, Jira, REST APIs, Git &amp; GitHub)</li>
                <li>Python (FastAPI), SQL, Java</li>
                <li>C (Algorithms, Data Structures and Networking Sockets)</li>
                <li>Database Design (PostgreSQL, MongoDB)</li>
                <li>
                  Web &amp; Mobile (TypeScript, React, Next.js, React Native,
                  Expo, Node.js)
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
      <ExperienceTimeline />
    </div>
  );
}
