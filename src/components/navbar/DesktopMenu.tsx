import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import { LEARN_ROWS, MORE_LINKS, SHOWCASE_LINKS, START_CARD, type MenuLink, type TopItem } from '../../data/navbar';
import { Chevron } from './Icons';
import MenuLinkRow from './MenuLinkRow';
import styles from './navbar.module.css';

type MenuItem = Extract<TopItem, { kind: 'menu' }>;

interface Props {
  item: MenuItem;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function LearnPanel({ close }: { close: () => void }) {
  return (
    <div className={styles.learnGrid}>
      <div>
        {LEARN_ROWS.map((row, i) => (
          <div key={row.label} className={`${styles.learnRow} ${i > 0 ? styles.learnRowSep : ''}`}>
            <p className={styles.rowLabel}>{row.label}</p>
            <div className={styles.rowLinks}>
              {row.links.map((l: MenuLink) => <MenuLinkRow key={l.title} link={l} onNavigate={close} />)}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.startCard}>
        <p className={styles.startEyebrow}>{'✦'} {START_CARD.eyebrow}</p>
        <p className={styles.startTitle}>{START_CARD.title}</p>
        <p className={styles.startText}>{START_CARD.text}</p>
        <Link className={styles.startBtn} to={START_CARD.href} onClick={close}>{START_CARD.cta} {'→'}</Link>
      </div>
    </div>
  );
}

export default function DesktopMenu({ item, open, active, onOpen, onClose, onToggle }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [shift, setShift] = useState(0);
  const panelId = `rh-panel-${item.id}`;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Keep the panel inside the viewport.
  useLayoutEffect(() => {
    if (!open) {
      setShift(0);
      return;
    }
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const overflow = r.right - (window.innerWidth - 12);
    setShift(overflow > 0 ? -overflow : 0);
  }, [open]);

  const hoverOpen = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(onOpen, 120);
  };
  const hoverClose = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(onClose, 120);
  };

  const focusFirst = () => window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('a')?.focus(), 30);

  const onTriggerKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) onOpen();
      focusFirst();
    }
  };

  const onPanelKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      triggerRef.current?.focus();
      return;
    }
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a') ?? []);
    const i = links.indexOf(document.activeElement as HTMLElement);
    if (links.length === 0) return;
    e.preventDefault();
    const next = e.key === 'ArrowDown' ? (i + 1) % links.length : (i - 1 + links.length) % links.length;
    links[next].focus();
  };

  const label = (
    <>
      <span className={styles.emoji} aria-hidden="true">{item.emoji}</span>
      {item.label}
    </>
  );

  return (
    <div
      ref={wrapRef}
      className={`${styles.menuWrap} ${open ? styles.menuOpen : ''} ${active ? styles.menuActive : ''}`}
      onPointerEnter={hoverOpen}
      onPointerLeave={hoverClose}
    >
      {item.to ? (
        // Showcase: the label goes to its page, the chevron opens the panel.
        <div className={styles.split}>
          <Link className={styles.menuBtn} to={item.to} onClick={onClose} aria-current={active ? 'page' : undefined}>{label}</Link>
          <button
            ref={triggerRef}
            type="button"
            className={styles.chevBtn}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${item.label} menu`}
            onClick={onToggle}
            onKeyDown={onTriggerKey}
          >
            <Chevron className={styles.chev} />
          </button>
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          onKeyDown={onTriggerKey}
        >
          {label}
          <Chevron className={styles.chev} />
        </button>
      )}
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          className={`${styles.panel} ${item.id === 'learn' ? styles.panelLearn : item.id === 'more' ? styles.panelMore : styles.panelOne}`}
          style={{ ['--shift' as string]: `${shift}px` }}
          role="group"
          aria-label={`${item.label} links`}
          onKeyDown={onPanelKey}
        >
          {item.id === 'learn' && <LearnPanel close={onClose} />}
          {item.id === 'showcase' && SHOWCASE_LINKS.map((l) => <MenuLinkRow key={l.title} link={l} onNavigate={onClose} />)}
          {item.id === 'more' && (
            <div className={styles.twoCols}>
              {MORE_LINKS.map((l) => <MenuLinkRow key={l.title} link={l} onNavigate={onClose} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
