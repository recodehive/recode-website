import React from 'react';
import { useInView, useRunning } from './hooks';
import styles from './docsStory.module.css';

export default function NameCards() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const running = useRunning(inView);
  return (
    <section ref={ref} className={`${styles.section} ${running ? styles.running : ''}`}>
      <p className={styles.eyebrow}>{'✦'} THE NAME</p>
      <h2 className={styles.h2}>Why &ldquo;recode hive&rdquo;?</h2>
      <div className={styles.nameGrid}>
        <div className={styles.card}>
          <p className={styles.word} aria-label="recode">
            {'recode'.split('').map((ch, i) => (
              <span key={i} aria-hidden="true" className={styles.letter} style={{ animationDelay: `${i * 80}ms` }}>
                {ch}
              </span>
            ))}
          </p>
          <p className={styles.cardText}>
            <strong>Code again, differently.</strong> AI agents now write a lot of the code. The skill that matters is knowing what to build, how to review it and how to ship it with other people. We learn that by doing. <strong>Collaboration 1st, Code 2nd</strong>
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.word}>hive</p>
          <p className={styles.cardText}>
            <strong>A hive works because every bee (developers) does a small part.</strong> One fixes a typo, one writes a tutorial, one reviews a PR. Together that becomes a platform thousands of learners use.
          </p>
        </div>
      </div>
    </section>
  );
}
