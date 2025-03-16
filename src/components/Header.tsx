import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { SparklesText } from './ui/sparkles-text';
import { SabbaticalNote } from './SabbaticalNote';
import { motion } from 'framer-motion';
import NotepadPopup from './NotepadPopup';
import { ContactPopup } from './ContactPopup';
import { AboutContent } from './AboutContent';
import { BackgroundContent } from './BackgroundContent';
import { InterestsContent } from './InterestsContent';
import { WorkContent } from './WorkContent';
import { SpeakingContent } from './SpeakingContent';
import { ProjectsContent } from './ProjectsContent';

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


export function Header() {
  const [openPopups, setOpenPopups] = useState<string[]>([]);
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const [popupPositions, setPopupPositions] = useState<Record<string, { x: number; y: number; rotation: number }>>({});
  
  // Predefined positions for each window
  const getPresetPosition = (section: string, isActiveSection: boolean = false) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 40;

    // Get window width based on section
    const getWindowWidth = (section: string) => {
      switch (section) {
        case 'work':
          return 550;
        case 'speaking':
          return 500;
        case 'background':
          return 250; // Small width for rock formation image
        case 'interests':
          return 350; // Width for Twitter embed with video
        default:
          return 500;
      }
    };

    // Get window height based on section
    const getWindowHeight = (section: string) => {
      switch (section) {
        case 'about':
          return 300;
        case 'background':
          return 250; // Small height for rock formation image
        case 'interests':
          return 620; // Further increased height for Twitter embed with video
        default:
          return 400;
      }
    };

    const windowWidth = getWindowWidth(section);
    const windowHeight = getWindowHeight(section);
    
    // Calculate center position
    const centerX = Math.max(padding, (viewportWidth - windowWidth) / 2);
    const centerY = Math.max(padding, (viewportHeight - windowHeight) / 2);

    // If this is the active section, center it
    if (isActiveSection) {
      return {
        x: centerX,
        y: centerY,
        rotation: 0
      };
    }

    // Otherwise position the windows in a formation around the active window
    // Ensure positions are always within viewport boundaries
    const ensureInViewport = (x: number, y: number, width: number, height: number) => {
      // Make sure there's always at least 40px of the top part visible (for drag handle)
      const minVisibleTop = 40;
      // Ensure windows are always at least partially visible
      return {
        x: Math.max(padding, Math.min(viewportWidth - width/2, x)),
        y: Math.max(minVisibleTop, Math.min(viewportHeight - height/2, y))
      };
    };
    
    let position;
    switch (section) {
      case 'about':
        position = ensureInViewport(
          centerX - 250, 
          centerY,
          windowWidth,
          windowHeight
        );
        return { 
          x: position.x, 
          y: position.y,
          rotation: -2
        };
      case 'background':
        position = ensureInViewport(
          centerX - 300, 
          centerY - 150,
          windowWidth,
          windowHeight
        );
        return { 
          x: position.x, 
          y: position.y,
          rotation: 3
        };
      case 'interests':
        position = ensureInViewport(
          centerX + 250, 
          centerY - 100,
          windowWidth,
          windowHeight
        );
        return { 
          x: position.x, 
          y: position.y,
          rotation: -3
        };
      case 'work':
        position = ensureInViewport(
          centerX + 200, 
          centerY + 100,
          windowWidth, 
          windowHeight
        );
        return { 
          x: position.x, 
          y: position.y,
          rotation: 2
        };
      case 'speaking':
        position = ensureInViewport(
          centerX - 200, 
          centerY + 150,
          windowWidth,
          windowHeight
        );
        return { 
          x: position.x, 
          y: position.y,
          rotation: -1
        };
      default:
        return { 
          x: centerX, 
          y: centerY,
          rotation: 0
        };
    }
  };

  // Update positions when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (openPopups.length > 0) {
        const newPositions = { ...popupPositions };
        openPopups.forEach(popup => {
          newPositions[popup] = getPresetPosition(popup, popup === activePopup);
        });
        setPopupPositions(newPositions);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openPopups, activePopup]);
  
  // Update all window positions when active popup changes
  useEffect(() => {
    if (activePopup && openPopups.length > 0) {
      // Create a new positions object
      const newPositions = { ...popupPositions };
      
      // Update positions for all open popups based on active popup
      openPopups.forEach(popup => {
        newPositions[popup] = getPresetPosition(popup, popup === activePopup);
      });
      
      // Set the new positions
      setPopupPositions(newPositions);
    }
  }, [activePopup]);

  useEffect(() => {
    // Event handler for "Work Experience" button in About window
    const handleWorkPopup = () => {
      // First update positions of any open popups to make room
      const newPositions = { ...popupPositions };
      openPopups.forEach(popup => {
        if (popup !== 'work') {
          newPositions[popup] = getPresetPosition(popup, false);
        }
      });
      
      // Add work to open popups if not already open
      setOpenPopups(prev => {
        if (!prev.includes('work')) {
          const newPopups = [...prev, 'work'];
          // Set the new positions first
          setPopupPositions({
            ...newPositions,
            'work': getPresetPosition('work', true) // Center the newly opened work window
          });
          // Then set as active popup
          setActivePopup('work');
          return newPopups;
        }
        return prev;
      });
    };
    
    // Event handler for Speaking button in Work window
    const handleSpeakingPopup = () => {
      // First update positions of any open popups to make room
      const newPositions = { ...popupPositions };
      openPopups.forEach(popup => {
        if (popup !== 'speaking') {
          newPositions[popup] = getPresetPosition(popup, false);
        }
      });
      
      // Add speaking to open popups if not already open
      setOpenPopups(prev => {
        if (!prev.includes('speaking')) {
          const newPopups = [...prev, 'speaking'];
          // Set the new positions
          setPopupPositions({
            ...newPositions,
            'speaking': getPresetPosition('speaking', true) // Center the newly opened speaking window
          });
          // Then set as active popup
          setActivePopup('speaking');
          return newPopups;
        }
        return prev;
      });
    };
    
    window.addEventListener('openWorkPopup', handleWorkPopup);
    window.addEventListener('openSpeakingPopup', handleSpeakingPopup);
    
    return () => {
      window.removeEventListener('openWorkPopup', handleWorkPopup);
      window.removeEventListener('openSpeakingPopup', handleSpeakingPopup);
    };
  }, [openPopups, popupPositions]);

  const handleButtonClick = (section: string) => {
    if (section === 'about') {
      // Create positions for all three windows
      const aboutPosition = getPresetPosition('about', true); // Center about window
      const backgroundPosition = getPresetPosition('background', false);
      const interestsPosition = getPresetPosition('interests', false);
      
      setOpenPopups(prev => {
        if (!prev.includes('about')) {
          // Open all three popups at once
          const newPopups = [...prev, 'about', 'background', 'interests'];
          
          // Set positions for all three windows
          setPopupPositions({
            'about': aboutPosition,
            'background': backgroundPosition,
            'interests': interestsPosition
          });
          
          // Set about as the active popup
          setActivePopup('about');
          return newPopups;
        }
        return prev;
      });
    } else if (section === 'work') {
      // Create position for work window
      const workPosition = getPresetPosition('work', true); // Center work window
      
      setOpenPopups(prev => {
        if (!prev.includes('work')) {
          const newPopups = [...prev, 'work'];
          
          // Set position for work window
          setPopupPositions(prevPositions => ({
            ...prevPositions,
            'work': workPosition
          }));
          
          // Set work as the active popup
          setActivePopup('work');
          return newPopups;
        }
        return prev;
      });
    }
  };
  
  const handleClosePopup = (section: string) => {
    setOpenPopups(prev => prev.filter(popup => popup !== section));
    if (activePopup === section) {
      const remaining = openPopups.filter(popup => popup !== section);
      setActivePopup(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
    // Remove the position when popup is closed
    setPopupPositions(prev => {
      const newPositions = { ...prev };
      delete newPositions[section];
      return newPositions;
    });
  };

  const handlePopupFocus = (section: string) => {
    if (section !== activePopup) {
      // Update active popup to bring it to front
      setActivePopup(section);
      
      // Get new position for the newly active popup (centered)
      const centeredPosition = getPresetPosition(section, true);
      
      // Update positions - center the active one, move others out of the way
      const newPositions = { ...popupPositions };
      
      // First update the active popup position to center it
      newPositions[section] = centeredPosition;
      
      // Then update all other positions
      openPopups.forEach(popup => {
        if (popup !== section) {
          newPositions[popup] = getPresetPosition(popup, false);
        }
      });
      
      // Set the new positions
      setPopupPositions(newPositions);
    }
  };

  // Get initial position for popups based on window size
  const getInitialPosition = (index: number, activePopupIndex: number) => {
    const padding = 40;
    const staggerX = 60;
    const staggerY = 40;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate center position (accounting for typical popup width)
    const centerX = (viewportWidth - 600) / 2;
    const centerY = (viewportHeight - 400) / 2;

    // Calculate position based on index
    let x = centerX + (index * staggerX);
    let y = centerY + (index * staggerY);

    // Ensure the popup stays within viewport bounds with padding
    x = Math.max(padding, Math.min(viewportWidth - 600 - padding, x));
    y = Math.max(padding, Math.min(viewportHeight - 400 - padding, y));

    return { x, y };
  };

  // Calculate z-index for each popup
  const getZIndex = (section: string) => {
    const baseZIndex = 50;
    return section === activePopup ? baseZIndex + openPopups.length + 2 : baseZIndex + openPopups.indexOf(section);
  };

  // SVG paths for different icons
  const iconPaths = {
    // Star/sparkle icon for About
    about: {
      path: "M108.19,63.76c-6.8-1.29-14.24-2.59-20.07-6.8-1.62-2.91.97-5.5,2.91-7.77,4.85-6.8,8.74-12.95,10.68-21.04.32-2.27-.65-5.5-3.24-5.18-5.18,4.53-11.65,8.09-18.45,9.06-1.62.32-2.59-1.29-2.91-2.59-.97-9.06-3.56-17.8-7.12-25.89-.97-1.94-2.91-3.56-5.18-3.56-2.27.32-1.62,3.24-1.94,4.85-1.29,5.83-2.59,11.33-6.15,15.86-.97,1.29-2.59.65-3.88,0-8.09-5.83-15.54-11-24.92-13.59-1.62-.32-2.91.32-4.21.97s-.65,1.62-.65,2.27c3.56,6.15,8.09,11.33,9.06,18.45,0,1.62-1.29,2.59-2.59,2.59-9.39,1.29-17.8,3.56-26.22,7.44-2.27,1.29-4.21,3.88-2.91,6.47,6.8.97,13.27,2.27,19.42,6.15,1.29.65,1.94,1.94,1.29,3.24-3.56,6.15-8.09,11.33-11,17.8-1.29,2.91-2.27,5.5-3.24,8.41-.32,1.94.32,3.88,1.94,4.85.65.32,1.62.32,2.27-.32l.97-.97c.97-.32,1.62-.97,2.27-1.62,4.85-2.59,9.06-6.15,14.56-5.83.97,0,1.94,0,2.27,1.29.97,3.88.97,7.44,1.94,11.33.32,1.29.65,2.27.97,3.56,1.62,4.53,2.59,9.06,5.5,13.27.97,1.62,3.24,3.24,5.5,1.94,1.29-5.5,1.94-10.68,4.21-15.86,1.29-2.27,2.59-5.83,5.5-4.53,1.62.65,3.24,1.94,4.85,3.24,6.47,4.85,13.59,8.09,21.04,10.68,1.29.32,2.59,0,3.56-.65.65-.65,2.27-1.62,1.62-2.59-4.21-5.83-8.09-11.98-9.39-18.77.65-2.59,3.56-2.91,5.83-2.91,8.41-.97,16.18-3.56,23.95-7.44,1.62-.97,3.56-3.88,1.94-5.83Z",
      viewBox: "0 0 108.8 108.89"
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
      path: "M92.94,15.95C82.67,5.66,68.99,0,54.45,0S26.23,5.66,15.95,15.95C5.66,26.23,0,39.9,0,54.45s5.66,28.21,15.95,38.5c10.28,10.28,23.96,15.95,38.5,15.95s28.22-5.66,38.5-15.95c10.28-10.28,15.95-23.96,15.95-38.5s-5.66-28.22-15.95-38.5ZM106.73,53.38h-.16c-6,0-10.99-4.44-11.93-10.37-1.62-10.13-5.4-19.44-11.03-26.95-.13-.17-.27-.34-.4-.51,1.39-.57,2.76-1.17,4.08-1.83,4.15,1.16,2.83,2.4,4.15,2.4,4.15,3.73,9.63,9.63,15.02,22.35,15.29,35.92ZM81.13,92.52c-2.68-.99-5.48-1.83-8.38-2.51,3.65-9.6,5.69-21.67,5.8-34.5h1.29c7.72,0,13.53,7.18,11.77,14.7-1.97,8.4-5.52,16.06-10.45,22.31h-.02ZM27.74,92.52c-4.94-6.25-8.49-13.91-10.46-22.31-1.76-7.52,4.05-14.69,11.77-14.69h1.29c.11,12.83,2.15,24.9,5.8,34.5-2.91.68-5.7,1.52-8.38,2.51h-.02ZM27.76,16.37c2.68.99,5.48,1.83,8.38,2.51-3.65,9.6-5.69,21.67-5.8,34.5h-1.29c-7.72,0-13.53-7.18-11.77-14.69,1.97-8.4,5.52-16.06,10.46-22.31h.02ZM32.48,55.57c5.46.27,10.56,2.49,14.46,6.39,4.15,4.15,4.15,6.44,9.68,6.44,15.55v10.47c-5.16.06-10.23.61-15.12,1.6-3.63-9.39-5.67-21.31-5.78-34.01ZM53.38,18.78c-4.89-.06-9.69-.57-14.32-1.49.02-.05.04-.12.07-.17,3.92-9.06,8.94-14.31,14.26-14.93v16.59ZM38.26,19.32c4.89,1,9.95,1.54,15.12,1.6v10.47c0,5.88-2.29,11.4-6.44,15.55-3.9,3.9-9,6.12-14.46,6.39.11-12.7,2.15-24.62,5.78-34.01ZM53.38,90.11v16.58c-5.31-.62-10.34-5.86-14.26-14.93-.02-.04-.12-.07-.17,4.63-.92,9.43-1.42,14.33-1.48ZM55.51,90.11c4.89.06,9.69.57,14.33,1.48-.02.06-.04.12-.07.17-3.92,9.06-8.94,14.31-14.26,14.93v-16.58ZM70.63,89.58c-4.88-.99-9.95-1.54-15.12-1.6v-10.47c0-5.88,2.29-11.4,6.44-15.55,3.9-3.89,9-6.12,14.46-6.39-.11,12.7-2.15,24.62-5.78,34.01ZM61.95,46.94c-4.15-4.15-6.44-9.68-6.44-15.55v-10.47c5.16-.06,10.23-.61,15.12-1.6,3.63,9.39,5.67,21.31,5.78,34.01-5.46-.27-10.56-2.49-14.46-6.39ZM55.51,18.78V2.2c5.32.62,10.34,5.87,14.26,14.93.02.05.04.12.07.17-4.64.92-9.43,1.42-14.32,1.49ZM71.73,16.28c-2.5-5.79-5.5-10.14-8.78-12.88,6.16,1.84,11.88,5.66,16.75,11.24-2.47.88-5.05,1.63-7.73,2.24-.08-.19-.15-.41-.23-.6ZM37.16,16.28c-.08.19-.15.4-.23.6-2.67-.61-5.25-1.36-7.73-2.24,4.86-5.58,10.59-9.4,16.74-11.24-3.29,2.74-6.28,7.09-8.78,12.88ZM36.93,92.02c.08.19.15.41.23.6,2.5,5.79,5.49,10.14,8.78,12.88,12.88-6.16-1.83-11.88-5.66-16.75-11.24,2.48-.88,5.06-1.63,7.73-2.24ZM71.73,92.61c.08-.19.15-.4.23-.6,2.67.61,5.25,1.36,7.73,2.24-4.86,5.58-10.59,9.4-16.75,11.24,3.29-2.74,6.28-7.09,8.78-12.88ZM78.55,53.38c-.11-12.83-2.15-24.91-5.8-34.5,2.91-.68,5.7-1.52,8.38-2.51h.02c4.94,6.26,8.49,13.91,10.46,22.31,1.76,7.52-4.05,14.7-11.77,14.7h-1.29ZM85.39,12.26c-1.16.55-2.36,1.07-3.58,1.55-3.01-3.57-6.36-6.49-9.94-8.71,4.82,1.7,9.37,4.1,13.52,7.16ZM27.09,13.81c-1.22-.48-2.42-1-3.58-1.55,4.15-3.06,8.7-5.46,13.52-7.16-3.58,2.22-6.93,5.15-9.94,8.71ZM17.46,17.46c1.33-1.33,2.72-2.57,4.15-3.73,1.32.65,2.68,1.26,4.07,1.83-.13.17-.27.33-.4.51-5.63,7.51-9.41,16.82-11.03,26.95-.95,5.93-5.93,10.37-11.93,10.37h-.16c.27-13.57,5.67-26.29,15.3-35.92ZM2.16,55.51h.16c6,0,10.98,4.44,11.93,10.37,1.62,10.13,5.39,19.44,11.03,26.95.13.17.27.34.4.51-1.39.57-2.76,1.17-4.07,1.83-1.44-1.16-2.83-2.4-4.15-3.73-9.63-9.63-15.02-22.35-15.3-35.92ZM23.51,96.63c1.16-.55,2.36-1.07,3.58-1.55,3.01,3.57,6.35,6.49,9.94,8.71-4.81-1.7-9.36-4.1-13.52-7.16ZM81.81,95.08c1.22.48,2.42,1,3.58,1.55-4.15,3.06-8.7,5.46-13.52,7.16,3.58-2.22,6.93-5.15,9.94-8.71ZM91.44,91.44c-1.33,1.33-2.72,2.57-4.15,3.73-1.32-.65-2.68-1.26-4.08-1.83.13-.17.27-.33.4-.51,5.63-7.51,9.41-16.82,11.03-26.95.95-5.93,5.93-10.37,11.93-10.37h.16c-.27,13.57-5.67,26.29-15.29,35.92Z",
      viewBox: "0 0 108.89 108.89"
    }
  };

  // Popup colors for each section
  const popupColors = {
    about: '#f0e6ff', // Lighter purple
    work: '#e0f7f6', // Light teal
    projects: '#fff7e0', // Light yellow
    speaking: '#e8ffe0',  // Light green
    background: '#f3e8ff', // Light purple
    interests: '#ffe8f3'  // Light pink
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
          fillColor="#73b6ff"
          hoverColor="#5a92cc"
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
      {openPopups.includes('about') && (
        <NotepadPopup
          isOpen={true}
          onClose={() => handleClosePopup('about')}
          onFocus={() => handlePopupFocus('about')}
          title="About Me"
          content={<AboutContent />}
          initialPosition={popupPositions.about || getPresetPosition('about', activePopup === 'about')}
          color={popupColors.about}
          width={500}
          zIndex={getZIndex('about')}
          style={{ 
            transform: `rotate(${(popupPositions.about || getPresetPosition('about', activePopup === 'about')).rotation}deg)`,
            height: '300px'
          }}
        />
      )}
      
      {openPopups.includes('background') && (
        <NotepadPopup
          isOpen={true}
          onClose={() => handleClosePopup('background')}
          onFocus={() => handlePopupFocus('background')}
          title="Uni Major: Earth Science"
          content={<BackgroundContent />}
          initialPosition={popupPositions.background || getPresetPosition('background', activePopup === 'background')}
          color={popupColors.background}
          width={250} // Smaller width for rock formation image
          zIndex={getZIndex('background')}
          style={{ 
            transform: `rotate(${(popupPositions.background || getPresetPosition('background', activePopup === 'background')).rotation}deg)`,
            height: '250px' // Smaller height
          }}
        />
      )}
      
      {openPopups.includes('interests') && (
        <NotepadPopup
          isOpen={true}
          onClose={() => handleClosePopup('interests')}
          onFocus={() => handlePopupFocus('interests')}
          title="7 Hours in Delhi"
          content={<InterestsContent />}
          initialPosition={popupPositions.interests || getPresetPosition('interests', activePopup === 'interests')}
          color={popupColors.interests}
          width={350} // For Twitter embed with video
          zIndex={getZIndex('interests')}
          style={{ 
            transform: `rotate(${(popupPositions.interests || getPresetPosition('interests', activePopup === 'interests')).rotation}deg)`,
            height: '620px' // Further increased height to show full tweet with video
          }}
        />
      )}
      
      {openPopups.includes('work') && (
        <NotepadPopup
          isOpen={true}
          onClose={() => handleClosePopup('work')}
          onFocus={() => handlePopupFocus('work')}
          title="Work Experience"
          content={<WorkContent />}
          initialPosition={popupPositions.work || getPresetPosition('work', activePopup === 'work')}
          color={popupColors.work}
          width={550}
          zIndex={getZIndex('work')}
          style={{ 
            transform: `rotate(${(popupPositions.work || getPresetPosition('work', activePopup === 'work')).rotation}deg)`,
            height: '400px'
          }}
        />
      )}
      
      {openPopups.includes('projects') && (
        <NotepadPopup
          isOpen={true}
          onClose={() => handleClosePopup('projects')}
          onFocus={() => handlePopupFocus('projects')}
          title="Projects"
          content={<ProjectsContent />}
          initialPosition={popupPositions.projects || getPresetPosition('projects', activePopup === 'projects')}
          color={popupColors.projects}
          width={550}
          zIndex={getZIndex('projects')}
          style={{ 
            transform: `rotate(${(popupPositions.projects || getPresetPosition('projects', activePopup === 'projects')).rotation}deg)`,
            height: '400px'
          }}
        />
      )}
      
      {openPopups.includes('speaking') && (
        <NotepadPopup
          isOpen={true}
          onClose={() => handleClosePopup('speaking')}
          onFocus={() => handlePopupFocus('speaking')}
          title="Speaking"
          content={<SpeakingContent />}
          initialPosition={popupPositions.speaking || getPresetPosition('speaking', activePopup === 'speaking')}
          color={popupColors.speaking}
          width={500}
          zIndex={getZIndex('speaking')}
          style={{ 
            transform: `rotate(${(popupPositions.speaking || getPresetPosition('speaking', activePopup === 'speaking')).rotation}deg)`,
            height: '400px'
          }}
        />
      )}
    </header>
  );
}