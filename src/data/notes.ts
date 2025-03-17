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
    .replace(/\n{2,}/g, '\n') // Replace multiple newlines with single newline
    .trim();

  // Get first non-empty line or paragraph
  const lines = cleanContent.split('\n');
  const firstNonEmptyLine = lines.find(line => line.trim().length > 0);
  
  return firstNonEmptyLine || '';
}

export const notes: Note[] = [
  // Pinned notes (in order of pinnedOrder)
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
    id: 'about_me',
    title: '🤠 about me',
    date: '2025-03-17T00:25:00Z',
    content: `howdy, I'm Helen Huang.

# currently
- on a sabbatical (length: tbd)

# previous work work 
- cofounder @ co.lab — creating immersive, real-world tech learning programs for busy professionals
- program + product @ microsoft — worked on edge devrel & azure devops, focusing on dev advocacy and product iteration
- product manager intern @ zynga — contributed to wordstreak with friends (300k dau), spearheaded app revamp from 1 to 4 stars in four months
- interned @ cibc & scotiabank — business analyst roles back in university days

# education
- b.sc in science and business (earth sci specialization) @ university of waterloo

check out my [projects](www.helenhuang.io/now/projects) for more info ~ `,
    isPinned: true,
    pinnedOrder: 2
  },
  {
    id: 'links',
    title: '🔗 links',
    date: '2025-03-17T01:24:00Z',
    content: `feel free to reach out! if i don't respond right away, definitely follow up again - it's me, not you. :(
- email: [chat@heyohelen.io](mailto:chat@heyohelen.io)
- linkedin: [linkedin.com/in/heyohelen](https://www.linkedin.com/in/heyohelen)
- twitter: [x.com/heyohelen](https://x.com/heyohelen)
- instagram: [instagram.com/heyohelen](https://www.instagram.com/heyohelen)`,
    isPinned: true,
    pinnedOrder: 3  
  },
  {
    id: 'projects',
    title: '📙 projects',
    date: '2025-03-17T00:25:00Z',
    content: `i love building things (even if they're not perfect). ill upload pics soon. :) 

- baggy: a trash bag fashion show (pics coming)
- co.lab learning: a group-driven, blended learning environment with 30k+ hours of collaboration
- how to product: e-book, #1 product of the day, sharing product management insights
- solana portraits: nft art commissions for digital collectible enthusiasts
- you belong in tech: career-switch stories and resources to inspire folks entering tech`,
    isPinned: true,
    pinnedOrder: 4
  },
  {
    id: 'recognition',
    title: '🎖️ recognition and stuff',
    date: '2025-03-17T01:24:00Z',
    content: `some stuff i've been recognized for recently ~ ill connect the links soon. 

- dmz women of the year: recognized for contributions to tech education
- glory 30x30 honoree: named one of canada's standout young entrepreneurs
- forbes 30 under 30: honored for co.lab's impact
- waterloo innovation summit: spoke on flipped classrooms & peer-led learning
- dmz: discussed founder-led sales strategies & marketing funnels
- founder institute: insights on community-driven growth & product-led strategies`,
    isPinned: true,
    pinnedOrder: 5
  },
  {
    id: 'reminders',
    title: '🌸 reminders',
    date: '2025-03-17T01:24:00Z',
    content: `
- Happiness is when what you think, what you say, and what you do are in harmony.
- What if the sky isn't the limit?
- All of the time spent on worrying about things can probably be better used in other ways.`,
    isPinned: true,
    pinnedOrder: 6
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

- host a fake fashion show for my fake trash bag brand for my real birthday (completed March 2nd, 2025)`,
    isPinned: true,
    pinnedOrder: 7
  },
  
  // Non-pinned notes (in descending date order)
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
- prove to myself that I have discipline and focus`,
    isPinned: false
  },
  {
    id: 'whatdis',
    title: '🐓 what is this?',
    date: '2025-02-16T21:01:00Z',
    content: `This is just one part of my personal website. But why are there so many different pieces and contrasting styles? Well, if you know me at all, you'll know I love variety and anything whimsical. So now you're forced to join me.

These pages you're currently reading, these are mainly my /now pages, inspired by Derek Sivers and the [/now movement](https://nownownow.com/about). It's essentially a spot to showcase what I'm up to these days, while keeping historical context on /nows past.

The UI is heavily inspired by [Alana Goyal's](https://www.alanagoyal.com/notes/about-me) personal website which I found super cool.

All the code here was written by AI (blend of o1, claude, cursor, v0)! Wild right?`,
    isPinned: false
  }
]; 