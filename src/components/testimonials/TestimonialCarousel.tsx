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
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-bold">Loved by Many Users</h2>
        <div className="mx-auto h-1 w-32 rounded-full bg-blue-500"></div>
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
        <CarouselContent className="my-16 -ml-2 md:-ml-4">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="h-full pl-2 md:basis-1/2 md:pl-4"
            >
              <TestimonialCard {...testimonial} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-8 flex items-center justify-center gap-2">
          <CarouselPrevious className="static translate-y-0" />
          <div className="flex gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <Button
                key={index}
                variant={current === index + 1 ? "default" : "outline"}
                size="icon"
                className="h-2 w-2 rounded-full p-0"
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
