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

// Sample testimonial data
const testimonials = [
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
    <div className="w-full">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Loved by Many Users</h2>
        <div className="w-32 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>

      <Carousel
        setApi={setApi}
        className="w-full"
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
        <CarouselContent className="-ml-2 md:-ml-4 my-16">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 h-full"
            >
              <TestimonialCard {...testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="flex items-center justify-center gap-2 mt-8">
          <CarouselPrevious className="static translate-y-0" />
          <div className="flex gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <Button
                key={index}
                variant={current === index + 1 ? "default" : "outline"}
                size="icon"
                className="h-2 w-2 p-0 rounded-full"
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
