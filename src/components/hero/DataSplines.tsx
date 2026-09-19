'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface DataSplinesProps {
  scrollProgress: React.MutableRefObject<number>;
}

export function DataSplines({ scrollProgress }: DataSplinesProps) {
  const linesRef = useRef<THREE.Group>(null);

  // Generate 5 distinct data curves connecting center to outer perimeter
  const curves = useMemo(() => {
    const items: THREE.CatmullRomCurve3[] = [];
    const endpoints = [
      new THREE.Vector3(-4.5, -1.2, -3),
      new THREE.Vector3(4.2, -1.0, -2.5),
      new THREE.Vector3(-3.2, -1.4, 2.5),
      new THREE.Vector3(3.8, -1.1, 3.2),
      new THREE.Vector3(0.5, -1.5, -5.2),
    ];

    endpoints.forEach((end, idx) => {
      const mid1 = new THREE.Vector3(
        end.x * 0.35 + (idx % 2 === 0 ? 1 : -1) * 0.8,
        -0.4,
        end.z * 0.35
      );
      const mid2 = new THREE.Vector3(
        end.x * 0.75 + (idx % 2 === 0 ? -0.5 : 0.5),
        -1.0,
        end.z * 0.75
      );
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.2, 0),
        mid1,
        mid2,
        end,
      ]);
      items.push(curve);
    });

    return items;
  }, []);

  const lineGeometries = useMemo(() => {
    return curves.map((curve) => {
      const points = curve.getPoints(64);
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [curves]);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollProgress.current;

    // Modulate opacity and subtle wave
    linesRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line;
      const mat = line.material as THREE.LineBasicMaterial;
      if (mat) {
        // Pulse with time and scroll
        mat.opacity = 0.25 + Math.sin(t * 2.5 + i * 1.2) * 0.15 + p * 0.3;
      }
    });
  });

  return (
    <group ref={linesRef}>
      {lineGeometries.map((geo, idx) => (
        <primitive
          key={idx}
          object={
            new THREE.Line(
              geo,
              new THREE.LineBasicMaterial({
                color: new THREE.Color('#00F299'),
                transparent: true,
                opacity: 0.35,
                linewidth: 1.5,
              })
            )
          }
        />
      ))}
    </group>
  );
}
