import React, { type ReactNode, useState, useEffect } from "react";
import Link from "@docusaurus/Link";
import { useSafeColorMode } from "@site/src/utils/useSafeColorMode";
import clsx from "clsx";
import {
  Award,
  BarChart3,
  BookOpen,
  BookText,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Handshake,
  LayoutDashboard,
  LifeBuoy,
  Link2,
  Mail,
  type LucideIcon,
  MessageCircleQuestion,
  Mic2,
  MonitorPlay,
  Newspaper,
  Rocket,
  Github,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import "./enhanced-footer.css";
import Counter from "./Counter";
import { createPortal } from "react-dom";

// Dynamic stats interface
interface FooterStats {
  activeUsers: string;
  tutorials: string;
  peopleSponsored: string;
  supportHours: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FooterIconProps = {
  icon: LucideIcon;
  className?: string;
};

function FooterIcon({ icon: Icon, className }: FooterIconProps) {
  return (
    <span className={clsx("footer-icon", className)} aria-hidden="true">
      <Icon strokeWidth={2} />
    </span>
  );
}

export default function FooterLayout(): ReactNode {
  const { isDark } = useSafeColorMode();

  const currentYear = new Date().getFullYear();
  const [stats, setStats] = useState<FooterStats>({
    activeUsers: "50K+",
    tutorials: "70+",
    peopleSponsored: "45",
    supportHours: "24/7",
  });
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate real-time stats updates
    const fetchStats = async () => {
      try {
        // Simulate API call with realistic growth
        const baseUsers = 52000;
        const baseTutorials = 75;
        const randomGrowth = Math.floor(Math.random() * 100);

        setStats({
          activeUsers: `${Math.floor((baseUsers + randomGrowth) / 1000)}K+`,
          tutorials: `${baseTutorials + Math.floor(randomGrowth / 10)}+`,
          peopleSponsored: `${45 + Math.floor(Math.random() * 5)}`,
          supportHours: "24/7",
        });
      } catch {
        console.log("Using fallback stats");
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsSubscribed(true);
    setShowToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer
      className={clsx("enhanced-footer", isDark ? "dark-theme" : "light-theme")}
    >
      {/* Toast Notification */}
      {showToast &&
        createPortal(
          <div className="newsletter-toast">
            <div className="toast-content">
              <FooterIcon icon={CheckCircle2} className="toast-icon" />
              <div className="toast-message">
                <h4>Successfully Subscribed!</h4>
                <p>Thank you for joining our newsletter.</p>
              </div>
              <button
                className="toast-close"
                onClick={() => setShowToast(false)}
                aria-label="Close notification"
              >
                x
              </button>
            </div>
          </div>,
          document.body, // mounts toast directly to <body>, outside footer
        )}

      {/* Hero Section */}
      <div className="footer-hero">
        <div className="container">
          <div className="footer-hero-content">
            <div className="footer-hero-left">
              <div className="footer-logo-section">
                <div className="footer-logo">
                  <div className="logo-container">
                    <img
                      src="/img/logo.png"
                      alt="RecodeHive Logo"
                      className="footer-logo-img"
                    />
                  </div>
                  <div className="footer-brand-header">
                    <h1 className="footer-brand-title">recodehive</h1>
                  </div>
                </div>
              </div>

              <div className="footer-hero-text">
                <h1>
                  Collaboration first,
                  <span className="second-line">Code second.</span>
                </h1>
              </div>
            </div>
            <div className="footer-hero-right">
              <div className="footer-cta-buttons">
                <Link
                  to="/blog"
                  className="btn"
                  aria-label="Read Blog"
                  style={{
                    background: "#ffffff",
                    color: "#111111",
                    border: "1.5px solid #111111",
                  }}
                >
                  <Newspaper size={16} strokeWidth={2} aria-hidden="true" />
                  Read Blog
                </Link>
                <a
                  href="https://github.com/recodehive/recode-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  aria-label="Star on GitHub"
                  style={{
                    background: "#111111",
                    color: "#ffffff",
                    border: "1.5px solid #111111",
                  }}
                >
                  <Github size={16} strokeWidth={2} aria-hidden="true" />
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="footer-links-section">
        <div className="container">
          <div className="footer-links-grid">
            {/* Learning Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">
                <div className="column-icon resources-icon">
                  <FooterIcon icon={BookOpen} />
                </div>
                Learning
              </h3>
              <ul className="footer-links">
                <li>
                  <Link to="/docs" className="footer-link">
                    <FooterIcon icon={BookText} className="link-icon" />
                    Documentation
                    <span className="link-badge popular">Popular</span>
                  </Link>
                </li>
                <li>
                  <Link to="/get-started" className="footer-link">
                    <FooterIcon icon={Rocket} className="link-icon" />
                    Get Started
                  </Link>
                </li>
                <li>
                  <Link to="/badges/github-badges" className="footer-link">
                    <FooterIcon icon={Award} className="link-icon" />
                    GitHub Badges
                  </Link>
                </li>
                <li>
                  <Link href="https://dev.recodehive.com/devfolio" className="footer-link">
                    <FooterIcon icon={Award} className="link-icon" />
                    GitHub Profiles
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="footer-link">
                    <FooterIcon icon={Video} className="link-icon" />
                    Video Courses
                    <span className="link-badge new">New</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">
                <div className="column-icon company-icon">
                  <FooterIcon icon={Building2} />
                </div>
                Company
              </h3>
              <ul className="footer-links">
                <li>
                  <Link to="/careers" className="footer-link">
                    <FooterIcon icon={BriefcaseBusiness} className="link-icon"/>
                    Careers
                    <span className="link-badge hiring">We're Hiring!</span>
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="footer-link">
                    <FooterIcon icon={Users} className="link-icon" />
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" className="footer-link">
                    <FooterIcon icon={Newspaper} className="link-icon" />
                    Our Blog
                  </Link>
                </li>
                <li>
                  <Link to="/our-sponsors" className="footer-link">
                    <FooterIcon icon={Handshake} className="link-icon" />
                    Our Sponsors
                  </Link>
                </li>
                <li>
                  <Link to="/showcase" className="footer-link">
                    <FooterIcon icon={Sparkles} className="link-icon" />
                    Showcase
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">
                <div className="column-icon support-icon">
                  <FooterIcon icon={LifeBuoy} />
                </div>
                Support
              </h3>
              <ul className="footer-links">
                <li>
                  <Link to="/broadcasts" className="footer-link">
                    <FooterIcon icon={MonitorPlay} className="link-icon" />
                    Broadcasts
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="footer-link">
                    <FooterIcon icon={MessageCircleQuestion} className="link-icon"/>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/podcasts" className="footer-link">
                    <FooterIcon icon={Mic2} className="link-icon" />
                    Podcasts
                  </Link>
                </li>
                <li>
                  <Link to="https://github.com/orgs/recodehive/projects/9" className="footer-link">
                    <FooterIcon icon={MonitorPlay} className="link-icon" />
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Column with Quick Links below */}
            <div className="footer-column newsletter-column">
              <h3 className="footer-column-title">
                <div className="column-icon newsletter-icon">
                  <FooterIcon icon={Mail} />
                </div>
                Stay in the Loop
              </h3>
              <p className="newsletter-description">
                Join {stats.activeUsers} developers getting weekly insights,
                tutorials, and exclusive content.
              </p>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                />
                <button
                  type="submit"
                  className={`newsletter-button ${
                    isSubscribed ? "subscribed" : ""
                  }`}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? "Subscribed!" : "Subscribe Now"}
                </button>
                {error && <p className="error-text">{error}</p>}
              </form>
              <div className="newsletter-stats">
                <span className="newsletter-stat">
                  <FooterIcon
                    icon={BarChart3}
                    className="newsletter-stat-icon"
                  />
                  1.2K+ developers joined this week
                </span>
              </div>
              {/* Quick Links Section moved below subscription */}
              <div className="quick-links-section newsletter-quick-links">
                <h4 className="quick-links-title">
                  <FooterIcon icon={Link2} className="links-icon" />
                  QUICK LINKS
                </h4>
                <div className="quick-links-list">
                  <Link to="/get-started" className="quick-link">
                    <FooterIcon icon={Rocket} className="quick-link-icon" />
                    Get Started
                  </Link>
                  <Link to="/dashboard" className="quick-link">
                    <FooterIcon
                      icon={LayoutDashboard}
                      className="quick-link-icon"
                    />
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="footer-bottom-left">
              <div className="footer-social-links">
                <span className="social-label">Connect & Follow:</span>
                <Link
                  to="https://github.com/recodehive"
                  className="social-link github"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" />
                  </svg>
                </Link>

                <Link
                  to="https://x.com/sanjay_kv_"
                  className="social-link twitter"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>

                <Link
                  to="https://www.instagram.com/nomad_brains/"
                  className="social-link instagram"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>

                <Link
                  to="https://www.linkedin.com/in/sanjay-k-v/"
                  className="social-link linkedin"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="footer-bottom-center">
              <div className="footer-legal-links">
                <Link to="/privacy-policy" className="legal-link">
                  Privacy Policy
                </Link>
                <Link to="/terms-service" className="legal-link">
                  Terms of Service
                </Link>
                <Link to="/code-of-conduct" className="legal-link">
                  Code of Conduct
                </Link>
                <Link to="/License" className="legal-link">
                  License
                </Link>
              </div>
            </div>

            <div className="footer-bottom-right">
              <div className="footer-copyright">
                <span>
                  © {currentYear} recodehive. Made with ❤️ by the{" "}
                  <a
                    href="https://github.com/recodehive/recode-website/graphs/contributors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    community.
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
