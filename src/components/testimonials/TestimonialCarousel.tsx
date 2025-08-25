import React, { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import { Button } from "../ui/button";
import TestimonialCard from './TestimonialCard';
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useColorMode } from "@docusaurus/theme-common";
import { Star, Users, TrendingUp, Award, ArrowRight, Play, Pause } from "lucide-react";
// Removed unused testimonials.css import

// Enhanced testimonial data with more details
const testimonials = [
  {
    name: "Shaanif Ahmed",
    username: "Shaanifahmed",
    content: "The resources for learning statistics were really useful. Also I liked the summary of each field given out there! The community is incredibly supportive and the content quality is outstanding. #LearnToCode #FreeEducation #TechCommunity",
    date: "May 21, 2023",
    avatar: "/icons/adobe.png",
    rating: 5,
    role: "Data Scientist",
  
  },
  {
    name: "Namith Kumar",
    username: "namith",
    content: "Gave remarkable insights on parts I have to improve and gave me new opportunities. The mentorship program is exceptional and really helped me grow my skills. Cheers! #TechCommunity #WomenInTech #Mentorship",
    date: "April 21, 2023",
    avatar: "/icons/google.png",
    rating: 5,
    role: "Frontend Developer",
    
  },
  {
    name: "Prithwi Gajanan",
    username: "PrithwiGajanan",
    content: "Got quick response 🎉 during my internship apply period. Sir is really very kind☺️ and a Gem 💎 for the community. And inspiration for me. ✨ The platform is amazing! #Topmate #mentorship #CareerGrowth",
    date: "Sep 28, 2024",
    avatar: "/icons/amazon.png",
    rating: 5,
    role: "Software Engineer",
    
  }, 
]

// Enhanced Particle component for background effects
const Particle = ({ x, y, delay, size = 2 }: { x: number; y: number; delay: number; size?: number }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  
  return (
    <motion.div
      className={`absolute rounded-full ${
        isDark ? 'bg-blue-400/40' : 'bg-blue-500/30'
      }`}
      style={{ 
        left: x, 
        top: y, 
        width: size, 
        height: size 
      }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 1, 0],
        y: [0, -30, -60],
        x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeOut"
      }}
    />
  );
};

// Floating Icon component
const FloatingIcon = ({ icon: Icon, delay, position }: { 
  icon: any; 
  delay: number; 
  position: { x: number; y: number } 
}) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  
  return (
    <motion.div
      className={`absolute text-2xl ${
        isDark ? 'text-blue-400/30' : 'text-blue-500/20'
      }`}
      style={{ left: position.x, top: position.y }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 360],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    >
      <Icon />
    </motion.div>
  );
};

export function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Removed 3D tilt mouse tracking per feedback

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Removed mouse handlers

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
    if (api) {
      if (isPlaying) {
        api.plugins().autoplay?.stop();
      } else {
        api.plugins().autoplay?.play();
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  // Generate particles
  const particles = Array.from({ length: 25 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    size: Math.random() * 3 + 1
  }));

  // Generate floating icons
  const floatingIcons = [
    { icon: Star, delay: 0, position: { x: 10, y: 20 } },
    { icon: Users, delay: 1, position: { x: 85, y: 15 } },
    { icon: TrendingUp, delay: 2, position: { x: 15, y: 80 } },
    { icon: Award, delay: 1.5, position: { x: 80, y: 75 } },
  ];

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full py-20 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Enhanced Animated Background (hidden on small screens) */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 60, 0],
            y: [0, -40, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-pink-500/15 to-orange-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -50, 0],
            y: [0, 50, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Floating Particles */}
        {particles.map((particle, index) => (
          <Particle key={index} {...particle} />
        ))}

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <FloatingIcon key={index} {...item} />
        ))}
      </div>

      {/* Enhanced Header Section */}
      <motion.div 
        className="relative z-10 text-center mb-10 md:mb-20"
        variants={itemVariants}
      >
        {/* Enhanced Badge */}
        <motion.div 
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-blue-500/25 text-blue-600 dark:text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm mx-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span 
            className="w-3 h-3 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-semibold">What Our Community Says</span>
          <motion.span 
            className="w-3 h-3 bg-purple-500 rounded-full"
            animate={{ scale: [1.5, 1, 1.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </motion.div>

        {/* Enhanced Main Title */}
        <motion.h2 
          className={`text-center text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 bg-gradient-to-r ${
            isDark 
              ? "from-white via-blue-100 to-purple-100" 
              : "from-gray-900 via-blue-600 to-purple-600"
          } bg-clip-text text-transparent`}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loved by Many Users
        </motion.h2>

        {/* Enhanced Subtitle */}
        <motion.p 
          className={`text-center text-base sm:text-lg md:text-2xl max-w-4xl mx-auto px-4 mb-8 md:mb-12 leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
          variants={itemVariants}
        >
          Join thousands of developers who have transformed their careers with our comprehensive learning platform and supportive community
        </motion.p>

        {/* Enhanced Decorative Elements */}
        <motion.div 
          className="flex items-center justify-center gap-6 mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            whileHover={{ scaleX: 1.3 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            whileHover={{ scaleX: 1.3 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full"
            whileHover={{ scaleX: 1.3 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Stats Section (stack on mobile) */}
      <motion.div 
        className="relative z-10 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-20 mb-10 md:mb-16"
        variants={itemVariants}
      >
        {[
          { value: "10K+", label: "Active Learners", gradient: "from-blue-500 to-purple-500", icon: Users },
          { value: "95%", label: "Success Rate", gradient: "from-purple-500 to-pink-500", icon: TrendingUp },
          { value: "4.9★", label: "Average Rating", gradient: "from-pink-500 to-blue-500", icon: Star }
        ].map((stat, index) => (
          <motion.div 
            key={index}
            className="text-center group cursor-pointer"
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className={`text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent flex items-center justify-center gap-2`}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
            >
              <stat.icon className="w-8 h-8 md:w-10 md:h-10" />
              {stat.value}
            </motion.div>
            <div className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Enhanced Carousel */}
      <motion.div 
        className="relative z-10"
        variants={itemVariants}
      >
        <div className="mx-auto px-4 md:px-6 md:max-w-5xl lg:max-w-6xl">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 6000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="-ml-1 sm:-ml-3 md:-ml-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-1 sm:pl-3 md:pl-6 basis-[92%] sm:basis-[88%] md:basis-[92%] lg:basis-1/2 xl:basis-1/3 h-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <TestimonialCard {...testimonial} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Enhanced Navigation */}
          <motion.div 
            className="w-full flex items-center gap-3 sm:gap-4 md:gap-6 mt-8 md:mt-12"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <CarouselPrevious className={`static translate-y-0 hover:scale-110 transition-all duration-300 ${
                isDark 
                  ? "bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 backdrop-blur-sm" 
                  : "bg-white/80 border-gray-200 hover:bg-gray-50/80 backdrop-blur-sm"
              }`} />
            </motion.div>
            
            {/* Centered Dots on own row */}
            <div className="flex-1 flex items-center justify-center gap-2 sm:gap-4">
              {Array.from({ length: count }).map((_, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                >
                  <Button
                    variant={current === index + 1 ? "default" : "outline"}
                    size="icon"
                    className={`h-3 w-3 sm:h-4 sm:w-4 p-0 rounded-full transition-all duration-300 ${
                      current === index + 1 
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-110 shadow-lg" 
                        : "hover:scale-110"
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Hide autoplay on <lg to match compact layout */}
            <motion.button
              onClick={toggleAutoplay}
              className={`hidden lg:inline-flex p-2 sm:p-3 rounded-full transition-all duration-300 ${
                isDark 
                  ? "bg-gray-800/80 border border-gray-700 hover:bg-gray-700/80" 
                  : "bg-white/80 border border-gray-200 hover:bg-gray-50/80"
              } backdrop-blur-sm`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <CarouselNext className={`static translate-y-0 hover:scale-110 transition-all duration-300 ${
                isDark 
                  ? "bg-gray-800/80 border-gray-700 hover:bg-gray-700/80 backdrop-blur-sm" 
                  : "bg-white/80 border-gray-200 hover:bg-gray-50/80 backdrop-blur-sm"
              }`} />
            </motion.div>
          </motion.div>
        </Carousel>
        </div>
      </motion.div>

      {/* Enhanced Call to Action */}
      <motion.div 
        className="relative z-10 text-center mt-20"
        variants={itemVariants}
      >
        <motion.div 
          className={`inline-flex items-center gap-6 px-10 py-6 rounded-3xl ${
            isDark 
              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 backdrop-blur-sm" 
              : "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 backdrop-blur-sm"
          } text-lg font-medium shadow-xl`}
          whileHover={{ scale: 1.05, y: -3 }}
          transition={{ duration: 0.3 }}
        >
          <span className={isDark ? "text-gray-200" : "text-gray-700"}>
            Ready to join our community?
          </span>
          <a 
          href="https://github.com/recodehive" 
          target="_blank" 
          rel="noopener noreferrer"
          className="no-underline block"
          
        >
          <motion.button 
            className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl flex items-center gap-2`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <ArrowRight size={16} />
          </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 