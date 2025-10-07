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

import React, { useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

const GiscusComments: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode(); // colorMode is 'light' or 'dark'

  // 1. This useEffect handles the initial script loading ONCE.
  useEffect(() => {
    // Exit if the ref isn't set or if the script is already there
    if (!ref.current || ref.current.hasChildNodes()) {
      return;
    }

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
    script.setAttribute("data-theme", colorMode);

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

  return <div ref={ref} />;
};

export default GiscusComments;
