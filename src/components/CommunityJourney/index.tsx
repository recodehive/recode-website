import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type Line = { kind: 'cmd' | 'out' | 'ok' | 'comment' | 'cursor'; text?: string; tag?: string };
type Step = { n: string; title: string; desc: string; dir: string; cta: string; href: string; lines: Line[] };

const INTERVAL = 5000;

const GOOD_FIRST_ISSUES =
  'https://github.com/recodehive/recode-website/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22';

const STEPS: Step[] = [
  {
    n: '01', title: 'Learn', desc: 'Docs and video courses, free and beginner friendly.',
    dir: 'learn', cta: 'Get started', href: '/docs',
    lines: [
      { kind: 'cmd', text: 'open https://www.recodehive.com/docs' },
      { kind: 'ok', text: 'Docs ready: Git, GitHub, SQL, Docker' },
      { kind: 'cmd', text: 'open courses --free' },
      { kind: 'ok', text: 'Video courses unlocked' },
      { kind: 'comment', text: '# next: find your first issue' },
      { kind: 'cursor' },
    ],
  },
  {
    n: '02', title: 'Contribute', desc: 'Pick a good first issue and open a pull request.',
    dir: 'recode-website', cta: 'Browse good first issues', href: GOOD_FIRST_ISSUES,
    lines: [
      { kind: 'cmd', text: 'gh issue list --label "good first issue"' },
      { kind: 'out', tag: '#412', text: 'Add SQL joins tutorial' },
      { kind: 'out', tag: '#398', text: 'Improve Docker intro docs' },
      { kind: 'cmd', text: 'git checkout -b fix/docker-intro' },
      { kind: 'cmd', text: 'gh pr create --fill' },
      { kind: 'ok', text: 'Pull request opened, review requested' },
    ],
  },
  {
    n: '03', title: 'Share', desc: 'Publish a tutorial on the recode hive blog.',
    dir: 'recode-website', cta: 'Contribute a tutorial', href: '/docs/Getting-Started',
    lines: [
      { kind: 'cmd', text: 'git checkout -b blog/my-first-tutorial' },
      { kind: 'cmd', text: 'code blog/my-first-tutorial.md' },
      { kind: 'comment', text: '# write, add a cover, add tags' },
      { kind: 'cmd', text: 'gh pr create --title "Blog: my first tutorial"' },
      { kind: 'ok', text: 'Reviewed and published on /blogs' },
      { kind: 'cursor' },
    ],
  },
  {
    n: '04', title: 'Lead', desc: 'Review pull requests and help maintain projects.',
    dir: 'recode-website', cta: 'Become a maintainer', href: '/docs/GitHub/Maintainer-guide/github-labels',
    lines: [
      { kind: 'cmd', text: 'gh pr list --search "review-requested:@me"' },
      { kind: 'out', tag: '#421', text: 'Add SQL joins tutorial' },
      { kind: 'cmd', text: 'gh pr review 421 --approve -b "Nice work!"' },
      { kind: 'cmd', text: 'gh pr merge 421 --squash' },
      { kind: 'ok', text: 'You helped a new contributor ship' },
      { kind: 'cursor' },
    ],
  },
];

function TermLine({ line, index }: { line: Line; index: number }) {
  const style = { animationDelay: `${index * 0.65}s` };
  switch (line.kind) {
    case 'cmd':
      return <div className={styles.line} style={style}><span className={styles.prompt}>$</span> <span className={styles.cmd}>{line.text}</span></div>;
    case 'out':
      return <div className={styles.line} style={style}><span className={styles.comment}>{line.tag}</span> <span className={styles.out}>{line.text}</span></div>;
    case 'ok':
      return <div className={styles.line} style={style}><span className={styles.ok}>✓</span> <span className={styles.out}>{line.text}</span></div>;
    case 'comment':
      return <div className={styles.line} style={style}><span className={styles.comment}>{line.text}</span></div>;
    default:
      return <div className={styles.line} style={style}><span className={styles.prompt}>$</span> <span className={styles.cursor} aria-hidden="true" /></div>;
  }
}

type Props = {
  steps?: Step[];
  firstIssueUrl?: string;
  communityUrl?: string;
  founderUrl?: string;
  avatarSrc?: string;
};

export default function CommunityJourney({
  steps = STEPS,
  firstIssueUrl = GOOD_FIRST_ISSUES,
  communityUrl = 'https://discord.gg/dh3TA8U55Q',
  founderUrl = 'https://www.sanjaykv.com/',
  avatarSrc = '/img/memoji.png',
}: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [cycle, setCycle] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const avatarUrl = useBaseUrl(avatarSrc);

  // Respect reduced motion: no auto-advance, no typing animation
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Auto-advance every 5s; restarts whenever the step changes or the user resumes
  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [active, paused, reduced, cycle, steps.length]);

  const select = (i: number, focus = false) => {
    setActive(i);
    setCycle((c) => c + 1);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const last = steps.length - 1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select(i === last ? 0 : i + 1, true); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select(i === 0 ? last : i - 1, true); }
    if (e.key === 'Home') { e.preventDefault(); select(0, true); }
    if (e.key === 'End') { e.preventDefault(); select(last, true); }
  };

  const resume = () => { setPaused(false); setCycle((c) => c + 1); };
  const step = steps[active];

  return (
    <section className={styles.section} aria-labelledby="journey-heading">
      <div className="rh-container">
        <div className={styles.band}>
          <div className={styles.grid} aria-hidden="true" />
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.inner}>
            <div className={styles.head}>
              <div className={styles.headText}>
                <p className={styles.path}>~/community/your-path</p>
                <h2 id="journey-heading" className={styles.title}>
                  From first commit to <span className={styles.accent}>maintainer</span>.
                </h2>
                <p className={styles.sub}>recode hive is built by its contributors. This is how people grow here, one step at a time.</p>
              </div>
              <div className={styles.actions}>
                <a className={styles.btnPrimary} href={firstIssueUrl} target="_blank" rel="noopener noreferrer">
                  Find a good first issue <span aria-hidden="true">→</span>
                </a>
                <a className={styles.btnGhost} href={communityUrl} target="_blank" rel="noopener noreferrer">Join the community</a>
              </div>
            </div>

            <div
              className={styles.body}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={resume}
              onFocus={() => setPaused(true)}
              onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) resume(); }}
            >
              <div role="tablist" aria-label="Contributor path" aria-orientation="vertical" className={styles.tabs}>
                {steps.map((s, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={s.n}
                      ref={(el) => { tabRefs.current[i] = el; }}
                      type="button"
                      role="tab"
                      id={`journey-tab-${i}`}
                      aria-selected={on}
                      aria-controls="journey-panel"
                      tabIndex={on ? 0 : -1}
                      className={`${styles.tab} ${on ? styles.tabOn : ''}`}
                      onClick={() => select(i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                    >
                      <span className={styles.tabN}>{s.n}</span>
                      <span className={styles.tabText}>
                        <span className={styles.tabT}>{s.title}</span>
                        <span className={styles.tabD}>{s.desc}</span>
                      </span>
                      {on && !reduced && (
                        <span key={`${active}-${cycle}`} className={styles.bar} style={{ animationPlayState: paused ? 'paused' : 'running' }} aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className={styles.termCol}>
                <div className={styles.term} id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${active}`}>
                  <div className={styles.termBar}>
                    <span className={styles.dot} style={{ background: '#f87171' }} aria-hidden="true" />
                    <span className={styles.dot} style={{ background: '#fbbf24' }} aria-hidden="true" />
                    <span className={styles.dot} style={{ background: '#34d399' }} aria-hidden="true" />
                    <span className={styles.termTitle}>you@recodehive: ~/{step.dir}</span>
                  </div>
                  {/* key forces a remount so the typing animation restarts on every step change */}
                  <div key={active} className={styles.termBody}>
                    {step.lines.map((l, i) => <TermLine key={i} line={l} index={i} />)}
                  </div>
                </div>
                <Link className={styles.stepLink} to={step.href}>{step.cta} →</Link>
              </div>
            </div>

            <div className={styles.credit}>
              <img src={avatarUrl} alt="" className={styles.creditAvatar} />
              <span>Started by <Link to={founderUrl} className={styles.creditLink}>Sanjay Viswanathan</Link>. Grown by every contributor who opened a pull request.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
