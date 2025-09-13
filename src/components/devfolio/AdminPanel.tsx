import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Eye,
  Clock,
  User,
  Calendar,
  Github,
  MapPin,
  Building,
} from "lucide-react";
import {
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
} from "../../lib/firestore";
import { useToast } from "../ui/Toast";
import type { ProfileSubmission } from "../../types/devfolio";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { addToast } = useToast();
  const [submissions, setSubmissions] = useState<ProfileSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] =
    useState<ProfileSubmission | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadSubmissions();
    }
  }, [isOpen]);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const pendingSubmissions = await getPendingSubmissions();
      setSubmissions(pendingSubmissions);
    } catch (error) {
      console.error("Error loading submissions:", error);
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to load submissions",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submissionId: string) => {
    if (!submissionId) return;

    setActionLoading(submissionId);
    try {
      await approveSubmission(submissionId);

      addToast({
        type: "success",
        title: "Profile Approved",
        message: "The profile has been approved and is now live",
        duration: 5000,
      });

      // Remove from pending list
      setSubmissions((prev) => prev.filter((sub) => sub.id !== submissionId));
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Error approving submission:", error);
      addToast({
        type: "error",
        title: "Approval Failed",
        message: "Failed to approve the profile. Please try again.",
        duration: 4000,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (submissionId: string) => {
    if (!submissionId) return;

    setActionLoading(submissionId);
    try {
      await rejectSubmission(submissionId);

      addToast({
        type: "info",
        title: "Profile Rejected",
        message: "The profile submission has been rejected",
        duration: 5000,
      });

      // Remove from pending list
      setSubmissions((prev) => prev.filter((sub) => sub.id !== submissionId));
      setSelectedSubmission(null);
    } catch (error) {
      console.error("Error rejecting submission:", error);
      addToast({
        type: "error",
        title: "Rejection Failed",
        message: "Failed to reject the profile. Please try again.",
        duration: 4000,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Admin Panel - Profile Submissions
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-80px)]">
          {/* Submissions List */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Pending Submissions ({submissions.length})
              </h3>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No pending submissions
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((submission) => (
                    <motion.div
                      key={submission.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedSubmission(submission)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedSubmission?.id === submission.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={submission.githubData.avatar_url}
                          alt={submission.githubData.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {submission.githubData.name ||
                              submission.githubData.username}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            @{submission.githubData.username}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            {formatDate(submission.submittedAt)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submission Details */}
          <div className="flex-1 overflow-y-auto">
            {selectedSubmission ? (
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={selectedSubmission.githubData.avatar_url}
                      alt={selectedSubmission.githubData.name}
                      className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-600 shadow-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedSubmission.githubData.name ||
                          selectedSubmission.githubData.username}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        @{selectedSubmission.githubData.username}
                      </p>
                      {selectedSubmission.githubData.bio && (
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          {selectedSubmission.githubData.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedSubmission.githubData.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedSubmission.githubData.location}
                        </span>
                      </div>
                    )}
                    {selectedSubmission.githubData.company && (
                      <div className="flex items-center space-x-2">
                        <Building className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {selectedSubmission.githubData.company}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Joined{" "}
                        {formatDate(selectedSubmission.githubData.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {selectedSubmission.githubData.followers} followers
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedSubmission.githubData.public_repos}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Repositories
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedSubmission.githubData.followers}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Followers
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {selectedSubmission.githubData.following}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Following
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <a
                    href={selectedSubmission.githubData.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Github className="w-5 h-5" />
                    <span>View GitHub</span>
                  </a>

                  <button
                    onClick={() => handleReject(selectedSubmission.id!)}
                    disabled={actionLoading === selectedSubmission.id}
                    className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Reject</span>
                  </button>

                  <button
                    onClick={() => handleApprove(selectedSubmission.id!)}
                    disabled={actionLoading === selectedSubmission.id}
                    className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Eye className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Select a Submission
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Choose a submission from the list to review details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;
