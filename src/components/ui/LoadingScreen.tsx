'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const loadingLines = [
  '> INITIALIZING_PORTFOLIO...',
  '> LOADING_3D_ASSETS...',
  '> COMPILING_PROJECTS...',
  '> ESTABLISHING_CONNECTION...',
  '> SYSTEM_READY',
];

export default function LoadingScreen() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const setStoreLoaded = usePortfolioStore((s) => s.setLoaded);
  const setLoadingProgress = usePortfolioStore((s) => s.setLoadingProgress);

  useEffect(() => {
    // Simulate loading process
    const intervalTime = 3000 / loadingLines.length; // Spread across 3 seconds

    const lineInterval = setInterval(() => {
      setCurrentLineIndex((prev) => {
        if (prev < loadingLines.length - 1) return prev + 1;
        clearInterval(lineInterval);
        return prev;
      });
    }, intervalTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsLoaded(true);
            setStoreLoaded(true);
          }, 500); // Small delay before hiding
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-[#0A0A0B] flex flex-col items-center justify-center p-6"
        >
          <div className="w-full max-w-md">
            <div className="font-mono text-[#E31B23] text-sm md:text-base mb-8 space-y-2">
              {loadingLines.slice(0, currentLineIndex + 1).map((line, index) => (
                <div key={index} className="flex items-center">
                  <span>{line}</span>
                  {index === currentLineIndex && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-4 bg-[#E31B23] ml-2"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="w-full h-1 bg-[#121214] rounded overflow-hidden">
              <motion.div
                className="h-full bg-[#E31B23]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-2 text-right text-xs font-mono text-[#8A8A8E]">
              {Math.floor(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
