"use client";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { cinematicReveal, staggerContainer } from "@/lib/animation-variants";
import { useCinematicReveal } from "@/lib/use-cinematic-reveal";

export default function Contact() {
  const { ref, isVisible } = useCinematicReveal<HTMLDivElement>();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[4px] text-[#F08135] uppercase font-medium mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Contact
        </motion.p>
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Get in Touch
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-16">
          <motion.h2
            className="text-2xl md:text-3xl font-light text-[#555]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
          >
            Let&apos;s{" "}
            <span className="text-white font-medium">collaborate</span>
          </motion.h2>
        </div>

        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 gap-12"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div variants={cinematicReveal} custom={0}>
            <p className="text-[#888] text-sm leading-relaxed mb-8">
              I&apos;m always open to new opportunities and collaborations.
              Whether you have a project in mind or just want to connect, feel
              free to reach out!
            </p>
            <p className="text-xs tracking-[3px] text-[#333] uppercase font-semibold mb-4">
              Find me on
            </p>
            <div>
              {Object.entries(siteConfig.links).map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 border-b border-[#1e1e1e] group"
                >
                  <span className="text-sm text-[#555] group-hover:text-white transition-colors capitalize font-medium">
                    {key}
                  </span>
                  <span className="text-[#333] group-hover:text-[#F08135] transition-colors text-sm">
                    →
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={cinematicReveal} custom={1}>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-4"
            >
              <input
                type="hidden"
                name="access_key"
                value="bfc689bb-11be-43ff-9764-e8ecf0b6a523"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs text-[#444] font-medium mb-2 tracking-wide"
                    htmlFor="full-name"
                  >
                    Name <span className="text-[#F08135]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    id="full-name"
                    name="name"
                    placeholder="Your name"
                    className="w-full bg-[#1a1a1a] border border-[#222] rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:border-[#F08135] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs text-[#444] font-medium mb-2 tracking-wide"
                    htmlFor="email"
                  >
                    Email <span className="text-[#F08135]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    className="w-full bg-[#1a1a1a] border border-[#222] rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:border-[#F08135] focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-xs text-[#444] font-medium mb-2 tracking-wide"
                  htmlFor="message"
                >
                  Message <span className="text-[#F08135]">*</span>
                </label>
                <textarea
                  required
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or just say hello..."
                  className="w-full h-36 bg-[#1a1a1a] border border-[#222] rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:border-[#F08135] focus:outline-none transition-colors resize-none"
                />
              </div>
              <div className="h-captcha" data-captcha="true" />
              <button
                type="submit"
                className="w-full bg-[#F08135] text-white text-sm font-semibold py-3 px-8 rounded-full hover:bg-[#e0722a] transition-colors"
              >
                Send Message
              </button>
            </form>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script async defer src="https://web3forms.com/client/script.js" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
