import { Note } from './types';
import { getNotesByCategory } from '../utils/contentLoader';

// Get all now notes and pick the latest one
const allNowNotes = getNotesByCategory('now');
export const nowNote: Note = allNowNotes[0] || {
  id: 'placeholder',
  title: 'No Now Page',
  date: new Date().toISOString(),
  content: 'No now page found.',
  isPinned: false
};