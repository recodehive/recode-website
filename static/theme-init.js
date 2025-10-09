// Minimal theme initialization - let Docusaurus handle theme management
(function () {
  "use strict";

  // Only set default theme if none exists, then let Docusaurus take over
  function initializeDefaultTheme() {
    try {
      // Only set default if no theme preference exists
      if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "light");
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch (error) {
      // Fallback to light theme
      document.documentElement.setAttribute("data-theme", "light");
    }
  }

  // Run once to set default, then let Docusaurus handle everything
  initializeDefaultTheme();
})();
