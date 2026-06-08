import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Calendar,
  Star,
  Sparkles,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useSafeColorMode } from "../../utils/useSafeColorMode";

interface TopMateCardProps {
  title: string;
  description: string;
  duration: string;
  profileImage: string;
  username: string;
  setShowTopmate: (value: boolean) => void;
}

const TopMateCard: React.FC<TopMateCardProps> = ({
  title,
  description,
  duration,
  profileImage,
  username,
  setShowTopmate,
}) => {
  const { isDark } = useSafeColorMode();

  const borderClr = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";
  const mutedClr = isDark ? "rgba(148,163,184,0.55)" : "rgba(100,116,139,0.65)";
  const subtleClr = isDark
    ? "rgba(148,163,184,0.35)"
    : "rgba(100,116,139,0.45)";

  const features = [
    "Resume & portfolio review",
    "Career path guidance",
    "Open-source strategy",
    "Mock Interview Prep",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex min-h-[360px] w-full flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.008]"
      style={{
        background: isDark ? "#0a0a0a" : "#ffffff",
        border: `1px solid ${borderClr}`,
        boxShadow: isDark
          ? "0 2px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)"
          : "0 2px 20px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(79,79,79,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,79,79,0.10) 1px, transparent 1px)",
          backgroundSize: "44px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)",
        }}
      />

      {/* Subtle corner glow */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(99,102,241,0.06), transparent)"
            : "radial-gradient(circle, rgba(99,102,241,0.04), transparent)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative flex h-full flex-col p-4">
        {/* Header Badge row */}
        <div className="mb-2 flex flex-shrink-0 items-center justify-between">
          <div
            className="flex items-center gap-2 rounded-full px-2.5 py-1"
            style={{
              background: isDark
                ? "rgba(99,102,241,0.08)"
                : "rgba(99,102,241,0.06)",
              border: isDark
                ? "1px solid rgba(99,102,241,0.15)"
                : "1px solid rgba(99,102,241,0.12)",
            }}
          >
            <Calendar
              size={12}
              style={{ color: isDark ? "#a5b4fc" : "#6366f1" }}
            />
            <span
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{
                color: isDark ? "#a5b4fc" : "#4338ca",
                fontFamily: "'Inter', -apple-system, sans-serif",
              }}
            >
              1:1 Session
            </span>
            <span
              className="flex items-center gap-0.5 text-[10px] font-medium"
              style={{ color: isDark ? "rgba(251,191,36,0.8)" : "#d97706" }}
            >
              <Clock size={11} />
              {duration}
            </span>
          </div>
          <button
            onClick={() => setShowTopmate(false)}
            className="rounded-lg p-1 transition-colors duration-200"
            style={{
              color: subtleClr,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            <ArrowUpRight size={14} className="rotate-45" />
          </button>
        </div>

        {/* Title */}
        <h2
          className="mb-1 flex-shrink-0 text-base leading-tight font-bold tracking-tight"
          style={{
            color: isDark ? "#f1f5f9" : "#0f172a",
            fontFamily: "'Inter', -apple-system, sans-serif",
          }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="mb-2 line-clamp-2 flex-shrink-0 text-[11px] leading-snug"
          style={{
            color: isDark ? "rgba(148,163,184,0.7)" : "rgba(100,116,139,0.8)",
            fontFamily: "'Inter', -apple-system, sans-serif",
          }}
        >
          {description}
        </p>

        {/* What you get — 2x2 Grid Section */}
        <div className="mb-2.5 min-h-0 flex-grow">
          <div className="mb-1 flex items-center gap-1.5">
            <Sparkles
              size={11}
              style={{ color: isDark ? "#a5b4fc" : "#6366f1" }}
            />
            <span
              className="text-[10px] font-semibold tracking-wider uppercase"
              style={{ color: isDark ? "#a5b4fc" : "#4338ca" }}
            >
              What you get
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
            {features.map((f, i) => (
              <li key={i} className="flex min-w-0 items-center gap-1.5">
                <CheckCircle2
                  size={11}
                  className="flex-shrink-0"
                  style={{
                    color: isDark
                      ? "rgba(34,197,94,0.7)"
                      : "rgba(22,163,74,0.7)",
                  }}
                />
                <span
                  className="truncate text-[10.5px]"
                  style={{
                    color: isDark
                      ? "rgba(226,232,240,0.75)"
                      : "rgba(51,65,85,0.8)",
                    fontFamily: "'Inter', -apple-system, sans-serif",
                  }}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-1 w-full flex-shrink-0 rounded-xl p-1"
          style={{
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
            border: `1px solid ${borderClr}`,
          }}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex-shrink-0">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-8 w-8 rounded-lg object-cover"
                  style={{ border: `1.5px solid ${borderClr}` }}
                />
                <div
                  className="absolute -right-0.5 -bottom-0.5 rounded-full p-0.5"
                  style={{ background: isDark ? "#0a0a0a" : "#ffffff" }}
                >
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: "#22c55e",
                      boxShadow: "0 0 4px rgba(34,197,94,0.4)",
                    }}
                  />
                </div>
              </div>
              <div className="min-w-0">
                <p
                  className="mb-0.5 text-[9px] leading-none font-medium"
                  style={{ color: subtleClr }}
                >
                  Book at
                </p>
                <a
                  href={`https://topmate.io/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-0.5 text-[11px] leading-none font-semibold transition-colors duration-200"
                  style={{
                    color: isDark ? "#a5b4fc" : "#4338ca",
                    textDecoration: "none",
                  }}
                >
                  <span className="max-w-[95px] truncate sm:max-w-[none]">
                    topmate.io/{username}
                  </span>
                  <ArrowUpRight
                    size={10}
                    className="flex-shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>

            {/* Rating */}
            <div className="flex flex-shrink-0 flex-col items-end justify-center">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={9}
                    className="flex-shrink-0"
                    style={{
                      fill: isDark ? "rgba(251,191,36,0.85)" : "#f59e0b",
                      color: isDark ? "rgba(251,191,36,0.85)" : "#f59e0b",
                    }}
                  />
                ))}
              </div>
              <span
                className="mt-0.5 text-[9px] leading-none font-medium"
                style={{ color: subtleClr }}
              >
                5.0 rating
              </span>
            </div>
          </div>
        </div>

        {/* Social proof line */}
        <div className="mt-1.5 mb-1.5 flex flex-shrink-0 items-center justify-center gap-1.5">
          <Users
            size={11}
            style={{
              color: isDark ? "rgba(148,163,184,0.4)" : "rgba(100,116,139,0.5)",
            }}
          />
          <span
            className="text-[10px] font-medium"
            style={{
              color: isDark ? "rgba(148,163,184,0.4)" : "rgba(100,116,139,0.5)",
            }}
          >
            200+ sessions completed
          </span>
        </div>

        {/* CTA Button */}
        <motion.a
          href={`https://topmate.io/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)",
            color: "rgba(255,255,255,0.95)",
            boxShadow: isDark
              ? "0 4px 20px rgba(99,102,241,0.2), 0 1px 3px rgba(0,0,0,0.3)"
              : "0 4px 16px rgba(99,102,241,0.18), 0 1px 3px rgba(0,0,0,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
            textDecoration: "none",
            fontFamily: "'Inter', -apple-system, sans-serif",
          }}
        >
          <Calendar size={13} style={{ color: "rgba(255,255,255,0.8)" }} />
          <span>Schedule Now</span>
          <ArrowUpRight size={13} style={{ color: "rgba(255,255,255,0.65)" }} />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default TopMateCard;
