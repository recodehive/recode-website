import React, { useEffect, useState, useRef } from "react";
import Link from "@docusaurus/Link";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/react";
import clsx from "clsx"; // Import clsx for conditional classes
import styles from "./Root.module.css"; // Import the CSS module
import { useLocation } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

function isEditableEventTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) {
    return false;
  }

  if (target.isContentEditable) {
    return true;
  }

  const tagName = target.tagName.toLowerCase();
  if (tagName === "textarea" || tagName === "select") {
    return true;
  }

  if (target instanceof HTMLInputElement) {
    const editableTypes = new Set([
      "text",
      "search",
      "url",
      "tel",
      "email",
      "password",
      "number",
      "date",
      "datetime-local",
      "month",
      "time",
      "week",
    ]);
    return !target.readOnly && !target.disabled && editableTypes.has(target.type);
  }

  return target.matches(
    "[contenteditable='true'], [contenteditable=''], [contenteditable='plaintext-only']",
  );
}

function focusSearchInput(): boolean {
  const navbarSearch = document.querySelector<HTMLInputElement>(
    "#algolia-sitesearch-navbar input",
  );
  if (navbarSearch) {
    navbarSearch.focus({ preventScroll: true });
    return true;
  }

  const blogSearch = document.querySelector<HTMLInputElement>(".blog-search-input");
  if (blogSearch) {
    blogSearch.focus({ preventScroll: true });
    return true;
  }

  return false;
}

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
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const [showToast, setShowToast] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const clerkPublishableKey = customFields?.clerkPublishableKey as
    | string
    | undefined;
  const clerkAppearance = {
    variables: {
      colorPrimary: "var(--ifm-color-primary)",
      colorBackground: "var(--ifm-background-surface-color)",
      colorForeground: "var(--ifm-color-content)",
      colorMutedForeground: "var(--ifm-color-content-secondary)",
      colorInputBackground: "var(--ifm-background-color)",
      colorInputForeground: "var(--ifm-color-content)",
      colorRing: "rgba(56, 161, 105, 0.24)",
      colorModalBackdrop: "rgba(15, 23, 42, 0.62)",
      borderRadius: "0.75rem",
      fontFamily: "var(--ifm-font-family-base)",
    },
    layout: {
      logoImageUrl: "/img/logo.png",
      socialButtonsPlacement: "top" as const,
      socialButtonsVariant: "blockButton" as const,
    },
    elements: {
      cardBox: {
        border: "1px solid var(--ifm-color-emphasis-200)",
        boxShadow: "0 24px 80px rgba(15, 23, 42, 0.24)",
      },
      card: {
        backgroundColor: "var(--ifm-background-surface-color)",
      },
      logoBox: {
        marginBottom: "0.75rem",
      },
      logoImage: {
        height: "2rem",
      },
      headerTitle: {
        color: "var(--ifm-color-content)",
        fontWeight: 700,
        letterSpacing: "0",
      },
      headerSubtitle: {
        color: "var(--ifm-color-content-secondary)",
      },
      socialButtonsBlockButton: {
        border: "1px solid var(--recode-auth-button-border)",
        backgroundColor: "var(--recode-auth-button-bg)",
        color: "var(--recode-auth-button-text)",
        boxShadow: "var(--recode-auth-button-shadow)",
        transition:
          "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover, &:focus, &:active": {
          backgroundColor: "var(--recode-auth-button-hover-bg)",
          borderColor: "var(--recode-auth-button-hover-border)",
          color: "var(--recode-auth-button-hover-text)",
          boxShadow: "var(--recode-auth-button-hover-shadow)",
        },
      },
      socialButtonsBlockButtonText: {
        fontWeight: 700,
      },
      footer: {
        borderTop: "1px solid var(--ifm-color-emphasis-200)",
        backgroundColor: "var(--ifm-background-surface-color)",
      },
      footerActionText: {
        color: "var(--ifm-color-content-secondary)",
      },
      footerActionLink: {
        color: "var(--ifm-color-primary)",
        fontWeight: 600,
      },
      modalBackdrop: {
        backdropFilter: "blur(4px)",
      },
    },
  };

  // Check if current page is sponsors page
  const isSponsorsPage =
    location.pathname === "/our-sponsors/" ||
    location.pathname === "/our-sponsors";

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

  useEffect(() => {
    function handleGlobalSearchShortcut(event: KeyboardEvent) {
      if (
        event.key !== "/" ||
        event.defaultPrevented ||
        event.metaKey ||
        event.altKey ||
        event.ctrlKey
      ) {
        return;
      }

      if (isEditableEventTarget(event.target)) {
        return;
      }

      if (focusSearchInput()) {
        event.preventDefault();
      }
    }

    document.addEventListener("keydown", handleGlobalSearchShortcut);
    return () => {
      document.removeEventListener("keydown", handleGlobalSearchShortcut);
    };
  }, []);

  // Show toast on initial load for all pages
  useEffect(() => {
    setShowToast(true);
    timerRef.current = setTimeout(() => {
      setShowToast(false);
      timerRef.current = null;
    }, 10000);
    setIsInitialLoad(false);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

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

  const content = (
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

  if (!clerkPublishableKey) {
    return content;
  }

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      afterSignOutUrl="/"
      appearance={clerkAppearance}
    >
      {content}
    </ClerkProvider>
  );
}
