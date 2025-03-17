export type ContentBlock = {
  type: 'header' | 'paragraph' | 'bullets';
  title?: string;  // For headers
  content: string[];  // Array of paragraphs or bullet points
}

export interface NowUpdate {
  id: string;
  title: string;
  date: string;
  formattedDate: string;
  preview: string;
  content: {
    blocks: ContentBlock[];
    images?: {
      src: string;
      alt: string;
      caption?: string;
    }[];
  };
}

export const nowUpdates: NowUpdate[] = [
    {
        id: '2025-03-17',
        title: '🌱 now',
        date: '2025-03-17',
        formattedDate: 'March 17, 2025 at 12:25 AM',
        preview: 'Spent way too long trying to do-redo...',
        content: {
          blocks: [
            {
              type: 'paragraph',
              content: [
                "Spent way too long trying to do-redo-erase-revert-build this website... it's pretty late now LOL.",
                "Main update from last time which really was just about a month ago literally, is that I'm thinking about actually starting the job search with teh goal of moving to NYC. Also been really into looking at ethical breeders for british short hairs..."
              ]
            }
          ],
          images: []
        }
    },
    {
    id: 'bingo',
    title: '📇 bingo card',    
    date: '2025-01-25',
    formattedDate: 'January 24, 2025 at 1:24 PM',
    preview: 'In January, I led a work...',
    content: {
      blocks: [
        {
            type: 'paragraph',
            content: [
                'In January, I led a workshop where we made bingo cards (rather than your usual new years resolutions). This is what\'s on mine, it represents all the things I want to complete (or at least get started on) in in this first half of 2025.'
            ]
        },
        {
          type: 'header',
          title: 'not yet started',
          content: [
            'write a creative workbook',
            'complete a chinese course',
            'move to NY',
            'do an essay on why i stopped doing my nails and lashes',
            'try pottery',
            'take pictures of all my clothes',
            'set up trading view for my stocks and rebalance them'
          ]
        },
        {
          type: 'header',
          title: 'in progress',
          content: [
            'finish this website',
            'restart my blog',
            'finish AI coding course',
            'finish dance classes',
            'get a drivers license',
            'host a fake fashion show for my fake trash bag brand for my real birthday'
          ]
        },
        {
          type: 'header',
          title: 'completed',
          content: [
            'get this page up and share it'
          ]
        }
      ],
    }
  },
  {
    id: 'what',
    title: '🐓 what is this?',
    date: '2025-02-16',
    formattedDate: 'February 16, 2025 at 9:01 PM',
    preview: 'This is just one part of my...',
    content: {
      blocks: [
        {
          type: 'paragraph',
          content: [
            "This is just one part of my personal website. But why are there so many different pieces and contrasting styles? Well, if you know me at all, you'll know I love variety and anything whimsical. So now you're forced to join me.",
            "These pages you're currently reading, these are mainly my /now pages, inspired by Derek Sivers and the [/now movement](https://nownownow.com/about). It's essentially a spot to showcase what I'm up to these days, while keeping historical context on /nows past.", 
            "The UI is heavily inspired by [Alana Goyal's](https://www.alanagoyal.com/notes/about-me) personal website which I found super cool.", 
            "All the code here was written by AI (blend of o1, claude, cursor, v0)! Wild right?"
          ]
        }
      ]
    }
  },
  {
    id: '2025-02-18',
    title: '❄️ feb update',
    date: '2025-02-18',
    formattedDate: 'February 18, 2025 at 3:14 PM',
    preview: 'After a pretty rough last half...',
    content: {
      blocks: [
        {
          type: 'paragraph',
          content: [
            "After a pretty rough last half year, I've been feeling my energy and enthusiasm coming back recently! So I've been spending these past few weeks finally completing some of my personal projects.",
            "Currently still residing in Toronto, though the plan is to move to NYC by the middle of the year. And maybe get a cute little british shorthair (or two!).",
            "Moving to another country would require a visa, which opens up a whole new can of worms on decision-making and future-planning. For someone that hasn't really been thinking of plans beyond the next year, that's absolutely a shift in mindset that I'll need to tackle.",
            "For now though... I'm going to continue focusing on my nearterm goals below and see where that gets me (especially as I continue to get back to - and rediscover - my baseline)." 
          ]
        },
        {
          type: 'header',
          title: 'current goals',
          content: [
            'spend now - September working on interesting projects that don\'t need to have a ROI',
            'prove to myself that I have discipline and focus',
          ]
        },
        {
          type: 'header',
          title: 'reminder to self',
          content: [
            '"Happiness is when what you think, what you say, and what you do are in harmony."',
          ]
        }
      ],
      images: []
    }
  }
] 