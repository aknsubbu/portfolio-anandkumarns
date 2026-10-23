"use client";

import type { ReactNode } from "react";

import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  /** Direction the element travels in from. Defaults to "up". */
  direction?: Direction;
  /** Seconds to wait before animating. Useful for manual staggering. */
  delay?: number;
  /** Travel distance in pixels. Defaults to 24. */
  distance?: number;
  /** Animation duration in seconds. Defaults to 0.6. */
  duration?: number;
  className?: string;
}

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
  }
};

/**
 * Fade + slide an element into view the first time it scrolls onto screen.
 * Respects prefers-reduced-motion by rendering content statically.
 */
const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  distance = 24,
  duration = 0.6,
  className,
}: RevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = offsetFor(direction, distance);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
