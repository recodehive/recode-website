import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useColorMode } from "@docusaurus/theme-common";
import { Quote, ExternalLink, Calendar, MapPin } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  username: string;
  content: string;
  date: string;
  avatar: string;
  rating?: number;
  role?: string;
  company?: string;
  location?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  username,
  content,
  date,
  avatar,
  rating = 5,
  role,
  company,
  location,
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 2,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group h-auto md:h-[420px] cursor-pointer`}
    >
      {/* Enhanced 3D Card Container */}
      <motion.div
        className={`relative w-full h-full rounded-3xl p-6 md:p-8 transition-all duration-700`}
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.95))',
          backdropFilter: 'blur(20px)',
          border: isDark 
            ? '1px solid rgba(75, 85, 99, 0.4)' 
            : '1px solid rgba(229, 231, 235, 0.6)',
          boxShadow: isDark
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.15)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.08)'
        }}
      >
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl hidden md:block">
          <motion.div
            className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-pink-500/30 to-orange-500/30 rounded-full blur-lg"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full blur-md"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.4, 0.1],
              x: [-20, 20, -20],
              y: [-10, 10, -10],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Glowing border on hover removed per feedback */}

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Enhanced Header Section */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Enhanced Avatar with Glow and Ring */}
              <motion.div
                className="relative"
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute inset-0 rounded-full blur-lg opacity-70 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-500`} />
                <div className={`absolute inset-0 rounded-full ring-2 ring-offset-2 ring-purple-500/30 ring-offset-purple-500/10 transition-all duration-300`} />
                <Avatar className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/30 shadow-xl relative z-10">
                  <AvatarImage src={avatar} className="object-cover" />
                  <AvatarFallback className={`text-lg font-bold ${
                    isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700"
                  }`}>
                    {name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Enhanced User Info */}
              <div className="flex-1">
                <motion.h3 
                  className={`font-bold text-lg md:text-xl mb-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {name}
                </motion.h3>
                {role && (
                  <motion.p 
                    className={`text-sm md:text-base font-semibold mb-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {role}
                  </motion.p>
                )}
                {company && (
                  <motion.p 
                    className={`text-sm flex items-center gap-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="w-1 h-1 bg-current rounded-full"></span>
                    {company}
                  </motion.p>
                )}
                {location && (
                  <motion.p 
                    className={`text-xs flex items-center gap-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <MapPin size={10} />
                    {location}
                  </motion.p>
                )}
                <motion.p 
                  className={`text-xs flex items-center gap-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="w-1 h-1 bg-current rounded-full"></span>
                  @{username}
                </motion.p>
              </div>
            </div>

            {/* Enhanced Quote Icon */}
            <motion.div
              className={`text-4xl opacity-20 group-hover:opacity-50 transition-opacity duration-300 ${
                isDark ? "text-blue-300" : "text-blue-500"
              }`}
              animate={{
                rotate: isHovered ? [0, 15, -15, 0] : 0,
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.6 }}
            >
              <Quote />
            </motion.div>
          </div>

          {/* Enhanced Rating Stars */}
          <motion.div 
            className="flex items-center gap-1 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.svg
                key={index}
                className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.3, rotate: 10 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
            <motion.span 
              className={`ml-2 text-xs md:text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {rating}.0
            </motion.span>
          </motion.div>

          {/* Enhanced Content */}
          <motion.div 
            className="flex-1 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className={`text-sm leading-relaxed line-clamp-5 md:line-clamp-6 ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}>
              "{content}"
            </p>
          </motion.div>

          {/* Enhanced Footer */}
          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className={`flex items-center justify-between text-xs pt-4 border-t ${
              isDark ? "border-gray-700/50" : "border-gray-200/50"
            }`}>
              {/* Enhanced Hashtags */}
              <div className="flex gap-2 flex-wrap">
                <AnimatePresence>
                  {content.match(/#\w+/g)?.map((hashtag, index) => (
                    <motion.span
                      key={index}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        isDark 
                          ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border border-blue-500/30" 
                          : "bg-blue-100 text-blue-600 hover:bg-blue-200 border border-blue-200"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {hashtag}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>

              {/* Enhanced Date */}
              <motion.div 
                className={`flex items-center gap-1 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Calendar size={12} />
                {date}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Hover overlay removed per feedback */}

        {/* Floating Action Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              className={`absolute top-4 right-4 p-2 rounded-full ${
                isDark 
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                  : "bg-blue-100 text-blue-600 border border-blue-200"
              } hover:scale-110 transition-all duration-200`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
