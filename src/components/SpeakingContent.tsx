import React from 'react';

export const SpeakingContent = () => (
  <div className="space-y-4">
    <div className="prose">
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>dmz women of the year</strong> — recognized for contributions to tech education</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>glory 30x30 honoree</strong> — named one of canada's standout young entrepreneurs</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>forbes 30 under 30</strong> — honored for co.lab's impact</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>waterloo innovation summit</strong> — spoke on flipped classrooms & peer-led learning</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>dmz</strong> — discussed founder-led sales strategies & marketing funnels</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>founder institute</strong> — insights on community-driven growth & product-led strategies</span>
        </li>
      </ul>
    </div>
    
    <div className="mt-4 bg-white/50 p-3 rounded-lg shadow-sm">
      <h4 className="font-bold text-sm mb-1">Featured Recognition</h4>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-xl">🏆</span>
        </div>
        <div>
          <h5 className="font-bold text-sm">Forbes 30 Under 30</h5>
          <p className="text-xs">Recognized for innovation in education technology and impact on career transitions.</p>
        </div>
      </div>
    </div>
  </div>
);