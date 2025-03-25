import React from 'react';
import BaggyLayout from '../../components/baggy/BaggyLayout';
import BaggyHero from '../../components/baggy/BaggyHero';
import BaggyFeaturedCollections from '../../components/baggy/BaggyFeaturedCollections';
import BaggyShowHighlights from '../../components/baggy/BaggyShowHighlights';
import BaggyMagazinePreview from '../../components/baggy/BaggyMagazinePreview';
import { stockImages, featuredCollectionImages, showHighlightImages, magazineData } from '../../data/baggyData';

const BaggyHomePage: React.FC = () => {
  return (
    <BaggyLayout>
      {/* Hero Section */}
      <BaggyHero
        imageSrc={stockImages.hero}
        title="BAGGY S/S 25"
        subtitle="WHERE LUXURY MEETS LANDFILL"
        buttonText="EXPLORE COLLECTIONS"
        buttonLink="/baggy/collections"
      />
      
      {/* Featured Collections Section */}
      <BaggyFeaturedCollections
        title="FEATURED COLLECTIONS"
        subtitle="Showcasing 'Upcycled Opulence' and 'Bag to Basics' - two contrasting approaches to trash bag couture."
        images={featuredCollectionImages}
        buttonText="VIEW COLLECTIONS"
        buttonLink="/baggy/collections"
      />
      
      {/* Show Highlights Section */}
      <BaggyShowHighlights
        title="EVENT HIGHLIGHTS"
        subtitle="Experience the visual journey of our exclusive one-night-only BAGGY runway show. Swipe through our standout moments that defined the future of sustainable fashion."
        images={showHighlightImages}
        buttonText="VIEW FULL SHOW"
        buttonLink="/baggy/show"
      />
      
      {/* Magazine Preview Section */}
      <BaggyMagazinePreview
        title={magazineData.title}
        subtitle={magazineData.description}
        coverImage={magazineData.coverImage}
        buttonText="VIEW MAGAZINE"
        buttonLink="/baggy/magazine"
      />
    </BaggyLayout>
  );
};

export default BaggyHomePage; 