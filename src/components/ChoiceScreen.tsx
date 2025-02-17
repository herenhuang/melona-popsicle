import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ChoiceScreenProps {
  onChoice: (choice: 'fun' | 'regular') => void;
}

export function ChoiceScreen({ onChoice }: ChoiceScreenProps) {
  const navigate = useNavigate();

  const handleFunClick = () => {
    onChoice('fun');
    navigate('/', { state: { fromChoice: true } });
  };

  const handleRegularClick = () => {
    onChoice('regular');
    navigate('/boring');
  };

  return (
    <div className="min-h-screen bg-[#f5f3e8] flex flex-col items-center justify-center gap-8">
      <h1 className="font-sora text-3xl text-[#ff6b35] text-center">
        How would you like to experience this website?
      </h1>
      <div className="flex gap-4">
        <button
          onClick={handleFunClick}
          className="px-8 py-4 border-2 border-[#ff6b35] text-[#ff6b35] rounded-lg font-inter hover:bg-[#ff6b35] hover:text-white transition-colors"
        >
          Fun Website
        </button>
        <button
          onClick={handleRegularClick}
          className="px-8 py-4 border-2 border-[#ff6b35] text-[#ff6b35] rounded-lg font-inter hover:bg-[#ff6b35] hover:text-white transition-colors"
        >
          Regular Site
        </button>
      </div>
    </div>
  );
} 