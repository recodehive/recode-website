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
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"; // ✅ New import

const GITHUB_REPO = "recodehive/recode-website"; // Change to your repo
// ❌ Remove this line, it will cause the "process is not defined" error
// const token = process.env.DOCUSAURUS_GIT_TOKEN;

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

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
}

interface PullRequest {
  user: User;
  labels: { name: string }[];
}

function Badge({ count, label, color }: BadgeProps) {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        padding: "4px 8px",
        borderRadius: "9999px",
        marginRight: 8,
        ...color,
      }}
    >
      {count} {label}
    </span>
  );
}

export default function LeaderBoard(): JSX.Element {
  // ✅ Use this hook to get the custom fields from docusaurus.config.ts
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const token = customFields.gitToken; // ✅ Access the token from customFields

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
    const fetchLeaderboard = async () => {
      if (!token) {
        setError("GitHub token not found. Please set DOCUSAURUS_GIT_TOKEN.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const headers = {
          Authorization: `token ${token}`,
        };

        const fetchPRs = async (state: "open" | "closed") => {
          let allPRs: PullRequest[] = [];
          let page = 1;
          let hasNextPage = true;

          while (hasNextPage) {
            const response = await fetch(
              `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=${state}&per_page=100&page=${page}`,
              { headers }
            );

            if (!response.ok) {
              throw new Error(
                `Failed to fetch pull requests: ${response.statusText}`
              );
            }

            const prs: PullRequest[] = await response.json();
            allPRs = allPRs.concat(prs);
            hasNextPage = prs.length === 100;
            page++;
          }
          return allPRs;
        };

        const [openPRs, closedPRs] = await Promise.all([
          fetchPRs("open"),
          fetchPRs("closed"),
        ]);

        const allPRs = [...openPRs, ...closedPRs];

        const contributorMap = new Map<string, Contributor>();

        for (const pr of allPRs) {
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

          let prPoints = 0;
          const label = pr.labels.find((l) => l.name in POINTS)?.name;
          if (label) {
            prPoints = POINTS[label];
          }
          contributor.points += prPoints;
        }

        const sortedContributors = Array.from(contributorMap.values()).sort(
          (a, b) => b.points - a.points || b.prs - a.prs
        );

        setContributors(sortedContributors);
        setStats({
          flooredTotalPRs: allPRs.length,
          totalContributors: sortedContributors.length,
          flooredTotalPoints: sortedContributors.reduce(
            (sum, c) => sum + c.points,
            0
          ),
        });
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [token]); // The token is now a dependency of the useEffect hook

  const filteredContributors = contributors.filter((contributor) =>
    contributor.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContributors.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredContributors.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-1 rounded-full mx-1 ${
            currentPage === i
              ? isDark
                ? "bg-gray-700 text-white"
                : "bg-gray-300 text-gray-800"
              : isDark
              ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "'Inter', sans-serif",
        color: isDark ? "#f3f4f6" : "#1f2937",
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          background: isDark ? "#1f2937" : "#f9fafb",
          boxShadow: isDark
            ? "0 4px 6px rgba(0,0,0,0.2)"
            : "0 4px 6px rgba(0,0,0,0.1)",
          borderRadius: 8,
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <FaTrophy style={{ marginRight: 16, color: "#f59e0b" }} />
            Recode Hive Leaderboard
          </h1>
          <p style={{ color: isDark ? "#9ca3af" : "#6b7280" }}>
            Top contributors to the open-source project
            <a
              href={`https://github.com/${GITHUB_REPO}`}
              target="_blank"
              rel="noreferrer"
              style={{
                marginLeft: 8,
                color: isDark ? "#dbeafe" : "#2563eb",
                textDecoration: "underline",
              }}
            >
              <FaGithub style={{ marginLeft: 4 }} />
            </a>
          </p>
        </div>

        {stats && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 24,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                background: isDark ? "#374151" : "#fff",
                borderRadius: 8,
                padding: 24,
                textAlign: "center",
                boxShadow: isDark ? "none" : "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <FaCode style={{ fontSize: 28, color: "#a78bfa" }} />
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>
                {stats.flooredTotalPRs}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: isDark ? "#9ca3af" : "#6b7280",
                }}
              >
                Total PRs
              </div>
            </div>
            <div
              style={{
                background: isDark ? "#374151" : "#fff",
                borderRadius: 8,
                padding: 24,
                textAlign: "center",
                boxShadow: isDark ? "none" : "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <FaStar style={{ fontSize: 28, color: "#fcd34d" }} />
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>
                {stats.flooredTotalPoints}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: isDark ? "#9ca3af" : "#6b7280",
                }}
              >
                Total Points
              </div>
            </div>
            <div
              style={{
                background: isDark ? "#374151" : "#fff",
                borderRadius: 8,
                padding: 24,
                textAlign: "center",
                boxShadow: isDark ? "none" : "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <FaUsers style={{ fontSize: 28, color: "#60a5fa" }} />
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>
                {stats.totalContributors}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: isDark ? "#9ca3af" : "#6b7280",
                }}
              >
                Total Contributors
              </div>
            </div>
          </div>
        )}

        <div style={{ position: "relative", marginBottom: 24 }}>
          <FaSearch
            style={{
              position: "absolute",
              top: "50%",
              left: 16,
              transform: "translateY(-50%)",
              color: isDark ? "#6b7280" : "#9ca3af",
            }}
          />
          <input
            type="text"
            placeholder="Search contributors..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              width: "100%",
              padding: "12px 16px 12px 48px",
              borderRadius: 9999,
              border: isDark ? "1px solid #4b5563" : "1px solid #d1d5db",
              background: isDark ? "#374151" : "#fff",
              color: isDark ? "#f3f4f6" : "#1f2937",
              fontSize: 16,
              outline: "none",
            }}
          />
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "4px solid #f3f4f6",
                borderTopColor: "#60a5fa",
                animation: "spin 1s linear infinite",
                margin: "0 auto",
              }}
            ></div>
            <p style={{ marginTop: 16 }}>Loading leaderboard...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", color: "#ef4444", padding: 24 }}>
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && filteredContributors.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <p>No contributors found.</p>
          </div>
        )}

        {!loading && !error && filteredContributors.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            {/* Table */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: isDark ? "1px solid #4b5563" : "1px solid #d1d5db",
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "16px 24px",
                  fontWeight: 600,
                  fontSize: 14,
                  textTransform: "uppercase",
                  color: isDark ? "#9ca3af" : "#6b7280",
                  borderBottom: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
                }}
              >
                <div style={{ width: 40, marginRight: 16 }}>#</div>
                <div style={{ flex: 1, marginRight: 16 }}>User</div>
                <div style={{ width: 100 }}>Points</div>
              </div>

              {currentItems.map((contributor, index) => (
                <motion.div
                  key={contributor.username}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "16px 24px",
                    borderBottom: `1px solid ${isDark ? "#444" : "#eee"}`,
                  }}
                >
                  <div style={{ marginRight: 16 }}>
                    {indexOfFirst + index + 1}
                  </div>
                  <img
                    src={contributor.avatar}
                    alt={contributor.username}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      marginRight: 16,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <a
                      href={contributor.profile}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {contributor.username}
                    </a>
                    <div>
                      <Badge
                        count={contributor.prs}
                        label="PRs"
                        color={{
                          background: "#dbeafe",
                          color: "#2563eb",
                        }}
                      />
                      <Badge
                        count={contributor.points}
                        label="Points"
                        color={{
                          background: "#ede9fe",
                          color: "#7c3aed",
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: 8,
                borderRadius: "50%",
                background: isDark ? "#374151" : "#e5e7eb",
                color: isDark ? "#d1d5db" : "#6b7280",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                border: "none",
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <div style={{ margin: "0 8px" }}>{renderPaginationButtons()}</div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: 8,
                borderRadius: "50%",
                background: isDark ? "#374151" : "#e5e7eb",
                color: isDark ? "#d1d5db" : "#6b7280",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                border: "none",
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}