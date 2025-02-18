import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { ProjectSection } from './components/ProjectSection';
import { ContactBar } from './components/ContactBar';
import { Confetti } from './components/Confetti';
import { ChoiceScreen } from './components/ChoiceScreen';
import { BoringPage } from './components/BoringPage';
import { GardenDemo } from './components/GardenDemo';
import { personalWork, personalProjects, personalAwards, personalTalks } from './data/projects';
import { ChatBox } from './components/ChatBox';
import { FunFooter } from './components/FunFooter';
import { NowPage } from './components/NowPage';
import './styles/grid.css';

function HomePage() {
  const location = useLocation();
  const [hasChosen, setHasChosen] = useState(false);
  const [choice, setChoice] = useState<'fun' | 'regular' | null>(null);

  const handleChoice = (selectedChoice: 'fun' | 'regular') => {
    setHasChosen(true);
    setChoice(selectedChoice);
  };

  if (!hasChosen) {
    return <ChoiceScreen onChoice={handleChoice} />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-8 md:px-16 lg:px-24 grid-bg">
      <Confetti />
      <Header />
      <ChatBox />
      <GardenDemo />

      {choice === 'fun' && (
        <div className="w-full max-w-4xl mx-auto">
          <FunFooter />
        </div>
      )}
      
      {choice === 'regular' && (
        <main className="w-full flex justify-center">
          <ProjectSection 
            work={personalWork}
            projects={personalProjects}
            awards={personalAwards}
            talks={personalTalks}
            isPersonal={true}
          />
        </main>
      )}
      <ContactBar isPersonal={true} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boring" element={<BoringPage />} />
        <Route path="/now" element={<NowPage />} />
      </Routes>
    </Router>
  );
}
