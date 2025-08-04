import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollBottomToTop() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-5 bg-blue-600 text-white border-none rounded-lg p-2.5 cursor-pointer shadow-md transition-opacity duration-300 opacity-80 z-50 hover:bg-blue-700 hover:opacity-100"
      >
        <FaArrowUp />
      </button>
    )
  );
}
