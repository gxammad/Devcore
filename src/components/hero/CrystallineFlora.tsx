'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystallineFloraProps {
  scrollProgress: React.MutableRefObject<number>;
  isMobile?: boolean;
}

interface CrystalData {
  position: THREE.Vector3;
  baseScale: THREE.Vector3;
  rotation: THREE.Euler;
  threshold: number;
  currentScale: number;
}

export function CrystallineFlora({ scrollProgress, isMobile = false }: CrystallineFloraProps) {
  const count = isMobile ? 32 : 72;
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Precompute procedural crystal data
  const crystals = useMemo(() => {
    const items: CrystalData[] = [];
    const rnd = (min: number, max: number) => min + Math.random() * (max - min);

    for (let i = 0; i < count; i++) {
      // Cluster along fissures and stepped ridges
      const angle = rnd(0, Math.PI * 2);
      const radius = rnd(1.8, 12.0);
      const x = Math.cos(angle) * radius + rnd(-1.5, 1.5);
      const z = Math.sin(angle) * (radius * 0.7) - 2.0;

      // Base height matching terrain terraces
      const y = -1.8 + Math.sin(x * 0.28) * 0.8 + (Math.random() * 0.4);

      // Staggered trigger thresholds from scroll 0.05 to 0.75
      const threshold = 0.04 + (radius / 13.0) * 0.65 + (i / count) * 0.15;

      const scaleY = rnd(0.6, 2.2);
      const scaleXZ = rnd(0.25, 0.65);

      items.push({
        position: new THREE.Vector3(x, y, z),
        baseScale: new THREE.Vector3(scaleXZ, scaleY, scaleXZ),
        rotation: new THREE.Euler(
          rnd(-0.25, 0.25),
          rnd(0, Math.PI * 2),
          rnd(-0.25, 0.25)
        ),
        threshold: Math.min(0.85, threshold),
        currentScale: 0,
      });
    }

    return items;
  }, [count]);

  // Geometry: Faceted Quartz Crystal / Digital Lotus Calyx
  const crystalGeometry = useMemo(() => {
    // 6-sided faceted prism with tapered pyramidal peak
    const geo = new THREE.ConeGeometry(0.5, 1.8, 6);
    geo.translate(0, 0.9, 0); // Origin at base so it grows upward
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!instancedMeshRef.current) return;

    const p = scrollProgress.current;
    let needsUpdate = false;

    for (let i = 0; i < count; i++) {
      const c = crystals[i];

      // Growth calculation
      let targetScale = 0;
      if (p > c.threshold) {
        // Growth progress for this individual crystal
        const localProgress = Math.min(1, (p - c.threshold) / 0.22);
        // Smooth cubic ease out
        targetScale = 1 - Math.pow(1 - localProgress, 3);
      }

      // Smooth lerp for organic emergence
      if (Math.abs(c.currentScale - targetScale) > 0.001) {
        c.currentScale += (targetScale - c.currentScale) * Math.min(1, delta * 7.5);
        needsUpdate = true;
      }

      dummy.position.copy(c.position);
      dummy.rotation.copy(c.rotation);
      // Subtle unfurl rotation as it grows
      dummy.rotation.y = c.rotation.y + c.currentScale * 0.8;
      dummy.scale.set(
        c.baseScale.x * c.currentScale,
        c.baseScale.y * c.currentScale,
        c.baseScale.z * c.currentScale
      );
      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    }

    if (needsUpdate || p > 0) {
      instancedMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[crystalGeometry, undefined, count]}
      castShadow
      receiveShadow
    >
      {/* Refractive Cyber Emerald Glass Material */}
      <meshPhysicalMaterial
        color="#00F299"
        emissive="#003b22"
        emissiveIntensity={0.8}
        roughness={0.18}
        metalness={0.15}
        transmission={0.5}
        thickness={1.2}
        transparent={true}
        opacity={0.92}
      />
    </instancedMesh>
  );
}
