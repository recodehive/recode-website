import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { useColorMode } from "@docusaurus/theme-common";

interface TopMateCardProps {
  title: string;
  description: string;
  duration: string;
  profileImage: string;
  username: string;
  setShowTopmate: (value: boolean) => void;
}

const TopMateCard: React.FC<TopMateCardProps> = ({
  title,
  description,
  duration,
  profileImage,
  username,
  setShowTopmate,
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`group relative w-full mx-auto rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 min-h-[365px] flex flex-col overflow-hidden ${
        isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-black"
      }`}
    >
      {/* Gradient Overlay - Shows on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none hover:cursor-pointer" />

      {/* Card Content */}
      <div className="p-6 sm:p-8 flex flex-col h-full">
        {/* Header - Badge and Close Button */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark ? "bg-purple-500/10" : "bg-purple-50"
              }`}
            >
              <Clock size={14} className="sm:w-4 sm:h-4" />
              <span className={`text-xs sm:text-sm font-medium ${
                isDark ? "text-purple-300" : "text-purple-700"
              }`}>
                {duration}
              </span>
            </div>
          </div>
          <button
            className={`p-1 rounded-full transition-all hover:rotate-90 ${
              isDark
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => setShowTopmate(false)}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Title */}
        <h2
          className={`text-xl sm:text-2xl font-bold mb-3 leading-tight ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>

        {/* Description */}
        <p className={`text-sm sm:text-base leading-relaxed flex-grow ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}>
          {description}
        </p>

        {/* Profile Section */}
        <div className={`mt-6 pt-4 sm:pt-5 border-t ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-purple-500/20 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className={`text-xs mb-1 ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}>
                Book your session
              </p>
              <a
                href={`https://topmate.io/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`group inline-flex items-center gap-1.5 font-semibold hover:gap-2 transition-all ${
                  isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
                }`}
              >
                <span className="text-sm sm:text-base">topmate.io/{username}</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopMateCard;
