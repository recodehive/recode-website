import React, {useState} from 'react';
import Editor from '@monaco-editor/react';
import './styles.css';

declare global {
  interface Window {
    loadPyodide?: any;
    pyodide?: any;
  }
}

const DEFAULT_CODE = `print("Hello from Pyodide!")
for i in range(3):
    print('Line', i+1)`;

export default function InteractivePythonEditor({
  initialCode = DEFAULT_CODE,
  height = 400,
}: {
  initialCode?: string;
  height?: number | string;
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);

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

      <div className="ipe-editor">
        <Editor
          height={height}
          language="python"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      <div className="ipe-output">
        <div className="ipe-output-header">Output</div>
        <pre className="ipe-output-body">{output || '— No output —'}</pre>
      </div>
    </div>
  );
}
