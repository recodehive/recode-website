import React from 'react';
import Link from '@docusaurus/Link';
import { BLOG_CHANGELOG } from '../../data/blogChangelog';
import { categoryOf, formatDate, hasTag, type Post } from './blogData';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Byline, Pills, PostCard, SideItem, Thumb } from './PostCard';
import styles from './blogsPage.module.css';

const REPO = 'https://github.com/recodehive/recode-website';
export const PAGE_SIZE = 12;

export function Spotlight({ posts }: { posts: Post[] }) {
  const picks = posts.filter((p) => hasTag(p, ['big-data'])).slice(0, 2);
  if (picks.length === 0) return null;
  const [lead, second] = picks;
  return (
    <section className={styles.spotlight} aria-labelledby="spotlight-title">
      <div className={styles.spotHead}>
        <div>
          <p className={styles.mono}>TOPIC SPOTLIGHT</p>
          <h2 id="spotlight-title" className={styles.h2}>Big data at scale</h2>
        </div>
        <Link className={styles.greenLink} to="/blog/tags/big-data">All Big Data posts {'→'}</Link>
      </div>
      <div className={styles.spotGrid}>
        <article className={`${styles.spotCard} ${styles.spotLead}`}>
          <Thumb post={lead} className={styles.spotThumb} />
          <div className={styles.spotBody}>
            <p className={styles.category}>{categoryOf(lead)}</p>
            <h3 className={styles.spotTitle}><Link to={lead.permalink} className={styles.stretched}>{lead.title}</Link></h3>
            <p className={styles.excerpt}>{lead.description}</p>
            <Pills post={lead} />
            <Byline post={lead} stacked />
          </div>
        </article>
        {second && (
          <article className={`${styles.spotCard} ${styles.spotText}`}>
            <p className={styles.category}>{categoryOf(second)}</p>
            <h3 className={styles.spotTitleSm}><Link to={second.permalink} className={styles.stretched}>{second.title}</Link></h3>
            <p className={styles.excerpt}>{second.description}</p>
            <Pills post={second} />
            <Byline post={second} stacked />
          </article>
        )}
      </div>
    </section>
  );
}

interface LatestProps {
  posts: Post[];
  page: number;
  onPage: (n: number) => void;
}

export function Latest({ posts, page, onPage }: LatestProps) {
  const pages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const start = posts.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, posts.length);
  const slice = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <section id="latest" className={styles.latest} aria-labelledby="latest-title">
      <p className={styles.mono}>EXPLORE ARTICLES</p>
      <div className={styles.rule} />
      <div className={styles.latestHead}>
        <h2 id="latest-title" className={styles.h2}>Latest</h2>
        <Link className={styles.greenLink} to="/blog">View all {'→'}</Link>
      </div>
      {slice.length === 0 ? (
        <p className={styles.empty}>No articles match your search. Try a different word or topic.</p>
      ) : (
        <div className={styles.cards}>{slice.map((p) => <PostCard key={p.id} post={p} />)}</div>
      )}
      <nav className={styles.pager} aria-label="Pagination">
        <p>Showing {start} - {end} of {posts.length} posts</p>
        {pages > 1 && (
          <div className={styles.pagerBtns}>
            <button type="button" disabled={page === 1} onClick={() => onPage(page - 1)}>Previous</button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button key={n} type="button" aria-current={n === page ? 'page' : undefined} className={n === page ? styles.pagerOn : ''} onClick={() => onPage(n)}>{n}</button>
            ))}
            <button type="button" disabled={page === pages} onClick={() => onPage(page + 1)}>Next</button>
          </div>
        )}
      </nav>
    </section>
  );
}

/** The featured image fills the space above the text and may crop, so it should be a picture without text. */
function FeaturedImage({ post }: { post: Post }) {
  const src = useBaseUrl(post.image ?? '');
  if (!post.image) return <div className={styles.featFallback}>{post.tags[0]?.label ?? 'Article'}</div>;
  return <img className={styles.featImg} src={src} alt={post.title} width={1600} height={900} loading="lazy" />;
}

export function Featured({ posts, total, onBackToAll }: { posts: Post[]; total: number; onBackToAll: () => void }) {
  if (posts.length === 0) return null;
  const main = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.id !== main.id);
  // Other editor picks first, then the newest posts.
  const sides = [...rest.filter((p) => p.featured), ...rest.filter((p) => !p.featured)].slice(0, 3);
  return (
    <section className={styles.featured} aria-labelledby="featured-title">
      <div className={styles.rule} />
      <div className={styles.featHead}>
        <h2 id="featured-title" className={styles.h2}>Featured</h2>
        <p className={styles.mono}>EDITOR&rsquo;S PICK</p>
      </div>
      <div className={styles.featGrid}>
        <article className={styles.featMain}>
          <FeaturedImage post={main} />
          <div className={styles.featBody}>
            <p className={styles.category}>{categoryOf(main)}</p>
            <h3 className={styles.featTitle}><Link to={main.permalink} className={styles.stretched}>{main.title}</Link></h3>
            <p className={`${styles.excerpt} ${styles.clamp2}`}>{main.description}</p>
            <Pills post={main} max={5} />
            <div className={styles.cardFoot}>
              <Byline post={main} />
              <span className={styles.readLink} aria-hidden="true">Read {'→'}</span>
            </div>
          </div>
        </article>
        <div className={styles.featSide}>
          {sides.map((p) => <SideItem key={p.id} post={p} />)}
          <button type="button" className={styles.greenLinkBtn} onClick={onBackToAll}>Back to all articles {'↑'}</button>
          <span className={styles.srOnly}>{total} articles in total</span>
        </div>
      </div>
    </section>
  );
}

export function ChangelogStrip({ posts }: { posts: Post[] }) {
  const items = BLOG_CHANGELOG.slice(0, 4);
  const permalinkOf = (folder?: string) => posts.find((p) => p.folder === folder)?.permalink;
  return (
    <section className={styles.changelog} aria-labelledby="changelog-title">
      <div className={styles.clHead}>
        <h2 id="changelog-title" className={styles.clTitle}>Changelog</h2>
        <a className={styles.clAll} href="https://www.recodehive.com/changelog" target="_blank" rel="noopener noreferrer">
          View all changes {'›'}<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </div>
      <ol className={styles.timeline}>
        <span className={styles.tlLine} aria-hidden="true" />
        {items.map((e, i) => {
          const link = permalinkOf(e.post);
          return (
            <li key={e.title} className={styles.tlItem}>
              <span className={`${styles.tlDot} ${i === 0 ? styles.tlDotNew : ''}`} style={{ animationDelay: `${0.3 + i * 0.45}s` }} aria-hidden="true" />
              <h3 className={styles.tlName}>{link ? <Link to={link}>{e.title}</Link> : e.title}</h3>
              <p className={styles.tlText}>{e.summary}</p>
              <p className={styles.tlMeta}>
                <time dateTime={e.date}>{formatDate(e.date)}</time>
              </p>
              <p className={styles.tlPrs}>
                {e.prs.map((n, k) => (
                  <React.Fragment key={n}>
                    {k > 0 && ', '}
                    <a href={`${REPO}/pull/${n}`} target="_blank" rel="noopener noreferrer">#{n}</a>
                  </React.Fragment>
                ))}{' '}
                <span>@{e.author}</span>
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function WriteBanner() {
  return (
    <section className={styles.write} aria-labelledby="write-title">
      <div>
        <p className={styles.writeEyebrow}>{'✦'} WRITE FOR THE HIVE</p>
        <h2 id="write-title" className={styles.writeTitle}>Write technical blogs on recode hive and get featured.</h2>
        <p className={styles.writeText}>Share what you built or learned. The strongest posts get the Featured spot on this page.</p>
      </div>
      <div className={styles.writeBtns}>
        <a className={styles.btnGhost} href="https://www.recodehive.com/docs/Getting-Started" target="_blank" rel="noopener noreferrer">
          Getting started {'↗'}<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
        <a className={styles.btnWhite} href="https://www.recodehive.com/docs/first-time-setup" target="_blank" rel="noopener noreferrer">
          First-time setup {'→'}<span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
