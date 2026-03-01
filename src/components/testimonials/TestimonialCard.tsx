import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSafeColorMode } from "../../utils/useSafeColorMode";
import { ExternalLink, Quote } from "lucide-react";

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
  const { isDark } = useSafeColorMode();

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`group relative h-full overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-2xl ${
        isDark 
          ? "border-gray-700/50 bg-gray-900/80 shadow-xl" 
          : "border-gray-200/50 bg-white/90 shadow-lg"
      }`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5" />
      
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-20">
        <Quote size={32} className="text-purple-500" />
      </div>

      <div className="relative flex h-full flex-col p-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-br from-purple-500/35 via-fuchsia-500/25 to-blue-500/35 blur-md" />
            <Avatar className="relative z-10 h-20 w-20 overflow-hidden border border-white/70 bg-white/70 shadow-[0_10px_30px_-12px_rgba(147,51,234,0.7)] ring-2 ring-purple-300/50">
              <AvatarImage src={avatar} className="h-full w-full scale-300 object-cover object-center" />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}>
              {name}
            </h3>
            <p className={`text-sm ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              @{username}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className={`text-base leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}>
            {content.replace(/#\w+/g, '').trim()}
          </p>
        </div>

        {/* Footer */}
        <div className={`mt-6 space-y-4 border-t pt-4 ${
          isDark ? "border-gray-700/50" : "border-gray-200/50"
        }`}>
          {/* Hashtags */}
          <div className="flex flex-wrap gap-2">
            {content.match(/#\w+/g)?.map((hashtag, index) => (
              <span
                key={index}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors hover:scale-105 ${
                  isDark
                    ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                {hashtag}
              </span>
            ))}
          </div>

          {/* Link and Date */}
          <div className="flex items-center justify-between">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link flex items-center gap-2 text-sm font-medium transition-colors ${
                isDark
                  ? "text-purple-400 hover:text-purple-300"
                  : "text-purple-600 hover:text-purple-700"
              }`}
            >
              <span className="truncate">{formatLinkDisplay(link)}</span>
              <ExternalLink size={14} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>
            <span className={`text-xs ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}>
              {date}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
           style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }} />
    </motion.div>
  );
};

export default TestimonialCard;