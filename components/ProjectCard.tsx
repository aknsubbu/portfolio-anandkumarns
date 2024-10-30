"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  rank: number;
  technologies: string[]; // Make technologies required
  link?: string;
  github?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  rank,
  technologies,
  link,
  github,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasLinks = link || github;

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02, y: -5 }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />

        <Card
          className="w-full backdrop-blur-xl bg-black/90 border border-gray-800 rounded-xl overflow-hidden shadow-2xl relative z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Rank Badge */}
          <div className="absolute top-4 left-4 z-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 p-0.5 rounded-lg"
            >
              <div className="bg-black px-3 py-1 rounded-lg">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-mono font-bold">
                  #{rank.toString().padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </div>

          <CardHeader className="flex flex-col gap-2 p-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {title}
            </h2>

            {/* Tech Stack Pills - Now explicitly checking for technologies */}
            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-gray-800/50 text-gray-300 border border-gray-700/50 hover:border-gray-600 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </CardHeader>

          <CardBody className="p-0 relative">
            <div className="relative aspect-video">
              <Image
                alt={title}
                src={image}
                fill
                className="object-cover transition-transform duration-300"
                quality={90}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black flex items-center justify-center p-6"
                  >
                    <p className="text-gray-200 text-lg leading-relaxed">
                      {description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardBody>

          <CardFooter className="flex justify-between items-center p-6 bg-gradient-to-b from-transparent to-black/40">
            <div className="flex gap-3">
              {github && (
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-gray-800/50 hover:bg-gray-700/50 text-white"
                  as="a"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
              )}
              {link && (
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  as="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              )}
            </div>

            {hasLinks && (
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="opacity-50"
              >
                <Code className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
