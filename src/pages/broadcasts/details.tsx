import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import type { ReactElement } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import './video.css';
import './index.css';
import './details.css';

interface VideoData {
  id: string;
  youtubeUrl: string;
  type: 'video' | 'shorts';
}

interface LocationState {
  video: VideoData;
}

// Function to extract YouTube video ID from URL
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
  const [title, setTitle] = useState<string>('Loading...');

  useEffect(() => {
    const fetchVideoTitle = async () => {
      if (!video?.youtubeUrl) return;
      
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
  }, [video?.youtubeUrl]);

  // Random descriptive text about videos
  const descriptions = [
    "Watch engaging content that inspires and educates.",
    "Experience the power of visual storytelling.",
    "Join us on a journey of learning through video.",
    "Explore new concepts through dynamic video content.",
    "Get inspired by expert insights and demonstrations.",
    "Discover trending topics and timely tutorials.",
    "Learn from the best in the field.",
    "Stay updated with the latest trends and techniques.",
    "Enhance your skills through visual learning.",
  ];

  // Get a random description
  const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

  if (!video) {
    return (
      <Layout>
        <div className="video-container">
          <h1>Video Not Found</h1>
          <p>Sorry, we couldn't find the video you're looking for.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="video-container">
        <div className="video-card details-card">
          <div className="video-content">
            <div className="video-info">
              <div className="video-title">
                <h1>{title}</h1>
                <div className="video-type">
                  {video.type === 'shorts' ? '📱 Shorts' : '🎥 Video'}
                </div>
              </div>
              <div className="video-description">
                <p>{randomDescription}</p>
              </div>
            </div>
            <div className="video-embed-large">
              <iframe
                src={`https://www.youtube.com/embed/${getYoutubeVideoId(video.youtubeUrl)}${video.type === 'shorts' ? '?loop=1' : ''}`}
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="eager"
                title={title}
              />
            </div>
            <div className="video-meta">
              <p>Watch in full screen for the best viewing experience</p>
            </div>
            <div className="pagination" style={{marginTop: '30px'}}>
              <button 
                onClick={() => history.push('/broadcasts')}
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  border: 'none'
                }}
              >
                ← Back to Videos
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
