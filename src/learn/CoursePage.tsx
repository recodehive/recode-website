import React from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { ArrowRight, Check } from 'lucide-react';
import { allLessons, lessonKey, lessonPath, type Course } from '../data/learn';
import { usePublished } from './usePublished';
import { useProgress } from './useProgress';
import styles from './learn.module.css';

export default function CoursePage({ course }: { course: Course }) {
  const { done } = useProgress();
  const { isPublished, published } = usePublished();
  const playable = published(course);
  const first = playable[0];
  const doneCount = playable.filter((l) => done.includes(lessonKey(course.slug, l.slug))).length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: { '@type': 'Organization', name: 'recodehive', sameAs: 'https://www.recodehive.com' },
  };

  return (
    <div className={styles.page}>
      <Head>
        {playable.length === 0 && <meta name="robots" content="noindex" />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <Link to="/learn">Learn</Link> <span aria-hidden="true">/</span> <span>{course.title}</span>
      </nav>

      <header className={styles.courseHead}>
        <div className={styles.metaRow}>
          <span className={styles.free}>FREE</span>
          <span className={styles.level}>{course.level}</span>
          <span className={styles.mono}>{course.topic}</span>
        </div>
        <h1 className={`${styles.h1} ${styles.h1Sm}`}>{course.title}</h1>
        <p className={styles.lead}>{course.description}</p>
        <div className={styles.actions}>
          {first && (
            <Link className={styles.btnPrimary} to={lessonPath(course.slug, first.slug)}>
              Start the course <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
          <span className={styles.mono}>{doneCount} of {playable.length} lessons done</span>
        </div>
      </header>

      <div className={styles.modules}>
        {course.modules.map((m, mi) => (
          <section key={m.title} className={`${styles.card} ${styles.moduleCard}`} aria-labelledby={`mod-${mi}`}>
            <h2 id={`mod-${mi}`} className={styles.moduleTitle}>
              <span className={styles.mono}>MODULE {mi + 1}</span> {m.title}
            </h2>
            <ul className={styles.lessonList}>
              {m.lessons.map((l) => {
                const ready = isPublished(course.slug, l);
                const isDone = done.includes(lessonKey(course.slug, l.slug));
                const inner = (
                  <>
                    <span className={`${styles.circle} ${isDone ? styles.circleDone : ''}`} aria-hidden="true">{isDone && <Check size={12} />}</span>
                    <span className={styles.lessonName}>
                      <span className={styles.lessonTitle}>{l.title}</span>
                      <span className={styles.lessonSum}>{l.summary}</span>
                    </span>
                    {ready ? (l.duration && <span className={styles.mono}>{l.duration}</span>) : <span className={styles.soonLabel}>COMING SOON</span>}
                  </>
                );
                return (
                  <li key={l.slug}>
                    {ready ? <Link className={styles.lessonRow} to={lessonPath(course.slug, l.slug)}>{inner}</Link> : <div className={`${styles.lessonRow} ${styles.lessonSoon}`}>{inner}</div>}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <p className={styles.mono}>{allLessons(course).length} lessons, {playable.length} published.</p>
      {course.fullCourseVideoId && (
        <p className={styles.fullCourse}>
          Prefer one long video?{' '}
          <a href={`https://www.youtube.com/watch?v=${course.fullCourseVideoId}`} target="_blank" rel="noopener noreferrer">Watch the full course<span className={styles.srOnly}> (opens in a new tab)</span></a>.
        </p>
      )}
    </div>
  );
}
