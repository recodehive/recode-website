import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { Clock, Link2, Linkedin } from 'lucide-react';
import type { TocItem } from './ContentsCard';
import { noEmoji } from './emoji';
import styles from './blogPost.module.css';

const SITE = 'https://www.recodehive.com';
const GENERIC = new Set(['overview', 'introduction', 'intro', 'resources', 'conclusion', 'final verdict', 'summary']);
const MAX_TAGS = 4;

const XMark = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const plain = (html: string) => noEmoji(html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")).trim();

/** The "what you'll learn" list: frontmatter `learn`, else the H2 headings without generic ones. */
export function learnItems(toc: readonly TocItem[], learn: unknown): string[] {
  if (Array.isArray(learn)) return learn.map(String).filter(Boolean);
  return toc.filter((t) => t.level === 2).map((t) => plain(t.value)).filter((v) => v && !GENERIC.has(v.toLowerCase()));
}

export function useShare(url: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const t = document.createElement('textarea');
      t.value = url;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return { copied, copy };
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const { copied, copy } = useShare(url);
  return (
    <div className={styles.actions}>
      <button type="button" className={`${styles.actBtn} ${copied ? styles.actCopied : ''}`} onClick={() => void copy()}>
        <Link2 size={14} aria-hidden="true" /> {copied ? 'Copied!' : 'Copy link'}
      </button>
      <a className={styles.actIcon} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener" aria-label="Share on LinkedIn (opens in a new tab)"><Linkedin size={15} aria-hidden="true" /></a>
      <a className={styles.actIcon} href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener" aria-label="Share on X (opens in a new tab)"><XMark /></a>
      <span className={styles.srOnly} role="status" aria-live="polite">{copied ? 'Link copied' : ''}</span>
    </div>
  );
}

const dateFmt = (d: string | Date) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export default function PostHeader({ toc }: { toc: readonly TocItem[] }) {
  const { metadata } = useBlogPost();
  const [allTags, setAllTags] = useState(false);
  const { title, tags, authors, permalink, date, readingTime, frontMatter } = metadata;
  const url = `${SITE}${permalink}`;
  const first = authors[0];
  const learn = learnItems(toc, (frontMatter as { learn?: unknown }).learn);
  const shown = allTags ? tags : tags.slice(0, MAX_TAGS);
  const extra = tags.length - MAX_TAGS;
  const avatar = first?.imageURL;
  const names = authors.map((a) => a.name).filter(Boolean).join(', ');

  return (
    <div className={styles.header}>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <Link to="/blogs">Blog</Link>
        {tags.slice(0, 2).map((t) => (
          <React.Fragment key={t.permalink}><span aria-hidden="true">/</span><Link to={t.permalink}>{t.label}</Link></React.Fragment>
        ))}
      </nav>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.authorRow}>
        <div className={styles.authorMeta}>
          {avatar && <img src={avatar} alt="" width={40} height={40} className={styles.avatar} />}
          <div>
            <strong>{names}</strong>
            {first?.title && <span>{first.title.replace(/^Founder at /, 'Founder, ')}</span>}
          </div>
          <span className={styles.metaText}>
            <i aria-hidden="true" />
            <time dateTime={new Date(date).toISOString()}>{dateFmt(date)}</time>
            {typeof readingTime === 'number' && (
              <>
                <i aria-hidden="true" />
                <Clock size={13} aria-hidden="true" /> {Math.max(1, Math.ceil(readingTime))} min read
              </>
            )}
          </span>
        </div>
        <ShareButtons url={url} title={title} />
      </div>

      {tags.length > 0 && (
        <ul className={styles.tags} aria-label="Tags">
          {shown.map((t) => <li key={t.permalink}><Link to={t.permalink}>{t.label}</Link></li>)}
          {!allTags && extra > 0 && (
            <li><button type="button" onClick={() => setAllTags(true)} aria-label={`Show ${extra} more tags`}>+{extra}</button></li>
          )}
        </ul>
      )}

      {learn.length >= 2 && (
        <section className={styles.learn} aria-labelledby="learn-title">
          <p id="learn-title">WHAT YOU&apos;LL LEARN</p>
          <ul>
            {learn.map((l) => <li key={l}><span aria-hidden="true">{'→'}</span> {l}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
}
