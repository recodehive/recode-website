import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSafeColorMode } from "../../utils/useSafeColorMode";

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
  const { colorMode, isDark } = useSafeColorMode();

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
      className={`flex h-[250px] flex-col justify-between rounded-2xl p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl ${
        isDark ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header with Avatar and Name */}
      <div className="flex items-center gap-4">
        <Avatar className="h-24 w-24 rounded-full">
          <AvatarImage src={avatar} className="object-contain" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3
            className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
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
        className={`my-4 line-clamp-3 flex-grow ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {content}
      </p>

      {/* Footer with Hashtags and Date */}
      <div
        className={`flex flex-col gap-2 border-t pt-2 text-sm ${
          isDark ? "border-gray-700" : "border-gray-100"
        }`}
      >
        {/* Hashtags */}
        <div className="flex flex-wrap gap-2">
          {content.match(/#\w+/g)?.map((hashtag, index) => (
            <span
              key={index}
              className="cursor-pointer text-blue-500 hover:text-blue-600"
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
            className={`cursor-pointer hover:underline ${
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
