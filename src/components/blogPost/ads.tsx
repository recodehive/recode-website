import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './blogPost.module.css';

/** True only when `adsEnabled` is switched on in docusaurus.config customFields. Off by default. */
export function useAdsEnabled(): boolean {
  const { siteConfig } = useDocusaurusContext();
  return siteConfig.customFields?.adsEnabled === true;
}

/** An empty, labelled container with reserved height. It renders nothing while ads are off. */
export function AdSlot({ id }: { id: string }) {
  const on = useAdsEnabled();
  if (!on) return null;
  return (
    <aside className={styles.adSlot} data-ad-slot={id} aria-label="Advertisement">
      <span>Advertisement</span>
    </aside>
  );
}

/**
 * Reserves two slots inside the article: after the second paragraph, and roughly halfway through
 * (before an H2). The third slot sits before the end of the post (see EndOfPost). No ads go in the sidebars.
 */
export function useInArticleAdSlots(ref: React.RefObject<HTMLElement | null>, enabled: boolean): void {
  useEffect(() => {
    const root = ref.current;
    if (!root || !enabled) return;
    const body = root.querySelector('.markdown');
    if (!body) return;
    const make = (id: string) => {
      const el = document.createElement('aside');
      el.className = styles.adSlot;
      el.dataset.adSlot = id;
      el.setAttribute('aria-label', 'Advertisement');
      el.innerHTML = '<span>Advertisement</span>';
      return el;
    };
    const added: HTMLElement[] = [];
    const paras = Array.from(body.querySelectorAll(':scope > p')).filter((p) => (p.textContent ?? '').trim() !== '');
    if (paras[1]) {
      const a = make('after-paragraph-2');
      paras[1].after(a);
      added.push(a);
    }
    const h2s = Array.from(body.querySelectorAll<HTMLElement>(':scope > h2'));
    if (h2s.length >= 3) {
      const mid = h2s[Math.floor(h2s.length / 2)];
      const b = make('midpoint');
      mid.before(b);
      added.push(b);
    }
    return () => added.forEach((n) => n.remove());
  }, [ref, enabled]);
}
