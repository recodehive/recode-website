import React, { useEffect, useState, useCallback, useRef } from "react";
import styles from "./styles.module.css";

const MIN_REMAINING_MINUTES = 1;

interface Props {
  totalReadTime: number; // in minutes
  authorCardRef: React.RefObject<HTMLElement | null>;
}

export default function ReadingTimeIndicator({
  totalReadTime,
  authorCardRef,
}: Props): JSX.Element | null {
  const [visible, setVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(totalReadTime);
  const rafRef = useRef<number | null>(null);

  const computeState = useCallback(() => {
    const scrollY = window.scrollY;
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const maxScroll = docHeight - winHeight;
    const pageScrollPercent = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    // Hide when the author card has entered the viewport,
    // or fall back to hiding at 90% page scroll when there is no author card
    let authorCardReached = false;
    if (authorCardRef.current) {
      const rect = authorCardRef.current.getBoundingClientRect();
      authorCardReached = rect.top < winHeight;
    } else {
      authorCardReached = pageScrollPercent >= 90;
    }

    const shouldBeVisible = pageScrollPercent >= 15 && !authorCardReached;
    setVisible(shouldBeVisible);

    // Calculate remaining time proportional to how far through the content the
    // user has scrolled. Use author card position when available; otherwise use
    // overall page scroll percentage as fallback.
    if (shouldBeVisible) {
      let readProgress = 0;
      if (authorCardRef.current) {
        const authorCardAbsTop =
          authorCardRef.current.getBoundingClientRect().top + scrollY;
        readProgress =
          authorCardAbsTop > 0
            ? Math.max(0, Math.min(1, scrollY / authorCardAbsTop))
            : 0;
      } else {
        readProgress = Math.max(0, Math.min(1, pageScrollPercent / 90));
      }
      const remaining = Math.max(
        MIN_REMAINING_MINUTES,
        Math.ceil(totalReadTime * (1 - readProgress))
      );
      setRemainingTime(remaining);
    }
  }, [totalReadTime, authorCardRef]);

  const handleScroll = useCallback(() => {
    // Throttle via requestAnimationFrame to avoid expensive layout reads on
    // every scroll event.
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      computeState();
    });
  }, [computeState]);

  useEffect(() => {
    if (totalReadTime < MIN_REMAINING_MINUTES) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    computeState();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [handleScroll, computeState, totalReadTime]);

  if (totalReadTime < MIN_REMAINING_MINUTES || !visible) return null;

  const minLabel = remainingTime === MIN_REMAINING_MINUTES ? "min" : "mins";

  return (
    <div
      className={styles.container}
      role="status"
      aria-label={`Estimated reading time: ${remainingTime} ${minLabel} remaining`}
      aria-live="polite"
      aria-atomic="true"
    >
      <svg
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
        className={styles.icon}
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>{remainingTime} {minLabel} remaining</span>
    </div>
  );
}
