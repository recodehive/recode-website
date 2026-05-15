// Global type declarations for better TypeScript compatibility

// CSS modules and side-effect imports
declare module "*.css" {
  const content: any;
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// JSON modules
declare module "*.json" {
  const value: any;
  export default value;
}

// JSX namespace declaration
declare namespace JSX {
  interface Element extends React.ReactElement<any, any> {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Docusaurus theme-common module
declare module "@docusaurus/theme-common" {
  export function useColorMode(): {
    colorMode: "light" | "dark";
    setColorMode: (mode: "light" | "dark") => void;
  };

  export function useThemeConfig(): any;
  export function usePluralForm(): any;
  export function isMultiColumnFooterLinks(links: any): any;
  export const ThemeClassNames: any;
  export const ErrorCauseBoundary: any;
}

// Other Docusaurus modules
declare module "@docusaurus/useDocusaurusContext" {
  export default function useDocusaurusContext(): {
    siteConfig: {
      title: string;
      [key: string]: any;
    };
  };
}

declare module "@theme/Layout" {
  import { ReactNode } from "react";
  interface LayoutProps {
    title?: string;
    description?: string;
    children: ReactNode;
    [key: string]: any;
  }
  const Layout: React.FC<LayoutProps>;
  export default Layout;
}

declare module "@theme/Footer" {
  export interface Props {
    [key: string]: any;
  }
  const Footer: React.FC<Props>;
  export default Footer;
}

declare module "@docusaurus/Head" {
  import { ReactNode } from "react";
  interface HeadProps {
    children: ReactNode;
    [key: string]: any;
  }
  const Head: React.FC<HeadProps>;
  export default Head;
}

// Site-specific modules - using wildcard pattern for flexibility
declare module "@site/src/lib/statsProvider" {
  export function useCommunityStatsContext(): any;
  export const CommunityStatsProvider: any;
}

declare module "@site/src/lib/utils" {
  export function cn(...args: any[]): string;
}

declare module "@site/src/utils/jsUtils" {
  export function sortBy<T>(
    array: T[],
    getter: (item: T) => string | number | boolean,
  ): T[];
}

declare module "@site/src/services/github" {
  export const githubService: any;
  export interface GitHubDiscussion {
    [key: string]: any;
  }
}

declare module "@site/src/services/githubService" {
  export const githubService: {
    setToken(token: string): void;
    fetchDiscussions(limit?: number, signal?: AbortSignal): Promise<any[]>;
  };
  export interface GitHubDiscussion {
    [key: string]: any;
  }
}

declare module "@site/src/utils/useSafeColorMode" {
  export function useSafeColorMode(): {
    colorMode: "light" | "dark";
    isDark: boolean;
    mounted: boolean;
  };
}

declare module "@site/src/components/ui/button" {
  export const Button: any;
}

declare module "@site/src/database/sponsors" {
  export interface Sponsor {
    [key: string]: any;
  }
  const sponsors: Sponsor[];
  export default sponsors;
}

declare module "@site/src/data/users" {
  export type Tag = import("../data/users").Tag;
  export type TagType = import("../data/users").TagType;
  export type User = import("../data/users").User;
  export const Tags: { [type in TagType]: Tag };
  export const TagList: TagType[];
  export const sortedUsers: User[];
}

// Catch-all for any missing modules
declare module "*" {
  const content: any;
  export default content;
}
