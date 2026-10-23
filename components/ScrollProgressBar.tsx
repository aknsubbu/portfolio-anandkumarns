"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin accent bar fixed beneath the navbar that tracks overall page scroll.
 * Uses a spring so the fill eases rather than tracking the wheel 1:1.
 */
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-green-500"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgressBar;
