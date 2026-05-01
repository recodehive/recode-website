import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_ORG = "recodehive";
const POINTS_PER_LEVEL: Record<string, number> = {
  "level 1": 10,
  "level 2": 30,
  "level 3": 50,
  "level1": 10,
  "level2": 30,
  "level3": 50
};

// Interfaces for our data structures
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

interface LeaderboardStats {
  totalContributors: number;
  flooredTotalPRs: number;
  flooredTotalPoints: number;
}

interface OrgStats {
  totalStars: number;
  totalForks: number;
  publicRepositories: number;
  totalContributors: number; // This will be the number of people who have merged PRs
  discussionsCount: number;
}

interface LeaderboardResponse {
  success: boolean;
  contributors: Contributor[];
  stats: LeaderboardStats;
  orgStats: OrgStats;
  updatedAt: string;
  error?: string;
}

// In-memory cache for serverless function
let cachedData: LeaderboardResponse | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Calculates points for a PR based on its labels
 */
function calculatePoints(labels: { name: string }[]): number {
  let points = 0;
  const labelNames = labels.map(l => l.name.toLowerCase());

  if (!labelNames.includes('recode')) return 0;

  for (const [level, value] of Object.entries(POINTS_PER_LEVEL)) {
    if (labelNames.includes(level)) {
      points = value;
      break;
    }
  }
  return points;
}

/**
 * Main handler for Vercel Serverless Function
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = process.env.GITHUB_TOKEN || process.env.DOCUSAURUS_GIT_TOKEN;
  if (!token) {
    return res.status(500).json({
      success: false,
      error: "GitHub token not configured"
    } as LeaderboardResponse);
  }

  // Check cache
  const now = Date.now();
  if (cachedData && (now - lastFetchTime < CACHE_DURATION)) {
    return res.status(200).json(cachedData);
  }

  try {
    let allPRs: any[] = [];
    let hasNextPage = true;
    let cursor: string | null = null;

    // 1. Fetch Leaderboard PRs
    const prQuery = `
      query($queryStr: String!, $cursor: String) {
        search(query: $queryStr, type: ISSUE, first: 100, after: $cursor) {
          issueCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ... on PullRequest {
              title
              url
              mergedAt
              number
              repository {
                name
              }
              author {
                login
                avatarUrl
                url
              }
              labels(first: 20) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    `;

    const queryStr = `org:${GITHUB_ORG} is:pr is:merged label:recode`;

    while (hasNextPage) {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: prQuery,
          variables: { queryStr, cursor }
        })
      });

      const result: any = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const searchData = result.data.search;
      allPRs.push(...searchData.nodes);

      hasNextPage = searchData.pageInfo.hasNextPage;
      cursor = searchData.pageInfo.endCursor;
      if (allPRs.length > 5000) break;
    }

    // 2. Fetch Org Stats
    const orgQuery = `
      query($login: String!) {
        organization(login: $login) {
          repositories(first: 100, privacy: PUBLIC, isFork: false) {
            totalCount
            nodes {
              stargazerCount
              forkCount
            }
          }
        }
      }
    `;

    const orgResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: orgQuery,
        variables: { login: GITHUB_ORG }
      })
    });

    const orgResult: any = await orgResponse.json();
    if (orgResult.errors) {
      console.warn("Org stats query failed:", orgResult.errors);
    }

    const orgData = orgResult?.data?.organization;
    let totalStars = 0;
    let totalForks = 0;
    let publicRepositories = 0;

    if (orgData) {
      publicRepositories = orgData.repositories.totalCount;
      orgData.repositories.nodes.forEach((repo: any) => {
        totalStars += repo.stargazerCount;
        totalForks += repo.forkCount;
      });
    }

    // 3. Process Leaderboard Data
    const contributorMap = new Map<string, Contributor>();
    let totalPRs = 0;
    let totalPoints = 0;

    allPRs.forEach(pr => {
      if (!pr.author) return;
      const points = calculatePoints(pr.labels.nodes);
      if (points === 0) return;

      totalPRs++;
      totalPoints += points;

      const username = pr.author.login;
      if (!contributorMap.has(username)) {
        contributorMap.set(username, {
          username: username,
          avatar: pr.author.avatarUrl,
          profile: pr.author.url,
          points: 0,
          prs: 0,
          allPRDetails: []
        });
      }

      const contributor = contributorMap.get(username)!;
      contributor.points += points;
      contributor.prs += 1;
      contributor.allPRDetails.push({
        title: pr.title,
        url: pr.url,
        mergedAt: pr.mergedAt,
        repoName: pr.repository.name,
        number: pr.number,
        points: points
      });
    });

    const contributors = Array.from(contributorMap.values())
      .sort((a, b) => b.points - a.points || b.prs - a.prs);

    const finalData: LeaderboardResponse = {
      success: true,
      contributors,
      stats: {
        totalContributors: contributors.length,
        flooredTotalPRs: totalPRs,
        flooredTotalPoints: totalPoints
      },
      orgStats: {
        totalStars,
        totalForks,
        publicRepositories,
        totalContributors: contributors.length,
        discussionsCount: 0 // GraphQL for org-wide discussions is complex, sticking to 0 or fetching repo-specific later if needed
      },
      updatedAt: new Date().toISOString()
    };

    // Update cache
    cachedData = finalData;
    lastFetchTime = now;

    return res.status(200).json(finalData);
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error"
    } as LeaderboardResponse);
  }
}
