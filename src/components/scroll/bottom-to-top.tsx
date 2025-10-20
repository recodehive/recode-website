import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollBottomToTop() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed right-5 bottom-5 z-50 cursor-pointer rounded-full border-none bg-gray-700 p-3 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700"
        style={{ backgroundColor: "var(--ifm-color-primary)" }}
      >
        <FaArrowUp />
      </button>
    )
  );
}
