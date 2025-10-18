// src/components/tutorialCompletion.tsx
import React, { useState } from 'react';
import { triggerConfetti } from './ConfettiUtils';  // Import from the separate confetti utility

interface TutorialCompletionProps {
  tutorialTitle?: string;  // Optional prop for the tutorial name
  onComplete?: () => void;  // Optional callback for additional logic (e.g., update dashboard)
}

const TutorialCompletion: React.FC<TutorialCompletionProps> = ({
  tutorialTitle = 'this tutorial',
  onComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    if (isCompleted) return;  // Prevent multiple triggers

    setIsCompleted(true);
    
    // Trigger confetti for celebration
    try {
      triggerConfetti();
    } catch (error) {
      console.warn('Confetti failed to trigger:', error);
    }

    // Optional: Call parent callback (e.g., to save progress or update UI)
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <h3>Complete {tutorialTitle}</h3>
      {!isCompleted ? (
        <button
          onClick={handleComplete}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',  // Match theme colors
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
          aria-label={`Mark ${tutorialTitle} as complete`}
        >
          Mark as Complete
        </button>
      ) : (
        <p style={{ color: '#10b981', fontWeight: 'bold' }}>
          🎉 {tutorialTitle} Completed! Great job!
        </p>
      )}
    </div>
  );
};

export default TutorialCompletion;