import React from 'react';
import BaggyLayout from '../../components/baggy/BaggyLayout';
import BaggySection from '../../components/baggy/BaggySection';
import { aboutContent } from '../../data/baggyData';

const BaggyAboutPage: React.FC = () => {
  return (
    <BaggyLayout>
      {/* About BAGGY Section */}
      <BaggySection
        title={aboutContent.title}
        bgColor="bg-black"
        textColor="text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Concept description */}
          <div>
            <h3 className="text-xl font-bold mb-4">THE CONCEPT</h3>
            <div className="space-y-4 text-white/80">
              {aboutContent.conceptDescription.split('\n\n').map((paragraph, index) => (
                <p key={`concept-${index}`}>
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>
          
          {/* Designer information */}
          <div>
            <div className="mb-6 aspect-[3/4] w-full max-w-sm mx-auto">
              <img
                src={aboutContent.designerImage}
                alt={aboutContent.designerName}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{aboutContent.designerName}</h3>
            <p className="text-white/80">{aboutContent.designerBio}</p>
          </div>
        </div>
      </BaggySection>
      
      {/* Creative Vision Section */}
      <BaggySection
        title="CREATIVE VISION"
        subtitle="The inspiration and intention behind the BAGGY project."
        bgColor="bg-white"
        textColor="text-black"
      >
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4 text-black/80">
            {aboutContent.visionDescription.split('\n\n').map((paragraph, index) => (
              <p key={`vision-${index}`}>
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </BaggySection>
      
      {/* Credits Section */}
      <BaggySection
        title="CREDITS"
        subtitle="The team behind BAGGY S/S 25."
        bgColor="bg-black"
        textColor="text-white"
      >
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-12">
            {aboutContent.credits.map((credit, index) => (
              <div key={`credit-${index}`} className="py-3 border-b border-white/10 flex justify-between">
                <span className="text-white/60 text-sm">{credit.role}</span>
                <span className="text-white font-medium">{credit.name}</span>
              </div>
            ))}
          </div>
        </div>
      </BaggySection>
      
      {/* Contact Section */}
      <BaggySection 
        title="CONTACT" 
        bgColor="bg-black" 
        textColor="text-white" 
        padding="py-12"
      >
        <div className="max-w-xl mx-auto text-center">
          <p className="text-white/80 mb-6">
            For inquiries about BAGGY, press requests, or to discuss the project, please reach out via email.
          </p>
          <a
            href="mailto:info@baggyfashion.com"
            className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition duration-300 tracking-widest text-sm"
          >
            info@baggyfashion.com
          </a>
        </div>
      </BaggySection>
    </BaggyLayout>
  );
};

export default BaggyAboutPage; 