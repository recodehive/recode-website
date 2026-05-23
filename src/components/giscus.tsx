// import React, { useEffect, useRef } from "react";

// const GiscusComments: React.FC = () => {
//   const ref = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!ref.current) return;
//     // Prevent duplicate script injection
//     if (ref.current.querySelector("iframe")) return;

//     const script = document.createElement("script");
//     script.src = "https://giscus.app/client.js";
//     script.setAttribute("data-repo", "recodehive/Support");
//     script.setAttribute("data-repo-id", "R_kgDOL9urew");
//     script.setAttribute("data-category", "General");
//     script.setAttribute("data-category-id", "DIC_kwDOL9ure84Cqizj");
//     script.setAttribute("data-mapping", "og:title");
//     script.setAttribute("data-strict", "0");
//     script.setAttribute("data-reactions-enabled", "1");
//     script.setAttribute("data-emit-metadata", "0");
//     script.setAttribute("data-input-position", "top");
//     script.setAttribute("data-theme", "preferred_color_scheme");
//     script.setAttribute("data-lang", "en");
//     script.crossOrigin = "anonymous";
//     script.async = true;
//     ref.current.appendChild(script);
//   }, []);

//   return <div ref={ref} />;
// };

// export default GiscusComments;

// import React, { useEffect, useRef } from "react";
// import { useColorMode } from "@docusaurus/theme-common"

// const GiscusComments: React.FC = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const { colorMode } = useColorMode();
//   console.log(colorMode)
//   useEffect(() => {
//     if (!ref.current) return;
//     // Prevent duplicate script injection
//     if (ref.current.querySelector("iframe")) return;

//     const script = document.createElement("script");
//     script.src = "https://giscus.app/client.js";
//     script.setAttribute("data-repo", "recodehive/Support");
//     script.setAttribute("data-repo-id", "R_kgDOL9urew");
//     script.setAttribute("data-category", "General");
//     script.setAttribute("data-category-id", "DIC_kwDOL9ure84Cqizj");
//     script.setAttribute("data-mapping", "og:title");
//     script.setAttribute("data-strict", "0");
//     script.setAttribute("data-reactions-enabled", "1");
//     script.setAttribute("data-emit-metadata", "0");
//     script.setAttribute("data-input-position", "top");

//     // Set the default theme to "light"
//     script.setAttribute("data-theme", colorMode);

//     script.setAttribute("data-lang", "en");
//     script.crossOrigin = "anonymous";
//     script.async = true;
//     ref.current.appendChild(script);
//   }, [colorMode]);

//   return <div ref={ref} />;
// };

// export default GiscusComments;

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "./giscus.module.css";

type GiscusCommentsProps = {
  forceRender?: boolean;
};

const GiscusComments: React.FC<GiscusCommentsProps> = ({
  forceRender = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const { colorMode } = useColorMode(); // colorMode is 'light' or 'dark'
  const isBlogPostPage = pathname.startsWith("/blog/");
  const [improvePageUrl, setImprovePageUrl] = useState<string>("");

  if (isBlogPostPage && !forceRender) {
    return null;
  }

  // 1. This useEffect handles the initial script loading ONCE.
  useEffect(() => {
    // Exit if the ref isn't set or if the script is already there
    if (!ref.current || ref.current.hasChildNodes()) {
      return;
    }

    // Use localStorage to get user's last theme or fallback to 'light'
    const storedTheme =
      localStorage.getItem("theme") ||
      (document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light");

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "recodehive/Support");
    script.setAttribute("data-repo-id", "R_kgDOL9urew");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOL9ure84Cqizj");
    script.setAttribute("data-mapping", "og:title");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-lang", "en");

    // Use the initial colorMode from Docusaurus for the initial theme
    script.setAttribute("data-theme", storedTheme);

    ref.current.appendChild(script);
  }, []); // <-- Empty dependency array ensures this runs only once on mount.

  // 2. This useEffect watches for changes in colorMode and sends a message to Giscus.
  useEffect(() => {
    const iframe = ref.current?.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );

    if (!iframe) {
      return;
    }

    // Send a message to the Giscus iframe to update its theme
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme: colorMode } } },
      "https://giscus.app",
    );
  }, [colorMode]); // <-- This runs every time colorMode changes.

  useEffect(() => {
    if (forceRender) {
      return;
    }

    const resolveImproveUrl = () => {
      const editThisPageAnchor = document.querySelector<HTMLAnchorElement>(
        "a.theme-edit-this-page",
      );
      const nextImproveUrl = editThisPageAnchor?.href || "";
      setImprovePageUrl(nextImproveUrl);
      return Boolean(nextImproveUrl);
    };

    if (resolveImproveUrl()) {
      return;
    }

    const observerRoot =
      ref.current?.closest("article") ||
      document.querySelector("article") ||
      document.querySelector("main") ||
      // Fallback keeps behavior safe on pages without standard doc/blog layout wrappers.
      document.body;
    const observer = new MutationObserver(() => {
      if (resolveImproveUrl()) {
        observer.disconnect();
      }
    });

    observer.observe(observerRoot, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [forceRender, pathname]);

  return (
    <>
      <div ref={ref} />
      {!forceRender && improvePageUrl && (
        <p className={styles.improveCta}>
          Found something to improve?{" "}
          <a
            className={styles.improveLink}
            href={improvePageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Improve this page
          </a>
        </p>
      )}
    </>
  );
};

export default GiscusComments;
