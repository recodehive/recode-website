import React from 'react';
import { Check, ExternalLink } from 'lucide-react';
import styles from './blog.module.css';

/** Two column check cards. With an odd count the last card spans both columns. */
export function FeatureGrid({ items }: { items: { title: string; text?: string }[] }) {
  return (
    <ul className={styles.featureGrid}>
      {items.map((it) => (
        <li key={it.title}>
          <span className={styles.check} aria-hidden="true"><Check size={14} /></span>
          <span><strong>{it.title}</strong>{it.text ? <> {it.text}</> : null}</span>
        </li>
      ))}
    </ul>
  );
}

/** Platform names with a Supported or Experimental pill. */
export function PlatformCards({ items }: { items: { name: string; status: 'supported' | 'experimental' }[] }) {
  return (
    <ul className={styles.platforms}>
      {items.map((p) => (
        <li key={p.name}>
          <strong>{p.name}</strong>
          <span className={p.status === 'supported' ? styles.pillOk : styles.pillExp}>{p.status === 'supported' ? 'Supported' : 'Experimental'}</span>
        </li>
      ))}
    </ul>
  );
}

/** A tool and version list. */
export function RequirementsTable({ rows }: { rows: { tool: string; version: string }[] }) {
  return (
    <table className={styles.reqs}>
      <thead><tr><th scope="col">Tool</th><th scope="col">Version</th></tr></thead>
      <tbody>{rows.map((r) => <tr key={r.tool}><td>{r.tool}</td><td><code>{r.version}</code></td></tr>)}</tbody>
    </table>
  );
}

/** Link cards with an external link icon. */
export function ResourceCards({ items }: { items: { title: string; href: string; text?: string }[] }) {
  return (
    <ul className={styles.resources}>
      {items.map((r) => (
        <li key={r.href}>
          <a href={r.href} target="_blank" rel="noopener">
            <strong>{r.title}</strong>
            {r.text && <span>{r.text}</span>}
            <ExternalLink size={14} aria-hidden="true" />
            <span className={styles.srOnly}>(opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** A green summary box ending with a bold closing line. */
export function Verdict({ children, closing }: { children?: React.ReactNode; closing?: string }) {
  return (
    <aside className={styles.verdict}>
      {children}
      {closing && <p><strong>{closing}</strong></p>}
    </aside>
  );
}
