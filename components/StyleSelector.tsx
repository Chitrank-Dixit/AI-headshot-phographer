
import React from 'react';
import { HEADSHOT_STYLES } from '../constants';
import type { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: HeadshotStyle;
  onStyleSelect: (style: HeadshotStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {HEADSHOT_STYLES.map((style) => (
        <button
          key={style.name}
          onClick={() => onStyleSelect(style)}
          className={`relative block w-full aspect-square rounded-lg overflow-hidden transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${
            selectedStyle.name === style.name
              ? 'ring-4 ring-blue-500 scale-105'
              : 'ring-2 ring-transparent hover:scale-105 hover:ring-gray-500'
          }`}
        >
          <img
            src={style.imageUrl}
            alt={style.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-2">
            <span className="text-white text-sm font-semibold">{style.name}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;
