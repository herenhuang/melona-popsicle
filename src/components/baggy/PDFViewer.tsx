import React, { useEffect, useRef, useState } from 'react';

interface PDFViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Function to open PDF in a new tab
  const openInNewTab = () => {
    window.open(pdfUrl, '_blank');
    // Close the modal after opening
    onClose();
  };
  
  // Function to download the PDF
  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Check if PDF has loaded properly
  useEffect(() => {
    if (!isOpen) return;
    
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    setIsLoading(true);
    setHasError(false);
    
    const checkIframeLoaded = () => {
      try {
        // This will throw an error if the iframe content is from a different origin
        // or if it failed to load properly
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (iframeDoc) {
          if (iframeDoc.body.innerHTML === '') {
            // Empty document might indicate loading failure
            setHasError(true);
          } else {
            setHasError(false);
          }
        }
      } catch (err) {
        // Cross-origin error or other loading issue
        console.error('Error checking iframe:', err);
        // Wait a bit and check if the PDF is still loading
        setTimeout(() => {
          if (isLoading) {
            setHasError(true);
            setIsLoading(false);
          }
        }, 5000);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Set a timeout to check if PDF loaded
    const timeout = setTimeout(checkIframeLoaded, 3000);
    
    // Try to detect load events
    iframe.onload = () => {
      clearTimeout(timeout);
      setIsLoading(false);
      checkIframeLoaded();
    };
    
    iframe.onerror = () => {
      clearTimeout(timeout);
      setIsLoading(false);
      setHasError(true);
    };
    
    // Cleanup
    return () => {
      clearTimeout(timeout);
    };
  }, [pdfUrl, isOpen, isLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 transition-opacity duration-300">
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden pdf-modal"
      >
        {/* Modal header */}
        <div className="p-4 bg-gray-100 flex justify-between items-center border-b">
          <h3 className="text-xl font-semibold">BAGGY ART BOOK</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {/* PDF Viewer with iframe */}
        <div className="h-[calc(90vh-80px)] flex-1 relative">
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10 pdf-loading">
              <div className="pdf-loading-spinner"></div>
            </div>
          )}
          
          {/* PDF iframe */}
          <iframe
            ref={iframeRef}
            src={`${pdfUrl}?t=${new Date().getTime()}`}
            className="w-full h-full border-0"
            title="PDF Viewer"
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
          
          {/* Error message */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-20 pdf-error-visible">
              <div className="pdf-error-message">
                <svg className="pdf-error-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-lg font-semibold mb-2">PDF Viewer Issue</h3>
                <p className="mb-4">The PDF may not be displaying correctly.</p>
                <button
                  onClick={openInNewTab}
                  className="pdf-retry-button"
                >
                  Open PDF directly
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Controls toolbar */}
        <div className="pdf-controls">
          <p className="text-sm text-gray-600">BAGGY Art Book - 2023</p>
          <div className="flex space-x-2">
            <button
              onClick={downloadPDF}
              className="pdf-control-button pdf-download-button"
            >
              <svg className="pdf-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download
            </button>
            <button
              onClick={openInNewTab}
              className="pdf-control-button pdf-open-button"
            >
              <svg className="pdf-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
              Open in new tab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer; 