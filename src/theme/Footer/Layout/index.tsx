import React, { type ReactNode, useState } from "react";
import Link from "@docusaurus/Link";
import { createPortal } from "react-dom";
import "./footer.css";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FooterLink = {
  label: string;
  to: string;
  external?: boolean;
  badge?: { text: string; variant: "green" | "amber" };
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const LINK_COLUMNS: FooterColumn[] = [
  {
    title: "Learning",
    links: [
      { label: "Documentation", to: "/docs", badge: { text: "Popular", variant: "green" } },
      { label: "Get Started", to: "/get-started" },
      { label: "GitHub Badges", to: "/badges/github-badges" },
      { label: "GitHub Profiles", to: "https://dev.recodehive.com/devfolio", external: true },
      { label: "Video Courses", to: "/courses", badge: { text: "New", variant: "green" } },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", to: "/careers", badge: { text: "We're Hiring!", variant: "amber" } },
      { label: "Community", to: "/community" },
      { label: "Our Blog", to: "/blogs" },
      { label: "Our Sponsors", to: "/our-sponsors" },
      { label: "Showcase", to: "/showcase" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Broadcasts", to: "/broadcasts" },
      { label: "Contact Us", to: "/contact-us" },
      { label: "Podcasts", to: "/podcasts" },
      { label: "Roadmap", to: "https://github.com/orgs/recodehive/projects/9", external: true },
      { label: "Changelog", to: "/changelog" },
    ],
  },
];

const SOCIALS: FooterLink[] = [
  { label: "GitHub", to: "https://github.com/recodehive" },
  { label: "X", to: "https://x.com/sanjay_kv_" },
  { label: "Instagram", to: "https://www.instagram.com/nomad_brains/" },
  { label: "LinkedIn", to: "https://www.linkedin.com/in/sanjay-k-v/" },
  { label: "YouTube", to: "https://www.youtube.com/@RecodeHive" },
];

const LEGAL: FooterLink[] = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-service" },
  { label: "Code of Conduct", to: "/code-of-conduct" },
  { label: "License", to: "/License" },
];

export default function FooterLayout(): ReactNode {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

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

    setTimeout(() => {
      setShowToast(false);
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer className="rh-footer">
      {showToast &&
        createPortal(
          <div className="rh-toast" role="status">
            <span className="rh-toast__check" aria-hidden="true">
              ✓
            </span>
            <div>
              <h4 className="rh-toast__title">Successfully Subscribed!</h4>
              <p className="rh-toast__text">Thank you for joining our newsletter.</p>
            </div>
            <button
              className="rh-toast__close"
              onClick={() => setShowToast(false)}
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>,
          document.body,
        )}

      <div className="rh-footer__inner">
        <div className="rh-footer__grid">
          {/* Brand */}
          <div className="rh-footer__brand">
            <div className="rh-footer__brand-row">
              <img src="/img/logo.png" alt="RecodeHive Logo" className="rh-footer__logo" />
              <span className="rh-footer__wordmark">recodehive</span>
            </div>
            <p className="rh-footer__tagline">
              Collaboration first,
              <span>code second.</span>
            </p>
            <div className="rh-footer__cta">
              <Link to="/blog" className="rh-btn rh-btn--white">
                <svg
                  className="rh-btn__icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Read Blog
              </Link>
              <a
                href="https://github.com/recodehive/recode-website"
                target="_blank"
                rel="noopener noreferrer"
                className="rh-btn rh-btn--dark"
              >
                <svg
                  className="rh-btn__icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
                </svg>
                Star on GitHub
              </a>
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((column) => (
            <nav className="rh-footer__col" key={column.title} aria-label={column.title}>
              <h3 className="rh-footer__label">{column.title}</h3>
              <ul className="rh-footer__list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rh-footer__link"
                      >
                        {link.label}
                        {link.badge && (
                          <span className={`rh-badge rh-badge--${link.badge.variant}`}>
                            {link.badge.text}
                          </span>
                        )}
                      </a>
                    ) : (
                      <Link to={link.to} className="rh-footer__link">
                        {link.label}
                        {link.badge && (
                          <span className={`rh-badge rh-badge--${link.badge.variant}`}>
                            {link.badge.text}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div className="rh-footer__newsletter">
            <h3 className="rh-footer__label">Stay in the Loop</h3>
            <p className="rh-footer__newsletter-pitch">
              Join 50K+ developers getting weekly insights, tutorials, and exclusive content.
            </p>
            <form className="rh-footer__form" onSubmit={handleSubscribe} noValidate>
              <input
                type="email"
                placeholder="your@email.com"
                className="rh-footer__input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                aria-label="Email address"
                required
              />
              <button type="submit" className="rh-btn rh-btn--solid" disabled={isSubscribed}>
                {isSubscribed ? "Subscribed!" : "Subscribe Now"}
              </button>
              {error && <p className="rh-footer__error">{error}</p>}
            </form>
            <p className="rh-footer__micro">1.2K+ developers joined this week</p>
          </div>
        </div>

        <hr className="rh-footer__divider" />

        {/* Meta row: quick links + socials */}
        <div className="rh-footer__meta">
          <div className="rh-footer__meta-links">
            <Link to="/get-started" className="rh-footer__meta-link">
              Get Started
            </Link>
            <Link to="/dashboard" className="rh-footer__meta-link">
              Dashboard
            </Link>
          </div>
          <div className="rh-footer__social">
            <span className="rh-footer__social-label">Connect &amp; follow:</span>
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.to}
                target="_blank"
                rel="noopener noreferrer"
                className="rh-footer__meta-link"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row: legal + copyright */}
        <div className="rh-footer__bottom">
          <div className="rh-footer__legal">
            {LEGAL.map((link) => (
              <Link key={link.label} to={link.to} className="rh-footer__meta-link">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="rh-footer__copyright">
            © {currentYear} recodehive. Made with ❤️ by the{" "}
            <a
              href="https://github.com/recodehive/recode-website/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
            >
              community.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
