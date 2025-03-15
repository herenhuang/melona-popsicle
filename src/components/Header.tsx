import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { SparklesText } from './ui/sparkles-text';
import { SabbaticalNote } from './SabbaticalNote';
import { motion } from 'framer-motion';

// Define types for the StarIcon props
interface StarIconProps {
  label: string;
  onClick: () => void;
  rotation: number;
  fillColor: string;
  hoverColor: string;
}

// Star Icon Component
const StarIcon: React.FC<StarIconProps> = ({ 
  label, 
  onClick, 
  rotation, 
  fillColor,
  hoverColor
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="inline-block m-3 relative cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        style={{
          transform: `rotate(${rotation}deg)`
        }}
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        <svg 
          width="90" 
          height="94" 
          viewBox="0 0 109.93 115.58" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <path 
            d="M54.96,0l8.61,31.3,25.36-20.26-11.43,30.38,32.43-1.49-27.11,17.86,27.11,17.86-32.43-1.49,11.43,30.38-25.36-20.26-8.61,31.3-8.61-31.3-25.36,20.26,11.43-30.38-32.43,1.49,27.11-17.86L0,39.93l32.43,1.49-11.43-30.38,25.36,20.26L54.96,0Z"
            fill={isHovered ? hoverColor : fillColor}
            className="transition-colors duration-300"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
        </svg>
      </motion.div>
      
      {/* Label always visible, but emphasized on hover */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white text-base pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          textShadow: isHovered ? "0 0 8px rgba(0,0,0,0.5)" : "0 0 0 rgba(0,0,0,0)"
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

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
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleButtonClick = (section: string) => {
    setActiveSection(section);
    // You can add logic here to scroll to the appropriate section
    // or open a modal with the content
    console.log(`Navigating to ${section}`);
    
    // Scroll to the appropriate section
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      {/* Star Icon Navigation */}
      <div className="flex flex-wrap justify-center gap-10 mt-16 z-20 max-w-3xl">
        <StarIcon 
          label="About"
          onClick={() => handleButtonClick('about')}
          rotation={-5}
          fillColor="#e879f9"
          hoverColor="#d946ef"
        />
        
        <StarIcon 
          label="Work"
          onClick={() => handleButtonClick('work')}
          rotation={4}
          fillColor="#2dd4bf"
          hoverColor="#14b8a6"
        />
        
        <StarIcon 
          label="Projects"
          onClick={() => handleButtonClick('projects')}
          rotation={-3}
          fillColor="#fbbf24"
          hoverColor="#f59e0b"
        />
        
        <StarIcon 
          label="Speaking"
          onClick={() => handleButtonClick('speaking')}
          rotation={6}
          fillColor="#a0ec06"
          hoverColor="#84cc16"
        />
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