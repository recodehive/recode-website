// src/pages/dashboard/LeaderBoard/leaderboard.tsx
import React, { JSX, useEffect, useState } from "react";
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
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./leaderboard.css";

const GITHUB_ORG = "recodehive";
const POINTS_PER_PR = 10;

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

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface PullRequestItem {
  user: User;
  merged_at?: string | null;
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

export default function LeaderBoard(): JSX.Element {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const token = customFields?.gitToken || "";

  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAllOrgRepos = async (headers: Record<string, string>) => {
      const repos: any[] = [];
      let page = 1;
      while (true) {
        const resp = await fetch(`https://api.github.com/orgs/${GITHUB_ORG}/repos?type=public&per_page=100&page=${page}`, {
          headers,
        });
        if (!resp.ok) {
          throw new Error(`Failed to fetch org repos: ${resp.status} ${resp.statusText}`);
        }
        const data = await resp.json();
        repos.push(...data);
        if (!Array.isArray(data) || data.length < 100) break;
        page++;
      }
      return repos;
    };

    const fetchMergedPRsForRepo = async (repoName: string, headers: Record<string, string>) => {
      const mergedPRs: PullRequestItem[] = [];
      let page = 1;
      while (true) {
        const resp = await fetch(
          `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/pulls?state=closed&per_page=100&page=${page}`,
          { headers }
        );
        if (!resp.ok) {
          console.warn(`Failed to fetch PRs for ${repoName}: ${resp.status} ${resp.statusText}`);
          break;
        }
        const prs: PullRequestItem[] = await resp.json();
        if (!Array.isArray(prs) || prs.length === 0) break;

        const merged = prs.filter((pr) => Boolean(pr.merged_at));
        mergedPRs.push(...merged);

        if (prs.length < 100) break;
        page++;
      }
      return mergedPRs;
    };

    const fetchLeaderboard = async () => {
      if (!token) {
        setError("GitHub token not found. Please set customFields.gitToken in docusaurus.config.js.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const headers: Record<string, string> = {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        };

        const repos = await fetchAllOrgRepos(headers);

        const contributorMap = new Map<string, Contributor>();
        let totalMergedPRs = 0;

        for (const repo of repos) {
          if (repo.archived) continue;

          const repoName = repo.name;
          try {
            const mergedPRs = await fetchMergedPRsForRepo(repoName, headers);
            totalMergedPRs += mergedPRs.length;

            for (const pr of mergedPRs) {
              const username = pr.user.login;
              if (!contributorMap.has(username)) {
                contributorMap.set(username, {
                  username,
                  avatar: pr.user.avatar_url,
                  profile: pr.user.html_url,
                  points: 0,
                  prs: 0,
                });
              }
              const contributor = contributorMap.get(username)!;
              contributor.prs++;
              contributor.points += POINTS_PER_PR;
            }
          } catch (repoErr) {
            console.warn(`Skipping repo ${repoName} due to error:`, repoErr);
            continue;
          }
        }

        const sortedContributors = Array.from(contributorMap.values()).sort(
          (a, b) => b.points - a.points || b.prs - a.prs
        );

        setContributors(sortedContributors);
        setStats({
          flooredTotalPRs: totalMergedPRs,
          totalContributors: sortedContributors.length,
          flooredTotalPoints: sortedContributors.reduce((sum, c) => sum + c.points, 0),
        });
        setLoading(false);
      } catch (e: any) {
        setError(e?.message || String(e));
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [token]);

  const filteredContributors = contributors.filter((contributor) =>
    contributor.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContributors.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredContributors.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber: number) => setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`page-btn ${currentPage === i ? "active" : ""} `}
        >
          {i}
        </button>
      );
    }
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
        {!loading && !error && contributors.length > 2 && (
          <div className="top-performers-container">
            <h2 className={`top-performers-title ${isDark ? "dark" : "light"}`}>recodehive Top Performers</h2>
            <div className="top-performers-grid">
              <TopPerformerCard contributor={contributors[1]} rank={2} />
              <TopPerformerCard contributor={contributors[0]} rank={1} />
              <TopPerformerCard contributor={contributors[2]} rank={3} />
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
                  <div className={`rank-badge ${getRankClass(indexOfFirst + index)}`}>
                    {indexOfFirst + index + 1}
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