import React from 'react';
import { ZoneProvider } from './shared';
import s from './GitCheatsheet.module.css';

export { default as CheatsheetHeader } from './Header';
export { MostUsed, ZoneFlow, CommandExplorer } from './Explorers';
export { LiteVideo, UpNext } from './Extras';

/** The root of the page. Everything on this page is styled under this one class. */
export function GitCheatsheet({ children }: { children?: React.ReactNode }) {
  return (
    <ZoneProvider>
      <div className={`gitCheatsheet ${s.gitCheatsheet}`}>{children}</div>
    </ZoneProvider>
  );
}
