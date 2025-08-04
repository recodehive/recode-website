import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import FirebaseAuthGithub from './FirebaseAuthGithub';

const NavbarFirebaseAuthGithub: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById('firebase-auth-github-navbar');
    if (container && !container.hasChildNodes()) {
      const root = ReactDOM.createRoot(container);
      root.render(<FirebaseAuthGithub />);
    }
  }, []);
  return null;
};

export default NavbarFirebaseAuthGithub;
