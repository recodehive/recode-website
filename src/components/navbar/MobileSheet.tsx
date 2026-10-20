import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import { DISCORD_URL, GITHUB_URL, LEARN_ROWS, MORE_LINKS, SHOWCASE_LINKS, TOP_ITEMS, type MenuLink } from '../../data/navbar';
import { Chevron, DiscordIcon, GithubIcon, SearchIcon } from './Icons';
import MenuLinkRow from './MenuLinkRow';
import { openSearch } from './search';
import Logo from './Logo';
import styles from './navbar.module.css';

const FOCUSABLE = 'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

const LEARN_LINKS: MenuLink[] = LEARN_ROWS.flatMap((r) => r.links);
const GROUPS: Record<string, MenuLink[]> = { learn: LEARN_LINKS, showcase: SHOWCASE_LINKS, more: MORE_LINKS };

interface Props {
  open: boolean;
  onClose: () => void;
  isActive: (prefixes: string[]) => boolean;
}

export default function MobileSheet({ open, onClose, isActive }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { colorMode, setColorMode } = useColorMode();

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !ref.current) return;
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const dark = colorMode === 'dark';

  return createPortal(
    <div ref={ref} className={styles.sheet} role="dialog" aria-modal="true" aria-label="Site menu">
      <div className={styles.sheetTop}>
        <Logo onClick={onClose} />
        <button ref={closeRef} type="button" className={styles.iconBtn} onClick={onClose} aria-label="Close menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>

      <button type="button" className={styles.sheetSearch} onClick={() => { onClose(); window.setTimeout(openSearch, 60); }}>
        <SearchIcon /> Search docs, blogs, people
      </button>

      <nav className={styles.sheetList} aria-label="Main">
        {TOP_ITEMS.map((t) => {
          if (t.kind === 'link') {
            return (
              <Link key={t.id} className={`${styles.sheetRow} ${isActive(t.prefixes) ? styles.sheetRowActive : ''}`} to={t.to} onClick={onClose}>
                <span className={styles.sheetEmoji} aria-hidden="true">{t.emoji}</span>
                <span className={styles.sheetLabel}>{t.label}</span>
              </Link>
            );
          }
          const links = GROUPS[t.id];
          const isOpen = expanded === t.id;
          return (
            <div key={t.id}>
              <button
                type="button"
                className={`${styles.sheetRow} ${isOpen || isActive(t.prefixes) ? styles.sheetRowActive : ''}`}
                aria-expanded={isOpen}
                aria-controls={`sheet-${t.id}`}
                onClick={() => setExpanded(isOpen ? null : t.id)}
              >
                <span className={styles.sheetEmoji} aria-hidden="true">{t.emoji}</span>
                <span className={styles.sheetLabel}>{t.label}</span>
                <span className={styles.sheetCount}>{links.length}</span>
                <Chevron className={`${styles.sheetChev} ${isOpen ? styles.sheetChevOpen : ''}`} />
              </button>
              {isOpen && (
                <div id={`sheet-${t.id}`} className={styles.sheetGroup}>
                  {t.to && (
                    <Link className={styles.sheetOverview} to={t.to} onClick={onClose}>{t.label} overview {'→'}</Link>
                  )}
                  {links.map((l) => <MenuLinkRow key={l.title} link={l} compact onNavigate={onClose} />)}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className={styles.sheetBottom}>
        <a className={styles.iconBtn} href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)"><GithubIcon /></a>
        <a className={styles.iconBtn} href={DISCORD_URL} target="_blank" rel="noopener noreferrer" aria-label="Discord (opens in a new tab)"><DiscordIcon /></a>
        <span className={styles.spacer} />
        <label className={styles.switchLabel}>
          Dark mode
          <button type="button" role="switch" aria-checked={dark} className={`${styles.switch} ${dark ? styles.switchOn : ''}`} onClick={() => setColorMode(dark ? 'light' : 'dark')}>
            <span />
          </button>
        </label>
      </div>
    </div>,
    document.body,
  );
}
