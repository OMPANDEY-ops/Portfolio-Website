'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 pt-24 pb-16 overflow-hidden bg-[#0A0A0B]">
      {/* HUD Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(#E31B23 1px, transparent 1px), linear-gradient(90deg, #E31B23 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* Scanline Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #E31B23 2px, #E31B23 4px)'
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Hero Text & Information */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xs sm:text-sm text-[#8A8A8E] mb-3 overflow-hidden whitespace-nowrap border-r-2 border-[#E31B23] animate-pulse pr-2 w-max"
          >
            // INITIALIZING_SYSTEM...
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-[#F2F2F2] leading-none mb-3 uppercase tracking-tighter"
            style={{ textShadow: '0 0 25px rgba(227, 27, 35, 0.35)' }}
          >
            OM PANDEY
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-mono text-lg sm:text-xl md:text-2xl text-[#D7263D] mb-4 font-semibold"
          >
            Aspiring AI / GenAI Engineer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-body text-[#8A8A8E] text-base sm:text-lg mb-8 max-w-xl leading-relaxed"
          >
            Computer Science (Cybersecurity) undergraduate at SOA University, building full-stack AI/ML applications and security-first web systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a 
              href="#projects" 
              className="w-full sm:w-auto text-center bg-[#E31B23] text-[#F2F2F2] font-mono px-8 py-3.5 rounded-sm hover:bg-[#7A0C13] transition-all duration-300 shadow-[0_0_20px_rgba(227,27,35,0.4)] hover:shadow-[0_0_30px_rgba(227,27,35,0.6)] font-medium"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto text-center border border-[#E31B23] text-[#F2F2F2] font-mono px-8 py-3.5 rounded-sm hover:bg-[#E31B23]/10 transition-all duration-300 font-medium"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right Side: Real Workstation Photo Frame (VISIBLE ON ALL SCREENS) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.7, delay: 0.3 },
            scale: { duration: 0.7, delay: 0.3 },
            y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
          }}
          className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0"
        >
          <div className="relative w-full max-w-md lg:max-w-lg group">
            
            {/* Glowing Red Outer Halo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[#E31B23] to-[#7A0C13] rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition duration-500" />

            {/* Main Workstation Photo Container */}
            <div className="relative rounded-2xl overflow-hidden bg-[#121214] border-2 border-[#E31B23] shadow-[0_0_40px_rgba(227,27,35,0.4)]">
              
              {/* HUD Badge */}
              <div className="absolute top-3.5 left-3.5 z-20 bg-[#0A0A0B]/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#E31B23] font-mono text-[11px] text-[#E31B23] flex items-center gap-2 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E31B23] animate-ping" />
                <span className="font-semibold">// DEV_SESSION_ACTIVE</span>
              </div>

              {/* Workstation Photo */}
              <img
                src="/om-hero.jpg"
                alt="Om Pandey working at workstation"
                className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Vignette Shadow Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/90 via-transparent to-transparent opacity-50 pointer-events-none" />

              {/* Live Status Bar */}
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center font-mono text-[10px] text-[#8A8A8E] z-10">
                <span>SYS_LOC: RAIPUR // BHUBANESWAR</span>
                <span className="text-[#E31B23] font-bold">ONLINE</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 flex flex-col items-center justify-center relative z-10"
      >
        <span className="font-mono text-[10px] text-[#8A8A8E] tracking-widest mb-2">SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-4 h-4 border-b-2 border-r-2 border-[#E31B23] rotate-45"
        />
      </motion.div>
    </section>
  );
}
