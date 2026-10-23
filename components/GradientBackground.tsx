"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { themeConfig } from "@/config/themeConfig";

/**
 * Fixed decorative background: two green radial-gradient blobs, vertical light
 * stripes and a noise texture. The blobs drift on scroll for a parallax sense
 * of depth (disabled for prefers-reduced-motion).
 */
const GradientBackground = () => {
  const { gradientColor } = themeConfig;
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  // Blobs drift in opposite directions as the page scrolls.
  const leftY = useTransform(smooth, [0, 1], [0, -160]);
  const rightY = useTransform(smooth, [0, 1], [0, 200]);

  const radial = `radial-gradient(
    circle at center,
    ${gradientColor.primary} 0%,
    ${gradientColor.secondary} 20%,
    ${gradientColor.tertiary} 40%,
    ${gradientColor.transparent} 70%
  )`;

  return (
    <>
      {/* Left gradient spot — static offset on wrapper, parallax on inner */}
      <div
        className="fixed bottom-0 left-0 pointer-events-none"
        style={{ transform: "translate(-30%, 30%)", zIndex: 0 }}
      >
        <motion.div
          className="h-[1200px] w-[1200px]"
          style={{
            background: radial,
            filter: "blur(80px)",
            y: shouldReduceMotion ? 0 : leftY,
          }}
        />
      </div>

      {/* Right gradient spot — static offset on wrapper, parallax on inner */}
      <div
        className="fixed right-0 top-0 pointer-events-none"
        style={{ transform: "translate(30%, -30%)", zIndex: 0 }}
      >
        <motion.div
          className="h-[1000px] w-[1000px]"
          style={{
            background: radial,
            filter: "blur(25px)",
            y: shouldReduceMotion ? 0 : rightY,
          }}
        />
      </div>

      {/* Vertical light stripes */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            transparent,
            ${themeConfig.stripeColor} 1px,
            transparent 2px,
            transparent 20px
          )`,
          opacity: "0.3",
          zIndex: 0,
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="fixed inset-0 opacity-[0.30] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 800 800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          zIndex: 0,
        }}
      />
    </>
  );
};

export default GradientBackground;
