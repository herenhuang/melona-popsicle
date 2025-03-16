import React from 'react';

export const ProjectsContent = () => (
  <div className="space-y-4">
    <div className="prose">
      <ul className="list-none space-y-2">
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>co.lab learning</strong> — a group-driven, blended learning environment with 30k+ hours of collaboration</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>how to product</strong> — e-book, #1 product of the day, sharing product management insights</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>solana portraits</strong> — nft art commissions for digital collectible enthusiasts</span>
        </li>
        <li className="flex items-start">
          <span className="text-base mr-2">★</span>
          <span className="text-xs"><strong>you belong in tech</strong> — career-switch stories and resources to inspire folks entering tech</span>
        </li>
      </ul>
    </div>
    
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="bg-white/50 p-3 rounded-lg shadow-sm">
        <h4 className="font-bold text-sm mb-1">Featured Project</h4>
        <div className="aspect-video bg-yellow-100 rounded-md mb-2 flex items-center justify-center">
          <span className="text-yellow-800 text-xs">Project Image</span>
        </div>
        <p className="text-xs">Co.lab has helped hundreds of professionals transition into tech careers through hands-on learning.</p>
      </div>
      <div className="bg-white/50 p-3 rounded-lg shadow-sm">
        <h4 className="font-bold text-sm mb-1">Impact</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Students Helped</span>
            <span className="font-bold">500+</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '80%' }}></div>
          </div>
          
          <div className="flex justify-between mt-2 text-xs">
            <span>Collaboration Hours</span>
            <span className="font-bold">30,000+</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);