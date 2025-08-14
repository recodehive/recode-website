import React from "react";
import OriginalNavbarItem from "@theme-original/NavbarItem";

// This wrapper ensures a valid default export for NavbarItem
export default function NavbarItem(props: any) {
  return <OriginalNavbarItem {...props} />;
}
