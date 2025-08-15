// GitHub API service for fetching organization metrics
// Uses localStorage for caching to reduce API calls

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
  private readonly ORG_NAME = 'recodehive';
  private readonly CACHE_KEY = 'github_org_stats';
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
  private readonly BASE_URL = 'https://api.github.com';

  // Get headers for GitHub API requests
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    };

    // Add GitHub token if available in environment
    // Note: In production, you might want to use a server-side proxy to avoid exposing tokens
    if (typeof window !== 'undefined' && (window as any).GITHUB_TOKEN) {
      headers['Authorization'] = `token ${(window as any).GITHUB_TOKEN}`;
    }

    return headers;
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
          console.warn('GitHub API rate limit exceeded');
          throw new Error('GitHub API rate limit exceeded');
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    throw new Error('Failed after retries');
  }

  // Get cached data if valid
  private getCachedData(): GitHubOrgStats | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const data = JSON.parse(cached) as GitHubOrgStats;
      const now = Date.now();
      
      if (now - data.lastUpdated < this.CACHE_DURATION) {
        return data;
      }
    } catch (error) {
      console.warn('Error reading GitHub stats cache:', error);
      // Clear invalid cache
      localStorage.removeItem(this.CACHE_KEY);
    }
    
    return null;
  }

  // Cache data to localStorage
  private setCachedData(data: GitHubOrgStats): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify({
        ...data,
        lastUpdated: Date.now()
      }));
    } catch (error) {
      console.warn('Error caching GitHub stats:', error);
    }
  }

  // Fetch organization basic info
  private async fetchOrganizationInfo(signal?: AbortSignal): Promise<GitHubOrganization> {
    const response = await fetch(`${this.BASE_URL}/orgs/${this.ORG_NAME}`, {
      headers: this.getHeaders(),
      signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch organization info: ${response.status}`);
    }

    return response.json();
  }

  // Fetch all public repositories for the organization
  private async fetchAllRepositories(signal?: AbortSignal): Promise<GitHubRepository[]> {
    const repositories: GitHubRepository[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const response = await fetch(
        `${this.BASE_URL}/orgs/${this.ORG_NAME}/repos?type=public&per_page=${perPage}&page=${page}&sort=updated`,
        {
          headers: this.getHeaders(),
          signal,
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          console.warn('GitHub API rate limit exceeded while fetching repositories');
          throw new Error('GitHub API rate limit exceeded');
        }
        throw new Error(`Failed to fetch repositories: ${response.status}`);
      }

      const repos: GitHubRepository[] = await response.json();
      
      if (repos.length === 0) break;
      
      repositories.push(...repos);
      
      if (repos.length < perPage) break;
      
      page++;
    }

    return repositories;
  }

  // Estimate contributors count (GitHub API doesn't provide org-wide contributor count)
  private async estimateContributors(repositories: GitHubRepository[], signal?: AbortSignal): Promise<number> {
    // For performance, we'll sample top repositories by stars/activity
    const topRepos = repositories
      .filter(repo => !repo.archived && repo.stargazers_count > 0)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 10); // Sample top 10 repositories

    let totalContributors = 0;

    // Use parallel requests for better performance
    const contributorPromises = topRepos.map(async (repo) => {
      try {
        const response = await fetch(
          `${this.BASE_URL}/repos/${repo.full_name}/contributors?per_page=1`,
          {
            headers: this.getHeaders(),
            signal,
          }
        );

        if (response.ok) {
          // Get total count from Link header if available
          const linkHeader = response.headers.get('Link');
          if (linkHeader) {
            const match = linkHeader.match(/page=(\d+)>; rel="last"/);
            if (match) {
              return parseInt(match[1]);
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
    
    // Apply estimation factor for unique contributors across repos
    totalContributors = Math.round(sumContributors * 0.7); // Assume 30% overlap
    
    // Ensure minimum reasonable number
    return Math.max(totalContributors, 140);
  }

  // Get discussions count (approximate using search)
  private async getDiscussionsCount(signal?: AbortSignal): Promise<number> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/search/issues?q=repo:${this.ORG_NAME}/Support+type:issue`,
        {
          headers: this.getHeaders(),
          signal,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.total_count || 0;
      }
    } catch (error) {
      console.warn('Error fetching discussions count:', error);
    }
    
    return 0;
  }

  // Main method to fetch all organization statistics
  async fetchOrganizationStats(signal?: AbortSignal): Promise<GitHubOrgStats> {
    // Try to get cached data first
    const cached = this.getCachedData();
    if (cached) {
      return cached;
    }

    try {
      // Fetch organization info and repositories in parallel
      const [orgInfo, repositories] = await Promise.all([
        this.fetchOrganizationInfo(signal),
        this.fetchAllRepositories(signal),
      ]);

      // Filter out archived repositories for active stats
      const activeRepos = repositories.filter(repo => !repo.archived);

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

      // Cache the results
      this.setCachedData(stats);

      return stats;
    } catch (error) {
      console.error('Error fetching GitHub organization stats:', error);
      
      // Return fallback data if API fails
      const fallbackStats: GitHubOrgStats = {
        totalStars: 0,
        totalForks: 0,
        totalRepositories: 0,
        publicRepositories: 0,
        totalContributors: 140,
        discussionsCount: 0,
        lastUpdated: Date.now(),
      };

      return fallbackStats;
    }
  }

  // Clear cache (useful for manual refresh)
  clearCache(): void {
    if (typeof window !== 'undefined') {
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
      name: 'recode-website', // Main repository for discussions
      first: limit
    };

    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`GraphQL request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.errors) {
        console.error('GraphQL errors:', data.errors);
        throw new Error('GraphQL query failed');
      }

      const discussions = data.data?.repository?.discussions?.nodes || [];
      
      return discussions.map((discussion: any): GitHubDiscussion => ({
        id: discussion.id,
        title: discussion.title,
        body: discussion.body || '',
        author: {
          login: discussion.author?.login || 'Unknown',
          avatar_url: discussion.author?.avatarUrl || '',
          html_url: discussion.author?.url || '',
        },
        category: {
          name: discussion.category?.name || 'General',
          emoji: discussion.category?.emoji || '💬',
        },
        created_at: discussion.createdAt,
        updated_at: discussion.updatedAt,
        comments: discussion.comments?.totalCount || 0,
        reactions: {
          total_count: discussion.reactions?.totalCount || 0,
        },
        html_url: discussion.url,
        labels: discussion.labels?.nodes?.map((label: any) => ({
          name: label.name,
          color: label.color,
        })) || [],
      }));
    } catch (error) {
      console.error('Error fetching discussions:', error);
      
      // Return mock data for development/fallback
      return this.getMockDiscussions();
    }
  }

  // Mock discussions for development/fallback
  private getMockDiscussions(): GitHubDiscussion[] {
    return [
      {
        id: '1',
        title: 'Welcome to RecodeHive Discussions!',
        body: 'This is where we discuss ideas, share knowledge, and help each other grow. Feel free to ask questions, share your projects, or just say hello!',
        author: {
          login: 'recodehive',
          avatar_url: 'https://avatars.githubusercontent.com/u/your-org-id?v=4',
          html_url: 'https://github.com/recodehive',
        },
        category: {
          name: 'Announcements',
          emoji: '📢',
        },
        created_at: new Date(Date.now() - 86400000).toISOString(),
        updated_at: new Date(Date.now() - 3600000).toISOString(),
        comments: 12,
        reactions: {
          total_count: 25,
        },
        html_url: 'https://github.com/recodehive/recode-website/discussions',
        labels: [
          { name: 'welcome', color: '0075ca' },
          { name: 'community', color: '7057ff' },
        ],
      },
      {
        id: '2',
        title: 'How to contribute to open source projects?',
        body: 'I\'m new to open source and would love to learn how to make my first contribution. Any tips or resources would be greatly appreciated!',
        author: {
          login: 'newcontributor',
          avatar_url: 'https://avatars.githubusercontent.com/u/example?v=4',
          html_url: 'https://github.com/newcontributor',
        },
        category: {
          name: 'Q&A',
          emoji: '❓',
        },
        created_at: new Date(Date.now() - 172800000).toISOString(),
        updated_at: new Date(Date.now() - 7200000).toISOString(),
        comments: 8,
        reactions: {
          total_count: 15,
        },
        html_url: 'https://github.com/recodehive/recode-website/discussions',
        labels: [
          { name: 'question', color: 'd876e3' },
          { name: 'beginner', color: '0e8a16' },
        ],
      },
      {
        id: '3',
        title: 'Feature Request: Dark Mode for Documentation',
        body: 'It would be great to have a dark mode option for the documentation pages. This would be easier on the eyes during late-night coding sessions.',
        author: {
          login: 'darkmode-lover',
          avatar_url: 'https://avatars.githubusercontent.com/u/example2?v=4',
          html_url: 'https://github.com/darkmode-lover',
        },
        category: {
          name: 'Ideas',
          emoji: '💡',
        },
        created_at: new Date(Date.now() - 259200000).toISOString(),
        updated_at: new Date(Date.now() - 10800000).toISOString(),
        comments: 5,
        reactions: {
          total_count: 22,
        },
        html_url: 'https://github.com/recodehive/recode-website/discussions',
        labels: [
          { name: 'enhancement', color: 'a2eeef' },
          { name: 'ui/ux', color: 'f9d0c4' },
        ],
      },
    ];
  }
}

export const githubService = new GitHubService();
