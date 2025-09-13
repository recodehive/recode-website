import React from "react";
import Layout from "@theme/Layout";
import { motion } from "framer-motion";
import clsx from "clsx";
import DevfolioSection from "../../components/devfolio/DevfolioSection";

function DevfolioPageContent(): React.ReactElement {
  return (
    <main className="min-h-screen py-8 bg-gray-50 dark:bg-[#121212] text-black dark:text-white">
      <div className="container mx-auto px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
              rotate: [360, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-40 right-10 w-48 h-48 bg-purple-500 rounded-full opacity-10 blur-xl"
          />
          <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -100, 0],
              rotate: [0, -360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 left-1/3 w-24 h-24 bg-pink-500 rounded-full opacity-10 blur-xl"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <DevfolioSection />
        </div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="p-8 rounded-2xl border-2 border-dashed transition-all duration-300 border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:border-blue-400 dark:hover:border-blue-500">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to showcase your work?
            </h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              Join our community of amazing developers and let your GitHub
              profile inspire others.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
            >
              Submit Your Profile
            </motion.button>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Easy Submission
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simply enter your GitHub username and let us fetch your profile
              automatically.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Quality Curation
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              All profiles go through our review process to ensure quality and
              relevance.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">❤️</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Community Love
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get likes and recognition from fellow developers in our community.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function DevfolioPage(): React.ReactElement {
  return (
    <Layout
      title="Devfolio - GitHub Profiles Showcase"
      description="Discover amazing developers from our community. Showcase your GitHub profile and get inspired by others."
      wrapperClassName="devfolio-page"
    >
      <DevfolioPageContent />
    </Layout>
  );
}
