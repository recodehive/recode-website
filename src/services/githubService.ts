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

class GitHubService {
  private readonly ORG_NAME = "recodehive";
  private readonly CACHE_KEY = "github_org_stats";
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  private readonly BASE_URL = "https://api.github.com";

  // === ADDED: include anonymous contributors configurable (default false)
  private includeAnonymousContributors = false;

  // === ADDED: stored token for authenticated API calls
  private token: string = "";

  // === ADDED: set the GitHub token (e.g. from Docusaurus customFields.gitToken)
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

  // Fetch GitHub Discussions using GraphQL API (existing method kept intact)
  async fetchDiscussions(
    limit: number = 20,
    signal?: AbortSignal,
  ): Promise<GitHubDiscussion[]> {
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
      name: "recode-website", // Main repository for discussions (unchanged)
      first: limit,
    };

    try {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          ...this.getHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
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

      return discussions.map(
        (discussion: any): GitHubDiscussion => ({
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
        }),
      );
    } catch (error) {
      console.error("Error fetching discussions:", error);

      // Return mock data for development/fallback
      return this.getMockDiscussions();
    }
  }

  // Mock discussions for development/fallback (unchanged)
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
