import React from 'react';

export function ExperienceSecondPage() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="bg-white rounded-xl shadow-xl transform hover:-rotate-1 transition-transform duration-200 relative">
        {/* Hole punches */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-8">
          <div className="w-6 h-6 rounded-full bg-[#f5f3e8] shadow-inner border border-gray-200" />
          <div className="w-6 h-6 rounded-full bg-[#f5f3e8] shadow-inner border border-gray-200" />
          <div className="w-6 h-6 rounded-full bg-[#f5f3e8] shadow-inner border border-gray-200" />
        </div>

        {/* Red margin line */}
        <div className="absolute left-20 top-0 bottom-0 w-px bg-red-200" />

        {/* Content area with horizontal lines */}
        <div className="relative pl-28 pr-12 py-12">
          <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="border-b border-[#e6e6e6]"
                style={{ height: '2rem' }}
              />
            ))}
          </div>

          <div className="relative prose prose-lg">
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-6">Projects</h2>
              <ul className="space-y-4 list-none pl-0">
                <li>★ co.lab learning — a group-driven, blended learning environment with 30k+ hours of collaboration</li>
                <li>★ how to product — e-book, #1 product of the day, sharing product management insights</li>
                <li>★ solana portraits — nft art commissions for digital collectible enthusiasts</li>
                <li>★ you belong in tech — career-switch stories and resources to inspire folks entering tech</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-6">Recognition & Speaking</h2>
              <ul className="space-y-4 list-none pl-0">
                <li>★ dmz women of the year — recognized for contributions to tech education</li>
                <li>★ glory 30x30 honoree — named one of canada's standout young entrepreneurs</li>
                <li>★ forbes 30 under 30 — honored for co.lab's impact</li>
                <li>★ waterloo innovation summit — spoke on flipped classrooms & peer-led learning</li>
                <li>★ dmz — discussed founder-led sales strategies & marketing funnels</li>
                <li>★ founder institute — insights on community-driven growth & product-led strategies</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 