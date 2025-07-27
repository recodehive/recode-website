import React from 'react';
// import './TeamSidebar.css'; // optional: for styling

const contributors = [
  {
    name: 'Anushka Kalbande',
    username: 'anushka23g',
    profile: 'https://github.com/anushka23g',
    avatar: 'https://avatars.githubusercontent.com/anushka23g',
  },
  {
    name: 'Samridha Das',
    username: 'Samridha0305',
    profile: 'https://github.com/Samridha0305',
    avatar: 'https://avatars.githubusercontent.com/Samridha0305',
  },
  {
    name: 'Aryan',
    username: 'aryan2658',
    profile: 'https://github.com/aryan2658',
    avatar: 'https://avatars.githubusercontent.com/aryan2658',
  },
  {
    name: 'Anirudh Rao',
    username: 'anirudh-rao',
    profile: 'https://github.com/anirudh-rao',
    avatar: 'https://avatars.githubusercontent.com/anirudh-rao',
  },
];

const TeamSidebar: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#f4f4f4',
      padding: '1rem',
      borderRadius: '8px',
      width: '100%',
      marginTop: '2rem'
    }}>
      <h3 style={{ textAlign: 'center' }}>Top Contributors</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {contributors.map((contributor, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <img
              src={contributor.avatar}
              alt={contributor.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '0.75rem' }}
            />
            <a
              href={contributor.profile}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}
            >
              {contributor.name} (@{contributor.username})
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamSidebar;
