'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import { ParticleField } from './ParticleField';
import { LightingRig } from './LightingRig';
import { DeveloperDeskScene } from './DeveloperDeskScene';
import { TechStackRing } from './TechStackRing';
import { usePortfolioStore } from '@/store/usePortfolioStore';

class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('WebGL Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full bg-[#0A0A0B] flex items-center justify-center text-[#E31B23] font-mono">
          <p>WebGL Context Lost or Error Occurred.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ClientCanvas() {
  const activeSection = usePortfolioStore((state: any) => state.activeSection);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <WebGLErrorBoundary>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 1.2, 4.5], fov: 48 }}
          gl={{ antialias: true, alpha: true }}
          style={{ pointerEvents: 'auto' }}
        >
          <Suspense fallback={null}>
            <AdaptiveDpr pixelated />
            <Preload all />
            
            <fog attach="fog" args={['#0A0A0B', 6, 16]} />
            
            <LightingRig />
            <ParticleField />
            
            {/* Developer Desk Scene: Guy wearing specs sitting at table & computer */}
            <DeveloperDeskScene />
            
            {activeSection === 'tech-stack' && <TechStackRing />}
            
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
