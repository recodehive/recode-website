import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import type { ReactElement } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import './details.css';

interface VideoData {
  id: string;
  youtubeUrl: string;
  type: 'video' | 'live' | 'other';
}

interface LocationState {
  video: VideoData;
}

const getYoutubeVideoId = (url: string): string => {
  let videoId = '';
  const normalMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  const shortsMatch = url.match(/youtube\.com\/shorts\/([^&\s]+)/);
  if (normalMatch) {
    videoId = normalMatch[1];
  } else if (shortsMatch) {
    videoId = shortsMatch[1];
  }
  return videoId;
};

export default function VideoDetails(): ReactElement {
  const location = useLocation();
  const history = useHistory();
  const state = location.state as LocationState;
  const video = state?.video;
  const [title, setTitle] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoTitle = async () => {
      if (!video?.youtubeUrl) return;
      try {
        const response = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(video.youtubeUrl)}&format=json`
        );
        const data = await response.json();
        setTitle(data.title);
      } catch (error) {
        setTitle('Video Title Unavailable');
        console.error('Error fetching video title:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideoTitle();
  }, [video?.youtubeUrl]);

  const descriptions = [
    'Watch engaging content that inspires and educates.',
    'Experience the power of visual storytelling.',
    'Join us on a journey of learning through video.',
    'Explore new concepts through dynamic video content.',
    'Get inspired by expert insights and demonstrations.',
    'Discover trending topics and timely tutorials.',
    'Learn from the best in the field.',
    'Stay updated with the latest trends and techniques.',
    'Enhance your skills through visual learning.',
  ];

  const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

  const getTypeLabel = () => {
    switch (video?.type) {
      case 'live':
        return '🔴 Live Stream';
      case 'other':
        return '📱 Short';
      default:
        return '🎥 Video';
    }
  };

  if (!video) {
    return (
      <Layout title="Video Not Found">
        <div className="video-details-page">
          <div className="error-container">
            <div className="error-icon">📹</div>
            <h1 className="error-title">Video Not Found</h1>
            <p className="error-message">
              Sorry, we couldn't find the video you're looking for.
            </p>
            <button onClick={() => history.push('/broadcasts')} className="back-button">
              <span className="button-arrow">←</span>
              <span>Back to Broadcasts</span>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const videoId = getYoutubeVideoId(video.youtubeUrl);

  return (
    <Layout title={title}>
      <div className="video-details-page">
        {/* Floating Background Elements */}
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
        </div>

        <div className="video-details-container">
          {/* Back Button */}
          <button onClick={() => history.push('/broadcasts')} className="back-button-top">
            <span className="button-arrow">←</span>
            <span>Back to Broadcasts</span>
          </button>
    
          {/* Video Player Section */}
          <div className="video-player-section">
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              />
            </div>
          </div>


        </div>
      </div>
    </Layout>
  );
}
