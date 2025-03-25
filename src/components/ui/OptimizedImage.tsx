import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface OptimizedImageProps {
  src: string;
  alt?: string;
  showCaption?: boolean;
  priority?: boolean;
  className?: string;
  [key: string]: any;
}

export const OptimizedImage = React.memo(({ 
  src, 
  alt, 
  showCaption = true,
  priority = false,
  className = '',
  ...props 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const location = useLocation();
  const shouldAnimate = !location.pathname.includes('baggy');
  
  // Ensure the src path is correct for public directory
  const normalizedSrc = useMemo(() => {
    return src;
  }, [src]);
  
  // Extract filename without extension for SEO if no alt text is provided
  const imageAlt = useMemo(() => {
    if (alt) return alt;
    
    const filename = src.split('/').pop()?.split('.')[0] || '';
    return filename
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }, [src, alt]);

  // Handle image load event
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Handle image error event
  const handleImageError = useCallback(() => {
    setIsError(true);
    setIsLoaded(true);
    console.error('Failed to load image:', normalizedSrc);
  }, [normalizedSrc]);

  // Prepare image attributes
  const imgAttributes = {
    ref: imgRef,
    src: normalizedSrc,
    alt: imageAlt,
    loading: priority ? 'eager' as const : 'lazy' as const,
    decoding: priority ? 'sync' as const : 'async' as const,
    onLoad: handleImageLoad,
    onError: handleImageError,
    className: `${className} ${shouldAnimate ? 'opacity-0 transition-opacity duration-500 ease-in' : ''} ${isLoaded ? 'opacity-100' : ''}`,
    ...props
  };

  return (
    <>
      <img {...imgAttributes} />
      
      {isError && (
        <span className="inline-block w-full text-left py-4 text-gray-500">
          <span className="block text-sm">Failed to load image</span>
          <span className="block text-xs mt-1">{normalizedSrc}</span>
        </span>
      )}
      
      {showCaption && imageAlt && (
        <span className="block text-xs text-left mt-1 text-gray-500 font-light">{imageAlt}</span>
      )}
    </>
  );
}); 