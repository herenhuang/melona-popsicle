import { Note } from './types';
import { getNotesByCategory } from '../utils/contentLoader';

export const journalNotes: Note[] = getNotesByCategory('journal');