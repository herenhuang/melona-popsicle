import React, { useState, useRef } from 'react';

interface BaggyVideoProps {
  src: string;
  posterSrc?: string;
  title?: string;
  caption?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  className?: string;
}

const BaggyVideo: React.FC<BaggyVideoProps> = ({
  src,
  posterSrc,
  title,
  caption,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(error => {
        console.error('Error playing video:', error);
        setError('Could not play video. It may be that autoplay is disabled in your browser.');
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    setError('Error loading video. Please check the source URL.');
  };

  return (
    <div className={`relative overflow-hidden bg-black/20 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="text-center text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={posterSrc}
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        className={`w-full h-full object-contain ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoadedData={handleLoadedData}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={handleError}
      />
      
      {!controls && (
        <button
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {!isPlaying && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      )}
      
      {(title || caption) && (
        <div className="p-3 bg-black/80">
          {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
          {caption && <p className="text-sm text-white/70 mt-1">{caption}</p>}
        </div>
      )}
    </div>
  );
};

export default BaggyVideo; 