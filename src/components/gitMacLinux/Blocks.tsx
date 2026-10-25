import React from 'react';
import s from './GitMacLinux.module.css';

type Kids = { children?: React.ReactNode };

/** A section heading with an icon tile beside it. Put the page's own `##` heading inside, so it stays in the contents list. */
export function SectionHead({ icon, tag, children }: Kids & { icon: string; tag?: string }) {
  return (
    <div className={s.sectionHead}>
      <span className={s.sectionIcon} aria-hidden="true">{icon}</span>
      {children}
      {tag && <em className={s.newTag}>{tag}</em>}
    </div>
  );
}

/** The light orange strip that points at the Homebrew website. */
export function BrewSite({ url }: { url: string }) {
  return (
    <div className={s.site}>
      <span>HOMEBREW OFFICIAL WEBSITE</span>
      <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
    </div>
  );
}

/** The dark card around the distribution tabs. Put the page's own <Tabs> inside. */
export function DistroPicker({ children }: Kids) {
  return (
    <div className={s.distro}>
      {children}
      <div className={s.distroFoot}>Commands from the official Git download page, git-scm.com</div>
    </div>
  );
}

/** The grey line under a distribution's command. */
export function DistroNote({ children }: Kids) {
  return <div className={s.distroNote}>{children}</div>;
}
