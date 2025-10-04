import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { useColorMode } from "@docusaurus/theme-common"; // Docusaurus theme detection

const faqData = [
  {
    question: "What is the recode hive?",
    answer:
      "Recode Hive is a comprehensive platform focused on providing students with the right resources at the right time. We help you focus on important topics and tools used in current industry standards compared to traditional university curricula. This includes data engineering tutorials, blogs, and opportunities for open-source contribution with earning potential. <br><br>🌐 <a href='https://recodehive.com/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Visit our official website</a> | 📚 <a href='/docs/intro' class='text-indigo-600 hover:text-indigo-800 underline'>Explore our documentation</a>",
  },
  {
    question: "What features do the recode hive provides?",
    answer:
      "We provide students with comprehensive learning opportunities through our <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Recode Hive GitHub organization</a>, which includes 1000+ data-related projects. Our community is non-profit and inclusive for all, offering:<br><br>• <strong>Learning Resources:</strong> Tutorials, documentation, and hands-on projects<br>• <strong>Open Source Contribution:</strong> Real-world project experience<br>• <strong>Earning Opportunities:</strong> GitHub sponsorship program<br>• <strong>Community Support:</strong> Discord community and mentorship<br><br>🚀 <a href='https://github.com/recodehive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Browse our GitHub projects</a>",
  },
  {
    question: "How can I contribute tutorials?",
    answer:
      "Contributing tutorials is straightforward! Our community is completely open-source, and the entire codebase is available on GitHub for forking and contributing. Whether you're a beginner or experienced developer, we welcome your contributions.<br><br><strong>Getting Started:</strong><br>1. Fork our <a href='https://github.com/recodehive/recode-website' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>main repository</a><br>2. Check our <a href='/docs/GitHub/Maintainer-guide/github-labels' class='text-indigo-600 hover:text-indigo-800 underline'>contribution guidelines</a><br>3. Create your tutorial content<br>4. Submit a pull request<br><br>📖 <a href='/docs/GitHub/GitHub-basics/first-opensource-code' class='text-indigo-600 hover:text-indigo-800 underline'>Learn how to make your first contribution</a>",
  },
  {
    question: "What all resources are available here?",
    answer:
      "We offer a comprehensive range of learning resources across multiple technologies:<br><br><strong>Currently Available:</strong><br>• 🐍 <a href='/docs/python' class='text-indigo-600 hover:text-indigo-800 underline'>Python Tutorials</a> - From basics to advanced concepts<br>• 🗄️ <a href='/docs/sql' class='text-indigo-600 hover:text-indigo-800 underline'>SQL Resources</a> - Database management and queries<br>• 🐙 <a href='/docs/GitHub' class='text-indigo-600 hover:text-indigo-800 underline'>GitHub Guides</a> - Version control and collaboration<br>• 📮 <a href='/docs/Technical' class='text-indigo-600 hover:text-indigo-800 underline'>Postman API Testing</a><br>• ⚛️ <a href='/docs/Nextjs' class='text-indigo-600 hover:text-indigo-800 underline'>Next.js Development</a><br><br><strong>Coming Soon:</strong> Advanced data tools tutorials, cloud technologies, and more!",
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
    question: "How will I stay up to date with the latest news from this organisation?",
    answer:
      "Stay connected with Recode Hive through multiple channels to never miss important updates:<br><br><strong>📧 Newsletter:</strong> Our primary communication channel providing weekly updates on community happenings, new resources, and opportunities.<br><br><strong>Social Media:</strong><br>• 📱 <a href='https://www.instagram.com/nomad_brains/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Instagram</a> - Visual updates and behind-the-scenes<br>• 🐦 <a href='https://x.com/sanjay_kv_' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Twitter</a> - Quick updates and tech insights<br>• 💼 <a href='https://www.linkedin.com/in/sanjay-k-v/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>LinkedIn</a> - Professional updates<br>• 🎥 <a href='https://www.youtube.com/@RecodeHive' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>YouTube</a> - Video tutorials and content<br><br>📬 <a href='https://recodehive.substack.com/' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline font-semibold'>Subscribe to our Newsletter</a> | 💬 <a href='https://discord.gg/Yxv9RA3r' target='_blank' rel='noopener noreferrer' class='text-indigo-600 hover:text-indigo-800 underline'>Join our Discord</a>",
  },
];

const FAQs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Split FAQs into two columns manually to prevent shifting
  const midPoint = Math.ceil(faqData.length / 2);
  const leftColumnFAQs = faqData.slice(0, midPoint);
  const rightColumnFAQs = faqData.slice(midPoint);

  return (
    <section
      className={`py-8 transition-colors duration-300 ${
        isDark ? "bg-[#121212]" : "bg-gray-50"
      }`}
    >
      <div className="mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex flex-col justify-center items-center gap-x-8 gap-y-12 xl:gap-28 lg:flex-row lg:justify-between">
          <div className="w-full">
            <div className="mb-8 lg:mb-16">
              <h6 className="text-lg text-center lg:text-left font-medium text-indigo-600 mb-2">
                FAQs
              </h6>
              <h2
                className={`text-4xl text-center lg:text-left font-bold ${
                  isDark ? "text-gray-100" : "text-gray-900"
                } leading-snug`}
              >
                Looking for answers?
              </h2>
              <p
                className={`${
                  isDark ? "text-gray-400" : "text-gray-600"
                } text-center lg:text-left`}
              >
                Find answers to the most common questions about Recode Hive.
              </p>
            </div>

    {/* FAQ Manual Column Layout - Prevents vertical shifting */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {leftColumnFAQs.map((faq, index) => (
                  <motion.div
                    key={index}
                    className="accordion border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      className={`accordion-toggle group flex justify-between items-center text-lg font-semibold w-full transition-all duration-300 
                        ${
                          isDark
                            ? "text-gray-100 bg-gray-800 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-gray-600"
                            : "text-gray-900 bg-white hover:bg-gray-50 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm"
                        } 
                        p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="text-left pr-4">{faq.question}</span>
                      <motion.span
                        className={`transform transition-transform duration-300 flex-shrink-0 ${
                          isDark ? "text-gray-300" : "text-gray-600"
                        }`}
                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      >
                        <FiChevronDown size={22} />
                      </motion.span>
                    </button>
                    <motion.div
                      className="accordion-content overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeIndex === index ? "auto" : 0,
                        opacity: activeIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div
                        className={`mt-3 p-5 text-base leading-relaxed transition-colors duration-200 rounded-lg border-l-4 ${
                          isDark 
                            ? "text-gray-100 bg-gradient-to-r from-gray-800/80 to-gray-900/60 border-l-indigo-400 shadow-lg" 
                            : "text-gray-900 bg-gradient-to-r from-white to-gray-50 border-l-indigo-500 shadow-md"
                        }`}
                        dangerouslySetInnerHTML={{ 
                          __html: faq.answer.replace(
                            /<strong>/g, 
                            `<strong style="color: ${isDark ? '#ffffff' : '#000000'}; font-weight: 700; background: ${isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(199, 210, 254, 0.4)'}; padding: 2px 6px; border-radius: 4px;">`
                          ).replace(
                            /<a /g,
                            `<a style="color: ${isDark ? '#c4b5fd' : '#3730a3'}; text-decoration: underline; font-weight: 600; transition: all 0.2s ease;" `
                          ).replace(
                            /• /g,
                            `<span style="color: ${isDark ? '#818cf8' : '#4f46e5'}; font-weight: bold;">•</span> `
                          )
                        }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {rightColumnFAQs.map((faq, index) => {
                  const actualIndex = index + leftColumnFAQs.length;
                  return (
                    <motion.div
                      key={actualIndex}
                      className="accordion border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button
                        className={`accordion-toggle group flex justify-between items-center text-lg font-semibold w-full transition-all duration-300 
                          ${
                            isDark
                              ? "text-gray-100 bg-gray-800 hover:bg-gray-700 hover:text-white border border-gray-700 hover:border-gray-600"
                              : "text-gray-900 bg-white hover:bg-gray-50 hover:text-gray-900 border border-gray-200 hover:border-gray-300 shadow-sm"
                          } 
                          p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                        onClick={() => toggleAccordion(actualIndex)}
                      >
                        <span className="text-left pr-4">{faq.question}</span>
                        <motion.span
                          className={`transform transition-transform duration-300 flex-shrink-0 ${
                            isDark ? "text-gray-300" : "text-gray-600"
                          }`}
                          animate={{ rotate: activeIndex === actualIndex ? 180 : 0 }}
                        >
                          <FiChevronDown size={22} />
                        </motion.span>
                      </button>
                      <motion.div
                        className="accordion-content overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: activeIndex === actualIndex ? "auto" : 0,
                          opacity: activeIndex === actualIndex ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div
                          className={`mt-3 p-5 text-base leading-relaxed transition-colors duration-200 rounded-lg border-l-4 ${
                            isDark 
                              ? "text-gray-100 bg-gradient-to-r from-gray-800/80 to-gray-900/60 border-l-indigo-400 shadow-lg" 
                              : "text-gray-900 bg-gradient-to-r from-white to-gray-50 border-l-indigo-500 shadow-md"
                          }`}
                          dangerouslySetInnerHTML={{ 
                            __html: faq.answer.replace(
                              /<strong>/g, 
                              `<strong style="color: ${isDark ? '#ffffff' : '#000000'}; font-weight: 700; background: ${isDark ? 'rgba(99, 102, 241, 0.2)' : 'rgba(199, 210, 254, 0.4)'}; padding: 2px 6px; border-radius: 4px;">`
                            ).replace(
                              /<a /g,
                              `<a style="color: ${isDark ? '#c4b5fd' : '#3730a3'}; text-decoration: underline; font-weight: 600; transition: all 0.2s ease;" `
                            ).replace(
                              /• /g,
                              `<span style="color: ${isDark ? '#818cf8' : '#4f46e5'}; font-weight: bold;">•</span> `
                            )
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
      </div>
    </section>
  );
};

export default FAQs;