import React from "react";
import Layout from "@theme/Layout";

const TermsOfService: React.FC = () => {
  return (
    <Layout
      title={"Terms and condition of recodehive.com"}
      description="Terms of Service Page for recodehive Learners, and users"
    >
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg mt-8 mb-8 text-base leading-relaxed font-sans text-justify">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Terms of Service
        </h2>
        <p className="mb-6">
          These Terms of Service govern your use of{" "}
          <b className="dark:text-gray-900">
            recodehive
          </b>
          , provided by{" "}
          <strong className=" dark:text-gray-900">
            Sanjay Viswanathan
          </strong>
          . Below are the Terms and Conditions for the use of
          www.recodehive.com. Please read these carefully. If you need to
          contact us regarding any aspect of the following terms of use of our
          website, please reach out us at the following email address –
          sanjay@recodehive.com.
        </p>
        <h3 className="text-xl font-bold mb-4">Acceptance of Terms</h3>
        <p className="mb-6">
          By accessing or using the Service, you acknowledge that you have read,
          understood, and agree to be bound by these Terms, as well as any
          additional terms and conditions, policies, and guidelines provided by
          us. If you do not agree to these Terms, please refrain from using the
          Service.
        </p>
        <h3 className="text-xl font-bold mb-4">Use of the Service</h3>
        <ol className="list-decimal pl-6 mb-6">
          <li className="mb-4">
            <strong>Usage Instructions:</strong> You agree not to use the
            website in a way that may impair the performance, corrupt or
            manipulate the content or information available on the website or
            reduce the overall functionality of the website.
          </li>
          <li className="mb-4">
            <strong>License:</strong> We grant you a limited, non-exclusive,
            non-transferable, and revocable license to access and use the
            Service for your personal or internal business purposes. This
            license does not permit any resale or commercial use of the Service.
          </li>
          <li className="mb-4">
            <strong>User Conduct:</strong> You agree not to compromise the
            security of the website or attempt to gain access to secured areas
            of the website or attempt to access any sensitive information you
            may believe exist on the website or server where it is hosted.
          </li>
        </ol>
        <h3 className="text-xl font-bold mb-4">Content</h3>
        <ol className="list-decimal pl-6 mb-6">
          <li className="mb-4">
            <strong>User Content:</strong> You retain ownership of any content
            you submit or upload to the Service (&quot;User Content&quot;). By
            submitting User Content, you grant us a worldwide, royalty-free, and
            non-exclusive license to use, reproduce, modify, adapt, publish,
            translate, distribute, and display such User Content.
          </li>
          <li className="mb-4">
            <strong>Intellectual Property:</strong> All content, trademarks,
            service marks, logos, and other intellectual property displayed on
            or related to the Service are the property of{" "}
            <strong className="dark:text-gray-900">
              Sanjay Viswanathan
            </strong>{" "}
            or its licensors. You may not use or display any of these without
            our prior written consent.
          </li>
          <li className="mb-4">
            <strong>Compensation:</strong> You agree to be fully responsible for
            any claim, expense, losses, liability, costs including legal fees
            incurred by us arising from any infringement of the terms and
            conditions of this agreement and to which you will have agreed if
            you continue to use the website.
          </li>
        </ol>
        <h3 className="text-xl font-bold mb-4">Privacy</h3>
        <p className="mb-6">
          Your privacy is important to us. Please review our{" "}
          <a
            href="/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Privacy Policy
          </a>{" "}
          to understand how we collect, use, and disclose your personal
          information.
        </p>
        <h3 className="text-xl font-bold mb-4">Termination</h3>
        <p className="mb-6">
          We reserve the right to suspend or terminate your access to the
          Service at any time, with or without cause, and without notice or
          liability.
        </p>

        <h3 className="text-xl font-bold mb-4">Governing Law</h3>
        <p className="mb-6">
          These Terms shall be governed by and construed per the laws of India,
          without regard to its conflict of law principles.
        </p>
        <h3 className="text-xl font-bold mb-4">Changes to the Terms</h3>
        <p className="mb-6">
          Though we strive to be entirely accurate in the information that is
          presented on our site and attempt to keep it as up to date as
          possible, in some cases, some of the information you find on the
          website may be slightly outdated. www.recodehive.com reserves the
          right to make any modifications or corrections to the information you
          find on the site at any time without notice.
        </p>
        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a
            href="mailto:sanjay@recodehive.com"
            className="text-blue-600 underline"
          >
            sanjay@recodehive.com
          </a>
          .
        </p>
      </div>
    </Layout>
  );
};

export default TermsOfService;
