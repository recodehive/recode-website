/**
 * DocSidebarItemCategory - Component for rendering collapsible sidebar categories
 *
 * This component is responsible for:
 * - Rendering collapsible sections/folders in the sidebar
 * - Managing expand/collapse state
 * - Handling active state for categories
 * - Rendering nested DocSidebarItem components for child items
 */
import React, { useEffect, memo, useState } from "react";
import { ThemeClassNames } from "@docusaurus/theme-common";

// Create a simple isSamePath utility since we can't import it
function isSamePath(path1: string, path2: string): boolean {
  // If either path is empty or null, return false (no active items)
  if (!path1 || !path2) {
    return false;
  }
  // Simple path comparison function
  return path1 === path2;
}
import {
  Book,
  Database,
  Github,
  PanelRight,
  Code2,
  School,
  Zap,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { DocSidebarItemCategoryProps } from "../types";
import styles from "./styles.module.css";

// Recursively get all doc ids from sidebar
function getAllDocIds(items: any[]): string[] {
  let ids: string[] = [];
  for (const item of items) {
    if (item.type === "category") {
      // Include the category's href if it exists
      if (item.href) {
        ids.push(item.href);
      }
      ids = [...ids, ...getAllDocIds(item.items)];
    } else if (item.type === "doc") {
      ids.push(item.id);
    } else if (item.href) {
      // Handle link type items
      ids.push(item.href);
    }
  }
  return ids;
}

const getIcon = (
  label: string,
  className: string | undefined
): React.ReactNode => {
  // Use the className to determine the appropriate icon and color
  if (label.includes("GitHub") || className?.includes("github")) {
    return <Github className={`${styles.categoryIcon} ${styles.githubIcon}`} />;
  } else if (label.includes("SQL") || className?.includes("sql")) {
    return <Database className={`${styles.categoryIcon} ${styles.sqlIcon}`} />;
  } else if (label.includes("Python") || className?.includes("python")) {
    return <Code2 className={`${styles.categoryIcon} ${styles.pythonIcon}`} />;
  } else if (label.includes("Next.js") || className?.includes("nextjs")) {
    return <Zap className={`${styles.categoryIcon} ${styles.nextjsIcon}`} />;
  } else if (
    label.includes("Google Student Ambassador") ||
    className?.includes("gsa")
  ) {
    return <School className={`${styles.categoryIcon} ${styles.gsaIcon}`} />;
  } else if (label.includes("Technical") || className?.includes("technical")) {
    return (
      <PanelRight
        className={`${styles.categoryIcon} ${styles.technicalIcon}`}
      />
    );
  } else {
    return <Book className={styles.categoryIcon} />;
  }
};

// Component responsible for the category collapsing behavior
function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level = 0,
  index,
  ...props
}: DocSidebarItemCategoryProps): React.ReactNode {
  const { items, label, collapsible, className, href } = item;

  // Check if this is the GitHub category that should not be active by default
  const isGitHubCategory =
    label?.includes("GitHub") || className?.includes("github");

  // Use a simpler approach to handle collapsing
  const [collapsed, setCollapsed] = useState(item.collapsed);

  // Only set active if the path matches AND it's not the GitHub category on initial load
  const active = href
    ? isSamePath(href, activePath) && !(isGitHubCategory && !activePath)
    : false;

  // Use useEffect to update the collapsed state when the active path changes
  useEffect(() => {
    if (collapsible) {
      // If activePath is empty, don't consider any items active
      if (!activePath) {
        return;
      }

      // Don't collapse if this category or any of its items are active
      const hasActiveItem = items.some((item) => {
        // Check for direct href match
        if (item.href && isSamePath(item.href, activePath)) {
          return true;
        }
        // Check for nested items (for categories like SQL Basics)
        if (item.type === "category" && item.items) {
          return item.items.some(
            (subItem) => subItem.href && isSamePath(subItem.href, activePath)
          );
        }
        return false;
      });

      // Only collapse if not active and no active children
      if (!active && !hasActiveItem) {
        setCollapsed(true);
      } else {
        // Keep expanded if active or has active children
        setCollapsed(false);
      }
    }
  }, [activePath, active, collapsible, items]);

  const isHidden = collapsed && !active;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (collapsible && !href) {
      e.preventDefault();
      e.currentTarget.blur();
      setCollapsed((prev) => !prev);
    }
    if (href) {
      onItemClick?.(item);
    }
  };

  const categoryIcon = getIcon(label, className);

  // Determine category theme based on label or className
  const getCategoryTheme = () => {
    if (label.includes("GitHub") || className?.includes("github")) {
      return "custom-sidebar-github";
    } else if (label.includes("Python") || className?.includes("python")) {
      return "custom-sidebar-python";
    } else if (label.includes("SQL") || className?.includes("sql")) {
      return "custom-sidebar-sql";
    } else if (label.includes("Next.js") || className?.includes("nextjs")) {
      return "custom-sidebar-nextjs";
    } else if (
      label.includes("Google Student Ambassador") ||
      className?.includes("gsa")
    ) {
      return "custom-sidebar-gsa";
    } else if (
      label.includes("Technical") ||
      className?.includes("technical")
    ) {
      return "custom-sidebar-technical";
    }
    return "";
  };

  const categoryTheme = getCategoryTheme();

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        {
          "menu__list-item--collapsed": collapsed,
        },
        className,
        styles.categoryItem,
        categoryTheme,
        {
          [styles.categoryLevel1]: level === 1,
          [styles.categoryLevel2]: level === 2,
        }
      )}
    >
      <div
        className={clsx(styles.categoryHeader, {
          [styles.categoryHeaderActive]: active,
        })}
      >
        {href ? (
          <Link
            className={clsx(
              "menu__link",
              {
                "menu__link--active": active,
              },
              styles.categoryLink
            )}
            to={href}
            onClick={handleClick}
          >
            <div className={styles.categoryLinkContent}>
              {categoryIcon}
              <span className={styles.categoryLabel}>
                {label.replace(/^[🐙🐍🗄️⚡🎓🔧📚⚙️👨‍💼🔄📊]+ /g, "")}
              </span>
            </div>
          </Link>
        ) : (
          <a
            className={clsx(
              "menu__link",
              {
                "menu__link--active": active,
              },
              styles.categoryLink
            )}
            href="#"
            onClick={handleClick}
          >
            <div className={styles.categoryLinkContent}>
              {categoryIcon}
              <span className={styles.categoryLabel}>
                {label.replace(/^[🐙🐍🗄️⚡🎓🔧📚⚙️👨‍💼🔄📊]+ /g, "")}
              </span>
            </div>
            {collapsible && (
              <div className={styles.categoryCollapseIcon}>
                {collapsed ? (
                  <ChevronRight size={16} className={styles.chevronIcon} />
                ) : (
                  <ChevronDown size={16} className={styles.chevronIcon} />
                )}
              </div>
            )}
          </a>
        )}
      </div>

      {!isHidden && (
        <ul className={clsx("menu__list", styles.categoryList)}>
          {items.map((childItem, i) => {
            // @ts-ignore
            const DocSidebarItem = require("@theme/DocSidebarItem").default;
            return (
              <DocSidebarItem
                tabIndex={collapsed ? "-1" : "0"}
                key={i}
                item={childItem}
                onItemClick={onItemClick}
                activePath={activePath}
                level={level + 1}
                index={i}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

export default memo(DocSidebarItemCategory);
