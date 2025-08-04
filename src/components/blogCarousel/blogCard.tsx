"use client";
import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import { Card, CardContent } from "../ui/card";

const BlogCard = ({
  type,
  date,
  title,
  content,
  imageUrl,
  id
}) => {
  const [currentUrl] = useState(
    typeof window !== "undefined" ? window.location.href : ""
  );
  const [isHovered, setIsHovered] = useState(false);

  if (!id || !type) {
    return <div>data not fetched properly, imageId and entryId not found</div>;
  }

  return (
      <motion.div
        initial={false}
        animate={{scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden h-full shadow-2xl border border-gray-200 dark:border-gray-700 rounded-2xl transition-all duration-300"
      >
        <Link href={`${currentUrl}blog/${id}`}>
          {/* Hover shimmer effect */}
          <motion.div
            initial={{ opacity: 0, left: "50%", right: "50%" }}
            animate={
              isHovered
                ? {
                    opacity: 1,
                    left: "-100%",
                    right: "-100%",
                    transition: { duration: 0.6, ease: "easeInOut" },
                  }
                : {
                    opacity: 0,
                    left: "100%",
                    right: "100%",
                    transition: { duration: 0.6, ease: "easeInOut" },
                  }
            }
            className="absolute top-0 h-full shimmer-layer pointer-events-none"
          />

          <Card className="blog-card max-w-md w-full p-4 h-full border-none rounded-2xl transition-colors duration-300">
            <img
              src={imageUrl}
              alt=""
              width={400}
              height={200}
              className="w-full h-48 object-contain rounded-lg"
            />
            <CardContent className="p-4 space-y-2">
              <div className="blog-card-date text-sm">
                {date}
              </div>
              <h2 className="blog-card-title text-lg font-semibold">
                {title}
              </h2>
              <div className="blog-card-content text-sm line-clamp-3">
                {content}
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
  );
};

export default BlogCard;
