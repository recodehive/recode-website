/**
 * DocSidebar/Desktop - Main sidebar container component
 *
 * This is the top-level component in the sidebar hierarchy that renders
 * the main documentation sidebar container. It's responsible for:
 * - Rendering the overall sidebar structure
 * - Handling sidebar visibility states
 * - Rendering DocSidebarItems component which handles the item list
 */
import React, { useState } from "react";
import clsx from "clsx";
import { useThemeConfig } from "@docusaurus/theme-common";
// @ts-ignore
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import styles from "./styles.module.css";
import DocSidebarItems from "@theme/DocSidebarItems";

// Using a custom layout for desktop navigation
function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <div
      className={clsx(styles.sidebar, styles.sidebarWithHideableNavbar, {
        [styles.sidebarHidden]: isHidden,
      })}
    >
      <div className={styles.sidebarInner}>
        {/* Removed the sidebarTop div completely */}
        <nav className={clsx("menu", styles.menu)}>
          <DocSidebarItems items={sidebar} activePath={path} level={0} />
        </nav>
      </div>
    </div>
  );
}

export default function DocSidebar(props) {
  return <DocSidebarDesktop {...props} />;
}
