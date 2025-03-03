import React from 'react';
import { ExperienceFirstPage } from './ExperienceFirstPage';
import { ExperienceSecondPage } from './ExperienceSecondPage';

export function Experience() {
  return (
    <div className="w-full my-24 relative">
      <div className="max-w-4xl mx-auto">
        {/* First page tilted right by default, straightens on hover */}
        <div className="relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-200">
          <ExperienceFirstPage />
        </div>
        
        {/* Second page tilted left by default, straightens on hover */}
        <div className="relative -mt-32 ml-16 z-0 transform -rotate-3 hover:rotate-0 transition-transform duration-200 w-full">
          <ExperienceSecondPage />
        </div>
      </div>
    </div>
  );
} 