import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useColorMode } from "@docusaurus/theme-common";

interface TestimonialCardProps {
  name: string;
  username: string;
  content: string;
  date: string;
  avatar: string;
  link: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  username,
  content,
  date,
  avatar,
  link,
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  // Function to format the link display
  const formatLinkDisplay = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch {
      // If URL parsing fails, return the original link
      return url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-full min-h-[380px] flex flex-col ${
        isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <Avatar className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex-shrink-0 border-2 border-purple-200">
          <AvatarImage src={avatar} className="object-contain" />
          <AvatarFallback className={isDark ? "bg-gray-700" : "bg-gray-200"}>CN</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h3 className={`font-bold text-base sm:text-lg leading-tight truncate ${isDark ? "text-white" : "text-gray-900"}`}>
            {name}
          </h3>
          <p className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            @{username}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className={`line-clamp-4 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 flex-grow ${
        isDark ? "text-gray-300" : "text-gray-600"
      }`}>
        {content}
      </p>

      {/* Footer with Hashtags and Date */}
      <div
        className={`flex flex-col gap-2 sm:gap-3 text-xs sm:text-sm pt-3 sm:pt-4 border-t ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {/* Hashtags */}
        <div className="flex gap-2 flex-wrap">
          {content.match(/#\w+/g)?.map((hashtag, index) => (
            <span
              key={index}
              className={`font-medium transition-colors ${
                isDark
                  ? "text-purple-400 hover:text-purple-300"
                  : "text-purple-600 hover:text-purple-700"
              }`}
            >
              {hashtag}
            </span>
          ))}
        </div>

        {/* Link and Date Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-medium hover:underline cursor-pointer transition-colors truncate ${
              isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-600 hover:text-purple-700"
            }`}
          >
            {formatLinkDisplay(link)}
          </a>
          <span className={`text-xs sm:text-sm shrink-0 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{date}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
