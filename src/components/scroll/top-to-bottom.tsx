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
        className="fixed right-5 bottom-5 z-50 cursor-pointer rounded-lg border-none bg-green-600 p-2.5 text-white opacity-80 shadow-md transition-opacity duration-300 hover:bg-green-700 hover:opacity-100"
      >
        <FaArrowDown />
      </button>
    )
  );
}
