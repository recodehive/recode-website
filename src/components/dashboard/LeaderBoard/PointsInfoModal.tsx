// src/components/dashboard/LeaderBoard/PointsInfoModal.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useSafeColorMode } from "@site/src/utils/useSafeColorMode";
import { BADGE_CONFIG } from "./badgeConfig";

interface PointsInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type InfoTab = "points" | "badges";

function requirementLabel(badge: (typeof BADGE_CONFIG)[number]): string {
  const { requirement } = badge;
  if (requirement.type === "points") {
    return `${requirement.value}+ points`;
  }
  if (requirement.altPointsValue !== undefined) {
    return `${requirement.value}+ PRs (or ${requirement.altPointsValue}+ points)`;
  }
  return `${requirement.value}+ PRs`;
}

export default function PointsInfoModal({
  isOpen,
  onClose,
}: PointsInfoModalProps): JSX.Element | null {
  const { isDark } = useSafeColorMode();
  const [activeTab, setActiveTab] = useState<InfoTab>("points");

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`badge-modal-backdrop ${isDark ? "dark" : "light"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-labelledby="points-info-modal-title"
        >
          <motion.div
            className={`badge-modal-container points-info-modal ${isDark ? "dark" : "light"}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`badge-modal-header ${isDark ? "dark" : "light"}`}>
              <h2
                id="points-info-modal-title"
                className={`badge-modal-title ${isDark ? "dark" : "light"}`}
              >
                How points &amp; badges are calculated
              </h2>
              <button
                className={`badge-modal-close ${isDark ? "dark" : "light"}`}
                onClick={onClose}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>

            <div className="points-info-tabs">
              <button
                type="button"
                className={`points-info-tab ${activeTab === "points" ? "active" : ""}`}
                onClick={() => setActiveTab("points")}
              >
                Points
              </button>
              <button
                type="button"
                className={`points-info-tab ${activeTab === "badges" ? "active" : ""}`}
                onClick={() => setActiveTab("badges")}
              >
                Badges
              </button>
            </div>

            <div className={`badge-modal-body ${isDark ? "dark" : "light"}`}>
              {activeTab === "points" ? (
                <div className="points-info-panel">
                  <div className="points-info-formula">
                    One merged PR with{" "}
                    <span className="points-recode-badge">recode</span> +
                    a level label
                  </div>
                  <div className="points-level-row">
                    <span>
                      <span className="points-level-badge level-1">
                        level 1
                      </span>
                      Good first issue
                    </span>
                    <span className="points-level-value">+10</span>
                  </div>
                  <div className="points-level-row">
                    <span>
                      <span className="points-level-badge level-2">
                        level 2
                      </span>
                      Feature / fix
                    </span>
                    <span className="points-level-value">+30</span>
                  </div>
                  <div className="points-level-row">
                    <span>
                      <span className="points-level-badge level-3">
                        level 3
                      </span>
                      Major contribution
                    </span>
                    <span className="points-level-value">+50</span>
                  </div>
                  <div className="points-footnote">
                    PRs without a level label earn 0 points. Points reset to 0
                    for a period once you switch the leaderboard's time filter
                    away from "All Time".
                  </div>
                </div>
              ) : (
                <div className="points-info-panel">
                  {BADGE_CONFIG.map((badge) => (
                    <div key={badge.image} className="points-badge-row">
                      <img
                        src={badge.image}
                        alt={badge.name}
                        className="points-badge-row-icon"
                      />
                      <span className="points-badge-row-name">
                        {badge.name}
                      </span>
                      <span className="points-badge-row-requirement">
                        {requirementLabel(badge)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
