'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function LightingRig() {
  const activeSection = usePortfolioStore((state: any) => state.activeSection);
  
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);

  const colors = useMemo(() => ({
    cyberpunkAmbient: new THREE.Color('#1a1a2e'),
    amberAmbient: new THREE.Color('#2a1a0a'),
    cyberpunkDir: new THREE.Color('#ffffff'), // with red tint from light color
    amberDir: new THREE.Color('#ffb347'),
    cyberpunkRim: new THREE.Color('#e31b23'),
    amberRim: new THREE.Color('#ff8c00')
  }), []);

  useFrame((state, delta) => {
    const isLit = activeSection === 'literature';
    const targetAmbientIntensity = isLit ? 0.25 : 0.15;
    const targetAmbientColor = isLit ? colors.amberAmbient : colors.cyberpunkAmbient;
    
    const targetDirIntensity = isLit ? 1.2 : 0.8;
    const targetDirColor = isLit ? colors.amberDir : colors.cyberpunkDir;

    const targetRimIntensity = isLit ? 0.5 : 2.0;
    const targetRimColor = isLit ? colors.amberRim : colors.cyberpunkRim;

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbientIntensity, delta * 2);
      ambientRef.current.color.lerp(targetAmbientColor, delta * 2);
    }

    if (dirLightRef.current) {
      dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, targetDirIntensity, delta * 2);
      dirLightRef.current.color.lerp(targetDirColor, delta * 2);
    }

    if (rimLightRef.current) {
      rimLightRef.current.intensity = THREE.MathUtils.lerp(rimLightRef.current.intensity, targetRimIntensity, delta * 2);
      rimLightRef.current.color.lerp(targetRimColor, delta * 2);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.15} color="#1a1a2e" />
      <directionalLight
        ref={dirLightRef}
        position={[2, 5, 2]}
        intensity={0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        ref={rimLightRef}
        position={[-2, 1, -2]}
        intensity={2.0}
        color="#e31b23"
        distance={10}
      />
      <spotLight
        position={[0, 5, 0]}
        intensity={0.5}
        angle={0.5}
        penumbra={0.5}
        color="#ffffff"
        castShadow
      />
    </>
  );
}
