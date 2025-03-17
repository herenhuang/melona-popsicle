import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <BrowserRouter>
      {isLoading ? (
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/now" element={<NowPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
