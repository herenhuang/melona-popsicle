import React from 'react';

export const AboutContent = () => (
  <div className="h-full flex flex-col justify-between p-4">
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-purple-600 font-medium tracking-wide uppercase">Currently</span>
      </div>
      
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-gray-700">
          Exploring the intersection of <span className="text-teal-600 font-medium">product</span>, <span className="text-purple-600 font-medium">strategy</span>, and <span className="text-orange-500 font-medium">creativity</span>. I love turning chaos into clear processes with unexpected twists.
        </p>
        <p className="text-sm leading-relaxed text-gray-700">
          On sabbatical — taking time to explore new perspectives and opportunities.
        </p>
      </div>
    </div>

    <div className="mt-4">
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('openWorkPopup'))}
        className="w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white text-sm rounded-lg 
                 hover:from-teal-600 hover:to-purple-600 transition-all duration-300 
                 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        View Work Experience →
      </button>
    </div>
  </div>
);