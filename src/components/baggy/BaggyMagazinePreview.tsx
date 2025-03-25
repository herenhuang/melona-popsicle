import React from 'react';
import { Link } from 'react-router-dom';

interface BaggyMagazinePreviewProps {
  title: string;
  subtitle?: string;
  coverImage: string;
  buttonText: string;
  buttonLink: string;
}

const BaggyMagazinePreview: React.FC<BaggyMagazinePreviewProps> = ({
  title,
  subtitle,
  coverImage,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text content */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-white/70 text-lg mb-8">
                {subtitle}
              </p>
            )}
            <Link
              to={buttonLink}
              className="inline-block px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition duration-300 tracking-widest text-sm font-medium"
            >
              {buttonText}
            </Link>
          </div>
          
          {/* Magazine cover */}
          <div className="md:w-1/2 relative">
            <div className="relative mx-auto max-w-xs md:max-w-sm">
              {/* Shadow effect */}
              <div className="absolute inset-0 transform translate-x-4 translate-y-4 bg-white/10 -z-10"></div>
              
              {/* Cover image */}
              <img
                src={coverImage}
                alt="BAGGY Magazine Cover"
                className="w-full h-auto border border-white/20"
              />
              
              {/* Diagonal accents */}
              <div className="absolute top-4 left-4 w-12 h-1 bg-white transform -rotate-45"></div>
              <div className="absolute bottom-4 right-4 w-12 h-1 bg-white transform -rotate-45"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaggyMagazinePreview; 