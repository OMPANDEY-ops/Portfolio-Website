'use client';

type TTSOptions = {
  onStart?: () => void;
  onEnd?: () => void;
  onBoundary?: (charIndex: number) => void;
  onJawUpdate?: (value: number) => void;
};

class TTSService {
  private synth: SpeechSynthesis | null = null;
  private jawInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, options?: TTSOptions): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve();
        return;
      }

      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Softer, gentle volume and natural pitch/rate
      utterance.volume = 0.55; // Softer voice volume
      utterance.rate = 0.92;   // Natural, calm pace
      utterance.pitch = 0.95;  // Slightly warmer tone

      // Try selecting a natural English voice if available
      const voices = this.synth.getVoices();
      const preferredVoice = voices.find(
        (v) => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Guy') || v.name.includes('David') || v.name.includes('Male')))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        if (options?.onStart) options.onStart();
      };

      utterance.onend = () => {
        if (options?.onEnd) options.onEnd();
        resolve();
      };

      utterance.onerror = () => {
        if (options?.onEnd) options.onEnd();
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this.jawInterval) {
      clearInterval(this.jawInterval);
      this.jawInterval = null;
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}

export const ttsService = new TTSService();
