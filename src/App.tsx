import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ProjectSection } from './components/ProjectSection';
import { ContactBar } from './components/ContactBar';
import { Contact } from './components/Contact';
import { Confetti } from './components/Confetti';
import { work, projects, awards, talks } from './data/projects';

function HomePage() {
  const [isPersonal, setIsPersonal] = useState(true);

  return (
    <div className="px-8 md:px-16 lg:px-24">
      <Confetti />
<Header isPersonal={isPersonal} onToggle={() => {
  if (isPersonal) {
    document.body.classList.add('professional');
  } else {
    document.body.classList.remove('professional');
  }
  setIsPersonal(!isPersonal);
}} />
      <main>
        <ProjectSection 
          work={work}
          projects={projects}
          awards={awards}
          talks={talks}
          isPersonal={isPersonal}
        />
      </main>
      <ContactBar isPersonal={isPersonal} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#f5f3e8] relative">
        <div className="bg-grid-pattern min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
