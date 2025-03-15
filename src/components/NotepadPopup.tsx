import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
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
  const [position, setPosition] = useState(initialPosition);
  const popupRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleDragStart = () => {
    if (popupRef.current) {
      onFocus();
    }
  };

  const handleDrag = (_: any, info: PanInfo) => {
    if (!popupRef.current) return;

    const padding = 20;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const popupRect = popupRef.current.getBoundingClientRect();

    const newX = Math.max(
      padding,
      Math.min(windowWidth - popupRect.width - padding, position.x + info.delta.x)
    );
    const newY = Math.max(
      padding,
      Math.min(windowHeight - popupRect.height - padding, position.y + info.delta.y)
    );

    setPosition({ x: newX, y: newY });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          className="fixed bg-white rounded-lg"
          style={{
            width: `${width}px`,
            maxHeight: 'calc(100vh - 40px)',
            zIndex,
            left: 0,
            top: 0,
            x: position.x,
            y: position.y,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: `2px solid ${color}`,
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.95,
            x: window.innerWidth / 2 - width / 2,
            y: window.innerHeight / 2 - 200
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: position.x,
            y: position.y,
            transition: { 
              type: 'spring', 
              damping: 30, 
              stiffness: 350,
              mass: 0.8
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.95,
            transition: {
              duration: 0.2
            }
          }}
          drag
          dragMomentum={false}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onMouseDown={onFocus}
          whileHover={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
          <div 
            className="flex items-center justify-between p-4 cursor-move rounded-t-lg"
            style={{ 
              backgroundColor: color,
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
            }}
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
              maxHeight: 'calc(100vh - 140px)',
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