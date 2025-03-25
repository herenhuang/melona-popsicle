import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface BaggySectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
  dark?: boolean;
  bgColor?: string;
  textColor?: string;
  padding?: string;
  align?: 'left' | 'center' | 'right';
}

const BaggySection: React.FC<BaggySectionProps> = ({
  title,
  subtitle,
  className = '',
  children,
  fullWidth = false,
  dark = false,
  bgColor,
  textColor,
  padding,
  align = 'left',
}) => {
  const backgroundColor = bgColor || (dark ? 'bg-primary' : 'bg-background');
  const color = textColor || (dark ? 'text-background' : 'text-primary');
  const paddingClass = padding || 'py-20 md:py-32';
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.165, 0.84, 0.44, 1],
      },
    },
  };

  return (
    <section className={cn(paddingClass, backgroundColor, className)}>
      <motion.div 
        className={cn(
          fullWidth ? 'px-6 md:px-12' : 'container mx-auto px-6',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right'
        )}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {(title || subtitle) && (
          <div className="mb-16 md:mb-24 max-w-4xl mx-auto">
            {title && (
              <motion.h2 
                className={cn(
                  'font-display text-4xl md:text-5xl lg:text-6xl tracking-wide leading-tight',
                  color
                )}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.2, duration: 0.6 }
                  }
                }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                className={cn(
                  'mt-6 text-lg md:text-xl font-sans leading-relaxed',
                  color === 'text-background' ? 'text-background/70' : 'text-primary/70'
                )}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.3, duration: 0.6 }
                  }
                }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { delay: 0.4, duration: 0.6 }
            }
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BaggySection; 