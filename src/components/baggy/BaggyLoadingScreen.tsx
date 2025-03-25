import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BaggyLoadingScreenProps {
  onLoadingComplete: () => void;
  imageLoadingProgress?: number;
}

export function BaggyLoadingScreen({ onLoadingComplete, imageLoadingProgress = 0 }: BaggyLoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [borderComplete, setBorderComplete] = useState(false);
  
  // Simple progress animation that goes to 100% in stages
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // First quickly go to 50%
    timer = setTimeout(() => {
      setProgress(50);
      
      // Then more gradually to 100%
      timer = setTimeout(() => {
        setProgress(100);
        setBorderComplete(true);
        
        // Wait to show the complete border
        timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onLoadingComplete, 1000);
        }, 1000);
      }, 1000);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

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
              
              {/* Simple border animation */}
              <div className="absolute inset-0">
                {/* Top border */}
                <motion.div 
                  className="absolute top-0 left-0 h-[2px] bg-black"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Right border */}
                <motion.div 
                  className="absolute top-0 right-0 w-[2px] bg-black"
                  style={{ height: `${progress}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${progress}%` }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                
                {/* Bottom border */}
                <motion.div 
                  className="absolute bottom-0 right-0 h-[2px] bg-black"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                
                {/* Left border */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-[2px] bg-black"
                  style={{ height: `${progress}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${progress}%` }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
              </div>
              
              {/* Complete border when animation finishes */}
              {borderComplete && (
                <div className="absolute inset-0 border-2 border-black rounded-lg"></div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 