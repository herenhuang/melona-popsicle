import { BaggyPhoto } from './baggyPhotoTypes';

// Sample mock data for the BAGGY photo gallery
export const sampleBaggyPhotos: BaggyPhoto[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY F/W 2025 Runway Look 1',
    collection: 'Waste Couture',
    credits: {
      photographer: 'Alice Chen',
      agency: 'Mode Visuals',
      models: ['Jamie Smith'],
      stylist: 'Marco Vanzini',
      makeup: 'Cleo Williams',
      hair: 'Patrick Mosse',
      location: 'Trash Palace Gallery, New York'
    },
    metadata: {
      date: '2025-03-01',
      tags: ['runway', 'look1', 'wastecouture', 'sustainable'],
      featured: true
    }
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY F/W 2025 Runway Look 2',
    collection: 'Waste Couture',
    credits: {
      photographer: 'Alice Chen',
      agency: 'Mode Visuals',
      models: ['Tasha Jones'],
      stylist: 'Marco Vanzini',
      makeup: 'Cleo Williams',
      hair: 'Patrick Mosse',
      location: 'Trash Palace Gallery, New York'
    },
    metadata: {
      date: '2025-03-01',
      tags: ['runway', 'look2', 'wastecouture', 'plastic'],
      featured: true
    }
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY F/W 2025 Runway Look 3',
    collection: 'Landfill Luxury',
    credits: {
      photographer: 'Alice Chen',
      agency: 'Mode Visuals',
      models: ['Alex Rivera'],
      stylist: 'Marco Vanzini',
      makeup: 'Cleo Williams',
      hair: 'Patrick Mosse',
      location: 'Trash Palace Gallery, New York'
    },
    metadata: {
      date: '2025-03-01',
      tags: ['runway', 'look3', 'landfillluxury', 'recycled'],
      featured: false
    }
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY F/W 2025 Runway Look 4',
    collection: 'Landfill Luxury',
    credits: {
      photographer: 'Alice Chen',
      agency: 'Mode Visuals',
      models: ['Devon Lee'],
      stylist: 'Marco Vanzini',
      makeup: 'Cleo Williams',
      hair: 'Patrick Mosse',
      location: 'Trash Palace Gallery, New York'
    },
    metadata: {
      date: '2025-03-01',
      tags: ['runway', 'look4', 'landfillluxury', 'upcycled'],
      featured: false
    }
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY Backstage Preparation',
    collection: 'Backstage',
    credits: {
      photographer: 'Julian Romano',
      agency: 'Backstage Media',
      models: ['Jamie Smith', 'Tasha Jones', 'Alex Rivera'],
      stylist: 'Marco Vanzini',
      makeup: 'Cleo Williams',
      hair: 'Patrick Mosse',
      location: 'Trash Palace Gallery, New York'
    },
    metadata: {
      date: '2025-03-01',
      tags: ['backstage', 'preparation', 'behindthescenes'],
      featured: true
    }
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY Designer at Work',
    collection: 'Backstage',
    credits: {
      photographer: 'Julian Romano',
      agency: 'Backstage Media',
      models: [],
      stylist: 'Marco Vanzini',
      makeup: '',
      hair: '',
      location: 'Design Studio, Brooklyn'
    },
    metadata: {
      date: '2025-02-15',
      tags: ['designer', 'creative', 'studio', 'process'],
      featured: true
    }
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY Campaign Shoot',
    collection: 'Campaign',
    credits: {
      photographer: 'Sofia Mazzini',
      agency: 'High Contrast Studios',
      models: ['Eliza Chen'],
      stylist: 'Marco Vanzini',
      makeup: 'Cleo Williams',
      hair: 'Patrick Mosse',
      location: 'Landfill Site, New Jersey'
    },
    metadata: {
      date: '2025-01-20',
      tags: ['campaign', 'editorial', 'wastecouture'],
      featured: true
    }
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY Editorial 1',
    collection: 'Campaign',
    credits: {
      photographer: 'Sofia Mazzini',
      agency: 'High Contrast Studios',
      models: ['Tyler Jackson'],
      stylist: 'Marco Vanzini',
      makeup: 'Cleo Williams',
      hair: 'Patrick Mosse',
      location: 'Recycling Center, Queens'
    },
    metadata: {
      date: '2025-01-21',
      tags: ['campaign', 'editorial', 'landfillluxury'],
      featured: true
    }
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY Editorial 2',
    collection: 'Campaign',
    credits: {
      photographer: 'Sofia Mazzini',
      agency: 'High Contrast Studios',
      models: ['Naomi Wu'],
      stylist: 'Marco Vanzini',
      makeup: 'Cleo Williams',
      hair: 'Patrick Mosse',
      location: 'Trash Palace Gallery, New York'
    },
    metadata: {
      date: '2025-01-22',
      tags: ['campaign', 'editorial', 'wastecouture'],
      featured: false
    }
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',
    title: 'BAGGY Atelier Process',
    collection: 'Behind the Scenes',
    credits: {
      photographer: 'Julian Romano',
      agency: 'Backstage Media',
      models: [],
      stylist: '',
      makeup: '',
      hair: '',
      location: 'BAGGY Atelier, Brooklyn'
    },
    metadata: {
      date: '2025-02-10',
      tags: ['process', 'craftsmanship', 'atelier', 'behindthescenes'],
      featured: false
    }
  }
];

// Change to named export only - no default export
// export default sampleBaggyPhotos; 