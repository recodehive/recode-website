import React from 'react';
import ContributorAvatar from './ContributorAvatar';
import type { Contributor } from '../../utils/releaseContributors';
import styles from './ContributorCloud.module.css';

// [x, y, size] centres inside the 320 x 350 cloud, rank 1 first
const SLOTS: [number, number, number][] = [
  [150, 128, 78], [62, 82, 62], [238, 88, 62], [64, 206, 54],
  [236, 210, 54], [150, 262, 50], [40, 304, 46], [262, 304, 46],
];
const OVERFLOW: [number, number, number] = [150, 22, 44];
const GOOD_FIRST_ISSUES =
  'https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22';

type Props = {
  version: string;
  date: string;
  htmlUrl: string;
  contributors: Contributor[];
  botCount: number;
  releaseCount: number;
  activeIndex: number;
};

const Crown = () => (
  <svg className={styles.crown} width="26" height="18" viewBox="0 0 26 18" aria-hidden="true" focusable="false">
    <path d="M2 16 L1 5 L8 10 L13 2 L18 10 L25 5 L24 16 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

export default function ContributorCloud({
  version, date, htmlUrl, contributors, botCount, releaseCount, activeIndex,
}: Props) {
  const shown = contributors.slice(0, SLOTS.length);
  const extra = contributors.length - shown.length;
  const totalPrs = contributors.reduce((sum, c) => sum + c.prs, 0);
  const prWord = totalPrs === 1 ? 'PR' : 'PRs';
  const peopleWord = contributors.length === 1 ? 'contributor' : 'contributors';

  return (
    <aside className={styles.rail} aria-label="Contributors for the release in view">
      <p className={styles.eyebrow}>✦ SHIPPED IN THIS RELEASE</p>
      <div className={styles.versionRow}>
        <span className={styles.version}>{version}</span>
        <span className={styles.date}>{date}</span>
      </div>

      {/* key remounts the cloud so the entrance animation replays for each release */}
      <div className={styles.cloud} key={version}>
        {extra > 0 && (
          <a
            className={styles.overflow}
            style={{ left: OVERFLOW[0] - OVERFLOW[2] / 2, top: OVERFLOW[1] - OVERFLOW[2] / 2, width: OVERFLOW[2], height: OVERFLOW[2] }}
            href={htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`See all ${contributors.length} contributors to ${version}`}
          >
            +{extra}
          </a>
        )}
        {shown.map((c, i) => {
          const [x, y, size] = SLOTS[i];
          return (
            <a
              key={c.handle}
              className={styles.bubble}
              style={{
                left: x - size / 2,
                top: y - size / 2,
                width: size,
                height: size,
                animationDelay: `${i * 60}ms`,
              }}
              href={`https://github.com/${c.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`@${c.handle}, ${c.prs} pull ${c.prs === 1 ? 'request' : 'requests'} in ${version}, open GitHub profile`}
            >
              <span
                className={styles.float}
                style={{ animationDuration: `${3.4 + (i % 4) * 0.45}s`, animationDelay: `${-i * 0.7}s` }}
              >
                {i === 0 && <Crown />}
                <span className={styles.avatarWrap}>
                  <ContributorAvatar handle={c.handle} size={size - 6} className={styles.avatar} />
                </span>
                <span className={styles.badge}>{c.prs} {c.prs === 1 ? 'PR' : 'PRs'}</span>
                <span className={styles.tip}>@{c.handle}</span>
              </span>
            </a>
          );
        })}
      </div>

      <p className={styles.summary}>
        <b>{totalPrs} {prWord}</b> from <b>{contributors.length} {peopleWord}</b>
      </p>
      {botCount > 0 && (
        <p className={styles.bots}>{botCount} dependency updates by bots not counted</p>
      )}

      <div className={styles.progress} aria-hidden="true">
        {Array.from({ length: releaseCount }).map((_, i) => (
          <span key={i} className={`${styles.pill} ${i === activeIndex ? styles.pillOn : ''}`} />
        ))}
      </div>

      <a className={styles.cta} href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">
        Want your face floating here next release? Pick a good first issue <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
