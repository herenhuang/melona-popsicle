import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Minus, Plus, Search, Edit, Calendar, ArrowLeft } from 'lucide-react';
import { notes } from '../data/notes';
import { MarkdownContent } from './MarkdownContent';
import { formatDateForContent, formatDateForPreview } from '../utils/dateFormatters';
import { generatePreview } from '../data/notes';

export function NowPage() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedNote, setSelectedNote] = useState(isMobile ? '' : (noteId || notes[0].id));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (noteId && !isMobile) {
      setSelectedNote(noteId);
    }
  }, [noteId, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectedNoteContent = notes.find(note => note.id === selectedNote);

  // Sort notes: pinned first (by pinnedOrder), then unpinned by date
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (a.isPinned && b.isPinned) {
        return (a.pinnedOrder || 0) - (b.pinnedOrder || 0);
      }
      if (a.isPinned) return -1;
      if (b.isPinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [notes]);

  // Filter notes based on search query
  const filteredNotes = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return sortedNotes.filter(note => {
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
      );
    });
  }, [sortedNotes, searchQuery]);

  const handleNoteSelect = (id: string) => {
    setSelectedNote(id);
    navigate(`/now/${id}`);
  };

  // Split notes into pinned and unpinned
  const { pinnedNotes, olderNotes } = useMemo(() => {
    return {
      pinnedNotes: filteredNotes.filter(note => note.isPinned),
      olderNotes: filteredNotes.filter(note => !note.isPinned)
    };
  }, [filteredNotes]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Sidebar */}
      <div className={`w-full md:w-[320px] border-r border-[#e4e4e4] flex flex-col bg-[#f7f7f7] overflow-hidden ${
        selectedNote && isMobile ? 'hidden' : ''
      }`}>
        {/* Window Controls */}
        <div className="flex items-center gap-2 p-4 md:p-3">
          <button className="w-4 h-4 md:w-3 md:h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/90 flex items-center justify-center group">
            <X className="w-3 h-3 md:w-2 md:h-2 text-[#ff5f57]/0 group-hover:text-[#660000] transition-colors" />
          </button>
          <button className="w-4 h-4 md:w-3 md:h-3 rounded-full bg-[#febc2e] hover:bg-[#febc2e]/90 flex items-center justify-center group">
            <Minus className="w-3 h-3 md:w-2 md:h-2 text-[#febc2e]/0 group-hover:text-[#9a6c00] transition-colors" />
          </button>
          <button className="w-4 h-4 md:w-3 md:h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/90 flex items-center justify-center group">
            <Plus className="w-3 h-3 md:w-2 md:h-2 text-[#28c840]/0 group-hover:text-[#006500] transition-colors" />
          </button>
          <button className="ml-auto text-[#969696] hover:text-[#636363] transition-colors">
            <Edit className="w-4.5 h-4.5 md:w-3.5 md:h-3.5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3 md:px-3 md:py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 md:w-3.5 md:h-3.5 text-[#969696]" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 md:py-1.5 bg-[#e4e4e4]/20 rounded-md text-sm md:text-xs placeholder-[#969696] focus:outline-none focus:ring-1 focus:ring-[#e4e4e4]"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto px-4 md:px-3">
          {/* Pinned Section */}
          {pinnedNotes.length > 0 && (
            <>
              <div className="mt-4">
                <h3 className="text-sm md:text-xs font-medium text-[#969696] mb-2">
                  Pinned
                </h3>
              </div>
              <div>
                {pinnedNotes.map((note) => (
                  <button 
                    key={note.id}
                    onClick={() => handleNoteSelect(note.id)}
                    className="group w-full text-left"
                  >
                    <div className={`transition-colors ${
                      selectedNote === note.id ? 'bg-[#FFE484]' : 'hover:bg-[#e4e4e4]/40'
                    } py-5 md:py-4 px-4 md:px-3 rounded-md`}>
                      <div className="flex flex-col min-w-0">
                        <div className="font-medium text-base md:text-sm text-[#464646] truncate pr-2">
                          {note.title}
                        </div>
                        <div className="flex items-center gap-2 text-sm md:text-xs mt-1 md:mt-0.5 pr-2">
                          <span className="text-[#464646]">
                            {formatDateForPreview(note.date)}
                          </span>
                          <span className="text-[#969696] truncate">
                            {generatePreview(note.content)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Older Notes Section */}
          {olderNotes.length > 0 && (
            <>
              <div className="mt-6">
                <h3 className="text-sm md:text-xs font-medium text-[#969696] mb-2">
                  Older Notes
                </h3>
              </div>
              <div>
                {olderNotes.map((note) => (
                  <button 
                    key={note.id}
                    onClick={() => handleNoteSelect(note.id)}
                    className="group w-full text-left"
                  >
                    <div className={`transition-colors ${
                      selectedNote === note.id ? 'bg-[#FFE484]' : 'hover:bg-[#e4e4e4]/40'
                    } py-5 md:py-4 px-4 md:px-3 rounded-md`}>
                      <div className="flex flex-col min-w-0">
                        <div className="font-medium text-base md:text-sm text-[#464646] truncate pr-2">
                          {note.title}
                        </div>
                        <div className="flex items-center gap-2 text-sm md:text-xs mt-1 md:mt-0.5 pr-2">
                          <span className="text-[#464646]">
                            {formatDateForPreview(note.date)}
                          </span>
                          <span className="text-[#969696] truncate">
                            {generatePreview(note.content)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 bg-white overflow-y-auto ${
        !selectedNote && isMobile ? 'hidden' : ''
      }`}>
        {/* Mobile back button */}
        {isMobile && (
          <div className="px-8 py-4 flex items-center">
            <button 
              onClick={() => {
                setSelectedNote('');
                navigate('/now');
              }}
              className="text-[#969696] hover:text-[#636363] transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5 md:w-4 md:h-4" />
              <span className="text-base md:text-sm">Notes</span>
            </button>
          </div>
        )}
        
        {selectedNoteContent && (
          <div className="w-full px-8 py-8">
            <div className="mb-8 text-center">
              <p className="text-base md:text-sm text-[#969696] flex items-center justify-center gap-2">
                <Calendar size={18} className="md:w-4 md:h-4" />
                {formatDateForContent(selectedNoteContent.date)}
              </p>
            </div>
            <div className="text-[#464646] text-base md:text-sm">
              <h1 className="text-3xl md:text-2xl font-medium mb-6">
                {selectedNoteContent.title}
              </h1>
              <MarkdownContent content={selectedNoteContent.content} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 