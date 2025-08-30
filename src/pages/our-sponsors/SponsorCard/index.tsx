import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import './SponsorCard.css';

interface SponsorCardProps {
  name: string;
  image: string;
  description: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  featured?: boolean;
  category?: string
}

const SponsorCard: React.FC<SponsorCardProps> = ({
  name,
  image,
  description,
  github,
  linkedin,
  twitter,
  instagram,
  featured = false,
  category
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const socialLinks = [
    { url: github, icon: FaGithub, label: 'GitHub', color: '#333' },
    { url: linkedin, icon: FaLinkedin, label: 'LinkedIn', color: '#0077B5' },
    { url: twitter, icon: FaTwitter, label: 'Twitter', color: '#1DA1F2' },
    { url: instagram, icon: FaInstagram, label: 'Instagram', color: '#E4405F' },
  ].filter(link => link.url && link.url !== '#');

  return (
    <div 
      className={`enhanced-sponsor-card`}
      
    >
      {/* Tier Badge */}
      

      {/* Avatar Section */}
      <div className="sponsor-avatar-section">
        <div className="sponsor-avatar">
          {image ? (
            <img src={image} alt={name} className="avatar-image" />
          ) : (
            <div className="avatar-placeholder">
              <span className="avatar-initials">{getInitials(name)}</span>
            </div>
          )}
        </div>
        {featured && (
          <div className="featured-badge">
            <span className="featured-icon">⭐</span>
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="sponsor-content">
        <h3 className="sponsor-name">{name}</h3>
        <p className="sponsor-description">{description}</p>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="sponsor-social-links">
            <div className="social-links-header">
              <span className="social-label">Connect:</span>
            </div>
            <div className="social-icons">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={`${name} on ${link.label}`}
                    style={{ '--social-color': link.color } as React.CSSProperties}
                  >
                    <IconComponent className="social-icon" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Appreciation Message */}
        {category != 'we-sponsor' &&
          <div className="appreciation-message">
          <span className="appreciation-icon">🙏</span>
          <span className="appreciation-text">Thank you for your support!</span>
        </div>
        }
        
      </div>

      {/* Card Effects */}
      <div className="card-glow"></div>
    </div>
  );
};

export default SponsorCard;
