import React, { useMemo } from 'react';
import { Search } from 'lucide-react';
import { TOPICS, uniqueAuthors, type Post } from './blogData';
import { AuthorAvatar } from './PostCard';
import styles from './blogsPage.module.css';

const COLS = 32;
const ROWS = 5;

// Seeded so server and client agree. Levels rise toward the right.
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = Math.floor(i / ROWS);
  const row = i % ROWS;
  const noise = Math.abs(Math.sin((col + 1) * 12.9898 + (row + 3) * 78.233) * 43758.5453) % 1;
  const base = (col / (COLS - 1)) * 3.2;
  const level = Math.max(0, Math.min(4, Math.round(base + noise * 1.8 - 0.6)));
  return { level, pulse: i % 9 === 0 && level >= 3, delay: (i % 7) * 0.45 };
});

function GithubTile() {
  return (
    <a className={styles.ghTile} href="https://github.com/recodehive" target="_blank" rel="noopener noreferrer">
      <div className={styles.ghGrid} aria-hidden="true">
        {CELLS.map((c, i) => (
          <i key={i} className={`${styles[`lv${c.level}` as 'lv0']} ${c.pulse ? styles.cellPulse : ''}`} style={c.pulse ? { animationDelay: `${c.delay}s` } : undefined} />
        ))}
      </div>
      <p className={styles.ghLine}>
        <span className={styles.liveDot} aria-hidden="true" />
        github.com/recodehive
        <span className={styles.srOnly}> (opens in a new tab)</span>
      </p>
    </a>
  );
}

function AuthorsStrip({ posts }: { posts: Post[] }) {
  const authors = useMemo(() => uniqueAuthors(posts), [posts]);
  if (authors.length === 0) return null;
  return (
    <div className={styles.strip}>
      <ul className={styles.avatarRow} aria-label="Blog authors">
        {authors.map((a) => {
          const face = <AuthorAvatar author={a} size={30} />;
          return (
            <li key={a.key} className={styles.av}>
              {a.github ? (
                <a href={a.github} target="_blank" rel="noopener noreferrer" aria-label={`${a.name} on GitHub (opens in a new tab)`}>{face}</a>
              ) : (
                <span tabIndex={0} aria-label={a.name}>{face}</span>
              )}
              <span className={styles.tip} role="tooltip">{a.name}</span>
            </li>
          );
        })}
      </ul>
      <p className={styles.stripText}>
        <strong>{authors.length} authors</strong> have written {posts.length} posts
      </p>
      <a className={styles.stripLink} href="https://www.recodehive.com/docs/how-to-contribute-to-blogs" target="_blank" rel="noopener noreferrer">
        Become one {'→'}<span className={styles.srOnly}> (opens in a new tab)</span>
      </a>
    </div>
  );
}

interface Props {
  posts: Post[];
  query: string;
  onQuery: (q: string) => void;
  topic: string;
  onTopic: (label: string) => void;
}

export default function Hero({ posts, query, onQuery, topic, onTopic }: Props) {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGridBg} aria-hidden="true" />
      <div className={styles.heroText}>
        <p className={styles.eyebrow}>{'✦'} THE RECODE HIVE BLOG</p>
        <h1 className={styles.h1}>Engineering <span className={styles.accent}>uptime</span></h1>
        <p className={styles.subtitle}>blog by recode community.</p>
        <label className={styles.search}>
          <Search size={18} aria-hidden="true" />
          <span className={styles.srOnly}>Search tutorials, tools, or technologies</span>
          <input type="search" placeholder="Search tutorials, tools, or technologies" value={query} onChange={(e) => onQuery(e.target.value)} />
        </label>
        <div className={styles.chips} role="group" aria-label="Filter by topic">
          {['All', ...TOPICS.map((t) => t.label)].map((label) => (
            <button key={label} type="button" aria-pressed={topic === label} className={`${styles.chip} ${topic === label ? styles.chipOn : ''}`} onClick={() => onTopic(label)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.heroRight}>
        <GithubTile />
        <AuthorsStrip posts={posts} />
      </div>
    </header>
  );
}
