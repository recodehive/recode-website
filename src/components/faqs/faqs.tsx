import React, { useState, useEffect } from "react";
import {
  FiChevronDown,
  FiCode,
  FiUsers,
  FiZap,
  FiHelpCircle,
  FiStar,
  FiHeart,
  FiEye,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useColorMode } from "@docusaurus/theme-common";

const initialFaqData = [
  {
    question: "What is the recode hive?",
    answer:
      "Recode Hive is a comprehensive platform focused on providing students with the right resources at the right time. We help you focus on important topics and tools used in current industry standards compared to traditional university curricula. This includes data engineering tutorials, blogs, and opportunities for open-source contributions with earning potential. <br><br>🌐 <a href='https://recodehive.com/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Visit our official website</a> | 📚 <a href='/docs/intro' class='text-indigo-600 hover:text-indigo-800 underline'>Explore our documentation</a>",
    icon: FiCode,
    category: "Platform",
  },
  {
    question: "What features do the recode hive provides?",
    answer:
      "We provide students with comprehensive learning opportunities through our <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Recode Hive GitHub organization</a>, which includes 1000+ data-related projects. Our community is non-profit and inclusive for all, offering:<br><br>• <strong>Learning Resources:</strong> Tutorials, documentation, and hands-on projects<br>• <strong>Open Source Contribution:</strong> Real-world project experience<br>• <strong>Earning Opportunities:</strong> GitHub sponsorship program<br>• <strong>Community Support:</strong> Discord community and mentorship<br><br>🚀 <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Browse our GitHub projects</a>",
    icon: FiZap,
    category: "Features",
  },
  {
    question: "How can I contribute tutorials?",
    answer:
      "Contributing tutorials is straightforward! Our community is completely open-source, and the entire codebase is available on GitHub for forking and contributing. Whether you're a beginner or experienced developer, we welcome your contributions.<br><br><strong>Getting Started:</strong><br>1. Fork our <a href='https://github.com/recodehive/recode-website' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>main repository</a><br>2. Check our <a href='/docs/GitHub/Maintainer-guide/github-labels' class='text-indigo-600 hover:text-indigo-800 underline'>contribution guidelines</a><br>3. Create your tutorial content<br>4. Submit a pull request<br><br>📖 <a href='/docs/GitHub/GitHub-basics/first-opensource-code' class='text-indigo-600 hover:text-indigo-800 underline'>Learn how to make your first contribution</a>",
    icon: FiUsers,
    category: "Contribution",
  },
  {
    question: "What all resources are available here?",
    answer:
      "We offer a comprehensive range of learning resources across multiple technologies:<br><br><strong>Currently Available:</strong><br>• 🐍 <a href='/docs/python' class='text-indigo-600 hover:text-indigo-800 underline'>Python Tutorials</a> - From basics to advanced concepts<br>• 🗄️ <a href='/docs/sql' class='text-indigo-600 hover:text-indigo-800 underline'>SQL Resources</a> - Database management and queries<br>• 🐙 <a href='/docs/GitHub' class='text-indigo-600 hover:text-indigo-800 underline'>GitHub Guides</a> - Version control and collaboration<br>• 📮 <a href='/docs/Technical' class='text-indigo-600 hover:text-indigo-800 underline'>Postman API Testing</a><br>• ⚛️ <a href='/docs/Nextjs' class='text-indigo-600 hover:text-indigo-800 underline'>Next.js Development</a><br><br><strong>Coming Soon:</strong> Advanced data tools tutorials, cloud technologies, and more!",
    icon: FiHelpCircle,
    category: "Resources",
  },
  {
    question: "How can I contribute as a beginner?",
    answer:
      "We've designed our community specifically with beginners in mind! Contributing to open-source can seem intimidating, but we provide a supportive environment for learning.<br><br><strong>Beginner-Friendly Steps:</strong><br>1. Start with our <a href='/docs/GitHub/GitHub-basics' class='text-indigo-600 hover:text-indigo-800 underline'>GitHub Basics guide</a><br>2. Join our <a href='https://discord.gg/Yxv9RA3r' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Discord community</a> for support<br>3. Look for 'good first issue' labels in our repositories<br>4. Follow our <a href='https://github.com/recodehive/recode-website#getting-started' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>step-by-step contribution guide</a><br><br>🎯 <a href='/docs/GitHub/GitHub-basics/first-opensource-code' class='text-indigo-600 hover:text-indigo-800 underline'>Make your first open-source contribution</a>",
    icon: FiStar,
    category: "Getting Started",
  },
  {
    question: "How can I earn from this recode hive organisation?",
    answer:
      "We offer earning opportunities through our GitHub sponsorship program! Every week, we sponsor contributors who make valuable open-source contributions.<br><br><strong>Sponsorship Details:</strong><br>• Weekly sponsorship program<br>• Earning range: ₹100 to ₹500 per week<br>• Based on contribution quality and impact<br>• Open to all community members<br><br><strong>How to Qualify:</strong><br>• Make meaningful contributions to our projects<br>• Follow contribution guidelines<br>• Engage with the community<br><br>💰 <a href='https://github.com/sponsors/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Learn more about GitHub Sponsorship</a> | 🚀 <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Start contributing today</a>",
    icon: FiZap,
    category: "Earning",
  },
  {
    question:
      "How will I stay up to date with the latest news from this organisation?",
    answer:
      "Stay connected with Recode Hive through multiple channels to never miss important updates:<br><br><strong>📧 Newsletter:</strong> Our primary communication channel providing weekly updates on community happenings, new resources, and opportunities.<br><br><strong>Social Media:</strong><br>• 📱 <a href='https://www.instagram.com/nomad_brains/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Instagram</a> - Visual updates and behind-the-scenes<br>• 🐦 <a href='https://x.com/sanjay_kv_' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Twitter</a> - Quick updates and tech insights<br>• 💼 <a href='https://www.linkedin.com/in/sanjay-k-v/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>LinkedIn</a> - Professional updates<br>• 🎥 <a href='https://www.youtube.com/@RecodeHive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>YouTube</a> - Video tutorials and content<br><br>📬 <a href='https://recodehive.substack.com/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline font-semibold'>Subscribe to our Newsletter</a> | 💬 <a href='https://discord.gg/Yxv9RA3r' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Join our Discord</a>",
    icon: FiUsers,
    category: "Updates",
  },
];

const FAQs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("faq-stats");
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return initialFaqData.map((faq, index) => ({
      ...faq,
      likes: [142, 98, 76, 134, 89, 156, 203][index] || 50,
      views: [1250, 890, 654, 1100, 723, 987, 1456][index] || 500,
      isLiked: false,
    }));
  });
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("faq-stats", JSON.stringify(faqData));
    }
  }, [faqData]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    if (activeIndex !== index) {
      setFaqData((prev) =>
        prev.map((faq, i) =>
          i === index ? { ...faq, views: faq.views + 1 } : faq
        )
      );
    }
  };

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFaqData((prev) =>
      prev.map((faq, i) =>
        i === index
          ? {
              ...faq,
              likes: faq.isLiked ? faq.likes - 1 : faq.likes + 1,
              isLiked: !faq.isLiked,
            }
          : faq
      )
    );
  };

  return (
    <section
      className={`relative py-20 ${isDark ? "bg-slate-900" : "bg-gray-50"}`}
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
              isDark
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-gray-200 shadow-sm"
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span
              className={`text-sm font-medium ${
                isDark ? "text-slate-300" : "text-gray-600"
              }`}
            >
              Frequently Asked Questions
            </span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Everything You Need to Know
          </h2>

          <div className="flex justify-center">
            <p
              className={`text-lg max-w-2xl text-center ${
                isDark ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Find answers to common questions about Recode Hive's platform,
              features, and community.
            </p>
          </div>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {faqData.map((faq, index) => {
            const IconComponent = faq.icon || FiHelpCircle;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group"
              >
                <div
                  className={`relative overflow-hidden transition-all duration-300 ${
                    isDark
                      ? "bg-slate-800/50 border border-slate-700/50"
                      : "bg-white border border-gray-200/50 shadow-sm"
                  } ${
                    hoveredIndex === index ? "shadow-lg -translate-y-1" : ""
                  } rounded-2xl`}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300 ${
                      activeIndex === index || hoveredIndex === index
                        ? "opacity-100"
                        : "opacity-0"
                    } bg-gradient-to-r from-blue-500 to-indigo-500`}
                  />

                  <button
                    className="relative w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-2xl transition-all duration-200"
                    onClick={() => toggleAccordion(index)}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          index === 0
                            ? "bg-blue-500"
                            : index === 1
                            ? "bg-purple-500"
                            : index === 2
                            ? "bg-emerald-500"
                            : index === 3
                            ? "bg-orange-500"
                            : index === 4
                            ? "bg-pink-500"
                            : index === 5
                            ? "bg-yellow-500"
                            : "bg-teal-500"
                        } text-white shadow-lg`}
                      >
                        {IconComponent && <IconComponent size={20} />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mb-2 ${
                            index === 0
                              ? "bg-blue-100 text-blue-700"
                              : index === 1
                              ? "bg-purple-100 text-purple-700"
                              : index === 2
                              ? "bg-emerald-100 text-emerald-700"
                              : index === 3
                              ? "bg-orange-100 text-orange-700"
                              : index === 4
                              ? "bg-pink-100 text-pink-700"
                              : index === 5
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-teal-100 text-teal-700"
                          } ${isDark ? "bg-opacity-20 text-opacity-90" : ""}`}
                        >
                          <span>⚡</span>
                          {faq.category}
                        </div>

                        <h3
                          className={`text-lg font-semibold leading-tight transition-colors duration-200 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {faq.question}
                        </h3>

                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <motion.button
                            className={`flex items-center gap-1 transition-colors duration-200 ${
                              faq.isLiked
                                ? "text-red-500"
                                : isDark
                                ? "text-gray-400 hover:text-red-400"
                                : "text-gray-500 hover:text-red-500"
                            }`}
                            onClick={(e) => toggleLike(index, e)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FiHeart
                              size={14}
                              className={faq.isLiked ? "fill-current" : ""}
                            />
                            <span>{faq.likes}</span>
                          </motion.button>
                          <div
                            className={`flex items-center gap-1 ${
                              isDark ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            <FiEye size={14} />
                            <span>{faq.views}</span>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          isDark ? "text-slate-400" : "text-gray-400"
                        }`}
                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown size={16} />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div
                            className={`w-full h-px mb-4 ${
                              isDark ? "bg-slate-700" : "bg-gray-200"
                            }`}
                          />
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className={`prose prose-sm max-w-none ${
                              isDark ? "prose-invert" : ""
                            } ${
                              isDark ? "text-slate-300" : "text-gray-700"
                            } [&_a]:text-blue-600 [&_a]:no-underline [&_a]:font-medium [&_a]:hover:text-blue-700 [&_a]:transition-colors [&_strong]:font-semibold ${
                              isDark
                                ? "[&_strong]:text-white"
                                : "[&_strong]:text-gray-900"
                            } [&_br]:block [&_br]:my-2`}
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
              isDark
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-gray-200 shadow-sm"
            }`}
          >
            <span
              className={`text-sm ${
                isDark ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Still have questions?
            </span>
            <a
              href="https://discord.gg/Yxv9RA3r"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Join our Discord →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQs;
