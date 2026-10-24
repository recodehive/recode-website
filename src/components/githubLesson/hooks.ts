import { useEffect, useRef, useState } from 'react';
import { useDoc, useDocsSidebar } from '@docusaurus/plugin-content-docs/client';

/** True once the element has scrolled into view. It never flips back, so entrance animations play once. */
export function useInView<T extends HTMLElement>(threshold = 0.25): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref as React.RefObject<T>, seen];
}

type SidebarNode = { type: string; href?: string; label?: string; items?: SidebarNode[] };
export type Lesson = { href: string; label: string };

function flatten(items: SidebarNode[]): Lesson[] {
  return items.flatMap((item) => {
    if (item.type === 'category') return flatten(item.items ?? []);
    return item.href && item.label ? [{ href: item.href, label: item.label }] : [];
  });
}

/** Where this page sits in its top-level sidebar category (the GitHub track), read from the sidebar itself. */
export function useLessonPosition(): { number: number; total: number; next: Lesson | null } {
  const sidebar = useDocsSidebar();
  const { metadata } = useDoc();
  const top = ((sidebar?.items ?? []) as SidebarNode[]).find(
    (item) => item.type === 'category' && flatten(item.items ?? []).some((l) => l.href === metadata.permalink),
  );
  const lessons = top ? flatten(top.items ?? []) : [];
  const index = lessons.findIndex((l) => l.href === metadata.permalink);
  if (index < 0) return { number: 1, total: Math.max(lessons.length, 1), next: null };
  return { number: index + 1, total: lessons.length, next: lessons[index + 1] ?? null };
}
