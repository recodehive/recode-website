import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FirebaseAuthGithub from "./FirebaseAuthGithub";

const NavbarFirebaseAuthGithub: React.FC = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById("firebase-auth-github-navbar"));
  }, []);

  return container ? createPortal(<FirebaseAuthGithub />, container) : null;
};

export default NavbarFirebaseAuthGithub;
