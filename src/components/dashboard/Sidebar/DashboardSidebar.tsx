// src/components/dashboard/Sidebar/DashboardSidebar.tsx
import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { useUser, useClerk } from "@clerk/react";
import {
  LayoutGrid,
  MessageCircle,
  Trophy,
  Gift,
  BookOpen,
  Smile,
  Bell,
  ChevronDown,
  PanelLeft,
} from "lucide-react";
import "./DashboardSidebar.css";

export type DashboardTab = "home" | "discuss" | "giveaway" | "contributors";

interface DashboardSidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

const COLLAPSE_STORAGE_KEY = "recodehive:dashboard-sidebar-collapsed";

const TAB_ITEMS: Array<{
  tab: DashboardTab;
  label: string;
  icon: React.ReactNode;
}> = [
  { tab: "home", label: "Home", icon: <LayoutGrid size={16} /> },
  { tab: "discuss", label: "Discussions", icon: <MessageCircle size={16} /> },
  { tab: "contributors", label: "LeaderBoard", icon: <Trophy size={16} /> },
  { tab: "giveaway", label: "Giveaways", icon: <Gift size={16} /> },
];

const LINK_ITEMS: Array<{ href: string; label: string; icon: React.ReactNode }> = [
  { href: "/blogs", label: "Blogs", icon: <BookOpen size={16} /> },
  { href: "/community", label: "Community", icon: <Smile size={16} /> },
];

export default function DashboardSidebar({
  activeTab,
  onTabChange,
}: DashboardSidebarProps): React.JSX.Element {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  const [collapsed, setCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(COLLAPSE_STORAGE_KEY);
    if (stored === "true") setCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(COLLAPSE_STORAGE_KEY, String(next));
      return next;
    });
  };

  useEffect(() => {
    if (!isProfileMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen]);

  const displayName = user?.fullName ?? user?.username ?? "Account";

  return (
    <div
      className={`dashboard-rail ${collapsed ? "collapsed" : ""}`}
      data-testid="dashboard-sidebar"
    >
      <div className="dashboard-rail-profile" ref={profileMenuRef}>
        <button
          type="button"
          className="dashboard-rail-profile-trigger"
          onClick={() => setIsProfileMenuOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={isProfileMenuOpen}
        >
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={displayName}
              className="dashboard-rail-avatar"
            />
          ) : (
            <div className="dashboard-rail-avatar dashboard-rail-avatar-fallback">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          {!collapsed && (
            <>
              <span className="dashboard-rail-name" title={displayName}>
                {displayName}
              </span>
              <ChevronDown size={14} className="dashboard-rail-chevron" />
            </>
          )}
        </button>

        {isProfileMenuOpen && (
          <div className="dashboard-rail-profile-menu" role="menu">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsProfileMenuOpen(false);
                openUserProfile();
              }}
            >
              Manage account
            </button>
            <button
              type="button"
              role="menuitem"
              className="dashboard-rail-profile-menu-danger"
              onClick={() => {
                setIsProfileMenuOpen(false);
                signOut();
              }}
            >
              Sign out
            </button>
          </div>
        )}

        <button
          type="button"
          className="dashboard-rail-collapse-btn"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft
            size={16}
            style={{ transform: collapsed ? "scaleX(-1)" : undefined }}
          />
        </button>
      </div>

      <nav className="dashboard-rail-nav">
        {TAB_ITEMS.map((item) => (
          <button
            key={item.tab}
            type="button"
            className={`dashboard-rail-item ${activeTab === item.tab ? "active" : ""}`}
            onClick={() => onTabChange(item.tab)}
            title={collapsed ? item.label : undefined}
          >
            <span className="dashboard-rail-item-icon">{item.icon}</span>
            {!collapsed && (
              <span className="dashboard-rail-item-label">{item.label}</span>
            )}
          </button>
        ))}

        <div className="dashboard-rail-divider" />

        {LINK_ITEMS.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="dashboard-rail-item"
            title={collapsed ? item.label : undefined}
          >
            <span className="dashboard-rail-item-icon">{item.icon}</span>
            {!collapsed && (
              <span className="dashboard-rail-item-label">{item.label}</span>
            )}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="dashboard-rail-notifications"
        title={collapsed ? "Notifications" : undefined}
        onClick={() => {
          /* stub — notifications not implemented yet */
        }}
      >
        <Bell size={16} />
        {!collapsed && <span>Notifications</span>}
      </button>
    </div>
  );
}
