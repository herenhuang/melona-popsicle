export interface Note {
  id: string;           // Custom (bingo) or date-based (feb182025)
  title: string;        // Note title
  date: string;         // ISO date string
  content: string;      // Markdown content
  isPinned?: boolean;   // Whether note is pinned
  pinnedOrder?: number; // 1 = top, only for pinned notes
}

export const notes: Note[] = [
  {
    id: 'mar172025',
    title: '🌱 now',
    date: '2025-03-17T00:25:00Z',
    content: `Spent way too long trying to do-redo-erase-revert-build this website... it's pretty late now LOL.

Main update from last time which really was just about a month ago literally, is that I'm thinking about actually starting the job search with teh goal of moving to NYC. Also been really into looking at ethical breeders for british short hairs...`,
    isPinned: true,
    pinnedOrder: 1
  },
  {
    id: 'feb182025',
    title: '❄️ feb update',
    date: '2025-02-18T15:14:00Z',
    content: `After a pretty rough last half year, I've been feeling my energy and enthusiasm coming back recently! So I've been spending these past few weeks finally completing some of my personal projects.

Currently still residing in Toronto, though the plan is to move to NYC by the middle of the year. And maybe get a cute little british shorthair (or two!).

Moving to another country would require a visa, which opens up a whole new can of worms on decision-making and future-planning. For someone that hasn't really been thinking of plans beyond the next year, that's absolutely a shift in mindset that I'll need to tackle.

For now though... I'm going to continue focusing on my nearterm goals below and see where that gets me (especially as I continue to get back to - and rediscover - my baseline).

# Current Goals
- spend now - September working on interesting projects that don't need to have a ROI
- prove to myself that I have discipline and focus

# Reminder to Self
"Happiness is when what you think, what you say, and what you do are in harmony."`,
    isPinned: false
  },
  {
    id: 'what',
    title: '🐓 what is this?',
    date: '2025-02-16T21:01:00Z',
    content: `This is just one part of my personal website. But why are there so many different pieces and contrasting styles? Well, if you know me at all, you'll know I love variety and anything whimsical. So now you're forced to join me.

These pages you're currently reading, these are mainly my /now pages, inspired by Derek Sivers and the [/now movement](https://nownownow.com/about). It's essentially a spot to showcase what I'm up to these days, while keeping historical context on /nows past.

The UI is heavily inspired by [Alana Goyal's](https://www.alanagoyal.com/notes/about-me) personal website which I found super cool.

All the code here was written by AI (blend of o1, claude, cursor, v0)! Wild right?`,
    isPinned: false
  },
  {
    id: 'bingo',
    title: '📇 bingo card',
    date: '2025-01-24T13:24:00Z',
    content: `In January, I led a workshop where we made bingo cards (rather than your usual new years resolutions). This is what's on mine, it represents all the things I want to complete (or at least get started on) in in this first half of 2025.

# Not Yet Started

- write a creative workbook
- complete a chinese course
- move to NY
- do an essay on why i stopped doing my nails and lashes
- try pottery
- take pictures of all my clothes
- set up trading view for my stocks and rebalance them

# In Progress

- finish this website
- restart my blog
- finish AI coding course
- finish dance classes
- get a drivers license
- host a fake fashion show for my fake trash bag brand for my real birthday

# Completed

- get this page up and share it`,
    isPinned: false
  }
]; 