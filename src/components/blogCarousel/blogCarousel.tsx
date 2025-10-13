"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import BlogCard from "./blogCard";
import blogs from "../../database/blogs";
import Autoplay from "embla-carousel-autoplay";
import "./blogCarousel.css";

export function BlogCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="max-w-8xl mx-auto w-full px-4">
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
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent className="my-10">
          {blogs.map((blog, index) => (
            <CarouselItem
              key={blog.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <BlogCard
                type="blog"
                date="2024-01-01"
                title={blog.title}
                content={blog.description}
                imageUrl={blog.image}
                id={blog.slug}
                authors={blog.authors}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Enhanced Carousel controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <CarouselPrevious className="static h-12 w-12 translate-y-0 border-2 border-blue-200 transition-all duration-300 hover:scale-110 hover:border-blue-400 dark:border-blue-800 dark:hover:border-blue-600" />
          <div className="flex gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`h-3 w-3 rounded-full p-0 transition-all duration-300 ${
                  current === index + 1
                    ? "scale-125 bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
          <CarouselNext className="static h-12 w-12 translate-y-0 border-2 border-blue-200 transition-all duration-300 hover:scale-110 hover:border-blue-400 dark:border-blue-800 dark:hover:border-blue-600" />
        </div>
      </Carousel>
    </div>
  );
}
