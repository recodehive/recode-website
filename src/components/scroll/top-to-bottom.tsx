import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";

export default function ScrollTopToBottom() {
  const [showButton, setShowButton] = useState(false);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const bottomThreshold =
      document.documentElement.scrollHeight - window.innerHeight - 100;
    if (window.scrollY < bottomThreshold) {
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
        onClick={scrollToBottom}
        className="fixed bottom-5 right-5 bg-green-600 text-white border-none rounded-lg p-2.5 cursor-pointer shadow-md transition-opacity duration-300 opacity-80 z-50 hover:bg-green-700 hover:opacity-100"
      >
        <FaArrowDown />
      </button>
    )
  );
}
