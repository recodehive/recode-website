import {ReactNode} from 'react';

export interface DocSidebarItemCategoryProps {
  item: {
    type: 'category';
    label: string;
    items: Array<any>;
    collapsible?: boolean;
    collapsed?: boolean;
    className?: string;
    href?: string;
  };
  onItemClick?: (item: any) => void;
  activePath: string;
  level?: number;
  index?: number;
  tabIndex?: number;
}

export interface DocSidebarItemLinkProps {
  item: {
    type: 'link' | 'doc';
    label: string;
    href: string;
    className?: string;
    customProps?: Record<string, unknown>;
    autoAddBaseUrl?: boolean;
    docId?: string;
  };
  onItemClick?: (item: any) => void;
  activePath: string;
  level?: number;
  index?: number;
  tabIndex?: number;
}

export interface DocSidebarItemHtmlProps {
  item: {
    type: 'html';
    value: string;
    className?: string;
  };
  tabIndex?: number;
  level?: number;
  activePath?: string;
  index?: number;
}

export interface DocSidebarItemProps {
  item: {
    type: 'category' | 'link' | 'doc' | 'html';
    label?: string;
    href?: string;
    items?: Array<any>;
    value?: string;
    className?: string;
  };
  onItemClick?: (item: any) => void;
  activePath?: string;
  level?: number;
  index?: number;
  tabIndex?: number;
}
