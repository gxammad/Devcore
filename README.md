# Devcore — Building Digital Systems That Scale

Devcore is a premium, cinematic, highly interactive digital platform for modern software engineering and digital products.

## Creative Concept: "Building the Digital World"
Devcore's experience unfolds as a dark digital horizon that progressively comes alive as the user explores:
- **Tectonic Basalt Terrain**: Procedurally generated landscape with stepped architectural terraces.
- **Procedural Crystalline Flora**: Instanced low-poly quartz crystal clusters that bloom organically under scroll scrub.
- **Kinetic Architectural Core**: Floating titanium Mobius loop ribbon with orbiting polished chrome kinetic spheres.
- **Luminous Data Splines & Ambient Cyber Dust**: Dynamic emissive conduits weaving through terrain fissures.
- **Restrained Cinematic Typography**: High-contrast, minimal layout with live telemetry indicators.

## Tech Stack
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS
- **3D & WebGL**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Animation & Scrub**: GSAP + ScrollTrigger
- **Icons**: Lucide React + Custom SVG

## Getting Started

First, install the dependencies:

```bash
pnpm install
# or
npm install
```

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```
├── .agents/skills/          # Project-specific agent skills & guidelines
├── references/              # Visual reference sources
├── src/
│   ├── app/                 # Next.js App Router (layout, page, globals.css)
│   ├── components/
│   │   ├── hero/            # 3D WebGL ecosystem (Canvas, Terrain, Flora, Core)
│   │   ├── sections/        # Page sections (Intro, Capabilities, etc.)
│   │   └── ui/              # Reusable UI tokens, Navbar, Cursor, Buttons
│   └── types/               # TypeScript definitions
└── tailwind.config.ts       # Devcore design tokens
```
