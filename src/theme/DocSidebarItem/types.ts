export interface SidebarCategoryItem {
  type: "category";
  label: string;
  items: SidebarItem[];
  collapsible?: boolean;
  collapsed?: boolean;
  className?: string;
  href?: string;
}

export interface SidebarLinkItem {
  type: "link" | "doc";
  label: string;
  href: string;
  className?: string;
  customProps?: Record<string, unknown>;
  autoAddBaseUrl?: boolean;
  docId?: string;
  id?: string;
}

export interface SidebarHtmlItem {
  type: "html";
  value: string;
  className?: string;
}

export type SidebarItem = SidebarCategoryItem | SidebarLinkItem | SidebarHtmlItem;

export interface DocSidebarItemCategoryProps {
  item: SidebarCategoryItem;
  onItemClick?: (item: SidebarItem) => void;
  activePath: string;
  level?: number;
  index?: number;
  tabIndex?: number;
}

export interface DocSidebarItemLinkProps {
  item: SidebarLinkItem;
  onItemClick?: (item: SidebarItem) => void;
  activePath: string;
  level?: number;
  index?: number;
  tabIndex?: number;
}

export interface DocSidebarItemHtmlProps {
  item: SidebarHtmlItem;
  tabIndex?: number;
  level?: number;
  activePath?: string;
  index?: number;
}

export interface DocSidebarItemProps {
  item: SidebarItem;
  onItemClick?: (item: SidebarItem) => void;
  activePath?: string;
  level?: number;
  index?: number;
  tabIndex?: number;
}
