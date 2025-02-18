import React, { useState, useEffect } from 'react';
import { Mail, Twitter, Linkedin, Instagram } from 'lucide-react';

interface ContactBarProps {
  isPersonal?: boolean;
}

export function ContactBar({ isPersonal = true }: ContactBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show contact bar when user scrolls near the footer
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const showThreshold = pageHeight - 500; // Adjust this value to control when it appears
      
      setIsVisible(scrollPosition > showThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('chat@helenhuang.io');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`fixed bottom-0 transition-all duration-500 ease-in-out py-6 pr-6 pl-4 flex items-center gap-6 bg-[#f5f3e8]/80 backdrop-blur-sm rounded-tr-lg z-[90] 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
        max-w-4xl right-1/2 transform translate-x-[50%] md:translate-x-0 md:right-[calc((100vw-4rem-48rem)/2)]`}
    >
      <button
        onClick={handleCopyEmail}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="font-inter text-gray-500 hover:text-[#ff6b35] transition-colors flex items-center gap-2 w-[180px] overflow-hidden"
      >
        <Mail className="w-5 h-5 flex-shrink-0" />
        <span 
          className="text-sm whitespace-nowrap transition-all duration-300 ease-in-out"
          style={{
            opacity: copied ? 1 : isHovered ? 0.9 : 1,
            transform: `translateX(${isHovered ? '2px' : '0'})`
          }}
        >
          {copied ? 'copied! woohoo!' : isHovered ? 'chat@helenhuang.io' : 'copy my email here'}
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
  );
}