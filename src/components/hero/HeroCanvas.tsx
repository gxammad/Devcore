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

// Cinematic Camera Rig with smooth exponential damping
function CameraRig({
  scrollProgress,
  mousePos,
  isMobile,
}: {
  scrollProgress: React.MutableRefObject<number>;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  isMobile: boolean;
}) {
  const targetPos = useRef(new THREE.Vector3(0, 2.0, 8.2));
  const targetLook = useRef(new THREE.Vector3(0, 0.3, 0));

  useFrame(({ camera }) => {
    const p = scrollProgress.current;
    const mx = mousePos.current.x * (isMobile ? 0.15 : 0.45);
    const my = mousePos.current.y * (isMobile ? 0.1 : 0.3);

    // Cinematic scroll progression:
    // 0.0: Wide, mysterious [0, 2.0, 8.2]
    // 0.3: Descend and push forward [0.2, 1.4, 6.0]
    // 0.6: Pass through ecosystem and columns [0.35, 0.7, 3.8]
    // 0.9-1.0: Settle into avenue [0, 0.35, 1.8]
    const camZ = 8.2 - p * 6.4;
    const camY = 2.0 - p * 1.65 - my * 0.2;
    const camX = mx * 0.5 + Math.sin(p * Math.PI) * 0.4;

    targetPos.current.set(camX, camY, camZ);
    camera.position.lerp(targetPos.current, 0.06);

    const lookY = 0.3 - p * 0.5;
    const lookZ = -p * 4.5;
    targetLook.current.set(0, lookY, lookZ);
    camera.lookAt(targetLook.current);
  });

  return null;
}

export function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);
  const mousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // IntersectionObserver to freeze canvas render loop when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  if (!mounted || !webglSupported) {
    return <HeroFallback />;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 2.0, 8.2], fov: isMobile ? 54 : 44 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          stencil: false,
          depth: true,
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Volumetric Dark Void Fog */}
          <fog attach="fog" args={['#050608', 5, 20]} />

          {/* Precision Architectural Studio Lighting */}
          <ambientLight intensity={0.38} color="#0b0e14" />
          <directionalLight
            position={[7, 9, 6]}
            intensity={1.8}
            color="#ffffff"
          />
          {/* Subtle Mint Silhouette Light */}
          <directionalLight
            position={[-8, 3, -5]}
            intensity={1.6}
            color="#00F299"
          />
          <pointLight position={[0, 3.5, 0.5]} intensity={0.5} color="#7088a0" />

          {/* 3D Scene Components */}
          <TectonicTerrain scrollProgress={scrollProgress} isMobile={isMobile} />
          <CrystallineFlora scrollProgress={scrollProgress} isMobile={isMobile} />
          <KineticMonolith scrollProgress={scrollProgress} mousePos={mousePos} />
          <DataSplines scrollProgress={scrollProgress} />
          <FloatingParticles isMobile={isMobile} />

          {/* Camera Controller */}
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
