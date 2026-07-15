import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import FooterLayout from "@theme/Footer/Layout";

function Footer(): JSX.Element | null {
  const { footer } = useThemeConfig();
  if (!footer) {
    return null;
  }

  return <FooterLayout />;
}

export default React.memo(Footer);
