import React, { useMemo } from 'react';
import { computeStreak, shiftDay, type CalendarDay, type StreakStats } from '../../lib/profile/streak';
import type { GithubStatus } from './useGithubProfile';
import styles from './profile.module.css';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const nf = new Intl.NumberFormat('en-US');

function shortDate(key: string): string {
  const [, m, d] = key.split('-').map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

function level(count: number): number {
  if (count <= 0) return 0;
  if (count < 4) return 1;
  if (count < 10) return 2;
  if (count < 25) return 3;
  return 4;
}

/** Weeks start on Sunday. The grid covers the last `weeks` weeks ending with the week of today. */
function buildWeeks(days: CalendarDay[], todayKey: string, weeks: number) {
  const counts = new Map(days.map((d) => [d.date, d.count]));
  const todayDow = new Date(`${todayKey}T00:00:00Z`).getUTCDay();
  const start = shiftDay(todayKey, -(todayDow + (weeks - 1) * 7));
  const cols: { date: string; count: number; future: boolean }[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const date = shiftDay(start, w * 7 + d);
      col.push({ date, count: counts.get(date) ?? 0, future: date > todayKey });
    }
    cols.push(col);
  }
  return cols;
}

interface Props {
  status: GithubStatus;
  calendar: CalendarDay[] | null;
  handle: string;
  timeZone: string;
  fetchedAt: string | null;
}

export default function Cover({ status, calendar, handle, timeZone, fetchedAt }: Props) {
  const stats: StreakStats | null = useMemo(() => (calendar ? computeStreak(calendar, new Date(), timeZone) : null), [calendar, timeZone]);
  const weeks = useMemo(() => (calendar && stats ? buildWeeks(calendar, stats.todayKey, 26) : []), [calendar, stats]);

  // Month labels sit over the first week that starts a new month
  let lastLabelAt = -10;
  const labels = weeks.map((col, i) => {
    const m = Number(col[0].date.slice(5, 7)) - 1;
    const prev = i > 0 ? Number(weeks[i - 1][0].date.slice(5, 7)) - 1 : -1;
    // Skip a label that would sit on top of the previous one
    if (m === prev || i - lastLabelAt < 3) return '';
    lastLabelAt = i;
    return MONTHS[m];
  });

  const summary = stats
    ? `${stats.current > 0 ? `${stats.current}-day streak` : 'No current streak'}, ${nf.format(stats.last12Months)} contributions in the last 12 months`
    : '';

  return (
    <section className={styles.cover} aria-label="GitHub activity">
      <div className={styles.coverGrid} aria-hidden="true" />
      <div className={styles.coverInner}>
        {status === 'loading' && <div className={`${styles.streakBox} ${styles.skeleton}`} aria-busy="true" />}
        {status === 'ready' && stats && (
          <div className={styles.streakBox}>
            <p className={styles.streakTop}>
              <span><span className={styles.liveDot} aria-hidden="true" /> FROM GITHUB · @{handle}</span>
              {fetchedAt && <span>updated {shortDate(fetchedAt.slice(0, 10))}, {fetchedAt.slice(0, 4)}</span>}
            </p>
            <div className={styles.streakBody}>
              <div className={styles.streakLeft}>
                <div className={styles.streakHead}>
                  <span className={styles.flame} aria-hidden="true">{'\u{1F525}'}</span>
                  <div>
                    <p className={styles.streakNum}>{stats.current > 0 ? `${stats.current}-day streak` : 'Start a streak today'}</p>
                    {stats.currentSince && <p className={styles.streakSub}>contributed every day since {shortDate(stats.currentSince)}</p>}
                  </div>
                </div>
                <dl className={styles.streakStats}>
                  <div>
                    <dt>{stats.longest} {stats.longest === 1 ? 'day' : 'days'}</dt>
                    <dd>longest streak{stats.longestFrom && stats.longestTo ? ` ${shortDate(stats.longestFrom)} to ${stats.longestFrom.slice(0, 7) === stats.longestTo.slice(0, 7) ? stats.longestTo.slice(8).replace(/^0/, '') : shortDate(stats.longestTo)}` : ''}</dd>
                  </div>
                  <div><dt>{nf.format(stats.last12Months)}</dt><dd>contributions last 12 months</dd></div>
                  <div><dt>{nf.format(stats.last7Days)}</dt><dd>contributions last 7 days</dd></div>
                </dl>
              </div>
              <div className={styles.heat}>
                <div className={styles.heatMonths} aria-hidden="true">
                  {labels.map((l, i) => <span key={i}>{l}</span>)}
                </div>
                <div className={styles.heatGrid} aria-hidden="true">
                  {weeks.map((col) => (
                    <div key={col[0].date} className={styles.heatCol}>
                      {col.map((c) => (
                        <span
                          key={c.date}
                          className={`${styles.cell} ${c.future ? styles.cellFuture : styles[`lv${level(c.count)}` as 'lv0']} ${c.date === stats.todayKey ? styles.cellToday : ''}`}
                          title={c.future ? undefined : `${c.count} on ${c.date}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className={styles.heatKey} aria-hidden="true">
                  <span>Last 26 weeks</span>
                  <span className={styles.heatLegend}>Less <i className={styles.lv0} /><i className={styles.lv1} /><i className={styles.lv2} /><i className={styles.lv3} /><i className={styles.lv4} /> More</span>
                </div>
              </div>
            </div>
            <p className={styles.srOnly}>{summary}</p>
          </div>
        )}
      </div>
    </section>
  );
}
