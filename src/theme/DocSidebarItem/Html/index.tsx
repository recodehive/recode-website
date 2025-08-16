/**
 * DocSidebarItemHtml - Component for rendering custom HTML in sidebar
 *
 * This component handles:
 * - Rendering custom HTML content in the sidebar
 * - Preserving any custom classes
 * - Safely injecting HTML using dangerouslySetInnerHTML
 * - Managing accessibility through tabIndex
 */
import React from "react";
import clsx from "clsx";
import { DocSidebarItemHtmlProps } from "../types";

export default function DocSidebarItemHtml({
  item,
  level,
  tabIndex,
  // We're receiving these props but not using them in this component
  activePath,
  index,
}: DocSidebarItemHtmlProps): React.ReactNode {
  const { value, className } = item;
  return (
    <li
      className={clsx("menu__list-item", className)}
      dangerouslySetInnerHTML={{ __html: value }}
      tabIndex={tabIndex}
    />
  );
}
