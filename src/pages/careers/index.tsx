import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";

// Animation variants for consistent animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Sample data for the careers page
const perks = [
  {
    icon: "🏠",
    title: "Remote First",
    description: "Work from anywhere in the world with flexible hours that suit your lifestyle."
  },
  {
    icon: "💰",
    title: "Competitive Salary",
    description: "We offer competitive compensation packages with equity options."
  },
  {
    icon: "🎓",
    title: "Learning & Development",
    description: "Annual learning budget and conference allowances to grow your skills."
  },
  {
    icon: "🏥",
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs for you and your family."
  },
  {
    icon: "🌴",
    title: "Unlimited PTO",
    description: "Take the time you need to recharge and maintain work-life balance."
  },
  {
    icon: "🚀",
    title: "Career Growth",
    description: "Clear career progression paths with mentorship and leadership opportunities."
  }
];

const cultureValues = [
  {
    title: "Innovation First",
    description: "We embrace new technologies and creative solutions to solve complex problems.",
    image: "/img/culture-innovation.jpg"
  },
  {
    title: "Collaboration",
    description: "We believe in the power of teamwork and diverse perspectives.",
    image: "/img/culture-collaboration.jpg"
  },
  {
    title: "Growth Mindset",
    description: "We're committed to continuous learning and personal development.",
    image: "/img/culture-growth.jpg"
  }
];

const jobOpenings = [
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build beautiful and responsive user interfaces using React and modern web technologies."
  },
  {
    title: "Backend Developer",
    department: "Engineering", 
    location: "Remote",
    type: "Full-time",
    description: "Design and develop scalable backend services and APIs using Node.js and cloud technologies."
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote", 
    type: "Full-time",
    description: "Manage infrastructure, CI/CD pipelines, and ensure system reliability and scalability."
  },
  {
    title: "Technical Writer",
    department: "Content",
    location: "Remote",
    type: "Part-time",
    description: "Create engaging technical documentation and educational content for our community."
  }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Frontend Developer",
    content: "RecodeHive has given me the opportunity to work on cutting-edge projects while maintaining an amazing work-life balance. The team is incredibly supportive and collaborative.",
    avatar: "/img/testimonial-sarah.jpg"
  },
  {
    name: "Marcus Johnson", 
    role: "DevOps Engineer",
    content: "I love the remote-first culture here. The flexibility to work from anywhere has allowed me to travel while building my career. The learning opportunities are endless.",
    avatar: "/img/testimonial-marcus.jpg"
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    content: "The growth mindset at RecodeHive is real. I've been able to take on new challenges and expand my skill set with full support from leadership.",
    avatar: "/img/testimonial-priya.jpg"
  }
];

export default function CareersPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout
      title="Careers - Join RecodeHive"
      description="Join our team of passionate developers and help shape the future of coding education. Explore career opportunities at RecodeHive."
    >
      <Head>
        <title>Careers - Join RecodeHive</title>
        <meta
          name="description"
          content="Join our team of passionate developers and help shape the future of coding education. Explore career opportunities at RecodeHive."
        />
      </Head>

      <div className="careers-page bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        {/* Hero Section */}
        <motion.section
          className="hero-section py-20 px-4 text-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
              variants={fadeIn}
            >
              Join the Future of Code Education
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-blue-100"
              variants={fadeIn}
            >
              Help us build the next generation of developers. Work with a passionate team creating impact through education.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <Link
                to="#"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View Open Positions
              </Link>
              <Link
                to="#"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Learn About Our Culture
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* Culture Highlights Section */}
        <motion.section
          id="culture"
          className="culture-section py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Our Culture & Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We're building more than just a company—we're creating a community of learners, innovators, and leaders.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {cultureValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="culture-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  variants={fadeIn}
                >
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-6 flex items-center justify-center">
                    <span className="text-6xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Perks & Benefits Section */}
        <motion.section
          className="perks-section py-20 px-4 bg-gray-50 dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Perks & Benefits
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We take care of our team so they can focus on doing their best work.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {perks.map((perk, index) => (
                <motion.div
                  key={index}
                  className="perk-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  variants={fadeIn}
                >
                  <div className="text-4xl mb-4">{perk.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {perk.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {perk.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Job Openings Section */}
        <motion.section
          id="openings"
          className="jobs-section py-20 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                Open Positions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Find your next opportunity and help us build the future of coding education.
              </p>
            </motion.div>

            <div className="space-y-6">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={index}
                  className="job-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  variants={fadeIn}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                            {job.department}
                          </span>
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                            {job.location}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {job.description}
                      </p>
                    </div>
                    <div className="md:ml-6">
                      <Link
                        to="/contact-us"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="testimonials-section py-20 px-4 bg-gray-50 dark:bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-16" variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                What Our Team Says
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Hear from our team members about their experience at RecodeHive.
              </p>
            </motion.div>

            <motion.div
              className="testimonial-carousel bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg"
              variants={fadeIn}
            >
              <div className="testimonial-content text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>
                <div className="testimonial-author">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeTestimonial 
                        ? 'bg-blue-600 scale-110' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="cta-section py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6"
              variants={fadeIn}
            >
              Ready to Shape the Future?
            </motion.h2>
            <motion.p
              className="text-xl mb-8 text-blue-100"
              variants={fadeIn}
            >
              Don't see a perfect fit? We're always looking for talented individuals to join our mission.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeIn}
            >
              <Link
                to="/contact-us"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get In Touch
              </Link>
              <Link
                to="/community"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Join Our Community
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
}