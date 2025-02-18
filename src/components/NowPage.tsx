import React, { useState } from 'react';
import { X, Minus, Plus, Search, PenTool } from 'lucide-react';
import { nowUpdates, type NowUpdate } from '../data/now-updates';

export function NowPage() {
  const [selectedNote, setSelectedNote] = useState<string>(nowUpdates[0].id);

  const selectedNoteContent = nowUpdates.find(note => note.id === selectedNote);

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
            {nowUpdates.map((note, index) => (
              <React.Fragment key={note.id}>
                <button 
                  onClick={() => setSelectedNote(note.id)}
                  className={`group w-full text-left transition-colors rounded-lg ${
                    selectedNote === note.id ? 'bg-[#FFE484]' : ''
                  }`}
                >
                  <div className={`px-3 py-3.5`}>
                    <h3 className="font-bold text-sm text-[#636363]">{note.title}</h3>
                    <div className="flex items-baseline gap-2 text-[#969696] text-sm mt-0.5">
                      <p>{note.date}</p>
                      <p className="flex-1 truncate">{note.preview}</p>
                    </div>
                  </div>
                </button>
                {index < nowUpdates.length - 1 && (
                  <div className={`h-[1px] mx-2 ${
                    selectedNote === note.id || selectedNote === nowUpdates[index + 1]?.id
                      ? 'bg-[#FFE484]' 
                      : 'bg-[#e4e4e4]'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white overflow-y-auto">
        <div className="max-w-2xl mx-auto p-8">
          <div className="text-center mb-8">
            <p className="text-sm text-[#969696]">{selectedNoteContent?.date}</p>
          </div>
          <div className="text-[#636363]">
            <h1 className="text-2xl font-medium mb-6">{selectedNoteContent?.title}</h1>
            {selectedNoteContent?.content.currently.length > 0 && (
              <>
                <h2 className="text-xl font-medium mb-4">currently</h2>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  {selectedNoteContent.content.currently.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            {selectedNoteContent?.content.previously.length > 0 && (
              <>
                <h2 className="text-xl font-medium mb-4">previously</h2>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  {selectedNoteContent.content.previously.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
            {selectedNoteContent?.content.images && selectedNoteContent.content.images.length > 0 && (
              <div className="space-y-6 mt-8">
                {selectedNoteContent.content.images.map((image, index) => (
                  <figure key={index} className="rounded-lg overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-auto"
                    />
                    {image.caption && (
                      <figcaption className="text-sm text-[#969696] mt-2 text-center">
                        {image.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 