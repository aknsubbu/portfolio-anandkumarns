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
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  rank: number;
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  rank,
  link,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        className="w-full bg-black border-2 border-gray-600 rounded-xl overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="flex justify-between items-center p-4">
          <span className="text-3xl font-bold text-gray-400">#{rank}</span>
          <h2 className="text-2xl font-semibold text-gray-200">{title}</h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="relative aspect-video">
            <Image
              alt={title}
              src={image}
              layout="fill"
              objectFit="cover"
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
            />
            {isHovered && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
                <p className="text-white text-lg p-4 text-center">
                  {description}
                </p>
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter className="flex justify-between items-center p-4">
          <p className="text-sm text-gray-400 truncate flex-grow mr-4">
            {description}
          </p>
          {link && (
            <Button
              color="primary"
              as="a"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
