import React, { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';

// Default implementation, that you can customize
export default function Root({children}) {
  useEffect(() => {
    // Ensure theme is properly set on client-side hydration
    const savedTheme = localStorage.getItem('theme');
    // Force light as default, ignore system preference unless user has manually set a preference
    const theme = savedTheme || 'light';

    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <>
      {children}
      {/* Only load analytics in production */}
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </>
  );
}
