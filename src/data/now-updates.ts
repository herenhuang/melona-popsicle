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
    id: 'todo',
    title: '📙 to-do list',    
    date: '2024-01-16',
    preview: '☐ Write blog post about garden...',
    content: {
      blocks: [
        {
          type: 'bullets',
          content: [
            '☐ Write blog post about garden metaphors in digital spaces',
            '☐ Add dark mode toggle',
            '☑ Implement Apple Notes style UI for /now page',
            '☐ Create a proper RSS feed',
            '☐ Document the process of building this site',
            '☐ Write about the intersection of gardening and coding',
            '☐ Share thoughts on digital gardens vs traditional blogs'
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
    id: 'nownownow',
    title: '⚙️ what is this?',
    date: '2024-02-18',
    preview: 'A brief explanation of this page',
    content: {
      blocks: [
        {
          type: 'paragraph',
          content: [
            "This is my /now page, inspired by Derek Sivers and the ",
            "Unlike a blog or social media, this page changes slowly and deliberately, reflecting my current priorities and interests."
          ]
        },
        {
          type: 'header',
          title: 'How it works',
          content: [
            'Updates happen every month or two',
            'Old entries are preserved for historical context',
            'Content reflects my current focus and thoughts'
          ]
        }
      ]
    }
  }
] 