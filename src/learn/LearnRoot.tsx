import React from 'react';
import { useHistory } from '@docusaurus/router';
import { useDocRootMetadata } from '@docusaurus/plugin-content-docs/client';
import NotFoundContent from '@theme/NotFound/Content';
import DashboardSidebar, { type DashboardTab } from '../components/dashboard/Sidebar/DashboardSidebar';
import styles from './learn.module.css';

const HASH: Record<DashboardTab, string> = {
  home: '/dashboard',
  discuss: '/dashboard#discuss',
  contributors: '/dashboard#leaderboard',
  giveaway: '/dashboard#giveaway',
};

/** docRootComponent for the "learn" docs instance: the dashboard sidebar plus the lesson content. */
export default function LearnRoot(props: any) {
  const meta = useDocRootMetadata(props);
  const history = useHistory();

  if (!meta) return <NotFoundContent />;

  return (
    <div className={styles.shell}>
      <DashboardSidebar activeTab={null} onTabChange={(tab) => history.push(HASH[tab])} />
      <main className={styles.main}>{meta.docElement}</main>
    </div>
  );
}
