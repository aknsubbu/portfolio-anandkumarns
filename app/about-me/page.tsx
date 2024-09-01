"use client";
import { Image } from "@nextui-org/react";

export default function About() {
  return (
    <div className="  px-4 pb-12">
      <div className="mb-16">
        <h1 className="text-6xl font-bold mb-4">About Me</h1>
      </div>
      <div className="grid md:grid-cols-2">
        <div className="flex w-fit">
          <Image
            isBlurred
            isZoomed
            alt="Anandkumar NS"
            radius="lg"
            src="/anand.png"
            width={500}
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="flex justify-end w-full mb-10">
            <div className="max-w-sm p-5">
              <p className="text-xl font-light">
                The surest way to corrupt a youth is to instruct him to hold in
                higher esteem those who think alike than those who think
                differently...
              </p>
              <p className="text-xl font-extralight m-5">
                -Friedrich Nietzsche
              </p>
            </div>
          </div>

          <p className="text-xl text-left mb-5 pt-10">
            <br />
            <br />
            <br />
            I&apos;m a computer science student with a passion for learning and
            creating. My journey in tech has led me to explore various areas of
            software development, from web applications to machine learning
            projects.
          </p>
          <p className="text-xl text-left mb-5">
            When I&apos;m not coding, you can find me reading about the latest
            tech trends, contributing to open-source projects, or experimenting
            with new programming languages and frameworks.
          </p>
          <br />
          <br />
          <h3 className="text-2xl text-left font-light mb-4">Skills</h3>
          <ul className="text-left list-item list-inside text-gray-300">
            <li>JavaScript (React, Node.js, ExpressJS, NextJS)</li>
            <li>TypeScript (NextJS) </li>
            <li>C (Alogrithms, Data Structures and Networking Sockets)</li>
            <li>Python (FastAPI, Flask)</li>
            <li>Database Design (SQL, MongoDB)</li>
            <li>Cloud Services (Azure, Google Cloud)</li>
            <li>Applied AI (Ollama, LangChain, LlamaIndex)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
