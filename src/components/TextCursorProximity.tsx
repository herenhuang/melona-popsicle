import React, { CSSProperties, forwardRef, useRef, useEffect, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, animate, spring, MotionValue } from "framer-motion";
import { useMousePositionRef } from "../hooks/useMousePositionRef";

// Helper type that makes all properties of CSSProperties accept number | string
type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: string | number
}

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T]
  to: CSSPropertiesWithValues[T]
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string
  styles: Partial<{
    [K in keyof CSSPropertiesWithValues]: StyleValue<K>
  }>
  containerRef: React.RefObject<HTMLDivElement>
  radius?: number
  falloff?: "linear" | "exponential" | "gaussian" | "cubic"
  mobileEffect?: boolean
  damping?: number 
  autoAnimationSpeed?: number
  dramaticEffect?: boolean // New property to enable extra dramatic effects
}

const TextCursorProximity = forwardRef<HTMLSpanElement, TextProps>(
  (
    {
      label,
      styles,
      containerRef,
      radius = 300,
      falloff = "cubic",
      className,
      onClick,
      mobileEffect = true,
      damping = 0.08,
      autoAnimationSpeed = 2,
      dramaticEffect = false,
      ...props
    },
    ref
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const isMobile = useRef(window.innerWidth < 768);
    const autoAnimateRef = useRef({ x: 0, y: 0, direction: 1, speed: autoAnimationSpeed, angle: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const pulseRef = useRef(0);
    
    // Initialize motion values for each letter
    const letterProximities = useRef<MotionValue<number>[]>(
      label.split("").map(() => useMotionValue(0))
    );
    
    // Check for hover state with useEffect
    useEffect(() => {
      const handleMouseEnter = () => {
        setIsHovered(true);
        
        // Animate letters to a slight effect position immediately upon hover
        letterProximities.current.forEach((proximity, i) => {
          animate(proximity, 0.3, { 
            duration: 0.4, 
            type: "spring",
            stiffness: 100 + Math.random() * 200,
            damping: 15
          });
        });
      };
      
      const handleMouseLeave = () => {
        setIsHovered(false);
        
        // Reset all letters when mouse leaves with varying timing
        letterProximities.current.forEach((proximity, i) => {
          animate(proximity, 0, { 
            duration: 0.8, 
            delay: i * 0.02, // Sequential animation for dramatic effect
            type: "spring",
            stiffness: 100,
            damping: 15
          });
        });
      };
      
      const container = containerRef.current;
      if (container) {
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        
        return () => {
          container.removeEventListener('mouseenter', handleMouseEnter);
          container.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, [containerRef]);

    const calculateDistance = (
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const calculateFalloff = (distance: number): number => {
      // Normalize distance to a 0-1 scale where 0 is closest
      const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1);

      switch (falloff) {
        case "exponential":
          return Math.pow(normalizedDistance, 2.5); // More extreme exponential curve
        case "gaussian":
          return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2); // Tighter gaussian curve
        case "cubic":
          // Custom cubic function with sharp falloff and strong peak
          return Math.pow(normalizedDistance, 3) * (1 + Math.sin(normalizedDistance * Math.PI * 2) * 0.2);
        case "linear":
        default:
          return normalizedDistance;
      }
    };

    useAnimationFrame((time) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Update pulse value for additional effects
      pulseRef.current = (Math.sin(time * 0.001) + 1) / 2;

      // For mobile or auto-animation mode, create a more interesting animated effect
      if ((isMobile.current && mobileEffect) || (!isHovered && dramaticEffect)) {
        // Update angle for circular motion
        autoAnimateRef.current.angle += 0.01 * autoAnimateRef.current.speed;
        
        // Create a fluid figure-8 or infinity pattern movement
        const t = time * 0.001 * autoAnimateRef.current.speed; 
        const xOffset = Math.sin(t * 0.7) * Math.cos(t * 0.5) * 0.5;
        const yOffset = Math.sin(t * 0.6) * 0.5;
        
        autoAnimateRef.current.x = (xOffset + 0.5) * containerRect.width;
        autoAnimateRef.current.y = (yOffset + 0.5) * containerRect.height;
        
        // Use this fluid motion to affect different letters
        letterRefs.current.forEach((letterRef, index) => {
          if (!letterRef) return;

          const rect = letterRef.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
          const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

          // Calculate distance with some randomness for more organic feel
          const jitter = dramaticEffect ? Math.sin(time * 0.001 + index) * 10 : 0;
          const distance = calculateDistance(
            autoAnimateRef.current.x + jitter, 
            autoAnimateRef.current.y + jitter,
            letterCenterX,
            letterCenterY
          );

          // Calculate proximity with additional pulse effect
          let targetProximity = calculateFalloff(distance);
          if (dramaticEffect) {
            // Add subtle pulse effect to all letters
            targetProximity = Math.max(targetProximity, 0.1 + pulseRef.current * 0.1);
            
            // Add sequential wave effect
            const waveOffset = Math.sin(time * 0.002 + index * 0.2) * 0.1;
            targetProximity += waveOffset;
          }
          
          // Apply smoothing with variable damping
          const currentValue = letterProximities.current[index].get();
          const dynamicDamping = isHovered ? damping : damping * 2; // Slower restore to normal
          const newValue = currentValue + (targetProximity - currentValue) * dynamicDamping;
          letterProximities.current[index].set(newValue);
        });
      } else {
        // Desktop behavior with mouse position
        letterRefs.current.forEach((letterRef, index) => {
          if (!letterRef) return;

          const rect = letterRef.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
          const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

          // Calculate distance with subtle wobble effect
          const wobbleX = dramaticEffect ? Math.sin(time * 0.001 + index) * 5 : 0;
          const wobbleY = dramaticEffect ? Math.cos(time * 0.001 + index * 0.7) * 5 : 0;
          
          const distance = calculateDistance(
            mousePositionRef.current.x + wobbleX,
            mousePositionRef.current.y + wobbleY,
            letterCenterX,
            letterCenterY
          );

          // Calculate target proximity value with enhanced effects
          let targetProximity = isHovered ? calculateFalloff(distance) : 0;
          
          if (dramaticEffect && isHovered) {
            // Add extra effects when hovering
            const pulseEffect = Math.sin(time * 0.003 + index * 0.1) * 0.1;
            targetProximity = Math.min(targetProximity + pulseEffect, 1);
            
            // Force minimum proximity for all letters when hovering
            targetProximity = Math.max(targetProximity, 0.2);
          }
          
          // Apply smoothing with dynamic damping
          const currentValue = letterProximities.current[index].get();
          // Use faster damping for increases, slower for decreases
          const increaseDamping = damping * 1.5;
          const decreaseDamping = damping * 0.8;
          const effectiveDamping = targetProximity > currentValue ? increaseDamping : decreaseDamping;
          
          const newValue = currentValue + (targetProximity - currentValue) * effectiveDamping;
          letterProximities.current[index].set(newValue);
        });
      }
    });

    const words = label.split(" ");
    let letterIndex = 0;

    return (
      <span
        ref={ref}
        className={`${className} inline`}
        onClick={onClick}
        {...props}
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split("").map((letter) => {
              const currentLetterIndex = letterIndex++;
              const proximity = letterProximities.current[currentLetterIndex];
              
              const transformedStyles = Object.entries(styles).reduce((acc, [key, value]) => {
                acc[key] = useTransform(proximity, [0, 1], [value.from, value.to]);
                return acc;
              }, {} as Record<string, any>);

              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={(el: HTMLSpanElement | null) => {
                    letterRefs.current[currentLetterIndex] = el;
                  }}
                  className="inline-block will-change-transform"
                  aria-hidden="true"
                  style={transformedStyles}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { 
                      duration: 0.6,
                      ease: [0.165, 0.84, 0.44, 1]
                    }
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300,
                    damping: 25,
                    mass: 1
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{label}</span>
      </span>
    );
  }
);

TextCursorProximity.displayName = "TextCursorProximity";
export default TextCursorProximity; 