// Theme initialization script
(function() {
  'use strict';
  
  // Function to set theme INSTANTLY
  function setTheme(theme) {
    // Immediate DOM updates
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    document.body.className = document.body.className.replace(/theme-\w+/g, '') + ` theme-${theme}`;

    // Force immediate CSS variable updates
    if (theme === 'light') {
      document.documentElement.style.setProperty('--ifm-background-color', '#ffffff');
      document.documentElement.style.setProperty('--ifm-font-color-base', '#1a202c');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1a202c';
    } else {
      document.documentElement.style.setProperty('--ifm-background-color', '#121212');
      document.documentElement.style.setProperty('--ifm-font-color-base', '#ffffff');
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#ffffff';
    }

    localStorage.setItem('theme', theme);
  }
  
  // Function to get system preference
  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Initialize theme - FORCE LIGHT FIRST TIME
  function initializeTheme() {
    try {
      // Clear any existing theme to force light
      if (!localStorage.getItem('theme')) {
        localStorage.removeItem('theme');
      }

      const savedTheme = localStorage.getItem('theme');
      const theme = savedTheme || 'light';

      // Force set the theme
      document.documentElement.setAttribute('data-theme', theme);
      document.body.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);

      console.log('🌞 Theme initialized:', theme);
    } catch (error) {
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.setAttribute('data-theme', 'light');
    }
  }
  
  // Listen for system theme changes
  function setupSystemThemeListener() {
    try {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', function(e) {
        // Only update if no manual theme preference is saved
        if (!localStorage.getItem('theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          setTheme(newTheme);
          console.log('🌙 System theme changed to:', newTheme);
        }
      });
    } catch (error) {
      console.warn('Failed to setup system theme listener:', error);
    }
  }
  
  // Run immediately if DOM is ready, otherwise wait
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initializeTheme();
      setupSystemThemeListener();
    });
  } else {
    initializeTheme();
    setupSystemThemeListener();
  }
})();
