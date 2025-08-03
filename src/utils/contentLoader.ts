import { Note } from '../data/types';
// @ts-ignore - This is a virtual module populated by Vite plugin
import { contentMap } from 'virtual:content';

// Convert parsed content to Note format
export function parsedContentToNote(file: { data: any; content: string }): Note {
  return {
    id: file.data.id,
    title: file.data.title,
    date: file.data.date,
    content: file.content,
    isPinned: file.data.isPinned || false,
    pinnedOrder: file.data.pinnedOrder
  };
}

// Get all notes from a category
export function getNotesByCategory(category: 'pages' | 'journal' | 'now'): Note[] {
  return Object.entries(contentMap)
    .filter(([path]) => path.startsWith(`content/${category}/`))
    .map(([_, file]) => parsedContentToNote(file))
    .sort((a, b) => {
      // Sort pinned items first, then by pinnedOrder, then by date
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      if (a.isPinned && b.isPinned && a.pinnedOrder !== undefined && b.pinnedOrder !== undefined) {
        return a.pinnedOrder - b.pinnedOrder;
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

// Get a specific note by id
export function getNoteById(id: string): Note | undefined {
  const entry = Object.entries(contentMap).find(([_, file]) => {
    return file.data.id === id;
  });
  
  if (!entry) return undefined;
  return parsedContentToNote(entry[1]);
}