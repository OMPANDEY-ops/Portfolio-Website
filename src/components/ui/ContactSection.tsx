'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Download } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-[#0A0A0B] relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-8"
          >
            <p className="font-mono text-[#E31B23] mb-2 tracking-wider text-sm">// CONTACT</p>
            <h2 className="text-4xl md:text-5xl font-heading text-[#F2F2F2] font-bold mb-4">Get In Touch</h2>
            <p className="text-[#8A8A8E] font-body max-w-md">
              Whether you have a question, a project idea, or just want to say hi, my inbox is always open. Let's build something amazing together.
            </p>
          </motion.div>

          <motion.a
            href="/Om_Pandey_Resume.pdf"
            download="Om_Pandey_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#E31B23] hover:bg-[#D7263D] text-[#F2F2F2] px-6 py-3 rounded font-heading font-semibold transition-colors mb-12 shadow-[0_0_15px_rgba(227,27,35,0.4)]"
          >
            <Download size={20} />
            Download Resume (PDF)
          </motion.a>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.a
            href="mailto:ompandey1811@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#121214] p-6 rounded-lg border border-white/5 hover:border-[#E31B23] hover:shadow-[0_0_15px_rgba(227,27,35,0.2)] transition-all group flex flex-col items-center text-center gap-3"
          >
            <Mail size={32} className="text-[#8A8A8E] group-hover:text-[#E31B23] transition-colors" />
            <div>
              <p className="font-heading font-medium text-[#F2F2F2]">Email</p>
              <p className="text-sm text-[#8A8A8E] font-body mt-1">ompandey1811@gmail.com</p>
            </div>
          </motion.a>

          <motion.a
            href="tel:+917646964673"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#121214] p-6 rounded-lg border border-white/5 hover:border-[#E31B23] hover:shadow-[0_0_15px_rgba(227,27,35,0.2)] transition-all group flex flex-col items-center text-center gap-3"
          >
            <Phone size={32} className="text-[#8A8A8E] group-hover:text-[#E31B23] transition-colors" />
            <div>
              <p className="font-heading font-medium text-[#F2F2F2]">Phone</p>
              <p className="text-sm text-[#8A8A8E] font-body mt-1">+91 7646964673</p>
            </div>
          </motion.a>

          <motion.a
            href="https://github.com/OMPANDEY-ops"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#121214] p-6 rounded-lg border border-white/5 hover:border-[#E31B23] hover:shadow-[0_0_15px_rgba(227,27,35,0.2)] transition-all group flex flex-col items-center text-center gap-3"
          >
            <Github size={32} className="text-[#8A8A8E] group-hover:text-[#E31B23] transition-colors" />
            <div>
              <p className="font-heading font-medium text-[#F2F2F2]">GitHub</p>
              <p className="text-sm text-[#8A8A8E] font-body mt-1">OMPANDEY-ops</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/om-pandey-789756387"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#121214] p-6 rounded-lg border border-white/5 hover:border-[#E31B23] hover:shadow-[0_0_15px_rgba(227,27,35,0.2)] transition-all group flex flex-col items-center text-center gap-3"
          >
            <Linkedin size={32} className="text-[#8A8A8E] group-hover:text-[#E31B23] transition-colors" />
            <div>
              <p className="font-heading font-medium text-[#F2F2F2]">LinkedIn</p>
              <p className="text-sm text-[#8A8A8E] font-body mt-1">Om Pandey</p>
            </div>
          </motion.a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center">
        <p className="text-[#8A8A8E] font-body text-sm">
          © {new Date().getFullYear()} Om Pandey. Built with Next.js, Three.js & passion.
        </p>
      </div>
    </section>
  );
}
