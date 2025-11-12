import React from 'react';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';

interface PythonCodeEditorProps {
  code?: string;
  height?: string;
}

const PythonCodeEditor: React.FC<PythonCodeEditorProps> = ({
  code,
  height = '300px'
}) => {
  return (
    <div className="python-tutorial-editor">
      <InteractiveCodeEditor
        initialCode={code}
        language="python"
        height={height}
      />
    </div>
  );
};

export default PythonCodeEditor;