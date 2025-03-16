import React from 'react';

export const WorkContent = () => (
  <div className="space-y-4">
    <div className="prose">
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>freelance strategic generalist</strong> — helping indie founders and small teams with product strategy, ops, and marketing</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>cofounder @ co.lab</strong> — creating immersive, real-world tech learning programs for busy professionals</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>program + product @ microsoft</strong> — worked on edge devrel & azure devops, focusing on dev advocacy and product iteration</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>product manager intern @ zynga</strong> — contributed to wordstreak with friends (300k dau), spearheaded app revamp from 1 to 4 stars in four months</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>interned @ cibc & scotiabank</strong> — business analyst roles back in university days</span>
        </li>
      </ul>
    </div>
    
    <div className="mt-4 bg-white/50 p-3 rounded-lg shadow-sm">
      <h4 className="font-bold text-sm mb-1">Skills & Expertise</h4>
      <div className="flex flex-wrap gap-1.5">
        <span className="px-2 py-0.5 bg-teal-100 rounded-full text-xs">Product Strategy</span>
        <span className="px-2 py-0.5 bg-teal-100 rounded-full text-xs">Team Leadership</span>
        <span className="px-2 py-0.5 bg-teal-100 rounded-full text-xs">Marketing</span>
        <span className="px-2 py-0.5 bg-teal-100 rounded-full text-xs">Operations</span>
        <span className="px-2 py-0.5 bg-teal-100 rounded-full text-xs">Growth</span>
        <span className="px-2 py-0.5 bg-teal-100 rounded-full text-xs">Community Building</span>
      </div>
    </div>

    <div className="mt-2 flex justify-center">
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('openSpeakingPopup'))}
        className="px-4 py-1.5 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg"
      >
        Speaking
      </button>
    </div>
  </div>
);