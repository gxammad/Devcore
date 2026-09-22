'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface KineticMonolithProps {
  scrollProgress: React.MutableRefObject<number>;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  isMobile?: boolean;
}

export function KineticMonolith({ scrollProgress, mousePos, isMobile = false }: KineticMonolithProps) {
  const groupRef = useRef<THREE.Group>(null);
  const primaryRingRef = useRef<THREE.Mesh>(null);
  const secondaryRingRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollProgress.current;

    if (groupRef.current) {
      // Precise, restrained mouse parallax
      const targetRotY = mousePos.current.x * 0.18 + p * 0.35;
      const targetRotX = mousePos.current.y * 0.10;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;

      // Heavy, slow architectural hover
      groupRef.current.position.y = 0.5 + Math.sin(t * 0.8) * 0.05 - p * 0.9;
      groupRef.current.position.z = -p * 3.2;
    }

    if (primaryRingRef.current) {
      // Primary architectural ribbon rotation
      primaryRingRef.current.rotation.z = t * 0.10 + p * 0.4;
    }

    if (secondaryRingRef.current) {
      // Counter-rotating inner gimbal track
      secondaryRingRef.current.rotation.x = -t * 0.08 - p * 0.3;
      secondaryRingRef.current.rotation.y = t * 0.12;
    }

    if (sphereRef.current) {
      // Kinetic sphere gliding smoothly along ribbon trajectory
      const angle = t * 1.4 + p * 3.5;
      const radius = 1.55;
      sphereRef.current.position.x = Math.cos(angle) * radius;
      sphereRef.current.position.y = Math.sin(angle * 2) * 0.28;
      sphereRef.current.position.z = Math.sin(angle) * radius;
    }

    if (coreRef.current) {
      // Restrained breathing pulse of inner crystalline core
      const pulse = 0.92 + Math.sin(t * 2.2) * 0.06;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y = t * 0.25;
      coreRef.current.rotation.x = t * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Outer Titanium Architectural Mobius Ring */}
      <mesh ref={primaryRingRef} castShadow receiveShadow>
        <torusGeometry args={[1.55, 0.18, 36, 120]} />
        <meshStandardMaterial
          color="#16191f"
          roughness={0.32}
          metalness={0.90}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Counter-rotating Inner Precision Track */}
      <mesh ref={secondaryRingRef}>
        <torusGeometry args={[1.22, 0.035, 16, 80]} />
        <meshStandardMaterial
          color="#222832"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Kinetic Polished Dark Chrome Orb */}
      <mesh ref={sphereRef} castShadow>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial
          color="#d0d8e2"
          roughness={0.06}
          metalness={0.98}
        />
      </mesh>

      {/* Inner Architectural Core (Controlled Emerald Energy, NOT a neon toy) */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.38, 0]} />
        {isMobile ? (
          <meshStandardMaterial
            color="#00F299"
            emissive="#00b371"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.2}
            transparent
            opacity={0.92}
          />
        ) : (
          <meshPhysicalMaterial
            color="#00F299"
            emissive="#00b371"
            emissiveIntensity={0.65}
            roughness={0.15}
            metalness={0.15}
            transmission={0.6}
            thickness={1.2}
            transparent
            opacity={0.88}
          />
        )}
      </mesh>
    </group>
  );
}
