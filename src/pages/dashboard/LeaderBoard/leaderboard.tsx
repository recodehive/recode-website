import React, { JSX, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaStar, FaCode, FaUsers, FaGithub, FaSearch, FaBook, FaBookOpen } from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";
// import { useTheme } from "../ThemeContext"; // Theme context
// import { useNavigate } from 'react-router-dom'

const GITHUB_REPO = "recodehive/recode-website"; // Change to your repo
const token = process.env.GIT_TOKEN; // Add your GitHub token here or use environment variables



// Points configuration for different PR levels
const POINTS: Record<string, number> = {
  "level-1": 3, // Easy
  "level-2": 7, // Medium
  "level-3": 10, // Hard/Feature
};

// Types
interface Contributor {
  username: string;
  avatar: string;
  profile: string;
  points: number;
  prs: number;
}

interface Stats {
  flooredTotalPRs: number;
  totalContributors: number;
  flooredTotalPoints: number;
}

interface BadgeProps {
  count: number;
  label: string;
  color: { background: string; color: string };
}

interface SkeletonLoaderProps {
  isDark: boolean;
}

// Badge component for PR counts
const Badge: React.FC<BadgeProps> = ({ count, label, color }) => (
  <div className="badge" style={color}>
    <FaCode style={{ marginRight: 6, fontSize: 12 }} />
    <span>
      {count} {label}
    </span>
    <style>{`
      .badge {
        display: flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 9999px;
        font-size: 13px;
        font-weight: 500;
        background: rgba(0,0,0,0.04);
      }
    `}</style>
  </div>
);

// Skeleton Loader Component
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ isDark }) => (
  <div className="skeleton-loader" style={{ background: isDark ? '#23272f' : '#fff', border: `1px solid ${isDark ? '#444' : '#eee'}` }}>
    <div className="skeleton-header">
      <div>#</div>
      <div>Contributor</div>
      <div>Contributions</div>
    </div>
    <div>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-avatar" />
          <div className="skeleton-avatar" style={{ width: 40, height: 40 }} />
          <div className="skeleton-info">
            <div className="skeleton-bar" style={{ width: 96 }} />
            <div className="skeleton-badges">
              <div className="skeleton-badge" />
              <div className="skeleton-badge" />
            </div>
          </div>
        </div>
      ))}
    </div>
    <style jsx>{`
      .skeleton-loader {
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        overflow: hidden;
        margin-bottom: 24px;
      }
      .skeleton-header {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        font-size: 15px;
        font-weight: 500;
        background: #f6f6f6;
        border-bottom: 1px solid #eee;
      }
      .skeleton-row {
        display: flex;
        align-items: center;
        padding: 16px;
        gap: 16px;
      }
      .skeleton-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #e5e7eb;
        animation: pulse 1.5s infinite;
      }
      .skeleton-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .skeleton-bar {
        height: 16px;
        border-radius: 8px;
        background: #e5e7eb;
        animation: pulse 1.5s infinite;
      }
      .skeleton-badges {
        display: flex;
        gap: 8px;
      }
      .skeleton-badge {
        width: 48px;
        height: 24px;
        border-radius: 9999px;
        background: #e5e7eb;
        animation: pulse 1.5s infinite;
      }
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `}</style>
  </div>
);

export default function LeaderBoard(): JSX.Element {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<Stats>({
    flooredTotalPRs: 0,
    totalContributors: 0,
    flooredTotalPoints: 0,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate()

  useEffect(() => {
    const fetchContributorsWithPoints = async (): Promise<void> => {
      try {
        let contributorsMap: Record<string, Contributor> = {};
        let page = 1;
        const MAX_PAGES = 10;
        let keepFetching = true;

        while (keepFetching && page <= MAX_PAGES) {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
            {
              headers: {
                Accept: "application/vnd.github.v3+json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
            }
          );
          const prs = await res.json();

          if (!Array.isArray(prs) || prs.length === 0 || (prs.length === 1 && prs[0].message)) {
            keepFetching = false;
            break;
          }

          prs.forEach((pr: any) => {
            if (!pr.merged_at) return;
            const labels = pr.labels.map((l: any) => l.name.toLowerCase());
            if (!labels.includes("gssoc'25")) return;

            const author = pr.user.login;
            let points = 0;
            labels.forEach((label: string) => {
              if (POINTS[label]) points += POINTS[label];
            });

            if (!contributorsMap[author]) {
              contributorsMap[author] = {
                username: author,
                avatar: pr.user.avatar_url,
                profile: pr.user.html_url,
                points: 0,
                prs: 0,
              };
            }

            contributorsMap[author].points += points;
            contributorsMap[author].prs += 1;
          });

          page += 1;
        }

        setContributors(
          Object.values(contributorsMap).sort((a, b) => b.points - a.points)
        );
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributorsWithPoints();
  }, []);

  useEffect(() => {
    if (contributors.length > 0) {
      const totalPRs = contributors.reduce((sum, c) => sum + Number(c.prs), 0);
      const totalPoints = contributors.reduce(
        (sum, c) => sum + Number(c.points),
        0
      );

      const flooredTotalPRs = Math.floor(totalPRs / 10) * 10;
      const flooredTotalPoints = Math.floor(totalPoints / 10) * 10;
      const flooredContributorsCount =
        Math.floor(contributors.length / 10) * 10;

      setStats({
        flooredTotalPRs,
        totalContributors: flooredContributorsCount,
        flooredTotalPoints,
      });
    }
  }, [contributors]);

  // Filter contributors by search term (username)
  const filteredContributors = contributors.filter((c) =>
    c.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination variables and states
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate which contributors to show on current page
  const indexOfLast = currentPage * PAGE_SIZE;
  const indexOfFirst = indexOfLast - PAGE_SIZE;
  const currentContributors = filteredContributors.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredContributors.length / PAGE_SIZE);

  // Gradient backgrounds from Footer.jsx theme
  const gradientBg = isDark
    ? "bg-gradient-to-br from-dark-bg-primary to-dark-bg-secondary"
    : "bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-xl";

  const cardBg = isDark
    ? "bg-dark-bg-tertiary border-dark-border"
    : "bg-light-bg-tertiary border-light-border";

  // Button styles
  const buttonStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '8px',
    background: isDark ? '#23272f' : '#e0e7ff',
    color: isDark ? '#a78bfa' : '#3730a3',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    margin: '0 4px',
    opacity: 1,
    transition: 'opacity 0.2s',
  };
  const buttonActiveStyle: React.CSSProperties = {
    ...buttonStyle,
    background: isDark ? '#3b82f6' : '#2563eb',
    color: '#fff',
  };
  const buttonDisabledStyle: React.CSSProperties = {
    ...buttonStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  return (
    <div style={{ background: isDark ? '#23272f' : '#f6f6f6', minHeight: '100vh', padding: '32px 8px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: 48, padding: '0 8px' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: '#6366f1' }}>
            GSSoC'25 Leaderboard
          </h1>
          <p style={{ fontSize: 17, maxWidth: 600, margin: '0 auto', color: isDark ? '#b3b3b3' : '#555', lineHeight: 1.6 }}>
            Celebrating the amazing contributions from GSSoC'25 participants. Join us in building something incredible together!
          </p>
        </motion.div>

        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
            <input
              type="text"
              placeholder="Search contributor..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '8px 16px 8px 36px',
                borderRadius: 8,
                border: `1px solid ${isDark ? '#444' : '#ddd'}`,
                background: isDark ? '#23272f' : '#fff',
                color: isDark ? '#fff' : '#222',
                fontSize: 15,
                outline: 'none',
              }}
            />
            <FaSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: isDark ? '#b3b3b3' : '#aaa' }} />
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 48, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220, padding: 24, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: `1px solid ${isDark ? '#444' : '#eee'}`, background: isDark ? 'linear-gradient(135deg,#23272f,#1a1d23)' : 'linear-gradient(135deg,#e0e7ff,#f3f4f6)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: 12, borderRadius: 12, background: isDark ? 'rgba(59,130,246,0.2)' : '#dbeafe', color: isDark ? '#60a5fa' : '#2563eb', marginRight: 16 }}>
                <FaUsers style={{ fontSize: 22 }} />
              </div>
              <div>
                <p style={{ fontSize: 14, color: isDark ? '#b3b3b3' : '#555' }}>Contributors</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: isDark ? '#fff' : '#222' }}>{loading ? '...' : stats.totalContributors}+</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 220, padding: 24, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: `1px solid ${isDark ? '#444' : '#eee'}`, background: isDark ? 'linear-gradient(135deg,#23272f,#1a1d23)' : 'linear-gradient(135deg,#e0e7ff,#f3f4f6)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: 12, borderRadius: 12, background: isDark ? 'rgba(16,185,129,0.2)' : '#bbf7d0', color: isDark ? '#34d399' : '#059669', marginRight: 16 }}>
                <FaCode style={{ fontSize: 22 }} />
              </div>
              <div>
                <p style={{ fontSize: 14, color: isDark ? '#b3b3b3' : '#555' }}>Pull Requests</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: isDark ? '#fff' : '#222' }}>{loading ? '...' : stats.flooredTotalPRs}+</p>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 220, padding: 24, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: `1px solid ${isDark ? '#444' : '#eee'}`, background: isDark ? 'linear-gradient(135deg,#23272f,#1a1d23)' : 'linear-gradient(135deg,#e0e7ff,#f3f4f6)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: 12, borderRadius: 12, background: isDark ? 'rgba(139,92,246,0.2)' : '#ede9fe', color: isDark ? '#a78bfa' : '#7c3aed', marginRight: 16 }}>
                <FaStar style={{ fontSize: 22 }} />
              </div>
              <div>
                <p style={{ fontSize: 14, color: isDark ? '#b3b3b3' : '#555' }}>Total Points</p>
                <p style={{ fontSize: 22, fontWeight: 700, color: isDark ? '#fff' : '#222' }}>{loading ? '...' : stats.flooredTotalPoints}+</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader isDark={isDark} />
        ) : (
          <div style={{ borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: `1px solid ${isDark ? '#444' : '#eee'}`, overflow: 'hidden', margin: '0 8px' }}>
            {/* Contributors List */}
            <div>
              {currentContributors.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0', color: isDark ? '#b3b3b3' : '#555' }}>
                  No contributors found.
                </div>
              ) : (
                currentContributors.map((contributor, index) => (
                  <motion.div
                    key={contributor.username}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', borderBottom: `1px solid ${isDark ? '#444' : '#eee'}`, background: index % 2 === 0 ? (isDark ? '#23272f' : '#fff') : (isDark ? '#1a1d23' : '#f6f6f6') }}
                  >
                    {/* Rank Badge */}
                    <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 500, marginRight: 16, background: index === 0 ? (isDark ? 'rgba(253,224,71,0.2)' : '#fef9c3') : index === 1 ? (isDark ? 'rgba(156,163,175,0.2)' : '#f3f4f6') : index === 2 ? (isDark ? 'rgba(251,191,36,0.2)' : '#fef3c7') : (isDark ? '#23272f' : '#e5e7eb'), color: index === 0 ? (isDark ? '#fde047' : '#ca8a04') : index === 1 ? (isDark ? '#d1d5db' : '#6b7280') : index === 2 ? (isDark ? '#fbbf24' : '#f59e42') : (isDark ? '#b3b3b3' : '#555') }}>
                      {indexOfFirst + index + 1}
                    </div>
                    {/* Avatar */}
                    <img
                      src={contributor.avatar}
                      alt={contributor.username}
                      style={{ width: 40, height: 40, borderRadius: '50%', border: `2px solid ${isDark ? '#444' : '#fff'}`, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginRight: 16 }}
                    />
                    {/* User Info */}
                    <div style={{ flex: 1 }}>
                      <a
                        href={contributor.profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontWeight: 500, color: isDark ? '#fff' : '#222', fontSize: 15, textDecoration: 'none', marginBottom: 4, display: 'block' }}
                      >
                        {contributor.username}
                      </a>
                      <a
                        href={`https://github.com/${GITHUB_REPO}/pulls?q=is:pr+author:${contributor.username}+is:merged`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 13, color: isDark ? '#b3b3b3' : '#555', textDecoration: 'none', marginBottom: 4, display: 'block' }}
                      >
                        View Contributions →
                      </a>
                      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <Badge
                          count={contributor.prs}
                          label={`PR${contributor.prs !== 1 ? "s" : ""}`}
                          color={{ background: isDark ? 'rgba(59,130,246,0.2)' : '#dbeafe', color: isDark ? '#60a5fa' : '#2563eb' }}
                        />
                        <Badge
                          count={contributor.points}
                          label="Points"
                          color={{ background: isDark ? 'rgba(139,92,246,0.2)' : '#ede9fe', color: isDark ? '#a78bfa' : '#7c3aed' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '16px 0', borderTop: `1px solid ${isDark ? '#444' : '#eee'}` }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                style={currentPage === 1 ? buttonDisabledStyle : buttonStyle}
              >
                <ChevronLeft size={16} />
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                {Array.from(
                  { length: Math.ceil(filteredContributors.length / PAGE_SIZE) },
                  (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      style={currentPage === i + 1 ? buttonActiveStyle : buttonStyle}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                style={currentPage === totalPages ? buttonDisabledStyle : buttonStyle}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* CTA Footer */}
            <div style={{ padding: '16px 24px', textAlign: 'center', borderTop: `1px solid ${isDark ? '#444' : '#eee'}`, background: isDark ? '#23272f' : '#f6f6f6' }}>
              <p style={{ fontSize: 14, color: isDark ? '#b3b3b3' : '#555', marginBottom: 12 }}>
                Want to see your name here? Join GSSoC'25 and start contributing!
              </p>
              <a
                href="https://gssoc.girlscript.tech/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', background: isDark ? '#3b82f6' : '#6366f1', color: '#fff', fontSize: 15, fontWeight: 500, borderRadius: 8, textDecoration: 'none' }}
              >
                <FaGithub style={{ marginRight: 8 }} /> Join GSSoC'25
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}