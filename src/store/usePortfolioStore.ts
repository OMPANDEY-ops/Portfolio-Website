'use client';

import { create } from 'zustand';
import { ActiveSection, AvatarState } from '../types/portfolio';

interface PortfolioState {
  activeSection: ActiveSection;
  avatarState: AvatarState;
  isMuted: boolean;
  isSpeaking: boolean;
  currentCaption: string;
  hasSpokenOnce: boolean;
  isLoaded: boolean;
  loadingProgress: number;
  reducedMotion: boolean;
  activeProjectIndex: number;
  jawOpenValue: number;

  // Actions
  setActiveSection: (section: ActiveSection) => void;
  setAvatarState: (state: AvatarState) => void;
  toggleMute: () => void;
  setSpeaking: (isSpeaking: boolean) => void;
  setCaption: (caption: string) => void;
  setLoaded: (isLoaded: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  toggleReducedMotion: () => void;
  setActiveProjectIndex: (index: number) => void;
  setJawOpenValue: (value: number) => void;
  setHasSpokenOnce: (hasSpoken: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeSection: 'home',
  avatarState: 'idle',
  isMuted: false,
  isSpeaking: false,
  currentCaption: '',
  hasSpokenOnce: false,
  isLoaded: false,
  loadingProgress: 0,
  reducedMotion: false,
  activeProjectIndex: 0,
  jawOpenValue: 0,

  setActiveSection: (section) => set({ activeSection: section }),
  setAvatarState: (state) => set({ avatarState: state }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setSpeaking: (isSpeaking) => set({ isSpeaking }),
  setCaption: (currentCaption) => set({ currentCaption }),
  setLoaded: (isLoaded) => set({ isLoaded }),
  setLoadingProgress: (loadingProgress) => set({ loadingProgress }),
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
  setActiveProjectIndex: (activeProjectIndex) => set({ activeProjectIndex }),
  setJawOpenValue: (jawOpenValue) => set({ jawOpenValue }),
  setHasSpokenOnce: (hasSpokenOnce) => set({ hasSpokenOnce }),
}));
