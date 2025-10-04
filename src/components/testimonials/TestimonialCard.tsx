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
      return urlObj.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl max-h-[400px] h-[350px] p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
        isDark ? "bg-[#18181b] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar className="w-15 h-15 border border-gray-200 dark:border-gray-700">
          <AvatarImage
            className="w-15 h-15 object-cover "
            src={avatar}
            alt={name}
          />
          <AvatarFallback>{name?.charAt(0) ?? "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-base">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            @{username}
          </p>
        </div>
      </div>

      {/* Content */}
      <p
        className={`mt-4 mb-3 text-sm leading-relaxed ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {content.length > 220 ? content.slice(0, 220) + "..." : content}
      </p>

      {/* Footer */}
      <div
        className={`pt-3 mt-auto border-t text-sm flex flex-col gap-2 ${
          isDark ? "border-gray-700" : "border-gray-100"
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
            className={`truncate max-w-[70%] text-sm font-medium hover:underline ${
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
