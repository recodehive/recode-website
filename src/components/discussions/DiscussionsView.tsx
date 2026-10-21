import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import { ChevronUp, MessageCircle, Search, X } from 'lucide-react';
import styles from './discussionsView.module.css';

const REPO_URL = 'https://github.com/recodehive/recode-website';
const DISCUSSIONS_URL = `${REPO_URL}/discussions`;
const NEW_URL = `${DISCUSSIONS_URL}/new`;
const GALAXY_BRAIN = 'https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png';
const TRENDING_DAYS = 14;

type Person = { login: string; avatarUrl: string } | null;
type Discussion = {
  number: number;
  title: string;
  url: string;
  excerpt: string;
  /** Sanitised HTML from GitHub. Empty when the post has no body. */
  bodyHtml?: string;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  pinned: boolean;
  category: { name: string; emoji: string; isAnswerable: boolean };
  answered: boolean;
  labels: string[];
  author: Person;
  replies: number;
  participants: Person[];
};
type Data = {
  ok: boolean;
  fetchedAt: string;
  categories: { name: string; emoji: string; isAnswerable: boolean }[];
  discussions: Discussion[];
};
type Tab = 'latest' | 'trending' | 'unanswered';
type Sort = 'upvotes' | 'newest' | 'replies';

function Reader({ d, now, onClose }: { d: Discussion; now: number; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const prev = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.modalRoot}>
      <div className={styles.backdrop} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div ref={ref} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="disc-title" tabIndex={-1}>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={16} aria-hidden="true" />
          </button>
          <div className={styles.meta}>
            <span className={`${styles.pill} ${categoryClass(d.category.name)}`}>
              <span aria-hidden="true">{d.category.emoji}</span> {d.category.name}
            </span>
            {d.labels.map((l) => (
              <span key={l} className={styles.label}>{l}</span>
            ))}
          </div>
          <h2 id="disc-title" className={styles.dialogTitle}>{d.title}</h2>
          <p className={styles.byline}>
            <Avatar person={d.author} size={22} />
            <strong>@{d.author?.login ?? 'ghost'}</strong>
            <span>opened {relative(d.createdAt, now)}</span>
            <span>{'\u00B7'} {d.upvotes} upvotes {'\u00B7'} {d.replies} replies</span>
          </p>
          {d.bodyHtml ? (
            <div className={styles.prose} dangerouslySetInnerHTML={{ __html: d.bodyHtml }} />
          ) : (
            <p className={styles.excerpt}>{d.excerpt || 'No description.'}</p>
          )}
          <div className={styles.dialogFoot}>
            <External href={d.url} className={styles.btnPrimary}>
              Reply or upvote on GitHub {'\u2197'}
            </External>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// "All" plus the four busiest categories, so the chips fit on one row.
const MAX_CATEGORY_CHIPS = 4;

const needsAnswer = (d: Discussion) => d.category.isAnswerable && !d.answered;
const trendScore = (d: Discussion) => d.upvotes + d.replies;

function relative(iso: string, now: number): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' });
}

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en', { month: 'short', day: 'numeric' });
}

function categoryClass(name: string): string {
  const n = name.toLowerCase();
  if (n === 'announcements') return styles.catAnnouncements;
  if (n === 'ideas') return styles.catIdeas;
  if (n === 'q&a') return styles.catQa;
  if (n === 'show and tell') return styles.catShow;
  return styles.catDefault;
}

const avatarSrc = (url: string) => `${url}${url.includes('?') ? '&' : '?'}s=48`;

function Avatar({ person, size }: { person: Person; size: number }) {
  if (!person) return null;
  return (
    <img
      className={styles.avatar}
      src={avatarSrc(person.avatarUrl)}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size }}
    />
  );
}

function External({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span className={styles.sr}> (opens in a new tab)</span>
    </a>
  );
}

export default function DiscussionsView() {
  const data = usePluginData('github-discussions') as Data | undefined;
  const all = data?.discussions ?? [];
  const now = useMemo(() => Date.now(), []);

  const [tab, setTab] = useState<Tab>('latest');
  const [category, setCategory] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort | null>(null);
  const [open, setOpen] = useState<Discussion | null>(null);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, { name: string; emoji: string; count: number }>();
    for (const d of all) {
      const cur = counts.get(d.category.name);
      if (cur) cur.count += 1;
      else counts.set(d.category.name, { name: d.category.name, emoji: d.category.emoji, count: 1 });
    }
    return [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [all]);

  const unansweredCount = useMemo(() => all.filter(needsAnswer).length, [all]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cutoff = now - TRENDING_DAYS * 86400000;
    let list = all.filter((d) => {
      if (tab === 'unanswered' && !needsAnswer(d)) return false;
      if (tab === 'trending' && new Date(d.updatedAt).getTime() < cutoff) return false;
      if (category !== 'all' && d.category.name !== category) return false;
      if (q) {
        const hay = [d.title, d.excerpt, d.author?.login ?? '', ...d.labels].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    const by = (cmp: (a: Discussion, b: Discussion) => number) => (a: Discussion, b: Discussion) =>
      Number(b.pinned) - Number(a.pinned) || cmp(a, b);
    const newest = (a: Discussion, b: Discussion) => +new Date(b.createdAt) - +new Date(a.createdAt);
    if (sort === 'upvotes') list = [...list].sort(by((a, b) => b.upvotes - a.upvotes || newest(a, b)));
    else if (sort === 'replies') list = [...list].sort(by((a, b) => b.replies - a.replies || newest(a, b)));
    else if (sort === 'newest') list = [...list].sort(by(newest));
    else if (tab === 'trending') list = [...list].sort(by((a, b) => trendScore(b) - trendScore(a) || newest(a, b)));
    else list = [...list].sort(by(newest));
    return list;
  }, [all, tab, category, query, sort, now]);

  const helpList = useMemo(
    () =>
      all
        .filter(needsAnswer)
        .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt))
        .slice(0, 3),
    [all],
  );

  const hasData = Boolean(data?.ok) && all.length > 0;

  return (
    <div className={styles.page}>
      {open && <Reader d={open} now={now} onClose={() => setOpen(null)} />}
      <header className={styles.header}>
        <div className={styles.headerText}>
          <p className={styles.eyebrow}>{'✦'} COMMUNITY DISCUSSIONS</p>
          <h1 className={styles.h1}>
            Ask, share and help <span className={styles.accent}>the hive</span>
          </h1>
          <p className={styles.lede}>
            Powered by GitHub Discussions. Every reply and upvote syncs with{' '}
            <External href="https://github.com/recodehive">github.com/recodehive</External>.
          </p>
          {data?.ok && <p className={styles.updated}>Updated {relative(data.fetchedAt, now)}</p>}
        </div>
        <div className={styles.headerActions}>
          <span className={styles.live}>
            <span className={styles.dot} aria-hidden="true" />
            Live from GitHub
          </span>
          <External href={DISCUSSIONS_URL} className={styles.btnOutline}>
            View on GitHub {'↗'}
          </External>
          <External href={NEW_URL} className={styles.btnPrimary}>
            + Start a discussion
          </External>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.segmented} role="tablist" aria-label="Discussion views">
          {(['latest', 'trending', 'unanswered'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              className={`${styles.segment} ${tab === t ? styles.segmentActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t[0].toUpperCase() + t.slice(1)}
              {t === 'unanswered' && unansweredCount > 0 && <span className={styles.countChip}>{unansweredCount}</span>}
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <Search size={16} aria-hidden="true" />
          <span className={styles.sr}>Search discussions</span>
          <input type="search" placeholder="Search discussions..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </label>
        <label className={styles.sort}>
          <span>Sort:</span>
          <select value={sort ?? 'newest'} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="upvotes">Most upvoted</option>
            <option value="newest">Newest</option>
            <option value="replies">Most replies</option>
          </select>
        </label>
      </div>

      <div className={styles.grid}>
        <div className={styles.listCol}>
          {hasData && (
            <div className={styles.chips} role="group" aria-label="Filter by category">
              <button
                type="button"
                aria-pressed={category === 'all'}
                className={`${styles.chip} ${category === 'all' ? styles.chipActive : ''}`}
                onClick={() => setCategory('all')}
              >
                {'\u{1F5C2}️'} All <span className={styles.chipCount}>{all.length}</span>
              </button>
              {categoryCounts.slice(0, MAX_CATEGORY_CHIPS).map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-pressed={category === c.name}
                  className={`${styles.chip} ${category === c.name ? styles.chipActive : ''}`}
                  onClick={() => setCategory(c.name)}
                >
                  <span aria-hidden="true">{c.emoji}</span> {c.name} <span className={styles.chipCount}>{c.count}</span>
                </button>
              ))}
            </div>
          )}

          <section className={styles.card} aria-label="Discussions">
            {rows.map((d) => (
              <article key={d.number} className={`${styles.row} ${d.pinned ? styles.rowPinned : ''}`}>
                <External href={d.url} className={styles.vote}>
                  <span className={styles.sr}>{`${d.upvotes} upvotes, upvote on GitHub`}</span>
                  <ChevronUp size={14} aria-hidden="true" />
                  <span aria-hidden="true" className={styles.voteNum}>{d.upvotes}</span>
                </External>
                <div className={styles.body}>
                  <div className={styles.meta}>
                    {d.pinned && <span className={styles.pinned}>{'\u{1F4CC}'} Pinned</span>}
                    <span className={`${styles.pill} ${categoryClass(d.category.name)}`}>
                      <span aria-hidden="true">{d.category.emoji}</span> {d.category.name}
                    </span>
                    {d.category.isAnswerable && (
                      <span className={`${styles.pill} ${d.answered ? styles.answered : styles.needs}`}>
                        {d.answered ? '✓ Answered' : 'Needs an answer'}
                      </span>
                    )}
                    {d.labels.map((l) => (
                      <span key={l} className={styles.label}>{l}</span>
                    ))}
                  </div>
                  <h2 className={styles.title}>
                    <button type="button" className={styles.titleBtn} onClick={() => setOpen(d)}>{d.title}</button>
                  </h2>
                  {d.excerpt && <p className={styles.excerpt} onClick={() => setOpen(d)}>{d.excerpt}</p>}
                  <p className={styles.byline}>
                    <Avatar person={d.author} size={22} />
                    <strong>@{d.author?.login ?? 'ghost'}</strong>
                    <span>opened {relative(d.createdAt, now)}</span>
                  </p>
                </div>
                <div className={styles.side}>
                  {d.participants.length > 0 && (
                    <span className={styles.stack} aria-hidden="true">
                      {d.participants.map((p) => (
                        <Avatar key={p!.login} person={p} size={24} />
                      ))}
                    </span>
                  )}
                  <span className={styles.replies}>
                    <MessageCircle size={14} aria-hidden="true" />
                    <span className={styles.sr}>Replies: </span>
                    {d.replies}
                  </span>
                </div>
              </article>
            ))}

            {rows.length === 0 && (
              <div className={styles.empty}>
                {hasData ? (
                  <>
                    <p className={styles.emptyTitle}>Nothing here yet.</p>
                    <External href={NEW_URL}>Start the first discussion {'↗'}</External>
                  </>
                ) : (
                  <>
                    <p className={styles.emptyTitle}>Discussions are not available right now.</p>
                    <External href={DISCUSSIONS_URL}>Browse discussions on GitHub {'↗'}</External>
                  </>
                )}
              </div>
            )}
          </section>

          <p className={styles.seeAll}>
            <External href={DISCUSSIONS_URL}>See all discussions on GitHub {'↗'}</External>
          </p>
        </div>

        <aside className={styles.rail} aria-label="Discussion sidebar">
          {hasData && (
            <section className={styles.railCard}>
              <h2 className={styles.railTitle}>Categories</h2>
              <ul className={styles.catList}>
                <li>
                  <button
                    type="button"
                    aria-pressed={category === 'all'}
                    className={`${styles.catRow} ${category === 'all' ? styles.catRowActive : ''}`}
                    onClick={() => setCategory('all')}
                  >
                    <span aria-hidden="true">{'\u{1F5C2}️'}</span>
                    <span className={styles.catName}>All</span>
                    <span className={styles.chipCount}>{all.length}</span>
                  </button>
                </li>
                {categoryCounts.slice(0, MAX_CATEGORY_CHIPS).map((c) => (
                  <li key={c.name}>
                    <button
                      type="button"
                      aria-pressed={category === c.name}
                      className={`${styles.catRow} ${category === c.name ? styles.catRowActive : ''}`}
                      onClick={() => setCategory(c.name)}
                    >
                      <span aria-hidden="true">{c.emoji}</span>
                      <span className={styles.catName}>{c.name}</span>
                      <span className={styles.chipCount}>{c.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {hasData && (
          <section className={styles.railCard}>
            <h2 className={styles.railTitle}>Help someone today</h2>
            {helpList.length > 0 ? (
              <ul className={styles.helpList}>
                {helpList.map((d) => (
                  <li key={d.number}>
                    <External href={d.url} className={styles.helpTitle}>{d.title}</External>
                    <span className={styles.helpMeta}>
                      @{d.author?.login ?? 'ghost'} {'·'} {shortDate(d.createdAt)} {'·'} {d.replies} {d.replies === 1 ? 'reply' : 'replies'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.railText}>
                Every question has an answer right now. <External href={NEW_URL}>Ask one {'↗'}</External>
              </p>
            )}
          </section>
          )}

          <section className={styles.galaxy}>
            <img src={GALAXY_BRAIN} alt="" width={56} height={56} loading="lazy" className={styles.badge} />
            <div>
              <p className={styles.galaxyEyebrow}>{'✦'} EARN A BADGE</p>
              <h2 className={styles.galaxyTitle}>Get 2 answers accepted to unlock Galaxy Brain</h2>
              <Link to="/badges/github-badges/" className={styles.galaxyLink}>See how it works {'→'}</Link>
            </div>
          </section>

          <section className={styles.railCard}>
            <h2 className={styles.railTitle}>Before you post</h2>
            <ol className={styles.tips}>
              <li>Search first, your question may already have an answer.</li>
              <li>Share code, errors and what you tried.</li>
              <li>Mark the reply that solved it as the answer.</li>
            </ol>
            <Link to="/code-of-conduct" className={styles.coc}>Code of Conduct {'→'}</Link>
          </section>
        </aside>
      </div>
    </div>
  );
}
