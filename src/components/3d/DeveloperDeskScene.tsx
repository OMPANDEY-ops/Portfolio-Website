'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function DeveloperDeskScene() {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);
  const jawRef = useRef<THREE.Mesh>(null);
  const screenGlowRef = useRef<THREE.PointLight>(null);

  const { pointer, viewport } = useThree();
  const isMobile = viewport.width < 5;

  // Materials
  const materials = useMemo(() => {
    return {
      skin: new THREE.MeshStandardMaterial({
        color: '#D8A47F', // Natural Indian skin tone
        roughness: 0.6,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: '#121010',
        roughness: 0.9,
      }),
      eyes: new THREE.MeshStandardMaterial({
        color: '#0D0B0A',
        roughness: 0.2,
      }),
      eyeWhite: new THREE.MeshStandardMaterial({
        color: '#F0F0F0',
      }),
      glassesFrame: new THREE.MeshStandardMaterial({
        color: '#151518',
        roughness: 0.3,
        metalness: 0.8,
      }),
      glassesLens: new THREE.MeshPhysicalMaterial({
        color: '#FFFFFF',
        transparent: true,
        opacity: 0.25,
        roughness: 0.05,
        transmission: 0.9,
        ior: 1.5,
      }),
      hoodie: new THREE.MeshStandardMaterial({
        color: '#16161A', // Dark cyberpunk hoodie
        roughness: 0.7,
      }),
      hoodieAccent: new THREE.MeshStandardMaterial({
        color: '#E31B23',
        emissive: '#E31B23',
        emissiveIntensity: 0.4,
      }),
      pants: new THREE.MeshStandardMaterial({
        color: '#1B1C22',
        roughness: 0.8,
      }),
      shoes: new THREE.MeshStandardMaterial({
        color: '#101012',
      }),

      // Desk & Computer Setup
      deskTop: new THREE.MeshStandardMaterial({
        color: '#18181C',
        roughness: 0.3,
        metalness: 0.4,
      }),
      deskLegs: new THREE.MeshStandardMaterial({
        color: '#0D0D10',
        metalness: 0.8,
        roughness: 0.2,
      }),
      chairBase: new THREE.MeshStandardMaterial({
        color: '#121215',
        roughness: 0.5,
      }),
      chairAccent: new THREE.MeshStandardMaterial({
        color: '#E31B23',
        emissive: '#E31B23',
        emissiveIntensity: 0.3,
      }),

      // Computer Monitor & Screen
      monitorBezel: new THREE.MeshStandardMaterial({
        color: '#0A0A0C',
        metalness: 0.9,
        roughness: 0.2,
      }),
      monitorScreen: new THREE.MeshBasicMaterial({
        color: '#0A0E17',
      }),
      screenCodeLine: new THREE.MeshBasicMaterial({
        color: '#E31B23',
      }),
      screenCodeLineGreen: new THREE.MeshBasicMaterial({
        color: '#00FF66',
      }),
      keyboard: new THREE.MeshStandardMaterial({
        color: '#121215',
        roughness: 0.4,
      }),
      keyboardGlow: new THREE.MeshStandardMaterial({
        color: '#E31B23',
        emissive: '#E31B23',
        emissiveIntensity: 0.6,
      }),
      pcCase: new THREE.MeshStandardMaterial({
        color: '#101014',
        metalness: 0.8,
        roughness: 0.3,
      }),
      pcRGB: new THREE.MeshStandardMaterial({
        color: '#E31B23',
        emissive: '#E31B23',
        emissiveIntensity: 1.0,
      }),
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Head tracking cursor subtly
    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -pointer.y * 0.15, 0.05);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, pointer.x * 0.25 - 0.2, 0.05);
    }

    // Typing animation on keyboard
    if (leftHandRef.current && rightHandRef.current) {
      leftHandRef.current.position.y = 0.72 + Math.sin(time * 15) * 0.008;
      rightHandRef.current.position.y = 0.72 + Math.cos(time * 17) * 0.008;
      leftHandRef.current.position.z = 0.22 + Math.cos(time * 12) * 0.004;
      rightHandRef.current.position.z = 0.22 + Math.sin(time * 14) * 0.004;
    }

    // Screen light pulse
    if (screenGlowRef.current) {
      screenGlowRef.current.intensity = 1.2 + Math.sin(time * 4) * 0.2;
    }
  });

  // Responsive desktop vs mobile positioning
  const deskPosition: [number, number, number] = isMobile ? [0, -0.9, -0.5] : [1.1, -0.5, 0];
  const deskScale: [number, number, number] = isMobile ? [0.75, 0.75, 0.75] : [0.95, 0.95, 0.95];

  return (
    <group ref={sceneGroupRef} position={deskPosition} scale={deskScale} rotation={[0, -0.35, 0]}>
      
      {/* 1. DESK / TABLE */}
      <group position={[0, 0, 0]}>
        {/* Table Top */}
        <mesh castShadow receiveShadow position={[0, 0.68, 0]}>
          <boxGeometry args={[1.6, 0.05, 0.9]} />
          <primitive object={materials.deskTop} attach="material" />
        </mesh>

        {/* Desk Legs (Metallic Frame) */}
        <mesh position={[-0.72, 0.33, -0.38]}>
          <boxGeometry args={[0.06, 0.66, 0.06]} />
          <primitive object={materials.deskLegs} attach="material" />
        </mesh>
        <mesh position={[0.72, 0.33, -0.38]}>
          <boxGeometry args={[0.06, 0.66, 0.06]} />
          <primitive object={materials.deskLegs} attach="material" />
        </mesh>
        <mesh position={[-0.72, 0.33, 0.38]}>
          <boxGeometry args={[0.06, 0.66, 0.06]} />
          <primitive object={materials.deskLegs} attach="material" />
        </mesh>
        <mesh position={[0.72, 0.33, 0.38]}>
          <boxGeometry args={[0.06, 0.66, 0.06]} />
          <primitive object={materials.deskLegs} attach="material" />
        </mesh>
      </group>

      {/* 2. COMPUTER SETUP (Curved Ultrawide Monitor, Keyboard, Mouse, PC Tower) */}
      <group position={[0, 0.705, -0.15]}>
        {/* Monitor Stand Base */}
        <mesh position={[0, 0.01, -0.1]}>
          <boxGeometry args={[0.22, 0.015, 0.16]} />
          <primitive object={materials.deskLegs} attach="material" />
        </mesh>
        <mesh position={[0, 0.18, -0.15]}>
          <boxGeometry args={[0.04, 0.35, 0.04]} />
          <primitive object={materials.deskLegs} attach="material" />
        </mesh>

        {/* Monitor Bezel */}
        <mesh position={[0, 0.32, -0.12]} castShadow>
          <boxGeometry args={[0.95, 0.52, 0.03]} />
          <primitive object={materials.monitorBezel} attach="material" />
        </mesh>
        {/* Monitor Screen Surface */}
        <mesh position={[0, 0.32, -0.104]}>
          <planeGeometry args={[0.91, 0.48]} />
          <primitive object={materials.monitorScreen} attach="material" />
        </mesh>

        {/* Cyberpunk Code Lines on Screen */}
        <group position={[-0.4, 0.48, -0.102]}>
          <mesh position={[0, 0, 0]}>
            <planeGeometry args={[0.25, 0.015]} />
            <primitive object={materials.screenCodeLineGreen} attach="material" />
          </mesh>
          <mesh position={[0.1, -0.04, 0]}>
            <planeGeometry args={[0.4, 0.012]} />
            <primitive object={materials.screenCodeLine} attach="material" />
          </mesh>
          <mesh position={[0.15, -0.08, 0]}>
            <planeGeometry args={[0.3, 0.012]} />
            <primitive object={materials.screenCodeLineGreen} attach="material" />
          </mesh>
          <mesh position={[0.05, -0.12, 0]}>
            <planeGeometry args={[0.45, 0.012]} />
            <primitive object={materials.screenCodeLine} attach="material" />
          </mesh>
          <mesh position={[0.2, -0.16, 0]}>
            <planeGeometry args={[0.25, 0.012]} />
            <primitive object={materials.screenCodeLineGreen} attach="material" />
          </mesh>
          <mesh position={[0.08, -0.20, 0]}>
            <planeGeometry args={[0.35, 0.012]} />
            <primitive object={materials.screenCodeLine} attach="material" />
          </mesh>
          <mesh position={[0.12, -0.24, 0]}>
            <planeGeometry args={[0.4, 0.012]} />
            <primitive object={materials.screenCodeLineGreen} attach="material" />
          </mesh>
        </group>

        {/* Screen Light Casting Glow onto Character */}
        <pointLight
          ref={screenGlowRef}
          position={[0, 0.35, 0.1]}
          color="#E31B23"
          intensity={1.2}
          distance={2.5}
        />

        {/* Mechanical Keyboard */}
        <mesh position={[0, 0.015, 0.32]} castShadow>
          <boxGeometry args={[0.42, 0.018, 0.14]} />
          <primitive object={materials.keyboard} attach="material" />
        </mesh>
        <mesh position={[0, 0.025, 0.32]}>
          <boxGeometry args={[0.38, 0.005, 0.11]} />
          <primitive object={materials.keyboardGlow} attach="material" />
        </mesh>

        {/* Mouse */}
        <mesh position={[0.3, 0.02, 0.34]}>
          <boxGeometry args={[0.06, 0.025, 0.1]} />
          <primitive object={materials.keyboard} attach="material" />
        </mesh>

        {/* PC Tower Case on Right Side */}
        <group position={[0.62, 0.22, 0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.44, 0.42]} />
            <primitive object={materials.pcCase} attach="material" />
          </mesh>
          {/* Glass Side Panel & RGB Lighting */}
          <mesh position={[-0.111, 0, 0]}>
            <planeGeometry args={[0.4, 0.4]} />
            <primitive object={materials.pcRGB} attach="material" />
          </mesh>
        </group>
      </group>

      {/* 3. ERGONOMIC GAMING / OFFICE CHAIR */}
      <group position={[0, 0, 0.42]}>
        {/* Chair Base Wheels */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.03, 16]} />
          <primitive object={materials.chairBase} attach="material" />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.32, 16]} />
          <primitive object={materials.deskLegs} attach="material" />
        </mesh>

        {/* Chair Seat Cushion */}
        <mesh position={[0, 0.38, 0]} castShadow>
          <boxGeometry args={[0.46, 0.07, 0.46]} />
          <primitive object={materials.chairBase} attach="material" />
        </mesh>
        <mesh position={[0, 0.38, 0.215]}>
          <boxGeometry args={[0.44, 0.075, 0.02]} />
          <primitive object={materials.chairAccent} attach="material" />
        </mesh>

        {/* Chair Backrest */}
        <mesh position={[0, 0.72, 0.22]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.44, 0.62, 0.06]} />
          <primitive object={materials.chairBase} attach="material" />
        </mesh>
        <mesh position={[0, 0.72, 0.25]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.08, 0.58, 0.02]} />
          <primitive object={materials.chairAccent} attach="material" />
        </mesh>
      </group>

      {/* 4. GUY SITTING & DOING WORK ON COMPUTER */}
      <group position={[0, 0.36, 0.36]}>
        {/* LEGS (SITTING POSITION) */}
        {/* Left Thigh (Horizontal forward) */}
        <mesh position={[-0.14, 0.04, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.06, 0.36, 16]} />
          <primitive object={materials.pants} attach="material" />
        </mesh>
        {/* Left Shin (Vertical down) */}
        <mesh position={[-0.14, -0.18, -0.32]}>
          <cylinderGeometry args={[0.06, 0.05, 0.36, 16]} />
          <primitive object={materials.pants} attach="material" />
        </mesh>

        {/* Right Thigh (Horizontal forward) */}
        <mesh position={[0.14, 0.04, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.06, 0.36, 16]} />
          <primitive object={materials.pants} attach="material" />
        </mesh>
        {/* Right Shin (Vertical down) */}
        <mesh position={[0.14, -0.18, -0.32]}>
          <cylinderGeometry args={[0.06, 0.05, 0.36, 16]} />
          <primitive object={materials.pants} attach="material" />
        </mesh>

        {/* TORSO & HOODIE */}
        <group position={[0, 0.32, 0.02]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.2, 0.18, 0.48, 16]} />
            <primitive object={materials.hoodie} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0.185]}>
            <boxGeometry args={[0.02, 0.46, 0.01]} />
            <primitive object={materials.hoodieAccent} attach="material" />
          </mesh>
        </group>

        {/* ARMS & HANDS (EXTENDED TO KEYBOARD / TYPING) */}
        {/* Left Arm extended forward */}
        <group position={[-0.22, 0.48, 0]}>
          <mesh position={[0, -0.1, -0.1]} rotation={[0.8, 0.2, 0]}>
            <cylinderGeometry args={[0.055, 0.045, 0.28, 16]} />
            <primitive object={materials.hoodie} attach="material" />
          </mesh>
          <group ref={leftHandRef} position={[-0.02, -0.18, -0.22]}>
            <mesh castShadow>
              <boxGeometry args={[0.06, 0.03, 0.08]} />
              <primitive object={materials.skin} attach="material" />
            </mesh>
          </group>
        </group>

        {/* Right Arm extended forward */}
        <group position={[0.22, 0.48, 0]}>
          <mesh position={[0, -0.1, -0.1]} rotation={[0.8, -0.2, 0]}>
            <cylinderGeometry args={[0.055, 0.045, 0.28, 16]} />
            <primitive object={materials.hoodie} attach="material" />
          </mesh>
          <group ref={rightHandRef} position={[0.02, -0.18, -0.22]}>
            <mesh castShadow>
              <boxGeometry args={[0.06, 0.03, 0.08]} />
              <primitive object={materials.skin} attach="material" />
            </mesh>
          </group>
        </group>

        {/* HEAD, FACE & SPECS (WEARING GLASSES) */}
        <group ref={headRef} position={[0, 0.68, 0]}>
          {/* Neck */}
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.05, 0.06, 0.08, 16]} />
            <primitive object={materials.skin} attach="material" />
          </mesh>

          {/* Head Base */}
          <mesh castShadow position={[0, 0.05, 0]}>
            <sphereGeometry args={[0.135, 32, 32]} />
            <primitive object={materials.skin} attach="material" />
          </mesh>

          {/* Jaw */}
          <mesh ref={jawRef} position={[0, -0.09, 0.02]}>
            <boxGeometry args={[0.1, 0.04, 0.11]} />
            <primitive object={materials.skin} attach="material" />
          </mesh>

          {/* Eyes & Irises */}
          <group position={[0, 0.04, 0.118]}>
            <mesh position={[-0.042, 0, 0]}>
              <sphereGeometry args={[0.015, 16, 16]} />
              <primitive object={materials.eyeWhite} attach="material" />
            </mesh>
            <mesh position={[-0.042, 0, 0.01]}>
              <sphereGeometry args={[0.008, 16, 16]} />
              <primitive object={materials.eyes} attach="material" />
            </mesh>

            <mesh position={[0.042, 0, 0]}>
              <sphereGeometry args={[0.015, 16, 16]} />
              <primitive object={materials.eyeWhite} attach="material" />
            </mesh>
            <mesh position={[0.042, 0, 0.01]}>
              <sphereGeometry args={[0.008, 16, 16]} />
              <primitive object={materials.eyes} attach="material" />
            </mesh>
          </group>

          {/* Hair */}
          <group position={[0, 0.12, -0.01]}>
            <mesh castShadow>
              <sphereGeometry args={[0.136, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
              <primitive object={materials.hair} attach="material" />
            </mesh>
            <mesh position={[0, 0.01, 0.11]} rotation={[0.3, 0, 0]}>
              <boxGeometry args={[0.11, 0.035, 0.035]} />
              <primitive object={materials.hair} attach="material" />
            </mesh>
          </group>

          {/* SPECS / GLASSES (WEARING GLASSES) */}
          <group position={[0, 0.038, 0.12]}>
            {/* Left Lens Frame */}
            <mesh position={[-0.044, 0, 0]}>
              <boxGeometry args={[0.046, 0.034, 0.008]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>
            <mesh position={[-0.044, 0, 0.001]}>
              <planeGeometry args={[0.04, 0.028]} />
              <primitive object={materials.glassesLens} attach="material" />
            </mesh>

            {/* Right Lens Frame */}
            <mesh position={[0.044, 0, 0]}>
              <boxGeometry args={[0.046, 0.034, 0.008]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>
            <mesh position={[0.044, 0, 0.001]}>
              <planeGeometry args={[0.04, 0.028]} />
              <primitive object={materials.glassesLens} attach="material" />
            </mesh>

            {/* Nose Bridge */}
            <mesh position={[0, 0.01, 0]}>
              <boxGeometry args={[0.042, 0.005, 0.008]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>

            {/* Frame Temples going back */}
            <mesh position={[-0.068, 0.005, -0.06]} rotation={[0, 0.2, 0]}>
              <boxGeometry args={[0.006, 0.008, 0.11]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>
            <mesh position={[0.068, 0.005, -0.06]} rotation={[0, -0.2, 0]}>
              <boxGeometry args={[0.006, 0.008, 0.11]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
