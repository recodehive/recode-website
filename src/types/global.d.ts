// Type declarations for CSS modules
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Type declarations for Docusaurus modules
declare module "@docusaurus/theme-common" {
  export function useColorMode(): {
    colorMode: "light" | "dark";
    setColorMode: (mode: "light" | "dark") => void;
  };
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
  }
  const Layout: React.FC<LayoutProps>;
  export default Layout;
}

declare module "@docusaurus/Head" {
  import { ReactNode } from "react";
  interface HeadProps {
    children: ReactNode;
  }
  const Head: React.FC<HeadProps>;
  export default Head;
}