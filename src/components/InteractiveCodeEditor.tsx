import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

interface InteractiveCodeEditorProps {
  initialCode?: string;
  language?: string;
  height?: string;
  className?: string;
}

declare global {
  interface Window {
    loadPyodide: (config?: any) => Promise<any>;
  }
}

const InteractiveCodeEditor: React.FC<InteractiveCodeEditorProps> = ({
  initialCode = '# Write your Python code here\nprint("Hello, World!")',
  language = 'python',
  height = '400px',
  className = ''
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const pyodideRef = useRef<any>(null);

  // Load Pyodide
  useEffect(() => {
    const loadPyodideScript = async () => {
      try {
        // Load Pyodide script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.onload = async () => {
          try {
            const pyodideInstance = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });
            pyodideRef.current = pyodideInstance;
            setPyodide(pyodideInstance);
            setIsLoading(false);

            // Initialize with some basic setup
            await pyodideInstance.runPythonAsync(`
import sys
from io import StringIO
import traceback
`);
          } catch (error) {
            console.error('Failed to load Pyodide:', error);
            setOutput('Error: Failed to load Python runtime');
            setIsLoading(false);
          }
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load Pyodide script:', error);
        setOutput('Error: Failed to load Python runtime');
        setIsLoading(false);
      }
    };

    loadPyodideScript();
  }, []);

  const runCode = async () => {
    if (!pyodide || isRunning) return;

    setIsRunning(true);
    setOutput('');

    try {
      // Redirect stdout to capture print statements
      await pyodide.runPythonAsync(`
import sys
from io import StringIO

# Create a string buffer to capture output
old_stdout = sys.stdout
sys.stdout = captured_output = StringIO()
`);

      // Run the user's code
      const result = await pyodide.runPythonAsync(code);

      // Get the captured output
      const capturedOutput = await pyodide.runPythonAsync('captured_output.getvalue()');

      // Restore stdout
      await pyodide.runPythonAsync('sys.stdout = old_stdout');

      // Display results
      let finalOutput = capturedOutput;
      if (result !== undefined && result !== null) {
        finalOutput += (finalOutput ? '\n' : '') + result.toString();
      }

      setOutput(finalOutput || 'Code executed successfully (no output)');

    } catch (error: any) {
      // Handle Python errors
      const errorMessage = error.message || 'An error occurred while running the code';
      setOutput(`Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  return (
    <div className={`interactive-code-editor ${className}`}>
      <div className="editor-header">
        <div className="editor-title">
          <span className="language-badge">{language.toUpperCase()}</span>
          Interactive Code Editor
        </div>
        <div className="editor-controls">
          <button
            className="editor-btn copy-btn"
            onClick={copyCode}
            title="Copy code"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            className="editor-btn reset-btn"
            onClick={resetCode}
            title="Reset code"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            className={`editor-btn run-btn ${isRunning ? 'running' : ''}`}
            onClick={runCode}
            disabled={isLoading || isRunning}
            title="Run code"
          >
            <Play size={16} />
            {isRunning ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      <div className="editor-container">
        <div className="code-editor">
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Loading Python runtime...</p>
            </div>
          )}
          <Editor
            height={height}
            language={language}
            value={code}
            onChange={handleEditorChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 4,
              insertSpaces: true,
              wordWrap: 'on',
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
            }}
          />
        </div>

        <div className="output-panel">
          <div className="output-header">
            <span>Output</span>
            {output && (
              <button
                className="clear-output-btn"
                onClick={() => setOutput('')}
                title="Clear output"
              >
                ✕
              </button>
            )}
          </div>
          <div className="output-content">
            {output ? (
              <pre className="output-text">{output}</pre>
            ) : (
              <div className="output-placeholder">
                Click "Run" to execute your code and see the output here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCodeEditor;