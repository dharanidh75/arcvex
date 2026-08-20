import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { cn } from '../lib/utils';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [hoverState, setHoverState] = useState({ active: false, text: '' });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Fast tracking for cursor
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    let activeMagneticElement = null;

    const onMouseMove = (e) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      if (activeMagneticElement) {
        const rect = activeMagneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        
        // Strength of magnetic pull for cursor (0.5 means it moves halfway towards the center)
        const strength = parseFloat(activeMagneticElement.dataset.magneticCursorStrength) || 0.5;
        
        targetX = e.clientX - (distX * strength);
        targetY = e.clientY - (distY * strength);

        // Move the element itself slightly
        const elStrength = parseFloat(activeMagneticElement.dataset.magneticElementStrength) || 0.2;
        gsap.to(activeMagneticElement, {
          x: distX * elStrength,
          y: distY * elStrength,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      xTo(targetX);
      yTo(targetY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const magneticEl = target.closest('.magnetic');
      
      if (magneticEl) {
        activeMagneticElement = magneticEl;
        const text = magneticEl.dataset.cursorText || '';
        setHoverState({ active: true, text });
      } else {
        if (activeMagneticElement) {
          gsap.to(activeMagneticElement, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        }
        activeMagneticElement = null;
        setHoverState({ active: false, text: '' });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={cn(
        "fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
        hoverState.active 
          ? hoverState.text ? "scale-[5] bg-accent mix-blend-normal" : "scale-[3] bg-accent mix-blend-difference"
          : "scale-100 bg-accent mix-blend-difference"
      )}
    >
      <div 
        ref={cursorTextRef}
        className={cn(
          "text-[3px] text-accent-foreground opacity-0 transition-opacity duration-300 font-bold uppercase tracking-widest",
          hoverState.text ? "opacity-100" : "opacity-0"
        )}
      >
        {hoverState.text}
      </div>
    </div>
  );
}
