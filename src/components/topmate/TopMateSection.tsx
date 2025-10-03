import React from "react";
import TopMateCard from "./TopMateCard";
import { useColorMode } from "@docusaurus/theme-common";

const TopMateSection = ({ setShowTopmate }) => {
  const { colorMode } = useColorMode(); // Get current theme: 'light' or 'dark'

  const profileData = {
    title: "1:1 Mentorship Call",
    description: "Book a slot, Free for Hive Community Members",
    duration: "30 mins",
    profileImage: "/sanjay.png",
    username: "sanjaykv",
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              colorMode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Book a Session
          </h1>
          <p
            className={`text-base sm:text-lg md:text-xl ${
              colorMode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Get personalized guidance and feedback through one-on-one sessions
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <TopMateCard {...profileData} setShowTopmate={setShowTopmate} />
        </div>
      </div>
    </div>
  );
};

export default TopMateSection;
