import NavbarIcon from "../../components/navbar/NavbarIcon";
import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import {
  useCommunityStatsContext,
  CommunityStatsProvider,
} from "@site/src/lib/statsProvider";
import SlotCounter from "react-slot-counter";
import Giscus from "@giscus/react";
import { useLocation, useHistory } from "@docusaurus/router";
import "./dashboard.css";

type DiscussionTab = "discussions" | "trending" | "unanswered";
type SortOption = "most_popular" | "latest" | "oldest";
type Category = "all" | "react" | "typescript" | "nodejs" | "python" | "ai_ml";

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  tags: string[];
  isPinned?: boolean;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  username?: string;
  avatar: string;
  contributions: number;
  repositories: number;
  achievements: string[];
  github_url: string;
  score?: number;
  streak?: number;
  postManTag?: boolean;
  web3hack?: boolean;
  weeklyContributions?: number;
  monthlyContributions?: number;
}

type FilterPeriod = "weekly" | "monthly" | "overall";

interface DashboardStats {
  totalContributors: number;
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
  topContributors: LeaderboardEntry[];
}

interface RateLimitInfo {
  isLimited: boolean;
  resetTime?: number;
  remaining?: number;
  limit?: number;
}

// Helper function to parse CSV data from Google Sheets
const parseCSVToJSON = (csvText: string): any[] => {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  // Get headers from first line (remove quotes)
  const headers = lines[0]
    .split(",")
    .map((header) => header.replace(/"/g, "").trim());
  console.log("📋 CSV Headers found:", headers);

  // Parse data rows
  const data: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i]
      .split(",")
      .map((value) => value.replace(/"/g, "").trim());
    const row: any = {};

    headers.forEach((header, index) => {
      if (values[index]) {
        row[header] = values[index];
      }
    });

    // Only add rows that have meaningful data
    if (row[headers[0]] && row[headers[0]] !== "") {
      data.push(row);
    }
  }

  console.log("📊 Parsed CSV data:", data);
  return data;
};

const categories: Category[] = [
  "all",
  "react",
  "typescript",
  "nodejs",
  "python",
  "ai_ml",
];

const DashboardContent: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<
    "home" | "discuss" | "leaderboard" | "giveaway"
  >("home");

  // Discussion state management
  const [activeDiscussionTab, setActiveDiscussionTab] =
    useState<DiscussionTab>("discussions");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortOption>("most_popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: "1",
      title: "Best practices for React component optimization",
      content:
        "I've been working on a large React application and noticed some performance issues. What are the most effective ways to optimize React components for better performance? I'm particularly interested in memo, useMemo, and useCallback usage patterns.",
      author: {
        name: "Sarah Chen",
        avatar: "/img/default-avatar.png",
      },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: 24,
      comments: 8,
      tags: ["react", "performance", "frontend"],
      isPinned: true,
    },
    {
      id: "2",
      title: "Building scalable microservices with Node.js",
      content:
        "Looking for advice on architecting microservices using Node.js. What patterns and tools do you recommend?",
      author: {
        name: "Mike Rodriguez",
        avatar: "/img/default-avatar.png",
      },
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      likes: 31,
      comments: 14,
      tags: ["nodejs", "microservices", "architecture"],
    },
    {
      id: "3",
      title: "How to use AI/ML in Python for sentiment analysis?",
      content:
        "I'm new to AI/ML and want to build a sentiment analysis tool in Python. Where should I start? What libraries are recommended?",
      author: {
        name: "Alex Doe",
        avatar: "/img/default-avatar.png",
      },
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 15,
      comments: 3,
      tags: ["python", "ai_ml", "sentiment-analysis"],
    },
    {
      id: "4",
      title: "Getting started with TypeScript in a React project",
      content:
        "What are the benefits of using TypeScript with React? I'm looking for a simple guide to set it up.",
      author: {
        name: "Jane Smith",
        avatar: "/img/default-avatar.png",
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      likes: 45,
      comments: 0,
      tags: ["react", "typescript"],
    },
  ]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [filteredLeaderboardData, setFilteredLeaderboardData] = useState<
    LeaderboardEntry[]
  >([]);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>("monthly");
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState<string | null>(null);
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo>({
    isLimited: false,
  });
  const [retryTimer, setRetryTimer] = useState<number | null>(null);

  useEffect(() => {
    // Set active tab based on URL hash
    if (location.hash === "#discuss") {
      setActiveTab("discuss");
    } else if (location.hash === "#leaderboard") {
      setActiveTab("leaderboard");
    } else if (location.hash === "#giveaway") {
      setActiveTab("giveaway");
    } else {
      setActiveTab("home");
    }
  }, [location]);

  // Fetch leaderboard data when leaderboard tab is active
  useEffect(() => {
    if (activeTab === "leaderboard") {
      fetchLeaderboardData();
    }
  }, [activeTab]);

  // Discussion handlers
  const handleDiscussionTabChange = (tab: DiscussionTab) => {
    setActiveDiscussionTab(tab);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortOption);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleNewDiscussion = () => {
    // This could open a modal or navigate to a new discussion form
    alert("New discussion feature coming soon!");
  };

  // Filter discussions based on current state and tab
  const getFilteredDiscussions = (discussions: Discussion[]) => {
    return discussions
      .filter((discussion) => {
        // First apply tab filter
        switch (activeDiscussionTab) {
          case "trending":
            return discussion.likes > 20; // Show discussions with more than 20 likes
          case "unanswered":
            return discussion.comments === 0;
          default:
            return true;
        }
      })
      .filter((discussion) => {
        // Then apply category filter
        if (selectedCategory !== "all") {
          return discussion.tags.some(
            (tag) => tag.toLowerCase() === selectedCategory
          );
        }
        return true;
      })
      .filter((discussion) => {
        // Then apply search filter
        if (searchQuery) {
          return (
            discussion.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            discussion.content.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        return true;
      })
      .sort((a, b) => {
        // Pinned discussions first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;

        // Finally sort the results
        switch (sortBy) {
          case "latest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          default:
            return b.likes - a.likes; // most_popular
        }
      });
  };

  const filteredDiscussions = React.useMemo(
    () => getFilteredDiscussions(discussions),
    [discussions, activeDiscussionTab, selectedCategory, searchQuery, sortBy]
  );

  // Rate limit timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rateLimitInfo.isLimited && rateLimitInfo.resetTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const resetTime = rateLimitInfo.resetTime * 1000;
        const timeLeft = Math.max(0, resetTime - now);

        if (timeLeft <= 0) {
          setRateLimitInfo({ isLimited: false });
          setRetryTimer(null);
        } else {
          setRetryTimer(Math.ceil(timeLeft / 1000));
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [rateLimitInfo]);

  // Function to get GitHub headers with token if available
  const getGitHubHeaders = () => {
    return {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "RecodeHive-Dashboard/1.0",
    };
  };

  // Function to fetch data with rate limit handling
  const fetchWithRateLimit = async (url: string): Promise<Response> => {
    try {
      const response = await fetch(url, {
        headers: getGitHubHeaders(),
      });

      // Check rate limit headers
      const rateLimitRemaining = response.headers.get("X-RateLimit-Remaining");
      const rateLimitReset = response.headers.get("X-RateLimit-Reset");
      const rateLimitLimit = response.headers.get("X-RateLimit-Limit");

      // Handle rate limit more gracefully
      if (response.status === 403) {
        const resetTime = parseInt(rateLimitReset || "0");
        setRateLimitInfo({
          isLimited: true,
          resetTime,
          remaining: parseInt(rateLimitRemaining || "0"),
          limit: parseInt(rateLimitLimit || "60"),
        });
        throw new Error("GitHub API rate limit exceeded. Using cached data.");
      }

      // Update rate limit info for display
      if (rateLimitRemaining && rateLimitLimit) {
        setRateLimitInfo({
          isLimited: false,
          remaining: parseInt(rateLimitRemaining),
          limit: parseInt(rateLimitLimit),
        });
      }

      return response;
    } catch (error) {
      // More specific error handling
      if (error.message.includes("rate limit")) {
        throw error;
      }

      // Generic network error
      console.warn("Network error, falling back to demo data:", error);
      throw new Error(`Unable to fetch live data. Showing demo data instead.`);
    }
  };

  // Function to simulate weekly/monthly contribution data
  const generateContributionData = (totalContributions: number) => {
    // Simulate weekly contributions (10-30% of total)
    const weeklyContributions = Math.floor(
      totalContributions * (0.1 + Math.random() * 0.2)
    );
    // Simulate monthly contributions (30-60% of total)
    const monthlyContributions = Math.floor(
      totalContributions * (0.3 + Math.random() * 0.3)
    );

    return {
      weeklyContributions,
      monthlyContributions,
    };
  };

  // Filter leaderboard data based on selected period
  const filterLeaderboardData = (
    data: LeaderboardEntry[],
    period: FilterPeriod
  ) => {
    let sortedData = [...data];

    switch (period) {
      case "weekly":
        sortedData.sort(
          (a, b) => (b.weeklyContributions || 0) - (a.weeklyContributions || 0)
        );
        break;
      case "monthly":
        sortedData.sort(
          (a, b) =>
            (b.monthlyContributions || 0) - (a.monthlyContributions || 0)
        );
        break;
      case "overall":
      default:
        sortedData.sort((a, b) => b.contributions - a.contributions);
        break;
    }

    // Update ranks based on filtered sorting
    return sortedData.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
  };

  // Update filtered data when period or data changes
  useEffect(() => {
    const filtered = filterLeaderboardData(leaderboardData, filterPeriod);
    setFilteredLeaderboardData(filtered);
  }, [leaderboardData, filterPeriod]);

  const fetchLeaderboardData = async () => {
    if (rateLimitInfo.isLimited) {
      setLeaderboardError(
        "Rate limit exceeded. Please wait before trying again."
      );
      return;
    }

    setIsLoadingLeaderboard(true);
    setLeaderboardError(null);

    try {
      console.log("🔄 Fetching leaderboard data from RecodeHive GitHub API...");

      // Fetch all repositories from RecodeHive organization
      const reposResponse = await fetch(
        "https://api.github.com/orgs/recodehive/repos?type=public&per_page=100"
      );

      if (!reposResponse.ok) {
        if (reposResponse.status === 403) {
          console.warn("GitHub API rate limit exceeded. Using fallback data.");
          throw new Error("GitHub API rate limit exceeded");
        }
        throw new Error(`GitHub API request failed: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();
      // console.log(
      //   "📊 GitHub Repos Response:",
      //   repos.length,
      //   "repositories found"
      // );

      if (!Array.isArray(repos)) {
        throw new Error("Invalid GitHub API response format");
      }

      // Collect all contributors from all repositories (limit to avoid rate limits)
      const contributorsMap = new Map<
        string,
        {
          login: string;
          avatar_url: string;
          html_url: string;
          contributions: number;
          repositories: number;
          weeklyContributions: number;
          monthlyContributions: number;
        }
      >();

      // Process only top repositories to avoid rate limits
      const topRepos = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10); // Limit to top 10 repos to reduce API calls

      // console.log(`📊 Processing top ${topRepos.length} repositories...`);

      // Fetch contributors for each repository with delay to avoid rate limits
      for (let i = 0; i < topRepos.length; i++) {
        const repo = topRepos[i];
        try {
          // Add delay between requests to avoid hitting rate limits
          if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          const contributorsResponse = await fetchWithRateLimit(
            `https://api.github.com/repos/${repo.full_name}/contributors?per_page=100`
          );

          if (contributorsResponse.ok) {
            const contributors = await contributorsResponse.json();

            if (Array.isArray(contributors)) {
              contributors.forEach((contributor) => {
                if (contributor.login && contributor.type === "User") {
                  const existing = contributorsMap.get(contributor.login);
                  const contributionData = generateContributionData(
                    contributor.contributions
                  );

                  if (existing) {
                    existing.contributions += contributor.contributions;
                    existing.repositories += 1;
                    existing.weeklyContributions +=
                      contributionData.weeklyContributions;
                    existing.monthlyContributions +=
                      contributionData.monthlyContributions;
                  } else {
                    contributorsMap.set(contributor.login, {
                      login: contributor.login,
                      avatar_url: contributor.avatar_url,
                      html_url: contributor.html_url,
                      contributions: contributor.contributions,
                      repositories: 1,
                      weeklyContributions: contributionData.weeklyContributions,
                      monthlyContributions:
                        contributionData.monthlyContributions,
                    });
                  }
                }
              });
            }
          }
        } catch (error) {
          console.warn(`Error fetching contributors for ${repo.name}:`, error);
          if (error.message.includes("rate limit")) {
            // Stop processing if we hit rate limit
            break;
          }
        }
      }

      // Transform contributors data to match our LeaderboardEntry interface
      const transformedData: LeaderboardEntry[] = Array.from(
        contributorsMap.values()
      )
        .filter((contributor) => contributor.contributions > 0)
        .map((contributor, index) => {
          const score = contributor.contributions * 10; // Convert contributions to score
          const achievements = generateAchievements(
            score,
            contributor.contributions
          );

          return {
            rank: index + 1,
            name: contributor.login,
            username: contributor.login,
            avatar: contributor.avatar_url,
            contributions: contributor.contributions,
            repositories: contributor.repositories,
            score,
            achievements,
            github_url: contributor.html_url,
            streak: Math.floor(Math.random() * 10) + 1, // Random streak for demo
            postManTag: false,
            web3hack: false,
            weeklyContributions: contributor.weeklyContributions,
            monthlyContributions: contributor.monthlyContributions,
          };
        })
        .sort((a, b) => b.contributions - a.contributions) // Sort by contributions descending
        .map((item, index) => ({ ...item, rank: index + 1 })); // Update ranks after sorting

      // console.log(
      //   "✅ Successfully processed RecodeHive contributors data:",
      //   transformedData.length,
      //   "contributors"
      // );
      setLeaderboardData(transformedData);
    } catch (error) {
      console.error("❌ Error fetching RecodeHive contributors data:", error);
      setLeaderboardError(error.message);

      // Load fallback demo data
      console.log("📝 Loading demo data as fallback...");
      console.warn(
        "Using fallback leaderboard data due to GitHub API limitations"
      );
      setLeaderboardError("GitHub API rate limit reached. Showing demo data.");

      // Fallback demo data with similar structure
      console.log("📝 Loading demo data as fallback...");
      const demoData: LeaderboardEntry[] = [
        {
          rank: 1,
          name: "sanjay-kv",
          username: "sanjay-kv",
          avatar: "https://avatars.githubusercontent.com/u/30715153?v=4",
          contributions: 250,
          repositories: 25,
          score: 2500,
          achievements: ["🏆 Top Contributor", "👑 Founder", "🚀 Maintainer"],
          github_url: "https://github.com/sanjay-kv",
          streak: 15,
          postManTag: false,
          web3hack: false,
          weeklyContributions: 35,
          monthlyContributions: 120,
        },
        {
          rank: 2,
          name: "vansh-codes",
          username: "vansh-codes",
          avatar: "https://avatars.githubusercontent.com/u/114163734?v=4",
          contributions: 180,
          repositories: 22,
          score: 1800,
          achievements: [
            "🚀 Rising Star",
            "💪 Active Contributor",
            "⭐ Star Contributor",
          ],
          github_url: "https://github.com/vansh-codes",
          streak: 8,
          postManTag: false,
          web3hack: false,
          weeklyContributions: 25,
          monthlyContributions: 85,
        },
        {
          rank: 3,
          name: "Hemu21",
          username: "Hemu21",
          avatar: "https://avatars.githubusercontent.com/u/106808387?v=4",
          contributions: 120,
          repositories: 18,
          score: 1200,
          achievements: [
            "💪 Power User",
            "⭐ Star Contributor",
            "🔥 Consistent",
          ],
          github_url: "https://github.com/Hemu21",
          streak: 5,
          postManTag: false,
          web3hack: false,
          weeklyContributions: 18,
          monthlyContributions: 60,
        },
      ];
      setLeaderboardData(demoData);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const generateAchievements = (
    score: number,
    contributions: number
  ): string[] => {
    const achievements: string[] = [];

    // Score-based achievements (GSSoC style)
    if (score >= 5000) achievements.push("🏆 Elite Contributor");
    if (score >= 3000) achievements.push("⭐ Master Contributor");
    if (score >= 1000) achievements.push("🚀 Advanced Contributor");
    if (score >= 500) achievements.push("💪 Active Contributor");
    if (score >= 100) achievements.push("🌟 Rising Star");

    // PR count-based achievements
    if (contributions >= 100) achievements.push("📈 Century Club");
    if (contributions >= 50) achievements.push("🎯 Half Century");
    if (contributions >= 25) achievements.push("⚡ Quick Contributor");
    if (contributions >= 10) achievements.push("🔥 Consistent");

    // Special milestone achievements
    if (score >= 7000) achievements.push("👑 Legend");
    if (contributions >= 150) achievements.push("🎖️ PR Master");

    return achievements.slice(0, 3); // Limit to 3 achievements for UI
  };

  const handleTabChange = (
    tab: "home" | "discuss" | "leaderboard" | "giveaway"
  ) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false); // Close mobile sidebar
    if (tab === "discuss") {
      history.push("#discuss");
      window.scrollTo(0, 0);
    } else if (tab === "leaderboard") {
      history.push("#leaderboard");
      window.scrollTo(0, 0);
    } else if (tab === "giveaway") {
      history.push("/dashboard/giveaway");
      window.scrollTo(0, 0);
    } else {
      history.push("#");
    }
  };

  // Filter functions
  const handleFilterChange = (period: FilterPeriod) => {
    setFilterPeriod(period);
  };

  const getContributionCount = (
    entry: LeaderboardEntry,
    period: FilterPeriod
  ) => {
    switch (period) {
      case "weekly":
        return entry.weeklyContributions || 0;
      case "monthly":
        return entry.monthlyContributions || 0;
      case "overall":
      default:
        return entry.contributions;
    }
  };

  const FilterButtons = () => (
    <motion.div
      className="leaderboard-filters"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <button
        className={`filter-button ${
          filterPeriod === "weekly" ? "active" : ""
        } ${
          isLoadingLeaderboard || rateLimitInfo.isLimited
            ? "filter-loading"
            : ""
        }`}
        onClick={() => handleFilterChange("weekly")}
        disabled={isLoadingLeaderboard || rateLimitInfo.isLimited}
      >
        <span className="filter-icon">📅</span>
        Weekly
      </button>
      <button
        className={`filter-button ${
          filterPeriod === "monthly" ? "active" : ""
        } ${
          isLoadingLeaderboard || rateLimitInfo.isLimited
            ? "filter-loading"
            : ""
        }`}
        onClick={() => handleFilterChange("monthly")}
        disabled={isLoadingLeaderboard || rateLimitInfo.isLimited}
      >
        <span className="filter-icon">📊</span>
        Monthly
      </button>
      <button
        className={`filter-button ${
          filterPeriod === "overall" ? "active" : ""
        } ${
          isLoadingLeaderboard || rateLimitInfo.isLimited
            ? "filter-loading"
            : ""
        }`}
        onClick={() => handleFilterChange("overall")}
        disabled={isLoadingLeaderboard || rateLimitInfo.isLimited}
      >
        <span className="filter-icon">🏆</span>
        Overall
      </button>
    </motion.div>
  );

  const RateLimitWarning = () =>
    rateLimitInfo.isLimited ? (
      <motion.div
        className="rate-limit-warning"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h4>⚠️ GitHub API Rate Limit Reached</h4>
        <p>
          We've temporarily reached the GitHub API rate limit. The leaderboard
          will automatically refresh when the limit resets.
        </p>
        {retryTimer && (
          <div className="rate-limit-timer">
            Retry in: {Math.floor(retryTimer / 60)}:
            {(retryTimer % 60).toString().padStart(2, "0")}
          </div>
        )}
        <p>
          <strong>💡 Pro Tip:</strong> For unlimited access, consider setting up
          a GitHub Personal Access Token.
        </p>
      </motion.div>
    ) : rateLimitInfo.remaining && rateLimitInfo.remaining < 20 ? (
      <motion.div
        className="rate-limit-warning"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h4>⚠️ API Rate Limit Low</h4>
        <p>
          GitHub API requests remaining: {rateLimitInfo.remaining}/
          {rateLimitInfo.limit}
        </p>
      </motion.div>
    ) : null;

  // Rest of your component code remains the same...
  const {
    githubStarCount,
    githubStarCountText,
    githubContributorsCount,
    githubContributorsCountText,
    githubForksCount,
    githubForksCountText,
    githubReposCount,
    githubReposCountText,
    loading,
    error,
  } = useCommunityStatsContext();

  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalContributors: 0,
    totalRepositories: 0,
    totalStars: 0,
    totalForks: 0,
    topContributors: [],
  });

  // Mock data for demonstration
  const mockLeaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      name: "Vansh Codes",
      avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
      contributions: 982,
      repositories: 8,
      achievements: ["🚀 Rising Star", "💡 Bug Hunter", "📚 Documentation"],
      github_url: "https://github.com/vansh-codes",
    },
    {
      rank: 2,
      name: "Community Member",
      avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
      contributions: 756,
      repositories: 6,
      achievements: ["🎨 UI/UX Expert", "🔧 Feature Builder"],
      github_url: "https://github.com/example",
    },
    {
      rank: 3,
      name: "Open Source Dev",
      avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
      contributions: 523,
      repositories: 4,
      achievements: ["🌟 First Timer", "👥 Collaborator"],
      github_url: "https://github.com/example2",
    },
    {
      rank: 4,
      name: "Code Contributor",
      avatar: "https://avatars.githubusercontent.com/u/79542825?v=4",
      contributions: 401,
      repositories: 3,
      achievements: ["🏅 Consistent", "🔍 Code Reviewer"],
      github_url: "https://github.com/example3",
    },
  ];

  useEffect(() => {
    setDashboardStats({
      totalContributors: githubContributorsCount,
      totalRepositories: githubReposCount,
      totalStars: githubStarCount,
      totalForks: githubForksCount,
      topContributors: mockLeaderboardData,
    });
  }, [
    githubContributorsCount,
    githubReposCount,
    githubStarCount,
    githubForksCount,
  ]);

  const StatCard: React.FC<{
    icon: string;
    title: string;
    value: number;
    valueText: string;
    description: string;
  }> = ({ icon, title, value, valueText, description }) => (
    <motion.div
      className="dashboard-stat-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="dashboard-stat-icon">{icon}</div>
      <div className="dashboard-stat-content">
        <h3 className="dashboard-stat-title">{title}</h3>
        <div className="dashboard-stat-value">
          {loading ? (
            <div className="loading-spinner">⏳</div>
          ) : (
            <SlotCounter
              value={valueText}
              autoAnimationStart={true}
              duration={1}
            />
          )}
        </div>
        <p className="dashboard-stat-description">{description}</p>
      </div>
    </motion.div>
  );

  const LeaderboardCard: React.FC<{
    entry: LeaderboardEntry;
    index: number;
  }> = ({ entry, index }) => (
    <motion.div
      className="leaderboard-card"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
    >
      <div className="leaderboard-rank">
        <span className={`rank-badge rank-${entry.rank}`}>#{entry.rank}</span>
      </div>
      <div className="leaderboard-avatar">
        <img src={entry.avatar} alt={entry.name} />
      </div>
      <div className="leaderboard-info">
        <h4 className="leaderboard-name">{entry.name}</h4>
        <div className="leaderboard-stats">
          <span className="stat-item">
            <strong>{entry.contributions}</strong> Contributions
          </span>
          <span className="stat-item">
            <strong>{entry.repositories}</strong> Repositories
          </span>
        </div>
        <div className="leaderboard-achievements">
          {entry.achievements.map((achievement, i) => (
            <span key={i} className="achievement-badge">
              {achievement}
            </span>
          ))}
        </div>
      </div>
      <div className="leaderboard-actions">
        <a
          href={entry.github_url}
          target="_blank"
          rel="noopener noreferrer"
          className="github-profile-btn"
        >
          View Profile
        </a>
      </div>
    </motion.div>
  );

  return (
    <Layout title="Dashboard" description="RecodeHive Community Dashboard">
      <Head>
        <title>RecodeHive | Dashboard</title>
        <meta name="description" content="RecodeHive Community Dashboard" />
      </Head>
      <div className={`dashboard-layout ${isMobileSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileSidebarOpen ? 'open' : ''}`}
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          aria-label="Toggle mobile menu"
        />
        {/* Sidebar Navigation */}
        <nav
          className={`dashboard-sidebar ${
            isSidebarCollapsed ? "collapsed" : ""
          } ${isMobileSidebarOpen ? "show" : ""}`}
        >
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <h2>RecodeHive</h2>
            </div>
            <button
              className="sidebar-toggle"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {isSidebarCollapsed ? "→" : "←"}
            </button>
          </div>
          <ul className="sidebar-nav">
            <li
              className={`nav-item ${activeTab === "home" ? "active" : ""}`}
              onClick={() => handleTabChange("home")}
            >
              <span className="nav-icon">
                <NavbarIcon name="Dashboard" />
              </span>
              <span className="nav-text">Home</span>
            </li>
            <li
              className={`nav-item ${activeTab === "discuss" ? "active" : ""}`}
              onClick={() => handleTabChange("discuss")}
            >
              <span className="nav-icon">
                <NavbarIcon name="Broadcast" />
              </span>
              <span className="nav-text">Discuss</span>
            </li>
            <li
              className={`nav-item ${
                activeTab === "leaderboard" ? "active" : ""
              }`}
              onClick={() => handleTabChange("leaderboard")}
            >
              <span className="nav-icon">
                <NavbarIcon name="Badges" />
              </span>
              <span className="nav-text">Leaderboard</span>
            </li>
            <li
              className={`nav-item ${activeTab === "giveaway" ? "active" : ""}`}
              onClick={() => handleTabChange("giveaway")}
            >
              <span className="nav-icon">
                <NavbarIcon name="Donate" />
              </span>
              <span className="nav-text">Giveaway</span>
            </li>
          </ul>
          <div className="sidebar-footer">
            <button
              className="sidebar-toggle bottom-toggle"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              aria-label={
                isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {isSidebarCollapsed ? "→" : "←"}
            </button>
          </div>
        </nav>

        <main
          className={`dashboard-main ${
            activeTab === "discuss" ? "discuss-view" : ""
          } ${isSidebarCollapsed ? "sidebar-collapsed" : ""}`}
          onClick={() => isSidebarCollapsed && setIsSidebarCollapsed(false)}
        >
          {activeTab === "leaderboard" ? (
            /* Enhanced Leaderboard Tab with Filter Buttons */
            <div className="leaderboard-page-container">
              <motion.div
                className="leaderboard-page-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="leaderboard-page-title">
                  🏆 RecodeHive <span className="highlight">Contributors</span>
                </h1>
                <p className="leaderboard-page-subtitle">
                  Live rankings from RecodeHive GitHub Organization • Updated
                  automatically
                </p>

                {/* Header Controls: Refresh Button + Filter Buttons */}
                <div className="leaderboard-header-controls">
                  <div className="refresh-section">
                    <button
                      onClick={fetchLeaderboardData}
                      disabled={isLoadingLeaderboard || rateLimitInfo.isLimited}
                      className="refresh-button"
                    >
                      {isLoadingLeaderboard
                        ? "🔄 Loading..."
                        : "🔄 Refresh Data"}
                    </button>
                    {rateLimitInfo.remaining && (
                      <p
                        className="rate-limit-status"
                        style={{
                          margin: 0,
                          fontSize: "0.8rem",
                          color: "var(--ifm-color-emphasis-600)",
                        }}
                      >
                        API calls remaining: {rateLimitInfo.remaining}/
                        {rateLimitInfo.limit}
                      </p>
                    )}
                  </div>

                  {/* Filter Buttons positioned to the right */}
                  <FilterButtons />
                </div>
              </motion.div>

              {/* Rate Limit Warning */}
              <RateLimitWarning />

              {/* Loading State */}
              {isLoadingLeaderboard && (
                <motion.div
                  className="loading-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="loading-spinner-large">⏳</div>
                  <p className="loading-text">
                    Fetching latest contributor data...
                  </p>
                </motion.div>
              )}

              {/* Error State */}
              {leaderboardError && !isLoadingLeaderboard && (
                <motion.div
                  className="error-container"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="error-icon">⚠️</div>
                  <h3>Unable to Load Latest Data</h3>
                  <p>{leaderboardError}</p>
                  {!rateLimitInfo.isLimited && (
                    <button
                      onClick={fetchLeaderboardData}
                      className="retry-button"
                    >
                      Try Again
                    </button>
                  )}
                  <p className="error-help">
                    Showing cached data below. The leaderboard will
                    automatically refresh when possible.
                  </p>
                </motion.div>
              )}

              {/* Leaderboard Content */}
              {!isLoadingLeaderboard && filteredLeaderboardData.length > 0 && (
                <motion.div
                  className="leaderboard-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="leaderboard-stats">
                    <div className="stat-item">
                      <span className="stat-number">
                        {filteredLeaderboardData.length}
                      </span>
                      <span className="stat-label">Participants</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">
                        {getContributionCount(
                          filteredLeaderboardData[0],
                          filterPeriod
                        ) || 0}
                      </span>
                      <span className="stat-label">
                        Top{" "}
                        {filterPeriod.charAt(0).toUpperCase() +
                          filterPeriod.slice(1)}
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">
                        {Math.round(
                          filteredLeaderboardData.reduce(
                            (acc, user) =>
                              acc + getContributionCount(user, filterPeriod),
                            0
                          ) / filteredLeaderboardData.length
                        )}
                      </span>
                      <span className="stat-label">
                        Avg{" "}
                        {filterPeriod.charAt(0).toUpperCase() +
                          filterPeriod.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="leaderboard-grid">
                    {filteredLeaderboardData.map((entry, index) => (
                      <motion.div
                        key={entry.rank}
                        className="leaderboard-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        }}
                      >
                        {/* Streak Display */}
                        {entry.streak && entry.streak > 1 && (
                          <div className="streak-display">
                            {entry.streak} Day Streak
                          </div>
                        )}

                        <div className="rank-section">
                          <div
                            className={`rank-badge ${
                              entry.rank <= 3
                                ? `rank-${entry.rank}`
                                : "rank-other"
                            }`}
                          >
                            #{entry.rank}
                          </div>
                        </div>

                        <div className="avatar-section">
                          <img
                            src={entry.avatar}
                            alt={entry.name}
                            className="user-avatar"
                            loading="lazy"
                          />
                        </div>

                        <div className="user-info">
                          <h3 className="user-name">{entry.name}</h3>
                          {entry.username && entry.username !== entry.name && (
                            <p className="user-username">@{entry.username}</p>
                          )}

                          <div className="score-display">
                            <span className="score-number">
                              {getContributionCount(entry, filterPeriod)}
                            </span>
                            <span className="score-label">
                              {filterPeriod === "weekly"
                                ? "this week"
                                : filterPeriod === "monthly"
                                ? "this month"
                                : "total"}
                            </span>
                          </div>

                          <div className="user-stats">
                            <div className="stat">
                              <span className="stat-value">
                                {entry.contributions}
                              </span>
                              <span className="stat-text">Total PRs</span>
                            </div>
                            <div className="stat">
                              <span className="stat-value">
                                {entry.repositories}
                              </span>
                              <span className="stat-text">Repos</span>
                            </div>
                          </div>

                          {entry.achievements.length > 0 && (
                            <div className="achievements">
                              {entry.achievements.map((achievement, i) => (
                                <span key={i} className="achievement-tag">
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="leaderboard-actions">
                          <a
                            href={entry.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                          >
                            <span className="github-icon">👤</span>
                            View Profile
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Empty State */}
              {!isLoadingLeaderboard &&
                !leaderboardError &&
                filteredLeaderboardData.length === 0 && (
                  <motion.div
                    className="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3>📊 No data available</h3>
                    <p>The leaderboard is empty. Check back later!</p>
                  </motion.div>
                )}
            </div>
          ) : activeTab === "home" ? (
            // Home tab content
            <div>
              <motion.section
                className="dashboard-hero"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="hero-content">
                  <h1 className="dashboard-title">
                    Community <span className="highlight">Dashboard</span>
                  </h1>
                  <p className="dashboard-subtitle">
                    Track our community's growth, celebrate top contributors,
                    and explore project statistics
                  </p>
                </div>
              </motion.section>

              {/* Stats Grid */}
              <motion.section
                className="dashboard-stats-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="dashboard-stats-grid">
                  <StatCard
                    icon="⭐"
                    title="Total Stars"
                    value={dashboardStats.totalStars}
                    valueText={githubStarCountText}
                    description="Stars across all repositories"
                  />
                  <StatCard
                    icon="👥"
                    title="Contributors"
                    value={dashboardStats.totalContributors}
                    valueText={githubContributorsCountText}
                    description="Amazing community members"
                  />
                  <StatCard
                    icon="📚"
                    title="Repositories"
                    value={dashboardStats.totalRepositories}
                    valueText={githubReposCountText}
                    description="Open source projects"
                  />
                  <StatCard
                    icon="🍴"
                    title="Forks"
                    value={dashboardStats.totalForks}
                    valueText={githubForksCountText}
                    description="Community contributions"
                  />
                </div>
              </motion.section>

              {/* Leaderboard Section */}
              <motion.section
                className="dashboard-leaderboard-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="leaderboard-header">
                  <h2 className="leaderboard-title">
                    🏆 Top Contributors{" "}
                    <span className="title-accent">Leaderboard</span>
                  </h2>
                  <p className="leaderboard-description">
                    Celebrating our most active community members who make
                    RecodeHive awesome!
                  </p>
                </div>

                <div className="leaderboard-container">
                  {error && (
                    <div className="error-message">
                      <p>⚠️ Some data may be cached or incomplete</p>
                    </div>
                  )}

                  {dashboardStats.topContributors.map((entry, index) => (
                    <LeaderboardCard
                      key={entry.rank}
                      entry={entry}
                      index={index}
                    />
                  ))}
                </div>
              </motion.section>

              {/* Call to Action */}
              <motion.section
                className="dashboard-cta"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="cta-content">
                  <h3>Want to see your name here?</h3>
                  <p>
                    Join our community and start contributing to open source
                    projects!
                  </p>
                  <div className="cta-buttons">
                    <a
                      href="https://github.com/recodehive"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-primary"
                    >
                      Start Contributing
                    </a>
                    <a href="/community" className="cta-secondary">
                      Join Community
                    </a>
                  </div>
                </div>
              </motion.section>
            </div>
          ) : activeTab === "discuss" ? (
            <motion.div
              className="discussion-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="discussion-header">
                <h1>
                  Community <span className="highlight">Discussions</span>
                </h1>
                <p>
                  Join the conversation, ask questions, and share your thoughts
                  with the RecodeHive community.
                </p>
              </div>

              <div className="discussion-toolbar">
                <div className="toolbar-left">
                  <button
                    className={`tab-btn ${
                      activeDiscussionTab === "discussions" ? "active" : ""
                    }`}
                    onClick={() => handleDiscussionTabChange("discussions")}
                  >
                    All Discussions
                  </button>
                  <button
                    className={`tab-btn ${
                      activeDiscussionTab === "trending" ? "active" : ""
                    }`}
                    onClick={() => handleDiscussionTabChange("trending")}
                  >
                    🔥 Trending
                  </button>
                  <button
                    className={`tab-btn ${
                      activeDiscussionTab === "unanswered" ? "active" : ""
                    }`}
                    onClick={() => handleDiscussionTabChange("unanswered")}
                  >
                    ❓ Unanswered
                  </button>
                </div>
                <button
                  className="new-discussion-btn"
                  onClick={handleNewDiscussion}
                >
                  <NavbarIcon name="plus" /> New Discussion
                </button>
              </div>

              <div className="categories-bar">
                {categories.map((category) => (
                  <div
                    key={category}
                    className={`category ${
                      selectedCategory === category ? "active" : ""
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                ))}
              </div>

              <div className="search-filters">
                <div className="search-bar">
                  <span className="searchbar-icon">
                    <NavbarIcon name="search" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search discussions by title or content..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="sort-dropdown">
                  <select value={sortBy} onChange={handleSortChange}>
                    <option value="most_popular">Most Popular</option>
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                </div>
              </div>

              <div className="discussions-list">
                {filteredDiscussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className={`discussion-item ${
                      discussion.isPinned ? "pinned" : ""
                    }`}
                  >
                    <div className="discussion-avatar">
                      <img
                        src={discussion.author.avatar}
                        alt={`${discussion.author.name}'s avatar`}
                      />
                    </div>
                    <div className="discussion-content">
                      <div className="discussion-header-content">
                        <h3>{discussion.title}</h3>
                        {discussion.isPinned && (
                          <span className="pinned-badge">📌 Pinned</span>
                        )}
                      </div>
                      <div className="discussion-body">
                        <p>{discussion.content}</p>
                      </div>
                      <div className="discussion-meta">
                        <div className="tags">
                          {discussion.tags.map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="meta-info">
                          <span>
                            by <strong>{discussion.author.name}</strong>
                          </span>
                          <span>
                            {new Date(
                              discussion.createdAt
                            ).toLocaleDateString()}
                          </span>
                          <span>👍 {discussion.likes}</span>
                          <span>💬 {discussion.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            // Giveaway tab content
            <div>
              <motion.section
                className="dashboard-hero"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="hero-content">
                  <h1 className="dashboard-title">
                    🎁 <span className="highlight">Giveaway</span>
                  </h1>
                  <p className="dashboard-subtitle">
                    Participate in exclusive giveaways and win exciting prizes!
                  </p>
                </div>
              </motion.section>

              {/* Giveaway Stats Grid */}
              <motion.section
                className="dashboard-stats-section"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="dashboard-stats-grid">
                  <StatCard
                    icon="⏳"
                    title="Next Giveaway"
                    value={5}
                    valueText="5 Days"
                    description="Time remaining"
                  />
                  <StatCard
                    icon="🎫"
                    title="Entries"
                    value={1420}
                    valueText="1,420"
                    description="Total participants"
                  />
                  <StatCard
                    icon="📈"
                    title="Your Rank"
                    value={32}
                    valueText="32"
                    description="Based on your contribution"
                  />
                  <StatCard
                    icon="🏅"
                    title="Total Winners"
                    value={10}
                    valueText="10"
                    description="Winners per giveaway"
                  />
                </div>
              </motion.section>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
};

const Dashboard: React.FC = () => {
  return (
    <CommunityStatsProvider>
      <DashboardContent />
    </CommunityStatsProvider>
  );
};

export default Dashboard;
