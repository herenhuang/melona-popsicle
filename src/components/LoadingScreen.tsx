import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesText } from './ui/sparkles-text';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Wait for text fade-in (2s) + a small buffer (0.5s) before starting exit
    const timeout = setTimeout(() => {
      setIsVisible(false);
      // Give the exit animation time to complete before calling onLoadingComplete
      setTimeout(onLoadingComplete, 1000);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <SparklesText
              text="helen huang"
              colors={{ first: "#76bb5d", second: "#9774cc" }}
              className="text-6xl md:text-8xl font-bold text-[#ff6b35] font-sora"
              sparklesCount={20}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 