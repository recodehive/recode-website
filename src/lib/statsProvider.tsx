// src/lib/statsProvider.tsx

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
  }, []);

  const fetchAllStats = useCallback(async (signal: AbortSignal) => {
    setLoading(true);
    setError(null);
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

        // Fetch general organization stats
        const orgStats: GitHubOrgStats = await githubService.fetchOrganizationStats(signal);
        setGithubStarCount(orgStats.totalStars);
        setGithubContributorsCount(orgStats.totalContributors);
        setGithubForksCount(orgStats.totalForks);
        setGithubReposCount(orgStats.publicRepositories);
        setGithubDiscussionsCount(orgStats.discussionsCount);
        setLastUpdated(new Date(orgStats.lastUpdated));

        // Fetch leaderboard data
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
  }, [token, fetchAllOrgRepos, fetchMergedPRsForRepo]);

  const clearCache = useCallback(() => {
    githubService.clearCache();
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
    return `${(num / 1000).toFixed(1)}k`;
  }

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumSignificantDigits: 3,
  });
  return formatter.format(num);
};