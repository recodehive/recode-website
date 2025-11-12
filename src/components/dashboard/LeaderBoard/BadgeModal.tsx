// src/components/dashboard/LeaderBoard/BadgeModal.tsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useSafeColorMode } from "@site/src/utils/useSafeColorMode";

interface BadgeConfig {
  image: string;
  name: string;
  criteria: (prs: number, points: number) => boolean;
}

interface BadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  earnedBadges: string[];
  allBadges: BadgeConfig[];
  contributorName?: string;
}

export default function BadgeModal({
  isOpen,
  onClose,
  earnedBadges,
  allBadges,
  contributorName,
}: BadgeModalProps): JSX.Element | null {
  const { isDark } = useSafeColorMode();

  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
          aria-labelledby="badge-modal-title"
        >
          <motion.div
            className={`badge-modal-container ${isDark ? "dark" : "light"}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`badge-modal-header ${isDark ? "dark" : "light"}`}>
              <div>
                <h2
                  id="badge-modal-title"
                  className={`badge-modal-title ${isDark ? "dark" : "light"}`}
                >
                  {contributorName
                    ? `${contributorName}'s Badges`
                    : "Achievement Badges"}
                </h2>
                <p
                  className={`badge-modal-subtitle ${isDark ? "dark" : "light"}`}
                >
                  {earnedBadges.length} of {allBadges.length} badges earned
                </p>
              </div>
              <button
                className={`badge-modal-close ${isDark ? "dark" : "light"}`}
                onClick={onClose}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className={`badge-modal-body ${isDark ? "dark" : "light"}`}>
              <div className="badge-grid">
                {allBadges.map((badge, index) => {
                  const isEarned = earnedBadges.includes(badge.image);
                  return (
                    <motion.div
                      key={badge.image}
                      className={`badge-item ${isEarned ? "earned" : "locked"} ${isDark ? "dark" : "light"}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="badge-item-image-wrapper">
                        <img
                          src={badge.image}
                          alt={badge.name}
                          className={`badge-item-image ${!isEarned ? "locked" : ""}`}
                        />
                        {!isEarned && (
                          <div className="badge-lock-overlay">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect
                                x="3"
                                y="11"
                                width="18"
                                height="11"
                                rx="2"
                                ry="2"
                              />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                        )}
                        {isEarned && (
                          <div className="badge-earned-indicator">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="badge-item-info">
                        <h3
                          className={`badge-item-name ${isDark ? "dark" : "light"}`}
                        >
                          {badge.name}
                        </h3>
                        {!isEarned && (
                          <p
                            className={`badge-item-status ${isDark ? "dark" : "light"}`}
                          >
                            Locked
                          </p>
                        )}
                        {isEarned && (
                          <p
                            className={`badge-item-status earned ${isDark ? "dark" : "light"}`}
                          >
                            Earned
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

