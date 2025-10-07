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
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-4"
        >
          Live Preview
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
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
          className={`text-lg max-w-2xl mx-auto ${
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
        className={`max-w-7xl mx-auto p-8 rounded-3xl shadow-2xl backdrop-blur-sm ${
          isDark
            ? "bg-gray-900/90 border border-gray-700"
            : "bg-white/90 border border-gray-200"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[700px]">
          {/* Enhanced Sidebar */}
          <div
            className={`lg:col-span-4 ${
              isDark
                ? "bg-gradient-to-b from-gray-800 to-gray-900"
                : "bg-gradient-to-b from-gray-50 to-gray-100"
            } rounded-2xl p-6 overflow-y-auto border ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center mb-6">
              <div
                className={`w-3 h-3 rounded-full bg-green-500 mr-3 animate-pulse`}
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
                  className={`relative p-5 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl transform scale-105"
                      : isDark
                        ? "bg-gray-700/50 hover:bg-gray-600/70 text-gray-200 border border-gray-600"
                        : "bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200"
                  }`}
                >
                  {activeIndex === index && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base mb-2 leading-tight">
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
                      className={`ml-4 w-3 h-3 rounded-full flex-shrink-0 mt-1 ${
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
                      className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Enhanced Main Screen */}
          <div className="lg:col-span-8">
            <div
              className={`h-full rounded-2xl overflow-hidden shadow-2xl border ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Enhanced Browser Header */}
              <div
                className={`flex items-center px-6 py-4 border-b backdrop-blur-sm ${
                  isDark
                    ? "bg-gray-700/80 border-gray-600"
                    : "bg-gray-100/80 border-gray-300"
                }`}
              >
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"></div>
                </div>
                <div
                  className={`flex-1 mx-4 px-4 py-2 rounded-lg text-sm font-mono flex items-center ${
                    isDark
                      ? "bg-gray-600 text-gray-300"
                      : "bg-white text-gray-600 shadow-inner"
                  }`}
                >
                  <span className="text-green-500 mr-2">🔒</span>
                  github.com/recodehive/
                  {items[activeIndex]?.title.toLowerCase().replace(/\s+/g, "-")}
                </div>
                <div
                  className={`px-3 py-1 rounded-md text-xs ${
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
                    className="w-full h-full object-cover"
                  />

                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-white"
                      >
                        <div className="flex items-center mb-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                          <span className="text-sm font-medium text-green-400">
                            Active Project
                          </span>
                        </div>
                        <h3 className="text-3xl font-bold mb-3 leading-tight">
                          {items[activeIndex]?.title}
                        </h3>
                        <p className="text-gray-200 text-base leading-relaxed max-w-2xl">
                          {items[activeIndex]?.description}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white font-medium hover:bg-white/30 transition-all duration-300"
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
