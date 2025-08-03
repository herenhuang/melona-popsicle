export interface Note {
  id: string;           // Custom (bingo) or date-based (feb182025)
  title: string;        // Note title
  date: string;         // ISO date string
  content: string;      // Markdown content
  isPinned?: boolean;   // Whether note is pinned
  pinnedOrder?: number; // 1 = top, only for pinned notes
}