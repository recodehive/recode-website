/** @jsxImportSource https://esm.sh/react@18.2.0 */
// Share image (1200x630) for a public developer profile.
//
// GET /functions/v1/og?handle=<github login>&d=<YYYY-MM-DD>
//
// The numbers are read on the server (never from the URL), so nobody can make an image that claims a
// rank someone does not have. `d` only busts link-preview caches. Sources:
//   - profile_cache (GitHub name, avatar and contribution calendar), filled by the `profile` function
//   - the recodehive leaderboard backend (rank, points, merged PRs)
// Secrets: none beyond the ones Supabase provides. Optional: BACKEND_API_URL.
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.4/mod.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

const BACKEND = Deno.env.get('BACKEND_API_URL') || 'https://leaderboard-production-6143.up.railway.app';
const HANDLE_RE = /^[a-z0-9](?:[a-z0-9-]{0,38})$/;
const EXCLUDED = new Set(['allcontributors', 'allcontributors[bot]', 'dependabot', 'dependabot[bot]', 'copilot', 'copilot[bot]', 'github-actions[bot]', 'renovate[bot]', 'dependabot-preview[bot]']);

const db = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });

// Keep in step with src/data/badges.ts (names, thresholds and rarity).
const BADGES: { name: string; metric: 'prs' | 'points' | 'rank'; threshold: number; alt?: number; rarity: number }[] = [
  { name: 'First Contribution', metric: 'prs', threshold: 1, rarity: 1 },
  { name: 'Bronze Contributor', metric: 'prs', threshold: 5, rarity: 2 },
  { name: 'Silver Contributor', metric: 'prs', threshold: 10, rarity: 3 },
  { name: 'Gold Contributor', metric: 'prs', threshold: 25, rarity: 4 },
  { name: 'Platinum Contributor', metric: 'prs', threshold: 50, rarity: 5 },
  { name: 'Diamond Contributor', metric: 'prs', threshold: 100, rarity: 7 },
  { name: 'Points Master', metric: 'points', threshold: 500, rarity: 6 },
  { name: 'Elite Contributor', metric: 'prs', threshold: 200, rarity: 9 },
  { name: 'Legendary Contributor', metric: 'prs', threshold: 500, rarity: 11 },
  { name: 'Hall of Fame', metric: 'prs', threshold: 1000, alt: 5000, rarity: 13 },
  { name: 'Rank #1', metric: 'rank', threshold: 1, rarity: 12 },
  { name: 'Rank #2', metric: 'rank', threshold: 2, rarity: 10 },
  { name: 'Rank #3', metric: 'rank', threshold: 3, rarity: 8 },
];

function rarestBadge(prs: number, points: number, rank: number | null): string | null {
  const earned = BADGES.filter((b) => {
    if (b.metric === 'rank') return rank === b.threshold;
    const main = b.metric === 'prs' ? prs >= b.threshold : points >= b.threshold;
    return main || (b.alt !== undefined && points >= b.alt);
  }).sort((a, b) => b.rarity - a.rarity);
  return earned[0]?.name ?? null;
}

// Keep in step with src/lib/profile/streak.ts. Days are counted in UTC here.
function currentStreak(calendar: { date: string; count: number }[]): number {
  const counts = new Map(calendar.map((d) => [d.date, d.count]));
  const shift = (k: string, n: number) => new Date(Date.parse(`${k}T00:00:00Z`) + n * 86_400_000).toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);
  let cursor = (counts.get(today) ?? 0) > 0 ? today : shift(today, -1);
  let n = 0;
  while ((counts.get(cursor) ?? 0) > 0) {
    n += 1;
    cursor = shift(cursor, -1);
  }
  return n;
}

let board: { at: number; list: { username: string; points: number; prs: number }[] } | null = null;
async function leaderboard() {
  if (board && Date.now() - board.at < 3_600_000) return board.list;
  try {
    const res = await fetch(`${BACKEND}/api/leaderboard`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(String(res.status));
    const j = await res.json();
    const list = (Array.isArray(j.leaderboard) ? j.leaderboard : [])
      .filter((c: { username?: string }) => c.username && !EXCLUDED.has(c.username.toLowerCase()))
      .sort((a: { points: number }, b: { points: number }) => (b.points || 0) - (a.points || 0));
    board = { at: Date.now(), list };
    return list;
  } catch {
    return board?.list ?? [];
  }
}

const green = '#4ade80';

Deno.serve(async (req) => {
  const handle = (new URL(req.url).searchParams.get('handle') ?? '').toLowerCase();
  if (!HANDLE_RE.test(handle)) return new Response('invalid handle', { status: 400 });

  const [{ data: row }, list] = await Promise.all([
    db.from('profile_cache').select('data').eq('handle', handle).maybeSingle(),
    leaderboard(),
  ]);
  const gh = row?.data as { user?: { name?: string | null; avatarUrl?: string }; calendar?: { date: string; count: number }[] } | undefined;
  const idx = list.findIndex((c: { username: string }) => c.username.toLowerCase() === handle);
  const entry = idx >= 0 ? list[idx] : null;
  const rank = entry ? idx + 1 : null;
  const streak = gh?.calendar ? currentStreak(gh.calendar) : 0;
  const rarest = entry ? rarestBadge(entry.prs, entry.points, rank) : null;
  const name = gh?.user?.name || handle;
  const avatar = gh?.user?.avatarUrl || `https://github.com/${handle}.png`;

  const chip = (text: string) => (
    <div style={{ display: 'flex', padding: '10px 20px', borderRadius: 999, border: '2px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.08)', fontSize: 30, color: '#fff' }}>{text}</div>
  );

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: 64, color: '#fff', background: 'linear-gradient(120deg, #0b1f17, #123527 55%, #0d241b)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={avatar} width={190} height={190} style={{ borderRadius: 95, border: `6px solid ${green}` }} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 44 }}>
              <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{name}</div>
              <div style={{ display: 'flex', fontSize: 34, color: '#94a3b8', marginTop: 6 }}>@{handle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {rank ? chip(`Rank #${rank}`) : null}
              {entry ? chip(`${entry.prs} merged PRs`) : null}
              {streak > 0 ? chip(`${streak}-day streak`) : null}
            </div>
            {rarest ? <div style={{ display: 'flex', marginTop: 22, fontSize: 30, color: green }}>Rarest badge: {rarest}</div> : null}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 30, color: '#94a3b8' }}>
            <div style={{ display: 'flex', color: '#fff', fontWeight: 700 }}>recode hive</div>
            <div style={{ display: 'flex' }}>recodehive.com/u/{handle}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=604800', 'Access-Control-Allow-Origin': '*' },
    },
  );
});
