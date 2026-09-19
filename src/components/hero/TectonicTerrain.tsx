'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface TectonicTerrainProps {
  scrollProgress: React.MutableRefObject<number>;
  isMobile?: boolean;
}

export function TectonicTerrain({ scrollProgress, isMobile = false }: TectonicTerrainProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Balanced mesh density for smooth lighting without excessive vertex count
  const segments = isMobile ? 36 : 64;
  const size = 44;

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Distance from central canyon/pathway
      const distFromCenter = Math.abs(x);

      // Multi-frequency tectonic elevation
      const n1 = Math.sin(x * 0.22) * Math.cos(z * 0.18) * 2.2;
      const n2 = Math.sin(x * 0.55 + 0.8) * Math.cos(z * 0.45 + 0.5) * 0.9;
      const canyon = Math.max(0, 2.2 - distFromCenter * 0.5);

      // Quantized basalt terracing (architectural steps)
      const rawY = n1 + n2 - canyon * 1.5;
      const steppedY = Math.round(rawY * 2.0) / 2.0;

      // Gentle flatten at the far end (z receding) for seamless section hand-off
      const flattenFactor = Math.min(1, Math.max(0, (z + 10) / 20));
      pos.setY(i, steppedY * flattenFactor - 2.6);
    }

    geo.computeVertexNormals();
    return geo;
  }, [segments, size]);

  useFrame(() => {
    if (!meshRef.current) return;
    const p = scrollProgress.current;

    // Slow, heavy architectural shift
    meshRef.current.position.z = -p * 5.0;
    meshRef.current.rotation.y = Math.sin(p * Math.PI * 0.4) * 0.08;
  });

  return (
    <group position={[0, -0.4, -1]}>
      {/* Matte Brushed Graphite / Titanium Basalt Terraces */}
      <mesh ref={meshRef} geometry={geometry} receiveShadow>
        <meshStandardMaterial
          color="#0a0c10"
          roughness={0.78}
          metalness={0.42}
          flatShading={true}
          envMapIntensity={0.6}
        />
      </mesh>
    </group>
  );
}
