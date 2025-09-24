// src/components/dashboard/LeaderBoard/PRListModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useColorMode } from "@docusaurus/theme-common";

interface PRDetails {
  title: string;
  url: string;
  mergedAt: string;
  repoName: string;
  number: number;
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

export default function PRListModal({ contributor, isOpen, onClose }: PRListModalProps): JSX.Element | null {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  if (!contributor) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`pr-modal-backdrop ${isDark ? "dark" : "light"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
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
                  <h2 id="pr-modal-title" className={`pr-modal-title ${isDark ? "dark" : "light"}`}>
                    {contributor.username}'s Pull Requests
                  </h2>
                  <p className={`pr-modal-subtitle ${isDark ? "dark" : "light"}`}>
                    {contributor.prs} merged PR{contributor.prs !== 1 ? 's' : ''} • {contributor.points} points
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
              {contributor.prDetails && contributor.prDetails.length > 0 ? (
                <div className="pr-list">
                  {contributor.prDetails.map((pr, index) => (
                    <motion.div
                      key={`${pr.repoName}-${pr.number}`}
                      className={`pr-item ${isDark ? "dark" : "light"}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="pr-item-header">
                        <h3 className={`pr-item-title ${isDark ? "dark" : "light"}`}>
                          {pr.title}
                        </h3>
                        <div className="pr-item-actions">
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
                        <span className={`pr-item-repo ${isDark ? "dark" : "light"}`}>
                          <FaGithub />
                          {pr.repoName}
                        </span>
                        <span className={`pr-item-number ${isDark ? "dark" : "light"}`}>
                          #{pr.number}
                        </span>
                        <span className={`pr-item-date ${isDark ? "dark" : "light"}`}>
                          Merged on {formatDate(pr.mergedAt)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className={`pr-empty-state ${isDark ? "dark" : "light"}`}>
                  <FaGithub className="pr-empty-icon" />
                  <p>No pull request details available</p>
                  <p className="pr-empty-subtitle">
                    PR details might not be loaded yet or this contributor has no merged PRs.
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