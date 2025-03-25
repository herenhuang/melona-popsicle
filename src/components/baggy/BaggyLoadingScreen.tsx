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
  
  // Combine internal loading progress with image loading progress
  const combinedProgress = Math.max(internalProgress, imageLoadingProgress);
  
  // Start internal progress animation
  useEffect(() => {
    let interval = setInterval(() => {
      setInternalProgress(prev => {
        if (prev >= 40) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 30);
    
    const slowTimer = setTimeout(() => {
      clearInterval(interval);
      interval = setInterval(() => {
        setInternalProgress(prev => {
          if (prev >= 70) {
            clearInterval(interval);
            return prev;
          }
          return prev + 0.5;
        });
      }, 100);
    }, 1000);
    
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
    if (initialLoadComplete && (imageLoadingProgress >= 100 || combinedProgress >= 85)) {
      const completeTimeout = setTimeout(() => {
        setInternalProgress(100);
        
        const exitTimeout = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onLoadingComplete, 1000);
        }, 500);
        
        return () => clearTimeout(exitTimeout);
      }, imageLoadingProgress >= 100 ? 0 : 2000);
      
      return () => clearTimeout(completeTimeout);
    }
    return undefined;
  }, [initialLoadComplete, imageLoadingProgress, combinedProgress, onLoadingComplete]);
  
  // Fallback timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isVisible) {
        console.warn('Loading screen timed out after maximum wait time');
        setInternalProgress(100);
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
                  d="M 0,8 L ${combinedProgress * 3},8"
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
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                />
                
                {/* Bottom border */}
                <motion.path
                  d="M 300,398 L 0,398"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: combinedProgress / 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
                />
                
                {/* Left border */}
                <motion.path
                  d="M 2,400 L 2,0"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: combinedProgress / 100 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }}
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 