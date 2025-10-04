"use client";
import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import { Card, CardContent } from "../ui/card";
import { getAuthorNames } from "../../utils/authors";

const BlogCard = ({
  type,
  date,
  title,
  content,
  imageUrl,
  id,
  authors
}) => {

  const [isHovered, setIsHovered] = useState(false);

  if (!id || !type) {
    return <div>data not fetched properly, imageId and entryId not found</div>;
  }

  // Get category from title for demo purposes
  const getCategory = (title) => {
    if (title.toLowerCase().includes('design') || title.toLowerCase().includes('ux')) return 'Design';
    if (title.toLowerCase().includes('ai') || title.toLowerCase().includes('deepmind')) return 'AI & Tech';
    if (title.toLowerCase().includes('github') || title.toLowerCase().includes('git')) return 'Development';
    return 'Resources';
  };

  const category = getCategory(title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -5 }} 
      whileTap={{ scale: 0.98 }} 
      className="blog-card-scale fixed-card-size cursor-pointer"
    >
      <Link 
        to={`/blog/${id}`}
        className="block h-full text-decoration-none"
        style={{ textDecoration: 'none' }}
      >
        <div className="article-card h-full">
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
                <span className="author-name" data-full-name={getAuthorNames(authors || [])}>{getAuthorNames(authors || [])}</span>
              </div>
              <span className="card-read-time">5 min read</span>
            </div>
            
            {/* Read More Button */}
            <div className="card-read-more">
              Read Article →
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
