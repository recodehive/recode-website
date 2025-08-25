import React from "react";
import { motion } from "framer-motion";
import TopMateCard from "./TopMateCard";
import { useColorMode } from "@docusaurus/theme-common";
import { Video, Users, Clock, Star, ArrowRight, Sparkles } from "lucide-react";

const TopMateSection = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const profileData = {
    title: "1:1 Mentorship Call",
    description: "Book a slot, Free for Hive Community Members",
    duration: "30 mins",
    profileImage: "/sanjay.png",
    username: "sanjaykv",
  };

  const stats = [
    { icon: Users, value: "500+", label: "Students Mentored" },
    { icon: Star, value: "4.9★", label: "Average Rating" },
    { icon: Clock, value: "1000+", label: "Hours of Mentorship" },
  ];

  return (
    <motion.div
      className="px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Enhanced Header Section */}
        <motion.div
          className="mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-blue-500/25 text-blue-600 dark:text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Video size={16} />
            <span className="font-semibold">Professional Mentorship</span>
            <Sparkles size={16} />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
              isDark
                ? "from-white via-blue-100 to-purple-100"
                : "from-gray-900 via-blue-600 to-purple-600"
            } bg-clip-text text-transparent`}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Book a Session
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={`text-center text-lg md:text-xl max-w-4xl mx-auto px-4 leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Get personalized guidance and feedback through one-on-one sessions
            with industry experts
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              whileHover={{ scaleX: 1.2 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              whileHover={{ scaleX: 1.2 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-16 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"
              whileHover={{ scaleX: 1.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="flex justify-center items-center gap-8 md:gap-12 lg:gap-16 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center justify-center gap-2`}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8" />
                {stat.value}
              </motion.div>
              <div
                className={`text-sm font-medium ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Card Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <TopMateCard {...profileData} />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.div
            className={`inline-flex items-center gap-4 px-8 py-4 rounded-2xl ${
              isDark
                ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm"
                : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 backdrop-blur-sm"
            } text-lg font-medium shadow-xl`}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <span className={isDark ? "text-gray-200" : "text-gray-700"}>
              Ready to accelerate your career?
            </span>
            <a
              href="https://topmate.io/sanjaykv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl flex items-center gap-2`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
                <ArrowRight size={16} />
              </motion.button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopMateSection;
