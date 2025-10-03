import React, { useState, useEffect } from 'react';
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

// Sample testimonial data
const testimonials = [
  {
    name: "Rashi Chouhan",
    username: "RashiChouhan",
    content: "Valuable insights shared, productive discussions, and actionable outcomes. Looking forward to implementing the strategies discussed.! #TechCommunity #WomenInTech",
    date: "May 18, 2024",
    avatar: "/icons/adobe.png",
    link: "https://topmate.io/sanjaykv"
  },
  {
    name: "Namith",
    username: "namith",
    content: "Gave remarkable insights on parts i have to improve and gave me new opportunities . cheers~! #TechCommunity #Grateful",
    date: "April 21, 2023",
    avatar: "/icons/google.png",
    link: "https://topmate.io/sanjaykv"
  },
  {
    name: "Rajdeep Chakraborty",
    username: "RajdeepChakraborty",
    content: "I appreciate Sanjay sir's insights on open source and his suggestions for improving my GitHub profile. I'm excited to hear more and discuss open source further.! #OpenSource #TechCommunity",
    date: "Oct 18, 2024",
    avatar: "/icons/amazon.png",
    link: "https://topmate.io/sanjaykv"
  }
];

export function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-5xl md:text-5xl font-bold mb-4">Loved by Many Users</h2>
        <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <Carousel
        setApi={setApi}
        className="w-full max-w-7xl mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="-ml-2 md:-ml-4 my-6 sm:my-12">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2">
              <div className="h-full">
                <TestimonialCard {...testimonial} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex items-center justify-center gap-4 mt-8">
          <CarouselPrevious className="static translate-y-0 cursor-pointer" />
          <div className="flex gap-2 items-center">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                  current === index + 1
                    ? "w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500"
                    : "w-2 h-2 bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0 cursor-pointer" />
        </div>
      </Carousel>
    </div>
  );
}
