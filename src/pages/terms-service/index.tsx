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

        {/* Grammatical mistakes are corrected */}
        <Section id="acceptance" title="Acceptance of Terms">
          By accessing or using RecodeHive, you agree to comply with these Terms
          and any other guidelines provided by us. If you do not agree, please
          refrain from using the Service.
        </Section>

        <Section id="use-of-service" title="Use of the Service">
          <ol className={styles.list}>
            <li>
              <strong>Usage Instructions:</strong> Do not use the website in any
              way that could impair its performance, corrupt content, or reduce
              overall functionality.
            </li>
            <li>
              <strong>License:</strong> We grant a limited, non-exclusive,
              non-transferable, revocable license for personal or internal
              business use only. Commercial use is prohibited without prior
              consent.
            </li>
            <li>
              <strong>User Conduct:</strong> Do not compromise website security,
              attempt unauthorized access, or access sensitive information you
              are not permitted to view.
            </li>
          </ol>
        </Section>

        <Section id="content" title="Content">
          <ol className={styles.list}>
            <li>
              <strong>User Content:</strong> You retain ownership of content you
              submit. By submitting, you grant RecodeHive a worldwide,
              royalty-free, non-exclusive license to use, reproduce, modify,
              distribute, and display it.
            </li>
            <li>
              <strong>Intellectual Property:</strong> All trademarks, logos, and
              other intellectual property remain the property of Sanjay
              Viswanathan or its licensors. Usage requires prior written
              consent.
            </li>
            <li>
              <strong>Indemnification:</strong> You are responsible for any
              claims, expenses, or legal fees arising from violations of these
              Terms.
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
