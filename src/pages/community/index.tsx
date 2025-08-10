import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import { motion } from 'framer-motion';
import ScrollBottomToTop from '@site/src/components/scroll/bottom-to-top';
import './community.css';

interface ContributionSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
  links: { text: string; url: string; }[];
  color: string;
}

const contributionSections: ContributionSection[] = [
  {
    id: 'code',
    title: 'Code',
    icon: '💻',
    description: "If you're a developer, you can:",
    items: [
      'Write code 🧑‍💻',
      'Fix bugs 🐞',
      'Add new features 🚀'
    ],
    links: [
      { text: 'GitHub', url: 'https://github.com/recodehive' },
      { text: 'GitLab', url: '/community' }
    ],
    color: '#8b5cf6'
  },
  {
    id: 'design',
    title: 'Design',
    icon: '🎨',
    description: "If you're a designer, you can:",
    items: [
      'Create new UI/UX designs',
      'Improve existing visuals',
      'Share design feedback'
    ],
    links: [
      { text: 'Figma', url: '/community' },
      { text: 'Adobe XD', url: '/community' }
    ],
    color: '#ec4899'
  },
  {
    id: 'documentation',
    title: 'Documentation',
    icon: '📚',
    description: "If you're a writer or educator, you can:",
    items: [
      'Improve documentation 🖋️',
      'Write tutorials 📚',
      'Translate content 🌍'
    ],
    links: [
      { text: 'GitHub Docs', url: '/community' }
    ],
    color: '#f59e0b'
  },
  {
    id: 'community',
    title: 'Community',
    icon: '🤝',
    description: "If you're a community-minded person, you can:",
    items: [
      'Help answer questions',
      'Support new members 💬',
      'Share knowledge and insights'
    ],
    links: [
      { text: 'Discord', url: '/community' },
      { text: 'Slack', url: '/community' }
    ],
    color: '#10b981'
  },
  {
    id: 'get-started',
    title: 'Get Started',
    icon: '🚀',
    description: 'To begin your journey with RecodeHive:',
    items: [
      'Join our community on Discord or Slack',
      'Explore our repositories on GitHub',
      'Pick a task or area you\'re excited about!'
    ],
    links: [
      { text: 'Discord', url: '/community' },
      { text: 'Slack', url: '/community' },
      { text: 'GitHub', url: 'https://github.com/recodehive' }
    ],
    color: '#6366f1'
  }
];

const tableOfContents = [
  { id: 'how-you-can-contribute', title: 'How You Can Contribute', icon: '⚡' },
  { id: 'code', title: 'Code', icon: '💻' },
  { id: 'design', title: 'Design', icon: '🎨' },
  { id: 'documentation', title: 'Documentation', icon: '📚' },
  { id: 'community', title: 'Community', icon: '🤝' },
  { id: 'get-started', title: 'Get Started', icon: '🚀' },
  { id: 'thank-you', title: 'Thank You', icon: '💚' }
];

export default function CommunityPage(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('how-you-can-contribute');

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Layout
      title="Hive Community"
      description="Welcome to RecodeHive — a community built for everyone to learn, share, and grow."
    >
      <div className="community-page">
        <Head>
        <meta property="og:title" content="Hive Community - RecodeHive" />
        <meta property="og:description" content="Join our thriving community of developers, designers, and creators." />
      </Head>

      <main className="community-page">
        {/* Hero Section */}
        <section className="community-hero">
          <div className="community-hero-background">
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
            <div className="hero-particle"></div>
          </div>
          <div className="container">
            <motion.div
              className="community-hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="hero-icon">🐝</div>
              <h1 className="community-hero-title">
                Welcome to Hive Community
              </h1>
              <p className="community-hero-description">
                Welcome to <strong>RecodeHive</strong> — a community built for everyone to{' '}
                <span className="highlight">learn</span>, <span className="highlight">share</span>, and{' '}
                <span className="highlight">grow</span>. Whether you're a{' '}
                <span className="highlight">developer 👨‍💻</span>, <span className="highlight">designer 🎨</span>, or just someone interested in
                exploring new ideas 💡, we're excited to have you here!
              </p>
            </motion.div>
          </div>
        </section>

        {/* How You Can Contribute Header */}
        <section id="how-you-can-contribute" className="contribution-header">
          <div className="container">
            <motion.div
              className="contribution-header-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="contribution-icon">⚡</div>
              <h2 className="contribution-title">How You Can Contribute</h2>
              <p className="contribution-description">
                There are many ways to get involved in RecodeHive. Here's how you can contribute:
              </p>
            </motion.div>
          </div>
        </section>

        {/* Scrollable Content Sections */}
        <section className="community-content">
          <div className="container">
            <div className="community-layout">
              {/* Main Content */}
              <div className="contribution-sections">
                {contributionSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    className="contribution-section"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                  <div className="section-header">
                    <div
                      className="section-icon"
                      style={{ backgroundColor: section.color }}
                    >
                      {section.icon}
                    </div>
                    <h3 className="section-title">{section.title}</h3>
                  </div>

                  <p className="section-description">{section.description}</p>

                  <ul className="section-items">
                    {section.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="section-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (0.1 * index) + (0.05 * itemIndex) }}
                      >
                        <span className="item-arrow">▶</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  {section.links.length > 0 && (
                    <div className="section-links">
                      <div className="links-header">
                        <span className="links-icon">🔗</span>
                        <span>Find our {section.id === 'code' ? 'codebase' : section.id === 'design' ? 'design resources' : section.id === 'documentation' ? 'documentation' : section.id === 'community' ? 'conversation' : 'resources'} on:</span>
                      </div>
                      <div className="links-container">
                        {section.links.map((link, linkIndex) => (
                          <motion.a
                            key={linkIndex}
                            href={link.url}
                            className="resource-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ '--link-color': section.color } as React.CSSProperties}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {link.text}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Thank You Section */}
              <motion.div
                id="thank-you"
                className="thank-you-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
              <div className="thank-you-card">
                <div className="thank-you-header">
                  <div className="thank-you-icons">
                    <span className="thank-icon">💚</span>
                    <span className="thank-icon">🎉</span>
                    <span className="thank-icon">✨</span>
                  </div>
                  <h3>Thank You!</h3>
                  <div className="thank-you-subtitle">You're Amazing</div>
                </div>

                <div className="thank-you-content">
                  <p className="thank-you-main">
                    Thank you for your interest in <strong>RecodeHive</strong>!
                  </p>
                  <p className="thank-you-description">
                    We're thrilled to have you here and can't wait to{' '}
                    <span className="highlight collaborate">collaborate</span>,{' '}
                    <span className="highlight learn">learn</span>, and{' '}
                    <span className="highlight grow">grow</span> — together. 🌱
                  </p>

                  <div className="thank-you-features">
                    <div className="feature-item">
                      <span className="feature-icon">🚀</span>
                      <span>Build Amazing Projects</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">🤝</span>
                      <span>Connect with Developers</span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-icon">📚</span>
                      <span>Learn & Share Knowledge</span>
                    </div>
                  </div>

                  <blockquote className="thank-you-quote">
                    <div className="quote-icon">🐝</div>
                    <em>Let's make this community the best it can bee!</em>
                  </blockquote>

                  <div className="support-section">
                    <div className="support-icon">💬</div>
                    <p className="support-text">
                      We're here to help and support you throughout your journey — don't hesitate to reach out.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
              </div>

              {/* Table of Contents Sidebar */}
              <motion.div
                className="table-of-contents"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="toc-header">
                  <span className="toc-icon">⚡</span>
                  <h4>How You Can Contribute</h4>
                </div>
                <nav className="toc-nav">
                  {tableOfContents.map((item) => (
                    <button
                      key={item.id}
                      className={`toc-item ${activeSection === item.id ? 'active' : ''}`}
                      onClick={() => scrollToSection(item.id)}
                    >
                      <span className="toc-item-icon">{item.icon}</span>
                      <span className="toc-item-text">{item.title}</span>
                    </button>
                  ))}
                </nav>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Scroll to Top Button - Same as Home Page */}
      <ScrollBottomToTop />
      </div>
    </Layout>
  );
}
