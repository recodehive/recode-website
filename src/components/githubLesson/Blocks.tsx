import React from 'react';
import Link from '@docusaurus/Link';
import {
  ArrowRight, Check, CircleAlert, Clock, GitFork, GitPullRequest, Github, Lock, MessageSquare, Tag, Users, Zap,
} from 'lucide-react';
import { CONCEPTS, FACTS, SCENARIO, TAKEAWAYS, WHY_NUMBERS } from './lessonData';
import { useInView, useLessonPosition } from './hooks';
import s from './GithubLesson.module.css';

type Kids = { children?: React.ReactNode };

const FEATURE_ICON = { clock: Clock, lock: Lock, users: Users };
const CONCEPT_ICON = { issue: CircleAlert, chat: MessageSquare, pr: GitPullRequest, tag: Tag, zap: Zap, fork: GitFork };

/** Fades its children up once, the first time they scroll into view. */
export function Reveal({ children, delay = 0, className = '' }: Kids & { delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className={`${s.reveal} ${seen ? s.in : ''} ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/** The root of the page. Everything on this page is styled under this one class. */
export function Lesson({ children }: Kids) {
  return <div className={`githubLesson ${s.githubLesson}`}>{children}</div>;
}

/** "Key features of GitHub" as icon cards. Each child is one <Feature>. */
export function FeatureCards({ children }: Kids) {
  return (
    <>
      <div className={s.label}>KEY FEATURES OF GITHUB</div>
      <div className={s.featureGrid}>
        {React.Children.map(children, (c, i) => <Reveal delay={i * 90} className={s.feature}>{c}</Reveal>)}
      </div>
    </>
  );
}
export function Feature({ icon, title, children }: Kids & { icon: keyof typeof FEATURE_ICON; title: string }) {
  const Icon = FEATURE_ICON[icon];
  return (
    <>
      <span className={s.tile} aria-hidden="true"><Icon size={19} /></span>
      <h4>{title}</h4>
      <p>{children}</p>
    </>
  );
}

/** Dark card holding the existing example scenario text and its animated push, review and merge diagram. */
export function Scenario({ children }: Kids) {
  return (
    <div className={s.scenario}>
      <div className={s.scLabel}>{SCENARIO.label}</div>
      <div className={s.scText}>{children}</div>
      <div className={s.scFlow} aria-hidden="true">
        <div className={s.scNode}>
          <span className={s.avatars}><i>A</i><i>B</i><i>C</i></span>
          <span>{SCENARIO.devs}</span>
        </div>
        <div className={s.scLine}><em>{SCENARIO.push}</em><span className={s.scDot} /></div>
        <div className={`${s.scNode} ${s.scRepo}`}>
          <Github size={26} />
          <span>{SCENARIO.repo}</span>
        </div>
        <div className={s.scLine}><em>{SCENARIO.review}</em><span className={`${s.scDot} ${s.scDot2}`} /></div>
        <div className={s.scNode}>
          <span className={s.scCheck}><Check size={16} /></span>
          <span>{SCENARIO.merged}</span>
        </div>
      </div>
    </div>
  );
}

/** A browser-style frame for a screenshot. */
export function Frame({ url, children }: Kids & { url?: string }) {
  return (
    <div className={s.frame}>
      <div className={s.frameBar}>
        <i /><i /><i />
        {url && <span>{url}</span>}
      </div>
      <div className={s.frameBody}>{children}</div>
    </div>
  );
}

/** Existing paragraphs on the left, a "Git at a glance" fact card on the right. */
export function Split({ children }: Kids) {
  return (
    <div className={s.split}>
      <div>{children}</div>
      <aside className={s.facts} aria-label="Git at a glance">
        <div className={s.factsLabel}>{FACTS.label}</div>
        {FACTS.items.map((f) => (
          <div key={f.label} className={s.fact}><strong>{f.value}</strong><span>{f.label}</span></div>
        ))}
      </aside>
    </div>
  );
}

/** A green tip box that holds the existing "Need Git commands?" text and links. */
export function Tip({ title, children }: Kids & { title: string }) {
  return (
    <div className={s.tip} role="note">
      <span className={s.tipIcon} aria-hidden="true">💡</span>
      <div>
        <strong>{title}</strong>
        <div className={s.tipText}>{children}</div>
      </div>
    </div>
  );
}

/** The five numbered reasons to learn GitHub. Each child is one reason: <Why title="...">text</Why>. */
export function WhyGrid({ children }: Kids) {
  return <div className={s.whyGrid}>{React.Children.map(children, (c, i) => <Reveal delay={i * 90} className={s.why}><span className={s.whyNum} aria-hidden="true">{WHY_NUMBERS[i]}</span>{c}</Reveal>)}</div>;
}
export function Why({ title, children }: Kids & { title: string }) {
  return (
    <>
      <h4>{title}</h4>
      <p>{children}</p>
    </>
  );
}

/** The six core GitHub concepts as icon tiles. */
export function Concepts() {
  return (
    <>
      <div className={s.label}>CORE GITHUB CONCEPTS</div>
      <div className={s.conceptGrid}>
        {CONCEPTS.map((c, i) => {
          const Icon = CONCEPT_ICON[c.icon];
          return (
            <Reveal key={c.name} delay={i * 70} className={s.concept}>
              <span className={`${s.tile} ${s.tilePurple}`} aria-hidden="true"><Icon size={18} /></span>
              <h4>{c.name}</h4>
              <p>{c.text}</p>
            </Reveal>
          );
        })}
      </div>
    </>
  );
}

export function Takeaways() {
  return (
    <div className={s.takeaways}>
      <div className={s.takeLabel}>{TAKEAWAYS.label}</div>
      <ul>
        {TAKEAWAYS.items.map((t) => (
          <li key={t}><span className={s.checkTile} aria-hidden="true"><Check size={13} strokeWidth={3} /></span>{t}</li>
        ))}
      </ul>
    </div>
  );
}

/** The next lesson in the sidebar, read from the sidebar itself. */
export function UpNext() {
  const { number, next } = useLessonPosition();
  if (!next) return null;
  return (
    <Link className={s.upNext} to={next.href}>
      <span>
        <small>UP NEXT · LESSON {number + 1}</small>
        <strong>{next.label}</strong>
      </span>
      <ArrowRight size={22} aria-hidden="true" />
    </Link>
  );
}
