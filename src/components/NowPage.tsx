import React, { useState } from 'react';
import { X, Minus, Plus, Search, PenTool } from 'lucide-react';

export function NowPage() {
  const [selectedNote, setSelectedNote] = useState<'july' | 'todo'>('july');

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-72 border-r border-[#e4e4e4] flex flex-col bg-[#f7f7f7]">
        {/* Window Controls */}
        <div className="flex items-center gap-2 p-4">
          <button className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/90 flex items-center justify-center group">
            <X className="w-2 h-2 text-[#ff5f57]/0 group-hover:text-[#660000] transition-colors" />
          </button>
          <button className="w-3 h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/90 flex items-center justify-center group">
            <Minus className="w-2 h-2 text-[#febc2e]/0 group-hover:text-[#9a6c00] transition-colors" />
          </button>
          <button className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/90 flex items-center justify-center group">
            <Plus className="w-2 h-2 text-[#28c840]/0 group-hover:text-[#006500] transition-colors" />
          </button>
          <button className="ml-auto text-[#969696] hover:text-[#636363] transition-colors">
            <PenTool className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#969696]" />
            <input 
              type="text" 
              placeholder="Search"
              className="w-full pl-10 pr-4 py-1.5 bg-[#e4e4e4] rounded-lg text-sm focus:outline-none text-[#636363] placeholder-[#969696]"
            />
          </div>
        </div>

        {/* Pinned Notes */}
        <div className="mt-6">
          <h2 className="px-4 text-xs font-medium text-[#969696] uppercase">Pinned</h2>
          <div className="mt-2 px-2">
            <button 
              onClick={() => setSelectedNote('july')}
              className={`group w-full rounded-lg text-left transition-colors mb-1 ${
                selectedNote === 'july' 
                  ? 'bg-[#FFE484]' 
                  : 'hover:bg-[#FFE484]'
              }`}
            >
              <div className={`px-3 py-2`}>
                <h3 className="font-bold text-[#636363]">July 2024</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-sm text-[#636363]">Yesterday</p>
                  <p className="text-sm text-[#969696] flex-1 truncate">Currently building in public...</p>
                </div>
              </div>
            </button>
            <button 
              onClick={() => setSelectedNote('todo')}
              className={`group w-full rounded-lg text-left transition-colors ${
                selectedNote === 'todo' 
                  ? 'bg-[#FFE484]' 
                  : 'hover:bg-[#FFE484]'
              }`}
            >
              <div className={`px-3 py-2`}>
                <h3 className="font-bold text-[#636363]">Todo & Ideas</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-sm text-[#636363]">Yesterday</p>
                  <p className="text-sm text-[#969696] flex-1 truncate">☐ Write blog post about garden...</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white">
        <div className="max-w-2xl mx-auto p-8">
          {selectedNote === 'july' ? (
            <>
              <div className="text-center mb-8">
                <p className="text-sm text-[#969696]">July 3, 2024 at 3:00 PM</p>
              </div>
              <div className="text-[#636363]">
                <h1 className="text-2xl font-medium mb-6">July 2024</h1>
                <h2 className="text-xl font-medium mb-4">currently</h2>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>building in public</li>
                  <li>exploring new projects and opportunities</li>
                  <li>reading "Middlemarch" by George Eliot</li>
                </ul>
                <h2 className="text-xl font-medium mb-4">previously</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>shipped some fun projects</li>
                  <li>learned a lot about building in public</li>
                  <li>made some great connections</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-sm text-[#969696]">July 1, 2024 at 9:15 AM</p>
              </div>
              <div className="text-[#636363]">
                <h1 className="text-2xl font-medium mb-6">Todo & Ideas</h1>
                <h2 className="text-xl font-medium mb-4">Website Updates</h2>
                <ul className="space-y-2 mb-6">
                  <li>☐ Write blog post about garden metaphors in digital spaces</li>
                  <li>☐ Add dark mode toggle</li>
                  <li>☑ Implement Apple Notes style UI for /now page</li>
                  <li>☐ Create a proper RSS feed</li>
                </ul>
                <h2 className="text-xl font-medium mb-4">Content Ideas</h2>
                <ul className="space-y-2 mb-6">
                  <li>☐ Document the process of building this site</li>
                  <li>☐ Write about the intersection of gardening and coding</li>
                  <li>☐ Share thoughts on digital gardens vs traditional blogs</li>
                </ul>
                <h2 className="text-xl font-medium mb-4">Future Features</h2>
                <ul className="space-y-2">
                  <li>☐ Add a proper garden visualization</li>
                  <li>☐ Implement a better note-taking system</li>
                  <li>☐ Create an interactive timeline of projects</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 