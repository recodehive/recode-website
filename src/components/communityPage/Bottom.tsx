import React from 'react';
import Link from '@docusaurus/Link';
import { getNews, longDate, shortMonthDay, usePosts } from './communityData';
import styles from './community.module.css';

const ISSUES = 'https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22';
const DISCORD = 'https://discord.gg/dh3TA8U55Q';
const WHATSAPP = 'https://chat.whatsapp.com/Izl2yfbFlmY8CExjnIpNkX?mode=ems_copy_t';

export function News() {
  const posts = usePosts();
  const items = getNews(posts);
  if (items.length === 0) return null;
  return (
    <section className={styles.block} aria-labelledby="news-title">
      <div className={styles.sectionHead}>
        <div>
          <p className={styles.eyebrow}>{'✦'} RECODE HIVE NEWS</p>
          <h2 id="news-title" className={styles.h2}>What shipped lately</h2>
        </div>
        <Link className={styles.greenLink} to="/changelog">Full changelog {'→'}</Link>
      </div>
      <ul className={styles.newsGrid}>
        {items.map((n) => (
          <li key={`${n.kind}-${n.title}`} className={styles.newsCard}>
            <div className={styles.newsTop}>
              <span className={`${styles.type} ${n.kind === 'Release' ? styles.typeRelease : styles.typeBlog}`}>{n.kind}</span>
              <time className={styles.newsDate} dateTime={n.date.slice(0, 10)}>{shortMonthDay(n.date)}</time>
            </div>
            <h3 className={styles.newsTitle}>{n.title}</h3>
            <p className={styles.newsText}>{n.summary}</p>
            {n.external ? (
              <a className={styles.newsLink} href={n.href} target="_blank" rel="noopener noreferrer" title={longDate(n.date)}>
                {n.label} {'→'}<span className={styles.srOnly}> (opens in a new tab)</span>
              </a>
            ) : (
              <Link className={styles.newsLink} to={n.href}>{n.label} {'→'}</Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

interface Way {
  emoji: string;
  title: string;
  bullets: string[];
  links: { label: string; href: string; external?: boolean }[];
}

const WAYS: Way[] = [
  {
    emoji: '\u{1F4BB}',
    title: 'Code',
    bullets: ['Pick a good first issue', 'Fix bugs and add features', 'Review open pull requests'],
    links: [
      { label: 'GitHub', href: 'https://github.com/recodehive', external: true },
      { label: 'Good first issues', href: ISSUES, external: true },
    ],
  },
  {
    emoji: '\u{1F4DD}',
    title: 'Docs and blogs',
    bullets: ['Improve a tutorial', 'Write a technical blog', 'Translate content'],
    links: [
      { label: 'Getting started', href: '/docs/how-to-contribute-to-blogs' },
      { label: 'Blogs', href: '/blogs' },
    ],
  },
  {
    emoji: '\u{1F91D}',
    title: 'Community',
    bullets: ['Welcome newcomers', 'Answer questions', 'Share resources'],
    links: [
      { label: 'Discord', href: DISCORD, external: true },
      { label: 'WhatsApp', href: WHATSAPP, external: true },
    ],
  },
  {
    emoji: '\u{1F680}',
    title: 'Get started',
    bullets: ['Introduce yourself', 'Set up the repo locally', 'Make your first PR'],
    links: [{ label: 'First-time setup', href: '/docs/first-time-setup' }],
  },
];

export function Ways() {
  return (
    <section className={styles.block} aria-labelledby="ways-title">
      <p className={styles.eyebrow}>{'✦'} GET INVOLVED</p>
      <h2 id="ways-title" className={styles.h2}>Four ways to contribute</h2>
      <ul className={styles.ways}>
        {WAYS.map((w) => (
          <li key={w.title} className={styles.way}>
            <span className={styles.wayIcon} aria-hidden="true">{w.emoji}</span>
            <h3 className={styles.wayTitle}>{w.title}</h3>
            <ul className={styles.bullets}>{w.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            <div className={styles.wayLinks}>
              {w.links.map((l) =>
                l.external ? (
                  <a key={l.label} className={styles.pillLink} href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.label}<span className={styles.srOnly}> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link key={l.label} className={styles.pillLink} to={l.href}>{l.label}</Link>
                ),
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function YourTurn() {
  return (
    <section className={styles.turn} aria-labelledby="turn-title">
      <div>
        <p className={styles.turnEyebrow}>{'✦'} YOUR TURN</p>
        <h2 id="turn-title" className={styles.turnTitle}>Every hexagon in the hive started with one PR.</h2>
        <p className={styles.turnText}>Set up the repo in 10 minutes, then pick a good first issue.</p>
      </div>
      <div className={styles.turnBtns}>
        <Link className={styles.btnGhost} to="/docs/first-time-setup">First-time setup {'↗'}</Link>
        <a className={styles.btnWhite} href={ISSUES} target="_blank" rel="noopener noreferrer">
          Good first issues {'→'}<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
