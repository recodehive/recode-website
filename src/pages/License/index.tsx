import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import "./index.css";

const Licensing: React.FC = () => {
  return (
    <Layout
      title={"Licensing"}
      description="Licensing information for RecodeHive"
    >
      <div className="lic-container">
        <div className="lic-content-wrapper">
          {/* Header Section */}
          <div className="lic-header">
            <h1 className="lic-title">Licensing</h1>
            <p className="lic-intro">
              Welcome to RecodeHive. This project is licensed under the MIT
              License. This page outlines the terms of the license and provides
              details on how you can use, modify, and distribute our project.
            </p>
          </div>

          {/* Main Content Card */}
          <div className="lic-content-card">
            {/* MIT License Section */}
            <div className="lic-section">
              <h2 className="lic-section-title">
                <span className="lic-section-icon">📜</span>
                MIT License
              </h2>
              <div className="lic-section-content">
                <p>
                  <strong>Copyright (c) 2025 RecodeHive</strong>
                </p>
                <p>
                  Permission is hereby granted, free of charge, to any person
                  obtaining a copy of this software and associated documentation
                  files (the "Software"), to deal in the Software without
                  restriction, including without limitation the rights to use,
                  copy, modify, merge, publish, distribute, sublicense, and/or
                  sell copies of the Software, and to permit persons to whom the
                  Software is furnished to do so, subject to the following
                  conditions:
                </p>
                <p>
                  The above copyright notice and this permission notice shall be
                  included in all copies or substantial portions of the
                  Software.
                </p>
                <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
                  KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
                  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
                  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                </p>
              </div>
            </div>
          </div>

          <div className="lic-contact-section">
            <h2 className="lic-contact-title">Contact Us</h2>
            <div className="lic-contact-content">
              <p>
                If you have any questions regarding licensing, please contact us
                at{" "}
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

export default Licensing;
