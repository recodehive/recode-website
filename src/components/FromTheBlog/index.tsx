import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import "./FromTheBlog.css";

interface RecentPost {
  title: string;
  permalink: string;
  date: string;
  readingTime?: number;
  image?: string;
  author: {
    name: string;
    handle: string;
    imageURL?: string;
  } | null;
}

interface BlogGlobalData {
  recentPosts?: RecentPost[];
}

const FromTheBlog: React.FC = () => {
  const { recentPosts = [] } =
    (usePluginData("docusaurus-plugin-content-blog") as BlogGlobalData) ?? {};

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="from-blog">
      <div className="from-blog__inner">
        <p className="from-blog__eyebrow">✦ Blog</p>
        <div className="from-blog__header">
          <div>
            <h2 className="from-blog__title">From the Blog</h2>
            <p className="from-blog__subtitle">
              Latest articles from our contributors
            </p>
          </div>
          <Link to="/blogs" className="from-blog__viewall">
            View all →
          </Link>
        </div>

        <div className="from-blog__grid">
          {recentPosts.map((post) => (
            <Link
              key={post.permalink}
              to={post.permalink}
              className="from-blog__card"
            >
              <div className="from-blog__cover">
                {post.image && (
                  <img src={post.image} alt={post.title} loading="lazy" />
                )}
              </div>
              <div className="from-blog__body">
                <h3 className="from-blog__post-title">{post.title}</h3>
                {post.author && (
                  <div className="from-blog__meta">
                    {post.author.imageURL && (
                      <img
                        className="from-blog__avatar"
                        src={post.author.imageURL}
                        alt={post.author.name}
                        loading="lazy"
                      />
                    )}
                    <span className="from-blog__meta-text">
                      @{post.author.handle}
                      {post.readingTime
                        ? ` · ${Math.ceil(post.readingTime)} min read`
                        : ""}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FromTheBlog;
