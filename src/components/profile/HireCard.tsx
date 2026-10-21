import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useClerk, useUser } from '@clerk/react';
import { Calendar, Clock, Download, Mail } from 'lucide-react';
import type { ProfileExtras } from '../../lib/profile/types';
import styles from './profile.module.css';

const RATE_KEY = 'rh-profile-msg';
const MAX_PER_HOUR = 5;

const ENGAGEMENT_LABEL: Record<string, string> = {
  contract: 'Contract',
  'full-time': 'Full time',
  freelance: 'Freelance',
  mentoring: 'Mentoring',
};

/** Client-side limit of 5 messages an hour. A friendly guard, not a security boundary. */
function withinRateLimit(): boolean {
  try {
    const now = Date.now();
    const times = (JSON.parse(localStorage.getItem(RATE_KEY) ?? '[]') as number[]).filter((t) => now - t < 3_600_000);
    return times.length < MAX_PER_HOUR;
  } catch {
    return true;
  }
}
function recordSend(): void {
  try {
    const now = Date.now();
    const times = (JSON.parse(localStorage.getItem(RATE_KEY) ?? '[]') as number[]).filter((t) => now - t < 3_600_000);
    localStorage.setItem(RATE_KEY, JSON.stringify([...times, now]));
  } catch {
    // ignore
  }
}

function useViewer(): { login: string | null; name: string; email: string; signIn: () => void } {
  // useUser throws when no ClerkProvider is mounted, so keep the page working without it.
  try {
    const { user } = useUser();
    const clerk = useClerk();
    return {
      login: user?.externalAccounts?.find((a) => a.provider === 'github')?.username ?? null,
      name: user?.fullName ?? '',
      email: user?.primaryEmailAddress?.emailAddress ?? '',
      signIn: () => clerk?.openSignIn?.({}),
    };
  } catch {
    return { login: null, name: '', email: '', signIn: () => undefined };
  }
}

function MessageForm({ handle, profileUrl, onDone }: { handle: string; profileUrl: string; onDone: () => void }) {
  const { siteConfig } = useDocusaurusContext();
  const viewer = useViewer();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  if (!viewer.login) {
    return (
      <div className={styles.msgBox}>
        <p>Sign in with GitHub to send a message. This keeps spam out and your email private.</p>
        <button type="button" className={styles.btnPrimary} onClick={viewer.signIn}>Sign in with GitHub</button>
      </div>
    );
  }
  if (status === 'sent') {
    return (
      <div className={styles.msgBox}>
        <p><strong>Message sent.</strong> It goes through recode hive, so the email address of the person you wrote to stays private.</p>
        <button type="button" className={styles.btnOutline} onClick={onDone}>Close</button>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // Honeypot: real people never fill this field
    if (String(form.get('website') ?? '') !== '') {
      setStatus('sent');
      return;
    }
    const publicKey = String(siteConfig.customFields?.EMAILJS_PUBLIC_KEY ?? '');
    const serviceId = String(siteConfig.customFields?.EMAILJS_SERVICE_ID ?? '');
    const templateId = String(siteConfig.customFields?.EMAILJS_TEMPLATE_ID ?? '');
    if (!publicKey || !serviceId || !templateId) {
      setError('Messaging is not set up yet.');
      setStatus('error');
      return;
    }
    if (!withinRateLimit()) {
      setError('You have sent a few messages already. Please try again in an hour.');
      setStatus('error');
      return;
    }
    const name = String(form.get('name') ?? '').trim().slice(0, 80);
    const email = String(form.get('email') ?? '').trim().slice(0, 120);
    const message = String(form.get('message') ?? '').trim().slice(0, 1000);
    if (!name || !email || !message) return;
    setStatus('sending');
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          firstName: name,
          lastName: `(@${viewer.login})`,
          email,
          subject: `Profile message for @${handle}`,
          message: `${message}\n\n---\nFor: @${handle}\nFrom GitHub: @${viewer.login}\nProfile: ${profileUrl}`,
        },
        { publicKey },
      );
      recordSend();
      setStatus('sent');
    } catch {
      setError('Could not send the message. Please try again in a moment.');
      setStatus('error');
    }
  };

  return (
    <form className={styles.msgBox} onSubmit={(e) => void onSubmit(e)}>
      <label>Your name<input name="name" defaultValue={viewer.name} required maxLength={80} autoComplete="name" /></label>
      <label>Your email<input name="email" type="email" defaultValue={viewer.email} required maxLength={120} autoComplete="email" /></label>
      <label>Message<textarea name="message" required maxLength={1000} rows={4} /></label>
      <input className={styles.hp} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {status === 'error' && <p className={styles.msgError} role="alert">{error}</p>}
      <div className={styles.thinActions}>
        <button type="submit" className={styles.btnPrimary} disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send message'}</button>
        <button type="button" className={styles.btnOutline} onClick={onDone}>Cancel</button>
      </div>
    </form>
  );
}

export default function HireCard({ firstName, handle, hire, timezone, profileUrl }: { firstName: string; handle: string; hire: NonNullable<ProfileExtras['hire']>; timezone?: string; profileUrl: string }) {
  const [open, setOpen] = useState(false);
  return (
    <section id="hire" className={`${styles.card} ${styles.hire}`} aria-labelledby="hire-title">
      <p className={styles.openPill}><span className={styles.liveDotGreen} aria-hidden="true" /> Open to work</p>
      <h2 id="hire-title" className={styles.h2}>Work with {firstName}</h2>
      <ul className={styles.hireRows}>
        {hire.roles && hire.roles.length > 0 && <li><strong>Roles</strong><span>{hire.roles.join(', ')}</span></li>}
        {hire.engagement && hire.engagement.length > 0 && <li><strong>Type</strong><span>{hire.engagement.map((e) => ENGAGEMENT_LABEL[e] ?? e).join(' or ')}</span></li>}
        {hire.workRights && <li><strong>Work rights</strong><span>{hire.workRights}</span></li>}
        {timezone && <li><strong><Clock size={13} aria-hidden="true" /> Time zone</strong><span>{timezone}</span></li>}
      </ul>
      <div className={styles.hireButtons}>
        {hire.bookingUrl && <a className={styles.btnPrimary} href={hire.bookingUrl} target="_blank" rel="noopener nofollow ugc"><Calendar size={15} aria-hidden="true" /> Book a call</a>}
        <button type="button" className={styles.btnOutline} aria-expanded={open} onClick={() => setOpen((o) => !o)}><Mail size={15} aria-hidden="true" /> Message</button>
        {hire.cvUrl && <a className={styles.btnOutline} href={hire.cvUrl} target="_blank" rel="noopener nofollow ugc"><Download size={15} aria-hidden="true" /> CV</a>}
      </div>
      {open && <MessageForm handle={handle} profileUrl={profileUrl} onDone={() => setOpen(false)} />}
      <p className={styles.hireNote}>Messages go through recode hive. Your email stays private.</p>
    </section>
  );
}
