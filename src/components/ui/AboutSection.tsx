'use client';
import { motion } from 'framer-motion';

const education = [
  {
    id: 1,
    school: 'SOA University',
    degree: 'B.Tech CSE (Cybersecurity)',
    year: '2024–2028',
    detail: 'CGPA 7.89 — Bhubaneswar'
  },
  {
    id: 2,
    school: 'KV B.M.Y Bhilai',
    degree: 'CBSE XII',
    year: '2023–2024',
    detail: '78.2%'
  },
  {
    id: 3,
    school: 'KV B.M.Y Bhilai',
    degree: 'CBSE X',
    year: '2021–2022',
    detail: '86%'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#0A0A0B] relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="font-mono text-[#E31B23] mb-2">// ABOUT</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#F2F2F2]">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="font-body text-[#F2F2F2] leading-relaxed text-lg">
              I'm a Computer Science undergraduate specializing in Cybersecurity at Siksha 'O' Anusandhan University, Bhubaneswar. My focus is on building practical AI/ML applications and full-stack web systems, while grounding everything in a strong security-first mindset from my cybersecurity coursework.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative pl-6 border-l border-[#7A0C13]"
          >
            <div className="space-y-8">
              {education.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                  className="relative bg-[#121214] p-5 border-l-2 border-[#E31B23] hover:-translate-y-1 transition-transform group"
                >
                  <div className="absolute -left-[31px] top-5 w-3 h-3 rounded-full bg-[#E31B23] shadow-[0_0_10px_rgba(227,27,35,0.8)]" />
                  <div className="font-mono text-xs text-[#E31B23] mb-1">{item.year}</div>
                  <h3 className="font-heading font-bold text-[#F2F2F2] text-xl mb-1">{item.school}</h3>
                  <div className="font-body text-[#8A8A8E] text-sm font-medium mb-1">{item.degree}</div>
                  <div className="font-mono text-xs text-[#F2F2F2]/60">{item.detail}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
