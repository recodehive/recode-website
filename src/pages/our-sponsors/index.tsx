import React, { useState } from 'react';
import Layout from '@theme/Layout';
import type { ReactElement } from 'react';
import SponsorCard from './SponsorCard/index';
import sponsors from '@site/src/database/sponsors';
import './Sponsors.css';
import Link from '@docusaurus/Link';

interface FilteredSponsor {
  name: string;
  image: string;
  description: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  category: 'current' | 'past' | 'we-sponsor';
}

export default function OurSponsors(): ReactElement {
  const [activeView, setActiveView] = useState<'sponsors' | 'we-sponsor'>('sponsors');
  const [searchTerm, setSearchTerm] = useState('');

  // // Enhanced function to determine tier based on description and profile strength
  // const determineTier = (sponsor: any): 'platinum' | 'gold' | 'silver' | 'bronze' => {
  //   const description = sponsor.description.toLowerCase();
  //   const socialCount = [sponsor.github, sponsor.linkedin, sponsor.twitter, sponsor.instagram].filter(Boolean).length;
    
  //   // Platinum tier - Directors, Team leads, Major organizations
  //   if (description.includes('director') || 
  //       description.includes('team lead') || 
  //       description.includes('founder') ||
  //       sponsor.name === 'Homebrew' ||
  //       sponsor.name === 'GSSOC' ||
  //       sponsor.name === 'Sarah Drasner' ||
  //       sponsor.name === 'Eduardo San Martin' ||
  //       sponsor.name === 'Razvan Stoenescu') {
  //     return 'platinum';
  //   }
    
  //   // Gold tier - Senior developers, Engineers, Multi-social presence
  //   if (description.includes('engineer') || 
  //       description.includes('developer at') ||
  //       description.includes('sde at') ||
  //       description.includes('devops') ||
  //       description.includes('co-founder') ||
  //       socialCount >= 3) {
  //     return 'gold';
  //   }
    
  //   // Silver tier - Developers, Interns, Students at prestigious institutions
  //   if (description.includes('developer') || 
  //       description.includes('intern') ||
  //       description.includes('iit') ||
  //       description.includes('iiit') ||
  //       socialCount >= 2) {
  //     return 'silver';
  //   }
    
  //   // Bronze tier - Default
  //   return 'bronze';
  // };

  // Convert sponsors to our format with proper categorization
  const processedSponsors: FilteredSponsor[] = sponsors.map(sponsor => {
    let category: 'current' | 'past' | 'we-sponsor' = 'current';
    
    // Determine category based on flags
    if (sponsor.isWeSponsor) {
      category = 'we-sponsor';
    } else if (sponsor.isPastSponsor) {
      category = 'past';
    } else {
      category = 'current';
    }

    return {
      ...sponsor,
      category
    };
  });

  // Filter sponsors based on search term only
  const filteredSponsors = processedSponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get counts for each category
  const counts = {
    current: processedSponsors.filter(s => s.category === 'current').length,
    past: processedSponsors.filter(s => s.category === 'past').length,
    weSponsor: processedSponsors.filter(s => s.category === 'we-sponsor').length
  };

  const sponsorStats = [
    { number: `${counts.current}+`, label: 'Current Sponsors' },
    { number: `${counts.past}+`, label: 'Past Supporters' },
    { number: `${counts.weSponsor}+`, label: 'People We Sponsored' },
    { number: '50K+', label: 'Community Impact' }
  ];

  // Get sponsors for current view
  const getCurrentViewSponsors = () => {
    if (activeView === 'sponsors') {
      return {
        current: filteredSponsors.filter(s => s.category === 'current'),
        past: filteredSponsors.filter(s => s.category === 'past')
      };
    } else {
      return {
        weSponsor: filteredSponsors.filter(s => s.category === 'we-sponsor')
      };
    }
  };

  const currentViewSponsors = getCurrentViewSponsors();

  return (
    <Layout>
      <div className="enhanced-sponsors-container">
        {/* Hero Section */}
        <div className="sponsors-hero">
          <div className="sponsors-hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🤝</span>
              <span className="badge-text">Community Partnership</span>
            </div>
            <h1 className="sponsors-hero-title">
              Our Valued Community
            </h1>
            <p className="sponsors-hero-description">
              Join us in empowering the open-source community through your generous support. Your sponsorship directly fuels innovation by enabling developers to create valuable resources and maintain our growing knowledge base. We deeply appreciate your commitment to advancing open-source technology and education.
            </p>
            
            {/* Partnership CTA */}
            <div className="partnership-cta">
              <Link to="https://github.com/sponsors/sanjay-kv?o=esb" className="primary-cta-button">
                <span className="cta-icon">🚀</span>
                Become a Sponsor
              </Link>
              <Link to="https://github.com/sanjay-kv" className="secondary-cta-button">
                <span className="cta-icon">📧</span>
                Get in Touch
              </Link>
            </div>

            {/* Stats */}
            <div className="sponsors-stats">
              {sponsorStats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View Toggle Section */}
        <div className="view-toggle-section">
          <div className="view-toggle-container">
            <div className="view-toggle">
              <button
                className={`toggle-button ${activeView === 'sponsors' ? 'active' : ''}`}
                onClick={() => setActiveView('sponsors')}
              >
                <span className="toggle-icon">💝</span>
                <span className="toggle-text">
                  Our Sponsors
                  <span className="toggle-count">({counts.current + counts.past})</span>
                </span>
              </button>
              <button
                className={`toggle-button ${activeView === 'we-sponsor' ? 'active' : ''}`}
                onClick={() => setActiveView('we-sponsor')}
              >
                <span className="toggle-icon">🎯</span>
                <span className="toggle-text">
                  People We Sponsored
                  <span className="toggle-count">({counts.weSponsor})</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="sponsors-content-section">
          {Object.keys(getCurrentViewSponsors()).some(key => getCurrentViewSponsors()[key]?.length > 0) ? (
            <>
              {/* Sponsors View */}
              {activeView === 'sponsors' && (
                <>
                  {/* Current Sponsors */}
                  {currentViewSponsors.current && currentViewSponsors.current.length > 0 && (
                    <div className="current-sponsors-section">
                      <h2 className="section-title">
                        <span className="title-icon">💝</span>
                        Current Sponsors
                        <span className="section-count">({currentViewSponsors.current.length})</span>
                      </h2>
                      <div className="sponsors-grid">
                        {currentViewSponsors.current.map((sponsor, index) => (
                          <div key={`${sponsor.name}-current-${index}`} className="sponsor-wrapper" style={{ animationDelay: `${index * 0.1}s` }}>
                            <SponsorCard {...sponsor} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Past Sponsors */}
                  {currentViewSponsors.past && currentViewSponsors.past.length > 0 && (
                    <div className="past-sponsors-section">
                      <h2 className="section-title">
                        <span className="title-icon">🏆</span>
                        Past Sponsors
                        <span className="section-count">({currentViewSponsors.past.length})</span>
                      </h2>
                      <div className="sponsors-grid">
                        {currentViewSponsors.past.map((sponsor, index) => (
                          <div key={`${sponsor.name}-past-${index}`} className="sponsor-wrapper" style={{ animationDelay: `${index * 0.1}s` }}>
                            <SponsorCard {...sponsor} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* People We Sponsored View */}
              {activeView === 'we-sponsor' && currentViewSponsors.weSponsor && currentViewSponsors.weSponsor.length > 0 && (
                <div className="we-sponsor-section">
                  <h2 className="section-title">
                    <span className="title-icon">🎯</span>
                    People We Sponsored
                    <span className="section-count">({currentViewSponsors.weSponsor.length})</span>
                  </h2>
                  <div className="section-description">
                    <p>Meet the talented developers and students that Recode Hive has proudly sponsored to fuel their innovation.</p>
                  </div>
                  <div className="sponsors-grid">
                    {currentViewSponsors.weSponsor.map((sponsor, index) => (
                      <div key={`${sponsor.name}-we-sponsor-${index}`} className="sponsor-wrapper" style={{ animationDelay: `${index * 0.1}s` }}>
                        <SponsorCard {...sponsor} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Partnership Call-to-Action - Only show in sponsors view */}
              {activeView === 'sponsors' && (
                <div className="partnership-section">
                  <div className="partnership-card">
                    <div className="partnership-content">
                      <div className="partnership-icon">🤝</div>
                      <h2 className="partnership-title">Partner With Us</h2>
                      <p className="partnership-description">
                        Support innovation in open-source development and join our mission to advance open-source innovation and education through your sponsorship.
                      </p>
                      <div className="partnership-benefits">
                        <div className="benefit-item">
                          <span className="benefit-icon">✨</span>
                          <span className="benefit-text">Brand Recognition</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">🌍</span>
                          <span className="benefit-text">Global Exposure</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">💡</span>
                          <span className="benefit-text">Innovation Support</span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                
              )}

              

              {/* Recognition Call-to-Action - Only show in we-sponsor view */}
              {activeView === 'we-sponsor' && (
                <div className="partnership-section">
                  <div className="partnership-card we-sponsor-card">
                    <div className="partnership-content">
                      <div className="partnership-icon">🎓</div>
                      <h2 className="partnership-title">Apply for Sponsorship</h2>
                      <p className="partnership-description">
                        Are you a student or developer working on innovative open-source projects? Apply for recodehive sponsorship to get support for your educational and development journey.
                      </p>
                      <div className="partnership-benefits">
                        <div className="benefit-item">
                          <span className="benefit-icon">📚</span>
                          <span className="benefit-text">Educational Support</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">🚀</span>
                          <span className="benefit-text">Project Funding</span>
                        </div>
                        <div className="benefit-item">
                          <span className="benefit-icon">🤝</span>
                          <span className="benefit-text">Mentorship</span>
                        </div>
                      </div>
                      <button className="partnership-button secondary">
                        <span className="button-icon">📝</span>
                        Apply for Sponsorship
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No community members found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          )}
        </div>

        {/* Appreciation Section */}
        <div className="appreciation-section">
          <div className="appreciation-content">
            <h2 className="appreciation-title">
              <span className="title-icon">❤️</span>
              Thank You to Our Amazing Community
            </h2>
            <p className="appreciation-text">
              We deeply appreciate your commitment to advancing open-source technology and education. Together, we're building a stronger, more inclusive developer community through mutual support and collaboration.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
