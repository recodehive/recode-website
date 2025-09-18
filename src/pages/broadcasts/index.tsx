import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import type { ReactElement } from 'react';
import { useHistory } from '@docusaurus/router';
import './video.css';

interface VideoData {
  id: string;
  youtubeUrl: string;
  type: 'video' | 'live' | 'other'; // Changed type to include 'live' and 'other'
}

const getYoutubeVideoId = (url: string): string => {
  // Handle youtu.be short links
  if (url.includes('youtu.be/')) {
    const match = url.match(/youtu\.be\/([^?&\s]+)/);
    return match ? match[1].split('?')[0] : '';
  }
  
  // Handle youtube.com/watch?v= links
  if (url.includes('youtube.com/watch')) {
    const match = url.match(/[?&]v=([^&\s]+)/);
    return match ? match[1].split('&')[0] : '';
  }
  
  // Handle youtube.com/shorts/ links
  if (url.includes('youtube.com/shorts/')) {
    const match = url.match(/shorts\/([^?&\s]+)/);
    return match ? match[1].split('?')[0] : '';
  }
  
  return '';
};

// Updated function to determine video type
const getYoutubeContentType = (url: string): 'video' | 'live' | 'other' => {
  if (url.includes('youtu.be/rbi6XhWp2TU') || url.includes('youtu.be/aGyfIrxx1H8') || url.includes('youtu.be/vFS6ZU1WAPA') || url.includes('youtu.be/DWxyEl-t48g')) {
    return 'live';
  } else if (url.includes('/shorts/')) {
    return 'other'; // Changed 'shorts' to 'other'
  } else {
    return 'video';
  }
};

// Youtube Video URLS
// List of both videos and shorts which will be handeled by the component
const videoUrls: string[] = [
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
  
  // Try different thumbnail qualities in sequence
  const tryThumbnailUrl = (url: string) => {
    if (!videoId) return;
    
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS if needed
    
    img.onload = () => {
      // Only set the URL if it's not an error image
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
    console.log(`Failed to load thumbnail: ${failedUrl}`);
    
    if (failedUrl.includes('maxresdefault')) {
      // Try hqdefault if maxresdefault fails
      tryThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    } else if (failedUrl.includes('hqdefault')) {
      // Try mqdefault if hqdefault fails
      tryThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);
    } else if (failedUrl.includes('mqdefault')) {
      // Try default if mqdefault fails
      tryThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/default.jpg`);
    } else {
      // All options failed, show placeholder
      setThumbnailUrl('');
    }
  };

  useEffect(() => {
    if (!videoId) return;
    
    // Start with the highest quality thumbnail
    console.log(`Loading thumbnails for video ID: ${videoId}`);
    tryThumbnailUrl(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
    
    // Also try the first frame as a fallback (sometimes works when others don't)
    const firstFrameUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    setTimeout(() => {
      if (!thumbnailUrl) {
        console.log('Trying first frame as fallback');
        tryThumbnailUrl(firstFrameUrl);
      }
    }, 1000);
    
    // Fetch video title
    const fetchVideoTitle = async () => {
      try {
        const response = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(video.youtubeUrl)}&format=json`);
        const data = await response.json();
        setTitle(data.title);
      } catch (error) {
        setTitle('Video Title Unavailable');
        console.error('Error fetching video title:', error);
      }
    };
    
    fetchVideoTitle();
  }, [video.youtubeUrl, videoId]);

  return (
    <div 
      className="video-card"
      onClick={(e) => onClick(video, e)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick(video, e);
      }}
    >
      <div className="video-content">
        <div className="video-info">
          <div className="video-title"style={{ color: '#333', fontWeight: '600' }}>{title}</div>
          <div className="video-type">
            
          </div>
        </div>
        <div className="video-thumbnail">
          <div className="thumbnail-container">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="thumbnail-img"
                style={{ objectFit: 'cover' }}
                loading="lazy"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  console.log('Image error:', img.src);
                  // Let the parent component handle the error
                  setThumbnailUrl('');
                }}
              />
            ) : (
              <div className="thumbnail-placeholder">
                <span>Loading thumbnail...</span>
              </div>
            )}
            {/* Play button removed as per request */}
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoSection: React.FC<{
  title: string;
  videos: VideoData[];
  onClick: (video: VideoData, event: React.MouseEvent | React.KeyboardEvent) => void;
}> = ({ title, videos, onClick }) => {
  if (videos.length === 0) return null;

  return (
    <div className="video-section">
      <h2>{title}</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onClick={onClick} />
        ))}
      </div>
    </div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}> = ({ currentPage, totalPages, setCurrentPage }) => (
  <div className="pagination">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
      title="Previous page"
    >
      ← Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
      title="Next page"
    >
      Next →
    </button>
  </div>
);

function BroadcastsPage(): ReactElement {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'videos' | 'live'>('videos'); // Changed 'shorts' to 'live'
  const videosPerPage = 12;

  const videoData: VideoData[] = videoUrls.map((url, index) => ({
    id: String(index + 1),
    youtubeUrl: url,
    type: getYoutubeContentType(url),
  }));

  const regularVideos = videoData.filter(video => video.type === 'video');
  const liveVideos = videoData.filter(video => video.type === 'live'); // Changed 'shorts' to 'live'
  const otherVideos = videoData.filter(video => video.type === 'other');

  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;

  const paginatedVideos = regularVideos.slice(indexOfFirstVideo, indexOfLastVideo);
  const paginatedLiveVideos = liveVideos.slice(indexOfFirstVideo, indexOfLastVideo); // Changed 'shorts' to 'live'
  const totalPages = Math.ceil((activeTab === 'videos' ? regularVideos.length : liveVideos.length) / videosPerPage); // Changed 'shorts' to 'live'

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handleVideoClick = (video: VideoData, event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'IFRAME' || target.className === 'video-embed') return;
    history.push('/broadcasts/details', { video });
  };

  return (
    <Layout>
      <div className="video-container">
        <h1>Featured Content</h1>
        <p className="video-subtitle">Watch our curated collection of videos and shorts</p>
        
        <div className="video-tabs">
          <button 
            className={`tab-button ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            🎥 Videos
          </button>
          <button 
            className={`tab-button ${activeTab === 'live' ? 'active' : ''}`} // Changed 'shorts' to 'live'
            onClick={() => setActiveTab('live')}
          >
            🔴 Past Live
          </button>
        </div>

        {activeTab === 'videos' && (
          <>
            <VideoSection
              title="Latest Videos"
              videos={paginatedVideos}
              onClick={handleVideoClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}

        {activeTab === 'live' && ( // Changed 'shorts' to 'live'
          <>
            <VideoSection
              title="Past Live Videos"
              videos={paginatedLiveVideos} // Changed 'shorts' to 'live'
              onClick={handleVideoClick}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </Layout>
  );
}

export default BroadcastsPage;