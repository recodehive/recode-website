import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollBottomToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-5 bottom-5 z-50 cursor-pointer rounded-full border-none bg-gray-700 p-3 text-white shadow-lg transition-opacity duration-300 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
          style={{ backgroundColor: "var(--ifm-color-primary)" }}
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
}
