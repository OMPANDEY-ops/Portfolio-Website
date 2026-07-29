'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function DeskEnvironment() {
  const activeSection = usePortfolioStore((state: any) => state.activeSection);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (activeSection === 'literature') {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 3);
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), delta * 3);
      }
    }
  });

  return (
    <group ref={groupRef} position={[-0.5, 0, 0]} scale={[0, 0, 0]}>
      {/* Desk top */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.05, 0.8]} />
        <meshStandardMaterial color="#5C3317" roughness={0.8} />
      </mesh>
      
      {/* Desk legs */}
      {[
        [-0.9, -0.3], [-0.9, 0.3], [0.9, -0.3], [0.9, 0.3]
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.35, z]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.7]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
      ))}

      {/* Lamp */}
      <group position={[-0.8, 0.725, -0.2]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.4]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        <mesh position={[0, 0.4, 0.1]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <coneGeometry args={[0.08, 0.15, 16]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <pointLight position={[0, 0.35, 0.15]} intensity={2} color="#FFB347" distance={3} />
      </group>

      {/* Books */}
      <group position={[0.6, 0.75, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[0.2, 0.05, 0.3]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <mesh position={[0.02, 0.05, 0.02]} rotation={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[0.2, 0.04, 0.28]} />
          <meshStandardMaterial color="#00008B" />
        </mesh>
        <mesh position={[-0.01, 0.1, -0.01]} rotation={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.18, 0.06, 0.26]} />
          <meshStandardMaterial color="#2E8B57" />
        </mesh>
      </group>
    </group>
  );
}
