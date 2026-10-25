import React, { useState } from 'react';
import { useInView } from '../githubLesson/hooks';
import Segmented from './Segmented';
import s from './GitMacLinux.module.css';

type Chip = 'apple' | 'intel';

const PREFIX: Record<Chip, string> = { apple: '/opt/homebrew', intel: '/usr/local' };

/** What Homebrew's "Next steps" usually look like. The path differs between Apple Silicon and Intel Macs. */
export default function BrewNextSteps() {
  const [chip, setChip] = useState<Chip>('apple');
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  const prefix = PREFIX[chip];
  return (
    <div className={`${s.next} ${seen ? s.play : ''}`} ref={ref}>
      <div className={s.nextTop}>
        <span className={s.nextLabel}>WHAT THE NEXT STEPS USUALLY LOOK LIKE</span>
        <Segmented<Chip>
          label="Your Mac's chip"
          value={chip}
          onChange={setChip}
          panelId="brew-next-steps"
          options={[{ value: 'apple', label: 'Apple Silicon (M1 and later)' }, { value: 'intel', label: 'Intel' }]}
        />
      </div>
      <div className={s.term} role="tabpanel" id="brew-next-steps">
        <div className={s.termBar} aria-hidden="true"><i /><i /><i /><span>zsh</span></div>
        <pre className={s.termBody}>
          <span className={s.tl} style={{ animationDelay: '0ms' }}><b className={s.arrow}>==&gt;</b> <b>Next steps:</b></span>
          <span className={s.tl} style={{ animationDelay: '120ms' }}>- Run these commands in your terminal to add Homebrew to your PATH:</span>
          <span className={`${s.tl} ${s.hl}`} style={{ animationDelay: '240ms' }}>{'    '}echo &gt;&gt; ~/.zprofile</span>
          <span className={`${s.tl} ${s.hl}`} style={{ animationDelay: '360ms' }}>{'    '}echo &apos;eval &quot;$({prefix}/bin/brew shellenv)&quot;&apos; &gt;&gt; ~/.zprofile</span>
          <span className={`${s.tl} ${s.hl}`} style={{ animationDelay: '480ms' }}>{'    '}eval &quot;$({prefix}/bin/brew shellenv)&quot;</span>
          <span className={s.tl} style={{ animationDelay: '600ms' }}>- Run <b>brew help</b> to get started</span>
        </pre>
      </div>
      <div className={s.warn}>⚠️ Always copy the exact lines <strong>your</strong> terminal prints. Your username and path may differ from this example.</div>
    </div>
  );
}
