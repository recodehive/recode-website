import React from 'react';
import Link from '@docusaurus/Link';
import { Gift, GitFork, HelpCircle, MessageCircle, Star, Tag, Trophy, Users } from 'lucide-react';
import { useCommunityStatsContext } from '@site/src/lib/statsProvider';
import ContributorAvatar from '../../changelog/ContributorAvatar';
import { getLatestRelease } from './releaseData';
import styles from './overview.module.css';

export const GOOD_FIRST_ISSUES =
  'https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22';

export function Skeleton({ width, height }: { width: number | string; height: number }) {
  return <span className={styles.skel} style={{ width, height }} aria-hidden="true" />;
}

type TileProps = {
  label: string;
  value: React.ReactNode;
  hint: string;
  icon: React.ReactNode;
  dark?: boolean;
};

export function Tile({ label, value, hint, icon, dark = false }: TileProps) {
  return (
    <div className={`${styles.card} ${styles.tile} ${dark ? styles.tileDark : ''}`}>
      <span className={styles.tileIcon} aria-hidden="true">{icon}</span>
      <span className={styles.tileLabel}>{label}</span>
      <span className={styles.tileValue}>{value}</span>
      <span className={styles.tileHint}>{hint}</span>
    </div>
  );
}

/** Community at a glance. Every value comes from the stats backend or the latest release. */
export function GlanceSection() {
  const { githubStarCountText, githubContributorsCountText, githubForksCountText, lastUpdated, error } =
    useCommunityStatsContext();
  const release = getLatestRelease();

  // lastUpdated stays null until the backend has answered, so the provider's
  // placeholder numbers are never shown.
  const loaded = lastUpdated !== null;
  const statsFailed = !loaded && Boolean(error);

  if (statsFailed && !release) return null;

  const value = (text: string) => (loaded ? text : <Skeleton width={90} height={34} />);

  return (
    <section aria-labelledby="glance-heading" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className={styles.sectionHead}>
        <h2 id="glance-heading" className={styles.h2}>Community at a glance</h2>
        {loaded && (
          <span className={styles.live}>
            <span className={styles.dot} aria-hidden="true" />
            Live from GitHub
          </span>
        )}
      </div>
      <div className={styles.tiles}>
        {!statsFailed && (
          <>
            <Tile label="Total stars" value={value(githubStarCountText)} hint="Across our public repositories" icon={<Star size={18} />} />
            <Tile label="Contributors" value={value(githubContributorsCountText)} hint="All-time people with commits on GitHub" icon={<Users size={18} />} />
            <Tile label="Forks" value={value(githubForksCountText)} hint="Copies people are building on" icon={<GitFork size={18} />} />
          </>
        )}
        {release && (
          <Tile
            dark
            label="Latest release"
            value={release.tag}
            hint={
              release.prCount > 0
                ? `${release.date} · ${release.prCount} PRs from ${release.contributors.length} ${release.contributors.length === 1 ? 'person' : 'people'}`
                : release.date
            }
            icon={<Tag size={18} />}
          />
        )}
      </div>
    </section>
  );
}

export function TopContributors() {
  const release = getLatestRelease();
  if (!release || release.contributors.length === 0) return null;
  const top = release.contributors.slice(0, 5);
  const max = top[0].prs;

  return (
    <section className={`${styles.card} ${styles.panel}`} aria-labelledby="top-heading">
      <div className={styles.panelHead}>
        <h2 id="top-heading" className={styles.h2}>Top contributors in {release.tag}</h2>
        <Link className={styles.linkOut} to="/dashboard#leaderboard">Full leaderboard →</Link>
      </div>
      <ul className={styles.list}>
        {top.map((c, i) => (
          <li key={c.handle}>
            <a
              className={styles.row}
              href={`https://github.com/${c.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`@${c.handle}, ${c.prs} pull ${c.prs === 1 ? 'request' : 'requests'} in ${release.tag}, open GitHub profile`}
            >
              <span className={styles.rank}>{i + 1}</span>
              <ContributorAvatar handle={c.handle} size={36} />
              <span className={styles.handle}>@{c.handle}</span>
              <span className={styles.bar} aria-hidden="true">
                <span className={styles.barFill} style={{ width: `${Math.max(8, Math.round((c.prs / max) * 100))}%` }} />
              </span>
              <span className={styles.prs}>{c.prs} {c.prs === 1 ? 'PR' : 'PRs'}</span>
            </a>
          </li>
        ))}
      </ul>
      {release.botCount > 0 && (
        <p className={styles.note}>{release.botCount} dependency updates by bots not counted</p>
      )}
    </section>
  );
}

const JUMP = [
  { to: '/dashboard#discuss', title: 'Discussions', text: 'Ask questions, share what you are building.', Icon: MessageCircle },
  { to: '/dashboard#leaderboard', title: 'Leaderboard', text: 'See who is shipping the most this month.', Icon: Trophy },
  { to: '/dashboard#giveaway', title: 'Giveaways', text: 'Current rewards and how to qualify.', Icon: Gift },
  { to: '/contact-us', title: 'Help center', text: 'Setup guides and contribution rules.', Icon: HelpCircle },
];

export function JumpIn() {
  return (
    <section className={`${styles.card} ${styles.panel}`} aria-labelledby="jump-heading">
      <h2 id="jump-heading" className={styles.h2}>Jump in</h2>
      <div className={styles.jumpGrid}>
        {JUMP.map(({ to, title, text, Icon }) => (
          <Link key={title} className={styles.jump} to={to}>
            <span className={styles.jumpIcon} aria-hidden="true"><Icon size={18} /></span>
            <span className={styles.jumpTitle}>{title}</span>
            <span className={styles.jumpText}>{text}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function NewHereStrip() {
  return (
    <section className={styles.strip} aria-label="New here">
      <div>
        <p className={styles.stripEyebrow}>✦ NEW HERE?</p>
        <p className={styles.stripTitle}>Your first merged PR puts you on this dashboard.</p>
      </div>
      <a className={styles.btnPrimary} href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">
        Pick a good first issue <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
