import React from 'react';
import Link from '@docusaurus/Link';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaStackOverflow,
  FaMedium,
  // FaHashnod÷e,
  FaExternalLinkAlt,
  FaRss,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiBluesky, SiSubstack } from 'react-icons/si';
import styles from './styles.module.css';

const SocialIcons = {
  github: FaGithub,
  twitter: FaTwitter,
  x: FaXTwitter,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  youtube: FaYoutube,
  facebook: FaFacebook,
  stackoverflow: FaStackOverflow,
  medium: FaMedium,
  // hashnode: FaHashn÷ode,
  newsletter: SiSubstack,
  substack: SiSubstack,
  bluesky: SiBluesky,
  rss: FaRss,
};

export default function BlogPostAuthorSocials({author}) {
  const {socials} = author;
  if (!socials) {
    return null;
  }

  const renderSocialLink = (platform, handle) => {
    const Icon = SocialIcons[platform.toLowerCase()] || FaExternalLinkAlt;
    let href = handle;

    if (!handle.startsWith('http')) {
      switch (platform.toLowerCase()) {
        case 'github':
          href = `https://github.com/${handle}`;
          break;
        case 'twitter':
        case 'x':
          href = `https://x.com/${handle}`;
          break;
        case 'linkedin':
          href = `https://www.linkedin.com/in/${handle}`;
          break;
        case 'instagram':
          href = `https://www.instagram.com/${handle}`;
          break;
        case 'youtube':
          href = `https://www.youtube.com/@${handle}`;
          break;
        case 'facebook':
          href = `https://www.facebook.com/${handle}`;
          break;
        case 'medium':
          href = `https://medium.com/@${handle}`;
          break;
        case 'hashnode':
          href = `https://hashnode.com/@${handle}`;
          break;
        case 'stackoverflow':
          href = `https://stackoverflow.com/users/${handle}`;
          break;
        case 'bluesky':
          href = `https://bsky.app/profile/${handle}`;
          break;
        default:
          break;
      }
    }

    return (
      <Link
        key={platform}
        href={href}
        className={styles.socialLink}
        title={platform.charAt(0).toUpperCase() + platform.slice(1)}>
        <Icon />
      </Link>
    );
  };

  return (
    <div className={styles.socials}>
      {Object.entries(socials).map(([platform, handle]) =>
        renderSocialLink(platform, handle),
      )}
    </div>
  );
}
