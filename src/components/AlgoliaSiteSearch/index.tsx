import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const containerId = "algolia-sitesearch-navbar";
const siteSearchScriptId = "algolia-sitesearch-script";
const siteSearchStylesheetId = "algolia-sitesearch-stylesheet";
const siteSearchScriptUrl =
  "https://unpkg.com/@algolia/sitesearch@latest/dist/search.min.js";
const siteSearchStylesheetUrl =
  "https://unpkg.com/@algolia/sitesearch@latest/dist/search.min.css";

type SiteSearchConfig = {
  applicationId?: unknown;
  apiKey?: unknown;
  indexName?: unknown;
};

declare global {
  interface Window {
    SiteSearch?: {
      init: (config: {
        container: string;
        applicationId: string;
        apiKey: string;
        indexName: string;
        insights?: boolean;
        attributes: {
          primaryText: string;
          secondaryText: string;
          tertiaryText: string;
          url: string;
          image: string;
        };
        darkMode: boolean;
      }) => void;
      destroy?: (container: string) => void;
    };
  }
}

function toConfigString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function ensureSiteSearchStylesheet() {
  if (document.getElementById(siteSearchStylesheetId)) {
    return;
  }

  const stylesheet = document.createElement("link");
  stylesheet.id = siteSearchStylesheetId;
  stylesheet.rel = "stylesheet";
  stylesheet.href = siteSearchStylesheetUrl;
  document.head.appendChild(stylesheet);
}

function loadSiteSearchScript(): Promise<void> {
  if (window.SiteSearch?.init) {
    return Promise.resolve();
  }

  const existingScript = document.getElementById(
    siteSearchScriptId,
  ) as HTMLScriptElement | null;

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = siteSearchScriptId;
    script.src = siteSearchScriptUrl;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });
}

export default function AlgoliaSiteSearch(): React.ReactElement | null {
  const { siteConfig } = useDocusaurusContext();
  const config = siteConfig.customFields.algoliaSiteSearch as
    | SiteSearchConfig
    | undefined;

  const applicationId = toConfigString(config?.applicationId);
  const apiKey = toConfigString(config?.apiKey);
  const indexName = toConfigString(config?.indexName);
  const isConfigured = Boolean(applicationId && apiKey && indexName);

  useEffect(() => {
    ensureSiteSearchStylesheet();

    if (!isConfigured) {
      return;
    }

    let cancelled = false;

    loadSiteSearchScript()
      .then(() => {
        if (cancelled || !window.SiteSearch?.init) {
          return;
        }

        const container = document.getElementById(containerId);
        if (!container) {
          return;
        }

        container.innerHTML = "";
        window.SiteSearch.init({
          container: `#${containerId}`,
          applicationId,
          apiKey,
          indexName,
          insights: false,
          attributes: {
            primaryText: "title",
            secondaryText: "description",
            tertiaryText: "headers",
            url: "url",
            image: "image",
          },
          darkMode: document.documentElement.dataset.theme === "dark",
        });
      })
      .catch((error) => {
        console.error("Failed to initialize Algolia SiteSearch", error);
      });

    return () => {
      cancelled = true;
      window.SiteSearch?.destroy?.(`#${containerId}`);
    };
  }, [apiKey, applicationId, indexName, isConfigured]);

  if (!isConfigured) {
    return (
      <div className="navbar__item algolia-sitesearch-navbar">
        <button
          className="sitesearch-button"
          style={{ opacity: 0.6, cursor: "not-allowed" }}
          title="Search (Algolia SiteSearch credentials not configured)"
        >
          <span className="search-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <span className="button-text">Search...</span>
          <span className="keyboard-shortcut">
            <span>Ctrl</span>
            <span>K</span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="navbar__item algolia-sitesearch-navbar">
      <div id={containerId} />
    </div>
  );
}
