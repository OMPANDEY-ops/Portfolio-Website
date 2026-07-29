'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users } from 'lucide-react';

export default function LiteratureSection() {
  return (
    <section id="literature" className="py-20 bg-[#100c0b] relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <p className="font-mono text-[#D75C26] mb-2 tracking-wider text-sm">// LITERATURE_&_ACTIVITIES</p>
          <h2 className="text-4xl md:text-5xl font-heading text-[#F2F2F2] font-bold">Literature & Activities</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-[#181211] border border-[#D75C26]/20 p-8 rounded-lg hover:border-[#D75C26]/60 transition-colors shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#D75C26]/10 p-4 rounded-full border border-[#D75C26]/30">
                <Users size={28} className="text-[#D75C26]" />
              </div>
              <div>
                <h3 className="text-xl font-heading text-[#F2F2F2] font-semibold">Core Member</h3>
                <p className="text-[#8A8A8E] text-sm">SOA Official CodingNinjas 10X on Campus</p>
                <p className="text-[#D75C26] font-mono text-xs mt-1">Feb 2026 – Present</p>
              </div>
            </div>
            <p className="text-[#8A8A8E] font-body leading-relaxed">
              Mentored 500+ students in competitive programming and development, and collaborated with fellow club members on multiple projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="bg-[#181211] border border-[#D75C26]/20 p-8 rounded-lg hover:border-[#D75C26]/60 transition-colors shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#D75C26]/10 p-4 rounded-full border border-[#D75C26]/30">
                <BookOpen size={28} className="text-[#D75C26]" />
              </div>
              <div>
                <h3 className="text-xl font-heading text-[#F2F2F2] font-semibold">Media Head</h3>
                <p className="text-[#8A8A8E] text-sm">SOA Literary Club</p>
                <p className="text-[#D75C26] font-mono text-xs mt-1">Jun 2025 – Present</p>
              </div>
            </div>
            <p className="text-[#8A8A8E] font-body leading-relaxed">
              Public speaker, creative and content writer, and literature enthusiast. Core skills: public speaking, event management, public relations, and creative and content writing.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
