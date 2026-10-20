import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './navbar.module.css';

export default function Logo({ onClick }: { onClick?: () => void }) {
  const light = useBaseUrl('img/logo.png');
  const dark = useBaseUrl('img/logo-dark.png');
  const { colorMode } = useColorMode();
  return (
    <Link to="/" className={styles.logo} onClick={onClick} aria-label="recode hive home">
      <img src={colorMode === 'dark' ? dark : light} alt="" width={32} height={32} />
      <span>recode hive</span>
    </Link>
  );
}
