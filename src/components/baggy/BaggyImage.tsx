import React from 'react';

interface BaggyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'auto';
  credits?: {
    model?: string;
    photographer?: string;
  };
  onClick?: () => void;
}

const BaggyImage: React.FC<BaggyImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'auto',
  credits,
  onClick,
}) => {
  // Determine aspect ratio class
  const aspectRatioClass = {
    square: 'aspect-square',
    portrait: 'aspect-[2/3]',
    landscape: 'aspect-[3/2]',
    auto: 'aspect-auto',
  }[aspectRatio];

  return (
    <div 
      className={`relative overflow-hidden bg-gray-900 ${aspectRatioClass} ${className}`}
      onClick={onClick}
    >
      {/* Super simple image implementation */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      
      {/* Simple credits overlay */}
      {credits && (credits.model || credits.photographer) && (
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="text-xs text-white/70">
            {credits.model && <div>Model: {credits.model}</div>}
            {credits.photographer && <div>Photo: {credits.photographer}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default BaggyImage; 