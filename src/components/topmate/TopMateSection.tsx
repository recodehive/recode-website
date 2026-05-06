import React from "react";
import TopMateCard from "./TopMateCard";
import { useSafeColorMode } from "../../utils/useSafeColorMode";
import { motion } from "framer-motion";

const TopMateSection = ({ setShowTopmate }) => {
  const { colorMode } = useSafeColorMode();

  const profileData = {
    title: "1:1 Mentorship Call",
    description: "Book a slot, Free for recode hive Community Members",
    duration: "30 mins",
    profileImage: "/sanjay.png",
    username: "sanjaykv",
  };

  return (
    <div className="relative px-4 pt-0 pb-20">
      <div className="relative mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 text-center"
        >
          <div className="mb-4">
            <span className={`inline-block rounded-full px-4 py-2 text-sm font-medium ${
              colorMode === "dark" 
                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                : "bg-blue-50 text-blue-600 border border-blue-200"
            }`}>
              ✨ Personal Mentorship
            </span>
          </div>
          <h1 className={`mb-6 text-5xl font-bold leading-tight ${
            colorMode === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Book a <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Session</span>
          </h1>
          <p className={`mx-auto max-w-2xl text-xl leading-relaxed ${
            colorMode === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Get personalized guidance and feedback through one-on-one sessions with industry experts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <TopMateCard {...profileData} setShowTopmate={setShowTopmate} />
        </motion.div>
      </div>
    </div>
  );
};

export default TopMateSection;
