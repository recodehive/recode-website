import Layout from "@theme/Layout";
import React from "react";
import "./index.css";

const PrivacyPolicy: React.FC = () => {
  return (
    <Layout
      title="Privacy Policy"
      description="Privacy Policy of recode hive for Learners, and users"
    >
      <div className="privacy-policy-container">
        <div className="privacy-content-wrapper">
          {/* Header Section */}
          <div className="privacy-header">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-last-updated">
              <strong>Last Updated:</strong> 25th May 2025
            </p>
            <p className="privacy-intro">
              Welcome to{" "}
              <a
                href="https://github.com/sanjay-kv"
                target="_blank"
                rel="noopener noreferrer"
              >
                RecodeHive
              </a>
              , an educational and technology-focused platform operated by{" "}
              <a
                href="https://github.com/sanjay-kv"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sanjay Viswanthan
              </a>
              . We are committed to protecting your privacy and ensuring the
              security of your personal information. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="privacy-content-card">
            {/* Consent Section */}
            <div className="privacy-section">
              <div className="privacy-section-content">
                <p>
                  By accessing or using our website, you consent to the terms of
                  this Privacy Policy. If you do not agree with the terms of
                  this Privacy Policy, please do not use our website.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-icon">📊</span>
                Information We Collect
              </h2>
              <div className="privacy-section-content">
                <p>
                  We collect personal information that you voluntarily provide
                  to us when you interact with the website, such as your name,
                  email address, and any other information you choose to share.
                  We may also collect technical information about your device
                  and usage patterns to improve our website&apos;s functionality
                  and user experience.
                </p>
              </div>
            </div>

            {/* What personal data we collect */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-icon">🔍</span>
                What Personal Data We Collect and Why
              </h2>
              <ul className="privacy-list">
                <li className="privacy-list-item">
                  <strong>Comments & Personalization:</strong>
                  When visitors leave comments on the site we collect the data
                  shown in the comments form, and also the visitors IP address
                  and browser user agent string to help spam detection. To
                  customize your experience on our website and provide content
                  and resources tailored to your interests and preferences.
                </li>
                <li className="privacy-list-item">
                  <strong>Media & Communication:</strong>
                  If you upload images to the website, you should avoid
                  uploading images with embedded location data (EXIF GPS)
                  included. Visitors to the website can download and extract any
                  location data from images on the website. To respond to your
                  inquiries, provide customer support, and send you updates and
                  notifications about our services, events, and educational
                  materials.
                </li>
                <li className="privacy-list-item">
                  <strong>Cookies & Analytics:</strong>
                  If you leave a comment on our site you may opt-in to save your
                  name, email address and website in cookies. We use third party
                  app giscus for this purpose to directly authorize with Github.
                  If you have an account and you log in to this site, we will
                  set a temporary cookie to determine if your browser accepts
                  cookies. This cookie contains no personal data and is
                  discarded when you close your browser. These are for your
                  convenience so that you do not have to fill in your details
                  again when you leave another comment. These cookies will last
                  for one year. To analyze trends, track user interactions, and
                  gather demographic information to improve our website&apos;s
                  performance and user experience.
                </li>
                <li className="privacy-list-item">
                  <strong>Security:</strong>
                  To protect our website from security threats, fraud, or other
                  malicious activities.
                </li>
                <li className="privacy-list-item">
                  <strong>Legal Compliance:</strong>
                  To comply with applicable laws, regulations, or legal
                  processes.
                </li>
                <li className="privacy-list-item">
                  <strong>Contact Forms & Marketing:</strong>
                  If you contact us we will use your name and email address to
                  reply to your query and we won&apos;t share that information
                  with third party. To promote our services, events, and
                  educational materials through targeted advertising and
                  promotional campaigns. If you are subscribing to our blog you
                  will get emails from substack. You will get emails about a new
                  article, freebies, e-book and much more. If you want you can
                  unsubscribe to the emails and it is really easy.
                </li>
              </ul>
            </div>

            {/* Data Retention */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-icon">⏱️</span>
                How Long We Retain Your Data
              </h2>
              <div className="privacy-section-content">
                <p>
                  If you leave a comment, the comment and its metadata are
                  retained indefinitely. This is so we can recognize and approve
                  any follow-up comments automatically instead of holding them
                  in a moderation queue.
                </p>
                <p>
                  We will retain your personal information for as long as
                  necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law. For users that register on our website (if
                  any), we also store the personal information they provide in
                  their user profile. All users can see, edit, or delete their
                  personal information at any time (except they cannot change
                  their username). Website administrators can also see and edit
                  that information.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-icon">🔐</span>
                Your Rights
              </h2>
              <div className="privacy-section-content">
                <p>
                  We are using CloudFlare SSL on our website and everything
                  which you send to us is with us and the data won&apos;t be
                  shared with any third party. You have the right to access,
                  update, correct, or delete your personal information at any
                  time. You can also object to the processing of your personal
                  information or request that we restrict certain processing
                  activities. To exercise these rights, please contact us using
                  the information provided below.
                </p>
              </div>
            </div>

            {/* Third-Party Links */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-icon">🔗</span>
                Third-Party Links
              </h2>
              <div className="privacy-section-content">
                <p>
                  Our website may contain links to third-party websites or
                  resources that are not owned or controlled by us. We are not
                  responsible for the privacy practices or content of these
                  third-party websites. We encourage you to review the privacy
                  policies of these websites before providing any personal
                  information.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-icon">👶</span>
                Children&apos;s Privacy
              </h2>
              <div className="privacy-section-content">
                <p>
                  If there is data breach we will contact the subscribers that
                  there was a data breach and we will write an email to them
                  whose data is lost. Our website is not directed to children
                  under the age of 13. We do not knowingly collect personal
                  information from children under 13. If you are a parent or
                  guardian and believe that your child has provided us with
                  personal information, please contact us, and we will take
                  appropriate steps to remove such information from our records.
                </p>
              </div>
            </div>

            {/* Third Parties We Receive Data From */}
            <div className="privacy-section">
              <h2 className="privacy-section-title">
                <span className="privacy-section-icon">📡</span>
                What Third Parties We Receive Data From
              </h2>
              <div className="privacy-section-content">
                <p>
                  We receive data from Google AdSense and Google Analytics about
                  the user behavior. We reserve the right to update or modify
                  this Privacy Policy at any time. We will notify you of any
                  changes by posting the new Privacy Policy on this page. Your
                  continued use of our website after any modifications indicates
                  your acceptance of the updated Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="privacy-contact-section">
            <h2 className="privacy-contact-title">Contact Us</h2>
            <div className="privacy-contact-content">
              <p>
                If you have any questions or concerns about this Privacy Policy,
                please contact us at{" "}
                <a
                  href="mailto:sanjay@recodehive.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sanjay@recodehive.com
                </a>
                .
                <br />
                Thank you for visiting recodehive!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
