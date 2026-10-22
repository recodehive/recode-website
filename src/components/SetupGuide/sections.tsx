import React, { useId, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Check, Clock, Monitor } from 'lucide-react';
import type { IconType } from 'react-icons';
import { FaApple, FaGithub, FaLinux, FaWindows } from 'react-icons/fa';
import { UserToken } from './blocks';
import { STEPS } from './steps';
import { OS_LIST, jumpToStep, useSetup, type OS } from './state';
import s from './SetupGuide.module.css';

export function Hero() {
  return (
    <section className={s.hero}>
      <p className={s.eyebrow}>{'✦'} First-time setup · For complete beginners</p>
      <h1 className={s.heroTitle}>
        Zero to localhost:
        <span>run recode hive on your computer</span>
      </h1>
      <p className={s.heroText}>
        Never used GitHub? Perfect. In about 30 minutes you will fork the project, download it, and see the recode hive website running on your own machine. Tick each step as you go. We save your progress.
      </p>
      <ul className={s.chips}>
        <li><Clock size={13} aria-hidden="true" /> 20 to 30 minutes</li>
        <li>10 steps</li>
        <li>Windows, macOS or Linux</li>
        <li>No coding needed</li>
      </ul>
    </section>
  );
}

const OS_OPTIONS: { id: OS; label: string; Icon: IconType }[] = [
  { id: 'win', label: 'Windows', Icon: FaWindows },
  { id: 'mac', label: 'macOS', Icon: FaApple },
  { id: 'linux', label: 'Linux', Icon: FaLinux },
];

export function Personalise() {
  const { os, setOs, username, setUsername } = useSetup();
  const inputId = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + OS_LIST.length) % OS_LIST.length;
    setOs(OS_LIST[next]);
    tabs.current[next]?.focus();
  };

  return (
    <section className={s.persona} aria-label="Personalise the commands">
      <div className={s.personaCol}>
        <p className={s.label} id={`${inputId}-os`}>1. Your computer</p>
        <div className={s.seg} role="tablist" aria-labelledby={`${inputId}-os`}>
          {OS_OPTIONS.map(({ id, label, Icon }, i) => (
            <button
              key={id}
              ref={(el) => { tabs.current[i] = el; }}
              type="button"
              role="tab"
              aria-selected={os === id}
              tabIndex={os === id ? 0 : -1}
              className={`${s.segBtn} ${os === id ? s.segOn : ''}`}
              onClick={() => setOs(id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <Icon size={14} aria-hidden /> {label}
            </button>
          ))}
        </div>
      </div>
      <div className={s.personaCol}>
        <label className={s.label} htmlFor={inputId}>2. Your GitHub username</label>
        <div className={s.userInput}>
          <span aria-hidden="true">github.com/</span>
          <input
            id={inputId}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your-username"
            maxLength={39}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-describedby={`${inputId}-note`}
          />
        </div>
      </div>
      <p className={s.personaNote} id={`${inputId}-note`}>Select your device from above, paste your GitHub username, and all the code to copy will be based on your selection below.</p>
    </section>
  );
}

type NodeId = 'original' | 'fork' | 'computer';
const NODE_COPY: Record<NodeId, { title: string; text: string }> = {
  original: {
    title: 'The original',
    text: "This is recode hive's repository. You cannot change it directly. Instead, you suggest changes with a pull request.",
  },
  fork: {
    title: 'Your fork',
    text: 'A copy of the project under your own GitHub account. You can change it freely. You make it in Step 5.',
  },
  computer: {
    title: 'Your computer',
    text: 'You clone your fork to your computer in Step 6, then run the website at localhost:3000. When you are happy, you push changes back to your fork.',
  },
};

export function Diagram() {
  const [sel, setSel] = useState<NodeId>('fork');
  const node = (id: NodeId, tile: React.ReactNode, tileClass: string, name: React.ReactNode, sub: string) => (
    <button type="button" className={`${s.node} ${sel === id ? s.nodeOn : ''}`} aria-pressed={sel === id} onClick={() => setSel(id)}>
      <span className={`${s.tile} ${tileClass}`} aria-hidden="true">{tile}</span>
      <strong>{name}</strong>
      <small>{sub}</small>
    </button>
  );
  return (
    <section className={s.diagram} aria-labelledby="sg-diagram">
      <div className={s.diagramHead}>
        <h2 id="sg-diagram" className={s.h3}>How it fits together</h2>
        <span className={s.faint}>Click each box</span>
      </div>
      <div className={s.flow}>
        {node('original', <FaGithub size={20} />, s.tileDark, 'recodehive / recode-website', 'The original, on GitHub')}
        <span className={s.arrow} aria-hidden="true"><em>FORK</em><i /></span>
        {node('fork', <FaGithub size={20} />, s.tileGreen, <><UserToken /> / recode-website</>, 'Your copy, on GitHub')}
        <span className={s.arrow} aria-hidden="true"><em>CLONE</em><i /></span>
        {node('computer', <Monitor size={20} />, s.tileBlue, 'Your computer', 'localhost:3000')}
      </div>
      <div className={s.flowBack} aria-hidden="true">
        <span>{'←'} Pull request back to recode hive</span>
        <span>{'←'} Push your changes</span>
      </div>
      <div className={s.flowPanel} aria-live="polite">
        <strong>{NODE_COPY[sel].title}</strong>
        <p>{NODE_COPY[sel].text}</p>
      </div>
    </section>
  );
}

const TOOLS: { step: number; name: string; why: string; check: string; mono: boolean; logo: string }[] = [
  { step: 1, name: 'GitHub account', why: 'Where the project lives. You copy it and share your changes here.', check: 'github.com shows your avatar', mono: false, logo: 'github' },
  { step: 2, name: 'Git', why: 'Downloads the project and tracks every change you make.', check: 'git --version', mono: true, logo: 'git' },
  { step: 3, name: 'Node.js 20 to 22', why: 'Runs the website on your computer. npm comes with it.', check: 'node -v', mono: true, logo: 'nodejs' },
  { step: 4, name: 'Code editor', why: 'To read and edit files. We suggest VS Code.', check: 'code --version', mono: true, logo: 'vscode' },
];

function Logo({ name }: { name: string }) {
  const src = useBaseUrl(`/img/logos/${name}.svg`);
  return <img src={src} alt="" width={26} height={26} loading="lazy" />;
}

export function Preflight() {
  const { done, toggle } = useSetup();
  const ready = TOOLS.filter((t) => done.has(t.step)).length;
  return (
    <section className={s.preflight} aria-labelledby="sg-preflight">
      <div className={s.preHead}>
        <div>
          <p className={s.eyebrowGreen}>PRE-FLIGHT CHECK</p>
          <h2 id="sg-preflight" className={s.h2}>What you will need</h2>
          <p className={s.muted}>Four free tools. Already have one? Run its check and tick it off.</p>
        </div>
        <div className={s.preCount}>
          <span><b>{ready}</b> of 4 ready</span>
          <span className={s.bar} role="progressbar" aria-label="Tools ready" aria-valuemin={0} aria-valuemax={4} aria-valuenow={ready}>
            <span style={{ width: `${(ready / 4) * 100}%` }} />
          </span>
        </div>
      </div>
      <ul className={s.tools}>
        {TOOLS.map((t) => {
          const isReady = done.has(t.step);
          return (
            <li key={t.step} className={`${s.tool} ${isReady ? s.toolReady : ''}`}>
              <span className={s.toolLogo}><Logo name={t.logo} /></span>
              <div className={s.toolInfo}>
                <strong>{t.name}</strong>
                <span>{t.why}</span>
              </div>
              <div className={s.toolCheck}>
                <small>CHECK</small>
                {t.mono ? <code>{t.check}</code> : <span>{t.check}</span>}
              </div>
              <div className={s.toolAction}>
                <button
                  type="button"
                  className={isReady ? s.readyBtn : s.haveBtn}
                  aria-pressed={isReady}
                  aria-label={`${t.name}: mark as ready`}
                  onClick={() => toggle(t.step)}
                >
                  {isReady ? '✓ Ready' : 'I have this'}
                </button>
                {!isReady && (
                  <a href={`#step-${t.step}`} className={s.stepLink} onClick={(e) => { e.preventDefault(); jumpToStep(t.step); }}>
                    Step {t.step} {'→'}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className={s.preNote}>{'💡'} You do not need to know React or TypeScript to get the site running.</p>
    </section>
  );
}

export function StepsList() {
  const { done, toggle } = useSetup();
  return (
    <ol className={s.steps}>
      {STEPS.map((st) => {
        const isDone = done.has(st.n);
        return (
          <li key={st.n} id={`step-${st.n}`} className={`${s.step} ${isDone ? s.stepDone : ''}`}>
            <button type="button" className={s.stepDot} aria-pressed={isDone} aria-label={`Mark step ${st.n} as done`} onClick={() => toggle(st.n)}>
              {isDone ? <Check size={18} aria-hidden="true" /> : st.n}
            </button>
            <div className={s.stepCard}>
              <div className={s.stepHead}>
                <h3 className={s.stepTitle}>{st.title}</h3>
                <span className={s.time}><Clock size={12} aria-hidden="true" /> {st.time}</span>
              </div>
              <div className={s.stepBody}>{st.body}</div>
              <div className={s.stepFoot}>
                <button type="button" className={isDone ? s.doneBtn : s.markBtn} aria-pressed={isDone} aria-label={`Mark step ${st.n} as done`} onClick={() => toggle(st.n)}>
                  {isDone ? '✓ Done' : 'Mark as done'}
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
