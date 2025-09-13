const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const ORG_NAME = "recodehive";
let leaderboard = {};

const timer = ms => new Promise(res => setTimeout(res, ms));

async function generateOrgLeaderboard() {
  try {
    let repos = await axios.get(
      `https://api.github.com/orgs/${ORG_NAME}/repos?per_page=100`,
      {
        headers: { Authorization: "token " + process.env.GIT_TOKEN }
      }
    );

    for (let repo of repos.data) {
      let repoFullName = repo.full_name; // recodehive/repoName
      console.log(`Fetching PRs for ${repoFullName}`);

      try {
        let response = await axios.get(
          `https://api.github.com/search/issues?q=repo:${repoFullName}+is:pr+is:merged&per_page=100`,
          { headers: { Authorization: "token " + process.env.GIT_TOKEN } }
        );

        let prs = response.data.items;

        for (let pr of prs) {
          let user = pr.user;

          if (!leaderboard[user.id]) {
            leaderboard[user.id] = {
              avatar_url: user.avatar_url,
              login: user.login,
              url: user.html_url,
              score: 0,
              // postManTag: false, // keep if needed
              pr_urls: []
            };
          }

          if (!leaderboard[user.id].pr_urls.includes(pr.html_url)) {
            leaderboard[user.id].pr_urls.push(pr.html_url);
            leaderboard[user.id].score += 10; // scoring rule (static here)
          }
        }
      } catch (err) {
        console.log(`Error fetching PRs for ${repoFullName}`, err.message);
      }

      // small delay to avoid hitting GitHub rate limits
      await timer(3000);
    }

    // Convert to array, add rank + PR count
    let leaderboardArray = Object.values(leaderboard)
      .map(u => ({
        ...u,
        no_of_prs: u.pr_urls.length
      }))
      .sort((a, b) => b.score - a.score)
      .map((u, i) => ({
        rank: i + 1,
        ...u
      }));

    let json = {
      leaderboard: leaderboardArray,
      success: true,
      updatedAt: +new Date(),
      generated: true,
      updatedTimestring: new Date().toLocaleString()
    };

    fs.writeFileSync("org_leaderboard.json", JSON.stringify(json, null, 2));
    console.log("recodehive leaderboard generated!");
  } catch (error) {
    console.error("Failed to generate leaderboard:", error.message);
  }
}

module.exports.generateOrgLeaderboard = generateOrgLeaderboard;

// if (require.main === module) {
//   generateOrgLeaderboard(); //Added to test the function directly
// }
