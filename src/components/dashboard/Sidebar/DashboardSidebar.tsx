// src/components/dashboard/Sidebar/DashboardSidebar.tsx
import React, { useEffect, useRef, useState } from "react";
import Link from "@docusaurus/Link";
import { SignInButton, useUser, useClerk } from "@clerk/react";
import {
  LayoutGrid,
  MessageCircle,
  Trophy,
  Gift,
  BookOpen,
  Smile,
  HelpCircle,
  Sparkles,
  Bell,
  ChevronDown,
  PanelLeft,
} from "lucide-react";
import { getLatestRelease } from "../overview/releaseData";
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
  { tab: "home", label: "Overview", icon: <LayoutGrid size={16} /> },
  { tab: "discuss", label: "Discussions", icon: <MessageCircle size={16} /> },
  { tab: "contributors", label: "Leaderboard", icon: <Trophy size={16} /> },
  { tab: "giveaway", label: "Giveaways", icon: <Gift size={16} /> },
];

const LINK_ITEMS: Array<{
  href: string;
  label: string;
  icon: React.ReactNode;
  badge?: boolean;
}> = [
  { href: "/blogs", label: "Blogs", icon: <BookOpen size={16} /> },
  { href: "/community", label: "Community", icon: <Smile size={16} /> },
  { href: "/contact-us", label: "Help center", icon: <HelpCircle size={16} /> },
  { href: "/updates", label: "Updates", icon: <Sparkles size={16} />, badge: true },
];

const GithubMark = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

export default function DashboardSidebar({
  activeTab,
  onTabChange,
}: DashboardSidebarProps): React.JSX.Element {
  let user: ReturnType<typeof useUser>["user"] | undefined;
  let authLoaded = true;
  let signOut: ReturnType<typeof useClerk>["signOut"] | undefined;
  let openUserProfile: ReturnType<typeof useClerk>["openUserProfile"] | undefined;

  try {
    const auth = useUser();
    user = auth.user;
    authLoaded = auth.isLoaded;
    const clerk = useClerk();
    signOut = clerk.signOut;
    openUserProfile = clerk.openUserProfile;
  } catch {
    // The dashboard remains usable in local builds without Clerk configuration.
  }

  const [collapsed, setCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const latestTag = getLatestRelease()?.tag;

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

  const githubLogin =
    user?.externalAccounts?.find((a) => a.provider === "github")?.username ??
    user?.username ??
    null;
  const displayName = githubLogin ? `@${githubLogin}` : user?.fullName ?? "Account";
  const subLine = user?.fullName && githubLogin ? user.fullName : "Community member";

  return (
    <div
      className={`dashboard-rail ${collapsed ? "collapsed" : ""}`}
      data-testid="dashboard-sidebar"
    >
      <div className="dashboard-rail-top" ref={profileMenuRef}>
        {!authLoaded ? (
          <div className="dashboard-rail-signin dashboard-rail-signin-skeleton" aria-hidden="true" />
        ) : user ? (
          <>
            <button
              type="button"
              className="dashboard-rail-profile-trigger"
              onClick={() => setIsProfileMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
            >
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={displayName}
                  className="dashboard-rail-avatar"
                />
              ) : (
                <div className="dashboard-rail-avatar dashboard-rail-avatar-fallback">
                  {displayName.replace("@", "").charAt(0).toUpperCase()}
                </div>
              )}
              {!collapsed && (
                <>
                  <span className="dashboard-rail-who">
                    <span className="dashboard-rail-name" title={displayName}>
                      {displayName}
                    </span>
                    <span className="dashboard-rail-sub">{subLine}</span>
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
                    openUserProfile?.();
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
                    signOut?.();
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </>
        ) : (
          <SignInButton mode="modal">
            <button
              type="button"
              className="dashboard-rail-signin"
              aria-label="Sign in with GitHub"
              title={collapsed ? "Sign in with GitHub" : undefined}
            >
              <GithubMark />
              {!collapsed && <span>Sign in with GitHub</span>}
            </button>
          </SignInButton>
        )}
      </div>

      <nav className="dashboard-rail-nav" aria-label="Dashboard">
        {!collapsed && <p className="dashboard-rail-group">COMMUNITY</p>}
        {TAB_ITEMS.map((item) => (
          <button
            key={item.tab}
            type="button"
            className={`dashboard-rail-item ${activeTab === item.tab ? "active" : ""}`}
            onClick={() => onTabChange(item.tab)}
            aria-current={activeTab === item.tab ? "page" : undefined}
            title={collapsed ? item.label : undefined}
          >
            <span className="dashboard-rail-item-icon">{item.icon}</span>
            {!collapsed && (
              <span className="dashboard-rail-item-label">{item.label}</span>
            )}
          </button>
        ))}

        {collapsed ? (
          <div className="dashboard-rail-divider" />
        ) : (
          <p className="dashboard-rail-group">RESOURCES</p>
        )}

        {LINK_ITEMS.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="dashboard-rail-item"
            title={collapsed ? item.label : undefined}
          >
            <span className="dashboard-rail-item-icon">{item.icon}</span>
            {!collapsed && (
              <>
                <span className="dashboard-rail-item-label">{item.label}</span>
                {item.badge && latestTag && (
                  <span className="dashboard-rail-badge">{latestTag}</span>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      <div className="dashboard-rail-bottom">
        {/* No notifications data source exists yet, so no count badge is shown */}
        <Link
          to="/updates"
          className="dashboard-rail-bottom-item"
          title={collapsed ? "Notifications" : undefined}
        >
          <Bell size={16} />
          {!collapsed && <span>Notifications</span>}
        </Link>
        <button
          type="button"
          className="dashboard-rail-bottom-item"
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : undefined}
        >
          <PanelLeft
            size={16}
            style={{ transform: collapsed ? "scaleX(-1)" : undefined }}
          />
          {!collapsed && <span>Collapse sidebar</span>}
        </button>
      </div>
    </div>
  );
}
