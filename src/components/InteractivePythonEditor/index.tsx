import React, {useEffect, useRef, useState} from 'react';
import './styles.css';

declare global {
  interface Window {
    loadPyodide?: any;
    pyodide?: any;
  }
}

const DEFAULT_CODE = `print("Hello from Pyodide!")\nfor i in range(3):\n    print('Line', i+1)`;

export default function InteractivePythonEditor({
  initialCode = DEFAULT_CODE,
  height = 260,
}: {
  initialCode?: string;
  height?: number | string;
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    // Load Prism for highlighting (CSS + script)
    if (!document.querySelector('link[data-prism]')) {
      const link = document.createElement('link');
      link.setAttribute('data-prism', '');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.css';
      document.head.appendChild(link);
    }
    if (!(window as any).Prism) {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js';
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  useEffect(() => {
    // Highlight when code or Prism loads
    const highlight = () => {
      if ((window as any).Prism && preRef.current) {
        (window as any).Prism.highlightElement(preRef.current);
      }
    };
    highlight();
    const id = setTimeout(highlight, 50);
    return () => clearTimeout(id);
  }, [code]);

  async function ensurePyodide() {
    if (pyodideReady) return window.pyodide;
    setLoading(true);
    // Load pyodide loader script if needed
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js';
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.head.appendChild(s);
      });
    }
    // @ts-ignore
    const pyodide = await window.loadPyodide({indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.22.1/full/'});
    // capture stdout / stderr
    pyodide.setStdout({
      batched: (s: string) => {
        setOutput((o: string) => o + s);
      },
    });
    pyodide.setStderr({
      batched: (s: string) => {
        setOutput((o: string) => o + s);
      },
    });
    window.pyodide = pyodide;
    setPyodideReady(true);
    setLoading(false);
    return pyodide;
  }

  async function runCode() {
    setOutput('');
    try {
      const pyodide = await ensurePyodide();
      setLoading(true);
      // run the code asynchronously
      // ensure printing goes to the captured stdout
      await pyodide.runPythonAsync(code);
    } catch (err: any) {
      setOutput((o) => o + String(err));
    } finally {
      setLoading(false);
    }
  }

  function clearOutput() {
    setOutput('');
  }

  return (
    <div className="interactive-py-editor">
      <div className="ipe-toolbar">
        <button className="ipe-btn" onClick={runCode} disabled={loading}>
          {loading ? 'Running…' : 'Run'}
        </button>
        <button className="ipe-btn" onClick={() => { setCode(DEFAULT_CODE); }}>
          Reset
        </button>
        <button className="ipe-btn" onClick={clearOutput}>
          Clear Output
        </button>
        <div className="ipe-status">{pyodideReady ? 'Pyodide ready' : (loading ? 'Loading...' : 'Pyodide not loaded')}</div>
      </div>

      <div className="ipe-main">
        <textarea
          className="ipe-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{height}}
          spellCheck={false}
        />

        <div className="ipe-preview" style={{height}}>
          <pre ref={preRef} className="language-python"><code>{code}</code></pre>
        </div>
      </div>

      <div className="ipe-output">
        <div className="ipe-output-header">Output</div>
        <pre className="ipe-output-body">{output || '— No output —'}</pre>
      </div>
    </div>
  );
}
