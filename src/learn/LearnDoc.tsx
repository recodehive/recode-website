import React from 'react';
import { DocProvider } from '@docusaurus/plugin-content-docs/client';
import Head from '@docusaurus/Head';
import { usePluginData } from '@docusaurus/useGlobalData';
import Catalog from './Catalog';
import CoursePage from './CoursePage';
import LessonPage from './LessonPage';
import { allLessons, getCourse } from '../data/learn';

type WordData = { unpublished: string[] };

/** docItemComponent for the "learn" docs instance: picks the page type from the document. */
export default function LearnDoc(props: { content: any }) {
  const Content = props.content;
  const { metadata, frontMatter } = Content;
  const words = usePluginData('learn-words') as WordData | undefined;

  // permalink looks like /learn/<course>/<lesson>
  const [, , courseSlug, lessonSlug] = (metadata.permalink as string).split('/');
  const course = courseSlug ? getCourse(courseSlug) : undefined;

  let page: React.ReactNode;
  if (frontMatter.kind === 'catalog') {
    page = <Catalog />;
  } else if (frontMatter.kind === 'course' && course) {
    page = <CoursePage course={course} />;
  } else {
    const lesson = course && allLessons(course).find((l) => l.slug === lessonSlug);
    if (course && lesson && (lesson.videos?.length ?? 0) > 0) {
      const thin = Boolean(words?.unpublished.includes(`${courseSlug}/${lessonSlug}`));
      page = <LessonPage course={course} lesson={lesson} thin={thin}><Content /></LessonPage>;
    } else {
      // A notes file without a playable lesson behind it: never index placeholder pages
      page = <p>This lesson is coming soon.</p>;
    }
  }

  return (
    <DocProvider content={props.content}>
      {/* Generic metadata; the lesson page sets its own, more specific title below this */}
      <Head>
        <title>{`${metadata.title} | recodehive Learn`}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      {page}
    </DocProvider>
  );
}
