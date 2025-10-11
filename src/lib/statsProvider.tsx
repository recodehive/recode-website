/** @jsxImportSource react */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [githubStarCount, setGithubStarCount] = useState(0);
  const [githubContributorsCount, setGithubContributorsCount] = useState(0);
  const [githubForksCount, setGithubForksCount] = useState(0);
  const [githubReposCount, setGithubReposCount] = useState(0);
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

  const fetchAllOrgRepos = useCallback(
    async (headers: Record<string, string>) => {
      const repos: any[] = [];
      let page = 1;
      while (true) {
        const resp = await fetch(
          `https://api.github.com/orgs/${GITHUB_ORG}/repos?type=public&per_page=100&page=${page}`,
          {
            headers,
          },
        );
        if (!resp.ok) {
          throw new Error(
            `Failed to fetch org repos: ${resp.status} ${resp.statusText}`,
          );
        }
        const data = await resp.json();
        repos.push(...data);
        if (!Array.isArray(data) || data.length < 100) break;
        page++;
      }
      return repos;
    },
    [],
  );

  const fetchMergedPRsForRepo = useCallback(
    async (repoName: string, headers: Record<string, string>) => {
      const mergedPRs: PullRequestItem[] = [];

      // First, get the first page to estimate total pages
      const firstResp = await fetch(
        `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/pulls?state=closed&per_page=100&page=1`,
        { headers },
      );

      if (!firstResp.ok) {
        console.warn(
          `Failed to fetch PRs for ${repoName}: ${firstResp.status} ${firstResp.statusText}`,
        );
        return [];
      }

      const firstPRs: PullRequestItem[] = await firstResp.json();
      if (!Array.isArray(firstPRs) || firstPRs.length === 0) return [];

      const firstPageMerged = firstPRs.filter((pr) => Boolean(pr.merged_at));
      mergedPRs.push(...firstPageMerged);

      // If we got less than 100, that's all there is
      if (firstPRs.length < 100) return mergedPRs;

      // Create parallel requests for remaining pages
      const pagePromises: Promise<PullRequestItem[]>[] = [];
      const maxPages = Math.min(MAX_PAGES_PER_REPO, 10);

      for (let i = 2; i <= maxPages; i++) {
        pagePromises.push(
          fetch(
            `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/pulls?state=closed&per_page=100&page=${i}`,
            { headers },
          )
            .then(async (resp) => {
              if (!resp.ok) return [];
              const prs: PullRequestItem[] = await resp.json();
              if (!Array.isArray(prs)) return [];
              return prs.filter((pr) => Boolean(pr.merged_at));
            })
            .catch(() => []),
        );
      }

      // Wait for all pages in parallel
      const remainingPages = await Promise.all(pagePromises);
      remainingPages.forEach((pagePRs) => {
        if (pagePRs.length > 0) mergedPRs.push(...pagePRs);
      });

      return mergedPRs;
    },
    [],
  );

  // Enhanced processing function that stores only valid PRs with points
  const processBatch = useCallback(
    async (
      repos: any[],
      headers: Record<string, string>,
    ): Promise<{
      contributorMap: Map<string, FullContributor>;
      totalMergedPRs: number;
    }> => {
      const contributorMap = new Map<string, FullContributor>();
      let totalMergedPRs = 0;

      // Process repos in batches to control concurrency
      for (let i = 0; i < repos.length; i += MAX_CONCURRENT_REQUESTS) {
        const batch = repos.slice(i, i + MAX_CONCURRENT_REQUESTS);

        const promises = batch.map(async (repo) => {
          if (repo.archived) return { mergedPRs: [], repoName: repo.name };

          try {
            const mergedPRs = await fetchMergedPRsForRepo(repo.name, headers);
            return { mergedPRs, repoName: repo.name };
          } catch (error) {
            console.warn(`Skipping repo ${repo.name} due to error:`, error);
            return { mergedPRs: [], repoName: repo.name };
          }
        });

        // Wait for current batch to complete
        const results = await Promise.all(promises);

        // Process results from this batch
        results.forEach(({ mergedPRs, repoName }) => {
          mergedPRs.forEach((pr) => {
            // Calculate points for this PR based on labels
            const prPoints = calculatePointsForPR(pr.labels);

            // ONLY store PRs that have points (i.e., have "recode" label and a level label)
            if (prPoints > 0) {
              totalMergedPRs++;

              const username = pr.user.login;
              if (!contributorMap.has(username)) {
                contributorMap.set(username, {
                  username,
                  avatar: pr.user.avatar_url,
                  profile: pr.user.html_url,
                  points: 0, // Will be calculated later based on filter
                  prs: 0, // Will be calculated later based on filter
                  allPRDetails: [], // Store only valid PRs here
                });
              }
              const contributor = contributorMap.get(username)!;

              // Add detailed PR information only if it has all required fields
              if (pr.title && pr.html_url && pr.merged_at && pr.number) {
                contributor.allPRDetails.push({
                  title: pr.title,
                  url: pr.html_url,
                  mergedAt: pr.merged_at,
                  repoName,
                  number: pr.number,
                  points: prPoints,
                });
              }
            }
          });
        });
      }

      return { contributorMap, totalMergedPRs };
    },
    [fetchMergedPRsForRepo],
  );

  const fetchAllStats = useCallback(
    async (signal: AbortSignal) => {
      setLoading(true);
      setError(null);

      // Check cache first
      const now = Date.now();
      if (cache.data && now - cache.timestamp < CACHE_DURATION) {
        setAllContributors(cache.data.contributors);
        setLoading(false);
        return;
      }

      if (!token) {
        setError(
          "GitHub token not found. Please set customFields.gitToken in docusaurus.config.js.",
        );
        setLoading(false);
        return;
      }

      try {
        const headers: Record<string, string> = {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        };

        // Fetch both org stats and repos in parallel
        const [orgStats, repos] = await Promise.all([
          githubService.fetchOrganizationStats(signal),
          fetchAllOrgRepos(headers),
        ]);

        // Set org stats immediately
        setGithubStarCount(orgStats.totalStars);
        setGithubContributorsCount(orgStats.totalContributors);
        setGithubForksCount(orgStats.totalForks);
        setGithubReposCount(orgStats.publicRepositories);
        setGithubDiscussionsCount(orgStats.discussionsCount);
        setLastUpdated(new Date(orgStats.lastUpdated));

        // Process leaderboard data with concurrent processing
        const { contributorMap, totalMergedPRs } = await processBatch(
          repos,
          headers,
        );

        const contributorsArray = Array.from(contributorMap.values());

        setAllContributors(contributorsArray);

        // Cache the results (raw data without filtering)
        setCache({
          data: {
            contributors: contributorsArray,
            rawStats: { totalPRs: totalMergedPRs },
          },
          timestamp: now,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error fetching GitHub organization stats:", err);
          setError(
            err instanceof Error ? err.message : "Failed to fetch GitHub stats",
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
    [token, fetchAllOrgRepos, processBatch, cache],
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
