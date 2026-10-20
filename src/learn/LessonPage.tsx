import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import { ArrowRight, Check } from 'lucide-react';
import {
  DISCUSSIONS_URL, GOOD_FIRST_ISSUES, lessonKey, lessonPath, playableLessons, type Course, type Lesson,
} from '../data/learn';
import { useProgress } from './useProgress';
import VideoFacade from './VideoFacade';
import styles from './learn.module.css';

type Props = {
  course: Course;
  lesson: Lesson;
  thin: boolean;
  children: ReactNode;
};

export default function LessonPage({ course, lesson, thin, children }: Props) {
  const { done, toggle } = useProgress();
  const key = lessonKey(course.slug, lesson.slug);
  const isDone = done.includes(key);
  const playable = playableLessons(course);
  const index = playable.findIndex((l) => l.slug === lesson.slug);
  const next = playable[index + 1];
  const doneCount = playable.filter((l) => done.includes(lessonKey(course.slug, l.slug))).length;
  const pct = playable.length ? Math.round((doneCount / playable.length) * 100) : 0;

  const moduleIndex = course.modules.findIndex((m) => m.lessons.some((l) => l.slug === lesson.slug));
  const moduleLessons = course.modules[moduleIndex]?.lessons ?? [];
  const lessonNumber = moduleLessons.findIndex((l) => l.slug === lesson.slug) + 1;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: lesson.title,
    description: lesson.summary,
    thumbnailUrl: `https://i.ytimg.com/vi/${lesson.youtubeId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${lesson.youtubeId}`,
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>{`${lesson.title} | ${course.title} | recode hive Learn`}</title>
        <meta name="description" content={lesson.summary} />
        {thin && <meta name="robots" content="noindex" />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className={styles.lessonLayout}>
        <article className={styles.lessonMain}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link to="/learn">Learn</Link> <span aria-hidden="true">/</span>{' '}
            <Link to={`/learn/${course.slug}`}>{course.title}</Link> <span aria-hidden="true">/</span>{' '}
            <span>{lesson.title}</span>
          </nav>

          <div className={styles.metaRow}>
            <span className={styles.free}>FREE</span>
            <span className={styles.level}>{course.level}</span>
            <span className={styles.mono}>Module {moduleIndex + 1} · Lesson {lessonNumber}</span>
          </div>
          <h1 className={`${styles.h1} ${styles.h1Lesson}`}>{lesson.title}</h1>

          <VideoFacade youtubeId={lesson.youtubeId as string} title={lesson.title} duration={lesson.duration} />

          <div className={styles.actions}>
            <button type="button" aria-pressed={isDone} className={`${styles.btnPrimary} ${isDone ? styles.btnDone : ''}`} onClick={() => toggle(key)}>
              {isDone ? '✓ Completed' : 'Mark as complete'}
            </button>
            {next && (
              <Link className={styles.btnOutline} to={lessonPath(course.slug, next.slug)}>
                Next lesson <ArrowRight size={16} aria-hidden="true" />
              </Link>
            )}
            <span className={styles.mono}>{doneCount} of {playable.length} lessons done</span>
          </div>

          <section className={styles.notes} aria-label="Lesson notes">
            <h2 className={styles.h2}>What you will learn</h2>
            <p>{lesson.summary}</p>

            {lesson.commands && lesson.commands.length > 0 && (
              <>
                <h2 className={styles.h2}>Key commands</h2>
                <p className={styles.cmds}>
                  {lesson.commands.map((c) => <code key={c} className={styles.cmd}>{c}</code>)}
                </p>
              </>
            )}

            <div className={styles.mdx}>{children}</div>

            <h2 className={styles.h2}>Resources</h2>
            <ul className={styles.resources}>
              {lesson.resources?.map((r) => (
                <li key={r.url}>
                  {r.url.startsWith('/') ? <Link to={r.url}>{r.label}</Link> : <a href={r.url} target="_blank" rel="noopener noreferrer">{r.label}</a>}
                </li>
              ))}
              <li><a href={GOOD_FIRST_ISSUES} target="_blank" rel="noopener noreferrer">Practice on a good first issue</a></li>
              <li><a href={DISCUSSIONS_URL} target="_blank" rel="noopener noreferrer">Ask a question in Discussions</a></li>
            </ul>
          </section>
        </article>

        <aside className={`${styles.card} ${styles.outline}`} aria-label="Course outline">
          <h2 className={styles.outlineTitle}>{course.title}</h2>
          <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Course progress">
            <span className={styles.barFill} style={{ width: `${pct}%` }} />
          </div>
          {course.modules.map((m, mi) => (
            <div key={m.title} className={styles.outlineModule}>
              <p className={styles.outlineHead}>MODULE {mi + 1} · {m.lessons.length} {m.lessons.length === 1 ? 'LESSON' : 'LESSONS'}</p>
              <p className={styles.outlineName}>{m.title}</p>
              <ul className={styles.outlineList}>
                {m.lessons.map((l) => {
                  const ready = Boolean(l.youtubeId);
                  const current = l.slug === lesson.slug;
                  const lDone = done.includes(lessonKey(course.slug, l.slug));
                  const inner = (
                    <>
                      <span className={`${styles.circle} ${lDone ? styles.circleDone : ''}`} aria-hidden="true">{lDone && <Check size={12} />}</span>
                      <span className={styles.outlineLesson}>{l.title}</span>
                      {ready ? (l.duration && <span className={styles.mono}>{l.duration}</span>) : <span className={styles.soonTiny}>SOON</span>}
                    </>
                  );
                  return (
                    <li key={l.slug}>
                      {ready ? (
                        <Link className={`${styles.outlineRow} ${current ? styles.outlineCurrent : ''}`} to={lessonPath(course.slug, l.slug)} aria-current={current ? 'page' : undefined}>{inner}</Link>
                      ) : (
                        <div className={`${styles.outlineRow} ${styles.lessonSoon}`}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
