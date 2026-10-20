import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { AnimatePresence, motion } from 'framer-motion';
import { MILESTONES, type Milestone } from './storyData';
import { useInView, useReducedMotion, useRunning } from './hooks';
import styles from './docsStory.module.css';

const ERA_COLOR: Record<Milestone['era'], string> = {
  idea: '#94a3b8',
  early: '#8b5cf6',
  apr: '#2563eb',
  oct: '#2e8555',
  next: '#f59e0b',
};
const INTERVAL_MS = 5000;

function Shot({ milestone }: { milestone: Milestone }) {
  const src = useBaseUrl(milestone.screenshot || '');
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'failed'>(milestone.screenshot ? 'loading' : 'failed');

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    // The image may have finished (or failed) before hydration attached the handlers.
    if (img.complete) setState(img.naturalWidth > 0 ? 'ok' : 'failed');
  }, []);

  return (
    <div className={styles.shot} style={{ ['--era' as string]: ERA_COLOR[milestone.era] }}>
      {state !== 'ok' && (
        <div className={styles.skeleton} aria-hidden="true">
          <span className={styles.skBar} style={{ width: '38%' }} />
          <span className={styles.skBlock} />
          <span className={styles.skLine} style={{ width: '82%' }} />
          <span className={styles.skLine} style={{ width: '64%' }} />
          <span className={styles.skRow}><i /><i /><i /></span>
        </div>
      )}
      {milestone.screenshot && state !== 'failed' && (
        <img
          ref={ref}
          src={src}
          alt={`recode hive website in ${milestone.date.replace(/\s*·.*$/, '')}`}
          width={1280}
          height={800}
          loading="lazy"
          className={styles.shotImg}
          style={{ opacity: state === 'ok' ? 1 : 0 }}
          onLoad={() => setState('ok')}
          onError={() => setState('failed')}
        />
      )}
    </div>
  );
}

function NextFrame() {
  return (
    <div className={styles.nextFrame}>
      <span className={styles.nextBee} aria-hidden="true">{'\u{1F41D}'}</span>
      <strong>Your PR goes here</strong>
      <span>The next screenshot on this timeline is the one you ship.</span>
    </div>
  );
}

export default function JourneyTimeline() {
  const [ref, inView] = useInView<HTMLElement>(0.25);
  const running = useRunning(inView);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [nonce, setNonce] = useState(0); // bumps restart the progress bar
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  if (MILESTONES.length === 0) return null;
  const current = MILESTONES[Math.min(active, MILESTONES.length - 1)];

  const activate = (i: number, focus = false) => {
    setActive(i);
    setNonce((n) => n + 1);
    if (focus) tabs.current[i]?.focus();
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const last = MILESTONES.length - 1;
    const map: Record<string, number> = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    };
    if (e.key in map) {
      e.preventDefault();
      activate(map[e.key], true);
    }
  };

  return (
    <section ref={ref} className={styles.section}>
      <p className={styles.eyebrow}>{'✦'} HOW WE GOT HERE</p>
      <h2 className={styles.h2}>From one repo to a hive</h2>
      <div className={styles.journey}>
        <div className={styles.tabs} role="tablist" aria-label="recode hive milestones" aria-orientation="vertical">
          {MILESTONES.map((m, i) => {
            const on = i === active;
            return (
              <button
                key={m.id}
                ref={(el) => { tabs.current[i] = el; }}
                type="button"
                role="tab"
                id={`story-tab-${m.id}`}
                aria-selected={on}
                aria-controls="story-stage"
                tabIndex={on ? 0 : -1}
                className={`${styles.tab} ${on ? styles.tabOn : ''}`}
                onMouseEnter={() => !on && activate(i)}
                onFocus={() => !on && activate(i)}
                onClick={() => activate(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className={styles.tabNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.tabBody}>
                  <span className={`${styles.tabDate} ${m.era === 'next' ? styles.tabDateNext : ''}`}>{m.date}</span>
                  <span className={styles.tabTitle}>{m.title}</span>
                  <span className={styles.tabDesc}>
                    <span>{m.text}</span>
                  </span>
                </span>
                {on && !reduced && (
                  <span
                    key={`${m.id}-${nonce}`}
                    className={styles.tabBar}
                    style={{ animationDuration: `${INTERVAL_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
                    onAnimationEnd={() => activate((i + 1) % MILESTONES.length)}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className={styles.stage} id="story-stage" role="tabpanel" aria-labelledby={`story-tab-${current.id}`}>
          <span className={`${styles.ghost} ${styles.ghostA}`} aria-hidden="true" />
          <span className={`${styles.ghost} ${styles.ghostB}`} aria-hidden="true" />
          <div className={styles.browser}>
            <div className={styles.browserBar}>
              <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
              <span className={styles.url}>recodehive.com</span>
              <span className={styles.browserDate}>{current.date}</span>
            </div>
            <div className={styles.viewport}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className={styles.layer}
                  initial={reduced ? false : { clipPath: 'inset(100% 0 0 0)', scale: 1.06, filter: 'blur(6px)' }}
                  animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 1, transition: { duration: reduced ? 0 : 0.7 } }}
                  transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.9, 0.2, 1] }}
                >
                  {current.era === 'next' ? <NextFrame /> : <Shot milestone={current} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {current.caption && (
            <p className={styles.caption}>
              <span className={styles.captionDot} style={{ background: ERA_COLOR[current.era] }} aria-hidden="true" />
              {current.caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
