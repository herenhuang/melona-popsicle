import { Note } from './types';
import { getNotesByCategory } from '../utils/contentLoader';

// Get all now notes sorted by date (newest first from contentLoader)
const allNowNotes = getNotesByCategory('now');

// The latest now note is the current one — auto-pin it
export const nowNote: Note = allNowNotes[0]
  ? { ...allNowNotes[0], isPinned: true, pinnedOrder: allNowNotes[0].pinnedOrder ?? 4 }
  : {
      id: 'placeholder',
      title: 'No Now Page',
      date: new Date().toISOString(),
      content: 'No now page found.',
      isPinned: false
    };

// Older now notes — automatically unpinned so they show in "Older Notes"
export const olderNowNotes: Note[] = allNowNotes.slice(1).map(note => ({
  ...note,
  isPinned: false,
  pinnedOrder: undefined
}));
