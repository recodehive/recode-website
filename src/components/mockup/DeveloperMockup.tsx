import React, { useState } from "react";
import { motion } from "framer-motion";
import { useColorMode } from "@docusaurus/theme-common";

interface MockupItem {
  title: string;
  image: string;
  description: string;
}

interface DeveloperMockupProps {
  items: MockupItem[];
}

const DeveloperMockup: React.FC<DeveloperMockupProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <div className="w-full py-16">
      {/* Section Header */}
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-sm font-medium text-white"
        >
          Live Preview
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl ${
            isDark
              ? "from-white via-gray-300 to-white"
              : "from-black via-gray-700 to-black"
          }`}
        >
          Interactive Project Showcase
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mx-auto max-w-2xl text-lg ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Explore our featured projects with live previews and detailed insights
        </motion.p>
      </div>

      {/* Mockup Container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`mx-auto max-w-7xl rounded-3xl p-8 shadow-2xl backdrop-blur-sm ${
          isDark
            ? "border border-gray-700 bg-gray-900/90"
            : "border border-gray-200 bg-white/90"
        }`}
      >
        <div className="grid h-[700px] grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Enhanced Sidebar */}
          <div
            className={`lg:col-span-4 ${
              isDark
                ? "bg-gradient-to-b from-gray-800 to-gray-900"
                : "bg-gradient-to-b from-gray-50 to-gray-100"
            } overflow-y-auto rounded-2xl border p-6 ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="mb-6 flex items-center">
              <div
                className={`mr-3 h-3 w-3 animate-pulse rounded-full bg-green-500`}
              ></div>
              <h3
                className={`text-xl font-bold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Featured Projects
              </h3>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveIndex(index)}
                  className={`relative cursor-pointer overflow-hidden rounded-xl p-5 transition-all duration-300 ${
                    activeIndex === index
                      ? "scale-105 transform bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl"
                      : isDark
                        ? "border border-gray-600 bg-gray-700/50 text-gray-200 hover:bg-gray-600/70"
                        : "border border-gray-200 bg-white text-gray-700 shadow-md hover:bg-gray-50"
                  }`}
                >
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="mb-2 text-base leading-tight font-semibold">
                        {item.title}
                      </h4>
                      <p
                        className={`text-sm leading-relaxed ${
                          activeIndex === index
                            ? "text-blue-100"
                            : isDark
                              ? "text-gray-400"
                              : "text-gray-500"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                    <div
                      className={`mt-1 ml-4 h-3 w-3 flex-shrink-0 rounded-full ${
                        activeIndex === index
                          ? "bg-white shadow-lg"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>

                  {activeIndex === index && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="absolute bottom-0 left-0 h-1 rounded-full bg-white/30"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Main Screen */}
          <div className="lg:col-span-8">
            <div
              className={`h-full overflow-hidden rounded-2xl border shadow-2xl ${
                isDark
                  ? "border-gray-700 bg-gray-800"
                  : "border-gray-200 bg-white"
              }`}
            >
              {/* Enhanced Browser Header */}
              <div
                className={`flex items-center border-b px-6 py-4 backdrop-blur-sm ${
                  isDark
                    ? "border-gray-600 bg-gray-700/80"
                    : "border-gray-300 bg-gray-100/80"
                }`}
              >
                <div className="mr-4 flex space-x-2">
                  <div className="h-3 w-3 cursor-pointer rounded-full bg-red-500 transition-colors hover:bg-red-400"></div>
                  <div className="h-3 w-3 cursor-pointer rounded-full bg-yellow-500 transition-colors hover:bg-yellow-400"></div>
                  <div className="h-3 w-3 cursor-pointer rounded-full bg-green-500 transition-colors hover:bg-green-400"></div>
                </div>
                <div
                  className={`mx-4 flex flex-1 items-center rounded-lg px-4 py-2 font-mono text-sm ${
                    isDark
                      ? "bg-gray-600 text-gray-300"
                      : "bg-white text-gray-600 shadow-inner"
                  }`}
                >
                  <span className="mr-2 text-green-500">🔒</span>
                  github.com/recodehive/
                  {items[activeIndex]?.title.toLowerCase().replace(/\s+/g, "-")}
                </div>
                <div
                  className={`rounded-md px-3 py-1 text-xs ${
                    isDark
                      ? "bg-green-600 text-white"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  Live
                </div>
              </div>

              {/* Enhanced Screenshot Display */}
              <div className="relative h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative h-full"
                >
                  <img
                    src={items[activeIndex]?.image}
                    alt={items[activeIndex]?.title}
                    className="h-full w-full object-cover"
                  />

                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute right-0 bottom-0 left-0 p-8">
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-white"
                      >
                        <div className="mb-3 flex items-center">
                          <div className="mr-3 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                          <span className="text-sm font-medium text-green-400">
                            Active Project
                          </span>
                        </div>
                        <h3 className="mb-3 text-3xl leading-tight font-bold">
                          {items[activeIndex]?.title}
                        </h3>
                        <p className="max-w-2xl text-base leading-relaxed text-gray-200">
                          {items[activeIndex]?.description}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4 rounded-lg border border-white/30 bg-white/20 px-6 py-2 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
                        >
                          View Project →
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeveloperMockup;
