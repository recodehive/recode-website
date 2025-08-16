/**
 * DocSidebarItemLink - Component for rendering sidebar link items
 *
 * This component is responsible for:
 * - Rendering individual documentation page links
 * - Handling active state styling
 * - Managing click behavior and navigation
 */
import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { Book } from "lucide-react";
import { DocSidebarItemLinkProps } from "../types";
import styles from "./styles.module.css";

// Utility to determine if a sidebar item is active
function isActiveSidebarItem(item: any, activePath: string): boolean {
  if (!activePath) {
    return false;
  }
  return item.href === activePath;
}

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: DocSidebarItemLinkProps): React.ReactNode {
  const { href, label, className, autoAddBaseUrl } = item;

  // Determine if item is active based on path matching
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        "menu__list-item",
        className,
        styles.linkItem
      )}
      key={label}
    >
      <Link
        className={clsx(
          "menu__link",
          {
            "menu__link--active": isActive,
          },
          styles.menuLink
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? "page" : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        <div className={styles.linkContent}>
          <span className={styles.linkDot}></span>
          <span>{label}</span>
        </div>
      </Link>
    </li>
  );
}
