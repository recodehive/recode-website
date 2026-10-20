import React, { useState } from 'react';
import { Github, GitPullRequest, Linkedin, Lock, Star, Youtube } from 'lucide-react';
import { HalloweenBats } from '../../Halloween';
import { DiscordIcon } from '../../navbar/Icons';
import { GIVEAWAY, SOCIAL_ACTIONS, endsMs, startsMs, type GiveawayAction } from '../../../data/giveaway';
import { useGiveaway } from './useGiveaway';
import styles from './halloween.module.css';

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
  pr: { node: <GitPullRequest size={18} />, bg: '#8250df' },
};

const pad = (n: number) => String(n).padStart(2, '0');

function Countdown({ target, now }: { target: number; now: number | null }) {
  if (now === null) {
    return <p className={styles.staticEnds}>Ends November 1</p>;
  }
  const left = Math.max(0, target - now);
  const d = Math.floor(left / 86400000);
  const h = Math.floor((left % 86400000) / 3600000);
  const m = Math.floor((left % 3600000) / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return (
    <div role="timer" aria-live="off" aria-label={`${d} days, ${h} hours and ${m} minutes left`} className={styles.timer}>
      {[['DAYS', d], ['HOURS', h], ['MINS', m], ['SECS', s]].map(([label, v]) => (
        <div key={label as string} className={styles.timeBox}>
          <strong>{pad(v as number)}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function Ghost() {
  return (
    <div className={styles.ghost} aria-hidden="true">
      <div className={styles.bubble}>boo! one PR = 10 entries</div>
      <div className={styles.ghostIn}>
        <svg viewBox="0 0 90 100" width="96" focusable="false">
          <path d="M45 6 C22 6 10 24 10 46 V86 Q17 78 24 86 Q31 94 38 86 Q45 78 52 86 Q59 94 66 86 Q73 78 80 86 V46 C80 24 68 6 45 6 Z" fill="#fff" />
          <path d="M12 50 Q2 54 7 63" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <path d="M78 50 Q88 54 83 63" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <ellipse className={styles.eye} cx="34" cy="42" rx="5" ry="7" fill="#0f172a" />
          <ellipse className={styles.eye} cx="56" cy="42" rx="5" ry="7" fill="#0f172a" />
          <ellipse cx="45" cy="58" rx="4.5" ry="5" fill="#0f172a" />
          <circle cx="25" cy="54" r="4" fill="#fda4af" opacity=".6" />
          <circle cx="65" cy="54" r="4" fill="#fda4af" opacity=".6" />
        </svg>
      </div>
    </div>
  );
}

function Pumpkin({ size, hop = false }: { size: number; hop?: boolean }) {
  return (
    <div className={`${styles.pumpkin} ${hop ? styles.hop : ''}`} style={{ width: size }} aria-hidden="true">
      <span className={styles.glow} />
      <svg viewBox="0 0 100 90" width={size} focusable="false">
        <ellipse cx="30" cy="56" rx="22" ry="28" fill="#ea580c" />
        <ellipse cx="70" cy="56" rx="22" ry="28" fill="#ea580c" />
        <ellipse cx="50" cy="55" rx="25" ry="31" fill="#f97316" />
        <path d="M47 26 Q46 16 52 10 L56 13 Q52 18 53 26 Z" fill="#2e8555" />
        <g fill="#fde68a">
          <path d="M30 46 L40 40 L41 52 Z" /><path d="M70 46 L60 40 L59 52 Z" /><path d="M47 56 L50 50 L53 56 Z" />
          <path d="M28 62 L35 66 L40 61 L45 67 L50 62 L55 67 L60 61 L65 66 L72 62 Q66 76 50 77 Q34 76 28 62 Z" />
        </g>
      </svg>
    </div>
  );
}

function ActionRow({ action, done, onDo, prCount }: { action: GiveawayAction; done: boolean; onDo: () => void; prCount: number | null }) {
  const icon = ICON[action.id];
  const isPr = Boolean(action.perPr);
  const prEntries = (prCount ?? 0) * action.entries;
  const filled = isPr ? prEntries > 0 : done;
  const label = isPr ? (prEntries > 0 ? `✓ +${prEntries}` : `+${action.entries}`) : done ? `✓ +${action.entries}` : `+${action.entries}`;
  return (
    <li className={styles.action}>
      <span className={styles.tile} style={{ background: icon.bg }} aria-hidden="true">{icon.node}</span>
      <span className={styles.actionText}>
        <span className={styles.actionLabel}>
          {action.label}
          {isPr && <span className={styles.big}>BIG</span>}
        </span>
        <span className={styles.actionSub}>{isPr && prCount ? `${prCount} merged in the window` : action.sub}</span>
      </span>
      <a
        className={`${styles.entryBtn} ${filled ? styles.entryDone : ''}`}
        href={action.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-pressed={filled}
        onClick={isPr ? undefined : onDo}
      >
        {label}
        <span className={styles.srOnly}>{` for ${action.label} (opens in a new tab)`}</span>
      </a>
    </li>
  );
}

function ReferCard({ login }: { login: string | null }) {
  const [copied, setCopied] = useState(false);
  const link = `recodehive.com/giveaway?ref=${login ?? 'your-github-handle'}`;
  const full = `https://${link}`;
  const text = 'Join me in the recode hive Halloween giveaway: earn entries by contributing and following recode hive.';

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
    { id: 'linkedin', label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(full)}`, icon: <Linkedin size={20} fill="currentColor" />, bg: '#0a66c2' },
    { id: 'x', label: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(full)}`, icon: <XMark size={18} />, bg: '#111827' },
    { id: 'wa', label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${text} ${full}`)}`, icon: <WhatsApp size={20} />, bg: '#25d366' },
  ];

  return (
    <section className={styles.panel} aria-labelledby="refer-title">
      <div className={styles.panelHead}>
        <div>
          <h2 id="refer-title" className={styles.panelTitle}>Refer friends</h2>
          <p className={styles.panelSub}>+{GIVEAWAY.referral.entriesPerFriend} entries for every friend who joins and completes one action</p>
        </div>
      </div>
      <div className={styles.referBody}>
        <div className={styles.linkBox}>
          <code>{link}</code>
          <button type="button" className={styles.copyBtn} onClick={copy}>{copied ? 'Copied!' : 'Copy link'}</button>
        </div>
        <div className={styles.shares}>
          {shares.map((s) => (
            <a key={s.id} className={styles.share} href={s.href} target="_blank" rel="noopener noreferrer">
              <span className={styles.shareIcon} style={{ background: s.bg }}>{s.icon}</span>
              {s.label}
              <span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          ))}
          <button type="button" className={styles.share} onClick={copy}>
            <span className={styles.shareIcon} style={{ background: '#5865f2' }}><DiscordIcon size={20} /></span>
            Discord
          </button>
        </div>
        <div className={styles.friendsHead}>
          <span>Friends who joined</span>
          <span>up to {GIVEAWAY.referral.maxFriends}</span>
        </div>
        <ul className={styles.slots} aria-label="Referral slots">
          {Array.from({ length: GIVEAWAY.referral.maxFriends }, (_, i) => <li key={i} className={styles.slot} />)}
        </ul>
        <p className={styles.fine}>
          <strong>Up to {GIVEAWAY.referral.maxFriends} referrals count</strong> ({GIVEAWAY.referral.maxFriends * GIVEAWAY.referral.entriesPerFriend} entries). Friends must sign in with GitHub and finish at least one action. Self-referrals and duplicate accounts are removed before the draw. Referrals are confirmed when the draw runs.
        </p>
      </div>
    </section>
  );
}

export default function HalloweenView({ now, phase }: { now: number | null; phase: 'upcoming' | 'live' }) {
  const g = useGiveaway();
  const target = phase === 'upcoming' ? startsMs : endsMs;
  const prAction = GIVEAWAY.actions.find((a) => a.perPr);
  const daysLeft = now === null ? null : Math.max(0, Math.ceil((target - now) / 86400000));
  const socialMax = SOCIAL_ACTIONS.reduce((s, a) => s + a.entries, 0) + GIVEAWAY.bonus.entries;
  const pct = Math.min(100, (g.entries / socialMax) * 100);

  return (
    <div className={styles.page}>
      <HalloweenBats />
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.moon} aria-hidden="true" />
      <svg className={styles.web} viewBox="0 0 160 160" aria-hidden="true" focusable="false">
        <g stroke="#c4b5fd" strokeWidth="1" fill="none" opacity="0.35">
          <path d="M0 0 L160 120 M0 0 L120 160 M0 0 L160 60 M0 0 L60 160 M0 0 L160 160" />
          <path d="M30 0 Q22 22 0 30 M60 0 Q42 42 0 60 M95 0 Q64 64 0 95 M130 0 Q88 88 0 130" />
        </g>
      </svg>

      <div className={styles.inner}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <p className={styles.pill}>{'\u{1F383}'} HALLOWEEN GIVEAWAY {'·'} OCT 21 TO NOV 1</p>
            <h1 className={styles.h1}>Trick or commit.<br /><span className={styles.orange}>Win with the hive.</span></h1>
            <p className={styles.lede}>
              Earn entries by contributing and following recode hive. Merged pull requests count the most. Three winners are drawn when the clock hits zero.
            </p>
            <Countdown target={target} now={now} />
            <p className={styles.closes}>Entries close Sunday, November 1 at 11:59 pm Sydney time</p>
          </div>
          <div className={styles.heroArt}>
            <Ghost />
            <div className={styles.patch}>
              <Pumpkin size={104} />
              <Pumpkin size={64} hop />
            </div>
            <div className={styles.prize}>
              <span className={styles.prizeLabel}>PRIZES</span>
              <strong>{GIVEAWAY.winners} winners</strong>
              <span>{GIVEAWAY.prize || 'Prize details coming soon'}</span>
            </div>
          </div>
        </section>

        <div className={styles.statRow}>
          <div className={styles.stat}><span aria-hidden="true">{'⌛'}</span><div><strong>{daysLeft ?? '-'} days</strong><small>{phase === 'upcoming' ? 'until it starts' : 'until the draw'}</small></div></div>
          <div className={styles.stat}><span aria-hidden="true">{'\u{1F39F}️'}</span><div><strong>{g.signedIn ? g.entries : '-'}</strong><small>{g.signedIn ? 'entries you have earned' : 'sign in to see your entries'}</small></div></div>
          <div className={styles.stat}><span aria-hidden="true">{'\u{1F3C6}'}</span><div><strong>{GIVEAWAY.winners}</strong><small>winners this round</small></div></div>
        </div>

        <div className={styles.cols}>
          <section className={styles.panel} aria-labelledby="earn-title">
            <div className={styles.panelHead}>
              <div>
                <h2 id="earn-title" className={styles.panelTitle}>Earn entries</h2>
                <p className={styles.panelSub}>Each action adds entries. Do them all for a bonus.</p>
              </div>
              {g.signedIn && g.login && (
                <span className={styles.me}>{g.avatar && <img src={g.avatar} alt="" width={24} height={24} loading="lazy" />}@{g.login}</span>
              )}
            </div>
            <div className={styles.progress}>
              <div className={styles.bar} role="progressbar" aria-label="Your entries" aria-valuemin={0} aria-valuemax={socialMax} aria-valuenow={Math.min(g.entries, socialMax)}>
                <span style={{ width: `${pct}%` }} />
              </div>
              <strong>{g.entries} entries</strong>
            </div>
            <ul className={styles.actions}>
              {GIVEAWAY.actions.map((a) => (
                <ActionRow key={a.id} action={a} done={Boolean(g.saved.done[a.id])} onDo={() => g.markDone(a.id)} prCount={a.perPr ? g.prCount : null} />
              ))}
              <li className={styles.action}>
                <span className={styles.tile} style={{ background: '#f59e0b' }} aria-hidden="true"><Star size={18} fill="currentColor" /></span>
                <span className={styles.actionText}>
                  <span className={styles.actionLabel}>{GIVEAWAY.bonus.label}</span>
                  <span className={styles.actionSub}>Unlocks {GIVEAWAY.bonus.entries} bonus entries</span>
                </span>
                <button
                  type="button"
                  className={`${styles.entryBtn} ${g.saved.bonus ? styles.entryDone : ''}`}
                  disabled={!g.allSocialDone || Boolean(g.saved.bonus)}
                  aria-pressed={Boolean(g.saved.bonus)}
                  onClick={g.claimBonus}
                >
                  {g.saved.bonus ? `✓ +${GIVEAWAY.bonus.entries}` : g.allSocialDone ? `Claim +${GIVEAWAY.bonus.entries}` : <><Lock size={12} aria-hidden="true" /> +{GIVEAWAY.bonus.entries}</>}
                </button>
              </li>
            </ul>
            <p className={styles.panelFoot}>
              <a href="#giveaway-rules">Terms and conditions</a>
              {!g.signedIn && <><span aria-hidden="true"> {'·'} </span><button type="button" onClick={g.signIn}>Sign in with GitHub to save your entries</button></>}
            </p>
          </section>
          <ReferCard login={g.login} />
        </div>

        <section className={styles.how} aria-labelledby="how-title">
          <h2 id="how-title" className={styles.h2}>How winners are picked</h2>
          <ol className={styles.steps}>
            <li><span>01</span><h3>Earn entries</h3><p>Social actions add 1 or 2 entries, referrals add {GIVEAWAY.referral.entriesPerFriend}, and every merged PR adds {prAction?.entries ?? 10}.</p></li>
            <li><span>02</span><h3>Random draw</h3><p>After entries close, {GIVEAWAY.winners === 3 ? 'three' : GIVEAWAY.winners} winners are drawn at random. More entries means more chances.</p></li>
            <li><span>03</span><h3>Winners announced</h3><p>Winners are announced on Discord and LinkedIn, and contacted through GitHub.</p></li>
          </ol>
        </section>

        <details id="giveaway-rules" className={styles.rules} open>
          <summary>Giveaway rules</summary>
          <ul>
            <li>Runs from October 21 to November 1, 2026, 11:59 pm Sydney time.</li>
            <li>Free to enter. No purchase necessary.</li>
            <li>One GitHub account per person. Duplicate or fake accounts are disqualified.</li>
            <li>recode hive maintainers and staff can take part but cannot win.</li>
            <li>Spam pull requests do not count. Only PRs merged by a maintainer earn entries.</li>
            <li>Winners have 7 days to reply before a new winner is drawn.</li>
          </ul>
        </details>
      </div>
    </div>
  );
}
