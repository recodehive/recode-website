import React, { type ReactNode, useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import { useSafeColorMode } from "@site/src/utils/useSafeColorMode";
import clsx from "clsx";
import { Heart, Monitor, Moon, Sun } from "lucide-react";
import Counter from "./Counter";
import "./enhanced-footer.css";

interface FooterStats {
  activeUsers: string;
  tutorials: string;
  peopleSponsored: string;
  supportHours: string;
}

type ThemePreference = "system" | "light" | "dark";
export default function FooterLayout(): ReactNode {
  const { isDark } = useSafeColorMode();
  const currentYear = new Date().getFullYear();
  const [stats, setStats] = useState<FooterStats>({
    activeUsers: "50K+",
    tutorials: "70+",
    peopleSponsored: "45",
    supportHours: "24/7",
  });
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialPreference: ThemePreference =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : "system";

    setThemePreference(initialPreference);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const nextTheme =
        themePreference === "system"
          ? mediaQuery.matches
            ? "dark"
            : "light"
          : themePreference;

      document.documentElement.setAttribute("data-theme", nextTheme);

      if (themePreference === "system") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", themePreference);
      }
    };

    applyTheme();
    mediaQuery.addEventListener("change", applyTheme);

    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [themePreference]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
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
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className={clsx("enhanced-footer", isDark ? "dark-theme" : "light-theme")}
    >
      <div className="footer-shell">
        <div className="footer-topbar">
          <Link to="/" className="footer-brand" aria-label="RecodeHive home">
            <img
              src="/img/logo.png"
              alt=""
              className="footer-brand-mark"
              aria-hidden="true"
            />
            <span>recodehive</span>
          </Link>

          <div className="footer-social-links" aria-label="Social links">
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
            <Link
              to="https://x.com/sanjay_kv_"
              className="social-link twitter"
              aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
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
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-column">
            <h3 className="footer-column-title">Learning</h3>
            <ul className="footer-links">
              <li>
                <Link to="/docs" className="footer-link">
                  Documentation
                  <span className="link-badge popular">Popular</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" className="footer-link">
                  Video Courses
                  <span className="link-badge new">New</span>
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="footer-link">
                  Get Started
                </Link>
              </li>
              <li>
                <Link to="/badges/github-badges" className="footer-link">
                  GitHub Badges
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Company</h3>
            <ul className="footer-links">
              <li>
                <Link to="/community" className="footer-link">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="footer-link">
                  Our Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="footer-link">
                  Careers
                  <span className="link-badge hiring">We're Hiring!</span>
                </Link>
              </li>
              <li>
                <Link to="/our-sponsors" className="footer-link">
                  Our Sponsors
                </Link>
              </li>
              <li>
                <Link to="/showcase" className="footer-link">
                  Showcase
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Support</h3>
            <ul className="footer-links">
              <li>
                <Link to="/contact-us" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/broadcasts" className="footer-link">
                  Broadcasts
                </Link>
              </li>
              <li>
                <Link to="/podcasts" className="footer-link">
                  Podcasts
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">Legal</h3>
            <ul className="footer-links">
              <li>
                <Link to="/privacy-policy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-service" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/code-of-conduct" className="footer-link">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link to="/License" className="footer-link">
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-stats" aria-label="Community statistics">
          <div
            className="footer-stat-item"
            title="Growing community of active learners"
          >
            <div className="footer-stat-number">
              <Counter value={parseInt(stats.activeUsers)} suffix="K+" />
            </div>
            <div className="footer-stat-label">Active Learners</div>
          </div>
          <div
            className="footer-stat-item"
            title="Comprehensive tutorials and courses"
          >
            <div className="footer-stat-number">
              <Counter value={parseInt(stats.tutorials)} suffix="+" />
            </div>
            <div className="footer-stat-label">Tutorials</div>
          </div>
          <div
            className="footer-stat-item"
            title="People sponsored by the community"
          >
            <div className="footer-stat-number">
              <Counter value={parseInt(stats.peopleSponsored)} suffix="+" />
            </div>
            <div className="footer-stat-label">People Sponsored</div>
          </div>
          <div
            className="footer-stat-item"
            title="Round-the-clock community support"
          >
            <div className="footer-stat-number">{stats.supportHours}</div>
            <div className="footer-stat-label">Support</div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <span>
              &copy; {currentYear} recodehive. Made with{" "}
              <Heart className="footer-heart-icon" aria-label="love" /> by{" "}
              <a
                href="https://github.com/recodehive/recode-website/graphs/contributors"
                target="_blank"
                rel="noopener noreferrer"
              >
                the Community
              </a>
              .
            </span>
          </div>

          <div className="footer-controls" aria-label="Footer controls">
            <div
              className={clsx(
                "footer-theme-switcher",
                `theme-${themePreference}`,
              )}
              role="radiogroup"
              aria-label="Theme preference"
            >
              {(["system", "light", "dark"] as ThemePreference[]).map(
                (preference) => {
                  const ThemeIcon =
                    preference === "system"
                      ? Monitor
                      : preference === "light"
                        ? Sun
                        : Moon;

                  return (
                    <button
                      key={preference}
                      type="button"
                      className="footer-theme-option"
                      onClick={() => setThemePreference(preference)}
                      role="radio"
                      aria-checked={themePreference === preference}
                      aria-label={`${preference} theme`}
                      title={`${preference} theme`}
                    >
                      <ThemeIcon aria-hidden="true" />
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
