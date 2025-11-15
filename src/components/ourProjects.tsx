import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { useSafeColorMode } from "../utils/useSafeColorMode";
import "./ourProjects.mobile.css";
// Now uses TS config, not legacy/deprecated APIs.
import projectsData from "../database/projects/projects";

export interface OurProjectsData {
  tag: string;
  title: string;
  description: string;
  items: {
    title: string;
    image: string;
  }[];
}

const PROJECT_URLS: Record<string, string> = {
  "Awesome GitHub Profile":
    "https://recodehive.github.io/awesome-github-profiles/",
  "Machine Learning Repository": "https://machine-learning-repos.vercel.app/",
};

const getWebsiteUrl = (title: string) => {
  return PROJECT_URLS[title] || "https://github.com/recodehive";
};

const OurProjects: React.FC = () => {
  const { isDark } = useSafeColorMode();
  const data: OurProjectsData = projectsData;

  return (
    <section
      className={`flex w-full flex-col items-center gap-8 py-6 transition-colors duration-300 sm:gap-10 sm:py-8 md:gap-12 md:py-10 lg:gap-16 lg:py-12 ${isDark ? "bg-[#0c0c0c] text-white" : "bg-white text-black"
        }`}
      aria-label="Our Projects Section"
    >
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <HeadingComponent
          tag={data.tag}
          title={data.title}
          description={data.description}
          isDark={isDark}
        />
      </div>
      <div className="w-full max-w-7xl px-4 sm:px-6 md:px-8">
        <SelectComponent items={data.items} isDark={isDark} />
      </div>
    </section>
  );
};

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
}) => (
  <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-3 sm:gap-4 md:items-start md:justify-start md:gap-5"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 text-xs font-medium tracking-wide text-white shadow-lg transition-transform duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:px-5 sm:py-2 sm:text-sm md:px-6 md:text-base"
        onClick={() =>
          (window.location.href = "https://github.com/recodehive")
        }
        aria-label="Visit RecodeHive GitHub"
      >
        {tag}
      </motion.button>
      <h2
        className={`bg-gradient-to-r bg-clip-text text-center text-2xl font-bold leading-tight text-transparent sm:text-3xl md:w-full md:text-left md:text-4xl lg:text-5xl xl:text-6xl ${isDark
          ? "from-white via-gray-300 to-white"
          : "from-black via-gray-700 to-black"
          }`}
      >
        {title}
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${isDark ? "text-gray-300" : "text-gray-700"
        } flex h-full items-center justify-center text-justify text-sm leading-relaxed sm:text-base md:items-start md:justify-start md:pr-4 lg:text-lg lg:pr-8`}
    >
      <p>{description}</p>
    </motion.div>
  </div>
);

const SelectComponent = ({
  items,
  isDark,
}: {
  items: { title: string; image: string }[];
  isDark: boolean;
}) => {
  const [activeItem, setActiveItem] = useState(0);

  // For demo, if more fields are needed in OurProjectsData, adapt.
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="grid w-full grid-cols-1 gap-0 overflow-hidden rounded-xl shadow-2xl sm:rounded-2xl md:grid-cols-12 md:gap-0 lg:rounded-3xl"
    >
      <div
        className={`no-scrollbar col-span-1 flex flex-row items-start justify-start gap-2.5 overflow-x-auto overscroll-x-contain p-3 sm:gap-3 sm:p-4 md:col-span-4 md:min-h-[500px] md:max-h-[600px] md:flex-col md:gap-3 md:overflow-y-auto md:overflow-x-hidden md:p-5 lg:gap-4 lg:p-6 ${isDark ? "bg-black/95" : "bg-gray-100/95"
          }`}
      >
        {items.map((item, index) => (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={item.title}
            onClick={() => setActiveItem(index)}
            className={`relative flex min-w-[140px] shrink-0 touch-manipulation select-none rounded-lg p-3 text-left transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:min-w-[160px] sm:p-3.5 md:min-w-0 md:w-full md:rounded-r-full md:p-4 lg:p-5 ${activeItem === index
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : isDark
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            aria-pressed={activeItem === index}
            aria-label={`Select ${item.title} project`}
          >
            <span className="text-xs font-semibold leading-tight sm:text-sm md:w-10/12 md:text-base lg:text-lg">
              {item.title}
            </span>
            <span
              className={`absolute top-1/2 right-2 -translate-y-1/2 rounded-full transition-transform duration-300 sm:right-3 md:right-4 ${activeItem === index ? "translate-x-1 sm:translate-x-2" : ""
                }`}
              aria-hidden="true"
            >
              <ChevronRight className="hidden h-4 w-4 sm:h-5 sm:w-5 md:block md:h-6 md:w-6 lg:h-7 lg:w-7" />
            </span>
          </motion.button>
        ))}
      </div>

      <div className="ourprojects-embed-container relative col-span-1 min-h-[400px] overflow-hidden p-2 sm:min-h-[450px] sm:p-2.5 md:col-span-8 md:min-h-[500px] md:p-4 lg:min-h-[600px] lg:p-6">
        {/* Animated Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-600/30 to-cyan-500/30">
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
          className="absolute top-4 right-4 hidden h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shadow-2xl backdrop-blur-sm sm:top-6 sm:right-6 sm:h-14 sm:w-14 sm:rounded-2xl md:flex md:top-8 md:right-8 md:h-16 md:w-16"
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
          className="absolute top-16 left-4 hidden h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 shadow-xl backdrop-blur-sm sm:top-20 sm:left-6 sm:h-12 sm:w-12 sm:rounded-xl md:flex md:left-8"
        >
          <span className="text-base text-white sm:text-lg md:text-xl">⚡</span>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute right-12 bottom-16 hidden h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600 shadow-lg backdrop-blur-sm sm:right-14 sm:bottom-20 sm:h-10 sm:w-10 md:flex md:right-16 md:bottom-20"
        >
          <span className="text-xs text-white sm:text-sm">🚀</span>
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
            className={`md:hover:rotateY-5 group ourprojects-embed-card h-full min-h-[380px] transform overflow-hidden rounded-lg border-2 shadow-2xl backdrop-blur-md transition-all duration-700 sm:min-h-[430px] sm:rounded-xl md:min-h-[480px] md:hover:scale-[1.02] lg:min-h-[580px] lg:rounded-2xl ${isDark
              ? "border-purple-500/50 bg-gray-900/95 shadow-purple-500/25"
              : "border-blue-400/50 bg-white/95 shadow-blue-500/25"
              }`}
          >
            {/* Holographic Border Effect */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-20 blur transition-opacity duration-500 group-hover:opacity-40"></div>

            {/* Premium Browser Header */}
            <div
              className={`relative flex items-center border-b px-2.5 py-2 backdrop-blur-xl sm:px-3 sm:py-2.5 md:px-4 md:py-3 lg:px-5 lg:py-3.5 ${isDark
                ? "border-gray-600/50 bg-gray-800/90"
                : "border-gray-300/50 bg-gray-50/90"
                }`}
            >
              <div className="mr-2 flex space-x-1.5 sm:mr-3 sm:space-x-2 md:mr-4 md:space-x-2.5">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-red-300 opacity-20"></div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -180 }}
                  className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-yellow-300 opacity-20"></div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="relative h-2.5 w-2.5 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 shadow-lg sm:h-3 sm:w-3 md:h-3.5 md:w-3.5"
                >
                  <div className="absolute inset-0 animate-ping rounded-full bg-green-300 opacity-20"></div>
                </motion.div>
              </div>

              <div
                className={`relative flex flex-1 items-center overflow-hidden rounded-lg px-2 py-1.5 font-mono text-[9px] backdrop-blur-sm sm:rounded-xl sm:px-2.5 sm:py-2 sm:text-[10px] md:rounded-xl md:px-3 md:py-2 md:text-xs ${isDark
                  ? "border border-gray-500/50 bg-gray-700/70 text-gray-200"
                  : "border border-gray-300/50 bg-white/80 text-gray-700 shadow-inner"
                  }`}
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mr-1.5 text-xs text-emerald-500 sm:mr-2 sm:text-sm md:text-base"
                >
                  🔒
                </motion.span>
                <span className="truncate font-semibold text-blue-500">
                  github.com
                </span>
                <span className="mx-0.5 text-gray-400">/</span>
                <span className="truncate font-bold text-purple-500">
                  recodehive
                </span>
                <span className="mx-0.5 text-gray-400">/</span>
                <motion.span
                  key={activeItem}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="truncate font-semibold text-cyan-500"
                >
                  {items[activeItem].title.toLowerCase().replace(/\s+/g, "-")}
                </motion.span>
              </div>

              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`ml-1.5 flex items-center rounded-md px-1.5 py-0.5 text-[7px] font-bold backdrop-blur-sm sm:ml-2 sm:rounded-lg sm:px-2 sm:py-1 sm:text-[8px] md:ml-2.5 md:px-2.5 md:py-1 md:text-[10px] lg:ml-3 lg:px-3 lg:py-1.5 lg:text-xs ${isDark
                  ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                  : "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 shadow-md"
                  }`}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mr-1 h-1 w-1 rounded-full bg-emerald-400 sm:mr-1.5 sm:h-1.5 sm:w-1.5 md:h-2 md:w-2"
                ></motion.div>
                LIVE
              </motion.div>
            </div>

            {/* Screenshot or Live Site */}
            <div className="relative h-full bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
              <motion.div
                initial={{ opacity: 0, scale: 1.1, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="group relative h-full overflow-hidden"
              >
                {items[activeItem].title === "Awesome GitHub Profile" ||
                  items[activeItem].title === "Machine Learning Repository" ? (
                  <motion.div
                    className="relative h-full w-full cursor-pointer overflow-hidden"
                    onClick={() =>
                      window.open(
                        getWebsiteUrl(items[activeItem].title),
                        "_blank"
                      )
                    }
                  >
                    <motion.iframe
                      key={activeItem}
                      src={
                        PROJECT_URLS[items[activeItem].title] || "about:blank"
                      }
                      className="ourprojects-iframe pointer-events-none h-[220%] w-full origin-top border-0 sm:h-[210%] md:h-[200%]"
                      initial={{ opacity: 0, y: 0 }}
                      animate={{
                        opacity: 1,
                        y: ["-0%", "-50%", "-0%"],
                      }}
                      transition={{
                        opacity: { duration: 0.8 },
                        y: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                      sandbox="allow-scripts allow-popups allow-forms"
                      title={`Preview of ${items[activeItem].title}`}
                      loading="lazy"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    className="relative h-full w-full cursor-pointer"
                    whileHover="hover"
                    onClick={() =>
                      window.open(
                        getWebsiteUrl(items[activeItem].title),
                        "_blank"
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
                  className={`ourprojects-live-indicator absolute right-2 bottom-2 flex items-center rounded-full px-2 py-1 text-[9px] font-medium text-white backdrop-blur-sm sm:right-2.5 sm:bottom-2.5 sm:px-2.5 sm:py-1.5 sm:text-[10px] md:right-3 md:bottom-3 md:px-3 md:py-2 md:text-xs ${items[activeItem].title === "Awesome GitHub Profile" ||
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
                      <div className="mr-1 h-1 w-1 animate-pulse rounded-full bg-green-300 sm:mr-1.5 sm:h-1.5 sm:w-1.5 md:h-2 md:w-2"></div>
                      <span className="hidden md:inline">
                        Auto-scrolling Live Site
                      </span>
                      <span className="md:hidden">Live</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden md:inline">
                        👆 Hover & Click to Explore
                      </span>
                      <span className="md:hidden">👆 Tap</span>
                    </>
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
                key={item.title}
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
                  className={`h-36 w-56 overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-md ${isDark
                    ? "border-purple-500/30 bg-gray-800/70"
                    : "border-blue-400/30 bg-white/70"
                    }`}
                >
                  <div
                    className={`flex h-8 items-center border-b px-3 ${isDark
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
