import React, { useEffect, useState } from 'react';

const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSubscribed = localStorage.getItem('recodehive_newsletter_popup');

    if (hasSubscribed !== 'true') {
      const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.body.scrollHeight;

        if (scrollPosition / pageHeight >= 0.8) {
          setShowPopup(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('recodehive_newsletter_popup', 'true');
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white/80 backdrop-blur-xl max-w-xl w-full rounded-3xl shadow-2xl p-8 text-center relative border border-gray-200 animate-fade-in">
        <img
          src="/img/logo.png"
          alt="RecodeHive Logo"
          className="w-16 h-16 mx-auto mb-4 rounded-full shadow-md"
        />

        <h2 className="text-3xl font-extrabold mb-2 text-gray-900">
          Sanjay’s Substack
        </h2>

        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Recodehive is an inclusive and welcoming platform where everyone can
          contribute, learn, and grow together. ⚡ <br />
          Check my ✨ Website:{' '}
          <a
            href="https://www.recodehive.com"
            target="_blank"
            className="text-blue-600 hover:underline font-medium"
          >
            https://www.recodehive.com{' '}
          </a>
          <br />
          📮 How to reach me:{' '}
          <a
            href="https://github.com/sanjay-kv"
            target="_blank"
            className="text-blue-600 hover:underline font-medium"
          >
            github.com/sanjay-kv
          </a>
          <br />
          👫 Join my opensource community
        </p>

        <p className="text-sm font-semibold text-gray-700 mb-4">
          By <span className="text-gray-900">Sanjay Viswanathan</span> · Over{' '}
          <span className="text-gray-900">31,000 subscribers</span>
        </p>

        <form
          className="flex items-stretch w-full border-2 border-gray-300 rounded-xl overflow-hidden bg-white shadow-inner mb-4 focus-within:ring-2 focus-within:ring-blue-500"
          onSubmit={e => {
            e.preventDefault();
            alert('Subscribed! (Integrate with Substack API)');
            handleClose();
          }}
        >
          <input
            type="email"
            required
            placeholder="Type your email..."
            className="flex-1 px-4 py-2 text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 text-sm font-bold transition duration-300 hover:from-orange-500 hover:to-orange-700"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-gray-500 mb-4">
          By subscribing, I agree to Substack’s{' '}
          <a href="#" className="underline hover:text-blue-600">
            Terms of Use
          </a>{' '}
          and acknowledge its{' '}
          <a href="#" className="underline hover:text-blue-600">
            Information Collection Notice
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-blue-600">
            Privacy Policy
          </a>
          .
        </p>

        <button
          onClick={handleClose}
          className="text-sm text-gray-600 font-medium hover:text-black transition"
          aria-label="Close newsletter popup"
        >
          No thanks →
        </button>
      </div>
    </div>
  );
};

export default NewsletterPopup;
