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
  "Stack overflow Analysis": "https://github.com/recodehive/Stackoverflow-Analysis",
  "Scrape ML Project": "https://github.com/recodehive/Scrape-ML-Project",
  "Opensource Project": "https://github.com/recodehive/Opensource-practice",
};

// Projects that support live iframe preview (not GitHub repos due to X-Frame-Options)
const IFRAME_PROJECTS = [
  "Awesome GitHub Profile",
  "Machine Learning Repository",
];

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
        {/* Clean Preview Card */}
        <motion.div
          key={activeItem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative h-full w-full"
        >
          <div
            className={`ourprojects-embed-card h-full min-h-[380px] overflow-hidden rounded-lg border shadow-xl transition-all duration-300 sm:min-h-[430px] sm:rounded-xl md:min-h-[480px] md:hover:shadow-2xl lg:min-h-[580px] lg:rounded-2xl ${isDark
              ? "border-gray-700/50 bg-gray-900 shadow-gray-900/50"
              : "border-gray-200 bg-white shadow-gray-200/50"
              }`}
          >

            {/* Clean Browser Header */}
            <div
              className={`flex items-center justify-between border-b px-3 py-2.5 sm:px-4 sm:py-3 md:px-5 md:py-3.5 ${isDark
                ? "border-gray-700 bg-gray-800/50"
                : "border-gray-200 bg-gray-50"
                }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex gap-1.5 shrink-0">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400 sm:h-3 sm:w-3"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 sm:h-3 sm:w-3"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 sm:h-3 sm:w-3"></div>
                </div>
                <div
                  className={`flex flex-1 items-center overflow-hidden rounded-md px-2 py-1.5 font-mono text-[9px] sm:px-2.5 sm:py-2 sm:text-[10px] md:px-3 md:py-2 md:text-xs ${isDark
                    ? "bg-gray-700/50 text-gray-300"
                    : "bg-white text-gray-700 border border-gray-200"
                    }`}
                >
                  <span className="mr-1.5 text-emerald-500 sm:mr-2">🔒</span>
                  {(() => {
                    const url = getWebsiteUrl(items[activeItem].title);
                    const urlObj = new URL(url);
                    const pathParts = urlObj.pathname.split("/").filter(Boolean);

                    if (urlObj.hostname.includes("github.com")) {
                      return (
                        <>
                          <span className="truncate font-semibold text-blue-500">
                            github.com
                          </span>
                          <span className="mx-0.5 text-gray-400">/</span>
                          <span className="truncate font-bold text-purple-500">
                            {pathParts[0] || "recodehive"}
                          </span>
                          {pathParts[1] && (
                            <>
                              <span className="mx-0.5 text-gray-400">/</span>
                              <span className="truncate font-semibold text-cyan-500">
                                {pathParts[1]}
                              </span>
                            </>
                          )}
                        </>
                      );
                    } else {
                      return (
                        <>
                          <span className="truncate font-semibold text-blue-500">
                            {urlObj.hostname.replace("www.", "")}
                          </span>
                          {pathParts.length > 0 && (
                            <>
                              <span className="mx-0.5 text-gray-400">/</span>
                              <span className="truncate font-semibold text-cyan-500">
                                {pathParts.join("/")}
                              </span>
                            </>
                          )}
                        </>
                      );
                    }
                  })()}
                </div>
              </div>
              {IFRAME_PROJECTS.includes(items[activeItem].title) && (
                <div className={`ml-2 flex items-center gap-1.5 rounded-md px-2 py-1 text-[8px] font-semibold sm:px-2.5 sm:py-1.5 sm:text-[9px] md:px-3 md:text-[10px] ${isDark
                  ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}>
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse sm:h-2 sm:w-2"></div>
                  <span className="hidden sm:inline">LIVE</span>
                </div>
              )}
            </div>

            {/* Preview Content */}
            <div className={`relative h-full overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"}`}>
              <div className="relative h-full w-full">
                {IFRAME_PROJECTS.includes(items[activeItem].title) ? (
                  <div
                    className="relative h-full w-full cursor-pointer overflow-hidden group"
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
                          duration: 10,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                      sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-top-navigation-by-user-activation allow-presentation"
                      allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
                      title={`Preview of ${items[activeItem].title}`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ) : (
                  <div
                    className="relative h-full w-full cursor-pointer group overflow-hidden"
                    onClick={() =>
                      window.open(
                        getWebsiteUrl(items[activeItem].title),
                        "_blank"
                      )
                    }
                  >
                    <motion.img
                      key={activeItem}
                      src={items[activeItem].image}
                      alt={items[activeItem].title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ opacity: { duration: 0.5 } }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="rounded-lg bg-white/95 px-4 py-2.5 font-semibold text-gray-900 shadow-lg backdrop-blur-sm text-sm sm:text-base">
                          🔗 Click to Visit Repository
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OurProjects;
