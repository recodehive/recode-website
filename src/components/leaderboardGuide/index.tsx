import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useUser } from '@clerk/react';
import {
  ArrowRight, ArrowUpRight, BookOpen, Briefcase, Check, ChevronDown, ChevronLeft, ChevronRight, Gift,
  GitCommitHorizontal, GitMerge, Info, KeyRound, LockOpen, MessageSquare, Phone, Rocket, Share2, Star, Trophy,
  Video, X,
} from 'lucide-react';
import { BADGES, type Badge } from '../../data/badges';
import { POINT_LEVELS, REQUIRED_LABEL, scorePR } from '../dashboard/LeaderBoard/pointsConfig';
import { CommunityStatsProvider, useCommunityStatsContext } from '../../lib/statsProvider';
import {
  BADGE_CREDIT, BADGE_GROUPS, FAQ, HERO_BADGES, LEVEL_COPY, MENTORSHIP_CLAIM, OFFERINGS, RANK_TITLES, SHORT_STEPS,
  SPONSOR_POST_URL, SPONSOR_RECIPIENTS, TIERS, WEEKLY_MVP, type OfferingIcon, type RewardIcon,
} from '../../data/leaderboardGuide';
import SponsorBadge from '../sponsors/SponsorBadge';
import s from './LeaderboardGuide.module.css';

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

const BY_ID = new Map(BADGES.map((b) => [b.id, b]));
function badge(id: string): Badge {
  const b = BY_ID.get(id);
  if (!b) throw new Error(`Unknown badge ${id}`);
  return b;
}

const MILESTONES = BADGES.filter((b) => b.group !== 'leaderboard');
const MAX_POINTS = Math.max(...POINT_LEVELS.map((l) => l.points));
const TONE: Record<string, string> = { [REQUIRED_LABEL]: s.tRecode, ...Object.fromEntries(POINT_LEVELS.map((l) => [l.label, s[`t${l.tone}`]])) };

function shortCriteria(b: Badge): string {
  if (b.altThreshold) return `${b.threshold}+ PRs / ${b.altThreshold.value} pts`;
  if (b.metric === 'points') return `${b.threshold}+ points`;
  return `${b.threshold}+ PR${b.threshold === 1 ? '' : 's'}`;
}

function groupTitle(id: string): string {
  return BADGE_GROUPS.find((g) => g.ids.includes(id))?.title ?? '';
}

/** Wraps label names in code pills, so "labelled recode" reads like the real label. */
function withLabels(text: string): React.ReactNode {
  return text.split(/\b(recode)\b(?! hive)/).map((part, i) => (part === REQUIRED_LABEL ? <code key={i}>{part}</code> : part));
}

function BadgeImg({ b, size, className, style, alt }: { b: Badge; size: number; className?: string; style?: CSSVars; alt?: string }) {
  const src = useBaseUrl(b.image);
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={alt ?? `${b.name} badge`}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
    />
  );
}

/** Calls back once the element scrolls into view. */
function useSeen<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/* ---------- Root ---------- */

export function LeaderboardGuide({ children }: { children: React.ReactNode }) {
  return <div className={s.leaderboardGuide}>{children}</div>;
}

/* ---------- 3a. Hero ---------- */

export function GuideHero() {
  return (
    <div className={s.hero}>
      <div className={s.heroText}>
        <div className={s.eyebrow}>✦ LEADERBOARD GUIDE</div>
        <h1 className={s.heroTitle}>
          How the leaderboard works: <span className={s.heroAccent}>points, ranks and badges</span>
        </h1>
        <div className={s.heroIntro}>
          How points are earned, how ranks are decided, what each of the {BADGES.length} badges means, and the perks you
          unlock along the way.
        </div>
        <div className={s.chips}>
          <span>{BADGES.length} badges</span>
          <span>Up to {MAX_POINTS} points per PR</span>
          <span>Weekly MVP</span>
        </div>
      </div>
      <div className={s.cluster} aria-hidden="true">
        {HERO_BADGES.map((id, i) => (
          <BadgeImg key={id} b={badge(id)} size={id === 'rank-1' ? 96 : 62} alt="" className={s.clusterItem} style={{ '--i': i }} />
        ))}
      </div>
    </div>
  );
}

/* ---------- 3b. The short version ---------- */

export function ShortVersion() {
  return (
    <div className={s.steps}>
      {SHORT_STEPS.map((step, i) => (
        <React.Fragment key={step.title}>
          <div className={s.step} style={{ '--i': i } as CSSVars}>
            <div className={s.stepNum}>{i + 1}</div>
            <div className={s.stepTitle}>{step.title}</div>
            <div className={s.stepText}>{withLabels(step.text)}</div>
          </div>
          {i < SHORT_STEPS.length - 1 && (
            <div className={s.conn} aria-hidden="true">
              <span className={s.connDot} style={{ '--i': i } as CSSVars} />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ---------- 3c. How points work ---------- */

function LabelPill({ name }: { name: string }) {
  return <span className={`${s.pill} ${TONE[name] ?? ''}`}>{name}</span>;
}

export function PointsFormula() {
  return (
    <div className={s.formula}>
      <div className={s.fBox}>
        <div className={s.fKicker}>ALWAYS</div>
        <LabelPill name={REQUIRED_LABEL} />
        <div className={s.fNote}>Required on every PR</div>
      </div>
      <div className={s.fOp} aria-hidden="true">+</div>
      <div className={s.fBox}>
        <div className={s.fKicker}>ONE LEVEL</div>
        <div className={s.pillRow}>
          {POINT_LEVELS.map((l) => <LabelPill key={l.label} name={l.label} />)}
        </div>
        <div className={s.fNote}>Case doesn&apos;t matter</div>
      </div>
      <div className={s.fOp} aria-hidden="true">=</div>
      <div className={s.fScore}>
        <div className={s.fKickerLight}>YOU SCORE</div>
        <div className={s.scoreTiles}>
          {POINT_LEVELS.map((l) => (
            <span key={l.label} className={`${s.scoreTile} ${TONE[l.label] ?? ''}`}>{l.points}</span>
          ))}
        </div>
        <div className={s.fNoteLight}>points, by level</div>
      </div>
    </div>
  );
}

export function ZeroRules() {
  return (
    <>
      <div className={s.zero}>
        <span className={s.zeroLabel}>SCORES 0</span>
        <span className={s.zeroChip}><span className={s.zeroX} aria-hidden="true"><X size={10} strokeWidth={3} /></span>No <code>recode</code> label</span>
        <span className={s.zeroChip}><span className={s.zeroX} aria-hidden="true"><X size={10} strokeWidth={3} /></span><code>recode</code> but no level</span>
      </div>
      <div className={s.note}>
        <Info size={15} aria-hidden="true" />
        <span>Two or more level labels? Only the lowest one counts, so <code>level 1</code> + <code>level 3</code> scores 10.</span>
      </div>
    </>
  );
}

export function PointsTable() {
  return (
    <div className={s.tableWrap}>
      <table className={s.ptable}>
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">What it means</th>
            <th scope="col" className={s.ptsHead}>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><LabelPill name={REQUIRED_LABEL} /></td>
            <td>Required on every PR, but worth 0 points alone</td>
            <td className={`${s.pts} ${s.ptsZero}`}>0</td>
          </tr>
          {POINT_LEVELS.map((l) => (
            <tr key={l.label}>
              <td><LabelPill name={l.label} /></td>
              <td>{LEVEL_COPY[l.label]}</td>
              <td className={s.pts}>{l.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SIM_LABELS = [REQUIRED_LABEL, ...POINT_LEVELS.map((l) => l.label)];

function simReason(on: string[], points: number): string {
  const levels = POINT_LEVELS.map((l) => l.label).filter((l) => on.includes(l));
  if (!on.includes(REQUIRED_LABEL)) return 'No recode label, so this PR scores 0, whatever its level.';
  if (levels.length === 0) return 'recode on its own is worth 0. Add a level label.';
  if (levels.length > 1) return `More than one level label, so only the lowest counts: recode + ${levels[0]} = ${points} points.`;
  return `recode + ${levels[0]} = ${points} points added to your total.`;
}

export function LabelSimulator() {
  const [on, setOn] = useState<string[]>([REQUIRED_LABEL, 'level 2']);
  const points = scorePR(on);
  const toggle = (label: string) => setOn((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));

  return (
    <div className={s.sim}>
      <div className={s.simHead}>
        <span className={s.simKicker}>TRY IT</span> Tap the labels on this pull request
      </div>
      <div className={s.pr}>
        <span className={s.merged}><GitMerge size={12} aria-hidden="true" /> Merged</span>
        <div className={s.prTitle}>Add dark mode to the blog page</div>
        <div className={s.prMeta}>Example · merged into recodehive/recode-website</div>
        <div className={s.simLabels} role="group" aria-label="Labels on this pull request">
          {SIM_LABELS.map((label) => (
            <button
              key={label}
              type="button"
              className={`${s.simLabel} ${TONE[label] ?? ''}`}
              aria-pressed={on.includes(label)}
              onClick={() => toggle(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className={s.result} aria-live="polite">
        <span className={`${s.resultPts} ${points > 0 ? s.resultOk : s.resultZero}`}>{points > 0 ? `+${points} pts` : '0 pts'}</span>
        <span className={s.resultText}>{simReason(on, points)}</span>
      </div>
    </div>
  );
}

/* ---------- 3d. What counts ---------- */

const DOS = [
  'Merged PRs with recode label and a level label',
  'Only Work on an issue When it assigned assigned',
  'Reviewing PRs and helping others in discussions (counts toward Weekly MVP)',
];
const DONTS = [
  'PRs without the recode label: 0 points',
  'PRs with no level label: 0 points',
  'PRs that are closed without merging',
  'Issues get assigned FIFO format, if it goes stale it goes to the next person'
];

export function DoDont() {
  return (
    <div className={s.dodont}>
      <div className={s.do}>
        <div className={s.doLabel}>DO</div>
        {DOS.map((t) => (
          <div key={t} className={s.ddRow}>
            <span className={s.icoOk} aria-hidden="true"><Check size={11} strokeWidth={3} /></span>
            <span>{withLabels(t)}</span>
          </div>
        ))}
      </div>
      <div className={s.dont}>
        <div className={s.dontLabel}>DON&apos;T</div>
        {DONTS.map((t) => (
          <div key={t} className={s.ddRow}>
            <span className={s.icoNo} aria-hidden="true"><X size={11} strokeWidth={3} /></span>
            <span>{withLabels(t)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 3e. Ranks ---------- */

export function Podium() {
  const order = ['rank-2', 'rank-1', 'rank-3'];
  return (
    <div className={s.podium}>
      {order.map((id, i) => {
        const b = badge(id);
        const top = id === 'rank-1';
        return (
          <div key={id} className={`${s.pCol} ${s[`p${id.replace('-', '')}`]}`}>
            <div className={s.pRank}>RANK #{b.threshold}</div>
            <BadgeImg b={b} size={top ? 112 : 88} className={s.pImg} style={{ '--i': i }} alt={`Rank #${b.threshold} badge`} />
            <div className={s.pTitle}>{RANK_TITLES[id]}</div>
            <div className={s.pSub}>on the leaderboard</div>
            <div className={s.pBlock} />
          </div>
        );
      })}
    </div>
  );
}

/* ---------- 3f. Achievement badges ---------- */

export function BadgeExplorer() {
  const [idx, setIdx] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const b = MILESTONES[idx];
  const n = MILESTONES.length;

  const go = (next: number, focus: boolean) => {
    const i = (next + n) % n;
    setIdx(i);
    if (focus) tabs.current[i]?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: idx + 1, ArrowDown: idx + 1, ArrowLeft: idx - 1, ArrowUp: idx - 1, Home: 0, End: n - 1 };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  };

  return (
    <>
      <div className={s.bx}>
        <div className={s.bxGrid} role="tablist" aria-label="Achievement badges">
          {MILESTONES.map((m, i) => (
            <button
              key={m.id}
              ref={(el) => { tabs.current[i] = el; }}
              type="button"
              role="tab"
              id={`${id}-t${i}`}
              aria-selected={i === idx}
              aria-controls={`${id}-panel`}
              tabIndex={i === idx ? 0 : -1}
              className={`${s.bxTile} ${i === idx ? s.bxOn : ''}`}
              style={{ '--rgb': m.tier.rgb } as CSSVars}
              onClick={() => go(i, false)}
              onKeyDown={onKey}
            >
              <BadgeImg b={m} size={78} className={s.bxImg} />
              <span className={s.bxName}>{m.name}</span>
              <span className={s.bxCrit}>{shortCriteria(m)}</span>
            </button>
          ))}
        </div>

        <div
          className={s.bxDetail}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-t${idx}`}
          style={{ '--rgb': b.tier.rgb } as CSSVars}
        >
          <BadgeImg key={b.id} b={b} size={150} className={s.bxBig} />
          <div className={s.bxInfo}>
            <div className={s.bxGroup}>{groupTitle(b.id)}</div>
            <div className={s.bxTitle}>{b.name}</div>
            <div className={s.bxDesc}>{b.description}</div>
            <div className={s.bxCriteria}><span>CRITERIA</span>{b.criteria}</div>
          </div>
          <div className={s.bxNav}>
            <button type="button" className={s.bxArrow} onClick={() => go(idx - 1, false)} aria-label="Previous badge">
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <span className={s.bxCount}>{idx + 1} / {n}</span>
            <button type="button" className={s.bxArrow} onClick={() => go(idx + 1, false)} aria-label="Next badge">
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className={s.credit}>
        Badge design by <strong>{BADGE_CREDIT.name}</strong>, {BADGE_CREDIT.role}
      </div>
    </>
  );
}

/* ---------- 3g. Check your progress ---------- */

function unlocked(b: Badge, prs: number, points: number): boolean {
  const main = b.metric === 'points' ? points >= b.threshold : prs >= b.threshold;
  return main || (b.altThreshold ? points >= b.altThreshold.value : false);
}

interface NextUp {
  b: Badge;
  have: number;
  need: number;
  unit: 'merged PRs' | 'points';
}

function nextUp(prs: number, points: number): NextUp | null {
  let best: NextUp | null = null;
  let bestFrac = -1;
  for (const b of MILESTONES) {
    if (unlocked(b, prs, points)) continue;
    const paths: NextUp[] = [b.metric === 'points' ? { b, have: points, need: b.threshold, unit: 'points' } : { b, have: prs, need: b.threshold, unit: 'merged PRs' }];
    if (b.altThreshold) paths.push({ b, have: points, need: b.altThreshold.value, unit: 'points' });
    for (const p of paths) {
      const frac = p.have / p.need;
      if (frac > bestFrac) {
        best = p;
        bestFrac = frac;
      }
    }
  }
  return best;
}

const fmt = (n: number) => n.toLocaleString('en-US');

function StatsLoader({ login, onLoad }: { login: string; onLoad: (prs: number, points: number) => void }) {
  const stats = useCommunityStatsContext();
  const done = useRef(false);
  useEffect(() => {
    if (done.current || !stats.hasContributorsData) return;
    done.current = true;
    const me = stats.getAllTimeContributor(login);
    onLoad(me?.prs ?? 0, me?.points ?? 0);
  }, [stats.hasContributorsData, stats, login, onLoad]);
  return null;
}

/** Only mounted when Clerk is configured, because useUser needs the Clerk provider. */
function Prefill({ onLoad }: { onLoad: (prs: number, points: number) => void }) {
  const { isSignedIn, user } = useUser();
  const login = user?.externalAccounts?.find((a) => a.provider === 'github')?.username ?? null;
  if (!isSignedIn || !login) return null;
  return (
    <CommunityStatsProvider>
      <StatsLoader login={login} onLoad={onLoad} />
    </CommunityStatsProvider>
  );
}

export function ProgressChecker() {
  const { siteConfig } = useDocusaurusContext();
  const canSignIn = Boolean(siteConfig.customFields?.clerkPublishableKey);
  const [prs, setPrs] = useState('');
  const [points, setPoints] = useState('');
  const [prefilled, setPrefilled] = useState(false);
  const touched = useRef(false);
  const id = useId();

  const onLoad = React.useCallback((p: number, pts: number) => {
    if (touched.current) return;
    setPrs(String(p));
    setPoints(String(pts));
    setPrefilled(true);
  }, []);

  const p = Math.max(0, Math.floor(Number(prs) || 0));
  const pts = Math.max(0, Math.floor(Number(points) || 0));
  const count = MILESTONES.filter((b) => unlocked(b, p, pts)).length;
  const next = useMemo(() => nextUp(p, pts), [p, pts]);

  const edit = (set: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    touched.current = true;
    set(e.target.value);
  };

  return (
    <div className={s.pc}>
      {canSignIn && <Prefill onLoad={onLoad} />}
      <div className={s.pcIntro}>Enter your numbers to see which badges you have and what is next.</div>
      <div className={s.pcRow}>
        <label className={s.pcField} htmlFor={`${id}-prs`}>
          <span>MERGED PRS</span>
          <input id={`${id}-prs`} type="number" min={0} inputMode="numeric" value={prs} onChange={edit(setPrs)} placeholder="0" />
        </label>
        <label className={s.pcField} htmlFor={`${id}-pts`}>
          <span>POINTS</span>
          <input id={`${id}-pts`} type="number" min={0} inputMode="numeric" value={points} onChange={edit(setPoints)} placeholder="0" />
        </label>
        <div className={s.pcCount} aria-live="polite">
          <span className={s.pcBig}>{count} of {MILESTONES.length}</span>
          <span>milestone badges unlocked</span>
        </div>
      </div>
      {prefilled && <div className={s.pcHint}>Filled in from your leaderboard stats.</div>}

      <div className={s.pcStrip}>
        {MILESTONES.map((b) => {
          const on = unlocked(b, p, pts);
          return (
            <BadgeImg
              key={b.id}
              b={b}
              size={56}
              className={on ? s.pcOn : s.pcOff}
              style={{ '--rgb': b.tier.rgb }}
              alt={`${b.name} badge, ${on ? 'unlocked' : 'locked'}`}
            />
          );
        })}
      </div>

      <div className={s.pcNext}>
        {next ? (
          <>
            <div className={s.pcNextKicker}>NEXT UP</div>
            <div className={s.pcNextName}>{next.b.name}</div>
            <div className={s.pcBar} aria-hidden="true">
              <div className={s.pcFill} style={{ width: `${Math.min(100, (next.have / next.need) * 100)}%` }} />
            </div>
            <div className={s.pcNextText}>
              {fmt(next.have)} of {fmt(next.need)} {next.unit}. {fmt(next.need - next.have)} to go.
            </div>
          </>
        ) : (
          <div className={s.pcNextName}>Every milestone badge unlocked.</div>
        )}
      </div>
    </div>
  );
}

/* ---------- 3h. Perks and progression ---------- */

export function WeeklyMvp() {
  return (
    <div className={s.mvp}>
      <div className={s.trophy} aria-hidden="true"><Trophy size={26} /></div>
      <div className={s.mvpBody}>
        <div className={s.mvpKicker}>EVERY WEEK</div>
        <div className={s.mvpTitle}>{WEEKLY_MVP.title}</div>
        <div className={s.mvpText}>{WEEKLY_MVP.text}</div>
      </div>
      <div className={s.mvpPrize}>
        <div className={s.mvpAmount}>{WEEKLY_MVP.reward}</div>
        <div className={s.mvpVia}>{WEEKLY_MVP.via}</div>
      </div>
    </div>
  );
}

const REWARD_ICON: Record<RewardIcon, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  phone: Phone,
  star: Star,
  key: KeyRound,
  commit: GitCommitHorizontal,
  briefcase: Briefcase,
  rocket: Rocket,
  gift: Gift,
  share: Share2,
};

export function TierRows() {
  const [ref, seen] = useSeen<HTMLDivElement>();
  return (
    <div ref={ref} className={`${s.tiers} ${seen ? s.tiersIn : ''}`}>
      <span className={s.tierLine} aria-hidden="true" />
      {TIERS.map((t, i) => (
        <div key={t.name} className={s.tierRow} style={{ '--c': t.color, '--i': i } as CSSVars}>
          <div className={s.tierNum} aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
          <div className={s.tierInfo}>
            <div className={s.tierKicker}>TIER {i + 1}</div>
            <div className={s.tierName}>{t.name}</div>
            <div className={s.tierReq}><strong>{t.key}</strong> {t.rest}</div>
            {i > 0 && <div className={s.tierIncl}>Includes every reward above</div>}
          </div>
          <div className={s.rewards}>
            {t.rewards.map((r) => {
              const Icon = REWARD_ICON[r.icon];
              return (
                <div key={r.title} className={`${s.reward} ${r.isNew ? s.rewardNew : ''}`}>
                  {r.isNew && <span className={s.shineWrap} aria-hidden="true" />}
                  {r.isNew && <span className={s.newPill}>NEW</span>}
                  <span className={s.rIcon}><Icon size={15} aria-hidden /></span>
                  <span className={s.rBody}>
                    <span className={s.rTitle}>
                      {r.href ? <a href={r.href}>{r.title}</a> : r.title}
                    </span>
                    <span className={s.rText}>{r.text}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- 3i. Free mentorship ---------- */

const OFFER_ICON: Record<OfferingIcon, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>> = {
  message: MessageSquare,
  book: BookOpen,
  video: Video,
};

export function FreeMentorship() {
  const tier1 = TIERS[0];
  return (
    <>
      <div className={s.mHead}>
        <div>
          <span className={s.mPill}><LockOpen size={13} aria-hidden="true" /> Unlocks at Tier 1 · {tier1.key}</span>
          <div className={s.mLine}>Everything the founder offers to the public, free for contributors who reach Bronze.</div>
        </div>
        <div className={s.mChips}>
          <span>Video calls</span>
          <span>Priority DMs</span>
          <span>Digital guides</span>
        </div>
      </div>
      <div className={s.mClaim}>{MENTORSHIP_CLAIM}</div>
      <div className={s.mGrid}>
        {OFFERINGS.map((o) => {
          const Icon = OFFER_ICON[o.icon];
          return (
            <div key={o.title} className={s.mCard}>
              <div className={s.mType}><span className={s.mIcon}><Icon size={14} aria-hidden /></span>{o.type}</div>
              <div className={s.mTitle}>{o.title}</div>
              <div className={s.mText}>{o.text}</div>
              <div className={s.mFoot}>
                <span className={s.freePill}>Free for contributors</span>
                <a
                  className={s.mArrow}
                  href={o.claimUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ask for your contributor code for ${o.title} on Discord (opens in a new tab)`}
                >
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------- 3j. Sponsorship ---------- */

function Coins() {
  return (
    <div className={s.fConn} aria-hidden="true">
      <span className={s.coin} />
      <span className={`${s.coin} ${s.coinLate}`} />
    </div>
  );
}

export function SponsorFlow() {
  const logo = useBaseUrl('/img/logo.png');
  return (
    <>
      <div className={s.flow}>
        <div className={s.fNode}>
          <SponsorBadge size={56} />
          <div className={s.fTitle}>Sponsors</div>
          <div className={s.fSub}>Support recode hive on GitHub Sponsors</div>
        </div>
        <Coins />
        <div className={`${s.fNode} ${s.fCenter}`}>
          <span className={s.fBadge}>100%</span>
          <img src={logo} alt="" width={40} height={40} className={s.fLogo} />
          <div className={s.fTitle}>recode hive</div>
          <div className={s.fSub}>Keeps nothing</div>
        </div>
        <Coins />
        <div className={s.fNode}>
          <div className={s.fEmoji} aria-hidden="true">🧑‍💻</div>
          <div className={s.fTitle}>Active contributors</div>
          <div className={s.fSub}>Weekly MVPs and top contributors</div>
        </div>
      </div>
      <div className={s.recent}>
        <span className={s.recentLabel}>RECENT SPONSORSHIPS</span>
        {SPONSOR_RECIPIENTS.map((r) => (
          <a key={r.handle} className={s.rChip} href={`https://github.com/${r.handle}`} target="_blank" rel="noopener noreferrer">
            <img src={`https://github.com/${r.handle}.png?size=52`} alt="" width={26} height={26} loading="lazy" />
            <span className={s.rChipText}>
              <span className={s.rHandle}>@{r.handle}</span>
              <span className={s.rDate}>{r.date}</span>
            </span>
          </a>
        ))}
        <a className={s.postLink} href={SPONSOR_POST_URL} target="_blank" rel="noopener noreferrer">
          Full perks and sponsorship post <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

/* ---------- 3k. FAQ ---------- */

export function Faq() {
  const [open, setOpen] = useState<number[]>([0]);
  const id = useId();
  const toggle = (i: number) => setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  return (
    <div className={s.faq}>
      {FAQ.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={item.q} className={s.faqItem}>
            <button
              type="button"
              className={s.faqQ}
              aria-expanded={isOpen}
              aria-controls={`${id}-a${i}`}
              onClick={() => toggle(i)}
            >
              <span>{item.q}</span>
              <ChevronDown size={16} className={isOpen ? s.chevOpen : s.chev} aria-hidden="true" />
            </button>
            <div id={`${id}-a${i}`} className={s.faqA} hidden={!isOpen}>
              {withLabels(item.a)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
