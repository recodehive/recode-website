// prettier-ignore
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

  const formatLinkDisplay = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch {
      return url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between  h-full ${
        isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 flex-shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="w-full h-[180px] overflow-hidden object-cover rounded-full"
                loading="lazy"
              />
            ) : (
              <span className="text-sm font-semibold">
                {name?.charAt(0)?.toUpperCase() ?? "U"}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <h3
            className={`font-semibold text-lg leading-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {name}
          </h3>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            @{username}
          </p>
        </div>
      </div>

      {/* Content */}
      <p
        className={`text-sm line-clamp-4 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {content.length > 111 ? content.slice(0, 111) + "..." : content}
      </p>

      {/* Footer */}
      <div
        className={`pt-1 border-t text-sm flex flex-col gap-2 ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {/* Hashtags */}
        {content.match(/#\w+/g) && (
          <div className="flex flex-wrap gap-2">
            {content
              .match(/#\w+/g)
              ?.slice(0, 3)
              .map((tag, i) => (
                <span
                  key={i}
                  className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                    isDark
                      ? "bg-blue-900/40 text-blue-300"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {tag}
                </span>
              ))}
          </div>
        )}

        {/* Link and Date */}
        <div className="flex items-center justify-between">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`truncate max-w-[70%] hover:underline cursor-pointer ${
              isDark
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            {formatLinkDisplay(link)}
          </a>
          <span
            className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            {date}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
