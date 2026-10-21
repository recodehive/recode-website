// Public developer profile data from GitHub, fetched on the server so the token never reaches the browser.
//
// GET /functions/v1/profile?handle=<github login>&repos=<repo,repo>   (repos is optional, at most 12)
//
// Returns { fetchedAt, user, calendar, repoLanguages }. The result is cached for 7 days in the
// profile_cache table, so GitHub is called at most once a week per person. When GitHub fails the
// stale copy is served, and only when there is none is an error returned.
//
// Secret (supabase secrets set): GITHUB_TOKEN. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided.
import { createClient } from 'npm:@supabase/supabase-js@2';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const ORG = 'recodehive';
const LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPO_RE = /^[A-Za-z0-9._-]{1,100}$/;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};
const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json', ...extra },
  });

const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false },
});

function gh(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${Deno.env.get('GITHUB_TOKEN')}`,
      'User-Agent': 'recodehive-profile',
      ...(init.headers ?? {}),
    },
  });
}

interface Cached {
  fetchedAt: string;
  user: Record<string, unknown>;
  calendar: { date: string; count: number }[];
  repoLanguages: Record<string, string>;
}

async function fetchFromGithub(handle: string, repos: string[], previous: Cached | null): Promise<Cached> {
  const userRes = await gh(`/users/${handle}`);
  if (userRes.status === 404) throw new Error('not-found');
  if (!userRes.ok) throw new Error(`user ${userRes.status}`);
  const u = await userRes.json();

  const query = `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount } } } } } }`;
  const calRes = await gh('/graphql', { method: 'POST', body: JSON.stringify({ query, variables: { login: handle } }) });
  if (!calRes.ok) throw new Error(`calendar ${calRes.status}`);
  const cal = await calRes.json();
  const weeks = cal?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) throw new Error('calendar missing');
  const calendar = weeks
    .flatMap((w: { contributionDays: { date: string; contributionCount: number }[] }) => w.contributionDays)
    .map((d: { date: string; contributionCount: number }) => ({ date: d.date, count: d.contributionCount }));

  // Languages come from the repos the person merged into. Keep what is already known and add the new ones.
  const repoLanguages: Record<string, string> = { ...(previous?.repoLanguages ?? {}) };
  for (const repo of repos) {
    if (repoLanguages[repo]) continue;
    const r = await gh(`/repos/${ORG}/${repo}`);
    if (r.ok) {
      const lang = (await r.json()).language;
      if (typeof lang === 'string' && lang) repoLanguages[repo] = lang;
    }
  }

  return {
    fetchedAt: new Date().toISOString(),
    user: {
      login: u.login,
      name: u.name ?? null,
      avatarUrl: u.avatar_url,
      bio: u.bio ?? null,
      location: u.location ?? null,
      blog: u.blog || null,
      company: u.company ?? null,
      twitter: u.twitter_username ?? null,
      createdAt: u.created_at,
    },
    calendar,
    repoLanguages,
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'GET') return json({ error: 'method' }, 405);

  const url = new URL(req.url);
  const handle = (url.searchParams.get('handle') ?? '').toLowerCase();
  if (!LOGIN_RE.test(handle)) return json({ error: 'invalid handle' }, 400);
  const repos = (url.searchParams.get('repos') ?? '')
    .split(',')
    .map((r) => r.trim())
    .filter((r) => REPO_RE.test(r))
    .slice(0, 12);

  const { data: row } = await db.from('profile_cache').select('data, fetched_at').eq('handle', handle).maybeSingle();
  const cached = (row?.data as Cached | undefined) ?? null;
  const age = row?.fetched_at ? Date.now() - Date.parse(row.fetched_at) : Infinity;

  // Fresh enough: serve it. GitHub is called at most once a week per person.
  if (cached && age < WEEK_MS) {
    return json(cached, 200, { 'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=86400' });
  }

  try {
    const fresh = await fetchFromGithub(handle, repos, cached);
    await db.from('profile_cache').upsert({ handle, data: fresh, fetched_at: new Date().toISOString() }, { onConflict: 'handle' });
    return json(fresh, 200, { 'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=86400' });
  } catch (err) {
    if (String(err).includes('not-found')) return json({ error: 'not found' }, 404);
    console.error('profile error', String(err));
    // GitHub is unavailable or rate limited: serve the stale copy instead of an error wall.
    if (cached) return json({ ...cached, stale: true }, 200, { 'Cache-Control': 'public, max-age=300' });
    return json({ error: 'unavailable' }, 502);
  }
});
