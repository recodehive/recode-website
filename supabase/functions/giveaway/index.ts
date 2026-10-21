// Giveaway entries, verified against GitHub. The browser never decides a count.
//
// POST /functions/v1/giveaway   headers: x-clerk-token: <Clerk session token>
//                               body:    { "ref": "<referrer github login>" }  (optional)
//
// 1. Verify the Clerk token and read the GitHub login Clerk got from GitHub sign-in.
// 2. Check star, follow and merged PRs with the GitHub API (server token, never sent to the browser).
// 3. Record what was verified in giveaway_entries (service role) and return the totals.
//
// Secrets (supabase secrets set): CLERK_SECRET_KEY, GITHUB_TOKEN.
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided by Supabase.
import { createClient } from 'npm:@supabase/supabase-js@2';
import { createClerkClient, verifyToken } from 'npm:@clerk/backend@1';

// Keep these in step with src/data/giveaway.ts.
const GIVEAWAY_ID = 'halloween-2026';
const STARTS_MS = Date.parse('2026-10-21T00:00:00+11:00');
const ENDS_MS = Date.parse('2026-11-01T23:59:59+11:00');
const ORG = 'recodehive';
const STAR_REPO = 'recodehive/recode-website';
const PR_LABEL = 'recode'; // only merged PRs carrying this label count
const POINTS = { star: 2, follow: 1, pr: 10, referral: 3, bonus: 5 };
const MAX_REFERRALS = 5;
const MIN_ACCOUNT_DAYS = 30; // a referred friend's GitHub account must be at least this old
const MAX_STAR_PAGES = 10;
const THROTTLE_MS = 10_000;

const LOGIN_RE = /^[A-Za-z0-9-]{1,39}$/;
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type, x-clerk-token',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false },
});

async function gh(path: string): Promise<Response> {
  return await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${Deno.env.get('GITHUB_TOKEN')}`,
      'User-Agent': 'recodehive-giveaway',
    },
  });
}

async function hasStarred(login: string): Promise<boolean> {
  for (let page = 1; page <= MAX_STAR_PAGES; page++) {
    const res = await gh(`/users/${login}/starred?per_page=100&page=${page}`);
    if (!res.ok) throw new Error(`stars ${res.status}`);
    const repos = (await res.json()) as { full_name: string }[];
    if (repos.some((r) => r.full_name.toLowerCase() === STAR_REPO)) return true;
    if (repos.length < 100) return false;
  }
  return false;
}

async function follows(login: string): Promise<boolean> {
  const res = await gh(`/users/${login}/following/${ORG}`);
  if (res.status === 204) return true;
  if (res.status === 404) return false;
  throw new Error(`follow ${res.status}`);
}

async function mergedPrs(login: string): Promise<string[]> {
  const iso = (ms: number) => new Date(ms).toISOString().replace(/\.\d{3}Z$/, 'Z');
  const q = `org:${ORG} is:pr is:merged author:${login} label:${PR_LABEL} merged:${iso(STARTS_MS)}..${iso(ENDS_MS)}`;
  const res = await gh(`/search/issues?per_page=100&q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`prs ${res.status}`);
  const body = (await res.json()) as { items: { html_url: string }[] };
  return body.items.map((i) => i.html_url);
}

async function summary(login: string) {
  const { data } = await db
    .from('giveaway_entries')
    .select('kind, entries')
    .eq('giveaway_id', GIVEAWAY_ID)
    .eq('login', login);
  const rows = data ?? [];
  const count = (k: string) => rows.filter((r) => r.kind === k).length;
  return {
    login,
    entries: rows.reduce((n, r) => n + r.entries, 0),
    star: count('star') > 0,
    follow: count('follow') > 0,
    prs: count('pr'),
    referrals: count('referral'),
    bonus: count('bonus') > 0,
  };
}

async function award(login: string, kind: keyof typeof POINTS, ref = '') {
  await db
    .from('giveaway_entries')
    .upsert(
      { giveaway_id: GIVEAWAY_ID, login, kind, ref, entries: POINTS[kind] },
      { onConflict: 'giveaway_id,login,kind,ref', ignoreDuplicates: true },
    );
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  try {
    const secretKey = Deno.env.get('CLERK_SECRET_KEY')!;
    const token = req.headers.get('x-clerk-token') ?? '';
    const claims = await verifyToken(token, { secretKey }).catch(() => null);
    if (!claims?.sub) return json({ error: 'sign-in required' }, 401);

    const clerkUser = await createClerkClient({ secretKey }).users.getUser(claims.sub);
    const account = clerkUser.externalAccounts.find((a) => String(a.provider).includes('github'));
    const login = account?.username?.toLowerCase();
    if (!login || !LOGIN_RE.test(login)) return json({ error: 'github sign-in required' }, 400);

    const now = Date.now();
    const live = now >= STARTS_MS && now <= ENDS_MS;
    const phase = now < STARTS_MS ? 'upcoming' : live ? 'live' : 'closed';
    if (!live) return json({ phase, ...(await summary(login)) });

    const { data: row } = await db
      .from('giveaway_users')
      .select('last_synced_at, referred_by, github_created_at')
      .eq('giveaway_id', GIVEAWAY_ID)
      .eq('login', login)
      .maybeSingle();

    if (row?.last_synced_at && now - Date.parse(row.last_synced_at) < THROTTLE_MS) {
      return json({ phase, ...(await summary(login)) });
    }

    // Remember who referred this person, once, from the link they arrived with.
    const body = (await req.json().catch(() => ({}))) as { ref?: string };
    const ref = typeof body.ref === 'string' && LOGIN_RE.test(body.ref) ? body.ref.toLowerCase() : null;
    const referredBy = row?.referred_by ?? (ref && ref !== login ? ref : null);

    let githubCreatedAt = row?.github_created_at ?? null;
    if (!githubCreatedAt) {
      const u = await gh(`/users/${login}`);
      if (u.ok) githubCreatedAt = ((await u.json()) as { created_at: string }).created_at;
    }

    await db.from('giveaway_users').upsert(
      {
        giveaway_id: GIVEAWAY_ID,
        login,
        clerk_user_id: claims.sub,
        github_created_at: githubCreatedAt,
        referred_by: referredBy,
        last_synced_at: new Date(now).toISOString(),
      },
      { onConflict: 'giveaway_id,login' },
    );

    // Verify with GitHub. A failed check records nothing and is retried on the next sync.
    const [star, follow, prs] = await Promise.all([
      hasStarred(login).catch(() => false),
      follows(login).catch(() => false),
      mergedPrs(login).catch(() => [] as string[]),
    ]);
    if (star) await award(login, 'star');
    if (follow) await award(login, 'follow');
    for (const url of prs) await award(login, 'pr', url);
    if (star && follow) await award(login, 'bonus');

    // Credit the referrer once the friend is real: an old enough account that has finished a verified quest.
    if (referredBy && (star || follow || prs.length > 0)) {
      const ageDays = githubCreatedAt ? (now - Date.parse(githubCreatedAt)) / 86_400_000 : 0;
      const { data: referrer } = await db
        .from('giveaway_users')
        .select('login')
        .eq('giveaway_id', GIVEAWAY_ID)
        .eq('login', referredBy)
        .maybeSingle();
      if (ageDays >= MIN_ACCOUNT_DAYS && referrer) {
        const { count } = await db
          .from('giveaway_entries')
          .select('id', { count: 'exact', head: true })
          .eq('giveaway_id', GIVEAWAY_ID)
          .eq('login', referredBy)
          .eq('kind', 'referral');
        if ((count ?? 0) < MAX_REFERRALS) await award(referredBy, 'referral', login);
      }
    }

    return json({ phase, ...(await summary(login)) });
  } catch (err) {
    console.error('giveaway error', String(err));
    return json({ error: 'could not check entries' }, 500);
  }
});
