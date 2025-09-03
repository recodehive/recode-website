import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ExternalLink, MapPin, Building, Calendar } from "lucide-react";
import type { DevfolioProfile } from "../../types/devfolio";

interface ProfileCardProps {
  profile: DevfolioProfile;
  onLike?: (profileId: string) => void;
  isLiked?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onLike,
  isLiked = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { githubData } = profile;

  const handleLike = () => {
    onLike?.(profile.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative rounded-xl overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl"
    >
      {/* Featured Badge */}
      {profile.featured && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ⭐ Featured
          </div>
        </div>
      )}

      {/* Header with Avatar */}
      <div className="relative h-32 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute -bottom-8 left-6">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={githubData.avatar_url}
            alt={githubData.name}
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="pt-12 p-6">
        {/* Name and Username */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {githubData.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            @{githubData.username}
          </p>
        </div>

        {/* Bio */}
        {githubData.bio && (
          <p className="text-sm mb-4 line-clamp-2 text-gray-700 dark:text-gray-300">
            {githubData.bio}
          </p>
        )}

        {/* Meta Information */}
        <div className="space-y-2 mb-4">
          {githubData.location && (
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">
                {githubData.location}
              </span>
            </div>
          )}
          {githubData.company && (
            <div className="flex items-center text-sm">
              <Building className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">
                {githubData.company}
              </span>
            </div>
          )}
          <div className="flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-gray-600 dark:text-gray-400">
              Joined {formatDate(githubData.created_at)}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              {githubData.public_repos}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Repos
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

        {/* Tags */}
        {profile.tags && profile.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {profile.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
            {profile.tags.length > 3 && (
              <span className="text-xs text-gray-600 dark:text-gray-400">
                +{profile.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
              isLiked
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{profile.likes}</span>
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={githubData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600"
          >
            <span className="text-sm">View Profile</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 pointer-events-none"
      />
    </motion.div>
  );
};

export default ProfileCard;
