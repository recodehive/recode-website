import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import { Button } from "../ui/button";
import TestimonialCard from "./TestimonialCard";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useSafeColorMode } from "../../utils/useSafeColorMode";

const baseTestimonials = [
  {
    name: "Rashi Chouhan",
    username: "RashiChouhan",
    content:
      "Valuable insights shared, productive discussions, and actionable outcomes. Looking forward to implementing the strategies discussed.! #TechCommunity #WomenInTech",
    date: "May 18, 2024",
    avatar: "/icons/adobe.png",
    link: "https://topmate.io/sanjaykv",
  },
  {
    name: "Namith",
    username: "namith",
    content:
      "Gave remarkable insights on parts i have to improve and gave me new opportunities . cheers~! #TechCommunity #Grateful",
    date: "April 21, 2023",
    avatar: "/icons/google.png",
    link: "https://topmate.io/sanjaykv",
  },
  {
    name: "Rajdeep Chakraborty",
    username: "RajdeepChakraborty",
    content:
      "I appreciate Sanjay sir's insights on open source and his suggestions for improving my GitHub profile. I'm excited to hear more and discuss open source further.! #OpenSource #TechCommunity",
    date: "Oct 18, 2024",
    avatar: "/icons/amazon.png",
    link: "https://topmate.io/sanjaykv",
  },
];

const testimonials = [...baseTestimonials, ...baseTestimonials];

export function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const { colorMode } = useSafeColorMode();

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

  return (
    <div className="relative w-full py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-600/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-400/10 to-cyan-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4">
            <span className={`inline-block rounded-full px-4 py-2 text-sm font-medium ${
              colorMode === "dark" 
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" 
                : "bg-purple-50 text-purple-600 border border-purple-200"
            }`}>
              ⭐ Client Testimonials
            </span>
          </div>
          <h2 className={`mb-6 text-5xl font-bold leading-tight ${
            colorMode === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Loved by <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Many Users</span>
          </h2>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
              }),
            ]}
          >
            <CarouselContent className="my-8 -ml-2 md:-ml-4 flex items-stretch">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="flex pl-2 md:basis-1/2 lg:basis-1/3 md:pl-4"
                >
                  <TestimonialCard {...testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-center gap-6">
              <CarouselPrevious className={`static translate-y-0 h-12 w-12 ${
                colorMode === "dark" 
                  ? "border-gray-700 bg-gray-800 hover:bg-gray-700" 
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`} />
              
              {/* Dots Indicator */}
              <div className="flex gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      current === index + 1
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 scale-125"
                        : colorMode === "dark"
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              
              <CarouselNext className={`static translate-y-0 h-12 w-12 ${
                colorMode === "dark" 
                  ? "border-gray-700 bg-gray-800 hover:bg-gray-700" 
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`} />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
}