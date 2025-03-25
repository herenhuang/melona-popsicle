import React, { useState } from 'react';
import VideoBackground from './VideoBackground';
import PDFViewer from './PDFViewer';

interface ArtBookSectionProps {
  videoSrc: string;
  pdfUrl: string;
}

const ArtBookSection: React.FC<ArtBookSectionProps> = ({ videoSrc, pdfUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Re-enable body scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <VideoBackground videoSrc={videoSrc} />
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 text-center drop-shadow-lg">
          BAGGY ART BOOK
        </h2>
        
        {/* Enhanced Circular Button with Pulsing Effects */}
        <div className="relative">
          {/* Outer pulse ring */}
          <div className="absolute w-full h-full rounded-full bg-white opacity-20 animate-pulse" 
               style={{
                 transform: 'scale(1.3)',
                 animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
               }}></div>
          
          {/* Secondary pulse ring */}
          <div className="absolute w-full h-full rounded-full bg-white opacity-30"
               style={{
                 transform: 'scale(1.15)',
                 animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s'
               }}></div>
          
          {/* Main button */}
          <button
            onClick={openModal}
            className="circular-button w-32 h-32 md:w-40 md:h-40 rounded-full bg-white bg-opacity-80 flex items-center justify-center text-black font-bold text-sm md:text-base transition-all duration-300 hover:bg-opacity-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
          >
            VIEW ARTBOOK
          </button>
        </div>
      </div>
      
      {/* PDF Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity duration-300">
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden"
            style={{animation: 'modalFadeIn 0.3s ease-out forwards'}}
          >
            {/* Modal header */}
            <div className="p-4 bg-gray-100 flex justify-between items-center border-b">
              <h3 className="text-xl font-semibold">BAGGY ART BOOK</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 focus:outline-none"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* PDF Viewer */}
            <div className="h-[calc(90vh-80px)]">
              <PDFViewer pdfUrl={pdfUrl} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArtBookSection; 