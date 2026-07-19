import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSafeColorMode } from "../../utils/useSafeColorMode";

const faqData = [
  {
    question: "What is the recode hive?",
    answer:
      "recode hive is a comprehensive platform focused on providing students with the right resources at the right time. We help you focus on important topics and tools used in current industry standards compared to traditional university curricula. This includes data engineering tutorials, blogs, and opportunities for open-source contribution with earning potential. <br><br>🌐 <a href='https://recodehive.com/' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>Visit our official website</a> | 📚 <a href='/docs/intro' class='text-green-600 hover:text-green-800 underline'>Explore our documentation</a>",
  },
  {
    question: "What features do the recode hive provides?",
    answer:
      "We provide students with comprehensive learning opportunities through our <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>recode hive GitHub organization</a>, which includes 1000+ data-related projects. Our community is non-profit and inclusive for all, offering:<br><br>• <strong>Learning Resources:</strong> Tutorials, documentation, and hands-on projects<br>• <strong>Open Source Contribution:</strong> Real-world project experience<br>• <strong>Earning Opportunities:</strong> GitHub sponsorship program<br>• <strong>Community Support:</strong> Discord community and mentorship<br><br>🚀 <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>Browse our GitHub projects</a>",
  },
  {
    question: "How can I contribute tutorials?",
    answer:
      "Contributing tutorials is straightforward! Our community is completely open-source, and the entire codebase is available on GitHub for forking and contributing. Whether you're a beginner or experienced developer, we welcome your contributions.<br><br><strong>Getting Started:</strong><br>1. Fork our <a href='https://github.com/recodehive/recode-website' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>main repository</a><br>2. Check our <a href='/docs/GitHub/Maintainer-guide/github-labels' class='text-green-600 hover:text-green-800 underline'>contribution guidelines</a><br>3. Create your tutorial content<br>4. Submit a pull request<br><br>📖 <a href='/docs/GitHub/GitHub-basics/first-opensource-code' class='text-green-600 hover:text-green-800 underline'>Learn how to make your first contribution</a>",
  },
  {
    question: "What all resources are available here?",
    answer:
      "We offer a comprehensive range of learning resources across multiple technologies:<br><br><strong>Currently Available:</strong><br>•🗄️ <a href='/docs/sql/intro-sql' class='text-green-600 hover:text-green-800 underline'>SQL Resources</a> - Database management and queries<br>• 🐙 <a href='/docs/GitHub/intro-github' class='text-green-600 hover:text-green-800 underline'>GitHub Guides</a> - Version control and collaboration<br>• 📮 <a href='/docs/Technical' class='text-green-600 hover:text-green-800 underline'>Postman API Testing</a><br>• ⚛️ <a href='/docs/Nextjs/intro-nextjs' class='text-green-600 hover:text-green-800 underline'>Next.js Development</a><br><br><strong>Coming Soon:</strong> Advanced data tools tutorials, cloud technologies, and more!",
  },
  {
    question: "How can I contribute as a beginner?",
    answer:
      "We've designed our community specifically with beginners in mind! Contributing to open-source can seem intimidating, but we provide a supportive environment for learning.<br><br><strong>Beginner-Friendly Steps:</strong><br>1. Start with our <a href='/docs/GitHub/GitHub-basics' class='text-green-600 hover:text-green-800 underline'>GitHub Basics guide</a><br>2. Join our <a href='https://discord.gg/dh3TA8U55Q' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>Discord community</a> for support<br>3. Look for 'good first issue' labels in our repositories<br>4. Follow our <a href='https://github.com/recodehive/recode-website#getting-started' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>step-by-step contribution guide</a><br><br>🎯 <a href='/docs/GitHub/GitHub-basics/first-opensource-code' class='text-green-600 hover:text-green-800 underline'>Make your first open-source contribution</a>",
  },
  {
    question: "How can I earn from this recode hive organisation?",
    answer:
      "We offer earning opportunities through our GitHub sponsorship program! Every week, we sponsor contributors who make valuable open-source contributions.<br><br><strong>Sponsorship Details:</strong><br>• Weekly sponsorship program<br>• Earning range: ₹100 to ₹500 per week<br>• Based on contribution quality and impact<br>• Open to all community members<br><br><strong>How to Qualify:</strong><br>• Make meaningful contributions to our projects<br>• Follow contribution guidelines<br>• Engage with the community<br><br>💰 <a href='https://github.com/sponsors/recodehive' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>Learn more about GitHub Sponsorship</a> | 🚀 <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>Start contributing today</a>",
  },
  {
    question:
      "How will I stay up to date with the latest news from this organisation?",
    answer:
      "Stay connected with recode hive through multiple channels to never miss important updates:<br><br><strong>📧 Newsletter:</strong> Our primary communication channel providing weekly updates on community happenings, new resources, and opportunities.<br><br><strong>Social Media:</strong><br>• 📱 <a href='https://www.instagram.com/nomad_brains/' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>Instagram</a> - Visual updates and behind-the-scenes<br>• 🐦 <a href='https://x.com/sanjay_kv_' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>Twitter</a> - Quick updates and tech insights<br>• 💼 <a href='https://www.linkedin.com/in/sanjay-k-v/' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>LinkedIn</a> - Professional updates<br>• 🎥 <a href='https://www.youtube.com/@RecodeHive' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>YouTube</a> - Video tutorials and content<br><br>📬 <a href='https://recodehive.substack.com/' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline font-semibold'>Subscribe to our Newsletter</a> | 💬 <a href='https://discord.gg/Yxv9RA3r' target='_blank' rel='noopener noreferrer' class='text-green-600 hover:text-green-800 underline'>Join our Discord</a>",
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
        background: isDark ? "#161616" : "#FFFFFF",
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
            <p
              className="mb-2.5 inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase"
              style={{
                color: isDark ? "#4ade80" : "#16a34a",
                fontFamily:
                  "'Space Grotesk', 'Inter', -apple-system, sans-serif",
              }}
            >
              ✦ FAQs
            </p>
            <h2
              className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
              style={{
                color: isDark ? "#ffffff" : "#0f172a",
                fontFamily:
                  "'Space Grotesk', 'Inter', -apple-system, sans-serif",
              }}
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
                      background: isDark ? "#161616" : "#FFFFFF",
                      border: isDark
                        ? "1px solid rgba(255, 255, 255, 0.12)"
                        : "1px solid rgba(0, 0, 0, 0.10)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <button
                      className={`accordion-toggle group flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left text-base font-semibold transition-all duration-300 focus:outline-none md:p-5 ${isDark
                        ? "text-gray-100 hover:text-green-300"
                        : "text-gray-800 hover:text-green-700"
                        }`}
                      style={{
                        background: isDark
                          ? isOpen
                            ? "#1f1f1f"
                            : "#161616"
                          : isOpen
                            ? "#f5f5f5"
                            : "#FFFFFF",
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
                            ? "1px solid rgba(255, 255, 255, 0.12)"
                            : "1px solid rgba(0, 0, 0, 0.10)",
                          background: isDark ? "#161616" : "#FFFFFF",
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
                              `<a style="color: ${isDark ? "#37D67A" : "#16a34a"};" `,
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
                      background: isDark ? "#161616" : "#FFFFFF",
                      border: isDark
                        ? "1px solid rgba(255, 255, 255, 0.12)"
                        : "1px solid rgba(0, 0, 0, 0.10)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <button
                      className={`accordion-toggle group flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left text-base font-semibold transition-all duration-300 focus:outline-none md:p-5 ${isDark
                        ? "text-gray-100 hover:text-green-300"
                        : "text-gray-800 hover:text-green-700"
                        }`}
                      style={{
                        background: isDark
                          ? isOpen
                            ? "#1f1f1f"
                            : "#161616"
                          : isOpen
                            ? "#f5f5f5"
                            : "#FFFFFF",
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
                            ? "1px solid rgba(255, 255, 255, 0.12)"
                            : "1px solid rgba(0, 0, 0, 0.10)",
                          background: isDark ? "#161616" : "#FFFFFF",
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
                              `<a style="color: ${isDark ? "#37D67A" : "#16a34a"};" `,
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
