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
  const wireframeMeshRef = useRef<THREE.Mesh>(null);

  // Resolution tailored to platform
  const segments = isMobile ? 32 : 56;
  const size = 38;

  const { geometry, wireframeGeometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    // Procedural tectonic terrain displacement
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Distance from center chasm
      const distFromChasm = Math.abs(x);
      
      // Multi-octave stepped terrain height
      const n1 = Math.sin(x * 0.28) * Math.cos(z * 0.22) * 1.8;
      const n2 = Math.sin(x * 0.7 + 1.2) * Math.cos(z * 0.6 + 0.8) * 0.8;
      const chasmDrop = Math.max(0, 1.8 - distFromChasm * 0.45);

      // Stepped terraces (basalt columns feel)
      const rawHeight = n1 + n2 - chasmDrop * 1.4;
      const steppedHeight = Math.round(rawHeight * 2.5) / 2.5;

      pos.setY(i, steppedHeight - 2.8);
    }

    geo.computeVertexNormals();

    const wireGeo = geo.clone();
    return { geometry: geo, wireframeGeometry: wireGeo };
  }, [segments, size]);

  useFrame(() => {
    if (!meshRef.current) return;
    const p = scrollProgress.current;
    // Subtle tilt as user scrolls deeper into the scene
    meshRef.current.rotation.y = Math.sin(p * Math.PI * 0.5) * 0.12;
    meshRef.current.position.z = -p * 3.5;
    if (wireframeMeshRef.current) {
      wireframeMeshRef.current.rotation.y = meshRef.current.rotation.y;
      wireframeMeshRef.current.position.z = meshRef.current.position.z;
    }
  });

  return (
    <group position={[0, -0.6, -2]}>
      {/* Solid Matte Basalt / Dark Titanium Terrain */}
      <mesh ref={meshRef} geometry={geometry} receiveShadow>
        <meshStandardMaterial
          color="#0b0d11"
          roughness={0.88}
          metalness={0.35}
          flatShading={true}
        />
      </mesh>

      {/* Subtle Architectural Coordinate Grid Overlay */}
      <mesh ref={wireframeMeshRef} geometry={wireframeGeometry} position={[0, 0.02, 0]}>
        <meshBasicMaterial
          color="#00F299"
          wireframe={true}
          transparent={true}
          opacity={0.07}
        />
      </mesh>
    </group>
  );
}
