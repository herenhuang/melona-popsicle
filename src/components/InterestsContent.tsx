import React, { useEffect, useRef } from 'react';

export const InterestsContent = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Clear the container first to avoid duplicates
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
    // Ensure any existing scripts are removed
    const existingScripts = document.querySelectorAll('script[src*="platform.twitter.com"]');
    existingScripts.forEach(script => script.remove());
    
    // Create an iframe directly - this gives us more control than Twitter's widget
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://platform.twitter.com/embed/Tweet.html?id=1651703013361238016');
    iframe.setAttribute('width', '320');
    iframe.setAttribute('height', '600'); // Further increased height to show the entire tweet
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute('allowTransparency', 'true');
    iframe.setAttribute('allowFullScreen', 'true');
    iframe.style.border = 'none';
    iframe.style.maxWidth = '100%';
    iframe.style.minWidth = '220px';
    
    // Only append if the container exists
    if (containerRef.current) {
      containerRef.current.appendChild(iframe);
    }
    
    return () => {
      // Clean up
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* Single container with an explicit width and height */}
      <div 
        ref={containerRef}
        className="flex justify-center items-center"
        style={{ 
          width: '320px', 
          height: '600px', // Further increased to match iframe height
          margin: '0 auto'
        }}
      >
        <div className="text-gray-400">Loading tweet...</div>
      </div>
    </div>
  );
};