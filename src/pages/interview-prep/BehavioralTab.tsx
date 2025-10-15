import React from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";

interface BehavioralCategory {
  category: string;
  questions: string[];
}

interface BehavioralTabProps {
  behavioralQuestions?: BehavioralCategory[];
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

const BehavioralTab: React.FC<BehavioralTabProps> = ({
  behavioralQuestions = [],
  expandedCategories = [],
  toggleCategory,
}) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      {/* Introduction Section */}
      <motion.div className="mb-12 text-center" variants={fadeIn}>
        <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Behavioral Interview Preparation
        </h2>
        <p className="ml-3 text-center text-xl text-gray-700 dark:text-gray-200">
          Master the art of storytelling and showcase your soft skills with
          confidence
        </p>
      </motion.div>

      {/* What are Behavioral Interviews */}
      <motion.div
        className="mb-12 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:from-blue-900/20 dark:to-purple-900/20"
        variants={fadeIn}
      >
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-6 flex items-center text-2xl font-bold text-gray-900 dark:text-white">
            <span className="mr-3 text-3xl">🤝</span>
            What are Behavioral Interviews?
          </h3>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="mb-4 text-gray-800 dark:text-gray-200">
                Behavioral interviews focus on how you've handled situations in
                the past to predict your future performance. These questions
                typically start with phrases like "Tell me about a time when..."
                or "Describe a situation where..."
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                Unlike technical interviews that test your coding skills,
                behavioral interviews evaluate your soft skills, cultural fit,
                and ability to work in a team environment.
              </p>
            </div>
            <div className="-mt-10 rounded-lg bg-white p-6 dark:bg-gray-800">
              <h4 className="mb-4 font-bold text-gray-900 dark:text-white">
                Why They Matter
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span className="text-gray-700 dark:text-gray-200">
                    70% of hiring decisions are based on cultural fit
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span className="text-gray-700 dark:text-gray-200">
                    Assess leadership and communication skills
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span className="text-gray-700 dark:text-gray-200">
                    Evaluate problem-solving approach
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span className="text-gray-700 dark:text-gray-200">
                    Determine team collaboration ability
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* STAR Method Guide */}
      <motion.div
        className="mb-12 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-8 dark:from-green-900/20 dark:to-blue-900/20"
        variants={fadeIn}
      >
        <h3 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          The STAR Method Framework
        </h3>
        <div className="mb-8 grid gap-6 md:grid-cols-4">
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
                className={`h-16 w-16 ${item.color} mx-auto mb-3 flex items-center justify-center rounded-full text-2xl font-bold text-white shadow-lg`}
              >
                {item.letter}
              </div>
              <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
                {item.word}
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-200">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* STAR Method Examples */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h4 className="mb-4 flex items-center font-bold text-gray-900 dark:text-white">
              <span className="mr-2 text-xl">💡</span>
              Example 1: Leadership Challenge
            </h4>
            <div className="space-y-3 text-sm">
              <div className="star-border-red border-l-4 border-red-500 pl-4">
                <strong className="text-red-600 dark:text-red-400">
                  Situation:
                </strong>
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  "During my internship, our team was behind schedule on a
                  critical project with only 2 weeks left before the deadline."
                </p>
              </div>
              <div className="star-border-yellow border-l-4 border-yellow-500 pl-4">
                <strong className="text-yellow-600 dark:text-yellow-400">
                  Task:
                </strong>
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  "As the junior developer, I needed to help coordinate efforts
                  and find ways to accelerate our progress."
                </p>
              </div>
              <div className="star-border-green border-l-4 border-green-500 pl-4">
                <strong className="text-green-600 dark:text-green-400">
                  Action:
                </strong>
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  "I organized daily stand-ups, created a shared task board, and
                  volunteered to work extra hours on critical features."
                </p>
              </div>
              <div className="star-border-blue border-l-4 border-blue-500 pl-4">
                <strong className="text-blue-600 dark:text-blue-400">
                  Result:
                </strong>
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  "We delivered the project on time, and my manager praised my
                  initiative. I learned the importance of proactive
                  communication."
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
            <h4 className="mb-4 flex items-center font-bold text-gray-900 dark:text-white">
              <span className="mr-2 text-xl">🔧</span>
              Example 2: Problem Solving
            </h4>
            <div className="space-y-3 text-sm">
              <div className="star-border-red border-l-4 border-red-500 pl-4">
                <strong className="text-red-600 dark:text-red-400">
                  Situation:
                </strong>
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  "Our main application was experiencing frequent crashes
                  affecting 30% of users during peak hours."
                </p>
              </div>
              <div className="star-border-yellow border-l-4 border-yellow-500 pl-4">
                <strong className="text-yellow-600 dark:text-yellow-400">
                  Task:
                </strong>
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  "I was assigned to identify the root cause and implement a
                  solution within 48 hours."
                </p>
              </div>
              <div className="star-border-green border-l-4 border-green-500 pl-4">
                <strong className="text-green-600 dark:text-green-400">
                  Action:
                </strong>
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  "I analyzed logs, reproduced the issue, and discovered a
                  memory leak in our caching system. I implemented a fix and
                  added monitoring."
                </p>
              </div>
              <div className="star-border-blue border-l-4 border-blue-500 pl-4">
                <strong className="text-blue-600 dark:text-blue-400">
                  Result:
                </strong>
                <p className="mt-1 text-gray-700 dark:text-gray-200">
                  "Crashes reduced by 95%, user satisfaction improved, and we
                  prevented similar issues with better monitoring."
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Common Behavioral Questions - Collapsible */}
      <motion.div className="mb-12" variants={fadeIn}>
        <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
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
            <div
              key={index}
              className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
            >
              <button
                onClick={() => toggleCategory(index)}
                className={`w-full bg-gradient-to-r ${section.color} p-6 text-left transition-opacity hover:opacity-90`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="flex items-center text-xl font-bold text-white">
                    <span className="mr-3 text-2xl">{section.icon}</span>
                    {section.category}
                  </h4>
                  <span
                    className="transform text-2xl text-white transition-transform duration-200"
                    style={{
                      transform: expandedCategories[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
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
                        className="interview-prep-sidebar cursor-pointer rounded-lg border-l-4 border-gray-300 bg-gray-50 p-4 transition-colors hover:border-blue-500 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                      >
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          "{question}"
                        </p>
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
      <motion.div
        className="mb-12 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800"
        variants={fadeIn}
      >
        <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Do's and Don'ts for Behavioral Interviews
        </h3>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Do's */}
          <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
            <h4 className="mb-6 flex items-center text-xl font-bold text-green-800 dark:text-green-300">
              <span className="mr-2 text-2xl">✅</span>
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
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
            <h4 className="mb-6 flex items-center text-xl font-bold text-red-800 dark:text-red-300">
              <span className="mr-2 text-2xl">❌</span>
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
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Resources */}
      <motion.div
        className="mb-12 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-8 dark:from-indigo-900/20 dark:to-purple-900/20"
        variants={fadeIn}
      >
        <h3 className="mb-8 flex items-center justify-center text-center text-2xl font-bold text-gray-900 dark:text-white">
          <span className="mr-3 text-3xl">🎥</span>
          Video Resources & Learning Materials
        </h3>
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Behavioral Interview Masterclass",
              channel: "CareerVidz",
              duration: "25 min",
              description:
                "Complete guide to behavioral interviews with real examples",
              url: "https://www.youtube.com/watch?v=PJKYqLP6MRE",
              thumbnail: "../../img/Behavioural_Interviews1.png",
            },
            {
              title: "STAR Method Explained",
              channel: "Interview Success",
              duration: "15 min",
              description:
                "Step-by-step breakdown of the STAR method with practice",
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
              className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-gray-800"
            >
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
                  {video.title}
                </h4>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                  {video.description}
                </p>
                <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="text-gray-500 dark:text-gray-400">
                    {video.channel}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {video.duration}
                  </span>
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="watch-video-btn"
                >
                  <span className="mr-2 text-inherit">▶️</span>
                  Watch Video
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
          <h4 className="mb-4 font-bold text-gray-900 dark:text-white">
            Additional Learning Resources
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h5 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                📚 Recommended Books
              </h5>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>• "Cracking the Coding Interview" by Gayle McDowell</li>
                <li>• "The Behavioral Interview Handbook" by Lewis Lin</li>
                <li>• "What Color Is Your Parachute?" by Richard N. Bolles</li>
              </ul>
            </div>
            <div>
              <h5 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                🌐 Online Platforms
              </h5>
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
        className="interview-prep-join-comm rounded-xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 p-8 dark:border-yellow-800 dark:from-yellow-900/20 dark:to-orange-900/20 dark:outline dark:outline-2 dark:outline-yellow-800"
        variants={fadeIn}
      >
        <div className="mb-6 text-center">
          <h3 className="flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white">
            <span className="mr-3 text-3xl">🤝</span>
            Join Our Community & Contribute
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Help make this resource better for everyone in the recode hive
            community
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 text-center dark:bg-gray-800">
            <div className="mb-3 text-3xl">💬</div>
            <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
              Share Your Experience
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Share your behavioral interview experiences, both successes and
              challenges
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 text-center dark:bg-gray-800">
            <div className="mb-3 text-3xl">📝</div>
            <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
              Suggest Resources
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Recommend helpful videos, articles, or tools you've found useful
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 text-center dark:bg-gray-800">
            <div className="mb-3 text-3xl">🔧</div>
            <h4 className="mb-2 font-bold text-gray-900 dark:text-white">
              Improve Content
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Help us add more examples, questions, or improve existing content
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 dark:bg-gray-800">
          <h4 className="mb-4 text-center font-bold text-gray-900 dark:text-white">
            How to Contribute
          </h4>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h5 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">
                🚀 Quick Ways to Help
              </h5>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Join our Discord community and share tips
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Submit interview questions you've encountered
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Review and suggest improvements to examples
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Share company-specific behavioral interview tips
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 font-semibold text-gray-800 dark:text-gray-200">
                📋 Getting Started
              </h5>
              <div className="space-y-3">
                <Link
                  to="/community"
                  className="interview-prep-discord-btn block rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Join Discord Community
                </Link>
                <Link
                  to="/get-started"
                  className="block rounded-lg px-4 py-2 text-center font-medium text-blue-600 transition-colors dark:text-blue-400 dark:outline dark:outline-2 dark:outline-yellow-800 dark:hover:bg-yellow-800/20"
                >
                  Contributing Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BehavioralTab;
