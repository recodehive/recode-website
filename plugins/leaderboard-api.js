/**
 * Docusaurus Plugin to serve the Leaderboard API during development
 */
module.exports = function leaderboardApiPlugin(context, options) {
  return {
    name: 'leaderboard-api-plugin',
    configureWebpack(config, isServer, utils) {
      // Only run this on the dev server
      if (isServer) return {};

      return {
        devServer: {
          setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
              throw new Error('webpack-dev-server is not defined');
            }

            // Handler for /api/leaderboard
            devServer.app.get('/api/leaderboard', async (req, res) => {
              const GITHUB_ORG = "recodehive";
              const token = process.env.GITHUB_TOKEN || process.env.DOCUSAURUS_GIT_TOKEN;

              if (!token) {
                console.error("Leaderboard API Error: GitHub token missing in .env");
                return res.status(500).json({ 
                  success: false, 
                  error: "GitHub token missing. Please add DOCUSAURUS_GIT_TOKEN to your .env file." 
                });
              }

              try {
                // Fetching logic using global fetch (Node 18+)
                const query = `
                  query($queryStr: String!) {
                    search(query: $queryStr, type: ISSUE, first: 100) {
                      nodes {
                        ... on PullRequest {
                          title
                          url
                          mergedAt
                          number
                          repository { name }
                          author { login avatarUrl url }
                          labels(first: 10) { nodes { name } }
                        }
                      }
                    }
                  }
                `;
                const queryStr = `org:${GITHUB_ORG} is:pr is:merged label:recode`;

                const response = await fetch('https://api.github.com/graphql', {
                  method: 'POST',
                  headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                  },
                  body: JSON.stringify({ query, variables: { queryStr } })
                });

                const result = await response.json();
                
                if (result.errors) {
                  throw new Error(result.errors[0].message);
                }

                const allPRs = result.data.search.nodes;

                // Points calculation
                const POINTS_MAP = { "level 1": 10, "level 2": 30, "level 3": 50 };
                const contributorMap = new Map();
                
                allPRs.forEach(pr => {
                  if (!pr.author) return;
                  const labels = pr.labels.nodes.map(l => l.name.toLowerCase());
                  
                  // Simple check for any level label
                  let points = 0;
                  for (const [level, val] of Object.entries(POINTS_MAP)) {
                    if (labels.includes(level)) {
                      points = val;
                      break;
                    }
                  }
                  
                  if (points === 0) return;

                  const username = pr.author.login;
                  if (!contributorMap.has(username)) {
                    contributorMap.set(username, {
                      username, 
                      avatar: pr.author.avatarUrl, 
                      profile: pr.author.url,
                      points: 0, 
                      prs: 0, 
                      allPRDetails: []
                    });
                  }
                  const c = contributorMap.get(username);
                  c.points += points;
                  c.prs += 1;
                  c.allPRDetails.push({
                    title: pr.title, 
                    url: pr.url, 
                    mergedAt: pr.mergedAt,
                    repoName: pr.repository.name, 
                    number: pr.number, 
                    points
                  });
                });

                // Org stats query
                const orgQuery = `
                  query($login: String!) {
                    organization(login: $login) {
                      repositories(first: 100, privacy: PUBLIC, isFork: false) {
                        totalCount
                        nodes { stargazerCount forkCount }
                      }
                    }
                  }
                `;
                const orgResp = await fetch('https://api.github.com/graphql', {
                  method: 'POST',
                  headers: { 
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json' 
                  },
                  body: JSON.stringify({ query: orgQuery, variables: { login: GITHUB_ORG } })
                });
                const orgResult = await orgResp.json();
                const orgData = orgResult.data.organization;
                
                let totalStars = 0, totalForks = 0;
                orgData.repositories.nodes.forEach(r => {
                  totalStars += r.stargazerCount;
                  totalForks += r.forkCount;
                });

                res.json({
                  success: true,
                  contributors: Array.from(contributorMap.values()).sort((a, b) => b.points - a.points),
                  stats: { 
                    totalContributors: contributorMap.size, 
                    flooredTotalPRs: allPRs.length,
                    flooredTotalPoints: Array.from(contributorMap.values()).reduce((s, c) => s + c.points, 0)
                  },
                  orgStats: { 
                    totalStars, 
                    totalForks, 
                    publicRepositories: orgData.repositories.totalCount, 
                    totalContributors: contributorMap.size, 
                    discussionsCount: 0 
                  },
                  updatedAt: new Date().toISOString()
                });
              } catch (error) {
                console.error("Leaderboard API internal error:", error);
                res.status(500).json({ success: false, error: error.message });
              }
            });

            return middlewares;
          },
        },
      };
    },
  };
};
