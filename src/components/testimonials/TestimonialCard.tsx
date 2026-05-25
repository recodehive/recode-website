import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSafeColorMode } from "../../utils/useSafeColorMode";


interface TestimonialCardProps {
  name: string;
  username: string;
  content: string;
  date: string;
  avatar: string;
  gradient?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  username,
  content,
  date,
  avatar,
  gradient,
}) => {
  const { isDark } = useSafeColorMode();

  // Map gradient prop to card visual variant
  const isAccent = gradient === "bg-purple-100";
  const isFeatured = gradient === "bg-pink-100";

  const getRole = () => {
    if (username === "VivienChen") return "Founder @ Toastie (BC Y24)";
    if (username === "DanielHan") return "Founder @ Unsloth AI (YC W24, BC Y24)";
    if (username === "EthanTrang") return "AI Engineer @ Relevance AI";
    return null;
  };

  const role = getRole();

  // Card colors by variant
  const cardBg = isAccent
    ? "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)"
    : isDark
      ? "#0a0a0a"
      : "#ffffff";

  const isInverted = isAccent || isDark;
  const textClr = isInverted ? "rgba(255,255,255,0.85)" : "rgba(17,24,39,0.78)";
  const nameClr = isInverted ? "#f1f5f9" : "#0f172a";
  const mutedClr = isAccent
    ? "rgba(255,255,255,0.50)"
    : isDark
      ? "rgba(148,163,184,0.55)"
      : "rgba(100,116,139,0.65)";
  const borderClr = isAccent
    ? "rgba(255,255,255,0.10)"
    : isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(0,0,0,0.07)";
  const quoteClr = isAccent
    ? "rgba(255,255,255,0.12)"
    : isDark
      ? "rgba(99,102,241,0.12)"
      : "rgba(99,102,241,0.08)";

  return (
    <motion.div
      whileHover={{ scale: 1.035, y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 flex-shrink-0 cursor-default select-none"
      style={{
        width: 320,
        minHeight: 180,
        background: cardBg,
        border: `1px solid ${borderClr}`,
        boxShadow: isDark
          ? "0 2px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "0 2px 20px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Grid pattern overlay for featured cards */}
      {isFeatured && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(79,79,79,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,79,79,0.14) 1px, transparent 1px)",
            backgroundSize: "44px 48px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
          }}
        />
      )}

      {/* Quote icon top-right */}
      <div className="absolute top-5 right-5 pointer-events-none">
        <Quote
          size={28}
          style={{ color: quoteClr }}
          className="rotate-180"
        />
      </div>

      {/* Quote content */}
      <p
        className="relative z-10 text-[13px] leading-[1.65] flex-1 pr-8"
        style={{
          color: textClr,
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        &ldquo;{content.replace(/#\w+/g, "").trim()}&rdquo;
      </p>

      {/* Author row */}
      <div
        className="relative z-10 flex items-center justify-between mt-3 pt-3"
        style={{ borderTop: `1px solid ${borderClr}` }}
      >
        <div className="min-w-0 flex-1 mr-3">
          <h3
            className="font-semibold text-[14px] leading-tight truncate"
            style={{
              color: nameClr,
              fontFamily: "'Inter', -apple-system, sans-serif",
            }}
          >
            {name}
          </h3>
          {role && (
            <p
              className="text-[12px] mt-0.5 truncate"
              style={{ color: mutedClr }}
            >
              {role}
            </p>
          )}
          <span
            className="text-[11px] mt-0.5 inline-block"
            style={{ color: mutedClr }}
          >
            {date}
          </span>
        </div>
        <Avatar
          className="h-9 w-9 rounded-lg overflow-hidden flex-shrink-0"
          style={{ border: `2px solid ${borderClr}` }}
        >
          <AvatarImage
            src={avatar}
            className="h-full w-full object-cover"
          />
          <AvatarFallback
            className="text-white font-semibold text-sm rounded-xl"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
            }}
          >
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
