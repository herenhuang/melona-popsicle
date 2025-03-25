import React, { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavBar } from '../ui/tubelight-navbar';
import { Home, Image as ImageIcon, Album, Users } from 'lucide-react';
import { BaggyFooter } from '../ui/BaggyFooter';
import { BaggyMusicPlayer } from './BaggyMusicPlayer';
import '../../styles/baggy.css';

interface BaggyLayoutProps {
  children: ReactNode;
}

const BaggyLayout: React.FC<BaggyLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener to change header style when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOME', url: '#hero', icon: Home },
    { name: 'COLLECTION', url: '#gallery', icon: Album },
    { name: 'EXPERIENCE', url: '#experience', icon: ImageIcon },
    { name: 'TEAM', url: '#credits', icon: Users },
  ];
  
  return (
    <div className="baggy-root min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <NavBar 
        items={navItems} 
        onActiveChange={(item) => {
          const sectionId = item === 'HOME' ? 'hero' :
                          item === 'COLLECTION' ? 'gallery' :
                          item === 'EXPERIENCE' ? 'experience' :
                          item === 'TEAM' ? 'credits' : '';
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer with extra bottom padding */}
      <div className="mt-auto">
        <BaggyFooter />
      </div>

      {/* Music Player */}
      <BaggyMusicPlayer />
    </div>
  );
};

export default BaggyLayout; 