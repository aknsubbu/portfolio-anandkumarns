"use client";
import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(fontMono.variable, "cursor-pointer")}
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
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/90" />

              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                <div className="space-y-2 sm:space-y-4">
                  <motion.span
                    className="text-green-600/60 font-mono text-base sm:text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {rank.toString().padStart(2, "0")}
                  </motion.span>

                  <motion.h2
                    className="text-xl sm:text-2xl font-light text-white/90 font-mono line-clamp-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {title}
                  </motion.h2>
                </div>

                <div className="space-y-2 sm:space-y-4">
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-sm sm:text-md text-green-600/60 font-mono"
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
        size={isMobile ? "full" : "2xl"}
        scrollBehavior="inside"
        className={clsx(
          "bg-black/0 dark:bg-black/0",
          isMobile && "m-0 p-0 rounded-none"
        )}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent
          className={clsx(
            "bg-black/90 border border-green-600/20 font-mono",
            isMobile ? "m-0 h-full rounded-none" : "mx-auto my-2 rounded-lg",
            fontMono.variable
          )}
        >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white border-b border-green-600/20 font-mono p-4 sm:p-6">
                <span className="text-green-600/60 font-mono text-sm">
                  {rank.toString().padStart(2, "0")}
                </span>
                <h2 className="text-xl sm:text-2xl font-light font-mono">
                  {title}
                </h2>
              </ModalHeader>

              <ModalBody
                className={clsx(
                  "text-white py-4 sm:py-6 px-4 sm:px-6 overflow-y-auto",
                  fontMono.variable
                )}
              >
                <div className="relative aspect-[16/9] w-full mb-4">
                  <Image
                    alt={title}
                    src={image}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
                <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed font-mono">
                  {description}
                </p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-4 font-mono">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-base sm:text-lg text-green-600/60 font-mono"
                    >
                      {tech}
                      {index < technologies.length - 1 && " •"}
                    </span>
                  ))}
                </div>
              </ModalBody>

              <ModalFooter className="border-t border-green-600/20 p-4 sm:p-6 flex-col sm:flex-row gap-2 sm:gap-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                  {github && (
                    <Button
                      as="a"
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-white/10 text-white hover:bg-white/20 min-w-[120px]"
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
                      className="w-full sm:w-auto bg-orange-500/20 text-green-600 hover:bg-green-500/30 min-w-[120px]"
                      startContent={<ExternalLink className="w-4 h-4" />}
                    >
                      Visit Site
                    </Button>
                  )}
                  <Button
                    onPress={onClose}
                    className="w-full sm:w-auto ml-0 sm:ml-auto bg-white/10 text-white hover:bg-white/20"
                  >
                    Close
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProjectCard;
