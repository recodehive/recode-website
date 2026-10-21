import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

/** BlogPosting structured data with the publisher, replacing the theme's default. */
export default function StructuredData(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const { metadata, assets } = useBlogPost();
  const base = siteConfig.url.replace(/\/$/, '');
  const abs = (u?: string) => (u ? (/^https?:\/\//i.test(u) ? u : `${base}${u}`) : undefined);
  const image = abs(assets.image ?? (metadata.frontMatter as { image?: string }).image);
  const modified = metadata.lastUpdatedAt ? new Date(metadata.lastUpdatedAt).toISOString() : undefined;
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: `${base}${metadata.permalink}`,
    url: `${base}${metadata.permalink}`,
    headline: metadata.title,
    description: metadata.description,
    datePublished: new Date(metadata.date).toISOString(),
    ...(modified ? { dateModified: modified } : {}),
    author: metadata.authors.map((a) => ({ '@type': 'Person', name: a.name, ...(a.url ? { url: a.url } : {}) })),
    ...(image ? { image: [image] } : {}),
    keywords: metadata.tags.map((t) => t.label).join(', '),
    publisher: { '@type': 'Organization', name: 'recode hive', url: base, logo: { '@type': 'ImageObject', url: `${base}/img/logo.png` } },
  };
  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(json)}</script>
    </Head>
  );
}
