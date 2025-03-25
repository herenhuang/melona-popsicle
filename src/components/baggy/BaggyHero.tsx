import React from 'react';
import { Link } from 'react-router-dom';

interface BaggyHeroProps {
  imageSrc: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
}

const BaggyHero: React.FC<BaggyHeroProps> = ({
  imageSrc,
  title,
  subtitle,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest text-white mb-4">
          {title}
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-2xl tracking-wide font-light mb-8">
          {subtitle}
        </p>
        
        {buttonText && buttonLink && (
          <Link
            to={buttonLink}
            className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition duration-300 tracking-widest text-sm"
          >
            {buttonText}
          </Link>
        )}
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/80 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default BaggyHero; 