import React from 'react';
import { BaggyPhoto } from '../../data/baggyPhotoTypes';

interface BaggyEnhancedImageProps {
  photo: BaggyPhoto;
  showMetadata?: boolean;
  showDetailedCredits?: boolean;
  hoverEffect?: boolean;
  className?: string;
  onClick?: () => void;
}

const BaggyEnhancedImage: React.FC<BaggyEnhancedImageProps> = ({
  photo,
  showMetadata = false,
  showDetailedCredits = false,
  hoverEffect = true,
  className = '',
  onClick
}) => {
  const renderCredits = () => {
    if (!showDetailedCredits) {
      return (
        <p className="text-sm text-white/70">
          Photo: {photo.credits.photographer}, {photo.credits.agency}
        </p>
      );
    }
    
    return (
      <div className="space-y-1">
        <p className="text-sm">
          <span className="font-medium">Photographer:</span> {photo.credits.photographer}
        </p>
        {photo.credits.agency && (
          <p className="text-sm">
            <span className="font-medium">Agency:</span> {photo.credits.agency}
          </p>
        )}
        {photo.credits.models && photo.credits.models.length > 0 && (
          <p className="text-sm">
            <span className="font-medium">Models:</span> {photo.credits.models.join(', ')}
          </p>
        )}
        {photo.credits.stylist && (
          <p className="text-sm">
            <span className="font-medium">Styling:</span> {photo.credits.stylist}
          </p>
        )}
        {photo.credits.makeup && (
          <p className="text-sm">
            <span className="font-medium">Makeup:</span> {photo.credits.makeup}
          </p>
        )}
        {photo.credits.hair && (
          <p className="text-sm">
            <span className="font-medium">Hair:</span> {photo.credits.hair}
          </p>
        )}
        {photo.credits.location && (
          <p className="text-sm">
            <span className="font-medium">Location:</span> {photo.credits.location}
          </p>
        )}
      </div>
    );
  };
  
  return (
    <div 
      className={`group relative overflow-hidden ${className}`}
      onClick={onClick}
    >
      {/* Simple direct image display */}
      <div className="relative aspect-[4/5] bg-black/20">
        <img
          src={photo.url}
          alt={photo.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Metadata information */}
      {showMetadata && (
        <div className="pt-3 pb-6">
          <h3 className="text-lg font-medium text-white">{photo.title}</h3>
          <p className="text-white/70 text-sm mt-1">{photo.collection}</p>
          {renderCredits()}
          
          {showDetailedCredits && (
            <div className="mt-4">
              <p className="text-sm">
                <span className="font-medium">Date:</span> {photo.metadata.date}
              </p>
              {photo.metadata.tags.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm font-medium">Tags: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {photo.metadata.tags.map((tag, index) => (
                      <span 
                        key={`tag-${index}`}
                        className="inline-block bg-white/10 text-white/80 px-2 py-1 rounded-sm text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BaggyEnhancedImage; 