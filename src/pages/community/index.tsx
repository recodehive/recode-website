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
  details?: string[];
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
      'Access coding standards 🧑‍💻',
      'Find debugging tips 🐞',
      'Propose new features 🚀'
    ],
    details: [
      'Access coding standards and setup instructions to streamline your work with the team\'s codebase.',
      'Find tips for debugging, troubleshooting common errors, and submitting clear bug reports.',
      'Read about how to propose new features, collaborate on pull requests, and review peer code.'
    ],
    links: [
      { text: 'GitHub', url: 'https://github.com/recodehive?view_as=public' },
      { text: 'Join our organization', url: 'https://github.com/recodehive/Support/issues/new?assignees=&labels=invite+me+to+the+community&projects=&template=invitation.yml&title=Please+invite+me+to+the+Recode-Hive+GitHub+Community+Organization' }
    ],
    color: '#8b5cf6'
  },
  {
    id: 'documentation',
    title: 'Documentation',
    icon: '📚',
    description: "If you're a writer or educator, you can:",
    items: [
      'Improve documentation 🖋️',
      'Structure tutorials 📚',
      'Translate content 🌍'
    ],
    details: [
      'Explore detailed guides for improving existing documentation, including style and terminology tips.',
      'Learn how to structure tutorials, add examples, and make learning resources more accessible.',
      'See guidelines for translating technical content into different languages or for various backgrounds.'
    ],
    links: [
      { text: 'GitHub Docs', url: 'https://www.recodehive.com/docs' }
    ],
    color: '#f59e0b'
  },
  {
    id: 'community',
    title: 'Community',
    icon: '🤝',
    description: "If you're a community-minded person, you can:",
    items: [
      'Connect with members 👥',
      'Support newcomers 💬',
      'Share resources 📝'
    ],
    details: [
      'Connect with fellow members by joining active discussions in forums and chats.',
      'Offer support to newcomers by guiding them through onboarding and answering beginner questions.',
      'Share resources, tutorials, and best practices to help others grow.'
    ],
    links: [
      { text: 'Discord', url: "https://discord.gg/b6ffxhXRNH" },
      { text: 'Whatsapp', url: 'https://chat.whatsapp.com/Izl2yfbFlmY8CExjnIpNkX?mode=ems_copy_t' }
    ],
    color: '#10b981'
  },
  {
    id: 'get-started',
    title: 'Get Started',
    icon: '🚀',
    description: 'To begin your journey with recode hive:',
    items: [
      'Sign up and introduce yourself 👋',
      'Discover key repositories 🔍',
      'Browse beginner tasks 📋'
    ],
    details: [
      'Learn how to sign up and introduce yourself in the welcome channels on Discord or Slack.',
      'Discover key open source repositories and find out how you can contribute, regardless of experience level.',
      'Browse a list of beginner-friendly tasks and guides to help select your first area of involvement.'
    ],
    links: [
      { text: 'Discord', url: 'https://discord.gg/b6ffxhXRNH' },
      { text: 'Whatsapp', url: 'https://chat.whatsapp.com/Izl2yfbFlmY8CExjnIpNkX?mode=ems_copy_t' },
      { text: 'GitHub', url: 'https://github.com/recodehive' }
    ],
    color: '#6366f1'
  }
];

const tableOfContents = [
  { id: 'how-you-can-contribute', title: 'How You Can Contribute', icon: '⚡' },
  { id: 'code', title: 'Code', icon: '💻' },
  { id: 'documentation', title: 'Documentation', icon: '📚' },
  { id: 'community', title: 'Community', icon: '🤝' },
  { id: 'get-started', title: 'Get Started', icon: '🚀' },
  { id: 'thank-you', title: 'Thank You', icon: '💚' }
];

export default function CommunityPage(): React.ReactElement {
  const [activeSections, setActiveSections] = useState<string[]>(['how-you-can-contribute']);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => item.id);
      const midpoint = window.innerHeight * 0.4;
      const visible: string[] = [];

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= midpoint && rect.bottom >= midpoint) {
            visible.push(id);
          }
        }
      });

      if (visible.length === 1) {
        const current = visible[0];
        const element = document.getElementById(current);
        if (element) {
          const rowTop = element.offsetTop;
          const siblings = sections.filter(id => {
            const sib = document.getElementById(id);
            return sib && sib.offsetTop === rowTop;
          });
          visible.push(...siblings.filter(id => id !== current));
        }
      }

      if (visible.length > 0) {
        setActiveSections(visible);
        if (selectedSection && !visible.includes(selectedSection)) {
          setSelectedSection(null);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedSection]);



  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setSelectedSection(sectionId);
    }
  };
  
  const toggleDropdown = (itemId: string) => {
    setOpenDropdowns(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  return (
    <Layout
      title="recode hive Community"
      description="Welcome to recode hive — a community built for everyone to learn, share, and grow."
    >
      <div className="community-page">
        <Head>
          <meta property="og:title" content="recode hive Community - recode hive" />
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
                  Welcome to recode hive Community
                </h1>
                <p className="community-hero-description">
                  Welcome to <strong>recode hive</strong> — a community built for everyone to{' '}
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
                  There are many ways to get involved in recode hive. Here's how you can contribute:
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
                      className={`contribution-section ${(isMobile ? activeSections.includes(section.id) : selectedSection === section.id)
                          ? 'selected'
                          : ''
                        }`}
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
                          <React.Fragment key={itemIndex}>
                            <motion.li
                              className="section-item"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: (0.1 * index) + (0.05 * itemIndex) }}
                              onClick={() => toggleDropdown(`${section.id}-${itemIndex}`)}
                              style={{ cursor: 'pointer' }}
                            >
                              <span className={`item-arrow ${openDropdowns.includes(`${section.id}-${itemIndex}`) ? 'rotate' : ''}`}>
                                ▶
                              </span>
                              {item}
                            </motion.li>
                            
                            {section.details && openDropdowns.includes(`${section.id}-${itemIndex}`) && (
                              <motion.div
                                className="section-item-details"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                              >
                                <p>{section.details[itemIndex]}</p>
                              </motion.div>
                            )}
                          </React.Fragment>
                        ))}
                      </ul>

                      {section.links.length > 0 && (
                        <div className="section-links">
                          <div className="links-header">
                            <span className="links-icon">🔗</span>
                            <span>Find our {section.id === 'code' ? 'codebase' : section.id === 'documentation' ? 'documentation' : section.id === 'community' ? 'conversation' : 'resources'} on:</span>
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
                          Thank you for your interest in <strong>recode hive</strong>!
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
                            <a href="https://github.com/recodehive/recode-website" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
                              <span>Build Amazing Projects</span>
                            </a>
                          </div>
                          <div className="feature-item">
                            <span className="feature-icon">🤝</span>
                            <a href="https://github.com/orgs/recodehive/people" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
                              <span>Connect with Developers</span>
                            </a>
                          </div>
                          <div className="feature-item">
                            <span className="feature-icon">📚</span>
                            <a href="https://www.recodehive.com/docs" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
                              <span>Learn & Share Knowledge</span>
                            </a>
                          </div>
                        </div>

                        <blockquote className="thank-you-quote">
                          <div className="quote-icon">🐝</div>
                          <em>Let's make this community the best it can bee!</em>
                        </blockquote>

                        <div className="support-section">
                          <div className="support-icon">💬</div>
                          <a href="https://github.com/recodehive/recode-website/discussions" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>
                            <p className="support-text">
                              We're here to help and support you throughout your journey — don't hesitate to reach out.
                            </p>
                          </a>
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
                        className={`toc-item ${activeSections.includes(item.id) ? 'active' : ''}`}
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
