import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Confetti from '../../components/sponsors/Confetti';
import Hero from '../../components/sponsors/Hero';
import HowItWorks from '../../components/sponsors/HowItWorks';
import Wall, { type WallTab } from '../../components/sponsors/Wall';
import ClosingCta from '../../components/sponsors/ClosingCta';
import styles from '../../components/sponsors/sponsors.module.css';

export default function OurSponsors(): React.JSX.Element {
  const [tab, setTab] = useState<WallTab>('sponsors');

  const seeWho = () => {
    setTab('sponsored');
    // Wait a frame so the tab switch has rendered before scrolling.
    window.requestAnimationFrame(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById('the-wall')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  };

  return (
    <Layout
      title="Sponsors: fund the hive, keep learning free"
      description="Every course, guide and video on recode hive is free. Meet the sponsors who keep it that way, see the open source developers we sponsor, and learn how to back the hive on GitHub."
    >
      <main className={styles.root}>
        <div className={styles.top}>
          <Confetti />
          <div className={styles.heroBand}>
            <div className={styles.inner}>
              <Hero onSeeWho={seeWho} />
            </div>
          </div>
          <div className={styles.howBand}>
            <div className={styles.inner}>
              <HowItWorks />
            </div>
          </div>
        </div>
        <div className={styles.inner}>
          <Wall tab={tab} onTab={setTab} />
          <ClosingCta />
        </div>
      </main>
    </Layout>
  );
}
