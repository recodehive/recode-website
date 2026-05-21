import React from "react";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import BlogPostItemFooterOriginal from "@theme-original/BlogPostItem/Footer";
import type BlogPostItemFooterType from "@theme/BlogPostItem/Footer";
import type { WrapperProps } from "@docusaurus/types";
import { getAuthorProfile } from "@site/src/utils/authors";

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
  const authorSummary =
    primaryAuthor?.description ||
    profile?.description ||
    primaryAuthor?.title ||
    profile?.title;
  const blogDate =
    metadata.formattedDate ||
    (metadata.date
      ? new Date(metadata.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "");

  const showAuthorCard = Boolean(isBlogPostPage && primaryAuthor && authorName);

  return (
    <>
      <BlogPostItemFooterOriginal {...props} />
      {showAuthorCard && (
        <section className={styles.authorCard} aria-label="Post author details">
          <div className={styles.authorLeft}>
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
            <div className={styles.authorIdentity}>
              <p className={styles.authorName}>{authorName}</p>
              {blogDate ? <p className={styles.authorDate}>{blogDate}</p> : null}
              {authorSummary ? (
                <p className={styles.authorSummary}>{authorSummary}</p>
              ) : null}
            </div>
          </div>

          <div className={styles.authorRight}>
            <p className={styles.readTime}>{readTimeText}</p>
            {githubUrl ? (
              <Link
                className={styles.githubButton}
                to={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Profile
              </Link>
            ) : null}
          </div>
        </section>
      )}
    </>
  );
}
