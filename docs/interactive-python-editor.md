---
id: interactive-python-editor
title: Interactive Python Editor
---

import InteractivePythonEditor from '@site/src/components/InteractivePythonEditor';

This page demonstrates the new interactive Python editor component. You can edit code on the left, see highlighted code on the right, and run it directly in the browser using Pyodide.

<InteractivePythonEditor />

Notes:
- The editor loads Pyodide from a CDN — the first run will take a few seconds while the WebAssembly engine downloads.
- This component is intentionally dependency-free (uses Prism for highlighting and Pyodide for execution via CDN). If you'd like tighter integration (Monaco, local Pyodide mirror, or server-side execution), I can update it.
