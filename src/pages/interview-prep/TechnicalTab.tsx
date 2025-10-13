import React from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";

interface Resource {
  name: string;
  url: string;
}
interface SubCategory {
  title: string;
  difficulty: string;
  problems: number;
  subtopics: string[];
  resources: Resource[];
}
interface TechnicalCategory {
  category: string;
  description: string;
  totalProblems: number;
  subcategories: SubCategory[];
}

interface PracticePlatform {
  name: string;
  description: string;
  problems: string;
  difficulty: string[];
  url: string;
  features: string[];
}

interface TechnicalTabProps {
  technicalResources?: TechnicalCategory[];
  practicePlatforms?: PracticePlatform[];
  expandedCategories?: { [key: number]: boolean };
  toggleCategory: (index: number) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const TechnicalTab: React.FC<TechnicalTabProps> = ({
  technicalResources = [],
  practicePlatforms = [],
  expandedCategories = [],
  toggleCategory,
}) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      <motion.div className="mb-12" variants={fadeIn}>
        <div className="technical-outer rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 dark:border-blue-800 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
              Technical Interview Mastery
            </div>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
              Master Technical Interviews
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Technical interviews are the cornerstone of software engineering
              hiring. They evaluate your problem-solving abilities, coding
              skills, and understanding of computer science fundamentals.
              Success requires consistent practice, pattern recognition, and the
              ability to communicate your thought process clearly.
            </p>
          </div>
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="technical-inner rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Problem Solving
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Develop systematic approaches to break down complex problems
                into manageable components.
              </p>
            </div>
            <div className="technical-inner rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Pattern Recognition
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Learn to identify common patterns and apply proven techniques to
                solve similar problems efficiently.
              </p>
            </div>
            <div className="technical-inner rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                Communication
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Master the art of explaining your approach, discussing
                trade-offs, and collaborating with interviewers.
              </p>
            </div>
          </div>
          <div className="technical-inner-success rounded-lg border border-yellow-200 bg-gradient-to-r from-yellow-100 to-orange-100 p-6 dark:border-yellow-700 dark:from-yellow-900/30 dark:to-orange-900/30">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💡</span>
              <div>
                <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  Success Strategy
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Focus on understanding patterns rather than memorizing
                  solutions. Practice explaining your thought process out loud,
                  and always consider time/space complexity. Consistent daily
                  practice for 2-3 months typically yields the best results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Question Bank by Category - Collapsible */}
      <motion.div className="mb-16" variants={fadeIn}>
        <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          📚 Question Bank by Category
        </h3>
        <div className="space-y-8">
          {technicalResources.map((category, categoryIndex) => {
            const headerColors = [
              {
                gradient: "from-purple-500 to-pink-400",
                border: "border-purple-500 dark:border-purple-400",
              },
              {
                gradient: "from-blue-500 to-sky-400",
                border: "border-blue-500 dark:border-blue-400",
              },
              {
                gradient: "from-green-500 to-green-400",
                border: "border-green-500 dark:border-green-400",
              },
              {
                gradient: "from-orange-500 to-red-500",
                border: "border-orange-500 dark:border-orange-400",
              },
              {
                gradient: "from-pink-500 to-yellow-500",
                border: "border-pink-500 dark:border-pink-400",
              },
              {
                gradient: "from-cyan-500 to-blue-500",
                border: "border-cyan-500 dark:border-cyan-400",
              },
            ];
            const { gradient, border } =
              headerColors[categoryIndex % headerColors.length];
            const subtopicBorderClasses = [
              "question-bank-subtopic-purple",
              "question-bank-subtopic-blue",
              "question-bank-subtopic-green",
              "question-bank-subtopic-orange",
              "question-bank-subtopic-pink",
              "question-bank-subtopic-cyan",
            ];
            return (
              <div
                key={categoryIndex}
                className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800"
              >
                {/* Outer header */}
                <button
                  onClick={() => toggleCategory(categoryIndex)}
                  className={`w-full bg-gradient-to-r ${gradient} p-6 text-left transition-opacity hover:opacity-90`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-white">
                        {category.category}
                      </h3>
                      <p className="text-blue-100">{category.description}</p>
                      <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium transition hover:bg-white/30">
                        <Link
                          to="/docs/category/technical"
                          className="explore-btn"
                        >
                          Explore →
                        </Link>
                      </span>
                    </div>
                    <div className="flex flex-col items-end text-right">
                      <div className="text-3xl font-bold text-white">
                        {category.totalProblems}
                      </div>
                      <div className="text-sm text-blue-100">
                        Total Problems
                      </div>
                      <span
                        className="origin-center transform text-2xl text-white transition-transform duration-200"
                        style={{
                          transform: expandedCategories[categoryIndex]
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        ▼
                      </span>
                    </div>
                  </div>
                </button>

                {/* Collapsible Content */}
                {expandedCategories[categoryIndex] && (
                  <motion.div
                    className="p-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <div
                          key={subIndex}
                          className={`rounded-xl border p-5 transition-all duration-300 hover:shadow-md ${border} ${subtopicBorderClasses[categoryIndex % subtopicBorderClasses.length]} hover:border-opacity-80 technical-inner`}
                        >
                          {/* Subcategory Header */}
                          <div className="mb-4 flex items-start justify-between">
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {subcategory.title}
                            </h5>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`rounded-full px-2 py-1 text-xs font-medium ${
                                  subcategory.difficulty === "Easy"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                    : subcategory.difficulty === "Medium"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                }`}
                              >
                                {subcategory.difficulty}
                              </span>
                              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                {subcategory.problems}
                              </span>
                            </div>
                          </div>

                          {/* Subtopics */}
                          <div className="mb-4">
                            <h6 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Key Topics:
                            </h6>
                            <div className="flex flex-wrap gap-1">
                              {subcategory.subtopics.map(
                                (topic, topicIndex) => (
                                  <span
                                    key={topicIndex}
                                    className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                  >
                                    {topic}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>

                          {/* Resources */}
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Practice Resources:
                            </h6>
                            {subcategory.resources.map(
                              (resource, resourceIndex) => (
                                <a
                                  key={resourceIndex}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-300 dark:hover:text-blue-300"
                                >
                                  🔗 {resource.name}
                                </a>
                              ),
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Practice Platforms */}
      <motion.div className="mb-16" variants={fadeIn}>
        <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          🎯 Recommended Practice Platforms
        </h3>
        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {practicePlatforms.map((platform, index) => (
            <motion.div
              key={index}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              variants={fadeIn}
            >
              <div className="mb-4 text-center">
                <h4 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {platform.name}
                </h4>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                  {platform.description}
                </p>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {platform.problems}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Problems Available
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-3 flex justify-center space-x-2">
                  {platform.difficulty.map((diff, diffIndex) => (
                    <span
                      key={diffIndex}
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        diff === "Easy"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : diff === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {diff}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h5 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Key Features:
                </h5>
                <ul className="space-y-1">
                  {platform.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-xs text-gray-600 dark:text-gray-400"
                    >
                      <span className="mr-2 h-1 w-1 rounded-full bg-blue-500"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Push button to bottom */}
              <div className="mt-auto">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="technical-btn block w-full rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Start Practicing
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tips & Best Practices */}
      <motion.div
        className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:from-gray-800 dark:to-gray-700"
        variants={fadeIn}
      >
        <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          💡 Pro Tips for Technical Interview Success
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                <span className="text-xs font-bold text-white">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Start with Easy Problems
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Build confidence and understand patterns before tackling
                  harder challenges.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                <span className="text-xs font-bold text-white">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Practice Consistently
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Solve 1-2 problems daily rather than cramming before
                  interviews.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                <span className="text-xs font-bold text-white">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Focus on Patterns
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Learn common problem-solving patterns like two pointers,
                  sliding window, etc.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500">
                <span className="text-xs font-bold text-white">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Time Yourself
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Practice under time constraints to simulate real interview
                  conditions.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500">
                <span className="text-xs font-bold text-white">5</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Explain Your Thinking
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Practice verbalizing your approach and reasoning process.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500">
                <span className="text-xs font-bold text-white">6</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Review Solutions
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Study optimal solutions and alternative approaches after
                  solving problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TechnicalTab;
