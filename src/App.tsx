import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/Header';
import { ContactBar } from './components/ContactBar';
// Lazy load bigger components
const Confetti = lazy(() => import('./components/Confetti').then(module => ({ default: module.Confetti })));
const GardenDemo = lazy(() => import('./components/GardenDemo').then(module => ({ default: module.GardenDemo })));
const ChatBox = lazy(() => import('./components/ChatBox').then(module => ({ default: module.ChatBox })));
const NowPage = lazy(() => import('./components/NowPage').then(module => ({ default: module.NowPage })));
const Experience = lazy(() => import('./components/Experience').then(module => ({ default: module.Experience })));
import { LoadingScreen } from './components/LoadingScreen';
import { BaggyLoadingScreen } from './components/baggy/BaggyLoadingScreen';
// Lazy load the BaggySSPage component
const BaggySSPage = lazy(() => import('./pages/baggy/BaggySSPage'));
import './styles/grid.css';

// Create a context for image loading progress
export const ImageLoadingContext = React.createContext<{
  imageLoadingProgress: number;
  setImageLoadingProgress: React.Dispatch<React.SetStateAction<number>>;
}>({
  imageLoadingProgress: 0,
  setImageLoadingProgress: () => {},
});

function HomePage() {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center min-h-screen px-8 md:px-16 lg:px-24 grid-bg">
      <Suspense fallback={null}>
        <Confetti />
      </Suspense>
      <Header />
      <Suspense fallback={<div className="w-full h-[300px]" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<div className="w-full h-[400px]" />}>
        <GardenDemo />
      </Suspense>
      <ContactBar isPersonal={true} />
      <Suspense fallback={null}>
        <ChatBox />
      </Suspense>
    </div>
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

// Create a PageFallback component for lazy loaded routes
const PageFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-black opacity-50">Loading...</div>
    </div>
  );
};

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [imageLoadingProgress, setImageLoadingProgress] = useState(0);
  const location = useLocation();
  const isBaggyPage = location.pathname.includes('baggy');

  // Only show loading screen on initial page load
  useEffect(() => {
    if (!isInitialLoad) {
      setIsLoading(false);
      // Reset image loading progress when route changes after initial load
      setImageLoadingProgress(0);
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
    <ImageLoadingContext.Provider value={{ imageLoadingProgress, setImageLoadingProgress }}>
      {isLoading && isInitialLoad && (
        isBaggyPage ? (
          <BaggyLoadingScreen 
            onLoadingComplete={handleLoadingComplete} 
            imageLoadingProgress={imageLoadingProgress}
          />
        ) : (
          <LoadingScreen 
            onLoadingComplete={handleLoadingComplete} 
            imageLoadingProgress={imageLoadingProgress}
          />
        )
      )}
      <div style={{ opacity: isLoading && isInitialLoad ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
        <Routes>
          {/* Root path - show about page on desktop, nav on mobile */}
          <Route path="/" element={
            <Suspense fallback={<PageFallback />}>
              <NowPage defaultNote="about" />
            </Suspense>
          } />
          
          {/* /now path - show the mar172025 note */}
          <Route path="/now" element={
            <Suspense fallback={<PageFallback />}>
              <NowPage defaultNote="mar172025" />
            </Suspense>
          } />
          
          {/* Legacy /now/:noteId paths - redirect to new structure */}
          <Route path="/now/:noteId" element={<Navigate to="/:noteId" replace />} />
          
          {/* New direct note paths */}
          <Route path="/:noteId" element={
            <Suspense fallback={<PageFallback />}>
              <NowPage />
            </Suspense>
          } />
          
          {/* BAGGY S/S 25 page - Lazy loaded */}
          <Route path="/baggy" element={
            <Suspense fallback={<PageFallback />}>
              <BaggySSPage />
            </Suspense>
          } />
        </Routes>
      </div>
    </ImageLoadingContext.Provider>
  );
}

export default App;
