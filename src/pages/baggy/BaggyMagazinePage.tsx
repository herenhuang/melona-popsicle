import React from 'react';
import BaggyLayout from '../../components/baggy/BaggyLayout';
import BaggySection from '../../components/baggy/BaggySection';
import BaggyPdfViewer from '../../components/baggy/BaggyPdfViewer';
import BaggyVideo from '../../components/baggy/BaggyVideo';

const BaggyMagazinePage: React.FC = () => {
  return (
    <BaggyLayout>
      <BaggySection 
        title="BAGGY MAGAZINE" 
        subtitle="Fall/Winter 2025 - ISSUE 01: WASTE COUTURE"
        bgColor="bg-black"
        textColor="text-white"
        fullWidth={false}
      >
        <div className="my-12 max-w-4xl mx-auto">
          <p className="text-white/70 text-lg mb-8">
            The inaugural issue of BAGGY Magazine explores the concept of "Waste Couture" - 
            our provocative take on high fashion's relationship with sustainability. 
            This digital lookbook showcases our debut collection and features essays 
            on fashion, sustainability, and the future of design.
          </p>
          
          <div className="grid grid-cols-1 gap-8">
            {/* PDF Viewer with sample PDF URL for testing */}
            <BaggyPdfViewer 
              src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              title="BAGGY Magazine - Issue 01"
              description="Browse our digital magazine featuring the full Waste Couture lookbook and exclusive editorial content."
              className="rounded-lg overflow-hidden"
            />
            
            {/* Alternative Video Walkthrough with reliable poster image */}
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">VIDEO WALKTHROUGH</h3>
              <p className="text-white/70 mb-4">
                If you prefer, watch our creative director walk through the magazine and discuss key editorial features.
              </p>
              <BaggyVideo 
                src="https://example.com/non-existent-video.mp4"
                posterSrc="https://images.unsplash.com/photo-1521341057461-6eb5f40b07ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
                title="BAGGY Magazine Walkthrough"
                caption="Creative Director Helen Huang guides you through our debut issue"
                controls={true}
                className="rounded-lg overflow-hidden aspect-video"
              />
            </div>
          </div>
        </div>
      </BaggySection>
      
      <BaggySection 
        title="ABOUT THE MAGAZINE" 
        subtitle="The Voice of the BAGGY Movement"
        bgColor="bg-white"
        textColor="text-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
          <div>
            <h3 className="text-xl font-medium mb-4">OUR VISION</h3>
            <p className="text-black/70 mb-4">
              BAGGY Magazine serves as both a showcase for our collections and a platform 
              for critical discourse around the fashion industry. Each issue explores themes 
              of sustainability, innovation, and the intersection of art and commerce.
            </p>
            <p className="text-black/70">
              Published biannually, BAGGY Magazine features exclusive editorials, interviews 
              with sustainability pioneers, and thought-provoking essays that challenge the 
              status quo of the fashion world.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4">UPCOMING ISSUES</h3>
            <ul className="space-y-4">
              <li>
                <p className="font-medium">ISSUE 02: LANDFILL LUXURY</p>
                <p className="text-black/70">Coming Summer 2025</p>
              </li>
              <li>
                <p className="font-medium">ISSUE 03: EXCESS & ESSENTIALS</p>
                <p className="text-black/70">Coming Winter 2025</p>
              </li>
              <li>
                <p className="font-medium">ISSUE 04: BEYOND THE SEAMS</p>
                <p className="text-black/70">Coming Summer 2026</p>
              </li>
            </ul>
          </div>
        </div>
      </BaggySection>
      
      <BaggySection 
        title="BEHIND THE PAGES" 
        subtitle="The Making of BAGGY Magazine"
        bgColor="bg-black"
        textColor="text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">EDITORIAL TEAM</h3>
            <ul className="text-white/70 space-y-2">
              <li><span className="text-white/50">Editor-in-Chief:</span> Helen Huang</li>
              <li><span className="text-white/50">Creative Director:</span> Marcus Wei</li>
              <li><span className="text-white/50">Photography:</span> Sofia Mazzini</li>
              <li><span className="text-white/50">Writers:</span> Jade Thompson, Leo Chen</li>
            </ul>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">DESIGN & PRODUCTION</h3>
            <ul className="text-white/70 space-y-2">
              <li><span className="text-white/50">Art Direction:</span> Alexa Rios</li>
              <li><span className="text-white/50">Graphic Design:</span> Tomás García</li>
              <li><span className="text-white/50">Typography:</span> Mono Sans, Elegante</li>
              <li><span className="text-white/50">Printing:</span> Digital Edition Only</li>
            </ul>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-3">DISTRIBUTION</h3>
            <ul className="text-white/70 space-y-2">
              <li><span className="text-white/50">Format:</span> Digital PDF</li>
              <li><span className="text-white/50">Release:</span> Biannual</li>
              <li><span className="text-white/50">Accessibility:</span> Free to Public</li>
              <li><span className="text-white/50">Archive:</span> Permanent Online Access</li>
            </ul>
          </div>
        </div>
      </BaggySection>
    </BaggyLayout>
  );
};

export default BaggyMagazinePage; 