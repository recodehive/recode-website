import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '@clerk/react';
import { Flame, GitMerge, GitPullRequest, Trophy } from 'lucide-react';
import { useCommunityStatsContext } from '@site/src/lib/statsProvider';
import { getCurrentStreak, getWeekBuckets } from '@site/src/lib/streakUtils';
import { cachedJson } from '../../../lib/githubCache';
import { GOOD_FIRST_ISSUES, Skeleton, Tile } from './sections';
import styles from './overview.module.css';

type OpenPR = { number: number; title: string; html_url: string; created_at: string };
type SearchResult = { total_count: number; items: OpenPR[] };

const DAY = 24 * 60 * 60 * 1000;
const WEEKS = 26;

type PRItem = { key: string; number: number; title: string; url: string; date: number; status: 'Merged' | 'Open' };

/** 26 weeks x 7 days of merged-PR counts, Monday first, weeks oldest to newest. */
function buildHeat(mergedDates: string[]) {
  const counts = new Map<string, number>();
  mergedDates.forEach((iso) => {
    const key = iso.slice(0, 10);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  const now = new Date();
  const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const mondayIndex = (now.getUTCDay() + 6) % 7;
  const start = todayUtc - (mondayIndex + (WEEKS - 1) * 7) * DAY;

  let total = 0;
  const cells = Array.from({ length: WEEKS * 7 }, (_, i) => {
    const t = start + i * DAY;
    const key = new Date(t).toISOString().slice(0, 10);
    const count = t > todayUtc ? 0 : counts.get(key) ?? 0;
    total += count;
    return { key, count, future: t > todayUtc };
  });
  return { cells, total };
}

const level = (count: number) => (count >= 4 ? 4 : count);
const levelClass = (count: number) =>
  [styles.cell, count === 1 ? styles.l1 : '', count === 2 ? styles.l2 : '', count === 3 ? styles.l3 : '', count >= 4 ? styles.l4 : '']
    .filter(Boolean)
    .join(' ');

export default function SignedInHeader() {
  const { user } = useUser();
  const stats = useCommunityStatsContext();
  const login =
    user?.externalAccounts?.find((a) => a.provider === 'github')?.username ?? null;

  const ready = stats.hasContributorsData;
  const dataFailed = !ready && Boolean(stats.error);

  const prs = useMemo(() => (login ? stats.getAllTimePRsForContributor(login) : []), [login, stats.getAllTimePRsForContributor]);
  const viewer = login ? stats.getAllTimeContributor(login) : undefined;

  // Open pull requests come from the public GitHub search API, cached for 10 minutes
  const [open, setOpen] = useState<SearchResult | null>(null);
  const [openFailed, setOpenFailed] = useState(false);
  useEffect(() => {
    if (!login) return;
    let cancelled = false;
    const q = encodeURIComponent(`is:pr is:open author:${login} org:recodehive`);
    cachedJson<SearchResult>(`open-prs:${login}`, `https://api.github.com/search/issues?q=${q}&per_page=10&sort=created&order=desc`)
      .then((d) => { if (!cancelled) setOpen(d); })
      .catch(() => { if (!cancelled) setOpenFailed(true); });
    return () => { cancelled = true; };
  }, [login]);

  const streak = useMemo(() => getCurrentStreak(getWeekBuckets(prs, 20)), [prs]);

  const ranking = stats.allTimeRanking;
  const rankIndex = login ? ranking.findIndex((c) => c.username.toLowerCase() === login.toLowerCase()) : -1;
  const pointsAway =
    rankIndex >= 15 && ranking[14] ? Math.max(0, ranking[14].points - ranking[rankIndex].points) : 0;

  const heat = useMemo(() => buildHeat(prs.map((p) => p.mergedAt)), [prs]);

  const items: PRItem[] = useMemo(() => {
    const merged: PRItem[] = prs.map((p) => ({
      key: `m-${p.number}-${p.repoName}`, number: p.number, title: p.title, url: p.url,
      date: new Date(p.mergedAt).getTime(), status: 'Merged',
    }));
    const opened: PRItem[] = (open?.items ?? []).map((p) => ({
      key: `o-${p.number}`, number: p.number, title: p.title, url: p.html_url,
      date: new Date(p.created_at).getTime(), status: 'Open',
    }));
    return [...opened, ...merged].sort((a, b) => b.date - a.date).slice(0, 4);
  }, [prs, open]);

  const name = login ?? user?.username ?? user?.firstName ?? 'there';
  const tileValue = (v: React.ReactNode, isReady: boolean) => (isReady ? v : <Skeleton width={70} height={34} />);

  return (
    <>
      <section className={styles.header} aria-labelledby="dash-heading">
        <div className={styles.headerText}>
          <p className={styles.eyebrow}>✦ YOUR DASHBOARD</p>
          <h1 id="dash-heading" className={`${styles.h1} ${styles.h1Sm}`}>
            Welcome back, <span className={styles.accent}>@{name}</span>
          </h1>
          {pointsAway > 0 && <p className={styles.away}>You are {pointsAway} points from the top 15.</p>}
        </div>
        <a className={styles.btnPrimary} href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">
          Find your next issue <span aria-hidden="true">→</span>
        </a>
      </section>

      <div className={styles.tiles}>
        {!dataFailed && (
          <Tile label="Merged PRs" value={tileValue(viewer?.prs ?? 0, ready)} hint="All-time on the leaderboard" icon={<GitMerge size={18} />} />
        )}
        {!openFailed && login && (
          <Tile label="Open PRs" value={tileValue(open?.total_count ?? 0, open !== null)} hint="Open in the recodehive org" icon={<GitPullRequest size={18} />} />
        )}
        {!dataFailed && (
          <Tile label="Current streak" value={tileValue(`${streak} wk`, ready)} hint="Weeks in a row with a merged PR" icon={<Flame size={18} />} />
        )}
        {ready && rankIndex >= 0 && (
          <Tile dark label="Leaderboard rank" value={`#${rankIndex + 1}`} hint={`of ${ranking.length} contributors, by points`} icon={<Trophy size={18} />} />
        )}
      </div>

      <div className={styles.cols}>
        {!dataFailed && (
          <section className={`${styles.card} ${styles.panel}`} aria-labelledby="activity-heading">
            <div className={styles.panelHead}>
              <h2 id="activity-heading" className={styles.h2}>Your activity</h2>
              <span className={styles.note}>Merged PRs, last {WEEKS} weeks</span>
            </div>
            {ready ? (
              <>
                <div className={styles.heat} role="img" aria-label={`${heat.total} merged pull requests in the last ${WEEKS} weeks`}>
                  {heat.cells.map((c) => (
                    <span
                      key={c.key}
                      className={c.future ? `${styles.cell} ${styles.future}` : levelClass(c.count)}
                      title={c.future ? undefined : `${c.key}: ${c.count} merged ${c.count === 1 ? 'PR' : 'PRs'}`}
                    />
                  ))}
                </div>
                <div className={styles.legend} aria-hidden="true">
                  Less
                  {[0, 1, 2, 3, 4].map((n) => <span key={n} className={levelClass(level(n))} />)}
                  More
                </div>
              </>
            ) : (
              <Skeleton width="100%" height={140} />
            )}
          </section>
        )}

        <section className={`${styles.card} ${styles.panel}`} aria-labelledby="prs-heading">
          <div className={styles.panelHead}>
            <h2 id="prs-heading" className={styles.h2}>Your pull requests</h2>
            {login && (
              <a className={styles.linkOut} href={`https://github.com/pulls?q=${encodeURIComponent(`is:pr author:${login} org:recodehive`)}`} target="_blank" rel="noopener noreferrer">
                All on GitHub ↗
              </a>
            )}
          </div>
          {items.length > 0 ? (
            <ul className={styles.prList}>
              {items.map((it) => (
                <li key={it.key}>
                  <a className={styles.prRow} href={it.url} target="_blank" rel="noopener noreferrer">
                    <GitPullRequest className={styles.prIcon} size={16} aria-hidden="true" />
                    <span className={styles.prTitle}>{it.title}</span>
                    <span className={styles.prNum}>#{it.number}</span>
                    <span className={`${styles.pill} ${it.status === 'Merged' ? styles.pillMerged : styles.pillOpen}`}>{it.status}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : ready || open !== null ? (
            <p className={styles.empty}>
              No pull requests yet. <a href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">Pick a good first issue →</a>
            </p>
          ) : (
            <Skeleton width="100%" height={120} />
          )}
        </section>
      </div>
    </>
  );
}
