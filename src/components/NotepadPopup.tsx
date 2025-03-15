import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface NotepadPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  initialPosition?: { x: number; y: number };
  color?: string;
}

const NotepadPopup: React.FC<NotepadPopupProps> = ({
  isOpen,
  onClose,
  title,
  content,
  initialPosition = { x: 0, y: 0 },
  color = '#f9fafb'
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      ref={constraintsRef}
      onClick={(e) => {
        // Close when clicking outside the notepad
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        className="absolute shadow-xl rounded-lg overflow-hidden"
        style={{ 
          width: '400px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          backgroundColor: color,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: position.x,
          y: position.y
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', damping: 20 }}
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
          // Update position after drag
          const element = document.querySelector('.notepad-content') as HTMLElement;
          if (element) {
            const rect = element.getBoundingClientRect();
            setPosition({ x: rect.left, y: rect.top });
          }
        }}
      >
        {/* Notepad header with title and close button */}
        <div 
          className="px-4 py-3 flex justify-between items-center cursor-move"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <h3 className="font-bold text-lg">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Notepad content */}
        <div 
          className="notepad-content p-5 overflow-y-auto"
          style={{ maxHeight: 'calc(80vh - 50px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
        
        {/* Notepad footer with visual elements to make it look like paper */}
        <div 
          className="h-4"
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px)',
            backgroundSize: '10px 100%'
          }}
        />
      </motion.div>
    </div>
  );
};

export default NotepadPopup; 