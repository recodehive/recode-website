import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import Head from "@docusaurus/Head";
import Header from "../components/header/header";
import ScrollBottomToTop from "../components/scroll/bottom-to-top";

import { BlogCarousel } from "../components/blogCarousel/blogCarousel";
import TopMateSection from "../components/topmate/TopMateSection";
import { TestimonialCarousel } from "../components/testimonials/TestimonialCarousel";
import { CommunityStatsProvider, useCommunityStatsContext } from "../lib/statsProvider";
import CommunityStats from "../components/CommunityStats";
import FounderSection from "../components/FounderSection";
import FAQs from "../components/faqs/faqs";

function CommunitySection() {
  const {
    githubStarCount,
    githubReposCount,
    githubContributorsCount,
    githubForksCount,
  } = useCommunityStatsContext();

  return (
    <CommunityStats
      stats={{
        stars: githubStarCount,
        projects: githubReposCount,
        contributors: githubContributorsCount,
        forks: githubForksCount,
      }}
      githubUrl="https://github.com/recodehive"
    />
  );
}

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
          className="rh-home page-enter transition-colors duration-300"
          style={{
            backgroundColor: "var(--ifm-background-color)",
            color: "var(--ifm-font-color-base)",
          }}
        >
          <CommunityStatsProvider>
          <Header />

          <div className="blog-carousel-section">
            <div className="rh-container">
              <BlogCarousel />
            </div>
          </div>

          <div className="my-4">
            <FounderSection />
          </div>

          {/* Mentorship (left) + Testimonials (right) — side by side */}
          <div className="rh-container">
            <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5">
              {showTopmate && (
                <div className="lg:col-span-2">
                  <TopMateSection setShowTopmate={setShowTopmate} />
                </div>
              )}
              <div
                className={`${showTopmate ? "lg:col-span-3" : "lg:col-span-4"} overflow-hidden`}
              >
                <TestimonialCarousel />
              </div>
            </div>
          </div>

          <div className="my-4">
            <CommunitySection />
          </div>
          </CommunityStatsProvider>

          <div style={{ border: "none", boxShadow: "none", outline: "none" }}>
            <FAQs />
          </div>
        </main>
      </div>
      <ScrollBottomToTop />
    </Layout>
  );
}
