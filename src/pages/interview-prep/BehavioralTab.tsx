import React from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";

interface BehavioralCategory {
  category: string;
  questions: string[];
}

interface BehavioralTabProps {
  behavioralQuestions: BehavioralCategory[];
  expandedCategories: { [key: number]: boolean };
  toggleCategory: (index: number) => void;
}

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.2 } } };

const BehavioralTab: React.FC<BehavioralTabProps> = ({ behavioralQuestions,
  expandedCategories,
  toggleCategory, }) => {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      {/* Introduction Section */}
      <motion.div className="text-center mb-12" variants={fadeIn}>
        <h2 className="text-4xl font-bold mb-4 text-white">Behavioral Interview Preparation</h2>
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
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="watch-video-btn">
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
  );
};

export default BehavioralTab;
