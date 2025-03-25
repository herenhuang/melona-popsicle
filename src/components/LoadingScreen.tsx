import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesText } from './ui/sparkles-text';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  imageLoadingProgress?: number; // Add a prop for tracking image loading progress
}

export function LoadingScreen({ onLoadingComplete, imageLoadingProgress = 0 }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [internalProgress, setInternalProgress] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  
  // Combine internal loading progress (for animations) with image loading progress
  const combinedProgress = Math.max(internalProgress, imageLoadingProgress);
  
  // Start internal progress animation - this is for UI feedback while real loading happens
  useEffect(() => {
    // Start with fast progress up to 40% to show something happening
    let interval = setInterval(() => {
      setInternalProgress(prev => {
        if (prev >= 40) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2; // Faster initial progress (2% per step)
      });
    }, 30);
    
    // After 1 second, slow down progress to 70% for the rest
    const slowTimer = setTimeout(() => {
      clearInterval(interval);
      interval = setInterval(() => {
        setInternalProgress(prev => {
          if (prev >= 70) {
            clearInterval(interval);
            return prev;
          }
          return prev + 0.5; // Slower progress (0.5% per step)
        });
      }, 100);
    }, 1000);
    
    // After 2.5 seconds, consider the initial load complete
    const initialLoadTimer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 2500);
    
    return () => {
      clearInterval(interval);
      clearTimeout(slowTimer);
      clearTimeout(initialLoadTimer);
    };
  }, []);
  
  // Handle loading completion
  useEffect(() => {
    // Only complete loading when:
    // 1. Initial animations have run (initialLoadComplete = true)
    // 2. Either image loading is at 100% OR we've shown 85%+ progress for over 2 seconds
    if (initialLoadComplete && (imageLoadingProgress >= 100 || combinedProgress >= 85)) {
      // Consider loading complete
      const completeTimeout = setTimeout(() => {
        setInternalProgress(100); // Force to 100%
        
        // Short delay before transitioning out
        const exitTimeout = setTimeout(() => {
          setIsVisible(false);
          // Give the exit animation time to complete before calling onLoadingComplete
          setTimeout(onLoadingComplete, 1000);
        }, 500);
        
        return () => clearTimeout(exitTimeout);
      }, imageLoadingProgress >= 100 ? 0 : 2000); // If images are truly loaded, transition immediately
      
      return () => clearTimeout(completeTimeout);
    }
    return undefined;
  }, [initialLoadComplete, imageLoadingProgress, combinedProgress, onLoadingComplete]);
  
  // Fallback (timeout) if loading takes too long
  useEffect(() => {
    // Maximum wait time
    const timeout = setTimeout(() => {
      if (isVisible) {
        console.warn('Loading screen timed out after maximum wait time');
        setInternalProgress(100);
        setIsVisible(false);
        // Give the exit animation time to complete before calling onLoadingComplete
        setTimeout(onLoadingComplete, 1000);
      }
    }, 8000); // Maximum 8 seconds wait
    
    return () => clearTimeout(timeout);
  }, [isVisible, onLoadingComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <SparklesText
              text="helen huang"
              colors={{ first: "#76bb5d", second: "#9774cc" }}
              className="text-6xl md:text-8xl font-bold text-[#ff6b35] font-sora"
              sparklesCount={1}
            />
            
            {/* Removed loading progress bar and loading text */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 