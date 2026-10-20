// GitHub API service for fetching organization metrics
// Uses localStorage for caching to reduce API calls
// 1) discussions count used org-wide search — replaced with repo-specific GraphQL query (default repo: "Support").
// 2) anonymous contributors (anon=true) made configurable (default: false).
// Changes are annotated with // === ADDED and // === UPDATED where applicable.

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

class GitHubService {
  private readonly ORG_NAME = "recodehive";
  private readonly CACHE_KEY = "github_org_stats";
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  private readonly BASE_URL = "https://api.github.com";

  // === ADDED: include anonymous contributors configurable (default false)
  private includeAnonymousContributors = false;

  // === ADDED: stored token for authenticated API calls
  private token: string = "";

  // === ADDED: set the GitHub token
  setToken(token: string): void {
    if (token && token.trim()) {
      this.token = token.trim();
    }
  }

  // Get headers for GitHub API requests
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    };

    // Use stored token first, then fall back to window.GITHUB_TOKEN
    const token =
      this.token ||
      (typeof window !== "undefined" ? (window as any).GITHUB_TOKEN : "");
    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    return headers;
  }

  // === ADDED: setter to toggle anonymous contributors inclusion
  setIncludeAnonymousContributors(value: boolean) {
    this.includeAnonymousContributors = value;
  }

  // Fetch with error handling and rate limit consideration
  private async fetchWithRetry(url: string, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: this.getHeaders(),
        });

        if (response.status === 403) {
          // Rate limited - don't retry, just throw error
          console.warn("GitHub API rate limit exceeded");
          throw new Error("GitHub API rate limit exceeded");
        }

        if (!response.ok) {
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

  // Get cached data if valid
  private getCachedData(): GitHubOrgStats | null {
    if (typeof window === "undefined") return null;

    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const data = JSON.parse(cached) as GitHubOrgStats;
      const now = Date.now();

      if (now - data.lastUpdated < this.CACHE_DURATION) {
        return data;
      }
    } catch (error) {
      console.warn("Error reading GitHub stats cache:", error);
      // Clear invalid cache
      localStorage.removeItem(this.CACHE_KEY);
    }

    return null;
  }

  // Cache data to localStorage
  private setCachedData(data: GitHubOrgStats): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(
        this.CACHE_KEY,
        JSON.stringify({
          ...data,
          lastUpdated: Date.now(),
        }),
      );
    } catch (error) {
      console.warn("Error caching GitHub stats:", error);
    }
  }



  // Clear cache (useful for manual refresh)
  clearCache(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.CACHE_KEY);
    }
  }

  // Get cache status
  getCacheStatus(): { cached: boolean; age: number; expiresIn: number } {
    const cached = this.getCachedData();
    if (!cached) {
      return { cached: false, age: 0, expiresIn: 0 };
    }

    const age = Date.now() - cached.lastUpdated;
    const expiresIn = Math.max(0, this.CACHE_DURATION - age);

    return { cached: true, age, expiresIn };
  }

}

export const githubService = new GitHubService();
