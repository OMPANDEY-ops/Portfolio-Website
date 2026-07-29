'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePosition = useRef({ x: 0, y: 0 });
  const ringPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const animateRing = () => {
      // Lerp for smooth trailing effect
      ringPosition.current.x += (mousePosition.current.x - ringPosition.current.x) * 0.15;
      ringPosition.current.y += (mousePosition.current.y - ringPosition.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosition.current.x}px, ${ringPosition.current.y}px) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateRing);
    };

    animateRing();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#E31B23] rounded-full pointer-events-none z-[100] -ml-1 -mt-1"
        style={{ transform: 'translate(-100px, -100px)' }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-[#E31B23]/60 rounded-full pointer-events-none z-[99] transition-transform duration-75 ease-out"
        style={{ transform: 'translate(-100px, -100px) translate(-50%, -50%)' }}
      />
    </>
  );
}
