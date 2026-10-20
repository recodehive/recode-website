import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { FOUNDER } from './storyData';
import styles from './docsStory.module.css';

export default function FounderNote() {
  const photo = useBaseUrl(FOUNDER.photo);
  const [failed, setFailed] = useState(false);
  // No quote written yet: hide the whole section rather than show a placeholder.
  if (!FOUNDER.quote.trim()) return null;
  const initials = FOUNDER.name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  return (
    <section className={styles.section}>
      <h2 className={styles.h2}>A note from the founder</h2>
      <figure className={styles.founder}>
        <span className={styles.quoteMark} aria-hidden="true">{'“'}</span>
        {failed ? (
          <span className={styles.founderPhoto} aria-hidden="true">{initials}</span>
        ) : (
          <img
            src={photo}
            alt={FOUNDER.name}
            width={96}
            height={96}
            loading="lazy"
            className={styles.founderPhoto}
            onError={() => setFailed(true)}
          />
        )}
        <div>
          <blockquote className={styles.founderQuote}>{FOUNDER.quote}</blockquote>
          <figcaption className={styles.founderName}>
            <strong>{FOUNDER.name}</strong>
            <span>{FOUNDER.role}</span>
          </figcaption>
        </div>
      </figure>
    </section>
  );
}
