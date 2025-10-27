import React, { useState } from "react";
import Layout from "@theme/Layout";
import styles from "./index.module.css"; // Created a Modular CSS file

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  const [open, setOpen] = useState(id === "acceptance");

  // Helper to dynamically build class names
  const getButtonClasses = () =>
    `${styles.sectionButton} ${open ? styles.open : ""}`;

  const getContentClasses = () =>
    `${styles.sectionContent} ${open ? styles.open : ""}`;

  return (
    <div id={id} className={styles.section}>
      <button
        className={getButtonClasses()}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {/* The title is now wrapped in a span to allow styling */}
        <span className={styles.sectionTitle}>{title}</span>

        {/* New Icon Container */}
        <div className={styles.iconContainer}>
          <span
            className={`${styles.icon} ${styles.iconPlus} ${
              !open ? styles.iconVisible : ""
            }`}
          >
            &#43;
          </span>
          <span
            className={`${styles.icon} ${styles.iconMinus} ${
              open ? styles.iconVisible : ""
            }`}
          >
            &minus;
          </span>
        </div>
      </button>

      <div className={getContentClasses()}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
};

const TermsOfService: React.FC = () => {
  return (
    <Layout
      title="Terms and Conditions of RecodeHive"
      description="Terms of Service Page for RecodeHive learners and users"
      wrapperClassName={styles.pageWrapper}
    >
      <div className={styles.pageContainer}>
        <h1 className={styles.mainTitle}>Terms of Service</h1>
        <p className={styles.introText}>
          Welcome to <b>RecodeHive</b>, operated by{" "}
          <strong>Sanjay Viswanathan</strong>. These Terms of Service govern
          your use of www.recodehive.com. Please read carefully. If you have any
          questions, contact us at{" "}
          <a href="mailto:sanjay@recodehive.com" className={styles.link}>
            sanjay@recodehive.com
          </a>
          .
        </p>

        {/* Grammatical mistakes are corrected with more formal language  */}
        <Section id="acceptance" title="Acceptance of Terms">
          By accessing or using RecodeHive, you agree to comply with these Terms
          and any other guidelines provided by us. If you do not agree, please
          refrain from using the Service.
        </Section>

        <Section id="use-of-service" title="Use of the Service">
          <ol className={styles.list}>
            <li>
              <strong>License to Use:</strong> We grant you a limited,
              non-exclusive, non-transferable, and revocable license to access
              and use the Service for your personal or internal business
              purposes, strictly in accordance with these Terms.
            </li>
            <li>
              <strong>Prohibited Uses:</strong> You agree not to:
              {/* Using inline styles for a nested list to avoid CSS conflicts */}
              <ul
                style={{
                  listStyleType: "circle",
                  paddingLeft: "20px",
                  marginTop: "12px",
                }}
              >
                <li style={{ marginBottom: "8px" }}>
                  Use the Service in any manner that could disable, overburden,
                  damage, or impair the site.
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Attempt to gain unauthorized access to any part of the
                  Service, or any data, servers, or networks connected to the
                  Service.
                </li>
                <li style={{ marginBottom: "8px" }}>
                  Compromise the security of the Service or access sensitive
                  information you are not permitted to view.
                </li>
                <li>
                  Use the Service for any illegal purpose or in violation of any
                  local, state, national, or international law.
                </li>
              </ul>
            </li>
          </ol>
        </Section>

        <Section id="content" title="Content & Intellectual Property">
          <ol className={styles.list}>
            <li>
              <strong>User-Generated Content:</strong> You retain all ownership
              rights to the content you submit ("User Content"). By submitting
              User Content, you grant RecodeHive a worldwide, royalty-free,
              non-exclusive, sublicensable license to use, reproduce, modify,
              adapt, publish, distribute, and display such User Content solely
              in connection with providing the Service.
            </li>
            <li>
              <strong>Our Intellectual Property:</strong> The Service and its
              original content (excluding User Content), features, and
              functionality are and will remain the exclusive property of Sanjay
              Viswanathan and his licensors. Usage of any trademarks, logos, or
              service marks requires our prior written consent.
            </li>
            <li>
              <strong>Indemnification:</strong> You agree to defend, indemnify,
              and hold harmless RecodeHive and Sanjay Viswanathan from and
              against any and all claims, damages, obligations, losses,
              liabilities, costs or debt, and expenses (including but not
              limited to attorney's fees) arising from: (i) your use of and
              access to the Service; (ii) your violation of any term of these
              Terms; or (iii) your violation of any third-party right.
            </li>
          </ol>
        </Section>

        <Section id="privacy" title="Privacy">
          Please review our{" "}
          <a
            href="/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Privacy Policy
          </a>{" "}
          to understand how your personal information is collected and used.
        </Section>

        <Section id="termination" title="Termination">
          We reserve the right to suspend or terminate access to the Service at
          any time, with or without cause, and without prior notice or
          liability.
        </Section>

        <Section id="governing-law" title="Governing Law">
          These Terms are governed by the laws of India, without regard to
          conflicts of law.
        </Section>

        <Section id="changes-to-terms" title="Changes to the Terms">
          RecodeHive may update or modify these Terms at any time. Continued use
          of the Service constitutes acceptance of the updated Terms. Users are
          responsible for reviewing changes regularly.
        </Section>

        <Section id="contact" title="Contact Us">
          If you have any questions regarding these Terms, contact us at{" "}
          <a href="mailto:sanjay@recodehive.com" className={styles.link}>
            sanjay@recodehive.com
          </a>
          .
        </Section>
      </div>
    </Layout>
  );
};

export default TermsOfService;
