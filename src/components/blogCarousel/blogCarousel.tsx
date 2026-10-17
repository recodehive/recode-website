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

const latestBlogs = [...blogs]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 5);

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
    <div className="w-full">
      {/* Section Header */}
      <div className="blog-section-header">
        <div>
          <p className="blog-section-eyebrow">✦ Blog</p>
          <h2 className="blog-section-title">From the Blog</h2>
          <p className="blog-section-subtitle">
            Latest articles from our contributors.
          </p>
        </div>
        <Link to="/blogs" className="blog-section-viewall">
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
          {latestBlogs.map((blog) => (
            <CarouselItem
              key={blog.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <BlogCard
                type={blog.category}
                date={blog.date}
                title={blog.title}
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
          <CarouselPrevious
            aria-label="Previous articles"
            className="static h-11 w-11 translate-y-0 border border-slate-300 bg-white text-slate-900 transition-all duration-300 hover:border-[#2e8555] hover:text-[#2e8555] hover:shadow-[0_0_6px_rgba(46,133,85,0.5)] dark:border-slate-600 dark:bg-[#1e1f20] dark:text-slate-100"
          />

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="hb-dot h-2 rounded-full"
                style={{
                  width: current === index + 1 ? "24px" : "8px",
                  backgroundColor: current === index + 1 ? "#2e8555" : "#cbd5e1",
                }}
              />
            ))}
          </div>

          <CarouselNext
            aria-label="Next articles"
            className="static h-11 w-11 translate-y-0 border border-slate-300 bg-white text-slate-900 transition-all duration-300 hover:border-[#2e8555] hover:text-[#2e8555] hover:shadow-[0_0_6px_rgba(46,133,85,0.5)] dark:border-slate-600 dark:bg-[#1e1f20] dark:text-slate-100"
          />
        </div>
      </Carousel>
    </div>
  );
}