import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type { MenuLink } from '../../data/navbar';
import styles from './navbar.module.css';

function Tile({ link }: { link: MenuLink }) {
  const src = useBaseUrl(link.img ?? '');
  return (
    <span className={`${styles.tile} ${link.img ? styles.tileImg : ''}`} aria-hidden="true">
      {link.img ? <img src={src} alt="" width={26} height={26} /> : link.emoji}
    </span>
  );
}

/** One link row: icon tile, title and a one line description. */
export default function MenuLinkRow({ link, onNavigate, compact = false }: { link: MenuLink; onNavigate?: () => void; compact?: boolean }) {
  const body = (
    <>
      <Tile link={link} />
      <span className={styles.rowText}>
        <span className={styles.rowTitle}>
          {link.title}
          {link.external && <span aria-hidden="true"> {'↗'}</span>}
        </span>
        <span className={styles.rowDesc}>{link.desc}</span>
        {link.external && <span className={styles.srOnly}> (opens in a new tab)</span>}
      </span>
    </>
  );
  const cls = `${styles.row} ${compact ? styles.rowCompact : ''}`;
  if (link.external) {
    return (
      <a className={cls} href={link.href} target="_blank" rel="noopener noreferrer" onClick={onNavigate}>
        {body}
      </a>
    );
  }
  return (
    <Link className={cls} to={link.href} onClick={onNavigate}>
      {body}
    </Link>
  );
}
