import React, { type ReactNode } from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type { WrapperProps } from '@docusaurus/types';
import NavbarFirebaseAuthGithub from '@site/src/components/ui/NavbarFirebaseAuthGithub';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): ReactNode {
  return (
    <>
      <Navbar {...props} />
      <NavbarFirebaseAuthGithub />
    </>
  );
}
