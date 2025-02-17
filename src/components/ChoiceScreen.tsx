import React from 'react';

interface ChoiceScreenProps {
  onChoice: (choice: 'fun' | 'regular') => void;
}

export function ChoiceScreen({ onChoice }: ChoiceScreenProps) {
  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col items-center justify-center gap-8">
      <h1 className="font-sora text-3xl text-[#ff6b35] text-center">
        How would you like to experience this website?
      </h1>
      <div className="flex gap-4">
        <button
          onClick={() => onChoice('fun')}
          className="px-8 py-4 border-2 border-[#ff6b35] text-[#ff6b35] rounded-lg font-inter hover:bg-[#ff6b35] hover:text-white transition-colors"
        >
          Fun Website
        </button>
        <button
          onClick={() => onChoice('regular')}
          className="px-8 py-4 border-2 border-[#ff6b35] text-[#ff6b35] rounded-lg font-inter hover:bg-[#ff6b35] hover:text-white transition-colors"
        >
          Regular Website
        </button>
      </div>
    </div>
  );
} 