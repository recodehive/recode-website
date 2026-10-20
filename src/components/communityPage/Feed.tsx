import React, { useMemo, useState } from 'react';
import { LINKEDIN_POSTS, type LinkedInPost } from '../../data/community/linkedinPosts';
import { getFreshPrs, longDate } from './communityData';
import styles from './community.module.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/sanjay-k-v/';
const X_URL = 'https://x.com/nomadbrainsdev';
const REPO = 'https://github.com/recodehive/recode-website';

function Skeleton() {
  return (
    <div className={styles.skel} aria-hidden="true">
      <div className={styles.skelHead}>
        <span className={styles.skelAvatar} />
        <span className={styles.liPill}><b>in</b> LinkedIn</span>
      </div>
      <span className={styles.skelLine} style={{ width: '72%' }} />
      <span className={styles.skelLine} style={{ width: '92%' }} />
      <span className={styles.skelLine} style={{ width: '60%' }} />
    </div>
  );
}

function Embed({ post, n }: { post: LinkedInPost; n: number }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <article className={styles.postCard} aria-busy={!loaded}>
      {!loaded && <Skeleton />}
      <iframe
        className={styles.embed}
        style={{ opacity: loaded ? 1 : 0 }}
        src={`https://www.linkedin.com/embed/feed/update/${post.embedUrn}`}
        title={`LinkedIn post ${n}`}
        height={480}
        loading="lazy"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
      <a className={styles.viewLink} href={post.url} target="_blank" rel="noopener noreferrer">
        View on LinkedIn {'↗'}<span className={styles.srOnly}> (opens in a new tab)</span>
      </a>
    </article>
  );
}

export function TopPosts() {
  const [tab, setTab] = useState<'top' | 'new'>('top');
  const list = useMemo(() => {
    const byNew = [...LINKEDIN_POSTS].sort((a, b) => b.addedOn.localeCompare(a.addedOn));
    return tab === 'new' ? byNew : [...byNew.filter((p) => p.pinned), ...byNew.filter((p) => !p.pinned)];
  }, [tab]);

  return (
    <section aria-labelledby="posts-title">
      <div className={styles.sectionHead}>
        <h2 id="posts-title" className={styles.h2}>Top posts</h2>
        <div className={styles.segmented} role="tablist" aria-label="Post order">
          <button type="button" role="tab" aria-selected={tab === 'top'} className={`${styles.segment} ${tab === 'top' ? styles.segmentOn : ''}`} onClick={() => setTab('top')}>Top posts</button>
          <button type="button" role="tab" aria-selected={tab === 'new'} className={`${styles.segment} ${tab === 'new' ? styles.segmentOn : ''}`} onClick={() => setTab('new')}>Newest</button>
        </div>
      </div>
      <p className={styles.liveNote}>
        <b>in</b> Live from LinkedIn: public posts that mention @sanjay-k-v, newest first.
      </p>
      {list.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Posts from LinkedIn will appear here</p>
          <p>Follow along on LinkedIn or X in the meantime.</p>
        </div>
      ) : (
        <div className={styles.posts}>{list.map((p, i) => <Embed key={p.embedUrn} post={p} n={i + 1} />)}</div>
      )}
      <div className={styles.follow}>
        <a className={styles.btnOutlineSm} href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          <b className={styles.liMark}>in</b> Follow on LinkedIn<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
        <a className={styles.btnOutlineSm} href={X_URL} target="_blank" rel="noopener noreferrer">
          <b>{'\u{1D54F}'}</b> Follow on X<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}

export function FreshFromGithub() {
  const prs = getFreshPrs();
  if (prs.length === 0) return null;
  return (
    <section aria-labelledby="prs-title">
      <div className={styles.sectionHead}>
        <h2 id="prs-title" className={styles.h2}>Fresh from GitHub</h2>
        <a className={styles.greenLink} href={`${REPO}/pulls?q=is%3Apr+is%3Amerged`} target="_blank" rel="noopener noreferrer">
          All merged PRs {'→'}<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </div>
      <ul className={styles.prList}>
        {prs.map((p) => (
          <li key={p.number}>
            <a className={styles.prRow} href={p.url} target="_blank" rel="noopener noreferrer">
              <span className={styles.prIcon} aria-hidden="true">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" focusable="false"><path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" /></svg>
              </span>
              <span className={styles.prText}>
                <span className={styles.prTitle}>{p.title}</span>
                <span className={styles.prMeta}>merged {p.version ? `· ${p.version} ` : ''}{'·'} {longDate(p.mergedAt)}</span>
              </span>
              <span className={styles.prRight}>
                <span className={styles.prAvatar} aria-hidden="true" title={p.author}>{p.author.slice(0, 2).toUpperCase()}</span>
                <span className={styles.prNum}>#{p.number}</span>
              </span>
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
