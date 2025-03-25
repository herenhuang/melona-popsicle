import React from 'react';
import BaggyLayout from '../../components/baggy/BaggyLayout';
import BaggySection from '../../components/baggy/BaggySection';
import BaggyTimeline from '../../components/baggy/BaggyTimeline';
import BaggyVideo from '../../components/baggy/BaggyVideo';
import BaggyGallery from '../../components/baggy/BaggyGallery';

// Timeline events for the fashion show
const timelineEvents = [
  {
    time: "7:00 PM",
    title: "Doors Open",
    description: "Guests arrive at Trash Palace Gallery for welcome drinks"
  },
  {
    time: "7:30 PM",
    title: "Introduction",
    description: "Opening remarks by BAGGY founder Helen Huang"
  },
  {
    time: "8:00 PM",
    title: "Runway Show Begins",
    description: "Presentation of the Waste Couture collection"
  },
  {
    time: "8:30 PM",
    title: "Landfill Luxury Collection",
    description: "Presentation of the Landfill Luxury pieces"
  },
  {
    time: "9:00 PM",
    title: "Designer Q&A",
    description: "Interactive session with the creative team"
  },
  {
    time: "9:30 PM",
    title: "Afterparty",
    description: "Celebration with DJ and sustainable cocktails"
  }
];

// Gallery images for the runway show - using reliable stock images
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    alt: "BAGGY Runway Show Look 1",
    aspectRatio: "landscape" as const,
    credits: {
      photographer: "Sofia Mazzini"
    }
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    alt: "BAGGY Runway Show Look 2",
    aspectRatio: "portrait" as const,
    credits: {
      photographer: "Sofia Mazzini",
      model: "Alex Jones"
    }
  },
  {
    src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    alt: "BAGGY Runway Show Look 3",
    aspectRatio: "landscape" as const,
    credits: {
      photographer: "Sofia Mazzini"
    }
  },
  {
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    alt: "BAGGY Runway Show Look 4",
    aspectRatio: "portrait" as const,
    credits: {
      photographer: "Sofia Mazzini",
      model: "Taylor Kim"
    }
  },
  {
    src: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    alt: "BAGGY Runway Show Backstage",
    aspectRatio: "landscape" as const,
    credits: {
      photographer: "Sofia Mazzini"
    }
  },
  {
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    alt: "BAGGY Runway Show Finale",
    aspectRatio: "portrait" as const,
    credits: {
      photographer: "Sofia Mazzini",
      model: "Finale Group"
    }
  }
];

const BaggyShowPage: React.FC = () => {
  return (
    <BaggyLayout>
      {/* Intro Section */}
      <BaggySection 
        title="THE SHOW" 
        subtitle="BAGGY FALL/WINTER 2025 RUNWAY PRESENTATION"
        bgColor="bg-black"
        textColor="text-white"
      >
        <div className="my-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-white/70 mb-6">
                On March 1, 2025, BAGGY will present its inaugural collection at the Trash Palace Gallery 
                in New York City. The show will be a satirical take on traditional runway presentations, 
                challenging the fashion industry's wasteful practices while showcasing innovative designs.
              </p>
              <p className="text-white/70 mb-6">
                The event will feature models walking among art installations made from discarded materials,
                with garments that transform everyday waste into provocative statements on consumption and status.
              </p>
              <div className="space-y-4 mt-8">
                <div className="border border-white/20 p-4 rounded-md">
                  <p className="text-sm text-white/50 mb-1">DATE</p>
                  <p>March 1, 2025</p>
                </div>
                <div className="border border-white/20 p-4 rounded-md">
                  <p className="text-sm text-white/50 mb-1">LOCATION</p>
                  <p>Trash Palace Gallery</p>
                  <p className="text-white/70">550 West 21st Street, New York, NY</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden">
              {/* Using invalid src but valid poster image to test error handling */}
              <BaggyVideo 
                src="https://example.com/non-existent-video.mp4"
                posterSrc="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                title="BAGGY F/W 2025 Teaser"
                caption="A glimpse of what to expect at our runway show"
                loop={true}
                muted={true}
                controls={true}
                className="aspect-[9/16] w-full"
              />
            </div>
          </div>
        </div>
      </BaggySection>
      
      {/* Timeline Section */}
      <BaggySection 
        title="EVENT SCHEDULE" 
        subtitle="MARCH 1, 2025"
        bgColor="bg-white"
        textColor="text-black"
      >
        <div className="my-12">
          <BaggyTimeline events={timelineEvents} />
        </div>
      </BaggySection>
      
      {/* Gallery Section */}
      <BaggySection 
        title="RUNWAY PREVIEW" 
        subtitle="SELECTED LOOKS FROM THE UPCOMING COLLECTIONS"
        bgColor="bg-black"
        textColor="text-white"
      >
        <div className="my-12">
          <BaggyGallery 
            images={galleryImages}
            columns={3}
            gap={16}
          />
        </div>
      </BaggySection>
      
      {/* Credits Section */}
      <BaggySection 
        title="SHOW CREDITS" 
        subtitle="THE TEAM BEHIND THE PRESENTATION"
        bgColor="bg-white"
        textColor="text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <div>
            <h3 className="text-lg font-medium mb-4">CREATIVE TEAM</h3>
            <ul className="text-black/70 space-y-2">
              <li><span className="font-medium">Creative Director:</span> Helen Huang</li>
              <li><span className="font-medium">Stylist:</span> Marco Vanzini</li>
              <li><span className="font-medium">Set Design:</span> Urban Waste Collective</li>
              <li><span className="font-medium">Music:</span> DJ Recycle</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">PRODUCTION</h3>
            <ul className="text-black/70 space-y-2">
              <li><span className="font-medium">Show Production:</span> Runway Plus</li>
              <li><span className="font-medium">Lighting Design:</span> Illuminate Group</li>
              <li><span className="font-medium">Technical Direction:</span> Sarah Mendez</li>
              <li><span className="font-medium">Photography:</span> Sofia Mazzini</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">BEAUTY</h3>
            <ul className="text-black/70 space-y-2">
              <li><span className="font-medium">Makeup:</span> Cleo Williams</li>
              <li><span className="font-medium">Hair:</span> Patrick Mosse</li>
              <li><span className="font-medium">Nails:</span> Nail Artistry Collective</li>
              <li><span className="font-medium">Skincare:</span> Pure Elements</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 p-6 border border-black/10 rounded-lg max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-medium mb-2">ATTENDANCE INFORMATION</h3>
          <p className="text-black/70 mb-4">The BAGGY runway show is invite-only. For press inquiries and credentials, please contact:</p>
          <a href="mailto:press@baggyfashion.com" className="text-black font-medium hover:underline">press@baggyfashion.com</a>
        </div>
      </BaggySection>
    </BaggyLayout>
  );
};

export default BaggyShowPage; 