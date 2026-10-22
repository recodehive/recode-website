import React, { useEffect, useMemo, useRef, useState } from 'react';
import { noEmoji } from './emoji';
import styles from './blogPost.module.css';

export interface TocItem {
  value: string;
  id: string;
  level: number;
}

/** Percent of the article that has been scrolled through (0 to 100), measured on the article, not the page. */
function useArticleProgress(articleId: string): number {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.getElementById(articleId) ?? document.querySelector('article');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setPct(total <= 0 ? 100 : Math.max(0, Math.min(100, Math.round((-r.top / total) * 100))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [articleId]);
  return pct;
}

/** The id of the heading being read: the last one whose top has passed the reading line. */
function useActiveHeading(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  const idsKey = ids.join('|');
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => Boolean(e));
    if (els.length === 0) return;
    const pick = () => {
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= 120) current = el.id;
      }
      setActive(current);
    };
    pick();
    // The observer fires whenever a heading crosses the top band, which is when the active heading can change
    const io = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(pick, { rootMargin: '-90px 0px -60% 0px', threshold: [0, 1] });
    els.forEach((el) => io?.observe(el));
    window.addEventListener('scroll', pick, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', pick);
    };
    // eslint-disable-next-line
  }, [idsKey]);
  return active;
}

interface Props {
  toc: readonly TocItem[];
  articleId: string;
  /** "card" is the right column on blog posts, "bar" is the sticky "On this page" bar on small ones, "docs" is the card for docs and learn pages. */
  variant: 'card' | 'bar' | 'docs';
}

export default function ContentsCard({ toc, articleId, variant }: Props) {
  const items = useMemo(() => toc.filter((t) => t.level === 2 || t.level === 3), [toc]);
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const pct = useArticleProgress(articleId);
  const active = useActiveHeading(ids);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  // The H2 group that holds the active item, so only its H3s are expanded
  const activeIdx = items.findIndex((i) => i.id === active);
  let groupStart = -1;
  for (let i = activeIdx; i >= 0; i--) {
    if (items[i].level === 2) {
      groupStart = i;
      break;
    }
  }
  const passed = new Set(items.slice(0, Math.max(0, activeIdx)).map((i) => i.id));

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
    setOpen(false);
  };

  // Keep the active item visible when the list scrolls inside the card
  useEffect(() => {
    listRef.current?.querySelector('[aria-current="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (items.length === 0) return null;

  const list = (
    <nav aria-label="On this page">
      <ul ref={listRef} className={styles.tocList}>
        {items.map((it, i) => {
          if (it.level === 3) {
            // collapsed unless it sits under the section being read
            let parent = -1;
            for (let k = i; k >= 0; k--) {
              if (items[k].level === 2) {
                parent = k;
                break;
              }
            }
            if (parent !== groupStart) return null;
          }
          const isActive = it.id === active;
          return (
            <li key={it.id} className={it.level === 3 ? styles.tocSub : ''}>
              <a
                href={`#${it.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`${styles.tocLink} ${isActive ? styles.tocActive : ''} ${passed.has(it.id) ? styles.tocPassed : ''}`}
                onClick={(e) => go(e, it.id)}
              >
                <span className={styles.tocDot} aria-hidden="true" />
                <span dangerouslySetInnerHTML={{ __html: noEmoji(it.value) }} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  const bar = (
    <div className={styles.progress} role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
      <span style={{ width: `${pct}%` }} />
    </div>
  );

  if (variant === 'bar') {
    return (
      <div className={styles.tocBar}>
        <button type="button" className={styles.tocBarBtn} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <strong>On this page</strong>
          <span className={styles.mono}>{pct}% read</span>
        </button>
        {bar}
        {open && <div className={styles.tocBarList}>{list}</div>}
      </div>
    );
  }

  if (variant === 'docs') {
    return (
      <div className={styles.tocVars}>
        <div className={styles.tocCard}>
          <div className={styles.tocHead}>
            <strong>Contents</strong>
            <span className={styles.mono}>{pct}% read</span>
          </div>
          {bar}
          {list}
        </div>
      </div>
    );
  }

  return (
    <aside className={styles.right} aria-label="Contents">
      <div className={styles.tocCard}>
        <div className={styles.tocHead}>
          <strong>Contents</strong>
          <span className={styles.mono}>{pct}% read</span>
        </div>
        {bar}
        {list}
      </div>
    </aside>
  );
}
