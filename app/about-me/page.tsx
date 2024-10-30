"use client";
import { Image } from "@nextui-org/react";

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About Me</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="flex justify-center md:justify-start">
          <Image
            isBlurred
            isZoomed
            alt="Anandkumar NS"
            radius="lg"
            src="/anand.png"
            width={500}
            className="w-full max-w-md"
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="w-full mb-6 md:mb-10">
            <div className="max-w-sm mx-auto md:ml-0 p-5  rounded-lg">
              <p className="text-lg md:text-xl font-light italic">
                &quot;The surest way to corrupt a youth is to instruct him to
                hold in higher esteem those who think alike than those who think
                differently...&quot;
              </p>
              <p className="text-lg md:text-xl font-extralight mt-4 text-right">
                -Friedrich Nietzsche
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-left">
              I&apos;m a computer science student with a passion for learning
              and creating. My journey in tech has led me to explore various
              areas of software development, from web applications to machine
              learning projects.
            </p>
            <p className="text-lg md:text-xl text-left">
              When I&apos;m not coding, you can find me reading about the latest
              tech trends, contributing to open-source projects, or
              experimenting with new programming languages and frameworks.
            </p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl md:text-2xl text-left font-light mb-4">
              Skills
            </h3>
            <ul className="text-left list-disc list-inside text-gray-300 space-y-2">
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
