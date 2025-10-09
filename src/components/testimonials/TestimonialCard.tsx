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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-[250px] flex flex-col justify-between ${
        isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-4">
        <Avatar className="w-24 h-24 rounded-full">
          <AvatarImage src={avatar} className="object-contain" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3
            className={`font-semibold text-lg ${isDark ? "text-white" : "text-gray-900"}`}
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
        className={`line-clamp-3 my-4 flex-grow ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {content}
      </p>

      {/* Footer with Hashtags and Date */}
      <div
        className={`flex flex-col gap-2 text-sm pt-2 border-t ${
          isDark ? "border-gray-700" : "border-gray-100"
        }`}
      >
        {/* Hashtags */}
        <div className="flex gap-2 flex-wrap">
          {content.match(/#\w+/g)?.map((hashtag, index) => (
            <span
              key={index}
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
            >
              {hashtag}
            </span>
          ))}
        </div>

        {/* Link and Date Row */}
        <div className="flex items-center justify-between">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline cursor-pointer ${
              isDark
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            {formatLinkDisplay(link)}
          </a>
          <span className={isDark ? "text-gray-500" : "text-gray-400"}>
            {date}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
