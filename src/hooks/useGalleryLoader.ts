import { useState, useEffect, useContext, useRef } from 'react';
import { GalleryImage, GallerySection } from '../components/baggy/BaggyGallery';
import { ImageLoadingContext } from '../App';

/**
 * Hook to preload and track loading progress of gallery images
 * @param images Array of gallery images
 * @param sections Optional array of gallery sections (unused)
 * @returns Object containing loading state and percentage loaded
 */
export function useGalleryLoader(
  images: GalleryImage[] = [], 
  sections: GallerySection[] = []
) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const { setImageLoadingProgress } = useContext(ImageLoadingContext);
  const imagesRef = useRef<GalleryImage[]>(images);
  const timeoutRef = useRef<{partial: NodeJS.Timeout | null, full: NodeJS.Timeout | null}>({
    partial: null,
    full: null
  });
  
  // Initialize the loading progress
  useEffect(() => {
    if (images.length === 0) {
      setIsLoading(false);
      setImageLoadingProgress(100);
      return;
    }
    
    // Store images in ref to avoid dependency issues
    imagesRef.current = images;
    
    // Immediately report partial progress to improve perceived loading
    const initialPercentage = 10; // Start showing some progress immediately
    setImageLoadingProgress(initialPercentage);
    
    // Setup image loading process
    let isUnmounted = false;
    const totalImages = images.length;
    let loaded = 0;
    const BATCH_SIZE = 4;
    let activeBatch = 0;
    let criticalImagesLoaded = false;
    
    // Function to update progress
    const updateProgress = () => {
      if (isUnmounted) return;
      
      loaded++;
      setLoadedCount(loaded);
      
      // Calculate percentage for the context
      // Weight the first few images more heavily to improve perceived performance
      let progress;
      if (loaded <= 3) {
        // First 3 images count for more progress (60% total)
        progress = Math.floor(20 * loaded); 
      } else {
        // Remaining images split the remaining 40%
        const remainingImages = totalImages - 3;
        const remainingProgress = 40;
        const progressPerRemainingImage = remainingProgress / Math.max(1, remainingImages);
        progress = 60 + Math.floor(progressPerRemainingImage * (loaded - 3));
      }
      
      setImageLoadingProgress(Math.min(progress, 100));
      
      // Mark critical images as loaded when the first 3 are done
      if (loaded >= 3 && !criticalImagesLoaded) {
        criticalImagesLoaded = true;
      }
      
      if (loaded === totalImages) {
        setIsLoading(false);
        setImageLoadingProgress(100);
      } else {
        // Load the next batch
        loadNextBatch();
      }
    };
    
    // Function to load the next batch
    const loadNextBatch = () => {
      if (isUnmounted) return;
      
      const nextBatchStart = (activeBatch + 1) * BATCH_SIZE;
      if (nextBatchStart < totalImages) {
        activeBatch++;
        const nextBatchEnd = Math.min(nextBatchStart + BATCH_SIZE, totalImages);
        loadBatch(nextBatchStart, nextBatchEnd, false);
      }
    };
    
    // Function to load a specific batch
    const loadBatch = (start: number, end: number, isCritical = false) => {
      if (isUnmounted) return;
      
      const batchImages = imagesRef.current.slice(start, end);
      batchImages.forEach(imageObj => {
        if (!imageObj.src) return;
        
        // Create new image element for preloading
        const img = new Image();
        img.onload = updateProgress;
        img.onerror = updateProgress; // Count errors as "loaded" to avoid hanging
        img.src = imageObj.src;
        
        // For critical images, set higher priority
        if (isCritical) {
          // Use setAttribute for fetchpriority to avoid TypeScript errors
          img.setAttribute('fetchpriority', 'high');
        }
      });
    };
    
    // Start loading the first batch (critical images)
    const firstBatchEnd = Math.min(3, totalImages); // Just 3 critical images
    loadBatch(0, firstBatchEnd, true); // Mark as critical
    
    // Immediately start loading the next batch too
    if (totalImages > 3) {
      const secondBatchEnd = Math.min(BATCH_SIZE + 3, totalImages);
      setTimeout(() => {
        if (!isUnmounted) {
          loadBatch(3, secondBatchEnd, false);
        }
      }, 100); // Small delay to let critical images start loading first
    }
    
    // Consider loading "done enough" after a shorter timeout
    // This improves perceived performance by not making users wait for all images
    timeoutRef.current.partial = setTimeout(() => {
      if (isUnmounted) return;
      
      if (loaded >= 3 && isLoading) {
        // If at least 3 images have loaded, we can consider it "loaded enough"
        // to let users interact with the page
        setImageLoadingProgress(80); // Show significant progress
      }
    }, 3000); // 3 second timeout for "good enough" loading
    
    // Set a timeout to prevent infinite loading
    timeoutRef.current.full = setTimeout(() => {
      if (isUnmounted) return;
      
      if (loaded < totalImages) {
        console.warn(`Gallery loading timed out after loading ${loaded}/${totalImages} images`);
        setIsLoading(false);
        setImageLoadingProgress(100);
      }
    }, 12000); // 12 second timeout (reduced from 15s)
    
    return () => {
      isUnmounted = true;
      // Clear timeouts
      if (timeoutRef.current.partial) clearTimeout(timeoutRef.current.partial);
      if (timeoutRef.current.full) clearTimeout(timeoutRef.current.full);
      // Cleanup - ensure we reset if component unmounts during loading
      setIsLoading(false);
    };
  }, []); // Empty dependency array means this only runs once
  
  return { 
    isLoading, 
    loadedCount, 
    totalCount: imagesRef.current.length
  };
} 