import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import Head from "@docusaurus/Head";
import Header from "../components/header/header";
import ScrollBottomToTop from "../components/scroll/bottom-to-top";
import ScrollTopToBottom from "../components/scroll/top-to-bottom";
import { BlogCarousel } from "../components/blogCarousel/blogCarousel";
import OurProjects from "../components/ourProjects";
import TopMateSection from "../components/topmate/TopMateSection";
import { TestimonialCarousel } from "../components/testimonials/TestimonialCarousel";
import { CommunityStatsProvider } from "../lib/statsProvider";
import { LandingCommunity } from "../components/Community";
import FAQs from "../components/faqs/faqs";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [showTopmate, setShowTopmate] = useState(true);

  useEffect(() => {
    // Add page transition animation on mount
    const mainElement = document.querySelector("main");
    if (mainElement) {
      mainElement.style.opacity = "0";
      mainElement.style.transform = "translateY(20px)";
      mainElement.style.transition =
        "opacity 0.6s ease-out, transform 0.6s ease-out";

      // Trigger animation after a brief delay
      setTimeout(() => {
        mainElement.style.opacity = "1";
        mainElement.style.transform = "translateY(0)";
      }, 100);
    }
  }, []);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to recode hive. Learn the basics to advanced concepts of web development. sql, python, Cloud, GitHub and more."
    >
      <Head>
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
      </Head>

      {/* ✅ Wrap in solid background to fix light mode */}
      <div
        className="transition-colors duration-300"
        style={{
          backgroundColor: "var(--ifm-background-color)",
          color: "var(--ifm-font-color-base)",
        }}
      >
        <main
          className="page-enter transition-colors duration-300"
          style={{
            backgroundColor: "var(--ifm-background-color)",
            color: "var(--ifm-font-color-base)",
          }}
        >
          <div className="m-4">
            <Header />
          </div>

          <div className="blog-carousel-section">
            <BlogCarousel />
          </div>

          <div
            className="m-4"
            onClick={() => (window.location.href = "https://www.sanjaykv.com/")}
          >
            <img
              src="/selfhero.png"
              alt="recodehive"
              className="h-full w-full cursor-pointer rounded-2xl object-cover"
            />
          </div>

          <div className="m-4">
            <OurProjects />
          </div>

          <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {showTopmate && (
              <div className="col-span-1">
                <TopMateSection setShowTopmate={setShowTopmate} />
              </div>
            )}
            <div className={showTopmate ? `col-span-2` : `col-span-3`}>
              <TestimonialCarousel />
            </div>
          </div>

          <div className="m-4">
            <CommunityStatsProvider>
              <LandingCommunity className="recodehive" />
            </CommunityStatsProvider>
          </div>

          <div className="m-4">
            <FAQs />
          </div>

          <ScrollTopToBottom />
          <ScrollBottomToTop />
        </main>
      </div>
    </Layout>
  );
}
