// src/components/dashboard/LeaderBoard/PRListModal.tsx
import React, { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useSafeColorMode } from "@site/src/utils/useSafeColorMode";
import { useCommunityStatsContext } from "../../../lib/statsProvider";

interface PRDetails {
  title: string;
  url: string;
  mergedAt: string;
  repoName: string;
  number: number;
  points: number; // Now includes the points field
}

interface Contributor {
  username: string;
  avatar: string;
  profile: string;
  points: number;
  prs: number;
  prDetails?: PRDetails[];
}

interface PRListModalProps {
  contributor: Contributor | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PRListModal({
  contributor,
  isOpen,
  onClose,
}: PRListModalProps): JSX.Element | null {
  const { isDark } = useSafeColorMode();

  // Get filtered PRs from context
  const { getFilteredPRsForContributor, currentTimeFilter } =
    useCommunityStatsContext();

  if (!contributor) return null;

  // Get filtered PRs instead of using contributor.prDetails
  // Use useMemo to prevent infinite loops
  const filteredPRs = useMemo(() => {
    if (!contributor) return [];
    return getFilteredPRsForContributor(contributor.username);
  }, [contributor?.username, getFilteredPRsForContributor, currentTimeFilter]);

  // Calculate total points from filtered PRs
  const totalPoints = useMemo(() => {
    return filteredPRs.reduce((sum, pr) => sum + pr.points, 0);
  }, [filteredPRs]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper function to get filter display text
  const getFilterDisplayText = (filter: string) => {
    switch (filter) {
      case "week":
        return "This Week";
      case "month":
        return "This Month";
      case "year":
        return "This Year";
      case "all":
        return "All Time";
      default:
        return "All Time";
    }
  };

  // Helper function to get badge color based on points
  const getPointsBadgeColor = (points: number) => {
    if (points >= 50) return "#10b981"; // Green for Level 3
    if (points >= 30) return "#f59e0b"; // Orange for Level 2
    if (points >= 10) return "#3b82f6"; // Blue for Level 1
    return "#6b7280"; // Gray for no points
  };

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`pr-modal-backdrop ${isDark ? "dark" : "light"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pr-modal-title"
        >
          <motion.div
            className={`pr-modal-container ${isDark ? "dark" : "light"}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Modal Header */}
            <div className={`pr-modal-header ${isDark ? "dark" : "light"}`}>
              <div className="pr-modal-user-info">
                <img
                  src={contributor.avatar}
                  alt={contributor.username}
                  className="pr-modal-avatar"
                />
                <div>
                  <h2
                    id="pr-modal-title"
                    className={`pr-modal-title ${isDark ? "dark" : "light"}`}
                  >
                    {contributor.username}'s Pull Requests
                  </h2>
                  <p
                    className={`pr-modal-subtitle ${isDark ? "dark" : "light"}`}
                  >
                    {/* Show filtered count with actual total points */}
                    {filteredPRs.length} merged PR
                    {filteredPRs.length !== 1 ? "s" : ""} • {totalPoints} point
                    {totalPoints !== 1 ? "s" : ""}
                    {currentTimeFilter !== "all" && (
                      <span style={{ marginLeft: "8px", opacity: 0.7 }}>
                        ({getFilterDisplayText(currentTimeFilter)})
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <button
                className={`pr-modal-close ${isDark ? "dark" : "light"}`}
                onClick={onClose}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            <div className={`pr-modal-body ${isDark ? "dark" : "light"}`}>
              {/* Use filteredPRs instead of contributor.prDetails */}
              {filteredPRs && filteredPRs.length > 0 ? (
                <div className="pr-list">
                  {filteredPRs.map((pr, index) => (
                    <motion.div
                      key={`${pr.repoName}-${pr.number}`}
                      className={`pr-item ${isDark ? "dark" : "light"}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="pr-item-header">
                        <h3
                          className={`pr-item-title ${isDark ? "dark" : "light"}`}
                        >
                          {pr.title}
                        </h3>
                        <div className="pr-item-actions">
                          {/* Points badge */}
                          {pr.points > 0 && (
                            <span
                              className="pr-points-badge"
                              style={{
                                backgroundColor: getPointsBadgeColor(pr.points),
                                color: "white",
                                padding: "4px 8px",
                                borderRadius: "12px",
                                fontSize: "12px",
                                fontWeight: "600",
                                marginRight: "8px",
                              }}
                            >
                              +{pr.points} pts
                            </span>
                          )}
                          <a
                            href={pr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`pr-item-link ${isDark ? "dark" : "light"}`}
                            aria-label={`Open PR #${pr.number} in GitHub`}
                          >
                            <FaExternalLinkAlt />
                          </a>
                        </div>
                      </div>
                      <div className="pr-item-meta">
                        <span
                          className={`pr-item-repo ${isDark ? "dark" : "light"}`}
                        >
                          <FaGithub />
                          {pr.repoName}
                        </span>
                        <span
                          className={`pr-item-number ${isDark ? "dark" : "light"}`}
                        >
                          #{pr.number}
                        </span>
                        <span
                          className={`pr-item-date ${isDark ? "dark" : "light"}`}
                        >
                          Merged on {formatDate(pr.mergedAt)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={`pr-empty-state ${isDark ? "dark" : "light"}`}>
                  <FaGithub className="pr-empty-icon" />
                  <p>
                    {currentTimeFilter === "all"
                      ? "No pull request details available"
                      : `No PRs found for ${getFilterDisplayText(currentTimeFilter).toLowerCase()}`}
                  </p>
                  <p className="pr-empty-subtitle">
                    {currentTimeFilter === "all"
                      ? "PR details might not be loaded yet or this contributor has no merged PRs."
                      : `Try selecting a different time period or check "All Time" to see all PRs.`}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className={`pr-modal-footer ${isDark ? "dark" : "light"}`}>
              <a
                href={contributor.profile}
                target="_blank"
                rel="noopener noreferrer"
                className={`pr-modal-profile-link ${isDark ? "dark" : "light"}`}
              >
                <FaGithub />
                View GitHub Profile
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
