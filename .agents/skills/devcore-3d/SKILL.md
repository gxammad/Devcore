---
name: devcore-3d
description: 3D scene architecture, WebGL shaders, R3F materials, lighting, and instanced mesh generation for Devcore.
---

# Devcore 3D Engineering Skill

## 3D Technical Architecture
- Framework: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`).
- Materials: Matte graphite, dark brushed titanium, refractive frosted glass (`transmission: 0.85`, `roughness: 0.15`), and emissive mint `#00F299`.
- Instanced Rendering: Always use `InstancedMesh` for repeated objects (crystals, flora, data nodes) to maintain < 25 draw calls.
- Lighting: Soft key light, rim lighting for edge definition, low ambient fill. Avoid flat lighting.
- Shaders: Procedural noise for terrain perturbation; scrolling dash offset shaders for animated data splines.
