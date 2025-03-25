import React, { useState } from 'react';

interface BaggyPdfViewerProps {
  src: string;
  title?: string;
  description?: string;
  className?: string;
}

const BaggyPdfViewer: React.FC<BaggyPdfViewerProps> = ({
  src,
  title,
  description,
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError('Failed to load PDF. Please check the source URL or try downloading it directly.');
  };

  // Determine if the URL is valid for embedding
  const isValidUrl = src && (
    src.startsWith('http://') || 
    src.startsWith('https://') || 
    src.startsWith('/')
  );

  // Generate a direct download link
  const getDownloadUrl = () => {
    if (!src) return '#';
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    // For relative URLs, convert to absolute
    return window.location.origin + (src.startsWith('/') ? src : `/${src}`);
  };

  const downloadUrl = getDownloadUrl();

  return (
    <div className={`relative flex flex-col bg-black/20 ${className}`}>
      {/* Header with title and description */}
      {(title || description) && (
        <div className="p-4 border-b border-white/10">
          {title && <h3 className="text-xl font-medium">{title}</h3>}
          {description && <p className="text-white/70 mt-2">{description}</p>}
        </div>
      )}
      
      {/* PDF Viewer */}
      <div className="relative flex-1 min-h-[70vh]">
        {!isLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-red-400 mb-4">{error}</p>
            <a 
              href={downloadUrl} 
              download
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 transition-colors"
            >
              Download PDF Instead
            </a>
          </div>
        ) : (
          isValidUrl ? (
            <iframe
              src={src}
              className="w-full h-full min-h-[70vh] border-0"
              onLoad={handleLoad}
              onError={handleError}
              title={title || "PDF Viewer"}
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-yellow-400 mb-4">Invalid PDF source URL provided.</p>
            </div>
          )
        )}
      </div>
      
      {/* Download button */}
      <div className="p-4 border-t border-white/10 flex justify-between items-center">
        <span className="text-white/70">Can't view the PDF?</span>
        <a 
          href={downloadUrl} 
          download
          className="bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 transition-colors"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default BaggyPdfViewer; 