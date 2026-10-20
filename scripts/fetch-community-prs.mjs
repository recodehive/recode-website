// Fetches the latest merged pull requests of recodehive/recode-website for the Community page and
// writes src/data/community/prs.generated.json. Runs before builds, never in the browser.
// Without GITHUB_TOKEN (or DOCUSAURUS_GIT_TOKEN), or if the call fails, the existing file is kept.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../src/data/community/prs.generated.json', import.meta.url));
const URL_ = 'https://api.github.com/repos/recodehive/recode-website/pulls?state=closed&sort=updated&direction=desc&per_page=40';

const token = process.env.GITHUB_TOKEN || process.env.DOCUSAURUS_GIT_TOKEN;
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'recode-hive-site' };
if (token && !/^your/i.test(token.trim())) headers.Authorization = `Bearer ${token.trim()}`;

try {
  const res = await fetch(URL_, { headers, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const list = await res.json();
  const prs = list
    .filter((p) => p.merged_at)
    .sort((a, b) => new Date(b.merged_at) - new Date(a.merged_at))
    .slice(0, 5)
    .map((p) => ({ number: p.number, title: p.title, url: p.html_url, author: p.user?.login ?? '', mergedAt: p.merged_at }));
  if (prs.length === 0) throw new Error('no merged pull requests in the response');
  writeFileSync(OUT, JSON.stringify({ fetchedAt: new Date().toISOString(), prs }, null, 2) + '\n');
  console.log(`[fetch-community-prs] wrote ${prs.length} pull requests`);
} catch (err) {
  console.warn('[fetch-community-prs] failed, keeping the existing file:', String(err.message || err));
}
