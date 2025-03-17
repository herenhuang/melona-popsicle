import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { ContactBar } from './components/ContactBar';
import { Confetti } from './components/Confetti';
import { GardenDemo } from './components/GardenDemo';
import { ChatBox } from './components/ChatBox';
import { NowPage } from './components/NowPage';
import { Experience } from './components/Experience';
import { LoadingScreen } from './components/LoadingScreen';
import './styles/grid.css';

function HomePage() {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center min-h-screen px-8 md:px-16 lg:px-24 grid-bg">
      <Confetti />
      <Header />
      <Experience />
      <GardenDemo />
      <ContactBar isPersonal={true} />
      <ChatBox />
    </div>
  );
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  // Only show loading screen on initial page load
  useEffect(() => {
    if (!isInitialLoad) {
      setIsLoading(false);
    }
  }, [location.pathname, isInitialLoad]);

  // Mark initial load as complete after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000); // Match this with your loading screen duration

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && isInitialLoad && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div style={{ opacity: isLoading && isInitialLoad ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <Routes>
          {/* Root path - show about page on desktop, nav on mobile */}
          <Route path="/" element={<NowPage defaultNote="about" />} />
          
          {/* /now path - show the mar172025 note */}
          <Route path="/now" element={<NowPage defaultNote="mar172025" />} />
          
          {/* Legacy /now/:noteId paths - redirect to new structure */}
          <Route path="/now/:noteId" element={<Navigate to="/:noteId" replace />} />
          
          {/* New direct note paths */}
          <Route path="/:noteId" element={<NowPage />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
