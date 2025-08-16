import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import NavbarIcon from "./NavbarIcon";
import { NAVBAR_ICONS, type NavbarIconName } from "../../constants/navbarConfig";

export default function NavbarIconInjector() {
  useEffect(() => {
    const roots = new Map<string, any>();
    
    NAVBAR_ICONS.forEach((name: NavbarIconName) => {
      const id = `nav-${name.toLowerCase()}`;
      try {
        const el = document.getElementById(id);
        if (el && !roots.has(id)) {
          const root = createRoot(el);
          root.render(<NavbarIcon name={name} />);
          roots.set(id, root);
        }
      } catch (error) {
        console.warn(`Failed to inject navbar icon for ${name}:`, error);
      }
    });

    return () => {
      roots.forEach((root, id) => {
        try {
          root.unmount();
        } catch (error) {
          console.warn(`Failed to unmount navbar icon for ${id}:`, error);
        }
      });
    };
  }, []);

  return null;
}
