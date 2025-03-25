import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define interface for credits members
interface CreditMember {
  role?: string;
  name: string;
}

const tooltipMessages = [
  "wait you know this isn't real right?",
  "fake link woo hoo",
  "nice try...",
  "this link isn't going anywhere",
  "THIS IS A JOKE!!!",
  "wait do you actually want a baggy fit?"
];

interface TooltipProps {
  message: string;
  position: { x: number; y: number };
  onClose: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({ message, position, onClose }) => {
  // Calculate constrained position to prevent going off-screen
  const constrainedX = Math.min(Math.max(position.x, 100), window.innerWidth - 100);
  
  return (
    <div
      className="fixed z-50 py-3 text-lg font-light tracking-wide text-white bg-black text-center whitespace-nowrap"
      style={{
        left: constrainedX,
        top: position.y - 40,
        transform: 'translateX(-50%)',
        padding: `0.75rem ${message.length < 15 ? '1rem' : '1.5rem'}`,
        maxWidth: '90vw',
        overflowWrap: 'break-word'
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
};

export const BaggyFooter: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ message: string; position: { x: number; y: number }; timeoutId?: number } | null>(null);

  // Clear timeout when component unmounts or when tooltip changes
  useEffect(() => {
    return () => {
      if (tooltip?.timeoutId) {
        clearTimeout(tooltip.timeoutId);
      }
    };
  }, [tooltip]);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Clear any existing timeout
    if (tooltip?.timeoutId) {
      clearTimeout(tooltip.timeoutId);
    }

    const randomMessage = tooltipMessages[Math.floor(Math.random() * tooltipMessages.length)];
    const timeoutId = window.setTimeout(() => setTooltip(null), 500);
    
    setTooltip({
      message: randomMessage,
      position: { x: e.clientX, y: e.clientY },
      timeoutId
    });
  };

  return (
    <footer className="bg-white py-8 pb-24 border-t border-black/10">
      <div className="container max-w-[1920px] mx-auto px-6 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Logo Column */}
          <div className="flex flex-col items-start md:col-span-3">
            <div className="relative w-24 h-24">
              <img
                src="/images/baggy/garbagebag.jpg"
                alt="BAGGY"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 flex flex-col">
              <p className="text-sm font-light text-black/60">
                © 2024 BAGGY. All rights reserved.
              </p>
              <a
                href="https://instagram.com/baggythebrand"
                className="text-sm font-light text-black/60 hover:text-black transition-colors baggy-footer-link underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @BAGGYthebrand &lt;-- click me!
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 md:col-span-9 md:grid-cols-4">
            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-medium uppercase">Shop</h4>
              <div className="flex flex-col space-y-3">
                {['New Arrivals', 'Best Sellers', 'Coming Soon', 'Gift Cards'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={handleLinkClick}
                    className="text-sm font-light text-black/60 hover:text-black transition-colors baggy-footer-link"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-medium uppercase">Support</h4>
              <div className="flex flex-col space-y-3">
                {['Contact Us', 'FAQ', 'Shipping', 'Returns'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={handleLinkClick}
                    className="text-sm font-light text-black/60 hover:text-black transition-colors baggy-footer-link"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-medium uppercase">Company</h4>
              <div className="flex flex-col space-y-3">
                {['About Us', 'Sustainability', 'Press', 'Careers'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={handleLinkClick}
                    className="text-sm font-light text-black/60 hover:text-black transition-colors baggy-footer-link"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-sm font-medium uppercase">Legal</h4>
              <div className="flex flex-col space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={handleLinkClick}
                    className="text-sm font-light text-black/60 hover:text-black transition-colors baggy-footer-link"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {tooltip && (
        <Tooltip
          message={tooltip.message}
          position={tooltip.position}
          onClose={() => {
            if (tooltip.timeoutId) {
              clearTimeout(tooltip.timeoutId);
            }
            setTooltip(null);
          }}
        />
      )}
    </footer>
  );
}; 