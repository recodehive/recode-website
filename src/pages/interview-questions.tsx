import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import "./interview-questions.css"; // Optional: create for custom styles

export default function InterviewQuestions() {
  return (
    <Layout
      title="Interview Questions"
      description="Technical and Behavioral Interview Questions"
    >
      <Head>
        <title>RecodeHive | Interview Questions</title>
        <meta
          name="description"
          content="Technical and Behavioral Interview Questions"
        />
      </Head>
      <div className="interview-questions-layout">
        {/* Hero Section */}
        <motion.section
          className="interview-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <h1 className="interview-title">
              <span className="highlight">Interview Questions</span>
            </h1>
            <p className="interview-subtitle">
              Explore curated technical and behavioral interview questions to
              help you prepare for your next opportunity!
            </p>
          </div>
        </motion.section>

        {/* Questions Cards */}
        <motion.section
          className="interview-cards-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="interview-cards-grid">
            <motion.div
              className="interview-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <h2>🧩 Technical Questions</h2>
              <p>Practice coding, algorithms, and system design questions.</p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="interview-link"
              >
                View Technical Interview Questions
              </a>
            </motion.div>
            <motion.div
              className="interview-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <h2>💡 Behavioral Questions</h2>
              <p>
                Prepare for HR and behavioral rounds with real-world scenarios.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="interview-link"
              >
                View Behavioral Interview Questions
              </a>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}
