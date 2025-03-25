import { useState, useEffect } from 'react';

/**
 * Hook to preload images from content and track their loading status
 * @param content String content that might contain image URLs
 * @returns Object containing loading state and percentage loaded
 */
export function useImagePreload(content: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // Extract image URLs from content
  useEffect(() => {
    if (!content) {
      setIsLoading(false);
      return;
    }

    // Extract image URLs from the markdown content
    const imgRegex = /!\[.*?\]\((.*?)\)/g;
    const imageMatches = [...content.matchAll(imgRegex)];
    const mdImageUrls = imageMatches.map(match => match[1]);
    
    // Also look for HTML image tags
    const htmlImgRegex = /<img.*?src=["'](.*?)["']/g;
    const htmlImageMatches = [...content.matchAll(htmlImgRegex)];
    const htmlImageUrls = htmlImageMatches.map(match => match[1]);
    
    // Combine all unique image URLs
    const allImageUrls = [...new Set([...mdImageUrls, ...htmlImageUrls])];
    
    if (allImageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    setImageUrls(allImageUrls);
  }, [content]);

  // Preload images in batches to prevent overwhelming the browser
  useEffect(() => {
    if (imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;
    const BATCH_SIZE = 3; // Load 3 images concurrently at most
    let activeBatch = 0;
    let isUnmounted = false;

    // Function to update progress
    const updateProgress = () => {
      if (isUnmounted) return;
      
      loadedCount++;
      const progress = Math.floor((loadedCount / totalImages) * 100);
      setLoadingProgress(progress);
      
      if (loadedCount === totalImages) {
        setIsLoading(false);
      } else {
        // Load the next batch if needed
        loadNextBatch();
      }
    };

    // Function to load the next batch of images
    const loadNextBatch = () => {
      if (isUnmounted) return;
      
      const nextBatchStart = (activeBatch + 1) * BATCH_SIZE;
      if (nextBatchStart < totalImages) {
        activeBatch++;
        const nextBatchEnd = Math.min(nextBatchStart + BATCH_SIZE, totalImages);
        loadBatch(nextBatchStart, nextBatchEnd);
      }
    };

    // Function to load a specific batch of images
    const loadBatch = (start: number, end: number) => {
      const batchUrls = imageUrls.slice(start, end);
      batchUrls.forEach(url => {
        const img = new Image();
        img.onload = updateProgress;
        img.onerror = updateProgress; // Count errors as "loaded" to avoid hanging
        img.src = url;
      });
    };

    // Start loading the first batch
    const firstBatchEnd = Math.min(BATCH_SIZE, totalImages);
    loadBatch(0, firstBatchEnd);

    // For a small number of images, start loading the next batch immediately
    if (totalImages <= BATCH_SIZE * 2) {
      const secondBatchEnd = Math.min(BATCH_SIZE * 2, totalImages);
      loadBatch(BATCH_SIZE, secondBatchEnd);
    }

    // Set up a timeout to ensure loading completes even if some images fail silently
    const timeout = setTimeout(() => {
      if (isUnmounted) return;
      if (loadedCount < totalImages) {
        console.warn(`Preloading timed out after loading ${loadedCount}/${totalImages} images`);
        setIsLoading(false);
      }
    }, 10000); // 10-second timeout

    return () => {
      isUnmounted = true;
      clearTimeout(timeout);
      // Cleanup if component unmounts during loading
      setIsLoading(false);
    };
  }, [imageUrls]);

  return { isLoading, loadingProgress };
} 