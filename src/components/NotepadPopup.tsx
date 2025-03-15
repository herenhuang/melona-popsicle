import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface NotepadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onFocus: () => void;
  title: string;
  content: React.ReactNode;
  initialPosition?: { x: number; y: number };
  color?: string;
  width?: number;
  zIndex?: number;
}

export function NotepadPopup({
  isOpen,
  onClose,
  onFocus,
  title,
  content,
  initialPosition = { x: 0, y: 0 },
  color = '#73b6ff',
  width = 600,
  zIndex = 50
}: NotepadPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const dragInfo = useRef({
    isDragging: false,
    offsetX: 0,
    offsetY: 0
  });

  // Update position when initialPosition changes
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  const constrainPosition = (x: number, y: number) => {
    if (!popupRef.current) return { x, y };

    const padding = 20;
    const rect = popupRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return {
      x: Math.max(padding, Math.min(viewportWidth - rect.width - padding, x)),
      y: Math.max(padding, Math.min(viewportHeight - rect.height - padding, y))
    };
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    const handleResize = () => {
      const constrained = constrainPosition(position.x, position.y);
      setPosition(constrained);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position.x, position.y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!popupRef.current) return;

    e.preventDefault();
    onFocus();

    const rect = popupRef.current.getBoundingClientRect();
    dragInfo.current = {
      isDragging: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragInfo.current.isDragging) return;

    const newX = e.clientX - dragInfo.current.offsetX;
    const newY = e.clientY - dragInfo.current.offsetY;
    const constrained = constrainPosition(newX, newY);
    setPosition(constrained);
  };

  const handleMouseUp = () => {
    dragInfo.current.isDragging = false;
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={popupRef}
          className="fixed bg-white rounded-lg select-none"
          style={{
            width: `${width}px`,
            maxHeight: 'min(calc(100vh - 160px), 800px)',
            zIndex,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: `2px solid ${color}`,
            touchAction: 'none',
            top: 0,
            left: 0,
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.95,
            x: position.x,
            y: position.y
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: position.x,
            y: position.y,
            transition: { 
              duration: 0.15,
              type: "tween"
            }
          }}
          exit={{ 
            opacity: 0,
            scale: 0.95,
            transition: { 
              duration: 0.1,
              type: "tween"
            }
          }}
        >
          <div 
            className="flex items-center justify-between p-4 cursor-move rounded-t-lg"
            style={{ 
              backgroundColor: color,
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
            }}
            onMouseDown={handleMouseDown}
          >
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-black/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div 
            className="p-6 overflow-y-auto bg-white/95 rounded-b-lg"
            style={{ 
              maxHeight: 'calc(100vh - 240px)',
              overscrollBehavior: 'contain'
            }}
          >
            {content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotepadPopup; 