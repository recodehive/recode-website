import React from "react";
import { NAVBAR_CONFIG, type NavbarIconName } from "../../constants/navbarConfig";

// Legacy interface for dashboard usage
interface DashboardNavbarIconProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}

// New interface for navbar usage
interface ConfigNavbarIconProps {
  name: NavbarIconName;
}

type NavbarIconProps = DashboardNavbarIconProps | ConfigNavbarIconProps;

// Type guard to check if props are for dashboard usage
function isDashboardProps(props: NavbarIconProps): props is DashboardNavbarIconProps {
  return 'icon' in props && 'text' in props && 'active' in props && 'onClick' in props;
}

export default function NavbarIcon(props: NavbarIconProps) {
  // Handle dashboard usage
  if (isDashboardProps(props)) {
    const { icon, text, active, onClick } = props;
    return (
      <div 
        className={`navbar-icon-item ${active ? 'active' : ''}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
      >
        <span className="navbar-icon">
          {icon}
        </span>
        <span className="navbar-text">{text}</span>
      </div>
    );
  }

  // Handle navbar config usage
  const { name } = props;
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
