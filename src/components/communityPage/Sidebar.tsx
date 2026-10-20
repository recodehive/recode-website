import React from 'react';
import Link from '@docusaurus/Link';
import { thumbnail } from '../../data/broadcasts';
import { useLatestTalks, useUpcomingEvents } from './communityData';
import styles from './community.module.css';

const HOST_URL = 'https://github.com/recodehive/recode-website/issues/new';
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Reads the calendar day from the string itself so the date never shifts with the visitor's time zone. */
function parts(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return { month: MONTHS[m - 1], day: d, weekday: DAYS[date.getUTCDay()] };
}

const ORG_CLASS = { GitHub: 'orgGh', Microsoft: 'orgMs', 'recode hive': 'orgRh' } as const;

export function Events() {
  const events = useUpcomingEvents();
  const hasOwn = events.some((e) => e.org === 'recode hive');
  return (
    <section className={styles.card} aria-labelledby="events-title">
      <h2 id="events-title" className={styles.cardTitle}>Upcoming events</h2>
      <p className={styles.cardSub}>recode hive sessions first, then picks from GitHub&rsquo;s event calendar.</p>
      {!hasOwn && (
        <p className={styles.hostNote}>
          No recode hive session scheduled yet.
          <a href={HOST_URL} target="_blank" rel="noopener noreferrer">Host one {'→'}<span className={styles.srOnly}> (opens in a new tab)</span></a>
        </p>
      )}
      {events.length === 0 ? (
        <p className={styles.cardSub}>No upcoming events right now.</p>
      ) : (
        <ul className={styles.events}>
          {events.map((e) => {
            const p = parts(e.start);
            return (
              <li key={`${e.title}-${e.start}`}>
                <a className={styles.event} href={e.url} target="_blank" rel="noopener noreferrer">
                  <span className={styles.dateBlock} aria-hidden="true">
                    <span className={styles.dateMonth}>{p.month}</span>
                    <span className={styles.dateDay}>{p.day}</span>
                    <span className={styles.dateWk}>{p.weekday}</span>
                  </span>
                  <span className={styles.eventText}>
                    <span className={styles.eventTitle}>{e.title}</span>
                    <span className={styles.eventMeta}>
                      <span className={`${styles.org} ${styles[ORG_CLASS[e.org]]}`}>{e.org}</span>
                      <span>{e.where}</span>
                    </span>
                    <span className={styles.srOnly}> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
      <a className={styles.btnOutlineSm} href="https://github.com/resources/events" target="_blank" rel="noopener noreferrer">
        View all GitHub events {'↗'}<span className={styles.srOnly}> (opens in a new tab)</span>
      </a>
    </section>
  );
}

export function Talks() {
  const talks = useLatestTalks();
  return (
    <section className={styles.card} aria-labelledby="talks-title">
      <div className={styles.cardHead}>
        <h2 id="talks-title" className={styles.cardTitle}>Latest talks</h2>
        <Link className={styles.greenLink} to="/broadcasts/">All {'→'}</Link>
      </div>
      <p className={styles.cardSub}>From the recode hive YouTube channel.</p>
      <ul className={styles.talks}>
        {talks.map((t) => (
          <li key={t.id}>
            <Link className={styles.talk} to="/broadcasts/">
              <span className={styles.talkThumb}>
                <img src={thumbnail(t.youtubeId)} alt="" width={112} height={63} loading="lazy" />
                <span className={styles.talkPlay} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16" focusable="false"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                </span>
              </span>
              <span className={styles.talkText}>
                <span className={styles.talkTitle}>{t.title}</span>
                <span className={styles.talkBy}>recode hive</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Guidelines() {
  return (
    <Link className={styles.guidelines} to="/code-of-conduct">
      <span className={styles.guideIcon} aria-hidden="true">{'\u{1F4DC}'}</span>
      <span>
        <strong>Community guidelines</strong>
        <span>Read our Code of Conduct</span>
      </span>
      <span className={styles.guideArrow} aria-hidden="true">{'›'}</span>
    </Link>
  );
}
