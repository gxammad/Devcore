'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface FloatingParticlesProps {
  isMobile?: boolean;
}

export function FloatingParticles({ isMobile = false }: FloatingParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  // Extremely restrained atmospheric count (no noisy blizzard)
  const count = isMobile ? 24 : 72;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const emerald = new THREE.Color('#00F299');
    const graphite = new THREE.Color('#8C96A5');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;

      // Mostly soft graphite dust with rare emerald signals
      const c = Math.random() > 0.8 ? emerald : graphite;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime() * 0.08;
    pointsRef.current.rotation.y = t * 0.15;
    pointsRef.current.position.y = Math.sin(t) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}
