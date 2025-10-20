import React, { useEffect, useState } from "react";

const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("recodehive_newsletter_popup");

    if (hasSubscribed !== "true") {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.body.scrollHeight;

        if (scrollPosition / pageHeight >= 0.8) {
          setShowPopup(true);
          window.removeEventListener("scroll", handleScroll);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("recodehive_newsletter_popup", "true");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="animate-fade-in relative w-full max-w-xl rounded-3xl border border-gray-200 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-xl">
        <img
          src="/img/logo.png"
          alt="recode hive Logo"
          className="mx-auto mb-4 h-16 w-16 rounded-full shadow-md"
        />

        <h2 className="mb-2 text-3xl font-extrabold text-gray-900!">
          Sanjay’s Substack
        </h2>

        <p className="mb-4 text-base leading-relaxed text-gray-700">
          recode hive is an inclusive and welcoming platform where everyone can
          contribute, learn, and grow together. ⚡ <br />
          Check my ✨ Website:{" "}
          <a
            href="https://www.recodehive.com"
            target="_blank"
            className="font-medium text-blue-600 hover:underline"
            rel="noreferrer"
          >
            https://www.recodehive.com{" "}
          </a>
          <br />
          📮 How to reach me:{" "}
          <a
            href="https://github.com/sanjay-kv"
            target="_blank"
            className="font-medium text-blue-600 hover:underline"
            rel="noreferrer"
          >
            github.com/sanjay-kv
          </a>
          <br />
          👫 Join my opensource community
        </p>

        <p className="mb-4 text-sm font-semibold text-gray-700">
          By <span className="text-gray-900">Sanjay Viswanathan</span> · Over{" "}
          <span className="text-gray-900">31,000 subscribers</span>
        </p>

        <form
          className="mb-4 flex w-full items-stretch overflow-hidden rounded-xl border-2 border-gray-300 bg-white shadow-inner focus-within:ring-2 focus-within:ring-blue-500"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Subscribed! (Integrate with Substack API)");
            handleClose();
          }}
        >
          <input
            type="email"
            required
            placeholder="Type your email..."
            className="flex-1 bg-transparent px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-orange-600 px-6 text-sm font-bold text-white transition duration-300 hover:from-orange-500 hover:to-orange-700"
          >
            Subscribe
          </button>
        </form>

        <p className="mb-4 text-xs text-gray-500">
          By subscribing, I agree to Substack’s{" "}
          <a href="#" className="underline hover:text-blue-600">
            Terms of Use
          </a>{" "}
          and acknowledge its{" "}
          <a href="#" className="underline hover:text-blue-600">
            Information Collection Notice
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-blue-600">
            Privacy Policy
          </a>
          .
        </p>

        <button
          onClick={handleClose}
          className="text-sm font-medium text-gray-600 transition hover:text-black"
          aria-label="Close newsletter popup"
        >
          No thanks →
        </button>
      </div>
    </div>
  );
};

export default NewsletterPopup;
