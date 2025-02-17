import React, { useState, useEffect } from 'react';

interface Shape {
  id: number;
  color: string;
  position: { x: number; y: number };
}

interface Burst {
  id: number;
  x: number;
  y: number;
  color: string;
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const colors = [
    'text-[#ff6b35]/30',
    'text-[#ff8c35]/30',
    'text-[#ffad35]/30'
  ];

  useEffect(() => {
    const createInitialShapes = () => {
      const newShapes = Array.from({ length: 9 }, (_, index) => ({
        id: index,
        color: colors[index % colors.length],
        position: {
          x: Math.random() * (window.innerWidth - 300),
          y: Math.random() * (window.innerHeight - 300)
        }
      }));
      setShapes(newShapes);
    };

    createInitialShapes();
    
    const handleResize = () => createInitialShapes();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleShapeClick = (e: React.MouseEvent, shape: Shape) => {
    const burstId = Date.now();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const burstX = rect.left + rect.width / 2;
    const burstY = rect.top + rect.height / 2;

    setBursts(prev => [...prev, {
      id: burstId,
      x: burstX,
      y: burstY,
      color: shape.color
    }]);

    // Remove burst after animation
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== burstId));
    }, 500);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className={`
            absolute w-36 h-36 
            ${shape.color}
            transition-all
            duration-300
            animate-float
            pointer-events-auto
            cursor-pointer
            hover:scale-110
          `}
          style={{
            left: `${shape.position.x}px`,
            top: `${shape.position.y}px`,
          }}
          onClick={(e) => handleShapeClick(e, shape)}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      ))}
      
      {bursts.map(burst => (
        <div
          key={burst.id}
          className={`
            absolute w-36 h-36 
            ${burst.color.replace('/30', '')}
            animate-burst
            pointer-events-none
          `}
          style={{
            left: `${burst.x - 72}px`,
            top: `${burst.y - 72}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
