import React from 'react';
import Link from '@docusaurus/Link';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { BookOpen, Github, Pencil } from 'lucide-react';
import { AuthorCard, Comments, Helpful, PostCard } from '../blogPost/EndOfPost';
import { ShareButtons } from '../blogPost/PostHeader';
import { DOCS_IMPROVE_TEXT, MAINTAINER } from '../../data/docFooter';
import styles from '../blogPost/blogPost.module.css';

const SITE = 'https://www.recodehive.com';
const CONTRIBUTING = 'https://github.com/recodehive/recode-website/blob/main/CONTRIBUTING.md';
const PAGER_LABELS = { newer: 'PREVIOUS', older: 'NEXT' };

/** The end of every docs page, laid out like the end of a blog post. */
export default function DocFooter(): React.ReactElement {
  const { metadata, frontMatter } = useDoc();
  const { tags, title, permalink, editUrl, previous, next } = metadata;
  // Pages whose content is capped at 760px ask for a footer of the same width
  const width = (frontMatter as { footer_width?: string }).footer_width;
  const widthClass = width === 'narrow' ? styles.docEndNarrow : width === 'narrow-start' ? styles.docEndNarrowStart : '';
  return (
    <div className={`${styles.docEnd} ${widthClass}`}>
      {tags.length > 0 && (
        <div className={styles.endTags}>
          <span>TAGGED</span>
          <ul>{tags.map((t) => <li key={t.permalink}><Link to={t.permalink}>{t.label}</Link></li>)}</ul>
        </div>
      )}
      <div className={styles.shareBar}>
        <strong>Share this page</strong>
        <ShareButtons url={`${SITE}${permalink}`} title={title} />
      </div>
      <AuthorCard author={MAINTAINER} label="MAINTAINED BY" />
      <Helpful slug={permalink} event="docs_feedback" hint="Your vote helps us improve our docs." />
      <section className={styles.improve} aria-label="Improve this page">
        <span className={styles.improveIcon} aria-hidden="true"><Pencil size={18} /></span>
        <div>
          <strong>Improve this page</strong>
          <p>{DOCS_IMPROVE_TEXT}</p>
          <div className={styles.authorBtns}>
            {editUrl && <a className={styles.btnDark} href={editUrl} target="_blank" rel="noopener"><Github size={14} aria-hidden="true" /> Edit on GitHub</a>}
            <a className={styles.btnOutline} href={CONTRIBUTING} target="_blank" rel="noopener"><BookOpen size={14} aria-hidden="true" /> Contributing guidelines</a>
          </div>
        </div>
      </section>
      <Comments />
      {(previous || next) && (
        <nav className={styles.pagers} aria-label="Docs pages">
          {previous ? <PostCard item={previous} dir="newer" labels={PAGER_LABELS} /> : <span />}
          {next ? <PostCard item={next} dir="older" labels={PAGER_LABELS} /> : <span />}
        </nav>
      )}
    </div>
  );
}
