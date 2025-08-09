import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import FirebaseAuthGithub from "./FirebaseAuthGithub";

const NavbarFirebaseAuthGithub: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById("firebase-auth-github-navbar");
    if (container && !container.hasChildNodes()) {
      const root = ReactDOM.createRoot(container);
      root.render(<FirebaseAuthGithub />);

      // Force visibility on mobile after rendering
      const ensureVisibility = () => {
        const navbarItem = container.closest('.navbar__item');
        if (navbarItem) {
          navbarItem.style.display = 'block';
          navbarItem.style.visibility = 'visible';
          navbarItem.style.opacity = '1';
        }
        container.style.display = 'block';
        container.style.visibility = 'visible';
        container.style.opacity = '1';
      };

      // Ensure visibility immediately and after a short delay
      ensureVisibility();
      setTimeout(ensureVisibility, 100);
      setTimeout(ensureVisibility, 500);
    }
  }, []);
  return null;
};

export default NavbarFirebaseAuthGithub;