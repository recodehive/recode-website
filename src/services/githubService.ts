// GitHub API service for fetching organization metrics
// Uses localStorage for caching to reduce API calls
// Changes: no client-side token read; supports ETag conditional requests and stores ETags in cache meta.

export interface GitHubOrgStats {
  totalStars: number;
  totalForks: number;
  totalRepositories: number;
  totalContributors: number;
  publicRepositories: number;
  discussionsCount: number;
  lastUpdated: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  contributors_url: string;
  archived: boolean;
  private: boolean;
}

export interface GitHubOrganization {
  login: string;
  id: number;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubDiscussion {
  id: string;
  title: string;
  body: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  category: {
    name: string;
    emoji: string;
  };
  created_at: string;
  updated_at: string;
  comments: number;
  reactions: {
    total_count: number;
  };
  html_url: string;
  labels: Array<{
    name: string;
    color: string;
  }>;
}

// Cache meta shape (stores data + etags + lastUpdated)
interface CachedMeta {
  data: GitHubOrgStats;
  etags?: Record<string, string>; // keyed by endpoint URL (base)
  lastUpdated: number;
}

class GitHubService {
  private readonly ORG_NAME = "recodehive";
  private readonly CACHE_KEY = "github_org_stats";
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  private readonly BASE_URL = "https://api.github.com";

  // Optional auth token — provide server-side only (do NOT set on window in production)
  private authToken?: string;

  // Allow passing token at instantiation (server side) or set later via setAuthToken()
  constructor(authToken?: string) {
    this.authToken = authToken;
  }

  // Optional helper to set token at runtime (useful when instantiating server-side)
  // DO NOT call from client-side code in production.
  setAuthToken(token?: string) {
    this.authToken = token;
  }

  // Get headers for GitHub API requests (no client-side window token read)
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    // Attach Authorization only when the token was explicitly provided to the service.
    if (this.authToken) {
      headers["Authorization"] = `token ${this.authToken}`;
    }

    return headers;
  }

  // Fetch with error handling, rate-limit consideration, and optional custom headers/signal
  private async fetchWithRetry(
    url: string,
    options?: {
      retries?: number;
      headers?: Record<string, string>;
      signal?: AbortSignal;
      method?: string;
      body?: any;
    },
  ): Promise<Response> {
    const retries = options?.retries ?? 3;
    for (let i = 0; i < retries; i++) {
      try {
        const mergedHeaders = { ...this.getHeaders(), ...(options?.headers || {}) };

        const response = await fetch(url, {
          method: options?.method ?? "GET",
          headers: mergedHeaders,
          body: options?.body ? JSON.stringify(options.body) : undefined,
          signal: options?.signal,
        });

        if (response.status === 403) {
          console.warn("GitHub API rate limit exceeded");
          throw new Error("GitHub API rate limit exceeded");
        }

        // Do not treat 304 as error here — caller handles 304.
        if (!response.ok && response.status !== 304) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    throw new Error("Failed after retries");
  }

  // ----- Cache helpers (store meta with etags) -----
  private getCachedMeta(): CachedMeta | null {
    if (typeof window === "undefined") return null;
    try {
      const cachedRaw = localStorage.getItem(this.CACHE_KEY);
      if (!cachedRaw) return null;
      const meta = JSON.parse(cachedRaw) as CachedMeta;
      const now = Date.now();
      if (now - meta.lastUpdated < this.CACHE_DURATION) {
        return meta;
      }
      // If stale, remove and return null
      localStorage.removeItem(this.CACHE_KEY);
      return null;
    } catch (error) {
      console.warn("Error reading GitHub stats cache:", error);
      localStorage.removeItem(this.CACHE_KEY);
      return null;
    }
  }

  // Backwards-compatible wrapper returning only the data
  private getCachedData(): GitHubOrgStats | null {
    const meta = this.getCachedMeta();
    return meta ? meta.data : null;
  }

  // Save meta including etags map
  private setCachedData(data: GitHubOrgStats, etags: Record<string, string> = {}): void {
    if (typeof window === "undefined") return;
    try {
      const meta: CachedMeta = {
        data,
        etags,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(meta));
    } catch (error) {
      console.warn("Error caching GitHub stats:", error);
    }
  }

  // ----- API calls -----

  // Fetch organization basic info
  private async fetchOrganizationInfo(signal?: AbortSignal): Promise<GitHubOrganization> {
    const url = `${this.BASE_URL}/orgs/${this.ORG_NAME}`;
    const response = await this.fetchWithRetry(url, { signal });
    if (response.status === 304) {
      // Caller should have handled cached meta — but fallback to throwing so higher-level uses cached data if needed
      throw new Error("Not Modified (304) for organization info — use cached meta");
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch organization info: ${response.status}`);
    }
    return response.json();
  }

  // Fetch all public repositories for the organization
  // Accepts optional etags map (keyed by endpoint base) to perform conditional GETs
  private async fetchAllRepositories(signal?: AbortSignal, etags?: Record<string, string>): Promise<{ repositories: GitHubRepository[]; receivedETag?: string; notModified?: boolean; }> {
    const repositories: GitHubRepository[] = [];
    let page = 1;
    const perPage = 100;

    const reposUrlBase = `${this.BASE_URL}/orgs/${this.ORG_NAME}/repos?type=public&per_page=${perPage}`;
    const etagsMap = etags || {};
    const ifNoneMatchForRepos = etagsMap[reposUrlBase];

    let receivedETag: string | undefined;

    while (true) {
      const url = `${reposUrlBase}&page=${page}&sort=updated`;
      const headers: Record<string, string> = {};
      if (ifNoneMatchForRepos) headers["If-None-Match"] = ifNoneMatchForRepos;

      const response = await this.fetchWithRetry(url, { headers, signal });

      // If server says Not Modified, signal caller to use cached aggregate stats
      if (response.status === 304) {
        return { repositories: [], notModified: true, receivedETag: ifNoneMatchForRepos };
      }

      // Capture ETag (the server may include it)
      const etag = response.headers.get("etag");
      if (etag && !receivedETag) {
        receivedETag = etag;
      }

      if (!response.ok) {
        if (response.status === 403) {
          console.warn("GitHub API rate limit exceeded while fetching repositories");
          throw new Error("GitHub API rate limit exceeded");
        }
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }

      const repos: GitHubRepository[] = await response.json();

      if (repos.length === 0) break;

      repositories.push(...repos);

      if (repos.length < perPage) break;

      page++;
    }

    return { repositories, receivedETag };
  }

  // Estimate contributors count (GitHub API doesn't provide org-wide contributor count)
  private async estimateContributors(
    repositories: GitHubRepository[],
    signal?: AbortSignal,
  ): Promise<number> {
    // For performance, we'll sample top repositories by stars/activity
    const topRepos = repositories
      .filter((repo) => !repo.archived && repo.stargazers_count > 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10); // Sample top 10 repositories

    // If no repos (e.g., we used cached aggregated stats instead), return 0 — caller may fallback to cached value
    if (topRepos.length === 0) return 0;

    // Use parallel requests for better performance — but keep the list small to avoid excessive rate use
    const contributorPromises = topRepos.map(async (repo) => {
      try {
        // Use per_page=1 to leverage Link header for total pages, if present
        const url = `${this.BASE_URL}/repos/${repo.full_name}/contributors?per_page=1&anon=true`;
        const response = await this.fetchWithRetry(url, { signal });

        if (response.ok) {
          // Get total count from Link header if available
          const linkHeader = response.headers.get("Link");
          if (linkHeader) {
            const match = linkHeader.match(/page=(\d+)>; rel="last"/);
            if (match) {
              return parseInt(match[1], 10);
            }
          }

          // Fallback: count actual contributors
          const contributors = await response.json();
          return Array.isArray(contributors) ? contributors.length : 0;
        }
        return 0;
      } catch (error) {
        console.warn(`Error fetching contributors for ${repo.name}:`, error);
        return 0;
      }
    });

    const contributorCounts = await Promise.all(contributorPromises);

    // Estimate total unique contributors (with some overlap factor)
    const sumContributors = contributorCounts.reduce((sum, count) => sum + count, 0);

    // Apply estimation factor for unique contributors across repos (configurable if desired)
    const estimatedUnique = Math.round(sumContributors * 0.7); // assume ~30% overlap

    // No hard-coded floor here — let caller use fallback or cached value if needed
    return estimatedUnique;
  }

  // Get discussions count (approximate using search)
  private async getDiscussionsCount(signal?: AbortSignal): Promise<number> {
    try {
      const url = `${this.BASE_URL}/search/issues?q=org:${this.ORG_NAME}+type:issue`;
      const response = await this.fetchWithRetry(url, { signal });

      if (response.ok) {
        const data = await response.json();
        return data.total_count || 0;
      }
    } catch (error) {
      console.warn("Error fetching discussions count:", error);
    }

    return 0;
  }

  // Main method to fetch all organization statistics
  // If cached meta exists and is still fresh, it returns cached immediately.
  // If cached meta exists but stale, it will try conditional requests using stored ETags.
  async fetchOrganizationStats(signal?: AbortSignal): Promise<GitHubOrgStats> {
    // Try to get cached meta first (includes etags)
    const cachedMeta = this.getCachedMeta();
    if (cachedMeta) {
      // Fresh cached meta — return immediately
      return cachedMeta.data;
    }

    // Try to read stale meta (if any) to attempt conditional GETs
    let staleMeta: CachedMeta | null = null;
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(this.CACHE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as CachedMeta;
          // treat as stale if older than CACHE_DURATION
          if (Date.now() - parsed.lastUpdated >= this.CACHE_DURATION) {
            staleMeta = parsed;
          }
        }
      } catch {
        // ignore parsing errors
      }
    }

    try {
      // Use staleMeta.etags (if any) to make conditional requests
      const etagsToSend = staleMeta?.etags || {};

      // Fetch organization info and repositories in parallel (repos supports conditional GET)
      const orgInfoPromise = this.fetchOrganizationInfo(signal);
      const reposPromise = this.fetchAllRepositories(signal, etagsToSend);

      const [orgInfo, reposResult] = await Promise.allSettled([orgInfoPromise, reposPromise]);

      // If reposResult indicates Not Modified (304), use stale cached aggregated stats if available
      if (reposResult.status === "fulfilled" && reposResult.value.notModified && staleMeta) {
        // Return stale cached aggregated stats — they are expected to be mostly up-to-date
        return staleMeta.data;
      }

      // If repos fetch failed, but we have stale meta, return stale aggregated stats as fallback
      if (reposResult.status === "rejected") {
        if (staleMeta) return staleMeta.data;
        throw reposResult.reason;
      }

      // If organization info failed but we have stale meta, return stale aggregated stats as fallback
      if (orgInfo.status === "rejected") {
        if (staleMeta) return staleMeta.data;
        throw orgInfo.reason;
      }

      // Collect repositories
      const repositories = reposResult.status === "fulfilled" ? reposResult.value.repositories : [];

      // If repositories empty and we had no real response (and no stale meta), proceed but totals will be zero
      const activeRepos = repositories.filter((repo) => !repo.archived);

      // Calculate totals
      const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);

      // Estimate contributors and get discussions count
      const [totalContributors, discussionsCount] = await Promise.all([
        this.estimateContributors(activeRepos, signal),
        this.getDiscussionsCount(signal),
      ]);

      const stats: GitHubOrgStats = {
        totalStars,
        totalForks,
        totalRepositories: repositories.length,
        publicRepositories: activeRepos.length,
        totalContributors,
        discussionsCount,
        lastUpdated: Date.now(),
      };

      // Persist returned ETag(s) for repo list if present
      const etagsToSave: Record<string, string> = { ...(staleMeta?.etags || {}) };

      // reposResult may include receivedETag
      if (reposResult.status === "fulfilled" && reposResult.value.receivedETag) {
        const reposUrlBase = `${this.BASE_URL}/orgs/${this.ORG_NAME}/repos?type=public&per_page=100`;
        etagsToSave[reposUrlBase] = reposResult.value.receivedETag;
      }

      // Save stats + etags in cache
      this.setCachedData(stats, etagsToSave);

      return stats;
    } catch (error) {
      console.error("Error fetching GitHub organization stats:", error);

      // Try returning stale meta if available
      if (staleMeta) {
        return staleMeta.data;
      }

      // Return conservative fallback (no arbitrary floor)
      const fallbackStats: GitHubOrgStats = {
        totalStars: 0,
        totalForks: 0,
        totalRepositories: 0,
        publicRepositories: 0,
        totalContributors: 0,
        discussionsCount: 0,
        lastUpdated: Date.now(),
      };

      return fallbackStats;
    }
  }

  // Clear cache (useful for manual refresh)
  clearCache(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.CACHE_KEY);
    }
  }

  // Get cache status (uses cached meta)
  getCacheStatus(): { cached: boolean; age: number; expiresIn: number } {
    const meta = this.getCachedMeta();
    if (!meta) {
      return { cached: false, age: 0, expiresIn: 0 };
    }

    const age = Date.now() - meta.lastUpdated;
    const expiresIn = Math.max(0, this.CACHE_DURATION - age);

    return { cached: true, age, expiresIn };
  }

  // Fetch GitHub Discussions using GraphQL API
  async fetchDiscussions(limit: number = 20, signal?: AbortSignal): Promise<GitHubDiscussion[]> {
    const query = `
      query GetDiscussions($owner: String!, $name: String!, $first: Int!) {
        repository(owner: $owner, name: $name) {
          discussions(first: $first, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              id
              title
              body
              createdAt
              updatedAt
              url
              author {
                login
                avatarUrl
                url
              }
              category {
                name
                emoji
              }
              comments {
                totalCount
              }
              reactions {
                totalCount
              }
              labels(first: 10) {
                nodes {
                  name
                  color
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      owner: this.ORG_NAME,
      name: "recode-website", // Main repository for discussions
      first: limit,
    };

    try {
      const response = await this.fetchWithRetry("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { query, variables },
        signal,
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        throw new Error("GraphQL query failed");
      }

      const discussions = data.data?.repository?.discussions?.nodes || [];

      return discussions.map((discussion: any): GitHubDiscussion => ({
        id: discussion.id,
        title: discussion.title,
        body: discussion.body || "",
        author: {
          login: discussion.author?.login || "Unknown",
          avatar_url: discussion.author?.avatarUrl || "",
          html_url: discussion.author?.url || "",
        },
        category: {
          name: discussion.category?.name || "General",
          emoji: discussion.category?.emoji || "💬",
        },
        created_at: discussion.createdAt,
        updated_at: discussion.updatedAt,
        comments: discussion.comments?.totalCount || 0,
        reactions: {
          total_count: discussion.reactions?.totalCount || 0,
        },
        html_url: discussion.url,
        labels:
          discussion.labels?.nodes?.map((label: any) => ({
            name: label.name,
            color: label.color,
          })) || [],
      }));
    } catch (error) {
      console.error("Error fetching discussions:", error);
      
      // Return mock data for development/fallback
      return this.getMockDiscussions();
    }
  }

  // Mock discussions for development/fallback
  private getMockDiscussions(): GitHubDiscussion[] {
    return [
      {
        id: "1",
        title: "Welcome to recode hive Discussions!",
        body: "This is where we discuss ideas, share knowledge, and help each other grow. Feel free to ask questions, share your projects, or just say hello!",
        author: {
          login: "recodehive",
          avatar_url: "https://avatars.githubusercontent.com/u/your-org-id?v=4",
          html_url: "https://github.com/recodehive",
        },
        category: {
          name: "Announcements",
          emoji: "📢",
        },
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 3600000).toISOString(),
        comments: 12,
        reactions: {
          total_count: 25,
        },
        html_url: "https://github.com/recodehive/recode-website/discussions",
        labels: [
          { name: "welcome", color: "0075ca" },
          { name: "community", color: "7057ff" },
        ],
      },
      {
        id: "2",
        title: "How to contribute to open source projects?",
        body: "I'm new to open source and would love to learn how to make my first contribution. Any tips or resources would be greatly appreciated!",
        author: {
          login: "newcontributor",
          avatar_url: "https://avatars.githubusercontent.com/u/example?v=4",
          html_url: "https://github.com/newcontributor",
        },
        category: {
          name: "Q&A",
          emoji: "❓",
        },
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 7200000).toISOString(),
        comments: 8,
        reactions: {
          total_count: 15,
        },
        html_url: "https://github.com/recodehive/recode-website/discussions",
        labels: [
          { name: "question", color: "d876e3" },
          { name: "beginner", color: "0e8a16" },
        ],
      },
      {
        id: "3",
        title: "Feature Request: Dark Mode for Documentation",
        body: "It would be great to have a dark mode option for the documentation pages. This would be easier on the eyes during late-night coding sessions.",
        author: {
          login: "darkmode-lover",
          avatar_url: "https://avatars.githubusercontent.com/u/example2?v=4",
          html_url: "https://github.com/darkmode-lover",
        },
        category: {
          name: "Ideas",
          emoji: "💡",
        },
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 10800000).toISOString(),
        comments: 5,
        reactions: {
          total_count: 22,
        },
        html_url: "https://github.com/recodehive/recode-website/discussions",
        labels: [
          { name: "enhancement", color: "a2eeef" },
          { name: "ui/ux", color: "f9d0c4" },
        ],
      },
    ];
  }
}

export const githubService = new GitHubService();
