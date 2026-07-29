'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export function AvatarCharacter() {
  const activeSection = usePortfolioStore((state: any) => state.activeSection);
  const avatarState = usePortfolioStore((state: any) => state.avatarState);
  const jawOpenValue = usePortfolioStore((state: any) => state.jawOpenValue);

  const groupRef = useRef<THREE.Group>(null);
  const characterRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const jawRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftForearmRef = useRef<THREE.Group>(null);
  const rightForearmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const glassesRef = useRef<THREE.Group>(null);

  const { pointer } = useThree();

  // Materials for high quality human avatar
  const materials = useMemo(() => {
    return {
      skin: new THREE.MeshStandardMaterial({
        color: '#D8A47F', // Natural Indian skin tone
        roughness: 0.6,
        metalness: 0.1,
      }),
      lips: new THREE.MeshStandardMaterial({
        color: '#B87A65',
        roughness: 0.5,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: '#121010', // Dark black/brown hair
        roughness: 0.9,
      }),
      eyes: new THREE.MeshStandardMaterial({
        color: '#0D0B0A', // Dark eyes
        roughness: 0.2,
      }),
      eyeWhite: new THREE.MeshStandardMaterial({
        color: '#F0F0F0',
        roughness: 0.3,
      }),
      glassesFrame: new THREE.MeshStandardMaterial({
        color: '#151518', // Sleek dark matte frame
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
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),
      jacket: new THREE.MeshStandardMaterial({
        color: '#16161A', // Dark streetwear jacket
        roughness: 0.7,
      }),
      jacketAccent: new THREE.MeshStandardMaterial({
        color: '#E31B23', // Red zipper & stripe accents
        emissive: '#E31B23',
        emissiveIntensity: 0.3,
        roughness: 0.4,
      }),
      tshirt: new THREE.MeshStandardMaterial({
        color: '#0A0A0C', // Charcoal inner tee
        roughness: 0.8,
      }),
      pants: new THREE.MeshStandardMaterial({
        color: '#1B1C22', // Dark denim/trousers
        roughness: 0.8,
      }),
      shoes: new THREE.MeshStandardMaterial({
        color: '#101012', // Black sneakers
        roughness: 0.5,
      }),
      shoeSole: new THREE.MeshStandardMaterial({
        color: '#E31B23', // Red sole accent
        roughness: 0.4,
      }),
      platform: new THREE.MeshStandardMaterial({
        color: '#08080A',
        roughness: 0.3,
        metalness: 0.7,
      }),
      platformRing: new THREE.MeshStandardMaterial({
        color: '#E31B23',
        emissive: '#E31B23',
        emissiveIntensity: 0.8,
      }),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Target positions and rotations based on current section
    const targetPos = new THREE.Vector3();
    const targetRot = new THREE.Euler();
    let isSeated = false;

    switch (activeSection) {
      case 'home':
        targetPos.set(0, 0, 0);
        targetRot.set(0, 0, 0);
        break;

      case 'tech-stack':
        // Move to the left, turn slightly right to gesture at the tech ring
        targetPos.set(-1.3, 0, 0);
        targetRot.set(0, Math.PI / 4, 0);
        break;

      case 'projects':
        // Move to the right, turn slightly left to showcase project cards
        targetPos.set(1.3, 0, 0);
        targetRot.set(0, -Math.PI / 4, 0);
        break;

      case 'literature':
        // Move to desk position, sit down
        targetPos.set(-0.65, -0.22, 0.2);
        targetRot.set(0, Math.PI / 3.5, 0);
        isSeated = true;
        break;

      case 'contact':
        // Step forward towards camera in a welcoming posture
        targetPos.set(0, 0.05, 0.8);
        targetRot.set(0, 0, 0);
        break;

      default:
        targetPos.set(0, 0, 0);
    }

    // Smooth movement interpolation
    groupRef.current.position.lerp(targetPos, delta * 2.5);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.y, delta * 2.5);

    const time = state.clock.elapsedTime;

    // Breathing & idle body sway
    if (characterRef.current) {
      if (!isSeated) {
        characterRef.current.position.y = Math.sin(time * 2) * 0.015;
        characterRef.current.rotation.z = Math.sin(time * 1.5) * 0.01;
      } else {
        characterRef.current.position.y = Math.sin(time * 1.5) * 0.005;
        characterRef.current.rotation.z = 0;
      }
    }

    // Head tracking mouse cursor
    if (headRef.current) {
      const targetHeadX = pointer.y * 0.35;
      const targetHeadY = pointer.x * 0.45;
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetHeadX, delta * 4);
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetHeadY, delta * 4);
    }

    // Arm Gestures per section & state
    if (rightArmRef.current && leftArmRef.current && rightForearmRef.current && leftForearmRef.current) {
      if (avatarState === 'waving') {
        // Waving animation
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 2.2, delta * 6);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0.2, delta * 6);
        rightForearmRef.current.rotation.z = Math.sin(time * 12) * 0.4 - 0.5;
      } else if (activeSection === 'tech-stack') {
        // Presenting tech ring (Right arm pointing right & up)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 1.2, delta * 4);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.4, delta * 4);
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, 0.6, delta * 4);
        rightForearmRef.current.rotation.z = THREE.MathUtils.lerp(rightForearmRef.current.rotation.z, -0.3, delta * 4);

        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.2, delta * 4);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.1, delta * 4);
      } else if (activeSection === 'projects') {
        // Presenting projects (Left arm open gesture)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -1.3, delta * 4);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.3, delta * 4);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, -0.5, delta * 4);
        leftForearmRef.current.rotation.z = THREE.MathUtils.lerp(leftForearmRef.current.rotation.z, 0.4, delta * 4);

        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.2, delta * 4);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 4);
      } else if (isSeated) {
        // Seated arm posture on desk
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -1.1, delta * 5);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.3, delta * 5);
        leftForearmRef.current.rotation.x = THREE.MathUtils.lerp(leftForearmRef.current.rotation.x, -0.6, delta * 5);

        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.9, delta * 5);
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.4, delta * 5);
        rightForearmRef.current.rotation.x = THREE.MathUtils.lerp(rightForearmRef.current.rotation.x, -0.7, delta * 5);
      } else if (activeSection === 'contact') {
        // Contact welcoming stance (both arms slightly open)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.5, delta * 4);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.3, delta * 4);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.5, delta * 4);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.3, delta * 4);
      } else {
        // Idle arm posture
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, 0.15 + Math.sin(time) * 0.03, delta * 4);
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 4);
        rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, 0, delta * 4);
        rightForearmRef.current.rotation.z = THREE.MathUtils.lerp(rightForearmRef.current.rotation.z, 0, delta * 4);

        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, -0.15 - Math.sin(time) * 0.03, delta * 4);
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 4);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, 0, delta * 4);
        leftForearmRef.current.rotation.z = THREE.MathUtils.lerp(leftForearmRef.current.rotation.z, 0, delta * 4);
      }
    }

    // Seated Leg bending pose
    if (leftLegRef.current && rightLegRef.current) {
      if (isSeated) {
        // Bend thighs 90 deg forward
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, -Math.PI / 2.1, delta * 5);
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, -Math.PI / 2.1, delta * 5);
        leftLegRef.current.position.z = THREE.MathUtils.lerp(leftLegRef.current.position.z, 0.1, delta * 5);
        rightLegRef.current.position.z = THREE.MathUtils.lerp(rightLegRef.current.position.z, 0.1, delta * 5);
      } else {
        // Standing legs
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 5);
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 5);
        leftLegRef.current.position.z = THREE.MathUtils.lerp(leftLegRef.current.position.z, 0, delta * 5);
        rightLegRef.current.position.z = THREE.MathUtils.lerp(rightLegRef.current.position.z, 0, delta * 5);
      }
    }

    // Jaw Lip-Sync Speech Movement
    if (jawRef.current) {
      if (avatarState === 'talking' || avatarState === 'seated_talking') {
        const targetJawY = -0.11 - jawOpenValue * 0.08;
        jawRef.current.position.y = THREE.MathUtils.lerp(jawRef.current.position.y, targetJawY, delta * 15);
      } else {
        jawRef.current.position.y = THREE.MathUtils.lerp(jawRef.current.position.y, -0.11, delta * 10);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Stage Platform Disc */}
      <group position={[0, 0, 0]}>
        <mesh receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.06, 32]} />
          <primitive object={materials.platform} attach="material" />
        </mesh>
        {/* Glowing Red Edge Ring */}
        <mesh position={[0, 0.031, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.15, 1.2, 64]} />
          <primitive object={materials.platformRing} attach="material" />
        </mesh>
      </group>

      {/* Main Human Avatar Character Rig */}
      <group ref={characterRef} position={[0, 0.03, 0]}>
        
        {/* LEGS & SHOES */}
        {/* Left Leg */}
        <group ref={leftLegRef} position={[-0.14, 0.72, 0]}>
          {/* Pants/Thigh */}
          <mesh castShadow position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.075, 0.065, 0.44, 16]} />
            <primitive object={materials.pants} attach="material" />
          </mesh>
          {/* Shin */}
          <mesh castShadow position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.065, 0.055, 0.44, 16]} />
            <primitive object={materials.pants} attach="material" />
          </mesh>
          {/* Left Shoe */}
          <group position={[0, -0.78, 0.05]}>
            <mesh castShadow position={[0, 0, 0]}>
              <boxGeometry args={[0.11, 0.09, 0.24]} />
              <primitive object={materials.shoes} attach="material" />
            </mesh>
            <mesh position={[0, -0.04, 0]}>
              <boxGeometry args={[0.115, 0.02, 0.245]} />
              <primitive object={materials.shoeSole} attach="material" />
            </mesh>
          </group>
        </group>

        {/* Right Leg */}
        <group ref={rightLegRef} position={[0.14, 0.72, 0]}>
          {/* Pants/Thigh */}
          <mesh castShadow position={[0, -0.22, 0]}>
            <cylinderGeometry args={[0.075, 0.065, 0.44, 16]} />
            <primitive object={materials.pants} attach="material" />
          </mesh>
          {/* Shin */}
          <mesh castShadow position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.065, 0.055, 0.44, 16]} />
            <primitive object={materials.pants} attach="material" />
          </mesh>
          {/* Right Shoe */}
          <group position={[0, -0.78, 0.05]}>
            <mesh castShadow position={[0, 0, 0]}>
              <boxGeometry args={[0.11, 0.09, 0.24]} />
              <primitive object={materials.shoes} attach="material" />
            </mesh>
            <mesh position={[0, -0.04, 0]}>
              <boxGeometry args={[0.115, 0.02, 0.245]} />
              <primitive object={materials.shoeSole} attach="material" />
            </mesh>
          </group>
        </group>

        {/* TORSO & CLOTHING */}
        <group position={[0, 1.05, 0]}>
          {/* Inner T-shirt */}
          <mesh castShadow position={[0, -0.05, 0]}>
            <cylinderGeometry args={[0.18, 0.17, 0.46, 16]} />
            <primitive object={materials.tshirt} attach="material" />
          </mesh>

          {/* Outer Jacket / Hoodie */}
          <mesh castShadow position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.22, 0.2, 0.52, 16]} />
            <primitive object={materials.jacket} attach="material" />
          </mesh>

          {/* Red Jacket Zipper & Collar Line Accent */}
          <mesh position={[0, 0.02, 0.205]}>
            <boxGeometry args={[0.025, 0.5, 0.01]} />
            <primitive object={materials.jacketAccent} attach="material" />
          </mesh>
          <mesh position={[0, 0.26, 0.14]} rotation={[0.4, 0, 0]}>
            <torusGeometry args={[0.16, 0.02, 8, 16, Math.PI]} />
            <primitive object={materials.jacketAccent} attach="material" />
          </mesh>
        </group>

        {/* ARMS */}
        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.26, 1.25, 0]}>
          {/* Upper Arm Sleeve */}
          <mesh castShadow position={[-0.04, -0.15, 0]}>
            <cylinderGeometry args={[0.06, 0.05, 0.32, 16]} />
            <primitive object={materials.jacket} attach="material" />
          </mesh>
          {/* Forearm & Hand */}
          <group ref={leftForearmRef} position={[-0.04, -0.3, 0]}>
            <mesh castShadow position={[0, -0.14, 0]}>
              <cylinderGeometry args={[0.048, 0.04, 0.28, 16]} />
              <primitive object={materials.skin} attach="material" />
            </mesh>
            {/* Hand */}
            <mesh castShadow position={[0, -0.3, 0]}>
              <boxGeometry args={[0.06, 0.08, 0.04]} />
              <primitive object={materials.skin} attach="material" />
            </mesh>
          </group>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.26, 1.25, 0]}>
          {/* Upper Arm Sleeve */}
          <mesh castShadow position={[0.04, -0.15, 0]}>
            <cylinderGeometry args={[0.06, 0.05, 0.32, 16]} />
            <primitive object={materials.jacket} attach="material" />
          </mesh>
          {/* Forearm & Hand */}
          <group ref={rightForearmRef} position={[0.04, -0.3, 0]}>
            <mesh castShadow position={[0, -0.14, 0]}>
              <cylinderGeometry args={[0.048, 0.04, 0.28, 16]} />
              <primitive object={materials.skin} attach="material" />
            </mesh>
            {/* Hand */}
            <mesh castShadow position={[0, -0.3, 0]}>
              <boxGeometry args={[0.06, 0.08, 0.04]} />
              <primitive object={materials.skin} attach="material" />
            </mesh>
          </group>
        </group>

        {/* HEAD, FACE & SPECS (GLASSES) */}
        <group ref={headRef} position={[0, 1.48, 0]}>
          {/* Neck */}
          <mesh position={[0, -0.12, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.06, 0.1, 16]} />
            <primitive object={materials.skin} attach="material" />
          </mesh>

          {/* Head Base (Realistic Head Shape) */}
          <mesh castShadow position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.14, 32, 32]} />
            <primitive object={materials.skin} attach="material" />
          </mesh>

          {/* Jaw / Lower Face Structure */}
          <mesh ref={jawRef} position={[0, -0.11, 0.02]} castShadow>
            <boxGeometry args={[0.11, 0.05, 0.12]} />
            <primitive object={materials.skin} attach="material" />
          </mesh>
          {/* Mouth/Lips */}
          <mesh position={[0, -0.065, 0.122]}>
            <boxGeometry args={[0.06, 0.015, 0.01]} />
            <primitive object={materials.lips} attach="material" />
          </mesh>

          {/* Nose */}
          <mesh position={[0, 0.01, 0.14]} rotation={[0.2, 0, 0]}>
            <coneGeometry args={[0.02, 0.04, 16]} />
            <primitive object={materials.skin} attach="material" />
          </mesh>

          {/* Eyes & Irises */}
          <group position={[0, 0.04, 0.12]}>
            {/* Left Eye */}
            <group position={[-0.045, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.016, 16, 16]} />
                <primitive object={materials.eyeWhite} attach="material" />
              </mesh>
              <mesh position={[0, 0, 0.012]}>
                <sphereGeometry args={[0.008, 16, 16]} />
                <primitive object={materials.eyes} attach="material" />
              </mesh>
            </group>

            {/* Right Eye */}
            <group position={[0.045, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.016, 16, 16]} />
                <primitive object={materials.eyeWhite} attach="material" />
              </mesh>
              <mesh position={[0, 0, 0.012]}>
                <sphereGeometry args={[0.008, 16, 16]} />
                <primitive object={materials.eyes} attach="material" />
              </mesh>
            </group>
          </group>

          {/* Eyebrows */}
          <mesh position={[-0.045, 0.075, 0.125]} rotation={[0, 0, 0.05]}>
            <boxGeometry args={[0.035, 0.006, 0.01]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>
          <mesh position={[0.045, 0.075, 0.125]} rotation={[0, 0, -0.05]}>
            <boxGeometry args={[0.035, 0.006, 0.01]} />
            <primitive object={materials.hair} attach="material" />
          </mesh>

          {/* Hair (Modern Layered Hair Volume) */}
          <group position={[0, 0.12, -0.01]}>
            <mesh castShadow>
              <sphereGeometry args={[0.138, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
              <primitive object={materials.hair} attach="material" />
            </mesh>
            {/* Front Fringe Locks */}
            <mesh position={[0, 0.01, 0.12]} rotation={[0.3, 0, 0]}>
              <boxGeometry args={[0.12, 0.04, 0.04]} />
              <primitive object={materials.hair} attach="material" />
            </mesh>
            <mesh position={[-0.04, 0.02, 0.125]} rotation={[0.4, 0.2, -0.2]}>
              <boxGeometry args={[0.06, 0.04, 0.03]} />
              <primitive object={materials.hair} attach="material" />
            </mesh>
          </group>

          {/* SPECS / GLASSES (HIGH DETAILED SPECTACLES) */}
          <group ref={glassesRef} position={[0, 0.038, 0.125]}>
            {/* Left Lens Frame */}
            <mesh position={[-0.046, 0, 0]}>
              <boxGeometry args={[0.048, 0.036, 0.008]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>
            {/* Left Glass Lens */}
            <mesh position={[-0.046, 0, 0.001]}>
              <planeGeometry args={[0.042, 0.03]} />
              <primitive object={materials.glassesLens} attach="material" />
            </mesh>

            {/* Right Lens Frame */}
            <mesh position={[0.046, 0, 0]}>
              <boxGeometry args={[0.048, 0.036, 0.008]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>
            {/* Right Glass Lens */}
            <mesh position={[0.046, 0, 0.001]}>
              <planeGeometry args={[0.042, 0.03]} />
              <primitive object={materials.glassesLens} attach="material" />
            </mesh>

            {/* Nose Bridge Connection */}
            <mesh position={[0, 0.01, 0]}>
              <boxGeometry args={[0.044, 0.005, 0.008]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>

            {/* Left Arm Temple (Extending back towards ear) */}
            <mesh position={[-0.072, 0.005, -0.06]} rotation={[0, 0.2, 0]}>
              <boxGeometry args={[0.006, 0.008, 0.12]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>

            {/* Right Arm Temple (Extending back towards ear) */}
            <mesh position={[0.072, 0.005, -0.06]} rotation={[0, -0.2, 0]}>
              <boxGeometry args={[0.006, 0.008, 0.12]} />
              <primitive object={materials.glassesFrame} attach="material" />
            </mesh>
          </group>
        </group>

      </group>
    </group>
  );
}
