import React from 'react';
import Link from '@docusaurus/Link';
import { Search } from 'lucide-react';
import { openSearch } from '../navbar/search';
import { useBlogData } from './useBlogData';
import styles from './blogPost.module.css';

const dateFmt = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export function RecentPosts({ permalink }: { permalink: string }) {
  const { recent } = useBlogData(permalink);
  if (recent.length === 0) return null;
  return (
    <section aria-labelledby="recent-title">
      <p id="recent-title" className={styles.sideLabel}>RECENT POSTS</p>
      <ul className={styles.recent}>
        {recent.map((p) => (
          <li key={p.id}>
            <Link to={p.permalink}>
              <strong>{p.title}</strong>
              <time dateTime={p.date}>{dateFmt(p.date)}</time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function LeftSidebar({ permalink, mainTag }: { permalink: string; mainTag: string | null }) {
  const { topics } = useBlogData(permalink);
  return (
    <aside className={styles.left} aria-label="Blog sidebar">
      <button type="button" className={styles.searchBox} onClick={openSearch}>
        <Search size={15} aria-hidden="true" /> Search the blog
      </button>
      {topics.length > 0 && (
        <section aria-labelledby="topics-title">
          <p id="topics-title" className={styles.sideLabel}>TOPICS</p>
          <div className={styles.topics}>
            {topics.map((t) => (
              <Link key={t.label} to={t.permalink} className={`${styles.topic} ${t.label === mainTag ? styles.topicOn : ''}`}>{t.label}</Link>
            ))}
          </div>
        </section>
      )}
      <RecentPosts permalink={permalink} />
    </aside>
  );
}
