import React from "react";
import Link from "@docusaurus/Link";
import { usePluginData } from "@docusaurus/useGlobalData";
import { useSafeColorMode } from "../../utils/useSafeColorMode";
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
  const { isDark } = useSafeColorMode();
  const { recentPosts = [] } =
    (usePluginData("docusaurus-plugin-content-blog") as BlogGlobalData) ?? {};

  if (recentPosts.length === 0) {
    return null;
  }

  return (
    <section className="from-blog">
      <div className="from-blog__inner">
        <div className="from-blog__text">
          <p
            className="from-blog__eyebrow m-0 inline-flex items-center gap-2 p-0 text-center text-xs font-semibold tracking-widest uppercase"
            style={{
              color: isDark ? "#4ade80" : "#16a34a",
              fontFamily:
                "'Space Grotesk', 'Inter', -apple-system, sans-serif",
              margin: 0,
              padding: 0,
            }}
          >
            ✦ Blog
          </p>
          <div className="from-blog__header">
            <div>
              <h2
                className="from-blog__title m-0 text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
                style={{
                  color: isDark ? "#ffffff" : "#0f172a",
                  fontFamily:
                    "'Space Grotesk', 'Inter', -apple-system, sans-serif",
                  margin: 0,
                  padding: 0,
                }}
              >
                From the Blog
              </h2>
              <p
                className={`from-blog__subtitle mx-auto m-0 w-full max-w-3xl p-0 text-center text-base ${isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                style={{ margin: 0, padding: 0, textAlign: "center" }}
              >
                Latest articles from our contributors
              </p>
            </div>
            <Link to="/blogs" className="from-blog__viewall">
              View all →
            </Link>
          </div>
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
