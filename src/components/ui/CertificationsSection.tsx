'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Database, Monitor, Cpu } from 'lucide-react';

const certifications = [
  {
    name: 'Getting Started with AI',
    issuer: 'IBM SkillsBuild',
    date: 'Mar 2026',
    icon: <Cpu size={24} className="text-[#E31B23]" />
  },
  {
    name: 'Technology Job Simulation',
    issuer: 'Deloitte (Forage)',
    date: 'Jul 2025',
    icon: <Monitor size={24} className="text-[#E31B23]" />
  },
  {
    name: 'Data Analytics Job Simulation',
    issuer: 'Deloitte (Forage)',
    date: 'Jul 2025',
    icon: <Database size={24} className="text-[#E31B23]" />
  },
  {
    name: 'Cybersecurity Job Simulation',
    issuer: 'Deloitte (Forage)',
    date: 'Jul 2025',
    icon: <Shield size={24} className="text-[#E31B23]" />
  },
  {
    name: 'NCC \'A\' Certificate',
    issuer: 'NCC GP HQ, Raipur',
    date: 'Jan 2021',
    icon: <Award size={24} className="text-[#E31B23]" />
  }
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-[#0A0A0B] relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12"
        >
          <p className="font-mono text-[#E31B23] mb-2 tracking-wider text-sm">// CERTIFICATIONS</p>
          <h2 className="text-4xl md:text-5xl font-heading text-[#F2F2F2] font-bold">Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
              className="bg-[#121214] p-6 rounded-lg border border-white/5 hover:border-[#E31B23]/50 transition-colors flex items-start gap-4"
            >
              <div className="bg-[#E31B23]/10 p-3 rounded-md border border-[#E31B23]/20 shrink-0">
                {cert.icon}
              </div>
              <div>
                <h3 className="text-lg font-heading text-[#F2F2F2] font-semibold mb-1 leading-tight">{cert.name}</h3>
                <p className="text-[#8A8A8E] text-sm font-body mb-2">{cert.issuer}</p>
                <p className="text-xs font-mono text-[#E31B23]">{cert.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
