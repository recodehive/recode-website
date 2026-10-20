import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { DiscordIcon } from '../../components/navbar/Icons';
import { useCommunityStats } from '../../components/communityPage/communityData';
import { TopPosts, FreshFromGithub } from '../../components/communityPage/Feed';
import { Events, Guidelines, Talks } from '../../components/communityPage/Sidebar';
import { News, Ways, YourTurn } from '../../components/communityPage/Bottom';
import styles from '../../components/communityPage/community.module.css';

const DISCORD = 'https://discord.gg/dh3TA8U55Q';

export default function Community(): React.JSX.Element {
  const stats = useCommunityStats();
  return (
    <Layout
      title="Community | recode hive"
      description="What the recode hive community is talking about, what is coming up and what shipped this week. Join the Discord, follow the posts and make your first contribution."
    >
      <main className={styles.root}>
        <header className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true" />
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>{'✦'} COMMUNITY</p>
            <h1 className={styles.h1}>Learn, share and grow <span className={styles.accent}>with the hive</span></h1>
            <p className={styles.lede}>
              What the community is talking about, what is coming up, and what shipped this week. Pick a way in and say hello.
            </p>
            <div className={styles.heroBtns}>
              <a className={styles.btnGreen} href={DISCORD} target="_blank" rel="noopener noreferrer">
                <DiscordIcon size={18} /> Join the Discord<span className={styles.srOnly}> (opens in a new tab)</span>
              </a>
              <Link className={styles.btnOutline} to="/docs/Getting-Started">Start contributing {'→'}</Link>
            </div>
            {stats.posts > 0 && (
              <p className={styles.facts}>
                <span>{stats.posts} blog posts</span>
                <span>{stats.authors} authors</span>
                <span>{stats.sponsored} developers sponsored</span>
              </p>
            )}
          </div>
        </header>

        <div className={styles.wrap}>
          <div className={styles.cols}>
            <div className={styles.main}>
              <TopPosts />
              <FreshFromGithub />
            </div>
            <aside className={styles.side} aria-label="Community sidebar">
              <Events />
              <Talks />
              <Guidelines />
            </aside>
          </div>
          <News />
          <Ways />
          <YourTurn />
        </div>
      </main>
    </Layout>
  );
}
