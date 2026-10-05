# For Tushi — Just One Thing

> A quiet, cinematic 3D apology experience built around friendship, accountability, and giving someone space.

**Live experience:** https://sorry-umber-two.vercel.app/

## What this project is

This is a small interactive web experience designed to communicate an apology without turning it into a dramatic or demanding message.

The experience moves through six short scenes:

1. **Intro** — sets the tone without asking for anything.
2. **Everyday friendship** — ordinary moments represented as a miniature 3D world.
3. **The Little Things** — an interactive procedural constellation of shared everyday themes.
4. **Where I went wrong** — a direct acknowledgement of the situation and responsibility.
5. **The letter** — a deliberately short, scrollable 3D letter with no expectation of a reply.
6. **Take care** — closes by giving the other person time and space.

The project deliberately avoids fabricated photos, fake conversations, invented memories, romantic symbolism, or manipulative calls to action.

## Technical highlights

- **React 19 + TypeScript + Vite**
- **Three.js + React Three Fiber + Drei** for the interactive 3D scenes
- **Framer Motion** for UI transitions
- **Lenis** for smooth scene progression
- Procedural 3D objects instead of image-based storytelling
- Responsive layouts for desktop, tablet, and mobile
- Touch-friendly interaction and mobile safe-area handling
- Reduced-motion support
- WebGL fallback and canvas error boundary
- Responsive device-pixel-ratio and particle budgets for better mobile performance
- Vercel deployment with a dedicated Vite configuration

## Project structure

```text
src/
├── components/     # Canvas, fallback and shared experience components
├── data/            # Centralised experience copy/content
├── hooks/           # Responsive, motion and scene-progress hooks
├── memory/          # Interactive memory panels
├── scenes/          # Six narrative scenes
├── three/           # Procedural Three.js objects and environments
└── ui/              # Motion text, progress indicator and controls
```

## Run locally

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```

## Content editing

The written experience is intentionally centralised in [`src/data/apologyContent.ts`](src/data/apologyContent.ts), making the copy easy to review or update without searching through the 3D scene components.

## Design principle

The visual language uses deep navy, soft moonlight, restrained cream/gold typography, negative space, and procedural geometry. The goal is to make the interaction feel thoughtful rather than flashy.

---

**Built as a personal creative web experiment by Raj Aryan.**
