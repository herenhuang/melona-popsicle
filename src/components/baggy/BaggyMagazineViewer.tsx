import React, { useState } from 'react';

interface BaggyMagazineViewerProps {
  pdfUrl?: string;
  videoUrl?: string;
  title: string;
  description?: string;
}

const BaggyMagazineViewer: React.FC<BaggyMagazineViewerProps> = ({
  pdfUrl,
  videoUrl,
  title,
  description
}) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'video'>(pdfUrl ? 'pdf' : 'video');

  return (
    <div className="w-full">
      {/* Title and description */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide mb-3">
          {title}
        </h2>
        {description && (
          <p className="text-white/70 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      {/* Toggle buttons if both modes are available */}
      {pdfUrl && videoUrl && (
        <div className="flex justify-center mb-8">
          <div className="inline-flex border border-white/30 rounded-sm overflow-hidden">
            <button
              className={`px-4 py-2 text-sm ${
                viewMode === 'pdf'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-white hover:bg-white/10'
              }`}
              onClick={() => setViewMode('pdf')}
            >
              PDF VIEWER
            </button>
            <button
              className={`px-4 py-2 text-sm ${
                viewMode === 'video'
                  ? 'bg-white text-black'
                  : 'bg-transparent text-white hover:bg-white/10'
              }`}
              onClick={() => setViewMode('video')}
            >
              VIDEO WALKTHROUGH
            </button>
          </div>
        </div>
      )}

      {/* Viewer container */}
      <div className="w-full max-w-4xl mx-auto border border-white/20 bg-black/50">
        {/* PDF Viewer */}
        {viewMode === 'pdf' && pdfUrl && (
          <div className="aspect-[3/4] w-full">
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full"
              title="BAGGY Magazine PDF"
            />
          </div>
        )}

        {/* Video Viewer */}
        {viewMode === 'video' && videoUrl && (
          <div className="aspect-video w-full">
            <video
              src={videoUrl}
              controls
              muted
              className="w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      {/* Download link for PDF */}
      {viewMode === 'pdf' && pdfUrl && (
        <div className="mt-6 text-center">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-white/80 hover:text-white"
            download
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            DOWNLOAD PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default BaggyMagazineViewer; 