export type ContentBlock = {
  type: 'header' | 'paragraph' | 'bullets';
  title?: string;  // For headers
  content: string[];  // Array of paragraphs or bullet points
}

export interface NowUpdate {
  id: string;
  title: string;
  date: string;
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
        id: '2025-02-18',
        title: '🌱 now',
        date: '2025-02-18',
        preview: 'After a pretty rough last half year...',
        content: {
          blocks: [
            {
              type: 'paragraph',
              content: [
                "After a pretty rough last half year, I\'ve been feeling my energy and enthusiasm coming back recently! So I've been spending these past few weeks finally completing some of my personal projects.",
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
                '“Happiness is when what you think, what you say, and what you do are in harmony.”',
              ]
            }
          ],
          images: [
            {
              src: '/images/sample-workspace.jpg',
              alt: 'My current workspace setup',
              caption: 'Current workspace setup with natural lighting'
            }
          ]
        }
      },
    {
    id: 'bingo',
    title: '📇 h1 bingo card',    
    date: '2024-01-16',
    preview: 'In January, I led a workshop...',
    content: {
      blocks: [
        {
            type: 'paragraph',
            content: [
                'In January, I led a workshop where we made bingo cards (rather than new years resolutions). This is what\'s on mine, all the things I want to complete (or at least get started on) in in this first half of 2025.'
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
            'message ness labs person',
            'try pottery',
            'get a new phone',
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
      images: [
        {
          src: '/images/garden-sketch.jpg',
          alt: 'Digital garden sketch',
          caption: 'Early sketches of the digital garden concept'
        }
      ]
    }
  },
  {
    id: 'what',
    title: '🥚 what is this?',
    date: '2024-02-17',
    preview: 'A brief explanation of this page',
    content: {
      blocks: [
        {
          type: 'paragraph',
          content: [
            "This is just one part of my personal website. But why are there so many different pieces and contrasting styles? Well, if you know me at all, you'll know I love variety and anything whimsical. So now you're forced to join me.",
            "These pages you're currently reading, these are mainly my /now pages, inspired by Derek Sivers and the [/now movement](https://nownownow.com/about). It's essentially a spot to showcase what I'm up to these days.", 
            "The UI is heavily inspired by [Alana Goyal's](https://www.alanagoyal.com/notes/about-me) personal website which I found super cool.", 
            "All the code here was written by AI (blend of o1, claude, cursor, v0)! Wild right?"
          ]
        },
        {
          type: 'header',
          title: 'How it works',
          content: [
            'Updates happen ever so often',
            'Old entries are preserved for historical context from here on out',
            'Content reflects my current focus and thoughts'
          ]
        }
      ]
    }
  }
] 