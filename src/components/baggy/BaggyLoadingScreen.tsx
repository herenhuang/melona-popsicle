import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BaggyLoadingScreenProps {
  onLoadingComplete: () => void;
  imageLoadingProgress?: number;
}

export function BaggyLoadingScreen({ onLoadingComplete, imageLoadingProgress = 0 }: BaggyLoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [internalProgress, setInternalProgress] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [borderLoaded, setBorderLoaded] = useState(false);
  
  // Combine internal loading progress with image loading progress
  const combinedProgress = Math.max(internalProgress, imageLoadingProgress);
  
  // Start internal progress animation
  useEffect(() => {
    let interval = setInterval(() => {
      setInternalProgress(prev => {
        // Make it go to 100% faster
        const increment = prev < 80 ? 3 : 6;
        const nextValue = prev + increment;
        
        if (nextValue >= 100) {
          clearInterval(interval);
          // Set a flag when border is fully loaded (100%)
          setBorderLoaded(true);
          return 100;
        }
        return nextValue;
      });
    }, 30);
    
    const initialLoadTimer = setTimeout(() => {
      setInitialLoadComplete(true);
    }, 1500); // Shortened to 1.5s for faster initial loading
    
    return () => {
      clearInterval(interval);
      clearTimeout(initialLoadTimer);
    };
  }, []);
  
  // Handle loading completion - only after border is fully loaded
  useEffect(() => {
    if (initialLoadComplete && borderLoaded) {
      // Add a small delay to admire the full border
      const completeTimeout = setTimeout(() => {
        const exitTimeout = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onLoadingComplete, 1000);
        }, 500);
        
        return () => clearTimeout(exitTimeout);
      }, 800); // 800ms delay to see the complete border
      
      return () => clearTimeout(completeTimeout);
    }
    return undefined;
  }, [initialLoadComplete, borderLoaded, onLoadingComplete]);
  
  // Fallback timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isVisible) {
        console.warn('Loading screen timed out after maximum wait time');
        setInternalProgress(100);
        setBorderLoaded(true);
        setIsVisible(false);
        setTimeout(onLoadingComplete, 1000);
      }
    }, 8000);
    
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
            className="relative"
          >
            {/* Container for garbage bag image and border */}
            <div className="relative">
              {/* Garbage bag image */}
              <img
                src="/images/baggy/garbagebag.jpg"
                alt="BAGGY"
                className="w-[300px] h-auto rounded-lg"
              />
              
              {/* Animated border container */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 300 400"
                fill="none"
                preserveAspectRatio="none"
              >
                {/* Top border */}
                <motion.path
                  d="M 0,2 L 300,2"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: combinedProgress / 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                
                {/* Right border */}
                <motion.path
                  d="M 298,0 L 298,400"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: combinedProgress / 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
                />
                
                {/* Bottom border */}
                <motion.path
                  d="M 300,398 L 0,398"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: combinedProgress / 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                />
                
                {/* Left border */}
                <motion.path
                  d="M 2,400 L 2,0"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: combinedProgress / 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
                />
              </svg>

              {/* Add a complete border once loading is at 100% */}
              {combinedProgress >= 100 && (
                <div className="absolute inset-0 border-2 border-black rounded-lg"></div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 