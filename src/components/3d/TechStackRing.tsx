'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const TECH_ITEMS = [
  'Python', 'JavaScript', 'React', 'Next.js', 'Node.js', 
  'PyTorch', 'Docker', 'Git', 'Linux', 'Flask'
];

export function TechStackRing() {
  const activeSection = usePortfolioStore((state: any) => state.activeSection);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  if (activeSection !== 'tech-stack') return null;

  return (
    <group ref={groupRef} position={[-1, 1.2, 0]}>
      {TECH_ITEMS.map((tech, index) => {
        const angle = (index / TECH_ITEMS.length) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isHovered = hovered === index;

        return (
          <group 
            key={tech} 
            position={[x, 0, z]} 
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(index);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHovered(null);
              }}
              position={[0, 0, -0.05]}
            >
              <planeGeometry args={[1.5, 0.5]} />
              <meshBasicMaterial 
                color="#0a0a0b" 
                transparent 
                opacity={0.7} 
                side={THREE.DoubleSide}
              />
            </mesh>
            <Text
              position={[0, 0, 0]}
              fontSize={0.2}
              font="/fonts/SpaceGrotesk-Regular.woff" // Assume standard font, or remove for default
              color={isHovered ? '#E31B23' : '#F2F2F2'}
              anchorX="center"
              anchorY="middle"
              outlineWidth={isHovered ? 0.02 : 0}
              outlineColor="#E31B23"
            >
              {tech}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
