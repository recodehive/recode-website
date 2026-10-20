import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { categoryOf, formatDate, initials, tagText, type Post, type PostAuthor } from './blogData';
import styles from './blogsPage.module.css';

const PILLS = ['pillGreen', 'pillTeal', 'pillOrange', 'pillBlue', 'pillRose'] as const;
const pillClass = (label: string): string => {
  let h = 0;
  for (let i = 0; i < label.length; i++) h = label.charCodeAt(i) + ((h << 5) - h);
  return styles[PILLS[Math.abs(h) % PILLS.length]];
};

export function Pills({ post, max = 3 }: { post: Post; max?: number }) {
  if (post.tags.length === 0) return null;
  return (
    <ul className={styles.pills} aria-label="Tags">
      {post.tags.slice(0, max).map((t) => (
        <li key={t.permalink} className={`${styles.pill} ${pillClass(t.label)}`}>
          <i aria-hidden="true" />{tagText(t.label)}
        </li>
      ))}
    </ul>
  );
}

export function AuthorAvatar({ author, size }: { author: PostAuthor; size: number }) {
  if (author.imageURL) {
    return <img className={styles.avatar} src={author.imageURL} alt="" width={size} height={size} loading="lazy" style={{ width: size, height: size }} />;
  }
  return (
    <span className={styles.avatarFallback} style={{ width: size, height: size, fontSize: size * 0.36 }} aria-hidden="true">
      {initials(author.name)}
    </span>
  );
}

/** 16:9 frame. The whole banner stays visible (object-fit: contain), so banner text is never cropped. */
export function Thumb({ post, className = '' }: { post: Post; className?: string }) {
  const src = useBaseUrl(post.image ?? '');
  const tag = post.tags[0] ? tagText(post.tags[0].label) : 'Article';
  return (
    <div className={`${styles.thumb} ${className}`}>
      {post.image ? (
        <img src={src} alt={post.title} width={1600} height={900} loading="lazy" />
      ) : (
        <span className={styles.thumbFallback}>{tag}</span>
      )}
    </div>
  );
}

export function Byline({ post, stacked = false }: { post: Post; stacked?: boolean }) {
  const first = post.authors[0];
  return (
    <div className={`${styles.byline} ${stacked ? styles.bylineStacked : ''}`}>
      {first && <AuthorAvatar author={first} size={32} />}
      <span className={styles.bylineText}>
        <strong>{post.authors.map((a) => a.name).join(', ') || 'recode hive'}</strong>
        <span>{formatDate(post.date)} {'·'} {post.readingTime} min read</span>
      </span>
    </div>
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className={styles.card}>
      <Thumb post={post} />
      <div className={styles.cardBody}>
        <p className={styles.category}>{categoryOf(post)}</p>
        <h3 className={styles.cardTitle}>
          <Link to={post.permalink} className={styles.stretched}>{post.title}</Link>
        </h3>
        <p className={styles.excerpt}>{post.description}</p>
        <Pills post={post} />
        <div className={styles.cardFoot}>
          <Byline post={post} />
          <span className={styles.readLink} aria-hidden="true">Read {'→'}</span>
        </div>
      </div>
    </article>
  );
}

export function SideItem({ post }: { post: Post }) {
  return (
    <article className={styles.side}>
      <Thumb post={post} className={styles.sideThumb} />
      <div>
        <p className={styles.category}>{categoryOf(post)}</p>
        <h3 className={styles.sideTitle}>
          <Link to={post.permalink} className={styles.stretched}>{post.title}</Link>
        </h3>
        <Pills post={post} max={2} />
        <p className={styles.sideMeta}>{post.authors[0]?.name} {'·'} {formatDate(post.date)} {'·'} {post.readingTime} min read</p>
      </div>
    </article>
  );
}
