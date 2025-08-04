import React from 'react';

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
    <div className="flex flex-col justify-center items-center p-6 mx-auto my-8 max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-lg">
      <img
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Maintenance in progress"
        className="mb-6 h-32 w-32"
        height={100}
        width={100}
        loading="lazy"
      />
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-3">
        Site Maintenance
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        We're working hard to improve your experience. Please check back soon!
      </p>
      <div className="flex flex-col sm:flex-row gap-10 w-full">
        <a
          href="/contact"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors "
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default Coming;
