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
  export function isMultiColumnFooterLinks(): any;
  export const ThemeClassNames: any;
  export const ErrorCauseBoundary: any;
  
  // Export all other members as any
  export const [key: string]: any;
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
  export const [key: string]: any;
}

declare module "@site/src/lib/utils" {
  export function cn(...args: any[]): string;
  export const [key: string]: any;
}

declare module "@site/src/utils/jsUtils" {
  export function sortBy(array: any[], key: string): any[];
  export const [key: string]: any;
}

declare module "@site/src/services/github" {
  export const githubService: any;
  export interface GitHubDiscussion {
    [key: string]: any;
  }
  export const [key: string]: any;
}

declare module "@site/src/components/ui/button" {
  export const Button: any;
  export const [key: string]: any;
}

declare module "@site/src/database/sponsors" {
  export interface Sponsor {
    [key: string]: any;
  }
  export const [key: string]: any;
}

declare module "@site/src/data/users" {
  export interface Tag {
    [key: string]: any;
  }
  export interface TagList {
    [key: string]: any;
  }
  export interface Tags {
    [key: string]: any;
  }
  export interface TagType {
    [key: string]: any;
  }
  export interface User {
    [key: string]: any;
  }
  export const sortedUsers: any;
  export const [key: string]: any;
}

// Catch-all for any missing modules
declare module "*" {
  const content: any;
  export default content;
  export const [key: string]: any;
}