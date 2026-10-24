import React, { useMemo, useRef, useState } from 'react';
import { Play, Search } from 'lucide-react';
import { GLOSSARY, QUIZ, SAVE_POINTS, STEPS, VCS_CARDS, VIDEO } from './lessonData';
import { useInView } from './hooks';
import s from './GithubLesson.module.css';

/** Four commits appear one by one, the connectors fill in, and the latest commit glows. */
export function SavePoints() {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div className={`${s.saves} ${seen ? s.in : ''}`} ref={ref}>
      <div className={s.savesTop}>
        <span className={s.savesLabel}>{SAVE_POINTS.label}</span>
        <span className={s.exampleTag}>{SAVE_POINTS.example}</span>
      </div>
      <ol className={s.saveLine}>
        {SAVE_POINTS.commits.map((c, i) => (
          <li key={c.n} className={`${s.save} ${i === SAVE_POINTS.commits.length - 1 ? s.saveNow : ''}`} style={{ animationDelay: `${i * 380}ms` }}>
            <span className={s.saveDot}>{c.n}</span>
            <strong>{c.msg}</strong>
            <small>{c.when}</small>
            {i < SAVE_POINTS.commits.length - 1 && <span className={s.saveLink} style={{ animationDelay: `${i * 380 + 300}ms` }} aria-hidden="true" />}
          </li>
        ))}
      </ol>
      <p className={s.saveNote}>{SAVE_POINTS.note}</p>
    </div>
  );
}

/** Two cards: a central server with dev chips, and developers who each hold a full copy. Text comes from the MDX. */
export function VcsCards({ vcs, dvcs }: { vcs: React.ReactNode; dvcs: React.ReactNode }) {
  return (
    <div className={s.vcsGrid}>
      <div className={s.vcsCard}>
        <span className={s.vcsTag}>{VCS_CARDS.vcs.tag}</span>
        <h4>{VCS_CARDS.vcs.title}</h4>
        <div className={s.vcsText}>{vcs}</div>
        <div className={s.vcsDiagram} aria-hidden="true">
          <span className={s.serverChip}>{VCS_CARDS.vcs.server}</span>
          <span className={s.serverStem} />
          <div className={s.chipRow}>
            {[0, 1, 2].map((i) => <span key={i} className={s.chip} style={{ animationDelay: `${i * 0.5}s` }}>{VCS_CARDS.vcs.dev}</span>)}
          </div>
        </div>
      </div>
      <div className={s.vcsCard}>
        <span className={`${s.vcsTag} ${s.vcsTagGreen}`}>{VCS_CARDS.dvcs.tag}</span>
        <h4>{VCS_CARDS.dvcs.title}</h4>
        <div className={s.vcsText}>{dvcs}</div>
        <div className={s.vcsDiagram} aria-hidden="true">
          <div className={s.chipRow}>
            {[0, 1, 2].map((i) => <span key={i} className={`${s.chip} ${s.chipGreen}`} style={{ animationDelay: `${i * 0.5}s` }}>{VCS_CARDS.dvcs.copy}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/** The 11-row terminology table as searchable cards. By default it shows the 5 terms a beginner needs first. */
export function Glossary() {
  const [all, setAll] = useState(false);
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const shown = useMemo(() => {
    if (q) {
      return GLOSSARY.terms.filter((t) => `${t.key} ${t.term} ${t.text}`.toLowerCase().includes(q));
    }
    if (all) return GLOSSARY.terms;
    return GLOSSARY.terms.filter((t) => t.essential).sort((a, b) => (a.essential ?? 0) - (b.essential ?? 0));
  }, [all, q]);
  const label = q ? `${shown.length} of ${GLOSSARY.terms.length} terms match` : `${shown.length} terms shown`;
  return (
    <div className={s.glossary}>
      <div className={s.glHead}>
        <div>
          <h4>{GLOSSARY.title}</h4>
          <span className={s.glCount} aria-live="polite">{label}</span>
        </div>
        <label className={s.glSearch}>
          <Search size={15} aria-hidden="true" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={GLOSSARY.search} aria-label={GLOSSARY.searchLabel} />
        </label>
      </div>
      <div className={s.glToggle} role="group" aria-label="Which terms to show">
        <button type="button" aria-pressed={!all} className={!all ? s.glOn : ''} onClick={() => setAll(false)}><span aria-hidden="true">⭐</span> {GLOSSARY.essential}</button>
        <button type="button" aria-pressed={all} className={all ? s.glOn : ''} onClick={() => setAll(true)}>{GLOSSARY.all}</button>
      </div>
      {shown.length === 0 ? (
        <p className={s.glEmpty}>{GLOSSARY.empty}</p>
      ) : (
        <div className={s.glGrid}>
          {shown.map((t) => (
            <div key={t.key} className={`${s.term} ${t.essential ? s.termEssential : ''}`}>
              <code>{t.key}</code>
              {t.term && <strong>{t.term}</strong>}
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Five tabs for the everyday workflow. The command of the current step types itself out. */
export function WorkflowStepper() {
  const [step, setStep] = useState(0);
  const [ref, seen] = useInView<HTMLDivElement>();
  const cur = STEPS[step];
  const last = step === STEPS.length - 1;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const to = e.key === 'ArrowRight' ? (i + 1) % STEPS.length : e.key === 'ArrowLeft' ? (i + STEPS.length - 1) % STEPS.length : -1;
    if (to >= 0) {
      e.preventDefault();
      setStep(to);
      tabs.current[to]?.focus();
    }
  };
  return (
    <div className={`${s.stepper} ${s.reveal} ${seen ? s.in : ''}`} ref={ref}>
      <div className={s.tabs} role="tablist" aria-label="The everyday GitHub workflow">
        {STEPS.map((st, i) => (
          <button
            key={st.name}
            ref={(el) => { tabs.current[i] = el; }}
            type="button"
            role="tab"
            id={`ghl-tab-${i}`}
            aria-selected={i === step}
            aria-controls="ghl-panel"
            tabIndex={i === step ? 0 : -1}
            className={`${s.tab} ${i < step ? s.tabDone : ''} ${i === step ? s.tabCur : ''}`}
            onClick={() => setStep(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            <span className={s.tabNum}>{i + 1}</span>
            <span>{st.name}</span>
          </button>
        ))}
      </div>
      <div className={s.stepBar} aria-hidden="true"><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
      <div className={s.stepBody} role="tabpanel" id="ghl-panel" aria-labelledby={`ghl-tab-${step}`}>
        <div className={s.stepText}>
          <h4>{cur.name}</h4>
          <p>{cur.text}</p>
          <div className={s.cmd}>
            {!cur.plain && <span className={s.prompt} aria-hidden="true">$</span>}
            {/* key restarts the typing animation on every step */}
            <code key={step} className={s.typed} style={{ ['--chars' as string]: cur.cmd.length }}>{cur.cmd}</code>
          </div>
        </div>
        <button type="button" className={s.next} onClick={() => setStep(last ? 0 : step + 1)}>
          {last ? 'Start again' : 'Next step →'}
        </button>
      </div>
    </div>
  );
}

/** A thumbnail with a play button. The YouTube iframe only loads after a click. */
export function LiteYouTube() {
  const [on, setOn] = useState(false);
  const src = `https://www.youtube-nocookie.com/embed/${VIDEO.id}?list=${VIDEO.list}&autoplay=1`;
  return (
    <div className={s.video}>
      {on ? (
        <iframe
          src={src}
          title={VIDEO.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className={s.videoBtn} onClick={() => setOn(true)} aria-label={`Play video: ${VIDEO.title}`}>
          <img src={`https://i.ytimg.com/vi/${VIDEO.id}/hqdefault.jpg`} alt="" loading="lazy" />
          <span className={s.videoShade} />
          <span className={s.playBtn} aria-hidden="true"><Play size={26} fill="currentColor" /></span>
          <span className={s.videoCap}><strong>{VIDEO.card}</strong><small>{VIDEO.channel}</small></span>
        </button>
      )}
    </div>
  );
}

/** Three questions. A pick turns green or red, shakes if wrong, and shows why. */
export function QuickCheck({ slug }: { slug: string }) {
  const [picked, setPicked] = useState<(number | null)[]>(QUIZ.questions.map(() => null));
  const done = picked.filter((p) => p !== null).length;
  const correct = picked.filter((p, i) => p === QUIZ.questions[i].answer).length;
  const pick = (qi: number, oi: number) => {
    if (picked[qi] !== null) return;
    setPicked(picked.map((p, i) => (i === qi ? oi : p)));
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    gtag?.('event', 'lesson_quiz_answer', { lesson: slug, question: qi + 1, correct: oi === QUIZ.questions[qi].answer });
  };
  return (
    <section className={s.quiz} aria-label="Quick check">
      <div className={s.quizTop}>
        <span className={s.quizLabel}>{QUIZ.label}</span>
        <span className={s.quizCount} aria-live="polite">{done === QUIZ.questions.length ? `${correct} of ${QUIZ.questions.length} correct` : `${QUIZ.questions.length} questions`}</span>
      </div>
      {QUIZ.questions.map((item, qi) => {
        const chosen = picked[qi];
        return (
          <div key={item.q} className={s.question}>
            <h4>{qi + 1}. {item.q}</h4>
            <div className={s.options}>
              {item.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const state = chosen === null ? '' : oi === item.answer ? s.optOk : isChosen ? `${s.optNo} ${s.shake}` : s.optDim;
                return (
                  <button key={opt} type="button" className={`${s.opt} ${state}`} aria-pressed={isChosen} disabled={chosen !== null} onClick={() => pick(qi, oi)}>
                    {opt}
                  </button>
                );
              })}
            </div>
            <p className={s.why2} aria-live="polite">
              {chosen !== null && (<><strong>{chosen === item.answer ? 'Correct. ' : 'Not quite. '}</strong>{item.why}</>)}
            </p>
          </div>
        );
      })}
    </section>
  );
}
