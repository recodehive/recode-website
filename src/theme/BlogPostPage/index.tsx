import React, { useEffect, useRef } from 'react';
import { BlogPostProvider, useBlogPost } from '@docusaurus/plugin-content-blog/client';
import Layout from '@theme/Layout';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import ContentVisibility from '@theme/ContentVisibility';
import PostHeader from '../../components/blogPost/PostHeader';
import LeftSidebar, { RecentPosts } from '../../components/blogPost/LeftSidebar';
import ContentsCard from '../../components/blogPost/ContentsCard';
import styles from '../../components/blogPost/blogPost.module.css';

const ARTICLE_ID = 'post-article';

/** Sets data-lang on every code block so the CSS can show the language in its header bar. Code renders late, so watch for it. */
function useCodeLabels(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const label = () => {
      root.querySelectorAll<HTMLElement>('.theme-code-block').forEach((el) => {
        const m = el.className.match(/language-([\w+-]+)/);
        if (m && el.dataset.lang !== m[1]) el.dataset.lang = m[1];
      });
      // A comment such as <!-- truncate --> leaves an empty paragraph that adds a blank gap
      root.querySelectorAll<HTMLElement>('.markdown > p').forEach((p) => {
        if (p.children.length === 0 && (p.textContent ?? '').trim() === '') p.hidden = true;
      });
    };
    label();
    const mo = new MutationObserver(label);
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [ref]);
}

function PostPageContent({ children }: { children: React.ReactNode }) {
  const { metadata, toc } = useBlogPost();
  const { nextItem, prevItem, frontMatter, tags, permalink } = metadata;
  const bodyRef = useRef<HTMLDivElement>(null);
  useCodeLabels(bodyRef);
  const showToc = !(frontMatter as { hide_table_of_contents?: boolean }).hide_table_of_contents && toc.length > 0;

  return (
    <Layout>
      {/* The floating up and down buttons would sit on the contents card, so they are hidden on blog posts */}
      <style>{'.scroll-to-top{display:none !important}'}</style>
      <div className={styles.pageWrap}>
      <div className={styles.page}>
        <LeftSidebar permalink={permalink} mainTag={tags[0]?.label ?? null} />
        <div className={styles.headerCell}>
          <ContentVisibility metadata={metadata} />
          <PostHeader toc={toc} />
          {showToc && <ContentsCard toc={toc} articleId={ARTICLE_ID} variant="bar" />}
        </div>
        <article id={ARTICLE_ID} className={styles.articleCell} ref={bodyRef as React.RefObject<HTMLElement>}>
          <div className={styles.post}>
            <BlogPostItemContent>{children}</BlogPostItemContent>
          </div>
        </article>
        <div className={styles.endCell}>
          <BlogPostItemFooter />
          <div className={styles.recentEnd}><RecentPosts permalink={permalink} /></div>
          {(nextItem || prevItem) && <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />}
        </div>
        {showToc && <ContentsCard toc={toc} articleId={ARTICLE_ID} variant="card" />}
      </div>
      </div>
    </Layout>
  );
}

export default function BlogPostPage(props: { content: React.ComponentType; sidebar?: unknown }): React.JSX.Element {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content as never} isBlogPostPage>
      <>
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <PostPageContent>
          <BlogPostContent />
        </PostPageContent>
      </>
    </BlogPostProvider>
  );
}
