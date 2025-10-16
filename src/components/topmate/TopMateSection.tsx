import React from "react";
import TopMateCard from "./TopMateCard";
import { useColorMode } from "@docusaurus/theme-common";

const TopMateSection = ({ setShowTopmate }) => {
  const { colorMode } = useColorMode(); // Get current theme: 'light' or 'dark'

  const profileData = {
    title: "1:1 Mentorship Call",
    description: "Book a slot, Free for recode hive Community Members",
    duration: "30 mins",
    profileImage: "/sanjay.png",
    username: "sanjaykv",
  };

  return (
    <div className="px-4">
      <div className="mx-auto">
        <div className="mx-auto mb-16 text-center">
          <h1
            className={`mb-4 text-4xl font-bold ${
              colorMode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Book a Session
          </h1>
          <p
            className={`text-lg ${
              colorMode === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Get personalized guidance and feedback through one-on-one sessions
          </p>
        </div>

        <div>
          <TopMateCard {...profileData} setShowTopmate={setShowTopmate} />
        </div>
      </div>
    </div>
  );
};

export default TopMateSection;
