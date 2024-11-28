import React, { useState, useEffect } from 'react';
import { Mail, Twitter, Linkedin } from 'lucide-react';

interface ContactBarProps {
  isPersonal?: boolean;
}

export function ContactBar({ isPersonal = true }: ContactBarProps) {
  return (
    <div className="fixed bottom-0 right-0 p-6 flex items-center gap-6 bg-[#f5f3e8]/80 backdrop-blur-sm rounded-tl-lg z-[90]">
      <a
        href="mailto:chat@helenhuang.io"
        className="font-inter text-gray-500 hover:text-[#ff6b35] transition-colors flex items-center gap-2"
      >
        <Mail className="w-5 h-5" />
        <span className="text-sm">{isPersonal ? 'send me an email friendo: chat@helenhuang.io' : 'get in touch: chat@helenhuang.io'}</span>
      </a>
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
    </div>
  );
}