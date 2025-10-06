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
      className={`rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between ${
        isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-3 ">
        <Avatar className="w-16 h-16 rounded-full">
          <AvatarImage src={avatar} className="object-cover" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="box-border p-0 m-0">
          <h3
            className={`font-semibold text-base ${
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
        className={`line-clamp-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {content.length > 100 ? content.slice(0, 99) + "..." : content}
      </p>

      {/* Footer with Hashtags and Date */}
      <div
        className={`flex flex-col gap-2 text-sm border-t ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        {/* Hashtags */}
        <div className="flex gap-2 flex-wrap">
          {content
            .match(/#\w+/g)
            ?.slice(0, 3)
            .map((hashtag, index) => (
              <span
                key={index}
                className="text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                {hashtag}
              </span>
            ))}
        </div>

        {/* Link and Date Row */}
        <div className="flex items-center justify-between mt-1">
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
