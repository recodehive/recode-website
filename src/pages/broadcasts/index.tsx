import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import type { ReactElement } from 'react';
import { useHistory } from '@docusaurus/router';
import './index.css';

interface VideoData {
  id: string;
  youtubeUrl: string;
  type: 'video' | 'live' | 'other';
}

const getYoutubeVideoId = (url: string): string => {
  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?&\s]+)/);
    return match ? match[1].split('?')[0] : '';
  }
  if (url.includes('youtube.com/watch')) {
    const match = url.match(/[?&]v=([^&\s]+)/);
    return match ? match[1].split('&')[0] : '';
  }
  if (url.includes('youtube.com/shorts/')) {
    const match = url.match(/shorts\/([^?&\s]+)/);
    return match ? match[1].split('?')[0] : '';
  }
  return '';
};

const getYoutubeContentType = (url: string): 'video' | 'live' | 'other' => {
  if (url.includes('youtu.be/rbi6XhWp2TU') || url.includes('youtu.be/aGyfIrxx1H8') || 
      url.includes('youtu.be/vFS6ZU1WAPA') || url.includes('youtu.be/DWxyEl-t48g')) {
    return 'live';
  } else if (url.includes('/shorts/')) {
    return 'other';
  } else {
    return 'video';
  }
};

const videoUrls: string[] = [
  "https://youtu.be/dQJ1rUaQndw",
  "https://youtu.be/qwyky7AC1hs",
  "https://youtu.be/3dnQ2lDNeGI?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/XWjx-RjmhRM?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/R7NReLBCT_8?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/sbyXpflAXkQ?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/7uKMWBFN2jQ?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/v2Pai1TY_Lg?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/P-P3L7YzlyE?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/BNKSlT8jLQ0?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/GnHNScuGKrg?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/RSR5E1bhu5Y?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/knr5gBv-c9c?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/4JX-SIkM3uk?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtu.be/V2nvZYe_q7g?list=PLrLTYhoDFx-kiuFiGQqVpYYZ56pIhUW63",
  "https://youtube.com/shorts/FnmCbbvmFno?si=ImmFzrNiN9rYntAP",
  "https://youtube.com/shorts/Y0vxk5m1pSU?si=SZWiKkIHM17_37bA",
  "https://youtu.be/rbi6XhWp2TU",
  "https://youtu.be/aGyfIrxx1H8",
  "https://youtu.be/GTe2DJQ-enU",
  "https://youtu.be/vFS6ZU1WAPA",
  "https://youtu.be/DWxyEl-t48g",
];

const VideoCard: React.FC<{
  video: VideoData;
  onClick: (video: VideoData, event: React.MouseEvent | React.KeyboardEvent) => void;
}> = ({ video, onClick }) => {
  const [title, setTitle] = useState('Loading...');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const videoId = getYoutubeVideoId(video.youtubeUrl);

  const tryThumbnailUrl = (url: string) => {
    if (!videoId) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (img.width > 0 && img.height > 0) {
        setThumbnailUrl(url);
      } else {
        handleThumbnailError(url);
      }
    };
    img.onerror = () => handleThumbnailError(url);
    img.src = url;
  };

  const handleThumbnailError = (failedUrl: string) => {
    if (failedUrl.includes('maxresdefault')) {
      tryThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    } else if (failedUrl.includes('hqdefault')) {
      tryThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);
    } else if (failedUrl.includes('mqdefault')) {
      tryThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/default.jpg`);
    } else {
      setThumbnailUrl('');
    }
  };

  useEffect(() => {
    if (!videoId) return;
    tryThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);

    const fetchVideoTitle = async () => {
      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(video.youtubeUrl)}&format=json`
        );
        const data = await response.json();
        setTitle(data.title);
      } catch (error) {
        setTitle('Video Title Unavailable');
        console.error('Error fetching video title:', error);
      }
    };
    fetchVideoTitle();
  }, [video.youtubeUrl, videoId]);

  const getTypeLabel = () => {
    switch (video.type) {
      case 'live':
        return '🔴 Live';
      case 'other':
        return '📱 Short';
      default:
        return '🎥 Video';
    }
  };

  return (
    <div
      className="broadcast-card"
      onClick={(e) => onClick(video, e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(video, e);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="card-category">{getTypeLabel()}</div>
      <div className="card-image">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={title} loading="lazy" />
        ) : (
          <div className="thumbnail-placeholder">
            <span>🎬</span>
            <span>Loading thumbnail...</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-meta">
          <span className="video-type">{getTypeLabel()}</span>
        </div>
      </div>
    </div>
  );
};

export default function Broadcasts(): ReactElement {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'live' | 'other'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const videos: VideoData[] = videoUrls.map((url, index) => ({
    id: `video-${index}`,
    youtubeUrl: url,
    type: getYoutubeContentType(url),
  }));

  const filteredVideos = videos.filter((video) => {
    if (activeTab === 'all') return true;
    return video.type === activeTab;
  });

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  // Updated handleVideoClick to navigate to details page instead of opening YouTube
  const handleVideoClick = (video: VideoData) => {
    history.push('/broadcasts/details', { video });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <Layout
      title="Broadcasts"
      description="Watch our curated collection of videos, shorts, and live streams"
    >
      <div className="broadcast-page">
        {/* Hero Section */}
        <section className="broadcast-hero-section">
          <div className="floating-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
          </div>
          <div className="broadcast-hero-container">
            <div className="hero-content">
              <h1 className="broadcast-main-title">
                Featured <span className="gradient-text">Content</span>
              </h1>
              <p className="broadcast-main-subtitle">
                Watch our curated collection of videos and shorts
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">{videos.length}</span>
                  <span className="stat-label">Total Videos</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">
                    {videos.filter((v) => v.type === 'video').length}
                  </span>
                  <span className="stat-label">Videos</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">
                    {videos.filter((v) => v.type === 'live').length}
                  </span>
                  <span className="stat-label">Live Streams</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="latest-broadcasts-section">
          <div className="broadcasts-container">
            <div className="section-header">
              <h2 className="section-title">Latest Content</h2>
              <p className="section-subtitle">
                Explore tutorials, live streams, and quick tips
              </p>
            </div>

            {/* Tabs */}
            <div className="broadcast-tabs">
              <button
                className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({videos.length})
              </button>
              <button
                className={`tab-button ${activeTab === 'video' ? 'active' : ''}`}
                onClick={() => setActiveTab('video')}
              >
                Videos ({videos.filter((v) => v.type === 'video').length})
              </button>
              <button
                className={`tab-button ${activeTab === 'live' ? 'active' : ''}`}
                onClick={() => setActiveTab('live')}
              >
                Live ({videos.filter((v) => v.type === 'live').length})
              </button>
              <button
                className={`tab-button ${activeTab === 'other' ? 'active' : ''}`}
                onClick={() => setActiveTab('other')}
              >
                Shorts ({videos.filter((v) => v.type === 'other').length})
              </button>
            </div>

            {/* Grid */}
            <div className="broadcasts-grid">
              {currentVideos.map((video) => (
                <VideoCard key={video.id} video={video} onClick={handleVideoClick} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  <span className="pagination-arrow">←</span>
                  <span>Previous</span>
                </button>
                <span className="pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  <span>Next</span>
                  <span className="pagination-arrow">→</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
