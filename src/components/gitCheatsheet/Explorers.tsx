import React, { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { COMMANDS, GROUPS, MOST_USED, type GroupKey, type Zone } from '../../data/gitCommands';
import { useInView } from '../githubLesson/hooks';
import {
  CmdText, CommandExplainer, CopyIcon, Risky, ZONES, ZONE_CLASS, ZONE_ORDER, useZoneFilter,
} from './shared';
import s from './GitCheatsheet.module.css';

const indexOf = (cmd: string) => COMMANDS.findIndex((c) => c.cmd === cmd);

/** Arrow keys move the selection through the visible tabs, as in the WAI-ARIA vertical tabs pattern. */
function useArrowKeys(order: number[], current: number, select: (i: number) => void, prefix: string) {
  return (e: React.KeyboardEvent) => {
    const pos = order.indexOf(current);
    let to = -1;
    if (e.key === 'ArrowDown') to = order[(pos + 1) % order.length];
    else if (e.key === 'ArrowUp') to = order[(pos + order.length - 1) % order.length];
    else if (e.key === 'Home') to = order[0];
    else if (e.key === 'End') to = order[order.length - 1];
    if (to >= 0) {
      e.preventDefault();
      select(to);
      document.getElementById(`${prefix}-tab-${to}`)?.focus();
    }
  };
}

/** The 10 commands most people need first, with an explainer for the selected one. */
export function MostUsed() {
  const order = useMemo(() => MOST_USED.map(indexOf).filter((i) => i >= 0), []);
  const [current, setCurrent] = useState(order[0]);
  const pos = order.indexOf(current);
  const step = (d: number) => setCurrent(order[(pos + d + order.length) % order.length]);
  const onKey = useArrowKeys(order, current, setCurrent, 'mu');
  return (
    <section className={s.dark} aria-label="Most used Git commands">
      <div className={s.darkHead}>
        <span className={s.darkLabel}>⭐ MOST USED: START WITH THESE</span>
        <span className={s.darkHint}>Pick a command to see what it does</span>
      </div>
      <div className={s.cols}>
        <div className={`${s.list} ${s.listMost}`} role="tablist" aria-orientation="vertical" aria-label="Most used commands" onKeyDown={onKey}>
          {order.map((i, n) => {
            const c = COMMANDS[i];
            return (
              <div key={c.cmd} role="presentation" className={`${s.row} ${i === current ? s.rowOn : ''}`}>
                <button
                  type="button"
                  role="tab"
                  id={`mu-tab-${i}`}
                  aria-selected={i === current}
                  aria-controls={`mu-panel-${i}`}
                  tabIndex={i === current ? 0 : -1}
                  className={s.rowBtn}
                  onClick={() => setCurrent(i)}
                >
                  <span className={s.rowIdx}>{String(n + 1).padStart(2, '0')}</span>
                  <span className={s.rowCmd}><CmdText cmd={c.cmd} /></span>
                </button>
                <CopyIcon cmd={c.cmd} source="most_used" />
              </div>
            );
          })}
        </div>
        <div className={s.right}>
          {order.map((i) => (
            <div key={i} role="tabpanel" id={`mu-panel-${i}`} aria-labelledby={`mu-tab-${i}`} hidden={i !== current} className={s.panel}>
              <CommandExplainer c={COMMANDS[i]} source="most_used" />
            </div>
          ))}
          <div className={s.pager}>
            <button type="button" onClick={() => step(-1)}><ArrowLeft size={13} aria-hidden="true" /> Previous</button>
            <span>{pos + 1} of {order.length}</span>
            <button type="button" onClick={() => step(1)}>Next <ArrowRight size={13} aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

const CONNECTORS = ['git add', 'git commit', 'git push'];

/** Four places a change travels through. Clicking one filters the explorer below to that place. */
export function ZoneFlow() {
  const { zone, setZone } = useZoneFilter();
  const [ref, seen] = useInView<HTMLDivElement>();
  const count = zone ? COMMANDS.filter((c) => c.zone === zone).length : 0;
  return (
    <div ref={ref} className={`${s.flowWrap} ${s.reveal} ${seen ? s.in : ''}`}>
      <div className={s.flow}>
        {ZONE_ORDER.map((z, i) => (
          <React.Fragment key={z}>
            <button
              type="button"
              className={`${s.zoneCard} ${zone === z ? s.zoneOn : ''} ${zone && zone !== z ? s.zoneOff : ''}`}
              aria-pressed={zone === z}
              onClick={() => setZone(zone === z ? null : z)}
            >
              <span className={s.zoneIcon} aria-hidden="true">{ZONES[z].icon}</span>
              <strong>{z === 'remote' ? 'Remote (GitHub)' : z === 'local' ? 'Local repository' : ZONES[z].tile}</strong>
              <span>{ZONES[z].hint}</span>
            </button>
            {i < CONNECTORS.length && (
              <span className={s.conn} aria-hidden="true">
                <em>{CONNECTORS[i]}</em>
                <span className={s.connLine}><span className={s.connBlock} style={{ animationDelay: `${i * 0.7}s` }} /></span>
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className={s.status} aria-live="polite">
        {zone ? (
          <>
            <span><strong>{ZONES[zone].full}:</strong> showing {count} commands that work with {ZONES[zone].hint.toLowerCase()}.</span>
            <button type="button" onClick={() => setZone(null)}>Show all commands <X size={12} aria-hidden="true" /></button>
          </>
        ) : (
          <span><strong>Tip:</strong> git add moves files to staging, git commit saves them to your local repo, git push sends them to GitHub.</span>
        )}
      </div>
    </div>
  );
}

/** Searchable, filterable list of all commands with an explainer for the selected one. */
export function CommandExplorer() {
  const { zone } = useZoneFilter();
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState<GroupKey | 'all'>('all');
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const q = query.trim().toLowerCase();
  const groupTitle = (k: GroupKey) => GROUPS.find((g) => g.key === k)?.title ?? '';
  const visible = useMemo(
    () =>
      COMMANDS.map((c, i) => ({ c, i }))
        .filter(({ c }) => (group === 'all' || c.group === group) && (!zone || c.zone === (zone as Zone)))
        .filter(({ c }) => !q || `${c.cmd} ${c.short} ${c.what} ${groupTitle(c.group)}`.toLowerCase().includes(q))
        .map(({ i }) => i),
    [group, zone, q],
  );
  const current = visible.includes(selected) ? selected : visible.length ? visible[0] : -1;
  const pos = visible.indexOf(current);
  const step = (d: number) => visible.length && setSelected(visible[(pos + d + visible.length) % visible.length]);
  const onKey = useArrowKeys(visible, current, setSelected, 'gx');
  const shown = new Set(visible);
  return (
    <div className={s.explorerWrap}>
      <div className={s.tools}>
        <label className={s.search}>
          <Search size={15} aria-hidden="true" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search commands, e.g. undo or branch" aria-label="Search Git commands" />
        </label>
        <div className={s.chipRow}>
        <div className={s.chips} role="group" aria-label="Command groups">
          <button type="button" className={group === 'all' ? s.chipOn : ''} aria-pressed={group === 'all'} onClick={() => setGroup('all')}>All</button>
          {GROUPS.map((g) => (
            <button key={g.key} type="button" className={group === g.key ? s.chipOn : ''} aria-pressed={group === g.key} onClick={() => setGroup(g.key)}>{g.chip}</button>
          ))}
        </div>
        <span className={s.count} aria-live="polite">{visible.length} of {COMMANDS.length} commands</span>
        </div>
      </div>
      <section className={s.dark} aria-label="All Git commands">
        <div className={s.cols}>
          <div ref={listRef} className={`${s.list} ${s.listAll}`} role="tablist" aria-orientation="vertical" aria-label="All Git commands" onKeyDown={onKey}>
            {GROUPS.map((g) => {
              const inGroup = COMMANDS.map((c, i) => ({ c, i })).filter(({ c }) => c.group === g.key);
              const n = inGroup.filter(({ i }) => shown.has(i)).length;
              return (
                <React.Fragment key={g.key}>
                  <div role="presentation" hidden={n === 0} className={`${s.groupHead} ${g.key === 'adv' ? s.groupAdv : ''}`}>
                    <span>{g.title.toUpperCase()}</span><span>{n}</span>
                  </div>
                  {inGroup.map(({ c, i }) => (
                    <div key={c.cmd} role="presentation" hidden={!shown.has(i)} className={`${s.row} ${i === current ? s.rowOn : ''}`}>
                      <button
                        type="button"
                        role="tab"
                        id={`gx-tab-${i}`}
                        aria-selected={i === current}
                        aria-controls={`gx-panel-${i}`}
                        tabIndex={i === current ? 0 : -1}
                        className={s.rowBtn}
                        onClick={() => setSelected(i)}
                      >
                        <span className={`${s.dot} ${ZONE_CLASS[c.zone]}`} aria-hidden="true" />
                        <span className={s.rowCmd}><CmdText cmd={c.cmd} /></span>
                        {c.risky && <Risky />}
                      </button>
                      <CopyIcon cmd={c.cmd} source="explorer" />
                    </div>
                  ))}
                </React.Fragment>
              );
            })}
            {visible.length === 0 && <p className={s.empty}>No command matches. Try another word.</p>}
          </div>
          <div className={`${s.right} ${s.rightSticky}`}>
            {COMMANDS.map((c, i) => (
              <div key={c.cmd} role="tabpanel" id={`gx-panel-${i}`} aria-labelledby={`gx-tab-${i}`} hidden={i !== current} className={s.panel}>
                <div className={s.pills}>
                  <span className={s.pill}>{groupTitle(c.group)}</span>
                  {c.risky && <span className={`${s.pill} ${s.pillRisk}`}>⚠ Careful: can delete work</span>}
                </div>
                <CommandExplainer c={c} source="explorer" />
              </div>
            ))}
            <div className={s.pager}>
              <button type="button" onClick={() => step(-1)} disabled={!visible.length}><ArrowLeft size={13} aria-hidden="true" /> Previous</button>
              <span>{visible.length ? `${pos + 1} of ${visible.length}` : '0 of 0'}</span>
              <button type="button" onClick={() => step(1)} disabled={!visible.length}>Next <ArrowRight size={13} aria-hidden="true" /></button>
            </div>
            <div className={s.key}>
              <span className={s.keyLabel}>KEY</span>
              <div className={s.keyRow}>
                {ZONE_ORDER.map((z) => (
                  <span key={z}><i className={`${s.dot} ${ZONE_CLASS[z]}`} />{ZONES[z].tile === 'Local repo' ? 'Local repo' : ZONES[z].tile}</span>
                ))}
              </div>
              <div className={s.keyRow}>
                <span><Risky /> Can delete work</span>
                <span><code className={s.ph}>&lt;orange&gt;</code> Your own value</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <p className={s.legend}>
        <span className={s.legendChip}>&lt;file&gt;</span> Replace the part in orange with your own value.{' '}
        <span className={`${s.legendChip} ${s.legendRisk}`}>⚠ Careful</span> Can delete work. Read before running.
      </p>
    </div>
  );
}
