import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import Hero from './_components/Hero';
import StickyTabs, { scrollToSection, type TabDef } from './_components/StickyTabs';
import EarnableSection from './_components/EarnableSection';
import { Certifications, Highlights, PracticeBanner, Retired } from './_components/OtherSections';
import { certifications, earnable, highlights, retired } from '../../data/githubBadges';
import styles from './github-badges.module.css';

const TABS: TabDef[] = [
  { id: 'earnable', label: 'Earnable', count: earnable.length },
  { id: 'highlights', label: 'Highlights', count: highlights.length },
  { id: 'retired', label: 'Retired', count: retired.length },
  { id: 'certs', label: 'Certifications', count: certifications.length },
];

export default function GithubBadges(): ReactNode {
  return (
    <Layout
      title="GitHub Achievement Badges Guide"
      description="Every GitHub achievement badge, the counts for each tier, how to earn them honestly, and the six GitHub certifications including the new GH-600 Agentic AI Developer exam."
    >
      <main className={styles.page}>
        <div className={styles.container}>
          <Hero onExplore={() => scrollToSection('earnable')} />
        </div>
        <StickyTabs tabs={TABS} />
        <EarnableSection />
        <Highlights />
        <Retired />
        <Certifications />
        <PracticeBanner />
      </main>
    </Layout>
  );
}
