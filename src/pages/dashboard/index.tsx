import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { motion } from "framer-motion";
import {
  useCommunityStatsContext,
  CommunityStatsProvider,
} from "@site/src/lib/statsProvider";
import SlotCounter from "react-slot-counter";
import { useLocation, useHistory } from "@docusaurus/router";
import {
  githubService,
  GitHubDiscussion,
} from "@site/src/services/githubService";
import DiscussionCard from "@site/src/components/discussions/DiscussionCard";
import {
  Megaphone,
  Lightbulb,
  HelpCircle,
  Star,
  MessageCircle,
  Search,
  TrendingUp,
  Home,
  Trophy,
  Users,
  Gift,
  Calendar,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import NavbarIcon from "@site/src/components/navbar/NavbarIcon";
import "@site/src/components/discussions/discussions.css";
import "./dashboard.css";
import LeaderBoard from "./LeaderBoard/leaderboard"; // ✅ NEW IMPORT FOR LEADERBOARD COMPONENT

type DiscussionTab = "discussions" | "trending" | "unanswered";
type SortOption = "most_popular" | "latest" | "oldest";
type Category =
  | "all"
  | "announcements"
  | "ideas"
  | "q-a"
  | "show-and-tell"
  | "general";

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

const categories: Category[] = [
  "all",
  "announcements",
  "ideas",
  "q-a",
  "show-and-tell",
  "general",
];

const DashboardContent: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<
    "home" | "discuss" | "giveaway" | "contributors"
  >("home");

  // Discussion state management
  const [activeDiscussionTab, setActiveDiscussionTab] =
    useState<DiscussionTab>("discussions");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortOption>("most_popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [discussions, setDiscussions] = useState<GitHubDiscussion[]>([]);
  const [discussionsLoading, setDiscussionsLoading] = useState(true);
  const [discussionsError, setDiscussionsError] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);

  // Close dashboard menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showDashboardMenu && 
          !target.closest('.dashboard-mobile-menu') && 
          !target.closest('.dashboard-menu-btn')) {
        setShowDashboardMenu(false);
      }
    };

    if (showDashboardMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDashboardMenu]);
  
  // ❌ REMOVE THE FOLLOWING STATE VARIABLES FOR THE LEADERBOARD
  /*
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
  */
  

  useEffect(() => {
    // Set active tab based on URL hash
    if (location.hash === "#discuss") {
      setActiveTab("discuss");
    } else if (location.hash === "#contributors") {
      setActiveTab("contributors");
    } else if (location.hash === "#giveaway") {
      setActiveTab("giveaway");
    } else {
      setActiveTab("home");
    }
  }, [location]);

  // Fetch discussions when discuss tab is active
  useEffect(() => {
    if (activeTab === "discuss") {
      fetchDiscussions();
    }
  }, [activeTab]);

  const fetchDiscussions = async () => {
    try {
      setDiscussionsLoading(true);
      setDiscussionsError(null);
      const discussionsData = await githubService.fetchDiscussions(20);
      setDiscussions(discussionsData);
    } catch (error) {
      console.error("Failed to fetch discussions:", error);
      setDiscussionsError(
        error instanceof Error ? error.message : "Failed to load discussions"
      );
    } finally {
      setDiscussionsLoading(false);
    }
  };

  // ❌ REMOVE THE FOLLOWING useEffect HOOK FOR LEADERBOARD DATA
  /*
  // Fetch leaderboard data when contributors tab is active or on initial load
  useEffect(() => {
    if (activeTab === "contributors") {
      fetchLeaderboardData();
    }
  }, [activeTab]);
  */

  // ❌ REMOVE THE FOLLOWING useEffect HOOK FOR INITIAL DEMO DATA
  /*
  // Load initial demo data if no data exists
  useEffect(() => {
    if (leaderboardData.length === 0) {
      const initialData: LeaderboardEntry[] = [
        {
          rank: 1,
          name: "sanjay-kv",
          username: "sanjay-kv",
          avatar: "https://avatars.githubusercontent.com/u/30715153?v=4",
          contributions: 250,
          repositories: 25,
          score: 2500,
          achievements: ["Top Contributor", "Founder", "Maintainer"],
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
          achievements: ["Rising Star", "Active Contributor", "Star Contributor"],
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
          achievements: ["Power User", "Star Contributor", "Consistent"],
          github_url: "https://github.com/Hemu21",
          streak: 5,
          postManTag: false,
          web3hack: false,
          weeklyContributions: 18,
          monthlyContributions: 60,
        },
      ];
      setLeaderboardData(initialData);
    }
  }, [leaderboardData.length]);
  */

  // Discussion handlers
  const handleDiscussionTabChange = (tab: DiscussionTab) => {
    setActiveDiscussionTab(tab);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      all: null,
      announcements: <Megaphone size={14} />,
      ideas: <Lightbulb size={14} />,
      "q-a": <HelpCircle size={14} />,
      "show-and-tell": <Star size={14} />,
      general: <MessageCircle size={14} />,
    };
    return iconMap[category] || null;
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap = {
      all: "All",
      announcements: "Announcements",
      ideas: "Ideas",
      "q-a": "Q&A",
      "show-and-tell": "Show & Tell",
      general: "General",
    };
    return categoryMap[category] || category;
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortOption);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleNewDiscussion = () => {
    window.open(
      "https://github.com/recodehive/recode-website/discussions/new",
      "_blank"
    );
  };

  // Filter discussions based on current state and tab
  const getFilteredDiscussions = (discussions: GitHubDiscussion[]) => {
    return discussions
      .filter((discussion) => {
        // First apply tab filter
        switch (activeDiscussionTab) {
          case "trending":
            return discussion.reactions.total_count > 5; // Show discussions with more than 5 reactions
          case "unanswered":
            return discussion.comments === 0;
          default:
            return true;
        }
      })
      .filter((discussion) => {
        // Then apply category filter
        if (selectedCategory !== "all") {
          const categoryName = discussion.category.name.toLowerCase();
          const selectedCat = selectedCategory.toLowerCase();

          // Map GitHub discussion categories to our filter categories
          if (
            selectedCat === "q-a" &&
            (categoryName.includes("q&a") || categoryName.includes("question"))
          ) {
            return true;
          }
          if (
            selectedCat === "show-and-tell" &&
            categoryName.includes("show")
          ) {
            return true;
          }
          if (
            selectedCat === "announcements" &&
            categoryName.includes("announcement")
          ) {
            return true;
          }
          if (selectedCat === "ideas" && categoryName.includes("idea")) {
            return true;
          }
          if (
            selectedCat === "general" &&
            (categoryName.includes("general") ||
              categoryName.includes("discussion"))
          ) {
            return true;
          }

          return categoryName.includes(selectedCat);
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
            discussion.body.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        return true;
      })
      .sort((a, b) => {
        // Finally sort the results
        switch (sortBy) {
          case "latest":
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          case "oldest":
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          default:
            return b.reactions.total_count - a.reactions.total_count; // most_popular
        }
      });
  };

  const filteredDiscussions = React.useMemo(
    () => getFilteredDiscussions(discussions),
    [discussions, activeDiscussionTab, selectedCategory, searchQuery, sortBy]
  );

  // ❌ REMOVE THE FOLLOWING RATE LIMIT AND LEADERBOARD DATA FETCHING LOGIC
  /*
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
      console.log('Fetching leaderboard data from RecodeHive GitHub API...');

      // Fetch all repositories from RecodeHive organization
      const reposResponse = await fetch('https://api.github.com/orgs/recodehive/repos?type=public&per_page=100');

      if (!reposResponse.ok) {
        if (reposResponse.status === 403) {
          throw new Error('GitHub API rate limit exceeded');
        }
        throw new Error(`GitHub API request failed: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();

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

      setLeaderboardData(transformedData);
    } catch (error) {
      console.error("Error fetching RecodeHive contributors data:", error);
      setLeaderboardError(error.message);

      // Load fallback demo data
      console.warn("Using fallback leaderboard data due to GitHub API limitations");
      setLeaderboardError("GitHub API rate limit reached. Showing demo data.");
      const demoData: LeaderboardEntry[] = [
        {
          rank: 1,
          name: "sanjay-kv",
          username: "sanjay-kv",
          avatar: "https://avatars.githubusercontent.com/u/30715153?v=4",
          contributions: 250,
          repositories: 25,
          score: 2500,
          achievements: ["Top Contributor", "Founder", "Maintainer"],
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
          achievements: ["Rising Star", "Active Contributor", "Star Contributor"],
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
          achievements: ["Power User", "Star Contributor", "Consistent"],
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
    if (score >= 5000) achievements.push("Elite Contributor");
    if (score >= 3000) achievements.push("Master Contributor");
    if (score >= 1000) achievements.push("Advanced Contributor");
    if (score >= 500) achievements.push("Active Contributor");
    if (score >= 100) achievements.push("Rising Star");
    if (contributions >= 100) achievements.push("Century Club");
    if (contributions >= 50) achievements.push("Half Century");
    if (contributions >= 25) achievements.push("Quick Contributor");
    if (contributions >= 10) achievements.push("Consistent");
    if (score >= 7000) achievements.push("Legend");
    if (contributions >= 150) achievements.push("PR Master");
    return achievements.slice(0, 3);
  };
  */

  const handleTabChange = (
    tab: "home" | "discuss" | "giveaway" | "contributors"
  ) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false); // Close mobile sidebar
    setShowDashboardMenu(false); // Close dashboard menu
    if (tab === "discuss") {
      history.push("#discuss");
      window.scrollTo(0, 0);
    } else if (tab === "giveaway") {
      history.push("/dashboard/giveaway");
    } else if (tab === "contributors") {
      history.push("#contributors");
      window.scrollTo(0, 0);
    } else {
      history.push("#");
    }
  };

  // ❌ REMOVE THE FOLLOWING FILTER FUNCTIONS FOR THE LEADERBOARD
  /*
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
        <Calendar size={16} />
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
        <BarChart3 size={16} />
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
        <Trophy size={16} />
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
        <h4>GitHub API Rate Limit Reached</h4>
        <p>
          We've temporarily reached the GitHub API rate limit. The contributors page
          will automatically refresh when the limit resets.
        </p>
        {retryTimer && (
          <div className="rate-limit-timer">
            Retry in: {Math.floor(retryTimer / 60)}:
            {(retryTimer % 60).toString().padStart(2, "0")}
          </div>
        )}

      </motion.div>
    ) : rateLimitInfo.remaining && rateLimitInfo.remaining < 20 ? (
      <motion.div
        className="rate-limit-warning"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h4>API Rate Limit Low</h4>
        <p>
          GitHub API requests remaining: {rateLimitInfo.remaining}/
          {rateLimitInfo.limit}
        </p>
      </motion.div>
    ) : null;
  */

  // Rest of your component code remains the same...
  const {
    githubStarCount,
    githubContributorsCount,
    githubForksCount,
    githubReposCount,
    loading,
    error,
  } = useCommunityStatsContext();

  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalContributors: 0,
    totalRepositories: 0,
    totalStars: 0,
    totalForks: 0,
    topContributors: [], // You can keep this as an empty array or an initial state if needed
  });

  useEffect(() => {
    setDashboardStats({
      totalContributors: githubContributorsCount,
      totalRepositories: githubReposCount,
      totalStars: githubStarCount,
      totalForks: githubForksCount,
      topContributors: [], // This will be handled by the new LeaderBoard component
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
            <div className="loading-spinner">Loading...</div>
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

  return (
    <div className="dashboard-layout">
        {/* Dashboard Menu Button - Only visible on mobile */}
        <button
          className={`dashboard-menu-btn ${showDashboardMenu ? "open" : ""}`}
          onClick={() => setShowDashboardMenu(!showDashboardMenu)}
          aria-label="Toggle dashboard menu"
        >
          {showDashboardMenu ? "✕" : "☰"}
        </button>
        
        {/* Dashboard Mobile Menu */}
        <div className={`dashboard-mobile-menu ${showDashboardMenu ? "show" : ""}`}>
          {/* Overlay */}
          {showDashboardMenu && (
            <div 
              className="dashboard-menu-overlay"
              onClick={() => setShowDashboardMenu(false)}
            />
          )}
          <div className="dashboard-menu-header">
            <h3>Dashboard Menu</h3>
            <button
              className="close-menu-btn"
              onClick={() => setShowDashboardMenu(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          

          {/* Dashboard navigation items */}
          <div className="dashboard-menu-items">
            <div
              className={`menu-item ${activeTab === "home" ? "active" : ""}`}
              onClick={() => {
                handleTabChange("home");
                setShowDashboardMenu(false);
              }}
            >
              <span className="menu-icon"><Home size={18} /></span> Home
            </div>
            <div
              className={`menu-item ${activeTab === "discuss" ? "active" : ""}`}
              onClick={() => {
                handleTabChange("discuss");
                setShowDashboardMenu(false);
              }}
            >
              <span className="menu-icon"><MessageCircle size={18} /></span> Discussions
            </div>
            <div
              className={`menu-item ${activeTab === "contributors" ? "active" : ""}`}
              onClick={() => {
                handleTabChange("contributors");
                setShowDashboardMenu(false);
              }}
            >
              <span className="menu-icon"><Users size={18} /></span> Contributors
            </div>
            <div
              className={`menu-item ${activeTab === "giveaway" ? "active" : ""}`}
              onClick={() => {
                handleTabChange("giveaway");
                setShowDashboardMenu(false);
              }}
            >
              <span className="menu-icon"><Gift size={18} /></span> Giveaways
            </div>
          </div>
        </div>


      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <button
            className="back-button"
            onClick={() => history.goBack()}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="sidebar-nav">
          <NavbarIcon
            icon={<Home size={20} />}
            text="Home"
            active={activeTab === "home"}
            onClick={() => handleTabChange("home")}
          />
          <NavbarIcon
            icon={<MessageCircle size={20} />}
            text="Discussions"
            active={activeTab === "discuss"}
            onClick={() => handleTabChange("discuss")}
          />
          <NavbarIcon
            icon={<Users size={20} />}
            text="Contributors"
            active={activeTab === "contributors"}
            onClick={() => handleTabChange("contributors")}
          />
          <NavbarIcon
            icon={<Gift size={20} />}
            text="Giveaways"
            active={activeTab === "giveaway"}
            onClick={() => handleTabChange("giveaway")}
          />
        </div>
      </div>

      <div className="dashboard-main-content">
        <Head>
          <title>Dashboard | Recode Hive</title>
        </Head>

        {activeTab === "home" && (
          <motion.div
            className="dashboard-home-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="dashboard-main-title">Recode Hive Community Dashboard</h1>
            <p className="dashboard-description">
              Welcome to the Recode Hive community hub! Explore our stats, engage in discussions, and connect with fellow contributors.
            </p>

            <section className="dashboard-stats-section">
              <h2 className="section-title">Community At a Glance</h2>
              <div className="stat-cards-container">
                <StatCard
                  icon={<Star size={24} />}
                  title="Total Stars"
                  value={dashboardStats.totalStars}
                  valueText={
                    useCommunityStatsContext().githubStarCountText || "0"
                  }
                  description="Stars across all our public repositories."
                />
                <StatCard
                  icon={<Users size={24} />}
                  title="Total Contributors"
                  value={dashboardStats.totalContributors}
                  valueText={
                    useCommunityStatsContext().githubContributorsCountText || "0"
                  }
                  description="Users who have contributed to our repos."
                />
                <StatCard
                  icon={<Trophy size={24} />}
                  title="Total Repositories"
                  value={dashboardStats.totalRepositories}
                  valueText={
                    useCommunityStatsContext().githubReposCountText || "0"
                  }
                  description="Public repositories in our organization."
                />
                <StatCard
                  icon={<BarChart3 size={24} />}
                  title="Total Forks"
                  value={dashboardStats.totalForks}
                  valueText={
                    useCommunityStatsContext().githubForksCountText || "0"
                  }
                  description="Total forks of all our repositories."
                />
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === "discuss" && (
          <motion.div
            className="dashboard-discussions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="discussions-header">
              <h1>Community Discussions</h1>
              <p>
                Engage with the community, ask questions, and share your projects.
              </p>
            </div>
            <div className="discussions-controls">
              <div className="discussion-tabs">
                <button
                  onClick={() => handleDiscussionTabChange("discussions")}
                  className={`tab-button ${activeDiscussionTab === "discussions" ? "active" : ""
                    }`}
                >
                  <MessageCircle size={18} /> All Discussions
                </button>
                <button
                  onClick={() => handleDiscussionTabChange("trending")}
                  className={`tab-button ${activeDiscussionTab === "trending" ? "active" : ""
                    }`}
                >
                  <TrendingUp size={18} /> Trending
                </button>
                <button
                  onClick={() => handleDiscussionTabChange("unanswered")}
                  className={`tab-button ${activeDiscussionTab === "unanswered" ? "active" : ""
                    }`}
                >
                  <HelpCircle size={18} /> Unanswered
                </button>
              </div>
              <div className="search-and-sort">
                <div className="search-bar">
                  <Search size={16} />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <select onChange={handleSortChange} value={sortBy}>
                  <option value="most_popular">Most Popular</option>
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <button
                  className="new-discussion-btn"
                  onClick={handleNewDiscussion}
                >
                  New Discussion
                </button>
              </div>
            </div>
            <div className="discussions-main-content">
              <div className="category-sidebar">
                <h3>Categories</h3>
                <ul>
                  {categories.map((cat) => (
                    <li
                      key={cat}
                      className={selectedCategory === cat ? "active" : ""}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {getCategoryIcon(cat)} {getCategoryDisplayName(cat)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="discussion-list">
                {discussionsLoading && (
                  <div className="loading-spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                )}
                {discussionsError && (
                  <div className="discussions-error-message">
                    <p>{discussionsError}</p>
                  </div>
                )}
                {!discussionsLoading &&
                  !discussionsError &&
                  filteredDiscussions.length === 0 && (
                    <div className="no-discussions-found">
                      <p>No discussions found matching your criteria.</p>
                    </div>
                  )}
                {!discussionsLoading &&
                  !discussionsError &&
                  filteredDiscussions.map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ✅ REPLACED CONTRIBUTORS SECTION WITH THE NEW LEADERBOARD COMPONENT */}
        {activeTab === "contributors" && (
          <motion.div
            className="dashboard-contributors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LeaderBoard />
          </motion.div>
        )}

        {activeTab === "giveaway" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="giveaway-section"
          >
            <h1>Giveaways</h1>
            <p>
              Participate in our exciting giveaways for a chance to win awesome prizes!
            </p>
            <div className="giveaway-content">
              <p>
                Stay tuned for our next giveaway. Follow our social media channels for updates!
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <BrowserOnly fallback={<div>Loading Dashboard...</div>}>
        {() => (
          <CommunityStatsProvider>
            <DashboardContent />
          </CommunityStatsProvider>
        )}
      </BrowserOnly>
    </Layout>
  );
};

export default Dashboard;