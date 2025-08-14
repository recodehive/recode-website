import React from "react";
import { useState } from "react"
import Layout from "@theme/Layout"
import Head from "@docusaurus/Head"
import { motion } from "framer-motion"
import Link from "@docusaurus/Link"

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

// Interview categories data
const interviewCategories = [
  {
    id: "technical",
    title: "Technical Interviews",
    icon: "💻",
    description: "Master coding challenges, system design, and technical concepts",
    color: "#3b82f6",
    topics: [
      "Data Structures & Algorithms",
      "System Design",
      "Database Design",
      "API Design",
      "Code Review",
      "Problem Solving",
    ],
  },
  {
    id: "behavioral",
    title: "Behavioral Interviews",
    icon: "🤝",
    description: "Prepare for soft skills and situational questions",
    color: "#10b981",
    topics: [
      "Leadership Examples",
      "Conflict Resolution",
      "Team Collaboration",
      "Project Management",
      "Communication Skills",
      "Cultural Fit",
    ],
  },
  {
    id: "company-specific",
    title: "Company-Specific",
    icon: "🏢",
    description: "Tailored preparation for top tech companies",
    color: "#8b5cf6",
    topics: ["Google/Alphabet", "Amazon/AWS", "Microsoft", "Meta/Facebook", "Apple", "Netflix"],
  },
]

// Technical interview resources
const technicalResources = [
  {
    title: "Data Structures & Algorithms",
    difficulty: "Beginner to Advanced",
    problems: 150,
    description: "Master arrays, linked lists, trees, graphs, and dynamic programming",
    link: "/docs/category/technical",
    tags: ["Arrays", "Trees", "Graphs", "DP"],
  },
  {
    title: "System Design",
    difficulty: "Intermediate to Advanced",
    problems: 25,
    description: "Learn to design scalable systems and distributed architectures",
    link: "/docs/category/technical",
    tags: ["Scalability", "Databases", "Caching", "Load Balancing"],
  },
  {
    title: "Database Design",
    difficulty: "Beginner to Intermediate",
    problems: 40,
    description: "SQL queries, database optimization, and schema design",
    link: "/docs/category/sql",
    tags: ["SQL", "NoSQL", "Indexing", "Normalization"],
  },
  {
    title: "API Design & Development",
    difficulty: "Intermediate",
    problems: 30,
    description: "RESTful APIs, GraphQL, and microservices architecture",
    link: "/docs/category/technical",
    tags: ["REST", "GraphQL", "Microservices", "Authentication"],
  },
]

// Behavioral interview questions
const behavioralQuestions = [
  {
    category: "Leadership",
    questions: [
      "Tell me about a time you led a team through a difficult project",
      "Describe a situation where you had to influence others without authority",
      "How do you handle team conflicts?",
    ],
  },
  {
    category: "Problem Solving",
    questions: [
      "Describe the most challenging technical problem you've solved",
      "Tell me about a time you failed and what you learned",
      "How do you approach debugging complex issues?",
    ],
  },
  {
    category: "Communication",
    questions: [
      "Explain a complex technical concept to a non-technical person",
      "Tell me about a time you had to give difficult feedback",
      "How do you handle disagreements with stakeholders?",
    ],
  },
  {
    category: "Growth & Learning",
    questions: [
      "How do you stay updated with new technologies?",
      "Tell me about a time you had to learn something completely new",
      "What's the most important thing you've learned in your career?",
    ],
  },
]

// Company-specific interview tips
const companyTips = [
  {
    company: "Google",
    logo: "/icons/google.png",
    focus: "Googleyness & Leadership",
    tips: [
      "Focus on scalability and efficiency",
      "Demonstrate analytical thinking",
      "Show passion for technology",
      "Prepare for system design questions",
    ],
    commonQuestions: [
      "How would you design Google Search?",
      "Explain how you would handle billions of queries",
      "What would you do if Gmail was slow?",
    ],
  },
  {
    company: "Amazon",
    logo: "/icons/amazon.png",
    focus: "Leadership Principles",
    tips: [
      "Know all 16 Leadership Principles",
      "Use STAR method for behavioral questions",
      "Focus on customer obsession",
      "Demonstrate ownership mindset",
    ],
    commonQuestions: [
      "Tell me about a time you disagreed with your manager",
      "Describe a time you had to make a decision with incomplete information",
      "How do you handle tight deadlines?",
    ],
  },
  {
    company: "Microsoft",
    logo: "/icons/mircosoft.png",
    focus: "Growth Mindset & Collaboration",
    tips: [
      "Emphasize continuous learning",
      "Show collaborative approach",
      "Demonstrate inclusive thinking",
      "Focus on impact and results",
    ],
    commonQuestions: [
      "How do you handle failure?",
      "Tell me about a time you helped a colleague",
      "What motivates you to learn new things?",
    ],
  },
]

// Mock interview simulator data
const mockInterviewQuestions = [
  {
    type: "technical",
    question: "Implement a function to reverse a linked list",
    difficulty: "Medium",
    hints: ["Think about iterative vs recursive approach", "Consider edge cases like empty list"],
  },
  {
    type: "behavioral",
    question: "Tell me about a time you had to work with a difficult team member",
    framework: "STAR Method",
    hints: ["Situation", "Task", "Action", "Result"],
  },
  {
    type: "system-design",
    question: "Design a URL shortener like bit.ly",
    difficulty: "Hard",
    hints: ["Consider scale", "Database design", "Caching strategy"],
  },
]

const InterviewPrepPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "technical" | "behavioral" | "companies" | "practice">(
    "overview",
  )
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({})

  const toggleCategory = (categoryIndex: number) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryIndex]: !prev[categoryIndex],
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
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
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
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div className="text-center mb-16" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Complete Interview Preparation
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Everything you need to succeed in technical and behavioral interviews at top tech companies
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {interviewCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    variants={fadeIn}
                    onClick={() => setActiveTab(category.id as any)}
                  >
                    <div className="text-6xl mb-4 text-center">{category.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{category.description}</p>
                    <div className="space-y-2">
                      {category.topics.map((topic, i) => (
                        <div key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          {topic}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Stats */}
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white"
                variants={fadeIn}
              >
                <div className="grid md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold mb-2">500+</div>
                    <div className="text-blue-100">Practice Questions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-blue-100">System Design Topics</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">20+</div>
                    <div className="text-blue-100">Company Guides</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <div className="text-blue-100">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Technical Tab */}
          {activeTab === "technical" && (
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div className="text-center mb-12" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  Technical Interview Preparation
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Master coding challenges and technical concepts
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {technicalResources.map((resource, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                    variants={fadeIn}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{resource.title}</h3>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                        {resource.problems} problems
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Difficulty: {resource.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={resource.link}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                    >
                      Start Learning
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Behavioral Tab */}
          {activeTab === "behavioral" && (
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              {/* Introduction Section */}
              <motion.div className="text-center mb-12" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-4 text-white">
                  Behavioral Interview Preparation
                </h2>
                <p className="text-xl text-center ml-3 text-gray-600 dark:text-gray-300 ">
                  Master the art of storytelling and showcase your soft skills with confidence
                </p>
              </motion.div>

              {/* What are Behavioral Interviews */}
              <motion.div
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 mb-12"
                variants={fadeIn}
              >
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                    <span className="text-3xl mr-3">🤝</span>
                    What are Behavioral Interviews?
                  </h3>
                  <div className="grid md:grid-cols-2 gap-12">
                    <div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Behavioral interviews focus on how you've handled situations in the past to predict your future
                        performance. These questions typically start with phrases like "Tell me about a time when..." or
                        "Describe a situation where..."
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Unlike technical interviews that test your coding skills, behavioral interviews evaluate your
                        soft skills, cultural fit, and ability to work in a team environment.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 -mt-10">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-4">Why They Matter</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-300">
                            70% of hiring decisions are based on cultural fit
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-300">
                            Assess leadership and communication skills
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-300">Evaluate problem-solving approach</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-300">Determine team collaboration ability</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* STAR Method Guide */}
              <motion.div
                className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8 mb-12"
                variants={fadeIn}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                  The STAR Method Framework
                </h3>
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  {[
                    {
                      letter: "S",
                      word: "Situation",
                      desc: "Set the context and background of your story",
                      color: "bg-red-500",
                    },
                    {
                      letter: "T",
                      word: "Task",
                      desc: "Describe your responsibility or goal",
                      color: "bg-yellow-500",
                    },
                    {
                      letter: "A",
                      word: "Action",
                      desc: "Explain the specific steps you took",
                      color: "bg-green-500",
                    },
                    {
                      letter: "R",
                      word: "Result",
                      desc: "Share the outcome and what you learned",
                      color: "bg-blue-500",
                    },
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div
                        className={`w-16 h-16 ${item.color} text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3 shadow-lg`}
                      >
                        {item.letter}
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.word}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* STAR Method Examples */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <span className="text-xl mr-2">💡</span>
                      Example 1: Leadership Challenge
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="border-l-4 border-red-500 star-border-red pl-4">
                        <strong className="text-red-600 dark:text-red-400">Situation:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          "During my internship, our team was behind schedule on a critical project with only 2 weeks
                          left before the deadline."
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-500 star-border-yellow pl-4">
                        <strong className="text-yellow-600 dark:text-yellow-400">Task:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          "As the junior developer, I needed to help coordinate efforts and find ways to accelerate our
                          progress."
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 star-border-green pl-4">
                        <strong className="text-green-600 dark:text-green-400">Action:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          "I organized daily stand-ups, created a shared task board, and volunteered to work extra hours
                          on critical features."
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-500 star-border-blue pl-4">
                        <strong className="text-blue-600 dark:text-blue-400">Result:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          "We delivered the project on time, and my manager praised my initiative. I learned the
                          importance of proactive communication."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <span className="text-xl mr-2">🔧</span>
                      Example 2: Problem Solving
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="border-l-4 border-red-500 star-border-red pl-4">
                        <strong className="text-red-600 dark:text-red-400">Situation:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          "Our main application was experiencing frequent crashes affecting 30% of users during peak
                          hours."
                        </p>
                      </div>
                      <div className="border-l-4 border-yellow-500 star-border-yellow pl-4">
                        <strong className="text-yellow-600 dark:text-yellow-400">Task:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          "I was assigned to identify the root cause and implement a solution within 48 hours."
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 star-border-green pl-4">
                        <strong className="text-green-600 dark:text-green-400">Action:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          "I analyzed logs, reproduced the issue, and discovered a memory leak in our caching system. I
                          implemented a fix and added monitoring."
                        </p>
                      </div>
                      <div className="border-l-4 border-blue-500 star-border-blue pl-4">
                        <strong className="text-blue-600 dark:text-blue-400">Result:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          "Crashes reduced by 95%, user satisfaction improved, and we prevented similar issues with
                          better monitoring."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Common Behavioral Questions - Collapsible */}
              <motion.div className="mb-12" variants={fadeIn}>
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">
                  Common Behavioral Questions by Category
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      category: "Leadership & Initiative",
                      icon: "👑",
                      color: "from-purple-500 to-pink-500",
                      questions: [
                        "Tell me about yourself",
                        "Tell me about a time you led a team through a difficult project",
                        "Describe a situation where you had to influence others without authority",
                        "How do you handle team conflicts?",
                        "Give an example of when you took initiative on a project",
                      ],
                    },
                    {
                      category: "Problem Solving & Challenges",
                      icon: "🧩",
                      color: "from-blue-500 to-cyan-500",
                      questions: [
                        "Describe a challenging situation you faced and how you handled it",
                        "Tell me about the most challenging technical problem you've solved",
                        "Describe a time you failed and what you learned",
                        "How do you approach debugging complex issues?",
                        "Tell me about a time you had to make a decision with incomplete information",
                      ],
                    },
                    {
                      category: "Teamwork & Communication",
                      icon: "🤝",
                      color: "from-green-500 to-teal-500",
                      questions: [
                        "How do you handle conflict with team members?",
                        "Explain a complex technical concept to a non-technical person",
                        "Tell me about a time you had to give difficult feedback",
                        "Describe a time you disagreed with your manager",
                        "How do you handle disagreements with stakeholders?",
                      ],
                    },
                    {
                      category: "Growth & Learning",
                      icon: "📚",
                      color: "from-orange-500 to-red-500",
                      questions: [
                        "How do you stay updated with new technologies?",
                        "Tell me about a time you had to learn something completely new",
                        "What's the most important thing you've learned in your career?",
                        "Describe a time you received constructive criticism",
                        "How do you handle tight deadlines and pressure?",
                      ],
                    },
                  ].map((section, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                      <button
                        onClick={() => toggleCategory(index)}
                        className={`w-full bg-gradient-to-r ${section.color} p-6 text-left hover:opacity-90 transition-opacity`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold text-white flex items-center">
                            <span className="text-2xl mr-3">{section.icon}</span>
                            {section.category}
                          </h4>
                          <span
                            className="text-white text-2xl transform transition-transform duration-200"
                            style={{ transform: expandedCategories[index] ? "rotate(180deg)" : "rotate(0deg)" }}
                          >
                            ▼
                          </span>
                        </div>
                      </button>

                      {expandedCategories[index] && (
                        <motion.div
                          className="p-6"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="grid gap-3">
                            {section.questions.map((question, i) => (
                                <div
                                  key={i}
                                  className="p-4 interview-prep-sidebar bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer border-l-4 border-gray-300 dark:border-gray-600 hover:border-blue-500"
                                >
                                <p className="text-gray-700 dark:text-gray-300 font-medium">"{question}"</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Do's and Don'ts */}
              <motion.div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12" variants={fadeIn}>
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center">
                  Do's and Don'ts for Behavioral Interviews
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Do's */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-green-800 dark:text-green-300 mb-6 flex items-center">
                      <span className="text-2xl mr-2">✅</span>
                      Do's
                    </h4>
                    <div className="space-y-4">
                      {[
                        "Practice with real scenarios from your experience",
                        "Be concise and specific in your answers",
                        "Show enthusiasm and passion for your work",
                        "Use the STAR method to structure responses",
                        "Prepare 5-7 strong examples beforehand",
                        "Focus on your individual contributions",
                        "Quantify results whenever possible",
                        "Show what you learned from each experience",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start">
                          <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Don'ts */}
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-red-800 dark:text-red-300 mb-6 flex items-center">
                      <span className="text-2xl mr-2">❌</span>
                      Don'ts
                    </h4>
                    <div className="space-y-4">
                      {[
                        "Memorize robotic, scripted answers",
                        "Be vague or over-explain situations",
                        "Appear disinterested or unenthusiastic",
                        "Speak negatively about previous employers",
                        "Make up stories or exaggerate experiences",
                        "Focus only on team achievements without your role",
                        "Give answers without clear structure",
                        "Forget to mention the results or outcomes",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Video Resources */}
              <motion.div
                className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8 mb-12"
                variants={fadeIn}
              >
                <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white text-center flex items-center justify-center">
                  <span className="text-3xl mr-3">🎥</span>
                  Video Resources & Learning Materials
                </h3>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {[
                    {
                      title: "Behavioral Interview Masterclass",
                      channel: "CareerVidz",
                      duration: "25 min",
                      description: "Complete guide to behavioral interviews with real examples",
                      url: "https://www.youtube.com/watch?v=PJKYqLP6MRE",
                      thumbnail: "../../img/Behavioural_Interviews1.png",
                    },
                    {
                      title: "STAR Method Explained",
                      channel: "Interview Success",
                      duration: "15 min",
                      description: "Step-by-step breakdown of the STAR method with practice",
                      url: "https://www.youtube.com/watch?v=V0jktOX8Jog",
                      thumbnail: "../../img/Behavioural_Interviews2.png",
                    },
                    {
                      title: "Mock Behavioral Interview",
                      channel: "Tech Interview Pro",
                      duration: "30 min",
                      description: "Real behavioral interview simulation with feedback",
                      url: "https://www.youtube.com/watch?v=1qw5ITr3k9E",
                      thumbnail: "../../img/Behavioural_Interviews3.png",
                    },
                  ].map((video, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">{video.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{video.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                          <span>{video.channel}</span>
                          <span>{video.duration}</span>
                        </div>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="watch-video-btn"
                        >
                          <span className="mr-2">▶️</span>
                          Watch Video
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Resources */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">Additional Learning Resources</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📚 Recommended Books</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• "Cracking the Coding Interview" by Gayle McDowell</li>
                        <li>• "The Behavioral Interview Handbook" by Lewis Lin</li>
                        <li>• "What Color Is Your Parachute?" by Richard N. Bolles</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">🌐 Online Platforms</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Pramp - Free mock interviews</li>
                        <li>• InterviewBit - Behavioral question bank</li>
                        <li>• Glassdoor - Company-specific questions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contributor Note */}
              <motion.div
               className="bg-gradient-to-r interview-prep-join-comm from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-8 border-2 border-yellow-200 dark:border-yellow-800 dark:outline dark:outline-2 dark:outline-yellow-800"
                variants={fadeIn}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center">
                    <span className="text-3xl mr-3">🤝</span>
                    Join Our Community & Contribute
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Help make this resource better for everyone in the RecodeHive community
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl mb-3">💬</div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Share Your Experience</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Share your behavioral interview experiences, both successes and challenges
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl mb-3">📝</div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Suggest Resources</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Recommend helpful videos, articles, or tools you've found useful
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl mb-3">🔧</div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Improve Content</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Help us add more examples, questions, or improve existing content
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">How to Contribute</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">🚀 Quick Ways to Help</h5>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-300">
                            Join our Discord community and share tips
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-300">
                            Submit interview questions you've encountered
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-300">
                            Review and suggest improvements to examples
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-gray-600 dark:text-gray-300">
                            Share company-specific behavioral interview tips
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">📋 Getting Started</h5>
                      <div className="space-y-3">
                        <Link
                          to="/community"
                          className="block interview-prep-discord-btn text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                        >
                          Join Discord Community
                        </Link>
                        <Link
                          to="/get-started"
                          className="block text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg dark:hover:bg-yellow-800/20 transition-colors text-center font-medium dark:outline dark:outline-2 dark:outline-yellow-800"
                        >
                          Contributing Guide
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Companies Tab */}
          {activeTab === "companies" && (
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div className="text-center mb-12" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Company-Specific Preparation</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">Tailored strategies for top tech companies</p>
              </motion.div>

              <div className="space-y-8">
                {companyTips.map((company, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                    variants={fadeIn}
                  >
                    <div className="flex items-center mb-6">
                      <img
                        src={company.logo || "/placeholder.svg"}
                        alt={company.company}
                        className="w-16 h-16 rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{company.company}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">Focus: {company.focus}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Key Tips</h4>
                        <ul className="space-y-2">
                          {company.tips.map((tip, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <span className="text-gray-600 dark:text-gray-300">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Common Questions</h4>
                        <ul className="space-y-2">
                          {company.commonQuestions.map((question, i) => (
                            <li key={i} className="text-gray-600 dark:text-gray-300 text-sm">
                              "{question}"
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Practice Tab */}
          {activeTab === "practice" && (
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div className="text-center mb-12" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Mock Interview Practice</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">Practice with real interview questions</p>
              </motion.div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {mockInterviewQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                    variants={fadeIn}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          question.type === "technical"
                            ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                            : question.type === "behavioral"
                              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                              : "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                        }`}
                      >
                        {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                      </span>
                      {question.difficulty && (
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            question.difficulty === "Easy"
                              ? "bg-green-100 text-green-800"
                              : question.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {question.difficulty}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{question.question}</h3>

                    {question.framework && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">Framework: {question.framework}</p>
                    )}

                    <div className="mb-4">
                      <button
                        onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {selectedQuestion === index ? "Hide Hints" : "Show Hints"}
                      </button>
                    </div>

                    {selectedQuestion === index && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hints:</h4>
                        <ul className="space-y-1">
                          {question.hints.map((hint, i) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-300">
                              • {hint}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Start Practice
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Practice Tools */}
              <motion.div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8" variants={fadeIn}>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Practice Tools</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-4xl mb-4">⏱️</div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Timed Practice</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Practice with real interview time constraints
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-4xl mb-4">🎥</div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Video Recording</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Record yourself to improve presentation skills
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-4xl mb-4">📊</div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">Progress Tracking</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Track your improvement over time</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
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
