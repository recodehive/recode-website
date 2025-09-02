import React, { useState, useRef, useEffect } from "react";
import SponsorCard from "./SponsorCard";
import "./Sponsors.css";
import Layout from "@theme/Layout";
import { FaPlusCircle, FaTimes } from 'react-icons/fa';
import Head from "@docusaurus/Head";
import sponsors from "@site/src/database/sponsors";
import { useHistory } from '@docusaurus/router';

type TabType = 'current' | 'past';

const OurSponsors: React.FC = () => {
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('current');
  const modalRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

// Filter for current sponsors (exclude isWeSponsor)
  const currentSponsors = sponsors.filter(
  (s) => !s.isPastSponsor && !s.isWeSponsor);
  const pastSponsors = sponsors.filter(s => s.isPastSponsor);

 // Filter for people we sponsor
  const weSponsorPeople = sponsors.filter((s) => s.isWeSponsor);

  const handleJoinSponsor = () => setShowScanner(true);

  const handlePaymentSuccess = () => {
    setShowScanner(false);
    alert("Thanks, we will redirect to Github Sponsors page, upon sponsoring you will be added to our sponsors list.");
    window.location.href = 'https://github.com/sponsors/sanjay-kv?o=esb';
  };

  const handleCloseModal = () => setShowScanner(false);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (!showScanner) return;

    const controller = new AbortController();
    const { signal } = controller;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown, { signal });
    document.addEventListener('mousedown', handleClickOutside, { signal });

    return () => controller.abort();
  }, [showScanner]);

  return (
    <Layout>
      <Head>
        <script
          async
          custom-element="amp-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"
        />
      </Head>
      <div className="sponsor-page">
        <div className="sponsor-header">
          <h1 className="TitleText">Our Valued Sponsors</h1>
          <p>
            Join us in empowering the open-source community through your generous support. Your sponsorship directly fuels innovation by enabling developers to create valuable resources and maintain our growing knowledge base.
            <br /><br />
            We deeply appreciate your commitment to advancing open-source technology and education.
          </p>
        </div>
        <div className="sponsors-section">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'current' ? 'active' : ''}`}
              onClick={() => handleTabChange('current')}
            >
              Current Sponsors
              <span className="tab-badge">{currentSponsors.length}</span>
            </button>
            <button
              className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => handleTabChange('past')}
            >
              People We Sponsored
              {weSponsorPeople.length > 0 && (
                <span className="tab-badge">{weSponsorPeople.length}</span>
              )}
            </button>
          </div>

          <div className={`tab-content ${activeTab === 'current' ? 'active' : ''}`}>
            <div className="sponsors-section">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-2">Current Sponsors</h3>
              <div className="sponsors-list">
                {currentSponsors.length > 0 ? (
                  currentSponsors.map((sponsor) => (
                    <SponsorCard key={`${sponsor.name}-current`} {...sponsor} />
                  ))
                ) : (
                  <div className="no-sponsors">
                    <p>We're actively seeking visionary sponsors to partner with us in supporting the open-source community.</p>
                  </div>
                )}
                
                <div
                  className="sponsor-card empty-card group"
                  onClick={handleJoinSponsor}
                  role="button"
                  tabIndex={0}
                >
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors duration-200">
                      <FaPlusCircle className="text-3xl text-indigo-500 group-hover:text-indigo-600 transition-colors duration-200" />
                    </div>
                    <h3 className="text-lg font-semibold text-indigo-700 mb-1 group-hover:text-indigo-800 transition-colors duration-200">
                      Partner With Us
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                      Support innovation in open-source development
                    </p>
                    <div className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200">
                      Join us
                      <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              

              {pastSponsors.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-12">Past Sponsors</h3>
                  <div className="sponsors-list">
                    {pastSponsors.map((sponsor) => (
                      <SponsorCard key={`${sponsor.name}-past-in-current`} {...sponsor} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={`tab-content ${activeTab === 'past' ? 'active' : ''}`}>
            {weSponsorPeople.length > 0 ? (
              <div className="sponsors-list">
                {weSponsorPeople.map((sponsor) => (
                  <SponsorCard key={`${sponsor.name}-wesponsor`} {...sponsor} />
                ))}
              </div>
            ) : (
              <div className="no-sponsors">
                <p>We look forward to recognizing our future sponsors here.</p>
              </div>
            )}
          </div>
        </div>

        {showScanner && (
          <div className="scanner-popup" role="dialog" aria-modal="true">
            <div className="scanner-content" ref={modalRef}>
              <button
                className="close-button"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <FaTimes size={20} />
              </button>
              <h2 className="TitleText">Become a Valued Partner</h2>
              <p className="text-gray-600 mb-6">Join our mission to advance open-source innovation and education through your sponsorship</p>
              <div className="relative inline-flex">
                <button 
                  className="scanner-button group" 
                  onClick={handlePaymentSuccess}
                >
                  <span className="absolute left-4 opacity-0 group-hover:opacity-100 group-hover:left-6 transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.1-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="relative transition-all duration-300 group-hover:translate-x-2">
                    Sponsor on GitHub
                  </span>
                  <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:right-6 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
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
    </Layout>
  );
};

export default OurSponsors;
