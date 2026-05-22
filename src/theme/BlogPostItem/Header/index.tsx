import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import BlogPostItemHeaderOriginal from "@theme-original/BlogPostItem/Header";
import BlogPostItemHeaderTitle from "@theme/BlogPostItem/Header/Title";
import type BlogPostItemHeaderType from "@theme/BlogPostItem/Header";
import type { WrapperProps } from "@docusaurus/types";
import { getAuthorProfile } from "../../../utils/authors";

import styles from "./styles.module.css";

type Props = WrapperProps<typeof BlogPostItemHeaderType>;

const TAG_COLORS = [
  { dot: "#f59e0b", border: "#fde68a", bg: "#fffbeb", text: "#92400e" },
  { dot: "#6366f1", border: "#c7d2fe", bg: "#eef2ff", text: "#3730a3" },
  { dot: "#ec4899", border: "#fbcfe8", bg: "#fdf2f8", text: "#9d174d" },
  { dot: "#10b981", border: "#a7f3d0", bg: "#ecfdf5", text: "#065f46" },
  { dot: "#f97316", border: "#fed7aa", bg: "#fff7ed", text: "#9a3412" },
  { dot: "#8b5cf6", border: "#ddd6fe", bg: "#f5f3ff", text: "#5b21b6" },
  { dot: "#14b8a6", border: "#99f6e4", bg: "#f0fdfa", text: "#134e4a" },
  { dot: "#ef4444", border: "#fecaca", bg: "#fef2f2", text: "#991b1b" },
];

function tagColor(label: string) {
  let hash = 0;
  for (let i = 0; i < label.length; i++) {
    hash = (hash * 31 + label.charCodeAt(i)) & 0xffff;
  }
  return TAG_COLORS[hash % TAG_COLORS.length];
}

function getGitHubHandle(author: { key?: string; url?: string }): string | undefined {
  if (author.url && /github\.com\//i.test(author.url)) {
    const matched = author.url.match(/github\.com\/([^/?#]+)/i);
    if (matched?.[1]) {
      return `@${matched[1]}`;
    }
  }
  if (author.key) {
    return `@${author.key}`;
  }
  return undefined;
}

function getGitHubUrl(author: { key?: string; url?: string; name?: string }): string | undefined {
  if (author.key) {
    return getAuthorProfile(author.key).githubUrl;
  }
  if (author.url && /github\.com\//i.test(author.url)) {
    return author.url.startsWith("http") ? author.url : `https://${author.url}`;
  }
  return undefined;
}

export default function BlogPostItemHeaderWrapper(props: Props): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { metadata, isBlogPostPage } = useBlogPost();

  if (!isBlogPostPage) {
    return <BlogPostItemHeaderOriginal {...props} />;
  }

  const primaryAuthor = metadata.authors?.[0];
  const profile = primaryAuthor?.key ? getAuthorProfile(primaryAuthor.key) : undefined;

  const authorAvatar = primaryAuthor?.imageURL || profile?.imageUrl;
  const authorName = primaryAuthor?.name || profile?.name;
  const githubHandle = primaryAuthor
    ? getGitHubHandle({ key: primaryAuthor.key, url: primaryAuthor.url })
    : undefined;
  const githubUrl = primaryAuthor
    ? getGitHubUrl({ key: primaryAuthor.key, url: primaryAuthor.url, name: primaryAuthor.name })
    : undefined;

  const roundedReadTime = Math.max(1, Math.ceil(metadata.readingTime || 0));
  const readTimeText = `${roundedReadTime} min read`;

  const blogDate = metadata.date
    ? new Intl.DateTimeFormat(siteConfig.i18n?.defaultLocale || "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date(metadata.date))
    : undefined;

  const tags = (metadata.tags ?? [])
    .map((t) => (typeof t === "string" ? t : (t as { label?: string }).label ?? ""))
    .filter(Boolean);

  return (
    <>
      {/* Render only the title — Info and Authors are replaced by our compact bar */}
      <BlogPostItemHeaderTitle />
      <div className={styles.metaSection}>
        {/* Compact meta row: avatar · @handle · date · reading time */}
        <div className={styles.metaRow}>
          {(authorAvatar || authorName) && (
            <div className={styles.authorPart}>
              {authorAvatar ? (
                <img
                  className={styles.avatar}
                  src={authorAvatar}
                  alt={authorName ? `${authorName} avatar` : "Author avatar"}
                  loading="lazy"
                />
              ) : (
                <div className={styles.avatarFallback} aria-hidden="true">
                  {authorName?.charAt(0).toUpperCase()}
                </div>
              )}
              {githubHandle &&
                (githubUrl ? (
                  <Link
                    to={githubUrl}
                    className={styles.handle}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {githubHandle}
                  </Link>
                ) : (
                  <span className={styles.handle}>{githubHandle}</span>
                ))}
            </div>
          )}

          {blogDate && (
            <>
              <span className={styles.sep} aria-hidden="true">
                •
              </span>
              <span className={styles.date}>{blogDate}</span>
            </>
          )}

          <span className={styles.sep} aria-hidden="true">
            •
          </span>
          <span className={styles.readTime}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {readTimeText}
          </span>
        </div>

        {/* Colored tag pills */}
        {tags.length > 0 && (
          <div className={styles.tagsRow} aria-label="Tags">
            {tags.map((tag) => {
              const c = tagColor(tag);
              return (
                <span
                  key={tag}
                  className={styles.tag}
                  style={
                    {
                      "--tag-dot": c.dot,
                      "--tag-border": c.border,
                      "--tag-bg": c.bg,
                      "--tag-text": c.text,
                    } as React.CSSProperties
                  }
                >
                  <span className={styles.tagDot} aria-hidden="true" />
                  {tag}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
