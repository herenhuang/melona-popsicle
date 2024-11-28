import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { VideoHover } from './VideoHover';
import { ModeToggle } from './ModeToggle';

interface HeaderProps {
  isPersonal: boolean;
  onToggle: () => void;
}

const PersonalContent = () => (
  <span className="opacity-0 animate-fadeInUp">
    howdy, i'm <span className="font-sora text-4xl font-bold text-[#ff6b35] inline-block mr-2">Helen Huang</span>
    - an earth science grad turned big tech pm turned edtech founder turned whoever it is that i am now. deeply curious, reasonable dancer <a href="https://x.com/heyohelen/status/1651703013361238016" target="_blank" rel="noopener noreferrer">(🇮🇳) </a>
<a href="https://www.linkedin.com/posts/heyohelen_normalize-posting-passion-projects-activity-7101979035412434944-85hW" target="_blank" rel="noopener noreferrer">(🇳🇬) </a>
<a href="https://www.youtube.com/watch?v=WkO3QsWT_ns" target="_blank" rel="noopener noreferrer">(🎅)</a>, terrible memory.
  </span>
);

const ProfessionalContent = () => (
  <span className="opacity-0 animate-fadeInUp">
    Hello, I'm <span className="font-sora text-4xl font-bold text-[#ff6b35] inline-block mr-2">Helen Huang</span>
    - an operator with 10+ years of experience in strategy, product and marketing. I'm highly collaborative, and love turning chaos into clear process with a creative twist!
  </span>
);

export function Header({ isPersonal, onToggle }: HeaderProps) {
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
    <header className="h-screen flex flex-col justify-center relative">
      <div className="absolute inset-0 bg-[#f5f3e8] opacity-40"></div>
      <ModeToggle isPersonal={isPersonal} onToggle={onToggle} />
      <div className="relative z-10 max-w-3xl">
        <div className="font-inter text-xl text-gray-700 leading-relaxed relative">
          {isPersonal ? <PersonalContent /> : <ProfessionalContent />}
        </div>
        <div
          className="fixed bottom-24 left-[1.5rem] md:left-[4rem] lg:left-[6rem] transition-opacity duration-300"
          style={{ opacity: arrowOpacity }}
        >
          <ArrowDown className="w-6 h-6 text-gray-500 animate-bounce" />
        </div>
      </div>
    </header>
  );
}