// src/components/dashboard/LeaderBoard/ContributorCard.tsx
import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { FaGithub, FaDownload, FaTrophy } from "react-icons/fa";

interface ContributorCardProps {
  username: string;
  avatar: string;
  prs: number;
  points: number;
  rank: number;
  badges: string[];
  isDark: boolean;
}

export default function ContributorCard({
  username,
  avatar,
  prs,
  points,
  rank,
  badges,
  isDark,
}: ContributorCardProps) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { cacheBust: true });
    const link = document.createElement("a");
    link.download = `${username}-recodehive-card.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <>
      {/* Trigger button — sits right of "Contribute on GitHub" */}
      <button
        className="cta-button"
        onClick={() => setOpen(true)}
        style={{ marginLeft: 12 }}
        aria-label="Generate your achievement card"
      >
        <FaTrophy style={{ marginRight: 8 }} />
        My Achievement Card
      </button>

      {/* Modal overlay */}
      {open && (
        <div
          className="card-modal-overlay"
          onClick={() => setOpen(false)}
        >
          <div
            className="card-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The actual downloadable card */}
            <div
              ref={cardRef}
              className={`achievement-card ${isDark ? "dark" : "light"}`}
            >
              <div className="achievement-card-header">
                <img src="/img/logo.png" alt="RecodeHive" className="card-logo" />
                <span className="card-brand">recodehive</span>
              </div>
              <img src={avatar} alt={username} className="card-avatar" />
              <h2 className="card-username">{username}</h2>
              <div className="card-rank">#{rank} on Leaderboard</div>
              <div className="card-stats">
                <div className="card-stat">
                  <span className="card-stat-value">{prs}</span>
                  <span className="card-stat-label">PRs Merged</span>
                </div>
                <div className="card-stat">
                  <span className="card-stat-value">{points}</span>
                  <span className="card-stat-label">Points</span>
                </div>
              </div>
              {badges.length > 0 && (
                <div className="card-badges">
                  {badges.slice(0, 5).map((badge, i) => (
                    <img key={i} src={badge} alt={`badge-${i}`} className="card-badge-icon" />
                  ))}
                </div>
              )}
              <div className="card-footer">
                <FaGithub /> github.com/recodehive
              </div>
            </div>

            {/* Action buttons */}
            <div className="card-modal-actions">
              <button className="cta-button" onClick={handleDownload}>
                <FaDownload style={{ marginRight: 8 }} />
                Download PNG
              </button>
              <button
                className="cta-button"
                style={{ background: "#6b7280", marginLeft: 8 }}
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}