import { usePluginData } from '@docusaurus/useGlobalData';
import { allLessons, lessonKey, videosOf, type Course, type Lesson } from '../data/learn';

type WordData = { files: string[]; unpublished: string[] };

/**
 * A lesson is published when it has a video, a notes file, and the notes are not a draft or too short.
 * The notes checks run at build time in plugins/learn-words.
 */
export function usePublished() {
  const data = usePluginData('learn-words') as WordData | undefined;
  const files = new Set(data?.files ?? []);
  const unpublished = new Set(data?.unpublished ?? []);

  const isPublished = (course: string, lesson: Lesson): boolean => {
    const key = lessonKey(course, lesson.slug);
    return videosOf(lesson).length > 0 && files.has(key) && !unpublished.has(key);
  };
  const published = (c: Course): Lesson[] => allLessons(c).filter((l) => isPublished(c.slug, l));
  const courseIsLive = (c: Course): boolean => published(c).length > 0;

  return { isPublished, published, courseIsLive };
}
