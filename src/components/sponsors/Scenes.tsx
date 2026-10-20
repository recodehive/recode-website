import React, { useEffect, useState } from 'react';
import { CommunityStatsProvider, useCommunityStatsContext } from '@site/src/lib/statsProvider';
import { SPONSORS, linkedinUrl, type Person } from '../../data/sponsors';
import { useReducedMotion } from '../docsStory/hooks';
import Avatar from './Avatar';
import SponsorBadge from './SponsorBadge';
import styles from './sponsors.module.css';

const OWNER: Person = { name: 'sanjay-kv', github: 'sanjay-kv' };
const ROW_H = 46;

const Heart = ({ size = 14, color = '#db2777' }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
    <path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5.5 6 5.5c2 0 3.4 1.2 4 2.4.6-1.2 2-2.4 4-2.4 3 0 4.8 3.1 3.5 6.3C19.5 16.4 12 21 12 21z" fill={color} />
  </svg>
);

function Browser({ url, children, dark = false, decor = true }: { url: string; children: React.ReactNode; dark?: boolean; decor?: boolean }) {
  return (
    <div className={`${styles.win} ${dark ? styles.winDark : ''}`} aria-hidden={decor ? true : undefined}>
      <div className={styles.winBar}>
        <span className={styles.winDots}><i /><i /><i /></span>
        <span className={styles.winUrl}>{url}</span>
      </div>
      <div className={styles.winBody}>{children}</div>
    </div>
  );
}

/* Sponsor path */

export function SceneClick() {
  return (
    <Browser url="github.com/sanjay-kv">
      <div className={styles.profileRow}>
        <Avatar person={OWNER} size={54} />
        <div>
          <p className={styles.profileName}>Sanjay Viswanathan</p>
          <p className={styles.profileUser}>sanjay-kv</p>
        </div>
        <span className={styles.sponsorBtn}><Heart /> Sponsor</span>
      </div>
      <span className={styles.sHeart} style={{ left: '78%' }}><Heart size={16} /></span>
      <span className={`${styles.sHeart} ${styles.sHeart2}`} style={{ left: '84%' }}><Heart size={12} /></span>
      <span className={`${styles.sHeart} ${styles.sHeart3}`} style={{ left: '72%' }}><Heart size={14} /></span>
      <svg className={styles.cursor} viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
        <path d="M5 3l14 8-6 2 3 7-3 1-3-7-5 4z" fill="#0f172a" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </Browser>
  );
}

export function SceneAmount() {
  return (
    <Browser url="github.com/sponsors/sanjay-kv">
      <p className={styles.formHint}>Select a tier, or enter a custom amount</p>
      <div className={styles.amount}>
        <span className={styles.amountSign}>$</span>
        <span className={styles.amountTyped}>10</span>
        <span className={styles.amountCaret} />
      </div>
      <div className={styles.toggle} aria-hidden="true">
        <span className={styles.toggleThumb} />
        <span className={styles.toggleA}>Monthly</span>
        <span className={styles.toggleB}>One-time</span>
      </div>
    </Browser>
  );
}

export function SceneVisibility() {
  return (
    <Browser url="github.com/sponsors/sanjay-kv">
      <p className={styles.formHint}>Choose who can see your sponsorship</p>
      <div className={styles.radio}>
        <span className={styles.radioDot}><i /></span> Everyone
      </div>
      <div className={`${styles.radio} ${styles.radioOff}`}>
        <span className={styles.radioDot} /> Only sanjay-kv
      </div>
      <div className={styles.check}>
        <span className={styles.checkBox}>
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        Receive email updates
      </div>
    </Browser>
  );
}

export function SceneConfirm() {
  const row = SPONSORS.filter((p) => p.linkedin && (p.github || p.avatar)).slice(0, 6);
  return (
    <Browser url="recodehive.com/our-sponsors" decor={false}>
      <span className={styles.confirmBtn}><Heart color="#fff" /> Sponsor sanjay-kv</span>
      <span className={styles.confirmBurst} aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} style={{ ['--a' as string]: `${i * 45}deg` }} />
        ))}
      </span>
      <div className={styles.wallRow}>
        <ul className={styles.avatarRow} aria-label="Some of our sponsors">
          {row.map((p) => (
            <li key={p.name} className={styles.av}>
              <a href={linkedinUrl(p)} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on LinkedIn (opens in a new tab)`}>
                <Avatar person={p} size={40} />
              </a>
              <span className={styles.tip} role="tooltip">{p.name}</span>
            </li>
          ))}
        </ul>
        <span className={styles.youAvatar}>
          <span className={styles.youLabel}>You</span>
          <span className={styles.youBadge}><SponsorBadge size={26} animated={false} /></span>
        </span>
      </div>
      <p className={styles.welcome}>Welcome to the wall, with your sponsor badge.</p>
    </Browser>
  );
}

/* Get sponsored path */

export function ScenePR() {
  return (
    <Browser url="github.com/recodehive/recode-website/pulls">
      <div className={styles.prRow}>
        <span className={styles.prIcon} aria-hidden="true">{'⑂'}</span>
        <span className={styles.prTitle}>Fix typo in the setup guide</span>
        <span className={styles.prPills}>
          <span className={styles.prOpen}>Open</span>
          <span className={styles.prMerged}>{'✓'} Merged</span>
        </span>
      </div>
      <div className={styles.graph} aria-hidden="true">
        {Array.from({ length: 54 }, (_, i) => {
          const col = Math.floor(i / 3);
          const level = (col * 7 + (i % 3) * 5) % 4;
          return <i key={i} className={styles[`g${level}` as 'g0']} style={{ animationDelay: `${0.4 + col * 0.09}s` }} />;
        })}
      </div>
    </Browser>
  );
}

function BoardInner() {
  const { contributors, hasContributorsData, setTimeFilter } = useCommunityStatsContext();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    setTimeFilter('month');
  }, []);

  const top = contributors.slice(0, 4);
  const ready = hasContributorsData && top.length === 4;

  useEffect(() => {
    if (!ready) return;
    if (reduced) {
      setPhase(1);
      return;
    }
    const id = window.setTimeout(() => setPhase(1), 1300);
    return () => window.clearTimeout(id);
  }, [ready, reduced]);

  if (!ready) {
    return <p className={styles.boardNote}>Loading this month&rsquo;s leaderboard...</p>;
  }

  // The highlighted row is an example contributor. Its numbers are derived from the live board.
  const p2 = top[1].points;
  const start = Math.max(0, top[3].points - 10);
  const delta = Math.max(5, Math.ceil((p2 - start + 1) / 5) * 5);
  const meFinal = start + delta;
  const max = Math.max(top[0].points, meFinal, 1);

  const order = (i: number) => (phase === 0 ? i : i <= 0 ? 0 : i + 1);
  const meIndex = phase === 0 ? 4 : 1;

  return (
    <div className={styles.board}>
      <p className={styles.boardTitle}>This month&rsquo;s top bees</p>
      <div className={styles.boardGrid}>
        <ol className={styles.boardRanks} aria-hidden="true">
          {[1, 2, 3, 4, 5].map((n) => (
            <li key={n} style={{ height: ROW_H }}><span className={n === 1 ? styles.r1 : n === 2 ? styles.r2 : n === 3 ? styles.r3 : ''}>{n}</span></li>
          ))}
        </ol>
        <div className={styles.boardRows} style={{ height: ROW_H * 5 }}>
          {top.map((c, i) => (
            <div key={c.username} className={styles.boardRow} style={{ top: order(i) * ROW_H, height: ROW_H }}>
              <Avatar person={{ name: c.username, github: c.username }} size={28} />
              <span className={styles.boardName}>@{c.username}</span>
              <span className={styles.boardBar}><i style={{ width: `${(c.points / max) * 100}%` }} /></span>
              <span className={styles.boardPts}>{c.points}</span>
            </div>
          ))}
          <div className={`${styles.boardRow} ${styles.boardMe}`} style={{ top: meIndex * ROW_H, height: ROW_H }}>
            <img className={styles.meLogo} src="/img/logo.svg" alt="" width={28} height={28} />
            <span className={styles.boardName}>recode hive</span>
            {phase === 1 && !reduced && <span className={styles.plus}>+{delta} pts</span>}
            <span className={styles.boardBar}><i style={{ width: `${((phase === 0 ? start : meFinal) / max) * 100}%` }} /></span>
            <span className={styles.boardPts}>{phase === 0 ? start : meFinal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SceneLeaderboard() {
  return (
    <Browser url="recodehive.com/dashboard#leaderboard">
      <CommunityStatsProvider>
        <BoardInner />
      </CommunityStatsProvider>
    </Browser>
  );
}

export function SceneSponsored() {
  return (
    <Browser url="github.com/recodehive" dark>
      <div className={styles.ghProfile}>
        <img className={styles.ghLogo} src="/img/logo.svg" alt="" width={44} height={44} />
        <div>
          <p className={styles.ghName}>recode hive</p>
          <p className={styles.ghUser}>recodehive</p>
        </div>
      </div>
      <p className={styles.ghHead}>Sponsors <span>1</span></p>
      <div className={styles.ghSponsor}>
        <span className={styles.ghAvatar}><Avatar person={OWNER} size={44} /><span className={styles.ghHeart}><Heart size={12} /></span></span>
        <span className={styles.ghPill}><Heart size={12} /> Sponsored by @sanjay-kv</span>
      </div>
    </Browser>
  );
}
