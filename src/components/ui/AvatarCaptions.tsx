'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { ttsService } from '@/services/ttsService';
import { avatarSpeechLines } from '@/data/verifiedData';

export default function AvatarCaptions() {
  const isMuted = usePortfolioStore((s) => s.isMuted);
  const toggleMute = usePortfolioStore((s) => s.toggleMute);
  const activeSection = usePortfolioStore((s) => s.activeSection);
  const setSpeaking = usePortfolioStore((s) => s.setSpeaking);
  const setHasSpokenOnce = usePortfolioStore((s) => s.setHasSpokenOnce);

  const handleReplay = () => {
    const line = avatarSpeechLines.find((l) => l.section === activeSection);
    if (!line) return;

    setHasSpokenOnce(true);

    if (!isMuted) {
      setSpeaking(true);
      ttsService.speak(line.text, {
        onStart: () => setSpeaking(true),
        onEnd: () => {
          setSpeaking(false);
        },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0A0A0B]/90 backdrop-blur-md p-2 rounded-full border border-[#E31B23]/40 shadow-[0_0_20px_rgba(227,27,35,0.25)]"
    >
      {/* Replay Voiceover Button */}
      <button
        onClick={handleReplay}
        className="p-2.5 rounded-full bg-[#121214] text-[#8A8A8E] hover:text-[#E31B23] hover:bg-[#7A0C13]/20 transition-all duration-300"
        aria-label="Replay section voiceover"
        title="Replay voiceover"
      >
        <RotateCcw size={16} />
      </button>

      {/* Mute / Unmute Audio Toggle */}
      <button
        onClick={toggleMute}
        className={`p-2.5 rounded-full transition-all duration-300 ${
          isMuted
            ? 'bg-[#121214] text-[#8A8A8E] hover:text-[#E31B23]'
            : 'bg-[#E31B23] text-white shadow-[0_0_12px_rgba(227,27,35,0.5)]'
        }`}
        aria-label={isMuted ? 'Unmute voiceover' : 'Mute voiceover'}
        title={isMuted ? 'Unmute voiceover' : 'Mute voiceover'}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </motion.div>
  );
}
