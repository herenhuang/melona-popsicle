export interface Note {
  id: string;           // Custom (bingo) or date-based (feb182025)
  title: string;        // Note title
  date: string;         // ISO date string
  content: string;      // Markdown content
  isPinned?: boolean;   // Whether note is pinned
  pinnedOrder?: number; // 1 = top, only for pinned notes
}

export function generatePreview(content: string): string {
  if (!content) return '';
  
  // Remove empty lines at start and end
  const trimmedContent = content.trim();
  
  // Remove markdown headers, list markers, and multiple newlines
  const cleanContent = trimmedContent
    .replace(/^#.*$/gm, '') // Remove headers
    .replace(/^[-*+]\s+/gm, '') // Remove list markers but keep the text
    .replace(/\n{2,}/g, ' ') // Replace multiple newlines with space
    .replace(/\n/g, ' ')    // Replace all remaining newlines with spaces
    .trim();

  // Get the first 100 characters for preview
  return cleanContent.length > 100 
    ? cleanContent.substring(0, 100) + '...'
    : cleanContent;
}

export const nowNote: Note = {
  id: 'june92025',
  title: '🌱 now (read me!)',
  date: '2025-06-09T14:41:00Z',
  content: `made it to NYC!! but deciding to just enjoy the hot builder summer and push back job searching for now. maybe i build conviction in something else instead? 

# randon things that have happened since last update / goals right now
- interviewed for a16z speedrun with a friend (didn't get accepted this time, but it was fun!)
- making a reddit game 
- participating in the bolt hackathon

![i attended ny tech week and all i got was this ny cookie](/images/nyccookiewoo_compressed.jpeg)


*BTW, this is my /now page, inspired by Derek Sivers and the [/now movement](https://nownownow.com/about). It's essentially a spot to showcase what I'm exactly up to these days. I'm keeping my old /now pages though, you can see them below.*
`,
  isPinned: true,
  pinnedOrder: 4
}; 