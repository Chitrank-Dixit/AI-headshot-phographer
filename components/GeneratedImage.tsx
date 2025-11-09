
import React from 'react';
import { DownloadIcon, RedoIcon } from './icons';

interface GeneratedImageProps {
  imageUrl: string;
  onReset: () => void;
}

const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl, onReset }) => {
  return (
    <div className="flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-lg h-full">
      <h2 className="text-2xl font-bold text-gray-300 mb-4">Your Headshot is Ready!</h2>
      <div className="w-full max-w-md aspect-square rounded-xl shadow-lg overflow-hidden bg-gray-700 mb-6">
        <img
          src={imageUrl}
          alt="Generated headshot"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={imageUrl}
          download="ai-headshot.png"
          className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors duration-200"
        >
          <DownloadIcon className="w-6 h-6" />
          Download
        </a>
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors duration-200"
        >
          <RedoIcon className="w-6 h-6" />
          Create Another
        </button>
      </div>
    </div>
  );
};

export default GeneratedImage;
