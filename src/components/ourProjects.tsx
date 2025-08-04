'use client';

import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

export interface OurProjectsData {
  tag: string;
  title: string;
  description: string;
  items: {
    title: string;
    image: string;
  }[];
}

export interface OurProjectsProps {
  OurProjectsData: OurProjectsData;
}

const OurProjects: React.FC<OurProjectsProps> = ({ OurProjectsData }) => {
  const { colorMode } = useColorMode(); // light or dark

  const isDark = colorMode === 'dark';

  return (
    <div
      className={`flex flex-col items-center justify-center gap-10 sm:gap-20 py-10 sm:py-20 px-4 min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#0c0c0c] text-white' : 'bg-white text-black'
      }`}
    >
      <HeadingComponent
        tag={OurProjectsData.tag}
        title={OurProjectsData.title}
        description={OurProjectsData.description}
        isDark={isDark}
      />
      <SelectComponent items={OurProjectsData.items} isDark={isDark} />
    </div>
  );
};

// Heading Component
const HeadingComponent = ({
  tag,
  title,
  description,
  isDark,
}: {
  tag: string;
  title: string;
  description: string;
  isDark: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center md:items-start md:justify-start gap-6 sm:gap-10 flex-col"
      >
        <div
          className="cursor-pointer px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm sm:text-base font-medium tracking-wide shadow-lg transform hover:scale-105 transition-transform duration-300"
          onClick={() =>
            (window.location.href = 'https://github.com/recodehive')
          }
        >
          {tag}
        </div>
        <div
          className={`text-3xl sm:text-4xl md:text-5xl font-bold md:w-11/12 text-center md:text-left bg-clip-text text-transparent bg-gradient-to-r ${
            isDark
              ? 'from-white via-gray-300 to-white'
              : 'from-black via-gray-700 to-black'
          }`}
        >
          {title}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`${
          isDark ? 'text-gray-300' : 'text-gray-700'
        } text-base sm:text-lg text-justify h-full flex items-center md:pr-10 justify-center leading-relaxed`}
      >
        {description}
      </motion.div>
    </div>
  );
};

// Select Component
const SelectComponent = ({
  items,
  isDark,
}: {
  items: {
    title: string;
    image: string;
  }[];
  isDark: boolean;
}) => {
  const [activeItem, setActiveItem] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-12 w-full rounded-[30px] sm:rounded-[50px] shadow-2xl overflow-hidden"
    >
      <div
        className={`flex flex-row md:flex-col col-span-1 md:col-span-4 gap-4 md:gap-6 items-start justify-start p-4 md:p-8 max-h-[30vh] md:max-h-[70vh] overflow-x-auto md:overflow-y-auto no-scrollbar ${
          isDark ? 'bg-black' : 'bg-gray-100'
        }`}
      >
        {items.map((item, index) => (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={index}
            onClick={() => setActiveItem(index)}
            className={`cursor-pointer transition-all duration-300 ease-in-out p-2 md:p-6 rounded-2xl md:rounded-r-full w-40 md:w-4/5 relative ${
              activeItem === index
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : isDark
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-black'
            }`}
          >
            <div className="text-xs md:text-lg font-semibold md:w-10/12">
              {item.title}
            </div>
            <div
              className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full transition-transform duration-300 ${
                activeItem === index ? 'translate-x-2' : ''
              }`}
            >
              <ChevronRight className="hidden md:block h-6 w-6 md:h-8 md:w-8" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.a
        href="https://github.com/recodehive"
        target="_blank"
        rel="noopener noreferrer"
        initial={false}
        animate={{ scale: isHovered ? 1.02 : 1 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`col-span-1 md:col-span-8 p-0 md:p-8 ${
          isDark ? 'bg-[#1a1a1a]' : 'bg-white'
        } transition-colors duration-300`}
      >
        <motion.img
          key={activeItem}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={items[activeItem].image}
          alt={items[activeItem].title}
          className="w-full h-[30vh] md:h-[60vh] object-cover rounded-2xl shadow-xl transform transition-transform duration-300"
        />
      </motion.a>
    </motion.div>
  );
};

export default OurProjects;
