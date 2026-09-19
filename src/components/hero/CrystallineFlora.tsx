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
  type: 'crystal' | 'column';
}

export function CrystallineFlora({ scrollProgress, isMobile = false }: CrystallineFloraProps) {
  const crystalCount = isMobile ? 28 : 64;
  const columnCount = isMobile ? 12 : 24;

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
      const radius = rnd(2.5, 14.0);
      const x = Math.cos(angle) * radius + rnd(-1.2, 1.2);
      const z = Math.sin(angle) * (radius * 0.75) - 3.0;
      const y = -1.9 + Math.sin(x * 0.22) * 0.9 + Math.random() * 0.3;

      // Staggered trigger thresholds from 0.12 to 0.72
      const threshold = 0.10 + (radius / 14.0) * 0.50 + rnd(0, 0.12);
      const scaleY = rnd(0.8, 2.4);
      const scaleXZ = rnd(0.3, 0.65);

      cList.push({
        position: new THREE.Vector3(x, y, z),
        baseScale: new THREE.Vector3(scaleXZ, scaleY, scaleXZ),
        rotation: new THREE.Euler(rnd(-0.18, 0.18), rnd(0, Math.PI * 2), rnd(-0.18, 0.18)),
        threshold: Math.min(0.80, threshold),
        currentScale: 0,
        type: 'crystal',
      });
    }

    // Architectural basalt monolith columns rising between clusters
    for (let i = 0; i < columnCount; i++) {
      const angle = rnd(0, Math.PI * 2);
      const radius = rnd(4.0, 16.0);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * (radius * 0.8) - 4.0;
      const y = -2.2;

      const threshold = 0.25 + (radius / 16.0) * 0.45;
      const scaleY = rnd(1.5, 4.0);
      const scaleXZ = rnd(0.4, 0.85);

      colList.push({
        position: new THREE.Vector3(x, y, z),
        baseScale: new THREE.Vector3(scaleXZ, scaleY, scaleXZ),
        rotation: new THREE.Euler(0, rnd(0, Math.PI), 0),
        threshold: Math.min(0.82, threshold),
        currentScale: 0,
        type: 'column',
      });
    }

    return { crystals: cList, columns: colList };
  }, [crystalCount, columnCount]);

  // Crystal Geometry: 6-sided faceted tapered quartz
  const crystalGeo = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.5, 2.0, 6);
    geo.translate(0, 1.0, 0); // Origin at base for upward emergence
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
          // Smooth organic ease-out growth
          const prog = Math.min(1, (p - c.threshold) / 0.20);
          targetScale = 1 - Math.pow(1 - prog, 3);
        }

        if (Math.abs(c.currentScale - targetScale) > 0.001) {
          c.currentScale += (targetScale - c.currentScale) * Math.min(1, delta * 6.5);
          needsUpdate = true;
        }

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

      if (needsUpdate || p > 0) {
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

        if (Math.abs(col.currentScale - targetScale) > 0.001) {
          col.currentScale += (targetScale - col.currentScale) * Math.min(1, delta * 5.0);
          needsUpdate = true;
        }

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

      if (needsUpdate || p > 0) {
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
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color="#00F299"
          emissive="#004a2c"
          emissiveIntensity={0.5}
          roughness={0.24}
          metalness={0.12}
          transmission={0.65}
          thickness={1.5}
          transparent={true}
          opacity={0.94}
        />
      </instancedMesh>

      {/* Rising Architectural Titanium Monolith Columns */}
      <instancedMesh
        ref={columnMeshRef}
        args={[columnGeo, undefined, columnCount]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#12161c"
          roughness={0.45}
          metalness={0.88}
          envMapIntensity={0.8}
        />
      </instancedMesh>
    </group>
  );
}
