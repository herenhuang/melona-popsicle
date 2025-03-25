import React from 'react';
import BaggyLayout from '../../components/baggy/BaggyLayout';
import BaggySection from '../../components/baggy/BaggySection';
import BaggyGallery from '../../components/baggy/BaggyGallery';
import { collections } from '../../data/baggyData';

const BaggyCollectionsPage: React.FC = () => {
  return (
    <BaggyLayout>
      {/* Upcycled Opulence Collection */}
      <BaggySection 
        title={collections.upcycledOpulence.name}
        subtitle={collections.upcycledOpulence.description}
        bgColor="bg-white"
        textColor="text-black"
      >
        <BaggyGallery 
          images={collections.upcycledOpulence.images} 
          columns={3}
          gap={16}
        />
      </BaggySection>
      
      {/* Bag to Basics Collection */}
      <BaggySection 
        title={collections.bagToBasics.name}
        subtitle={collections.bagToBasics.description}
        bgColor="bg-black"
        textColor="text-white"
      >
        <BaggyGallery 
          images={collections.bagToBasics.images}
          columns={3}
          gap={16}
        />
      </BaggySection>
      
      {/* Credits */}
      <BaggySection 
        title="CREDITS"
        bgColor="bg-white"
        textColor="text-black"
        padding="py-12"
      >
        <div className="max-w-2xl mx-auto">
          <p className="mb-2"><strong>Photography:</strong> Jane Smith, John Doe</p>
          <p className="mb-2"><strong>Models:</strong> Various</p>
          <p className="mb-2"><strong>Styling:</strong> Helen Huang</p>
          <p className="mb-2"><strong>Hair & Makeup:</strong> Team BAGGY</p>
        </div>
      </BaggySection>
    </BaggyLayout>
  );
};

export default BaggyCollectionsPage; 