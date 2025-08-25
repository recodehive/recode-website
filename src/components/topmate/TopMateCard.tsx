import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Clock, 
  Video, 
  Star, 
  Users, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  Sparkles,
  MessageCircle,
  Zap,
  Award
} from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    "Personalized guidance",
    "Career roadmap",
    "Code review",
    "Interview prep"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-3xl 2xl:max-w-xl mx-auto group cursor-pointer`}
    >
      {/* Main Card Container */}
      <motion.div
        className={`relative w-full rounded-3xl overflow-hidden transition-all duration-500 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90' 
            : 'bg-gradient-to-br from-white/90 via-gray-50/90 to-white/90'
        } backdrop-blur-xl border ${
          isDark 
            ? 'border-gray-700/50' 
            : 'border-gray-200/50'
        } shadow-2xl`}
        whileHover={{ 
          y: -8,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        style={{
          boxShadow: isDark
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.2)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-tr from-pink-500/20 to-orange-500/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-8 right-8 text-blue-400/30"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles size={24} />
          </motion.div>
          
          <motion.div
            className="absolute bottom-8 left-8 text-purple-400/30"
            animate={{
              y: [0, 10, 0],
              rotate: [360, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Award size={20} />
          </motion.div>
        </div>

        {/* Glowing Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6)',
            backgroundSize: '400% 400%',
            opacity: 0,
          }}
          animate={{
            opacity: isHovered ? 0.3 : 0,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            opacity: { duration: 0.4 },
            backgroundPosition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Call Type Badge */}
              <motion.div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  isDark 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                    : 'bg-blue-100 text-blue-600 border border-blue-200'
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Video size={16} />
                <span>1:1 CALL</span>
              </motion.div>
              
              {/* Duration */}
              <motion.div
                className={`flex items-center gap-1 text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Clock size={16} />
                <span>{duration}</span>
              </motion.div>
            </div>

            {/* Rating */}
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Star size={16} className="text-yellow-400 fill-current" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                4.9
              </span>
            </motion.div>
          </div>

          {/* Title Section */}
          <motion.h2 
            className={`text-2xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p 
            className={`text-sm leading-relaxed mb-6 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* Features List */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center gap-2 text-xs ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <CheckCircle size={12} className="text-green-500" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-4">
              {/* Enhanced Avatar */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute inset-0 rounded-full blur-lg opacity-60 ${
                  isHovered 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
                    : 'bg-gradient-to-r from-blue-400 to-purple-400'
                } transition-all duration-500`} />
                <div className={`absolute inset-0 rounded-full ring-2 ring-offset-2 ${
                  isHovered 
                    ? 'ring-blue-500/50 ring-offset-blue-500/20' 
                    : 'ring-purple-500/30 ring-offset-purple-500/10'
                } transition-all duration-300`} />
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/30 shadow-lg relative z-10"
                />
              </motion.div>

              {/* Profile Info */}
              <div className="flex flex-col">
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Book a slot at
                </span>
                <motion.a
                  href={`https://topmate.io/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-semibold hover:text-blue-400 transition-colors flex items-center gap-1 group/link"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  topmate.io/{username}
                  <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </motion.a>
              </div>
            </div>

            {/* Topmate Logo */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src="/icons/topmate.png"
                alt="Topmate"
                className="h-6 w-auto opacity-80"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Gradient Bar */}
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Hover Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              className={`absolute top-4 right-4 p-3 rounded-full ${
                isDark 
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
                  : "bg-blue-100 text-blue-600 border border-blue-200"
              } hover:scale-110 transition-all duration-200 shadow-lg`}
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MessageCircle size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute -top-4 -left-4 flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10, rotate: -45 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: i * 0.1 + 0.6 }}
            className="text-purple-500"
          >
            <ArrowUpRight size={20} className="transform rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* Success Indicator */}
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
      >
        <CheckCircle size={12} className="text-white" />
      </motion.div>
    </motion.div>
  );
};

export default TopMateCard;
