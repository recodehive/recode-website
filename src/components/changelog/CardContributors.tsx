import React from 'react';
import ContributorAvatar from './ContributorAvatar';
import type { Contributor } from '../../utils/releaseContributors';
import styles from './CardContributors.module.css';

type Props = {
  contributors: Contributor[];
  version: string;
};

/**
 * Card footer stack: top 3 avatars plus a count. On screens under 1200px it is a
 * <details> that expands into a list of chips. On wide screens it is a static stack,
 * because the sticky rail already lists everyone.
 */
export default function CardContributors({ contributors, version }: Props) {
  if (contributors.length === 0) return null;
  const top = contributors.slice(0, 3);
  const label = `${contributors.length} ${contributors.length === 1 ? 'contributor' : 'contributors'}`;

  return (
    <details className={styles.details}>
      <summary className={styles.summary} aria-label={`${label} in ${version}`}>
        <span className={styles.stack} aria-hidden="true">
          {top.map((c) => (
            <ContributorAvatar key={c.handle} handle={c.handle} size={22} className={styles.stackAvatar} />
          ))}
        </span>
        <span className={styles.count}>{label}</span>
        <span className={styles.caret} aria-hidden="true" />
      </summary>
      <ul className={styles.chips}>
        {contributors.map((c) => (
          <li key={c.handle}>
            <a
              className={styles.chip}
              href={`https://github.com/${c.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`@${c.handle}, ${c.prs} pull ${c.prs === 1 ? 'request' : 'requests'} in ${version}, open GitHub profile`}
            >
              <ContributorAvatar handle={c.handle} size={20} />
              <span>@{c.handle}</span>
              <span className={styles.chipCount}>{c.prs}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
