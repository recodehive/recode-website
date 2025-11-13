import { useState, useEffect } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

/**
 * Safe hook for color mode that handles SSR and avoids ColorModeProvider issues.
 * This hook reads the theme directly from the DOM instead of relying on Docusaurus context.
 *
 * @returns {Object} Object containing colorMode, isDark, and mounted state
 */
export function useSafeColorMode() {
  const [mounted, setMounted] = useState(false);
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!ExecutionEnvironment.canUseDOM) return;

    const getThemeFromDOM = () =>
      (document.documentElement.getAttribute("data-theme") as
        | "light"
        | "dark") || "light";

    const applyTheme = () => {
      const mode = getThemeFromDOM();
      setColorMode(mode);
      setIsDark(mode === "dark");
    };

    // set immediately on mount
    applyTheme();

    // watch for changes when navbar toggle is clicked
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return { colorMode, isDark, mounted };
}
