import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import ScrollBottomToTop from "@site/src/components/scroll/bottom-to-top";
import "./community.css";

interface ContributionSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
  details?: string[];
  links: { text: string; url: string }[];
  color: string;
  // small label chip shown at top of card
  label: string;
}

const contributionSections: ContributionSection[] = [
  {
    id: "code",
    title: "Code",
    icon: "💻",
    description: "If you're a developer, here’s how you can make direct impact:",
    items: [
      "Access coding standards 🧑‍💻",
      "Find debugging tips 🐞",
      "Propose new features 🚀",
    ],
    details: [
      "Access coding standards and setup instructions that help you quickly align with the team's codebase.",
      "Find tips for debugging, troubleshooting common errors, and submitting clear bug reports.",
      "Learn how to propose new features, collaborate on pull requests, and review peer code effectively.",
    ],
    links: [
      { text: "GitHub", url: "https://github.com/recodehive?view_as=public" },
      {
        text: "Join our organization",
        url: "https://github.com/recodehive/Support/issues/new?assignees=&labels=invite+me+to+the+community&projects=&template=invitation.yml&title=Please+invite+me+to+the+Recode-Hive+GitHub+Community+Organization",
      },
    ],
    color: "#b499f4",
    label: "For developers",
  },
  {
    id: "documentation",
    title: "Documentation",
    icon: "📚",
    description:
      "If you love explaining concepts clearly, our docs always need your voice:",
    items: [
      "Improve documentation 🖋️",
      "Structure tutorials 📚",
      "Translate content 🌍",
    ],
    details: [
      "Explore detailed guides for improving existing documentation, including style and terminology tips.",
      "Learn how to structure tutorials, add examples, and make learning resources more accessible.",
      "See guidelines for translating technical content into different languages and backgrounds.",
    ],
    links: [{ text: "Docs Hub", url: "https://www.recodehive.com/docs" }],
    color: "#f59e0b",
    label: "For writers & educators",
  },
  {
    id: "community",
    title: "Community",
    icon: "🤝",
    description:
      "If you enjoy connecting people, you can help our community feel welcoming:",
    items: [
      "Connect with members 👥",
      "Support newcomers 💬",
      "Share resources 📝",
    ],
    details: [
      "Connect with fellow members by joining active discussions in forums and chats.",
      "Offer support to newcomers by guiding them through onboarding and answering beginner questions.",
      "Share resources, tutorials, and best practices to help others grow.",
    ],
    links: [
      { text: "Discord", url: "https://discord.gg/dh3TA8U55Q" },
      {
        text: "WhatsApp",
        url: "https://chat.whatsapp.com/Izl2yfbFlmY8CExjnIpNkX?mode=ems_copy_t",
      },
    ],
    color: "#10b981",
    label: "For community builders",
  },
  {
    id: "get-started",
    title: "Get Started",
    icon: "🚀",
    description: "New here? Start simple and grow your comfort step by step:",
    items: [
      "Sign up and introduce yourself 👋",
      "Discover key repositories 🔍",
      "Browse beginner tasks 📋",
    ],
    details: [
      "Learn how to sign up and introduce yourself in the welcome channels on Discord.",
      "Discover key open source repositories and find out how you can contribute, regardless of experience level.",
      "Browse a list of beginner-friendly tasks and guides to help you choose your first contribution.",
    ],
    links: [
      { text: "Discord", url: "https://discord.gg/b6ffxhXRNH" },
      {
        text: "WhatsApp",
        url: "https://chat.whatsapp.com/Izl2yfbFlmY8CExjnIpNkX?mode=ems_copy_t",
      },
      { text: "GitHub", url: "https://github.com/recodehive" },
    ],
    color: "#6366f1",
    label: "Best for beginners",
  },
];

const tableOfContents = [
  { id: "how-you-can-contribute", title: "How You Can Contribute", icon: "⚡" },
  { id: "code", title: "Code", icon: "💻" },
  { id: "documentation", title: "Documentation", icon: "📚" },
  { id: "community", title: "Community", icon: "🤝" },
  { id: "get-started", title: "Get Started", icon: "🚀" },
];

export default function CommunityPage(): React.ReactElement {
  const [activeSections, setActiveSections] = useState<string[]>([
    "how-you-can-contribute",
  ]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => item.id);
      const midpoint = window.innerHeight * 0.4;
      const visible: string[] = [];

      sections.forEach((id) => {
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
          const siblings = sections.filter((sectionId) => {
            const sib = document.getElementById(sectionId);
            return sib && sib.offsetTop === rowTop;
          });
          visible.push(...siblings.filter((sectionId) => sectionId !== current));
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    setOpenDropdowns((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const isSectionActive = (sectionId: string) => {
    if (isMobile) {
      return activeSections.includes(sectionId);
    }
    return selectedSection === sectionId || activeSections.includes(sectionId);
  };

  return (
    <Layout
      title="recode hive Community"
      description="Welcome to recode hive — a community built for everyone to learn, share, and grow."
    >
      <div className="community-page">
        <Head>
          <meta
            property="og:title"
            content="recode hive Community - recode hive"
          />
          <meta
            property="og:description"
            content="Join our thriving community of developers, designers, and creators."
          />
        </Head>

        <main className="community-page">
          {/* Hero Section */}
          <section className="community-hero">
            <div className="community-hero-background">
              <div className="hero-particle" />
              <div className="hero-particle" />
              <div className="hero-particle" />
            </div>
            <div className="container">
              <motion.div
                className="community-hero-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="hero-badge-row">
                  <span className="hero-badge">Open source community</span>
                  <span className="hero-pill">Beginner friendly</span>
                </div>
                <div className="hero-icon">🐝</div>
                <h1 className="community-hero-title">
                  Welcome to recode hive Community
                </h1>
                <p className="community-hero-description">
                  Welcome to <strong>recode hive</strong> — a community built
                  for everyone to{" "}
                  <span className="highlight">learn</span>,{" "}
                  <span className="highlight">share</span>, and{" "}
                  <span className="highlight">grow</span>. Whether you're a{" "}
                  <span className="highlight">developer 👨‍💻</span>,{" "}
                  <span className="highlight">designer 🎨</span>, or just
                  someone interested in exploring new ideas 💡, we're excited to
                  have you here!
                </p>
                <div className="hero-cta-row">
                  <a
                    className="hero-primary-cta"
                    href="https://github.com/recodehive"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore GitHub
                    <span aria-hidden="true">↗</span>
                  </a>
                  <a
                    className="hero-secondary-cta"
                    href="#get-started"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("get-started");
                    }}
                  >
                    I&apos;m new here
                  </a>
                </div>
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
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="contribution-icon">⚡</div>
                <h2 className="contribution-title">How You Can Contribute</h2>
                <p className="contribution-description">
                  There are many ways to get involved in recode hive. Choose the
                  path that matches your strengths and interests, and we&apos;ll
                  support you along the way.
                </p>
                <div className="contribution-meta-row">
                  <span className="contribution-meta-pill">
                    4 contribution paths
                  </span>
                  <span className="contribution-meta-pill subtle">
                    Click any row to see details
                  </span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Engagement / Contribution Sections */}
          <section className="community-content">
            <div className="container">
              <div className="community-layout">
                {/* Main Content */}
                <div className="contribution-sections">
                  {contributionSections.map((section, index) => (
                    <motion.article
                      key={section.id}
                      id={section.id}
                      className={`contribution-section ${isSectionActive(section.id) ? "selected" : ""}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="contribution-section-inner">
                        <div className="section-chip-row">
                          <span className="section-label-chip">
                            {section.label}
                          </span>
                          <span className="section-pill">
                            {section.items.length} focus areas
                          </span>
                        </div>

                        <div className="section-header">
                          <div
                            className="section-icon"
                            style={{ backgroundColor: section.color }}
                          >
                            {section.icon}
                          </div>
                          <div>
                            <h3 className="section-title">{section.title}</h3>
                            <p className="section-subtitle">
                              Make an impact through this track.
                            </p>
                          </div>
                        </div>

                        <p className="section-description">
                          {section.description}
                        </p>

                        <ul className="section-items" aria-label={section.title}>
                          {section.items.map((item, itemIndex) => {
                            const dropdownId = `${section.id}-${itemIndex}`;
                            const isOpen = openDropdowns.includes(dropdownId);

                            return (
                              <li key={dropdownId} className="section-item-row">
                                <button
                                  type="button"
                                  className={`section-item ${isOpen ? "open" : ""}`}
                                  onClick={() => toggleDropdown(dropdownId)}
                                  aria-expanded={isOpen}
                                >
                                  <span
                                    className={`item-arrow ${isOpen ? "rotate" : ""}`}
                                    aria-hidden="true"
                                  >
                                    ▶
                                  </span>
                                  <span className="section-item-text">
                                    {item}
                                  </span>
                                </button>

                                {section.details && (
                                  <motion.div
                                    className="section-item-details"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{
                                      opacity: isOpen ? 1 : 0,
                                      height: isOpen ? "auto" : 0,
                                    }}
                                    transition={{ duration: 0.25 }}
                                  >
                                    <p>{section.details[itemIndex]}</p>
                                  </motion.div>
                                )}
                              </li>
                            );
                          })}
                        </ul>

                        {section.links.length > 0 && (
                          <div className="section-links">
                            <div className="links-header">
                              <span className="links-icon">🔗</span>
                              <span>
                                Deep dive into{" "}
                                {section.id === "code"
                                  ? "our repositories"
                                  : section.id === "documentation"
                                    ? "the docs hub"
                                    : section.id === "community"
                                      ? "live conversations"
                                      : "getting started resources"}
                                :
                              </span>
                            </div>
                            <div className="links-container">
                              {section.links.map((link, linkIndex) => (
                                <motion.a
                                  key={link.text + linkIndex}
                                  href={link.url}
                                  className="resource-link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={
                                    {
                                      "--link-color": section.color,
                                    } as React.CSSProperties
                                  }
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                >
                                  {link.text}
                                  <span aria-hidden="true" className="resource-link-icon">
                                    ↗
                                  </span>
                                </motion.a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}

                  {/* Thank You Section */}
                  <motion.section
                    id="thank-you"
                    className="thank-you-section"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <div className="thank-you-card">
                      <div className="thank-you-header">
                        <div className="thank-you-icons">
                          <span className="thank-icon">💚</span>
                          <span className="thank-icon">🎉</span>
                          <span className="thank-icon">✨</span>
                        </div>
                        <h3>Thank you for being here</h3>
                        <p className="thank-you-subtitle">
                          Every message, PR, and question helps this hive grow.
                        </p>
                      </div>

                      <div className="thank-you-content">
                        <p className="thank-you-main">
                          Thank you for your interest in{" "}
                          <strong>recode hive</strong>!
                        </p>
                        <p className="thank-you-description">
                          We&apos;re thrilled to have you here and can&apos;t
                          wait to{" "}
                          <span className="highlight collaborate">collaborate</span>,{" "}
                          <span className="highlight learn">learn</span>, and{" "}
                          <span className="highlight grow">grow</span> —
                          together. 🌱
                        </p>

                        <blockquote className="thank-you-quote">
                          <div className="quote-icon">🐝</div>
                          <em>
                            Let&apos;s make this community the best it can bee!
                          </em>
                        </blockquote>

                        <div className="support-section">
                          <div className="support-icon">💬</div>
                          <a
                            href="https://github.com/recodehive/recode-website/discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "inherit" }}
                          >
                            <p className="support-text">
                              We&apos;re here to help and support you throughout
                              your journey — don&apos;t hesitate to reach out.
                            </p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.section>
                </div>

                {/* Table of Contents Sidebar */}
                <motion.aside
                  className="table-of-contents"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="toc-header">
                    <span className="toc-icon">⚡</span>
                    <div>
                      <h4>Quick navigation</h4>
                      <p className="toc-subtitle">
                        Jump between contribution paths.
                      </p>
                    </div>
                  </div>
                  <nav className="toc-nav" aria-label="How you can contribute">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        className={`toc-item ${activeSections.includes(item.id) ? "active" : ""}`}
                        onClick={() => scrollToSection(item.id)}
                        type="button"
                      >
                        <span className="toc-item-icon">{item.icon}</span>
                        <span className="toc-item-text">{item.title}</span>
                      </button>
                    ))}
                  </nav>
                </motion.aside>
              </div>
            </div>
          </section>
        </main>

        <ScrollBottomToTop />
      </div>
    </Layout>
  );
}
