/**
 * DocSidebarItem - Router component for sidebar items
 *
 * This component acts as a router that:
 * - Determines the type of sidebar item (category, link, or HTML)
 * - Renders the appropriate component based on the item type
 * - Passes relevant props to child components
 *
 * It works with three subcomponents:
 * - DocSidebarItemCategory: For collapsible sections (folders)
 * - DocSidebarItemLink: For individual page links
 * - DocSidebarItemHtml: For custom HTML content
 */
import React from "react";
import DocSidebarItemCategory from "@theme/DocSidebarItem/Category";
import DocSidebarItemLink from "@theme/DocSidebarItem/Link";
import DocSidebarItemHtml from "@theme/DocSidebarItem/Html";
import { DocSidebarItemProps } from "./types";

export default function DocSidebarItem({
  item,
  ...props
}: DocSidebarItemProps): React.ReactNode {
  const activePath = props.activePath || "";
  const level = props.level || 0;
  const index = props.index || 0;

  switch (item.type) {
    case "category":
      return (
        <DocSidebarItemCategory
          item={item as any}
          activePath={activePath}
          level={level}
          index={index}
          tabIndex={props.tabIndex}
          onItemClick={props.onItemClick}
        />
      );
    case "html":
      return (
        <DocSidebarItemHtml
          item={item as any}
          level={level}
          tabIndex={props.tabIndex}
          activePath={activePath}
          index={index}
        />
      );
    case "link":
    default:
      return (
        <DocSidebarItemLink
          item={item as any}
          activePath={activePath}
          level={level}
          index={index}
          tabIndex={props.tabIndex}
          onItemClick={props.onItemClick}
        />
      );
  }
}
