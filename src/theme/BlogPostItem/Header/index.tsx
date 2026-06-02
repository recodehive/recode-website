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

  // Build display data for ALL authors (not just the first one)
  const authors = (metadata.authors ?? []).map((author) => {
    const profile = author.key ? getAuthorProfile(author.key) : undefined;
    return {
      avatar: author.imageURL || profile?.imageUrl,
      name: author.name || profile?.name,
      handle: getGitHubHandle({ key: author.key, url: author.url }),
      url: getGitHubUrl({ key: author.key, url: author.url, name: author.name }),
    };
  });

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
        {/* Compact meta row: avatars · @handles · date · reading time */}
        <div className={styles.metaRow}>
          {authors.length > 0 && (
            <div className={styles.authorsPart}>
              {/* Stacked avatars */}
              <div className={styles.avatarStack}>
                {authors.map((author, idx) => (
                  <div
                    key={author.handle ?? `${author.name ?? ""}-${idx}`}
                    className={styles.avatarStackItem}
                    style={{ zIndex: authors.length - idx }}
                  >
                    {author.avatar ? (
                      <img
                        className={styles.avatar}
                        src={author.avatar}
                        alt={author.name ? `${author.name} avatar` : "Author avatar"}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.avatarFallback} aria-hidden="true">
                        {author.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Handles after the stack (only authors with a handle) */}
              {/* Full name after the stack */}
              {authors
                .filter((author) => author.name || author.handle)
                .map((author, idx) => (
                  <React.Fragment key={author.handle ?? author.name}>
                    {idx > 0 && (
                      <span className={styles.authorSep} aria-hidden="true">
                        ,
                      </span>
                    )}
                    {author.url ? (
                      <Link
                        to={author.url}
                        className={styles.handle}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {author.name || author.handle}
                      </Link>
                    ) : (
                      <span className={styles.handle}>{author.name || author.handle}</span>
                    )}
                  </React.Fragment>
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

        {/* Unified tag pills */}
        {tags.length > 0 && (
          <div className={styles.tagsRow} aria-label="Tags">
            {tags.map((tag) => {
              return (
                <span
                  key={tag}
                  className={styles.tag}
                >
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
