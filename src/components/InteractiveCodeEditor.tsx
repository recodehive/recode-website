import React, { useState, useEffect, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

interface InteractiveCodeEditorProps {
  initialCode?: string;
  language?: string;
  height?: string;
  className?: string;
}

interface PyodideInstance {
  runPythonAsync: (code: string) => Promise<any>;
}

declare global {
  interface Window {
    loadPyodide: (config?: any) => Promise<PyodideInstance>;
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
  const [pyodide, setPyodide] = useState<PyodideInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const pyodideRef = useRef<PyodideInstance | null>(null);

  // Load Pyodide
  useEffect(() => {
    const loadPyodideScript = async () => {
      try {
        // Check if Pyodide is already loaded
        if (window.loadPyodide) {
          await initializePyodide();
          return;
        }

        // Load Pyodide script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.onload = initializePyodide;
        script.onerror = () => {
          console.error('Failed to load Pyodide script');
          setOutput('Error: Failed to load Python runtime. Please check your internet connection.');
          setIsLoading(false);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        setOutput('Error: Failed to initialize Python runtime');
        setIsLoading(false);
      }
    };

    const initializePyodide = async () => {
      try {
        const pyodideInstance = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });
        pyodideRef.current = pyodideInstance;
        setPyodide(pyodideInstance);

        // Initialize with basic setup
        await pyodideInstance.runPythonAsync(`
import sys
from io import StringIO
import traceback
`);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        setOutput('Error: Failed to initialize Python runtime');
        setIsLoading(false);
      }
    };

    loadPyodideScript();
  }, []);

  const runCode = useCallback(async () => {
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
        finalOutput += (finalOutput ? '\n' : '') + String(result);
      }

      setOutput(finalOutput || 'Code executed successfully (no output)');

    } catch (error) {
      // Handle Python errors with better formatting
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setOutput(`Error: ${errorMessage}`);
    } finally {
      setIsRunning(false);
    }
  }, [pyodide, isRunning, code]);

  const resetCode = useCallback(() => {
    setCode(initialCode);
    setOutput('');
  }, [initialCode]);

  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
      document.body.removeChild(textArea);
    }
  }, [code]);

  const handleEditorChange = useCallback((value: string | undefined) => {
    setCode(value || '');
  }, []);

  const clearOutput = useCallback(() => {
    setOutput('');
  }, []);

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
                onClick={clearOutput}
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