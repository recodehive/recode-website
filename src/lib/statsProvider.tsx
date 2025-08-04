/** @jsxImportSource react */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { githubService, type GitHubOrgStats } from '../services/githubService';

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
}

export const CommunityStatsContext = createContext<
  ICommunityStatsContext | undefined
>(undefined);

interface CommunityStatsProviderProps {
  children: React.ReactNode;
}

export function CommunityStatsProvider({
  children,
}: CommunityStatsProviderProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [githubStarCount, setGithubStarCount] = useState(0);
  const [githubContributorsCount, setGithubContributorsCount] = useState(0);
  const [githubForksCount, setGithubForksCount] = useState(0);
  const [githubReposCount, setGithubReposCount] = useState(0);
  const [githubDiscussionsCount, setGithubDiscussionsCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchGithubStats = useCallback(async (signal: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const stats: GitHubOrgStats =
        await githubService.fetchOrganizationStats(signal);

      setGithubStarCount(stats.totalStars);
      setGithubContributorsCount(stats.totalContributors);
      setGithubForksCount(stats.totalForks);
      setGithubReposCount(stats.publicRepositories);
      setGithubDiscussionsCount(stats.discussionsCount);
      setLastUpdated(new Date(stats.lastUpdated));

      console.log('GitHub organization stats fetched successfully:', stats);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error fetching GitHub organization stats:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to fetch GitHub stats'
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
  }, []);

  const clearCache = useCallback(() => {
    githubService.clearCache();
    // Optionally refetch after clearing cache
    const abortController = new AbortController();
    fetchGithubStats(abortController.signal);
  }, [fetchGithubStats]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchGithubStats(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchGithubStats]);

  const githubStarCountText = useMemo(() => {
    return convertStatToText(githubStarCount);
  }, [githubStarCount]);

  const githubContributorsCountText = useMemo(() => {
    return convertStatToText(githubContributorsCount);
  }, [githubContributorsCount]);

  const githubForksCountText = useMemo(() => {
    return convertStatToText(githubForksCount);
  }, [githubForksCount]);

  const githubReposCountText = useMemo(() => {
    return convertStatToText(githubReposCount);
  }, [githubReposCount]);

  const githubDiscussionsCountText = useMemo(() => {
    return convertStatToText(githubDiscussionsCount);
  }, [githubDiscussionsCount]);

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
    refetch: fetchGithubStats,
    clearCache,
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
      'useCommunityStatsContext must be used within a CommunityStatsProvider'
    );
  }
  return context;
};

export const convertStatToText = (num: number): string => {
  const hasIntlSupport =
    typeof Intl === 'object' && Intl && typeof Intl.NumberFormat === 'function';

  if (!hasIntlSupport) {
    return `${(num / 1000).toFixed(1)}k`;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumSignificantDigits: 3,
  });
  return formatter.format(num);
};
