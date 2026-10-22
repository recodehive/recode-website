// Reads the public star and fork counts of the repo at build time, for the first-time setup guide.
// The token (when set) is only sent to api.github.com and never reaches the browser.
// If GitHub cannot be reached the counts are null and the guide hides them.
const REPO_API = 'https://api.github.com/repos/recodehive/recode-website';

module.exports = function repoStatsPlugin() {
  return {
    name: 'repo-stats',
    async loadContent() {
      try {
        const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'recodehive-build' };
        if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        const res = await fetch(REPO_API, { headers, signal: AbortSignal.timeout(15000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        return {
          stars: Number.isInteger(json.stargazers_count) ? json.stargazers_count : null,
          forks: Number.isInteger(json.forks_count) ? json.forks_count : null,
        };
      } catch (err) {
        console.warn('[repo-stats] counts unavailable:', String(err.message || err).slice(0, 120));
        return { stars: null, forks: null };
      }
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
