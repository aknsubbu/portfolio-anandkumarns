"use client";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  rank: number;
}

export default function ProjectCard({
  title,
  description,
  image,
  rank,
}: ProjectCardProps) {
  return (
    <Card className="w-full bg-black border-2 border-gray-600 m-5 rounded-xl">
      <CardHeader className="flex justify-between items-center">
        <span className="text-2xl font-semibold">{rank}.</span>
        <span className="text-gray-200 text-2xl pl-2 font-light">{title}</span>
      </CardHeader>
      <CardBody>
        <Image
          alt={title}
          className="w-full h-auto object-cover"
          height={500}
          src={image}
          width={600}
        />
      </CardBody>
      <CardFooter className="p-6">
        <p className="text-base text-gray-200">{description}</p>
      </CardFooter>
    </Card>
  );
}
