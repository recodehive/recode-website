import React, { useState, useEffect } from "react";
import styles from "./DailyCodingTip.module.css";
import codingTips from "../data/codingTips.json";

type Tip = {
  id: number;
  category: string;
  tip: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  "Git & GitHub Tips": "#f97316",
  "JavaScript/React Tips": "#3b82f6",
  "Open Source Contribution Tips": "#10b981",
  "VS Code Shortcuts": "#8b5cf6",
  "Productivity Tricks": "#ec4899",
};

function getTipOfTheDay(): Tip {
  try {
    const stored = localStorage.getItem("dailyCodingTip");
    const today = new Date().toDateString();
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) return parsed.tip;
    }
    const randomTip = codingTips[Math.floor(Math.random() * codingTips.length)] as Tip;
    localStorage.setItem("dailyCodingTip", JSON.stringify({ date: today, tip: randomTip }));
    return randomTip;
  } catch {
    return codingTips[0] as Tip;
  }
}

export default function DailyCodingTip(): React.ReactElement {
  const [tip, setTip] = useState<Tip | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTip(getTipOfTheDay());
    setAnimate(true);
  }, []);

  const handleRefresh = () => {
    const randomTip = codingTips[Math.floor(Math.random() * codingTips.length)] as Tip;
    setAnimate(false);
    setTimeout(() => {
      setTip(randomTip);
      setAnimate(true);
    }, 150);
  };

  if (!tip) return <></>;

  const categoryColor = CATEGORY_COLORS[tip.category] || "#6b7280";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>💡</span>
        <h3 className={styles.headerTitle}>Daily Coding Tip</h3>
      </div>
      <div className={`${styles.tipCard} ${animate ? styles.fadeIn : ""}`}>
        <span
          className={styles.categoryBadge}
          style={{
            backgroundColor: `${categoryColor}20`,
            color: categoryColor,
            borderColor: `${categoryColor}40`,
          }}
        >
          {tip.category}
        </span>
        <p className={styles.tipText}>{tip.tip}</p>
      </div>
      <button
        className={styles.refreshButton}
        onClick={handleRefresh}
        aria-label="Get a new random coding tip"
      >
        🔀 Get Another Tip
      </button>
    </div>
  );
}