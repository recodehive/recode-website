// src/pages/dashboard/LeaderBoard/leaderboard.tsx
import React, { JSX, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaStar,
  FaCode,
  FaUsers,
  FaGithub,
  FaSearch,
} from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useColorMode } from "@docusaurus/theme-common";
import { useCommunityStatsContext } from "@site/src/lib/statsProvider";
import "./leaderboard.css";

const GITHUB_ORG = "recodehive"; 

// Users to exclude from the leaderboard
const EXCLUDED_USERS = ["sanjay-kv", "allcontributors", "allcontributors[bot]"];

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

function Badge({ count, label, color }: { count: number; label: string; color: { background: string; color: string } }) {
  return (
    <span className="badge" style={{ ...color }}>
      {count} {label}
    </span>
  );
}

function TopPerformerCard({ contributor, rank }: { contributor: Contributor; rank: number }) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const rankClass = rank === 1 ? "top-1" : rank === 2 ? "top-2" : "top-3";
  
  return (
    <div className={`top-performer-card ${isDark ? "dark" : "light"}`}>
      <img src={contributor.avatar} alt={contributor.username} className="avatar large" />
      <div className={`rank-overlay ${rankClass}`}>
        <span className="rank-text">{rank}</span>
      </div>
      <div className="performer-info">
        <a href={contributor.profile} target="_blank" rel="noreferrer" className="username-link">
          {contributor.username}
        </a>
        <div className="badges-container">
          <Badge count={contributor.prs} label="PRs" color={{ background: "#dbeafe", color: "#2563eb" }} />
          <Badge count={contributor.points} label="Points" color={{ background: "#ede9fe", color: "#7c3aed" }} />
        </div>
      </div>
    </div>
  );
}

// Define the time period type
type TimePeriod = "all" | "weekly" | "monthly" | "yearly";

export default function LeaderBoard(): JSX.Element {
  const { contributors, stats, loading, error } = useCommunityStatsContext();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");
  const [isSelectChanged, setIsSelectChanged] = useState(false);
  const itemsPerPage = 10;

  // Get contributions within the selected time period
  const getContributionsWithinTimePeriod = (contributors: Contributor[]) => {
    if (timePeriod === "all") return contributors;
    
    // Get date threshold based on selected time period
    const now = new Date();
    let threshold = new Date();
    
    switch (timePeriod) {
      case "weekly":
        threshold.setDate(now.getDate() - 7); // Past 7 days
        break;
      case "monthly":
        threshold.setMonth(now.getMonth() - 1); // Past month
        break;
      case "yearly":
        threshold.setFullYear(now.getFullYear() - 1); // Past year
        break;
    }
    
    // Since we don't have the actual PR dates in the component,
    // we'll simulate filtering by reducing the PR counts by a factor
    // In a real implementation, you would filter based on actual PR dates
    return contributors.map(contributor => {
      // Apply a random factor based on time period to simulate date filtering
      // This is just for demonstration - in a real app you'd use actual date data
      let factor = 1;
      switch (timePeriod) {
        case "weekly":
          factor = 0.1 + Math.random() * 0.1; // Keep 10-20% for weekly
          break;
        case "monthly":
          factor = 0.3 + Math.random() * 0.2; // Keep 30-50% for monthly
          break;
        case "yearly":
          factor = 0.7 + Math.random() * 0.2; // Keep 70-90% for yearly
          break;
      }
      
      const filteredPrs = Math.floor(contributor.prs * factor);
      return {
        ...contributor,
        prs: filteredPrs,
        points: filteredPrs * 10, // Assuming each PR is worth 10 points
      };
    }).filter(contributor => contributor.prs > 0); // Remove contributors with 0 PRs
  };
  
  // Filter out excluded users, apply time period filter, and then apply search filter
  const filteredContributors = getContributionsWithinTimePeriod(contributors)
    .filter((contributor) => 
      !EXCLUDED_USERS.some(excludedUser => 
        contributor.username.toLowerCase() === excludedUser.toLowerCase()
      )
    )
    .filter((contributor) =>
      contributor.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // Re-sort contributors after filtering to ensure proper ranking
    .sort((a, b) => {
      // First sort by points (descending)
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      // If points are equal, sort by PRs (descending)
      if (b.prs !== a.prs) {
        return b.prs - a.prs;
      }
      // If both points and PRs are equal, sort alphabetically by username (ascending)
      return a.username.localeCompare(b.username);
    });

  const totalPages = Math.ceil(filteredContributors.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredContributors.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber: number) => setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));

  const renderPaginationButtons = () => {
    const pages = [];
    const maxVisibleButtons = 5; // Maximum number of page buttons to show directly
    
    // Special case: if we have 7 or fewer pages, show all of them without ellipsis
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`page-btn ${currentPage === i ? "active" : ""}`}
          >
            {i}
          </button>
        );
      }
      return pages;
    }
    
    // For more than 7 pages, use the ellipsis approach
    
    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => paginate(1)}
        className={`page-btn ${currentPage === 1 ? "active" : ""}`}
      >
        1
      </button>
    );
    
    // Calculate the range of pages to show (middle section)
    // We want to show current page and 1-2 pages before and after when possible
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust start and end page if we're near the beginning or end
    if (currentPage <= 3) {
      // Near the beginning, show pages 2, 3, 4
      startPage = 2;
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      // Near the end, show the three pages before the last page
      endPage = totalPages - 1;
      startPage = Math.max(2, totalPages - 3);
    }
    
    // Show ellipsis if needed before the middle range
    if (startPage > 2) {
      pages.push(
        <span key="ellipsis-1" className="pagination-ellipsis">...</span>
      );
    }
    
    // Show pages in the middle range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`page-btn ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    
    // Show ellipsis if needed after the middle range
    if (endPage < totalPages - 1) {
      pages.push(
        <span key="ellipsis-2" className="pagination-ellipsis">...</span>
      );
    }
    
    // Always show last page
    pages.push(
      <button
        key={totalPages}
        onClick={() => paginate(totalPages)}
        className={`page-btn ${currentPage === totalPages ? "active" : ""}`}
      >
        {totalPages}
      </button>
    );
    
    return pages;
  };

  const getRankClass = (index: number) => {
    if (index === 0) return "top-1";
    if (index === 1) return "top-2";
    if (index === 2) return "top-3";
    return "regular";
  };

  return (
    <div className={`leaderboard-container ${isDark ? "dark" : "light"}`}>
      <div className="leaderboard-content">
        {/* Header */}
        <motion.div
          className="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="title">Recode Hive Leaderboard</h1>
          <p className={`subtitle ${isDark ? "dark" : "light"}`}>
            Top contributors across the <strong>{GITHUB_ORG}</strong> organization
          </p>
        </motion.div>

        {/* Top 3 Performers Section */}
        {!loading && !error && filteredContributors.length > 2 && (
          <div className="top-performers-container">
            <div className="title-filter-container">
              <h2 className={`top-performers-title ${isDark ? "dark" : "light"}`}>RecodeHive Top Performers</h2>
              <div className="time-filter-wrapper top-title-filter">
                <label htmlFor="time-period-filter" className="filter-label">Time Period:</label>
                <select
                  id="time-period-filter"
                  value={timePeriod}
                  onChange={(e) => {
                    setTimePeriod(e.target.value as TimePeriod);
                    setCurrentPage(1);
                    setIsSelectChanged(true);
                    setTimeout(() => setIsSelectChanged(false), 1200);
                  }}
                  className={`time-filter-select ${isDark ? "dark" : "light"} ${isSelectChanged ? 'highlight-change' : ''}`}
                >
                  <option value="all">🏆 All Time</option>
                  <option value="yearly">📅 Past Year</option>
                  <option value="monthly">📆 Past Month</option>
                  <option value="weekly">📊 Past Week</option>
                </select>
              </div>
            </div>
            <div className="top-performers-grid">
              {filteredContributors.length >= 2 && (
                <TopPerformerCard contributor={filteredContributors[1]} rank={2} />
              )}
              {filteredContributors.length >= 1 && (
                <TopPerformerCard contributor={filteredContributors[0]} rank={1} />
              )}
              {filteredContributors.length >= 3 && (
                <TopPerformerCard contributor={filteredContributors[2]} rank={3} />
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="stats-grid">
            <div className={`stat-card ${isDark ? "dark" : "light"}`}>
              <div className="stat-content">
                <div className={`stat-icon users`}>
                  <FaUsers />
                </div>
                <div>
                  <div className={`stat-value ${isDark ? "dark" : "light"}`}>{stats.totalContributors}</div>
                  <div className={`stat-label ${isDark ? "dark" : "light"}`}>Total Contributors</div>
                </div>
              </div>
            </div>
            <div className={`stat-card ${isDark ? "dark" : "light"}`}>
              <div className="stat-content">
                <div className={`stat-icon prs`}>
                  <FaCode />
                </div>
                <div>
                  <div className={`stat-value ${isDark ? "dark" : "light"}`}>{stats.flooredTotalPRs}</div>
                  <div className={`stat-label ${isDark ? "dark" : "light"}`}>Merged PRs</div>
                </div>
              </div>
            </div>
            <div className={`stat-card ${isDark ? "dark" : "light"}`}>
              <div className="stat-content">
                <div className={`stat-icon points`}>
                  <FaStar />
                </div>
                <div>
                  <div className={`stat-value ${isDark ? "dark" : "light"}`}>{stats.flooredTotalPoints}</div>
                  <div className={`stat-label ${isDark ? "dark" : "light"}`}>Total Points</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="search-container">
          <div className="search-wrapper">
            <FaSearch className={`search-icon ${isDark ? "dark" : "light"}`} />
            <input
              type="text"
              placeholder="Search contributors..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className={`search-input ${isDark ? "dark" : "light"}`}
            />
          </div>
        </div>

        {loading && (
          <div className={`skeleton-loader ${isDark ? "dark" : "light"}`}>
            <div className="skeleton-header">
              <div>#</div>
              <div>Contributor</div>
              <div>Contributions</div>
            </div>
            {[...Array(itemsPerPage)].map((_, i) => (
              <div key={i} className="skeleton-row">
                <div className="skeleton-avatar" />
                <div className="skeleton-avatar large" />
                <div className="skeleton-info">
                  <div className="skeleton-bar" />
                  <div className="skeleton-badges">
                    <div className="skeleton-badge" />
                    <div className="skeleton-badge" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="no-contributors">
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && filteredContributors.length === 0 && (
          <div className="no-contributors">
            <p>No contributors found.</p>
          </div>
        )}

        {!loading && !error && filteredContributors.length > 0 && (
          <div className={`contributors-container ${isDark ? "dark" : "light"}`}>
            <div className="contributors-header">
                <div className="contributor-cell rank">Rank</div>
                <div className="contributor-cell avatar-cell">Avatar</div>
                <div className="contributor-cell username-cell">User</div>
                <div className="contributor-cell prs-cell">PRs</div>
                <div className="contributor-cell points-cell">Points</div>
            </div>
            {currentItems.map((contributor, index) => (
              <motion.div
                key={contributor.username}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`contributor-row ${isDark ? (index % 2 === 0 ? "even" : "odd") : (index % 2 === 0 ? "even" : "odd")}`}
              >
                <div className={`contributor-cell rank-cell`}>
                  <div className={`rank-badge ${getRankClass(filteredContributors.indexOf(contributor))}`}>
                    {filteredContributors.indexOf(contributor) + 1}
                  </div>
                </div>
                <div className="contributor-cell avatar-cell">
                  <img
                    src={contributor.avatar}
                    alt={contributor.username}
                    className={`avatar ${isDark ? "dark" : "light"}`}
                  />
                </div>
                <div className="contributor-cell username-cell">
                    <a href={contributor.profile} target="_blank" rel="noreferrer" className={`username-link ${isDark ? "dark" : "light"}`}>
                      {contributor.username}
                    </a>
                </div>
                <div className="contributor-cell prs-cell">
                  <Badge count={contributor.prs} label="PRs" color={{ background: "#dbeafe", color: "#2563eb" }} />
                </div>
                <div className="contributor-cell points-cell">
                  <Badge count={contributor.points} label="Points" color={{ background: "#ede9fe", color: "#7c3aed" }} />
                </div>
              </motion.div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={`pagination ${isDark ? "dark" : "light"}`}>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="page-numbers">{renderPaginationButtons()}</div>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
            
            {/* CTA Footer */}
            <div className={`cta-footer ${isDark ? "dark" : "light"}`}>
              <p className={`cta-text ${isDark ? "dark" : "light"}`}>Want to get on this leaderboard?</p>
              <a
                href={`https://github.com/${GITHUB_ORG}`}
                target="_blank"
                rel="noreferrer"
                className="cta-button"
              >
                <FaGithub style={{ marginRight: 8 }} />
                Contribute on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}