import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useBlogPost } from "@docusaurus/plugin-content-blog/client";
import BlogPostItemFooterOriginal from "@theme-original/BlogPostItem/Footer";
import type BlogPostItemFooterType from "@theme/BlogPostItem/Footer";
import type { WrapperProps } from "@docusaurus/types";
import GiscusComments from "../../../components/giscus";
import SocialShare from "../../../components/SocialShare";
import { getAuthorProfile } from "../../../utils/authors";

import styles from "./styles.module.css";

type Props = WrapperProps<typeof BlogPostItemFooterType>;
const META_SEPARATOR = " • ";

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
  const { siteConfig } = useDocusaurusContext();
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
    new Intl.DateTimeFormat(siteConfig.i18n?.defaultLocale || "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(metadata.date));
  const metaItems = [authorHandle, blogDate, readTimeText]
    .filter(Boolean)
    .join(META_SEPARATOR);

  const showAuthorCard = Boolean(isBlogPostPage && primaryAuthor && authorName);

  return (
    <>
      {!isBlogPostPage && <BlogPostItemFooterOriginal {...props} />}
      {isBlogPostPage && (
        <SocialShare permalink={metadata.permalink} title={metadata.title} />
      )}
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
      {isBlogPostPage && <GiscusComments forceRender />}
      {isBlogPostPage && (
        <section className={styles.improveBanner} aria-label="Improve this blog post">
          <div className={styles.improveIconWrap} aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <div className={styles.improveContent}>
            <h3 className={styles.improveTitle}>Improve this Blog Post</h3>
            <p className={styles.improveDescription}>
              All our blog posts are open source. Found a typo, want to add more
              detail, or have a better explanation? Anyone can contribute and
              make this post better for everyone.
            </p>
            <div className={styles.improveActions}>
              {metadata.editUrl && (
                <Link
                  className={styles.improveEditButton}
                  to={metadata.editUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Edit this Post on GitHub
                </Link>
              )}
              <Link
                className={styles.improveGuidelinesButton}
                to="https://www.recodehive.com/docs/Getting-Started"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Contributing Guidelines
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
