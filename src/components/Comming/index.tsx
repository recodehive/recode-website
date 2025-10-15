import React from "react";

interface ComingProps {
  // Optional props can be added here
  // className?: string;
}

/**
 * A maintenance notification component with contained sizing.
 * @returns {JSX.Element} A React functional component
 */
const Coming: React.FC<ComingProps> = () => {
  return (
    <div className="mx-auto my-8 flex max-w-2xl flex-col items-center justify-center rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
      <img
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Maintenance in progress"
        className="mb-6 h-32 w-32"
        height={100}
        width={100}
        loading="lazy"
      />
      <h1 className="mb-3 text-center text-3xl font-bold text-gray-800 dark:text-white">
        Site Maintenance
      </h1>
      <p className="mb-6 text-center text-gray-600 dark:text-gray-300">
        We're working hard to improve your experience. Please check back soon!
      </p>
      <div className="flex w-full flex-col gap-10 sm:flex-row">
        <a
          href="/contact"
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default Coming;
