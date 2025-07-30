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
    <div className="w-full max-w-8xl mx-auto px-4">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="my-10">
          {blogs.map((blog) => (
            <CarouselItem key={blog.id} className="md:basis-1/2 lg:basis-1/4">
              <BlogCard
                type="blog"
                date="2024-01-01"
                title={blog.title}
                content={blog.description}
                imageUrl={blog.image}
                id={blog.slug}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <CarouselPrevious className="static translate-y-0 dark:bg-gray-800 dark:text-white" />
          <div className="flex gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <Button
                key={index}
                variant={current === index + 1 ? "default" : "outline"}
                size="icon"
                className={`h-2 w-2 p-0 rounded-full transition-colors ${
                  current === index + 1
                    ? "bg-black dark:bg-white"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0 dark:bg-gray-800 dark:text-white" />
        </div>
      </Carousel>
    </div>
  );
}
