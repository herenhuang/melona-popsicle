import React, { useEffect } from 'react';
import { GalleryImage } from './BaggyGallery';

export interface BaggyImageModalProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const BaggyImageModal: React.FC<BaggyImageModalProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}) => {
  const currentImage = images[currentIndex];

  // Set up keyboard event listeners for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  // Return null if no image is selected
  if (!currentImage) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '2rem',
          cursor: 'pointer',
          zIndex: 1001,
        }}
      >
        ×
      </button>

      {/* Navigation buttons */}
      <button 
        onClick={(e) => { e.stopPropagation(); onPrevious(); }}
        style={{
          position: 'absolute',
          left: '1rem',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '2rem',
          cursor: 'pointer',
          zIndex: 1001,
        }}
      >
        ‹
      </button>
      
      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        style={{
          position: 'absolute',
          right: '1rem',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '2rem',
          cursor: 'pointer',
          zIndex: 1001,
        }}
      >
        ›
      </button>

      {/* Image container */}
      <div 
        style={{
          maxWidth: '90%',
          maxHeight: '80%',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Image information */}
      <div 
        style={{
          color: 'white',
          padding: '1rem',
          textAlign: 'center',
          maxWidth: '90%',
        }}
      >
        {/* Counter */}
        <div style={{ marginBottom: '0.5rem' }}>
          {currentIndex + 1} / {images.length}
        </div>

        {/* Credits */}
        {currentImage.credits && (
          <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            {Object.entries(currentImage.credits)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <span key={key} style={{ marginRight: '1rem' }}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </span>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaggyImageModal; 