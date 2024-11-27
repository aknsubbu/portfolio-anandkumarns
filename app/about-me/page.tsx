"use client";
import { Image } from "@nextui-org/react";
import clsx from "clsx";
import { fontMono } from "@/config/fonts";

export default function About() {
  return (
    <div className={clsx("max-w-6xl mx-auto px-4 py-12", fontMono.variable)}>
      <div className="mb-8 md:mb-16">
        <h1 className="text-2xl md:text-6xl font-bold mb-4 font-mono">
          About Me
        </h1>
      </div>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex justify-center md:justify-center">
          <div className="w-75 h-75 md:w-75 md:h-75 rounded-full overflow-hidden">
            <Image
              alt="Anandkumar NS"
              src="/anand.png"
              classNames={{
                img: "w-full h-full object-cover ",
              }}
              radius="none"
            />
          </div>
        </div>
        <div className="flex flex-col justify-start space-y-8">
          <div className="w-full">
            <div className="max-w-sm md:ml-0 space-y-4 mt-10">
              <p className="text-lg md:text-xl font-light italic font-mono text-right">
                &quot;The surest way to corrupt a youth is to instruct him to
                hold in higher esteem those who think alike than those who think
                differently...&quot;
              </p>
              <p className="text-lg md:text-xl font-extralight text-right font-mono mb-5 pb-5">
                -Friedrich Nietzsche
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-lg md:text-xl font-mono">
              I&apos;m a computer science student with a passion for learning
              and creating. My journey in tech has led me to explore various
              areas of software development, from web applications to machine
              learning projects.
            </p>
            <p className="text-lg md:text-xl font-mono">
              When I&apos;m not coding, you can find me reading about the latest
              tech trends, contributing to open-source projects, or
              experimenting with new programming languages and frameworks.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-light font-mono">Skills</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 font-mono">
              <li>
                JavaScript (React, React Native, Expo, Node.js, ExpressJS,
                NextJS)
              </li>
              <li>TypeScript (NextJS)</li>
              <li>C (Algorithms, Data Structures and Networking Sockets)</li>
              <li>Python (FastAPI, Flask)</li>
              <li>Database Design (SQL, MongoDB, PostgresSQL)</li>
              <li>Cloud Services (Azure, Google Cloud)</li>
              <li>Applied AI (Ollama, LangChain, LlamaIndex)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
