import React, { useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Interview categories data
const interviewCategories = [
  {
    id: 'technical',
    title: 'Technical Interviews',
    icon: '💻',
    description: 'Master coding challenges, system design, and technical concepts',
    color: '#3b82f6',
    topics: [
      'Data Structures & Algorithms',
      'System Design',
      'Database Design',
      'API Design',
      'Code Review',
      'Problem Solving'
    ]
  },
  {
    id: 'behavioral',
    title: 'Behavioral Interviews',
    icon: '🤝',
    description: 'Prepare for soft skills and situational questions',
    color: '#10b981',
    topics: [
      'Leadership Examples',
      'Conflict Resolution',
      'Team Collaboration',
      'Project Management',
      'Communication Skills',
      'Cultural Fit'
    ]
  },
  {
    id: 'company-specific',
    title: 'Company-Specific',
    icon: '🏢',
    description: 'Tailored preparation for top tech companies',
    color: '#8b5cf6',
    topics: [
      'Google/Alphabet',
      'Amazon/AWS',
      'Microsoft',
      'Meta/Facebook',
      'Apple',
      'Netflix'
    ]
  }
];

// Technical interview resources
const technicalResources = [
  {
    title: 'Data Structures & Algorithms',
    difficulty: 'Beginner to Advanced',
    problems: 150,
    description: 'Master arrays, linked lists, trees, graphs, and dynamic programming',
    link: '/docs/category/technical',
    tags: ['Arrays', 'Trees', 'Graphs', 'DP']
  },
  {
    title: 'System Design',
    difficulty: 'Intermediate to Advanced',
    problems: 25,
    description: 'Learn to design scalable systems and distributed architectures',
    link: '/docs/category/technical',
    tags: ['Scalability', 'Databases', 'Caching', 'Load Balancing']
  },
  {
    title: 'Database Design',
    difficulty: 'Beginner to Intermediate',
    problems: 40,
    description: 'SQL queries, database optimization, and schema design',
    link: '/docs/category/sql',
    tags: ['SQL', 'NoSQL', 'Indexing', 'Normalization']
  },
  {
    title: 'API Design & Development',
    difficulty: 'Intermediate',
    problems: 30,
    description: 'RESTful APIs, GraphQL, and microservices architecture',
    link: '/docs/category/technical',
    tags: ['REST', 'GraphQL', 'Microservices', 'Authentication']
  }
];

// Behavioral interview questions
const behavioralQuestions = [
  {
    category: 'Leadership',
    questions: [
      'Tell me about a time you led a team through a difficult project',
      'Describe a situation where you had to influence others without authority',
      'How do you handle team conflicts?'
    ]
  },
  {
    category: 'Problem Solving',
    questions: [
      'Describe the most challenging technical problem you\'ve solved',
      'Tell me about a time you failed and what you learned',
      'How do you approach debugging complex issues?'
    ]
  },
  {
    category: 'Communication',
    questions: [
      'Explain a complex technical concept to a non-technical person',
      'Tell me about a time you had to give difficult feedback',
      'How do you handle disagreements with stakeholders?'
    ]
  },
  {
    category: 'Growth & Learning',
    questions: [
      'How do you stay updated with new technologies?',
      'Tell me about a time you had to learn something completely new',
      'What\'s the most important thing you\'ve learned in your career?'
    ]
  }
];

// Company-specific interview tips
const companyTips = [
  {
    company: 'Google',
    logo: '/icons/google.png',
    focus: 'Googleyness & Leadership',
    tips: [
      'Focus on scalability and efficiency',
      'Demonstrate analytical thinking',
      'Show passion for technology',
      'Prepare for system design questions'
    ],
    commonQuestions: [
      'How would you design Google Search?',
      'Explain how you would handle billions of queries',
      'What would you do if Gmail was slow?'
    ]
  },
  {
    company: 'Amazon',
    logo: '/icons/amazon.png',
    focus: 'Leadership Principles',
    tips: [
      'Know all 16 Leadership Principles',
      'Use STAR method for behavioral questions',
      'Focus on customer obsession',
      'Demonstrate ownership mindset'
    ],
    commonQuestions: [
      'Tell me about a time you disagreed with your manager',
      'Describe a time you had to make a decision with incomplete information',
      'How do you handle tight deadlines?'
    ]
  },
  {
    company: 'Microsoft',
    logo: '/icons/mircosoft.png',
    focus: 'Growth Mindset & Collaboration',
    tips: [
      'Emphasize continuous learning',
      'Show collaborative approach',
      'Demonstrate inclusive thinking',
      'Focus on impact and results'
    ],
    commonQuestions: [
      'How do you handle failure?',
      'Tell me about a time you helped a colleague',
      'What motivates you to learn new things?'
    ]
  }
];

// Mock interview simulator data
const mockInterviewQuestions = [
  {
    type: 'technical',
    question: 'Implement a function to reverse a linked list',
    difficulty: 'Medium',
    hints: ['Think about iterative vs recursive approach', 'Consider edge cases like empty list']
  },
  {
    type: 'behavioral',
    question: 'Tell me about a time you had to work with a difficult team member',
    framework: 'STAR Method',
    hints: ['Situation', 'Task', 'Action', 'Result']
  },
  {
    type: 'system-design',
    question: 'Design a URL shortener like bit.ly',
    difficulty: 'Hard',
    hints: ['Consider scale', 'Database design', 'Caching strategy']
  }
];

const InterviewPrepPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'behavioral' | 'companies' | 'practice'>('overview');
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

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
            <motion.p
              className="text-xl md:text-2xl mb-8 text-blue-100"
              variants={fadeIn}
            >
              Master technical challenges and behavioral questions with our comprehensive interview preparation platform
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <button
                onClick={() => setActiveTab('practice')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Practice
              </button>
              <button
                onClick={() => setActiveTab('technical')}
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
                { id: 'overview', label: 'Overview', icon: '📋' },
                { id: 'technical', label: 'Technical', icon: '💻' },
                { id: 'behavioral', label: 'Behavioral', icon: '🤝' },
                { id: 'companies', label: 'Companies', icon: '🏢' },
                { id: 'practice', label: 'Practice', icon: '🎯' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
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
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div className="text-center mb-16" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                  Complete Interview Preparation
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                      {category.description}
                    </p>
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
          {activeTab === 'technical' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
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
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {resource.title}
                      </h3>
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                        {resource.problems} problems
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {resource.description}
                    </p>
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
          {activeTab === 'behavioral' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div className="text-center mb-12" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  Behavioral Interview Questions
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Master the STAR method and common behavioral scenarios
                </p>
              </motion.div>

              {/* STAR Method Guide */}
              <motion.div
                className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-8 mb-12"
                variants={fadeIn}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  The STAR Method
                </h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { letter: 'S', word: 'Situation', desc: 'Set the context and background' },
                    { letter: 'T', word: 'Task', desc: 'Describe your responsibility' },
                    { letter: 'A', word: 'Action', desc: 'Explain what you did' },
                    { letter: 'R', word: 'Result', desc: 'Share the outcome and impact' }
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-3">
                        {item.letter}
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">{item.word}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Question Categories */}
              <div className="space-y-8">
                {behavioralQuestions.map((category, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                    variants={fadeIn}
                  >
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.questions.map((question, i) => (
                        <div
                          key={i}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                        >
                          <p className="text-gray-700 dark:text-gray-300">{question}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Companies Tab */}
          {activeTab === 'companies' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div className="text-center mb-12" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  Company-Specific Preparation
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Tailored strategies for top tech companies
                </p>
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
                        src={company.logo}
                        alt={company.company}
                        className="w-16 h-16 rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {company.company}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          Focus: {company.focus}
                        </p>
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
          {activeTab === 'practice' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div className="text-center mb-12" variants={fadeIn}>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  Mock Interview Practice
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Practice with real interview questions
                </p>
              </motion.div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                {mockInterviewQuestions.map((question, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
                    variants={fadeIn}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        question.type === 'technical' 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : question.type === 'behavioral'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                      }`}>
                        {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                      </span>
                      {question.difficulty && (
                        <span className={`px-2 py-1 rounded text-xs ${
                          question.difficulty === 'Easy' 
                            ? 'bg-green-100 text-green-800'
                            : question.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {question.difficulty}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      {question.question}
                    </h3>
                    
                    {question.framework && (
                      <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                        Framework: {question.framework}
                      </p>
                    )}
                    
                    <div className="mb-4">
                      <button
                        onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        {selectedQuestion === index ? 'Hide Hints' : 'Show Hints'}
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
              <motion.div
                className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
                variants={fadeIn}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
                  Practice Tools
                </h3>
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
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Track your improvement over time
                    </p>
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
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeIn}
            >
              Ready to Land Your Dream Job?
            </motion.h2>
            <motion.p
              className="text-xl mb-8 text-blue-100"
              variants={fadeIn}
            >
              Join thousands of developers who have successfully prepared for interviews with RecodeHive
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
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
  );
};

export default InterviewPrepPage;