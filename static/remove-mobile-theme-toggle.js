// Remove theme toggle from mobile sidebar
(function () {
  "use strict";

  function removeMobileThemeToggle() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", removeMobileThemeToggle);
      return;
    }

    // Function to remove theme toggle from mobile sidebar
    function hideThemeToggle() {
      let found = false;

      // First, try to find the navbar sidebar brand container
      const sidebarBrand = document.querySelector(".navbar-sidebar__brand");
      if (sidebarBrand) {
        console.log("🔍 Found sidebar brand container:", sidebarBrand);

        // Look for all buttons in the sidebar brand
        const buttons = sidebarBrand.querySelectorAll("button");
        buttons.forEach((button, index) => {
          console.log(`🔍 Button ${index}:`, button);
          console.log("  - Classes:", button.className);
          console.log("  - Aria-label:", button.getAttribute("aria-label"));
          console.log("  - Has SVG:", !!button.querySelector("svg"));

          // Check if this button contains theme-related content
          const ariaLabel = button.getAttribute("aria-label") || "";
          const hasThemeIcon =
            button.querySelector("svg") &&
            (ariaLabel.toLowerCase().includes("mode") ||
              ariaLabel.toLowerCase().includes("theme") ||
              ariaLabel.toLowerCase().includes("dark") ||
              ariaLabel.toLowerCase().includes("light"));

          // Also check if it's NOT the close button
          const isCloseButton =
            ariaLabel.toLowerCase().includes("close") ||
            ariaLabel.toLowerCase().includes("navigation") ||
            button.classList.contains("navbar-sidebar__close");

          if (hasThemeIcon && !isCloseButton) {
            console.log("🎯 Found theme toggle button, removing:", button);
            button.remove(); // Completely remove the element
            found = true;
          } else if (!isCloseButton && button.querySelector("svg")) {
            // If it's not the close button but has an SVG, it might be the theme toggle
            console.log(
              "🤔 Potential theme toggle (removing to be safe):",
              button,
            );
            button.remove();
            found = true;
          }
        });
      }

      // Fallback: Look for any button with theme-related aria-labels in the sidebar
      const sidebar = document.querySelector(".navbar-sidebar");
      if (sidebar) {
        const themeButtons = sidebar.querySelectorAll(
          'button[aria-label*="mode"], button[aria-label*="theme"], button[aria-label*="dark"], button[aria-label*="light"]',
        );
        themeButtons.forEach((button) => {
          if (!button.classList.contains("navbar-sidebar__close")) {
            console.log(
              "🎯 Found theme button via fallback, removing:",
              button,
            );
            button.remove();
            found = true;
          }
        });
      }

      return found;
    }

    // Try to hide immediately and repeatedly
    hideThemeToggle();

    // Also try after short delays in case components load later
    setTimeout(hideThemeToggle, 50);
    setTimeout(hideThemeToggle, 100);
    setTimeout(hideThemeToggle, 200);
    setTimeout(hideThemeToggle, 500);
    setTimeout(hideThemeToggle, 1000);
    setTimeout(hideThemeToggle, 2000);

    // Set up an interval to check every 500ms for the first 10 seconds
    let attempts = 0;
    const maxAttempts = 20; // 10 seconds
    const interval = setInterval(() => {
      attempts++;
      const found = hideThemeToggle();
      if (found || attempts >= maxAttempts) {
        clearInterval(interval);
        if (found) {
          console.log(
            "✅ Successfully removed theme toggle from mobile sidebar",
          );
        }
      }
    }, 500);

    // Set up a mutation observer to catch dynamically added elements
    const observer = new MutationObserver(function (mutations) {
      let shouldCheck = false;
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          // Check if any added nodes contain sidebar elements
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) {
              // Element node
              if (
                node.classList?.contains("navbar-sidebar") ||
                node.querySelector?.(".navbar-sidebar")
              ) {
                shouldCheck = true;
              }
            }
          });
        }
      });

      if (shouldCheck) {
        setTimeout(hideThemeToggle, 50);
      }
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    console.log("🚀 Mobile theme toggle remover initialized");
  }

  // Initialize
  removeMobileThemeToggle();
})();
