import React, { useState } from 'react';

interface CircularButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const CircularButton: React.FC<CircularButtonProps> = ({ 
  text, 
  onClick, 
  className = '' 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative
        w-32 h-32 md:w-40 md:h-40
        rounded-full
        bg-white
        border border-black
        text-black
        font-medium
        flex items-center justify-center
        transition-all
        duration-300
        transform
        ${isHovered ? 'scale-105 shadow-lg' : 'shadow-md'}
        ${className}
      `}
      style={{
        // Add subtle floating effect when hovered
        transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)'
      }}
    >
      {/* Pulsing ring effect */}
      <div 
        className={`
          absolute inset-0 
          rounded-full 
          border border-black 
          animate-pulse-slow
        `}
      />
      
      {/* Inner circle with text */}
      <div className="flex flex-col items-center justify-center">
        <span>{text}</span>
      </div>
    </button>
  );
};

export default CircularButton; 