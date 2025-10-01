// Type declarations for CSS modules and side-effect imports
declare module "*.css" {
  const content: any;
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Allow importing CSS files as side effects
declare module "*.css" {
  const content: any;
  export = content;
}

// Docusaurus module declarations
declare module "@docusaurus/theme-common" {
  export function useColorMode(): {
    colorMode: "light" | "dark";
    setColorMode: (mode: "light" | "dark") => void;
  };
  // Add other exports as needed
  export * from "@docusaurus/theme-common/lib/utils/useColorMode";
}

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

declare module "@docusaurus/Head" {
  import { ReactNode } from "react";
  interface HeadProps {
    children: ReactNode;
    [key: string]: any;
  }
  const Head: React.FC<HeadProps>;
  export default Head;
}

// JSON module declarations
declare module "*.json" {
  const value: any;
  export default value;
}

// Allow any for missing modules
declare module "*" {
  const content: any;
  export default content;
}