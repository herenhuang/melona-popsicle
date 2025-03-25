import React from 'react';
import { Link } from 'react-router-dom';
import { GalleryImage } from './BaggyGallery';

interface BaggyFeaturedCollectionsProps {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
  buttonText: string;
  buttonLink: string;
}

const BaggyFeaturedCollections: React.FC<BaggyFeaturedCollectionsProps> = ({
  title,
  subtitle,
  images,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Featured images grid - 2x2 on desktop, 1x4 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {images.slice(0, 4).map((image, index) => (
            <div 
              key={`featured-image-${index}`}
              className="w-full relative aspect-[3/4]"
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {image.credits && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2">
                  {image.credits.photographer && <span>Photo: {image.credits.photographer} </span>}
                  {image.credits.model && <span>Model: {image.credits.model}</span>}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to={buttonLink}
            className="inline-block px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition duration-300 tracking-widest text-sm font-medium"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BaggyFeaturedCollections; 