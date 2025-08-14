import React, { useEffect } from "react";
import NavbarIcon from "./NavbarIcon";

const iconMap = [
  { id: "nav-docs", name: "Docs" },
  { id: "nav-showcase", name: "Showcase" },
  { id: "nav-dashboard", name: "Dashboard" },
  { id: "nav-donate", name: "Donate" },
  { id: "nav-devfolio", name: "Devfolio" },
  { id: "nav-blogs", name: "Blogs" },
  { id: "nav-more", name: "More" },
  // Sub nav items
  { id: "nav-github", name: "GitHub" },
  { id: "nav-badges", name: "Badges" },
  { id: "nav-ebooks", name: "Ebooks" },
  { id: "nav-roadmap", name: "Roadmap" },
  { id: "nav-community", name: "Community" },
  { id: "nav-broadcast", name: "Broadcast" },
  { id: "nav-podcast", name: "Podcast" },
  { id: "nav-technical", name: "Technical" },
  { id: "nav-behavioral", name: "Behavioral" },
];

export default function NavbarIconInjector() {
  useEffect(() => {
    iconMap.forEach(({ id, name }) => {
      const el = document.getElementById(id);
      if (el && el.childNodes.length === 0) {
        import("react-dom").then((ReactDOM) => {
          (ReactDOM.default as any).render(<NavbarIcon name={name} />, el);
        });
      }
    });
  }, []);
  return null;
}
