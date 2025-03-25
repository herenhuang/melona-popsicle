import React from 'react';

interface ModeToggleProps {
  isPersonal: boolean;
  onToggle: () => void;
}

export function ModeToggle({ isPersonal, onToggle }: ModeToggleProps) {
  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-[#f5f3e8]/80 backdrop-blur-sm px-4 py-2 rounded-lg">
      <span className={`font-inter text-sm ${
        isPersonal ? 'text-[#ff6b35]' : 'text-gray-500'
      }`}>
        Play
      </span>
      <button
        onClick={onToggle}
        className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-200/50 backdrop-blur-sm shadow-inner"
      >
        <div
          className={`absolute w-4 h-4 rounded-full transition-all duration-200 ease-in-out bg-white shadow-md ${
            isPersonal ? 'translate-x-1' : 'translate-x-7' 
          }`}
        />
      </button>
      <span className={`font-inter text-sm ${
        !isPersonal ? 'text-[#ff6b35]' : 'text-gray-500'
      }`}>
        Work
      </span>
    </div>
  );
}