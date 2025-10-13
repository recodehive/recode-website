import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

interface OverviewTabProps {
  toggleTips: (index: number) => void;
  toggleQuestions: (index: number) => void;
  showTips: { [key: number]: boolean };
  showQuestions: { [key: number]: boolean };
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  toggleTips = () => {},
  toggleQuestions = () => {},
  showTips = {},
  showQuestions = {},
  setActiveTab = () => {},
}) => {
  const stages = [
    {
      step: "01",
      title: "Resume Optimization",
      subtitle: "Foundation Building Phase",
      icon: "📄",
      description:
        "Craft a compelling resume that showcases your achievements, aligns with job requirements, and passes ATS screening systems",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500",
      duration: "Ongoing preparation",
      difficulty: "Medium",
      keyFocus: "Professional Presentation & ATS Optimization",
      tips: [
        "Tailor resume for each specific role and company",
        "Use action verbs and quantify achievements with metrics",
        "Optimize for ATS with relevant keywords from job description",
        "Keep format clean, consistent, and easy to scan",
        "Include relevant projects, certifications, and technical skills",
      ],
      commonQuestions: [
        "Walk me through your resume",
        "Tell me about this project on your resume",
        "Why did you choose this career path?",
      ],
    },
    {
      step: "02",
      title: "Technical Assessment",
      subtitle: "Core Competency Evaluation",
      icon: "💻",
      description:
        "Deep dive into coding abilities, algorithmic thinking, system design knowledge, and technical problem-solving approach",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500",
      duration: "60-120 minutes",
      difficulty: "Hard",
      keyFocus: "Problem Solving & Code Quality",
      tips: [
        "Practice coding on whiteboard/shared editor daily",
        "Think out loud - explain your thought process clearly",
        "Ask clarifying questions before jumping into code",
        "Test your solution with edge cases and optimize",
        "Know time/space complexity of your solutions",
      ],
      commonQuestions: [
        "Implement [data structure/algorithm]",
        "Design a system for [specific use case]",
        "Optimize this code for better performance",
      ],
    },
    {
      step: "03",
      title: "Behavioral Deep-Dive",
      subtitle: "Leadership & Culture Assessment",
      icon: "🤝",
      description:
        "Comprehensive evaluation of soft skills, leadership potential, conflict resolution abilities, and team collaboration style",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500",
      duration: "45-75 minutes",
      difficulty: "Medium",
      keyFocus: "Leadership & Collaboration",
      tips: [
        "Master the STAR method (Situation, Task, Action, Result)",
        "Prepare 5-7 detailed stories covering different competencies",
        "Show growth mindset - discuss lessons learned from failures",
        "Demonstrate impact with specific metrics and outcomes",
        "Practice active listening and ask follow-up questions",
      ],
      commonQuestions: [
        "Tell me about a time you led a difficult project",
        "Describe a conflict with a teammate and resolution",
        "Share an example of when you failed and what you learned",
      ],
    },
    {
      step: "04",
      title: "Final Alignment",
      subtitle: "Mutual Fit Confirmation",
      icon: "🎯",
      description:
        "Final evaluation covering compensation expectations, role clarity, team dynamics, and long-term career alignment",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500",
      duration: "30-60 minutes",
      difficulty: "Medium",
      keyFocus: "Mutual Fit & Expectations",
      tips: [
        "Research industry salary benchmarks thoroughly",
        "Prepare thoughtful questions about team and growth",
        "Show genuine enthusiasm for the role and company",
        "Discuss career goals and how role aligns with them",
        "Be ready to negotiate professionally and respectfully",
      ],
      commonQuestions: [
        "What are your career goals for the next 2-3 years?",
        "How do you handle work-life balance?",
        "What questions do you have for us?",
      ],
    },
  ];
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      <motion.div className="mb-16" variants={fadeIn}>
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 dark:border-blue-800 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
              Your Complete Interview Success Guide
            </div>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
              What Our Interview Prep Section Covers
            </h2>
          </div>

          <div className="mb-8 grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                  📚
                </span>
                Comprehensive Coverage
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span>
                    <strong>Technical Mastery:</strong> 500+ coding problems,
                    algorithms, data structures, and system design challenges
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Behavioral Excellence:</strong> STAR method
                    framework, leadership scenarios, and communication skills
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Company Intelligence:</strong> FAANG-specific
                    strategies, culture insights, and insider tips
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Mock Practice:</strong> Real-time simulations with
                    feedback and performance tracking
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center text-xl font-bold text-gray-900 dark:text-white">
                <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm text-white">
                  ⚡
                </span>
                Why Both Technical & Behavioral Matter
              </h3>
              <div className="space-y-4">
                <div className="overview-sidebar-blue rounded-lg border-l-4 border-blue-500 bg-white p-4 dark:bg-gray-800">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    Technical Skills (60% Weight)
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Prove you can solve complex problems, write clean code, and
                    design scalable systems. Technical competence is your entry
                    ticket.
                  </p>
                </div>
                <div className="overview-sidebar-green rounded-lg border-l-4 border-green-500 bg-white p-4 dark:bg-gray-800">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    Behavioral Skills (40% Weight)
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Demonstrate leadership, collaboration, and cultural fit.
                    Many technically strong candidates fail here due to poor
                    communication or team dynamics.
                  </p>
                </div>
              </div>
              <div className="rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-100 to-orange-100 p-4 dark:border-yellow-700 dark:from-yellow-900/30 dark:to-orange-900/30">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>💡 Key Insight:</strong> Top companies hire for both
                  technical excellence AND cultural alignment. Neglecting either
                  aspect significantly reduces your success rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="mb-20" variants={fadeIn}>
        <div className="mb-12 text-center">
          <h3 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Interview Process Journey
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Navigate each stage strategically with our comprehensive roadmap
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8 dark:from-slate-900/50 dark:via-blue-900/20 dark:to-indigo-900/20">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          {/* Diagonal flowchart */}
          <div className="relative">
            {(stages || []).map((stage, index) => {
              return stage ? (
                <motion.div
                  key={index}
                  className="relative mb-20 last:mb-0"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {index < 3 && (
                    <div className="absolute top-full left-1/2 z-10 hidden h-16 w-1 -translate-x-1/2 transform md:block">
                      <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500 to-purple-500"
                          initial={{ height: "0%" }}
                          whileInView={{ height: "100%" }}
                          transition={{ duration: 1, delay: index * 0.3 + 0.5 }}
                          viewport={{ once: true }}
                        />
                      </div>
                      <motion.div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform text-blue-500"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.3 + 1 }}
                        viewport={{ once: true }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                        >
                          <path
                            d="M6 0L12 6L6 12L4.5 10.5L8.25 6.75H0V5.25H8.25L4.5 1.5L6 0Z"
                            transform="rotate(90 6 6)"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  )}

                  <div
                    className={`flex flex-col md:flex-row ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-8`}
                  >
                    <motion.div
                      className="relative flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div
                        className={`h-20 w-20 rounded-full bg-gradient-to-br ${stage.color} relative flex items-center justify-center overflow-hidden text-lg font-bold text-white shadow-lg`}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full bg-white opacity-20"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                        <span className="relative z-10 text-inherit">
                          {stage.step}
                        </span>
                      </div>
                      <motion.div
                        className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-800"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <span className="text-lg">{stage.icon}</span>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="group relative flex-1 overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-gray-800"
                      whileHover={{
                        y: -5,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 opacity-5 transition-opacity duration-300 group-hover:opacity-10">
                        <div
                          className="h-full w-full"
                          style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                            backgroundSize: "24px 24px",
                          }}
                        />
                      </div>

                      <div className="relative z-10">
                        <div className="mb-6 flex items-start justify-between">
                          <div>
                            <h3 className="mb-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                              {stage.title}
                            </h3>
                            <p className="text-sm font-medium tracking-wider text-blue-600 uppercase dark:text-blue-400">
                              {stage.subtitle}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                stage.difficulty === "Easy"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : stage.difficulty === "Medium"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {stage.difficulty}
                            </span>
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              {stage.duration}
                            </span>
                          </div>
                        </div>

                        <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                          {stage.description}
                        </p>

                        <div className="overview-sidebar-blue mb-6 rounded-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
                          <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                            Key Focus: {stage.keyFocus}
                          </h4>
                        </div>

                        <div className="mb-6">
                          <button
                            onClick={() => toggleTips(index)}
                            className="flex w-full items-center justify-between rounded-lg bg-green-50 p-3 transition-colors hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30"
                          >
                            <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                              <span className="text-green-500">💡</span>
                              Preparation Tips ({stage.tips?.length || 0})
                            </h4>
                            <motion.div
                              animate={{ rotate: showTips[index] ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <svg
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {showTips[index] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-4 space-y-3">
                                  {stage.tips?.map((tip, tipIndex) => (
                                    <motion.li
                                      key={tipIndex}
                                      className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.4,
                                        delay: tipIndex * 0.1,
                                      }}
                                    >
                                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                                      <span className="leading-relaxed text-gray-700 dark:text-gray-300">
                                        {tip}
                                      </span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div>
                          <button
                            onClick={() => toggleQuestions(index)}
                            className="flex w-full items-center justify-between rounded-lg bg-purple-50 p-3 transition-colors hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30"
                          >
                            <h4 className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                              <span className="text-purple-500">❓</span>
                              Common Questions (
                              {stage.commonQuestions?.length || 0})
                            </h4>
                            <motion.div
                              animate={{
                                rotate: showQuestions[index] ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <svg
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {showQuestions[index] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 space-y-2">
                                  {stage.commonQuestions?.map(
                                    (question, qIndex) => (
                                      <motion.div
                                        key={qIndex}
                                        className="overview-sidebar-purple rounded-lg border-l-3 border-purple-500 bg-gray-50 p-3 dark:bg-gray-700"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                          duration: 0.4,
                                          delay: qIndex * 0.1,
                                        }}
                                      >
                                        <p className="text-gray-700 italic dark:text-gray-300">
                                          "{question}"
                                        </p>
                                      </motion.div>
                                    ),
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null;
            })}
          </div>
        </div>
      </motion.div>

      <motion.div className="mb-16" variants={fadeIn}>
        <div className="mb-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
            Preparation Strategy
          </h3>
        </div>
        <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-3xl text-white shadow-lg">
                🧠
              </div>
              <h4 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                Problem-Solving Mastery
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Build strong algorithmic thinking through consistent practice.
                Focus on understanding patterns rather than memorizing
                solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-3xl text-white shadow-lg">
                💬
              </div>
              <h4 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                Communication Excellence
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Practice explaining complex concepts clearly. Develop your
                ability to think out loud and collaborate effectively.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-3xl text-white shadow-lg">
                🎭
              </div>
              <h4 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                Behavioral Readiness
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Prepare compelling stories using the STAR method. Showcase
                leadership, growth mindset, and cultural alignment.
              </p>
            </div>
          </div>

          <div className="overview-sidebar-yellow mt-8 rounded-lg border-l-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 dark:from-yellow-900/20 dark:to-orange-900/20">
            <h5 className="mb-2 flex items-center font-bold text-gray-900 dark:text-white">
              <span className="mr-2 text-xl">💡</span>
              Pro Tip: Balance Your Preparation
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Allocate 60% of your time to technical skills, 30% to behavioral
              preparation, and 10% to company research. This balance ensures
              you're well-rounded and confident in all interview stages.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div className="mb-16" variants={fadeIn}>
        <h3 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Quick Access to Resources
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              id: "technical",
              title: "Technical Prep",
              icon: "💻",
              description: "Coding challenges, algorithms, system design",
              color: "from-blue-500 to-blue-600",
              items: ["500+ Problems", "System Design", "Code Review"],
            },
            {
              id: "behavioral",
              title: "Behavioral Prep",
              icon: "🤝",
              description: "STAR method, leadership stories, soft skills",
              color: "from-green-500 to-green-600",
              items: ["STAR Framework", "Leadership", "Communication"],
            },
            {
              id: "companies",
              title: "Company Guides",
              icon: "🏢",
              description: "Company-specific tips and strategies",
              color: "from-purple-500 to-purple-600",
              items: ["FAANG Tips", "Culture Fit", "Specific Questions"],
            },
            {
              id: "practice",
              title: "Mock Practice",
              icon: "🎯",
              description: "Simulate real interview conditions",
              color: "from-orange-500 to-orange-600",
              items: ["Live Practice", "Feedback", "Time Management"],
            },
          ]?.map((section) =>
            section ? (
              <motion.div
                key={section.id}
                className="flex transform cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800"
                variants={fadeIn}
                onClick={() => setActiveTab(section.id as any)}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`bg-gradient-to-r ${section.color} p-6 text-center text-white`}
                >
                  <div className="mb-2 text-4xl">{section.icon}</div>
                  <h4 className="text-xl font-bold">{section.title}</h4>
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    {section.description}
                  </p>
                  <div className="mb-4 space-y-2">
                    {section.items?.map((item, i) =>
                      item ? (
                        <div
                          key={i}
                          className="flex items-center text-xs text-gray-500 dark:text-gray-400"
                        >
                          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-400"></span>
                          {item}
                        </div>
                      ) : null,
                    )}
                  </div>
                  <div className="mt-auto border-t border-gray-200 pt-4 dark:border-gray-700">
                    <span className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                      Explore Section →
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : null,
          )}
        </div>
      </motion.div>
      {/* Quick Stats */}
      <motion.div
        className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white"
        variants={fadeIn}
      >
        <div className="grid gap-8 text-center md:grid-cols-4">
          <div>
            <div className="mb-2 text-3xl font-bold">500+</div>
            <div className="text-blue-100">Practice Questions</div>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold">50+</div>
            <div className="text-blue-100">System Design Topics</div>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold">20+</div>
            <div className="text-blue-100">Company Guides</div>
          </div>
          <div>
            <div className="mb-2 text-3xl font-bold">95%</div>
            <div className="text-blue-100">Success Rate</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OverviewTab;
