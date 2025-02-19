import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { VideoHover } from './VideoHover';
import { SparklesText } from './ui/sparkles-text';
import { SabbaticalNote } from './SabbaticalNote';

const PersonalContent = () => (
  <span className="opacity-0 animate-fadeInUp">
    <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
      <span className="text-base md:text-lg">howdy, i'm</span>
      <SparklesText 
        text="helen huang"
        colors={{ first: "#76bb5d", second: "#9774cc" }}
        className="text-5xl md:text-8xl font-bold text-[#ff6b35]"
      />
    </div>
    <div className="text-base md:text-lg">
      an earth science grad turned big tech pm turned edtech founder turned whoever it is that i am now. deeply curious, reasonable dancer <a href="https://x.com/heyohelen/status/1651703013361238016" target="_blank" rel="noopener noreferrer">(🇮🇳) </a>
      <a href="https://www.linkedin.com/posts/heyohelen_normalize-posting-passion-projects-activity-7101979035412434944-85hW" target="_blank" rel="noopener noreferrer">(🇳🇬) </a>
      <a href="https://www.youtube.com/watch?v=WkO3QsWT_ns" target="_blank" rel="noopener noreferrer">(🎅)</a>, terrible memory.
    </div>
  </span>
);

const ProfessionalContent = () => (
  <span className="opacity-0 animate-fadeInUp">
    <div className="flex items-baseline gap-2 mb-4">
      <span>Hello, I'm</span>
      <SparklesText 
        text="Helen Huang"
        colors={{ first: "#76bb5d", second: "#9774cc" }}
        className="text-7xl font-bold text-[#ff6b35]"
      />
    </div>
    - an operator with 10+ years of experience in strategy, product and marketing. I'm highly collaborative, and love turning chaos into clear process with a creative twist!
  </span>
);

export function Header() {
  const [arrowOpacity, setArrowOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fadeStart = windowHeight * 0.2;
      const fadeEnd = windowHeight * 0.4;
      const opacity = Math.max(0, 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart));
      setArrowOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="h-screen w-full flex flex-col items-center justify-center relative">
      <div className="relative z-10 max-w-3xl px-4">
        <div className="font-inter text-xl text-gray-700 leading-relaxed relative">
          <PersonalContent />
          <SabbaticalNote isPersonal={true} />
        </div>
      </div>
      <div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce"
        style={{ opacity: arrowOpacity }}
      >
        <ArrowDown className="w-6 h-6" />
      </div>
    </header>
  );
}