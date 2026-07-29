'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Lock } from 'lucide-react';
import { portfolioData } from '@/data/verifiedData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 },
  },
};

export default function ProjectsSection() {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 relative z-10 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-14"
        >
          <p className="font-mono text-[#E31B23] mb-2 tracking-wider text-sm">// PROJECTS</p>
          <h2 className="text-4xl md:text-5xl font-heading text-[#F2F2F2] font-bold">Projects</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`group bg-[#121214] border-l-4 border-l-[#7A0C13] hover:border-l-[#E31B23] p-6 rounded-r-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#E31B23]/5 ${
                project.projects ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl md:text-2xl font-heading text-[#F2F2F2] font-semibold leading-tight pr-4">
                  {project.name}
                </h3>
                {project.github === null ? (
                  <span className="flex-shrink-0 flex items-center gap-1.5 text-xs font-mono bg-[#7A0C13]/20 text-[#D7263D] py-1 px-3 rounded-full border border-[#7A0C13]">
                    <Lock size={11} />
                    Private
                  </span>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-[#8A8A8E] hover:text-[#E31B23] transition-colors"
                    aria-label={`View ${project.name} on GitHub`}
                  >
                    <Github size={20} />
                  </a>
                )}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono text-[#D7263D] px-2 py-0.5 border border-[#7A0C13] rounded bg-[#7A0C13]/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-[#8A8A8E] text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Note for clone suite */}
              {project.note && (
                <p className="text-[#8A8A8E]/70 text-xs italic mb-4 border-l-2 border-[#7A0C13]/40 pl-3">
                  {project.note}
                </p>
              )}

              {/* GitHub button for non-parent, non-private */}
              {!project.projects && project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono text-[#E31B23] hover:text-[#D7263D] transition-colors group-hover:underline"
                >
                  View on GitHub <ExternalLink size={14} />
                </a>
              )}

              {/* Sub-projects for Frontend Clone Suite */}
              {project.projects && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-6">
                  {project.projects.map((sub, i) => (
                    <div
                      key={i}
                      className="bg-[#0A0A0B] p-4 rounded border border-white/5 hover:border-[#E31B23]/30 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-[#F2F2F2] font-heading font-medium text-sm">
                          {sub.name}
                        </h4>
                        <a
                          href={sub.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8A8A8E] hover:text-[#E31B23] transition-colors"
                        >
                          <Github size={14} />
                        </a>
                      </div>
                      <p className="text-[#8A8A8E] text-xs leading-relaxed mb-3">
                        {sub.description}
                      </p>
                      <a
                        href={sub.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-[#E31B23] hover:text-[#D7263D] transition-colors"
                      >
                        GitHub <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
