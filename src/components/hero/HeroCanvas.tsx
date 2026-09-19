'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TectonicTerrain } from './TectonicTerrain';
import { CrystallineFlora } from './CrystallineFlora';
import { KineticMonolith } from './KineticMonolith';
import { DataSplines } from './DataSplines';
import { FloatingParticles } from './FloatingParticles';
import { HeroFallback } from './HeroFallback';

interface HeroCanvasProps {
  scrollProgress: React.MutableRefObject<number>;
}

// Camera controller that drives smooth cinematic movement tied to scroll and mouse
function CameraRig({
  scrollProgress,
  mousePos,
  isMobile,
}: {
  scrollProgress: React.MutableRefObject<number>;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const targetPos = useRef(new THREE.Vector3(0, 1.6, 7.5));
  const targetLook = useRef(new THREE.Vector3(0, 0.2, 0));

  useFrame(({ camera }) => {
    const p = scrollProgress.current;
    const mx = mousePos.current.x * (isMobile ? 0.3 : 0.8);
    const my = mousePos.current.y * (isMobile ? 0.2 : 0.5);

    // Initial wide view -> glides down into terrain and moves deeper
    // At scroll 0: [0, 1.8, 7.5]
    // At scroll 1: [0, 0.4, 3.2]
    const camY = 1.8 - p * 1.5 - my * 0.3;
    const camZ = 7.5 - p * 4.4;
    const camX = mx * 0.8 + Math.sin(p * Math.PI) * 0.4;

    targetPos.current.set(camX, camY, camZ);
    camera.position.lerp(targetPos.current, 0.06);

    // Smooth focal target
    targetLook.current.set(0, 0.2 - p * 0.4, -p * 1.5);
    camera.lookAt(targetLook.current);
  });

  return null;
}

export function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);
  const mousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Test WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!mounted || !webglSupported) {
    return <HeroFallback />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 1.8, 7.5], fov: isMobile ? 55 : 45 }}
        dpr={isMobile ? [1, 1.2] : [1, 1.7]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Volumetric / Exponential Mist */}
          <fog attach="fog" args={['#050608', 4, 18]} />

          {/* Precision Studio Lighting */}
          <ambientLight intensity={0.4} color="#0c1118" />

          {/* Key Light */}
          <directionalLight
            position={[6, 8, 5]}
            intensity={1.8}
            color="#ffffff"
            castShadow
          />

          {/* Cyan/Mint Rim Light */}
          <directionalLight
            position={[-7, 4, -4]}
            intensity={2.4}
            color="#00F299"
          />

          {/* Top Architectural Fill */}
          <pointLight position={[0, 4, 1]} intensity={0.8} color="#88B0D0" />

          {/* Interactive 3D World Components */}
          <TectonicTerrain scrollProgress={scrollProgress} isMobile={isMobile} />
          <CrystallineFlora scrollProgress={scrollProgress} isMobile={isMobile} />
          <KineticMonolith scrollProgress={scrollProgress} mousePos={mousePos} />
          <DataSplines scrollProgress={scrollProgress} />
          <FloatingParticles isMobile={isMobile} />

          {/* Camera Rig */}
          <CameraRig
            scrollProgress={scrollProgress}
            mousePos={mousePos}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
