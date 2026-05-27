require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");

const app = express();
const PORT = 3001;

// Allow frontend to talk to this backend
app.use(cors());
app.use(express.json());

// ============================
// CONFIGURATION
// ============================
const GITHUB_ORG = "recodehive";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

// Users to exclude from leaderboard
const EXCLUDED_USERS = [
  "sanjay-kv",
  "allcontributors",
  "allcontributors[bot]",
  "dependabot[bot]",
  "copilot",
  "copilot[bot]",
  "github-actions[bot]",
  "renovate[bot]",
  "dependabot-preview[bot]",
];

// ============================
// CACHE (stored in memory)
// ============================
// Think of this like a notepad where we write down
// the leaderboard data so we don't have to call
// GitHub API every single time
let cachedData = {
  contributors: [],
  stats: {
    totalContributors: 0,
    flooredTotalPRs: 0,
    flooredTotalPoints: 0,
  },
  lastUpdated: null,
};

// ============================
// POINTS CALCULATION
// ============================
// Each PR label gives different points
function calculatePointsForPR(labels) {
  if (!labels || labels.length === 0) return 0;

  const labelNames = labels.map((l) => l.name.toLowerCase());

  // Must have "recode" label to get any points
  if (!labelNames.includes("recode")) return 0;

  // Points based on difficulty level
  if (labelNames.includes("level 3")) return 50;
  if (labelNames.includes("level 2")) return 30;
  if (labelNames.includes("level 1")) return 10;

  return 0;
}

// ============================
// FETCH ALL REPOS IN THE ORG
// ============================
async function fetchAllRepos(headers) {
  console.log("📦 Fetching all repos...");
  const repos = [];
  let page = 1;

  while (true) {
    const response = await axios.get(
      `https://api.github.com/orgs/${GITHUB_ORG}/repos`,
      {
        headers,
        params: { type: "public", per_page: 100, page },
      }
    );

    repos.push(...response.data);

    // If we got less than 100, there are no more pages
    if (response.data.length < 100) break;
    page++;
  }

  console.log(`✅ Found ${repos.length} repos`);
  return repos;
}

// ============================
// FETCH MERGED PRs FOR A REPO
// ============================
async function fetchMergedPRs(repoName, headers) {
  const mergedPRs = [];

  try {
    // Get first page
    const firstResponse = await axios.get(
      `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/pulls`,
      {
        headers,
        params: { state: "closed", per_page: 100, page: 1 },
      }
    );

    const firstPage = firstResponse.data;
    if (!firstPage || firstPage.length === 0) return [];

    // Only keep merged PRs (closed PRs include both merged and rejected)
    mergedPRs.push(...firstPage.filter((pr) => pr.merged_at));

    // If only 1 page exists, return early
    if (firstPage.length < 100) return mergedPRs;

    // Get remaining pages (up to page 10 max)
    const pagePromises = [];
    for (let i = 2; i <= 10; i++) {
      pagePromises.push(
        axios
          .get(
            `https://api.github.com/repos/${GITHUB_ORG}/${repoName}/pulls`,
            {
              headers,
              params: { state: "closed", per_page: 100, page: i },
            }
          )
          .then((res) => res.data.filter((pr) => pr.merged_at))
          .catch(() => [])
      );
    }

    const remainingPages = await Promise.all(pagePromises);
    remainingPages.forEach((page) => mergedPRs.push(...page));
  } catch (error) {
    console.warn(`⚠️ Skipping repo ${repoName}:`, error.message);
  }

  return mergedPRs;
}

// ============================
// MAIN FUNCTION: BUILD LEADERBOARD
// ============================
async function buildLeaderboard() {
  console.log("🚀 Starting leaderboard build...");

  if (!GITHUB_TOKEN) {
    console.error("❌ No GitHub token found!");
    return;
  }

  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };

  try {
    // Step 1: Get all repos
    const repos = await fetchAllRepos(headers);

    // Step 2: For each repo, get merged PRs
    // We do this in batches of 15 to not overwhelm GitHub API
    const contributorMap = new Map();
    let totalMergedPRs = 0;
    const BATCH_SIZE = 15;

    for (let i = 0; i < repos.length; i += BATCH_SIZE) {
      const batch = repos.slice(i, i + BATCH_SIZE);

      const batchResults = await Promise.all(
        batch.map(async (repo) => {
          if (repo.archived) return { prs: [], repoName: repo.name };
          const prs = await fetchMergedPRs(repo.name, headers);
          return { prs, repoName: repo.name };
        })
      );

      // Step 3: Process each PR and build contributor data
      batchResults.forEach(({ prs, repoName }) => {
        prs.forEach((pr) => {
          const points = calculatePointsForPR(pr.labels);

          // Skip PRs with no points
          if (points === 0) return;

          const username = pr.user.login;

          // Skip excluded users
          if (
            EXCLUDED_USERS.some(
              (u) => u.toLowerCase() === username.toLowerCase()
            )
          )
            return;

          totalMergedPRs++;

          // Create contributor entry if first time seeing them
          if (!contributorMap.has(username)) {
            contributorMap.set(username, {
              username,
              avatar: pr.user.avatar_url,
              profile: pr.user.html_url,
              points: 0,
              prs: 0,
              prdetails: [],
            });
          }

          // Add this PR to the contributor
          const contributor = contributorMap.get(username);
          contributor.points += points;
          contributor.prs += 1;
          contributor.prdetails.push({
            title: pr.title,
            url: pr.html_url,
            mergedAt: pr.merged_at,
            repoName,
            number: pr.number,
            points,
          });
        });
      });

      console.log(
        `⏳ Processed batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(repos.length / BATCH_SIZE)}`
      );
    }

    // Step 4: Sort by points then PRs
    const contributors = Array.from(contributorMap.values()).sort(
      (a, b) => b.points - a.points || b.prs - a.prs
    );

    // Step 5: Save to cache
    cachedData = {
      contributors,
      stats: {
        totalContributors: contributors.length,
        flooredTotalPRs: totalMergedPRs,
        flooredTotalPoints: contributors.reduce((s, c) => s + c.points, 0),
      },
      lastUpdated: new Date().toISOString(),
    };

    console.log(
      `✅ Leaderboard built! ${contributors.length} contributors found`
    );
  } catch (error) {
    console.error("❌ Error building leaderboard:", error.message);
  }
}

// ============================
// API ROUTES
// ============================

// Route 1: Get full leaderboard data
// Frontend will call: GET http://localhost:3001/api/leaderboard
app.get("/api/leaderboard", (req, res) => {
  res.json(cachedData);
});

// Route 2: Health check - just to confirm server is running
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    lastUpdated: cachedData.lastUpdated,
  });
});

// ============================
// AUTO REFRESH EVERY 2 HOURS
// ============================
// This runs automatically every 2 hours
// Think of it like an alarm clock that
// wakes up the server to refresh the data
cron.schedule("0 */2 * * *", () => {
  console.log("⏰ 2 hour refresh triggered...");
  buildLeaderboard();
});

// ============================
// START SERVER
// ============================
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
  console.log(`📊 Leaderboard API: http://localhost:${PORT}/api/leaderboard`);

  // Build leaderboard immediately when server starts
  buildLeaderboard();
});