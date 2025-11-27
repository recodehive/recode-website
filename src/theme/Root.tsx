import React, { useEffect, useState, useRef } from "react";
import Link from "@docusaurus/Link";
import { Analytics } from "@vercel/analytics/react";
import clsx from "clsx"; // Import clsx for conditional classes
import styles from "./Root.module.css"; // Import the CSS module
import { useLocation } from "@docusaurus/router";

// A simple Trophy SVG icon component
function TrophyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.toastIcon}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

export default function Root({ children }: { children: React.ReactNode }) {
  const [showToast, setShowToast] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Check if current page is sponsors page
  const isSponsorsPage = location.pathname === '/our-sponsors/' || location.pathname === '/our-sponsors';

  // Theme detection logic
  useEffect(() => {
    const html = document.documentElement;
    const checkTheme = () => {
      const attrDark = html.getAttribute("data-theme") === "dark";
      const classDark = html.classList.contains("dark");
      setIsDark(attrDark || classDark);
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Show toast on initial load for all pages
  useEffect(() => {
    if (isInitialLoad) {
      setShowToast(true);
      timerRef.current = setTimeout(() => setShowToast(false), 10000);
      setIsInitialLoad(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isInitialLoad]);

  // Show toast on navigation only for sponsors page
  useEffect(() => {
    if (!isInitialLoad && isSponsorsPage) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      setShowToast(false);
      const showTimer = setTimeout(() => {
        setShowToast(true);
        timerRef.current = setTimeout(() => setShowToast(false), 10000);
      }, 200);

      return () => {
        clearTimeout(showTimer);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [location.pathname, isInitialLoad]);

  // Handle manual close
  const handleCloseToast = () => {
    setShowToast(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <>
      {children}

      {showToast && (
        <div
          // Use clsx to combine base class with theme-specific class
          className={clsx(
            styles.toastContainer,
            isDark ? styles.toastDark : styles.toastLight,
          )}
        >
          <TrophyIcon />
          <div className={styles.toastContent}>
            {isSponsorsPage ? (
              <>
                Do u want to get{" "}
                <Link to="/dashboard#leaderboard" className={styles.toastLink}>
                  sponsored
                </Link>
                ?
              </>
            ) : (
              <>
                Check out our latest{" "}
                <Link to="/dashboard#leaderboard" className={styles.toastLink}>
                  leaderboard
                </Link>
                !
              </>
            )}
          </div>
          <button
            onClick={handleCloseToast}
            className={styles.toastCloseButton}
            aria-label="Close notification"
          >
            &times;
          </button>
        </div>
      )}

      {process.env.NODE_ENV === "production" && <Analytics />}
    </>
  );
}
