"use client";
import * as React from "react";

import { motion } from "framer-motion";
import Link from "@docusaurus/Link";

import { getAuthorNames } from "../../utils/authors";

const BlogCard = ({ type, date, title, content, imageUrl, id, authors }) => {
  

  if (!id || !type) {
    return <div>data not fetched properly, imageId and entryId not found</div>;
  }

  // Get category from title for demo purposes
  const getCategory = (title) => {
    if (
      title.toLowerCase().includes("design") ||
      title.toLowerCase().includes("ux")
    )
      return "Design";
    if (
      title.toLowerCase().includes("ai") ||
      title.toLowerCase().includes("deepmind")
    )
      return "AI & Tech";
    if (
      title.toLowerCase().includes("github") ||
      title.toLowerCase().includes("git")
    )
      return "Development";
    return "Resources";
  };

  const category = getCategory(title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.4, ease: "easeOut" },
      }}
     
      className="relative h-full overflow-hidden transition-all duration-300"
    >
      <Link
  to={`/blog/${id}`}
  className="block h-full"
  style={{ textDecoration: "none" }}
  aria-label={`Read article: ${title}`}   // ← add this
>
        <div className="article-card h-full" style={{ cursor: "pointer"}}>
          {/* Category Badge */}
          <div className="card-category">{category}</div>

          {/* Card Image */}
          <div className="card-image">
            <img src={imageUrl} alt={title} />
          </div>

          {/* Card Content */}
          <div className="card-content">
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{content}</p>

            {/* Card Meta */}
            <div className="card-meta">
              <div className="card-author">
                <span className="author-avatar">👤</span>
                <span
                  className="author-name"
                  data-full-name={getAuthorNames(authors || [])}
                >
                  {getAuthorNames(authors || [])}
                </span>
              </div>
              <span className="card-read-time">5 min read</span>
            </div>

            {/* Read More Button */}
            <span className="card-read-more">
              <span>Read Article →</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
