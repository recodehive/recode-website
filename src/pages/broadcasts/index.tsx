import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BroadcastsView from '@site/src/components/broadcasts/BroadcastsView';
import { LIVE_SESSIONS, VIDEOS, embedUrl, thumbnail } from '../../data/broadcasts';

const jsonLd = [...VIDEOS, ...LIVE_SESSIONS].map((v) => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: v.title,
  description: v.description,
  thumbnailUrl: thumbnail(v.youtubeId),
  embedUrl: embedUrl(v.youtubeId),
  ...(v.publishedAt ? { uploadDate: v.publishedAt } : {}),
}));

export default function Broadcasts(): React.JSX.Element {
  return (
    <Layout
      title="Broadcasts: GitHub tutorials and live sessions"
      description="Short GitHub tutorials from recode hive: README profiles, your first repository, open source contributions, every GitHub achievement badge, the Student Developer Pack and Copilot."
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <BroadcastsView />
    </Layout>
  );
}
