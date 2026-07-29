'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { avatarSpeechLines } from '@/data/verifiedData';
import { ttsService } from '@/services/ttsService';
import type { ActiveSection } from '@/types/portfolio';

const SECTION_IDS: ActiveSection[] = ['home', 'about', 'tech-stack', 'projects', 'certifications', 'literature', 'contact'];

export default function SectionObserver() {
  const setActiveSection = usePortfolioStore((s) => s.setActiveSection);
  const setAvatarState = usePortfolioStore((s) => s.setAvatarState);
  const setCaption = usePortfolioStore((s) => s.setCaption);
  const setSpeaking = usePortfolioStore((s) => s.setSpeaking);
  const setJawOpenValue = usePortfolioStore((s) => s.setJawOpenValue);
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
    setCaption(line.text);
    setHasSpokenOnce(true);

    if (!isMuted) {
      ttsService.stop();
      setAvatarState('talking');
      setSpeaking(true);
      ttsService.speak(line.text, {
        onStart: () => setSpeaking(true),
        onEnd: () => {
          setSpeaking(false);
          setAvatarState(section === 'literature' ? 'seated_idle' : 'idle');
          setTimeout(() => setCaption(''), 4000);
        },
        onJawUpdate: (v: number) => setJawOpenValue(v),
      });
    } else {
      setTimeout(() => setCaption(''), 6000);
    }
  }, [isMuted, setAvatarState, setCaption, setHasSpokenOnce, setJawOpenValue, setSpeaking]);

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

              // Update avatar state based on section
              if (sectionId === 'literature') {
                setAvatarState('seated_idle');
              } else {
                setAvatarState('idle');
              }

              // Trigger speech for sections that have lines
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

    // Speak the hero intro after a short delay
    const introTimeout = setTimeout(() => {
      speakForSection('home');
      setAvatarState('waving');
      setTimeout(() => setAvatarState('idle'), 2000);
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(introTimeout);
    };
  }, [isLoaded, setActiveSection, setAvatarState, speakForSection]);

  return null;
}
