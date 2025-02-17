import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FunFooter() {
  const navigate = useNavigate();

  const handleChooseNewPath = () => {
    navigate('/', { replace: true });
    window.location.reload(); // This will reset the state and show the choice screen
  };

  return (
    <footer className="w-full border-t border-gray-200">
      <div className="max-w-4xl mx-auto py-12 px-8">
        <p className="text-gray-600 italic text-lg mb-4">
          okay okay, so you picked the fun site. that's great. maybe that means something 
          (maybe it doesn't). but aren't you interested in seeing what else is out there?
        </p>
        <button 
          onClick={handleChooseNewPath}
          className="inline-flex items-center gap-2 text-[#ff6b35] hover:text-[#ff8b35] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Choose a new path</span>
        </button>
      </div>
    </footer>
  );
} 