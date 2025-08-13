import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLayout from '@theme/Footer/Layout';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLogo from '@theme/Footer/Logo';
import FooterLinks from '@theme/Footer/Links';
import type {Props} from '@theme/Footer';

function Footer(): JSX.Element | null {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  const {copyright, links, logo, style} = footer;

  return (
    <FooterLayout
      style={style}
      links={links && <FooterLinks links={links} />}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={copyright && <FooterCopyright copyright={copyright} />}
    />
  );
}

export default React.memo(Footer);
