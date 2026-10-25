import React from 'react';
import Link from '@docusaurus/Link';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { ArrowRight } from 'lucide-react';
import { useLessonPosition } from '../githubLesson/hooks';
import s from './SetupLesson.module.css';

/** The green "Up next" card. The page comes from Docusaurus pagination, the lesson number from the sidebar. */
export default function UpNextCard() {
  const { metadata } = useDoc();
  const { number } = useLessonPosition();
  const next = metadata.next;
  if (!next) return null;
  return (
    <Link className={s.upNext} to={next.permalink}>
      <span>
        <small>UP NEXT · LESSON {number + 1}</small>
        <strong>{next.title}</strong>
      </span>
      <ArrowRight size={22} aria-hidden="true" />
    </Link>
  );
}
