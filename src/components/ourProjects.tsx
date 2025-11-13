"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { useSafeColorMode } from "../utils/useSafeColorMode";
// Mobile-specific overrides for very small screens (<768px and <320px)
import "./ourProjects.mobile.css";
// Import projects data and types
import projectsData from "../data/projects.json";
import type { ProjectsData, ProjectItem } from "../data/types";

/**
 * Legacy interface for backward compatibility
 * @deprecated Use ProjectsData from types.ts instead
 */
export interface OurProjectsData {
  tag: string;
  title: string;
  description: string;
  items: {
    title: string;
    image: string;
  }[];
}

/**
 * Legacy props interface for backward compatibility
 * @deprecated Component now imports data directly
 */
export interface OurProjectsProps {
  OurProjectsData?: OurProjectsData;
}

/**
 * OurProjects Component
 *
 * Displays a showcase of RecodeHive projects with interactive previews.
 * Now uses data-driven approach with JSON configuration for better maintainability.
 *
 * Features:
 * - Dynamic project loading from JSON
 * - Live website previews for supported projects
 * - Responsive design with mobile optimizations
 * - Dark/light theme support
 * - Interactive hover effects and animations
 *
 * @param props - Optional props for backward compatibility
 */
const OurProjects: React.FC<OurProjectsProps> = ({
  OurProjectsData: legacyData,
}) => {
  const { colorMode, isDark } = useSafeColorMode();

  // Use JSON data by default, fallback to legacy props for backward compatibility
  // Convert legacy data to new format if needed
  let data: ProjectsData;

  if (legacyData) {
    // Convert legacy format to new format
    data = {
      tag: legacyData.tag,
      title: legacyData.title,
      description: legacyData.description,
      items: legacyData.items.map((item, index) => ({
        id: index + 1,
        title: item.title,
        description: `Learn more about ${item.title}`,
        image: item.image,
        projectUrl: getWebsiteUrl(item.title),
        githubUrl: getWebsiteUrl(item.title),
        tags: [],
      })),
    };
  } else {
    data = projectsData as ProjectsData;
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-10 transition-colors duration-300 sm:gap-20 sm:py-20 ${
        isDark ? "bg-[#0c0c0c] text-white" : "bg-white text-black"
      }`}
    >
      <HeadingComponent
        tag={data.tag}
        title={data.title}
        description={data.description}
        isDark={isDark}
      />
      <SelectComponent items={data.items} isDark={isDark} />
    </div>
  );
};

// Heading Component
const HeadingComponent = ({
  tag,
  title,
  description,
  isDark,
}: {
  tag: string;
  title: string;
  description: string;
  isDark: boolean;
}) => {
  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 sm:gap-10 md:items-start md:justify-start"
      >
        <div
          className="transform cursor-pointer rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-sm font-medium tracking-wide text-white shadow-lg transition-transform duration-300 hover:scale-105 sm:text-base"
          onClick={() =>
            (window.location.href = "https://github.com/recodehive")
          }
        >
          {tag}
        </div>
        <div
          className={`bg-gradient-to-r bg-clip-text text-center text-3xl font-bold text-transparent sm:text-4xl md:w-11/12 md:text-left md:text-5xl ${
            isDark
              ? "from-white via-gray-300 to-white"
              : "from-black via-gray-700 to-black"
          }`}
        >
          {title}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`${
          isDark ? "text-gray-300" : "text-gray-700"
        } flex h-full items-center justify-center text-justify text-base leading-relaxed sm:text-lg md:pr-10`}
      >
        {description}
      </motion.div>
    </div>
  );
};

// Project URLs configuration
const PROJECT_URLS: Record<string, string> = {
  "Awesome GitHub Profile":
    "https://recodehive.github.io/awesome-github-profiles/",
  "Machine Learning Repository": "https://machine-learning-repos.vercel.app/",
};

// Helper function to get website URLs
const getWebsiteUrl = (title: string) => {
  return PROJECT_URLS[title] || "https://github.com/recodehive";
};

// Select Component
const SelectComponent = ({
  items,
  isDark,
}: {
  items: ProjectItem[];
  isDark: boolean;
}) => {
  const [activeItem, setActiveItem] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="grid w-full grid-cols-1 overflow-hidden rounded-[30px] shadow-2xl sm:rounded-[50px] md:grid-cols-12"
    >
      <div
        className={`no-scrollbar col-span-1 flex max-h-[30vh] flex-row items-start justify-start gap-4 overflow-x-auto p-4 md:col-span-4 md:max-h-[70vh] md:flex-col md:gap-6 md:overflow-y-auto md:p-8 ${
          isDark ? "bg-black" : "bg-gray-100"
        }`}
      >
        {items.map((item, index) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={item.id || index}
            onClick={() => setActiveItem(index)}
            className={`relative w-40 cursor-pointer rounded-2xl p-2 transition-all duration-300 ease-in-out md:w-4/5 md:rounded-r-full md:p-6 ${
              activeItem === index
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : isDark
                  ? "bg-gray-800 text-white hover:bg-gray-700"
                  : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          >
            <div className="text-xs font-semibold md:w-10/12 md:text-lg">
              {item.title}
            </div>
            <div
              className={`absolute top-1/2 right-2 -translate-y-1/2 rounded-full transition-transform duration-300 md:right-4 ${
                activeItem === index ? "translate-x-2" : ""
              }`}
            >
              <ChevronRight className="hidden h-6 w-6 md:block md:h-8 md:w-8" />
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className={`ourprojects-embed-container relative col-span-1 min-h-[80vh] overflow-hidden p-4 md:col-span-8 md:min-h-[70vh] md:p-8`}
      >
        {/* Animated Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-600/30 via-cyan-500/30 to-emerald-500/30">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          <div
            className="absolute inset-0 animate-spin bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(147,51,234,0.1)_60deg,transparent_120deg)]"
            style={{ animationDuration: "20s" }}
          ></div>
        </div>

        {/* Particle System */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              style={{
                left: `${10 + i * 7}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
            />
          ))}
        </div>

        {/* Advanced Floating Icons */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-8 right-8 hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shadow-2xl backdrop-blur-sm md:flex"
        >
          <svg
            className="h-8 w-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <div className="absolute -inset-1 animate-pulse rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-30 blur"></div>
        </motion.div>

        <motion.div
          animate={{ x: [-5, 5, -5], rotate: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-8 hidden h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 shadow-xl backdrop-blur-sm md:flex"
        >
          <span className="text-xl text-white">⚡</span>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute right-16 bottom-20 hidden h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 shadow-lg backdrop-blur-sm md:flex"
        >
          <span className="text-sm text-white">🚀</span>
        </motion.div>

        {/* Holographic Main Browser */}
        <motion.div
          key={activeItem}
          initial={{ opacity: 0, rotateY: -20, scale: 0.8, z: -100 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="perspective-1000 relative z-10"
        >
          <div
            className={`md:hover:rotateY-5 group ourprojects-embed-card h-[78vh] transform overflow-hidden rounded-2xl border-2 shadow-2xl backdrop-blur-md transition-all duration-700 hover:scale-105 sm:h-[80vh] sm:rounded-3xl md:h-[65vh] ${
              isDark
                ? "border-purple-500/50 bg-gray-900/95 shadow-purple-500/25"
                : "border-blue-400/50 bg-white/95 shadow-blue-500/25"
            }`}
          >
            {/* Holographic Border Effect */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-20 blur transition-opacity duration-500 group-hover:opacity-40"></div>

            {/* Premium Browser Header */}
            <div
              className={`relative flex items-center border-b px-3 py-2 backdrop-blur-xl sm:px-6 sm:py-4 ${
                isDark
                  ? "border-gray-600/50 bg-gray-800/90"
                  : "border-gray-300/50 bg-gray-50/90"
              }`}
            >
              <div className="mr-6 flex space-x-3">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  className="relative h-4 w-4 cursor-pointer rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg"
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-300 opacity-20"></div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -180 }}
                  className="relative h-4 w-4 cursor-pointer rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-yellow-300 opacity-20"></div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="relative h-4 w-4 cursor-pointer rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg"
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-green-300 opacity-20"></div>
                </motion.div>
              </div>

              <div
                className={`relative flex flex-1 items-center overflow-hidden rounded-2xl px-2 py-2 font-mono text-xs backdrop-blur-sm sm:px-4 sm:py-3 sm:text-sm ${
                  isDark
                    ? "border border-gray-500/50 bg-gray-700/70 text-gray-200"
                    : "border border-gray-300/50 bg-white/80 text-gray-700 shadow-inner"
                }`}
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-3 text-lg text-emerald-500"
                >
                  🔒
                </motion.span>
                <span className="font-semibold text-blue-500">github.com</span>
                <span className="mx-1 text-gray-400">/</span>
                <span className="font-bold text-purple-500">recodehive</span>
                <span className="mx-1 text-gray-400">/</span>
                <motion.span
                  key={activeItem}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-semibold text-cyan-500"
                >
                  {items[activeItem].title.toLowerCase().replace(/\s+/g, "-")}
                </motion.span>
              </div>

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`ml-2 flex items-center rounded-xl px-2 py-1 text-[10px] font-bold backdrop-blur-sm sm:ml-4 sm:px-4 sm:py-2 sm:text-xs ${
                  isDark
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                    : "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 shadow-md"
                }`}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mr-2 h-2 w-2 rounded-full bg-emerald-400"
                ></motion.div>
                LIVE
              </motion.div>
            </div>

            {/* Ultra-Enhanced Screenshot Display */}
            <div className="relative h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
              <motion.div
                initial={{ opacity: 0, scale: 1.1, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="group relative h-full overflow-hidden"
              >
                {items[activeItem].title === "Awesome GitHub Profile" ||
                items[activeItem].title === "Machine Learning Repository" ? (
                  /* Auto-scrolling Website Iframe */
                  <motion.div
                    className="relative h-full w-full cursor-pointer overflow-hidden"
                    onClick={() =>
                      window.open(
                        getWebsiteUrl(items[activeItem].title),
                        "_blank",
                      )
                    }
                  >
                    <motion.iframe
                      key={activeItem}
                      src={
                        PROJECT_URLS[items[activeItem].title] || "about:blank"
                      }
                      className="ourprojects-iframe pointer-events-none h-[220%] w-full origin-top border-0 sm:h-[200%]"
                      initial={{ opacity: 0, y: 0 }}
                      animate={{
                        opacity: 1,
                        y: ["-0%", "-50%", "-0%"],
                      }}
                      transition={{
                        opacity: { duration: 0.8 },
                        y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                      }}
                      sandbox="allow-scripts allow-popups allow-forms"
                    />
                  </motion.div>
                ) : (
                  /* Interactive Screenshot for other projects */
                  <motion.div
                    className="relative h-full w-full cursor-pointer"
                    whileHover="hover"
                    onClick={() =>
                      window.open(
                        getWebsiteUrl(items[activeItem].title),
                        "_blank",
                      )
                    }
                  >
                    <motion.img
                      src={items[activeItem].image}
                      alt={items[activeItem].title}
                      className="h-auto min-h-full w-full object-cover object-top"
                      variants={{
                        hover: { y: -100, scale: 1.05 },
                      }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Click to Visit Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 hover:bg-black/20">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl bg-white/90 px-6 py-3 font-semibold text-gray-900 shadow-xl backdrop-blur-sm"
                      >
                        🔗 Click to Visit Repository
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Dynamic Indicator */}
                <motion.div
                  className={`ourprojects-live-indicator absolute right-4 bottom-4 flex items-center rounded-full px-3 py-2 text-xs font-medium text-white backdrop-blur-sm ${
                    items[activeItem].title === "Awesome GitHub Profile" ||
                    items[activeItem].title === "Machine Learning Repository"
                      ? "bg-green-600/90"
                      : "bg-blue-600/90"
                  }`}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {items[activeItem].title === "Awesome GitHub Profile" ||
                  items[activeItem].title === "Machine Learning Repository" ? (
                    <>
                      <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-300"></div>
                      Auto-scrolling Live Site
                    </>
                  ) : (
                    "👆 Hover & Click to Explore"
                  )}
                </motion.div>

                {/* Holographic Overlay */}
                <div className="ourprojects-overlay pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 3D Floating Background Mockups */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {items.map((item, index) => {
            if (index === activeItem) return null;
            const positions = [
              {
                top: "8%",
                left: "2%",
                rotate: "-15deg",
                scale: "0.25",
                z: "-50px",
              },
              {
                top: "65%",
                left: "5%",
                rotate: "12deg",
                scale: "0.22",
                z: "-30px",
              },
              {
                top: "15%",
                right: "3%",
                rotate: "18deg",
                scale: "0.28",
                z: "-40px",
              },
              {
                bottom: "12%",
                right: "6%",
                rotate: "-10deg",
                scale: "0.20",
                z: "-60px",
              },
            ];
            const pos = positions[index % positions.length];

            return (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, scale: 0, rotateY: -90 }}
                animate={{
                  opacity: 0.3,
                  scale: parseFloat(pos.scale),
                  rotateY: 0,
                }}
                transition={{
                  delay: 1 + index * 0.2,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="absolute transform-gpu"
                style={{
                  ...pos,
                  transform: `rotate(${pos.rotate}) scale(${pos.scale}) translateZ(${pos.z})`,
                  filter: "blur(0.5px)",
                }}
              >
                <motion.div
                  animate={{
                    y: [-5, 5, -5],
                    rotateY: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`h-36 w-56 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-md ${
                    isDark
                      ? "border-purple-500/30 bg-gray-800/70"
                      : "border-blue-400/30 bg-white/70"
                  }`}
                >
                  <div
                    className={`flex h-8 items-center border-b px-3 ${
                      isDark
                        ? "border-gray-600/50 bg-gray-700/80"
                        : "border-gray-300/50 bg-gray-100/80"
                    }`}
                  >
                    <div className="flex space-x-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400 opacity-80"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 opacity-80"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400 opacity-80"></div>
                    </div>
                  </div>
                  <div className="relative h-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default OurProjects;
