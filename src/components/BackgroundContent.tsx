import React from 'react';

export const BackgroundContent = () => {
  return (
    <div className="w-full h-full" style={{ position: 'relative' }}>
      <img 
        src="https://images.unsplash.com/photo-1525857597365-5f6dbff2e36e?auto=format&fit=crop&q=80"
        alt="Rock formations" 
        className="w-full h-full object-cover"
        style={{ 
          position: 'absolute',
          inset: 0,
          display: 'block',
          margin: 0,
          padding: 0
        }}
      />
    </div>
  );
};