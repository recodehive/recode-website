import Layout from "@theme/Layout";
import React from "react";
import Link from "@docusaurus/Link";
import "./index.css";

const CodeOfConduct: React.FC = () => {
  return (
    <Layout
      title="Code of Conduct"
      description="Code of Conduct for the RecodeHive community"
    >
      <div className="coc-container">
        <div className="coc-content-wrapper">
          {/* Header Section */}
          <div className="coc-header">
            <h1 className="coc-title">Code of Conduct</h1>
            <p className="coc-last-updated">
              <strong>Last Updated:</strong> 29th Oct 2025
            </p>
            <p className="coc-intro">
              This Code of Conduct outlines our pledge, standards, and
              enforcement policies for the RecodeHive community.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="coc-content-card">
            {/* Our Pledge */}
            <div className="coc-section">
              <h2 className="coc-section-title">
                <span className="coc-section-icon">🤝</span>
                Our Pledge
              </h2>
              <div className="coc-section-content">
                <p>
                  We as members, contributors, and leaders pledge to make
                  participation in our community a harassment-free experience
                  for everyone, regardless of age, body size, visible or
                  invisible disability, ethnicity, sex characteristics, gender
                  identity and expression, level of experience, education,
                  socio-economic status, nationality, personal appearance, race,
                  religion, or sexual identity and orientation.
                </p>
                <p>
                  We pledge to act and interact in ways that contribute to an
                  open, welcoming, diverse, inclusive, and healthy community.
                </p>
              </div>
            </div>

            {/* Our Standards */}
            <div className="coc-section">
              <h2 className="coc-section-title">
                <span className="coc-section-icon">✨</span>
                Our Standards
              </h2>
              <div className="coc-section-content">
                <p>
                  Examples of behavior that contributes to a positive
                  environment for our community include:
                </p>
                <ul className="coc-list">
                  <li className="coc-list-item">
                    Demonstrating empathy and kindness toward other people
                  </li>
                  <li className="coc-list-item">
                    Being respectful of differing opinions, viewpoints, and
                    experiences
                  </li>
                  <li className="coc-list-item">
                    Giving and gracefully accepting constructive feedback
                  </li>
                  <li className="coc-list-item">
                    Accepting responsibility and apologizing to those affected
                    by our mistakes, and learning from the experience
                  </li>
                  <li className="coc-list-item">
                    Focusing on what is best not just for us as individuals, but
                    for the overall community
                  </li>
                </ul>

                <p style={{ marginTop: "1.5rem" }}>
                  Examples of unacceptable behavior include:
                </p>
                <ul className="coc-list">
                  <li className="coc-list-item">
                    The use of sexualized language or imagery, and sexual
                    attention or advances of any kind
                  </li>
                  <li className="coc-list-item">
                    Trolling, insulting or derogatory comments, and personal or
                    political attacks
                  </li>
                  <li className="coc-list-item">
                    Public or private harassment
                  </li>
                  <li className="coc-list-item">
                    Publishing others' private information, such as a physical
                    or email address, without their explicit permission
                  </li>
                  <li className="coc-list-item">
                    Other conduct which could reasonably be considered
                    inappropriate in a professional setting
                  </li>
                </ul>
              </div>
            </div>

            {/* Enforcement Responsibilities */}
            <div className="coc-section">
              <h2 className="coc-section-title">
                <span className="coc-section-icon">🛡️</span>
                Enforcement Responsibilities
              </h2>
              <div className="coc-section-content">
                <p>
                  Community leaders are responsible for clarifying and enforcing
                  our standards of acceptable behavior and will take appropriate
                  and fair corrective action in response to any behavior that
                  they deem inappropriate, threatening, offensive, or harmful.
                </p>
                <p>
                  Community leaders have the right and responsibility to remove,
                  edit, or reject comments, commits, code, wiki edits, issues,
                  and other contributions that are not aligned to this Code of
                  Conduct, and will communicate reasons for moderation decisions
                  when appropriate.
                </p>
              </div>
            </div>

            {/* Scope */}
            <div className="coc-section">
              <h2 className="coc-section-title">
                <span className="coc-section-icon">🌐</span>
                Scope
              </h2>
              <div className="coc-section-content">
                <p>
                  This Code of Conduct applies within all community spaces, and
                  also applies when an individual is officially representing the
                  community in public spaces. Examples of representing our
                  community include using an official e-mail address, posting
                  via an official social media account, or acting as an
                  appointed representative at an online or offline event.
                </p>
              </div>
            </div>

            {/* Enforcement */}
            <div className="coc-section">
              <h2 className="coc-section-title">
                <span className="coc-section-icon">⚖️</span>
                Enforcement
              </h2>
              <div className="coc-section-content">
                <p>
                  Instances of abusive, harassing, or otherwise unacceptable
                  behavior may be reported to the community leaders responsible
                  for enforcement at Email. All complaints will be reviewed and
                  investigated promptly and fairly. All community leaders are
                  obligated to respect the privacy and security of the reporter
                  of any incident.
                </p>
              </div>
            </div>

            {/* Enforcement Guidelines */}
            <div className="coc-section">
              <h2 className="coc-section-title">
                <span className="coc-section-icon">📜</span>
                Enforcement Guidelines
              </h2>
              <div className="coc-section-content">
                <p>
                  Community leaders will follow these Community Impact
                  Guidelines in determining the consequences for any action they
                  deem in violation of this Code of Conduct:
                </p>
                <ul className="coc-list">
                  <li className="coc-list-item">
                    <strong>1. Correction</strong>
                    <br />
                    <strong>Community Impact:</strong> Use of inappropriate
                    language or other behavior deemed unprofessional or
                    unwelcome in the community.
                    <br />
                    <strong>Consequence:</strong> A private, written warning
                    from community leaders, providing clarity around the nature
                    of the violation and an explanation of why the behavior was
                    inappropriate. A public apology may be requested.
                  </li>
                  <li className="coc-list-item">
                    <strong>2. Warning</strong>
                    <br />
                    <strong>Community Impact:</strong> A violation through a
                    single incident or series of actions.
                    <br />
                    <strong>Consequence:</strong> A warning with consequences
                    for continued behavior. No interaction with the people
                    involved, including unsolicited interaction with those
                    enforcing the Code of Conduct, for a specified period.
                    Violating these terms may lead to a temporary or permanent
                    ban.
                  </li>
                  <li className="coc-list-item">
                    <strong>3. Temporary Ban</strong>
                    <br />
                    <strong>Community Impact:</strong> A serious violation of
                    community standards, including sustained inappropriate
                    behavior.
                    <br />
                    <strong>Consequence:</strong> A temporary ban from any
                    interaction or public communication with the community for a
                    specified period. Violating these terms may lead to a
                    permanent ban.
                  </li>
                  <li className="coc-list-item">
                    <strong>4. Permanent Ban</strong>
                    <br />
                    <strong>Community Impact:</strong> Demonstrating a pattern
                    of violation of community standards, including harassment of
                    an individual, or disparagement of groups.
                    <br />
                    <strong>Consequence:</strong> A permanent ban from any sort
                    of public interaction within the community.
                  </li>
                </ul>
              </div>
            </div>

            {/* Attribution */}
            <div className="coc-section">
              <h2 className="coc-section-title">
                <span className="coc-section-icon">📚</span>
                Attribution
              </h2>
              <div className="coc-section-content">
                <p>
                  This Code of Conduct is adapted from the{" "}
                  <Link
                    to="https://www.contributor-covenant.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contributor Covenant
                  </Link>
                  , version 2.0.
                </p>
                <p>
                  For more details, visit{" "}
                  <Link
                    to="https://www.contributor-covenant.org/version/2/0/code_of_conduct/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    here
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="coc-contact-section">
            <h2 className="coc-contact-title">Contact Us</h2>
            <div className="coc-contact-content">
              <p>
                If you have any questions or concerns about this Code of
                Conduct, please contact us at{" "}
                <a
                  href="mailto:sanjay@recodehive.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sanjay@recodehive.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CodeOfConduct;
