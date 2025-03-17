import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Minus, Plus, Search, Edit, Calendar, ArrowLeft } from 'lucide-react';
import { notes } from '../data/notes';
import { MarkdownContent } from './MarkdownContent';
import { formatDateForContent, formatDateForPreview } from '../utils/dateFormatters';
import { generatePreview } from '../data/notes';
import { Helmet } from 'react-helmet-async';

interface NowPageProps {
  defaultNote?: string;
}

export function NowPage({ defaultNote }: NowPageProps) {
  const navigate = useNavigate();
  const { noteId } = useParams();
  
  // Initialize with false and update in useEffect to avoid SSR issues
  const [isMobile, setIsMobile] = useState(false);
  const [selectedNote, setSelectedNote] = useState(noteId || defaultNote || notes[0].id);
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
      // On mobile with no specific note ID, show the navigation view
      setSelectedNote('');
    } else if (noteId) {
      // If a specific note ID is provided in the URL, select it
      setSelectedNote(noteId);
    } else if (defaultNote && !noteId) {
      // On desktop with no specific note ID, use the default note
      setSelectedNote(defaultNote);
    }
  }, [noteId, defaultNote, isMobile]);
  
  // Reset scroll position when switching views
  useEffect(() => {
    // Use setTimeout to ensure the DOM has updated before scrolling
    const timer = setTimeout(() => {
      if (selectedNote) {
        // Reset scroll position for content view
        window.scrollTo(0, 0);
        if (contentViewRef.current) {
          contentViewRef.current.scrollTop = 0;
        }
      } else {
        // Reset scroll position for notes list view
        window.scrollTo(0, 0);
        if (notesListRef.current) {
          notesListRef.current.scrollTop = 0;
        }
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
  
  // Additional effect specifically for content view scroll reset
  useEffect(() => {
    if (selectedNote && contentViewRef.current) {
      // Reset content view scroll position whenever the selected note changes
      contentViewRef.current.scrollTop = 0;
      
      // Double-check after a short delay to ensure it's really at the top
      const timer = setTimeout(() => {
        if (contentViewRef.current) {
          contentViewRef.current.scrollTop = 0;
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
    return undefined; // Explicit return for when the if condition is not met
  }, [selectedNote, selectedNoteContent]);

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
    
    // Special case for mar172025 note
    if (id === 'mar172025') {
      navigate('/now');
    } else {
      navigate(`/${id}`);
    }
    
    // Force scroll to top immediately when selecting a note
    window.scrollTo(0, 0);
    if (contentViewRef.current) {
      contentViewRef.current.scrollTop = 0;
    }
  };

  // Split notes into pinned and unpinned
  const { pinnedNotes, olderNotes } = useMemo(() => {
    return {
      pinnedNotes: filteredNotes.filter(note => note.isPinned),
      olderNotes: filteredNotes.filter(note => !note.isPinned)
    };
  }, [filteredNotes]);

  // Generate SEO description from note content
  const seoDescription = useMemo(() => {
    if (!selectedNoteContent) return '';
    
    // Use the first 150 characters of the content for the description
    const cleanContent = selectedNoteContent.content
      .replace(/[#*_]/g, '') // Remove markdown symbols
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();
      
    return cleanContent.length > 150 
      ? cleanContent.substring(0, 147) + '...' 
      : cleanContent;
  }, [selectedNoteContent]);
  
  // Generate structured data for the current note
  const structuredData = useMemo(() => {
    if (!selectedNoteContent) return null;
    
    // Format date for schema.org
    const datePublished = new Date(selectedNoteContent.date).toISOString();
    
    // Create schema.org Article data
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": selectedNoteContent.title,
      "description": seoDescription,
      "author": {
        "@type": "Person",
        "name": "Helen Huang",
        "url": "https://helenhuang.io"
      },
      "datePublished": datePublished,
      "dateModified": datePublished,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://helenhuang.io/${selectedNoteContent.id === 'mar172025' ? 'now' : selectedNoteContent.id}`
      }
    };
  }, [selectedNoteContent, seoDescription]);

  // Mobile layout with fixed header and footer
  if (isMobile) {
    return (
      <>
        {selectedNoteContent && (
          <Helmet>
            <title>{selectedNoteContent.title} | Helen Huang</title>
            <meta name="description" content={seoDescription} />
            <meta property="og:title" content={`${selectedNoteContent.title} | Helen Huang`} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:url" content={`https://helenhuang.io/${selectedNoteContent.id === 'mar172025' ? 'now' : selectedNoteContent.id}`} />
            <meta name="twitter:title" content={`${selectedNoteContent.title} | Helen Huang`} />
            <meta name="twitter:description" content={seoDescription} />
            <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
          </Helmet>
        )}
        
        {/* Notes List View */}
        <div className={selectedNote ? 'hidden' : 'h-screen bg-white'}>
          {/* Fixed Header - With window controls - Always persistent */}
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

          {/* Notes List Content - Scrollable - Add padding-top to account for fixed header */}
          <div 
            ref={notesListRef}
            className="absolute inset-0 overflow-y-auto" 
            style={{ paddingTop: "48px" }}
          >
            {/* Search Bar - Not part of persistent header, with distinct styling - Removed border */}
            <div className="px-4 py-3 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-[#969696]" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f7f7f7] rounded-md text-sm placeholder-[#969696] focus:outline-none focus:ring-1 focus:ring-[#e4e4e4] shadow-sm"
                />
              </div>
            </div>

            <div className="px-4 pb-24">
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
        </div>

        {/* Note Detail View */}
        {selectedNoteContent && (
          <div className={!selectedNote ? 'hidden' : 'h-screen bg-white'}>
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
            
            {/* Content - Scrollable */}
            <div 
              ref={contentViewRef}
              className="absolute inset-0 overflow-y-auto"
              style={{ paddingTop: "48px" }}
              onLoad={() => {
                // Reset scroll position when content loads
                if (contentViewRef.current) {
                  contentViewRef.current.scrollTop = 0;
                }
              }}
            >
              <div className="w-full px-8 py-6 pb-24">
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
      </>
    );
  }

  // Desktop layout (unchanged)
  return (
    <>
      {selectedNoteContent && (
        <Helmet>
          <title>{selectedNoteContent.title} | Helen Huang</title>
          <meta name="description" content={seoDescription} />
          <meta property="og:title" content={`${selectedNoteContent.title} | Helen Huang`} />
          <meta property="og:description" content={seoDescription} />
          <meta property="og:url" content={`https://helenhuang.io/${selectedNoteContent.id === 'mar172025' ? 'now' : selectedNoteContent.id}`} />
          <meta name="twitter:title" content={`${selectedNoteContent.title} | Helen Huang`} />
          <meta name="twitter:description" content={seoDescription} />
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>
      )}
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
    </>
  );
} 