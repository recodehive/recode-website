(function() {
  'use strict';
  
  // Simple theme flash prevention - let Docusaurus handle the rest
  function preventFlash() {
    // Check Docusaurus's preferred storage key first
    const docusaurusTheme = localStorage.getItem('theme');
    if (docusaurusTheme) {
      document.documentElement.setAttribute('data-theme', docusaurusTheme);
    }
  }
  
  // Only prevent flash, don't override Docusaurus
  preventFlash();
})();