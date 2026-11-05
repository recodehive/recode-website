import React, { useState } from 'react';
import { Check, Copy, Play } from 'lucide-react';
import { useInView } from '../githubLesson/hooks';
import s from './CreateRepoLesson.module.css';

type Kids = { children?: React.ReactNode };

/** The root class of this page. Pass it to <SetupLesson className={...}> so the page's styles stay under it. */
export const rootClass = s.createRepo;

const ART_ROWS = [
  { file: 'README.md', msg: 'Initial commit' },
  { file: 'README.md', msg: 'Update README' },
  { file: 'resume.pdf', msg: 'Uploaded resume' },
];

/** A small repository page: the files appear one by one, then "3 commits" pops in. Decorative. */
export function RepoArt() {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <div className={`${s.art} ${seen ? s.play : ''}`} ref={ref}>
      <div className={s.artCard}>
        <div className={s.artHead}>
          <span>
            sanjay-kv / <b>Git-Demo</b>
          </span>
          <span className={s.artPill}>Public</span>
        </div>
        {ART_ROWS.map((r, i) => (
          <div key={r.msg} className={s.artRow} style={{ '--i': i } as React.CSSProperties}>
            <span className={s.artDot} />
            <span className={s.artFile}>{r.file}</span>
            <span className={s.artMsg}>{r.msg}</span>
          </div>
        ))}
      </div>
      <span className={s.artBadge}>✓ 3 commits</span>
    </div>
  );
}

/** The five moves of the lesson in one row. */
export function FlowChips({ steps = ['New repo', 'Edit README', 'Commit', 'Upload file'], done = 'Done ✓' }: { steps?: string[]; done?: string }) {
  return (
    <div className={s.flow} aria-label={`${steps.join(', then ')}, then done`}>
      {steps.map((label) => (
        <React.Fragment key={label}>
          <span className={s.chip}>{label}</span>
          <span className={s.arr} aria-hidden="true">→</span>
        </React.Fragment>
      ))}
      <span className={`${s.chip} ${s.chipDone}`}>{done}</span>
    </div>
  );
}

/** A row of prerequisite cards. Put <Prereq> cards inside. */
export function PrereqCards({ children }: Kids) {
  return <div className={s.prereqs}>{children}</div>;
}

export function Prereq({ icon, title, children }: Kids & { icon: string; title: string }) {
  return (
    <div className={s.prereq}>
      <span className={s.prIcon} aria-hidden="true">{icon}</span>
      <div>
        <strong className={s.prTitle}>{title}</strong>
        <div className={s.prText}>{children}</div>
      </div>
    </div>
  );
}

/** The public or private choice, as a switch with what each one means. */
export function VisibilityToggle() {
  const [mode, setMode] = useState<'public' | 'private'>('public');
  const isPublic = mode === 'public';
  return (
    <div className={s.vis}>
      <div className={s.visTop}>
        <span className={s.visLabel}>PUBLIC OR PRIVATE?</span>
        <div className={s.visSwitch} role="group" aria-label="Choose public or private">
          <button type="button" aria-pressed={isPublic} className={isPublic ? s.visOn : ''} onClick={() => setMode('public')}>
            <span aria-hidden="true">🌍</span> Public
          </button>
          <button type="button" aria-pressed={!isPublic} className={!isPublic ? s.visOn : ''} onClick={() => setMode('private')}>
            <span aria-hidden="true">🔒</span> Private
          </button>
        </div>
      </div>
      <div className={s.visPanel} aria-live="polite">
        {isPublic ? (
          <>
            <strong>Public: we use this for the tutorial</strong>
            <span>Anyone on the internet can see the repository. You still choose who can commit to it.</span>
          </>
        ) : (
          <>
            <strong>Private: only the people you choose</strong>
            <span>You choose who can see and commit to the repository. The project admin must grant access to other GitHub users, which is common in organizations.</span>
          </>
        )}
      </div>
    </div>
  );
}

export type Tour = { n: number; title: string; text: string };

/** Numbered cards that explain parts of a screenshot. The numbers match the ones drawn on the screenshot. */
export function TourCards({ items }: { items: Tour[] }) {
  return (
    <div className={s.tour}>
      {items.map((t) => (
        <div key={t.n} className={s.tourCard}>
          <span className={s.tourNum}>{t.n}</span>
          <strong>{t.title}</strong>
          <p>{t.text}</p>
        </div>
      ))}
    </div>
  );
}

export type Legend = { badge: string; text: string; mono?: boolean };

function renderPreview(code: string) {
  return code.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h3 key={i}>{line.slice(3)}</h3>;
    if (line.startsWith('# ')) return <h2 key={i}>{line.slice(2)}</h2>;
    if (!line.trim()) return null;
    return <p key={i}>{line}</p>;
  });
}

/** A Markdown file with a Code and a Preview tab, a copy button and a legend that explains the symbols. */
export function MarkdownTabs({ file, code, legend = [] }: { file: string; code: string; legend?: Legend[] }) {
  const [tab, setTab] = useState<'code' | 'preview'>('code');
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // The clipboard can be blocked. The code is still on screen to select.
    }
  };
  return (
    <div className={s.md}>
      <div className={s.mdTabs} role="tablist" aria-label="Markdown and preview">
        <button type="button" role="tab" aria-selected={tab === 'code'} className={tab === 'code' ? s.mdTabOn : ''} onClick={() => setTab('code')}>
          {file}
        </button>
        <button type="button" role="tab" aria-selected={tab === 'preview'} className={tab === 'preview' ? s.mdTabOn : ''} onClick={() => setTab('preview')}>
          Preview
        </button>
      </div>
      {tab === 'code' ? (
        <div className={s.mdCode} role="tabpanel">
          <div className={s.mdBar}>
            <span>{file}</span>
            <button type="button" onClick={copy} className={s.mdCopy}>
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre>{code}</pre>
        </div>
      ) : (
        <div className={s.mdPreview} role="tabpanel">{renderPreview(code)}</div>
      )}
      {legend.length > 0 && (
        <div className={s.legend}>
          {legend.map((l) => (
            <div key={l.badge} className={s.legendItem}>
              <code className={s.legendBadge}>{l.badge}</code>
              <span>{l.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** A small tag that names the repository the screenshots come from. */
export function DemoRepo({ repo }: { repo: string }) {
  return (
    <a className={s.demo} href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer">
      <span>DEMO REPOSITORY</span>
      <b>github.com/{repo}</b>
    </a>
  );
}

type VideoProps = { id: string; list?: string; title: string; channel?: string };

/** A video card that loads the player only when it is clicked, so the page stays light. */
export function VideoCard({ id, list, title, channel = 'recode hive on YouTube' }: VideoProps) {
  const [on, setOn] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${id}?${list ? `list=${list}&` : ''}autoplay=1`;
  if (on) {
    return (
      <div className={s.player}>
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <button type="button" className={s.video} onClick={() => setOn(true)} aria-label={`Play video: ${title}`}>
      <span className={s.videoPlay} aria-hidden="true"><Play size={20} fill="currentColor" /></span>
      <span className={s.videoText}>
        <strong>{title}</strong>
        <small>{channel}</small>
      </span>
    </button>
  );
}
