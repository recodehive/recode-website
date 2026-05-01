import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

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
  allPRDetails: PRDetails[];
}

interface Stats {
  flooredTotalPRs: number;
  totalContributors: number;
  flooredTotalPoints: number;
}

interface OrgStats {
  totalStars: number;
  totalForks: number;
  publicRepositories: number;
  totalContributors: number;
  discussionsCount: number;
}

export const CommunityStatsContext = createContext<
  ICommunityStatsContext | undefined
>(undefined);

interface CommunityStatsProviderProps {
  children: ReactNode;
}

const CACHE_DURATION = 20 * 60 * 1000; // 20 minutes cache

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
  const [loading, setLoading] = useState(false);
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

  // State for raw backend data
  const [allContributors, setAllContributors] = useState<Contributor[]>([]);
  const [backendStats, setBackendStats] = useState<Stats | null>(null);

  // Cache state
  const [cache, setCache] = useState<{
    data: {
      contributors: Contributor[];
      stats: Stats;
      orgStats: OrgStats;
    } | null;
    timestamp: number;
  }>({ data: null, timestamp: 0 });

  // Computed filtered contributors based on current time filter
  const contributors = useMemo(() => {
    if (!allContributors.length) return [];

    return allContributors
      .map((contributor) => {
        const filteredPRs = contributor.allPRDetails.filter((pr) =>
          isPRInTimeRange(pr.mergedAt, currentTimeFilter),
        );

        const totalPoints = filteredPRs.reduce((sum, pr) => sum + pr.points, 0);

        return {
          ...contributor,
          points: totalPoints,
          prs: filteredPRs.length,
          prDetails: filteredPRs,
        };
      })
      .filter((contributor) => contributor.prs > 0)
      .sort((a, b) => b.points - a.points || b.prs - a.prs);
  }, [allContributors, currentTimeFilter]);

  // Computed stats based on filtered contributors
  const stats = useMemo(() => {
    if (contributors.length === 0) return backendStats;
    
    return {
      flooredTotalPRs: contributors.reduce((sum, c) => sum + c.prs, 0),
      totalContributors: contributors.length,
      flooredTotalPoints: contributors.reduce((sum, c) => sum + c.points, 0),
    };
  }, [contributors, backendStats]);

  const getFilteredPRsForContributor = useCallback(
    (username: string): PRDetails[] => {
      const contributor = allContributors.find((c) => c.username === username);
      if (!contributor) return [];

      return contributor.allPRDetails
        .filter((pr) => isPRInTimeRange(pr.mergedAt, currentTimeFilter))
        .sort(
          (a, b) =>
            new Date(b.mergedAt).getTime() - new Date(a.mergedAt).getTime(),
        );
    },
    [allContributors, currentTimeFilter],
  );

  const setTimeFilter = useCallback((filter: TimeFilter) => {
    setCurrentTimeFilter(filter);
  }, []);

  const fetchAllStats = useCallback(
    async (signal: AbortSignal) => {
      const now = Date.now();
      const isCacheValid = cache.data && now - cache.timestamp < CACHE_DURATION;

      if (isCacheValid) {
        const { contributors: c, stats: s, orgStats: os } = cache.data!;
        setAllContributors(c);
        setBackendStats(s);
        setGithubStarCount(os.totalStars);
        setGithubContributorsCount(os.totalContributors);
        setGithubForksCount(os.totalForks);
        setGithubReposCount(os.publicRepositories);
        setGithubDiscussionsCount(os.discussionsCount);
        setLoading(false);
        return;
      }

      if (cache.data) {
        setAllContributors(cache.data.contributors);
        setLoading(false);
      } else {
        setLoading(true);
      }

      setError(null);

      try {
        // Fetch from our new backend API
        // This is served by either Vercel (production) or our Docusaurus plugin (development)
        const apiPath = "/api/leaderboard";
        const resp = await fetch(apiPath, { signal });

        if (!resp.ok) {
          throw new Error(`API Error: ${resp.status} ${resp.statusText}`);
        }

        // Verify we got JSON back (not an HTML error page)
        const contentType = resp.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received invalid data format (HTML). Please restart your dev server (npm start).");
        }

        const result = await resp.json();

        if (result.success) {
          setAllContributors(result.contributors);
          setBackendStats(result.stats);
          setLastUpdated(new Date(result.updatedAt));

          // Set org stats directly from backend response
          const os = result.orgStats;
          setGithubStarCount(os.totalStars);
          setGithubContributorsCount(os.totalContributors);
          setGithubForksCount(os.totalForks);
          setGithubReposCount(os.publicRepositories);
          setGithubDiscussionsCount(os.discussionsCount);

          setCache({
            data: {
              contributors: result.contributors,
              stats: result.stats,
              orgStats: result.orgStats
            },
            timestamp: now,
          });
        } else {
          throw new Error(result.error || "Failed to fetch leaderboard");
        }

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error fetching leaderboard data:", err);
          setError(
            err instanceof Error ? err.message : "Failed to fetch leaderboard data",
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [cache],
  );

  const clearCache = useCallback(() => {
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
