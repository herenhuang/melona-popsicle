import React, { useState } from 'react';
import { Mail, Twitter, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactPopupProps {
  isVisible: boolean;
}

export function ContactPopup({ isVisible }: ContactPopupProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('chat@helenhuang.io');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className="absolute bottom-full mb-4 py-3 px-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md z-50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 10,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={handleCopyEmail}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="font-inter text-gray-500 hover:text-[#ff6b35] transition-colors flex items-center gap-2"
        >
          <Mail className="w-5 h-5 flex-shrink-0" />
          <span 
            className="text-sm whitespace-nowrap transition-all duration-300 ease-in-out"
          >
            {copied ? 'copied!' : 'chat@helenhuang.io'}
          </span>
        </button>
        <a 
          href="https://twitter.com/heyohelen" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#ff6b35] transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a 
          href="https://www.linkedin.com/in/heyohelen/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#ff6b35] transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a 
          href="https://www.instagram.com/heyohelen/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-[#ff6b35] transition-colors"
        >
          <Instagram className="w-5 h-5" />
        </a>
      </div>
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white/90"></div>
    </motion.div>
  );
} 