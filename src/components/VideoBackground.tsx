import React, { useState, useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoSrc, fallbackImageSrc }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => setVideoLoaded(true));
      video.addEventListener('error', () => {
        console.error("Video failed to load:", videoSrc);
        setVideoError(true);
      });
    }

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', () => setVideoLoaded(true));
        video.removeEventListener('error', () => setVideoError(true));
      }
    };
  }, [videoSrc]);

  if (videoError || !videoSrc) {
    return (
      <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
        {/* Enhanced fallback animation when video fails to load */}
        <div 
          className="w-full h-full absolute"
          style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientMove 15s ease infinite'
          }}
        >
          {/* Animated fashion elements */}
          <div className="relative w-full h-full perspective">
            {/* Floating shapes */}
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white opacity-0"
                style={{
                  width: `${Math.random() * 60 + 20}px`,
                  height: `${Math.random() * 60 + 20}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 15}s linear infinite ${Math.random() * 5}s`
                }}
              />
            ))}
            
            {/* Pulsing gradient overlay */}
            <div 
              className="absolute w-full h-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'gradientPulse 4s ease-in-out infinite alternate'
              }}
            />
            
            {/* Runway-like line */}
            <div 
              className="absolute w-[200px] h-[2px] bg-gray-300"
              style={{
                top: '75%',
                left: '50%',
                transform: 'translateX(-50%) rotateX(60deg)',
                transformOrigin: 'center',
                animation: 'runwayFade 3s ease infinite'
              }}
            />
            
            {/* Fallback image if provided */}
            {fallbackImageSrc && (
              <img 
                src={fallbackImageSrc} 
                alt="Background" 
                className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground; 