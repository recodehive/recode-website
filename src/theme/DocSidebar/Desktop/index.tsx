/**
 * DocSidebar/Desktop - Main sidebar container component
 *
 * This is the top-level component in the sidebar hierarchy that renders
 * the main documentation sidebar container. It's responsible for:
 * - Rendering the overall sidebar structure
 * - Handling sidebar visibility states
 * - Rendering DocSidebarItems component which handles the item list
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "react";
import clsx from "clsx";
import { useThemeConfig } from "@docusaurus/theme-common";
// @ts-ignore
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useHideableNavbar,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import styles from "./styles.module.css";
import DocSidebarItems from "@theme/DocSidebarItems";

// Using a custom layout for desktop navigation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    navbar: { hideOnScroll },
    docs: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
