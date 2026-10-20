import React from 'react';
import { Bug, Code2, GraduationCap, Shield, Star } from 'lucide-react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  CREDITS_URL, GOOD_FIRST_ISSUES, certifications, highlights, retired,
  type Certification, type HighlightIcon,
} from '../../../data/githubBadges';
import styles from '../github-badges.module.css';

const ICONS: Record<HighlightIcon, { Icon: typeof Star; tone: string }> = {
  star: { Icon: Star, tone: styles.toneViolet },
  code: { Icon: Code2, tone: styles.toneSky },
  bug: { Icon: Bug, tone: styles.toneRed },
  cap: { Icon: GraduationCap, tone: styles.toneGreen },
  shield: { Icon: Shield, tone: styles.toneAmber },
};

export function Highlights() {
  return (
    <section id="highlights" className={`${styles.container} ${styles.section}`} aria-labelledby="highlights-heading">
      <div className={styles.twoCol}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>✦ HIGHLIGHTS</p>
          <h2 id="highlights-heading" className={styles.h2}>Highlight badges</h2>
          <p className={styles.sub}>These sit at the top of your profile and come from programs, not from activity counts.</p>
        </div>
        <ul className={styles.hlList}>
          {highlights.map((h) => {
            const { Icon, tone } = ICONS[h.icon];
            return (
              <li key={h.name} className={styles.hlRow}>
                <span className={`${styles.hlIcon} ${tone}`} aria-hidden="true"><Icon size={20} /></span>
                <span className={styles.hlText}>
                  <span className={styles.hlName}>{h.name}</span>
                  <span className={styles.hlHow}>{h.how}</span>
                </span>
                <a className={styles.hlLink} href={h.url} target="_blank" rel="noopener noreferrer">{h.ctaLabel} ↗</a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function Retired() {
  return (
    <section id="retired" className={`${styles.container} ${styles.section}`} aria-labelledby="retired-heading">
      <h2 id="retired-heading" className={`${styles.h3} ${styles.center}`}>❌ Badges no longer earnable ❌</h2>
      <div className={`${styles.tableBox} ${styles.retiredBox}`}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col" className={styles.thBadge}>Badge</th>
                <th scope="col" className={styles.thName}>Name</th>
                <th scope="col">How to get</th>
                <th scope="col" className={styles.thNeeded}>Needed amount</th>
              </tr>
            </thead>
            <tbody>
              {retired.map((r) => (
                <tr key={r.name}>
                  <td className={styles.cellCenter}>
                    <img className={styles.badgeImg} src={r.image} alt={`${r.name} badge`} width={44} height={44} loading="lazy" />
                  </td>
                  <td className={styles.cellCenter}><span className={styles.badgeName}>{r.name}</span></td>
                  <td className={styles.cellCenter}>
                    <p className={styles.how}>
                      {r.how}{' '}
                      <a href={r.url} target="_blank" rel="noopener noreferrer">{r.linkLabel}</a>
                    </p>
                  </td>
                  <td className={styles.cellNeeded}>
                    <div className={styles.levels}>
                      <div className={`${styles.levelPill} ${styles.levelPillRetired}`}>DEFAULT</div>
                      <div className={styles.tierRow}>
                        <span className={styles.tierTile}>
                          <img src={r.image} alt={`${r.name}, Default tier`} width={40} height={40} loading="lazy" />
                        </span>
                      </div>
                      <div className={styles.needed}>1</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CertImage({ c }: { c: Certification }) {
  const local = useBaseUrl(c.image && c.image.startsWith('/') ? c.image : '/');
  if (!c.image) {
    return (
      <span className={styles.certPlaceholder} role="img" aria-label={`${c.name} badge image coming soon`}>
        <span className={styles.certCode}>{c.code}</span>
        <span>add official badge</span>
      </span>
    );
  }
  return (
    <img
      className={styles.certImg}
      src={c.image.startsWith('/') ? local : c.image}
      alt={`GitHub ${c.name} certification badge`}
      width={96}
      height={96}
      loading="lazy"
    />
  );
}

export function Certifications() {
  return (
    <section id="certs" className={`${styles.container} ${styles.section}`} aria-labelledby="certs-heading">
      <div className={styles.head}>
        <p className={styles.eyebrow}>✦ GO FURTHER</p>
        <h2 id="certs-heading" className={styles.h2}>GitHub certifications</h2>
        <p className={styles.sub}>
          Achievements show activity. Certifications prove skill: proctored exams you can add to LinkedIn and your resume.
        </p>
      </div>
      <div className={styles.certGrid}>
        {certifications.map((c) => (
          <article key={c.code} className={`${styles.card} ${styles.cert}`}>
            <div className={styles.certTop}>
              <CertImage c={c} />
              <span className={styles.certTags}>
                {c.isNew && <span className={`${styles.tag} ${styles.tagNew}`}>New</span>}
                {c.founderHolds && <span className={`${styles.tag} ${styles.tagFounder}`}>Our founder holds this</span>}
              </span>
            </div>
            <h3 className={styles.certTitle}>
              {c.name} <span className={styles.codeChip}>{c.code}</span>
            </h3>
            <p className={styles.certDesc}>{c.description}</p>
            <a className={styles.certLink} href={c.prepUrl} target="_blank" rel="noopener noreferrer">
              Prepare for {c.code} →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PracticeBanner() {
  return (
    <section className={`${styles.container} ${styles.section}`} aria-label="Practice with recode hive">
      <div className={styles.banner}>
        <div>
          <p className={styles.bannerEyebrow}>✦ PRACTICE HERE</p>
          <p className={styles.bannerTitle}>Get Pull Shark with a real, reviewed PR to recode hive.</p>
          <p className={styles.bannerSub}>Pick a good first issue, open a PR, and a maintainer will review it.</p>
        </div>
        <a className={styles.bannerBtn} href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">
          Find a good first issue <span aria-hidden="true">→</span>
        </a>
      </div>
      <p className={styles.credits}>
        Badge names and requirements from GitHub Docs and the community-maintained{' '}
        <a href={CREDITS_URL} target="_blank" rel="noopener noreferrer">GitHub-Achievements</a> list. GitHub and the achievement artwork are trademarks of GitHub, Inc. Last checked October 2026.
      </p>
    </section>
  );
}
