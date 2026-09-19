'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface KineticMonolithProps {
  scrollProgress: React.MutableRefObject<number>;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export function KineticMonolith({ scrollProgress, mousePos }: KineticMonolithProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ribbonRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const p = scrollProgress.current;

    if (groupRef.current) {
      // Parallax response to mouse
      const targetRotY = mousePos.current.x * 0.25 + p * 0.4;
      const targetRotX = mousePos.current.y * 0.15;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;

      // Gentle floating elevation
      groupRef.current.position.y = 0.4 + Math.sin(t * 1.2) * 0.08 - p * 0.8;
      // Recede as camera approaches
      groupRef.current.position.z = -p * 2.2;
    }

    if (ribbonRef.current) {
      // Subtle continuous structural rotation
      ribbonRef.current.rotation.z = t * 0.15 + p * 0.5;
    }

    if (sphereRef.current) {
      // Kinetic sphere orbiting along the ribbon path
      const angle = t * 1.8 + p * 4.0;
      const radius = 1.45;
      sphereRef.current.position.x = Math.cos(angle) * radius;
      sphereRef.current.position.y = Math.sin(angle * 2) * 0.35;
      sphereRef.current.position.z = Math.sin(angle) * radius;
    }

    if (coreRef.current) {
      // Inner glowing core pulse
      const pulse = 0.9 + Math.sin(t * 3.0) * 0.12;
      coreRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Central Brushed Titanium Sculptural Ribbon */}
      <mesh ref={ribbonRef} castShadow receiveShadow>
        <torusGeometry args={[1.5, 0.22, 32, 100]} />
        <meshStandardMaterial
          color="#181c22"
          roughness={0.28}
          metalness={0.92}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Kinetic Polished Chrome Sphere */}
      <mesh ref={sphereRef} castShadow>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial
          color="#e8edf2"
          roughness={0.08}
          metalness={0.98}
        />
      </mesh>

      {/* Concentric Secondary Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.85, 0.04, 16, 80]} />
        <meshBasicMaterial
          color="#00F299"
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>

      {/* Internal Luminous Energy Core (Octahedron) */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.42, 0]} />
        <meshPhysicalMaterial
          color="#00F299"
          emissive="#00F299"
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.2}
          transmission={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}
