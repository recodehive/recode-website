import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import AlgoliaSiteSearch from '../AlgoliaSiteSearch';
import { DISCORD_URL, GITHUB_URL, TOP_ITEMS } from '../../data/navbar';
import DesktopMenu from './DesktopMenu';
import { DiscordIcon, GithubIcon, SearchIcon } from './Icons';
import Logo from './Logo';
import MobileSheet from './MobileSheet';
import { openSearch } from './search';
import Link from '@docusaurus/Link';
import styles from './navbar.module.css';

export default function RhNavbar(): React.JSX.Element {
  const { pathname } = useLocation();
  const [openId, setOpenId] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);
  const barRef = useRef<HTMLElement>(null);

  const isActive = useCallback(
    (prefixes: string[]) => prefixes.some((p) => pathname === p || pathname === `${p}/` || pathname.startsWith(`${p}/`)),
    [pathname],
  );

  // Close everything on route change.
  useEffect(() => {
    setOpenId(null);
    setSheet(false);
  }, [pathname]);

  // Outside click and Escape close an open panel.
  useEffect(() => {
    if (!openId) return;
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpenId(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openId]);

  const closeSheet = useCallback(() => setSheet(false), []);

  return (
    <>
      <nav ref={barRef} className={styles.nav} aria-label="Main">
        {/* Docusaurus' table of contents highlight reads the height of an element with the class "navbar" */}
        <div className={`navbar ${styles.probe}`} aria-hidden="true" />
        <div className={styles.inner}>
          <div className={styles.left}>
            <Logo />
            <div className={styles.menus}>
              {TOP_ITEMS.map((t) => {
                const active = isActive(t.prefixes);
                if (t.kind === 'link') {
                  return (
                    <Link key={t.id} to={t.to} className={`${styles.menuBtn} ${styles.menuLink} ${active ? styles.menuActive : ''}`} aria-current={active ? 'page' : undefined}>
                      <span className={styles.emoji} aria-hidden="true">{t.emoji}</span>
                      {t.label}
                    </Link>
                  );
                }
                return (
                  <DesktopMenu
                    key={t.id}
                    item={t}
                    open={openId === t.id}
                    active={active}
                    onOpen={() => setOpenId(t.id)}
                    onClose={() => setOpenId((cur) => (cur === t.id ? null : cur))}
                    onToggle={() => setOpenId((cur) => (cur === t.id ? null : t.id))}
                  />
                );
              })}
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.searchSlot}><AlgoliaSiteSearch /></div>
            <a className={`${styles.iconBtn} ${styles.hideMobile}`} href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" title="GitHub"><GithubIcon /></a>
            <a className={`${styles.iconBtn} ${styles.hideMobile}`} href={DISCORD_URL} target="_blank" rel="noopener noreferrer" aria-label="Discord (opens in a new tab)" title="Discord"><DiscordIcon /></a>
            <div className={styles.hideMobile}><NavbarColorModeToggle /></div>
            {/* Clerk renders the sign in button or the avatar here (see NavbarClerkAuth) */}
            <div id="clerk-auth-navbar" className={styles.auth} />
            <button type="button" className={`${styles.iconBtn} ${styles.showMobile}`} onClick={openSearch} aria-label="Search"><SearchIcon size={20} /></button>
            <button type="button" className={`${styles.iconBtn} ${styles.showMobile}`} onClick={() => setSheet(true)} aria-label="Open menu" aria-haspopup="dialog" aria-expanded={sheet}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </nav>
      <MobileSheet open={sheet} onClose={closeSheet} isActive={isActive} />
    </>
  );
}
