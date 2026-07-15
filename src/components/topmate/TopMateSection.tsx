import React from "react";
import TopMateCard from "./TopMateCard";
import { useSafeColorMode } from "../../utils/useSafeColorMode";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.5,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const TopMateSection = ({ setShowTopmate }) => {
  const { isDark } = useSafeColorMode();

  const profileData = {
    title: "1:1 Mentorship Call",
    description: "Book a slot, Free for recode hive Community Members",
    duration: "30 mins",
    profileImage: "/sanjay.png",
    username: "sanjaykv",
  };

  return (
    <div className="relative flex flex-col w-full">
      <div className="relative flex w-full flex-col justify-between">
        {/* Section header — unified height & centered alignment */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 flex flex-shrink-0 flex-col items-center justify-center px-4 text-center"
        >
          <motion.div custom={0} variants={revealVariants} className="mb-2.5">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
              style={{
                color: isDark ? "#4ade80" : "#16a34a",
                fontFamily:
                  "'Space Grotesk', 'Inter', -apple-system, sans-serif",
              }}
            >
              ✦ Mentorship
            </span>
          </motion.div>

          <motion.h2
            custom={1}
            variants={revealVariants}
            className="mb-2 text-2xl leading-tight font-bold tracking-tight sm:text-3xl"
            style={{
              color: isDark ? "#ffffff" : "#0f172a",
              fontFamily:
                "'Space Grotesk', 'Inter', -apple-system, sans-serif",
            }}
          >
            Book a Session
          </motion.h2>

          <motion.p
            custom={2}
            variants={revealVariants}
            className="mx-auto max-w-xs text-xs leading-relaxed sm:text-sm"
            style={{
              color: isDark ? "#94a3b8" : "#64748b",
              fontFamily: "'Inter', -apple-system, sans-serif",
            }}
          >
            Get personalized guidance through one-on-one sessions with experts
          </motion.p>
        </motion.div>

        {/* Card — fills remaining height */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="flex flex-1 w-full"
        >
          <TopMateCard {...profileData} setShowTopmate={setShowTopmate} />
        </motion.div>
      </div>
    </div>
  );
};

export default TopMateSection;
