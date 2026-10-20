import React, { type ReactNode } from 'react';
import RhNavbar from '@site/src/components/navbar/RhNavbar';

// Replaces the default Docusaurus navbar (and its side drawer) with the grouped mega menu
// and full-screen mobile sheet. Menu content lives in src/data/navbar.ts.
export default function Navbar(): ReactNode {
  return <RhNavbar />;
}
