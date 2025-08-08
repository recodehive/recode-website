import React from 'react';
import OriginalRoot from '@theme-original/Root';

// Delegate entirely to the original Root to preserve all providers during SSG
export default function Root(props) {
  return <OriginalRoot {...props} />;
}
