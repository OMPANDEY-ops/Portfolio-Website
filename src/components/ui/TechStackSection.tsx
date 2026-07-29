'use client';
import { motion } from 'framer-motion';
// import { techStack } from '@/data/verifiedData'; // Optional, using inline structure for layout accuracy as requested

const techCategories = [
  {
    name: 'Languages',
    skills: ['Python', 'Java', 'JavaScript', 'C', 'C++']
  },
  {
    name: 'AI / ML',
    skills: ['PyTorch', 'NLP (BERT/Transformer models)', 'Reinforcement Learning fundamentals']
  },
  {
    name: 'Web & Backend',
    skills: ['Next.js', 'React.js', 'Node.js', 'REST APIs', 'Flask', 'Streamlit']
  },
  {
    name: 'Cybersecurity',
    skills: ['Linux', 'Nmap', 'Burp Suite', 'VAPT', 'Solidity (basics)']
  },
  {
    name: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Docker', 'Figma', 'Tableau', 'Replit', 'Claude']
  }
];

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="py-20 bg-[#0A0A0B] relative z-10 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden border-t border-white/5">
      {/* Circuit line pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#F2F2F2 1px, transparent 1px), linear-gradient(90deg, #F2F2F2 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="font-mono text-[#E31B23] mb-2">// TECH_STACK</div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-[#F2F2F2]">Tech Stack</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#121214] border-t-2 border-[#E31B23] p-6 shadow-xl"
            >
              <h3 className="font-mono text-[#E31B23] text-sm uppercase tracking-wider mb-4 border-b border-[#7A0C13] pb-2">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 bg-[#0A0A0B] border border-[#2A2A2E] text-[#F2F2F2] text-sm font-body hover:border-[#E31B23] hover:shadow-[0_0_8px_rgba(227,27,35,0.4)] transition-all cursor-default rounded-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
