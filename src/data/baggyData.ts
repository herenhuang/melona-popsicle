import { GalleryImage } from '../components/baggy/BaggyGallery';

// Define the structure for collection data
interface CollectionData {
  name: string;
  description: string;
  images: GalleryImage[];
}

// Define the structure for timeline events
interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  images?: GalleryImage[];
}

// Stock images from Unsplash with direct URLs
export const stockImages = {
  // Hero images
  hero: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3',
  
  // Collection images: "Upcycled Opulence"
  upcycledOpulence: [
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3',
  ],
  
  // Collection images: "Bag to Basics"
  bagToBasics: [
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1566206091558-7f218b696e83?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?ixlib=rb-4.0.3',
  ],
  
  // Show images
  show: [
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3',
  ],
  
  // Afterparty images
  afterparty: [
    'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3',
  ],
  
  // Magazine
  magazineCover: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3',
  magazinePdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  magazineVideo: 'https://example.com/non-existent-video.mp4',
  
  // About
  designer: 'https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?ixlib=rb-4.0.3',
};

// Collection data
export const collections: Record<string, CollectionData> = {
  upcycledOpulence: {
    name: 'Upcycled Opulence',
    description: 'Transforming everyday trash bags into extravagant high-fashion statements. This collection embraces excess and embellishment, turning disposable into desirable.',
    images: stockImages.upcycledOpulence.map((src, index) => ({
      src,
      alt: `Upcycled Opulence Collection - Look ${index + 1}`,
      aspectRatio: 'portrait',
      credits: {
        model: `Model ${index + 1}`,
        photographer: 'Jane Smith',
      },
    })),
  },
  bagToBasics: {
    name: 'Bag to Basics',
    description: 'A minimalist approach to trash bag couture. Clean lines and structured silhouettes that challenge perceptions of waste and luxury with understated elegance.',
    images: stockImages.bagToBasics.map((src, index) => ({
      src,
      alt: `Bag to Basics Collection - Look ${index + 1}`,
      aspectRatio: 'portrait',
      credits: {
        model: `Model ${index + 1}`,
        photographer: 'John Doe',
      },
    })),
  },
};

// Featured collection images for homepage
export const featuredCollectionImages: GalleryImage[] = [
  ...collections.upcycledOpulence.images.slice(0, 2),
  ...collections.bagToBasics.images.slice(0, 2),
];

// Show highlight images for homepage
export const showHighlightImages: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3',
    alt: 'Avant-Garde Silhouette',
    aspectRatio: 'portrait',
    credits: {
      photographer: 'Alex Johnson',
      model: 'Taylor Swift',
      stylist: 'Helen Huang'
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3',
    alt: 'Street Ready Collection',
    aspectRatio: 'square',
    credits: {
      photographer: 'Alex Johnson',
      model: 'Jordan Chen',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3',
    alt: 'Couture Statement Pieces',
    aspectRatio: 'square',
    credits: {
      photographer: 'Alex Johnson',
      model: 'Maya Rodriguez',
    },
  },
  {
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3',
    alt: 'Runway Closing Look',
    aspectRatio: 'portrait',
    credits: {
      photographer: 'Alex Johnson',
      model: 'Alex Morgan',
    },
  }
];

// Show timeline events
export const showTimelineEvents: TimelineEvent[] = [
  {
    time: '7:00 PM',
    title: 'Doors Open',
    description: 'Guests arrive at Trash Palace Gallery for the exclusive BAGGY S/S 25 showcase, greeted with sustainable refreshments and recycled gift bags.',
    images: stockImages.show.slice(0, 2).map((src, index) => ({
      src,
      alt: `Doors Open - ${index + 1}`,
      credits: {
        photographer: 'Alex Johnson',
      },
    })),
  },
  {
    time: '8:00 PM',
    title: 'Runway Show Begins',
    description: 'The lights dim and the music swells as models take to the catwalk in the first collection, "Upcycled Opulence."',
    images: stockImages.upcycledOpulence.slice(0, 2).map((src, index) => ({
      src,
      alt: `Runway Show - Upcycled Opulence ${index + 1}`,
      credits: {
        model: `Model ${index + 1}`,
        photographer: 'Jane Smith',
      },
    })),
  },
  {
    time: '8:30 PM',
    title: 'Second Collection',
    description: 'The "Bag to Basics" collection debuts, showcasing minimalist designs and sculptural silhouettes crafted from black trash bags.',
    images: stockImages.bagToBasics.slice(0, 2).map((src, index) => ({
      src,
      alt: `Runway Show - Bag to Basics ${index + 1}`,
      credits: {
        model: `Model ${index + 1}`,
        photographer: 'John Doe',
      },
    })),
  },
  {
    time: '9:00 PM',
    title: 'Designer Appearance',
    description: 'Helen Huang takes to the runway, wearing a custom BAGGY creation, to thunderous applause from the audience.',
    images: [
      {
        src: stockImages.designer,
        alt: 'Designer Appearance',
        credits: {
          photographer: 'Alex Johnson',
        },
      },
    ],
  },
  {
    time: '9:15 PM',
    title: 'Afterparty Begins',
    description: 'DJ Ash Twin takes over the decks as the space transforms into an exclusive afterparty celebrating sustainable fashion.',
    images: stockImages.afterparty.slice(0, 2).map((src, index) => ({
      src,
      alt: `Afterparty - ${index + 1}`,
      credits: {
        photographer: 'Alex Johnson',
      },
    })),
  },
];

// Magazine data
export const magazineData = {
  title: 'BAGGY: THE MAGAZINE',
  description: 'A satirical take on high-fashion publications, documenting the creative process, photoshoots, and interviews from the BAGGY project.',
  coverImage: stockImages.magazineCover,
  pdfUrl: stockImages.magazinePdf,
  videoUrl: stockImages.magazineVideo,
};

// About page content
export const aboutContent = {
  title: 'ABOUT BAGGY',
  conceptDescription: `
    BAGGY is a satirical fashion project that challenges the conventions of luxury and sustainability in the fashion industry. By transforming everyday trash bags into couture garments, BAGGY questions our relationship with disposable materials and the arbitrary nature of what we consider "valuable" in fashion.
    
    The project culminated in a one-night fashion show event on March 1, 2025, featuring two distinct collections: "Upcycled Opulence" and "Bag to Basics." The show was complemented by a limited-edition magazine documenting the creative process.
  `,
  visionDescription: `
    The creative vision behind BAGGY was to create a high-fashion parody that looks and feels like luxury fashion while using the most mundane and disposable materials possible. The black and white aesthetic references classic fashion photography, while the materials themselves create a striking visual and conceptual juxtaposition.
    
    BAGGY is meant to be humorous and provocative, but also beautiful in its execution—proving that creativity and concept can transform even the most humble materials into something worthy of admiration.
  `,
  designerImage: stockImages.designer,
  designerName: 'Helen Huang',
  designerBio: 'Creator and designer of BAGGY, Helen Huang developed this concept as an exploration of fashion as communication, parody as critique, and sustainability as necessity.',
  credits: [
    { role: 'Concept & Design', name: 'Helen Huang' },
    { role: 'Photography', name: 'Jane Smith & John Doe' },
    { role: 'Models', name: 'Various Volunteers' },
    { role: 'DJ', name: 'Ash Twin' },
    { role: 'Venue', name: 'Trash Palace Gallery' },
  ],
}; 