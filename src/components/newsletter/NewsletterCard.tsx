// NewsletterCard.tsx
import React from "react";
import { FaHeart, FaShare, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { Post } from "@site/src/data/posts";

interface CardProps {
  post: Post;
  isLiked: boolean;
  isSaved: boolean;
  onLikeToggle: () => void;
  onSaveToggle: () => void;
}

const NewsletterCard: React.FC<CardProps> = ({
  post,
  isLiked,
  isSaved,
  onLikeToggle,
  onSaveToggle,
}) => {
  const handleShare = () => {
    
    const shareUrl = `${window.location.href}?id=${post.id}`;
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.summary, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="rounded-xl shadow-md p-4 bg-white hover:shadow-xl transform hover:scale-[1.02] transition duration-300 bg-white/80 backdrop-blur-md rounded-lg p-6 shadow">
      
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        {/*clickable title*/}
        <a 
          href={post.link}
          target="_balnk"
          rel="noopener noreferrer"
          className="block hover:scale-105 transition-transform duration-300"
          >
        <h3 className="text-xl font-semibold">{post.title}</h3>
        </a>
        <p className="flex justify-between text-sm text-gray-500 mb-2">
          {new Date(post.date).toLocaleDateString()} • {post.author}
        </p>
        <p className="text-gray-700 mb-2">{post.summary}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {post.tags.map((tg) => (
            <span key={tg} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {tg}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-3">
            <button
              data-tooltip-id={`like-${post.id}`}
              onClick={onLikeToggle}
              className={`text-lg transition ${isLiked ? "text-red-500" : "text-gray-500"}`}
            >
              <FaHeart />
            </button>
            <Tooltip id={`like-${post.id}`} content="Like" />

            <button
              data-tooltip-id={`save-${post.id}`}
              onClick={onSaveToggle}
              className="text-lg text-gray-500 hover:text-blue-600"
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
            <Tooltip id={`save-${post.id}`} content={isSaved ? "Unsave" : "Save for later"} />
          </div>

          <button
            data-tooltip-id={`share-${post.id}`}
            onClick={handleShare}
            className="text-lg text-gray-500 hover:text-gray-700 transition"
          >
            <FaShare />
          </button>
          <Tooltip id={`share-${post.id}`} content="Share" />
        </div>
      </div>
    </div>
  );
};

export default NewsletterCard;
