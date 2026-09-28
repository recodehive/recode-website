import React, { useEffect, useState, useCallback, useRef } from "react";
import clsx from "clsx";
import { useLocation } from "@docusaurus/router";
import TOCItems from "@theme/TOCItems";
import type { Props } from "@theme/TOC";

import styles from "./styles.module.css";

const LINK_CLASS_NAME = "table-of-contents__link toc-highlight";
const LINK_ACTIVE_CLASS_NAME = "table-of-contents__link--active";

function ReadingProgress(): JSX.Element {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const computeProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const maxScroll = docHeight - winHeight;
    const percent =
      maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0;
    setProgress(Math.round(percent));
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      computeProgress();
    });
  }, [computeProgress]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    computeProgress();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, computeProgress]);

  return (
    <div
      className={styles.progressContainer}
      role="status"
      aria-label={`Reading progress: ${progress}%`}
      aria-live="polite"
    >
      <div className={styles.progressHeader}>
        <span className={styles.progressLabel}>
          <svg
            className={styles.progressIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" />
            <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
          </svg>
          Reading Progress
        </span>
        <span className={styles.progressPercent}>{progress}%</span>
      </div>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default function TOC({ className, ...props }: Props): JSX.Element {
  const { pathname } = useLocation();
  const isBlogPost = pathname.includes("/blog/") && pathname !== "/blog/";

  return (
    <div className={clsx(styles.tableOfContents, "thin-scrollbar", className)}>
      {isBlogPost && <ReadingProgress />}
      <TOCItems
        {...props}
        linkClassName={LINK_CLASS_NAME}
        linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
      />
    </div>
  );
}