import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";
import Hero from "../components/hero/hero";
import ScrollBottomToTop from "../components/scroll/bottom-to-top";

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
          <div className="mx-4 mb-4 mt-0 md:m-4">
            <Hero />
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

          <div className="m-4 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 items-start">
            {showTopmate && (
              <div className="lg:col-span-1">
                <TopMateSection setShowTopmate={setShowTopmate} />
              </div>
            )}
            <div className={showTopmate ? `lg:col-span-2` : `lg:col-span-3`}>
              <TestimonialCarousel />
            </div>
          </div>

          <div className="m-4">
            <CommunityStatsProvider>
              <LandingCommunity className="recodehive" />
            </CommunityStatsProvider>
          </div>

          <div
            className="m-0"
            style={{ border: "none", boxShadow: "none", outline: "none" }}
          >
            <FAQs />
          </div>
        </main>
      </div>
      <ScrollBottomToTop />
    </Layout>
  );
}
