"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { fontMono } from "@/config/fonts";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  rank: number;
  technologies: string[];
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    console.log("Card clicked"); // Debug log
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(fontMono.variable)}
        onClick={handleCardClick}
      >
        <Card className="bg-black/20 backdrop-blur-sm border border-orange-400/10 hover:border-orange-400/20 transition-all duration-500 font-mono">
          <CardBody className="p-0 overflow-hidden">
            <div className="relative aspect-[16/9]">
              <Image
                alt={title}
                src={image}
                fill
                className="object-cover transition-all duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Complex Gradient Overlay with Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/90" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top Section */}
                <div className="space-y-4">
                  <motion.span
                    className="text-orange-400/60 font-mono text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {rank.toString().padStart(2, "0")}
                  </motion.span>

                  <motion.h2
                    className="text-2xl font-light text-white/90 font-mono"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {title}
                  </motion.h2>
                </div>

                {/* Bottom Section */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-md text-orange-400/60 font-mono"
                      >
                        {tech}
                        {index < technologies.length - 1 && " •"}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="bg-black"
        size="2xl"
      >
        <ModalContent
          className={clsx(
            "bg-black/90 border border-orange-400/20 font-mono",
            fontMono.variable
          )}
        >
          <ModalHeader className="flex flex-col gap-1 text-white border-b border-orange-400/20 font-mono">
            <span className="text-orange-400/60 font-mono text-sm">
              {rank.toString().padStart(2, "0")}
            </span>
            <h2 className="text-2xl font-light font-mono">{title}</h2>
          </ModalHeader>

          <ModalBody className={clsx("text-white py-6", fontMono.variable)}>
            <div className="relative aspect-[16/9] w-full mb-4">
              <Image
                alt={title}
                src={image}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <p className="text-gray-300 font-light leading-relaxed font-mono">
              {description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4 font-mono">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="text-lg text-orange-400/60 font-mono"
                >
                  {tech}
                  {index < technologies.length - 1 && " •"}
                </span>
              ))}
            </div>
          </ModalBody>

          <ModalFooter className="border-t border-orange-400/20">
            <div className="flex gap-4 w-full">
              {github && (
                <Button
                  as="a"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 text-white hover:bg-white/20"
                  startContent={<Github className="w-4 h-4" />}
                >
                  GitHub
                </Button>
              )}
              {link && (
                <Button
                  as="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                  startContent={<ExternalLink className="w-4 h-4" />}
                >
                  Visit Site
                </Button>
              )}
              <Button
                onPress={() => setIsModalOpen(false)}
                className="ml-auto bg-white/10 text-white hover:bg-white/20"
              >
                Close
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectCard;
