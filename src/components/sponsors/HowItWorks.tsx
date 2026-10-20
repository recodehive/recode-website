import React, { useState } from 'react';
import { useInView, useReducedMotion, useRunning } from '../docsStory/hooks';
import { SceneAmount, SceneClick, SceneConfirm, SceneLeaderboard, ScenePR, SceneSponsored, SceneVisibility } from './Scenes';
import styles from './sponsors.module.css';

type Path = 'sponsor' | 'sponsored';
const STEP_MS = 4200;

interface Step {
  title: string;
  text: string;
  scene: React.ReactNode;
}

const PATHS: Record<Path, { heading: string; sub: string; steps: Step[] }> = {
  sponsor: {
    heading: 'Sponsoring takes about a minute',
    sub: 'Everything happens on GitHub. Here is exactly what you will see.',
    steps: [
      { title: 'Click Sponsor', text: 'Open sanjay-kv on GitHub and press the Sponsor button.', scene: <SceneClick /> },
      { title: 'Pick an amount', text: 'Choose a tier or type a custom amount, then monthly or one-time.', scene: <SceneAmount /> },
      { title: 'Choose who can see it', text: 'Public puts you on our wall. Private keeps it between us.', scene: <SceneVisibility /> },
      { title: 'Confirm and join the wall', text: 'GitHub bills your saved payment method. Your avatar lands here.', scene: <SceneConfirm /> },
    ],
  },
  sponsored: {
    heading: 'From first PR to GitHub sponsor',
    sub: 'Ship real work on open source projects and let people back you.',
    steps: [
      { title: 'Contribute', text: 'Open a pull request on a real project and get it merged.', scene: <ScenePR /> },
      { title: 'Climb the leaderboard', text: 'Merged recode PRs earn points and move you up the board.', scene: <SceneLeaderboard /> },
      { title: 'Get sponsored on GitHub', text: 'Turn on GitHub Sponsors so people who value your work can back it.', scene: <SceneSponsored /> },
    ],
  },
};

export default function HowItWorks() {
  const [ref, inView] = useInView<HTMLElement>(0.25);
  const running = useRunning(inView);
  const reduced = useReducedMotion();
  const [path, setPath] = useState<Path>('sponsor');
  const [step, setStep] = useState(0);
  const [manual, setManual] = useState(false);
  const [hold, setHold] = useState(false);

  const cfg = PATHS[path];
  const safeStep = Math.min(step, cfg.steps.length - 1);
  const auto = !manual && !reduced;

  // Switch path and reset the step in one update, so a step index from the longer path never reaches the shorter one.
  const choosePath = (next: Path) => {
    setPath(next);
    setStep(0);
    setManual(false);
  };

  const jump = (i: number) => {
    setStep(i);
    setManual(true);
  };

  return (
    <section ref={ref} className={styles.how} aria-labelledby="how-title">
      <div className={styles.howHead}>
        <div>
          <p className={styles.eyebrowPink}>{'♥'} HOW IT WORKS</p>
          <h2 id="how-title" className={styles.h2}>{cfg.heading}</h2>
          <p className={styles.sub}>{cfg.sub}</p>
        </div>
        <div className={styles.segmented} role="tablist" aria-label="Choose a path">
          <button type="button" role="tab" aria-selected={path === 'sponsor'} className={`${styles.segment} ${path === 'sponsor' ? styles.segmentOn : ''}`} onClick={() => choosePath('sponsor')}>
            {'♥'} I want to sponsor
          </button>
          <button type="button" role="tab" aria-selected={path === 'sponsored'} className={`${styles.segment} ${path === 'sponsored' ? styles.segmentOn : ''}`} onClick={() => choosePath('sponsored')}>
            {'⚡'} I want to get sponsored
          </button>
        </div>
      </div>

      <div className={styles.howGrid}>
        <div>
          <ol className={styles.steps}>
            {cfg.steps.map((s, i) => {
              const on = i === safeStep;
              return (
                <li key={s.title}>
                  <button type="button" className={`${styles.stepBtn} ${on ? styles.stepOn : ''}`} aria-current={on ? 'step' : undefined} onClick={() => jump(i)}>
                    <span className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className={styles.stepTitle}>{s.title}</span>
                      <span className={styles.stepText}>{s.text}</span>
                    </span>
                    {on && auto && (
                      <span
                        key={`${path}-${step}`}
                        className={styles.stepBar}
                        style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: running && !hold ? 'running' : 'paused' }}
                        onAnimationEnd={() => setStep((n) => (n + 1) % cfg.steps.length)}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
          {path === 'sponsor' && (
            <p className={styles.source}>
              Steps based on{' '}
              <a href="https://docs.github.com/en/sponsors/sponsoring-open-source-contributors/sponsoring-an-open-source-contributor-through-github" target="_blank" rel="noopener noreferrer">
                GitHub Docs: sponsoring an open source contributor<span className={styles.srOnly}> (opens in a new tab)</span>
              </a>
              . You need a verified email on GitHub first.
            </p>
          )}
        </div>

        <div
          className={styles.stagePanel}
          aria-live="polite"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={() => setHold(false)}
        >
          <span className={styles.srOnly}>{`Step ${safeStep + 1} of ${cfg.steps.length}: ${cfg.steps[safeStep].title}. ${cfg.steps[safeStep].text}`}</span>
          <div key={`${path}-${step}`} className={styles.scene} aria-hidden={false}>
            {cfg.steps[safeStep].scene}
          </div>
        </div>
      </div>
    </section>
  );
}
