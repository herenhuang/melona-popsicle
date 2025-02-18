export interface NowUpdate {
  id: string;
  title: string;
  date: string;
  preview: string;
  content: {
    currently: string[];
    previously: string[];
    images?: {
      src: string;
      alt: string;
      caption?: string;
    }[];
  };
}

export const nowUpdates: NowUpdate[] = [
  {
    id: 'july2024',
    title: 'July 2024',
    date: '2024-01-16',
    preview: 'Currently building in public...',
    content: {
      currently: [
        'building in public',
        'exploring new projects and opportunities',
        'reading "Middlemarch" by George Eliot'
      ],
      previously: [
        'shipped some fun projects',
        'learned a lot about building in public',
        'made some great connections'
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
    title: 'Todo & Ideas',
    date: '2024-01-16',
    preview: '☐ Write blog post about garden...',
    content: {
      currently: [
        '☐ Write blog post about garden metaphors in digital spaces',
        '☐ Add dark mode toggle',
        '☑ Implement Apple Notes style UI for /now page',
        '☐ Create a proper RSS feed',
        '☐ Document the process of building this site',
        '☐ Write about the intersection of gardening and coding',
        '☐ Share thoughts on digital gardens vs traditional blogs'
      ],
      previously: [],
      images: [
        {
          src: '/images/garden-sketch.jpg',
          alt: 'Digital garden sketch',
          caption: 'Early sketches of the digital garden concept'
        }
      ]
    }
  }
] 