import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';

interface TopMateCardProps {
  title: string;
  description: string;
  duration: string;
  profileImage: string;
  username: string;
}

const TopMateCard: React.FC<TopMateCardProps> = ({
  title,
  description,
  duration,
  profileImage,
  username,
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full max-w-md mx-auto rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 ${
        isDark ? 'bg-[#1a1a1a] text-white' : 'bg-white text-black'
      }`}
    >
      {/* Decorative Arrows */}
      <div className="absolute -top-4 -left-4 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-purple-500"
          >
            <ArrowUpRight size={24} className="transform rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              1:1 CALL
            </span>
            <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <Clock size={16} />
              <span className="text-sm">{duration}</span>
            </div>
          </div>
          <button
            className={`text-xl font-semibold ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <span className="sr-only">Close</span>×
          </button>
        </div>

        {/* Title */}
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>

        {/* Description */}
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{description}</p>

        {/* Profile Section */}
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-y-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={profileImage}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
            />
            <div className="flex flex-col">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Book a slot at
              </span>
              <a
                href={`https://topmate.io/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 font-semibold hover:text-purple-600 transition-colors flex items-center gap-1 truncate"
              >
                <span className="truncate">topmate.io/{username}</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {/* Show only the circular icon part of the Topmate logo */}
            <div className="h-4 w-4 overflow-hidden flex-shrink-0 rounded-sm">
              <img
                src="/icons/topmate.png"
                alt="Topmate icon"
                className="h-4 w-auto object-cover object-left opacity-90"
              />
            </div>
            {/* Theme-aware text to ensure readability on dark backgrounds */}
            <span className={`text-sm font-semibold shrink-0 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>topmate</span>
          </div>
        </div>
      </div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 -z-10" />
    </motion.div>
  );
};

export default TopMateCard;
