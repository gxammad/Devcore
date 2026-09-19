'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CrystallineFloraProps {
  scrollProgress: React.MutableRefObject<number>;
  isMobile?: boolean;
}

interface NodeData {
  position: THREE.Vector3;
  baseScale: THREE.Vector3;
  rotation: THREE.Euler;
  threshold: number;
  currentScale: number;
}

export function CrystallineFlora({ scrollProgress, isMobile = false }: CrystallineFloraProps) {
  // Balanced instance count: 48 on desktop, 18 on mobile (saves draw and matrix computation)
  const crystalCount = isMobile ? 18 : 48;
  const columnCount = isMobile ? 8 : 18;

  const crystalMeshRef = useRef<THREE.InstancedMesh>(null);
  const columnMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Precompute procedural crystal & column distribution
  const { crystals, columns } = useMemo(() => {
    const cList: NodeData[] = [];
    const colList: NodeData[] = [];
    const rnd = (min: number, max: number) => min + Math.random() * (max - min);

    // Crystalline flora clusters along terraced ridges
    for (let i = 0; i < crystalCount; i++) {
      const angle = rnd(0, Math.PI * 2);
      const radius = rnd(2.5, 13.0);
      const x = Math.cos(angle) * radius + rnd(-1.0, 1.0);
      const z = Math.sin(angle) * (radius * 0.75) - 3.0;
      const y = -1.9 + Math.sin(x * 0.22) * 0.9 + Math.random() * 0.3;

      const threshold = 0.10 + (radius / 13.0) * 0.48 + rnd(0, 0.10);
      const scaleY = rnd(0.8, 2.2);
      const scaleXZ = rnd(0.28, 0.6);

      cList.push({
        position: new THREE.Vector3(x, y, z),
        baseScale: new THREE.Vector3(scaleXZ, scaleY, scaleXZ),
        rotation: new THREE.Euler(rnd(-0.15, 0.15), rnd(0, Math.PI * 2), rnd(-0.15, 0.15)),
        threshold: Math.min(0.80, threshold),
        currentScale: 0,
      });
    }

    // Architectural basalt monolith columns rising between clusters
    for (let i = 0; i < columnCount; i++) {
      const angle = rnd(0, Math.PI * 2);
      const radius = rnd(4.0, 15.0);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * (radius * 0.8) - 4.0;
      const y = -2.2;

      const threshold = 0.22 + (radius / 15.0) * 0.45;
      const scaleY = rnd(1.5, 3.8);
      const scaleXZ = rnd(0.35, 0.75);

      colList.push({
        position: new THREE.Vector3(x, y, z),
        baseScale: new THREE.Vector3(scaleXZ, scaleY, scaleXZ),
        rotation: new THREE.Euler(0, rnd(0, Math.PI), 0),
        threshold: Math.min(0.82, threshold),
        currentScale: 0,
      });
    }

    return { crystals: cList, columns: colList };
  }, [crystalCount, columnCount]);

  // Crystal Geometry: 6-sided faceted tapered quartz
  const crystalGeo = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.5, 2.0, 6);
    geo.translate(0, 1.0, 0);
    return geo;
  }, []);

  // Architectural Column Geometry: 6-sided extruded prism
  const columnGeo = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.5, 0.55, 2.0, 6);
    geo.translate(0, 1.0, 0);
    return geo;
  }, []);

  useFrame((_, delta) => {
    const p = scrollProgress.current;

    // 1. Update Crystals
    if (crystalMeshRef.current) {
      let needsUpdate = false;
      for (let i = 0; i < crystalCount; i++) {
        const c = crystals[i];
        let targetScale = 0;

        if (p > c.threshold) {
          const prog = Math.min(1, (p - c.threshold) / 0.20);
          targetScale = 1 - Math.pow(1 - prog, 3);
        }

        if (Math.abs(c.currentScale - targetScale) > 0.002) {
          c.currentScale += (targetScale - c.currentScale) * Math.min(1, delta * 7.0);
          needsUpdate = true;

          dummy.position.copy(c.position);
          dummy.rotation.copy(c.rotation);
          dummy.rotation.y = c.rotation.y + c.currentScale * 0.6;
          dummy.scale.set(
            c.baseScale.x * c.currentScale,
            c.baseScale.y * c.currentScale,
            c.baseScale.z * c.currentScale
          );
          dummy.updateMatrix();
          crystalMeshRef.current.setMatrixAt(i, dummy.matrix);
        }
      }

      // ONLY flag for GPU buffer upload if a matrix actually changed!
      if (needsUpdate) {
        crystalMeshRef.current.instanceMatrix.needsUpdate = true;
      }
    }

    // 2. Update Architectural Columns
    if (columnMeshRef.current) {
      let needsUpdate = false;
      for (let i = 0; i < columnCount; i++) {
        const col = columns[i];
        let targetScale = 0;

        if (p > col.threshold) {
          const prog = Math.min(1, (p - col.threshold) / 0.24);
          targetScale = 1 - Math.pow(1 - prog, 3);
        }

        if (Math.abs(col.currentScale - targetScale) > 0.002) {
          col.currentScale += (targetScale - col.currentScale) * Math.min(1, delta * 5.5);
          needsUpdate = true;

          dummy.position.copy(col.position);
          dummy.position.y = col.position.y + col.currentScale * (col.baseScale.y * 0.4);
          dummy.rotation.copy(col.rotation);
          dummy.scale.set(
            col.baseScale.x,
            col.baseScale.y * col.currentScale,
            col.baseScale.z
          );
          dummy.updateMatrix();
          columnMeshRef.current.setMatrixAt(i, dummy.matrix);
        }
      }

      if (needsUpdate) {
        columnMeshRef.current.instanceMatrix.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      {/* Frosted Quartz Crystal Flora */}
      <instancedMesh
        ref={crystalMeshRef}
        args={[crystalGeo, undefined, crystalCount]}
      >
        <meshPhysicalMaterial
          color="#00F299"
          emissive="#004a2c"
          emissiveIntensity={0.45}
          roughness={0.25}
          metalness={0.10}
          transmission={0.60}
          thickness={1.2}
          transparent={true}
          opacity={0.92}
        />
      </instancedMesh>

      {/* Rising Architectural Titanium Monolith Columns */}
      <instancedMesh
        ref={columnMeshRef}
        args={[columnGeo, undefined, columnCount]}
      >
        <meshStandardMaterial
          color="#12161c"
          roughness={0.45}
          metalness={0.88}
        />
      </instancedMesh>
    </group>
  );
}
