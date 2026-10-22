import React, { useState } from 'react';
import Head from '@docusaurus/Head';
import { Finish, StillStuck } from './Finish';
import { MobileBar, ProgressRail, ProgressSheet } from './Rail';
import { Diagram, Hero, Personalise, Preflight, StepsList } from './sections';
import { STEPS } from './steps';
import { SetupProvider } from './state';
import s from './SetupGuide.module.css';

const SITE = 'https://www.recodehive.com';

const HOW_TO = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Zero to localhost: run recode hive on your computer',
  description: 'Fork, clone and run the recode hive website on Windows, macOS or Linux. No GitHub experience needed.',
  totalTime: 'PT30M',
  tool: ['Git', 'Node.js', 'Visual Studio Code'].map((name) => ({ '@type': 'HowToTool', name })),
  step: STEPS.map((st) => ({
    '@type': 'HowToStep',
    position: st.n,
    name: st.title,
    text: st.summary,
    url: `${SITE}/docs/first-time-setup#step-${st.n}`,
  })),
};

/** The interactive first-time setup guide. Everything it styles lives under one scoped class. */
export default function SetupGuide() {
  const [sheet, setSheet] = useState(false);
  return (
    <SetupProvider>
      <Head>
        <script type="application/ld+json">{JSON.stringify(HOW_TO)}</script>
      </Head>
      <div className={s.setupGuide}>
        <div className={s.frame}>
          <MobileBar onOpen={() => setSheet(true)} />
          <div className={s.layout}>
            <div className={s.main}>
              <Hero />
              <Personalise />
              <Diagram />
              <Preflight />
              <StepsList />
              <Finish />
              <StillStuck />
            </div>
            <ProgressRail />
          </div>
        </div>
        {sheet && <ProgressSheet onClose={() => setSheet(false)} />}
      </div>
    </SetupProvider>
  );
}
