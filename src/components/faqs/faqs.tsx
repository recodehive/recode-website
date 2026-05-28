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
      "We offer a comprehensive range of learning resources across multiple technologies:<br><br><strong>Currently Available:</strong><br>•🗄️ <a href='/docs/sql/intro-sql' class='text-indigo-600 hover:text-indigo-800 underline'>SQL Resources</a> - Database management and queries<br>• 🐙 <a href='/docs/GitHub/intro-github' class='text-indigo-600 hover:text-indigo-800 underline'>GitHub Guides</a> - Version control and collaboration<br>• 📮 <a href='/docs/Technical' class='text-indigo-600 hover:text-indigo-800 underline'>Postman API Testing</a><br>• ⚛️ <a href='/docs/Nextjs/intro-nextjs' class='text-indigo-600 hover:text-indigo-800 underline'>Next.js Development</a><br><br><strong>Coming Soon:</strong> Advanced data tools tutorials, cloud technologies, and more!",
  },
  {
    question: "How can I contribute as a beginner?",
    answer:
      "We've designed our community specifically with beginners in mind! Contributing to open-source can seem intimidating, but we provide a supportive environment for learning.<br><br><strong>Beginner-Friendly Steps:</strong><br>1. Start with our <a href='/docs/GitHub/GitHub-basics' class='text-indigo-600 hover:text-indigo-800 underline'>GitHub Basics guide</a><br>2. Join our <a href='https://discord.gg/dh3TA8U55Q' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Discord community</a> for support<br>3. Look for 'good first issue' labels in our repositories<br>4. Follow our <a href='https://github.com/recodehive/recode-website#getting-started' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>step-by-step contribution guide</a><br><br>🎯 <a href='/docs/GitHub/GitHub-basics/first-opensource-code' class='text-indigo-600 hover:text-indigo-800 underline'>Make your first open-source contribution</a>",
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
  const { colorMode, isDark } = useSafeColorMode();

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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <div className="mb-10 text-center lg:mb-14">
            <h6
              className="mb-2 text-lg font-medium"
              style={{
                color: isDark ? "#a78bfa" : "#8b5cf6",
                fontWeight: 600,
              }}
            >
              FAQs
            </h6>
            <h2
              className={`text-5xl font-bold leading-snug md:text-6xl ${isDark ? "text-gray-100" : "text-gray-900"
                }`}
            >
              Looking for answers?
            </h2>
            <p
              className={`mx-auto mt-3 max-w-3xl text-base ${isDark ? "text-gray-400" : "text-gray-600"
                }`}
              style={{ textAlign: "center" }}
            >
              Find answers to the most common questions about recode hive.
            </p>
          </div>

          <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 md:flex-row md:gap-6">
            <div className="flex w-full flex-1 flex-col gap-4 md:gap-6">
              {faqData.filter((_, index) => index % 2 === 0).map((faq, idx) => {
                const originalIndex = idx * 2;
                const isOpen = activeIndex === originalIndex;

                return (
                  <motion.div
                    key={originalIndex}
                    className="accordion overflow-hidden rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: isDark
                        ? "rgba(30, 27, 75, 0.45)"
                        : "rgba(237, 233, 254, 0.5)",
                      border: isDark
                        ? "1px solid rgba(139, 92, 246, 0.25)"
                        : "1px solid rgba(139, 92, 246, 0.35)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <button
                      className={`accordion-toggle group flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left text-base font-semibold transition-all duration-300 focus:outline-none md:p-5 ${isDark
                        ? "text-gray-100 hover:text-indigo-300"
                        : "text-gray-800 hover:text-indigo-700"
                        }`}
                      style={{
                        background: isDark
                          ? isOpen
                            ? "rgba(67, 56, 202, 0.18)"
                            : "rgba(30, 27, 75, 0.45)"
                          : isOpen
                            ? "rgba(221, 214, 254, 0.85)"
                            : "rgba(237, 233, 254, 0.45)",
                      }}
                      onClick={() => toggleAccordion(originalIndex)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${originalIndex}`}
                    >
                      <span>{faq.question}</span>
                      <motion.span
                        className="transform transition-transform duration-300"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                      >
                        <FiChevronDown size={22} />
                      </motion.span>
                    </button>
                    <motion.div
                      id={`faq-panel-${originalIndex}`}
                      className="accordion-content overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        className={`text-base transition-colors duration-200 ${isDark ? "text-gray-300" : "text-gray-900"
                          }`}
                        style={{
                          borderTop: isDark
                            ? "1px solid rgba(99, 102, 241, 0.3)"
                            : "1px solid rgba(129, 140, 248, 0.45)",
                          background: isDark
                            ? "rgba(17, 24, 39, 0.5)"
                            : "rgba(255, 255, 255, 0.72)",
                          color: isDark ? "#d1d5db" : "#111827",
                          padding: "1rem 1.25rem 1.25rem",
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

            <div className="flex w-full flex-1 flex-col gap-4 md:gap-6">
              {faqData.filter((_, index) => index % 2 !== 0).map((faq, idx) => {
                const originalIndex = idx * 2 + 1;
                const isOpen = activeIndex === originalIndex;

                return (
                  <motion.div
                    key={originalIndex}
                    className="accordion overflow-hidden rounded-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: isDark
                        ? "rgba(30, 27, 75, 0.45)"
                        : "rgba(237, 233, 254, 0.5)",
                      border: isDark
                        ? "1px solid rgba(139, 92, 246, 0.25)"
                        : "1px solid rgba(139, 92, 246, 0.35)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <button
                      className={`accordion-toggle group flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left text-base font-semibold transition-all duration-300 focus:outline-none md:p-5 ${isDark
                        ? "text-gray-100 hover:text-indigo-300"
                        : "text-gray-800 hover:text-indigo-700"
                        }`}
                      style={{
                        background: isDark
                          ? isOpen
                            ? "rgba(67, 56, 202, 0.18)"
                            : "rgba(30, 27, 75, 0.45)"
                          : isOpen
                            ? "rgba(221, 214, 254, 0.85)"
                            : "rgba(237, 233, 254, 0.45)",
                      }}
                      onClick={() => toggleAccordion(originalIndex)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${originalIndex}`}
                    >
                      <span>{faq.question}</span>
                      <motion.span
                        className="transform transition-transform duration-300"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                      >
                        <FiChevronDown size={22} />
                      </motion.span>
                    </button>
                    <motion.div
                      id={`faq-panel-${originalIndex}`}
                      className="accordion-content overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        className={`text-base transition-colors duration-200 ${isDark ? "text-gray-300" : "text-gray-900"
                          }`}
                        style={{
                          borderTop: isDark
                            ? "1px solid rgba(99, 102, 241, 0.3)"
                            : "1px solid rgba(129, 140, 248, 0.45)",
                          background: isDark
                            ? "rgba(17, 24, 39, 0.5)"
                            : "rgba(255, 255, 255, 0.72)",
                          color: isDark ? "#d1d5db" : "#111827",
                          padding: "1rem 1.25rem 1.25rem",
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
