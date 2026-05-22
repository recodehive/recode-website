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
    <div className="relative h-full flex flex-col">
      <div className="relative w-full h-full flex flex-col justify-between">
        {/* Section header — unified height & centered alignment */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="min-h-[150px] flex flex-col justify-center items-center text-center flex-shrink-0 mb-4 px-4"
        >
          <motion.div custom={0} variants={revealVariants} className="mb-2.5">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: isDark
                  ? "rgba(99,102,241,0.08)"
                  : "rgba(99,102,241,0.06)",
                border: isDark
                  ? "1px solid rgba(99,102,241,0.15)"
                  : "1px solid rgba(99,102,241,0.12)",
                color: isDark ? "#a5b4fc" : "#4338ca",
                fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
              }}
            >
              ✦ Mentorship
            </span>
          </motion.div>

          <motion.h2
            custom={1}
            variants={revealVariants}
            className="mb-2 text-2xl sm:text-3xl font-extrabold leading-tight tracking-tighter"
            style={{
              color: isDark ? "#f1f5f9" : "#0f172a",
              fontFamily: "'Outfit', 'Inter', -apple-system, sans-serif",
            }}
          >
            Book a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #6366f1, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Session
            </span>
          </motion.h2>

          <motion.p
            custom={2}
            variants={revealVariants}
            className="text-xs sm:text-sm leading-relaxed mx-auto max-w-xs"
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
          className="flex-1 flex"
        >
          <TopMateCard {...profileData} setShowTopmate={setShowTopmate} />
        </motion.div>
      </div>
    </div>
  );
};

export default TopMateSection;
