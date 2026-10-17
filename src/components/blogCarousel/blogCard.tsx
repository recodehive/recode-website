"use client";
import React from "react";
import Link from "@docusaurus/Link";
import { getAuthorProfiles } from "../../utils/authors";


interface BlogCardProps {
  type: string;
  date?: string;
  title: string;
  imageUrl: string;
  id: string;
  authors?: string[];
  tags?: string[];
  category?: string;
  readingTime?: number;
}

// Colours cycle by tag position (not by label), per the approved design.
const TAG_COLORS = [
  { bg: "#e8f5ee", text: "#205d3b" }, // 1st: green
  { bg: "#dbeafe", text: "#1d4ed8" }, // 2nd: blue
  { bg: "#fef3c7", text: "#92400e" }, // 3rd: amber
  { bg: "#fce7f3", text: "#9d174d" }, // 4th+: pink (not shown today, max 3 tags)
];

function tagColor(position: number) {
  return TAG_COLORS[position % TAG_COLORS.length];
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

function formatMeta(dateStr: string | undefined, readingTime: number) {
  const formattedDate = formatDate(dateStr);
  const readText = `${readingTime} min read`;
  return formattedDate ? `${formattedDate} · ${readText}` : readText;
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
  readingTime,
}: BlogCardProps) => {
  const authorProfiles = getAuthorProfiles(authors || []);
  const computedReadTime = readingTime ?? 1;

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

  const visibleTags = tagList.slice(0, 3);

  return (
    <div className="hb-card">
      {/* Image */}
      <div className="hb-card-image">
        <Link to={`/blog/${id}`} className="block" aria-label={`Read ${title}`}>
          <img src={imageUrl} alt={title} loading="lazy" />
        </Link>
      </div>

      {/* Content */}
      <div className="hb-card-content">
        {/* Title */}
        <h3 className="hb-card-title">
          <Link to={`/blog/${id}`} className="hb-card-title-link">
            {title}
          </Link>
        </h3>

        {/* Tag pills (max 3) */}
        {visibleTags.length > 0 && (
          <div className="hb-card-tags">
            {visibleTags.map((tag, i) => {
              const c = tagColor(i);
              return (
                <span
                  key={tag}
                  className="hb-card-tag"
                  style={{
                    "--hb-tag-bg": c.bg,
                    "--hb-tag-text": c.text,
                  } as React.CSSProperties}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}

        {/* Footer: avatar + author handle/meta + Read → */}
        <div className="hb-card-footer">
          <div className="hb-card-author-row">
            {authorProfiles.length > 0 && (
              <div className="hb-card-avatar">
                {authorProfiles[0].imageUrl ? (
                  <img
                    src={authorProfiles[0].imageUrl}
                    alt={authorProfiles[0].name}
                    className="hb-card-avatar-img"
                    onError={(e) => {
                      const t = e.currentTarget;
                      t.style.display = "none";
                      const fb = t.nextElementSibling as HTMLElement | null;
                      if (fb) fb.style.display = "flex";
                    }}
                  />
                ) : null}
                <span
                  className="hb-card-avatar-fallback"
                  style={{ display: authorProfiles[0].imageUrl ? "none" : "flex" }}
                >
                  {authorProfiles[0].name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div className="hb-card-author-info">
              {authorProfiles.length > 0 && (
                <Link
                  href={authorProfiles[0].githubUrl}
                  className="hb-card-author-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{authorProfiles[0].id || authorProfiles[0].name.toLowerCase().replace(/\s+/g, "")}
                </Link>
              )}
              <span className="hb-card-meta">{formatMeta(date, computedReadTime)}</span>
            </div>
          </div>

          <Link to={`/blog/${id}`} className="hb-card-read-link">
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
