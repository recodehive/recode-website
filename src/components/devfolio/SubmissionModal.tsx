import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Github,
  Loader2,
  CheckCircle,
  AlertCircle,
  User,
  MapPin,
  Building,
  Calendar,
  Info,
} from "lucide-react";
import { submitProfile } from "../../lib/firestore";
import { fetchGitHubProfile, getDemoUsernames } from "../../services/github";
import { useToast } from "../ui/Toast";
import type { GitHubProfile, ProfileSubmission } from "../../types/devfolio";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addToast } = useToast();
  const [username, setUsername] = useState("");
  const [githubData, setGithubData] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"input" | "preview" | "submitted">("input");
  const [error, setError] = useState<string | null>(null);

  // Debug logging for state changes
  console.log("🔍 SubmissionModal render - Current state:", {
    step,
    submitting,
    loading,
    hasGithubData: !!githubData,
    username: githubData?.username,
  });

  // Cleanup submitting state when modal closes or component unmounts
  useEffect(() => {
    if (!isOpen) {
      setSubmitting(false);
      setLoading(false);
      setError(null);
    }
  }, [isOpen]);

  // Reset submitting state when step changes to submitted
  useEffect(() => {
    console.log("🔍 useEffect [step] triggered, current step:", step);
    if (step === "submitted") {
      console.log("✅ Step is 'submitted', ensuring submitting is false");
      setSubmitting(false);
    }
  }, [step]);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const profile = await fetchGitHubProfile(username.trim());
      setGithubData(profile);
      setStep("preview");
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch GitHub profile";
      setError(errorMessage);

      // Show toast for better user feedback
      addToast({
        type: "error",
        title: "GitHub Profile Error",
        message: errorMessage,
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!githubData) {
      console.error("No GitHub data available for submission");
      return;
    }

    console.log(" Starting profile submission for:", githubData.username);
    setSubmitting(true);
    setError(null);

    // Set a timeout to prevent infinite submitting state
    const timeoutId = setTimeout(() => {
      console.warn(" Submission timeout reached, resetting state");
      setSubmitting(false);
      setError("Submission timed out. Please try again.");
      addToast({
        type: "error",
        title: "Submission Timeout",
        message:
          "The submission took too long. Please check your connection and try again.",
        duration: 5000,
      });
    }, 30000); // 30 second timeout

    try {
      const submission: Omit<ProfileSubmission, "id"> = {
        githubData,
        status: "pending",
        submittedAt: new Date().toISOString(),
        tags: [], // User can add tags later through admin review
      };

      console.log("📝 Submitting profile data:", submission);

      // Direct Firebase submission without any timeout interference
      const submissionId = await submitProfile(submission);
      console.log("✅ Profile submitted successfully with ID:", submissionId);

      // Clear the timeout since submission succeeded
      clearTimeout(timeoutId);

      // Show success toast
      addToast({
        type: "success",
        title: "Profile Submitted!",
        message:
          "Your profile is now pending review. You'll be notified once it's approved.",
        duration: 6000,
      });

      // Immediately transition to success state
      console.log("🔄 Transitioning to submitted state");
      setStep("submitted");
      setSubmitting(false);
      console.log("🎉 State updates completed");
    } catch (error) {
      console.error("Error submitting profile:", error);

      // Clear the timeout since we're handling the error
      clearTimeout(timeoutId);

      // Always reset submitting state on error
      setSubmitting(false);

      // Check if it's a duplicate profile error
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      const isProfileExists = errorMessage.includes("already exists");
      const isTimeout = errorMessage.includes("timeout");

      setError(errorMessage);

      addToast({
        type: "error",
        title: isProfileExists
          ? "Profile Already Exists"
          : isTimeout
          ? "Connection Timeout"
          : "Submission Failed",
        message: isProfileExists
          ? "A profile with this username has already been submitted."
          : isTimeout
          ? "The submission took too long. Please check your internet connection and try again."
          : "Failed to submit your profile. Please try again.",
        duration: 5000,
      });
    }
  }, [githubData, addToast]);

  const handleClose = () => {
    setUsername("");
    setGithubData(null);
    setStep("input");
    setError(null);
    setSubmitting(false);
    setLoading(false);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {step === "input" && "Add Your GitHub Profile"}
                {step === "preview" && "Profile Preview"}
                {step === "submitted" && "Submission Complete"}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {step === "input" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Github className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Enter your GitHub username to fetch your profile
                      information automatically.
                    </p>
                  </div>

                  <form onSubmit={handleUsernameSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        GitHub Username
                      </label>
                      <div className="relative">
                        <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="e.g., octocat"
                          className="w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                          disabled={loading}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Make sure your GitHub profile is public
                      </p>
                    </div>

                    {/* Demo usernames suggestion */}
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start space-x-2">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-700 dark:text-blue-300">
                        <p className="font-medium mb-1">
                          Try these demo usernames:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {getDemoUsernames().map((demoUsername) => (
                            <button
                              key={demoUsername}
                              type="button"
                              onClick={() => setUsername(demoUsername)}
                              className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                            >
                              {demoUsername}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-red-700 dark:text-red-400">
                          {error}
                        </span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !username.trim()}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Fetching Profile...</span>
                        </>
                      ) : (
                        <>
                          <Github className="w-5 h-5" />
                          <span>Fetch GitHub Profile</span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Your profile will be reviewed by our team before being
                    published.
                  </div>
                </motion.div>
              )}

              {step === "preview" && githubData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Profile Found!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Please review your profile information before submitting.
                    </p>
                  </div>

                  {/* Profile Preview Card */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={githubData.avatar_url}
                        alt={githubData.name || githubData.username}
                        className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-600 shadow-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {githubData.name || githubData.username}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          @{githubData.username}
                        </p>
                        {githubData.bio && (
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                            {githubData.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {githubData.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {githubData.location}
                          </span>
                        </div>
                      )}
                      {githubData.company && (
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {githubData.company}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Joined {formatDate(githubData.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {githubData.followers} followers
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {githubData.public_repos}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Repositories
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {githubData.followers}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Followers
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {githubData.following}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Following
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setStep("input")}
                      className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Profile</span>
                      )}
                    </button>

                    {/* Emergency reset button - only show if stuck for more than 10 seconds */}
                    {submitting && (
                      <button
                        onClick={() => {
                          console.log("🔄 Emergency reset triggered by user");
                          setSubmitting(false);
                          setError("Submission was reset. Please try again.");
                        }}
                        className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded"
                        style={{ fontSize: "10px" }}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {step === "submitted" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Submission Successful!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Thank you for submitting your GitHub profile. Our team
                      will review it and notify you once it's approved and
                      published.
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                      What happens next?
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 text-left">
                      <li>
                        • Our team will review your profile within 24-48 hours
                      </li>
                      <li>
                        • We'll check for completeness and community guidelines
                      </li>
                      <li>• You'll receive a notification once approved</li>
                      <li>
                        • Your profile will then appear in the public showcase
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={handleClose}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubmissionModal;
