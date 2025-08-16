import { type NavbarIconName } from "../constants/navbarConfig";

/**
 * Generates HTML string for navbar items with icons
 * @param iconName - The name of the icon from NAVBAR_CONFIG
 * @param label - The text label for the navbar item
 * @returns HTML string with icon placeholder and label
 */
export function createNavbarItemHTML(iconName: NavbarIconName, label: string): string {
  return `<span id="nav-${iconName.toLowerCase()}" style="display:inline-flex;align-items:center;"></span> ${label}`;
}

/**
 * Generates HTML string for simple navbar items with icons (no inline styles)
 * @param iconName - The name of the icon from NAVBAR_CONFIG
 * @param label - The text label for the navbar item
 * @returns HTML string with icon placeholder and label
 */
export function createSimpleNavbarItemHTML(iconName: NavbarIconName, label: string): string {
  return `<span id="nav-${iconName.toLowerCase()}"></span> ${label}`;
}