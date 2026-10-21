import React, { useState } from 'react';
import { Download, Linkedin, Mail, QrCode } from 'lucide-react';
import styles from './profile.module.css';

const XMark = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// LinkedIn no longer fills this form from the link (their help page says "Add to Profile" links are static),
// so the card opens the blank form and offers the text to copy.
const LINKEDIN_ADD = 'https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME';

interface Props {
  handle: string;
  name: string;
  title: string;
  profileUrl: string;
  ogImage: string | null;
  rank: number;
}

async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const t = document.createElement('textarea');
    t.value = text;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
  }
}

export default function ShareCard({ handle, name, title, profileUrl, ogImage, rank }: Props) {
  const [copied, setCopied] = useState<'url' | 'cert' | 'link' | null>(null);
  const [qr, setQr] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const certName = `recode hive Contributor · Rank #${rank}`;

  const copy = async (what: 'url' | 'cert' | 'link', text: string) => {
    await copyText(text);
    setCopied(what);
    window.setTimeout(() => setCopied(null), 2000);
  };

  const toggleQr = async () => {
    if (!qr) {
      // Generated in the browser, loaded only when someone asks for it
      const mod = await import('qrcode');
      setQr(await mod.toDataURL(profileUrl, { width: 320, margin: 1, errorCorrectionLevel: 'M' }));
    }
    setShowQr((v) => !v);
  };

  const downloadImage = async () => {
    if (!ogImage) return;
    setDownloading(true);
    try {
      const res = await fetch(ogImage);
      if (!res.ok) throw new Error(String(res.status));
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement('a');
      a.href = url;
      a.download = `recodehive-${handle}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open(ogImage, '_blank', 'noopener');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <section className={styles.card} aria-labelledby="sh">
        <h2 id="sh" className={styles.h2}>Share this profile</h2>
        <div className={styles.urlBox}>
          <code>recodehive.com/u/{handle}</code>
          <button type="button" className={`${styles.copyBtn} ${copied === 'url' ? styles.copied : ''}`} onClick={() => void copy('url', profileUrl)}>{copied === 'url' ? 'Copied!' : 'Copy'}</button>
        </div>
        <div className={styles.shares4}>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`} target="_blank" rel="noopener" aria-label="Share on LinkedIn (opens in a new tab)"><Linkedin size={16} aria-hidden="true" /></a>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(`${name} on recode hive`)}`} target="_blank" rel="noopener" aria-label="Share on X (opens in a new tab)"><XMark /></a>
          <button type="button" aria-label="Show a QR code" aria-expanded={showQr} onClick={() => void toggleQr()}><QrCode size={16} aria-hidden="true" /></button>
          <a href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(profileUrl)}`} aria-label="Share by email"><Mail size={16} aria-hidden="true" /></a>
        </div>
        {showQr && qr && (
          <div className={styles.qr}>
            <img src={qr} alt={`QR code for ${profileUrl}`} width={160} height={160} />
            <a className={styles.btnOutline} href={qr} download={`recodehive-${handle}-qr.png`}><Download size={14} aria-hidden="true" /> Save QR</a>
          </div>
        )}

        {ogImage && (
          <>
            <p className={styles.previewLabel}>HOW YOUR LINK LOOKS ON LINKEDIN</p>
            <div className={styles.preview}>
              <img src={ogImage} alt={`Preview image for ${name}`} width={1200} height={630} loading="lazy" />
              <p><small>recodehive.com</small><strong>{title}</strong></p>
            </div>
            <button type="button" className={styles.btnOutline} onClick={() => void downloadImage()} disabled={downloading}>
              <Download size={14} aria-hidden="true" /> {downloading ? 'Preparing...' : 'Download as image'}
            </button>
          </>
        )}
      </section>

      {rank > 0 && (
        <section className={`${styles.card} ${styles.liCard}`} aria-labelledby="li">
          <h2 id="li" className={styles.h2}>Add to your LinkedIn profile</h2>
          <p className={styles.liText}>Show “{certName}” under Licenses and certifications, linked to this page as proof.</p>
          <a className={styles.liBtn} href={LINKEDIN_ADD} target="_blank" rel="noopener"><Linkedin size={15} aria-hidden="true" /> Add to profile</a>
          <p className={styles.liHelp}>LinkedIn opens a blank form, so copy these two lines into it:</p>
          <div className={styles.copyRow}>
            <button type="button" onClick={() => void copy('cert', certName)}>{copied === 'cert' ? 'Copied!' : 'Copy name'}</button>
            <button type="button" onClick={() => void copy('link', profileUrl)}>{copied === 'link' ? 'Copied!' : 'Copy link'}</button>
          </div>
        </section>
      )}
    </>
  );
}
