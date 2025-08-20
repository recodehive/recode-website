import React, { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import type { ReactNode } from "react";

import Head from "@docusaurus/Head";
import Header from "../components/header/header";
import ScrollBottomToTop from "../components/scroll/bottom-to-top";
import ScrollTopToBottom from "../components/scroll/top-to-bottom";
import { BlogCarousel } from "../components/blogCarousel/blogCarousel";
import projectsData from "../database/projects/projects";
import OurProjects from "../components/ourProjects";
import TopMateSection from "../components/topmate/TopMateSection";
import { TestimonialCarousel } from "../components/testimonials/TestimonialCarousel";
import { CommunityStatsProvider } from "../lib/statsProvider";
import { LandingCommunity } from "../components/Community";
import FAQs from "../components/faqs/faqs";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  
  useEffect(() => {
    // Add page transition animation on mount
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.style.opacity = '0';
      mainElement.style.transform = 'translateY(20px)';
      mainElement.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      
      // Trigger animation after a brief delay
      setTimeout(() => {
        mainElement.style.opacity = '1';
        mainElement.style.transform = 'translateY(0)';
      }, 100);
    }
  }, []);
  
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Welcome to Recodehive. Learn the basics to advanced concepts of web development. sql, python, Cloud, GitHub and more."
    >
      <Head>
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
      </Head>

      {/* ✅ Wrap in solid background to fix light mode */}
      <div className="transition-colors duration-300" style={{ backgroundColor: "var(--ifm-background-color)", color: "var(--ifm-font-color-base)" }}>
      <main className="transition-colors duration-300 page-enter" style={{ backgroundColor: "var(--ifm-background-color)", color: "var(--ifm-font-color-base)" }}>
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
              className="w-full h-full object-cover rounded-2xl cursor-pointer"
            />
          </div>

          <div className="m-4">
            <OurProjects OurProjectsData={projectsData} />
          </div>

          <div className="m-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="col-span-1">
              <TopMateSection />
            </div>
            <div className="col-span-2">
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
