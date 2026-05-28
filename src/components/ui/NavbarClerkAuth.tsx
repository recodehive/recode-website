import React, { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { createPortal } from "react-dom";

const NavbarClerkAuthContent: React.FC = () => {
  return (
    <div className="clerk-navbar-auth">
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button
            type="button"
            className="clerk-navbar-sign-in"
            aria-label="Sign in to recode hive"
          >
            Sign in
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
};

const NavbarClerkAuth: React.FC = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById("clerk-auth-navbar"));
  }, []);

  if (!customFields?.clerkPublishableKey || !container) {
    return null;
  }

  return createPortal(<NavbarClerkAuthContent />, container);
};

export default NavbarClerkAuth;
