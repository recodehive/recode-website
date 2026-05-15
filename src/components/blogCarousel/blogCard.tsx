"use client";
import Link from "@docusaurus/Link";
import { Card, CardContent } from "../ui/card";
import { getAuthorProfiles, getAuthorTooltip } from "../../utils/authors";

declare const require: any;
const React = require("react");

const BlogCard = ({ type, date, title, content, imageUrl, id, authors }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const authorProfiles = getAuthorProfiles(authors || []);

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
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full overflow-hidden transition-all duration-300"
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
          <h3 className="card-title">
            <Link to={`/blog/${id}`} className="card-title-link">
              {title}
            </Link>
          </h3>
          <p className="card-description">{content}</p>

          {/* Card Meta */}
          <div className="card-meta">
            <div className="card-author">
              {/* Stacked Author Avatars */}
              {authorProfiles.length > 0 && (
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
                })()
              )}

              {/* Author Names */}
              <div className="author-name-group">
                {authorProfiles.map((author, authorIndex) => (
                  <span key={author.id} className="author-item">
                    {authorIndex > 0 && (
                      <span className="author-separator">&</span>
                    )}
                    <Link
                      href={author.githubUrl}
                      className="author-name author-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-author-tooltip={getAuthorTooltip(author.id)}
                      aria-label={`Open ${author.name} on GitHub`}
                    >
                      {author.name}
                    </Link>
                  </span>
                ))}
              </div>
            </div>
            <span className="card-read-time">5 min read</span>
          </div>

          {/* Read More Button */}
          <Link to={`/blog/${id}`} className="card-read-more">
            Read Article →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
