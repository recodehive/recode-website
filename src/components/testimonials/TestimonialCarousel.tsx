import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import TestimonialCard from "./TestimonialCard";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useSafeColorMode } from "../../utils/useSafeColorMode";

const baseTestimonials = [
  {
    name: "Ethan Trang",
    username: "EthanTrang",
    content:
      "The Recode Hive team are amazing to work with, very responsive. I'm a newbie to AI and they stepped us through the process",
    date: "May 18, 2024",
    avatar: "/icons/ethan.png",
    gradient: "bg-pink-100",
    borderColor: "border-pink-200",
  },
  {
    name: "Vivien Chen",
    username: "VivienChen",
    content:
      "The tech talent in Recode Hive is unparalleled. We worked with consultants who work in companies like Palantir, OpenAI, Relevance AI and more",
    date: "April 21, 2023",
    avatar: "/icons/vivien.png",
    gradient: "bg-purple-100",
    borderColor: "border-purple-200",
  },
  {
    name: "Daniel Han",
    username: "DanielHan",
    content:
      "We were able to get our project scoped, matched and kicked off in one day.Our invoicing is now 10x faster, thanks to Recode Hive's automation.",
    date: "Oct 18, 2024",
    avatar: "/icons/daniel.png",
    gradient: "bg-cyan-100",
    borderColor: "border-cyan-200",
  },
  {
    name: "Aryan Gupta",
    username: "AryanGupta",
    content:
      "you're constantly inspiring me to get applying for jobs and help me to improve my resume for 90+ ats score and improve my LinkedIn profile. you provided me detailed document analysis of my resume and video for me",
    date: "Sept 17, 2024",
    avatar: "/icons/aryan.png",
    gradient: "bg-pink-100",
    borderColor: "border-pink-200",
  },
  {
    name: "Donald Anyamba",
    username: "DonaldAnyamba",
    content:
      "Pointing out that my contributions all points back to my personal projects is an eye opener, especially now that I want to start building towards open source.",
    date: "May 4, 2026",
    avatar: "/icons/donald.png",
    gradient: "bg-purple-100",
    borderColor: "border-purple-200",
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
    <div className="relative w-full py-20 overflow-hidden">
      {/* Dotted Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '2rem 2rem',
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-gradient-to-br from-pink-400/15 to-purple-400/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-400/15 to-blue-400/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-300/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className={`mb-6 text-5xl md:text-6xl font-bold leading-tight ${colorMode === "dark" ? "text-white" : "text-gray-900"
            }`}>
            Builders <span className="mx-3">❤️</span> <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Recode Hive</span>
          </h2>
          <p className={`text-xl font-medium ${colorMode === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            Our builders go on to do incredible things from working at OpenAI to becoming AI engineers and founders.
          </p>
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
            <CarouselContent className="my-12 -ml-2 md:-ml-4 flex items-stretch">
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
              <CarouselPrevious className={`static translate-y-0 h-12 w-12 ${colorMode === "dark"
                ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                : "border-gray-200 bg-white hover:bg-gray-50"
                }`} />

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${current === index + 1
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 scale-125"
                      : colorMode === "dark"
                        ? "bg-gray-600 hover:bg-gray-500"
                        : "bg-gray-300 hover:bg-gray-400"
                      }`}
                  />
                ))}
              </div>

              <CarouselNext className={`static translate-y-0 h-12 w-12 ${colorMode === "dark"
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