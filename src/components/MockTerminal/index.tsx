import React from "react";
import "./MockTerminal.css";

interface MockTerminalProps {
  onPromptClick?: () => void;
}

const MockTerminal: React.FC<MockTerminalProps> = ({ onPromptClick }) => {
  return (
    <div className="mock-terminal">
      <div className="mock-terminal__titlebar">
        <span className="mock-terminal__dot mock-terminal__dot--red" />
        <span className="mock-terminal__dot mock-terminal__dot--yellow" />
        <span className="mock-terminal__dot mock-terminal__dot--green" />
        <span className="mock-terminal__label">~/recodehive</span>
      </div>
      <div className="mock-terminal__body">
        <div>
          <span className="mock-terminal__prompt">$</span>{" "}
          <span className="mock-terminal__cmd">
            git clone recodehive/recode-website
          </span>
        </div>
        <div className="mock-terminal__out">
          Cloning into 'recode-website'… done.
        </div>
        <div>
          <span className="mock-terminal__prompt">$</span>{" "}
          <span className="mock-terminal__cmd">
            gh issue list --label "good first issue"
          </span>
        </div>
        <div className="mock-terminal__out">#412 · Add SQL joins tutorial</div>
        <div className="mock-terminal__out">#398 · Improve Docker intro docs</div>
        <div>
          <span className="mock-terminal__prompt">$</span>{" "}
          <span className="mock-terminal__cmd">
            git commit -m "my first contribution 🎉"
          </span>
        </div>
        <div className="mock-terminal__out">→ sponsored: ₹500 this week</div>
        <div
          className="mock-terminal__prompt-line"
          role="button"
          tabIndex={0}
          aria-label="Open live user activity"
          onClick={onPromptClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPromptClick?.();
            }
          }}
        >
          <span className="mock-terminal__prompt">$</span>{" "}
          <span className="mock-terminal__cursor" />{" "}
          <span className="mock-terminal__hint">
            click to see live user activity
          </span>
        </div>
      </div>
    </div>
  );
};

export default MockTerminal;
