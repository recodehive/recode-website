import React from "react";
import Layout from "@theme/Layout";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const ContactUs: React.FC = () => {
  return (
    <Layout
      title="Contact Us"
      description="Get in touch with the RecodeHive team. We're here to help with your questions, feedback, and collaboration opportunities."
    >
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have questions, feedback, or want to collaborate? We'd love to hear from you. 
              Reach out to us and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                      <a 
                        href="mailto:sanjay@recodehive.com"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        sanjay@recodehive.com
                      </a>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        General inquiries and support
                      </p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Response Time</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Within 24-48 hours
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        We'll get back to you promptly
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Online & Global
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Serving developers worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                  What we can help you with:
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Learning resources and tutorials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Technical support and guidance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Collaboration opportunities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Partnership inquiries</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Content suggestions and feedback</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a message
              </h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Other Ways to Connect
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/community"
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-blue-600 dark:text-blue-400 text-2xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Join our community and connect with fellow developers
                </p>
              </a>
              
              <a
                href="/docs"
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-green-600 dark:text-green-400 text-2xl mb-3">📖</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Explore our comprehensive learning resources
                </p>
              </a>
              
              <a
                href="/blogs"
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-purple-600 dark:text-purple-400 text-2xl mb-3">✍️</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Blog</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Read our latest articles and tutorials
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;