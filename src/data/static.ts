import { Note } from './types';
import { getNotesByCategory } from '../utils/contentLoader';

export const staticNotes: Note[] = getNotesByCategory('pages');