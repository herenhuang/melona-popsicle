import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function BoringPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 font-inter text-gray-700">
      <h1 className="text-2xl font-sora font-semibold text-[#ff6b35] mb-6">Helen Huang</h1>
      
      <div className="space-y-8">
        <section className="mb-12">
          <p className="text-lg mb-6">
            Hi there. I'm an operator with 10+ years of experience in strategy, product and marketing. 
            I'm highly collaborative, and love turning chaos into clear process with a creative twist.
          </p>
          <p className="text-lg italic">
            I'm currently "on sabbatical", taking time to explore new perspectives and opportunities.
          </p>
        </section>

        <section>
          <h2 className="font-semibold mb-4">Work Experience</h2>
          <ul className="space-y-4">
            <li>★ freelance strategic generalist — helping indie founders and small teams with product strategy, ops, and marketing</li>
            <li>★ cofounder @ co.lab — creating immersive, real-world tech learning programs for busy professionals</li>
            <li>★ program + product @ microsoft — worked on edge devrel & azure devops, focusing on dev advocacy and product iteration</li>
            <li>★ product manager intern @ zynga — contributed to wordstreak with friends (300k dau), spearheaded app revamp from 1 to 4 stars in four months</li>
            <li>★ interned @ cibc & scotiabank — business analyst roles back in university days</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold mb-4">Projects</h2>
          <ul className="space-y-4">
            <li>★ co.lab learning — a group-driven, blended learning environment with 30k+ hours of collaboration</li>
            <li>★ how to product — e-book, #1 product of the day, sharing product management insights</li>
            <li>★ solana portraits — nft art commissions for digital collectible enthusiasts</li>
            <li>★ you belong in tech — career-switch stories and resources to inspire folks entering tech</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold mb-4">Recognition & Speaking</h2>
          <ul className="space-y-4">
            <li>★ dmz women of the year — recognized for contributions to tech education</li>
            <li>★ glory 30x30 honoree — named one of canada's standout young entrepreneurs</li>
            <li>★ forbes 30 under 30 — honored for co.lab's impact</li>
            <li>★ waterloo innovation summit — spoke on flipped classrooms & peer-led learning</li>
            <li>★ dmz — discussed founder-led sales strategies & marketing funnels</li>
            <li>★ founder institute — insights on community-driven growth & product-led strategies</li>
          </ul>
        </section>

        <footer className="mt-20 pt-8 border-t border-gray-200">
          <p className="text-gray-600 italic mb-6">
            there's nothing wrong with a regular website. you want the work details? sure here it is here you go. 
            but isn't that just a bit.... boring? not that i want to call you boring (pls ignore the URL heh), 
            but yes consider checking out the fun website!
          </p>
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#ff6b35] hover:text-[#ff8b35] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Take me to the fun site</span>
          </button>
        </footer>
      </div>
    </div>
  );
} 