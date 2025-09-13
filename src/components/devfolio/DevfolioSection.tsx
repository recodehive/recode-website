import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Star, Github, Database, Shield } from "lucide-react";
import ProfileCard from "./ProfileCard";
import SubmissionModal from "./SubmissionModal";
import AdminDashboard from "./AdminDashboard";
import {
  getApprovedProfiles,
  getFeaturedProfiles,
  getUserLikes,
  toggleLike,
} from "../../lib/firestore";
import { ToastProvider, useToast } from "../ui/Toast";
import type { DevfolioProfile } from "../../types/devfolio";

const DevfolioSectionContent: React.FC = () => {
  const { addToast } = useToast();
  const [profiles, setProfiles] = useState<DevfolioProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<DevfolioProfile[]>(
    []
  );
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);

  // Simulate user ID for now (in real app, this would come from auth)
  const currentUserId = "anonymous_user";

  // Sample data for initial display if no real data exists
  const sampleProfiles: DevfolioProfile[] = useMemo(
    () => [
      {
        id: "sample-1",
        githubData: {
          id: "sample-1",
          username: "octocat",
          name: "The Octocat",
          bio: "GitHub mascot and developer advocate",
          avatar_url: "https://github.com/octocat.png",
          html_url: "https://github.com/octocat",
          public_repos: 42,
          followers: 1000,
          following: 100,
          location: "San Francisco",
          company: "GitHub",
          created_at: "2008-01-01T00:00:00Z",
        },
        status: "approved",
        likes: 128,
        submittedAt: "2024-01-01T00:00:00Z",
        approvedAt: "2024-01-02T00:00:00Z",
        featured: true,
        tags: ["react", "typescript", "github"],
      },
      {
        id: "sample-2",
        githubData: {
          id: "sample-2",
          username: "torvalds",
          name: "Linus Torvalds",
          bio: "Creator of Linux and Git",
          avatar_url: "https://github.com/torvalds.png",
          html_url: "https://github.com/torvalds",
          public_repos: 6,
          followers: 170000,
          following: 0,
          location: "Portland, OR",
          company: "Linux Foundation",
          created_at: "2009-01-01T00:00:00Z",
        },
        status: "approved",
        likes: 856,
        submittedAt: "2024-01-01T00:00:00Z",
        approvedAt: "2024-01-02T00:00:00Z",
        featured: true,
        tags: ["linux", "kernel", "c"],
      },
      {
        id: "sample-3",
        githubData: {
          id: "sample-3",
          username: "gaearon",
          name: "Dan Abramov",
          bio: "React Core Team at Meta",
          avatar_url: "https://github.com/gaearon.png",
          html_url: "https://github.com/gaearon",
          public_repos: 118,
          followers: 95000,
          following: 171,
          location: "London, UK",
          company: "Meta",
          created_at: "2011-01-01T00:00:00Z",
        },
        status: "approved",
        likes: 324,
        submittedAt: "2024-01-01T00:00:00Z",
        approvedAt: "2024-01-02T00:00:00Z",
        featured: false,
        tags: ["react", "javascript", "redux"],
      },
    ],
    []
  );

  useEffect(() => {
    loadProfiles();
    loadUserLikes();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const fetchedProfiles = await getApprovedProfiles();
      setProfiles(fetchedProfiles);
    } catch (error) {
      console.error("Error loading profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserLikes = async () => {
    try {
      const likes = await getUserLikes(currentUserId);
      setUserLikes(likes);
    } catch (error) {
      console.error("Error loading user likes:", error);
    }
  };

  const filterProfiles = useCallback(() => {
    console.log("🔍 filterProfiles called with:", {
      profilesLength: profiles.length,
      searchTerm,
      showFeaturedOnly,
    });

    // Use real profiles if available, otherwise use sample profiles for filtering
    let filtered = profiles.length > 0 ? profiles : sampleProfiles;

    if (showFeaturedOnly) {
      filtered = filtered.filter((profile) => profile.featured);
      console.log("📌 After featured filter:", filtered.length);
    }

    if (searchTerm) {
      console.log("🔎 Applying search filter for:", searchTerm);
      filtered = filtered.filter(
        (profile) =>
          profile.githubData.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          profile.githubData.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (profile.githubData.bio &&
            profile.githubData.bio
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
      console.log("🔎 After search filter:", filtered.length);
    }

    console.log("✅ Setting filtered profiles:", filtered.length);
    setFilteredProfiles(filtered);
  }, [profiles, sampleProfiles, searchTerm, showFeaturedOnly]);

  useEffect(() => {
    filterProfiles();
  }, [filterProfiles]);

  const handleSubmitProfile = () => {
    setShowSubmissionModal(true);
  };

  const handleLike = async (profileId: string) => {
    try {
      const isLiked = await toggleLike(profileId, currentUserId);

      // Update local state
      if (isLiked) {
        setUserLikes((prev) => [...prev, profileId]);
        addToast({
          type: "success",
          title: "Profile Liked!",
          message: "Added to your favorites",
          duration: 3000,
        });
      } else {
        setUserLikes((prev) => prev.filter((id) => id !== profileId));
        addToast({
          type: "info",
          title: "Profile Unliked",
          message: "Removed from your favorites",
          duration: 3000,
        });
      }

      // Update profile likes count in local state
      setProfiles((prev) =>
        prev.map((profile) =>
          profile.id === profileId
            ? { ...profile, likes: profile.likes + (isLiked ? 1 : -1) }
            : profile
        )
      );
    } catch (error) {
      console.error("Error liking profile:", error);
      addToast({
        type: "error",
        title: "Error",
        message: "Failed to update like status",
        duration: 4000,
      });
    }
  };

  // Use filtered profiles for display
  const displayProfiles =
    profiles.length > 0 ? filteredProfiles : filteredProfiles;

  console.log("📊 Display logic:", {
    profilesLength: profiles.length,
    filteredProfilesLength: filteredProfiles.length,
    displayProfilesLength: displayProfiles.length,
    searchTerm,
    showFeaturedOnly,
  });

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-4"
        >
          🚀 Developer Showcase
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white px-4"
        >
          Awesome GitHub Profiles
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl mb-4 text-center tracking-tight font-normal bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-700 to-black dark:from-white dark:via-gray-300 dark:to-white px-4"
        >
          Discover amazing developers from our community. Get inspired by their
          work and creativity.
        </motion.p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmitProfile}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Your GitHub Profile</span>
          </motion.button>

          {/* Development Only: Admin Panel Button */}
          {process.env.NODE_ENV === "development" && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAdminDashboard(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>Admin Dashboard</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
          />
        </div>

        {/* Featured Filter */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-300 ${
            showFeaturedOnly
              ? "bg-yellow-500 text-white border-yellow-500"
              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-yellow-500 dark:hover:border-yellow-500"
          }`}
        >
          <Star
            className={`w-5 h-5 ${showFeaturedOnly ? "fill-current" : ""}`}
          />
          <span>Featured</span>
        </motion.button>
      </motion.div>

      {/* GitHub API Rate Limit Warning */}
      {profiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center">
                <span className="text-amber-600 dark:text-amber-400">⚠️</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                GitHub API Rate Limit
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                GitHub API requests are limited. Showing demo profiles to
                maintain functionality. Real profiles will load when the rate
                limit resets.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <div className="p-4 rounded-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {displayProfiles.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Profiles
          </div>
        </div>
        <div className="p-4 rounded-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {displayProfiles.filter((p) => p.featured).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Featured
          </div>
        </div>
        <div className="p-4 rounded-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {displayProfiles.reduce((sum, p) => sum + p.likes, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Likes
          </div>
        </div>
        <div className="p-4 rounded-lg text-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {displayProfiles.reduce(
              (sum, p) => sum + p.githubData.followers,
              0
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Followers
          </div>
        </div>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Profiles Grid */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {displayProfiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ProfileCard
                profile={profile}
                onLike={handleLike}
                isLiked={userLikes.includes(profile.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* No Real Data Notice */}
      {!loading && profiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <Database className="w-12 h-12 mx-auto mb-3 text-blue-500" />
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            No Database Data Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Showing sample data. Real profiles will appear when they are
            submitted and approved.
          </p>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading &&
        displayProfiles.length === 0 &&
        (searchTerm || showFeaturedOnly) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Github className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              No profiles found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}

      {/* Submission Modal */}
      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
      />

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={showAdminDashboard}
        onClose={() => setShowAdminDashboard(false)}
      />
    </div>
  );
};

const DevfolioSection: React.FC = () => {
  return (
    <ToastProvider>
      <DevfolioSectionContent />
    </ToastProvider>
  );
};

export default DevfolioSection;
