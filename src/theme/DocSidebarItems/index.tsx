/**
 * DocSidebarItems - Container for sidebar item list
 *
 * This component is responsible for:
 * - Rendering the list of sidebar items (categories and links)
 * - Passing props to the DocSidebarItem component
 * - Managing the overall list structure
 * - Setting default active state to none on initial load
 *
 * It serves as the bridge between DocSidebar/Desktop and individual DocSidebarItem components.
 */
import React, { useState, useEffect } from "react";
import DocSidebarItem from "@theme/DocSidebarItem";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function DocSidebarItems({ items, activePath, level = 0 }) {
  // Force empty activePath to disable default selection
  // This will prevent any sidebar items from being marked as active by default

  // Get the current URL path
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";

  // Check if we're at the docs root page
  const isDocsRootPath =
    currentPath === "/" ||
    currentPath === "/docs" ||
    currentPath === "/docs/" ||
    currentPath.startsWith("/docs/GitHub/intro-github");

  // If we're at the docs root, force an empty active path
  const effectiveActivePath = isDocsRootPath ? "" : activePath;

  return (
    <ul className="menu__list">
      {items.map((item, index) => (
        <div className={index === 0 ? styles.firstItem : ""} key={index}>
          <DocSidebarItem
            item={item}
            index={index}
            activePath={effectiveActivePath}
            level={level}
          />
        </div>
      ))}
    </ul>
  );
}
