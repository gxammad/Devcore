---
name: devcore-performance
description: Performance auditing, WebGL optimization, draw call budgets, memory management, and responsive asset tiering.
---

# Devcore Performance Engineering Skill

## Performance Targets
- Desktop Target: Constant 60 FPS, < 45,000 active triangles, < 25 draw calls.
- Mobile Target: Constant 60 FPS, < 12,000 active triangles, < 8 draw calls, DPR capped at 1.2.
- Canvas Optimization: Pause `requestAnimationFrame` render loop via `IntersectionObserver` when canvas is not visible.
- Asset Compression: Use procedural generation over bulky textures. Use modern formats (WebP, WebM).
- Bundle Size: Keep initial client JavaScript < 220 KB gzipped.
