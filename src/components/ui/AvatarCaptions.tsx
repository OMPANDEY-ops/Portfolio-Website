'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { ttsService } from '@/services/ttsService';
import { avatarSpeechLines } from '@/data/verifiedData';

export default function AvatarCaptions() {
  const currentCaption = usePortfolioStore((s) => s.currentCaption);
  const isMuted = usePortfolioStore((s) => s.isMuted);
  const toggleMute = usePortfolioStore((s) => s.toggleMute);
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const hasSpokenOnce = usePortfolioStore((s) => s.hasSpokenOnce);
  const setCaption = usePortfolioStore((s) => s.setCaption);
  const setSpeaking = usePortfolioStore((s) => s.setSpeaking);
  const setJawOpenValue = usePortfolioStore((s) => s.setJawOpenValue);
  const setHasSpokenOnce = usePortfolioStore((s) => s.setHasSpokenOnce);
  const setAvatarState = usePortfolioStore((s) => s.setAvatarState);

  const handleReplay = () => {
    const line = avatarSpeechLines.find((l) => l.section === activeSection);
    if (!line) return;

    setCaption(line.text);
    setHasSpokenOnce(true);

    if (!isMuted) {
      setAvatarState('talking');
      setSpeaking(true);
      ttsService.speak(line.text, {
        onStart: () => setSpeaking(true),
        onEnd: () => {
          setSpeaking(false);
          setAvatarState('idle');
          setTimeout(() => setCaption(''), 3000);
        },
        onJawUpdate: (v) => setJawOpenValue(v),
      });
    } else {
      setTimeout(() => setCaption(''), 5000);
    }
  };

  return (
    <AnimatePresence>
      {(currentCaption || hasSpokenOnce) && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-2xl"
        >
          {currentCaption && (
            <div className="bg-[#0A0A0B]/85 backdrop-blur-md border-l-4 border-[#E31B23] rounded-r-lg px-5 py-4 shadow-2xl">
              <p className="text-[#F2F2F2] text-sm md:text-base leading-relaxed font-body">
                {currentCaption}
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              onClick={handleReplay}
              className="p-2 rounded-full bg-[#121214] border border-[#7A0C13] text-[#8A8A8E] hover:text-[#E31B23] hover:border-[#E31B23] transition-colors"
              aria-label="Replay speech"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-[#121214] border border-[#7A0C13] text-[#8A8A8E] hover:text-[#E31B23] hover:border-[#E31B23] transition-colors"
              aria-label={isMuted ? 'Unmute avatar voice' : 'Mute avatar voice'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
