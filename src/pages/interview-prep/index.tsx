import React from "react"
import { useState } from "react"
import Layout from "@theme/Layout"
import Head from "@docusaurus/Head"
import { motion } from "framer-motion"
import Link from "@docusaurus/Link"
import OverviewTab from "./OverviewTab"
import TechnicalTab from "./TechnicalTab";
import BehavioralTab from "./BehavioralTab"
import CompaniesTab from "./CompaniesTab"
import PracticeTab from "./PracticeTab"
import { technicalResources } from "./data/technicalResources";
import { practicePlatforms } from "./data/practicePlatforms";
import { behavioralQuestions } from "./data/behavioralQuestions";
import { companyTips } from "./data/companyTips";
import { mockInterviewQuestions } from "./data/mockInterviewQuestions";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const InterviewPrepPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "technical" | "behavioral" | "companies" | "practice">(
    "overview",
  )
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({})
  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
    }))
  }

  const [showTips, setShowTips] = useState<{ [key: number]: boolean }>({})
  const [showQuestions, setShowQuestions] = useState<{ [key: number]: boolean }>({})

  const toggleTips = (index: number) => {
    setShowTips((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const toggleQuestions = (index: number) => {
    setShowQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <Layout
      title="Interview Preparation - RecodeHive"
      description="Comprehensive interview preparation resources for technical and behavioral interviews at top tech companies"
    >
      <Head>
        <title>Interview Preparation - RecodeHive</title>
        <meta
          name="description"
          content="Master technical and behavioral interviews with our comprehensive preparation resources, practice questions, and company-specific guides."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <motion.section
          className="hero-section py-20 px-4 text-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
              variants={fadeIn}
            >
              Ace Your Next Interview
            </motion.h1>
            <motion.p className="text-xl md:text-2xl mb-8 text-blue-100" variants={fadeIn}>
              Master technical challenges and behavioral questions with our comprehensive interview preparation platform
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <button
                onClick={() => setActiveTab("practice")}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Practice
              </button>
              <button
                onClick={() => setActiveTab("technical")}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Browse Resources
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Navigation Tabs */}
        <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <nav className="flex space-x-8 overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: "📋" },
                { id: "technical", label: "Technical", icon: "💻" },
                { id: "behavioral", label: "Behavioral", icon: "🤝" },
                { id: "companies", label: "Companies", icon: "🏢" },
                { id: "practice", label: "Practice", icon: "🎯" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                    ? "interview-prep-nav-tab-active border-blue-500 text-blue-600 dark:text-blue-400"
                    : "interview-prep-nav-tab-inactive border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="interview-prep-page max-w-6xl mx-auto px-4 py-12">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <OverviewTab
              toggleTips={toggleTips}
              toggleQuestions={toggleQuestions}
              showTips={showTips}
              showQuestions={showQuestions}
              setActiveTab={setActiveTab} 
            />
          )}

          {/* Technical Tab */}
          {activeTab === "technical" && (
            <TechnicalTab
              technicalResources={technicalResources}
              practicePlatforms={practicePlatforms}
              expandedCategories={expandedCategories}
              toggleCategory={toggleCategory}
            />
          )}

          {/* Behavioral Tab */}
          {activeTab === "behavioral" && (
            <BehavioralTab
              behavioralQuestions={behavioralQuestions}
              expandedCategories={expandedCategories}
              toggleCategory={toggleCategory}
            />
          )}

          {/* Companies Tab */}
          {activeTab === "companies" && (
            <CompaniesTab
              companyTips={companyTips}
              toggleTips={toggleTips}
              toggleQuestions={toggleQuestions}
              showTips={showTips}
              showQuestions={showQuestions}
            />
          )}

          {/* Practice Tab */}
          {activeTab === "practice" && (
            <PracticeTab mockInterviewQuestions={mockInterviewQuestions} />
          )}
        </div>

        {/* Call to Action */}
        <motion.section
          className="cta-section py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" variants={fadeIn}>
              Ready to Land Your Dream Job?
            </motion.h2>
            <motion.p className="text-xl mb-8 text-blue-100" variants={fadeIn}>
              Join thousands of developers who have successfully prepared for interviews with RecodeHive
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" variants={fadeIn}>
              <Link
                to="/get-started"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Preparing Now
              </Link>
              <Link
                to="/community"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Join Community
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </Layout>
  )
}

export default InterviewPrepPage
