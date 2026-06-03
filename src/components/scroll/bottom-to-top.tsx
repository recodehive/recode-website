import React, { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function ScrollBottomToTop() {
  const [showTopButton, setShowTopButton] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);

  const updateVisibility = () => {
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;

    setShowTopButton(scrollTop > 300);
    setShowBottomButton(scrollTop + viewportHeight < documentHeight - 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateVisibility();
    window.addEventListener("scroll", updateVisibility);
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (!showTopButton && !showBottomButton) {
    return null;
  }

  return (
    <div className="scroll-to-top fixed right-5 bottom-5 z-50 flex flex-col gap-3">
      {showTopButton && (
        <button
          aria-label="Scroll to top"
          onClick={scrollToTop}
          className="cursor-pointer rounded-full border-none bg-gray-700 p-3 text-white shadow-lg transition-opacity duration-300 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
          style={{ backgroundColor: "var(--ifm-color-primary)" }}
        >
          <FaArrowUp />
        </button>
      )}
      {showBottomButton && (
        <button
          aria-label="Scroll to bottom"
          onClick={scrollToBottom}
          className="cursor-pointer rounded-full border-none bg-gray-700 p-3 text-white shadow-lg transition-opacity duration-300 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
          style={{ backgroundColor: "var(--ifm-color-primary)" }}
        >
          <FaArrowDown />
        </button>
      )}
    </div>
  );
}
