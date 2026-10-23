import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';
import { ArrowLeft, ArrowRight, BookOpen, Github, Linkedin, Pencil } from 'lucide-react';
import GiscusComments from '../giscus';
import { ShareButtons } from './PostHeader';
import { githubHandle } from './authorUtils';
import styles from './blogPost.module.css';

const SITE = 'https://www.recodehive.com';
const CONTRIBUTING = 'https://github.com/recodehive/recode-website/blob/main/CONTRIBUTING.md';

/** The author fields the card reads. A blog post author fits this, and so does the docs maintainer. */
export interface FooterAuthor {
  name?: string;
  imageURL?: string;
  key?: string;
  url?: string;
  title?: string;
  description?: string;
  socials?: unknown;
}

function linkedinUrl(a: FooterAuthor): string | null {
  const l = (a.socials as Record<string, string> | undefined)?.linkedin;
  if (!l) return null;
  return /^https?:\/\//i.test(l) ? l : `https://www.linkedin.com/in/${l}`;
}

export function AuthorCard({ author, label = 'WRITTEN BY' }: { author: FooterAuthor; label?: string }) {
  const handle = githubHandle(author);
  const profiles = usePluginData('developer-profiles') as { handles?: string[] } | undefined;
  // Link to the recode hive profile when that page exists, otherwise to the author's GitHub
  const hasProfile = Boolean(handle && profiles?.handles?.includes(handle));
  const li = linkedinUrl(author);
  const bio = author.description ?? author.title;
  return (
    <section className={styles.authorCard} aria-label={`About ${author.name}`}>
      {author.imageURL && <img src={author.imageURL} alt="" width={72} height={72} className={styles.authorImg} loading="lazy" />}
      <div className={styles.authorBody}>
        <p className={styles.writtenBy}>{label}</p>
        <h3>{author.name}</h3>
        {handle && <p className={styles.handle}>@{handle}</p>}
        {bio && <p className={styles.bio}>{bio}</p>}
        <div className={styles.authorBtns}>
          {handle && hasProfile && <Link className={styles.btnGreen} to={`/u/${handle}`}>View profile <ArrowRight size={14} aria-hidden="true" /></Link>}
          {handle && !hasProfile && <a className={styles.btnGreen} href={`https://github.com/${handle}`} target="_blank" rel="noopener">View profile <ArrowRight size={14} aria-hidden="true" /></a>}
          {li && <a className={styles.btnOutline} href={li} target="_blank" rel="noopener"><Linkedin size={14} aria-hidden="true" /> Follow</a>}
        </div>
      </div>
    </section>
  );
}

export function Helpful({
  slug,
  event = 'blog_feedback',
  hint = 'Your vote helps us improve our posts.',
}: {
  slug: string;
  event?: string;
  hint?: string;
}) {
  const [voted, setVoted] = useState<'yes' | 'no' | null>(null);
  const vote = (value: 'yes' | 'no') => {
    setVoted(value);
    // The site already loads Google Analytics. Counts are never shown.
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    gtag?.('event', event, { slug, value });
  };
  return (
    <section className={styles.helpful} aria-label="Feedback">
      <div>
        <strong>Was this helpful?</strong>
        <p>{voted ? 'Thanks for the feedback.' : hint}</p>
      </div>
      <div className={styles.voteBtns}>
        <button type="button" onClick={() => vote('yes')} aria-pressed={voted === 'yes'} disabled={voted !== null}>{'\u{1F44D}'} Yes</button>
        <button type="button" onClick={() => vote('no')} aria-pressed={voted === 'no'} disabled={voted !== null}>{'\u{1F44E}'} No</button>
      </div>
    </section>
  );
}

/** Comments load only when they scroll into view. Space is reserved so the page does not jump. */
export function Comments() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        setShow(true);
        io.disconnect();
      }
    }, { rootMargin: '400px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className={styles.comments} aria-labelledby="comments-title">
      <div className={styles.commentsHead}>
        <h2 id="comments-title">Comments</h2>
        <span>Powered by GitHub Discussions</span>
      </div>
      <div className={styles.commentsBody}>{show && <GiscusComments forceRender />}</div>
    </section>
  );
}

export function PostCard({
  item,
  dir,
  labels = { newer: 'NEWER POST', older: 'OLDER POST' },
}: {
  item: { title: string; permalink: string };
  dir: 'newer' | 'older';
  labels?: { newer: string; older: string };
}) {
  return (
    <Link to={item.permalink} className={`${styles.pager} ${dir === 'older' ? styles.pagerOlder : ''}`}>
      <span>
        {dir === 'newer' && <ArrowLeft size={13} aria-hidden="true" />}
        {dir === 'newer' ? ` ${labels.newer}` : `${labels.older} `}
        {dir === 'older' && <ArrowRight size={13} aria-hidden="true" />}
      </span>
      <strong>{item.title}</strong>
    </Link>
  );
}

export default function EndOfPost({ adSlot }: { adSlot?: React.ReactNode }) {
  const { metadata } = useBlogPost();
  const { tags, authors, title, permalink, editUrl, nextItem, prevItem } = metadata;
  const url = `${SITE}${permalink}`;
  return (
    <>
      {adSlot}
      {tags.length > 0 && (
        <div className={styles.endTags}>
          <span>TAGGED</span>
          <ul>{tags.map((t) => <li key={t.permalink}><Link to={t.permalink}>{t.label}</Link></li>)}</ul>
        </div>
      )}
      <div className={styles.shareBar}>
        <strong>Share this article</strong>
        <ShareButtons url={url} title={title} />
      </div>
      {authors.map((a) => <AuthorCard key={a.key ?? a.name} author={a} />)}
      <Helpful slug={permalink} />
      <section className={styles.improve} aria-label="Improve this post">
        <span className={styles.improveIcon} aria-hidden="true"><Pencil size={18} /></span>
        <div>
          <strong>Improve this post</strong>
          <p>All our blog posts are open source. Found a typo, want to add detail or have a better explanation? Anyone can contribute.</p>
          <div className={styles.authorBtns}>
            {editUrl && <a className={styles.btnDark} href={editUrl} target="_blank" rel="noopener"><Github size={14} aria-hidden="true" /> Edit on GitHub</a>}
            <a className={styles.btnOutline} href={CONTRIBUTING} target="_blank" rel="noopener"><BookOpen size={14} aria-hidden="true" /> Contributing guidelines</a>
          </div>
        </div>
      </section>
      <Comments />
      {(prevItem || nextItem) && (
        <nav className={styles.pagers} aria-label="More posts">
          {prevItem ? <PostCard item={prevItem} dir="newer" /> : <span />}
          {nextItem ? <PostCard item={nextItem} dir="older" /> : <span />}
        </nav>
      )}
    </>
  );
}
