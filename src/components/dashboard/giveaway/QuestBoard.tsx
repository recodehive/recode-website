import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Github, GitPullRequest, Linkedin, Lock, Star, Youtube } from 'lucide-react';
import { DiscordIcon } from '../../navbar/Icons';
import { GIVEAWAY, SOCIAL_ACTIONS, endsMs, startsMs, type GiveawayAction } from '../../../data/giveaway';
import { useGiveaway } from './useGiveaway';
import styles from './questboard.module.css';

const ISSUES = 'https://github.com/recodehive/recode-website/issues?q=is%3Aopen+label%3A%22good+first+issue%22';
const ENTRY_TARGET = 33; // star 2 + follow 1 + bonus 5 + one merged PR 10 + 5 referrals 15
const SOCIAL_TOTAL = SOCIAL_ACTIONS.length;

const XMark = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const WhatsApp = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5-1.6A9.9 9.9 0 1 0 12.04 2zm5.7 14.2c-.24.68-1.4 1.3-1.93 1.35-.5.05-1.12.07-1.8-.12-.42-.13-.95-.3-1.64-.6-2.9-1.25-4.78-4.17-4.92-4.36-.14-.19-1.17-1.56-1.17-2.97s.74-2.1 1-2.39c.26-.29.57-.36.76-.36l.55.01c.18 0 .42-.07.65.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.38-.43.51-.14.14-.29.3-.12.58.17.29.74 1.22 1.6 1.98 1.1.98 2.03 1.28 2.32 1.43.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.65-.14.26.1 1.67.79 1.96.93.29.14.48.22.55.34.07.12.07.7-.17 1.38z" />
  </svg>
);

const ICON: Record<string, { node: React.ReactNode; bg: string }> = {
  star: { node: <Star size={18} fill="currentColor" />, bg: '#111827' },
  'follow-gh': { node: <Github size={18} />, bg: '#111827' },
  discord: { node: <DiscordIcon size={18} />, bg: '#5865f2' },
  linkedin: { node: <Linkedin size={18} fill="currentColor" />, bg: '#0a66c2' },
  youtube: { node: <Youtube size={18} fill="currentColor" />, bg: '#ef0000' },
  x: { node: <XMark />, bg: '#111827' },
};

const pad = (n: number) => String(n).padStart(2, '0');

function Countdown({ target, now }: { target: number; now: number | null }) {
  if (now === null) return <p className={styles.staticEnds}>Ends November 1</p>;
  const left = Math.max(0, target - now);
  const d = Math.floor(left / 86400000);
  const h = Math.floor((left % 86400000) / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return (
    <div role="timer" aria-live="off" aria-label={`${d} days, ${h} hours and ${m} minutes left`} className={styles.timer}>
      {[['DAYS', d], ['HRS', h], ['MIN', m], ['SEC', s]].map(([label, v]) => (
        <div key={label as string} className={styles.timeBox}>
          <strong>{pad(v as number)}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Bat({ top, size, duration, delay }: { top: number; size: number; duration: number; delay: number }) {
  return (
    <svg className={styles.bat} style={{ top, width: size, animationDuration: `${duration}s`, animationDelay: `${delay}s` }} viewBox="0 0 60 30" aria-hidden="true" focusable="false">
      <path className={styles.wing} d="M26 14 Q16 2 2 8 Q8 12 6 18 Q12 14 16 20 Q20 14 26 18 Z" />
      <path className={styles.wing} d="M34 14 Q44 2 58 8 Q52 12 54 18 Q48 14 44 20 Q40 14 34 18 Z" />
      <path d="M26 9 L28 13 L32 13 L34 9 L34 22 Q30 27 26 22 Z" />
    </svg>
  );
}

function Pumpkin() {
  return (
    <svg className={styles.pumpkin} viewBox="0 0 100 90" width="62" aria-hidden="true" focusable="false">
      <ellipse cx="32" cy="58" rx="20" ry="25" fill="#ea580c" />
      <ellipse cx="68" cy="58" rx="20" ry="25" fill="#ea580c" />
      <ellipse cx="50" cy="57" rx="23" ry="28" fill="#fb923c" />
      <path d="M47 32 Q46 22 51 17 L55 20 Q51 24 52 32 Z" fill="#2e8555" />
      <g fill="#fde68a"><circle cx="40" cy="52" r="5" /><circle cx="60" cy="52" r="5" /><path d="M38 64 Q50 74 62 64 Q50 68 38 64 Z" /></g>
    </svg>
  );
}

function SocialQuest({ action, done, onDo }: { action: GiveawayAction; done: boolean; onDo: () => void }) {
  const icon = ICON[action.id];
  const counts = action.entries > 0;
  return (
    <li className={`${styles.quest} ${done ? styles.questDone : ''}`}>
      {done && <span className={styles.stamp} aria-hidden="true">{counts ? 'VERIFIED' : 'THANKS'}</span>}
      <div className={styles.questTop}>
        <span className={styles.tile} style={{ background: icon.bg }} aria-hidden="true">{icon.node}</span>
        <span className={`${styles.points} ${counts ? '' : styles.pointsMuted}`}>{counts ? `+${action.entries}` : 'Link'}</span>
      </div>
      <h3 className={styles.questTitle}>{action.label.replace('Star recode-website on GitHub', 'Star recode-website')}</h3>
      <p className={styles.questSub}>{action.sub}</p>
      <a className={`${styles.doBtn} ${done ? styles.doBtnDone : ''}`} href={action.url} target="_blank" rel="noopener noreferrer" aria-pressed={done} onClick={onDo}>
        {done ? '✓ Done' : 'Claim ↗'}
        <span className={styles.srOnly}>{` ${action.label} (opens in a new tab)`}</span>
      </a>
    </li>
  );
}

function Bring({ login }: { login: string | null }) {
  const [copied, setCopied] = useState(false);
  const link = `recodehive.com/giveaway?ref=${login ?? 'your-github-handle'}`;
  const full = `https://${link}`;
  const text = 'Join me in the recode hive Halloween giveaway: collect entries by contributing and following recode hive.';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(full);
    } catch {
      const t = document.createElement('textarea');
      t.value = full;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const shares = [
    { id: 'linkedin', label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(full)}`, icon: <Linkedin size={17} fill="currentColor" />, bg: '#0a66c2' },
    { id: 'x', label: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(full)}`, icon: <XMark size={15} />, bg: '#111827' },
    { id: 'wa', label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${text} ${full}`)}`, icon: <WhatsApp size={17} />, bg: '#25d366' },
  ];

  return (
    <section className={styles.card} aria-labelledby="bring-title">
      <div className={styles.cardHead}>
        <h2 id="bring-title" className={styles.cardTitle}>Bring a friend</h2>
        <span className={styles.muted}>+{GIVEAWAY.referral.entriesPerFriend} each</span>
      </div>
      <div className={styles.linkBox}>
        <code>{link}</code>
        <button type="button" className={`${styles.copyBtn} ${copied ? styles.copied : ''}`} onClick={copy}>{copied ? 'Copied!' : 'Copy link'}</button>
      </div>
      <div className={styles.shares}>
        {shares.map((s) => (
          <a key={s.id} className={styles.share} style={{ background: s.bg }} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label} (opens in a new tab)`}>{s.icon}</a>
        ))}
        <button type="button" className={styles.share} style={{ background: '#5865f2' }} onClick={copy} aria-label="Copy the link to share on Discord"><DiscordIcon size={17} /></button>
      </div>
      <ul className={styles.slots} aria-label="Referral slots">
        {Array.from({ length: GIVEAWAY.referral.maxFriends }, (_, i) => <li key={i} className={styles.slot} />)}
      </ul>
      <p className={styles.fine}>Counts when a friend with a GitHub account at least 30 days old signs in and finishes one verified quest. Up to {GIVEAWAY.referral.maxFriends} friends.</p>
    </section>
  );
}

type Entrant = { login: string; entries: number };

/** Read-only public list of who has how many entries. Fetched only when asked, and only the two public columns. */
function PublicEntries({ baseUrl, anonKey }: { baseUrl: string; anonKey: string }) {
  const [rows, setRows] = useState<Entrant[] | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');

  const load = async () => {
    setState('loading');
    try {
      const q = `giveaway_id=eq.${GIVEAWAY.id}&select=login,entries&order=entries.desc&limit=500`;
      const res = await fetch(`${baseUrl}/rest/v1/giveaway_totals?${q}`, { headers: { apikey: anonKey } });
      if (!res.ok) throw new Error(String(res.status));
      setRows((await res.json()) as Entrant[]);
      setState('idle');
    } catch {
      setState('error');
    }
  };

  return (
    <section className={styles.card} aria-labelledby="public-title">
      <div className={styles.cardHead}>
        <h2 id="public-title" className={styles.cardTitle}>Public entries</h2>
        {rows && <span className={styles.muted}>{rows.length} {rows.length === 1 ? 'person' : 'people'}</span>}
      </div>
      <p className={styles.fine}>
        Anyone can see who has entered and how many entries they have. The list shows GitHub handles and totals only.
        It is read-only: entries are written by our server after checking GitHub, never from this page.
      </p>
      {!rows && (
        <button type="button" className={styles.entriesBtn} onClick={() => void load()} disabled={state === 'loading'}>
          {state === 'loading' ? 'Loading...' : state === 'error' ? 'Could not load, try again' : 'Show the public entries list'}
        </button>
      )}
      {rows && rows.length === 0 && <p className={styles.fine}>No entries yet.</p>}
      {rows && rows.length > 0 && (
        <ol className={styles.entryList}>
          {rows.map((r, i) => (
            <li key={r.login}>
              <span className={styles.entryRank}>{i + 1}</span>
              <a href={`https://github.com/${r.login}`} target="_blank" rel="noopener noreferrer">@{r.login}</a>
              <strong>{r.entries}</strong>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default function QuestBoard({ now, phase }: { now: number | null; phase: 'upcoming' | 'live' }) {
  const g = useGiveaway();
  const target = phase === 'upcoming' ? startsMs : endsMs;
  const pr = GIVEAWAY.actions.find((a) => a.perPr);
  const doneCount = g.socialDone;
  const isDone = (a: GiveawayAction) => (a.verify === 'honor' ? Boolean(g.saved.done[a.id]) : g.verified(a.id));
  const { siteConfig } = useDocusaurusContext();
  const sbUrl = String(siteConfig.customFields?.supabaseUrl ?? '').replace(/\/$/, '');
  const sbKey = String(siteConfig.customFields?.supabaseAnonKey ?? '');
  const prCount = g.prCount ?? 0;
  const pct = Math.min(100, (g.entries / ENTRY_TARGET) * 100);
  const bonusState = g.bonus ? 'claimed' : 'locked';

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.banner}>
          <div className={styles.dots} aria-hidden="true" />
          <div className={styles.flyers} aria-hidden="true">
            <Bat top={34} size={34} duration={17} delay={-3} />
            <Bat top={120} size={24} duration={23} delay={-12} />
          </div>
          <div className={styles.bannerText}>
            <p className={styles.eyebrow}>{'\u{1F383}'} Halloween giveaway {'·'} Oct 21 to Nov 1</p>
            <h1 className={styles.h1}>Trick or commit. <span className={styles.orange}>Fill your bag.</span></h1>
            <p className={styles.prize}>
              <span className={styles.gift} aria-hidden="true">{'\u{1F381}'}</span>
              <span><b>{GIVEAWAY.prize}</b> {GIVEAWAY.winners === 1 ? 'for one lucky winner' : `for each of ${GIVEAWAY.winners} winners`}</span>
            </p>
          </div>
          <div className={styles.bannerTimer}>
            <Countdown target={target} now={now} />
            <p className={styles.closes}>closes Nov 1, 11:59 pm Sydney</p>
          </div>
          <div className={styles.peek} aria-hidden="true"><Pumpkin /></div>
        </div>

        <div className={styles.cols}>
          <section aria-labelledby="quest-title">
            <div className={styles.sectionHead}>
              <h2 id="quest-title" className={styles.h2}>Quest board</h2>
              <span className={styles.muted}>{doneCount} of {SOCIAL_TOTAL} social quests done</span>
            </div>

            <ul className={styles.grid}>
              {pr && (
                <li className={`${styles.prQuest}`}>
                  <span className={`${styles.tile} ${styles.prTile}`} aria-hidden="true"><GitPullRequest size={22} /></span>
                  <div className={styles.prText}>
                    <h3 className={styles.questTitle}>{pr.label} <span className={styles.points}>+{pr.entries} each</span></h3>
                    <p className={styles.questSub}>The big one. Every merged PR with the recode label in any recodehive repo between Oct 21 and Nov 1 adds {pr.entries} entries.</p>
                  </div>
                  <a className={`${styles.prBtn} ${prCount > 0 ? styles.doBtnDone : ''}`} href={ISSUES} target="_blank" rel="noopener noreferrer" aria-pressed={prCount > 0}>
                    {prCount > 0 ? `✓ ${prCount} PR${prCount === 1 ? '' : 's'} merged` : 'Find a good first issue ↗'}
                    <span className={styles.srOnly}> (opens in a new tab)</span>
                  </a>
                </li>
              )}

              {SOCIAL_ACTIONS.map((a) => (
                <SocialQuest key={a.id} action={a} done={isDone(a)} onDo={() => g.markDone(a.id)} />
              ))}

              <li className={styles.bonus}>
                <span className={`${styles.tile} ${styles.bonusTile}`} aria-hidden="true"><Star size={18} fill="currentColor" /></span>
                <div className={styles.prText}>
                  <h3 className={styles.questTitle}>{GIVEAWAY.bonus.label}</h3>
                  <p className={styles.questSub}>Both checked with GitHub. Unlocks {GIVEAWAY.bonus.entries} bonus entries</p>
                </div>
                <span className={`${styles.bonusBtn} ${bonusState === 'claimed' ? styles.doBtnDone : styles.bonusLocked}`}>
                  {bonusState === 'claimed' ? `\u2713 +${GIVEAWAY.bonus.entries}` : <><Lock size={13} aria-hidden="true" /> +{GIVEAWAY.bonus.entries}</>}
                </span>
              </li>
            </ul>
          </section>

          <aside className={styles.side} aria-label="Your progress">
            <section className={styles.card} aria-labelledby="bag-title">
              <div className={styles.cardHead}>
                <h2 id="bag-title" className={styles.cardTitle}>Your candy bag</h2>
                {g.signedIn && g.login && (
                  <span className={styles.me}>{g.avatar && <img src={g.avatar} alt="" width={22} height={22} loading="lazy" />}@{g.login}</span>
                )}
              </div>
              {g.signedIn ? (
                <>
                  <div className={styles.ring} style={{ ['--pct' as string]: `${pct}%` }} role="img" aria-label={`${g.entries} entries so far`}>
                    <div className={styles.ringIn}>
                      <strong>{g.entries}</strong>
                      <span>entries</span>
                    </div>
                  </div>
                  <dl className={styles.breakdown}>
                    <div><dt>Social quests</dt><dd>{doneCount}/{SOCIAL_TOTAL}</dd></div>
                    <div><dt>Merged PRs</dt><dd>{prCount}</dd></div>
                    <div><dt>Referrals</dt><dd>{g.referrals}/{GIVEAWAY.referral.maxFriends}</dd></div>
                    <div><dt>Bonus</dt><dd>{bonusState === 'claimed' ? `+${GIVEAWAY.bonus.entries}` : 'locked'}</dd></div>
                  </dl>
                  <p className={styles.syncNote} role="status">
                    {g.status === 'checking' && 'Checking with GitHub...'}
                    {g.status === 'unconfigured' && 'Entry checking is not connected yet.'}
                    {g.status === 'idle' && 'Entries are checked with GitHub.'}
                    {g.status === 'error' && <>Could not check right now. <button type="button" className={styles.retry} onClick={() => void g.sync()}>Try again</button></>}
                  </p>
                </>
              ) : (
                <div className={styles.signIn}>
                  <div className={`${styles.ring} ${styles.ringEmpty}`} aria-hidden="true"><div className={styles.ringIn}><strong>0</strong><span>entries</span></div></div>
                  <p>Sign in with GitHub to start collecting.</p>
                  <button type="button" className={styles.signInBtn} onClick={g.signIn}>Sign in with GitHub</button>
                </div>
              )}
            </section>
            <Bring login={g.login} />
          </aside>
        </div>

        <div className={styles.bottom}>
          <section className={styles.card} aria-labelledby="how-title">
            <h2 id="how-title" className={styles.cardTitle}>{GIVEAWAY.winners === 1 ? 'How the winner is picked' : 'How winners are picked'}</h2>
            <ol className={styles.steps}>
              <li><span>1</span>Collect entries from verified quests, merged PRs and friends. Every entry is checked with GitHub.</li>
              <li><span>2</span>After Nov 1, {GIVEAWAY.winners === 1 ? 'one winner is' : `${GIVEAWAY.winners} winners are`} drawn at random. More entries, more chances.</li>
              <li><span>3</span>{GIVEAWAY.winners === 1 ? 'The winner is' : 'Winners are'} announced on Discord and LinkedIn and contacted through GitHub.</li>
            </ol>
            <p className={styles.fine}>
              How entries are counted: sign in with GitHub and our server checks GitHub for your star, your follow and your merged pull requests. Nothing is taken from your browser.
            </p>
          </section>
          <section id="giveaway-rules" className={styles.card} aria-labelledby="rules-title">
            <h2 id="rules-title" className={styles.cardTitle}>Rules</h2>
            <ul className={styles.rules}>
              <li>Runs from October 21 to November 1, 2026, 11:59 pm Sydney time.</li>
              <li>Free to enter. No purchase necessary.</li>
              <li>One GitHub account per person. Duplicate or fake accounts are disqualified.</li>
              <li>recodehive maintainers and staff can take part but cannot win.</li>
              <li>Only PRs with the recode label, merged by a maintainer, earn entries. Spam pull requests do not count.</li>
              <li>Entries come only from what GitHub confirms. Links to Discord, LinkedIn, YouTube and X are worth no entries.</li>
              <li>{GIVEAWAY.winners === 1 ? 'The winner has' : 'Winners have'} 7 days to reply before a new winner is drawn.</li>
            </ul>
          </section>
        </div>

        {sbUrl && sbKey && (
          <div className={styles.publicRow}>
            <PublicEntries baseUrl={sbUrl} anonKey={sbKey} />
          </div>
        )}
      </div>
    </div>
  );
}
