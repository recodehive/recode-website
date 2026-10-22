import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { TOTAL, reducedMotion, useSetup } from './state';
import s from './SetupGuide.module.css';

const NEXT = [
  { title: 'Make your first pull request', sub: 'How to contribute, step by step', to: '/docs/GitHub/GitHub-basics/first-opensource-code', external: false },
  { title: 'Pick a good first issue', sub: 'Beginner-friendly tasks on GitHub', to: 'https://github.com/recodehive/recode-website/issues?q=is%3Aissue+state%3Aopen+label%3A%22good+first+issue%22', external: true },
  { title: 'Write a blog post', sub: 'How to contribute to blogs', to: '/docs/how-to-contribute-to-blogs', external: false },
];

const COLORS = ['#86efac', '#4cc184', '#fde68a', '#f9a8d4', '#a5b4fc'];
const PIECES = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2;
  const dist = 110 + (i % 5) * 34;
  return {
    dx: Math.round(Math.cos(angle) * dist),
    dy: Math.round(Math.sin(angle) * dist * 0.8 - 40),
    rot: (i * 47) % 360,
    color: COLORS[i % COLORS.length],
    delay: (i % 7) * 30,
  };
});

export function Finish() {
  const { done, hydrated } = useSetup();
  const complete = done.size >= TOTAL;
  const [burst, setBurst] = useState(false);
  const prev = useRef<boolean | null>(null);

  // One confetti burst when the last step is ticked during this visit, never on page load
  useEffect(() => {
    if (!hydrated) return;
    let t: number | undefined;
    if (prev.current === false && complete && !reducedMotion()) {
      setBurst(true);
      t = window.setTimeout(() => setBurst(false), 2600);
    }
    prev.current = complete;
    return () => window.clearTimeout(t);
  }, [hydrated, complete]);

  return (
    <section className={`${s.finish} ${complete ? s.finishOn : ''}`} aria-live="polite">
      {burst && (
        <span className={s.confetti} aria-hidden="true">
          {PIECES.map((p, i) => (
            <i
              key={i}
              style={{ '--dx': `${p.dx}px`, '--dy': `${p.dy}px`, '--rot': `${p.rot}deg`, '--c': p.color, animationDelay: `${p.delay}ms` } as React.CSSProperties}
            />
          ))}
        </span>
      )}
      <span className={s.finishEmoji} aria-hidden="true">{'🎉'}</span>
      {complete ? (
        <>
          <h2 className={s.finishTitle}>You are running recode hive locally!</h2>
          <p className={s.finishText}>Next, make a pull request to share a change with the project. Pick where to go from here.</p>
        </>
      ) : (
        <>
          <h2 className={s.finishTitle}>Finish all 10 steps to unlock this</h2>
          <p className={s.finishText}>Tick each step as you complete it. Your progress is saved in this browser.</p>
        </>
      )}
      <ul className={s.nextGrid}>
        {NEXT.map((n) => (
          <li key={n.title}>
            {n.external ? (
              <a href={n.to} className={s.nextCard} target="_blank" rel="noopener noreferrer">
                <strong>{n.title}</strong>
                <span>{n.sub}</span>
              </a>
            ) : (
              <Link to={n.to} className={s.nextCard}>
                <strong>{n.title}</strong>
                <span>{n.sub}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function StillStuck() {
  return (
    <section className={s.stillStuck} aria-labelledby="sg-stuck">
      <h2 id="sg-stuck" className={s.h3}>Still stuck?</h2>
      <p>
        Every step above has its own &quot;Stuck on this step?&quot; fixes. If none of them help, ask the community. Paste the exact error message and tell us which step you are on.
      </p>
      <div className={s.stuckActions}>
        <a className={s.discordBtn} href="https://discord.gg/dh3TA8U55Q" target="_blank" rel="noopener noreferrer">
          <FaDiscord size={16} aria-hidden="true" /> Ask on Discord
        </a>
        <a className={s.ghostBtn} href="https://github.com/recodehive/recode-website/issues/new" target="_blank" rel="noopener noreferrer">
          <FaGithub size={15} aria-hidden="true" /> Open an issue
        </a>
      </div>
    </section>
  );
}
