import React from 'react';
import { Twitter, Linkedin, Facebook, Share2 } from 'lucide-react';

interface SocialShareProps {
  title: string;
  description?: string;
  permalink: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({
  title,
  description,
  permalink,
  className = ''
}) => {
  const shareUrl = `https://www.recodehive.com${permalink}`;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=recodehive`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className={`social-share ${className}`}>
      <h4 className="social-share-title">Share this post</h4>
      <div className="social-share-buttons">
        <button
          className="social-share-button twitter"
          onClick={() => handleShare('twitter')}
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <Twitter size={18} />
          <span>Twitter</span>
        </button>

        <button
          className="social-share-button linkedin"
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin size={18} />
          <span>LinkedIn</span>
        </button>

        <button
          className="social-share-button facebook"
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook size={18} />
          <span>Facebook</span>
        </button>

        {navigator.share && (
          <button
            className="social-share-button native"
            onClick={handleNativeShare}
            aria-label="Share"
            title="Share"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default SocialShare;