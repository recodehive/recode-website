import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { FaPlusCircle, FaTimes } from "react-icons/fa";
import sponsors from "@site/src/database/sponsors";
import SponsorCard from "./SponsorCard";
import "./Sponsors.css";
import { useColorMode } from "@docusaurus/theme-common";

type TabType = "current" | "past";

const OurSponsors: React.FC = () => {
  return (
    <Layout>
      <Head>
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
      </Head>
      <SponsorContent />
    </Layout>
  );
};

const SponsorContent: React.FC = () => {
  const { colorMode } = useColorMode();
  const [showScanner, setShowScanner] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("current");
  const modalRef = useRef<HTMLDivElement>(null);

  const currentSponsors = sponsors.filter(
    (s) => !s.isPastSponsor && !s.isWeSponsor
  );
  const pastSponsors = sponsors.filter((s) => s.isPastSponsor);
  const weSponsorPeople = sponsors.filter((s) => s.isWeSponsor);

  useEffect(() => {
    if (!showScanner) return;
    const controller = new AbortController();
    const { signal } = controller;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowScanner(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowScanner(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown, { signal });
    document.addEventListener("mousedown", handleClickOutside, { signal });

    return () => controller.abort();
  }, [showScanner]);

  const handlePaymentSuccess = () => {
    setShowScanner(false);
    alert("Redirecting to GitHub Sponsors...");
    window.location.href = "https://github.com/sponsors/sanjay-kv?o=esb";
  };

  return (
    <div className="sponsor-page">
      <div className="sponsor-header">
        <h1 className="TitleText">Our Valued Sponsors</h1>
        <p>
          Join us in empowering the open-source community through your generous
          support. Your sponsorship directly fuels innovation by enabling
          developers to create valuable resources and maintain our growing
          knowledge base.
          <br />
          <br />
          We deeply appreciate your commitment to advancing open-source
          technology and education.
        </p>
      </div>

      <div className="sponsors-section">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "current" ? "active" : ""}`}
            onClick={() => setActiveTab("current")}
          >
            Current Sponsors
            <span className="tab-badge">{currentSponsors.length}</span>
          </button>
          <button
            className={`tab-button ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            People We Sponsored
            {weSponsorPeople.length > 0 && (
              <span className="tab-badge">{weSponsorPeople.length}</span>
            )}
          </button>
        </div>

        {/* Current Sponsors Tab */}
        {activeTab === "current" && (
          <>
            <h3 className="section-heading">Current Sponsors</h3>
            <div className="sponsors-list">
              {currentSponsors.length > 0 ? (
                currentSponsors.map((sponsor) => (
                  <SponsorCard key={`${sponsor.name}-current`} {...sponsor} />
                ))
              ) : (
                <div className="no-sponsors">
                  <p>
                    We're actively seeking visionary sponsors to partner with us.
                  </p>
                </div>
              )}

              {/* Add Sponsor Card */}
              <div
                className="sponsor-card empty-card"
                onClick={() => setShowScanner(true)}
                role="button"
                tabIndex={0}
              >
                <div className="text-center p-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200"
                    style={{ backgroundColor: "var(--circle-bg)" }}>
                    <FaPlusCircle
                      className="text-3xl"
                      style={{ color: "var(--text-primary)" }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                    Partner With Us
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Support innovation in open-source development
                  </p>
                  <div className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200">
                    Join us
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Sponsors */}
            {pastSponsors.length > 0 && (
              <>
                <h3 className="section-heading" style={{ marginTop: "3rem" }}>
                  Past Sponsors
                </h3>
                <div className="sponsors-list">
                  {pastSponsors.map((sponsor) => (
                    <SponsorCard key={`${sponsor.name}-past`} {...sponsor} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* People We Sponsored Tab */}
        {activeTab === "past" && (
          <div className="sponsors-list">
            {weSponsorPeople.length > 0 ? (
              weSponsorPeople.map((sponsor) => (
                <SponsorCard key={`${sponsor.name}-wesponsor`} {...sponsor} />
              ))
            ) : (
              <div className="no-sponsors">
                <p>We look forward to recognizing our future sponsors here.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Sponsor CTA */}
      {showScanner && (
        <div className="scanner-popup" role="dialog" aria-modal="true">
          <div className="scanner-content" ref={modalRef}>
            <button
              className="close-button"
              aria-label="Close"
              onClick={() => setShowScanner(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="TitleText">Become a Valued Partner</h2>
            <p className="text-muted mb-6">
              Join our mission to advance open-source innovation and education
              through your sponsorship
            </p>
            <button className="scanner-button group" onClick={handlePaymentSuccess}>
              <span>Sponsor on GitHub</span>
            </button>
          </div>
        </div>
      )}

      {/* GitHub Sponsor Button */}
      <div className="support-links mt-6">
        <iframe
          src="https://github.com/sponsors/sanjay-kv/button"
          title="Sponsor Sanjay Viswanathan on GitHub"
          height="32"
          width="114"
          style={{ border: 0, borderRadius: "6px" }}
        />
      </div>
    </div>
  );
};

export default OurSponsors;
