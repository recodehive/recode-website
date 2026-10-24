import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Check, Copy, TriangleAlert } from 'lucide-react';
import type { GitCommand, Zone } from '../../data/gitCommands';
import s from './GitCheatsheet.module.css';

export const ZONE_ORDER: Zone[] = ['work', 'stage', 'local', 'remote'];

export const ZONES: Record<Zone, { icon: string; tile: string; full: string; hint: string }> = {
  work: { icon: '📝', tile: 'Working folder', full: 'Working folder', hint: 'Your files as you edit them' },
  stage: { icon: '📦', tile: 'Staging area', full: 'Staging area', hint: 'Changes ready to commit' },
  local: { icon: '💾', tile: 'Local repo', full: 'Local repository', hint: 'Commits saved on your computer' },
  remote: { icon: '☁️', tile: 'Remote', full: 'Remote (GitHub)', hint: 'The copy everyone shares' },
};

export const ZONE_CLASS: Record<Zone, string> = { work: s.zWork, stage: s.zStage, local: s.zLocal, remote: s.zRemote };

type Source = 'most_used' | 'explorer';

/** Copies a command. Never throws: some browsers block the clipboard outside a secure page. */
export async function copyCommand(cmd: string, source: Source): Promise<boolean> {
  let ok = false;
  try {
    await navigator.clipboard.writeText(cmd);
    ok = true;
  } catch {
    ok = false;
  }
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  gtag?.('event', 'git_command_copy', { command: cmd, source });
  return ok;
}

/** Splits a command into the fixed part and the part the reader replaces (from the first < or "). */
export function splitCommand(cmd: string): [string, string] {
  const i = cmd.search(/[<"]/);
  return i < 0 ? [cmd, ''] : [cmd.slice(0, i), cmd.slice(i)];
}

export function CmdText({ cmd }: { cmd: string }) {
  const [head, tail] = splitCommand(cmd);
  return <>{head}{tail && <span className={s.ph}>{tail}</span>}</>;
}

/** A small icon button that copies one command and shows a tick for a moment. */
export function CopyIcon({ cmd, source }: { cmd: string; source: Source }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const onClick = async () => {
    await copyCommand(cmd, source);
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1400);
  };
  return (
    <button type="button" className={s.copyIcon} aria-label={`Copy ${cmd}`} onClick={onClick}>
      {done ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
    </button>
  );
}

/** The warning icon shown beside commands that can delete work. */
export function Risky() {
  return <TriangleAlert size={13} className={s.riskIcon} aria-label="Can delete work" role="img" />;
}

/** The card that explains one command: what it does, where it moves files, when to use it. */
export function CommandExplainer({ c, source }: { c: GitCommand; source: Source }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    await copyCommand(c.cmd, source);
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 1400);
  };
  const moves = c.from !== null && c.to !== null;
  const caption = moves
    ? `${ZONES[c.from as Zone].full} → ${ZONES[c.to as Zone].full}`
    : c.lit.map((z) => ZONES[z].full).join(' and ');
  const l0 = moves ? 12.5 + ZONE_ORDER.indexOf(c.from as Zone) * 25 : 0;
  const l1 = moves ? 12.5 + ZONE_ORDER.indexOf(c.to as Zone) * 25 : 0;
  return (
    <div className={s.explainer}>
      <div className={s.cmdBar}>
        <code className={s.cmdText}><CmdText cmd={c.cmd} /></code>
        <button type="button" className={`${s.copyBtn} ${done ? s.copied : ''}`} onClick={copy}>
          {done ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          <span aria-live="polite">{done ? 'Copied!' : 'Copy command'}</span>
        </button>
      </div>
      <p className={s.what}>{c.what}</p>
      <div
        className={s.track}
        aria-hidden="true"
        style={{ ['--l0' as string]: `${l0}%`, ['--l1' as string]: `${l1}%` }}
      >
        <span className={s.trackLine} />
        {moves && <span className={s.block} />}
        {ZONE_ORDER.map((z) => {
          const state = moves ? (z === c.to ? s.tileTo : z === c.from ? s.tileFrom : s.tileDim) : c.lit.includes(z) ? s.tileLit : s.tileDim;
          return (
            <span key={z} className={`${s.tileWrap} ${state}`}>
              <span className={s.tile}>{ZONES[z].icon}</span>
              <span className={s.tileLabel}>{ZONES[z].tile}</span>
            </span>
          );
        })}
      </div>
      <div className={s.caption}>
        <span className={s.verb}>{c.verb}</span>
        <span>{caption}</span>
      </div>
      <div className={s.twoCards}>
        <div className={s.miniCard}>
          <span className={s.miniLabel}>USE IT WHEN</span>
          <p>{c.when}</p>
        </div>
        <div className={s.miniCard}>
          <span className={s.miniLabel}>💡 TIP</span>
          <p>{c.tip}</p>
        </div>
      </div>
    </div>
  );
}

/** The zone filter shared by the four-step flow and the command explorer. */
type Ctx = { zone: Zone | null; setZone: (z: Zone | null) => void };
const ZoneContext = createContext<Ctx>({ zone: null, setZone: () => undefined });
export const useZoneFilter = () => useContext(ZoneContext);

export function ZoneProvider({ children }: { children: React.ReactNode }) {
  const [zone, setZoneState] = useState<Zone | null>(null);
  const setZone = useCallback((z: Zone | null) => setZoneState(z), []);
  return <ZoneContext.Provider value={{ zone, setZone }}>{children}</ZoneContext.Provider>;
}
