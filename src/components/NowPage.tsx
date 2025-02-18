import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Minus, Plus, Search, Edit } from 'lucide-react';
import { nowUpdates } from '../data/now-updates';

export function NowPage() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [selectedNote, setSelectedNote] = useState(noteId || nowUpdates[0].id);

  useEffect(() => {
    if (noteId) {
      setSelectedNote(noteId);
    }
  }, [noteId]);

  const selectedNoteContent = nowUpdates.find(note => note.id === selectedNote);

  const handleNoteSelect = (id: string) => {
    setSelectedNote(id);
    navigate(id === '2025-02-18' ? '/now' : `/now/${id}`);
  };

  const renderTextWithLinks = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <a 
          key={match.index} 
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#CC9900] underline underline-offset-2 hover:opacity-80"
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts;
  };

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
            <Edit className="w-4 h-4" />
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
                  onClick={() => handleNoteSelect(note.id)}
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
        <div className="pl-8 pr-16 py-8">
          <div className="mb-8 text-center">
            <p className="text-sm text-[#969696]">
              {new Date(selectedNoteContent?.date || '').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <div className="text-[#636363] text-sm">
            <h1 className="text-2xl font-medium mb-6">
              {selectedNoteContent?.title}
              {selectedNoteContent?.id === 'nownownow' && (
                <span className="text-sm font-normal ml-2">
                  (<a 
                    href="https://nownownow.com/about" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    learn more about /now pages
                  </a>)
                </span>
              )}
            </h1>
            
            {/* Content Blocks */}
            {selectedNoteContent?.content.blocks.map((block, index) => (
              <div key={index} className="mb-6">
                {block.type === 'header' && block.title && (
                  <>
                    <h2 className="text-xl font-medium mb-4">{block.title}</h2>
                    <ul className="list-disc pl-5 space-y-2">
                      {block.content.map((item, bIndex) => (
                        <li key={bIndex}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
                {block.type === 'paragraph' && (
                  <div className="space-y-4">
                    {block.content.map((paragraph, pIndex) => (
                      <p key={pIndex}>{renderTextWithLinks(paragraph)}</p>
                    ))}
                  </div>
                )}
                {block.type === 'bullets' && (
                  <ul className="list-disc pl-5 space-y-2">
                    {block.content.map((item, bIndex) => (
                      <li key={bIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Images */}
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
                      <figcaption className="text-sm text-[#969696] mt-2">
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