
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
  // New properties for leaderboard
  contributors: Contributor[];
  stats: Stats | null;
}

// Define types for leaderboard data
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

interface PullRequestItem {
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  merged_at?: string | null;
}

export const CommunityStatsContext = createContext<ICommunityStatsContext | undefined>(undefined);

interface CommunityStatsProviderProps {
  children: ReactNode;
}

const GITHUB_ORG = "recodehive";
const POINTS_PER_PR = 10;
const MAX_CONCURRENT_REQUESTS = 8; // Increased for better performance
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
const MAX_PAGES_PER_REPO = 20; // Limit pages to prevent infinite loops on huge repos

export function CommunityStatsProvider({ children }: CommunityStatsProviderProps) {
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
  
  // New state for leaderboard data
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  
  // Cache state
  const [cache, setCache] = useState<{
    data: { contributors: Contributor[]; stats: Stats } | null;
    timestamp: number;
  }>({ data: null, timestamp: 0 });

  const fetchAllOrgRepos = useCallback(async (headers: Record<string, string>) => {
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
  }, []);

  const fetchMergedPRsForRepo = useCallback(async (repoName: string, headers: Record<string, string>) => {
    const mergedPRs: PullRequestItem[] = [];
    let page = 1;
    
    // Create promises for parallel pagination
    const pagePromises: Promise<PullRequestItem[]>[] = [];
    
    // First, get the first page to estimate total pages
    const firstResp = await fetch(
      `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/pulls?state=closed&per_page=100&page=1`,
      { headers }
    );
    
    if (!firstResp.ok) {
      console.warn(`Failed to fetch PRs for ${repoName}: ${firstResp.status} ${firstResp.statusText}`);
      return [];
    }
    
    const firstPRs: PullRequestItem[] = await firstResp.json();
    if (!Array.isArray(firstPRs) || firstPRs.length === 0) return [];
    
    const firstPageMerged = firstPRs.filter((pr) => Boolean(pr.merged_at));
    mergedPRs.push(...firstPageMerged);
    
    // If we got less than 100, that's all there is
    if (firstPRs.length < 100) return mergedPRs;
    
    // Estimate remaining pages (with a reasonable limit)
    const maxPages = Math.min(MAX_PAGES_PER_REPO, 10); // Conservative estimate
    
    // Create parallel requests for remaining pages
    for (let i = 2; i <= maxPages; i++) {
      pagePromises.push(
        fetch(
          `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/pulls?state=closed&per_page=100&page=${i}`,
          { headers }
        )
        .then(async (resp) => {
          if (!resp.ok) return [];
          const prs: PullRequestItem[] = await resp.json();
          if (!Array.isArray(prs)) return [];
          return prs.filter((pr) => Boolean(pr.merged_at));
        })
        .catch(() => [])
      );
    }
    
    // Wait for all pages in parallel
    const remainingPages = await Promise.all(pagePromises);
    remainingPages.forEach(pagePRs => {
      if (pagePRs.length > 0) mergedPRs.push(...pagePRs);
    });
    
    return mergedPRs;
  }, []);

  // Concurrent processing function with controlled concurrency
  const processBatch = useCallback(async (
    repos: any[],
    headers: Record<string, string>
  ): Promise<{ contributorMap: Map<string, Contributor>; totalMergedPRs: number }> => {
    const contributorMap = new Map<string, Contributor>();
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
      results.forEach(({ mergedPRs }) => {
        totalMergedPRs += mergedPRs.length;
        
        mergedPRs.forEach((pr) => {
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
        });
      });
    }

    return { contributorMap, totalMergedPRs };
  }, [fetchMergedPRsForRepo]);

  const fetchAllStats = useCallback(async (signal: AbortSignal) => {
    setLoading(true);
    setError(null);
    
    // Check cache first
    const now = Date.now();
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      // console.log('Using cached leaderboard data');
      setContributors(cache.data.contributors);
      setStats(cache.data.stats);
      setLoading(false);
      return;
    }
    
    if (!token) {
        setError("GitHub token not found. Please set customFields.gitToken in docusaurus.config.js.");
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
          fetchAllOrgRepos(headers)
        ]);
        
        // Set org stats immediately
        setGithubStarCount(orgStats.totalStars);
        setGithubContributorsCount(orgStats.totalContributors);
        setGithubForksCount(orgStats.totalForks);
        setGithubReposCount(orgStats.publicRepositories);
        setGithubDiscussionsCount(orgStats.discussionsCount);
        setLastUpdated(new Date(orgStats.lastUpdated));

        // Process leaderboard data with concurrent processing
        const { contributorMap, totalMergedPRs } = await processBatch(repos, headers);

        const sortedContributors = Array.from(contributorMap.values()).sort(
          (a, b) => b.points - a.points || b.prs - a.prs
        );
        
        const statsData = {
          flooredTotalPRs: totalMergedPRs,
          totalContributors: sortedContributors.length,
          flooredTotalPoints: sortedContributors.reduce((sum, c) => sum + c.points, 0),
        };
        
        setContributors(sortedContributors);
        setStats(statsData);
        
        // Cache the results
        setCache({
          data: { contributors: sortedContributors, stats: statsData },
          timestamp: now
        });

      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error("Error fetching GitHub organization stats:", err);
          setError(err instanceof Error ? err.message : 'Failed to fetch GitHub stats');
          
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
  }, [token, fetchAllOrgRepos, processBatch, cache]);

  const clearCache = useCallback(() => {
    githubService.clearCache();
    setCache({ data: null, timestamp: 0 }); // Clear local cache too
    const abortController = new AbortController();
    fetchAllStats(abortController.signal);// Refetch data after clearing cache
  }, [fetchAllStats]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchAllStats(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchAllStats]);

  const githubStarCountText = useMemo(() => convertStatToText(githubStarCount), [githubStarCount]);
  const githubContributorsCountText = useMemo(() => convertStatToText(githubContributorsCount), [githubContributorsCount]);
  const githubForksCountText = useMemo(() => convertStatToText(githubForksCount), [githubForksCount]);
  const githubReposCountText = useMemo(() => convertStatToText(githubReposCount), [githubReposCount]);
  const githubDiscussionsCountText = useMemo(() => convertStatToText(githubDiscussionsCount), [githubDiscussionsCount]);

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
    throw new Error("useCommunityStatsContext must be used within a CommunityStatsProvider");
  }
  return context;
};

export const convertStatToText = (num: number): string => {
  const hasIntlSupport =
    typeof Intl === "object" && Intl && typeof Intl.NumberFormat === "function"; 

  if (!hasIntlSupport) {
    return `${(num / 1000).toFixed(1)}k`; // Fallback for environments without Intl support
  }

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact", 
    compactDisplay: "short",
    maximumSignificantDigits: 3, // More precise formatting
  });
  return formatter.format(num);
};