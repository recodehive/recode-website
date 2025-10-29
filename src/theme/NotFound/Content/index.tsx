import React, { type ReactNode, useState } from "react";
import clsx from "clsx";
import type { Props } from "@theme/NotFound/Content";
import Heading from "@theme/Heading";

// --- Style Definitions ---

// The main "card" background, from your footer's gradient
const wrapperStyle: React.CSSProperties = {
  background:
    "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)",
  borderRadius: "16px",
  padding: "4rem 2rem", // More vertical padding
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.3)",
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
};

// The giant "404" watermark
const big404Style: React.CSSProperties = {
  position: "absolute",
  fontSize: "20rem",
  fontWeight: 700,
  lineHeight: 1,
  color: "#A740F2", // Electric purple
  opacity: 0.05, // Make it very subtle on the dark background
  top: "-2rem",
  left: 0,
  right: 0,
  zIndex: 1,
  userSelect: "none",
};

// Gradient text for the main title, like in your footer
const titleStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  color: "transparent", // Fallback
  marginBottom: "1rem",
  position: "relative",
  zIndex: 2, // Above the watermark
};

// Style for the paragraph text
const textStyle: React.CSSProperties = {
  color: "#cbd5e1", // Light, soft gray
  fontSize: "1.25rem",
  fontWeight: 300,
  position: "relative",
  zIndex: 2,
};

// Button style from your footer's newsletter button
const buttonStyle: React.CSSProperties = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  color: "#ffffff",
  borderColor: "transparent",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  padding: "14px 28px",
  borderRadius: "12px",
  boxShadow:
    "0 8px 24px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s ease",
  position: "relative",
  zIndex: 2,
  cursor: "pointer",
  textDecoration: "none",
};

// Button hover effect, also from your CSS
const buttonHoverStyle: React.CSSProperties = {
  transform: "translateY(-2px) scale(1.02)",
  boxShadow:
    "0 12px 32px rgba(102, 126, 234, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
};

// --- The Component ---

export default function NotFoundContent({ className }: Props): ReactNode {
  // We use state to toggle the hover style for the button
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className={clsx("margin-vert--xl container", className)}>
      <div className="row">
        {/* We apply the card style to the column */}
        <div className={clsx("col col--8 col--offset-2")} style={wrapperStyle}>
          <div style={big404Style}>404</div>

          <Heading as="h1" className="hero__title" style={titleStyle}>
            Page Not Found
          </Heading>

          <p style={textStyle}>Looks like you've ventured into the unknown.</p>
          <p
            style={{
              ...textStyle,
              fontSize: "1rem",
              fontWeight: 400,
              opacity: 0.8,
            }}
          >
            Let's get you back to safety.
          </p>

          <div style={{ marginTop: "2rem" }}>
            <a
              href="/"
              className="button" // Remove button--primary, we are fully custom
              style={
                isHovered
                  ? { ...buttonStyle, ...buttonHoverStyle }
                  : buttonStyle
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Back to RecodeHive
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
