
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center z-50">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
      <p className="text-white text-xl mt-4 font-semibold">Generating your headshot...</p>
      <p className="text-gray-300 mt-2">This may take a moment.</p>
    </div>
  );
};

export default Loader;
