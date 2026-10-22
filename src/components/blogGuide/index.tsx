import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { Check, ChevronDown, Copy, ExternalLink, File, Folder, Image as ImageIcon, X } from 'lucide-react';
import s from './BlogGuide.module.css';

/* ---------- Phase highlight state, shared by the phase cards and the step cards ---------- */

interface Phase {
  kicker: string;
  name: string;
  sub: string;
  from: number;
  to: number;
}

const PHASES: Phase[] = [
  { kicker: 'Phase 1 · Steps 1 to 2', name: 'Plan', sub: 'Get your topic approved', from: 1, to: 2 },
  { kicker: 'Phase 2 · Steps 3 to 8', name: 'Write', sub: 'Create the post and its images', from: 3, to: 8 },
  { kicker: 'Phase 3 · Steps 9 to 11', name: 'Publish', sub: 'Preview and open a pull request', from: 9, to: 11 },
];

const PhaseContext = createContext<{ active: number | null; setActive: (i: number | null) => void }>({
  active: null,
  setActive: () => undefined,
});

/** The root of the page. Every style in the module is scoped under this class. */
export function BlogGuide({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <PhaseContext.Provider value={{ active, setActive }}>
      <div className={s.blogGuide}>{children}</div>
    </PhaseContext.Provider>
  );
}

/* ---------- Page top ---------- */

export function Hero() {
  return (
    <header className={s.hero}>
      <p className={s.eyebrow}>✦ Contributor guide · Blogs</p>
      <h1 className={s.title}>Write for recode hive: publish your first blog post</h1>
      <p className={s.intro}>
        From idea to published post in 11 steps. We care about quality over quantity: real experience, real
        screenshots, and clear writing.
      </p>
      <ul className={s.chips}>
        <li>⏱ 2 to 4 hours, mostly writing</li>
        <li>11 steps</li>
        <li>Reviewed by maintainers</li>
      </ul>
    </header>
  );
}

export function BeforeYouStart() {
  return (
    <section aria-labelledby="before-you-start">
      <h3 id="before-you-start" className={s.sectionTitle}>Before you start</h3>
      <div className={s.twoCol}>
        <div className={s.panel}>
          <p className={s.panelLabel}>You need</p>
          <ul>
            <li>Node.js 18 or higher, Git and VS Code</li>
            <li>
              The project running locally. Not yet? Follow the{' '}
              <Link to="/docs/first-time-setup">First-time setup guide</Link> first.
            </li>
            <li>A topic you have real experience with</li>
          </ul>
        </div>
        <div className={`${s.panel} ${s.panelSoft}`}>
          <p className={s.panelLabel}>What gets a post accepted</p>
          <ul>
            <li>An assigned issue before you start</li>
            <li>Your own screenshots and lessons</li>
            <li>A summary at the top and a FAQ at the end</li>
            <li>5 external and 5 internal links</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Phases() {
  const { active, setActive } = useContext(PhaseContext);
  return (
    <div className={s.phases}>
      {PHASES.map((p, i) => (
        <button
          key={p.name}
          type="button"
          className={`${s.phase} ${active === i ? s.phaseOn : ''}`}
          aria-pressed={active === i}
          onClick={() => setActive(active === i ? null : i)}
        >
          <span className={s.phaseKicker}>{p.kicker}</span>
          <span className={s.phaseName}>{p.name}</span>
          <span className={s.phaseSub}>{p.sub}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- Step card. The heading stays Markdown inside, so the contents list picks it up ---------- */

export function Step({ n, time, last, children }: { n: number; time: string; last?: boolean; children: React.ReactNode }) {
  const { active } = useContext(PhaseContext);
  const inPhase = active !== null && n >= PHASES[active].from && n <= PHASES[active].to;
  const dim = active !== null && !inPhase;
  return (
    <div className={`${s.step} ${last ? s.stepLast : ''} ${dim ? s.stepDim : ''}`}>
      <div className={`${s.num} ${inPhase ? s.numOn : ''}`} aria-hidden="true">{n}</div>
      <div className={s.card}>
        <span className={s.time}>{time}</span>
        {children}
      </div>
    </div>
  );
}

/** A plain card for the sections that are not numbered steps. The heading stays Markdown inside. */
export function Block({ children }: { children: React.ReactNode }) {
  return <div className={s.block}>{children}</div>;
}

/* ---------- Shared pieces ---------- */

export function Cmd({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const t = document.createElement('textarea');
      t.value = code;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={s.cmd}>
      <div className={s.cmdBar}>
        <span className={s.cmdLabel}>{lang}</span>
        <button type="button" className={s.cmdCopy} onClick={() => void copy()} aria-label={`Copy the ${lang.toLowerCase()} code`}>
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <span className={s.srOnly} role="status" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
      </div>
      <pre className={s.cmdBody}>{code}</pre>
    </div>
  );
}

export function DoDont({ do: doItems, dont }: { do: string[]; dont: string[] }) {
  return (
    <div className={s.dodont}>
      <div className={s.do}>
        <p className={s.doLabel}>Do</p>
        <ul>
          {doItems.map((t) => (
            <li key={t}>
              <span className={s.icoOk} aria-hidden="true"><Check size={12} strokeWidth={3} /></span>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.dont}>
        <p className={s.dontLabel}>Don&apos;t</p>
        <ul>
          {dont.map((t) => (
            <li key={t}>
              <span className={s.icoNo} aria-hidden="true"><X size={12} strokeWidth={3} /></span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function OpenButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <p>
      <a className={s.openBtn} href={href} target="_blank" rel="noopener noreferrer">
        {children} <ExternalLink size={14} aria-hidden="true" />
      </a>
    </p>
  );
}

interface TreeItem {
  name: string;
  depth: number;
  type: 'dir' | 'file';
  note?: string;
  main?: boolean;
}

export function FileTree({ items }: { items: TreeItem[] }) {
  return (
    <div className={s.tree} role="img" aria-label={`Folder structure: ${items.map((i) => i.name).join(', ')}`}>
      {items.map((it) => (
        <div key={`${it.depth}-${it.name}`} className={`${s.treeRow} ${it.main ? s.treeMain : ''}`} style={{ paddingLeft: it.depth * 20 }}>
          {it.type === 'dir' ? <Folder size={14} aria-hidden="true" /> : <File size={14} aria-hidden="true" />}
          {it.name}
          {it.note && <span className={s.treeNote}>{it.note}</span>}
        </div>
      ))}
    </div>
  );
}

export function Pane({ children }: { label: string; children: React.ReactNode }) {
  return <div className={s.tableWrap}>{children}</div>;
}

/** Small segmented tabs. Each child is a <Pane label="...">. */
export function Tabs2({ children }: { children: React.ReactNode }) {
  const panes = React.Children.toArray(children).filter(React.isValidElement) as React.ReactElement<{ label: string }>[];
  const [i, setI] = useState(0);
  const id = useId();
  return (
    <div>
      <div className={s.segs} role="tablist">
        {panes.map((p, idx) => (
          <button
            key={p.props.label}
            type="button"
            role="tab"
            id={`${id}-t${idx}`}
            aria-selected={i === idx}
            aria-controls={`${id}-p${idx}`}
            className={`${s.seg} ${i === idx ? s.segOn : ''}`}
            onClick={() => setI(idx)}
          >
            {p.props.label}
          </button>
        ))}
      </div>
      {panes.map((p, idx) => (
        <div key={p.props.label} role="tabpanel" id={`${id}-p${idx}`} aria-labelledby={`${id}-t${idx}`} hidden={i !== idx}>
          {p}
        </div>
      ))}
    </div>
  );
}

export function RequiredParts({ items }: { items: { title: string; text: React.ReactNode }[] }) {
  return (
    <ol className={s.parts}>
      {items.map((it, idx) => (
        <li key={it.title} className={s.part}>
          <span className={s.partNum} aria-hidden="true">{idx + 1}</span>
          <span>
            <span className={s.partTitle}>{it.title}</span>
            <span className={s.partText}>{it.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function SpecTiles({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className={s.tiles}>
      {items.map((it) => (
        <div key={it.label} className={s.tile}>
          <span className={s.tileValue}>{it.value}</span>
          <span className={s.tileLabel}>{it.label}</span>
        </div>
      ))}
    </div>
  );
}

export function NameExamples({ good, bad }: { good: string; bad: string }) {
  return (
    <div className={s.names}>
      <span className={s.nameGood}><Check size={13} aria-hidden="true" /> <span className={s.srOnly}>Good: </span>{good}</span>
      <span className={s.nameBad}><X size={13} aria-hidden="true" /> <span className={s.srOnly}>Bad: </span>{bad}</span>
    </div>
  );
}

export function Callout({ children }: { type?: 'tip'; children: React.ReactNode }) {
  return <div className={s.callout}>{children}</div>;
}

/** A dashed button that opens its children. Closed by default, so nothing inside loads until it is opened. */
export function Reveal({ label, icon, children }: { label: string; icon?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={s.toggle}>
      <button type="button" className={s.toggleBtn} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {icon && <ImageIcon size={14} aria-hidden="true" />}
        {label}
        <ChevronDown size={14} className={s.chev} aria-hidden="true" />
      </button>
      {open && <div id={id} className={s.togglePanel}>{children}</div>}
    </div>
  );
}

/** The image plugin can hand back an object instead of a URL, so dig the URL out of whatever arrives. */
function imageUrl(value: unknown, depth = 0): string {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && depth < 4) {
    const v = value as { default?: unknown; src?: unknown };
    return imageUrl(v.default ?? v.src, depth + 1);
  }
  return '';
}

export function ScreenshotToggle({ label, src, alt }: { label: string; src: unknown; alt: string }) {
  return (
    <Reveal label={label} icon>
      <img src={imageUrl(src)} alt={alt} loading="lazy" decoding="async" />
    </Reveal>
  );
}

/* ---------- Final checklist ---------- */

const STORAGE_KEY = 'recodehive.blogGuide.v1';

const CHECKS = [
  'Issue is assigned to me',
  'Working on a new branch, not main',
  'Frontmatter filled in, no placeholders left',
  'Summary and truncate marker at the top',
  'FAQ section at the end',
  '5 external and 5 internal links',
  'Images named, compressed and with alt text',
  'Post added to src/database/blogs/index.tsx',
  'Previewed on localhost with no errors',
  'Pull request links the issue',
];

export function Checklist() {
  const [done, setDone] = useState<boolean[]>(() => CHECKS.map(() => false));

  // Read only after mount, so the server render and the first client render match
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved: unknown = JSON.parse(raw);
      if (Array.isArray(saved)) setDone(CHECKS.map((_, i) => saved[i] === true));
    } catch {
      /* storage blocked or corrupt: start with an empty list */
    }
  }, []);

  const toggle = (i: number) => {
    setDone((prev) => {
      const next = prev.map((v, idx) => (idx === i ? !v : v));
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ticks just will not be remembered */
      }
      return next;
    });
  };

  const count = done.filter(Boolean).length;
  return (
    <div>
      <div className={s.ckHead}>
        <span className={s.ckCount} role="status">{count} of {CHECKS.length} done</span>
      </div>
      <div className={s.bar} aria-hidden="true">
        <div className={s.barFill} style={{ width: `${(count / CHECKS.length) * 100}%` }} />
      </div>
      <div className={s.ckGrid}>
        {CHECKS.map((label, i) => (
          <button
            key={label}
            type="button"
            className={`${s.ckItem} ${done[i] ? s.ckItemOn : ''}`}
            aria-pressed={done[i]}
            onClick={() => toggle(i)}
          >
            <span className={s.ckBox} aria-hidden="true">{done[i] && <Check size={12} strokeWidth={3} />}</span>
            {label}
          </button>
        ))}
      </div>
      {count === CHECKS.length && <p className={s.ready} role="status">🎉 Ready to open your pull request.</p>}
    </div>
  );
}

/** The old version of the guide, kept below the new one. */
export function Legacy({ children }: { children: React.ReactNode }) {
  return (
    <details className={s.legacy}>
      <summary>Previous version of this guide</summary>
      {children}
    </details>
  );
}
