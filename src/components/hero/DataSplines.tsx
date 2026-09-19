'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface DataSplinesProps {
  scrollProgress: React.MutableRefObject<number>;
}

export function DataSplines({ scrollProgress }: DataSplinesProps) {
  const linesRef = useRef<THREE.Group>(null);

  // Generate 6 thin, elegant spline paths weaving through terrain fissures
  const curves = useMemo(() => {
    const items: THREE.CatmullRomCurve3[] = [];
    const targets = [
      new THREE.Vector3(-5.2, -1.8, -4.0),
      new THREE.Vector3(5.0, -1.6, -3.8),
      new THREE.Vector3(-3.8, -2.0, 1.5),
      new THREE.Vector3(4.2, -1.8, 2.2),
      new THREE.Vector3(-1.5, -2.1, -6.5),
      new THREE.Vector3(2.0, -1.9, -6.2),
    ];

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
      items.push(curve);
    });

    return items;
  }, []);

  const lineGeometries = useMemo(() => {
    return curves.map((curve) => {
      const points = curve.getPoints(72);
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, [curves]);

  useFrame(({ clock }) => {
    if (!linesRef.current) return;
    const t = clock.getElapsedTime();
    const p = scrollProgress.current;

    // At 0%: subtle resting state (opacity 0.05).
    // As scroll advances: illuminates organically as connection is established.
    const scrollFactor = Math.min(1, Math.max(0, (p - 0.15) / 0.5));

    linesRef.current.children.forEach((child, i) => {
      const line = child as THREE.Line;
      const mat = line.material as THREE.LineBasicMaterial;
      if (mat) {
        const pulse = 0.05 + scrollFactor * (0.22 + Math.sin(t * 2.0 + i * 1.5) * 0.08);
        mat.opacity = pulse;
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
                opacity: 0.05,
                linewidth: 1,
              })
            )
          }
        />
      ))}
    </group>
  );
}
