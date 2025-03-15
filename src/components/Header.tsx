import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { SparklesText } from './ui/sparkles-text';
import { SabbaticalNote } from './SabbaticalNote';
import { motion } from 'framer-motion';
import NotepadPopup from './NotepadPopup';
import { ContactPopup } from './ContactPopup';

// Define types for the IconProps
interface IconProps {
  label: string;
  onClick: () => void;
  rotation: number;
  fillColor: string;
  hoverColor: string;
  svgPath: string;
  viewBox: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  scale?: number;
  zIndex?: number;
}

// Icon Component
const Icon: React.FC<IconProps> = ({ 
  label, 
  onClick, 
  rotation, 
  fillColor,
  hoverColor,
  svgPath,
  viewBox,
  position,
  scale = 1,
  zIndex = 30
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        ...position,
        zIndex
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: rotation - 10 }}
      animate={{ opacity: 1, scale, rotate: rotation }}
      transition={{ 
        duration: 0.5,
        delay: Math.random() * 0.5 // Random delay for more whimsical appearance
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: scale * 1.1, rotate: rotation + (rotation > 0 ? 5 : -5) }}
      whileTap={{ scale: scale * 0.95 }}
    >
      <motion.div
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          y: {
            duration: 2 + Math.random(), // Random duration for more varied animation
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        <svg 
          width={120 * scale} 
          height={120 * scale} 
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-lg transition-all duration-300 ${isHovered ? 'filter drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]' : ''}`}
        >
          <path 
            d={svgPath}
            fill={isHovered ? hoverColor : fillColor}
            className="transition-colors duration-300"
            stroke={isHovered ? "#ffffff" : "#ffffff"}
            strokeWidth={isHovered ? "2" : "1"}
            strokeOpacity={isHovered ? "0.8" : "0.3"}
          />
        </svg>
      </motion.div>
      
      {/* Label only visible on hover */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold text-white text-lg pointer-events-none drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
          textShadow: isHovered ? "0 0 8px rgba(0,0,0,0.5)" : "0 0 0 rgba(0,0,0,0)"
        }}
        transition={{ 
          opacity: { duration: 0.1 },
          scale: { duration: 0.2 },
          textShadow: { duration: 0.2 }
        }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
};

const PersonalContent = () => {
  const [isNameHovered, setIsNameHovered] = useState(false);
  const nameRef = useRef<HTMLDivElement>(null);
  
  return (
    <span className="opacity-0 animate-fadeInUp">
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
        <span className="text-base md:text-lg">howdy, i'm</span>
        <div 
          ref={nameRef}
          className="relative"
          onMouseEnter={() => setIsNameHovered(true)}
          onMouseLeave={() => setIsNameHovered(false)}
        >
          <SparklesText 
            text="helen huang"
            colors={{ first: "#76bb5d", second: "#9774cc" }}
            className="text-5xl md:text-8xl font-bold text-[#ff6b35] cursor-pointer"
          />
          <ContactPopup isVisible={isNameHovered} />
        </div>
      </div>
      <div className="text-base md:text-lg">
        an earth science grad turned big tech pm turned edtech founder turned whoever it is that i am now. deeply curious, reasonable dancer <a href="https://x.com/heyohelen/status/1651703013361238016" target="_blank" rel="noopener noreferrer">(🇮🇳) </a>
        <a href="https://www.linkedin.com/posts/heyohelen_normalize-posting-passion-projects-activity-7101979035412434944-85hW" target="_blank" rel="noopener noreferrer">(🇳🇬) </a>
        <a href="https://www.youtube.com/watch?v=WkO3QsWT_ns" target="_blank" rel="noopener noreferrer">(🎅)</a>, terrible memory.
      </div>
    </span>
  );
};

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

// Content for each section popup
const AboutContent = () => (
  <div className="space-y-6">
    <div className="prose prose-lg">
      <p className="text-lg">
        Hi there. I'm an operator with 10+ years of experience in strategy, product and marketing. I'm highly collaborative, and love turning chaos into clear process with a creative twist.
      </p>
      <p className="text-lg mt-4">
        I'm currently "on sabbatical", taking time to explore new perspectives and opportunities.
      </p>
    </div>
    
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/50 p-4 rounded-lg shadow-sm">
        <h4 className="font-bold text-lg mb-2">Background</h4>
        <p>Earth science grad turned tech professional, bringing a unique perspective to digital products and experiences.</p>
      </div>
      <div className="bg-white/50 p-4 rounded-lg shadow-sm">
        <h4 className="font-bold text-lg mb-2">Interests</h4>
        <p>Exploring creative coding, dancing, and finding inspiration in unexpected places.</p>
      </div>
    </div>
  </div>
);

const WorkContent = () => (
  <div className="space-y-6">
    <div className="prose prose-lg">
      <ul className="list-none space-y-3">
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>freelance strategic generalist</strong> — helping indie founders and small teams with product strategy, ops, and marketing</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>cofounder @ co.lab</strong> — creating immersive, real-world tech learning programs for busy professionals</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>program + product @ microsoft</strong> — worked on edge devrel & azure devops, focusing on dev advocacy and product iteration</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>product manager intern @ zynga</strong> — contributed to wordstreak with friends (300k dau), spearheaded app revamp from 1 to 4 stars in four months</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>interned @ cibc & scotiabank</strong> — business analyst roles back in university days</span>
        </li>
      </ul>
    </div>
    
    <div className="mt-8 bg-white/50 p-4 rounded-lg shadow-sm">
      <h4 className="font-bold text-lg mb-2">Skills & Expertise</h4>
      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-teal-100 rounded-full text-sm">Product Strategy</span>
        <span className="px-3 py-1 bg-teal-100 rounded-full text-sm">Team Leadership</span>
        <span className="px-3 py-1 bg-teal-100 rounded-full text-sm">Marketing</span>
        <span className="px-3 py-1 bg-teal-100 rounded-full text-sm">Operations</span>
        <span className="px-3 py-1 bg-teal-100 rounded-full text-sm">Growth</span>
        <span className="px-3 py-1 bg-teal-100 rounded-full text-sm">Community Building</span>
      </div>
    </div>
  </div>
);

const ProjectsContent = () => (
  <div className="space-y-6">
    <div className="prose prose-lg">
      <ul className="list-none space-y-3">
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>co.lab learning</strong> — a group-driven, blended learning environment with 30k+ hours of collaboration</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>how to product</strong> — e-book, #1 product of the day, sharing product management insights</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>solana portraits</strong> — nft art commissions for digital collectible enthusiasts</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>you belong in tech</strong> — career-switch stories and resources to inspire folks entering tech</span>
        </li>
      </ul>
    </div>
    
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white/50 p-4 rounded-lg shadow-sm">
        <h4 className="font-bold text-lg mb-2">Featured Project</h4>
        <div className="aspect-video bg-yellow-100 rounded-md mb-3 flex items-center justify-center">
          <span className="text-yellow-800">Project Image</span>
        </div>
        <p>Co.lab has helped hundreds of professionals transition into tech careers through hands-on learning.</p>
      </div>
      <div className="bg-white/50 p-4 rounded-lg shadow-sm">
        <h4 className="font-bold text-lg mb-2">Impact</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Students Helped</span>
            <span className="font-bold">500+</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
          
          <div className="flex justify-between mt-3">
            <span>Collaboration Hours</span>
            <span className="font-bold">30,000+</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SpeakingContent = () => (
  <div className="space-y-6">
    <div className="prose prose-lg">
      <ul className="list-none space-y-3">
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>dmz women of the year</strong> — recognized for contributions to tech education</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>glory 30x30 honoree</strong> — named one of canada's standout young entrepreneurs</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>forbes 30 under 30</strong> — honored for co.lab's impact</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>waterloo innovation summit</strong> — spoke on flipped classrooms & peer-led learning</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>dmz</strong> — discussed founder-led sales strategies & marketing funnels</span>
        </li>
        <li className="flex items-start">
          <span className="text-xl mr-2">★</span>
          <span><strong>founder institute</strong> — insights on community-driven growth & product-led strategies</span>
        </li>
      </ul>
    </div>
    
    <div className="mt-8 bg-white/50 p-4 rounded-lg shadow-sm">
      <h4 className="font-bold text-lg mb-2">Featured Recognition</h4>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🏆</span>
        </div>
        <div>
          <h5 className="font-bold">Forbes 30 Under 30</h5>
          <p>Recognized for innovation in education technology and impact on career transitions.</p>
        </div>
      </div>
    </div>
  </div>
);

export function Header() {
  const [activePopup, setActivePopup] = useState<string | null>(null);
  
  const handleButtonClick = (section: string) => {
    setActivePopup(section);
    console.log(`Opening popup for ${section}`);
  };
  
  const handleClosePopup = () => {
    setActivePopup(null);
  };

  // Get initial position for popups based on window size
  const getInitialPosition = (section: string) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Center position with some randomness
    const centerX = (windowWidth / 2) - 200; // half of popup width
    const centerY = (windowHeight / 2) - 200; // approximate half of popup height
    
    // Add some randomness based on section
    switch(section) {
      case 'about':
        return { x: centerX - 50, y: centerY - 30 };
      case 'work':
        return { x: centerX + 50, y: centerY - 50 };
      case 'projects':
        return { x: centerX - 30, y: centerY + 50 };
      case 'speaking':
        return { x: centerX + 70, y: centerY + 20 };
      default:
        return { x: centerX, y: centerY };
    }
  };

  // SVG paths for different icons
  const iconPaths = {
    // Star/sparkle icon for About
    about: {
      path: "M54.96,0l8.61,31.3,25.36-20.26-11.43,30.38,32.43-1.49-27.11,17.86,27.11,17.86-32.43-1.49,11.43,30.38-25.36-20.26-8.61,31.3-8.61-31.3-25.36,20.26,11.43-30.38-32.43,1.49,27.11-17.86L0,39.93l32.43,1.49-11.43-30.38,25.36,20.26L54.96,0Z",
      viewBox: "0 0 109.93 115.58"
    },
    // Updated Work icon with star/snowflake design
    work: {
      path: "M108.19,63.76c-6.8-1.29-14.24-2.59-20.07-6.8-1.62-2.91.97-5.5,2.91-7.77,4.85-6.8,8.74-12.95,10.68-21.04.32-2.27-.65-5.5-3.24-5.18-5.18,4.53-11.65,8.09-18.45,9.06-1.62.32-2.59-1.29-2.91-2.59-.97-9.06-3.56-17.8-7.12-25.89-.97-1.94-2.91-3.56-5.18-3.56-2.27.32-1.62,3.24-1.94,4.85-1.29,5.83-2.59,11.33-6.15,15.86-.97,1.29-2.59.65-3.88,0-8.09-5.83-15.54-11-24.92-13.59-1.62-.32-2.91.32-4.21.97s-.65,1.62-.65,2.27c3.56,6.15,8.09,11.33,9.06,18.45,0,1.62-1.29,2.59-2.59,2.59-9.39,1.29-17.8,3.56-26.22,7.44-2.27,1.29-4.21,3.88-2.91,6.47,6.8.97,13.27,2.27,19.42,6.15,1.29.65,1.94,1.94,1.29,3.24-3.56,6.15-8.09,11.33-11,17.8-1.29,2.91-2.27,5.5-3.24,8.41-.32,1.94.32,3.88,1.94,4.85.65.32,1.62.32,2.27-.32l.97-.97c.97-.32,1.62-.97,2.27-1.62,4.85-2.59,9.06-6.15,14.56-5.83.97,0,1.94,0,2.27,1.29.97,3.88.97,7.44,1.94,11.33.32,1.29.65,2.27.97,3.56,1.62,4.53,2.59,9.06,5.5,13.27.97,1.62,3.24,3.24,5.5,1.94,1.29-5.5,1.94-10.68,4.21-15.86,1.29-2.27,2.59-5.83,5.5-4.53,1.62.65,3.24,1.94,4.85,3.24,6.47,4.85,13.59,8.09,21.04,10.68,1.29.32,2.59,0,3.56-.65.65-.65,2.27-1.62,1.62-2.59-4.21-5.83-8.09-11.98-9.39-18.77.65-2.59,3.56-2.91,5.83-2.91,8.41-.97,16.18-3.56,23.95-7.44,1.62-.97,3.56-3.88,1.94-5.83Z",
      viewBox: "0 0 108.8 108.89"
    },
    // Projects icon (provided)
    projects: {
      path: "M106.37,5.58V0h-6.8c-1.41,3.18-4.59,5.4-8.3,5.4s-6.89-2.22-8.3-5.4h-10.04c-1.41,3.18-4.59,5.4-8.3,5.4s-6.89-2.22-8.3-5.4h-9.08c-1.41,3.18-4.59,5.4-8.3,5.4s-6.89-2.22-8.3-5.4h-8.88c-1.41,3.18-4.59,5.4-8.3,5.4S6.58,3.18,5.17,0H0v6.08c3.18,1.41,5.4,4.59,5.4,8.3s-2.22,6.89-5.4,8.3v8.89c3.18,1.41,5.4,4.59,5.4,8.3s-2.22,6.89-5.4,8.3v9.08c3.18,1.41,5.4,4.59,5.4,8.3s-2.22,6.89-5.4,8.3v10.04c3.18,1.41,5.4,4.59,5.4,8.3s-2.22,6.89-5.4,8.3v6.08h4.78c1.12-3.74,4.59-6.47,8.69-6.47s7.58,2.73,8.69,6.47h8.1c1.12-3.74,4.59-6.47,8.69-6.47s7.58,2.73,8.69,6.47h8.29c1.12-3.74,4.59-6.47,8.69-6.47s7.58,2.73,8.69,6.47h9.26c1.12-3.74,4.59-6.47,8.69-6.47s7.57,2.73,8.69,6.47h6.41v-5.58c-3.94-.99-6.85-4.55-6.85-8.8s2.92-7.81,6.85-8.8v-9.04c-3.94-.99-6.85-4.55-6.85-8.8s2.92-7.81,6.85-8.8v-8.08c-3.94-.99-6.85-4.55-6.85-8.8s2.92-7.81,6.85-8.8v-7.89c-3.94-.99-6.85-4.55-6.85-8.8s2.92-7.81,6.85-8.8ZM73.55,19.79c3.62,0,6.56,6.89,6.56,15.35s-2.95,15.35-6.56,15.35-6.56-6.89-6.56-15.35,2.95-15.35,6.56-15.35ZM52.7,19.79c3.62,0,6.56,6.89,6.56,15.35s-2.95,15.35-6.56,15.35-6.56-6.89-6.56-15.35,2.95-15.35,6.56-15.35ZM32.05,19.79c3.62,0,6.56,6.89,6.56,15.35s-2.95,15.35-6.56,15.35-6.56-6.89-6.56-15.35,2.95-15.35,6.56-15.35ZM53.19,87.6c-17.44,0-31.6-14.01-31.85-31.39h6.21c.25,13.94,11.63,25.17,25.63,25.17s25.38-11.23,25.63-25.17h6.21c-.25,17.38-14.41,31.39-31.85,31.39Z",
      viewBox: "0 0 106.37 106.56"
    },
    // Speaking icon (provided)
    speaking: {
      path: "M92.94,15.95C82.67,5.66,68.99,0,54.45,0S26.23,5.66,15.95,15.95C5.66,26.23,0,39.9,0,54.45s5.66,28.21,15.95,38.5c10.28,10.28,23.96,15.95,38.5,15.95s28.22-5.66,38.5-15.95c10.28-10.28,15.95-23.96,15.95-38.5s-5.66-28.22-15.95-38.5ZM106.73,53.38h-.16c-6,0-10.99-4.44-11.93-10.37-1.62-10.13-5.4-19.44-11.03-26.95-.13-.17-.27-.34-.4-.51,1.39-.57,2.76-1.17,4.08-1.83,1.44,1.16,2.83,2.4,4.15,3.73,9.63,9.63,15.02,22.35,15.29,35.92ZM81.13,92.52c-2.68-.99-5.48-1.83-8.38-2.51,3.65-9.6,5.69-21.67,5.8-34.5h1.29c7.72,0,13.53,7.18,11.77,14.7-1.97,8.4-5.52,16.06-10.45,22.31h-.02ZM27.74,92.52c-4.94-6.25-8.49-13.91-10.46-22.31-1.76-7.52,4.05-14.69,11.77-14.69h1.29c.11,12.83,2.15,24.9,5.8,34.5-2.91.68-5.7,1.52-8.38,2.51h-.02ZM27.76,16.37c2.68.99,5.48,1.83,8.38,2.51-3.65,9.6-5.69,21.67-5.8,34.5h-1.29c-7.72,0-13.53-7.18-11.77-14.69,1.97-8.4,5.52-16.06,10.46-22.31h.02ZM32.48,55.57c5.46.27,10.56,2.49,14.46,6.39,4.15,4.15,6.44,9.68,6.44,15.55v10.47c-5.16.06-10.23.61-15.12,1.6-3.63-9.39-5.67-21.31-5.78-34.01ZM53.38,18.78c-4.89-.06-9.69-.57-14.32-1.49.02-.05.04-.12.07-.17,3.92-9.06,8.94-14.31,14.26-14.93v16.59ZM38.26,19.32c4.89,1,9.95,1.54,15.12,1.6v10.47c0,5.88-2.29,11.4-6.44,15.55-3.9,3.9-9,6.12-14.46,6.39.11-12.7,2.15-24.62,5.78-34.01ZM53.38,90.11v16.58c-5.31-.62-10.34-5.86-14.26-14.93-.02-.06-.04-.12-.07-.17,4.63-.92,9.43-1.42,14.33-1.48ZM55.51,90.11c4.89.06,9.69.57,14.33,1.48-.02.06-.04.12-.07.17-3.92,9.06-8.94,14.31-14.26,14.93v-16.58ZM70.63,89.58c-4.88-.99-9.95-1.54-15.12-1.6v-10.47c0-5.88,2.29-11.4,6.44-15.55,3.9-3.89,9-6.12,14.46-6.39-.11,12.7-2.15,24.62-5.78,34.01ZM61.95,46.94c-4.15-4.15-6.44-9.68-6.44-15.55v-10.47c5.16-.06,10.23-.61,15.12-1.6,3.63,9.39,5.67,21.31,5.78,34.01-5.46-.27-10.56-2.49-14.46-6.39ZM55.51,18.78V2.2c5.32.62,10.34,5.87,14.26,14.93.02.05.04.12.07.17-4.64.92-9.43,1.42-14.32,1.49ZM71.73,16.28c-2.5-5.79-5.5-10.14-8.78-12.88,6.16,1.84,11.88,5.66,16.75,11.24-2.47.88-5.05,1.63-7.73,2.24-.08-.19-.15-.41-.23-.6ZM37.16,16.28c-.08.19-.15.4-.23.6-2.67-.61-5.25-1.36-7.73-2.24,4.86-5.58,10.59-9.4,16.74-11.24-3.29,2.74-6.28,7.09-8.78,12.88ZM36.93,92.02c.08.19.15.41.23.6,2.5,5.79,5.49,10.14,8.78,12.88-6.16-1.83-11.88-5.66-16.75-11.24,2.48-.88,5.06-1.63,7.73-2.24ZM71.73,92.61c.08-.19.15-.4.23-.6,2.67.61,5.25,1.36,7.73,2.24-4.86,5.58-10.59,9.4-16.75,11.24,3.29-2.74,6.28-7.09,8.78-12.88ZM78.55,53.38c-.11-12.83-2.15-24.91-5.8-34.5,2.91-.68,5.7-1.52,8.38-2.51h.02c4.94,6.26,8.49,13.91,10.46,22.31,1.76,7.52-4.05,14.7-11.77,14.7h-1.29ZM85.39,12.26c-1.16.55-2.36,1.07-3.58,1.55-3.01-3.57-6.36-6.49-9.94-8.71,4.82,1.7,9.37,4.1,13.52,7.16ZM27.09,13.81c-1.22-.48-2.42-1-3.58-1.55,4.15-3.06,8.7-5.46,13.52-7.16-3.58,2.22-6.93,5.15-9.94,8.71ZM17.46,17.46c1.33-1.33,2.72-2.57,4.15-3.73,1.32.65,2.68,1.26,4.07,1.83-.13.17-.27.33-.4.51-5.63,7.51-9.41,16.82-11.03,26.95-.95,5.93-5.93,10.37-11.93,10.37h-.16c.27-13.57,5.67-26.29,15.3-35.92ZM2.16,55.51h.16c6,0,10.98,4.44,11.93,10.37,1.62,10.13,5.39,19.44,11.03,26.95.13.17.27.34.4.51-1.39.57-2.76,1.17-4.07,1.83-1.44-1.16-2.83-2.4-4.15-3.73-9.63-9.63-15.02-22.35-15.3-35.92ZM23.51,96.63c1.16-.55,2.36-1.07,3.58-1.55,3.01,3.57,6.35,6.49,9.94,8.71-4.81-1.7-9.36-4.1-13.52-7.16ZM81.81,95.08c1.22.48,2.42,1,3.58,1.55-4.15,3.06-8.7,5.46-13.52,7.16,3.58-2.22,6.93-5.15,9.94-8.71ZM91.44,91.44c-1.33,1.33-2.72,2.57-4.15,3.73-1.32-.65-2.68-1.26-4.08-1.83.13-.17.27-.33.4-.51,5.63-7.51,9.41-16.82,11.03-26.95.95-5.93,5.93-10.37,11.93-10.37h.16c-.27,13.57-5.67,26.29-15.29,35.92Z",
      viewBox: "0 0 108.89 108.89"
    }
  };

  // Popup colors for each section
  const popupColors = {
    about: '#f8e8ff', // Light purple
    work: '#e0f7f6', // Light teal
    projects: '#fff7e0', // Light yellow
    speaking: '#e8ffe0'  // Light green
  };

  return (
    <header className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Main content container with text in the middle */}
      <div className="relative z-20 max-w-3xl px-4">
        <div className="font-inter text-xl text-gray-700 leading-relaxed relative">
          <PersonalContent />
          <SabbaticalNote isPersonal={true} />
        </div>
      </div>

      {/* Navigation Icons positioned randomly around the hero section */}
      <div className="absolute inset-0 w-full h-full">
        <Icon 
          label="About"
          onClick={() => handleButtonClick('about')}
          rotation={-8}
          fillColor="#e879f9"
          hoverColor="#d946ef"
          svgPath={iconPaths.about.path}
          viewBox={iconPaths.about.viewBox}
          position={{
            top: '15%',
            left: '12%'
          }}
          scale={1.2}
          zIndex={25}
        />
        
        <Icon 
          label="Work"
          onClick={() => handleButtonClick('work')}
          rotation={7}
          fillColor="#2dd4bf"
          hoverColor="#14b8a6"
          svgPath={iconPaths.work.path}
          viewBox={iconPaths.work.viewBox}
          position={{
            top: '23%',
            right: '15%'
          }}
          scale={1.1}
          zIndex={35}
        />
        
        <Icon 
          label="Projects"
          onClick={() => handleButtonClick('projects')}
          rotation={-5}
          fillColor="#fbbf24"
          hoverColor="#f59e0b"
          svgPath={iconPaths.projects.path}
          viewBox={iconPaths.projects.viewBox}
          position={{
            bottom: '25%',
            left: '18%'
          }}
          scale={0.9}
          zIndex={15}
        />
        
        <Icon 
          label="Speaking"
          onClick={() => handleButtonClick('speaking')}
          rotation={9}
          fillColor="#a0ec06"
          hoverColor="#84cc16"
          svgPath={iconPaths.speaking.path}
          viewBox={iconPaths.speaking.viewBox}
          position={{
            bottom: '18%',
            right: '12%'
          }}
          scale={1.15}
          zIndex={20}
        />
      </div>

      {/* Popups for each section */}
      <NotepadPopup
        isOpen={activePopup === 'about'}
        onClose={handleClosePopup}
        title="About Me"
        content={<AboutContent />}
        initialPosition={getInitialPosition('about')}
        color={popupColors.about}
        width={650}
      />
      
      <NotepadPopup
        isOpen={activePopup === 'work'}
        onClose={handleClosePopup}
        title="Work Experience"
        content={<WorkContent />}
        initialPosition={getInitialPosition('work')}
        color={popupColors.work}
        width={700}
      />
      
      <NotepadPopup
        isOpen={activePopup === 'projects'}
        onClose={handleClosePopup}
        title="Projects"
        content={<ProjectsContent />}
        initialPosition={getInitialPosition('projects')}
        color={popupColors.projects}
        width={700}
      />
      
      <NotepadPopup
        isOpen={activePopup === 'speaking'}
        onClose={handleClosePopup}
        title="Speaking"
        content={<SpeakingContent />}
        initialPosition={getInitialPosition('speaking')}
        color={popupColors.speaking}
        width={650}
      />
    </header>
  );
}