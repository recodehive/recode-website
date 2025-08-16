import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ThumbsUp, Calendar, Tag, User } from "lucide-react";

export interface Discussion {
  id: string;
  title: string;
  body: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  category: {
    name: string;
    emoji: string;
  };
  created_at: string;
  updated_at: string;
  comments: number;
  reactions: {
    total_count: number;
  };
  html_url: string;
  labels: Array<{
    name: string;
    color: string;
  }>;
}

interface DiscussionCardProps {
  discussion: Discussion;
  index: number;
}

export default function DiscussionCard({
  discussion,
  index,
}: DiscussionCardProps): JSX.Element {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count.toString();
  };

  return (
    <motion.div
      className="discussion-card-new"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
    >
      <div className="discussion-card-header">
        <div className="discussion-category-badge">
          <Tag size={14} />
          <span>{discussion.category.name}</span>
        </div>
        <div className="discussion-date-badge">
          <Calendar size={14} />
          <span>{formatDate(discussion.created_at)}</span>
        </div>
      </div>

      <div className="discussion-main-content">
        <h3 className="discussion-title-new">
          <a
            href={discussion.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {discussion.title}
          </a>
        </h3>

        {discussion.body && (
          <p className="discussion-excerpt">
            {truncateText(
              discussion.body.replace(/[#*`\[\]]/g, "").replace(/\n/g, " "),
              150
            )}
          </p>
        )}

        {discussion.labels.length > 0 && (
          <div className="discussion-keywords">
            {discussion.labels.slice(0, 4).map((label, idx) => (
              <span key={idx} className="keyword-tag">
                {label.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="discussion-card-footer">
        <div className="discussion-author-info">
          {discussion.author.avatar_url ? (
            <img
              src={discussion.author.avatar_url}
              alt={discussion.author.login}
              className="author-avatar-small"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = target.nextElementSibling;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="author-avatar-fallback"
            style={{ display: discussion.author.avatar_url ? 'none' : 'flex' }}
          >
            {discussion.author.login.charAt(0).toUpperCase()}
          </div>
          <span className="author-name-new">{discussion.author.login}</span>
        </div>

        <div className="discussion-engagement">
          <div className="engagement-item">
            <MessageCircle size={16} />
            <span>{formatCount(discussion.comments)}</span>
          </div>
          <div className="engagement-item">
            <ThumbsUp size={16} />
            <span>{formatCount(discussion.reactions.total_count)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
