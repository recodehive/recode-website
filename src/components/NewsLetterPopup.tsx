import React, { useEffect, useState } from "react";
import { subscribeToSubstack } from "../lib/substack";

const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTheme = () => {
      const isDarkTheme =
        document.documentElement.getAttribute("data-theme") === "dark" ||
        document.documentElement.classList.contains("dark");
      setIsDark(isDarkTheme);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class"],
    });

    return () => observer.disconnect();
  }, []);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
      <div
        className={`animate-fade-in relative w-full max-w-xl rounded-3xl p-8 text-center shadow-2xl backdrop-blur-xl transition-all duration-300 dark:border-zinc-800 dark:bg-[#12141a]/95 dark:text-zinc-100 ${
          isDark
            ? "border border-zinc-800 bg-[#12141a]/95 text-zinc-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
            : "border border-gray-200 bg-white/90 text-gray-900"
        }`}
      >
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 rounded-full p-2 transition-colors cursor-pointer ${
            isDark
              ? "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          }`}
          aria-label="Close newsletter popup"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <img
          src="/img/logo.png"
          alt="recode hive Logo"
          className={`mx-auto mb-4 h-16 w-16 rounded-full transition-all duration-300 ${
            isDark
              ? "shadow-lg ring-2 ring-zinc-700/60 bg-zinc-900"
              : "shadow-md"
          }`}
        />

        <h2
          className={`mb-2 text-3xl font-extrabold tracking-tight transition-colors duration-300 dark:text-white ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Sanjay’s Substack
        </h2>

        <p
          className={`mb-4 text-base leading-relaxed transition-colors duration-300 dark:text-zinc-300 ${
            isDark ? "text-zinc-300" : "text-gray-700"
          }`}
        >
          recode hive is an inclusive and welcoming platform where everyone can
          contribute, learn, and grow together. ⚡ <br />
          Check my ✨ Website:{" "}
          <a
            href="https://www.recodehive.com"
            target="_blank"
            className={`font-medium transition-colors hover:underline ${
              isDark
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            }`}
            rel="noreferrer"
          >
            https://www.recodehive.com{" "}
          </a>
          <br />
          📮 How to reach me:{" "}
          <a
            href="https://github.com/sanjay-kv"
            target="_blank"
            className={`font-medium transition-colors hover:underline ${
              isDark
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-700"
            }`}
            rel="noreferrer"
          >
            github.com/sanjay-kv
          </a>
          <br />
          👫 Join my opensource community
        </p>

        <p
          className={`mb-4 text-sm font-semibold transition-colors duration-300 dark:text-zinc-400 ${
            isDark ? "text-zinc-400" : "text-gray-700"
          }`}
        >
          By{" "}
          <span
            className={
              isDark ? "font-bold text-white" : "font-semibold text-gray-900"
            }
          >
            Sanjay Viswanathan
          </span>{" "}
          · Over{" "}
          <span
            className={
              isDark ? "font-bold text-white" : "font-semibold text-gray-900"
            }
          >
            31,000 subscribers
          </span>
        </p>

        <form
          className={`mb-4 flex w-full items-stretch overflow-hidden rounded-xl border-2 transition-all duration-300 ${
            isDark
              ? "border-zinc-700 bg-zinc-900/90 shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30"
              : "border-gray-300 bg-white shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            subscribeToSubstack(email.trim());
            handleClose();
          }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email..."
            className={`flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none ${
              isDark
                ? "text-zinc-100 placeholder-zinc-500"
                : "text-gray-800 placeholder-gray-400"
            }`}
          />
          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-orange-400 to-orange-600 px-6 text-sm font-bold text-white transition duration-300 hover:from-orange-500 hover:to-orange-700 active:scale-95"
          >
            Subscribe
          </button>
        </form>

        <p
          className={`mb-4 text-xs transition-colors duration-300 dark:text-zinc-400 ${
            isDark ? "text-zinc-400" : "text-gray-500"
          }`}
        >
          By subscribing, I agree to Substack’s{" "}
          <a
            href="https://substack.com/tos"
            target="_blank"
            rel="noreferrer"
            className={`underline transition-colors ${
              isDark
                ? "text-zinc-300 hover:text-blue-400"
                : "hover:text-blue-600"
            }`}
          >
            Terms of Use
          </a>{" "}
          and acknowledge its{" "}
          <a
            href="https://substack.com/privacy"
            target="_blank"
            rel="noreferrer"
            className={`underline transition-colors ${
              isDark
                ? "text-zinc-300 hover:text-blue-400"
                : "hover:text-blue-600"
            }`}
          >
            Information Collection Notice
          </a>{" "}
          and{" "}
          <a
            href="https://substack.com/privacy"
            target="_blank"
            rel="noreferrer"
            className={`underline transition-colors ${
              isDark
                ? "text-zinc-300 hover:text-blue-400"
                : "hover:text-blue-600"
            }`}
          >
            Privacy Policy
          </a>
          .
        </p>

        <button
          onClick={handleClose}
          className={`text-sm font-medium transition-colors cursor-pointer dark:text-zinc-400 dark:hover:text-white ${
            isDark
              ? "text-zinc-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
          aria-label="Close newsletter popup"
        >
          No thanks →
        </button>
      </div>
    </div>
  );
};

export default NewsletterPopup;