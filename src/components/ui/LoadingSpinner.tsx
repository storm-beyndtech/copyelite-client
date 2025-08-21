import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center w-[250px] h-[250px] rounded-xl bg-gray-200 dark:bg-gray-700">
    <div className="w-12 h-12 border-4 border-t-brandblue border-gray-300 rounded-full animate-spin"></div>
  </div>
);

export default LoadingSpinner;