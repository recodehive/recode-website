import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '@clerk/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import { Github, Search } from 'lucide-react';
import { profilePath } from '../../../lib/profile/path';
import { useCommunityStatsContext, type TimeFilter } from '@site/src/lib/statsProvider';
import { getEarnedByPrestige, getTopMilestone, getUserBadges } from '../../../utils/badges';
import { BadgesProvider, useBadges } from '../../leaderboard/BadgeContext';
import BadgeRail from '../../leaderboard/BadgeRail';
import { BadgesCell } from '../../leaderboard/BadgeChip';
import Podium, { type Row } from './Podium';
import { HiveActivity, HowToEarn, YourRank, type Viewer } from './Rail';
import {
  PERIOD_LABEL,
  REFRESH_EVERY_HOURS,
  STALE_AFTER_MS,
  TEAM_ROLES,
  avatarSrc,
  nextScheduledRun,
  rangeLabel,
  timeOfDay,
  updatedStamp,
  type Period,
} from './leaderboardUtils';
import { useReducedMotion } from './leaderboardHooks';
import styles from './leaderboard.module.css';

const PERIODS: Period[] = ['week', 'month', 'all'];
const PAGE = 20;
const SPONSOR_URL = 'https://github.com/sponsors/sanjay-kv';
const REPO_URL = 'https://github.com/recodehive/recode-website';

const periodWord = (p: Period, fallback: boolean) => (fallback ? 'last week' : p === 'all' ? 'all time' : p === 'week' ? 'this week' : 'this month');
const topBeesTitle = (p: Period, fallback: boolean) =>
  fallback ? "Last week's top bees" : p === 'week' ? "This week's top bees" : p === 'month' ? "This month's top bees" : 'All-time top bees';

function LeaderBoardView({ viewer }: { viewer: Viewer }) {
  const {
    contributors, stats, hasContributorsData, isFallbackPeriod, loading, error,
    lastUpdated, currentTimeFilter, setTimeFilter, allTimeRanking, clearCache,
  } = useCommunityStatsContext();
  const { siteConfig } = useDocusaurusContext();
  const reduced = useReducedMotion();

  const canSignIn = Boolean(siteConfig.customFields?.clerkPublishableKey);

  // Default to the monthly board.
  useEffect(() => {
    setTimeFilter('month');
  }, []);
  const period: Period = (PERIODS as string[]).includes(currentTimeFilter) ? (currentTimeFilter as Period) : 'month';

  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(PAGE);
  const [barsReady, setBarsReady] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const now = useMemo(() => new Date(), []);

  useEffect(() => {
    setShown(PAGE);
    setBarsReady(false);
    const id = requestAnimationFrame(() => setBarsReady(true));
    return () => cancelAnimationFrame(id);
  }, [period, hasContributorsData]);

  const allTime = useMemo(() => {
    const m = new Map<string, { prs: number; points: number }>();
    for (const r of allTimeRanking) m.set(r.username.toLowerCase(), { prs: r.prs, points: r.points });
    return m;
  }, [allTimeRanking]);

  const { statsFor } = useBadges();
  const badgeInfo = (login: string) => {
    const stats = statsFor(login);
    return { badgeCount: getUserBadges(stats).count, topBadge: getTopMilestone(stats), earned: getEarnedByPrestige(stats) };
  };

  const everyone: Row[] = useMemo(
    () =>
      contributors.map((c) => ({
        username: c.username,
        avatar: c.avatar,
        profile: c.profile,
        points: c.points,
        prs: c.prs,
        ...badgeInfo(c.username),
      })),
    [contributors, allTime],
  );
  // The founder and maintainer are listed under the ranked contributors and never get a rank
  const rows = useMemo(() => everyone.filter((r) => !TEAM_ROLES[r.username.toLowerCase()]), [everyone]);
  const team = useMemo(() => everyone.filter((r) => TEAM_ROLES[r.username.toLowerCase()]), [everyone]);

  const earliest = useMemo(() => {
    if (period !== 'all') return null;
    let min: number | null = null;
    for (const c of contributors) {
      for (const pr of c.prDetails ?? []) {
        const t = new Date(pr.mergedAt).getTime();
        if (min === null || t < min) min = t;
      }
    }
    return min === null ? null : new Date(min);
  }, [contributors, period]);

  const range = rangeLabel(period, isFallbackPeriod, earliest, now);
  const word = periodWord(period, isFallbackPeriod);
  const topPoints = rows[0]?.points ?? 0;
  const stale = lastUpdated ? now.getTime() - lastUpdated.getTime() > STALE_AFTER_MS : false;

  const matches = (r: Row) => r.username.toLowerCase().includes(query.trim().toLowerCase());
  const filtered = rows.filter(matches);
  const filteredTeam = team.filter(matches);
  const visible = filtered.slice(0, shown);
  const viewerIdx = viewer ? rows.findIndex((r) => r.username.toLowerCase() === viewer.login.toLowerCase()) : -1;
  const viewerIsTeam = viewer ? team.some((r) => r.username.toLowerCase() === viewer.login.toLowerCase()) : false;
  const showViewerRow = Boolean(viewer) && viewerIdx === -1 && !viewerIsTeam && !query.trim();

  const renderPerson = (r: Row, mine: boolean | null | undefined) => {
    const profileTo = profilePath(r.username);
    const role = TEAM_ROLES[r.username.toLowerCase()];
    // The founder and maintainer show their role in place of the @handle. The handle stays for screen readers.
    const label = role ? (
      <>
        <span className={styles.teamPill}>{role}</span>
        <span className={styles.srOnly}>@{r.username}{mine ? ' (you)' : ''}</span>
      </>
    ) : (
      <span>@{r.username}{mine ? ' (you)' : ''}</span>
    );
    return profileTo ? (
      <div className={styles.personRow}>
        <Link className={styles.person} to={profileTo}>
          <img src={avatarSrc(r.avatar)} alt="" width={36} height={36} loading="lazy" />
          {label}
        </Link>
        <a className={styles.ghBtn} href={r.profile} target="_blank" rel="noopener noreferrer" aria-label={`@${r.username} on GitHub (opens in a new tab)`}><Github size={15} aria-hidden="true" /></a>
      </div>
    ) : (
      <div className={styles.personRow}>
        <a className={styles.person} href={r.profile} target="_blank" rel="noopener noreferrer">
          <img src={avatarSrc(r.avatar)} alt="" width={36} height={36} loading="lazy" />
          {label}
          <span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </div>
    );
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const last = PERIODS.length - 1;
    const map: Record<string, number> = { ArrowRight: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last };
    if (e.key in map) {
      e.preventDefault();
      setTimeFilter(PERIODS[map[e.key]] as TimeFilter);
      tabRefs.current[map[e.key]]?.focus();
    }
  };

  const noData = !loading && !hasContributorsData;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <p className={styles.eyebrow}>{'✦'} LEADERBOARD</p>
          <h1 className={styles.h1}>Who&rsquo;s shipping in <span className={styles.accent}>the hive</span></h1>
          <p className={styles.lede}>
            Top contributors across the recodehive organization. Points come from merged PRs with the{' '}
            <code className={styles.codeChip}>recode</code> label. <a href="#how-points-work">How points work</a>
          </p>
        </div>
        {lastUpdated && (
          <div className={styles.updated}>
            <span className={styles.liveLine}>
              <span className={`${styles.dot} ${stale ? styles.dotStale : ''}`} aria-hidden="true" />
              {stale ? 'Data may be delayed' : `Updated ${updatedStamp(lastUpdated)}`}
            </span>
            <span className={styles.refresh}>
              {stale
                ? `Last update ${updatedStamp(lastUpdated)}`
                : `Refreshes every ${REFRESH_EVERY_HOURS} hours · next ~${timeOfDay(nextScheduledRun(now))}`}
            </span>
          </div>
        )}
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Leaderboard period">
        {PERIODS.map((p, i) => (
          <button
            key={p}
            ref={(el) => { tabRefs.current[i] = el; }}
            type="button"
            role="tab"
            aria-selected={period === p}
            tabIndex={period === p ? 0 : -1}
            className={`${styles.tab} ${period === p ? styles.tabOn : ''}`}
            onClick={() => setTimeFilter(p as TimeFilter)}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            {PERIOD_LABEL[p]}
          </button>
        ))}
      </div>

      {loading && !hasContributorsData && <div className={styles.stateCard} role="status">Loading the leaderboard...</div>}

      {noData && (
        <div className={styles.stateCard} role="alert">
          <h2 className={styles.stateTitle}>The leaderboard could not load</h2>
          <p>{error || 'No leaderboard data came back from the server.'}</p>
          <div className={styles.stateActions}>
            <button type="button" className={styles.btnPrimary} onClick={() => clearCache()}>Try again</button>
            <a className={styles.btnOutline} href={REPO_URL} target="_blank" rel="noopener noreferrer">
              View the repo<span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      )}

      {hasContributorsData && (
        <>
          {isFallbackPeriod && (
            <div className={styles.status}>
              <strong>No merged recode PRs this week yet.</strong> Showing last week&rsquo;s board ({range}). The first merged PR this week takes the top spot.
            </div>
          )}
          {!isFallbackPeriod && rows.length === 0 && (
            <div className={styles.status}>
              <strong>No merged recode PRs {word} yet.</strong> The first merged PR takes the top spot.
            </div>
          )}

          <div className={styles.grid}>
            <div className={styles.mainCol}>
              <Podium rows={rows} title={topBeesTitle(period, isFallbackPeriod)} range={range} />

              <section className={styles.tableCard} aria-label="Full ranking">
                <header className={styles.tableHead}>
                  <h2 className={styles.h2}>Full ranking</h2>
                  <label className={styles.search}>
                    <Search size={16} aria-hidden="true" />
                    <span className={styles.srOnly}>Search contributors</span>
                    <input type="search" placeholder="Search contributors..." value={query} onChange={(e) => { setQuery(e.target.value); setShown(PAGE); }} />
                  </label>
                </header>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Contributor</th>
                        <th scope="col">Merged PRs</th>
                        <th scope="col">Points</th>
                        <th scope="col">Badges earned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((r) => {
                        const rank = rows.indexOf(r) + 1;
                        const mine = viewer && r.username.toLowerCase() === viewer.login.toLowerCase();
                        return (
                          <tr key={r.username} className={mine ? styles.rowMine : ''}>
                            <td><span className={`${styles.rank} ${rank === 1 ? styles.rank1 : rank === 2 ? styles.rank2 : ''}`}>{rank}</span></td>
                            <td>{renderPerson(r, mine)}</td>
                            <td className={styles.mono}>{r.prs}</td>
                            <td>
                              <div className={styles.pointsCell}>
                                <span className={styles.barTrack} aria-hidden="true">
                                  <span className={styles.barFill} style={{ width: reduced || barsReady ? `${topPoints ? (r.points / topPoints) * 100 : 0}%` : '0%' }} />
                                </span>
                                <strong className={styles.pts}>{r.points.toLocaleString('en-US')}</strong>
                              </div>
                            </td>
                            <td>
                              <BadgesCell badges={r.earned} login={r.username} />
                            </td>
                          </tr>
                        );
                      })}
                      {filteredTeam.map((r) => {
                        const mine = viewer && r.username.toLowerCase() === viewer.login.toLowerCase();
                        return (
                          <tr key={r.username} className={styles.rowTeam}>
                            <td><span className={styles.rankTeam} title="Not ranked" aria-label="Not ranked">{'–'}</span></td>
                            <td>{renderPerson(r, mine)}</td>
                            <td className={styles.mono}>{r.prs}</td>
                            <td><strong className={styles.ptsTeam}>{r.points.toLocaleString('en-US')}</strong></td>
                            <td><BadgesCell badges={r.earned} login={r.username} /></td>
                          </tr>
                        );
                      })}
                      {showViewerRow && viewer && (
                        <tr className={`${styles.rowMine} ${styles.rowYou}`}>
                          <td><span className={styles.rankUnknown}>?</span></td>
                          <td>
                            <span className={styles.person}>
                              <img src={avatarSrc(viewer.imageUrl)} alt="" width={36} height={36} loading="lazy" />
                              <span>@{viewer.login} <span className={styles.muted}>(you)</span></span>
                            </span>
                          </td>
                          <td className={styles.mono}>0</td>
                          <td className={styles.mono}>0</td>
                          <td className={styles.muted}>Merge a recode PR to rank</td>
                        </tr>
                      )}
                      {filtered.length === 0 && filteredTeam.length === 0 && !showViewerRow && (
                        <tr><td colSpan={5} className={styles.emptyRow}>No contributors match your search.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {filtered.length > shown && (
                  <div className={styles.more}>
                    <button type="button" className={styles.btnOutline} onClick={() => setShown((n) => n + PAGE)}>
                      Show more ({filtered.length - shown} left)
                    </button>
                  </div>
                )}
                <ol className={styles.steps}>
                  <li><span>1</span><div><strong>Pick an issue</strong>Look for the recode and level labels.</div></li>
                  <li><span>2</span><div><strong>Open a PR</strong>Link the issue so the labels carry over.</div></li>
                  <li><span>3</span><div><strong>Get merged</strong>Points appear within {REFRESH_EVERY_HOURS} hours.</div></li>
                </ol>
              </section>

              <section className={`${styles.support} ${styles.darkGrid}`}>
                <div>
                  <p className={styles.supportEyebrow}>{'✦'} SUPPORT THE MISSION</p>
                  <h2 className={styles.supportTitle}>recode hive is free because of builders like you.</h2>
                  <p className={styles.supportText}>Donations fund swag for top contributors and keep the platform free.</p>
                </div>
                <a className={styles.supportBtn} href={SPONSOR_URL} target="_blank" rel="noopener noreferrer">
                  Donate to recode hive<span className={styles.srOnly}> (opens in a new tab)</span>
                </a>
              </section>
            </div>

            <aside className={styles.rail} aria-label="Leaderboard sidebar">
              <YourRank
                viewer={viewer}
                canSignIn={canSignIn}
                rows={rows}
                periodWord={word}
                viewerBadges={viewer ? getUserBadges(statsFor(viewer.login)).count : 0}
              />
              <BadgeRail />
              <HowToEarn />
              <HiveActivity
                chip={isFallbackPeriod ? 'Last week' : PERIOD_LABEL[period]}
                contributors={stats?.totalContributors ?? 0}
                prs={stats?.flooredTotalPRs ?? 0}
                points={stats?.flooredTotalPoints ?? 0}
              />
            </aside>
          </div>
        </>
      )}
    </div>
  );
}

export default function LeaderBoard() {
  // useUser() throws when no ClerkProvider is mounted; keep the board usable without it.
  let clerkUser: ReturnType<typeof useUser>['user'] | undefined;
  try {
    clerkUser = useUser().user;
  } catch {
    clerkUser = undefined;
  }
  const githubLogin = clerkUser?.externalAccounts?.find((a) => a.provider === 'github')?.username ?? null;
  const viewer: Viewer = githubLogin && clerkUser ? { login: githubLogin, imageUrl: clerkUser.imageUrl } : null;
  return (
    <BadgesProvider viewerLogin={viewer?.login ?? null}>
      <LeaderBoardView viewer={viewer} />
    </BadgesProvider>
  );
}
