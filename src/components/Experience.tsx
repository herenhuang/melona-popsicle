import React from 'react';

export function Experience() {
  return (
    <div className="w-full max-w-4xl mx-auto my-24">
      <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 transform hover:-rotate-1 transition-transform duration-200">
        <div className="prose prose-lg">
          <p className="text-lg mb-6">
            Hi there. I'm an operator with 10+ years of experience in strategy, product and marketing. 
            I'm highly collaborative, and love turning chaos into clear process with a creative twist.
          </p>
          <p className="text-lg italic mb-12">
            I'm currently "on sabbatical", taking time to explore new perspectives and opportunities.
          </p>

          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6">Work Experience</h2>
            <ul className="space-y-4 list-none pl-0">
              <li>★ freelance strategic generalist — helping indie founders and small teams with product strategy, ops, and marketing</li>
              <li>★ cofounder @ co.lab — creating immersive, real-world tech learning programs for busy professionals</li>
              <li>★ program + product @ microsoft — worked on edge devrel & azure devops, focusing on dev advocacy and product iteration</li>
              <li>★ product manager intern @ zynga — contributed to wordstreak with friends (300k dau), spearheaded app revamp from 1 to 4 stars in four months</li>
              <li>★ interned @ cibc & scotiabank — business analyst roles back in university days</li>
            </ul>
          </section>

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
  );
} 