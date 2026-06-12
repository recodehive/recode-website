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
import { useEffect, useState } from "react";
import BlogCard from "./blogCard";
import blogs from "../../database/blogs";
import Autoplay from "embla-carousel-autoplay";
import Link from "@docusaurus/Link";
import "./blogCarousel.css";

export function BlogCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="max-w-8xl mx-auto w-full px-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            From the Blog
          </h2>
          <p className="text-sm text-gray-800 dark:text-gray-300">
            Latest articles from our contributors
          </p>
        </div>
        <Link
          to="/blogs"
          className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all dark:text-indigo-400 dark:border-indigo-800 dark:hover:bg-indigo-950"
          style={{ textDecoration: "none" }}
        >
          View all →
        </Link>
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
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent className="my-10">
          {blogs.map((blog) => (
            <CarouselItem
              key={blog.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <BlogCard
                type={blog.category}
                date={(blog as any).date}
                title={blog.title}
                content={blog.description}
                imageUrl={blog.image}
                id={blog.slug}
                authors={blog.authors}
                tags={blog.tags}
                category={blog.category}
                readingTime={blog.readingTime}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <CarouselPrevious className="static h-10 w-10 translate-y-0 border border-indigo-200 transition-all duration-300 hover:scale-110 hover:border-indigo-400 dark:border-indigo-800 dark:hover:border-indigo-600" />

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${current === index + 1
                  ? "w-5 bg-indigo-500"
                  : "w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                  }`}
              />
            ))}
          </div>

          <CarouselNext className="static h-10 w-10 translate-y-0 border border-indigo-200 transition-all duration-300 hover:scale-110 hover:border-indigo-400 dark:border-indigo-800 dark:hover:border-indigo-600" />
        </div>
      </Carousel>
    </div>
  );
}