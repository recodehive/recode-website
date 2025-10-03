import { Sponsor } from '@site/src/database/sponsors';
import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const SponsorCard: React.FC<Sponsor> = ({
  name,
  image,
  description,
  github,
  linkedin,
  twitter,
  instagram,
}) => {
  return (
    <div className="sponsor-card">
      <div className="avatar-wrapper">
        <img src={image} alt={name} />
      </div>
      <h3 className="sponsor-name">{name}</h3>
      <p className="sponsor-desc">{description}</p>
      <div className="social-links">
        {github && <a href={github} target="_blank" rel="noopener noreferrer" className="github"><FaGithub /></a>}
        {linkedin && <a href={linkedin} target="_blank" rel="noopener noreferrer" className="linkedin"><FaLinkedin /></a>}
        {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" className="twitter"><FaXTwitter /></a>}
        {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="instagram"><FaInstagram /></a>}
      </div>
    </div>
  );
};

export default SponsorCard;