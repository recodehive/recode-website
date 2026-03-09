import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSafeColorMode } from "../../utils/useSafeColorMode";

const faqData = [
  {
    question: "What is the recode hive?",
    answer:
      "recode hive is a comprehensive platform focused on providing students with the right resources at the right time. We help you focus on important topics and tools used in current industry standards compared to traditional university curricula. This includes data engineering tutorials, blogs, and opportunities for open-source contribution with earning potential. <br><br>🌐 <a href='https://recodehive.com/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Visit our official website</a> | 📚 <a href='/docs/intro' class='text-indigo-600 hover:text-indigo-800 underline'>Explore our documentation</a>",
  },
  {
    question: "What features do the recode hive provides?",
    answer:
      "We provide students with comprehensive learning opportunities through our <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>recode hive GitHub organization</a>, which includes 1000+ data-related projects. Our community is non-profit and inclusive for all, offering:<br><br>• <strong>Learning Resources:</strong> Tutorials, documentation, and hands-on projects<br>• <strong>Open Source Contribution:</strong> Real-world project experience<br>• <strong>Earning Opportunities:</strong> GitHub sponsorship program<br>• <strong>Community Support:</strong> Discord community and mentorship<br><br>🚀 <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Browse our GitHub projects</a>",
  },
  {
    question: "How can I contribute tutorials?",
    answer:
      "Contributing tutorials is straightforward! Our community is completely open-source, and the entire codebase is available on GitHub for forking and contributing. Whether you're a beginner or experienced developer, we welcome your contributions.<br><br><strong>Getting Started:</strong><br>1. Fork our <a href='https://github.com/recodehive/recode-website' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>main repository</a><br>2. Check our <a href='/docs/GitHub/Maintainer-guide/github-labels' class='text-indigo-600 hover:text-indigo-800 underline'>contribution guidelines</a><br>3. Create your tutorial content<br>4. Submit a pull request<br><br>📖 <a href='/docs/GitHub/GitHub-basics/first-opensource-code' class='text-indigo-600 hover:text-indigo-800 underline'>Learn how to make your first contribution</a>",
  },
  {
    question: "What all resources are available here?",
    answer:
      "We offer a comprehensive range of learning resources across multiple technologies:<br><br><strong>Currently Available:</strong><br>• 🐍 <a href='/docs/python/intro-python' class='text-indigo-600 hover:text-indigo-800 underline'>Python Tutorials</a> - From basics to advanced concepts<br>• 🗄️ <a href='/docs/sql/intro-sql' class='text-indigo-600 hover:text-indigo-800 underline'>SQL Resources</a> - Database management and queries<br>• 🐙 <a href='/docs/GitHub/intro-github' class='text-indigo-600 hover:text-indigo-800 underline'>GitHub Guides</a> - Version control and collaboration<br>• 📮 <a href='/docs/Technical' class='text-indigo-600 hover:text-indigo-800 underline'>Postman API Testing</a><br>• ⚛️ <a href='/docs/Nextjs/intro-nextjs' class='text-indigo-600 hover:text-indigo-800 underline'>Next.js Development</a><br><br><strong>Coming Soon:</strong> Advanced data tools tutorials, cloud technologies, and more!",
  },
  {
    question: "How can I contribute as a beginner?",
    answer:
      "We've designed our community specifically with beginners in mind! Contributing to open-source can seem intimidating, but we provide a supportive environment for learning.<br><br><strong>Beginner-Friendly Steps:</strong><br>1. Start with our <a href='/docs/GitHub/GitHub-basics' class='text-indigo-600 hover:text-indigo-800 underline'>GitHub Basics guide</a><br>2. Join our <a href='https://discord.gg/Yxv9RA3r' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Discord community</a> for support<br>3. Look for 'good first issue' labels in our repositories<br>4. Follow our <a href='https://github.com/recodehive/recode-website#getting-started' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>step-by-step contribution guide</a><br><br>🎯 <a href='/docs/GitHub/GitHub-basics/first-opensource-code' class='text-indigo-600 hover:text-indigo-800 underline'>Make your first open-source contribution</a>",
  },
  {
    question: "How can I earn from this recode hive organisation?",
    answer:
      "We offer earning opportunities through our GitHub sponsorship program! Every week, we sponsor contributors who make valuable open-source contributions.<br><br><strong>Sponsorship Details:</strong><br>• Weekly sponsorship program<br>• Earning range: ₹100 to ₹500 per week<br>• Based on contribution quality and impact<br>• Open to all community members<br><br><strong>How to Qualify:</strong><br>• Make meaningful contributions to our projects<br>• Follow contribution guidelines<br>• Engage with the community<br><br>💰 <a href='https://github.com/sponsors/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Learn more about GitHub Sponsorship</a> | 🚀 <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Start contributing today</a>",
  },
  {
    question:
      "How will I stay up to date with the latest news from this organisation?",
    answer:
      "Stay connected with recode hive through multiple channels to never miss important updates:<br><br><strong>📧 Newsletter:</strong> Our primary communication channel providing weekly updates on community happenings, new resources, and opportunities.<br><br><strong>Social Media:</strong><br>• 📱 <a href='https://www.instagram.com/nomad_brains/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Instagram</a> - Visual updates and behind-the-scenes<br>• 🐦 <a href='https://x.com/sanjay_kv_' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Twitter</a> - Quick updates and tech insights<br>• 💼 <a href='https://www.linkedin.com/in/sanjay-k-v/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>LinkedIn</a> - Professional updates<br>• 🎥 <a href='https://www.youtube.com/@RecodeHive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>YouTube</a> - Video tutorials and content<br><br>📬 <a href='https://recodehive.substack.com/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline font-semibold'>Subscribe to our Newsletter</a> | 💬 <a href='https://discord.gg/Yxv9RA3r' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Join our Discord</a>",
  },
];

const FAQs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { isDark } = useSafeColorMode();

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="relative overflow-hidden py-8 transition-all duration-300"
      style={{
        background: isDark
          ? "linear-gradient(to bottom, #0a0a0a 0%, #0f0f1e 30%, #1a1a2e 60%, #1e1635 85%, #2d1b4e 100%)"
          : "linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 30%, #e5e7eb 60%, #ddd6fe 85%, #ede9fe 100%)",
        border: "none",
        borderTop: "none",
        boxShadow: "none",
        outline: "none",
        margin: "0",
        padding: "2rem 0",
      }}
    >
      <div className="mx-auto px-2 sm:px-4 lg:max-w-6xl lg:px-10 xl:max-w-7xl xl:px-14">
        <div className="flex flex-col items-center justify-center gap-x-8 gap-y-12 lg:flex-row lg:justify-between xl:gap-28">
          <div className="w-full">
            <div className="mb-8 text-center lg:mb-16">
              <h6
                className="mb-2 text-center text-lg font-medium"
                style={{
                  color: isDark ? "#a78bfa" : "#8b5cf6",
                  fontWeight: 600,
                }}
              >
                FAQs
              </h6>
              <h2
                className={`text-center text-4xl font-bold ${
                  isDark ? "text-gray-100" : "text-gray-900"
                } leading-snug`}
              >
                Looking for answers?
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-400" : "text-gray-600"
                } mx-auto text-center`}
              >
                Find answers to the most common questions about recode hive.
              </p>
            </div>

            {/* Accordion Masonry Columns to prevent sibling expansion */}
            <div className="columns-1 md:columns-2 md:gap-x-6">
              {faqData.map((faq, index) => {
                const isExpanded = activeIndex === index;
                const panelId = `faq-panel-${index}`;
                const triggerId = `faq-trigger-${index}`;

                return (
                  <motion.div
                    key={index}
                    className="accordion mb-4 h-fit break-inside-avoid overflow-hidden rounded-xl border pb-0 shadow-sm transition-all duration-300 dark:border-gray-700"
                    style={{
                      background: isDark
                        ? "rgba(30, 27, 75, 0.55)"
                        : "rgba(237, 233, 254, 0.7)",
                      borderColor: isDark
                        ? "rgba(139, 92, 246, 0.25)"
                        : "rgba(139, 92, 246, 0.28)",
                      backdropFilter: "blur(12px)",
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      id={triggerId}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      className={`accordion-toggle group flex w-full cursor-pointer items-center justify-between p-4 text-left text-lg font-medium transition-all duration-300 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-indigo-400 dark:focus-visible:ring-offset-gray-900 ${
                        isDark
                          ? "text-gray-200 hover:text-indigo-300"
                          : "text-gray-700 hover:text-indigo-700"
                      }`}
                      style={{
                        background: isExpanded
                          ? isDark
                            ? "linear-gradient(135deg, rgba(99,102,241,0.24), rgba(139,92,246,0.16))"
                            : "linear-gradient(135deg, rgba(224,231,255,0.95), rgba(237,233,254,0.92))"
                          : isDark
                            ? "linear-gradient(135deg, rgba(67,56,202,0.18), rgba(76,29,149,0.1))"
                            : "linear-gradient(135deg, rgba(238,242,255,0.85), rgba(243,232,255,0.78))",
                        boxShadow: isExpanded
                          ? isDark
                            ? "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 24px -16px rgba(99,102,241,0.7)"
                            : "inset 0 1px 0 rgba(255,255,255,0.95), 0 10px 26px -18px rgba(99,102,241,0.55)"
                          : isDark
                            ? "inset 0 1px 0 rgba(255,255,255,0.08)"
                            : "inset 0 1px 0 rgba(255,255,255,0.8)",
                        borderBottom: isExpanded
                          ? isDark
                            ? "1px solid rgba(139, 92, 246, 0.35)"
                            : "1px solid rgba(139, 92, 246, 0.3)"
                          : "1px solid transparent",
                      }}
                      onClick={() => toggleAccordion(index)}
                    >
                      {faq.question}
                      <motion.span
                        className="transform transition-transform duration-300"
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                      >
                        <FiChevronDown size={22} />
                      </motion.span>
                    </button>
                    <motion.div
                      id={panelId}
                      aria-labelledby={triggerId}
                      className="accordion-content overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        className={`border-t px-4 pb-4 pt-3 text-base transition-colors duration-200 ${
                          isDark ? "text-gray-300" : "text-gray-900"
                        }`}
                        style={{
                          borderColor: isDark
                            ? "rgba(139, 92, 246, 0.22)"
                            : "rgba(139, 92, 246, 0.24)",
                          color: isDark ? "#d1d5db" : "#111827",
                        }}
                        dangerouslySetInnerHTML={{
                          __html: faq.answer
                            .replace(
                              /<strong>/g,
                              `<strong style="color: ${isDark ? "#f3f4f6" : "#000000"}; font-weight: 600;">`,
                            )
                            .replace(
                              /<a /g,
                              `<a style="color: ${isDark ? "#818cf8" : "#4f46e5"};" `,
                            ),
                        }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
