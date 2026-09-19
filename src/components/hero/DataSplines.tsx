'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface DataSplinesProps {
  scrollProgress: React.MutableRefObject<number>;
}

export function DataSplines({ scrollProgress }: DataSplinesProps) {
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);

  // Combine 6 spline paths into a single LineSegments buffer geometry (1 single draw call)
  const combinedGeometry = useMemo(() => {
    const targets = [
      new THREE.Vector3(-5.2, -1.8, -4.0),
      new THREE.Vector3(5.0, -1.6, -3.8),
      new THREE.Vector3(-3.8, -2.0, 1.5),
      new THREE.Vector3(4.2, -1.8, 2.2),
      new THREE.Vector3(-1.5, -2.1, -6.5),
      new THREE.Vector3(2.0, -1.9, -6.2),
    ];

    const allPositions: number[] = [];

    targets.forEach((end, idx) => {
      const mid1 = new THREE.Vector3(
        end.x * 0.35 + (idx % 2 === 0 ? 0.6 : -0.6),
        -0.8,
        end.z * 0.35
      );
      const mid2 = new THREE.Vector3(
        end.x * 0.75 + (idx % 2 === 0 ? -0.4 : 0.4),
        -1.5,
        end.z * 0.75
      );
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.3, 0),
        mid1,
        mid2,
        end,
      ]);

      const points = curve.getPoints(40);
      for (let i = 0; i < points.length - 1; i++) {
        allPositions.push(points[i].x, points[i].y, points[i].z);
        allPositions.push(points[i + 1].x, points[i + 1].y, points[i + 1].z);
      }
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(allPositions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!lineMatRef.current) return;
    const p = scrollProgress.current;
    const t = clock.getElapsedTime();

    // Subtle scroll-driven opacity on a single shared material
    const scrollFactor = Math.min(1, Math.max(0, (p - 0.15) / 0.5));
    const targetOpacity = 0.04 + scrollFactor * (0.24 + Math.sin(t * 2.0) * 0.06);

    lineMatRef.current.opacity = targetOpacity;
  });

  return (
    <lineSegments geometry={combinedGeometry}>
      <lineBasicMaterial
        ref={lineMatRef}
        color="#00F299"
        transparent
        opacity={0.04}
      />
    </lineSegments>
  );
}
