import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
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
}) => {
  const { isDark } = useSafeColorMode();

  const green = isDark ? "#4ade80" : "#16a34a";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex w-full flex-col rounded-2xl p-6 transition-all duration-500 hover:scale-[1.008]"
      style={{
        background: isDark ? "#161616" : "#ffffff",
        border: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.06)",
        boxShadow: isDark
          ? "0 2px 24px rgba(0,0,0,0.35)"
          : "0 2px 20px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Badge + rating row */}
      <div className="flex items-center justify-between">
        <span
          className="rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase"
          style={{
            background: isDark
              ? "rgba(74,222,128,0.14)"
              : "rgba(22,163,74,0.10)",
            color: green,
          }}
        >
          1:1 Session · {duration}
        </span>
        <span
          className="flex items-center gap-1 text-[12px] font-medium"
          style={{ color: isDark ? "#e2e8f0" : "#334155" }}
        >
          <Star size={12} style={{ fill: "currentColor" }} />
          5.0 rating
        </span>
      </div>

      {/* Avatar + title */}
      <div className="mt-5 flex items-center gap-3">
        <img
          src={profileImage}
          alt={title}
          className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <h2
            className="text-lg leading-tight font-bold tracking-tight"
            style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
          >
            {title}
          </h2>
          <p
            className="mt-0.5 truncate text-[13px] font-medium"
            style={{ color: green }}
          >
            200+ sessions completed ·{" "}
            <a
              href={`https://topmate.io/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: green, textDecoration: "none" }}
            >
              topmate.io/{username}
            </a>
          </p>
        </div>
      </div>

      {/* What you get — 2x2 grid */}
      <ul className="mt-4 grid list-none grid-cols-2 gap-x-3 gap-y-2 p-0">
        {[
          "Resume & portfolio review",
          "Career path guidance",
          "Open-source strategy",
          "Mock interview prep",
        ].map((feature) => (
          <li key={feature} className="flex min-w-0 items-center gap-2">
            <span
              className="flex-shrink-0 text-[13px] font-bold"
              style={{ color: green }}
            >
              ✓
            </span>
            <span
              className="truncate text-[13px] font-medium"
              style={{ color: isDark ? "#e2e8f0" : "#334155" }}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Description */}
      <p
        className="mt-4 text-[13.5px] leading-relaxed"
        style={{ color: isDark ? "#94a3b8" : "#64748b" }}
      >
        {description}
      </p>

      {/* CTA Button */}
      <motion.a
        href={`https://topmate.io/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="mt-5 flex w-fit items-center justify-center self-center rounded-full px-4 py-1.5 text-[13px] font-semibold"
        style={{
          background: green,
          color: isDark ? "#052e16" : "#ffffff",
          textDecoration: "none",
        }}
      >
        Schedule Now
      </motion.a>
    </motion.div>
  );
};

export default TopMateCard;
