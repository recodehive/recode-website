import React, { useEffect, useState } from 'react';
import styles from '../github-badges.module.css';

export type TabDef = { id: string; label: string; count: number };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
}

/** Sticky section links under the navbar. The active one follows the section in view. */
export default function StickyTabs({ tabs }: { tabs: TabDef[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    tabs.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tabs]);

  return (
    <nav className={styles.tabs} aria-label="Sections">
      <div className={styles.tabsInner}>
        {tabs.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`${styles.tab} ${active === t.id ? styles.tabOn : ''}`}
            aria-current={active === t.id ? 'true' : undefined}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(t.id);
            }}
          >
            {t.label} <span className={styles.tabCount}>{t.count}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
