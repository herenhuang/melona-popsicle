import React, { useRef, useEffect, useState, useId } from 'react';
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
  style?: React.CSSProperties;
}

// Global state to track which popup is being dragged
const dragState = {
  activeId: null as string | null,
  isDragging: false
};

export function NotepadPopup({
  isOpen,
  onClose,
  onFocus,
  title,
  content,
  initialPosition = { x: 0, y: 0 },
  color = '#73b6ff',
  width = 600,
  zIndex = 50,
  style
}: NotepadPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const dragInfo = useRef({
    offsetX: 0,
    offsetY: 0
  });
  
  // Generate a unique ID for this popup instance
  const popupId = useId();

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
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    };
    
    // Set this popup as the active dragging popup
    dragState.activeId = popupId;
    dragState.isDragging = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    // Only move if this is the active popup being dragged
    if (!dragState.isDragging || dragState.activeId !== popupId) return;

    const newX = e.clientX - dragInfo.current.offsetX;
    const newY = e.clientY - dragInfo.current.offsetY;
    const constrained = constrainPosition(newX, newY);
    setPosition(constrained);
  };

  const handleMouseUp = () => {
    // Reset dragging state only if this popup was being dragged
    if (dragState.activeId === popupId) {
      dragState.activeId = null;
      dragState.isDragging = false;
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        // Clean up and reset dragging state when unmounting
        if (dragState.activeId === popupId) {
          dragState.activeId = null;
          dragState.isDragging = false;
        }
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isOpen, popupId]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={popupRef}
          className="fixed bg-white rounded-lg select-none"
          style={{
            width: `${width}px`,
            height: '400px',
            zIndex,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: `2px solid ${color}`,
            touchAction: 'none',
            top: 0,
            left: 0,
            transform: `translate(${position.x}px, ${position.y}px)`,
            ...style
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
            className="flex items-center justify-between p-3 cursor-move rounded-t-lg"
            style={{ 
              backgroundColor: color,
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
            }}
            onMouseDown={handleMouseDown}
          >
            {/* Window controls in macOS style */}
            <div className="flex items-center space-x-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                aria-label="Close window"
              ></button>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <h2 className="text-base font-semibold text-gray-800 mx-auto">{title}</h2>
            <div className="w-8"></div> {/* Spacer for visual balance */}
          </div>
          <div 
            className="overflow-hidden bg-white/95 rounded-b-lg text-sm overflow-y-hidden"
            style={{ 
              height: 'calc(100% - 48px)'
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