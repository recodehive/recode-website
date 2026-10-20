import React, { useMemo, useState } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { ArrowRight, Database, GitBranch, Hexagon, Plug } from 'lucide-react';
import {
  GOOD_FIRST_ISSUES, NOTIFY_URL, allLessons, comingSoon, coursePath, courses,
  type Course,
} from '../data/learn';
import { usePublished } from './usePublished';
import styles from './learn.module.css';

const ICONS = { git: GitBranch, api: Plug } as const;

const matches = (c: Course, q: string) =>
  !q ||
  `${c.title} ${c.description} ${allLessons(c).map((l) => l.title).join(' ')}`.toLowerCase().includes(q);

export default function Catalog() {
  const [q, setQ] = useState('');
  const [topic, setTopic] = useState<string>('all');
  const { published, courseIsLive } = usePublished();

  const topics = useMemo(() => {
    const all = [...courses.map((c) => c.topic), ...comingSoon.map((c) => c.topic)];
    return Array.from(new Set(all));
  }, []);

  const query = q.trim().toLowerCase();
  const shownCourses = courses.filter((c) => (topic === 'all' || c.topic === topic) && matches(c, query));
  const shownSoon = comingSoon.filter(
    (c) => (topic === 'all' || c.topic === topic) && (!query || `${c.title} ${c.description}`.toLowerCase().includes(query)),
  );
  const nothing = shownCourses.length === 0 && shownSoon.length === 0;
  const firstLive = courses.find(courseIsLive);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: courses.filter(courseIsLive).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Course',
        name: c.title,
        description: c.description,
        provider: { '@type': 'Organization', name: 'recodehive', sameAs: 'https://www.recodehive.com' },
      },
    })),
  };

  return (
    <div className={styles.page}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <header className={styles.catHead}>
        <p className={styles.eyebrow}>✦ RECODE HIVE LEARN</p>
        <h1 className={styles.h1}>Free developer courses, <span className={styles.accent}>no login</span></h1>
        <p className={styles.lead}>
          Short video lessons with written notes. Start with GitHub to ship your first pull request, then learn to test APIs with Postman.
        </p>
      </header>

      <div className={styles.toolbar}>
        <label className={styles.search}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <span className={styles.srOnly}>Search lessons</span>
          <input type="search" placeholder="Search lessons..." value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
        <div role="group" aria-label="Topic" className={styles.chips}>
          {['all', ...topics].map((t) => (
            <button key={t} type="button" aria-pressed={topic === t} className={`${styles.chip} ${topic === t ? styles.chipOn : ''}`} onClick={() => setTopic(t)}>
              {t === 'all' ? 'All' : t}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        <section className={styles.promo} aria-label="About Learn">
          <p className={styles.promoEyebrow}>✦ RECODE HIVE LEARN</p>
          <p className={styles.promoTitle}>
            <span>Free.</span>
            <span>No login.</span>
            <span className={styles.promoGreen}>No paywall.</span>
          </p>
          <ul className={styles.promoList}>
            <li>Watch every lesson without an account</li>
            <li>Written notes and commands under each video</li>
            <li>Practice on real recodehive issues</li>
          </ul>
          {firstLive && (
            <Link className={styles.promoBtn} to={coursePath(firstLive.slug)}>Start the GitHub course <ArrowRight size={16} aria-hidden="true" /></Link>
          )}
          <p className={styles.promoNote}>Made by the recodehive community</p>
        </section>

        {shownCourses.map((c) => {
          const Icon = ICONS[c.icon];
          const live = courseIsLive(c);
          const lessons = allLessons(c).length;
          const available = published(c).length;
          const body = (
            <>
              <div className={styles.cardTop}>
                <span className={`${styles.iconTile} ${c.icon === 'api' ? styles.iconOrange : ''}`} aria-hidden="true"><Icon size={20} /></span>
                <span className={styles.cardTags}>
                  {live ? <span className={styles.free}>FREE</span> : <span className={styles.soonLabel}>COMING SOON</span>}
                  <span className={styles.level}>{c.level}</span>
                </span>
              </div>
              <h2 className={styles.cardTitle}>{c.title}</h2>
              <p className={styles.cardDesc}>{c.description}</p>
              <p className={styles.cardMeta}><span>{c.topic}</span></p>
              <div className={styles.cardFoot}>
                <span className={styles.count}>
                  <b>{c.modules.length} modules</b> · {lessons} lessons{live && available < lessons ? ` (${available} ready)` : ''}
                </span>
                {live ? <span className={styles.start}>Start <ArrowRight size={14} aria-hidden="true" /></span> : <a className={styles.notify} href={NOTIFY_URL} target="_blank" rel="noopener noreferrer">Notify me</a>}
              </div>
            </>
          );
          return live ? (
            <Link key={c.slug} to={coursePath(c.slug)} className={`${styles.card} ${styles.cardLink}`}>{body}</Link>
          ) : (
            <article key={c.slug} className={`${styles.card} ${styles.cardSoon}`}>{body}</article>
          );
        })}

        {shownSoon.map((c) => (
          <article key={c.title} className={`${styles.card} ${styles.cardSoon}`}>
            <div className={styles.cardTop}>
              <span className={styles.iconTile} aria-hidden="true">{c.topic === 'Databases' ? <Database size={20} /> : <Hexagon size={20} />}</span>
              <span className={styles.soonLabel}>COMING SOON</span>
            </div>
            <h2 className={styles.cardTitle}>{c.title}</h2>
            <p className={styles.cardDesc}>{c.description}</p>
            <div className={styles.cardFoot}>
              <a className={styles.notify} href={NOTIFY_URL} target="_blank" rel="noopener noreferrer">Notify me</a>
            </div>
          </article>
        ))}

        {nothing && <p className={styles.empty}>No lessons match your search. Try another word or clear the filter.</p>}
      </div>

      <section className={styles.path} aria-label="Suggested path">
        <span className={styles.pathLabel}>SUGGESTED PATH</span>
        <ol className={styles.pathList}>
          <li><span className={styles.pathNum}>1</span><span><b>GitHub for Beginners</b><br />Ship your first pull request</span></li>
          <li><span className={styles.pathNum}>2</span><span><b>Postman API Testing</b><br />Test the APIs you build</span></li>
          <li><span className={`${styles.pathNum} ${styles.pathNumDark}`}>3</span><span><b>Contribute to recodehive</b><br /><a href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">Pick a good first issue</a></span></li>
        </ol>
      </section>
    </div>
  );
}
