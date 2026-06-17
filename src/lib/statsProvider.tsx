import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { githubService, type GitHubOrgStats } from "../services/githubService";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// Time filter types
export type TimeFilter = "week" | "month" | "year" | "all";

interface ICommunityStatsContext {
  githubStarCount: number;
  githubStarCountText: string;
  githubContributorsCount: number;
  githubContributorsCountText: string;
  githubForksCount: number;
  githubForksCountText: string;
  githubReposCount: number;
  githubReposCountText: string;
  githubDiscussionsCount: number;
  githubDiscussionsCountText: string;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refetch: (signal: AbortSignal) => Promise<void>;
  clearCache: () => void;

  // Leaderboard properties
  contributors: Contributor[];
  stats: Stats | null;

  // New time filter properties
  currentTimeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  getFilteredPRsForContributor: (username: string) => PRDetails[];
}

// Define types for leaderboard data
interface PRDetails {
  title: string;
  url: string;
  mergedAt: string;
  repoName: string;
  number: number;
  points: number;
}

interface Contributor {
  username: string;
  avatar: string;
  profile: string;
  points: number;
  prs: number;
  prDetails?: PRDetails[];
}

interface Stats {
  flooredTotalPRs: number;
  totalContributors: number;
  flooredTotalPoints: number;
}

interface PullRequestItem {
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  merged_at?: string | null;
  title?: string;
  html_url?: string;
  number?: number;
  labels?: Array<{ name: string }>;
}

// Enhanced contributor type for internal processing (stores all PRs)
interface FullContributor extends Omit<Contributor, "points" | "prs"> {
  allPRDetails: PRDetails[]; // All PRs regardless of filter
  points: number; // Filtered points
  prs: number; // Filtered PR count
}

export const CommunityStatsContext = createContext<
  ICommunityStatsContext | undefined
>(undefined);

interface CommunityStatsProviderProps {
  children: ReactNode;
}

const GITHUB_ORG = "recodehive";
const POINTS_PER_PR = 10;
const MAX_CONCURRENT_REQUESTS = 15;
const CACHE_DURATION = 20 * 60 * 1000; // 20 minutes cache
const MAX_PAGES_PER_REPO = 10;

// Function to calculate points based on PR labels
const calculatePointsForPR = (labels?: Array<{ name: string }>): number => {
  if (!labels || labels.length === 0) {
    return 0; // No points if no labels
  }

  const labelNames = labels.map((label) => label.name.toLowerCase());

  // Check if PR has the "recode" label
  if (!labelNames.includes("recode")) {
    return 0; // No points if "recode" label is missing
  }

  // Check for level labels and assign points accordingly with new point system
  const levelPointsMap: { [key: string]: number } = {
    "level 1": 10,
    "level 2": 30,
    "level 3": 50,
  };
  const matchedLevel = labelNames.find((label) =>
    levelPointsMap.hasOwnProperty(label),
  );
  if (matchedLevel) {
    return levelPointsMap[matchedLevel];
  }

  return 0; // No points if no level label
};

// Time filter utility functions
const getTimeFilterDate = (filter: TimeFilter): Date | null => {
  const now = new Date();
  switch (filter) {
    case "week":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "month": {
      const lastMonth = new Date(now);
      lastMonth.setMonth(now.getMonth() - 1);
      return lastMonth;
    }
    case "year":
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    case "all":
    default:
      return null; // No filter
  }
};

const isPRInTimeRange = (mergedAt: string, filter: TimeFilter): boolean => {
  if (filter === "all") return true;

  const filterDate = getTimeFilterDate(filter);
  if (!filterDate) return true;

  const prDate = new Date(mergedAt);
  return prDate >= filterDate;
};

export function CommunityStatsProvider({
  children,
}: CommunityStatsProviderProps) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const token = customFields?.gitToken || "";
  const backendApiUrl = (customFields?.backendApiUrl as string) || "http://localhost:5000";

  const [loading, setLoading] = useState(false); // Start with false to avoid hourglass
  const [error, setError] = useState<string | null>(null);
  const [githubStarCount, setGithubStarCount] = useState(984); // Placeholder value - updated to match production
  const [githubContributorsCount, setGithubContributorsCount] = useState(467); // Placeholder value - updated to match production
  const [githubForksCount, setGithubForksCount] = useState(1107); // Placeholder value - updated to match production
  const [githubReposCount, setGithubReposCount] = useState(10); // Placeholder value - updated to match production
  const [githubDiscussionsCount, setGithubDiscussionsCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Time filter state
  const [currentTimeFilter, setCurrentTimeFilter] =
    useState<TimeFilter>("week");

  // Enhanced state for leaderboard data (stores all contributors with full PR history)
  const [allContributors, setAllContributors] = useState<FullContributor[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  // Cache state (stores raw data without filters)
  const [cache, setCache] = useState<{
    data: {
      contributors: FullContributor[];
      rawStats: { totalPRs: number };
    } | null;
    timestamp: number;
  }>({ data: null, timestamp: 0 });

  // Computed filtered contributors based on current time filter
  const contributors = useMemo(() => {
    if (!allContributors.length) return [];

    const filteredContributors = allContributors
      .map((contributor) => {
        const filteredPRs = contributor.allPRDetails.filter((pr) =>
          isPRInTimeRange(pr.mergedAt, currentTimeFilter),
        );

        // Calculate total points from all filtered PRs
        const totalPoints = filteredPRs.reduce((sum, pr) => sum + pr.points, 0);

        return {
          username: contributor.username,
          avatar: contributor.avatar,
          profile: contributor.profile,
          points: totalPoints,
          prs: filteredPRs.length,
          prDetails: filteredPRs, // For backward compatibility, though we'll use the new function
        };
      })
      .filter((contributor) => contributor.prs > 0) // Only show contributors with PRs in the time range
      .sort((a, b) => b.points - a.points || b.prs - a.prs);

    return filteredContributors;
  }, [allContributors, currentTimeFilter]);

  // Update stats when contributors change
  useEffect(() => {
    if (contributors.length > 0) {
      setStats({
        flooredTotalPRs: contributors.reduce((sum, c) => sum + c.prs, 0),
        totalContributors: contributors.length,
        flooredTotalPoints: contributors.reduce((sum, c) => sum + c.points, 0),
      });
    }
  }, [contributors]);

  // Function to get filtered PRs for a specific contributor (for PR view modal)
  const getFilteredPRsForContributor = useCallback(
    (username: string): PRDetails[] => {
      const contributor = allContributors.find((c) => c.username === username);
      if (!contributor) return [];

      return contributor.allPRDetails
        .filter((pr) => isPRInTimeRange(pr.mergedAt, currentTimeFilter))
        .sort(
          (a, b) =>
            new Date(b.mergedAt).getTime() - new Date(a.mergedAt).getTime(),
        ); // Sort by newest first
    },
    [allContributors, currentTimeFilter],
  );

  // Time filter setter function
  const setTimeFilter = useCallback((filter: TimeFilter) => {
    setCurrentTimeFilter(filter);
  }, []);

  const fetchAllStats = useCallback(
    async (signal: AbortSignal) => {
      // Check cache first and load it immediately without showing loading state
      const now = Date.now();
      const isCacheValid = cache.data && now - cache.timestamp < CACHE_DURATION;

      if (isCacheValid) {
        // Use cached data immediately
        setAllContributors(cache.data.contributors);
        setLoading(false);
        return;
      }

      // If cache is expired or empty, show cached data anyway but fetch fresh data
      // This provides immediate content while updating in the background
      if (cache.data) {
        setAllContributors(cache.data.contributors);
        setLoading(false); // Don't show loading state for background refresh
      } else {
        setLoading(true); // Only show loading on first load
      }

      setError(null);

      try {
        const [leaderboardResp, statsResp] = await Promise.all([
          fetch(`${backendApiUrl}/api/leaderboard`, { signal }),
          fetch(`${backendApiUrl}/api/stats`, { signal })
        ]);

        if (!leaderboardResp.ok || !statsResp.ok) {
          throw new Error("Failed to fetch leaderboard data from backend server");
        }

        const leaderboardData = await leaderboardResp.json();
        const statsData = await statsResp.json();

        // Set org stats immediately
        setGithubStarCount(statsData.totalStars);
        setGithubContributorsCount(statsData.totalContributors);
        setGithubForksCount(statsData.totalForks);
        setGithubReposCount(statsData.publicRepositories);
        setGithubDiscussionsCount(statsData.discussionsCount);
        setLastUpdated(new Date(statsData.lastUpdated));

        // Format to FullContributor (which matches contributor mapping)
        const contributorsArray: FullContributor[] = (leaderboardData.contributors || []).map((c: any) => ({
          username: c.username,
          avatar: c.avatar,
          profile: c.profile,
          points: c.points,
          prs: c.prs,
          allPRDetails: c.prDetails || [] // Backend stores complete list
        }));

        setAllContributors(contributorsArray);

        // Cache the results (raw data without filtering)
        setCache({
          data: {
            contributors: contributorsArray,
            rawStats: { totalPRs: statsData.totalContributors },
          },
          timestamp: now,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error fetching stats from backend:", err);
          setError(
            err instanceof Error ? err.message : "Failed to fetch stats from backend",
          );

          // Set fallback values on error
          setGithubStarCount(0);
          setGithubContributorsCount(140);
          setGithubForksCount(0);
          setGithubReposCount(20);
          setGithubDiscussionsCount(0);
        }
      } finally {
        setLoading(false);
      }
    },
    [backendApiUrl, cache],
  );

  const clearCache = useCallback(() => {
    githubService.clearCache();
    setCache({ data: null, timestamp: 0 });
    const abortController = new AbortController();
    fetchAllStats(abortController.signal);
  }, [fetchAllStats]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchAllStats(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchAllStats]);

  const githubStarCountText = useMemo(
    () => convertStatToText(githubStarCount),
    [githubStarCount],
  );
  const githubContributorsCountText = useMemo(
    () => convertStatToText(githubContributorsCount),
    [githubContributorsCount],
  );
  const githubForksCountText = useMemo(
    () => convertStatToText(githubForksCount),
    [githubForksCount],
  );
  const githubReposCountText = useMemo(
    () => convertStatToText(githubReposCount),
    [githubReposCount],
  );
  const githubDiscussionsCountText = useMemo(
    () => convertStatToText(githubDiscussionsCount),
    [githubDiscussionsCount],
  );

  const value: ICommunityStatsContext = {
    githubStarCount,
    githubStarCountText,
    githubContributorsCount,
    githubContributorsCountText,
    githubForksCount,
    githubForksCountText,
    githubReposCount,
    githubReposCountText,
    githubDiscussionsCount,
    githubDiscussionsCountText,
    loading,
    error,
    lastUpdated,
    refetch: fetchAllStats,
    clearCache,
    contributors,
    stats,
    currentTimeFilter,
    setTimeFilter,
    getFilteredPRsForContributor,
  };

  return (
    <CommunityStatsContext.Provider value={value}>
      {children}
    </CommunityStatsContext.Provider>
  );
}

export const useCommunityStatsContext = (): ICommunityStatsContext => {
  const context = useContext(CommunityStatsContext);
  if (context === undefined) {
    throw new Error(
      "useCommunityStatsContext must be used within a CommunityStatsProvider",
    );
  }
  return context;
};

export const convertStatToText = (num: number): string => {
  const hasIntlSupport =
    typeof Intl === "object" && Intl && typeof Intl.NumberFormat === "function";

  if (!hasIntlSupport) {
    return `${(num / 1000).toFixed(1)}k`;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumSignificantDigits: 3,
  });
  return formatter.format(num);
};
