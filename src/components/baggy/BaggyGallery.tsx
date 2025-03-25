import React, { useState, useEffect, useRef } from 'react';
import BaggyImageModal from './BaggyImageModal';
import { useGalleryLoader } from '../../hooks/useGalleryLoader';

export interface GalleryImage {
  src: string;
  alt: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  credits?: {
    photographer?: string;
    model?: string;
    stylist?: string;
    makeup?: string;
    location?: string;
    [key: string]: string | undefined;
  };
}

// Define a gallery section with its own column configuration
export interface GallerySection {
  columns: number;
  images: GalleryImage[];
  title?: string;
}

interface BaggyGalleryProps {
  images?: GalleryImage[]; // Optional now as we can use sections instead
  sections?: GallerySection[]; // Alternative to using a flat images array
  columns?: number; // Default column count for flat images array
  gap?: number;
  onImagesLoaded?: () => void; // Callback when all images are loaded
}

const BaggyGallery: React.FC<BaggyGalleryProps> = ({
  images = [],
  sections = [],
  columns = 3,
  gap = 16,
  onImagesLoaded,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  // Compute this only once on initial render to avoid re-computation on every render
  const [allImages] = useState<GalleryImage[]>(() => {
    // If we have sections, flatten them to get all images
    if (sections.length > 0) {
      return sections.flatMap(section => section.images);
    }
    // Otherwise use the images prop
    return images;
  });
  
  // Preload critical images only once on initial render
  useEffect(() => {
    // Preload the first 3 images as soon as component renders
    const preloadCount = Math.min(3, allImages.length);
    const preloadLinks: HTMLLinkElement[] = [];
    
    for (let i = 0; i < preloadCount; i++) {
      const img = new Image();
      img.src = allImages[i].src;
      
      // Also add preload links to head for these critical images
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = allImages[i].src;
      link.setAttribute('fetchpriority', 'high');
      document.head.appendChild(link);
      preloadLinks.push(link);
    }
    
    // Clean up preload links on unmount
    return () => {
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, []); // Empty dependency array means this runs only once
  
  // Use our gallery loader hook
  const { isLoading, loadedCount, totalCount } = useGalleryLoader(allImages, []);
  const galleryRef = useRef<HTMLDivElement>(null);
  const visibleImagesLoaded = useRef(false);
  const prefetchedNextBatch = useRef(false);
  
  // Use IntersectionObserver to detect when gallery enters viewport
  useEffect(() => {
    if (!galleryRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visibleImagesLoaded.current) {
          visibleImagesLoaded.current = true;
          
          // Prefetch next batch only once
          if (!prefetchedNextBatch.current && allImages.length > 3) {
            prefetchedNextBatch.current = true;
            
            // First batch of images is already preloaded, now prefetch the next batch
            const nextBatchStart = 3; // We've already preloaded the first 3
            const nextBatchEnd = Math.min(nextBatchStart + 6, allImages.length);
            
            // Add these to a lower priority prefetch
            const prefetchLinks: HTMLLinkElement[] = [];
            for (let i = nextBatchStart; i < nextBatchEnd; i++) {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.as = 'image';
              link.href = allImages[i].src;
              document.head.appendChild(link);
              prefetchLinks.push(link);
            }
          }
        }
      },
      { threshold: 0.1 } // Trigger when 10% of gallery is visible
    );
    
    observer.observe(galleryRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array so this runs only once
  
  // Notify parent when all images are loaded or when enough critical images are loaded
  useEffect(() => {
    // If we have at least 3 images loaded, consider gallery "initially loaded" for UX purposes
    if (loadedCount >= 3 && onImagesLoaded && !visibleImagesLoaded.current) {
      visibleImagesLoaded.current = true;
      onImagesLoaded();
    }
    
    // Also notify when completely loaded
    if (!isLoading && onImagesLoaded) {
      onImagesLoaded();
    }
  }, [isLoading, loadedCount, onImagesLoaded]);
  
  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };
  
  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };
  
  // Helper function to render a single image
  const renderImage = (image: GalleryImage, index: number) => {
    // Default aspect ratio to portrait if not specified
    const aspectRatio = image.aspectRatio || 'portrait';
    
    // Set padding-top based on aspect ratio
    let paddingTop = '133.33%'; // portrait (3:4)
    if (aspectRatio === 'landscape') {
      paddingTop = '75%'; // landscape (4:3)
    } else if (aspectRatio === 'square') {
      paddingTop = '100%'; // square (1:1)
    }
    
    // Determine if this image should be prioritized (first few images)
    const isPriority = index < 6;
    
    return (
      <div 
        key={index}
        className="gallery-image-container"
        style={{ 
          position: 'relative',
          paddingTop,
          cursor: 'pointer',
          backgroundColor: '#f0f0f0', // Light gray background as placeholder
        }}
        onClick={() => handleImageClick(index)}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: isLoading ? 1 : 0,
            transition: 'opacity 0.3s',
            zIndex: 1,
          }}
        >
          <div className="h-8 w-8 border-2 border-t-black border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
        
        <img
          src={image.src}
          alt={image.alt}
          loading={isPriority ? "eager" : "lazy"}
          decoding={isPriority ? "sync" : "async"}
          className="gallery-image"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
          {...(isPriority ? { 'fetchpriority': 'high' as any } : {})}
          onLoad={(e) => {
            // Add the fade-in class when image is loaded
            (e.target as HTMLImageElement).classList.add('image-fade-in');
            
            // If this is one of the first images, update progress feedback
            if (index < 3) {
              // This helps with perceived performance by showing some images faster
              requestAnimationFrame(() => {
                document.body.style.setProperty('--image-progress', '40%');
              });
            }
          }}
        />
      </div>
    );
  };
  
  // Determine if we're using sections or a flat images array
  const usingSections = sections.length > 0;
  
  return (
    <div ref={galleryRef}>
      {usingSections ? (
        // Render each section with its own column configuration
        <div className="space-y-16">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={sectionIndex > 0 ? "pt-12 mt-12" : ""}>
              {/* Add a subtle divider between sections (except before the first section) */}
              {sectionIndex > 0 && (
                <div className="w-24 h-px bg-black/10 mx-auto mb-16"></div>
              )}
              
              {/* Optional section title */}
              {section.title && (
                <h3 className="text-center text-lg font-light tracking-wide mb-8 text-black/70">{section.title}</h3>
              )}
              
              {/* Grid for this section */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${section.columns}, 1fr)`, 
                  gap: `${gap}px`,
                }}
              >
                {section.images.map((image, imageIndex) => {
                  // Calculate the global index for the modal
                  const globalIndex = sections.slice(0, sectionIndex).reduce(
                    (count, s) => count + s.images.length, 0
                  ) + imageIndex;
                  
                  return renderImage(image, globalIndex);
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Render the flat images array with the default column configuration
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${columns}, 1fr)`, 
            gap: `${gap}px`,
          }}
        >
          {allImages.map((image, index) => renderImage(image, index))}
        </div>
      )}
      
      {/* Small loading indicator in the corner */}
      {isLoading && loadedCount > 0 && (
        <div className="fixed bottom-4 left-4 z-50 bg-white rounded-full shadow-lg py-1 px-3 flex items-center text-xs gap-2">
          <div className="h-4 w-4 border-2 border-t-black border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <span>Loading {loadedCount}/{totalCount} images...</span>
        </div>
      )}
      
      {selectedImageIndex !== null && (
        <BaggyImageModal
          images={allImages}
          currentIndex={selectedImageIndex}
          onClose={handleCloseModal}
          onNext={() => setSelectedImageIndex((prev) => (prev === null || prev >= allImages.length - 1) ? 0 : prev + 1)}
          onPrevious={() => setSelectedImageIndex((prev) => (prev === null || prev <= 0) ? allImages.length - 1 : prev - 1)}
        />
      )}
    </div>
  );
};

export default BaggyGallery; 