import React from "react";
import { NAVBAR_CONFIG, type NavbarIconName } from "../../constants/navbarConfig";

interface NavbarIconProps {
  name: NavbarIconName;
}

export default function NavbarIcon({ name }: NavbarIconProps) {
  const IconComponent = NAVBAR_CONFIG[name];
  
  if (!IconComponent) {
    return null;
  }

  return (
    <span className="navbar-icon">
      <IconComponent size={18} style={{ verticalAlign: "middle" }} />
    </span>
  );
}
