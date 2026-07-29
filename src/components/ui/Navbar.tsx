'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const navLinks = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Tech Stack', id: 'tech-stack' },
  { name: 'Projects', id: 'projects' },
  { name: 'Literature & Activities', id: 'literature' },
  { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const activeSection = usePortfolioStore((s) => s.activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0A0A0B]/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-[#E31B23] font-heading font-bold text-2xl tracking-tighter cursor-pointer" onClick={() => scrollToSection('home')}>
          OM.
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative group font-mono text-sm text-[#8A8A8E] hover:text-[#F2F2F2] transition-colors"
            >
              {link.name}
              <span 
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#E31B23] transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
          <a 
            href="/Om_Pandey_Resume.pdf"
            download="Om_Pandey_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#E31B23] text-[#F2F2F2] font-mono text-sm px-4 py-2 hover:bg-[#E31B23]/10 transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#F2F2F2] p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-current transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`h-0.5 w-full bg-current transition duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-current transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 top-[72px] bg-[#0A0A0B] z-40 flex flex-col px-6 py-8 space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left font-mono text-lg ${
                  activeSection === link.id ? 'text-[#F2F2F2]' : 'text-[#8A8A8E]'
                }`}
              >
                {link.name}
              </button>
            ))}
            <a 
              href="/Om_Pandey_Resume.pdf"
              download="Om_Pandey_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#E31B23] text-[#F2F2F2] font-mono text-center px-4 py-3 mt-4"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
