import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import SocialShare from '../../components/SocialShare';

export default function BlogPostItemWrapper(props) {
  const { metadata } = props;

  // Only show social sharing buttons for actual blog posts (not tag pages or author pages)
  const isBlogPost = metadata && metadata.title && metadata.permalink && metadata.permalink.startsWith('/blog/') && !metadata.permalink.includes('/tags/') && !metadata.permalink.includes('/authors/');

  return (
    <div className="blog-post-item-wrapper">
      <BlogPostItem {...props} />
      {isBlogPost && (
        <div className="blog-post-social-share">
          <SocialShare
            title={metadata.title}
            description={metadata.description}
            permalink={metadata.permalink}
          />
        </div>
      )}
    </div>
  );
}