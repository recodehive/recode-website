"use client";
import * as React from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";
import { getAuthorProfiles, getAuthorTooltip } from "../../utils/authors";

interface BlogCardProps {
  type: string;
  date?: string;
  title: string;
  content: string;
  imageUrl: string;
  id: string;
  authors?: string[];
}

const BlogCard = ({
  type,
  title,
  content,
  imageUrl,
  id,
  authors,
}: BlogCardProps) => {
  const authorProfiles = getAuthorProfiles(authors || []);

  if (!id || !type) {
    return <div>data not fetched properly, imageId and entryId not found</div>;
  }

  const getCategory = (title: string) => {
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
        aria-label={`Read article: ${title}`}
      >
        <div className="article-card h-full" style={{ cursor: "pointer" }}>
          <div className="card-category">{category}</div>
          <div className="card-image">
            <img src={imageUrl} alt={title} />
          </div>
          <div className="card-content">
            <h3 className="card-title">
              <span className="card-title-link">{title}</span>
            </h3>
            <p className="card-description">{content}</p>
            <div className="card-meta">
              <div className="card-author">
                {authorProfiles.length > 0 &&
                  (() => {
                    const max = 3;
                    const visible = authorProfiles.slice(0, max);
                    const extra = Math.max(0, authorProfiles.length - max);
                    return (
                      <div className="author-stack" aria-hidden>
                        {visible.map((a, i) => (
                          <div
                            key={a.id}
                            className="author-stack-item"
                            style={{ zIndex: max - i }}
                          >
                            {a.imageUrl ? (
                              <img
                                src={a.imageUrl}
                                alt={a.name}
                                className="author-stack-avatar"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  target.style.display = "none";
                                  const fallback =
                                    target.nextElementSibling as HTMLElement | null;
                                  if (fallback) fallback.style.display = "flex";
                                }}
                              />
                            ) : (
                              <span className="author-stack-fallback">
                                {a.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                        ))}
                        {extra > 0 && (
                          <div className="author-stack-more">+{extra}</div>
                        )}
                      </div>
                    );
                  })()}
                <div className="author-name-group">
                  {authorProfiles.map((author, authorIndex) => (
                    <span key={author.id} className="author-item">
                      {authorIndex > 0 && (
                        <span className="author-separator">&</span>
                      )}
                      <span
                        className="author-name author-link"
                        data-author-tooltip={getAuthorTooltip(author.id)}
                        aria-label={`Open ${author.name} on GitHub`}
                      >
                        {author.name}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <span className="card-read-more">
                <span>Read Article →</span>
              </span>
              <span className="card-read-time">5 min read</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
