'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { avatarSpeechLines } from '@/data/verifiedData';
import { ttsService } from '@/services/ttsService';
import type { ActiveSection } from '@/types/portfolio';

const SECTION_IDS: ActiveSection[] = ['home', 'about', 'tech-stack', 'projects', 'certifications', 'literature', 'contact'];

export default function SectionObserver() {
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);
  const setSpeaking = usePortfolioStore((s) => s.setSpeaking);
  const setHasSpokenOnce = usePortfolioStore((s) => s.setHasSpokenOnce);
  const isMuted = usePortfolioStore((s) => s.isMuted);
  const isLoaded = usePortfolioStore((s) => s.isLoaded);

  const spokenSections = useRef<Set<string>>(new Set());
  const lastSection = useRef<string>('home');

  const speakForSection = useCallback((section: ActiveSection) => {
    if (spokenSections.current.has(section)) return;

    const line = avatarSpeechLines.find((l) => l.section === section);
    if (!line) return;

    spokenSections.current.add(section);
    setHasSpokenOnce(true);

    if (!isMuted) {
      ttsService.stop();
      setSpeaking(true);
      ttsService.speak(line.text, {
        onStart: () => setSpeaking(true),
        onEnd: () => {
          setSpeaking(false);
        },
      });
    }
  }, [isMuted, setHasSpokenOnce, setSpeaking]);

  useEffect(() => {
    if (!isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id as ActiveSection;
            if (SECTION_IDS.includes(sectionId) && sectionId !== lastSection.current) {
              lastSection.current = sectionId;
              setActiveSection(sectionId);

              // Trigger softer speech voiceover for section
              speakForSection(sectionId);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Speak hero intro after short delay
    const introTimeout = setTimeout(() => {
      speakForSection('home');
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(introTimeout);
    };
  }, [isLoaded, setActiveSection, speakForSection]);

  return null;
}
