import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import blogs from "../../database/blogs";
import Head from "@docusaurus/Head";
import { useColorMode } from "@docusaurus/theme-common";
import "./Blogs.css"; // Make sure this path is correct

export default function Blogs(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Blogs from ${siteConfig.title}`}
      description="Welcome to RecodeHive Blogs. Learn the basics to advanced concepts of web development including HTML, CSS, JavaScript, React, Node.js, DSA, and more."
    >
      <Head>
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
      </Head>
      <section className="blogs-section">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">
            Welcome to RecodeHive Blogs
          </h1>
          <p className="blogs-description">
            Discover web development articles ranging from HTML and CSS to
            JavaScript, React, Node.js, DSA, and much more.
          </p>

        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

const BlogCard = ({ blog }) => {
  const { colorMode } = useColorMode();

  return (
    <div className="blog-card shadow-lg rounded-lg overflow-hidden">
      <Link to={`/blog/${blog.slug}`}>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h2 className="blog-title">{blog.title}</h2>
        <p className="blog-desc">{blog.description}</p>
        <Link
          to={`/blog/${blog.slug}`}
          className={`read-more ${colorMode === "dark" ? "dark-link" : "light-link"}`}
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};
