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
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      // Basic jaw movement simulation
      const simulateJaw = () => {
        if (options?.onJawUpdate) {
          // Random amplitude between 0.1 and 1.0 when speaking
          const amplitude = Math.random() * 0.9 + 0.1;
          options.onJawUpdate(amplitude);
        }
      };

      utterance.onstart = () => {
        if (options?.onStart) options.onStart();
        if (options?.onJawUpdate) {
          this.jawInterval = setInterval(simulateJaw, 150); // Update jaw every 150ms
        }
      };

      utterance.onend = () => {
        this.stopJawSimulation(options);
        if (options?.onEnd) options.onEnd();
        resolve();
      };

      utterance.onerror = () => {
        this.stopJawSimulation(options);
        if (options?.onEnd) options.onEnd();
        resolve();
      };

      utterance.onboundary = (event) => {
        if (options?.onBoundary) {
          options.onBoundary(event.charIndex);
        }
        // Force a larger jaw movement on word boundary
        if (options?.onJawUpdate) {
          options.onJawUpdate(Math.random() * 0.5 + 0.5);
        }
      };

      this.synth.speak(utterance);
    });
  }

  private stopJawSimulation(options?: TTSOptions) {
    if (this.jawInterval) {
      clearInterval(this.jawInterval);
      this.jawInterval = null;
    }
    if (options?.onJawUpdate) {
      options.onJawUpdate(0); // Close mouth
    }
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
