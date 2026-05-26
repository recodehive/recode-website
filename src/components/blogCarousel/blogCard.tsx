"use client";
import React from "react";
import Link from "@docusaurus/Link";
import { getAuthorProfiles } from "../../utils/authors";

interface BlogCardProps {
  type: string;
  date?: string;
  title: string;
  content: string;
  imageUrl: string;
  id: string;
  authors?: string[];
  tags?: string[];
  category?: string;
}

const TAG_COLORS = [
  { dot: "#f59e0b", border: "#fde68a", bg: "#fffbeb", text: "#92400e" },
  { dot: "#6366f1", border: "#c7d2fe", bg: "#eef2ff", text: "#3730a3" },
  { dot: "#ec4899", border: "#fbcfe8", bg: "#fdf2f8", text: "#9d174d" },
  { dot: "#10b981", border: "#a7f3d0", bg: "#ecfdf5", text: "#065f46" },
  { dot: "#3b82f6", border: "#bfdbfe", bg: "#eff6ff", text: "#1e40af" },
  { dot: "#8b5cf6", border: "#ddd6fe", bg: "#f5f3ff", text: "#5b21b6" },
  { dot: "#f97316", border: "#fed7aa", bg: "#fff7ed", text: "#9a3412" },
  { dot: "#14b8a6", border: "#99f6e4", bg: "#f0fdfa", text: "#134e4a" },
];

function tagColor(label: string) {
  let hash = 0;
  for (let i = 0; i < label.length; i++)
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

const BlogCard = ({
  type,
  date,
  title,
  imageUrl,
  id,
  authors,
  tags,
  category,
}: BlogCardProps) => {
  const authorProfiles = getAuthorProfiles(authors || []);

  if (!id || !type) {
    return <div>data not fetched properly, imageId and entryId not found</div>;
  }

  // Tags: use tags array first, then category, skip generic "blog"
  const rawTags = Array.isArray(tags) && tags.length > 0
    ? tags
    : category
      ? [category]
      : [];

  const tagList = rawTags.filter(
    (t) => t && t.toLowerCase() !== "blog" && t.toLowerCase() !== "post"
  );

  return (
    <div className="relative h-full overflow-hidden transition-all duration-300">
      <div className="article-card h-full">
        {/* Category Badge */}
        <div className="card-category">{category}</div>

        {/* Card Image */}
        <Link to={`/blog/${id}`} className="card-image" style={{ display: "block" }}>
          <img src={imageUrl} alt={title} />
        </Link>

      {/* Content */}
      <div className="card-content">
        {/* Title */}
        <h3 className="card-title">
          <Link to={`/blog/${id}`} className="card-title-link">
            {title}
          </Link>
        </h3>

        {/* Tag pills */}
        {tagList.length > 0 && (
          <div className="card-tags">
            {tagList.slice(0, 5).map((tag) => {
              const c = tagColor(tag);
              return (
                <span
                  key={tag}
                  className="card-tag"
                  style={{
                    "--tag-dot": c.dot,
                    "--tag-border": c.border,
                    "--tag-bg": c.bg,
                    "--tag-text": c.text,
                  } as React.CSSProperties}
                >
                  <span className="card-tag-dot" />
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Footer: avatars + author names/date + Read → */}
        <div className="card-footer">
          <div className="card-author-row">
            {/* Avatar stack — shows all authors overlapped */}
            {authorProfiles.length > 0 && (
              <div className="card-avatar-stack">
                {authorProfiles.map((author, i) => (
                  <div
                    key={author.id || i}
                    className="card-avatar"
                    style={{ zIndex: authorProfiles.length - i }}
                  >
                    {author.imageUrl ? (
                      <img
                        src={author.imageUrl}
                        alt={author.name}
                        className="card-avatar-img"
                        onError={(e) => {
                          const t = e.currentTarget;
                          t.style.display = "none";
                          const fb = t.nextElementSibling as HTMLElement | null;
                          if (fb) fb.style.display = "flex";
                        }}
                      />
                    ) : null}
                    <span
                      className="card-avatar-fallback"
                      style={{ display: author.imageUrl ? "none" : "flex" }}
                    >
                      {author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="card-author-info">
              {/* All author names inline, separated by commas */}
              {authorProfiles.length > 0 && (
                <div className="card-author-names">
                  {authorProfiles.map((author, i) => (
                    <React.Fragment key={author.id || i}>
                      {i > 0 && <span className="card-author-sep">, </span>}
                      <Link
                        href={author.githubUrl}
                        className="card-author-handle"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{author.id || author.name.toLowerCase().replace(/\s+/g, "")}
                      </Link>
                    </React.Fragment>
                  ))}
                </div>
              )}
              {date && <span className="card-date">{formatDate(date)}</span>}
            </div>
          </div>

          <Link to={`/blog/${id}`} className="card-read-link">
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;