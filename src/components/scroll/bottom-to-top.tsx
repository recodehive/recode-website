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
        className="fixed right-5 bottom-20 z-50 cursor-pointer rounded-lg border-none bg-blue-600 p-2.5 text-white opacity-80 shadow-md transition-opacity duration-300 hover:bg-blue-700 hover:opacity-100"
      >
        <FaArrowUp />
      </button>
    )
  );
}
