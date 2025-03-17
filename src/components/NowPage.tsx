import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Minus, Plus, Search, Edit, Calendar, ArrowLeft } from 'lucide-react';
import { notes } from '../data/notes';
import { MarkdownContent } from './MarkdownContent';
import { formatDateForContent, formatDateForPreview } from '../utils/dateFormatters';
import { generatePreview } from '../data/notes';

export function NowPage() {
  const navigate = useNavigate();
  const { noteId } = useParams();
  
  // Initialize with false and update in useEffect to avoid SSR issues
  const [isMobile, setIsMobile] = useState(false);
  const [selectedNote, setSelectedNote] = useState(noteId || notes[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  // Refs for scrollable containers
  const notesListRef = useRef<HTMLDivElement>(null);
  const contentViewRef = useRef<HTMLDivElement>(null);

  // Initialize isMobile on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update selectedNote when noteId changes or mobile status changes
  useEffect(() => {
    if (isMobile && !noteId) {
      setSelectedNote('');
    } else if (noteId) {
      setSelectedNote(noteId);
    }
  }, [noteId, isMobile]);
  
  // Reset scroll position when switching views
  useEffect(() => {
    // Use setTimeout to ensure the DOM has updated before scrolling
    const timer = setTimeout(() => {
      if (selectedNote && contentViewRef.current) {
        contentViewRef.current.scrollTop = 0;
      } else if (!selectedNote && notesListRef.current) {
        notesListRef.current.scrollTop = 0;
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [selectedNote]);

  // Calculate sidebar visibility class
  const sidebarClassName = useMemo(() => {
    const baseClass = "w-full md:w-[320px] border-r border-[#e4e4e4] bg-[#f7f7f7] relative";
    return `${baseClass} ${selectedNote && isMobile ? 'hidden' : ''}`;
  }, [selectedNote, isMobile]);

  // Calculate main content visibility class
  const mainContentClassName = useMemo(() => {
    const baseClass = "flex-1 bg-white";
    return `${baseClass} ${!selectedNote && isMobile ? 'hidden' : ''}`;
  }, [selectedNote, isMobile]);

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
    
    // Force scroll to top immediately when selecting a note
    if (contentViewRef.current) {
      setTimeout(() => {
        if (contentViewRef.current) {
          contentViewRef.current.scrollTop = 0;
        }
      }, 0);
    }
  };

  // Split notes into pinned and unpinned
  const { pinnedNotes, olderNotes } = useMemo(() => {
    return {
      pinnedNotes: filteredNotes.filter(note => note.isPinned),
      olderNotes: filteredNotes.filter(note => !note.isPinned)
    };
  }, [filteredNotes]);

  // Mobile layout with fixed header and footer
  if (isMobile) {
    return (
      <div className="h-screen bg-white overflow-hidden">
        {/* Notes List View */}
        <div className={selectedNote ? 'hidden' : 'h-full flex flex-col'}>
          {/* Fixed Header - Now without search bar */}
          <div className="bg-[#f7f7f7] z-20 fixed top-0 left-0 right-0 shadow-sm">
            {/* Window Controls */}
            <div className="flex items-center gap-2 p-3">
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
          </div>

          {/* Scrollable Notes List - with padding for header and footer */}
          <div 
            ref={notesListRef}
            className="overflow-y-auto bg-[#f7f7f7]" 
            style={{ 
              paddingTop: '50px', 
              paddingBottom: '50px',
              height: '100vh',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Search Bar - Now regular (not sticky) */}
            <div className="px-4 py-3 bg-[#f7f7f7]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-[#969696]" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#e4e4e4]/20 rounded-md text-sm placeholder-[#969696] focus:outline-none focus:ring-1 focus:ring-[#e4e4e4]"
                />
              </div>
            </div>
            
            <div className="px-4">
              {/* Pinned Section */}
              {pinnedNotes.length > 0 && (
                <>
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-[#969696] mb-2">
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
                        } py-5 px-4 rounded-md`}>
                          <div className="flex flex-col min-w-0">
                            <div className="font-medium text-base text-[#464646] truncate pr-2">
                              {note.title}
                            </div>
                            <div className="flex items-center gap-2 text-sm mt-1 pr-2">
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
                    <h3 className="text-sm font-medium text-[#969696] mb-2">
                      Older Notes
                    </h3>
                  </div>
                  <div className="mb-6">
                    {olderNotes.map((note) => (
                      <button 
                        key={note.id}
                        onClick={() => handleNoteSelect(note.id)}
                        className="group w-full text-left"
                      >
                        <div className={`transition-colors ${
                          selectedNote === note.id ? 'bg-[#FFE484]' : 'hover:bg-[#e4e4e4]/40'
                        } py-5 px-4 rounded-md`}>
                          <div className="flex flex-col min-w-0">
                            <div className="font-medium text-base text-[#464646] truncate pr-2">
                              {note.title}
                            </div>
                            <div className="flex items-center gap-2 text-sm mt-1 pr-2">
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

          {/* Fixed Footer */}
          <div className="py-2 text-center bg-[#f7f7f7] fixed bottom-0 left-0 right-0 z-20 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
            <span className="text-xs text-[#969696]">
              {notes.length} note{notes.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Note Detail View */}
        {selectedNoteContent && (
          <div className={!selectedNote ? 'hidden' : 'h-full flex flex-col'}>
            {/* Fixed Header */}
            <div className="px-8 py-3 flex items-center bg-white z-10 fixed top-0 left-0 right-0 shadow-sm">
              <button 
                onClick={() => {
                  setSelectedNote('');
                  navigate('/now');
                }}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5 text-[#CC9900]" />
                <span className="text-base font-medium text-[#969696]">Notes</span>
              </button>
            </div>
            
            {/* Scrollable Content - with padding for header */}
            <div 
              ref={contentViewRef}
              className="overflow-y-auto bg-white" 
              style={{ 
                paddingTop: '56px',
                paddingBottom: '30px',
                height: '100vh',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'none'
              }}
            >
              <div className="w-full px-8 py-6">
                <div className="mb-6 text-center">
                  <p className="text-sm text-[#969696] flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    {formatDateForContent(selectedNoteContent.date)}
                  </p>
                </div>
                <div className="text-[#464646]">
                  <h1 className="text-2xl font-medium mb-6">
                    {selectedNoteContent.title}
                  </h1>
                  <div className="text-base">
                    <MarkdownContent content={selectedNoteContent.content} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout (unchanged)
  return (
    <div className="flex flex-row h-screen bg-white">
      {/* Sidebar */}
      <div className={`${sidebarClassName} flex flex-col`}>
        {/* Fixed Header Section */}
        <div className="sticky top-0 z-20 bg-[#f7f7f7]">
        {/* Window Controls */}
        <div className="flex items-center gap-2 p-3">
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
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search Bar */}
          <div className="px-3 py-2 border-b border-[#e4e4e4]">
          <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-[#969696]" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 bg-[#e4e4e4]/20 rounded-md text-xs placeholder-[#969696] focus:outline-none focus:ring-1 focus:ring-[#e4e4e4]"
            />
            </div>
          </div>
        </div>

        {/* Notes List - Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-3 pb-10">
          {/* Pinned Section */}
          {pinnedNotes.length > 0 && (
            <>
          <div className="mt-4">
            <h3 className="text-xs font-medium text-[#969696] mb-2">
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
                } py-4 px-3 rounded-md`}>
                  <div className="flex flex-col min-w-0">
                    <div className="font-medium text-sm text-[#464646] truncate pr-2">
                      {note.title}
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-0.5 pr-2">
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
            <h3 className="text-xs font-medium text-[#969696] mb-2">
              Older Notes
            </h3>
          </div>
              <div className="mb-6">
                {olderNotes.map((note) => (
              <button 
                key={note.id}
                onClick={() => handleNoteSelect(note.id)}
                className="group w-full text-left"
              >
                <div className={`transition-colors ${
                  selectedNote === note.id ? 'bg-[#FFE484]' : 'hover:bg-[#e4e4e4]/40'
                } py-4 px-3 rounded-md`}>
                  <div className="flex flex-col min-w-0">
                    <div className="font-medium text-sm text-[#464646] truncate pr-2">
                      {note.title}
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-0.5 pr-2">
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
      <div className={mainContentClassName}>
        {selectedNoteContent && (
          <div className="w-full px-8 py-6 overflow-y-auto h-full">
            <div className="mb-6 text-center">
            <p className="text-sm text-[#969696] flex items-center justify-center gap-2">
                <Calendar size={16} className="w-4 h-4" />
                {formatDateForContent(selectedNoteContent.date)}
            </p>
          </div>
            <div className="text-[#464646]">
              <h1 className="text-xl font-medium mb-6">
                {selectedNoteContent.title}
            </h1>
              <div className="text-sm">
                <MarkdownContent content={selectedNoteContent.content} />
              </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
} 