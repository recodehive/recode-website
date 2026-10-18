import React from 'react';
import styles from './styles.module.css';

const BAT_PATHS = {
  wl: 'M26 14 Q16 2 2 8 Q8 12 6 18 Q12 14 16 20 Q20 14 26 18 Z',
  wr: 'M34 14 Q44 2 58 8 Q52 12 54 18 Q48 14 44 20 Q40 14 34 18 Z',
  body: 'M26 9 L28 13 L32 13 L34 9 L34 22 Q30 27 26 22 Z',
};

function Bat({ top, width, duration, delay, tone, eyes = false }:
  { top: number; width: number; duration: number; delay: number; tone: 'b1' | 'b2' | 'b3'; eyes?: boolean }) {
  return (
    <div className={`${styles.bat} ${styles[tone]}`} style={{ top, width, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
      <div className={styles.batIn}>
        <svg viewBox="0 0 60 30" width="100%" focusable="false">
          <path className={styles.wl} d={BAT_PATHS.wl} />
          <path className={styles.wr} d={BAT_PATHS.wr} />
          <path d={BAT_PATHS.body} />
          {eyes && (<><circle cx="28.4" cy="15" r="1.2" fill="#fbbf24" /><circle cx="31.6" cy="15" r="1.2" fill="#fbbf24" /></>)}
        </svg>
      </div>
    </div>
  );
}

/** Place as a direct child of the hero's outermost element. */
export function HalloweenBats() {
  return (
    <div className={styles.batLayer} aria-hidden="true">
      <Bat top={56} width={48} duration={16} delay={-2} tone="b1" eyes />
      <Bat top={24} width={34} duration={21} delay={-9} tone="b2" />
      <Bat top={92} width={26} duration={26} delay={-16} tone="b3" />
    </div>
  );
}

/**
 * Place inside the element that wraps the live activity card (that wrapper must be
 * position: relative), BEFORE the card in the DOM so the ghost paints behind it.
 */
export function HalloweenCardDecor() {
  return (
    <>
      <div className={styles.bubble} aria-hidden="true">boo! ready for your first PR?</div>

      <div className={styles.ghost} aria-hidden="true">
        <div className={styles.ghostIn}>
          <svg viewBox="0 0 90 100" width="92" focusable="false">
            <path className={styles.ghostBody} d="M45 6 C22 6 10 24 10 46 V86 Q17 78 24 86 Q31 94 38 86 Q45 78 52 86 Q59 94 66 86 Q73 78 80 86 V46 C80 24 68 6 45 6 Z" strokeWidth="2" />
            <path className={styles.ghostArm} d="M12 50 Q2 54 7 63" fill="none" strokeWidth="2" strokeLinecap="round" />
            <path className={styles.ghostArm} d="M78 50 Q88 54 83 63" fill="none" strokeWidth="2" strokeLinecap="round" />
            <ellipse className={styles.eye} cx="34" cy="42" rx="5" ry="7" fill="#0f172a" />
            <ellipse className={styles.eye} cx="56" cy="42" rx="5" ry="7" fill="#0f172a" />
            <circle cx="35.5" cy="39.5" r="1.6" fill="#fff" />
            <circle cx="57.5" cy="39.5" r="1.6" fill="#fff" />
            <ellipse cx="45" cy="58" rx="4.5" ry="5" fill="#0f172a" />
            <circle cx="25" cy="54" r="4" fill="#fda4af" opacity=".6" />
            <circle cx="65" cy="54" r="4" fill="#fda4af" opacity=".6" />
          </svg>
        </div>
      </div>

      <div className={styles.patch} aria-hidden="true">
        <div className={styles.pumpkin} style={{ width: 104 }}>
          <div className={styles.glow} />
          <svg viewBox="0 0 100 90" width="104" className={styles.pumpkinSvg} focusable="false">
            <ellipse cx="30" cy="56" rx="22" ry="28" fill="#ea580c" />
            <ellipse cx="70" cy="56" rx="22" ry="28" fill="#ea580c" />
            <ellipse cx="50" cy="55" rx="25" ry="31" fill="#f97316" />
            <path d="M47 26 Q46 16 52 10 L56 13 Q52 18 53 26 Z" fill="#2e8555" />
            <path d="M53 15 Q62 8 70 14 Q62 18 55 18 Z" fill="#3cad6e" />
            <g className={styles.face} fill="#fde68a">
              <path d="M30 46 L40 40 L41 52 Z" />
              <path d="M70 46 L60 40 L59 52 Z" />
              <path d="M47 56 L50 50 L53 56 Z" />
              <path d="M28 62 L35 66 L40 61 L45 67 L50 62 L55 67 L60 61 L65 66 L72 62 Q66 76 50 77 Q34 76 28 62 Z" />
            </g>
          </svg>
        </div>
        <div className={`${styles.pumpkin} ${styles.hop}`} style={{ width: 64 }}>
          <div className={styles.glow} />
          <svg viewBox="0 0 100 90" width="64" className={styles.pumpkinSvg} focusable="false">
            <ellipse cx="32" cy="58" rx="20" ry="25" fill="#ea580c" />
            <ellipse cx="68" cy="58" rx="20" ry="25" fill="#ea580c" />
            <ellipse cx="50" cy="57" rx="23" ry="28" fill="#fb923c" />
            <path d="M47 32 Q46 22 51 17 L55 20 Q51 24 52 32 Z" fill="#2e8555" />
            <g className={styles.face} fill="#fde68a">
              <circle cx="40" cy="52" r="5" />
              <circle cx="60" cy="52" r="5" />
              <path d="M38 64 Q50 74 62 64 Q50 68 38 64 Z" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

/** Place in the live activity card's title bar, before the close button (the bar must be display: flex). */
export function HalloweenPill() {
  return <span className={styles.pill}>TRICK OR COMMIT</span>;
}
