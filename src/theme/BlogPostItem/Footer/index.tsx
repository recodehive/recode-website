import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import BlogPostItemFooterOriginal from "@theme-original/BlogPostItem/Footer";
import type BlogPostItemFooterType from "@theme/BlogPostItem/Footer";
import type { WrapperProps } from "@docusaurus/types";
import { getAuthorProfile } from "../../../utils/authors";

import styles from "./styles.module.css";

type Props = WrapperProps<typeof BlogPostItemFooterType>;

function getGitHubUrl(author: {
  key?: string;
  url?: string;
  name?: string;
}): string | undefined {
  if (author.key) {
    return getAuthorProfile(author.key).githubUrl;
  }

  if (author.url && /github\.com\//i.test(author.url)) {
    return author.url.startsWith("http") ? author.url : `https://${author.url}`;
  }

  return undefined;
}

function getGitHubHandle(author: {
  key?: string;
  url?: string;
}): string | undefined {
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

export default function BlogPostItemFooterWrapper(props: Props): JSX.Element {
  const { metadata, isBlogPostPage } = useBlogPost();
  const primaryAuthor = metadata.authors?.[0];

  const profile = primaryAuthor?.key
    ? getAuthorProfile(primaryAuthor.key)
    : undefined;

  const authorName = primaryAuthor?.name || profile?.name;
  const authorAvatar = primaryAuthor?.imageURL || profile?.imageUrl;
  const githubUrl = primaryAuthor
    ? getGitHubUrl({
        key: primaryAuthor.key,
        name: primaryAuthor.name,
        url: primaryAuthor.url,
      })
    : undefined;

  const roundedReadTime = Math.max(1, Math.ceil(metadata.readingTime || 0));
  const readTimeText = `${roundedReadTime} min read`;
  const authorHandle = primaryAuthor
    ? getGitHubHandle({
        key: primaryAuthor.key,
        url: primaryAuthor.url,
      })
    : undefined;
  const authorSummary =
    primaryAuthor?.description ||
    profile?.description ||
    primaryAuthor?.title ||
    profile?.title;
  const blogDate =
    metadata.date &&
    new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(metadata.date));
  const metaItems = [authorHandle, blogDate, readTimeText].filter(Boolean).join(" • ");

  const showAuthorCard = Boolean(isBlogPostPage && primaryAuthor && authorName);

  return (
    <>
      <BlogPostItemFooterOriginal {...props} />
      {showAuthorCard && (
        <section className={styles.authorCard} aria-label="Post author details">
          <div className={styles.authorBody}>
            <div className={styles.authorAvatarWrapper}>
            {authorAvatar ? (
              <img
                className={styles.authorAvatar}
                src={authorAvatar}
                alt={`${authorName} profile picture`}
                loading="lazy"
              />
            ) : (
              <div className={styles.authorAvatarFallback} aria-hidden="true">
                {authorName?.charAt(0).toUpperCase()}
              </div>
            )}
              <span className={styles.verifiedBadge} aria-hidden="true">
                ✓
              </span>
            </div>
            <div className={styles.authorIdentity}>
              <div className={styles.authorNameRow}>
                <p className={styles.authorName}>{authorName}</p>
                <span className={styles.authorBadge}>Author</span>
              </div>
              {metaItems ? <p className={styles.authorMeta}>{metaItems}</p> : null}
              {authorSummary ? (
                <p className={styles.authorSummary}>{authorSummary}</p>
              ) : null}
              {githubUrl ? (
                <Link
                  className={styles.githubButton}
                  to={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.githubIcon} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14" focusable="false">
                      <path
                        fill="currentColor"
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.5 7.5 0 0 1 8 3.8c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                      />
                    </svg>
                  </span>
                  GitHub
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
