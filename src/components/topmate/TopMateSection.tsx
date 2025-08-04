import React from 'react';
import TopMateCard from './TopMateCard';
import { useColorMode } from '@docusaurus/theme-common';

const TopMateSection = () => {
  const { colorMode } = useColorMode(); // Get current theme: 'light' or 'dark'

  const profileData = {
    title: '1:1 Mentorship Call',
    description: 'Book a slot, Free for Hive Community Members',
    duration: '30 mins',
    profileImage: '/sanjay.png',
    username: 'sanjaykv',
  };

  return (
    <div className="px-4">
      <div className="mx-auto">
        <div className="mx-auto text-center mb-16">
          <h1
            className={`text-4xl font-bold mb-4 ${
              colorMode === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Book a Session
          </h1>
          <p
            className={`text-lg ${
              colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Get personalized guidance and feedback through one-on-one sessions
          </p>
        </div>

        <div>
          <TopMateCard {...profileData} />
        </div>
      </div>
    </div>
  );
};

export default TopMateSection;
