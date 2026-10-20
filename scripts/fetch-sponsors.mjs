// Pulls the public GitHub sponsors of sanjay-kv and the people sanjay-kv sponsors, and writes
// src/data/sponsors.generated.json. Read only. Runs before builds, never on a page view.
// Without GITHUB_TOKEN (or DOCUSAURUS_GIT_TOKEN), or if the call fails, the existing file is kept
// and the build carries on.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../src/data/sponsors.generated.json', import.meta.url));
const LOGIN = 'sanjay-kv';

const QUERY = `
query($login: String!) {
  user(login: $login) {
    sponsorshipsAsMaintainer(first: 100, includePrivate: false, activeOnly: false) {
      totalCount
      nodes { sponsorEntity { ... on User { login name } ... on Organization { login name } } }
    }
    sponsoring(first: 100) {
      totalCount
      nodes { ... on User { login name } ... on Organization { login name } }
    }
  }
}`;

const token = process.env.GITHUB_TOKEN || process.env.DOCUSAURUS_GIT_TOKEN;
if (!token || /^your/i.test(token.trim())) {
  console.log('[fetch-sponsors] no token, keeping the existing sponsors.generated.json');
  process.exit(0);
}

try {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token.trim()}`, 'Content-Type': 'application/json', 'User-Agent': 'recode-hive-site' },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
    signal: AbortSignal.timeout(20000),
  });
  const json = await res.json();
  const user = json?.data?.user;
  if (!res.ok || !user) throw new Error(JSON.stringify(json?.errors ?? res.status).slice(0, 200));

  const pick = (n) => (n && n.login ? { login: n.login, name: n.name || n.login } : null);
  const next = {
    fetchedAt: new Date().toISOString(),
    sponsors: user.sponsorshipsAsMaintainer.nodes.map((n) => pick(n.sponsorEntity)).filter(Boolean),
    sponsoring: user.sponsoring.nodes.map(pick).filter(Boolean),
  };
  const prev = (() => { try { return JSON.parse(readFileSync(OUT, 'utf8')); } catch { return null; } })();
  // Keep the file stable when nothing but the timestamp changed.
  if (prev && JSON.stringify(prev.sponsors) === JSON.stringify(next.sponsors) && JSON.stringify(prev.sponsoring) === JSON.stringify(next.sponsoring)) {
    console.log('[fetch-sponsors] no changes');
  } else {
    writeFileSync(OUT, JSON.stringify(next, null, 2) + '\n');
    console.log(`[fetch-sponsors] wrote ${next.sponsors.length} sponsors and ${next.sponsoring.length} sponsored`);
  }
} catch (err) {
  console.warn('[fetch-sponsors] failed, keeping the existing file:', String(err.message || err));
}
