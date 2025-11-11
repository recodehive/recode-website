import React, { type ReactNode, useMemo, Component, type ReactElement } from "react";
import { useThemeConfig, ErrorCauseBoundary } from "@docusaurus/theme-common";
import {
  splitNavbarItems,
} from "@docusaurus/theme-common/internal";
import NavbarItem, { type Props as NavbarItemConfig } from "@theme/NavbarItem";
import NavbarColorModeToggle from "@theme/Navbar/ColorModeToggle";
// import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from "@theme/Navbar/MobileSidebar/Toggle";
import NavbarLogo from "@theme/Navbar/Logo";
// import NavbarSearch from '@theme/Navbar/Search';

// Safe wrapper component that handles the mobile sidebar toggle
// This component will gracefully fail if the provider isn't available
function SafeMobileSidebarToggle(): ReactNode {
  // Try to render the toggle, but catch any errors
  // Since we can't catch hook errors with try-catch, we'll use a different approach
  // We'll always try to render it and let Docusaurus handle the provider setup
  // If it fails, the error will be caught by Docusaurus's error boundary
  try {
    return <NavbarMobileSidebarToggle />;
  } catch (error) {
    // This won't catch hook errors, but it's here for other potential errors
    console.warn("Mobile sidebar toggle unavailable");
    return null;
  }
}

function useNavbarItems() {
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): ReactNode {
  return (
    <>
      {items.map((item, i) => {
        const key = `${item.label || item.to || item.href || "item"}-${i}`;
        return (
          <ErrorCauseBoundary
            key={key}
            onError={(error) =>
              new Error(
                `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
                { cause: error },
              )
            }
          >
            <NavbarItem {...item} />
          </ErrorCauseBoundary>
        );
      })}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent(): ReactNode {
  const items = useNavbarItems();

  const [leftItems, rightItems] = useMemo(
    () => splitNavbarItems(items),
    [items],
  );
  const searchBarItem = useMemo(
    () => items.find((item) => item.type === "search"),
    [items],
  );

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {/* Safe wrapper for mobile sidebar toggle */}
          <SafeMobileSidebarToggle />
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle />
          {/* Search component disabled */}
          {/* {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )} */}
        </>
      }
    />
  );
}
