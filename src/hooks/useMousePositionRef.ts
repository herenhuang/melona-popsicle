import { useEffect, useRef } from 'react';

export function useMousePositionRef(containerRef: React.RefObject<HTMLElement>) {
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateMousePosition = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePositionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      mousePositionRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('touchmove', handleTouchMove);

    // Initialize position at center for mobile
    const rect = container.getBoundingClientRect();
    mousePositionRef.current = {
      x: rect.width / 2,
      y: rect.height / 2
    };

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef]);

  return mousePositionRef;
} 