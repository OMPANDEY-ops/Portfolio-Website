'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function MovableWorkstationPanel() {
  const activeSection = usePortfolioStore((s) => s.activeSection);

  // Dynamic layout, position, and rotation per active section
  const getSectionStyles = () => {
    switch (activeSection) {
      case 'home':
        return {
          top: '22%',
          right: '6%',
          left: 'auto',
          width: 'min(440px, 42vw)',
          borderColor: '#E31B23',
          glowColor: 'rgba(227, 27, 35, 0.45)',
          badge: '// DEV_SESSION_ACTIVE',
          rotateY: -4,
          rotateX: 2,
          scale: 1,
        };
      case 'about':
        return {
          top: '28%',
          right: '5%',
          left: 'auto',
          width: 'min(380px, 38vw)',
          borderColor: '#E31B23',
          glowColor: 'rgba(227, 27, 35, 0.35)',
          badge: '// BIOGRAPHY_PROFILE',
          rotateY: -8,
          rotateX: 4,
          scale: 0.94,
        };
      case 'tech-stack':
        return {
          top: '22%',
          left: '5%',
          right: 'auto',
          width: 'min(390px, 38vw)',
          borderColor: '#D7263D',
          glowColor: 'rgba(215, 38, 61, 0.45)',
          badge: '// TECH_STACK_LABS',
          rotateY: 8,
          rotateX: -3,
          scale: 0.95,
        };
      case 'projects':
        return {
          top: '18%',
          right: '4%',
          left: 'auto',
          width: 'min(370px, 36vw)',
          borderColor: '#E31B23',
          glowColor: 'rgba(227, 27, 35, 0.45)',
          badge: '// PROJ_SHOWCASE_VIEW',
          rotateY: -10,
          rotateX: 5,
          scale: 0.9,
        };
      case 'certifications':
        return {
          top: '24%',
          right: '6%',
          left: 'auto',
          width: 'min(360px, 35vw)',
          borderColor: '#7A0C13',
          glowColor: 'rgba(122, 12, 19, 0.55)',
          badge: '// CREDENTIALS_AUDIT',
          rotateY: 6,
          rotateX: -4,
          scale: 0.88,
        };
      case 'literature':
        return {
          top: '24%',
          left: '5%',
          right: 'auto',
          width: 'min(410px, 40vw)',
          borderColor: '#D75C26',
          glowColor: 'rgba(215, 92, 38, 0.55)',
          badge: '// LITERARY_&_MEDIA_HEAD',
          rotateY: 8,
          rotateX: 3,
          scale: 0.98,
        };
      case 'contact':
        return {
          top: '28%',
          left: '6%',
          right: 'auto',
          width: 'min(390px, 38vw)',
          borderColor: '#E31B23',
          glowColor: 'rgba(227, 27, 35, 0.5)',
          badge: '// DIRECT_CONTACT_ACTIVE',
          rotateY: -6,
          rotateX: 0,
          scale: 0.95,
        };
      default:
        return {
          top: '22%',
          right: '6%',
          left: 'auto',
          width: 'min(420px, 40vw)',
          borderColor: '#E31B23',
          glowColor: 'rgba(227, 27, 35, 0.45)',
          badge: '// DEV_SESSION_ACTIVE',
          rotateY: 0,
          rotateX: 0,
          scale: 1,
        };
    }
  };

  const style = getSectionStyles();

  return (
    <div className="hidden lg:block pointer-events-none z-30">
      <motion.div
        animate={{
          top: style.top,
          left: style.left,
          right: style.right,
          scale: style.scale,
          rotateY: style.rotateY,
          rotateX: style.rotateX,
          y: [0, -8, 0],
        }}
        transition={{
          top: { type: 'spring', stiffness: 50, damping: 15 },
          left: { type: 'spring', stiffness: 50, damping: 15 },
          right: { type: 'spring', stiffness: 50, damping: 15 },
          scale: { duration: 0.5 },
          rotateY: { duration: 0.6 },
          rotateX: { duration: 0.6 },
          y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
        }}
        style={{
          position: 'fixed',
          perspective: 1000,
        }}
        className="group pointer-events-auto"
      >
        {/* Floating Ambient Glow Effect */}
        <div
          className="absolute -inset-2 rounded-2xl blur-xl opacity-60 transition-all duration-700"
          style={{ backgroundColor: style.glowColor }}
        />

        {/* Movable Workstation Photo Frame */}
        <div
          className="relative rounded-2xl overflow-hidden bg-[#121214] transition-all duration-500 shadow-2xl"
          style={{
            width: style.width,
            border: `1.5px solid ${style.borderColor}`,
            boxShadow: `0 0 40px ${style.glowColor}`,
          }}
        >
          {/* Animated HUD Badge */}
          <div
            className="absolute top-3 left-3 z-20 bg-[#0A0A0B]/85 backdrop-blur-md px-3 py-1 rounded border font-mono text-[10px] flex items-center gap-2 transition-colors duration-500"
            style={{
              borderColor: style.borderColor,
              color: style.borderColor,
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: style.borderColor }}
            />
            <span>{style.badge}</span>
          </div>

          {/* Real Workstation Photo */}
          <img
            src="/om-hero.jpg"
            alt="Om Pandey working at workstation"
            className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-[1.03]"
          />

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/90 via-transparent to-transparent pointer-events-none" />

          {/* Live Status Footbar */}
          <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-center font-mono text-[9.5px] text-[#8A8A8E] z-10">
            <span>SYS_LOC: RAIPUR</span>
            <span style={{ color: style.borderColor }}>{activeSection.toUpperCase()}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
