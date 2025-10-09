import React from "react";
import { Analytics } from "@vercel/analytics/react";

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <>
      {children}
      {/* Only load analytics in production */}
      {process.env.NODE_ENV === "production" && <Analytics />}
    </>
  );
}
