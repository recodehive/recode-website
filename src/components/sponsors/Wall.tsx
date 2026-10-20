import React, { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import {
  GITHUB_SPONSOR_TOTAL,
  SPONSORS,
  SPONSOR_URL,
  WE_SPONSOR,
  githubUrl,
  linkedinUrl,
  profileUrl,
  xUrl,
  type Person,
} from '../../data/sponsors';
import Avatar from './Avatar';
import SponsorBadge from './SponsorBadge';
import styles from './sponsors.module.css';

export type WallTab = 'sponsors' | 'sponsored';
const FIRST = 17;

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a className={styles.iconLink} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`}>
      {children}
    </a>
  );
}

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function Card({ person, sponsor }: { person: Person; sponsor: boolean }) {
  const href = profileUrl(person);
  const gh = githubUrl(person);
  const li = linkedinUrl(person);
  const x = xUrl(person);
  const face = (
    <span className={styles.ring}>
      <Avatar person={person} size={72} className={styles.cardAvatar} />
      {sponsor && <span className={styles.cornerBadge}><SponsorBadge size={22} animated={false} /></span>}
    </span>
  );
  return (
    <li className={styles.card}>
      {href ? (
        <a className={styles.cardFace} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} (opens in a new tab)`}>{face}</a>
      ) : (
        <span className={styles.cardFace}>{face}</span>
      )}
      <p className={styles.cardName}>{person.name}</p>
      {person.role && <p className={styles.cardRole} title={person.role}>{person.role}</p>}
      {(gh || li || x) && (
        <span className={styles.cardLinks}>
          {gh && <IconLink href={gh} label={`${person.name} on GitHub`}><Github size={14} aria-hidden="true" /></IconLink>}
          {li && <IconLink href={li} label={`${person.name} on LinkedIn`}><Linkedin size={14} aria-hidden="true" /></IconLink>}
          {x && <IconLink href={x} label={`${person.name} on X`}><XIcon /></IconLink>}
        </span>
      )}
    </li>
  );
}

export default function Wall({ tab, onTab }: { tab: WallTab; onTab: (t: WallTab) => void }) {
  const [expanded, setExpanded] = useState(false);
  const list = tab === 'sponsors' ? SPONSORS : WE_SPONSOR;
  const visible = expanded ? list : list.slice(0, FIRST);

  const select = (t: WallTab) => {
    setExpanded(false);
    onTab(t);
  };

  return (
    <section id="the-wall" className={styles.wall} aria-labelledby="wall-title">
      <div className={styles.wallHead}>
        <div>
          <p className={styles.eyebrowPink}>{'♥'} THE WALL</p>
          <h2 id="wall-title" className={styles.h2}>
            {tab === 'sponsors' ? 'The people who kept recode hive free' : 'The people and projects we back'}
          </h2>
          <p className={styles.sub}>
            {tab === 'sponsors'
              ? 'Everyone who has backed us on GitHub Sponsors. Thank you for funding open source learning.'
              : 'Open source developers and projects we sponsor, to pass the support forward.'}
          </p>
        </div>
        <div className={styles.segmented} role="tablist" aria-label="Wall">
          <button type="button" role="tab" aria-selected={tab === 'sponsors'} className={`${styles.segment} ${tab === 'sponsors' ? styles.segmentOn : ''}`} onClick={() => select('sponsors')}>
            Our sponsors <span className={styles.count}>{SPONSORS.length}</span>
          </button>
          <button type="button" role="tab" aria-selected={tab === 'sponsored'} className={`${styles.segment} ${tab === 'sponsored' ? styles.segmentOn : ''}`} onClick={() => select('sponsored')}>
            People we sponsor <span className={styles.count}>{WE_SPONSOR.length}</span>
          </button>
        </div>
      </div>

      <ul className={styles.grid}>
        {visible.map((p, i) => <Card key={`${p.name}-${i}`} person={p} sponsor={tab === 'sponsors'} />)}
        {tab === 'sponsors' && (
          <li className={`${styles.card} ${styles.cardJoin}`}>
            <a href={SPONSOR_URL} target="_blank" rel="noopener noreferrer" className={styles.joinLink}>
              <span className={styles.joinHeart} aria-hidden="true">{'♥'}</span>
              <span className={styles.joinTitle}>Your name here</span>
              <span className={styles.joinSub}>Become sponsor #{GITHUB_SPONSOR_TOTAL + 1}</span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </li>
        )}
      </ul>

      {!expanded && list.length > FIRST && (
        <div className={styles.showAll}>
          <button type="button" className={styles.btnOutline} onClick={() => setExpanded(true)}>Show all {list.length} {'↓'}</button>
        </div>
      )}
    </section>
  );
}
