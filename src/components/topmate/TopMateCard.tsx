import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar, Star } from "lucide-react";
import { useSafeColorMode } from "../../utils/useSafeColorMode";

interface TopMateCardProps {
  title: string;
  description: string;
  duration: string;
  profileImage: string;
  username: string;
  setShowTopmate: (value: boolean) => void;
}

const TopMateCard: React.FC<TopMateCardProps> = ({
  title,
  description,
  duration,
  profileImage,
  username,
  setShowTopmate,
}) => {
  const { colorMode, isDark } = useSafeColorMode();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={`group relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
        isDark 
          ? "border-gray-700/50 bg-gray-900/80 shadow-xl" 
          : "border-gray-200/50 bg-white/80 shadow-lg"
      }`}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      
      {/* Floating Elements */}
      <div className="absolute -top-2 -right-2 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 blur-xl" />
      <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-gradient-to-tr from-green-400/20 to-blue-600/20 blur-xl" />

      <div className="relative p-8">
        {/* Header Badge */}
        <div className="mb-6 flex items-center justify-between">
          <div className={`flex items-center gap-3 rounded-full px-4 py-2 ${
            isDark ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50 border border-blue-200"
          }`}>
            <Calendar size={16} className="text-blue-500" />
            <span className={`text-sm font-medium ${
              isDark ? "text-blue-400" : "text-blue-600"
            }`}>
              1:1 MENTORSHIP
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Clock size={14} />
              <span className="text-xs font-medium">{duration}</span>
            </div>
          </div>
          <button
            onClick={() => setShowTopmate(false)}
            className={`rounded-full p-2 transition-colors ${
              isDark 
                ? "hover:bg-gray-700 text-gray-400 hover:text-gray-200" 
                : "hover:bg-gray-100 text-gray-500 hover:text-gray-700"
            }`}
          >
            <ArrowUpRight size={18} className="rotate-45" />
          </button>
        </div>

        {/* Title */}
        <h2 className={`mb-4 text-3xl font-bold leading-tight ${
          isDark ? "text-white" : "text-gray-900"
        }`}>
          {title}
        </h2>

        {/* Description */}
        <p className={`mb-8 text-lg leading-relaxed ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}>
          {description}
        </p>

        {/* Profile Section */}
        <div className={`rounded-xl border p-4 ${
          isDark ? "border-gray-700/50 bg-gray-800/30" : "border-gray-200/50 bg-gray-50/50"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-14 w-14 rounded-full border-2 border-gradient-to-r from-blue-500 to-purple-500 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}>
                  Book your session at
                </p>
                <a
                  href={`https://topmate.io/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-2 font-semibold text-blue-500 transition-colors hover:text-blue-600"
                >
                  <span>topmate.io/{username}</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className={`text-xs ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}>
                5.0 rating
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.a
          href={`https://topmate.io/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-blue-700 hover:to-purple-700"
        >
          <Calendar size={18} />
          <span>Schedule Now</span>
          <ArrowUpRight size={18} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default TopMateCard;