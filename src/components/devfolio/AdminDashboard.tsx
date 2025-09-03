import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Eye,
  Clock,
  User,
  Calendar,
  Github,
  MapPin,
  Building,
  Search,
  Filter,
  Download,
  Star,
  Trash2,
  Users,
  Activity,
  TrendingUp,
  Heart,
  GitBranch,
  Settings,
  Zap,
} from "lucide-react";
import {
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
  getApprovedProfiles,
  getProfileStats,
} from "../../lib/firestore";
import { useToast } from "../ui/Toast";
import AdvancedSearch from "./AdvancedSearch";
import AnalyticsDashboard from "./AnalyticsDashboard";
import type { ProfileSubmission, DevfolioProfile } from "../../types/devfolio";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DashboardStats {
  totalSubmissions: number;
  pendingReview: number;
  approvedProfiles: number;
  totalLikes: number;
  todaySubmissions: number;
  weeklyGrowth: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "submissions" | "profiles" | "analytics"
  >("dashboard");
  const [submissions, setSubmissions] = useState<ProfileSubmission[]>([]);
  const [profiles, setProfiles] = useState<DevfolioProfile[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalSubmissions: 0,
    pendingReview: 0,
    approvedProfiles: 0,
    totalLikes: 0,
    todaySubmissions: 0,
    weeklyGrowth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState({
    searchTerm: "",
    sortBy: "followers" as "name" | "followers" | "repos" | "likes" | "date",
    sortOrder: "desc" as "asc" | "desc",
    minFollowers: 0,
    minRepos: 0,
    tags: [] as string[],
    featured: null as boolean | null,
  });

  useEffect(() => {
    if (isOpen) {
      loadDashboardData();
    }
  }, [isOpen]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [pendingSubmissions, approvedProfilesList, profileStats] =
        await Promise.all([
          getPendingSubmissions(),
          getApprovedProfiles(),
          getProfileStats(),
        ]);

      setSubmissions(pendingSubmissions);
      setProfiles(approvedProfilesList);

      // Calculate dashboard stats
      const today = new Date().toDateString();
      const todaySubmissions = pendingSubmissions.filter(
        (sub) => new Date(sub.submittedAt).toDateString() === today
      ).length;

      setStats({
        totalSubmissions:
          pendingSubmissions.length + approvedProfilesList.length,
        pendingReview: pendingSubmissions.length,
        approvedProfiles: approvedProfilesList.length,
        totalLikes: profileStats.totalLikes,
        todaySubmissions,
        weeklyGrowth: Math.floor(Math.random() * 15) + 5, // Mock data
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      addToast({
        type: "error",
        title: "Dashboard Error",
        message: "Failed to load dashboard data",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort profiles based on search criteria
  const getFilteredProfiles = () => {
    let filtered = [...profiles];

    // Search by name, username, or bio
    if (searchFilters.searchTerm) {
      const term = searchFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (profile) =>
          profile.githubData.name?.toLowerCase().includes(term) ||
          profile.githubData.username.toLowerCase().includes(term) ||
          profile.githubData.bio?.toLowerCase().includes(term)
      );
    }

    // Filter by minimum followers
    if (searchFilters.minFollowers > 0) {
      filtered = filtered.filter(
        (profile) =>
          (profile.githubData.followers || 0) >= searchFilters.minFollowers
      );
    }

    // Filter by minimum repositories
    if (searchFilters.minRepos > 0) {
      filtered = filtered.filter(
        (profile) =>
          (profile.githubData.public_repos || 0) >= searchFilters.minRepos
      );
    }

    // Filter by featured status
    if (searchFilters.featured !== null) {
      filtered = filtered.filter(
        (profile) => profile.featured === searchFilters.featured
      );
    }

    // Sort profiles
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (searchFilters.sortBy) {
        case "name":
          aValue = (a.githubData.name || a.githubData.username).toLowerCase();
          bValue = (b.githubData.name || b.githubData.username).toLowerCase();
          break;
        case "followers":
          aValue = a.githubData.followers || 0;
          bValue = b.githubData.followers || 0;
          break;
        case "repos":
          aValue = a.githubData.public_repos || 0;
          bValue = b.githubData.public_repos || 0;
          break;
        case "likes":
          aValue = a.likes || 0;
          bValue = b.likes || 0;
          break;
        case "date":
          aValue = new Date(a.submittedAt).getTime();
          bValue = new Date(b.submittedAt).getTime();
          break;
        default:
          aValue = a.githubData.followers || 0;
          bValue = b.githubData.followers || 0;
      }

      if (searchFilters.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const handleBulkAction = async (action: "approve" | "reject") => {
    if (selectedItems.length === 0) return;

    setActionLoading("bulk");
    try {
      const promises = selectedItems.map((id) =>
        action === "approve" ? approveSubmission(id) : rejectSubmission(id)
      );

      await Promise.all(promises);

      addToast({
        type: "success",
        title: `Bulk ${action === "approve" ? "Approval" : "Rejection"}`,
        message: `${selectedItems.length} submissions ${action}d successfully`,
        duration: 5000,
      });

      setSelectedItems([]);
      await loadDashboardData();
    } catch (error) {
      console.error(`Error in bulk ${action}:`, error);
      addToast({
        type: "error",
        title: "Bulk Action Failed",
        message: `Failed to ${action} selected submissions`,
        duration: 4000,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleSingleAction = async (
    submissionId: string,
    action: "approve" | "reject"
  ) => {
    setActionLoading(submissionId);
    try {
      if (action === "approve") {
        await approveSubmission(submissionId);
      } else {
        await rejectSubmission(submissionId);
      }

      addToast({
        type: "success",
        title: `Submission ${action === "approve" ? "Approved" : "Rejected"}`,
        message: "Action completed successfully",
        duration: 4000,
      });

      await loadDashboardData();
    } catch (error) {
      console.error(`Error ${action}ing submission:`, error);
      addToast({
        type: "error",
        title: "Action Failed",
        message: `Failed to ${action} submission`,
        duration: 4000,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.githubData.username
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      submission.githubData.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || submission.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage profiles and submissions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: Activity },
              { id: "submissions", label: "Submissions", icon: Clock },
              { id: "profiles", label: "Profiles", icon: Users },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === id
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === "dashboard" && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Stats Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Total Profiles</p>
                      <p className="text-2xl font-bold">
                        {stats.approvedProfiles}
                      </p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100 text-sm">Pending Review</p>
                      <p className="text-2xl font-bold">
                        {stats.pendingReview}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Likes</p>
                      <p className="text-2xl font-bold">{stats.totalLikes}</p>
                    </div>
                    <Heart className="w-8 h-8 text-green-200" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">
                        Today's Submissions
                      </p>
                      <p className="text-2xl font-bold">
                        {stats.todaySubmissions}
                      </p>
                    </div>
                    <Zap className="w-8 h-8 text-purple-200" />
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {submissions.slice(0, 5).map((submission, index) => (
                    <div
                      key={submission.id}
                      className="flex items-center space-x-3"
                    >
                      <img
                        src={submission.githubData.avatar_url}
                        alt={submission.githubData.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">
                          New submission from{" "}
                          <strong>{submission.githubData.username}</strong>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(submission.submittedAt)}
                        </p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full">
                        Pending
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="p-6">
              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search submissions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                {selectedItems.length > 0 && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBulkAction("approve")}
                      disabled={actionLoading === "bulk"}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve ({selectedItems.length})</span>
                    </button>
                    <button
                      onClick={() => handleBulkAction("reject")}
                      disabled={actionLoading === "bulk"}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject ({selectedItems.length})</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Submissions List */}
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(submission.id!)}
                        onChange={() => toggleSelection(submission.id!)}
                        className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />

                      <img
                        src={submission.githubData.avatar_url}
                        alt={submission.githubData.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600"
                      />

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {submission.githubData.name ||
                              submission.githubData.username}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            @{submission.githubData.username}
                          </span>
                        </div>

                        {submission.githubData.bio && (
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {submission.githubData.bio}
                          </p>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>
                              {submission.githubData.followers} followers
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <GitBranch className="w-4 h-4" />
                            <span>
                              {submission.githubData.public_repos} repos
                            </span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(submission.submittedAt)}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <a
                          href={submission.githubData.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>

                        <button
                          onClick={() =>
                            handleSingleAction(submission.id!, "reject")
                          }
                          disabled={actionLoading === submission.id}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                        >
                          <X className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() =>
                            handleSingleAction(submission.id!, "approve")
                          }
                          disabled={actionLoading === submission.id}
                          className="p-2 text-green-500 hover:text-green-700 transition-colors disabled:opacity-50"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredSubmissions.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No submissions found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      No submissions match your current filters
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "profiles" && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Profile Management
                </h3>
                <AdvancedSearch
                  onSearchChange={setSearchFilters}
                  totalResults={getFilteredProfiles().length}
                />
              </div>

              {/* Profile Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredProfiles().map((profile) => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={profile.githubData.avatar_url}
                        alt={profile.githubData.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                          {profile.githubData.name ||
                            profile.githubData.username}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          @{profile.githubData.username}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{profile.githubData.followers || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <GitBranch className="w-3 h-3" />
                            <span>{profile.githubData.public_repos || 0}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3" />
                            <span>{profile.likes || 0}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {profile.featured && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400">
                          <Star className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="p-6">
              <AnalyticsDashboard
                profiles={profiles}
                submissions={submissions}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
